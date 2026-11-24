"""Refresh Câmara plenary roll calls from the official annual CSV exports."""
import csv
import json
import re
import subprocess
import sys
from collections import Counter, defaultdict
from datetime import datetime, date, timedelta
from pathlib import Path
from tempfile import TemporaryDirectory
from zoneinfo import ZoneInfo

DATA = Path(__file__).resolve().parents[1] / "basometro/data"
BASE = "https://dadosabertos.camara.leg.br/arquivos"
CHOICES = {"Sim", "Não", "Abstenção", "Obstrução"}
csv.field_size_limit(10_000_000)


def table(name, year, directory):
    name = "votacoes" + name
    url = f"{BASE}/{name}/csv/{name}-{year}.csv"
    path = directory / f"{name}-{year}.csv"
    subprocess.run(["curl", "--fail", "--silent", "--show-error", "--location",
                    "--retry", "3", "--max-time", "180", url, "-o", path], check=True)
    with path.open(encoding="utf-8-sig", newline="") as stream:
        reader = csv.DictReader(stream, delimiter=";")
        required = {"id", "siglaOrgao", "data"} if name == "votacoes" else {"idVotacao"}
        if not required.issubset(reader.fieldnames or []):
            raise ValueError(f"Invalid CSV header in {url}")
        yield from reader


def unpack(path, prefix, suffix):
    raw = path.read_text().strip()
    if not raw.startswith(prefix) or not raw.endswith(suffix):
        raise ValueError(f"Unexpected format in {path}")
    return json.loads(raw[len(prefix):-len(suffix)])


def validated_ballots(rows, title):
    ballots = {}
    people = {}
    for row in rows:
        choice = row["voto"].strip()
        if choice in {"", "Artigo 17"}:
            continue
        deputy = row["deputado_id"]
        party = row["deputado_siglaPartido"]
        name, state = row["deputado_nome"], row["deputado_siglaUf"]
        if choice not in CHOICES or deputy in ballots or not all((deputy, party, name, state)):
            raise ValueError("invalid or duplicate individual ballot")
        ballots[deputy] = [deputy, party, choice]
        people[deputy] = [name, state]
    counts = Counter(v[2] for v in ballots.values())
    result = re.search(r"\bTotal\s*:\s*(\d+)", title, re.I)
    if not result or not ballots:
        raise ValueError("missing published tally or individual ballots")
    for choice in CHOICES:
        value = re.search(rf"\b{choice}\s*:\s*(\d+)", title, re.I)
        if choice == "Obstrução" and not value:
            continue  # The official result usually excludes obstruction from its total.
        if counts[choice] != (int(value[1]) if value else 0):
            raise ValueError(f"individual ballots disagree with published {choice} count")
    if int(result[1]) not in {len(ballots), len(ballots) - counts["Obstrução"]}:
        raise ValueError("individual ballots disagree with published total")
    return [ballots[k] for k in sorted(ballots)], people


def refresh(year, start, today, directory, types, protected, index, warnings):
    path = DATA / f"current-{year}.js"
    data = unpack(path, "window.loadBasometro(", ");") if path.exists() else {
        "people": {}, "rolls": [], "source": f"{BASE}/votacoes/csv/votacoes-{year}.csv"}
    rolls = {r["id"]: r for r in data["rolls"]}
    sessions = {r["id"]: r for r in table("", year, directory)
                if r["siglaOrgao"] == "PLEN" and start <= r["data"] <= today}
    recent = {k for k, r in rolls.items() if start <= r["date"] <= today}
    for key in sorted(recent - sessions.keys() - protected):
        warnings.append(f"{key}: previously published roll missing from session export")
    if not sessions:
        return
    guides = defaultdict(set)
    for row in table("Orientacoes", year, directory):
        if row["idVotacao"] in sessions and row["siglaBancada"].strip().casefold() == "governo":
            guides[row["idVotacao"]].add(row["orientacao"].strip())
    votes = defaultdict(list)
    for row in table("Votos", year, directory):
        if row["idVotacao"] in sessions:
            votes[row["idVotacao"]].append(row)
    proposals = {r["proposicao_id"]: r["proposicao_siglaTipo"]
                 for r in table("Proposicoes", year, directory) if r["idVotacao"] in sessions}
    for key, session in sessions.items():
        if key in protected:
            continue
        try:
            positions = guides[key]
            if not positions or positions <= {"", "Liberado"}:
                if key in rolls:
                    raise ValueError("previously published government position missing")
                continue
            if len(positions) != 1 or not positions <= CHOICES:
                raise ValueError("ambiguous government position")
            proposal = key.split("-")[0]
            kind = proposals.get(proposal) or types.get(proposal)
            if not kind:
                raise ValueError(f"missing type for proposition {proposal}")
            title = session["descricao"]
            ballots, people = validated_ballots(votes[key], title)
        except ValueError as error:
            warnings.append(f"{key}: {error}")
            continue
        data["source"] = f"{BASE}/votacoes/csv/votacoes-{year}.csv"
        rolls[key] = dict(id=key, date=session["data"], title=title,
                          guide=next(iter(positions)), votes=ballots)
        for deputy, person in people.items():
            data["people"].setdefault(deputy, person)
        types[proposal] = kind
    if not rolls:
        return
    # Stable sort preserves the audited ordering outside the refresh window.
    data["rolls"] = sorted(rolls.values(), key=lambda r: (
        r["date"], sessions.get(r["id"], {}).get("dataHoraRegistro", "")))
    data["people"] = dict(sorted(data["people"].items()))
    path.write_text("window.loadBasometro(" + json.dumps(
        data, ensure_ascii=False, separators=(",", ":")) + ");\n")
    if not any(term["file"] == path.name for term in index):
        index.insert(0, dict(file=path.name, label=f"{year} · Câmara", chamber="Câmara"))


def main():
    today = datetime.now(ZoneInfo("America/Sao_Paulo")).date()
    index_path = DATA / "current-index.js"
    index = unpack(index_path, "window.currentTerms=", ";")
    latest = unpack(DATA / index[0]["file"], "window.loadBasometro(", ");")
    start = min(today - timedelta(days=29), date.fromisoformat(latest["rolls"][-1]["date"]))
    type_path = DATA / "camara-proposal-types.js"
    prefix = type_path.read_text().split("{", 1)[0]
    types = unpack(type_path, prefix, ";")
    with (DATA / "camara-audit.csv").open(newline="") as stream:
        protected = {row[key] for row in csv.DictReader(stream)
                     for key in ("id_votacao", "id_mantido") if row[key]}
    warnings = []
    with TemporaryDirectory() as directory:
        for year in range(start.year, today.year + 1):
            refresh(year, start.isoformat(), today.isoformat(), Path(directory),
                    types, protected, index, warnings)
    type_path.write_text(prefix + json.dumps(types, ensure_ascii=False, indent=2, sort_keys=True) + ";\n")
    index_path.write_text("window.currentTerms=" + json.dumps(index, ensure_ascii=False) + ";\n")
    for warning in warnings:
        print(f"Review Câmara vote {warning}", file=sys.stderr)
    return 2 if warnings else 0


if __name__ == "__main__":
    sys.exit(main())
