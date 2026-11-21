/* Runde 5 · 73–84: «rawbyte» i Futura PT. «raw» holdes rent — pikslene leker bare i «byte».
   «by raw studios» står i Meno (Raw Studios’ egen logo). Hvert forslag er én behandling av «byte»,
   brukt likt i ikonet (raw / byte stablet) og i ordmerket (raw + byte på linje). */
window.RB5 = () => {
const { a, E, flis, bk, ordInn, lockIkon } = RB;
const f = RB.farge;
const FU = { fam: 'futura', w: 700 };
const pl = (t, o = {}) => PM.plasser(t, { ...FU, ...o });
const lys = sc => sc === 'lys' || sc === 'sand';
const BF = { R: '#d9653b', G: '#4fb886', B: '#4a7fc4' };

/* Stablet raw / byte i samme størrelse */
const stablet = (maxB = 330, y1 = 176, y2 = 322) => { const s = Math.min(pl('raw', { maxB }).s, pl('byte', { maxB }).s); return [pl('raw', { s, cy: y1 }), pl('byte', { s, cy: y2 })]; };
const mikro = (bg) => { const p = pl('r', { maxH: 290, cx: 222 }), q = p.s * .15; return `${flis(bg)}${PM.tekst(p, f.krem)}<rect x="${(p.boks[2] + q * .45).toFixed(1)}" y="${(p.y - q).toFixed(1)}" width="${q.toFixed(1)}" height="${q.toFixed(1)}" fill="${f.mint}"/>`; };

/* Celler for «byte» i ordmerket (eget koordinatrom, grunnlinje på fa) */
const ordCeller = (tekst, celleAndel, w = 600) => {
  const F = 200, celle = Math.max(4, Math.round(F * celleAndel)), c = document.createElement('canvas'), x = c.getContext('2d', { willReadFrequently: true });
  x.font = PM.font(w, F, 'normal', 'futura'); const m = x.measureText(tekst);
  const fa = Math.ceil(m.fontBoundingBoxAscent), fd = Math.ceil(m.fontBoundingBoxDescent), W = Math.ceil(m.width), H = fa + fd;
  c.width = W; c.height = H; x.font = PM.font(w, F, 'normal', 'futura'); x.fillText(tekst, 0, fa);
  const d = x.getImageData(0, 0, W, H).data, celler = [];
  for (let gy = 0; gy < H; gy += celle) for (let gx = 0; gx < W; gx += celle) {
    let s = 0, n = 0; for (let y = gy; y < Math.min(H, gy + celle); y++) for (let xx = gx; xx < Math.min(W, gx + celle); xx++) { s += d[(y * W + xx) * 4 + 3]; n++; }
    celler.push({ x: gx, y: gy, a: s / n / 255 });
  }
  return { celler, celle, W, H, fa, fd, F, w, tekst };
};
const ordSvg = (oc, innhold, ekstraVb = 0) => `<svg class="byteord" viewBox="0 ${-ekstraVb} ${oc.W + ekstraVb} ${oc.H + ekstraVb * 2}" style="height:${((oc.H + ekstraVb * 2) / oc.F).toFixed(3)}em;width:auto;vertical-align:${(-(oc.fd + ekstraVb) / oc.F).toFixed(3)}em;overflow:visible;display:inline-block">${innhold}</svg>`;
const ordTekst = (oc, fill, attr = '') => `<text ${attr} x="0" y="${oc.fa}" font-family='${PM.FAM.futura}' font-weight="${oc.w}" font-size="${oc.F}" fill="${fill}">${oc.tekst}</text>`;

/* Tegn celler i en stil. celler: {x,y,a} i et hvilket som helst rom. */
const q4 = a => Math.min(1, Math.round(a * 4) / 4 || .25);
const tegn = (celler, celle, stil, farge, o = {}) => {
  const hard = celler.filter(p => p.a > (o.terskel ?? .45));
  const attr = (p, i) => `class="bc t" data-x="${p.x}" data-y="${p.y}" data-i="${i}"`;
  switch (stil) {
    case 'mosaikk': return celler.filter(p => p.a > .14).map((p, i) => `<rect ${attr(p, i)} x="${p.x}" y="${p.y}" width="${celle + .5}" height="${celle + .5}" fill="${farge}" fill-opacity="${q4(p.a)}"/>`).join('');
    case 'hard': return hard.map((p, i) => `<rect ${attr(p, i)} x="${p.x}" y="${p.y}" width="${celle + .5}" height="${celle + .5}" fill="${farge}"/>`).join('');
    case 'bayer': return hard.map((p, i) => { const cx = Math.round(p.x / celle), cy = Math.round(p.y / celle); const k = cy % 2 ? (cx % 2 ? BF.B : BF.G) : (cx % 2 ? BF.G : BF.R);
      return `<rect ${attr(p, i)} data-f="${k}" x="${p.x}" y="${p.y}" width="${celle + .5}" height="${celle + .5}" fill="${k}"/>`; }).join('');
    case 'omriss': { const sw = celle * .2; return hard.map((p, i) => `<rect ${attr(p, i)} x="${(p.x + sw / 2 + celle * .06).toFixed(1)}" y="${(p.y + sw / 2 + celle * .06).toFixed(1)}" width="${(celle - sw - celle * .12).toFixed(1)}" height="${(celle - sw - celle * .12).toFixed(1)}" fill="none" stroke="${farge}" stroke-width="${sw.toFixed(1)}"/>`).join(''); }
    case 'klosser': { const d = celle * .38; return [...hard].sort((p, q) => p.y - q.y || p.x - q.x).map((p, i) => `<g ${attr(p, i)}><polygon points="${p.x + celle},${p.y} ${p.x + celle + d},${p.y + d} ${p.x + celle + d},${p.y + celle + d} ${p.x + celle},${p.y + celle}" fill="${o.sideA}"/><polygon points="${p.x},${p.y + celle} ${p.x + celle},${p.y + celle} ${p.x + celle + d},${p.y + celle + d} ${p.x + d},${p.y + celle + d}" fill="${o.sideB}"/><rect x="${p.x}" y="${p.y}" width="${celle}" height="${celle}" fill="${farge}"/></g>`).join(''); }
    case 'led': return celler.map((p, i) => `<rect ${attr(p, i)} data-pa="${p.a > .45 ? 1 : 0}" x="${(p.x + celle * .08).toFixed(1)}" y="${(p.y + celle * .08).toFixed(1)}" width="${(celle * .84).toFixed(1)}" height="${(celle * .84).toFixed(1)}" rx="${(celle * .16).toFixed(1)}" fill="${farge}" fill-opacity="${p.a > .45 ? 1 : .12}"/>`).join('');
    case 'glitch': { const band = p => Math.floor(p.y / celle / 3), skift = [0, 1, -1, 0, 2, -1, 0, 1];
      const lag = (fy, dx, cls) => hard.map((p, i) => `<rect class="${cls} t" data-x="${p.x}" data-y="${p.y}" data-i="${i}" data-b="${band(p)}" x="${p.x + skift[band(p) % 8] * celle * .7 + dx}" y="${p.y}" width="${celle + .5}" height="${celle + .5}" fill="${fy}"/>`).join('');
      return `<g style="mix-blend-mode:screen">${lag(f.rav, -celle * .5, 'gg')}</g>${lag(farge, 0, 'bc')}`; }
  }
  return '';
};
/* Hjelpere for oppløsning/trapp: skarp tekst klippet + celler i en region */
const iRegion = (celler, celle, fra, til) => celler.filter(p => p.x + celle / 2 >= fra && p.x + celle / 2 < til);
const opploser = (celler, celle, X0, X1, frø = 7) => { let h = frø; const t = () => (h = (h * 9301 + 49297) % 233280) / 233280;
  return celler.filter(p => p.a > .4 && p.x + celle / 2 >= X0).map(p => { const k = Math.min(1, (p.x - X0) / (X1 - X0)); return t() > k * .5 ? { ...p, x: p.x + Math.round(k * k * 2) * celle, y: p.y - Math.round(k * k * t() * 2) * celle } : null; }).filter(Boolean); };

/* Animasjoner på byte-cellene (.bc) */
const inn = {
  popp: (rot, sel, d) => a(rot, sel, [{ transform: 'scale(0)', opacity: 0 }, { transform: 'scale(1.3)', opacity: 1, offset: .6 }, { transform: 'none', opacity: 1 }], { d: 380, delay: d, stagger: () => Math.random() * 650, e: E.ut }),
  skann: (rot, sel, d) => a(rot, sel, [{ opacity: 0 }, { opacity: 1 }], { d: 1, delay: d, stagger: el => +el.dataset.y * 2.2 + +el.dataset.x * .4, e: 'steps(1)' }),
  samle: (rot, sel, d) => [...rot.querySelectorAll(sel)].map(el => a(rot, el, [{ transform: `translate(${(80 + Math.random() * 220).toFixed(0)}px,${((Math.random() - .5) * 160).toFixed(0)}px) scale(.3)`, opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 850, delay: d + Math.random() * 350, e: E.ut })),
  slipp: (rot, sel, d) => a(rot, sel, [{ transform: 'translateY(-200px)', opacity: 0, easing: E.inn }, { transform: 'translateY(0)', opacity: 1, offset: .7, easing: E.ut }, { transform: 'translateY(-8px)', offset: .85 }, { transform: 'none', opacity: 1 }], { d: 650, delay: d, stagger: el => +el.dataset.x * 2.4 + (200 - +el.dataset.y) * .6 }),
  bayer: (rot, sel, d) => [...rot.querySelectorAll(sel)].map(el => a(rot, el, [{ fill: f.krem, opacity: 0 }, { fill: f.krem, opacity: 1, offset: .3 }, { fill: el.dataset.f || el.getAttribute('fill'), opacity: 1 }], { d: 1000, delay: d + +el.dataset.x * 2.2, e: E.myk })),
  led: (rot, sel, d) => [...a(rot, sel.replace('.bc', '.bc[data-pa="0"]'), [{ opacity: 0 }, { opacity: 1 }], { d: 400, delay: d }), ...a(rot, sel.replace('.bc', '.bc[data-pa="1"]'), [{ opacity: 0, fillOpacity: .12 }, { opacity: 1, fillOpacity: 1 }], { d: 1, delay: d + 300, stagger: el => +el.dataset.x * 3, e: 'steps(1)' })],
  glitch: (rot, sel, d) => { const rad = {}; return [...rot.querySelectorAll(sel + ',' + sel.replace('.bc', '.gg'))].map(el => { const b = el.dataset.b; rad[b] ||= [...Array(6)].map(() => Math.round((Math.random() - .5) * 8) * 6);
    return a(rot, el, [...rad[b].map(v => ({ transform: `translateX(${v}px)`, opacity: Math.random() > .2 ? 1 : 0, easing: 'steps(1)' })), { transform: 'none', opacity: 1 }], { d: 700, delay: d }); }).flat(); },
};

/* Fabrikk: ett forslag = én behandling av «byte» */
const lag = (p) => RB.legg({ ...p,
  ikon: (u, o) => { if (o.mikro) return mikro(p.flis ?? f.gronn); const [r, b] = stablet();
    return `${flis(p.flis ?? f.gronn)}<g class="raw t">${PM.tekst(r, p.rawFarge ?? f.krem)}</g><g class="byte">${p.ikonByte(b, u, o)}</g>`; },
  ord: { html: bk('raw') + p.ordByte(), klasse: 'futura', css: 'font-weight:600;letter-spacing:-.01em' },
  spill(s, l) {
    a(s, '.flis', [{ transform: 'scale(.75)', opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 550, e: E.fjaer });
    a(s, '.raw', [{ transform: 'translateY(36px)', opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 700, delay: 200, e: E.ut });
    (p.innIkon || inn[p.inn])(s, '.byte .bc', 550);
    lockIkon(l, 1300); ordInn(l, 'blur', 1450);
    (p.innOrd || inn[p.inn])(l, '.ord .bc', 1850);
  } });

const ORDF = sc => lys(sc) ? '#3f8f6b' : f.mint;

/* 73 · Mosaikk */
lag({ nr: 73, navn: 'byte i mosaikk', scene: 'mork', palett: [f.gronn, f.krem, f.mint], inn: 'popp',
  ide: '«raw» rent i Futura, «byte» som den samme Futura-skrifta i lav oppløsning: hver rute har bokstavens gjennomsnittsfarge, slik et lite bilde ser ut forstørret.',
  hvorfor: 'Det mest «bilde»-aktige grepet: pikslene ser ut som et ekte, lavoppløst foto av ordet. Gråtonene i kantene gjør det mykt og elegant i stedet for retro.',
  anim: 'Pikslene i «byte» popper inn i tilfeldig rekkefølge, som et bilde som lastes, mens «raw» glir rolig opp.',
  ikonByte: b => PM.mosaikk(b, 14, { fill: f.mint }).replace(/class="mp t"/g, 'class="bc t"'),
  ordByte: () => { const oc = ordCeller('byte', .085); return ordSvg(oc, tegn(oc.celler, oc.celle, 'mosaikk', ORDF('mork'))); } });

/* 74 · Skarpe piksler */
lag({ nr: 74, navn: 'byte i skarpe piksler', scene: 'mork', palett: [f.gronn, f.krem, f.mint], inn: 'skann',
  ide: '«byte» tegnet med harde piksler, uten gråtoner: en rute er enten på eller av. Fint rutenett, så formen til Futura synes tydelig gjennom.',
  hvorfor: 'Klarere og mer grafisk enn mosaikken, og trykker godt (skilt, klær, gravering). Futuras jevne strek gjør at pikslene blir regelmessige og lesbare.',
  anim: '«byte» skannes inn linje for linje fra toppen, som en skjerm som tegnes.',
  ikonByte: b => tegn(PM.dekning(b, 9), 9, 'hard', f.mint),
  ordByte: () => { const oc = ordCeller('byte', .055); return ordSvg(oc, tegn(oc.celler, oc.celle, 'hard', ORDF('mork'))); } });

/* 75 · Pikselskrift */
const PXBYTE = (cs, fy, cls = 'bc') => P5.tegn(PX.tekst('byte'), cs, fy, cls);
const P5 = { tegn: (sett, { s, x0, y0 }, fy, cls) => sett.c.map((p, i) => `<rect class="${cls} t" data-x="${p.x * 10}" data-y="${p.y * 10}" data-i="${i}" x="${(x0 + p.x * s).toFixed(1)}" y="${(y0 + p.y * s).toFixed(1)}" width="${(s + .5).toFixed(1)}" height="${(s + .5).toFixed(1)}" fill="${fy}"/>`).join('') };
lag({ nr: 75, navn: 'byte i pikselskrift', scene: 'svart', flis: f.blekk, palett: [f.blekk, f.krem, f.lys], inn: 'slipp',
  ide: '«raw» i ren Futura, «byte» i en ekte 8-bit-pikselskrift. To skrifter som møtes med vilje: det myke og det digitale side om side.',
  hvorfor: 'Den tydeligste kontrasten mellom raw og byte, og pikselskrifta fungerer her fordi den bare har ett ord å bære. Futura og pikselskrift har samme geometriske grunnform.',
  anim: 'Pikselbokstavene faller ned kolonne for kolonne og stabler seg under «raw», som klosser.',
  ikonByte: b => { const sett = PX.tekst('byte'), s = (b.boks[3] - b.boks[1]) / sett.h, x0 = 256 - sett.w * s / 2; return PXBYTE({ s, x0, y0: b.boks[1] }, f.lys); },
  ordByte: () => { const sett = PX.tekst('byte'), s = 10; return `<svg class="byteord" viewBox="0 0 ${sett.w * s} ${sett.h * s}" style="height:.86em;width:auto;vertical-align:-.19em;margin-left:.04em;display:inline-block;overflow:visible" shape-rendering="crispEdges">${PXBYTE({ s, x0: 0, y0: 0 }, ORDF('svart'))}</svg>`; } });

/* 76 · LED-tavle */
const ledCeller = (b, celle) => { const ut = [], m = new Map(PM.dekning(b, celle).map(p => [p.x + ',' + p.y, p.a])); const [x0, y0, x1, y1] = b.boks;
  for (let y = Math.floor(y0 / celle) * celle; y < y1; y += celle) for (let x = Math.floor(x0 / celle) * celle; x < x1; x += celle) ut.push({ x, y, a: m.get(x + ',' + y) || 0 }); return ut; };
lag({ nr: 76, navn: 'byte på LED-tavle', scene: 'svart', flis: '#141816', palett: ['#141816', f.krem, f.lys], inn: 'led',
  ide: '«byte» lyser på en liten LED-tavle der de slukkede rutene står svakt igjen. Hele rutenettet synes, men bare ordet er tent.',
  hvorfor: 'Gir pikslene et rammeverk, så de ser bevisste ut og ikke tilfeldige. Det minner om avgangstavler og displayer: noe som er i gang og oppdateres. Grønt lys på mørkt er Raw Studios-grønt med strøm i.',
  anim: 'Tavla tennes svakt, og så lyser rutene i «byte» opp fra venstre mot høyre som en rullende tekst.',
  ikonByte: b => tegn(ledCeller(b, 12), 12, 'led', f.lys),
  ordByte: () => { const oc = ordCeller('byte', .07); return ordSvg(oc, tegn(oc.celler, oc.celle, 'led', f.lys)); } });

/* 77 · Bayer */
lag({ nr: 77, navn: 'byte i sensorfarger', scene: 'svart', flis: f.blekk, palett: [f.blekk, BF.R, BF.G, BF.B], inn: 'bayer',
  ide: '«byte» i piksler som har fargene fra en kamerasensor (RGGB, Bayer-mønsteret i en råfil). «raw» står rent i krem over.',
  hvorfor: 'Fotografer kjenner det igjen: slik ser en råfil ut før den fremkalles. Fargene gjør ikonet til det mest synlige i oppgavelinja, og «raw» holder det rolig.',
  anim: 'Pikslene tennes kremhvite og «demosaikkes» til sensorfargene sine i en bølge fra venstre.',
  ikonByte: b => tegn(PM.dekning(b, 12), 12, 'bayer'),
  ordByte: () => { const oc = ordCeller('byte', .07); return ordSvg(oc, tegn(oc.celler, oc.celle, 'bayer')); } });

/* 78 · Klosser */
lag({ nr: 78, navn: 'byte i klosser', scene: 'mork', palett: [f.gronn, f.krem, f.mint, '#7fb79d'], inn: 'slipp',
  ide: '«byte» bygd av små 3D-klosser med mint sider, under et flatt og rent «raw».',
  hvorfor: 'Byte som noe fysisk og bygd, en blokk med data. Kontrasten mellom det flate «raw» og det tredimensjonale «byte» forklarer navnet uten ord.',
  anim: 'Klossene faller ned og spretter på plass, kolonne for kolonne.',
  ikonByte: b => tegn(PM.dekning(b, 12), 12, 'klosser', f.krem, { sideA: f.mint, sideB: '#7fb79d' }),
  ordByte: () => { const oc = ordCeller('byte', .07); return ordSvg(oc, tegn(oc.celler, oc.celle, 'klosser', 'currentColor', { sideA: f.mint, sideB: '#7fb79d' }), 6); } });

/* 79 · Omriss */
lag({ nr: 79, navn: 'byte i hule piksler', scene: 'lys', palett: [f.gronn, f.krem, f.mint], inn: 'popp',
  ide: '«byte» tegnet med hule, firkantede piksler, bare omrisset av hver rute. Lett og luftig under et tungt, rent «raw».',
  hvorfor: 'Gir pikslene et teknisk, nesten arkitektonisk preg, som rutepapir og tegninger. Vekten ligger på «raw», og «byte» blir en lett, digital skygge.',
  anim: 'Rutene popper fram i tilfeldig rekkefølge og fyller ut ordet.',
  ikonByte: b => tegn(PM.dekning(b, 13), 13, 'omriss', f.mint),
  ordByte: () => { const oc = ordCeller('byte', .075); return ordSvg(oc, tegn(oc.celler, oc.celle, 'omriss', ORDF('lys'))); } });

/* 80 · Glitch */
lag({ nr: 80, navn: 'byte med glitch', scene: 'svart', flis: f.blekk, palett: [f.blekk, f.krem, f.mint, f.rav], inn: 'glitch',
  ide: '«byte» i piksler der noen bånd er forskjøvet sidelengs og en ravgul skygge ligger bak, som en fil som er lest litt for fort.',
  hvorfor: 'Energi og tempo. Det rene «raw» over gjør at feilen ser villet ut, en kontrollert glitch. Ravgult og mint er Raw Studios’ farger.',
  anim: 'Båndene hopper fram og tilbake og fargene skiller lag, før alt smetter på plass.',
  ikonByte: b => tegn(PM.dekning(b, 10), 10, 'glitch', f.mint),
  ordByte: () => { const oc = ordCeller('byte', .06); return ordSvg(oc, tegn(oc.celler, oc.celle, 'glitch', f.mint)); } });

/* 81 · Oppløsning */
lag({ nr: 81, navn: 'byte som løser seg opp', scene: 'mork', palett: [f.gronn, f.krem, f.mint], inn: 'samle',
  ide: '«byte» starter skarpt, men går over i piksler og løser seg opp mot høyre, der e-en driver bort som støv.',
  hvorfor: 'Leses som bevegelse, data på vei et sted, og som overgangen fra analog til digital. Mesteparten av ordet er fortsatt Futura, så det er helt lesbart.',
  anim: 'Støvet trekkes inn fra høyre og samler seg i ordet (byte-støv), mens «raw» glir opp.',
  ikonByte: (b, u) => { const c = 11, X0 = PM.fram(b, 2) + (PM.fram(b, 3) - PM.fram(b, 2)) * .45, X1 = b.boks[2];
    return `<defs><clipPath id="${u}k"><rect width="${X0.toFixed(1)}" height="512"/></clipPath></defs><g clip-path="url(#${u}k)">${PM.tekst(b, f.mint)}</g>${tegn(opploser(PM.dekning(b, c), c, X0, X1), c, 'hard', f.mint)}`; },
  ordByte: () => { const oc = ordCeller('byte', .065), id = RB.uid(), x = ctx => 0; const c2 = document.createElement('canvas').getContext('2d'); c2.font = PM.font(600, oc.F, 'normal', 'futura');
    const X0 = c2.measureText('by').width + (c2.measureText('byt').width - c2.measureText('by').width) * .45;
    return ordSvg(oc, `<defs><clipPath id="${id}"><rect width="${X0.toFixed(1)}" height="${oc.H}"/></clipPath></defs><g clip-path="url(#${id})">${ordTekst(oc, ORDF('mork'))}</g>${tegn(opploser(oc.celler, oc.celle, X0, oc.W), oc.celle, 'hard', ORDF('mork'))}`, 40); } });

/* 82 · Oppløsningstrappen */
lag({ nr: 82, navn: 'byte i fire oppløsninger', scene: 'lys', palett: [f.gronn, f.krem, f.mint], inn: 'skann',
  ide: 'Hver bokstav i «byte» har sin egen oppløsning: b er skarp, y fint pikslet, t grovere og e grovest. En trapp fra vektor til piksel.',
  hvorfor: 'Viser hva Rawbyte gjør (originaler, forhåndsvisninger, miniatyrer i forskjellige størrelser) som en rytme lest fra venstre. Starter skarpt, så det leses lett.',
  anim: 'Bokstavene tegnes inn linje for linje, og de grove rutene blir synlige til slutt.',
  ikonByte: (b, u) => { const g = [1, 2, 3].map(n => PM.fram(b, n)), C = [6, 11, 18];
    return `<defs><clipPath id="${u}k"><rect width="${g[0].toFixed(1)}" height="512"/></clipPath></defs><g clip-path="url(#${u}k)">${PM.tekst(b, f.mint)}</g>` +
      C.map((c, i) => tegn(iRegion(PM.dekning(b, c), c, g[i], i < 2 ? g[i + 1] : 999), c, 'mosaikk', f.mint)).join(''); },
  ordByte: () => { const c2 = document.createElement('canvas').getContext('2d'); const oc0 = ordCeller('byte', .03), fy = ORDF('lys'); c2.font = PM.font(600, oc0.F, 'normal', 'futura'); const g = [1, 2, 3].map(n => c2.measureText('byte'.slice(0, n)).width), id = RB.uid();
    const deler = [.035, .065, .1].map((k, i) => { const oc = ordCeller('byte', k); return tegn(iRegion(oc.celler, oc.celle, g[i], i < 2 ? g[i + 1] : 9999), oc.celle, 'mosaikk', fy); }).join('');
    return ordSvg(oc0, `<defs><clipPath id="${id}"><rect width="${g[0].toFixed(1)}" height="${oc0.H}"/></clipPath></defs><g clip-path="url(#${id})">${ordTekst(oc0, fy)}</g>${deler}`); } });

/* 83 · Biten i e-en */
lag({ nr: 83, navn: 'byte med bit', scene: 'lys', palett: [f.gronn, f.krem, f.mint], inn: 'popp',
  ide: '«byte» i skarpe piksler der noen har tatt en bit av e-en: tre piksler mangler i hjørnet, og smulene ligger ved siden av. Byte ≈ bite.',
  hvorfor: 'Ordspillet fra 11 der det hører hjemme, i ordet «byte». «raw» er urørt, og vitsen sitter i den delen av navnet den handler om.',
  anim: 'Pikslene popper fram, og så forsvinner tre piksler fra e-en i raske jafs mens smulene spretter ut.',
  ikonByte: b => { const c = 10, ce = PM.dekning(b, c).filter(p => p.a > .45), maxX = Math.max(...ce.map(p => p.x)), minY = Math.min(...ce.filter(p => p.x > maxX - 6 * c).map(p => p.y));
    const bitt = p => p.x >= maxX - 2 * c && p.y <= minY + (maxX - p.x) / c * c + c * .5 - c;
    return tegn(ce.filter(p => !bitt(p)), c, 'hard', f.mint) + ce.filter(bitt).map(p => `<rect class="bitt" x="${p.x}" y="${p.y}" width="${c + .5}" height="${c + .5}" fill="${f.mint}" opacity="0"/>`).join('') +
      [[maxX + c * 2, minY - c * 1.5, c], [maxX + c * 3.4, minY + c * .3, c * .7], [maxX + c * 2.6, minY + c * 2, c * .5]].map(([x, y, z]) => `<rect class="smule t" x="${x}" y="${y}" width="${z}" height="${z}" fill="${f.mint}"/>`).join(''); },
  ordByte: () => { const oc = ordCeller('byte', .055), ce = oc.celler.filter(p => p.a > .45), c = oc.celle, maxX = Math.max(...ce.map(p => p.x)), minY = Math.min(...ce.filter(p => p.x > maxX - 6 * c).map(p => p.y)), fy = ORDF('lys');
    const bitt = p => p.x >= maxX - 2 * c && p.y <= minY + (maxX - p.x) - c * .5;
    return ordSvg(oc, tegn(ce.filter(p => !bitt(p)), c, 'hard', fy) + [[maxX + c * 2, minY - c * 1.5, c], [maxX + c * 3.4, minY + c * .3, c * .7]].map(([x, y, z]) => `<rect class="smule t" x="${x}" y="${y}" width="${z}" height="${z}" fill="${fy}"/>`).join(''), 20); },
  innIkon: (s, sel, d) => [...inn.popp(s, sel, d), ...a(s, '.bitt', [{ opacity: 1 }, { opacity: 1 }, { opacity: 0 }], { d: 200, delay: d + 900, stagger: 220, e: 'steps(1)' }),
    ...a(s, '.smule', [{ transform: 'translate(-40px,30px) scale(0)', opacity: 0 }, { transform: 'translate(6px,-18px) scale(1.2)', opacity: 1, offset: .5, easing: E.inn }, { transform: 'none', opacity: 1 }], { d: 700, delay: d + 940, stagger: 220, e: E.ut })] });

/* 84 · Systemet på én flis */
RB.legg({ nr: 84, navn: 'Systemet på én flis', scene: 'lys', palett: [f.gronn, f.krem, f.mint],
  ide: 'Oppstartsbilde og App Store: «raw» rent og «byte» i mosaikk (73) på én linje, med <i>by</i> <b>raw studios</b> i Meno under, på samme flis.',
  hvorfor: 'Viser at de tre lagene (Futura for produktet, piksler for byte og Meno for huset) fungerer sammen i ett bilde. Brukes som innlastingsskjerm, innloggingsside og delingsbilde. Byttes til hvilken som helst byte-behandling over.',
  anim: '«raw» glir opp, byte-pikslene popper inn, og avsenderen tones inn i Meno.',
  ikon: (u, o) => { if (o.liten) return mikro(f.gronn);
    const r = pl('raw', { w: 600, s: 120, cx: 0, cy: 240 }), b = pl('byte', { w: 600, s: 120, cx: 0, cy: 240 });
    const tot = r.adv + b.adv, x0 = 256 - tot / 2; const dxr = x0 - r.x + (r.x - (r.x)) ; r.x = x0; r.boks = r.boks.map((v, i) => i % 2 ? v : v); b.x = x0 + r.adv; b.boks = [b.x, b.boks[1], b.x + b.adv, b.boks[3]];
    const av = PM.plasser('raw studios', { w: 800, s: 34, cx: 286, cy: 322 }), by = PM.plasser('by', { w: 400, st: 'italic', s: 34, cx: 0, cy: 322 }); by.x = av.boks[0] - (by.boks[2] - by.x) - 10;
    return `${flis(f.gronn)}<g class="raw t">${PM.tekst(r, f.krem)}</g><g class="byte">${PM.mosaikk({ ...b, boks: [b.x - 4, b.boks[1], b.x + b.adv + 4, b.boks[3]] }, 9, { fill: f.mint }).replace(/class="mp t"/g, 'class="bc t"')}</g>
      <g class="avs">${PM.tekst(by, f.krem, 'opacity=".75"')}${PM.tekst(av, f.krem, 'opacity=".92"')}</g>`; },
  ord: { html: bk('raw') + (() => { const oc = ordCeller('byte', .085); return ordSvg(oc, tegn(oc.celler, oc.celle, 'mosaikk', '#3f8f6b')); })(), klasse: 'futura', css: 'font-weight:600;letter-spacing:-.01em' },
  spill(s, l) {
    a(s, '.flis', [{ transform: 'scale(.75)', opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 550, e: E.fjaer });
    a(s, '.raw', [{ transform: 'translateY(30px)', opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 700, delay: 200, e: E.ut });
    inn.popp(s, '.byte .bc', 550);
    a(s, '.avs', [{ opacity: 0, filter: 'blur(6px)' }, { opacity: 1, filter: 'blur(0)' }], { d: 800, delay: 1300 });
    lockIkon(l, 1300); ordInn(l, 'blur', 1450); inn.popp(l, '.ord .bc', 1850);
  } });
};
