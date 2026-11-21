/* Runde 7 · kjernen: måling av ekte glyfer, flisform, ordmerke som SVG og bruksflater (oppgavelinje, oppstart, nettside, mobil).
   Bygger på RB (motor.js: a, E, uid) og PM (runde4-meno.js: font, FAM). */
(() => {
const R = RB, a = R.a, E = R.E;
const K = window.R7 = { konsepter: [] };
const C = K.C = { gronn: '#325f4e', gronnMork: '#1f3d32', dyp: '#15291f', krem: '#f5f0eb', sand: '#eae1da', blekk: '#1d1d1f', mint: '#a0d2b9', mintMork: '#3f9a76', lys: '#5fce96', rav: '#c8833a' };

/* ── Måling ── */
const ctx = document.createElement('canvas').getContext('2d');
const mt = K.mt = (t, fam, w, s) => { ctx.font = PM.font(w, s, 'normal', fam); const m = ctx.measureText(t); return { adv: m.width, l: m.actualBoundingBoxLeft, r: m.actualBoundingBoxRight, asc: m.actualBoundingBoxAscent, desc: m.actualBoundingBoxDescent }; };
const xh = K.xh = (fam, w, s = 100) => mt('x', fam, w, s).asc;
/* Futura må settes så mye større for at x-høyden skal møte Menos */
const XR = K.XR = (wM, wF) => xh('meno', wM) / xh('futura', wF);

const N = 700, F = 400, OX = 150, OY = 500;
const sc = document.createElement('canvas'); sc.width = sc.height = N;
const sx = sc.getContext('2d', { willReadFrequently: true });
const skann = (tegn, fam, w) => { sx.clearRect(0, 0, N, N); sx.font = PM.font(w, F, 'normal', fam); sx.fillStyle = '#000'; sx.fillText(tegn, OX, OY); const d = sx.getImageData(0, 0, N, N).data; return (x, y) => d[(y * N + x) * 4 + 3] > 128; };
const buf = {};
/* Venstre kant av stammen (ikke serifen) i em: brukes til optisk venstrejustering */
const stammeV = K.stammeV = (tegn, fam, w) => { const n = 's' + tegn + fam + w; if (n in buf) return buf[n];
  const ink = skann(tegn, fam, w), y = Math.round(OY - xh(fam, w, F) * .45); let x = 0; while (x < N && !ink(x, y)) x++; return buf[n] = (x - OX) / F; };
/* Strekbredden i Futura (em) */
const strek = K.strek = (w) => { const n = 'q' + w; if (n in buf) return buf[n]; const ink = skann('l', 'futura', w), y = OY - 150; let x0 = 0; while (x0 < N && !ink(x0, y)) x0++; let x1 = x0; while (x1 < N && ink(x1, y)) x1++; return buf[n] = (x1 - x0) / F; };
/* Halen på Futuras e: tuppen (tip, yT), strekbredde q — alt i em fra glyfens origo, y negativ oppover */
const eHale = K.eHale = (w) => { const n = 'e' + w; if (n in buf) return buf[n];
  const ink = skann('e', 'futura', w); let L = N, Rr = 0, T = N, B = 0;
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) if (ink(x, y)) { if (x < L) L = x; if (x > Rr) Rr = x; if (y < T) T = y; if (y > B) B = y; }
  const W = Rr - L, D = B - T; let yc = -1;
  for (let y = T + Math.round(.3 * D); y <= T + Math.round(.75 * D); y++) { let run = 0, best = 0; for (let x = L; x <= Rr; x++) { if (ink(x, y)) { run++; if (run > best) best = run; } else run = 0; } if (best >= .88 * W) yc = y; }
  const rx = y => { for (let x = Rr; x >= L; x--) if (ink(x, y)) return x; return -1; };
  let yT = -1, apning = false;
  for (let y = yc + 1; y <= B; y++) { const v = rx(y); if (v < L + .6 * W) apning = true; else if (apning) { yT = y; break; } }
  if (yT < 0) yT = Math.round(T + .68 * D);
  let tip = 0; for (let y = yT; y < yT + Math.round(.1 * D); y++) tip = Math.max(tip, rx(y));
  return buf[n] = { tip: (tip - OX) / F, yT: (yT - OY) / F, q: strek(w), R: (Rr - OX) / F, T: (T - OY) / F, B: (B - OY) / F }; };

/* ── Tekst i SVG ── */
const T = K.T = (t, fam, w, s, x, y, fill, cls = '', attr = '') => `<text class="${cls}" x="${x.toFixed(1)}" y="${y.toFixed(1)}" font-family='${PM.FAM[fam]}' font-weight="${w}" font-size="${s.toFixed(1)}" fill="${fill}" ${attr}>${t}</text>`;
/* Én <text> per bokstav, med riktig kerning (for bokstav-for-bokstav-animasjon) */
const bokstaver = K.bokstaver = (t, fam, w, s, x0, y, fill, cls = 'bk t') => [...t].map((c, i) => T(c, fam, w, s, x0 + mt(t.slice(0, i + 1), fam, w, s).adv - mt(c, fam, w, s).adv, y, fill, cls)).join('');

/* «raw» (Meno) over «byte» (Futura): samme x-høyde, optisk venstrejustert på stammene, optisk midtstilt loddrett */
K.stabel = ({ wM = 900, wF = 600, bredde = 330, venstre = true, cx = 256, cy = 256, luft = .2 } = {}) => {
  const k = XR(wM, wF), U = 100, r = mt('raw', 'meno', wM, U), b = mt('byte', 'futura', wF, U * k), xhU = xh('meno', wM, U);
  const xb = venstre ? stammeV('r', 'meno', wM) * U - stammeV('b', 'futura', wF) * U * k : (r.r - r.l) / 2 - (b.r - b.l) / 2;
  const L = Math.min(-r.l, xb - b.l), Hy = Math.max(r.r, xb + b.r), sk = bredde / (Hy - L);
  const y2 = b.asc + luft * xhU, dy = cy - ((-r.asc + y2 + .5 * b.desc) / 2) * sk, dx = cx - ((L + Hy) / 2) * sk;
  return { r: { t: 'raw', fam: 'meno', w: wM, s: U * sk, x: dx, y: dy }, b: { t: 'byte', fam: 'futura', w: wF, s: U * k * sk, x: dx + xb * sk, y: dy + y2 * sk },
    xh: xhU * sk, venstreKant: dx + L * sk, hoyreKant: dx + Hy * sk, toppB: dy + (y2 - b.asc) * sk, bunnB: dy + (y2 + b.desc) * sk, toppR: dy - r.asc * sk };
};
/* Hale-biten: hvor e-en i en plassert «byte» kuttes, og hvor den løse pikselen lander */
K.hale = (b) => { const h = eHale(b.w), xe = b.x + mt('byte', 'futura', b.w, b.s).adv - mt('e', 'futura', b.w, b.s).adv, q = h.q * b.s;
  const tip = xe + h.tip * b.s, yT = b.y + h.yT * b.s, kutt = tip - q * .9, p = q * .96;
  /* Biten som mangler i halen er like stor som pikselen, og pikselen har flyttet seg litt ut og opp */
  return { kutt, yT, q, p, tip, bunn: b.y + h.B * b.s + 4, px: kutt + q * .8, py: yT - q * .42 }; };

/* ── Flisa: superellipse (myke, sammenhengende hjørner) med svak dybde ── */
const SQ = K.SQ = (() => { const n = 5, p = []; for (let i = 0; i < 180; i++) { const t = i / 180 * 2 * Math.PI, c = Math.cos(t), s = Math.sin(t); p.push((256 + 256 * Math.sign(c) * Math.abs(c) ** (2 / n)).toFixed(1) + ',' + (256 + 256 * Math.sign(s) * Math.abs(s) ** (2 / n)).toFixed(1)); } return 'M' + p.join('L') + 'Z'; })();
const TEMA = K.TEMA = {
  gronn:    { bg: ['#3b6d5a', '#2c5545'], raw: C.krem, byte: C.krem, px: C.mint, scene: 'mork' },
  tofarget: { bg: ['#3b6d5a', '#2c5545'], raw: C.krem, byte: C.mint, px: C.krem, scene: 'mork' },
  krem:     { bg: ['#fbf8f4', '#ebe3da'], raw: C.gronn, byte: C.gronn, px: C.mintMork, scene: 'sand' },
  blekk:    { bg: ['#2b2b2e', '#17171a'], raw: C.krem, byte: C.krem, px: C.lys, scene: 'lys' },
  dyp:      { bg: ['#234437', '#12241b'], raw: C.mint, byte: C.mint, px: C.krem, scene: 'lys' },
};
/* Ordmerkets farger på en gitt bakgrunn */
K.ORDF = { mork: t => ({ raw: C.krem, byte: t.byte === C.mint && t.raw === C.krem ? C.mint : C.krem, px: t.byte === C.mint && t.raw === C.krem ? C.krem : C.mint }), sand: () => ({ raw: C.gronnMork, byte: C.gronnMork, px: C.mintMork }), lys: () => ({ raw: C.blekk, byte: C.blekk, px: C.mintMork }) };
K.flis = (u, tema, o = {}) => { const t = TEMA[tema];
  return `<defs><linearGradient id="${u}g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${t.bg[0]}"/><stop offset="1" stop-color="${t.bg[1]}"/></linearGradient><linearGradient id="${u}h" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="${tema === 'krem' ? .9 : .2}"/><stop offset=".4" stop-color="#fff" stop-opacity="0"/></linearGradient></defs>
    <path class="flis" d="${SQ}" fill="url(#${u}g)"/>${o.px && o.px < 40 ? '' : `<path d="${SQ}" fill="none" stroke="url(#${u}h)" stroke-width="5" transform="translate(256 256) scale(.988) translate(-256 -256)"/>`}`; };
K.svg = (innhold, px, cls = '') => `<svg class="${cls}" viewBox="0 0 512 512" ${px ? `width="${px}" height="${px}"` : ''} xmlns="http://www.w3.org/2000/svg">${innhold}</svg>`;
K.ikon = (k, v, px, cls = '') => K.svg(k.ikon(R.uid(), { px: px || 512 }, v), px, cls);

/* ── Ordmerket som SVG: «raw» (Meno) + «byte» (Futura) på felles grunnlinje og x-høyde ──
   type: hale | punktum | markor | opp | ren | paskrift. f = { raw, byte, px }. Skaleres med font-size (1em = Menos skriftstørrelse). */
K.ord = (type, f, o = {}) => {
  const S = 200, wM = o.wM ?? 800, wF = o.wF ?? 500, k = XR(wM, wF), sB = S * k, pad = 8;
  const mr = mt('raw', 'meno', wM, S), mb = mt('byte', 'futura', wF, sB), xhp = xh('meno', wM, S);
  const x0 = mr.l + pad, topp = Math.max(mr.asc, mb.asc), base = topp + pad;
  let inn = bokstaver('raw', 'meno', wM, S, x0, base, f.raw), defs = '', hoyre, bunn = base + mb.desc;
  if (type === 'paskrift') {
    const sL = S * .34, gap = sL * .34, capH = mt('B', 'futura', 500, sL).asc, q = capH * .62; let x = x0 + mr.adv + S * .13;
    inn += `<rect class="o-px t" x="${x.toFixed(1)}" y="${(base - q).toFixed(1)}" width="${q.toFixed(1)}" height="${q.toFixed(1)}" fill="${f.px}"/>`; x += q + gap * 1.5;
    for (const c of 'BYTE') { inn += T(c, 'futura', 500, sL, x, base, f.byte, 'bk lb t'); x += mt(c, 'futura', 500, sL).adv + gap; }
    hoyre = x - gap; bunn = base + 4;
  } else {
    const xB = x0 + mr.adv + S * (o.gap ?? .012), b = { w: wF, s: sB, x: xB, y: base }; hoyre = xB + mb.r;
    let byte = bokstaver('byte', 'futura', wF, sB, xB, base, f.byte);
    if (type === 'hale') { const h = K.hale(b), id = R.uid();
      defs = `<mask id="${id}" maskUnits="userSpaceOnUse" x="0" y="0" width="${(hoyre + 80).toFixed(0)}" height="${(bunn + 20).toFixed(0)}"><rect width="${(hoyre + 80).toFixed(0)}" height="${(bunn + 20).toFixed(0)}" fill="#fff"/><rect class="o-bt" style="transform-box:fill-box;transform-origin:100% 50%" x="${h.kutt.toFixed(1)}" y="${(h.yT - 3).toFixed(1)}" width="${(h.tip - h.kutt + 8).toFixed(1)}" height="${(h.bunn - h.yT + 6).toFixed(1)}" fill="#000"/></mask>`;
      byte = `<g mask="url(#${id})">${byte}</g><rect class="o-px t" data-dx="${(h.kutt - h.px).toFixed(1)}" data-dy="${(h.yT - h.py).toFixed(1)}" x="${h.px.toFixed(1)}" y="${h.py.toFixed(1)}" width="${h.p.toFixed(1)}" height="${h.p.toFixed(1)}" fill="${f.px}"/>`; hoyre = h.px + h.p; }
    if (type === 'punktum') { const q = xhp * .3; byte += `<rect class="o-px t" x="${(hoyre + q * .5).toFixed(1)}" y="${(base - q).toFixed(1)}" width="${q.toFixed(1)}" height="${q.toFixed(1)}" fill="${f.px}"/>`; hoyre += q * 1.5; }
    if (type === 'markor') { const w = xhp * .4; byte += `<rect class="o-px o-mark" x="${(hoyre + xhp * .16).toFixed(1)}" y="${(base - xhp * 1.02).toFixed(1)}" width="${w.toFixed(1)}" height="${(xhp * 1.02).toFixed(1)}" fill="${f.px}"/>`; hoyre += xhp * .16 + w; }
    if (type === 'opp') { const q = xhp * .26; byte += `<rect class="o-px t" x="${(hoyre + q * .35).toFixed(1)}" y="${(base - xhp - q * .75).toFixed(1)}" width="${q.toFixed(1)}" height="${q.toFixed(1)}" fill="${f.px}"/>`; hoyre += q * 1.35; }
    inn += byte;
  }
  const W = hoyre + pad, H = bunn + pad;
  return `<svg class="ord" data-type="${type}" viewBox="0 0 ${W.toFixed(0)} ${H.toFixed(0)}" style="height:${(H / S).toFixed(3)}em;width:auto;vertical-align:${(-(H - base) / S).toFixed(3)}em" xmlns="http://www.w3.org/2000/svg">${defs ? `<defs>${defs}</defs>` : ''}${inn}</svg>`;
};
/* Ordmerket inn: bokstavene blendes inn (som i 16), så pikseldetaljen */
K.ordInn = (el, d = 0) => { if (!el) return; const type = el.dataset.type;
  a(el, '.bk', [{ opacity: 0, filter: 'blur(12px)', transform: 'scale(1.25)' }, { opacity: 1, filter: 'blur(0)', transform: 'none' }], { d: 850, delay: d, stagger: 50 });
  const etter = d + 7 * 50 + 500, px = el.querySelector('.o-px'); if (!px) return;
  if (type === 'hale') { a(el, '.o-bt', [{ transform: 'scaleX(0)' }, { transform: 'scaleX(0)', offset: .02 }, { transform: 'none' }], { d: 120, delay: etter, e: 'steps(2)' });
    a(el, px, [{ transform: `translate(${px.dataset.dx}px,${px.dataset.dy}px)`, opacity: 0 }, { transform: `translate(${px.dataset.dx}px,${px.dataset.dy}px)`, opacity: 1, offset: .08 }, { transform: 'translate(4px,-10px)', opacity: 1, offset: .6, easing: E.inn }, { transform: 'none', opacity: 1 }], { d: 520, delay: etter, e: E.ut }); }
  else if (type === 'markor') a(el, px, [{ opacity: 0 }, { opacity: 1, offset: .12 }, { opacity: 0, offset: .37 }, { opacity: 1, offset: .62 }, { opacity: 0, offset: .82 }, { opacity: 1 }], { d: 1500, delay: etter - 200, e: 'steps(1)' });
  else if (type === 'paskrift') a(el, px, [{ transform: 'scale(0)' }, { transform: 'scale(1.4)', offset: .6 }, { transform: 'none' }], { d: 380, delay: d + 250, e: 'steps(3)' });
  else a(el, px, [{ transform: 'translateY(-90px)', opacity: 0, easing: E.inn }, { transform: 'none', opacity: 1, offset: .55, easing: E.ut }, { transform: 'translateY(-16px)', offset: .78, easing: E.inn }, { transform: 'none', opacity: 1 }], { d: 620, delay: etter - 150 });
};

/* ── Bruksflatene ── */
/* Naboikoner: nøytrale tegn (mappe, klode, notat, kamera, snakkeboble, ledetekst, kalender) — ingen ekte apper */
const NABO = [
  `<svg viewBox="0 0 24 24"><path d="M2 7a2 2 0 0 1 2-2h5l2 2h9a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2z" fill="#e9b949"/><path d="M2 10h20v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2z" fill="#f6d57a"/></svg>`,
  `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#4f8fe6"/><path d="M2.5 12h19M12 2.5c3.2 3 3.2 16 0 19M12 2.5c-3.2 3-3.2 16 0 19" stroke="#fff" stroke-width="1.5" fill="none" opacity=".9"/></svg>`,
  `<svg viewBox="0 0 24 24"><rect x="3" y="2" width="18" height="20" rx="4" fill="#8b6cf0"/><path d="M7.5 8h9M7.5 12h9M7.5 16h5.5" stroke="#fff" stroke-width="1.9" stroke-linecap="round"/></svg>`,
  `<svg viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="15" rx="4" fill="#e2607a"/><rect x="8" y="3" width="8" height="4" rx="1.5" fill="#e2607a"/><circle cx="12" cy="12.5" r="4.4" fill="#fff"/><circle cx="12" cy="12.5" r="2.2" fill="#e2607a"/></svg>`,
  `<svg viewBox="0 0 24 24"><path d="M4 4h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-8l-5 4v-4H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" fill="#3fb37a"/><circle cx="8" cy="10.5" r="1.3" fill="#fff"/><circle cx="12" cy="10.5" r="1.3" fill="#fff"/><circle cx="16" cy="10.5" r="1.3" fill="#fff"/></svg>`,
  `<svg viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="18" rx="4" fill="#111827"/><path d="M6.5 9.5l3 2.5-3 2.5M11.5 15h5" stroke="#e5e7eb" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  `<svg viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="19" rx="4" fill="#f08a3c"/><rect x="2" y="3" width="20" height="6" rx="3" fill="#d96f22"/><path d="M7 13h2.5M11 13h2.5M15 13h2.5M7 17h2.5M11 17h2.5" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>`,
];
K.mockBar = (k, v) => { const rad = (cls) => `<div class="tb ${cls}"><i class="tb-start"></i>${NABO.slice(0, 4).map(n => `<span class="tb-i">${n}</span>`).join('')}<span class="tb-i tb-vaar">${K.ikon(k, v, 28)}</span>${NABO.slice(4).map(n => `<span class="tb-i">${n}</span>`).join('')}<em>14:32</em></div>`;
  return `<figure class="mock m-bar"><figcaption>Oppgavelinja</figcaption>${rad('mork')}${rad('lys')}
    <div class="tb mork tb-stor"><span class="tb-i">${NABO[2]}</span><span class="tb-i">${NABO[3]}</span><span class="tb-i tb-vaar">${K.ikon(k, v, 56)}</span><span class="tb-i">${NABO[4]}</span><span class="tb-i">${NABO[5]}</span><em>200 %</em></div>
    <div class="str">${[64, 48, 32, 24, 16].map(p => `<span>${K.ikon(k, v, p)}<i>${p}</i></span>`).join('')}</div></figure>`; };
K.mockSplash = (k, v) => { const t = TEMA[v.tema], sc = t.scene, bg = sc === 'mork' ? 'radial-gradient(120% 120% at 30% 10%,#1f3d32,#0f1d16)' : sc === 'sand' ? 'linear-gradient(160deg,#f7f2ec,#e6dcd1)' : 'linear-gradient(160deg,#faf7f3,#ece6de)';
  return `<figure class="mock m-splash"><figcaption>App-oppstart</figcaption><div class="vindu" style="background:${bg};color:${sc === 'mork' ? C.krem : C.blekk}">
    <div class="v-tittel"><span>Rawbyte</span><i></i><i></i><i></i></div>
    <div class="v-midt"><div class="sp-ikon">${K.ikon(k, v, 0)}</div><div class="sp-ord">${K.ord(k.ordType(v), K.ORDF[sc](t))}</div><div class="endo">by <b>raw studios</b></div><div class="sp-linje"><i style="background:${sc === 'mork' ? C.mint : C.gronn}"></i></div></div></div></figure>`; };
K.mockNett = (k, v) => `<figure class="mock m-nett"><figcaption>Nettside</figcaption><div class="nettleser">
    <div class="n-faner"><span class="n-fane">${K.ikon(k, v, 16)}Rawbyte · Skapet</span><span class="n-url">rawbyte.no</span></div>
    <div class="n-side"><div class="n-nav"><span class="n-logo">${k.symbol ? K.ikon(k, v, 26) : ''}${K.ord(k.ordType(v), K.ORDF.sand())}</span><span>Skapet</span><span>Studio</span><span>Priser</span><b>Logg inn</b></div>
    <div class="n-hero"><h3>Alt du har laget.<br>På ett sted.</h3><p>Bilder, video og samtykker, ordnet og klart til å deles.</p><u>Kom i gang</u></div></div></div></figure>`;
K.mockMobil = (k, v) => `<figure class="mock m-mobil"><figcaption>Mobil</figcaption><div class="tlf"><div class="tlf-tid">14:32</div><div class="tlf-rute">
    ${[0, 1, 2].map(i => `<span><b>${NABO[i]}</b><i>${['Filer', 'Nett', 'Notat'][i]}</i></span>`).join('')}<span class="vaar"><b>${K.ikon(k, v, 0)}</b><i>Rawbyte</i></span>
    ${[3, 4, 5, 6].map(i => `<span><b>${NABO[i]}</b><i>${['Kamera', 'Meldinger', 'Kode', 'Kalender'][i - 3]}</i></span>`).join('')}</div></div></figure>`;
})();
