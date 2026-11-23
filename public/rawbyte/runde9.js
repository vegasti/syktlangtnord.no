/* Runde 9 · 133–152: «raw» står urørt (Meno Banner Black, sperret som i Raw Studios-logoen). «byte» står i Futura PT Demi og er lekeplassen.
   Hvert forslag tegnes i to tilstander: i ro, og mens det jobber (en loop til «appen arbeider», opplasting og transkribering).
   Alt som beveger seg er SMIL inni SVG-en, så målene er de samme som tegningen. Frittstående: trenger bare skriftene fra Typekit. */
(() => {
const FAM = { meno: 'meno-banner, Georgia, serif', futura: 'futura-pt, Futura, "Century Gothic", sans-serif' };
const MENO = { fam: 'meno', w: 900 }, FUT = { fam: 'futura', w: 600 };
const C = { krem: '#f5f0eb', mint: '#a0d2b9', gronn: '#325f4e', gronnMork: '#1f3d32', mintMork: '#3f9a76' };
const TEMA = {
  gronn: { fl: ['#3b6d5a', '#2c5545'], raw: C.krem, byte: C.mint, ak: C.krem },
  lys:   { fl: ['#fbf8f4', '#ebe3da'], raw: C.gronnMork, byte: C.mintMork, ak: C.gronnMork },
};
const LED_RS = 2.955, LED_TETT = 2;
let teller = 0; const uid = () => 'n' + (++teller);
const n = (v, d = 1) => +(+v).toFixed(d);

/* ── Måling: pikselskann av ekte glyfer ── */
const F = 400, OX = 300, OY = 700, NW = 1900, NH = 1000;
const cv = document.createElement('canvas'); cv.width = NW; cv.height = NH;
const cx = cv.getContext('2d', { willReadFrequently: true });
const fnt = (f, s) => `normal ${f.w} ${s}px ${FAM[f.fam]}`;
const adv = (t, f) => { cx.font = fnt(f, 1000); return cx.measureText(t).width / 1000; };
const buf = {};
/* «raw» er sperret for hånd i Raw Studios-logoen: venstre blekkant r 0 · a 26,9 · w 54 ved x-høyde 28,17 */
const RS_RAW = [0, 26.9, 54], RS_XH = 28.17;
const pos = (t, f) => { if (t === 'raw' && f.fam === 'meno') { if (buf.rawpos) return buf.rawpos; const k = xh(f) / RS_XH, l = c => blekk(c, f).l; return buf.rawpos = [...t].map((c, i) => l('r') + RS_RAW[i] * k - l(c)); }
  return [...t].map((c, i) => adv(t.slice(0, i + 1), f) - adv(c, f)); };
const tegnOrd = (t, f) => { const p = pos(t, f); cx.clearRect(0, 0, NW, NH); cx.font = fnt(f, F); cx.fillStyle = '#000'; [...t].forEach((c, i) => cx.fillText(c, OX + p[i] * F, OY)); return cx.getImageData(0, 0, NW, NH).data; };
const blekk = (t, f) => { const k = ['b', t, f.fam, f.w].join('|'); if (buf[k]) return buf[k];
  const d = tegnOrd(t, f); let L = NW, R = 0, T = NH, B = 0;
  for (let y = 0; y < NH; y++) for (let x = 0; x < NW; x++) if (d[(y * NW + x) * 4 + 3] > 128) { if (x < L) L = x; if (x > R) R = x; if (y < T) T = y; if (y > B) B = y; }
  return buf[k] = { l: (L - OX) / F, r: (R + 1 - OX) / F, t: (T - OY) / F, b: (B + 1 - OY) / F }; };
const xh = f => -blekk('x', f).t;
const lop = (d, y) => { const r = []; let s = -1; for (let x = 0; x < NW; x++) { const p = d[(y * NW + x) * 4 + 3] > 128; if (p && s < 0) s = x; if (!p && s >= 0) { r.push([s, x]); s = -1; } } return r; };
const lopK = (d, x) => { const r = []; let s = -1; for (let y = 0; y < NH; y++) { const p = d[(y * NW + x) * 4 + 3] > 128; if (p && s < 0) s = y; if (!p && s >= 0) { r.push([s, y]); s = -1; } } return r; };
const stamme = (c, f) => { const d = tegnOrd(c, f), y = Math.round(OY - xh(f) * .45 * F); return (lop(d, y)[0][0] - OX) / F; };

/* Det vi trenger å vite om Futuras b, y og e (i enheter der skriftstørrelsen er 100, origo i bokstavens startpunkt, y nedover) */
let M;
const trekk = () => { const X = xh(FUT), U = v => v * 100;
  let d = tegnOrd('b', FUT); const yM = Math.round(OY - X * F / 2), rb = lop(d, yM), c0 = rb[0][1], c1 = rb[rb.length - 1][0], cxp = Math.round((c0 + c1) / 2);
  const kol = lopK(d, cxp), over = kol.filter(r => r[1] <= yM).pop(), under = kol.find(r => r[0] >= yM), bI = blekk('b', FUT);
  const rs = lop(d, Math.round(OY + bI.t * F * .9))[0];
  const b = { cx: U((cxp - OX) / F), cy: U(((over[1] + under[0]) / 2 - OY) / F), rx: U((c1 - c0) / 2 / F), ry: U((under[0] - over[1]) / 2 / F), s0: U((rs[0] - OX) / F), s1: U((rs[1] - OX) / F) };
  d = tegnOrd('y', FUT); const gap = [];
  for (let y = Math.round(OY - X * F) + 4; y < OY + 60; y++) { const r = lop(d, y); if (r.length < 2) break; gap.push({ y: U((y - OY) / F), x0: U((r[0][1] - OX) / F), x1: U((r[1][0] - OX) / F) }); }
  const eI = blekk('e', FUT);
  M = { xh: U(X), asc: -U(bI.t), desc: U(blekk('y', FUT).b), q: b.s1 - b.s0, b, gap, e: { cx: U((eI.l + eI.r) / 2), cy: U((eI.t + eI.b) / 2) } }; };

/* Et ord i Futura: hvor hver bokstav starter og hvor blekket er */
const ordD = (t, f = FUT) => { const k = 'o' + t + f.w; if (buf[k]) return buf[k]; const p = pos(t, f).map(v => v * 100), bb = blekk(t, f);
  const ink = [...t].map((c, i) => { const b = blekk(c, f); return { l: p[i] + b.l * 100, r: p[i] + b.r * 100, t: b.t * 100, b: b.b * 100 }; });
  return buf[k] = { t, f, p, ink, box: { l: bb.l * 100, r: bb.r * 100, t: bb.t * 100, b: bb.b * 100 } }; };
/* Dekning per rute (til piksler og raster) */
const dekning = (w, celle) => { const k = ['d', w.t, n(celle, 2)].join('|'); if (buf[k]) return buf[k];
  const d = tegnOrd(w.t, w.f), s = F / 100, ut = [];
  for (let gy = Math.floor(w.box.t / celle) * celle; gy < w.box.b; gy += celle) for (let gx = Math.floor(w.box.l / celle) * celle; gx < w.box.r; gx += celle) {
    const x0 = Math.round(OX + gx * s), x1 = Math.round(OX + (gx + celle) * s), y0 = Math.round(OY + gy * s), y1 = Math.round(OY + (gy + celle) * s); let sum = 0, ant = 0;
    for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) { sum += d[(y * NW + x) * 4 + 3]; ant++; }
    const a = ant ? sum / ant / 255 : 0; if (a > .1) ut.push({ x: gx, y: gy, a }); }
  return buf[k] = ut; };

/* ── Tegnehjelp ── */
const bk = (w, fill, o = {}) => [...w.t].map((ch, i) => { const s = `<text x="${n(w.p[i])}" y="0" font-family='${FAM[w.f.fam]}' font-weight="${w.f.w}" font-size="100" fill="${typeof fill === 'function' ? fill(i) : fill}">${ch}${o.inn ? o.inn(i) : ''}</text>`; return o.pakk ? o.pakk(i, s) : s; }).join('');
const R = (x, y, b, h, fill, attr = '', inn = '') => `<rect x="${n(x)}" y="${n(y)}" width="${n(b)}" height="${n(h)}" fill="${fill}" ${attr}>${inn}</rect>`;
const EIO = '.45 0 .55 1', EUT = '.16 1 .3 1', EINN = '.6 0 1 1';
const felles = (vals, dur, o) => `values="${vals.join(';')}" dur="${dur}s" repeatCount="indefinite"${o.kt ? ` keyTimes="${o.kt.join(';')}"` : ''}${o.d ? ' calcMode="discrete"' : o.sp ? ` calcMode="spline" keySplines="${Array(vals.length - 1).fill(o.sp).join(';')}"` : ''}${o.b ? ` begin="${n(o.b, 2)}s"` : ''}`;
const A = (attr, vals, dur, o = {}) => `<animate attributeName="${attr}" ${felles(vals, dur, o)}/>`;
const AT = (type, vals, dur, o = {}) => `<animateTransform attributeName="transform" type="${type}" ${felles(vals, dur, o)}/>`;

/* ── Flis ── */
const SQ = (() => { const e = 5, p = []; for (let i = 0; i < 180; i++) { const t = i / 180 * 2 * Math.PI, c = Math.cos(t), s = Math.sin(t); p.push(n(256 + 256 * Math.sign(c) * Math.abs(c) ** (2 / e)) + ',' + n(256 + 256 * Math.sign(s) * Math.abs(s) ** (2 / e))); } return 'M' + p.join('L') + 'Z'; })();
const flis = (u, t, px, lys) => `<defs><linearGradient id="${u}g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${t.fl[0]}"/><stop offset="1" stop-color="${t.fl[1]}"/></linearGradient><linearGradient id="${u}h" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="${lys ? .9 : .2}"/><stop offset=".4" stop-color="#fff" stop-opacity="0"/></linearGradient><clipPath id="${u}k"><path d="${SQ}"/></clipPath></defs>
  <path d="${SQ}" fill="url(#${u}g)"/>${px < 40 ? '' : `<path d="${SQ}" fill="none" stroke="url(#${u}h)" stroke-width="5" transform="translate(256 256) scale(.988) translate(-256 -256)"/>`}`;

/* ── Plassering: alt regnes i em av «raw», og skaleres så blekket fyller boksen ── */
const sett = (k, o = {}) => { const opp = o.oppsett || 'midt', xM = xh(MENO), kb = xM / xh(FUT), W = ordD('byte'), r = blekk('raw', MENO);
  const eU = k.ext ? k.ext(W) : W.box, e = { l: eU.l * kb / 100, r: eU.r * kb / 100, t: eU.t * kb / 100, b: eU.b * kb / 100 };
  const led = (opp === 'rs' ? (k.luft ?? LED_RS) : (k.tett ?? LED_TETT)) * xM;
  const xb = opp === 'rs' ? (k.ankerBlekk ? r.l - e.l : stamme('r', MENO) - M.b.s0 / 100 * kb) : (r.l + r.r) / 2 - (e.l + e.r) / 2;
  const L = Math.min(r.l, xb + e.l), H = Math.max(r.r, xb + e.r), topp = r.t, bunn = led + e.b, bunnO = led + e.b * (e.b > .06 ? .6 : 1);
  const sk = Math.min((o.maxB ?? 336) / (H - L), (o.maxH ?? 330) / (bunn - topp)), dx = (o.cx ?? 256) - (L + H) / 2 * sk, dy = (o.cy ?? 256) - (topp + bunnO) / 2 * sk;
  return { sk, rx: dx, ry: dy, bx: dx + xb * sk, by: dy + led * sk, bs: sk * kb / 100, ledU: led / kb * 100, W, boks: [dx + L * sk, dy + topp * sk, dx + H * sk, dy + bunn * sk] }; };
const rawT = (g, fill) => { const p = pos('raw', MENO); return [...'raw'].map((c, i) => `<text x="${n(g.rx + p[i] * g.sk)}" y="${n(g.ry)}" font-family='${FAM.meno}' font-weight="900" font-size="${n(g.sk)}" fill="${fill}">${c}</text>`).join(''); };
const byteG = (k, g, c) => `<g transform="translate(${n(g.bx)} ${n(g.by)}) scale(${n(g.bs, 4)})">${c.liten && k.smaaRen ? bk(g.W, c.byte) : k.tegn(c, g.W)}</g>`;

const mikro = t => { const r = blekk('r', MENO), xM = xh(MENO), sk = 262 / xM, q = xM * .36 * sk, tot = (r.r - r.l) * sk + q * 1.4, x = 256 - tot / 2 - r.l * sk, y = 387;
  return `<text x="${n(x)}" y="${y}" font-family='${FAM.meno}' font-weight="900" font-size="${n(sk)}" fill="${t.raw}">r</text>${R(x + r.r * sk + q * .4, y - q, q, q, t.byte)}`; };

const P = window.R9 = { konsepter: [] };
P.ikon = (k, o = {}) => { const px = o.px || 512, tn = o.tema || 'gronn', t = TEMA[tn], u = uid();
  let inn; if (px <= 20) inn = mikro(t); else { const g = sett(k, { oppsett: k.ikonOppsett || 'midt', ...(k.ikonBoks || {}) }); inn = rawT(g, t.raw) + byteG(k, g, { ...t, u, anim: o.anim, ledU: g.ledU, liten: px <= 40 }); }
  return `<svg class="ik9${o.anim ? ' an' : ''}" viewBox="0 0 512 512"${o.px ? ` width="${px}" height="${px}"` : ''} xmlns="http://www.w3.org/2000/svg">${flis(u, t, px, tn === 'lys')}<g clip-path="url(#${u}k)">${inn}</g></svg>`; };
/* Logoen: samme tegning uten flis. 1em = skriftstørrelsen til «raw» */
P.logo = (k, o = {}) => { const t = { ...TEMA[o.tema || 'gronn'], ...(o.farger || {}) }, g = sett(k, { oppsett: o.oppsett || 'rs', maxB: 430, maxH: 440 }), u = uid();
  const ut = k.ut ? k.ut(g.W, g.ledU) : (k.ext ? k.ext(g.W) : g.W.box);
  const x0 = Math.min(g.boks[0], g.bx + ut.l * g.bs), x1 = Math.max(g.boks[2], g.bx + ut.r * g.bs), y0 = g.boks[1], y1 = Math.max(g.boks[3], g.by + ut.b * g.bs);
  return `<svg class="logo9${o.anim ? ' an' : ''}" viewBox="0 0 ${n(x1 - x0)} ${n(y1 - y0)}" style="width:${n((x1 - x0) / g.sk, 3)}em;height:${n((y1 - y0) / g.sk, 3)}em" xmlns="http://www.w3.org/2000/svg"><g transform="translate(${n(-x0)} ${n(-y0)})">${rawT(g, t.raw)}${byteG(k, g, { ...t, u, anim: o.anim, ledU: g.ledU })}</g></svg>`; };
/* Lasteren: det lille merket som går i loop der appen jobber */
const en = (ch, fn, boks) => { const w = ordD(ch), b = boks ? boks(w) : w.box, s = Math.min(76 / (b.r - b.l), 76 / (b.b - b.t));
  return `<g transform="translate(${n(50 - (b.l + b.r) / 2 * s)} ${n(50 - (b.t + b.b) / 2 * s)}) scale(${n(s, 4)})">${fn(w)}</g>`; };
P.laster = (k, o = {}) => { const c = { byte: C.mint, ak: C.krem, ...(o.lys ? { byte: C.mintMork, ak: C.gronnMork } : {}), u: uid(), anim: o.anim !== false, alene: true };
  return `<svg class="la9${c.anim ? ' an' : ''}" viewBox="0 0 100 100" width="${o.px || 48}" height="${o.px || 48}" xmlns="http://www.w3.org/2000/svg">${k.last ? k.last(c) : en(k.lb, w => k.tegn(c, w), k.lbBoks)}</svg>`; };
P.xM = () => xh(MENO);

const K = o => P.konsepter.push(o);
const blokkGeo = w => { const px = M.q * 1.25, top = -M.asc - M.q * .85, bot = M.desc + M.q * .6; return { x: w.box.l - px, y: top, b: w.box.r - w.box.l + 2 * px, h: bot - top, r: M.q * .55 }; };
const blokkExt = w => { const g = blokkGeo(w); return { l: g.x, r: g.x + g.b, t: g.y, b: g.y + g.h }; };

/* ═══ Spor A · Biten ved siden av ═══ */
K({ nr: 133, navn: 'Punktum', spor: 'A',
  ide: '«byte» får et firkantet punktum: én bit.', jobb: 'Punktumet blir til tre, som «byte…».', svak: 'Tre prikker som venter har alle sett før.',
  ext: w => ({ ...w.box, r: w.box.r + M.q * 1.58 }),
  tegn(c, w) { const q = M.q * 1.08, x = w.box.r + M.q * .5, sq = i => R(x + i * q * 1.7, -q, q, q, c.ak, i ? 'opacity="0"' : '', i ? A('opacity', [0, 1, 0], 1.8, { kt: [0, .28 * i, .9], d: 1 }) : '');
    return bk(w, c.byte) + sq(0) + (c.anim ? sq(1) + sq(2) : ''); },
  last: c => [0, 1, 2].map(i => R(14 + i * 27, 41, 18, 18, c.ak, '', i ? A('opacity', [.25, 1, .25], 1.5, { kt: [0, .3 * i, .9], d: 1 }) : '')).join('') });

K({ nr: 134, navn: 'Markøren', spor: 'A',
  ide: 'En blokkmarkør står etter ordet, som i en terminal.', jobb: 'Ordet skrives inn bokstav for bokstav, og markøren blinker mens den venter.',
  ext: w => ({ ...w.box, r: w.box.r + M.q * .45 + M.xh * .5 }),
  tegn(c, w) { const cw = M.xh * .5, gap = M.q * .45, xc = w.box.r + gap, T = i => n(.08 + .12 * i, 2);
    if (!c.anim) return bk(w, c.byte) + R(xc, -M.xh, cw, M.xh, c.ak);
    const xs = [w.ink[0].l, ...w.ink.map(b => b.r + gap)], N = w.t.length;
    return bk(w, c.byte, { inn: i => A('opacity', [0, 1, 0], 3.2, { kt: [0, T(i), .92], d: 1 }) })
      + `<g>${AT('translate', [...xs, xs[0]].map(x => n(x - xc) + ' 0'), 3.2, { kt: [0, ...xs.slice(1).map((_, i) => T(i)), .92], d: 1 })}${R(xc, -M.xh, cw, M.xh, c.ak, '', A('opacity', [1, 0, 1, 0, 1], 3.2, { kt: [0, T(N - 1) + .12, T(N - 1) + .2, T(N - 1) + .28, T(N - 1) + .36], d: 1 }))}</g>`; },
  last: c => R(34, 22, 32, 56, c.ak, '', A('opacity', [1, .15], 1, { kt: [0, .5], d: 1 })) });

K({ nr: 135, navn: 'Åtte bits', spor: 'A',
  ide: 'Under ordet står åtte ruter: én byte. Mønsteret er bokstaven r skrevet binært, 01110010.', jobb: 'Rutene fylles fra venstre. De kan vise ekte framdrift i åttedeler.', svak: 'Tre rader gjør ikonet tettere.',
  geo: w => { const s = (w.box.r - w.box.l) / (8 + 7 * .4); return { s, y: M.desc + s * .55 }; },
  ext(w) { const g = this.geo(w); return { ...w.box, b: g.y + g.s }; },
  tegn(c, w) { const g = this.geo(w); return bk(w, c.byte) + [0, 1, 1, 1, 0, 0, 1, 0].map((b, i) => R(w.box.l + i * g.s * 1.4, g.y, g.s, g.s, c.ak, `opacity="${b ? 1 : .28}"`, c.anim ? A('opacity', [.28, 1, .28], 2.4, { kt: [0, n((i + 1) / 10, 2), .94], d: 1 }) : '')).join(''); },
  last: c => [...Array(8)].map((_, i) => R(8 + (i % 4) * 22.4, 29 + (i > 3 ? 23 : 0), 17, 17, c.ak, '', A('opacity', [.25, 1, .25], 2, { kt: [0, n((i + 1) / 10, 2), .94], d: 1 }))).join('') });

const klamme = (x, top, bot, t, arm, hoyre) => hoyre ? `M${n(x + t - arm)},${n(top)}H${n(x + t)}V${n(bot)}H${n(x + t - arm)}v${n(-t)}H${n(x)}V${n(top + t)}H${n(x + t - arm)}Z` : `M${n(x + arm)},${n(top)}H${n(x)}V${n(bot)}H${n(x + arm)}v${n(-t)}H${n(x + t)}V${n(top + t)}H${n(x + arm)}Z`;
K({ nr: 136, navn: 'Klammene', spor: 'A', ankerBlekk: true, tett: 2.35,
  ide: '«byte» står i hakeparenteser, som en verdi i kode.', jobb: 'Klammene puster ut og inn, og bokstavene blinker etter tur.',
  geo: w => { const t = M.q * .8, gap = M.q * .95, pad = M.q * .5; return { t, arm: M.q * 1.7, top: -M.asc - pad, bot: M.desc + pad, xl: w.box.l - gap - t, xr: w.box.r + gap }; },
  ext(w) { const g = this.geo(w); return { l: g.xl, r: g.xr + g.t, t: g.top, b: g.bot }; },
  tegn(c, w) { const g = this.geo(w), d = M.q * .8, br = (h) => `<g>${c.anim ? AT('translate', ['0 0', `${n(h ? d : -d)} 0`, '0 0'], 1.5, { sp: EIO }) : ''}<path d="${klamme(h ? g.xr : g.xl, g.top, g.bot, g.t, g.arm, h)}" fill="${c.ak}"/></g>`;
    return br(0) + bk(w, c.byte, c.anim ? { inn: i => A('opacity', [1, .3, 1, 1], 1.5, { kt: [0, .2, .45, 1], b: i * .14 }) } : {}) + br(1); },
  last: c => { const b = h => `<g>${AT('translate', ['0 0', `${h ? 6 : -6} 0`, '0 0'], 1.4, { sp: EIO })}<path d="${klamme(h ? 76 : 16, 20, 80, 8, 18, h)}" fill="${c.ak}"/></g>`; return b(0) + R(41, 41, 18, 18, c.byte, '', A('opacity', [1, .2, 1], 1.4, { sp: EIO })) + b(1); } });

/* ═══ Spor B · Inni bokstavene ═══ */
K({ nr: 137, navn: 'b-ringen', spor: 'B', lb: 'b',
  ide: 'Hullet i b-en er fylt: en bit inni byte-en.', jobb: 'Hullet fylles som et kakediagram. Det kan vise ekte prosent, og b-en alene er et lite merke.',
  tegn(c, w) { const i = w.t.indexOf('b'), x = n(w.p[i] + M.b.cx), y = n(M.b.cy), r = Math.max(M.b.rx, M.b.ry) + 2, o = Math.PI * r;
    return (c.anim ? `<circle cx="${x}" cy="${y}" r="${n(r)}" fill="${c.ak}" opacity=".25"/><circle cx="${x}" cy="${y}" r="${n(r / 2)}" fill="none" stroke="${c.ak}" stroke-width="${n(r)}" stroke-dasharray="${n(o)} ${n(o)}" stroke-dashoffset="${n(o)}" transform="rotate(-90 ${x} ${y})">${A('stroke-dashoffset', [n(o), 0, 0], 2.4, { kt: [0, .82, 1] })}</circle>`
      : `<circle cx="${x}" cy="${y}" r="${n(r)}" fill="${c.ak}"/>`) + bk(w, c.byte); } });

K({ nr: 138, navn: 'e-en', spor: 'B', lb: 'e',
  ide: 'e-en har raw-fargen. Futuras e er nesten en hel sirkel.', jobb: 'e-en snurrer en runde om gangen.', svak: 'I ro er det bare fargen som skiller den fra ren tekst.',
  tegn(c, w) { const i = w.t.indexOf('e'), x = n(w.p[i] + M.e.cx), y = n(M.e.cy);
    return bk(w, j => j === i ? c.ak : c.byte, { pakk: (j, s) => j === i && c.anim ? `<g>${AT('rotate', [`0 ${x} ${y}`, `360 ${x} ${y}`, `360 ${x} ${y}`], 1.8, { kt: [0, .72, 1], sp: EIO })}${s}</g>` : s }); } });

K({ nr: 139, navn: 'y-trakta', spor: 'B', lb: 'y',
  ide: 'En bit har landet i kløfta på y-en.', jobb: 'Bitene faller ned i y-en én etter én, som filer som kommer inn.',
  tegn(c, w) { const i = w.t.indexOf('y'), s = M.q * .98, rad = [...M.gap].reverse().find(g => g.x1 - g.x0 >= s * 1.04) || M.gap[0];
    const x = w.p[i] + (rad.x0 + rad.x1) / 2 - s / 2, y = rad.y - s, D = M.xh * .95;
    return bk(w, c.byte) + `<g>${c.anim ? AT('translate', [`0 ${n(-D)}`, '0 0', '0 0'], 1.5, { kt: [0, .42, 1], sp: EINN }) + A('opacity', [0, 1, 1, 0], 1.5, { kt: [0, .14, .84, 1] }) : ''}${R(x, y, s, s, c.ak)}</g>`; } });

K({ nr: 140, navn: 'Stammen', spor: 'B', lb: 'b', ikonOppsett: 'rs', tett: 2.4, lbBoks: w => ({ ...w.box, t: w.box.t - 34 }),
  ide: 'Stammen på b-en går helt opp til r-en, så de to ordene henger sammen.', jobb: 'En bit klatrer opp stammen. Opp er opplasting, og den kan gå ned ved nedlasting.', svak: 'Ikonet må være venstrestilt for at stammene skal møtes.',
  tegn(c, w) { const i = w.t.indexOf('b'), x = w.p[i] + M.b.s0, b = M.b.s1 - M.b.s0, topp = w.ink[i].t, H = c.ledU ? c.ledU + topp : 34, vei = -topp + H - b;
    return bk(w, c.byte) + R(x, topp - H, b, H + 2, c.byte) + (c.anim ? `<g>${AT('translate', ['0 0', `0 ${n(-vei)}`], 1.5, { sp: EIO })}${A('opacity', [0, 1, 1, 0], 1.5, { kt: [0, .12, .86, 1] })}${R(x, -b, b, b, c.ak)}</g>` : ''); } });

/* ═══ Spor C · Ordet er måleren ═══ */
K({ nr: 141, navn: 'Nivået', spor: 'C', lb: 'b',
  ide: 'Ordet er todelt: raw-fargen øverst og mint nederst.', jobb: 'Minten stiger som et nivå. Den kan vise hvor langt jobben har kommet, eller hvor full lagringen er.',
  tegn(c, w) { const top = w.box.t - 4, bot = w.box.b + 4, niv = -M.xh * .5, x = w.box.l - 5, b = w.box.r - w.box.l + 10, a = c.u + 'a', u = c.u + 'u';
    return `<defs><clipPath id="${a}">${R(x, top, b, c.anim ? bot - top : niv - top, '#000', '', c.anim ? A('height', [n(bot - top), 0, 0], 2.6, { kt: [0, .82, 1] }) : '')}</clipPath><clipPath id="${u}">${R(x, c.anim ? bot : niv, b, bot - top + 8, '#000', '', c.anim ? A('y', [n(bot), n(top), n(top)], 2.6, { kt: [0, .82, 1] }) : '')}</clipPath></defs><g clip-path="url(#${a})">${bk(w, c.ak)}</g><g clip-path="url(#${u})">${bk(w, c.byte)}</g>`; } });

K({ nr: 142, navn: 'Blokka', spor: 'C', ankerBlekk: true, tett: 2.38, ext: blokkExt,
  ide: '«byte» er stanset ut av en mint blokk.', jobb: 'Blokka er selve framdriftslinja og fylles fra venstre.',
  tegn(c, w) { const g = blokkGeo(w), m = c.u + 'm', k = c.u + 'c', sw = M.q * .3;
    const full = `<defs><mask id="${m}" maskUnits="userSpaceOnUse" x="${n(g.x - 2)}" y="${n(g.y - 2)}" width="${n(g.b + 4)}" height="${n(g.h + 4)}">${R(g.x - 2, g.y - 2, g.b + 4, g.h + 4, '#fff')}${bk(w, '#000')}</mask></defs>${R(g.x, g.y, g.b, g.h, c.byte, `rx="${n(g.r)}" mask="url(#${m})"`)}`;
    if (!c.anim) return full;
    return `${R(g.x + sw / 2, g.y + sw / 2, g.b - sw, g.h - sw, 'none', `rx="${n(g.r - sw / 2)}" stroke="${c.byte}" stroke-width="${n(sw)}"`)}${bk(w, c.byte)}<defs><clipPath id="${k}">${R(g.x, g.y, 0, g.h, '#000', '', A('width', [0, n(g.b), n(g.b)], 2.6, { kt: [0, .82, 1] }))}</clipPath></defs><g clip-path="url(#${k})">${full}</g>`; },
  last: c => { const k = c.u + 'c', m = c.u + 'm', b = ordD('b'), s = 48 / (b.box.b - b.box.t), tx = 50 - (b.box.l + b.box.r) / 2 * s, ty = 50 - (b.box.t + b.box.b) / 2 * s, bt = f => `<g transform="translate(${n(tx)} ${n(ty)}) scale(${n(s, 4)})">${bk(b, f)}</g>`;
    return `<defs><mask id="${m}" maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">${R(0, 0, 100, 100, '#fff')}${bt('#000')}</mask><clipPath id="${k}">${R(12, 12, 0, 76, '#000', '', A('width', [0, 76, 76], 2.4, { kt: [0, .82, 1] }))}</clipPath></defs>${R(14, 14, 72, 72, 'none', `rx="9" stroke="${c.byte}" stroke-width="4"`)}${bt(c.byte)}<g clip-path="url(#${k})">${R(12, 12, 76, 76, c.byte, `rx="11" mask="url(#${m})"`)}</g>`; } });

K({ nr: 143, navn: 'Rammen', spor: 'C', ankerBlekk: true, tett: 2.38, ext: blokkExt,
  ide: 'En tynn ramme rundt «byte», som en etikett.', jobb: 'Et lys går rundt ramma så lenge noe jobber.',
  tegn(c, w) { const g = blokkGeo(w), sw = M.q * .45, x = g.x + sw / 2, y = g.y + sw / 2, b = g.b - sw, h = g.h - sw, r = g.r, om = 2 * (b + h) - 8 * r + 2 * Math.PI * r, a = `rx="${n(r)}" stroke="${c.ak}" stroke-width="${n(sw)}"`;
    return (c.anim ? R(x, y, b, h, 'none', a + ' opacity=".28"') + R(x, y, b, h, 'none', `${a} stroke-linecap="round" stroke-dasharray="${n(om * .24)} ${n(om * .76)}"`, A('stroke-dashoffset', [n(om), 0], 1.9)) : R(x, y, b, h, 'none', a)) + bk(w, c.byte); },
  last: c => { const om = 4 * 68 - 8 * 14 + 2 * Math.PI * 14, a = `rx="14" stroke="${c.ak}" stroke-width="8"`; return R(16, 16, 68, 68, 'none', a + ' opacity=".28"') + R(16, 16, 68, 68, 'none', `${a} stroke-linecap="round" stroke-dasharray="${n(om * .24)} ${n(om * .76)}"`, A('stroke-dashoffset', [n(om), 0], 1.6)); } });

K({ nr: 144, navn: 'Skillelinja', spor: 'C', tett: 2.5,
  ide: 'En strek mellom de to ordene.', jobb: 'Streken er framdriftslinja. Dette er det roligste forslaget.', svak: 'Lite særpreg når den står stille.',
  tegn(c, w) { const th = M.q * .42, y = (c.ledU ? (-c.ledU + w.box.t) / 2 : w.box.t - M.q * 1.4) - th / 2, x0 = w.box.l, b = w.box.r - x0, k = c.u + 'c', seg = b * .32;
    return bk(w, c.byte) + (c.anim ? `<defs><clipPath id="${k}">${R(x0, y, b, th, '#000')}</clipPath></defs>${R(x0, y, b, th, c.ak, 'opacity=".28"')}<g clip-path="url(#${k})">${R(x0 - seg, y, seg, th, c.ak, '', A('x', [n(x0 - seg), n(x0 + b)], 1.5, { sp: EIO }))}</g>` : R(x0, y, b, th, c.ak)); },
  last: c => `<defs><clipPath id="${c.u}c">${R(10, 45, 80, 10, '#000')}</clipPath></defs>${R(10, 45, 80, 10, c.ak, 'opacity=".28"')}<g clip-path="url(#${c.u}c)">${R(-20, 45, 28, 10, c.ak, '', A('x', [-20, 90], 1.4, { sp: EIO }))}</g>` });

/* ═══ Spor D · Ordet i lav oppløsning ═══ */
K({ nr: 145, navn: 'Oppløsningen', spor: 'D', lb: 'b', smaaRen: true, tett: 2.1,
  ide: 'Forslag 61 videre, nå med Futura: «byte» i lav oppløsning.', jobb: 'Ordet skjerpes trinn for trinn, som et bilde som lastes inn.', svak: 'Under 40 px tegnes ordet skarpt, for så smått blir pikslene bare uskarphet.',
  tegn(c, w) { const mos = (cel, inn = '') => `<g>${inn}${dekning(w, cel).filter(p => p.a > .2).map(p => R(p.x, p.y, cel + .4, cel + .4, c.byte, `fill-opacity="${p.a > .5 ? 1 : .5}"`)).join('')}</g>`;
    if (!c.anim) return mos(M.xh * .17);
    return mos(M.xh * .44, A('opacity', [1, 0], 3.2, { kt: [0, .2], d: 1 })) + mos(M.xh * .27, A('opacity', [0, 1, 0], 3.2, { kt: [0, .2, .4], d: 1 })) + mos(M.xh * .17, A('opacity', [0, 1, 0], 3.2, { kt: [0, .4, .6], d: 1 })) + `<g>${A('opacity', [0, 1], 3.2, { kt: [0, .6], d: 1 })}${bk(w, c.byte)}</g>`; } });

K({ nr: 146, navn: 'Åtte linjer', spor: 'D', lb: 'b', smaaRen: true,
  ide: '«byte» er skåret i åtte linjer: åtte bits i høyden.', jobb: 'Linjene tennes ovenfra og ned, én bit om gangen.', svak: 'Under 40 px tegnes ordet helt.',
  tegn(c, w) { const top = w.box.t, p = (w.box.b - top) / 8, h = p * .76, x = w.box.l - 2, b = w.box.r - w.box.l + 4;
    return `<defs>${[...Array(8)].map((_, i) => `<clipPath id="${c.u}s${i}">${R(x, top + i * p, b, h, '#000')}</clipPath>`).join('')}</defs>` + [...Array(8)].map((_, i) => `<g clip-path="url(#${c.u}s${i})">${c.anim ? A('opacity', [.22, 1, .22], 2.4, { kt: [0, n((i + 1) / 10, 2), .94], d: 1 }) : ''}${bk(w, c.byte)}</g>`).join(''); } });

K({ nr: 147, navn: 'Lydsporet', spor: 'D', lb: 'b', smaaRen: true,
  ide: '«byte» er delt i loddrette søyler.', jobb: 'Søylene danser som et lydspor. Passer best når noe transkriberes.', svak: 'Under 40 px tegnes ordet helt.',
  tegn(c, w) { const pitch = M.q * .66, bw = pitch * .72, x0 = w.box.l, N = Math.ceil((w.box.r - x0) / pitch), yc = (w.box.t + w.box.b) / 2 - (w.box.b > 5 ? M.desc * .5 : 0), hh = Math.max(yc - w.box.t, w.box.b - yc) + 2;
    const niv = (i, j) => .32 + .68 * Math.abs(Math.sin(i * 1.7 + j * 2.3));
    return `<defs>${[...Array(N)].map((_, i) => { const s = [1, niv(i, 1), niv(i, 2), niv(i, 3), 1];
      return `<clipPath id="${c.u}v${i}">${R(x0 + i * pitch, yc - hh, bw, 2 * hh, '#000', '', c.anim ? A('y', s.map(v => n(yc - hh * v)), 1.6, { sp: EIO }) + A('height', s.map(v => n(2 * hh * v)), 1.6, { sp: EIO }) : '')}</clipPath>`; }).join('')}</defs>` + [...Array(N)].map((_, i) => `<g clip-path="url(#${c.u}v${i})">${bk(w, c.byte)}</g>`).join(''); } });

K({ nr: 148, navn: 'Raster', spor: 'D', lb: 'b', smaaRen: true,
  ide: '«byte» i trykkraster: punktene er store midt i bokstaven og små i kanten.', jobb: 'En bølge går gjennom punktene fra venstre mot høyre.', svak: 'Under 40 px tegnes ordet helt.',
  tegn(c, w) { const p = M.xh * .155, b = w.box.r - w.box.l;
    return dekning(w, p).filter(d => d.a > .12).map(d => { const r = p / 2 * Math.min(1, Math.sqrt(d.a) * 1.08);
      return `<circle cx="${n(d.x + p / 2)}" cy="${n(d.y + p / 2)}" r="${n(r, 2)}" fill="${c.byte}">${c.anim ? A('r', [n(r, 2), n(r * .3, 2), n(r, 2), n(r, 2)], 1.9, { kt: [0, .25, .5, 1], b: (d.x - w.box.l) / b * .9 }) : ''}</circle>`; }).join(''); } });

/* ═══ Spor E · Bevegelsen ═══ */
const STEIN = [[0, 0, 1], [0, 1, 1], [0, 3, 1], [1, 1, .85], [1, 2, .85], [2, 0, .6], [2, 3, .6], [3, 2, .4]];
K({ nr: 149, navn: 'Byggesteinene', spor: 'E',
  ide: 'Noen piksler ligger løse etter e-en, som om ordet ikke er helt ferdig bygd.', jobb: 'Pikslene kommer flygende inn og legger seg på plass.',
  ext: w => ({ ...w.box, r: w.box.r + M.q * .98 * 4.6 }),
  tegn(c, w) { const g = M.q * .98, s = g * .84, x0 = w.box.r + g * .7;
    return bk(w, c.byte) + STEIN.map(([k, r, o]) => `<g opacity="${o}">${c.anim ? AT('translate', [`${n(g * (5 + k))} 0`, '0 0', '0 0'], 2, { kt: [0, .45, 1], sp: EUT, b: k * .12 + r * .05 }) + A('opacity', [0, o, o, 0], 2, { kt: [0, .25, .85, 1], b: k * .12 + r * .05 }) : ''}${R(x0 + k * g, -(r + 1) * g + (g - s) / 2, s, s, c.ak)}</g>`).join(''); },
  last: c => [...Array(9)].map((_, i) => `<g>${AT('translate', ['60 0', '0 0', '0 0'], 2, { kt: [0, .4, 1], sp: EUT, b: i * .09 })}${A('opacity', [0, 1, 1, 0], 2, { kt: [0, .2, .85, 1], b: i * .09 })}${R(14 + (i % 3) * 25, 14 + Math.floor(i / 3) * 25, 22, 22, c.ak)}</g>`).join('') });

const EKKO = [.5, .4, .16, 0];
K({ nr: 150, navn: 'Ekko', spor: 'E', lb: 'b', ikonBoks: { maxH: 236, cy: 190 },
  ide: '«byte» gjentas nedover og blekner, som en strøm av data.', jobb: 'Linjene ruller nedover, som noe som strømmer ut.',
  ut: w => ({ ...w.box, b: w.box.b + 2 * M.xh * 1.95 }), lbBoks: w => ({ ...w.box, b: w.box.b + 2 * M.xh * .85 }),
  tegn(c, w) { const D = M.xh * (c.alene ? .85 : 1.95);
    return (c.anim ? [0, 1, 2].map(j => `<g opacity="${EKKO[j]}">${AT('translate', [`0 ${n(j * D)}`, `0 ${n((j + 1) * D)}`, `0 ${n((j + 1) * D)}`], 1.3, { kt: [0, .75, 1], sp: EIO })}${A('opacity', [EKKO[j], EKKO[j + 1], EKKO[j + 1]], 1.3, { kt: [0, .75, 1] })}${bk(w, c.byte)}</g>`)
      : [1, 2].map(j => `<g transform="translate(0 ${n(j * D)})" opacity="${EKKO[j]}">${bk(w, c.byte)}</g>`)).join('') + bk(w, c.byte); } });

const VEKT = [300, 400, 500, 700];
const vekt = () => buf.vekt || (buf.vekt = (() => { let x = 0; const L = [...'byte'].map((ch, i) => { const f = { fam: 'futura', w: VEKT[i] }, a = adv(ch, f) * 100, b = blekk(ch, f), o = { ch, w: VEKT[i], x, a, l: x + b.l * 100, r: x + b.r * 100 }; x += a; return o; }); return { L, l: L[0].l, r: L[3].r }; })());
K({ nr: 151, navn: 'Vekta', spor: 'E', lb: 'b',
  ide: 'Bokstavene blir fetere mot høyre, fra Futura Light til Bold.', jobb: 'Vekta går som en bølge gjennom ordet.', svak: 'Den lette b-en blir tynn i små ikoner.',
  ext: w => ({ ...w.box, l: vekt().l, r: vekt().r }),
  tegn(c, w) { const t = (ch, x, wt, i) => `<text class="${c.anim ? 'vk9' : ''}" style="animation-delay:${i * .18}s" x="${n(x)}" y="0" text-anchor="middle" font-family='${FAM.futura}' font-weight="${wt}" font-size="100" fill="${c.byte}">${ch}</text>`;
    return w.t === 'byte' ? vekt().L.map((o, i) => t(o.ch, o.x + o.a / 2, o.w, i)).join('') : t(w.t, w.p[0] + adv(w.t, FUT) * 50, 600, 0); } });

K({ nr: 152, navn: 'Bølgen', spor: 'E',
  ide: 'Ren tekst i ro, uten noe ekstra. Dette er nærmest det Frida ser for seg.', jobb: 'Bokstavene hopper etter tur. All leken ligger i bevegelsen.', svak: 'Ingenting å kjenne igjen når den står stille.',
  tegn: (c, w) => bk(w, c.byte, c.anim ? { pakk: (i, s) => `<g>${AT('translate', ['0 0', `0 ${n(-M.xh * .3)}`, '0 0', '0 0'], 1.5, { kt: [0, .18, .36, 1], sp: EIO, b: i * .13 })}${s}</g>` } : {}),
  last: c => [0, 1, 2, 3].map(i => `<g>${AT('translate', ['0 0', '0 -16', '0 0', '0 0'], 1.4, { kt: [0, .18, .36, 1], sp: EIO, b: i * .13 })}${R(11 + i * 21, 46, 15, 15, i === 3 ? c.ak : c.byte)}</g>`).join('') });

P.klar = () => Promise.all(['900 50px meno-banner', '300 50px futura-pt', '400 50px futura-pt', '500 50px futura-pt', '600 50px futura-pt', '700 50px futura-pt'].map(f => document.fonts.load(f, 'rawbyte'))).then(trekk);
})();
