/* Runde 3 · 41–50: pikselkunst — «raw» i ikonet, egen pikselskrift */
(() => {
const { a, E, flis, lockIkon } = RB;
const f = RB.farge;
const P = PX;
const RAW = () => P.tekst('raw'), BYTE = () => P.tekst('byte'), TR = () => P.bitmap(P.TUNG_R);
const ordPx = (l, stil, d, o = {}) => P.inn(l, stil, d, { ...o, sel: '.ord .px' });
const lock = (l, d, stil, o) => { lockIkon(l, d); ordPx(l, stil, d + 150, o); };
const TUNG_B9 = ['##.....', '.##....', '.##....', '.##....', '.#####.', '.##..##', '.##..##', '.##..##', '.#####.'];

/* 41 · Pikselord */
RB.legg({ nr: 41, navn: 'Pikselord «raw»', scene: 'mork', palett: [f.gronn, f.krem, f.mint],
  ide: '«raw» skrevet med en egen pikselskrift med jevn, tykk strek og ingen tynne linjer. Ordmerket «rawbyte» er tegnet på det samme rutenettet.',
  hvorfor: 'Ordet Raw Studios allerede eier, i et uttrykk som sier byte. Strekene er like tykke som pikslene, så det tåler å bli lite: på 32 px er hver piksel nesten én skjermpiksel. På 16 px viser ikonet bare r (se den minste i rekka).',
  anim: 'Skjermen tegnes linje for linje som et gammelt katodestrålerør, med en mint skannelinje over. Ordmerket skannes på samme måte. Laster-løkka sender skannelinja over igjen og igjen.',
  ikon: (u, o) => o.mikro ? P.mikroR(f.gronn, f.krem) : `${flis(f.gronn)}${P.tegn(RAW(), { s: 26, cx: 256, cy: 262 })}<rect class="linje" x="40" y="0" width="432" height="10" rx="5" fill="${f.mint}" opacity="0"/>`,
  ord: { html: P.ord('rawbyte'), klasse: '' },
  spill(s, l) {
    a(s, '.flis', [{ transform: 'scale(.7)', opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 550, e: E.fjaer });
    P.inn(s, 'skann', 350, { rad: 120 });
    a(s, '.linje', [{ transform: 'translateY(190px)', opacity: .9 }, { transform: 'translateY(340px)', opacity: .9 }, { transform: 'translateY(340px)', opacity: 0 }], { d: 750, delay: 330, e: E.lin, fill: 'none' });
    lock(l, 1100, 'skann', { rad: 70 });
  },
  laster(s) { return [a(s, '.linje', [{ transform: 'translateY(60px)', opacity: 0 }, { opacity: .8, offset: .1 }, { opacity: .8, offset: .9 }, { transform: 'translateY(460px)', opacity: 0 }], { d: 1400, it: Infinity, e: E.lin, fill: 'none' })]; } });

/* 42 · raw / byte stablet */
RB.legg({ nr: 42, navn: 'raw / byte stablet', scene: 'svart', palett: [f.blekk, f.krem, f.lys],
  ide: 'Det samme grepet som dagens ikon og Raw Studios-logoen, «raw» over «byte», men nå i tykke piksler og med «byte» i grønt.',
  hvorfor: 'Gjenkjennelig for alle som kjenner dagens ikon, bare leselig. Stablingen er hentet rett fra Raw Studios-logoen. Fargedelingen sier hva som er arv (raw) og hva som er nytt (byte).',
  anim: 'Pikslene faller ned kolonne for kolonne og stabler seg, «raw» først og så «byte», som klosser i et fallspill.',
  ikon: (u, o) => o.mikro ? P.mikroR(f.blekk, f.krem) : `${flis(f.blekk)}${P.tegn(P.stable(RAW(), BYTE(), 2), { s: 20, cx: 256, cy: 256, fill: p => p.l >= 100 ? f.lys : f.krem })}`,
  ord: { html: P.ord('', { sett: P.stable(RAW(), BYTE(), 2), fill: p => p.l >= 100 ? '#5fae8a' : 'currentColor', hoyde: '1.55em' }), klasse: '' },
  spill(s, l) {
    a(s, '.flis', [{ opacity: 0 }, { opacity: 1 }], { d: 300 });
    P.inn(s, 'slipp', 200, { s: 20, kol: 40 });
    lock(l, 1500, 'slipp', { s: 10, kol: 26 });
  } });

/* 43 · Mosaikk-r */
RB.legg({ nr: 43, navn: 'Mosaikk-r', scene: 'mork', palett: [f.gronn, f.krem, f.mint],
  ide: 'En tung piksel-r med to pikslers strek, serif oppe og nede og en mint dråpe på armen. Pikslene er små avrundede fliser med luft imellom, som kortene i Skapet.',
  hvorfor: 'Bare én bokstav, men stor og tung, og derfor det skarpeste valget i oppgavelinja. Flisene binder ikonet til rutenettet i appen. Mint dråpe gir en signaturdetalj.',
  anim: 'Flisene vender seg rundt i en diagonal bølge, som et kortspill som legges ut. Ordmerket vendes inn på samme måte.',
  ikon: () => `${flis(f.gronn)}${P.tegn(TR(), { s: 50, cx: 256, cy: 256, form: 'flis', fill: p => p.x >= 5 && p.y >= 1 && p.y <= 2 ? f.mint : f.krem })}`,
  ord: { html: P.ord('rawbyte', { form: 'flis' }), klasse: '' },
  spill(s, l) {
    a(s, '.flis', [{ transform: 'scale(.7)', opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 550, e: E.fjaer });
    P.inn(s, 'flipp', 250, { diag: 55 });
    lock(l, 1200, 'flipp', { diag: 22 });
  },
  laster(s) { return a(s, '.px', [{ transform: 'none' }, { transform: 'scaleX(0)', offset: .2 }, { transform: 'none', offset: .4 }], { d: 1800, it: Infinity, stagger: el => (+el.dataset.x + +el.dataset.y) * 70, fill: 'none' }); } });

/* 44 · raw i en bitt blokk */
const BLOKK = (() => { const raw = RAW(), W = 19, H = 11, ox = 2, oy = 3, hull = new Set(raw.c.map(p => (p.x + ox) + ',' + (p.y + oy)));
  const bitt = new Set(['18,0', '17,0', '16,0', '18,1', '17,1', '18,2']); const c = [], b = [];
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) { const k = x + ',' + y; if (hull.has(k)) continue; (bitt.has(k) ? b : c).push({ x, y, l: x }); }
  return { c: c.map((p, i) => ({ ...p, i })), b: b.map((p, i) => ({ ...p, i: [3, 4, 0, 5, 1, 2][i] ?? i })), w: W, h: H }; })();
RB.legg({ nr: 44, navn: 'raw i en bitt blokk', scene: 'lys', palett: [f.gronn, f.krem],
  ide: 'En kremfarget pikselblokk med «raw» stanset ut, der noen har tatt en bit av hjørnet, piksel for piksel. Videre fra 11, nå i ren pikselkunst.',
  hvorfor: 'Byte ≈ bite ≈ piksel uten en eneste tynn strek. Biten følger det samme rutenettet som bokstavene, så alt henger sammen. Blokken er en rolig, stor form i oppgavelinja.',
  anim: 'Blokken bygges rad for rad, så går tre jafs i hjørnet og smulene flyr ut. Laster-løkka spiser seg innover og vokser tilbake.',
  ikon: (u, o) => { const s = 20, x0 = 256 - BLOKK.w * s / 2, y0 = 256 - BLOKK.h * s / 2;
    return o.mikro ? P.mikroR(f.gronn, f.krem) : `${flis(f.gronn)}<g shape-rendering="crispEdges">${P.tegn(BLOKK, { s, x0, y0 })}${P.tegn({ c: BLOKK.b, w: 19, h: 11 }, { s, x0, y0, cls: 'bitt', hel: false }).replace(/<rect /g, '<rect opacity="0" ')}</g>
    ${[[x0 + 19.6 * s, y0 - 1.6 * s, 16], [x0 + 21 * s, y0 + .4 * s, 12], [x0 + 20.2 * s, y0 + 2.6 * s, 9]].map(([x, y, z]) => `<rect class="smule t" x="${x.toFixed(0)}" y="${y.toFixed(0)}" width="${z}" height="${z}" fill="${f.krem}"/>`).join('')}`; },
  ord: { html: P.ord('rawbyte'), klasse: '' },
  spill(s, l) {
    a(s, '.flis', [{ opacity: 0 }, { opacity: 1 }], { d: 300 });
    P.inn(s, 'skann', 200, { rad: 55 });
    a(s, '.bitt', [{ opacity: 1 }, { opacity: 1 }, { opacity: 0 }], { d: 260, delay: 900, stagger: el => [2, 2, 1, 0, 0, 1][+el.dataset.i] * 280 + 120, e: 'steps(1)' });
    a(s, '.smule', [{ transform: 'translate(-60px,50px) scale(0)', opacity: 0 }, { transform: 'translate(8px,-24px) scale(1.2)', opacity: 1, offset: .5, easing: E.inn }, { transform: 'none', opacity: 1 }], { d: 700, delay: 1040, stagger: 280, e: E.ut });
    lock(l, 1900, 'pop', { diag: 14 });
  },
  laster(s) { return a(s, '.bitt', [{ opacity: 1 }, { opacity: 0, offset: .3 }, { opacity: 0, offset: .7 }, { opacity: 1 }], { d: 1600, it: Infinity, stagger: el => [2, 2, 1, 0, 0, 1][+el.dataset.i] * 140, e: 'steps(1)', fill: 'none' }); } });

/* 45 · Statuspikselen */
RB.legg({ nr: 45, navn: 'Statuspikselen', scene: 'svart', palett: [f.blekk, f.krem, f.rav],
  ide: 'En tung piksel-r der én piksel, dråpen på armen, er en ravgul lampe. Ordmerket skrives med en ravgul markør.',
  hvorfor: 'Den ene pikselen blir et levende element: den kan pulsere når noe lastes opp, lyse grønt når det er lagret og blinke ved varsler. Ikonet blir et statuslys i oppgavelinja.',
  anim: 'Bokstaven skannes fram og lampen tennes med et lite blink. Ordmerket skrives bokstav for bokstav med markøren foran. Laster-løkka er lampen som puster.',
  ikon: (u) => `<defs><radialGradient id="${u}g"><stop offset="0" stop-color="${f.rav}" stop-opacity=".7"/><stop offset="1" stop-color="${f.rav}" stop-opacity="0"/></radialGradient></defs>${flis(f.blekk)}
    ${P.tegn(TR(), { s: 48, cx: 256, cy: 256, fill: p => p.x === 6 && p.y === 2 ? f.rav : f.krem })}<circle class="glod t" cx="${256 - 3.5 * 48 + 6.5 * 48}" cy="${256 - 3.5 * 48 + 2.5 * 48}" r="70" fill="url(#${u}g)"/>`,
  ord: { html: P.ord('rawbyte', { kursor: f.rav }), klasse: '' },
  spill(s, l) {
    a(s, '.flis', [{ transform: 'scale(.7)', opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 550, e: E.fjaer });
    P.inn(s, 'skann', 250, { rad: 90 });
    a(s, '.glod', [{ opacity: 0 }, { opacity: 1, offset: .2 }, { opacity: .2, offset: .35 }, { opacity: 1 }], { d: 700, delay: 1000, e: E.lin });
    lock(l, 1100, 'type', { steg: 130 });
  },
  laster(s) { return a(s, '.glod', [{ opacity: 1, transform: 'none' }, { opacity: .1, transform: 'scale(.6)' }], { d: 800, it: Infinity, dir: 'alternate', e: E.myk, fill: 'none' }); } });

/* 46 · Lastelinja */
const RAMME = (() => { const W = 19, H = 9, c = []; for (let x = 1; x < W - 1; x++) { c.push({ x, y: 0 }, { x, y: H - 1 }); } for (let y = 1; y < H - 1; y++) { c.push({ x: 0, y }, { x: W - 1, y }); } return { c: c.map((p, i) => ({ ...p, l: 0, i })), w: W, h: H }; })();
RB.legg({ nr: 46, navn: 'Lastelinja', scene: 'mork', palett: [f.gronn, f.krem, f.mint],
  ide: '«raw» i en pikselramme med avrundede hjørner, som en framdriftslinje som har fylt seg helt opp.',
  hvorfor: 'Ikonet beskriver det Rawbyte gjør hele dagen: laster opp, laster ned, behandler. Rammen gir en egen silhuett, og som lasteindikator er den ferdig designet.',
  anim: 'Rammen tegnes, og «raw» fylles fra venstre mot høyre som en framdriftslinje. Ordmerket samles av piksler. Laster-løkka fyller og tømmer.',
  ikon: (u, o) => o.mikro ? P.mikroR(f.gronn, f.krem) : `${flis(f.gronn)}${P.tegn(RAMME, { s: 22, cx: 256, cy: 256, fill: f.mint, cls: 'ra' })}${P.tegn(RAW(), { s: 22, cx: 256, cy: 256 })}`,
  ord: { html: P.ord('rawbyte'), klasse: '' },
  spill(s, l) {
    a(s, '.flis', [{ opacity: 0 }, { opacity: 1 }], { d: 300 });
    a(s, '.ra', [{ opacity: 0 }, { opacity: 1 }], { d: 1, delay: 200, stagger: 12, e: 'steps(1)' });
    a(s, '.px', [{ opacity: 0 }, { opacity: 1 }], { d: 1, delay: 900, stagger: el => +el.dataset.x * 70, e: 'steps(1)' });
    lock(l, 1900, 'samle');
  },
  laster(s) { return a(s, '.px', [{ opacity: 0 }, { opacity: 1, offset: .1 }, { opacity: 1, offset: .8 }, { opacity: 0, offset: .85 }], { d: 2000, it: Infinity, stagger: el => +el.dataset.x * 60, e: 'steps(1)', fill: 'none' }); } });

/* 47 · Skjermen */
RB.legg({ nr: 47, navn: 'Skjermen', scene: 'svart', palett: ['#0b1510', f.lys, f.mint],
  ide: 'Flisa er en liten skjerm: mørk, buet glassflate med skannelinjer, og «raw» lysende i fosforgrønt.',
  hvorfor: 'Varm, analog teknologi: skjermen der bilder og video faktisk bor. Grønt lys på mørkt er Raw Studios’ farge, men glødende. Det blir et eget, lett gjenkjennelig ikon i oppgavelinja.',
  anim: 'Skjermen slås på (et lysstrek som åpner seg) og teksten tennes med en liten flimring. Ordmerket glitcher inn.',
  ikon: (u, o) => { const glod = `<filter id="${u}g" x="-20%" y="-40%" width="140%" height="180%"><feGaussianBlur stdDeviation="7" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>`;
    return `<defs>${glod}<radialGradient id="${u}r" cx="50%" cy="45%" r="65%"><stop offset="0" stop-color="#16382a"/><stop offset="1" stop-color="#07110c"/></radialGradient><clipPath id="${u}k"><rect x="44" y="44" width="424" height="424" rx="74"/></clipPath></defs>
    ${flis('#1c201e')}<g class="skjerm" style="transform-box:view-box;transform-origin:256px 256px"><rect x="44" y="44" width="424" height="424" rx="74" fill="url(#${u}r)"/>
    <g filter="url(#${u}g)">${o.mikro ? P.tegn(TR(), { s: 44, cx: 256, cy: 256, fill: f.lys }) : P.tegn(RAW(), { s: 24, cx: 256, cy: 260, fill: f.lys })}</g>
    <g clip-path="url(#${u}k)" opacity=".22">${[...Array(27)].map((_, i) => `<rect x="44" y="${50 + i * 16}" width="424" height="5" fill="#000"/>`).join('')}</g>
    <rect x="44" y="44" width="424" height="424" rx="74" fill="none" stroke="#000" stroke-opacity=".35" stroke-width="10"/></g>`; },
  ord: { html: P.ord('rawbyte'), klasse: '', css: `color:${f.lys}` },
  spill(s, l) {
    a(s, '.flis', [{ opacity: 0 }, { opacity: 1 }], { d: 250 });
    a(s, '.skjerm', [{ transform: 'scale(.9,.008)', filter: 'brightness(4)' }, { transform: 'scale(.9,.008)', filter: 'brightness(4)', offset: .3 }, { transform: 'scale(1,1)', filter: 'brightness(1.6)', offset: .7 }, { transform: 'none', filter: 'none' }], { d: 800, delay: 200, e: E.ut });
    P.inn(s, 'glitch', 950, { k: 1.4 });
    lock(l, 1300, 'glitch');
  } });

/* 48 · Klossene */
RB.legg({ nr: 48, navn: 'Klossene', scene: 'mork', palett: [f.gronn, f.krem, f.mint, '#7fb79d'],
  ide: '«raw» bygd av små 3D-klosser: krem front og mint sider, som pikslene har fått tykkelse.',
  hvorfor: 'Gir pikselskrifta tyngde og noe man kan ta på, fysisk byte. Sidekantene gir dybde uten blanke effekter, og ordet står like tydelig som i den flate utgaven.',
  anim: 'Klossene faller ned kolonne for kolonne og spretter når de lander. Ordmerket er bygd av de samme klossene.',
  ikon: (u, o) => o.mikro ? P.mikroR(f.gronn, f.krem) : `${flis(f.gronn)}${P.tegn(RAW(), { s: 24, cx: 250, cy: 252, form: '3d' })}`,
  ord: { html: P.ord('rawbyte', { form: '3d' }), klasse: '' },
  spill(s, l) {
    a(s, '.flis', [{ opacity: 0 }, { opacity: 1 }], { d: 300 });
    P.inn(s, 'slipp', 200, { s: 24, kol: 45 });
    lock(l, 1400, 'slipp', { s: 10, kol: 26 });
  } });

/* 49 · rb i piksler */
const RB_SETT = () => { const r = P.bitmap(P.TUNG_R), b = P.bitmap(TUNG_B9);
  return { c: [...r.c.map(p => ({ ...p, y: p.y + 2, l: 0 })), ...b.c.map(p => ({ ...p, x: p.x + 8, l: 1 }))].map((p, i) => ({ ...p, i })), w: 15, h: 9 }; };
RB.legg({ nr: 49, navn: 'rb i piksler', scene: 'lys', palett: [f.gronn, f.krem, f.mint],
  ide: 'Tung piksel-r og -b side om side, r i krem og b i mint. Monogrammet fra runde 1, nå i piksler.',
  hvorfor: 'Gir begge halvdelene av navnet uten å bli et helt ord, og de to tonene viser raw og byte. Bokstavene er tegnet med to pikslers strek, så de holder seg skarpe på 24 px.',
  anim: 'r kommer fra venstre og b fra høyre, pikslene blinker på plass og de låser seg sammen. Ordmerket skannes fram.',
  ikon: () => `${flis(f.gronn)}${P.tegn(RB_SETT(), { s: 26, cx: 256, cy: 256, fill: p => p.l ? f.mint : f.krem })}`,
  ord: { html: P.ord('rawbyte'), klasse: '' },
  spill(s, l) {
    a(s, '.flis', [{ transform: 'scale(.7)', opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 550, e: E.fjaer });
    a(s, '.px[data-l="0"]', [{ transform: 'translateX(-200px)', opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 600, delay: 250, stagger: el => +el.dataset.y * 30, e: E.ut });
    a(s, '.px[data-l="1"]', [{ transform: 'translateX(200px)', opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 600, delay: 250, stagger: el => +el.dataset.y * 30, e: E.ut });
    lock(l, 1300, 'skann', { rad: 70 });
  } });

/* 50 · Glitch */
RB.legg({ nr: 50, navn: 'Glitch', scene: 'svart', palett: [f.blekk, f.krem, f.rav, f.lys],
  ide: '«raw» i krem med en ravgul og en grønn skygge forskjøvet hver sin vei: fargefeil, som en råfil lest litt for fort.',
  hvorfor: 'Gir pikslene energi og et digitalt uttrykk. Fargekantene i ravgult og grønt er Raw Studios’ farger, og de gjør ikonet levende også når det står stille.',
  anim: 'Radene hopper sidelengs og fargene skilles før alt smetter på plass. Laster-løkka glitcher kort i ny og ne, slik at man ser at noe skjer.',
  ikon: (u, o) => o.mikro ? P.mikroR(f.blekk, f.krem) : `${flis(f.blekk)}<g class="sk1" style="mix-blend-mode:screen">${P.tegn(RAW(), { s: 26, cx: 248, cy: 258, fill: f.rav, cls: 'g1' })}</g><g class="sk2" style="mix-blend-mode:screen">${P.tegn(RAW(), { s: 26, cx: 264, cy: 254, fill: f.lys, cls: 'g2' })}</g>${P.tegn(RAW(), { s: 26, cx: 256, cy: 256 })}`,
  ord: { html: P.ord('rawbyte'), klasse: '' },
  spill(s, l) {
    a(s, '.flis', [{ opacity: 0 }, { opacity: 1 }], { d: 250 });
    P.inn(s, 'glitch', 250, { k: 2.5 });
    a(s, '.sk1', [{ transform: 'translateX(-40px)' }, { transform: 'translateX(30px)', offset: .3 }, { transform: 'translateX(-18px)', offset: .6 }, { transform: 'none' }], { d: 800, delay: 250, e: 'steps(4)' });
    a(s, '.sk2', [{ transform: 'translateX(40px)' }, { transform: 'translateX(-30px)', offset: .3 }, { transform: 'translateX(18px)', offset: .6 }, { transform: 'none' }], { d: 800, delay: 250, e: 'steps(4)' });
    lock(l, 1100, 'glitch');
  },
  laster(s) { return [a(s, '.sk1', [{ transform: 'none' }, { transform: 'none', offset: .8 }, { transform: 'translateX(-30px)', offset: .84 }, { transform: 'translateX(20px)', offset: .9 }, { transform: 'none', offset: .94 }], { d: 1800, it: Infinity, e: 'steps(1)', fill: 'none' }),
    a(s, '.sk2', [{ transform: 'none' }, { transform: 'none', offset: .8 }, { transform: 'translateX(30px)', offset: .84 }, { transform: 'translateX(-20px)', offset: .9 }, { transform: 'none', offset: .94 }], { d: 1800, it: Infinity, e: 'steps(1)', fill: 'none' })]; } });
})();
