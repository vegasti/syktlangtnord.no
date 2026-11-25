/* Runde 10 · 153–158: ren sats, slik Raw Studios- og trykt.no-logoene er bygd. Én farge. Høyst én liten detalj (i mint),
   og lasteren er en egen del som vokser ut av detaljen. «raw» er Meno Banner Black, sperret som i Raw Studios-logoen.
   Frittstående: trenger bare skriftene fra Typekit. Alt måles ved pikselskann av ekte glyfer, så tegningen følger skrifta. */
(() => {
const FAM = { meno: 'meno-banner, Georgia, serif', futura: 'futura-pt, Futura, "Century Gothic", sans-serif' };
const MENO = { fam: 'meno', w: 900 }, BOK = { fam: 'futura', w: 400 }, MED = { fam: 'futura', w: 500 };
const TEMA = {
  gronn: { fl: ['#3b6d5a', '#2c5545'], fg: '#f5f0eb', ak: '#a0d2b9' },
  lys:   { fl: ['#fbf8f4', '#ebe3da'], fg: '#1f3d32', ak: '#3f9a76' },
  mork:  { fl: ['#1b1c1e', '#1b1c1e'], fg: '#e9e6e1', ak: '#a0d2b9' },
};
const LED_RS = 2.955;
let teller = 0; const uid = () => 't' + (++teller);
const n = (v, d = 1) => +(+v).toFixed(d);

/* ── Måling ── */
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
const blekk = (c, f) => { const k = [c, f.fam, f.w].join('|'); if (buf[k]) return buf[k];
  cx.clearRect(0, 0, NW, NH); cx.font = fnt(f, F); cx.fillStyle = '#000'; cx.fillText(c, OX, OY); const d = cx.getImageData(0, 0, NW, NH).data;
  let L = NW, R = 0, T = NH, B = 0;
  for (let y = 0; y < NH; y++) for (let x = 0; x < NW; x++) if (d[(y * NW + x) * 4 + 3] > 128) { if (x < L) L = x; if (x > R) R = x; if (y < T) T = y; if (y > B) B = y; }
  return buf[k] = { l: (L - OX) / F, r: (R + 1 - OX) / F, t: (T - OY) / F, b: (B + 1 - OY) / F }; };
const xh = f => -blekk('x', f).t;
const X = () => xh(MENO) * 100;          // x-høyden til «raw» i tegneenheter (Meno i størrelse 100)

/* ── Byggeklosser: alt returnerer { s, l, r, t, b } i tegneenheter, grunnlinja til «raw» er y = 0 ── */
const ord = (t, f, s, x0, y, fill, spr = 0) => { const p = pos(t, f), ch = [...t], x = x0 - blekk(ch[0], f).l * s;
  const ink = ch.map((c, i) => { const b = blekk(c, f), px = x + (p[i] + i * spr) * s; return { l: px + b.l * s, r: px + b.r * s, t: y + b.t * s, b: y + b.b * s }; });
  return { s: ch.map((c, i) => `<text x="${n(x + (p[i] + i * spr) * s, 2)}" y="${n(y, 2)}" font-family='${FAM[f.fam]}' font-weight="${f.w}" font-size="${n(s, 2)}" fill="${fill}">${c}</text>`).join(''),
    l: ink[0].l, r: ink[ink.length - 1].r, t: Math.min(...ink.map(i => i.t)), b: Math.max(...ink.map(i => i.b)) }; };
/* sperring som får ordet til å fylle bredden x0–x1 */
const fyll = (t, f, s, x0, x1) => { const p = pos(t, f), ch = [...t], w0 = (p[ch.length - 1] + blekk(ch[ch.length - 1], f).r - blekk(ch[0], f).l) * s; return (x1 - x0 - w0) / ((ch.length - 1) * s); };
const rekt = (x, y, b, h, fill, attr = '', inn = '') => ({ s: `<rect x="${n(x, 2)}" y="${n(y, 2)}" width="${n(b, 2)}" height="${n(h, 2)}" fill="${fill}" ${attr}>${inn}</rect>`, l: x, r: x + b, t: y, b: y + h });
const prikk = (x, y, r, fill) => ({ s: `<circle cx="${n(x, 2)}" cy="${n(y, 2)}" r="${n(r, 2)}" fill="${fill}"/>`, l: x - r, r: x + r, t: y - r, b: y + r });
const saml = (...d) => ({ s: d.map(e => e.s).join(''), l: Math.min(...d.map(e => e.l)), r: Math.max(...d.map(e => e.r)), t: Math.min(...d.map(e => e.t)), b: Math.max(...d.map(e => e.b)) });

const raw = c => ord('raw', MENO, 100, blekk('r', MENO).l * 100, 0, c.fg);
const bokst = (ch, f, c, x0 = blekk('r', MENO).l * 100) => ord(ch, f, f === MENO ? 100 : 100 * xh(MENO) / xh(f), x0, 0, c.fg);
/* BYTE som liten, sperret versaltekst i rawens bredde */
const versal = (c, r, luft, kap = .4) => { const x = X(), s = kap * x / -blekk('H', MED).t; return ord('BYTE', MED, s, r.l, luft * x + kap * x, c.fg, fyll('BYTE', MED, s, r.l, r.r)); };
/* byte i Futura Book med samme x-høyde som raw */
const lita = (c, x0, y) => ord('byte', BOK, 100 * xh(MENO) / xh(BOK), x0, y, c.fg);

/* ── Forslagene ── */
const P = window.R10 = { konsepter: [] };
const K = o => P.konsepter.push(o);

K({ nr: 153, navn: 'Undertittel', gruppe: 'sats',
  ide: '«raw» står som i Raw Studios-logoen. «BYTE» er den stille stemmen: liten og sperret, slik Futura brukes på rawstudios.no.',
  svak: 'BYTE forsvinner under ca. 48 px. Små ikon viser bare r.',
  tegn: c => { const r = raw(c); return saml(r, versal(c, r, .62)); },
  liten: c => bokst('r', MENO, c) });

K({ nr: 154, navn: 'To linjer', gruppe: 'sats',
  ide: 'Samme oppsett som Raw Studios-logoen: to linjer, venstrestilt, samme linjeavstand. Kontrasten er vekta, fet over lys.',
  svak: 'Høy. Trenger plass, som Raw Studios-logoen.',
  tegn: c => { const r = raw(c); return saml(r, lita(c, r.l, LED_RS * X())); },
  ikon: c => { const r = raw(c); return saml(r, lita(c, r.l, 2.1 * X())); },
  liten: c => bokst('r', MENO, c) });

K({ nr: 155, navn: 'Ett ord', gruppe: 'sats',
  ide: '«rawbyte» på én linje. Fet Meno går rett over i lys Futura, som «Plakater med» på trykt.no.',
  svak: 'Bred. I et kvadratisk ikon blir det forbokstavene rb.',
  tegn: c => { const r = raw(c); return saml(r, lita(c, r.r + .13 * X(), 0)); },
  ikon: c => { const r = bokst('r', MENO, c); return saml(r, bokst('b', BOK, c, r.r + .16 * X())); },
  liten: c => { const r = bokst('r', MENO, c); return saml(r, bokst('b', BOK, c, r.r + .16 * X())); } });

K({ nr: 156, navn: 'Linja', gruppe: 'detalj', laster: 'linja',
  ide: 'En tynn strek mellom ordene. I ro er den en vanlig typografisk linje.',
  betyr: 'Når noe jobber, er den framdriften: opplastingen, disken som fylles, tidslinja i redigeringen.',
  svak: 'Streken er tynn. I små ikon må den tegnes tykkere.',
  tegn: c => { const r = raw(c), x = X(); return saml(r, rekt(r.l, .5 * x, r.r - r.l, .055 * x, c.ak), versal(c, r, 1.05)); },
  liten: c => { const r = bokst('r', MENO, c), x = X(); return saml(r, rekt(r.l, .34 * x, r.r - r.l, .17 * x, c.ak)); } });

K({ nr: 157, navn: 'Markøren', gruppe: 'detalj', laster: 'markor',
  ide: 'Tekstmarkøren står etter ordet, som i et felt du nettopp har skrevet i.',
  betyr: 'Den står der programmet venter på deg, og blinker når det jobber. Lik i filnavn, søk, tekst og redigering.',
  svak: 'Kan leses som en l eller I på lang avstand.',
  tegn: c => { const r = raw(c), b = lita(c, r.r + .13 * X(), 0), x = X(); return saml(r, b, rekt(b.r + .2 * x, b.t - .06 * x, .075 * x, -b.t + .06 * x + .3 * x, c.ak)); },
  ikon: c => { const r = bokst('r', MENO, c), x = X(); return saml(r, rekt(r.r + .24 * x, -1.5 * x, .12 * x, 1.8 * x, c.ak)); },
  liten: c => { const r = bokst('r', MENO, c), x = X(); return saml(r, rekt(r.r + .24 * x, -1.5 * x, .16 * x, 1.8 * x, c.ak)); } });

K({ nr: 158, navn: 'Punktet', gruppe: 'detalj', laster: 'punkt',
  ide: 'Et punktum etter «raw», i mint. Det eneste som har farge.',
  betyr: 'Det er statuslampa: disken som jobber, fila som ikke er lagret ennå, opptaket som går.',
  svak: 'Et punktum er vanlig i logoer. Det er fargen og bevegelsen som gjør det til vårt.',
  tegn: c => { const r = raw(c), x = X(), rad = .19 * x; return saml(r, prikk(r.r + .15 * x + rad, -rad, rad, c.ak), versal(c, r, .62)); },
  liten: c => { const r = bokst('r', MENO, c), x = X(), rad = .23 * x; return saml(r, prikk(r.r + .17 * x + rad, -rad, rad, c.ak)); } });

/* ── Uttegning ── */
const svg = (g, bredde, klasse, pad) => `<svg class="${klasse}" xmlns="http://www.w3.org/2000/svg" viewBox="${n(g.l - pad, 2)} ${n(g.t - pad, 2)} ${n(g.r - g.l + 2 * pad, 2)} ${n(g.b - g.t + 2 * pad, 2)}" width="${n(bredde)}" style="max-width:100%;height:auto" role="img" aria-label="rawbyte">${g.s}</svg>`;
/* xpx = hvor mange piksler x-høyden til «raw» skal være. h = total høyde i piksler (i stedet for xpx). */
P.logo = (k, o = {}) => { const c = { ...TEMA[o.tema || 'gronn'], ...(o.farger || {}) }, g = k.tegn(c), pad = .04 * X();
  let sk = o.h ? o.h / (g.b - g.t + 2 * pad) : (o.xpx || 40) / X(); if (o.maksH) sk = Math.min(sk, o.maksH / (g.b - g.t + 2 * pad)); return svg(g, (g.r - g.l + 2 * pad) * sk, 'lg10', pad); };

const SQ = (() => { const e = 5, p = []; for (let i = 0; i < 180; i++) { const t = i / 180 * 2 * Math.PI, c = Math.cos(t), s = Math.sin(t); p.push(n(256 + 256 * Math.sign(c) * Math.abs(c) ** (2 / e)) + ',' + n(256 + 256 * Math.sign(s) * Math.abs(s) ** (2 / e))); } return 'M' + p.join('L') + 'Z'; })();
P.ikon = (k, o = {}) => { const px = o.px || 96, t = TEMA[o.tema || 'gronn'], u = uid(), liten = px <= 32;
  const g = (liten ? k.liten : (k.ikon || k.tegn))(t), mB = liten ? 300 : 330, mH = liten ? 290 : 300;
  const sk = Math.min(mB / (g.r - g.l), mH / (g.b - g.t)), dx = 256 - (g.l + g.r) / 2 * sk, dy = 256 - (g.t + g.b) / 2 * sk;
  return `<svg class="ik10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="${px}" height="${px}" role="img" aria-label="rawbyte-ikon ${px} px"><defs><linearGradient id="${u}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${t.fl[0]}"/><stop offset="1" stop-color="${t.fl[1]}"/></linearGradient></defs><path d="${SQ}" fill="url(#${u})"/><g transform="translate(${n(dx)} ${n(dy)}) scale(${n(sk, 4)})">${g.s}</g></svg>`; };

/* Lasteren: en egen del, 100 × 100. Tegnes med bevegelsen i seg; siden bestemmer om den spilles. */
const EIO = '.45 0 .55 1';
const anim = (attr, vals, dur, kt, disk) => `<animate attributeName="${attr}" values="${vals.join(';')}" dur="${dur}s" repeatCount="indefinite" keyTimes="${kt.join(';')}" ${disk ? 'calcMode="discrete"' : `calcMode="spline" keySplines="${Array(vals.length - 1).fill(EIO).join(';')}"`}/>`;
P.laster = (type, o = {}) => { const t = TEMA[o.tema || 'gronn'], px = o.px || 64; let inn = '';
  if (type === 'linja') inn = `<rect x="12" y="47.5" width="76" height="5" fill="${t.fg}" opacity=".2"/><rect x="12" y="47.5" width="0" height="5" fill="${t.ak}">${anim('width', [0, 76, 76, 76], 2.4, [0, .62, .8, 1])}${anim('opacity', [1, 1, 1, 0], 2.4, [0, .62, .8, 1])}</rect>`;
  if (type === 'markor') inn = `<rect x="46" y="22" width="8" height="56" fill="${t.ak}">${anim('opacity', [1, 0, 1], 1.2, [0, .7, 1], true)}</rect>`;
  if (type === 'punkt') inn = `<circle cx="50" cy="50" r="10" fill="${t.ak}">${anim('r', [8, 12, 8], 2.4, [0, .5, 1])}${anim('opacity', [.4, 1, .4], 2.4, [0, .5, 1])}</circle>`;
  return `<svg class="la10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="${px}" height="${px}" role="img" aria-label="laster">${inn}</svg>`; };

P.xM = () => xh(MENO);
P.klar = () => Promise.all(['900 50px meno-banner', '400 50px futura-pt', '500 50px futura-pt'].map(f => document.fonts.load(f, 'rawbyteBYTE')));
})();
