/* Runde 8 · 125–132: videre fra 61 og 70. «raw» over «byte», og «raw» er alltid Meno Banner Black (samme skrift og vekt som Raw Studios-logoen).
   To oppsett: «midt» (tett og midtstilt, som 61/70) og «rs» (venstrestilt med samme linjeavstand som Raw Studios-logoen).
   Bygger på RB (motor.js), PM (runde4-meno.js) og R7 (runde7-kjerne.js: flis, tema, bruksflater). */
window.RB8 = () => {
const K = R7, { C, TEMA } = K, a = RB.a, E = RB.E;
const K8 = window.R8 = { konsepter: [], tema: 'tofarget', logoOppsett: 'rs' };
/* Linjeavstand (grunnlinje til grunnlinje) i x-høyder. Raw Studios-logoen: målt i logo-fila (83,26 / 28,17). */
const LED_RS = 2.955, LED_TETT = 1.87;
const MENO = { fam: 'meno', w: 900 };

/* ── Presis måling: pikselskann av ekte glyfer (canvas sine høydemål er for grove) ── */
const F = 400, OX = 300, OY = 700, NW = 1900, NH = 1000;
const cv = document.createElement('canvas'); cv.width = NW; cv.height = NH;
const cx = cv.getContext('2d', { willReadFrequently: true });
const fnt = (f, s) => `${f.st || 'normal'} ${f.w} ${s}px ${PM.FAM[f.fam]}`;
const adv = (t, f) => { cx.font = fnt(f, 1000); return cx.measureText(t).width / 1000; };
/* Hvor hver bokstav starter (em), med kerning og eventuell sperring */
/* «raw» i Raw Studios-logoen er sperret for hånd. Venstre blekkant per bokstav, målt i logo-fila (x-høyde 28,17): r 0 · a 26,9 · w 54 */
const RS_RAW = [0, 26.9, 54], RS_XH = 28.17;
const pos = (t, f) => { if (t === 'raw' && f.fam === 'meno' && f.w === 900 && !f.st) { const n = 'rawpos'; if (buf[n]) return buf[n];
    const k = xh(f) / RS_XH, l = c => blekk(c, f).l; return buf[n] = [...t].map((c, i) => l('r') + RS_RAW[i] * k - l(c)); }
  return [...t].map((c, i) => adv(t.slice(0, i + 1), f) - adv(c, f) + i * (f.spr || 0)); };
const buf = {};
const tegnOrd = (t, f) => { const p = pos(t, f); cx.clearRect(0, 0, NW, NH); cx.font = fnt(f, F); cx.fillStyle = '#000'; [...t].forEach((c, i) => cx.fillText(c, OX + p[i] * F, OY)); return cx.getImageData(0, 0, NW, NH).data; };
/* Blekket til et ord i em fra origo (y negativ oppover) */
const blekk = (t, f) => { const n = ['b', t, f.fam, f.w, f.st, f.spr].join('|'); if (buf[n]) return buf[n];
  const d = tegnOrd(t, f); let L = NW, R = 0, T = NH, B = 0;
  for (let y = 0; y < NH; y++) for (let x = 0; x < NW; x++) if (d[(y * NW + x) * 4 + 3] > 128) { if (x < L) L = x; if (x > R) R = x; if (y < T) T = y; if (y > B) B = y; }
  return buf[n] = { l: (L - OX) / F, r: (R + 1 - OX) / F, t: (T - OY) / F, b: (B + 1 - OY) / F }; };
const xh = f => -blekk('x', { ...f, spr: 0 }).t;
const capH = f => -blekk('H', { ...f, spr: 0 }).t;
/* Venstre kant av stammen (ikke serifen): brukes til optisk venstrejustering */
const stamme = (c, f, hoyde) => { const n = ['s', c, f.fam, f.w, f.st].join('|'); if (n in buf) return buf[n];
  const d = tegnOrd(c, f), y = Math.round(OY - hoyde * .45 * F); let x = 0; while (x < NW && d[(y * NW + x) * 4 + 3] <= 128) x++; return buf[n] = (x - OX) / F; };

/* Versaler sperres så «BYTE» blir nøyaktig like bred som «raw» */
const klar = v => { const f = v.byte; if (f.caps && f.spr == null) { const r = blekk('raw', MENO), kb = xh(MENO) / capH(f), w0 = blekk('BYTE', { ...f, spr: 0 }); f.spr = ((r.r - r.l) / kb - (w0.r - w0.l)) / 3; } return f; };

/* Plassering i 512-rommet. Alt regnes i em av «raw» (skriftstørrelse 1), og skaleres så blekket fyller boksen. */
const geo = (v, o = {}) => {
  const opp = o.oppsett || 'midt', fb = klar(v), tB = fb.caps ? 'BYTE' : 'byte', xM = xh(MENO);
  const kb = fb.caps ? xM / capH(fb) : xM / xh(fb);              /* «byte» settes så x-høyden (eller versalhøyden) møter Menos */
  const r = blekk('raw', MENO), bb = blekk(tB, fb), b = { l: bb.l * kb, r: bb.r * kb, t: bb.t * kb, b: bb.b * kb };
  const led = (opp === 'rs' ? (v.luft ?? LED_RS) : (v.tett ?? LED_TETT)) * xM;
  const xb = opp === 'rs' ? stamme('r', MENO, xM) - stamme(tB[0], fb, fb.caps ? capH(fb) : xh(fb)) * kb : (r.l + r.r) / 2 - (b.l + b.r) / 2;
  const L = Math.min(r.l, xb + b.l), H = Math.max(r.r, xb + b.r), topp = r.t, bunn = led + b.b, bunnO = led + b.b * (b.b > .06 ? .55 : 1);
  const sk = Math.min((o.maxB ?? 340) / (H - L), (o.maxH ?? 336) / (bunn - topp));
  const dx = (o.cx ?? 256) - (L + H) / 2 * sk, dy = (o.cy ?? 256) - (topp + bunnO) / 2 * sk;
  const raw = { t: 'raw', f: MENO, s: sk, x: dx, y: dy, bl: r }, byte = { t: tB, f: fb, s: sk * kb, x: dx + xb * sk, y: dy + led * sk, bl: bb };
  return { sk, raw, byte, xh: xM * sk, celle: Math.max(5, Math.round(xM * sk * .168)), boks: [dx + L * sk, dy + topp * sk, dx + H * sk, dy + bunn * sk], midt: dy + (led + b.t) / 2 * sk + r.b * sk / 2 };
};

/* ── Tegning ── */
const tekst = (p, fill, cls = 'bk t') => { const ps = pos(p.t, p.f);
  return [...p.t].map((c, i) => `<text class="${cls}" x="${(p.x + ps[i] * p.s).toFixed(1)}" y="${p.y.toFixed(1)}" font-family='${PM.FAM[p.f.fam]}' font-weight="${p.f.w}" font-style="${p.f.st || 'normal'}" font-size="${p.s.toFixed(1)}" fill="${fill}">${c}</text>`).join(''); };
/* Mosaikk av den ekte skrifta (som 61): PM vil ha plasseringen i sitt eget format */
const pl = p => ({ tekst: p.t, fam: p.f.fam, w: p.f.w, st: p.f.st || 'normal', s: p.s, x: p.x, y: p.y, boks: [p.x + p.bl.l * p.s, p.y + p.bl.t * p.s, p.x + p.bl.r * p.s, p.y + p.bl.b * p.s] });
const tegn = (u, v, g, f, o = {}) => {
  const skarp = !v.piksel || o.skarp, bunn = g.boks[3] + 8;
  const rawS = tekst(g.raw, f.raw), byteS = skarp ? tekst(g.byte, f.byte) : PM.mosaikk(pl(g.byte), g.celle, { fill: f.byte, kontrast: true });
  if (o.klipp === false) return `<g class="l1">${rawS}</g><g class="l2${skarp ? '' : ' mos'}">${byteS}</g>`;
  return `<defs><clipPath id="${u}a"><rect x="-100" y="-100" width="712" height="${(g.midt + 100).toFixed(1)}"/></clipPath><clipPath id="${u}b"><rect x="-100" y="${g.midt.toFixed(1)}" width="712" height="${(bunn - g.midt).toFixed(1)}"/></clipPath></defs>
    <g clip-path="url(#${u}a)"><g class="l1" data-h="${(g.midt - g.boks[1] + 12).toFixed(0)}">${rawS}</g></g>
    <g clip-path="url(#${u}b)"><g class="l2${skarp ? '' : ' mos'}" data-h="${(bunn - g.midt + 6).toFixed(0)}">${byteS}</g></g>`;
};
const fg = (u, tema, o) => `<g class="fg t">${K.flis(u, tema, o)}</g>`;
const toF = t => ({ raw: t.raw, byte: t.byte });
/* 16 px: to linjer blir uleselige, så der står en Meno-r og én piksel */
const mikro = (u, o) => { const t = TEMA[K8.tema], r = blekk('r', MENO), xM = xh(MENO), sk = 262 / xM, q = xM * .36 * sk, tot = (r.r - r.l) * sk + q * 1.4, x = 256 - tot / 2 - r.l * sk, y = 256 + 131;
  return `${fg(u, K8.tema, o)}${tekst({ t: 'r', f: MENO, s: sk, x, y }, t.raw)}<rect x="${(x + r.r * sk + q * .4).toFixed(1)}" y="${(y - q).toFixed(1)}" width="${q.toFixed(1)}" height="${q.toFixed(1)}" fill="${t.byte !== t.raw ? t.byte : t.px}"/>`; };
const ikon = (u, o, v) => { if (o.px <= 20) return mikro(u, o); const g = geo(v, { oppsett: o.oppsett || 'midt' });
  return fg(u, K8.tema, o) + tegn(u, v, g, toF(TEMA[K8.tema]), { skarp: o.px <= 40 }); };
K8.ikonSvg = (k, v, o = {}) => K.svg(ikon(RB.uid(), { px: 512, ...o }, v), o.vis || 0);

/* Logoen: samme tegning uten flis, beskåret til blekket. 1em = skriftstørrelsen til «raw», så x-høyden er lik i alle logoer på sida. */
K8.logo = (v, f, o = {}) => { const g = geo(v, { maxB: 430, maxH: 440, oppsett: o.oppsett || K8.logoOppsett }), [x0, y0, x1, y1] = g.boks;
  return `<svg class="logo8" viewBox="${x0.toFixed(1)} ${y0.toFixed(1)} ${(x1 - x0).toFixed(1)} ${(y1 - y0).toFixed(1)}" style="width:${((x1 - x0) / g.sk).toFixed(3)}em;height:${((y1 - y0) / g.sk).toFixed(3)}em" xmlns="http://www.w3.org/2000/svg">${tegn(RB.uid(), v, g, f, { klipp: false, skarp: o.skarp })}</svg>`; };
K8.logoInn = (el, d = 0) => { if (!el) return;
  a(el, '.bk', [{ opacity: 0, filter: 'blur(12px)', transform: 'scale(1.25)' }, { opacity: 1, filter: 'blur(0)', transform: 'none' }], { d: 850, delay: d, stagger: 55 });
  a(el, '.mp', [{ opacity: 0, transform: 'scale(.2)' }, { opacity: 1, transform: 'none' }], { d: 260, delay: d + 250, stagger: () => Math.random() * 700, e: E.ut }); };

/* Ikonet inn: rene varianter løftes inn linje for linje bak en kant (som 70), pikslede popper inn som et bilde som laster (som 61) */
const spill = s => { a(s, '.fg', [{ transform: 'scale(.8)', opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 600, e: E.fjaer });
  const l1 = s.querySelector('.l1'), l2 = s.querySelector('.l2'); if (!l1) return;
  if (l2.classList.contains('mos')) {
    a(s, l1, [{ transform: 'translateY(40px)', opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 700, delay: 200, e: E.ut });
    a(s, '.mp', [{ opacity: 0, transform: 'scale(.2)' }, { opacity: 1, transform: 'none' }], { d: 260, delay: 500, stagger: () => Math.random() * 700, e: E.ut });
  } else {
    a(s, l1, [{ transform: `translateY(${l1.dataset.h}px)` }, { transform: 'none' }], { d: 900, delay: 250, e: E.ut });
    a(s, l2, [{ transform: `translateY(${l2.dataset.h}px)` }, { transform: 'none' }], { d: 900, delay: 400, e: E.ut });
  } };

/* ═══ Spor 1 · Begge i Meno ═══ */
K8.konsepter.push({ id: 'meno', navn: 'Begge i Meno', ikon, spill,
  ide: 'Begge linjene i Meno Banner Black. Det er samme skrift og samme vekt som i Raw Studios-logoen, så «raw» er bokstavelig talt det samme ordet. Der logoen har «studios», har denne «byte».',
  skille: 'Variantene skiller «byte» fra «raw» på fire måter: bare farge, piksler, vekt og kursiv.',
  varianter: [
    { nr: 125, navn: 'Ren', byte: { fam: 'meno', w: 900 }, notat: 'Forslag 70, tegnet rent. Samme skrift og størrelse på begge linjer, og bare fargen skiller ordene.' },
    { nr: 126, navn: 'Pikslet byte', tett: 1.98, piksel: true, byte: { fam: 'meno', w: 900 }, notat: 'Forslag 61, tegnet rent. «byte» er Meno i lav oppløsning. Under 40 px tegnes ordet skarpt, for så smått blir pikslene bare uskarphet.' },
    { nr: 127, navn: 'Lett byte', byte: { fam: 'meno', w: 300 }, notat: '«raw» i Black og «byte» i Light. Vekta skiller ordene, så logoen tåler én farge. «byte» blir tynn under 32 px.' },
    { nr: 128, navn: 'Kursiv byte', byte: { fam: 'meno', w: 400, st: 'italic' }, notat: '«byte» i Menos kursiv. Mykere og mer redaksjonelt. Også denne blir tynn under 32 px.' }] });

/* ═══ Spor 2 · byte i Futura ═══ */
K8.konsepter.push({ id: 'futura', navn: 'byte i Futura', ikon, spill,
  ide: '«raw» i Meno som før, og «byte» i Futura PT, satt slik at x-høyden er lik. Serif over grotesk: håndverket øverst og det digitale under.',
  skille: 'Variantene prøver Futura i to vekter, som piksler og i versaler.',
  varianter: [
    { nr: 129, navn: 'Futura Demi', tett: 1.82, byte: { fam: 'futura', w: 600 }, notat: 'Halvfet Futura med samme x-høyde som Meno. Tydelig forskjell på ordene, også i én farge.' },
    { nr: 130, navn: 'Pikslet Futura', tett: 1.98, piksel: true, byte: { fam: 'futura', w: 600 }, notat: 'Som 61, men pikslene er laget av Futura. De rene formene tåler lav oppløsning bedre enn serifene.' },
    { nr: 131, navn: 'Futura Book', tett: 1.82, byte: { fam: 'futura', w: 400 }, notat: 'Lett Futura under tung Meno. Mest kontrast mellom linjene, men «byte» blir svak når ikonet er lite.' },
    { nr: 132, navn: 'Versaler', tett: 1.52, luft: 2.5, byte: { fam: 'futura', w: 600, caps: true }, notat: '«BYTE» i versaler, sperret til nøyaktig samme bredde som «raw». Ingen over- eller underlengder, så blokka blir en ren firkant.' }] });
};
