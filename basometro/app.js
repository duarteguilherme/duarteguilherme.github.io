"use strict";
const $ = id => document.getElementById(id);
const annual = window.currentTerms || [];
const terms = [];
for (const [key, label, first, last, since] of [
  ["lula3", "Lula III", 2023, 2026, "2023-01-01"],
  ["bolsonaro", "Bolsonaro", 2019, 2022, "2019-01-01"],
  ["temer", "Temer", 2016, 2018, "2016-05-12"]
]) {
  const files = annual.map(t => t.file).filter(file => {
    const year = Number(file.match(/(\d{4})\.js$/)?.[1]);
    return first <= year && year <= last;
  }).sort();
  if (files.length === last - first + 1) {
    terms.push({file: "current-" + key, label: label + " · Câmara", files, since, group: "Por governo"});
  }
}
terms.push(...annual.map(t => ({...t, group: "Por ano"})));
terms.push(...(window.senateTerms || []).map(t => ({...t, group: "Por governo"})));
terms.push(...(window.archiveTerms || []).map(t => ({...t, group: "Por governo"})));
const format = new Intl.NumberFormat("pt-BR");
const percent = new Intl.NumberFormat("pt-BR", {maximumFractionDigits: 1});
const dateLabel = date => date.slice(0, 10).split("-").reverse().join("/");
const fold = text => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
const historicalOrder = {lula: {
        1:['PST','PMN','PT','PSL','PSB','PCdoB','PL','PSC','PTC','PTB','PP','PMDB','PMR','PPS','PDT','PV','PPB','PSOL','PRP','PSDB','DEM','PRONA','PRB'],
        2:['PMN','PT','PSB','PRB','PCdoB','PHS','PTdoB','PR','PAN','PSC','PTC','PTB','PP','PMDB','PPS','PDT','PRTB','PV','PPB','PSOL','PRP','PSDB','DEM']
    },
    dilma: {
        1: ['PT','PMN','PCdoB','PSL','PHS','PRB','PRP','PROS','PSDC','PTdoB','PDT','PR','PP','PSB','PMDB','PTB','PSC','PRTB','PV','PTC','PSD','PEN','SDD','PSOL','PPS','DEM','PSDB'],
        2: ['PTC','PT','PCdoB','PSL','PRB','PRTB','PP','PHS','PMDB','PTB','PRP','PSB','PROS','PTN','PDT','PR','PTdoB','PV','PSC','PMN','PSD','PEN','PSDC','SDD','PSOL','REDE','PMB','PPS','DEM','PSDB','S. Part.']
    },
    temer : {
        1: ['PTC','PT','PCdoB','PSL','PRB','PRTB','PP','PHS','PMDB','PTB','PRP','PSB','PROS','PTN','PDT','PR','PTdoB','PV','PSC','PMN','PSD','PEN','PSDC','SDD','PSOL','REDE','PMB','PPS','DEM','PSDB','S. Part.']
    }
};
const palette = ["#A11217", "#BE003E", "#BC005C", "#BA007C", "#98007F", "#7B057E", "#5E196F", "#45187D", "#3A3A8B", "#00408F", "#00528B", "#0066A4", "#007CC0", "#009BDB", "#0096B2", "#009493", "#008270", "#009045", "#00602D", "#5F8930", "#7BAC39", "#A3BD31", "#CAD226", "#FEEE00", "#E9BC00", "#598F59", "#e1c69d", "#B6720A", "#9A740F", "#634600", "#999999"];
const selectedParties = new Set(), selectedStates = new Set();
const regions = ["AC AM AP PA RO RR TO", "AL BA CE MA PB PE PI RN SE", "DF GO MS MT", "ES MG RJ SP", "PR RS SC"];
let partyOrder = [], partyColors = new Map(), start = 0, end = 0, slider, historyChart;
let monthData = [], partyTallies = new Map();
function colors(party) { return partyColors.get(party) || "#aaa"; }
function compareParties(a,b) { return partyOrder.indexOf(a) - partyOrder.indexOf(b); }
let dataset, mode = "parties", selection = null, timer = null, periodRows = [], frame = 0;
let activeFile = "";
let termData;
let rollsByType = new Map();
function stop() {
  clearInterval(timer);
  timer = null;
  $("play").textContent = "▶ Reproduzir";
}
function resetFilters() {
  $("search").value = "";
  selectedParties.clear();
  selectedStates.clear();
  $("threshold").value = 50;
  selection = null;
}
function openTerm(file) {
  stop();
  activeFile = file;
  dataset = null;
  $("proposalType").disabled = true;
  $("status").hidden = false;
  $("status").textContent = "Carregando votações…";
  $("dashboard").hidden = true;
  const term = terms.find(t => t.file === file);
  const request = ++loadRequest;
  Promise.all((term.files || [file]).map(loadData)).then(parts => {
    if (request !== loadRequest) return;
    // Annual Câmara files use the same official deputy IDs across years.
    const data = parts.length === 1 ? parts[0] : {
      people: Object.assign({}, ...parts.map(p => p.people)),
      rolls: parts.flatMap(p => p.rolls).filter(r => r.date >= term.since)
    };
    displayTerm(data);
  }).catch(error => {
    if (request === loadRequest) {
      $("status").textContent = "Falha ao abrir a base. Selecione outro período ou recarregue a página.";
      console.error(error);
    }
  });
}
let loadRequest = 0;
function loadData(file) {
  return new Promise((resolve, reject) => {
    const tag = document.createElement("script");
    tag.src = "data/" + file;
    tag.receive = resolve;
    tag.onload = () => { tag.remove(); reject(new Error("Base sem registros: " + file)); };
    tag.onerror = () => { tag.remove(); reject(new Error("Falha ao abrir " + file)); };
    document.head.append(tag);
  });
}
window.loadBasometro = data => document.currentScript.receive(data);
function displayTerm(data) {
  if (!data.rolls.length) {
    $("status").textContent = "Nenhuma votação disponível nesta base.";
    return;
  }
  dataset = data;
  const parties = new Set();
  for (const roll of data.rolls) for (const ballot of roll.votes) parties.add(ballot[1]);
  const term = terms.find(t => t.file === activeFile);
  const archive = term.file.match(/^archive-(lula|dilma|temer)([12])/);
  // Keep the positions fixed while the timeline moves. For new terms derive
  // the order from party alignment across the full term, as a fresh reference.
  const totals = new Map();
  for (const roll of data.rolls) for (const [,party,choice] of roll.votes) {
    const pair = totals.get(party) || [0,0];
    pair[0] += Number(choice === roll.guide);
    pair[1]++;
    totals.set(party,pair);
  }
  const rate = p => totals.get(p)[0] / totals.get(p)[1];
  const ordered = archive ? historicalOrder[archive[1]][archive[2]] :
    [...parties].sort((a,b) => rate(b) - rate(a) || a.localeCompare(b));
  const extra = [...parties].filter(p => !ordered.includes(p)).sort();
  const complete = [...ordered, ...extra];
  partyOrder = complete.filter(p => parties.has(p));
  partyColors = new Map(complete.map((p,i) => [p, palette[Math.floor(i * palette.length / complete.length)]]));
  resetFilters();
  buildFilterRails();
  termData = data;
  rollsByType = new Map();
  for (const roll of data.rolls) {
    const type = activeFile.startsWith("current-")
      ? window.camaraProposalTypes[roll.id.split("-")[0]]
      : roll.title.match(/^([A-Z]+)\s+\d/)?.[1];
    const key = type || "Sem tipo identificado";
    if (!rollsByType.has(key)) rollsByType.set(key, []);
    rollsByType.get(key).push(roll);
  }
  const types = [...rollsByType.keys()].sort();
  $("proposalType").replaceChildren(new Option("Todos", ""), ...types.map(type => new Option(type, type)));
  $("proposalType").disabled = false;
  $("senateMethod").hidden = term.chamber !== "Senado";
  $("coverage").textContent = term.label + " · " + format.format(data.rolls.length) + " votações de " + dateLabel(data.rolls[0].date) + " a " + dateLabel(data.rolls.at(-1).date) + ".";
  $("dashboard").hidden = false;
  $("status").hidden = true;
  applyProposalType();
}
$("proposalType").onchange = applyProposalType;
function applyProposalType() {
  stop();
  cancelAnimationFrame(frame);
  const rolls = rollsByType.get($("proposalType").value) || termData.rolls;
  dataset = {people: termData.people, rolls};
  $("jump").replaceChildren(...rolls.map((roll,i) =>
    new Option(dateLabel(roll.date) + " · " + roll.title.slice(0, 160), i)));
  makeStrip(rolls);
  monthData = [];
  start = 0;
  end = rolls.length - 1;
  if (slider) slider.destroy();
  slider = noUiSlider.create($("interval"), {
    start: [start,end], range: {min: 0, max: Math.max(1,end)}, step: 1,
    connect: true, animate: false, behaviour: "tap-drag",
    handleAttributes: [{"aria-label":"Início do período"},{"aria-label":"Fim do período"}],
    ariaFormat: {to: i => dateLabel(rolls[Math.min(endIndex(), Math.round(i))].date), from: Number}
  });
  if (rolls.length === 1) slider.disable();
  slider.on("slide", (_values, _handle, values) => {
    stop();
    [start,end] = values.map(Math.round);
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(aggregate);
  });
  $("play").disabled = rolls.length === 1;
  aggregate();
}
function makeStrip(rolls) {
  // For dense series each bar combines neighboring roll calls, with one count per ballot.
  const count = Math.min(120, rolls.length), bars = [];
  for (let i = 0; i < count; i++) {
    const first = Math.floor(i * rolls.length / count), last = Math.floor((i + 1) * rolls.length / count);
    let total = 0, matches = 0;
    for (const roll of rolls.slice(first, last)) {
      total += roll.votes.length;
      for (const vote of roll.votes) if (roll.guide === vote[2]) matches++;
    }
    const bar = document.createElement("i");
    bar.style.height = (matches / total * 100) + "%";
    bar.dataset.start = first;
    bar.dataset.end = last - 1;
    bars.push(bar);
  }
  $("strip").replaceChildren(...bars);
}
function aggregate() {
  if (!dataset) return;
  $("prev").disabled = end === 0;
  $("next").disabled = end === endIndex();
  for (const bar of $("strip").children) {
    bar.classList.toggle("outside", Number(bar.dataset.end) < start || Number(bar.dataset.start) > end);
  }
  const members = new Map();
  partyTallies = new Map();
  for (let i = start; i <= end; i++) {
    const roll = dataset.rolls[i];
    for (const [rawId, party, choice] of roll.votes) {
      const id = String(rawId);
      if (!members.has(id)) {
        const [name, state] = dataset.people[id];
        members.set(id, {id, name, state, total: 0, support: 0, abstentions: 0, obstructions: 0, choice: null});
      }
      const member = members.get(id);
      let byState = partyTallies.get(party);
      if (!byState) partyTallies.set(party, byState = new Map());
      let tally = byState.get(member.state);
      if (!tally) byState.set(member.state, tally = [0,0]);
      tally[0] += Number(roll.guide === choice);
      tally[1]++;
      member.party = party;
      member.total++;
      if (choice === "Abstenção") member.abstentions++;
      if (choice === "Obstrução") member.obstructions++;
      if (choice === roll.guide) member.support++;
      if (i === end) member.choice = choice;
    }
  }
  periodRows = [...members.values()];
  for (const m of periodRows) m.rate = 100 * m.support / m.total;
  $("startDate").textContent = dateLabel(dataset.rolls[start].date);
  $("endDate").textContent = dateLabel(dataset.rolls[end].date);
  render();
}
function adjustThreshold(value) {
  if (+$("threshold").value === value) return;
  $("threshold").value = value;
  render();
}
function selectMember(id) {
  selection = String(id);
  $("search").value = "";
  render();
}
function node(tag, text) {
  const el = document.createElement(tag);
  el.textContent = text;
  return el;
}
function render() {
  if (!dataset) return;

  const roll = dataset.rolls[end], threshold = Number($("threshold").value);
  const inState = m => !selectedStates.size || selectedStates.has(m.state);
  const inParty = m => !selectedParties.size || selectedParties.has(m.party);
  const eligible = periodRows.filter(m => (mode !== "roll" || m.choice) && inState(m));
  const rows = eligible.filter(inParty);
  updateRails(eligible, roll);
  const matches = rows.filter(m => m.rate >= threshold).length;
  const count = format.format(end - start + 1);
  const plural = end === start ? "votação" : "votações";
  $("headline").textContent = mode === "parties" ? 
    "Em " + count + " " + plural + ", " + matches + " de " + rows.length + " parlamentares votaram com o governo em " + threshold + "% das vezes ou mais." :
    mode === "roll" ? roll.title : "Histórico de apoio ao governo";
  $("caption").textContent = mode === "parties" ? (rows.length - matches) + " abaixo do corte · " + rows.filter(m => m.choice).length + " participaram da última votação." :
    mode === "roll" ? dateLabel(roll.date) + " · Orientação do governo: " + roll.guide :
    "Percentual dos votos que seguiram a orientação do governo a cada mês do período.";
  $("cut").textContent = threshold + "%";
  $("thresholdBox").hidden = mode !== "parties";
  $("jumpBox").hidden = mode !== "roll";
  $("jump").value = end;
  $("voteLink").hidden = !/^current-/.test(activeFile) || !/^\d+-\d+$/.test(roll.id);
  if (!$("voteLink").hidden) $("voteLink").href = "https://dadosabertos.camara.leg.br/api/v2/votacoes/" + roll.id;

  $("voteTitle").textContent = roll.title;
  $("voteGuide").textContent = "Orientação do governo · " + roll.guide;
  for (const key of ["parties", "roll", "history"]) $(key).setAttribute("aria-pressed", String(mode === key));
  const profile = $("profile"), person = rows.find(m => m.id === selection);
  profile.replaceChildren(node("h2", person ? person.name : "Ficha parlamentar"));
  profile.hidden = !person || mode === "history";
  if (person) {
    const close = node("button", "×");
    close.className = "close"; close.setAttribute("aria-label", "Fechar ficha");
    close.onclick = () => { selection = null; render(); };
    profile.prepend(close);
    profile.append(node("p", person.party + " · " + person.state), node("h3", "Apoio ao governo"),
      node("strong", percent.format(person.rate) + "%"),
      node("p", person.support + " votos com o governo em " + person.total + " votos no intervalo."),
      node("p", person.abstentions + " abstenções · " + person.obstructions + " obstruções"),
      node("p", "Votação final · " + (person.choice || "Sem voto computado")));
  } else {
    profile.append(node("p", "Selecione um ponto no gráfico ou busque um nome para consultar os votos."));
  }
  const results = $("matches"), query = fold($("search").value.trim());
  results.replaceChildren();
  if (query) {
    const found = rows.filter(m => fold(m.name).includes(query)).sort((a,b) => a.name.localeCompare(b.name, "pt-BR"));
    for (const member of found.slice(0, 12)) {
      const button = node("button", member.name + " · " + member.party);
      button.onclick = () => selectMember(member.id);
      results.append(button);
    }
    if (!found.length) results.append(node("p", "Nenhum nome neste recorte."));
  }
  $("plot").hidden = mode === "history";
  $("historic").hidden = mode !== "history";
  if (mode === "history") drawHistory();
  else window.drawBasometro({compareParties, container: $("plot"), rows, threshold, mode, selected: selection, onSelect: selectMember, onThreshold: adjustThreshold, colors, roll});
}
for (const key of ["parties", "roll", "history"]) $(key).onclick = () => { mode = key; render(); };
$("jump").onchange = () => {
  stop();
  moveEnd(Number($("jump").value));
};
function endIndex() { return dataset.rolls.length - 1; }
function moveEnd(i) {
  end = Math.max(0, Math.min(endIndex(), i));
  start = Math.min(start,end);
  slider.set([start,end]);
  aggregate();
}
$("prev").onclick = () => { stop(); moveEnd(end - 1); };
$("next").onclick = () => { stop(); moveEnd(end + 1); };
for (const key of ["threshold","search"]) $(key).oninput = render;
$("play").onclick = () => {
  if (timer) return stop();
  if (end === endIndex()) {
    if (start === end) start = 0;
    moveEnd(start);
  }
  $("play").textContent = "Ⅱ Pausar";
  timer = setInterval(() => {
    moveEnd(end + 1);
    if (end >= endIndex()) stop();
  }, 500);
};

