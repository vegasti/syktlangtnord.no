/* Runde 3 · pikselmotoren: egen pikselskrift, former og animasjoner for ikon og ordmerke */
(() => {
const R = RB, f = R.farge, E = R.E, a = R.a;

/* Pikselskrift, liten bokstav. 9 rader: 0–1 oppstrek, 2–6 x-høyde, 7–8 nedstrek. Strek = én piksel. */
const G = {
  r: ['....', '....', '#.##', '##..', '#...', '#...', '#...', '....', '....'],
  a: ['....', '....', '.##.', '...#', '.###', '#..#', '.###', '....', '....'],
  w: ['.....', '.....', '#...#', '#...#', '#.#.#', '#.#.#', '.#.#.', '.....', '.....'],
  b: ['#...', '#...', '###.', '#..#', '#..#', '#..#', '###.', '....', '....'],
  y: ['....', '....', '#..#', '#..#', '#..#', '#..#', '.###', '...#', '###.'],
  t: ['...', '.#.', '###', '.#.', '.#.', '.#.', '..#', '...', '...'],
  e: ['....', '....', '.##.', '#..#', '####', '#...', '.###', '....', '....'],
  s: ['....', '....', '.###', '#...', '.##.', '...#', '###.', '....', '....'],
  u: ['....', '....', '#..#', '#..#', '#..#', '#..#', '.###', '....', '....'],
  d: ['...#', '...#', '.###', '#..#', '#..#', '#..#', '.###', '....', '....'],
  i: ['#', '.', '#', '#', '#', '#', '#', '.', '.'],
  o: ['....', '....', '.##.', '#..#', '#..#', '#..#', '.##.', '....', '....'],
};
/* Tung r til ikoner: 7 × 7, strek = to piksler, serif oppe og nede, dråpe på armen */
const TUNG_R = ['###.##.', '.######', '.##..##', '.##....', '.##....', '.##....', '####...'];
/* Tung b til monogrammet */
const TUNG_B = ['##.....', '.##....', '.#####.', '.##..##', '.##..##', '.##..##', '.#####.'];

const PX = window.PX = { G, TUNG_R, TUNG_B };

/* Celler for en tekst i pikselskrifta. Trimmes til radene som er i bruk. */
PX.tekst = (t, mellom = 1) => {
  let x = 0, li = 0; const c = [];
  for (const ch of t) {
    if (ch === ' ') { x += 2; continue; }
    const g = G[ch]; if (!g) continue;
    g.forEach((rad, ry) => [...rad].forEach((k, rx) => { if (k === '#') c.push({ x: x + rx, y: ry, l: li }); }));
    x += g[0].length + mellom; li++;
  }
  return trim(c, x - mellom);
};
PX.bitmap = (rader) => { const c = []; rader.forEach((rad, y) => [...rad].forEach((k, x) => { if (k === '#') c.push({ x, y, l: x }); })); return trim(c, rader[0].length); };
const trim = (c, w) => { const y0 = Math.min(...c.map(p => p.y)), y1 = Math.max(...c.map(p => p.y)); c.forEach((p, i) => { p.y -= y0; p.i = i; }); return { c, w, h: y1 - y0 + 1, y0 }; };
/* Stable sett oppå hverandre (raw / byte), venstrejustert */
PX.stable = (a1, a2, glipe = 2, dx2 = 0) => ({ c: [...a1.c, ...a2.c.map(p => ({ ...p, x: p.x + dx2, y: p.y + a1.h + glipe, l: p.l + 100 }))].map((p, i) => ({ ...p, i })), w: Math.max(a1.w, a2.w + dx2), h: a1.h + glipe + a2.h });

/* Én piksel i en gitt form. s = cellestørrelse. */
PX.form = (form, X, Y, s, fill, attr = '') => {
  switch (form) {
    case 'flis': { const g = s * .09; return `<rect ${attr} x="${(X + g).toFixed(1)}" y="${(Y + g).toFixed(1)}" width="${(s - 2 * g).toFixed(1)}" height="${(s - 2 * g).toFixed(1)}" rx="${(s * .2).toFixed(1)}" fill="${fill}"/>`; }
    case 'rund': return `<circle ${attr} cx="${(X + s / 2).toFixed(1)}" cy="${(Y + s / 2).toFixed(1)}" r="${(s * .46).toFixed(1)}" fill="${fill}"/>`;
    case 'myk': return `<circle ${attr} cx="${(X + s / 2).toFixed(1)}" cy="${(Y + s / 2).toFixed(1)}" r="${(s * .64).toFixed(1)}" fill="${fill}"/>`;
    case 'kors': { const i = s * .16; return `<path ${attr} pathLength="1" d="M${(X + i).toFixed(1)},${(Y + i).toFixed(1)} L${(X + s - i).toFixed(1)},${(Y + s - i).toFixed(1)} M${(X + s - i).toFixed(1)},${(Y + i).toFixed(1)} L${(X + i).toFixed(1)},${(Y + s - i).toFixed(1)}" stroke="${fill}" stroke-width="${(s * .26).toFixed(1)}" stroke-linecap="round" fill="none"/>`; }
    case '3d': { const d = s * .34, sid = attr.includes('data-sid') ? '' : ''; return `<g ${attr}><polygon points="${X + s},${Y} ${X + s + d},${Y + d} ${X + s + d},${Y + s + d} ${X + s},${Y + s}" fill="${PX.sideA}"/><polygon points="${X},${Y + s} ${X + s},${Y + s} ${X + s + d},${Y + s + d} ${X + d},${Y + s + d}" fill="${PX.sideB}"/><rect x="${X}" y="${Y}" width="${s}" height="${s}" fill="${fill}"/></g>`; }
    default: return `<rect ${attr} x="${X.toFixed(1)}" y="${Y.toFixed(1)}" width="${(s + .6).toFixed(1)}" height="${(s + .6).toFixed(1)}" fill="${fill}"/>`;
  }
};
PX.sideA = f.mint; PX.sideB = '#7fb79d';

/* Tegn et sett. o: s, x0, y0 | cx, cy (sentrér), form, fill (streng eller funksjon(p)), cls */
PX.tegn = (sett, o) => {
  const s = o.s, x0 = o.x0 ?? (o.cx - sett.w * s / 2), y0 = o.y0 ?? (o.cy - sett.h * s / 2);
  const sortert = o.form === '3d' ? [...sett.c].sort((p, q) => p.y - q.y || p.x - q.x) : sett.c;
  /* Skarpe piksler: én sammenslått sti per farge under pikslene, så kantene ikke gir lyse sømmer */
  let hel = '';
  if ((o.form || 'kvadrat') === 'kvadrat' && o.hel !== false) {
    const per = {}; sett.c.forEach(p => { const fy = typeof o.fill === 'function' ? o.fill(p) : (o.fill ?? f.krem); (per[fy] ||= []).push(`M${(x0 + p.x * s).toFixed(1)},${(y0 + p.y * s).toFixed(1)}h${s}v${s}h${-s}z`); });
    hel = Object.entries(per).map(([fy, d]) => `<path class="hel hel-${o.cls ?? 'px'}" d="${d.join('')}" fill="${fy}"/>`).join('');
  }
  return hel + sortert.map(p => PX.form(o.form || 'kvadrat', x0 + p.x * s, y0 + p.y * s, s, typeof o.fill === 'function' ? o.fill(p) : (o.fill ?? f.krem),
    `class="${o.cls ?? 'px'} t" data-x="${p.x}" data-y="${p.y}" data-l="${p.l}" data-i="${p.i}"`)).join('');
};

/* Ordmerket som SVG (bruker currentColor). hoyde = høyden på hele settet i em. */
PX.ord = (tekst, o = {}) => {
  const sett = o.sett || PX.tekst(tekst), s = 10, pad = o.form === '3d' ? 4 : 0;
  let inn = PX.tegn(sett, { s, x0: 0, y0: 0, form: o.form, fill: o.fill ?? 'currentColor', cls: 'px' });
  let defs = '';
  if (o.form === 'myk') { const id = R.uid(); defs = `<defs><filter id="${id}" x="-10%" y="-20%" width="120%" height="140%"><feGaussianBlur stdDeviation="2.6"/><feColorMatrix values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 18 -7"/></filter></defs>`; inn = `<g filter="url(#${id})">${inn}</g>`; }
  const kursor = o.kursor ? `<rect class="kursor" x="${sett.w * s + s}" y="${(sett.h - (o.kursorH ?? 5)) * s - (o.kursorDy ?? 0) * s}" width="${s}" height="${(o.kursorH ?? 5) * s}" fill="${o.kursor}"/>` : '';
  return `<svg class="pxord" viewBox="${-pad} ${-pad} ${sett.w * s + pad * 2 + (o.kursor ? s * 2 : 0)} ${sett.h * s + pad * 2}" style="height:${o.hoyde ?? (sett.h / 9 * 1.05).toFixed(3) + 'em'};width:auto;display:block;overflow:visible" ${o.form ? '' : 'shape-rendering="crispEdges"'}>${defs}${inn}${kursor}</svg>`;
};

/* Animasjoner på pikslene (.px) inne i root */
PX.inn = (root, stil, delay = 0, o = {}) => {
  const q = o.sel || '.px', els = [...root.querySelectorAll(q)];
  if (!els.length) return [];
  const X = el => +el.dataset.x, Y = el => +el.dataset.y, L = el => +el.dataset.l;
  const maxX = Math.max(...els.map(X)), maxY = Math.max(...els.map(Y));
  switch (stil) {
    case 'skann': return a(root, q, [{ opacity: 0 }, { opacity: 1 }], { d: 80, delay, stagger: el => Y(el) * (o.rad ?? 85) + X(el) * 5, e: 'steps(1)' });
    case 'slipp': return a(root, q, [{ transform: `translateY(${-(maxY + 4) * (o.s ?? 10)}px)`, opacity: 0, easing: E.inn }, { transform: 'translateY(0) scale(1.15,.85)', opacity: 1, offset: .7, easing: E.ut }, { transform: 'none', opacity: 1 }], { d: 560, delay, stagger: el => X(el) * (o.kol ?? 32) + (maxY - Y(el)) * 26 });
    case 'samle': return els.map(el => a(root, el, [{ transform: `translate(${((Math.random() - .3) * 26 * (o.s ?? 10)).toFixed(0)}px,${((Math.random() - .5) * 18 * (o.s ?? 10)).toFixed(0)}px) scale(.4)`, opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 900, delay: delay + X(el) * 14 + Math.random() * 160, e: E.ut }));
    case 'pop': return a(root, q, [{ transform: 'scale(0)', opacity: 0 }, { transform: 'scale(1.3)', opacity: 1, offset: .6 }, { transform: 'none', opacity: 1 }], { d: 420, delay, stagger: el => (X(el) + Y(el)) * (o.diag ?? 30) + Math.random() * 60, e: E.ut });
    case 'flipp': return a(root, q, [{ transform: 'scaleX(0)', filter: 'brightness(1.8)' }, { transform: 'none', filter: 'none' }], { d: 450, delay, stagger: el => (X(el) + Y(el)) * (o.diag ?? 34), e: E.ut });
    case 'type': {
      const n = Math.max(...els.map(L)) + 1, steg = o.steg ?? 120;
      const ut = a(root, q, [{ opacity: 0 }, { opacity: 1 }], { d: 1, delay, stagger: el => L(el) * steg, e: 'steps(1)' });
      const k = root.querySelector('.kursor');
      if (k) { const bredde = (maxX + 2) * 10; ut.push(...a(root, k, [{ transform: `translateX(${-bredde}px)` }, { transform: 'none' }], { d: n * steg, delay, e: `steps(${n})` }),
        ...a(root, k, [{ opacity: 1 }, { opacity: 0, offset: .5 }, { opacity: 1 }], { d: 700, delay: delay + n * steg, it: 3, e: 'steps(1)', comp: 'add' })); }
      return ut;
    }
    case 'glitch': {
      const rad = {}; for (let y = 0; y <= maxY; y++) rad[y] = [...Array(6)].map(() => Math.round((Math.random() - .5) * 6) * 10 * (o.k ?? 1));
      return els.map(el => { const r = rad[Y(el)]; return a(root, el, [...r.map(v => ({ transform: `translateX(${v}px)`, opacity: Math.random() > .25 ? 1 : 0, easing: 'steps(1)' })), { transform: 'none', opacity: 1 }], { d: 700, delay }); }).flat();
    }
    case 'sy': return a(root, q, [{ strokeDasharray: '0 1' }, { strokeDasharray: '1 0' }], { d: 260, delay, stagger: el => (X(el) + Y(el) * 1.6) * 28, e: E.ut });
    case 'tone': return a(root, q, [{ opacity: 0 }, { opacity: 1 }], { d: 500, delay, stagger: el => X(el) * 18 });
  }
};

/* «by raw studios» — tre utgaver; sida viser én om gangen (body[data-endo]) */
PX.endoHtml = () => `
  <span class="endo endo-meno">by <b>raw studios</b></span>
  <span class="endo endo-piksel">${PX.ord('by raw studios', { hoyde: '1em' })}</span>
  <span class="endo endo-futura">BY RAW STUDIOS</span>`;

/* Tung r til 16 px (adaptiv): «raw»-ikonene viser bare r helt nede */
PX.mikroR = (bg, fg) => `${R.flis(bg)}${PX.tegn(PX.bitmap(TUNG_R), { s: 50, cx: 256, cy: 256, fill: fg })}`;
})();
