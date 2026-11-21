/* Runde 7 · 5 konsepter × 4 varianter (105–124). «raw» i Meno, «byte» i Futura, pikselen diskré. */
window.RB7 = () => {
const K = R7, { C, TEMA, mt, xh, T, stabel, hale } = K, a = RB.a, E = RB.E;
const fg = (u, tema, o) => `<g class="fg t">${K.flis(u, tema, o)}</g>`;
const rect = (cls, x, y, w, h, fill, attr = '') => `<rect class="${cls}" x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${w.toFixed(1)}" height="${h.toFixed(1)}" fill="${fill}" ${attr}/>`;
const flisInn = s => a(s, '.fg', [{ transform: 'scale(.8)', opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 600, e: E.fjaer });
const pikselFall = (s, sel, d) => a(s, sel, [{ transform: 'translateY(-300px)', opacity: 0, easing: E.inn }, { transform: 'none', opacity: 1, offset: .55, easing: E.ut }, { transform: 'translateY(-26px)', offset: .76, easing: E.inn }, { transform: 'none', opacity: 1 }], { d: 700, delay: d });

/* «raw» i Meno 900, blekket midtstilt om (cx, cy på x-høyden), med gitt blekkbredde */
const raw = (bredde, cx, cy, w = 900) => { const m = mt('raw', 'meno', w, 100), xhU = xh('meno', w, 100), sk = bredde / (m.l + m.r);
  return { s: 100 * sk, x: cx - bredde / 2 + m.l * sk, y: cy + xhU * sk / 2, xh: xhU * sk, v: cx - bredde / 2, h: cx + bredde / 2 }; };
const rawT = (p, fill, cls = '') => T('raw', 'meno', 900, p.s, p.x, p.y, fill, cls);
/* 16 px: en Meno-r og pikselen */
const mikro = (u, o, v) => { const t = TEMA[v.tema], m = mt('r', 'meno', 900, 100), xhU = xh('meno', 900, 100), sk = 262 / xhU, q = xhU * .36 * sk, tot = (m.l + m.r) * sk + q * 1.4, x = 256 - tot / 2 + m.l * sk, y = 256 + 131;
  return `${fg(u, v.tema, o)}${T('r', 'meno', 900, 100 * sk, x, y, t.raw)}${rect('px', x + m.r * sk + q * .4, y - q, q, q, t.px)}`; };

/* ═══ Konsept 1 · Stablet ═══ */
K.konsepter.push({ id: 'k1', navn: 'Stablet', ordType: () => 'hale',
  ide: '«raw» over «byte», bygd som Raw Studios-logoen: «raw» i Meno og andre linje under. Der Raw Studios har «studios», har Rawbyte «byte» i Futura. Linjene står på samme stammekant og har samme x-høyde.',
  piksel: 'Halen på e-en har løsnet og blitt til én piksel. Byte ≈ bite, så vidt.',
  varianter: [
    { nr: 105, navn: 'Venstrestilt', tema: 'gronn', venstre: true, notat: 'Nærmest Raw Studios-logoen. Krem på skoggrønt, mint piksel.' },
    { nr: 106, navn: 'Tofarget', tema: 'tofarget', venstre: false, notat: 'Midtstilt, med «byte» i mint. Skiller ordene også når ikonet er lite.' },
    { nr: 107, navn: 'Lys', tema: 'krem', venstre: true, notat: 'Krem flis med grønn skrift. Skiller seg ut blant mørke og fargesterke ikoner.' },
    { nr: 108, navn: 'Natt', tema: 'blekk', venstre: true, notat: 'Nesten svart med lysende grønn piksel. Til mørk modus og video.' }],
  ikon(u, o, v) { if (o.px <= 20) return mikro(u, o, v); const t = TEMA[v.tema], st = stabel({ venstre: v.venstre, bredde: 318, cx: v.venstre ? 252 : 256, cy: 258 }), h = hale(st.b), midt = (st.r.y + st.toppB) / 2;
    return `${fg(u, v.tema, o)}<defs><clipPath id="${u}a"><rect width="512" height="${midt.toFixed(1)}"/></clipPath><clipPath id="${u}b"><rect y="${midt.toFixed(1)}" width="512" height="${(st.bunnB + 6 - midt).toFixed(1)}"/></clipPath>
      <mask id="${u}m" maskUnits="userSpaceOnUse" x="0" y="0" width="512" height="512"><rect width="512" height="512" fill="#fff"/>${rect('bt', h.kutt, h.yT - 2, h.tip - h.kutt + 6, h.bunn - h.yT + 4, '#000', 'style="transform-box:fill-box;transform-origin:100% 50%"')}</mask></defs>
      <g clip-path="url(#${u}a)"><g class="l1" data-h="${(st.xh * 1.5).toFixed(0)}">${T('raw', 'meno', st.r.w, st.r.s, st.r.x, st.r.y, t.raw)}</g></g>
      <g clip-path="url(#${u}b)"><g class="l2" data-h="${(st.bunnB - midt + 10).toFixed(0)}"><g mask="url(#${u}m)">${T('byte', 'futura', st.b.w, st.b.s, st.b.x, st.b.y, t.byte)}</g>${rect('px t', h.px, h.py, h.p, h.p, t.px, `data-dx="${(h.kutt - h.px).toFixed(1)}" data-dy="${(h.yT - h.py).toFixed(1)}"`)}</g></g>`; },
  spill(s) { flisInn(s); const l1 = s.querySelector('.l1'), l2 = s.querySelector('.l2'), px = s.querySelector('.px'); if (!l1) return;
    a(s, l1, [{ transform: `translateY(${l1.dataset.h}px)` }, { transform: 'none' }], { d: 900, delay: 250, e: E.ut });
    a(s, l2, [{ transform: `translateY(${l2.dataset.h}px)` }, { transform: 'none' }], { d: 900, delay: 400, e: E.ut });
    a(s, '.bt', [{ transform: 'scaleX(0)' }, { transform: 'scaleX(0)', offset: .02 }, { transform: 'none' }], { d: 120, delay: 1350, e: 'steps(2)' });
    a(s, px, [{ transform: `translate(${px.dataset.dx}px,${px.dataset.dy}px)`, opacity: 0 }, { transform: `translate(${px.dataset.dx}px,${px.dataset.dy}px)`, opacity: 1, offset: .08 }, { transform: 'translate(5px,-14px)', opacity: 1, offset: .6, easing: E.inn }, { transform: 'none', opacity: 1 }], { d: 560, delay: 1350, e: E.ut }); } });

/* ═══ Konsept 2 · raw + piksel ═══ */
const k2geo = (v) => { const m = mt('raw', 'meno', 900, 100), xhU = xh('meno', 900, 100), mk = v.markor, pw = (mk ? .4 : .3) * xhU, ph = (mk ? 1.02 : .3) * xhU, gap = (mk ? .16 : .15) * xhU, tot = m.l + m.r + gap + pw, sk = 336 / tot;
  return { s: 100 * sk, x: 256 - tot * sk / 2 + m.l * sk, y: 256 + xhU * sk / 2, px: 256 - tot * sk / 2 + (m.l + m.r + gap) * sk, pw: pw * sk, ph: ph * sk, xh: xhU * sk }; };
K.konsepter.push({ id: 'k2', navn: 'raw + piksel', ordType: v => v.markor ? 'markor' : 'punktum',
  ide: 'Ikonet er bare «raw» i tung Meno, det samme ordet som i Raw Studios-logoen, fulgt av én firkantet piksel. Pikselen <i>er</i> byten. I ordmerket står hele navnet, og pikselen avslutter det.',
  piksel: 'Ett firkantet punktum. Det kan leve alene som lasteprikk, varselprikk og markør i appen.',
  varianter: [
    { nr: 109, navn: 'Punktum', tema: 'gronn', notat: 'Krem «raw» og mint piksel på skoggrønt. Roligst og mest i slekt med Raw Studios.' },
    { nr: 110, navn: 'Lys', tema: 'krem', notat: 'Grønn skrift på krem. Pikselen i en mørkere mint, så den holder kontrasten.' },
    { nr: 111, navn: 'Mint', tema: 'dyp', notat: 'Mint skrift på dyp grønn, med krem piksel. Mest «skjerm» av variantene.' },
    { nr: 112, navn: 'Markøren', tema: 'blekk', markor: true, notat: 'Pikselen er blitt en blinkende markør. Sier at Rawbyte lytter (søk, Rawbot).' }],
  ikon(u, o, v) { if (o.px <= 20) return mikro(u, o, v); const t = TEMA[v.tema], g = k2geo(v);
    return `${fg(u, v.tema, o)}<g class="rw t">${T('raw', 'meno', 900, g.s, g.x, g.y, t.raw)}</g>${rect('px t', g.px, g.y - g.ph, g.pw, g.ph, t.px)}`; },
  spill(s, v) { flisInn(s); a(s, '.rw', [{ transform: 'translateY(46px)', opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 800, delay: 250, e: E.ut });
    if (v.markor) a(s, '.px', [{ opacity: 0 }, { opacity: 0, offset: .3 }, { opacity: 1, offset: .3 }, { opacity: 1, offset: .5 }, { opacity: 0, offset: .5 }, { opacity: 0, offset: .65 }, { opacity: 1, offset: .65 }, { opacity: 1, offset: .82 }, { opacity: 0, offset: .82 }, { opacity: 0, offset: .92 }, { opacity: 1, offset: .92 }, { opacity: 1 }], { d: 2600, delay: 300, e: E.lin });
    else pikselFall(s, '.px', 800); } });

/* ═══ Konsept 3 · Symbolet ═══ */
const SYM = {
  biten(u, t) { const c = 58, X = 400, Y = 112;
    return `<defs><mask id="${u}m" maskUnits="userSpaceOnUse" x="0" y="0" width="512" height="512"><rect width="512" height="512" fill="#fff"/>${rect('bt', X - 2 * c, Y - 14, 2 * c + 14, c + 14, '#000', 'style="transform-box:fill-box;transform-origin:100% 0"')}${rect('bt', X - c, Y + c - 1, c + 14, c + 1, '#000', 'style="transform-box:fill-box;transform-origin:100% 0"')}</mask>
      <linearGradient id="${u}k" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fbf8f4"/><stop offset="1" stop-color="#ebe3da"/></linearGradient></defs>
      <g mask="url(#${u}m)"><rect class="form t" x="${X - 288}" y="${Y}" width="288" height="288" rx="66" fill="url(#${u}k)"/></g>
      ${rect('px t', X - c + 13, Y + 9, 36, 36, t.px)}${rect('px t', X + 16, Y - 30, 20, 20, t.px)}`; },
  halv(u, t) { const r = 150, c = r / 4, cx = 256, cy = 256; let px = '';
    for (let j = 0; j < 8; j++) for (let i = 0; i < 4; i++) { const x = cx + i * c, y = cy - r + j * c; if (Math.hypot(x + c / 2 - cx, y + c / 2 - cy) < r + c * .12) px += rect('hp t', x - .5, y - .5, c + 1.5, c + 1.5, C.mint, `shape-rendering="crispEdges" data-d="${(i * 60 + Math.abs(j - 3.5) * 30).toFixed(0)}"`); }
    return `<path class="form" d="M${cx + .5},${cy - r} A${r},${r} 0 0 0 ${cx + .5},${cy + r} Z" fill="${C.krem}" style="transform-box:fill-box;transform-origin:100% 50%"/>${px}${rect('px t', cx + 3 * c + 12, cy - r - 10, c - 2, c - 2, C.mint)}`; },
  ramme(u, t) { const a0 = 108, a1 = 404, w = 50, c = w;
    return `<path class="form t" fill="${C.krem}" fill-rule="evenodd" d="M${a0 + 56},${a0} H${a1 - c} V${a0 + c} H${a1} V${a1 - 56} Q${a1},${a1} ${a1 - 56},${a1} H${a0 + 56} Q${a0},${a1} ${a0},${a1 - 56} V${a0 + 56} Q${a0},${a0} ${a0 + 56},${a0} Z M${a0 + w + 14},${a0 + w} H${a1 - w} V${a1 - w - 14} Q${a1 - w},${a1 - w} ${a1 - w - 14},${a1 - w} H${a0 + w + 14} Q${a0 + w},${a1 - w} ${a0 + w},${a1 - w - 14} V${a0 + w + 14} Q${a0 + w},${a0 + w} ${a0 + w + 14},${a0 + w} Z"/>
      ${rect('px t', a1 - c + 18, a0 - 18, c - 4, c - 4, t.px, `data-dx="-18" data-dy="18"`)}`; },
  par(u, t) { return `<defs><clipPath id="${u}c"><circle cx="212" cy="226" r="124"/></clipPath></defs><circle class="form" cx="212" cy="226" r="124" fill="${C.krem}" style="transform-box:fill-box;transform-origin:50% 50%"/>
      <rect class="px kv" x="232" y="212" width="186" height="186" fill="${C.mint}" style="transform-box:fill-box;transform-origin:50% 50%"/><g clip-path="url(#${u}c)"><rect class="snitt" x="232" y="212" width="186" height="186" fill="${C.gronnMork}"/></g>`; },
};
K.konsepter.push({ id: 'k3', navn: 'Symbolet', symbol: true, ordType: () => 'ren',
  ide: 'Et tegn uten bokstaver, som står foran ordmerket der «raw» er Meno og «byte» er Futura. Fire kandidater i samme formspråk: en myk, kremfarget form (raw) som møter en firkantet mint piksel (byte).',
  piksel: 'I hvert symbol har én piksel løsnet eller møter den myke formen. Det er alltid bare én.',
  varianter: [
    { nr: 113, navn: 'Biten', tema: 'gronn', sym: 'biten', notat: 'Blokken det er tatt en bit av, fra 11 i runde 1, nå uten bokstav.' },
    { nr: 114, navn: 'Halvt og halvt', tema: 'gronn', sym: 'halv', notat: 'En skive som er glatt til venstre og piksler til høyre. Rått inn, byte ut.' },
    { nr: 115, navn: 'Rammen', tema: 'gronn', sym: 'ramme', notat: 'En bilderamme der hjørnet har løsnet som en piksel. Rammen er også søkeren og beskjæringen.' },
    { nr: 116, navn: 'Sirkel og kvadrat', tema: 'gronn', sym: 'par', notat: 'De to grunnformene som overlapper: det runde og det firkantede, det analoge og det digitale.' }],
  ikon(u, o, v) { return `${fg(u, v.tema, o)}${SYM[v.sym](u, TEMA[v.tema])}`; },
  spill(s, v) { flisInn(s);
    if (v.sym === 'biten') { a(s, '.form', [{ transform: 'translateY(-70px) scale(.8)', opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 650, delay: 150, e: E.stor });
      a(s, '.bt', [{ transform: 'scale(0)' }, { transform: 'scale(0)', offset: .02 }, { transform: 'none' }], { d: 180, delay: 850, stagger: 240, e: 'steps(2)' });
      a(s, '.form', [{ transform: 'none' }, { transform: 'scale(.965) rotate(-1.2deg)', offset: .4 }, { transform: 'none' }], { d: 240, delay: 850, it: 2, comp: 'add' });
      a(s, '.px', [{ transform: 'translate(-50px,50px) scale(0)', opacity: 0 }, { transform: 'translate(8px,-26px) scale(1.15)', opacity: 1, offset: .5, easing: E.inn }, { transform: 'none', opacity: 1 }], { d: 720, delay: 890, stagger: 240, e: E.ut }); }
    if (v.sym === 'halv') { a(s, '.form', [{ transform: 'scaleX(0)' }, { transform: 'none' }], { d: 650, delay: 200, e: E.ut });
      a(s, '.hp', [{ transform: 'scale(0)', opacity: 0 }, { transform: 'scale(1.2)', opacity: 1, offset: .6 }, { transform: 'none', opacity: 1 }], { d: 320, delay: 600, stagger: el => +el.dataset.d * 1.6, e: E.ut });
      a(s, '.px', [{ transform: 'translate(-40px,40px) scale(0)', opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 600, delay: 1350, e: E.fjaer }); }
    if (v.sym === 'ramme') { a(s, '.form', [{ transform: 'scale(.5) rotate(-12deg)', opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 750, delay: 150, e: E.fjaer });
      a(s, '.px', [{ transform: 'translate(-18px,18px)', opacity: 0 }, { transform: 'translate(-18px,18px)', opacity: 1, offset: .5 }, { transform: 'translate(10px,-10px)', offset: .8 }, { transform: 'none', opacity: 1 }], { d: 1300, delay: 300, e: E.ut }); }
    if (v.sym === 'par') { a(s, '.form', [{ transform: 'translateX(-160px)', opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 850, delay: 200, e: E.ut });
      a(s, '.kv', [{ transform: 'translateX(170px)', opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 850, delay: 300, e: E.ut });
      a(s, '.snitt', [{ opacity: 0 }, { opacity: 0, offset: .7 }, { opacity: 1 }], { d: 1100, delay: 200, e: E.lin }); } } });

/* ═══ Konsept 4 · Påskriften ═══ */
const etikett = (x, y, s, sp, fill, anker = 'start') => { let w = 0; const bok = [...'BYTE'].map(c => { const m = mt(c, 'futura', 500, s).adv, o = { c, x: w }; w += m + sp; return o; }); w -= sp; const x0 = anker === 'midt' ? x - w / 2 : x;
  return { w, x0, svg: bok.map(b => T(b.c, 'futura', 500, s, x0 + b.x, y, fill, 'lb t')).join('') }; };
K.konsepter.push({ id: 'k4', navn: 'Påskriften', ordType: () => 'paskrift',
  ide: '«raw» står stort i Meno, og «BYTE» er en liten påskrift i sperrede Futura-versaler, som en modellbetegnelse. «raw» eier oppmerksomheten og slektskapet, og påskriften sier hvilket raw-produkt det er.',
  piksel: 'Én piksel foran påskriften, som et kulepunkt. Åpner for en familie: raw ▪ MOTION, raw ▪ PHOTO.',
  varianter: [
    { nr: 117, navn: 'Under', tema: 'gronn', type: 'under', notat: 'Påskriften midtstilt under ordet, med pikselen foran.' },
    { nr: 118, navn: 'Brikken', tema: 'gronn', type: 'pille', notat: '«byte» i en mint brikke, som et filformat. Brikken kan brukes alene på knapper og filer.' },
    { nr: 119, navn: 'Skiltet', tema: 'blekk', type: 'plate', notat: 'En tynn linje som ender i pikselen, med påskriften under. Som et typeskilt.' },
    { nr: 120, navn: 'Kanten', tema: 'krem', type: 'vertikal', notat: 'Påskriften loddrett langs kanten, som kantmerkingen på en filmremse.' }],
  ikon(u, o, v) { if (o.px <= 20) return mikro(u, o, v); const t = TEMA[v.tema]; let ut = fg(u, v.tema, o);
    if (v.type === 'under') { const p = raw(304, 256, 206), cap = mt('B', 'futura', 500, 46).asc, q = cap * .62, e = etikett(0, 368, 46, 19, t.px === C.mint ? C.mint : t.byte), tot = q + 22 + e.w, x0 = 256 - tot / 2, e2 = etikett(x0 + q + 22, 368, 46, 19, C.mint);
      ut += `<g class="rw t">${rawT(p, t.raw)}</g>${rect('px t', x0, 368 - q, q, q, t.px)}<g class="lab">${e2.svg}</g>`; }
    if (v.type === 'pille') { const p = raw(300, 256, 200), m = mt('byte', 'futura', 600, 66), w = m.adv + 74, h = 92, x = 256 - w / 2, y = 304;
      ut += `<g class="rw t">${rawT(p, t.raw)}</g><g class="lab t"><rect x="${x.toFixed(1)}" y="${y}" width="${w.toFixed(1)}" height="${h}" rx="${h / 2}" fill="${C.mint}"/>${T('byte', 'futura', 600, 66, x + 37, y + 64, C.gronnMork)}</g>`; }
    if (v.type === 'plate') { const p = raw(300, 256, 196), ly = p.y + 44, e = etikett(p.v + 4, ly + 66, 40, 16, t.px);
      ut += `<g class="rw t">${rawT(p, t.raw)}</g>${rect('linje', p.v + 4, ly, p.h - p.v - 34, 5, t.raw, 'opacity=".45" style="transform-box:fill-box;transform-origin:0 50%"')}${rect('px t', p.h - 22, ly - 8.5, 22, 22, t.px)}<g class="lab">${e.svg}</g>`; }
    if (v.type === 'vertikal') { const p = raw(276, 222, 256), e = etikett(0, 0, 40, 16, t.px, 'midt');
      ut += `<g class="rw t">${rawT(p, t.raw)}</g><g transform="translate(446 256) rotate(-90)"><g class="lab">${etikett(-10, 14, 40, 16, C.gronn, 'midt').svg}</g></g>${rect('px t', 421, 256 - e.w / 2 - 44, 22, 22, t.px)}`; }
    return ut; },
  spill(s) { flisInn(s); a(s, '.rw', [{ transform: 'translateY(46px)', opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 800, delay: 250, e: E.ut });
    a(s, '.linje', [{ transform: 'scaleX(0)' }, { transform: 'none' }], { d: 700, delay: 700, e: 'cubic-bezier(.65,0,.35,1)' });
    a(s, '.lab .lb', [{ opacity: 0, transform: 'translateX(-14px)' }, { opacity: 1, transform: 'none' }], { d: 500, delay: 950, stagger: 70, e: E.ut });
    a(s, '.lab.t', [{ transform: 'scale(.6)', opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 600, delay: 800, e: E.fjaer });
    a(s, '.px', [{ transform: 'scale(0)' }, { transform: 'scale(1.5)', offset: .6 }, { transform: 'none' }], { d: 400, delay: 1250, e: 'steps(3)' }); } });

/* ═══ Konsept 5 · Bitt hjørne ═══ */
const BIT3 = [[352, -10, 180, 73], [408, 61, 124, 54], [462, 113, 70, 53]], SMUL3 = [[374, 18, 27], [428, 78, 19], [479, 130, 13]];
K.konsepter.push({ id: 'k5', navn: 'Bitt hjørne', ordType: () => 'opp',
  ide: 'Pikselen sitter i <b>silhuetten</b>: selve app-flisa mangler et pikselhjørne, og bitene ligger igjen. Inni står «raw» i ren Meno. Formen kjennes igjen i oppgavelinja uten at man leser noe.',
  piksel: 'Tre pikseltrinn ut av hjørnet, eller ett enkelt hakk. Skrifta er urørt.',
  varianter: [
    { nr: 121, navn: 'Tre trinn', tema: 'gronn', trinn: 3, notat: 'Biten fra 11 i runde 1, nå med «raw» i Meno. Smulene har flisas farge.' },
    { nr: 122, navn: 'Ett hakk', tema: 'gronn', trinn: 1, notat: 'Ett kvadratisk hakk, og pikselen som løsnet. Roligere og mer grafisk.' },
    { nr: 123, navn: 'Lys, stablet', tema: 'krem', trinn: 3, stablet: true, notat: 'Krem flis med «raw / byte» stablet. Begge ordene og biten.' },
    { nr: 124, navn: 'Natt', tema: 'blekk', trinn: 3, notat: 'Nesten svart flis. Biten synes godt mot lys oppgavelinje.' }],
  ikon(u, o, v) { const t = TEMA[v.tema], lite = o.px <= 20, bit = v.trinn === 3 ? BIT3 : [[378, -10, 150, 144]], smul = v.trinn === 3 ? SMUL3 : [[420, 26, 64]];
    let inn; if (lite) { const m = mt('r', 'meno', 900, 100), sk = 250 / xh('meno', 900, 100); inn = T('r', 'meno', 900, 100 * sk, 236 - (m.r - m.l) * sk / 2, 276 + 125, t.raw); }
    else if (v.stablet) { const st = stabel({ bredde: 286, cx: 238, cy: 286 }); inn = `<g class="rw t">${T('raw', 'meno', 900, st.r.s, st.r.x, st.r.y, t.raw)}${T('byte', 'futura', 600, st.b.s, st.b.x, st.b.y, t.byte)}</g>`; }
    else inn = `<g class="rw t">${rawT(raw(296, 244, v.trinn === 3 ? 290 : 282), t.raw)}</g>`;
    return `<defs><mask id="${u}m" maskUnits="userSpaceOnUse" x="-20" y="-20" width="560" height="560"><rect x="-20" y="-20" width="560" height="560" fill="#fff"/>${bit.map(([x, y, w, h]) => rect('bt', x, y, w, h, '#000', 'style="transform-box:fill-box;transform-origin:100% 0"')).join('')}</mask></defs>
      <g class="fg t"><g mask="url(#${u}m)">${K.flis(u, v.tema, o)}${inn}</g></g>${smul.map(([x, y, z]) => rect('px t', x, y, z, z, t.bg[0])).join('')}`; },
  spill(s) { a(s, '.fg', [{ transform: 'translateY(-60px) scale(.85)', opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 650, e: E.stor });
    a(s, '.rw', [{ transform: 'translateY(40px)', opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 750, delay: 250, e: E.ut });
    a(s, '.bt', [{ transform: 'scale(0)' }, { transform: 'scale(0)', offset: .02 }, { transform: 'none' }], { d: 190, delay: 950, stagger: 230, e: 'steps(2)' });
    a(s, '.fg', [{ transform: 'none' }, { transform: 'scale(.965) rotate(-1deg)', offset: .4 }, { transform: 'none' }], { d: 230, delay: 950, it: s.querySelectorAll('.bt').length, comp: 'add' });
    a(s, '.px', [{ transform: 'translate(-60px,60px) scale(0)', opacity: 0 }, { transform: 'translate(8px,-28px) scale(1.15)', opacity: 1, offset: .5, easing: E.inn }, { transform: 'none', opacity: 1 }], { d: 740, delay: 990, stagger: 230, e: E.ut }); } });
};