function buildFilterRails() {
  function button(label, key, set, color) {
    const b = node("button", label);
    b.dataset.key = key;
    b.setAttribute("aria-pressed", String(!key));
    if (color) b.style.setProperty("--color", color);
    b.onclick = () => {
      if (!key) set.clear();
      else if (set.has(key)) set.delete(key);
      else set.add(key);
      render();
    };
    return b;
  }
  const all = button("Todos", "", selectedParties);
  $("party").replaceChildren(all);
  for (const party of partyOrder) $("party").append(button(party, party, selectedParties, colors(party)));
  for (const b of $("party").children) b.append(node("span", ""));
  $("uf").replaceChildren(button("Todos", "", selectedStates));
  const present = new Set(Object.values(dataset.people).map(p => p[1]));
  for (const region of regions) {
    const group = document.createElement("div");
    for (const state of region.split(" ")) if (present.has(state)) group.append(button(state,state,selectedStates));
    if (group.children.length) $("uf").append(group);
  }
}
function updateRails(rows, roll) {
  const sums = new Map();
  function add(party, support, total) {
    for (const key of ["",party]) {
      const pair = sums.get(key) || [0,0];
      pair[0] += support;
      pair[1] += total;
      sums.set(key,pair);
    }
  }
  if (mode === "roll") {
    for (const m of rows) add(m.party, Number(m.choice === roll.guide), 1);
  } else {
    for (const [party,states] of partyTallies) for (const [state,pair] of states) {
      if (!selectedStates.size || selectedStates.has(state)) add(party,...pair);
    }
  }
  for (const b of $("party").children) {
    const key = b.dataset.key, pair = sums.get(key);
    b.lastElementChild.textContent = pair ? Math.round(100 * pair[0] / pair[1]) + "%" : "–";
    b.setAttribute("aria-pressed", String(key ? selectedParties.has(key) : !selectedParties.size));
  }
  for (const b of $("uf").querySelectorAll("button")) {
    b.setAttribute("aria-pressed", String(b.dataset.key ? selectedStates.has(b.dataset.key) : !selectedStates.size));
  }
}
// Keep monthly tallies for each date range and state selection. Party toggles reuse the tallies.
let historyKey = "";
function drawHistory() {
  const key = [activeFile,start,end,...selectedStates].join("|");
  if (!monthData.length || key !== historyKey) {
    const months = new Map();
    for (const roll of dataset.rolls.slice(start,end+1)) {
      const month = roll.date.slice(0,7);
      if (!months.has(month)) months.set(month,new Map());
      const totals = months.get(month);
      for (const [id,party,choice] of roll.votes) {
        if (selectedStates.size && !selectedStates.has(dataset.people[id][1])) continue;
        for (const k of ["",party]) {
          const pair = totals.get(k) || [0,0];
          pair[0] += Number(choice === roll.guide); pair[1]++;
          totals.set(k,pair);
        }
      }
    }
    monthData = [...months];
    historyKey = key;
  }
  const keys = ["",...selectedParties];
  const data = [monthData.map(([m]) => Date.parse(m+"-15T12:00:00Z")/1000)];
  const series = [{label:"Mês", value:(_u,v) => v == null ? "–" : new Date(v*1000).toISOString().slice(0,7)}];
  for (const k of keys) {
    data.push(monthData.map(([,m]) => m.has(k) ? 100*m.get(k)[0]/m.get(k)[1] : null));
    series.push({label:k || "Geral", stroke:k ? colors(k) : "#eee", width:2,
      points:{show:monthData.length < 12}, value:(_u,v) => v == null ? "–" : percent.format(v)+"%"});
  }
  if (historyChart) historyChart.destroy();
  const axis = {stroke:"#bbb",grid:{stroke:"#444"},ticks:{stroke:"#666"}};
  historyChart = new uPlot({
    width: Math.max(200,$("series").clientWidth), height:360, series,
    scales:{y:{range:[0,100]}}, axes:[{...axis,values:(_u,vs)=>vs.map(v=>new Date(v*1000).toLocaleDateString("pt-BR",{month:"short",year:"2-digit",timeZone:"UTC"}))},
      {...axis,values:(_u,vs)=>vs.map(v=>v+"%")}],cursor:{drag:{x:false,y:false}}
  },data,$("series"));
}
new ResizeObserver(() => {
  if (historyChart && mode === "history" && $("series").clientWidth) {
    historyChart.setSize({width:$("series").clientWidth,height:360});
  }
}).observe($("series"));

