/* Runde 4 · Meno + piksler: pikslene lages AV Meno-bokstavene (mosaikk av den ekte skrifta), ikke av en egen pikselskrift */
(() => {
const R = RB, f = R.farge;
const PM = window.PM = {};
const cv = document.createElement('canvas'); cv.width = cv.height = 512;
const cx = cv.getContext('2d', { willReadFrequently: true });
PM.FAM = { meno: 'meno-banner, Georgia, serif', futura: 'futura-pt, Futura, "Century Gothic", sans-serif' };
PM.font = (w, s, st = 'normal', fam = 'meno') => `${st} ${w} ${s}px ${PM.FAM[fam] || fam}`;

/* Plassér en tekst i 512-rommet: tilpass til maks bredde/høyde på blekket og sentrér blekket om (X, Y) */
PM.plasser = (tekst, o = {}) => {
  const w = o.w ?? 900, st = o.st ?? 'normal', fam = o.fam ?? 'meno';
  cx.font = PM.font(w, 100, st, fam); const m = cx.measureText(tekst);
  const ink = m.actualBoundingBoxLeft + m.actualBoundingBoxRight, inkH = m.actualBoundingBoxAscent + m.actualBoundingBoxDescent;
  const s = o.s ?? Math.min((o.maxB ?? 380) / ink * 100, (o.maxH ?? 999) / inkH * 100), k = s / 100;
  const X = o.cx ?? 256, Y = o.cy ?? 256;
  const x = X - (m.actualBoundingBoxRight - m.actualBoundingBoxLeft) * k / 2, y = Y + (m.actualBoundingBoxAscent - m.actualBoundingBoxDescent) * k / 2;
  return { tekst, w, st, fam, s, x, y, k, adv: m.width * k,
    boks: [x - m.actualBoundingBoxLeft * k, y - m.actualBoundingBoxAscent * k, x + m.actualBoundingBoxRight * k, y + m.actualBoundingBoxDescent * k] };
};
/* Bredden av de første n tegnene (for å finne bokstavgrenser) */
PM.fram = (pl, n) => { cx.font = PM.font(pl.w, pl.s, pl.st, pl.fam); return pl.x + cx.measureText(pl.tekst.slice(0, n)).width; };
PM.tekst = (pl, fill, attr = '') => `<text ${attr} x="${pl.x.toFixed(1)}" y="${pl.y.toFixed(1)}" font-family='${PM.FAM[pl.fam] || pl.fam}' font-weight="${pl.w}" font-style="${pl.st}" font-size="${pl.s.toFixed(1)}" fill="${fill}">${pl.tekst}</text>`;

/* Mosaikk av teksten: gjennomsnittlig dekning per rute → rute med samme opasitet (som et lavoppløst bilde) */
const buffer = new Map();
PM.dekning = (pl, celle, dx = 0, dy = 0) => {
  const nokkel = [pl.tekst, pl.fam, pl.w, pl.st, pl.s.toFixed(2), pl.x.toFixed(1), pl.y.toFixed(1), celle, dx, dy].join('|');
  if (buffer.has(nokkel)) return buffer.get(nokkel);
  cx.clearRect(0, 0, 512, 512); cx.fillStyle = '#000'; cx.font = PM.font(pl.w, pl.s, pl.st, pl.fam); cx.textBaseline = 'alphabetic'; cx.textAlign = 'left';
  cx.fillText(pl.tekst, pl.x + dx, pl.y + dy);
  const d = cx.getImageData(0, 0, 512, 512).data, ut = [];
  const [x0, y0, x1, y1] = pl.boks;
  for (let gy = Math.floor((y0 + dy) / celle) * celle; gy < y1 + dy; gy += celle) for (let gx = Math.floor((x0 + dx) / celle) * celle; gx < x1 + dx; gx += celle) {
    let sum = 0, n = 0;
    for (let y = Math.max(0, gy); y < Math.min(512, gy + celle); y++) for (let x = Math.max(0, gx); x < Math.min(512, gx + celle); x++) { sum += d[(y * 512 + x) * 4 + 3]; n++; }
    const a = n ? sum / n / 255 : 0;
    if (a > .14) ut.push({ x: gx, y: gy, a: Math.min(1, Math.round(a * 4) / 4 || .25) });
  }
  buffer.set(nokkel, ut); return ut;
};
PM.mosaikk = (pl, celle, o = {}) => PM.dekning(pl, celle, o.dx ?? 0, o.dy ?? 0)
  .filter(p => (!o.region || o.region(p.x + celle / 2, p.y + celle / 2)) && (!o.kontrast || p.a > .2))
  .map((p, i) => `<rect class="${o.cls ?? 'mp'} t" data-x="${p.x}" data-y="${p.y}" data-i="${i}" x="${p.x}" y="${p.y}" width="${celle + .5}" height="${celle + .5}" fill="${o.fill ?? f.krem}" fill-opacity="${o.flat ? 1 : o.kontrast ? (p.a > .5 ? 1 : .5) : p.a}"/>`).join('');

/* Mosaikk-ord til HTML (ordmerket): inline-SVG som står på samme grunnlinje som teksten ved siden av */
PM.ordMosaikk = (tekst, o = {}) => {
  const F = 200, w = o.w ?? 800, celle = Math.round(F * (o.celle ?? .085));
  const c = document.createElement('canvas'), x = c.getContext('2d', { willReadFrequently: true });
  x.font = PM.font(w, F, o.st, o.fam); const m = x.measureText(tekst);
  const fa = Math.ceil(m.fontBoundingBoxAscent), fd = Math.ceil(m.fontBoundingBoxDescent), W = Math.ceil(m.width);
  c.width = W; c.height = fa + fd; x.font = PM.font(w, F, o.st, o.fam); x.fillText(tekst, 0, fa);
  const d = x.getImageData(0, 0, W, fa + fd).data; let r = '';
  for (let gy = 0; gy < fa + fd; gy += celle) for (let gx = 0; gx < W; gx += celle) {
    let s = 0, n = 0; for (let y = gy; y < Math.min(fa + fd, gy + celle); y++) for (let xx = gx; xx < Math.min(W, gx + celle); xx++) { s += d[(y * W + xx) * 4 + 3]; n++; }
    const a = s / n / 255; if (a > .14) r += `<rect class="omp" x="${gx}" y="${gy}" width="${celle + .5}" height="${celle + .5}" fill="${o.fill ?? 'currentColor'}" fill-opacity="${Math.min(1, Math.round(a * 4) / 4 || .25)}"/>`;
  }
  return `<svg class="bk" viewBox="0 0 ${W} ${fa + fd}" style="height:${((fa + fd) / F).toFixed(3)}em;width:auto;vertical-align:${(-fd / F).toFixed(3)}em;overflow:visible">${r}</svg>`;
};

/* Ordmerke-stil «skarp»: ordet kommer inn grovt pikslet og skjerpes trinn for trinn (som et bilde som lastes) */
R.ordStil = R.ordStil || {};
R.ordStil.skarp = (lock, delay) => {
  const ord = lock.querySelector('.ord'); if (!ord) return [];
  ord.style.opacity = '0';
  lock._rydd = () => { ord.style.opacity = ''; lock.querySelectorAll('canvas.skarp').forEach(c => c.remove()); };
  R.etter(lock, delay, async () => {
    await document.fonts.ready;
    const cs = getComputedStyle(ord), rect = ord.getBoundingClientRect(), d = Math.min(devicePixelRatio || 1, 2);
    const W = Math.ceil(rect.width) + 8, H = Math.ceil(rect.height) + 8;
    const c = document.createElement('canvas'); c.className = 'skarp'; c.width = W * d; c.height = H * d;
    Object.assign(c.style, { position: 'absolute', left: '-4px', top: '-4px', width: W + 'px', height: H + 'px', pointerEvents: 'none', imageRendering: 'pixelated' });
    ord.parentElement.style.position = 'relative'; ord.parentElement.appendChild(c);
    const fs = parseFloat(cs.fontSize), lh = parseFloat(cs.lineHeight) || fs;
    const tegn = (celle) => {
      const sw = Math.max(1, Math.round(W / celle)), sh = Math.max(1, Math.round(H / celle));
      const liten = document.createElement('canvas'); liten.width = sw; liten.height = sh; const lx = liten.getContext('2d');
      lx.scale(sw / W, sh / H); lx.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`; lx.letterSpacing = cs.letterSpacing; lx.fillStyle = cs.color;
      const m = lx.measureText('Hg'); lx.fillText(ord.textContent, 4, 4 + (lh - (m.fontBoundingBoxAscent + m.fontBoundingBoxDescent)) / 2 + m.fontBoundingBoxAscent);
      const x = c.getContext('2d'); x.setTransform(1, 0, 0, 1, 0, 0); x.clearRect(0, 0, c.width, c.height); x.imageSmoothingEnabled = false; x.drawImage(liten, 0, 0, c.width, c.height);
    };
    const trinn = [fs * .5, fs * .3, fs * .17, fs * .09, fs * .045];
    trinn.forEach((t, i) => R.etter(lock, i * 120, () => tegn(t)));
    R.etter(lock, trinn.length * 120, () => {
      ord.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 260, fill: 'forwards' }).onfinish = () => (ord.style.opacity = '');
      c.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 300, fill: 'forwards' }).onfinish = () => c.remove();
    });
  });
  return [];
};

/* Pikseltrapp-flis (fra 57) */
PM.trapp = (k = 30) => { const S = 512, A = 4 * k, p = [`M${A},0`, `H${S - A}`];
  const hj = [[2 * k, 0], [2 * k, k], [3 * k, k], [3 * k, 2 * k], [4 * k, 2 * k], [4 * k, 4 * k]];
  hj.forEach(([dx, dy]) => p.push(`L${S - A + dx},${dy}`)); p.push(`V${S - A}`); [...hj].reverse().forEach(([dx, dy]) => p.push(`L${S - A + dx},${S - dy}`));
  p.push(`H${A}`); hj.forEach(([dx, dy]) => p.push(`L${A - dx},${S - dy}`)); p.push(`V${A}`); [...hj].reverse().forEach(([dx, dy]) => p.push(`L${A - dx},${dy}`));
  return p.join(' ') + ' Z'; };
})();
