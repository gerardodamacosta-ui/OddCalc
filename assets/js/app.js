import { SP, POS, LAYOUT } from './data.js';

const dark = window.matchMedia('(prefers-color-scheme:dark)').matches;

const { CW, RH, NR, PX, PY, VW } = LAYOUT;
const VH = 4 * RH + PY + 60;

const svg = document.getElementById('g');
const infoPanel = document.getElementById('info');
const filterButtons = Array.from(document.querySelectorAll('.fbtn[data-filter]'));

svg.setAttribute('viewBox', `0 0 ${VW} ${VH}`);
svg.setAttribute('height', String(VH));

const C = {
  wood: { f: dark ? '#27500A' : '#EAF3DE', s: dark ? '#9FE1CB' : '#3B6D11', t: dark ? '#C0DD97' : '#3B6D11' },
  mtn: { f: dark ? '#0C447C' : '#E6F1FB', s: dark ? '#85B7EB' : '#185FA5', t: dark ? '#B5D4F4' : '#185FA5' },
  sel: { f: dark ? '#3C3489' : '#EEEDFE', s: dark ? '#AFA9EC' : '#534AB7', t: dark ? '#CECBF6' : '#26215C' },
  dep: { f: dark ? '#085041' : '#E1F5EE', s: dark ? '#5DCAA5' : '#0F6E56', t: dark ? '#9FE1CB' : '#085041' },
  dim: { f: dark ? '#1a1a18' : '#F1EFE8', s: dark ? '#2C2C2A' : '#D3D1C7', t: dark ? '#3a3a38' : '#C0BEBC' },
  eN: dark ? '#5F5E5A' : '#B4B2A9',
  eDep: dark ? '#5DCAA5' : '#0F6E56'
};

let filter = null;
let sel = null;

function xy(name) {
  const [c, r] = POS[name];
  return [PX + c * CW, PY + r * RH];
}

function vis() {
  return Object.keys(SP).filter((name) => !filter || SP[name].b === filter);
}

function depsOf(name) {
  return Object.keys(SP[name].sIn);
}

function stOf(name) {
  if (!sel) return 'normal';
  if (name === sel) return 'sel';
  if (depsOf(sel).includes(name)) return 'dep';
  return 'dim';
}

function mk(tag, attrs = {}) {
  const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
  Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, String(value)));
  return el;
}

function drawArrow(x1, y1, x2, y2, color) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const d = Math.hypot(dx, dy);
  if (d < 1) return;

  const ux = dx / d;
  const uy = dy / d;
  const sx = x1 + ux * (NR + 3);
  const sy = y1 + uy * (NR + 3);
  const ex = x2 - ux * (NR + 9);
  const ey = y2 - uy * (NR + 9);

  svg.appendChild(mk('line', { x1: sx, y1: sy, x2: ex, y2: ey, stroke: color, 'stroke-width': '1.5' }));

  const hw = 5.5;
  const hl = 9;
  const p1x = ex - ux * hl + uy * hw;
  const p1y = ey - uy * hl - ux * hw;
  const p2x = ex - ux * hl - uy * hw;
  const p2y = ey - uy * hl + ux * hw;

  svg.appendChild(mk('polygon', { points: `${ex},${ey} ${p1x},${p1y} ${p2x},${p2y}`, fill: color }));
}

