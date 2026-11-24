"""Refresh open Senate plenary votes with an explicit Governo orientation."""
import json
import subprocess
import sys
from collections import Counter, defaultdict
from datetime import date, datetime, timedelta
from zoneinfo import ZoneInfo

from update_basometro import DATA, CHOICES, unpack

BASE = "https://legis.senado.leg.br/dadosabertos"
TALLIES = {"Sim": "qtdVotosSim", "Não": "qtdVotosNao",
           "Abstenção": "qtdVotosAbstencao", "Obstrução": "qtdObstrucoes"}


def fetch(endpoint):
    raw = subprocess.check_output(["curl", "-fsSL", "--retry", "3", "--max-time", "120",
                                   "-H", "Accept: application/json", f"{BASE}/{endpoint}"])
    return json.loads(raw)


def read_roll(row, panel, position):
    ballots = {}
    people = {}
    for ballot in row["votos"]:
        choice = ballot["siglaVotoParlamentar"]
        if choice not in CHOICES:
            continue
        senator = ballot["codigoParlamentar"]
        party = ballot["siglaPartidoParlamentar"]
        person = [ballot["nomeParlamentar"], ballot["siglaUFParlamentar"]]
        if not senator or senator in ballots or not party or not all(person):
            raise ValueError("duplicate or incomplete senator record")
        ballots[senator] = [str(senator), party, choice]
        people[str(senator)] = person
    totals = {choice: panel[field] for choice, field in TALLIES.items()}
    # In vote 7118 the panel omitted Heinze's abstention. The official
    # session report explicitly records the article and its corrected tally.
    if row["codigoSessaoVotacao"] == 7118 and totals == dict(zip(TALLIES, (45, 32, 0, 0))):
        report = row["informeLegislativo"]["texto"]
        if "art. 6º do Substitutivo), destacado, aprovado (Sim: 45; Não: 32; Abstenção: 1;" in report:
            totals["Abstenção"] = 1
    if not ballots or Counter(v[2] for v in ballots.values()) != Counter(totals):
        raise ValueError("individual ballots disagree with the official tally")
    title = row["identificacao"] + " · " + row["descricaoVotacao"].strip()
    roll = dict(id=str(row["codigoSessaoVotacao"]), date=row["dataSessao"], title=title,
                guide=position, votes=[ballots[k] for k in sorted(ballots)])
    return roll, people


def refresh(start, end, data, warnings):
    records = fetch(f"votacao?dataInicio={start}&dataFim={end}")
    panels = fetch(f"plenario/votacao/orientacaoBancada/{start:%Y%m%d}/{end:%Y%m%d}")
    by_sequence = defaultdict(list)
    for panel in panels["votacoes"]:
        by_sequence[(panel["dataInicioVotacao"][:10], panel["sequencialVotacao"])].append(panel)
    rolls = {r["id"]: r for r in data["rolls"]}
    seen = set()
    for row in records:
        if row["casaSessao"] != "SF" or row["votacaoSecreta"] != "N":
            continue
        if (row.get("informeLegislativo") or {}).get("siglaColegiado") not in ("PLEN", None):
            continue
        key = str(row["codigoSessaoVotacao"])
        seen.add(key)
        try:
            matches = by_sequence[row["dataSessao"], row["sequencialVotacao"]]
            if len(matches) != 1:
                raise ValueError("missing or ambiguous voting panel")
            guides = {g["voto"].strip().capitalize() for g in matches[0]["orientacoesLideranca"] or []
                      if g["partido"].strip().casefold() == "governo"}
            if not guides or guides <= {"", "Liberado", "Liberada"}:
                if key in rolls:
                    raise ValueError("previously recorded government guidance missing")
                continue
            if len(guides) != 1 or not guides <= CHOICES:
                raise ValueError("ambiguous government guidance")
            roll, people = read_roll(row, matches[0], guides.pop())
        except (ValueError, KeyError, TypeError) as error:
            warnings.append(f"{key}: {error}")
            continue
        rolls[key] = roll
        for senator, person in people.items():
            data["people"].setdefault(senator, person)
    for r in data["rolls"]:
        if start.isoformat() <= r["date"] <= end.isoformat() and r["id"] not in seen:
            warnings.append(f"{r['id']}: previously published vote missing")
    data["rolls"] = sorted(rolls.values(), key=lambda r: (r["date"], int(r["id"])))


def main():
    today = datetime.now(ZoneInfo("America/Sao_Paulo")).date()
    index_path = DATA / "senate-index.js"
    index = unpack(index_path, "window.senateTerms = ", ";")
    previous = unpack(DATA / index[0]["file"], "window.loadBasometro(", ");")
    start = min(today - timedelta(days=29), date.fromisoformat(previous["rolls"][-1]["date"]))
    compact = dict(ensure_ascii=False, separators=(",", ":"))
    warnings = []
    while start <= today:
        year = start.year
        end = min(today, start + timedelta(days=29), date(year, 12, 31))
        # Keep later years separate from the 2023–26 presidential term.
        filename = "senate-lula3.js" if year <= 2026 else f"senate-{year}.js"
        path = DATA / filename
        data = unpack(path, "window.loadBasometro(", ");") if path.exists() else {"people": {}, "rolls": []}
        refresh(start, end, data, warnings)
        if data["rolls"]:
            path.write_text("window.loadBasometro(" + json.dumps(data, **compact) + ");\n")
            if not any(item["file"] == filename for item in index):
                index.insert(0, dict(file=filename, label=f"{year} · Senado", chamber="Senado"))
        start = end + timedelta(days=1)
    index_path.write_text("window.senateTerms = " + json.dumps(index, **compact) + ";\n")
    for warning in warnings:
        print(f"Review Senate vote {warning}", file=sys.stderr)
    return 2 if warnings else 0


if __name__ == "__main__":
    sys.exit(main())
