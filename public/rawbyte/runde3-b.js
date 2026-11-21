/* Runde 3 · 51–60: pikselkunst — flere former og bevegelser */
(() => {
const { a, E, flis, lockIkon } = RB;
const f = RB.farge;
const P = PX;
const RAW = () => P.tekst('raw'), TR = () => P.bitmap(P.TUNG_R);
const ordPx = (l, stil, d, o = {}) => P.inn(l, stil, d, { ...o, sel: '.ord .px' });
const lock = (l, d, stil, o) => { lockIkon(l, d); ordPx(l, stil, d + 150, o); };
const TRT = 'style="transform-box:fill-box;transform-origin:100% 0"';

/* 51 · Korssting */
RB.legg({ nr: 51, navn: 'Korssting', scene: 'sand', palett: [f.gronn, f.krem, '#3a6b59'],
  ide: '«raw» brodert i korssting, der hver piksel er et lite kryss på et lerretsmønster. Pikselkunst, men sydd for hånd.',
  hvorfor: 'Forener raw (håndverk) og byte (piksler) i én teknikk som er eldre enn datamaskinen. Varmt, uventet og eget. Kryssene fyller rutene nok til at ordet leses som tykke streker.',
  anim: 'Stingene sys inn ett og ett i en diagonal, som en nål som går over lerretet. Ordmerket sys på samme måte.',
  ikon: (u, o) => o.mikro ? P.mikroR(f.gronn, f.krem) : `${flis(f.gronn)}<g opacity=".1" stroke="${f.krem}" stroke-width="1.5">${[...Array(18)].map((_, i) => `<line x1="${22 + i * 26}" y1="30" x2="${22 + i * 26}" y2="482"/><line x1="30" y1="${22 + i * 26}" x2="482" y2="${22 + i * 26}"/>`).join('')}</g>
    ${P.tegn(RAW(), { s: 26, x0: 256 - 7.5 * 26, y0: 256 - 2.5 * 26 + 3, form: 'kors' })}`,
  ord: { html: P.ord('rawbyte', { form: 'kors' }), klasse: '' },
  spill(s, l) {
    a(s, '.flis', [{ opacity: 0 }, { opacity: 1 }], { d: 300 });
    P.inn(s, 'sy', 250);
    lock(l, 1500, 'sy');
  } });

/* 52 · Byten 8 × 8 */
const BYTE8 = [...P.TUNG_R.map(r => r.padEnd(8, '.')), '........'];
const HEKS = BYTE8.map(r => parseInt(r.replace(/#/g, '1').replace(/\./g, '0'), 2).toString(16).toUpperCase().padStart(2, '0')).join(' ');
RB.legg({ nr: 52, navn: 'Byten 8 × 8', scene: 'mork', palett: [f.gronn, f.krem, '#2c5446'],
  ide: 'Et 8 × 8-rutenett, akkurat slik bokstaver lagres i en datamaskin: hver rad er én byte, og de åtte bytene tegner en r. De slukkede rutene står igjen svakt.',
  hvorfor: 'Den mest ærlige «byte» av alle: ikonet <i>er</i> dataene. Rutenettet gir en firkantet, rolig form, og de tente pikslene står sterkt fram. Hex-koden under ordmerket er en hemmelighet for de nysgjerrige.',
  anim: 'Bytene leses inn rad for rad og pikslene tennes fra venstre mot høyre, som i et minne som fylles. Laster-løkka sender en lesepeker nedover radene.',
  ikon: () => { const alle = { c: [], w: 8, h: 8 }; BYTE8.forEach((r, y) => [...r].forEach((k, x) => alle.c.push({ x, y, l: x, i: y * 8 + x, pa: k === '#' })));
    const pa = { ...alle, c: alle.c.filter(p => p.pa) }, av = { ...alle, c: alle.c.filter(p => !p.pa) };
    return `${flis(f.gronn)}${P.tegn(av, { s: 50, cx: 256, cy: 256, form: 'flis', fill: '#2c5446', cls: 'av' })}${P.tegn(pa, { s: 50, cx: 256, cy: 256, form: 'flis' })}<rect class="peker" x="48" y="56" width="416" height="50" rx="12" fill="${f.mint}" opacity="0"/>`; },
  ord: { html: P.ord('rawbyte'), klasse: '', under: HEKS },
  spill(s, l) {
    a(s, '.flis', [{ transform: 'scale(.7)', opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 550, e: E.fjaer });
    a(s, '.av', [{ opacity: 0 }, { opacity: 1 }], { d: 300, delay: 250 });
    P.inn(s, 'skann', 400, { rad: 150 });
    lock(l, 1600, 'skann', { rad: 60 });
  },
  laster(s) { return a(s, '.peker', [{ transform: 'translateY(0)', opacity: .35 }, { transform: 'translateY(350px)', opacity: .35 }], { d: 1600, it: Infinity, e: 'steps(7)', fill: 'none' }); } });

/* 53 · Bitt flis med raw */
const BIT = [[360, -10, 170, 62], [412, 52, 120, 52], [464, 104, 60, 52]];
RB.legg({ nr: 53, navn: 'Bitt flis med raw', scene: 'lys', palett: [f.gronn, f.krem],
  ide: 'Flisa med pikselbit i hjørnet fra 21, nå med «raw» i pikselskrift. Biten følger samme trapp som pikslene.',
  hvorfor: 'Silhuetten bærer vitsen, og den synes på 16 px. Ordet bærer navnet. Begge er tegnet i samme pikselspråk, så ikonet føles som én ting og ikke som en vits limt på en logo.',
  anim: 'Ordet popper fram piksel for piksel, så går tre jafs i hjørnet og smulene spretter ut.',
  ikon: (u, o) => `<defs><mask id="${u}m" maskUnits="userSpaceOnUse" x="-20" y="-20" width="560" height="560"><rect width="512" height="512" rx="116" fill="#fff"/>${BIT.map(([x, y, w, h]) => `<rect class="bt" ${TRT} x="${x}" y="${y}" width="${w}" height="${h}" fill="#000"/>`).join('')}</mask></defs>
    <g mask="url(#${u}m)"><g class="kropp t"><rect width="512" height="512" rx="116" fill="${f.gronn}"/>${o.mikro ? P.tegn(TR(), { s: 46, cx: 240, cy: 270 }) : P.tegn(RAW(), { s: 25, cx: 246, cy: 280 })}</g></g>
    ${[[380, 16, 24], [430, 70, 18], [474, 120, 13]].map(([x, y, z]) => `<rect class="smule t" x="${x}" y="${y}" width="${z}" height="${z}" fill="${f.gronn}"/>`).join('')}`,
  ord: { html: P.ord('rawbyte'), klasse: '' },
  spill(s, l) {
    a(s, '.kropp', [{ transform: 'translateY(-50px) scale(.85)', opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 600, e: E.stor });
    P.inn(s, 'pop', 300, { diag: 22 });
    a(s, '.bt', [{ transform: 'scale(0)' }, { transform: 'scale(0)', offset: .01 }, { transform: 'none' }], { d: 200, delay: 1150, stagger: 240, e: 'steps(2)' });
    a(s, '.kropp', [{ transform: 'none' }, { transform: 'scale(.965)', offset: .4 }, { transform: 'none' }], { d: 240, delay: 1150, it: 3, comp: 'add' });
    a(s, '.smule', [{ transform: 'translate(-60px,60px) scale(0)', opacity: 0 }, { transform: 'translate(8px,-30px) scale(1.2)', opacity: 1, offset: .5, easing: E.inn }, { transform: 'none', opacity: 1 }], { d: 750, delay: 1190, stagger: 240, e: E.ut });
    lock(l, 2000, 'pop', { diag: 14 });
  } });

/* 54 · Pikselfila */
const SIDE = (() => { const W = 13, H = 16, c = [], hj = [];
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    if (x >= W - 4 && y < 4) { const k = x - (W - 4); if (y < k) continue; hj.push({ x, y, l: 0 }); continue; }
    c.push({ x, y, l: 0 });
  }
  return { c: c.map((p, i) => ({ ...p, i })), hj: hj.map((p, i) => ({ ...p, i })), w: W, h: H }; })();
RB.legg({ nr: 54, navn: 'Pikselfila', scene: 'mork', palett: [f.gronn, f.krem, f.mint],
  ide: 'Et dokument i pikselkunst, med et brettet esels­øre tegnet som en pikseltrapp i mint og «raw» skrevet på arket.',
  hvorfor: 'Sier «filer» med en gang, det Rawbyte faktisk tar vare på, og eselsøret er samme trapp som biten. Det høye arket gir en annen silhuett enn de kvadratiske forslagene.',
  anim: 'Arket bygges ovenfra og ned, eselsøret brettes ned i trinn og ordet skrives på arket.',
  ikon: (u, o) => { const s = 22, x0 = 256 - 13 * s / 2, y0 = 256 - 16 * s / 2;
    return `${flis(f.gronn)}<g shape-rendering="crispEdges">${P.tegn(SIDE, { s, x0, y0, cls: 'ark' })}${P.tegn({ c: SIDE.hj, w: 13, h: 16 }, { s, x0, y0, fill: f.mint, cls: 'ore' })}</g>
      ${o.mikro ? '' : P.tegn(RAW(), { s: 16, cx: 256, cy: 300, fill: f.gronn })}`; },
  ord: { html: P.ord('rawbyte'), klasse: '' },
  spill(s, l) {
    a(s, '.flis', [{ opacity: 0 }, { opacity: 1 }], { d: 300 });
    a(s, '.ark', [{ opacity: 0 }, { opacity: 1 }], { d: 1, delay: 200, stagger: el => +el.dataset.y * 45, e: 'steps(1)' });
    a(s, '.ore', [{ transform: 'scale(0)' }, { transform: 'none' }], { d: 300, delay: 950, stagger: el => (+el.dataset.y) * 80, e: 'steps(3)' });
    P.inn(s, 'type', 1200, { steg: 160, sel: '.px' });
    lock(l, 1800, 'tone');
  } });

/* 55 · Terminalen */
RB.legg({ nr: 55, navn: 'Terminalen', scene: 'svart', palett: [f.blekk, f.lys, f.krem],
  ide: '«raw» i grønt med en kremhvit blokkmarkør etter, som en ledetekst som venter på deg.',
  hvorfor: 'Sier at Rawbyte er klar og lytter, og passer godt med Rawbot og søket. Markøren er et selvskrevet levende element som kan blinke mens noe skjer. Et ikon med personlighet.',
  anim: 'Bokstavene skrives én og én, og markøren hopper etter og blinker. Laster-løkka er markøren som blinker.',
  ikon: (u, o) => { const raw = RAW(), s = 22, x0 = 256 - (raw.w + 3) * s / 2, y0 = 262 - raw.h * s / 2;
    return o.mikro ? P.mikroR(f.blekk, f.lys) : `${flis(f.blekk)}${P.tegn(raw, { s, x0, y0, fill: f.lys })}<rect class="kursor" x="${x0 + (raw.w + 1) * s}" y="${y0}" width="${s * 2}" height="${raw.h * s}" fill="${f.krem}"/>`; },
  ord: { html: P.ord('rawbyte', { kursor: f.lys }), klasse: '' },
  spill(s, l) {
    a(s, '.flis', [{ opacity: 0 }, { opacity: 1 }], { d: 300 });
    const raw = RAW(); a(s, '.px', [{ opacity: 0 }, { opacity: 1 }], { d: 1, delay: 300, stagger: el => +el.dataset.l * 220, e: 'steps(1)' });
    a(s, '.kursor', [{ transform: `translateX(${-(raw.w + 1) * 22}px)` }, { transform: 'none' }], { d: 660, delay: 300, e: 'steps(3)' });
    a(s, '.kursor', [{ opacity: 1 }, { opacity: 0, offset: .5 }, { opacity: 1 }], { d: 800, delay: 1000, it: 3, e: 'steps(1)', comp: 'add' });
    lock(l, 1300, 'type', { steg: 120 });
  },
  laster(s) { return a(s, '.kursor', [{ opacity: 1 }, { opacity: 0 }], { d: 530, it: Infinity, dir: 'alternate', e: 'steps(1)', fill: 'none' }); } });

/* 56 · Myke piksler */
RB.legg({ nr: 56, navn: 'Myke piksler', scene: 'mork', palett: [f.gronn, f.krem],
  ide: 'Pikselskrifta med myke, sammensmeltede piksler: rutenettet ligger der fortsatt, men kantene er runde og vennlige.',
  hvorfor: 'Gir pikslene et varmere og mer menneskelig preg, mer «Raw Studios» enn dataspill. Formen er fortsatt like tykk og tydelig som de skarpe pikslene.',
  anim: 'Pikslene popper ut som dråper og smelter sammen med naboene mens de vokser. Ordmerket gjør det samme.',
  ikon: (u, o) => o.mikro ? P.mikroR(f.gronn, f.krem) : `<defs><filter id="${u}f" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="6"/><feColorMatrix values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 18 -7"/></filter></defs>${flis(f.gronn)}<g filter="url(#${u}f)">${P.tegn(RAW(), { s: 26, cx: 256, cy: 258, form: 'myk' })}</g>`,
  ord: { html: P.ord('rawbyte', { form: 'myk' }), klasse: '' },
  spill(s, l) {
    a(s, '.flis', [{ transform: 'scale(.7)', opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 550, e: E.fjaer });
    a(s, '.px', [{ transform: 'scale(0)' }, { transform: 'scale(1.35)', offset: .6 }, { transform: 'none' }], { d: 650, delay: 250, stagger: el => (+el.dataset.x) * 40 + Math.random() * 80, e: E.ut });
    lockIkon(l, 1300); ordPx(l, 'pop', 1450, { diag: 18 });
  } });

/* 57 · Trappeflisa */
const TRAPP = (k = 30) => { const S = 512, A = 4 * k, p = [`M${A},0`, `H${S - A}`];
  const hj = [[2 * k, 0], [2 * k, k], [3 * k, k], [3 * k, 2 * k], [4 * k, 2 * k], [4 * k, 4 * k]];
  hj.forEach(([dx, dy]) => p.push(`L${S - A + dx},${dy}`));
  p.push(`V${S - A}`); [...hj].reverse().forEach(([dx, dy]) => p.push(`L${S - A + dx},${S - dy}`));
  p.push(`H${A}`); hj.forEach(([dx, dy]) => p.push(`L${A - dx},${S - dy}`));
  p.push(`V${A}`); [...hj].reverse().forEach(([dx, dy]) => p.push(`L${A - dx},${dy}`));
  return p.join(' ') + ' Z'; };
RB.legg({ nr: 57, navn: 'Trappeflisa', scene: 'lys', palett: [f.krem, f.gronn],
  ide: 'Selve flisa har pikseltrapper i hjørnene i stedet for glatte runde hjørner. Inni står en tung, grønn piksel-r.',
  hvorfor: 'Silhuetten er et helt eget merke: i en oppgavelinje full av glatte, runde ruter er det bare Rawbyte som er pikslet helt ut i kanten. Krem flis med grønt er rolig og eksklusivt.',
  anim: 'Flisa vokser i hakk som et gammelt dataspill, og r-en samles av piksler fra alle kanter. Ordmerket samles på samme måte.',
  ikon: () => `<path class="flis t" d="${TRAPP()}" fill="${f.krem}"/><g shape-rendering="crispEdges">${P.tegn(TR(), { s: 46, cx: 256, cy: 256, fill: f.gronn })}</g>`,
  ord: { html: P.ord('rawbyte'), klasse: '' },
  spill(s, l) {
    a(s, '.flis', [{ transform: 'scale(.2)' }, { transform: 'none' }], { d: 500, e: 'steps(5)' });
    P.inn(s, 'samle', 300, { s: 46 });
    lock(l, 1400, 'samle');
  } });

/* 58 · Bayer-raw */
const BF = { R: '#d9653b', G: '#4fb886', B: '#4a7fc4' };
const bayer = p => (p.y % 2 ? (p.x % 2 ? BF.B : BF.G) : (p.x % 2 ? BF.G : BF.R));
RB.legg({ nr: 58, navn: 'Bayer-raw', scene: 'svart', palett: [f.blekk, BF.R, BF.G, BF.B],
  ide: '«raw» der hver piksel har fargen den ville hatt på kamerasensoren, i RGGB-mønster. Bokstavelig talt en råfil som ikke er fremkalt ennå.',
  hvorfor: 'Byggeklossen fra 16, som du likte, i et mer lesbart grep: ordet står i pikselskrift, og mønsteret gir farge uten å konkurrere med bokstavene. Fotografer kjenner det igjen, og alle andre ser et fargerikt, eget ikon.',
  anim: 'Pikslene tennes kremhvite og «demosaikkes» til sine sensorfarger i en bølge. Laster-løkka fremkaller fram og tilbake.',
  ikon: (u, o) => o.mikro ? `${flis(f.blekk)}${P.tegn(TR(), { s: 50, cx: 256, cy: 256, fill: bayer })}` : `${flis(f.blekk)}${P.tegn(RAW(), { s: 26, cx: 256, cy: 258, fill: bayer })}`,
  ord: { html: P.ord('rawbyte', { fill: bayer }), klasse: '' },
  spill(s, l) {
    a(s, '.flis', [{ opacity: 0 }, { opacity: 1 }], { d: 300 });
    s.querySelectorAll('.px').forEach(el => a(s, el, [{ fill: f.krem, opacity: 0 }, { fill: f.krem, opacity: 1, offset: .3 }, { fill: el.getAttribute('fill'), opacity: 1 }], { d: 1100, delay: 250 + (+el.dataset.x) * 40 + (+el.dataset.y) * 30, e: E.myk }));
    lockIkon(l, 1300); ordPx(l, 'pop', 1450, { diag: 14 });
  },
  laster(s) { return [...s.querySelectorAll('.px')].map(el => a(s, el, [{ fill: el.getAttribute('fill') }, { fill: f.krem, offset: .5 }, { fill: el.getAttribute('fill') }], { d: 2000, it: Infinity, delay: (+el.dataset.x) * 50, e: E.myk, fill: 'none' })); } });

/* 59 · Byte-regn */
RB.legg({ nr: 59, navn: 'Byte-regn', scene: 'mork', palett: [f.gronn, f.krem, f.mint],
  ide: '«raw» bygd av piksler som har regnet ned og lagt seg, med noen få dråper som fortsatt faller ovenfra.',
  hvorfor: 'Viser at filer strømmer inn i Skapet og blir til noe. Dråpene over gir ikonet bevegelse også når det står stille, og som lasteindikator er det ferdig.',
  anim: 'Pikslene regner ned i tilfeldig rekkefølge og stabler seg til ordet. Laster-løkka lar det regne jevnt over ordet.',
  ikon: (u, o) => o.mikro ? P.mikroR(f.gronn, f.krem) : `${flis(f.gronn)}${P.tegn(RAW(), { s: 26, cx: 256, cy: 296 })}${[[3, 96, 1], [8, 150, .7], [12, 64, .5], [6, 40, .35]].map(([kx, y, op], i) => `<rect class="dr" x="${256 - 7.5 * 26 + kx * 26}" y="${y}" width="26" height="26" fill="${f.mint}" opacity="${op}"/>`).join('')}`,
  ord: { html: P.ord('rawbyte'), klasse: '' },
  spill(s, l) {
    a(s, '.flis', [{ opacity: 0 }, { opacity: 1 }], { d: 300 });
    s.querySelectorAll('.px').forEach(el => a(s, el, [{ transform: 'translateY(-420px)', opacity: 0, easing: E.inn }, { transform: 'translateY(0)', opacity: 1, offset: .75 }, { transform: 'none', opacity: 1 }], { d: 700, delay: 200 + Math.random() * 1100 + (4 - +el.dataset.y) * 60 }));
    a(s, '.dr', [{ transform: 'translateY(-200px)', opacity: 0 }, { transform: 'none' }], { d: 600, delay: 1500, stagger: 120, e: E.ut });
    lock(l, 1800, 'slipp', { s: 10, kol: 22 });
  },
  laster(s) { return a(s, '.dr', [{ transform: 'translateY(-160px)', opacity: 0 }, { opacity: .9, offset: .2 }, { transform: 'translateY(60px)', opacity: 0 }], { d: 900, it: Infinity, stagger: 210, e: E.inn, fill: 'none' }); } });

/* 60 · Med avsender */
RB.legg({ nr: 60, navn: 'Med avsender', scene: 'lys', palett: [f.gronn, f.krem, f.mint],
  ide: 'Den tunge piksel-r-en, med «raw studios» i liten pikselskrift nederst på flisa. En prøve på avsenderen <i>inne i</i> ikonet, for store flater som oppstartsbilde, App Store og innlogging.',
  hvorfor: 'Viser hvordan «by raw studios» kan leve i ikonet uten å ødelegge det. På små størrelser faller linja bort (se 24 og 16 px), og bare r-en står igjen. Bruk bryteren øverst for å se avsenderen ved ordmerket i alle forslagene.',
  anim: 'r-en skannes fram, og avsenderlinja skrives inn under, bokstav for bokstav.',
  ikon: (u, o) => o.liten ? `${flis(f.gronn)}${P.tegn(TR(), { s: 48, cx: 256, cy: 256 })}` :
    `${flis(f.gronn)}${P.tegn(TR(), { s: 40, cx: 256, cy: 218 })}${P.tegn(P.tekst('raw studios'), { s: 7.6, cx: 256, cy: 430, fill: f.mint, cls: 'avs' })}`,
  ord: { html: P.ord('rawbyte'), klasse: '' },
  spill(s, l) {
    a(s, '.flis', [{ transform: 'scale(.7)', opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 550, e: E.fjaer });
    P.inn(s, 'skann', 250, { rad: 90 });
    P.inn(s, 'type', 1000, { sel: '.avs', steg: 70 });
    lock(l, 1200, 'skann', { rad: 60 });
  } });
})();
