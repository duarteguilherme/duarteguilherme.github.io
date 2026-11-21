/* The horizontal axis groups members by party. Only the vertical coordinate encodes support. */
(() => {
  const charts = new WeakMap();
  const collator = new Intl.Collator('pt-BR', { sensitivity: 'base' });
  const number = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 1 });
  const choices = ['Sim', 'Não', 'Abstenção', 'Obstrução'];

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function chartState(container) {
    if (charts.has(container)) return charts.get(container);
    const frame = element('div', 'bm-chart');
    const tip = element('div', 'bm-tip');
    tip.hidden = true;
    frame.append(tip);
    container.replaceChildren(frame);
    const state = { frame, tip, points: new Map(), order: [] };
    charts.set(container, state);
    if (window.ResizeObserver) {
      const resize = new ResizeObserver(() => {
        if (state.layout) fitPartyLabels(state.layout.bands);
      });
      resize.observe(frame);
    }

    function hide() { tip.hidden = true; }
    function show(point) {
      if (!point) return;
      const person = state.byId.get(point.dataset.id);
      const metric = state.mode === 'roll' ? person.choice : number.format(person.rate) + '% com o governo';
      tip.replaceChildren(element('strong', '', person.name), element('span', '', [person.party, person.state, metric].filter(Boolean).join(' · ')));
      const plotRect = frame.getBoundingClientRect();
      const rect = point.getBoundingClientRect();
      tip.hidden = false;
      const left = rect.left + rect.width / 2 - plotRect.left - tip.offsetWidth / 2;
      tip.style.left = Math.max(0, Math.min(left, plotRect.width - tip.offsetWidth)) + 'px';
      const above = rect.top - plotRect.top - tip.offsetHeight - 6;
      tip.style.top = (above >= 0 ? above : rect.bottom - plotRect.top + 6) + 'px';
    }
    frame.addEventListener('pointerover', e => show(e.target.closest('.bm-dot')));
    frame.addEventListener('pointerout', hide);
    frame.addEventListener('focusin', e => show(e.target.closest('.bm-dot')));
    frame.addEventListener('focusout', hide);
    frame.addEventListener('click', e => {
      const point = e.target.closest('.bm-dot');
      if (point) state.onSelect(state.byId.get(point.dataset.id).id);
    });
    frame.addEventListener('keydown', e => {
      const point = e.target.closest('.bm-dot');
      if (!point) return;
      if (e.key === 'Escape') { hide(); return; }
      const step = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -1, ArrowDown: 1 }[e.key];
      if (!step) return;
      e.preventDefault();
      const nextIndex = (state.order.indexOf(point) + step + state.order.length) % state.order.length;
      point.tabIndex = -1;
      state.order[nextIndex].tabIndex = 0;
      state.order[nextIndex].focus();
    });
    return state;
  }

  function groupRows(rows, compareParties) {
    const groups = new Map();
    [...rows].sort((a, b) => compareParties(a.party, b.party) || collator.compare(a.name, b.name)).forEach(row => {
      if (!groups.has(row.party)) groups.set(row.party, []);
      groups.get(row.party).push(row);
    });
    return groups;
  }

  function pointFor(state, person, colors, selected) {
    const key = String(person.id);
    let point = state.points.get(key);
    if (!point) {
      point = element('button', 'bm-dot');
      point.type = 'button';
      point.dataset.id = key;
      state.points.set(key, point);
    }
    const active = key === String(selected);
    const metric = state.mode === 'roll' ? person.choice : number.format(person.rate) + '% com o governo';
    point.setAttribute('aria-label', [person.name, person.party, person.state, metric].filter(Boolean).join(', '));
    point.setAttribute('aria-pressed', String(active));
    point.style.setProperty('--party-color', colors(person.party));
    point.tabIndex = -1;
    state.order.push(point);
    return point;
  }

  function fitPartyLabels(bands) {
    for (const band of bands.children) {
      const label = band.firstChild;
      label.hidden = band.offsetWidth < label.textContent.length * 7 + 7;
    }
  }

  function plotParties(state, groups, options) {
    let layout = state.layout;
    if (!layout) {
      const chart = element('div', 'bm-scale');
      const plot = element('div', 'bm-field');
      const bands = element('div', 'bm-bands');
      const thresholdLine = element('div', 'bm-threshold');
      const thresholdLabel = element('span', 'bm-threshold-label');
      thresholdLine.append(thresholdLabel);
      thresholdLabel.tabIndex = 0;
      thresholdLabel.setAttribute("role", "slider");
      thresholdLabel.setAttribute("aria-label", "Linha de governismo");
      thresholdLabel.setAttribute("aria-orientation", "vertical");
      thresholdLabel.setAttribute("aria-valuemin", "0");
      thresholdLabel.setAttribute("aria-valuemax", "100");
      thresholdLabel.addEventListener("keydown", e => {
        const value = Number(thresholdLabel.getAttribute("aria-valuenow"));
        const next = {ArrowUp:value+1,ArrowDown:value-1,Home:0,End:100}[e.key];
        if (next === undefined) return;
        e.preventDefault();
        state.onThreshold(Math.min(100,Math.max(0,next)));
      });
      thresholdLabel.title = 'Arraste para ajustar a linha de governismo';
      thresholdLabel.addEventListener('pointerdown', event => {
        if (event.button !== 0) return;
        thresholdLabel.setPointerCapture(event.pointerId);
        event.preventDefault();
      });
      thresholdLabel.addEventListener('pointermove', event => {
        if (!thresholdLabel.hasPointerCapture(event.pointerId)) return;
        const rect = plot.getBoundingClientRect();
        const value = Math.round(100 * (rect.bottom - event.clientY) / rect.height);
        state.onThreshold?.(Math.max(0, Math.min(100, value)));
      });
      plot.append(bands);
      for (const rate of [0, 25, 50, 75, 100]) {
        const tick = element('div', 'bm-tick');
        tick.style.bottom = rate + '%';
        tick.append(element('span', '', rate + '%'));
        plot.append(tick);
      }
      plot.append(thresholdLine);
      chart.append(plot);
      state.frame.prepend(chart);
      layout = state.layout = { plot, bands, thresholdLine, thresholdLabel };
    }
    const { plot, bands, thresholdLine, thresholdLabel } = layout;
    thresholdLine.style.bottom = options.threshold + '%';
    thresholdLabel.setAttribute('aria-valuenow', options.threshold);
    thresholdLabel.textContent = options.threshold + '%';
    const active = new Set();
    bands.replaceChildren();
    let start = 0;
    const total = options.rows.length;
    for (const [party, members] of groups) {
      const band = element('div', 'bm-band');
      band.style.flex = String(members.length);
      const label = element('span', '', party);
      band.style.setProperty('--party-color', options.colors(party));
      band.append(label);
      bands.append(band);
      members.forEach((person, i) => {
        const point = pointFor(state, person, options.colors, options.selected);
        point.style.left = ((start + i + 0.5) / total * 100) + '%';
        point.style.bottom = person.rate + '%';
        if (point.parentNode !== plot) plot.append(point);
        active.add(String(person.id));
      });
      start += members.length;
    }
    fitPartyLabels(bands);
    for (const [id, point] of state.points) {
      if (!active.has(id)) { point.remove(); state.points.delete(id); }
    }
  }

  function plotRoll(state, groups, options) {
    const table = element('table', 'bm-votes');
    const head = element('thead');
    const header = element('tr');
    head.append(header);
    header.append(element('th', '', 'Bancada'));
    const guide = options.roll.guide;
    const ordered = [guide, ...choices.filter(choice => choice !== guide)];
    for (const choice of ordered) {
      const heading = element('th', '', choice);
      if (choice === guide) heading.append(element('small', '', 'Com o governo'));
      else if (choice === 'Sim' || choice === 'Não') heading.append(element('small', '', 'Em oposição'));
      header.append(heading);
    }
    const body = element('tbody');
    table.append(head, body);
    for (const [party, members] of groups) {
      const row = element('tr');
      body.append(row);
      const name = element('th', '', party);
      name.scope = 'row';
      name.style.setProperty('--party-color', options.colors(party));
      row.append(name);
      for (const choice of ordered) {
        const cell = element('td');
        row.append(cell);
        const votes = element('div', 'bm-ballots');
        for (const person of members) {
          if (person.choice === choice) votes.append(pointFor(state, person, options.colors, options.selected));
        }
        if (!votes.childElementCount) votes.textContent = '–';
        cell.append(votes);
      }
    }
    state.frame.prepend(table);
  }

  window.drawBasometro = function drawBasometro(options) {
    const state = chartState(options.container);
    const focused = document.activeElement;
    const focusedId = focused && state.frame.contains(focused) ? focused.dataset.id : null;
    const rows = options.mode === 'roll' ? options.rows.filter(row => choices.includes(row.choice)) : options.rows;
    state.tip.hidden = true;
    state.byId = new Map(rows.map(row => [String(row.id), row]));
    state.onSelect = options.onSelect;
    state.onThreshold = options.onThreshold;
    if (state.mode !== options.mode || options.mode === 'roll' || !rows.length || !state.layout) {
      state.frame.replaceChildren(state.tip);
      state.layout = null;
      state.points.clear();
    }
    state.mode = options.mode;
    state.order = [];
    if (!rows.length) {
      state.frame.prepend(element('p', 'bm-empty', 'Nenhum parlamentar com voto registrado neste recorte.'));
      return;
    }
    const groups = groupRows(rows, options.compareParties);
    if (options.mode === 'roll') plotRoll(state, groups, options);
    else plotParties(state, groups, options);
    const entry = state.points.get(String(options.selected)) || state.order[0];
    if (entry) entry.tabIndex = 0;
    if (focusedId && focused !== state.points.get(focusedId)) {
      state.points.get(focusedId)?.focus({ preventScroll: true });
    }
  };
})();