function drawNode(name) {
  const [cx, cy] = xy(name);
  const sp = SP[name];
  const st = stOf(name);
  const c = st === 'sel' ? C.sel : st === 'dep' ? C.dep : st === 'dim' ? C.dim : C[sp.b];

  const g = mk('g');
  g.style.cursor = 'pointer';
  g.addEventListener('click', () => pick(name));

  if (st === 'sel') {
    g.appendChild(mk('circle', { cx, cy, r: NR + 6, fill: 'none', stroke: c.s, 'stroke-width': '1.5', opacity: '0.35' }));
  }

  g.appendChild(mk('circle', {
    cx,
    cy,
    r: NR,
    fill: c.f,
    stroke: c.s,
    'stroke-width': st === 'sel' || st === 'dep' ? '2' : '0.5'
  }));

  const em = mk('text', {
    x: cx,
    y: cy - 9,
    'text-anchor': 'middle',
    'dominant-baseline': 'central',
    'font-size': '16'
  });
  em.textContent = sp.e;
  g.appendChild(em);

  const nm = mk('text', {
    x: cx,
    y: cy + 11,
    'text-anchor': 'middle',
    'dominant-baseline': 'central',
    'font-size': '11',
    'font-weight': '500',
    fill: c.t
  });
  nm.textContent = name;
  g.appendChild(nm);

  svg.appendChild(g);
}

function redraw() {
  svg.innerHTML = '';
  const visible = new Set(vis());

  if (!filter) {
    svg.appendChild(mk('line', {
      x1: PX + 3.7 * CW,
      y1: PY - 44,
      x2: PX + 3.7 * CW,
      y2: VH - 16,
      stroke: dark ? '#2C2C2A' : '#D3D1C7',
      'stroke-width': '0.5',
      'stroke-dasharray': '4 4'
    }));
  }

  visible.forEach((name) => {
    Object.keys(SP[name].sIn).forEach((dep) => {
      if (!visible.has(dep)) return;
      const [cx, cy] = xy(name);
      const [dx, dy] = xy(dep);
      let color = C.eN;
      if (sel) {
        color = name === sel && stOf(dep) === 'dep' ? C.eDep : C.eN;
      } else {
        color = SP[dep].b === 'wood' ? C.wood.s : C.mtn.s;
      }
      drawArrow(dx, dy, cx, cy, color);
    });
  });

  visible.forEach((name) => drawNode(name));
}

function pick(name) {
  sel = sel === name ? null : name;
  redraw();
  renderInfo(sel);
}

function renderInfo(name) {
  if (!name) {
    infoPanel.innerHTML = '<div class="ip-empty">Seleccioná un Spark del gráfico para ver su receta completa.</div>';
    return;
  }

  const sp = SP[name];
  const spTags = Object.entries(sp.sIn)
    .map(([depName, qty]) => `<span class="tag sp" data-pick="${depName}">${SP[depName].e} ${qty}× ${depName}</span>`)
    .join('') || '<span class="tag none">Ninguno</span>';

  const matTags = sp.mat.length
    ? sp.mat.map((m) => `<span class="tag mat">${m.q} ${m.n}</span>`).join('')
    : '<span class="tag none">Ninguno</span>';

  infoPanel.innerHTML = `
    <div class="ip-header">
      <span class="ip-emoji">${sp.e}</span>
      <span class="ip-name">${name} Spark</span>
      <span class="ip-badge ${sp.b}">${sp.b === 'wood' ? '🌲 Woodland' : '⛰️ Mountain'}</span>
      <span class="ip-time">⏱ ${sp.t}</span>
    </div>
    <div class="ip-grid">
      <div class="ip-sec"><div class="ip-sec-title">⚡ Sparks necesarios</div><div class="tags">${spTags}</div></div>
      <div class="ip-sec"><div class="ip-sec-title">🧱 Materiales extra</div><div class="tags">${matTags}</div></div>
    </div>
    <p class="ip-desc">${sp.desc}</p>`;
}

function setFilter(nextFilter) {
  filter = filter === nextFilter ? null : nextFilter;
  sel = null;

  filterButtons.forEach((btn) => {
    const isActive = btn.dataset.filter === filter;
    btn.classList.toggle('on', isActive);
  });

  redraw();
  renderInfo(null);
}

filterButtons.forEach((btn) => {
  btn.addEventListener('click', () => setFilter(btn.dataset.filter));
});

infoPanel.addEventListener('click', (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;
  const depName = target.dataset.pick;
  if (depName) pick(depName);
});

redraw();