const periods = new Map();
for (const t of terms) {
  const [name,chamber] = t.label.split(" · ");
  const key = t.group + "|" + name;
  if (!periods.has(key)) periods.set(key,{group:t.group,name,series:[]});
  periods.get(key).series.push({file:t.file,chamber});
}
const groups = new Map();
for (const [key,p] of periods) {
  if (!groups.has(p.group)) {
    const g = document.createElement("optgroup"); g.label = p.group;
    groups.set(p.group,g); $("term").append(g);
  }
  groups.get(p.group).append(new Option(p.name,key));
}
function changePeriod(preferredFile) {
  const period = periods.get($("term").value);
  const previousChamber = $("house").selectedOptions[0]?.dataset.chamber;
  const options = period.series.map(({file,chamber}) => {
    let label = chamber === "Senado" ? "no Senado" : "na Câmara";
    if (file.startsWith("archive-temer")) label += " (acervo parcial de 2016)";
    const option = new Option(label,file);
    option.dataset.chamber = chamber;
    return option;
  });
  $("house").replaceChildren(...options);
  const preferred = period.series.find(s => s.file === preferredFile)
    || period.series.find(s => s.chamber === previousChamber);
  if (preferred) $("house").value = preferred.file;
  openTerm($("house").value);
}
$("term").onchange = () => changePeriod();
$("house").onchange = () => openTerm($("house").value);
const initialBase = new URLSearchParams(window.location?.search).get("base");
const initialTerm = terms.find(t => t.file.replace(/\.js$/, "") === initialBase);
if (initialTerm) $("term").value = initialTerm.group + "|" + initialTerm.label.split(" · ")[0];
if (terms.length) changePeriod(initialTerm?.file);
else $("status").textContent = "Nenhuma base encontrada.";
