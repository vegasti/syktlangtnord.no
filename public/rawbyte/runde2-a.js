/* Runde 2 · 21–30: «Biten» med r — byte ≈ bite ≈ piksel */
(() => {
const { a, E, flis, bk, ordInn, lockIkon } = RB;
const f = RB.farge;
const meno = (t, x, y, s, w = 900, fill = f.krem, ekstra = '') => `<text x="${x}" y="${y}" font-family="meno-banner, Georgia, serif" font-weight="${w}" font-size="${s}" fill="${fill}" ${ekstra}>${t}</text>`;
const TR = 'style="transform-box:fill-box;transform-origin:100% 0"';

/* Bygd, tung r i Meno-ånd. Koordinater før sentrering: x 136–402, y 166–408 (midt 269,287). */
const R_KROPP = 'M136,204 L262,168 V368 Q262,392 300,397 V408 H140 V397 Q176,392 176,368 V236 Q176,218 136,218 Z';
const R_ARM = 'M262,214 C284,184 318,166 352,166 C382,166 402,186 402,212 C402,238 382,256 356,256 C334,256 320,244 316,226 C296,228 276,242 262,264 Z';
const rG = (fill, k = 1.2, cx = 256, cy = 262, ekstra = '', innhold = null) =>
  `<g ${ekstra}><g transform="translate(${cx} ${cy}) scale(${k}) translate(-269 -287)">${innhold ?? `<path d="${R_KROPP}" fill="${fill}"/><path d="${R_ARM}" fill="${fill}"/>`}</g></g>`;
RB.rG = rG; RB.R_KROPP = R_KROPP; RB.R_ARM = R_ARM;

/* Pikselbiten i flisas øvre høyre hjørne: tre trinn à 48 px */
const BIT = [[360, -10, 170, 70], [408, 60, 120, 48], [456, 108, 70, 48]];
const SMULER = [[378, 18, 24], [426, 74, 18], [470, 122, 13], [474, 26, 11]];
const bitMaske = (u, form = `<rect width="512" height="512" rx="116" fill="#fff"/>`) =>
  `<mask id="${u}m" maskUnits="userSpaceOnUse" x="-20" y="-20" width="560" height="560">${form}${BIT.map(([x, y, w, h]) => `<rect class="bt" ${TR} x="${x}" y="${y}" width="${w}" height="${h}" fill="#000"/>`).join('')}</mask>`;
const smuler = (fill, liste = SMULER) => liste.map(([x, y, s]) => `<rect class="smule t" x="${x}" y="${y}" width="${s}" height="${s}" rx="${Math.max(2, s / 6)}" fill="${fill}"/>`).join('');
/* Felles «jafs»: trinnene biter seg inn ett og ett, flisa rister, smulene flyr ut */
const jafs = (s, d0 = 700) => {
  a(s, '.bt', [{ transform: 'scale(0)' }, { transform: 'scale(1.08)', offset: .7 }, { transform: 'none' }], { d: 200, delay: d0, stagger: 230, e: E.ut });
  a(s, '.kropp', [{ transform: 'none' }, { transform: 'scale(.965) rotate(-1.2deg)', offset: .4 }, { transform: 'none' }], { d: 230, delay: d0, it: 3, comp: 'add' });
  a(s, '.smule', [{ transform: 'translate(-70px,70px) scale(0) rotate(-90deg)', opacity: 0 }, { transform: 'translate(10px,-34px) scale(1.2) rotate(20deg)', opacity: 1, offset: .55, easing: E.inn }, { transform: 'none', opacity: 1 }], { d: 800, delay: d0 + 40, stagger: 210, e: E.ut });
};
const lockStd = (l, d, stil = 'blur') => { lockIkon(l, d); ordInn(l, stil, d + 150); };

/* 21 · Bitt flis */
RB.legg({ nr: 21, navn: 'Bitt flis', av: '11', scene: 'lys', palett: [f.gronn, f.krem],
  ide: 'Selve app-flisa er «byten» det er tatt en bit av: tre pikseltrinn rett ut av hjørnet, med smulene liggende igjen. En tung r står trygt i midten.',
  hvorfor: 'Biten sitter i <b>silhuetten</b>, ikke inni ikonet. Den synes derfor også på 16 px, der den skiller Rawbyte fra alle de andre rundede rutene i oppgavelinja. Byte, bite og piksel i ett grep, uten at det handler om bilder alene.',
  anim: 'Flisa lander, får tre raske jafs og rister litt for hvert, mens smulene spretter ut og blir liggende. Laster-løkka spiser og gror igjen.',
  ikon: (u) => `<defs>${bitMaske(u)}</defs><g mask="url(#${u}m)"><g class="kropp t"><rect width="512" height="512" rx="116" fill="${f.gronn}"/>${rG(f.krem, 1.22, 242, 272, 'class="rr t"')}</g></g>${smuler(f.gronn)}`,
  ord: { html: bk('rawbyte'), css: 'font-weight:800' },
  spill(s, l) {
    a(s, '.kropp', [{ transform: 'translateY(-60px) scale(.85)', opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 650, e: E.stor });
    a(s, '.rr', [{ transform: 'scale(.6)', opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 600, delay: 250, e: E.fjaer });
    jafs(s, 800); lockStd(l, 1700);
  },
  laster(s) { return [a(s, '.bt', [{ transform: 'scale(0)' }, { transform: 'none', offset: .25 }, { transform: 'none', offset: .75 }, { transform: 'scale(0)' }], { d: 1800, it: Infinity, stagger: 160, e: 'steps(4)', fill: 'none' }),
    a(s, '.smule', [{ opacity: 0 }, { opacity: 1, offset: .35 }, { opacity: 1, offset: .75 }, { opacity: 0 }], { d: 1800, it: Infinity, stagger: 160, fill: 'none' })]; } });

/* 22 · Analog → digital */
const ARM_PX = (() => {
  const cx = document.createElement('canvas').getContext('2d'), arm = new Path2D(R_ARM), ut = [];
  for (let y = 162; y < 262; y += 16) for (let x = 292; x < 410; x += 16) {
    if (!cx.isPointInPath(arm, x + 8, y + 8)) continue;
    const t = (x - 292) / 118, s = 15 * (1 - t * .55);
    ut.push({ x: x + t * t * 40, y: y - t * 10, s, o: 1 - t * .25 });
  }
  [[440, 180, 9], [466, 160, 7], [452, 216, 6], [488, 194, 5]].forEach(([x, y, s]) => ut.push({ x, y, s, o: .7 }));
  return ut;
})();
RB.legg({ nr: 22, navn: 'Analog → digital', av: '11', scene: 'mork', palett: [f.mork, f.krem, f.mint],
  ide: 'Den tunge r-en er hel i stammen, men armen løser seg opp i piksler som blir mindre og driver ut mot høyre. Rå til venstre, byte til høyre.',
  hvorfor: 'Forteller hele navnet i én bokstav: raw (håndverk, tung serif) som blir byte (data). Biten er her en overgang, ikke et bitt, og er en mer voksen tolkning av ordspillet.',
  anim: 'Pikslene suser inn fra høyre og setter seg i armen, så vokser stammen opp. Laster-løkka lar pikslene flimre som data på vei ut.',
  ikon: () => rG(f.krem, 1.22, 236, 262, 'class="rr"', `<path class="st t" d="${R_KROPP}" fill="${f.krem}"/><path d="M262,214 C276,195 288,186 300,180 V238 C286,242 272,250 262,264 Z" fill="${f.krem}" class="st t"/>${ARM_PX.map(p => `<rect class="apx t" x="${p.x.toFixed(1)}" y="${p.y.toFixed(1)}" width="${p.s.toFixed(1)}" height="${p.s.toFixed(1)}" rx="2" fill="${p.o < .8 ? f.mint : f.krem}" opacity="${p.o.toFixed(2)}"/>`).join('')}`).replace('<g class="rr">', `${flis(f.mork)}<g class="rr">`),
  ord: { html: 'rawbyte', css: 'font-weight:800' },
  spill(s, l) {
    a(s, '.flis', [{ opacity: 0 }, { opacity: 1 }], { d: 300 });
    s.querySelectorAll('.apx').forEach((el, i) => a(s, el, [{ transform: `translate(${120 + Math.random() * 200}px,${(Math.random() - .5) * 260}px) scale(.3)`, opacity: 0 }, { transform: 'none', opacity: +el.getAttribute('opacity') }], { d: 900, delay: 150 + Math.random() * 450, e: E.ut }));
    a(s, '.st', [{ transform: 'scaleY(0)', transformOrigin: '50% 100%' }, { transform: 'none', transformOrigin: '50% 100%' }], { d: 700, delay: 750, e: E.ut });
    lockIkon(l, 1500); ordInn(l, 'piksel', 1650);
  },
  laster(s) { return a(s, '.apx', [{ opacity: 1 }, { opacity: .2 }, { opacity: 1 }], { d: 900, it: Infinity, stagger: () => Math.random() * 900, e: 'steps(3)', fill: 'none' }); } });

/* 23 · Pikselkunst-r */
const PIX = ['XX.XX.', '.XX..X', '.X....', '.X....', 'XXX...'];
const PC = 52, PG = 8, PX0 = 80, PY0 = 118;
RB.legg({ nr: 23, navn: 'Pikselkunst-r', av: '11', scene: 'mork', palett: [f.gronn, f.krem, f.mint],
  ide: 'En r tegnet i grove piksler, med serifer og ballavslutning, slik en skrift ser ut på 6 × 5 piksler. Én piksel har hoppet ut: biten.',
  hvorfor: 'Det skarpeste ikonet mulig på små størrelser: det <i>er</i> allerede pikselgrafikk, så det mister ingenting på 16 px. Det føles digitalt og lekent uten å bli retro-spill.',
  anim: 'Pikslene faller ned kolonne for kolonne og spretter på plass, til slutt hopper den løse pikselen ut i en bue. Ordmerket samles av «byte-støv».',
  ikon: () => `${flis(f.gronn)}${PIX.flatMap((r, j) => [...r].map((c, i) => c === 'X' ? `<rect class="pc t" data-k="${i}" x="${PX0 + i * (PC + PG)}" y="${PY0 + j * (PC + PG)}" width="${PC}" height="${PC}" rx="10" fill="${f.krem}"/>` : '')).join('')}
    <rect class="los t" x="${PX0 + 5 * (PC + PG) + 6}" y="${PY0 - 50}" width="38" height="38" rx="8" fill="${f.mint}"/>`,
  ord: { html: 'rawbyte', css: 'font-weight:800' },
  spill(s, l) {
    a(s, '.flis', [{ transform: 'scale(.7)', opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 600, e: E.fjaer });
    a(s, '.pc', [{ transform: 'translateY(-420px)', opacity: 0, easing: E.inn }, { transform: 'translateY(0) scale(1.15,.8)', opacity: 1, offset: .7, easing: E.ut }, { transform: 'none', opacity: 1 }], { d: 650, delay: 200, stagger: el => +el.dataset.k * 110 + Math.random() * 60 });
    a(s, '.los', [{ transform: 'translate(-60px,170px)', opacity: 0 }, { transform: 'translate(-60px,170px)', opacity: 1, offset: .1 }, { transform: 'translate(-10px,-60px) rotate(-30deg)', offset: .55, easing: E.inn }, { transform: 'none' }], { d: 900, delay: 1150, e: E.ut });
    lockIkon(l, 1700); ordInn(l, 'piksel', 1850);
  },
  laster(s) { return a(s, '.pc', [{ opacity: 1 }, { opacity: .35, offset: .2 }, { opacity: 1, offset: .4 }], { d: 1600, it: Infinity, stagger: el => +el.dataset.k * 120, fill: 'none' }); } });

/* 24 · Lagdelt bit */
const BIT2 = [[400, -10, 130, 58], [448, 48, 80, 46]];
RB.legg({ nr: 24, navn: 'Lagdelt bit', av: '11', scene: 'sand', palett: [f.krem, f.mint, f.gronn],
  ide: 'Flisa er bygd i lag som en kake: krem øverst, mint under og grønt i bunnen. Biten går gjennom lagene i trapp, og r-en står i grønt på kremlaget.',
  hvorfor: 'Lagene forteller om «innhold under overflaten»: originalen, kopiene og metadataen Rawbyte har på hver fil. Lys flis med tre farger blir et rolig, eget ikon i både lys og mørk modus.',
  anim: 'To jafs: det første tar kremlaget og avslører mint, det andre går ned til det grønne. Smulene har fargen til laget de kom fra.',
  ikon: (u) => `<defs>${bitMaske(u)}<mask id="${u}n" maskUnits="userSpaceOnUse" x="-20" y="-20" width="560" height="560"><rect width="512" height="512" rx="116" fill="#fff"/>${BIT2.map(([x, y, w, h]) => `<rect class="bt2" ${TR} x="${x}" y="${y}" width="${w}" height="${h}" fill="#000"/>`).join('')}</mask></defs>
    <g class="kropp t"><rect width="512" height="512" rx="116" fill="${f.gronn}"/><rect width="512" height="512" rx="116" fill="${f.mint}" mask="url(#${u}n)"/>
    <g mask="url(#${u}m)"><rect width="512" height="512" rx="116" fill="${f.krem}"/>${rG(f.gronn, 1.2, 240, 274)}</g></g>${smuler(f.krem, SMULER.slice(0, 2))}${smuler(f.mint, SMULER.slice(2))}`.replace(/mask="url\(#(u\w+)m\)"/, (m, id) => `mask="url(#${id}m)"`),
  ord: { html: bk('rawbyte'), css: 'font-weight:700' },
  spill(s, l) {
    a(s, '.kropp', [{ transform: 'scale(.6) rotate(-6deg)', opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 700, e: E.fjaer });
    a(s, '.bt2', [{ transform: 'scale(0)' }, { transform: 'scale(0)', offset: .01 }, { transform: 'none' }], { d: 260, delay: 1500, stagger: 200, e: E.ut });
    jafs(s, 750); lockStd(l, 1800);
  } });

/* 25 · Smulesporet */
const SPOR = [[352, 150, 30], [392, 120, 24], [426, 92, 19], [454, 70, 14], [476, 52, 10], [492, 38, 7]];
RB.legg({ nr: 25, navn: 'Smulesporet', av: '11', scene: 'mork', palett: [f.gronn, f.krem, f.mint],
  ide: 'Smulene fra biten blir et spor av piksler som går fra r-ens arm og ut av ikonet oppe til høyre, som data på vei et sted.',
  hvorfor: 'Gjør biten om til bevegelse: opplasting, deling, synk. Sporet er et selvskrevet element for «sender», og r-en er like tung og lesbar som før.',
  anim: 'Pikslene skytes ut fra armen og blir mindre jo lenger ut de kommer. Laster-løkka sender en jevn strøm, perfekt som opplastingsindikator i Transfer.',
  ikon: () => `${flis(f.gronn)}${rG(f.krem, 1.15, 236, 276, 'class="rr t"')}${SPOR.map(([x, y, s], i) => `<rect class="sp t" x="${x}" y="${y}" width="${s}" height="${s}" rx="${s / 5}" fill="${i < 2 ? f.krem : f.mint}" opacity="${1 - i * .1}"/>`).join('')}`,
  ord: { html: bk('rawbyte'), css: 'font-weight:800' },
  spill(s, l) {
    a(s, '.flis', [{ transform: 'scale(.7)', opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 600, e: E.fjaer });
    a(s, '.rr', [{ transform: 'translateY(40px)', opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 700, delay: 200, e: E.ut });
    a(s, '.sp', [{ transform: 'translate(-90px,90px) scale(0)', opacity: 0 }, { transform: 'none' }], { d: 600, delay: 800, stagger: 90, e: E.fjaer });
    lockIkon(l, 1500); ordInn(l, 'fokus', 1650);
  },
  laster(s) { return a(s, '.sp', [{ transform: 'translate(-60px,60px) scale(.2)', opacity: 0 }, { opacity: 1, offset: .3 }, { transform: 'translate(40px,-40px) scale(.6)', opacity: 0 }], { d: 1100, it: Infinity, stagger: 110, e: E.lin, fill: 'none' }); } });

/* 26 · Bitt i bokstaven */
const BITR = [[368, 96, 70, 40], [396, 136, 42, 34]];
RB.legg({ nr: 26, navn: 'Bitt i bokstaven', av: '11', scene: 'lys', palett: [f.sand, f.gronn],
  ide: 'Det er r-en selv som har fått biten: ballen på armen mangler et pikseltrinn, og to smuler ligger ved siden av. Flisa er rolig sand.',
  hvorfor: 'Den mest subtile varianten. På avstand er det bare en tung, vakker r. Ser man nærmere, får man vitsen. Det tåler å stå på visittkort og fakturaer like godt som i en app.',
  anim: 'r-en lander tungt, og ett raskt jafs tar hjørnet av ballen. Smulene triller ut til høyre og legger seg.',
  ikon: (u) => `${flis(f.sand)}<defs><mask id="${u}r" maskUnits="userSpaceOnUse" x="0" y="0" width="512" height="512"><rect width="512" height="512" fill="#fff"/>${BITR.map(([x, y, w, h]) => `<rect class="bt" ${TR} x="${x}" y="${y}" width="${w}" height="${h}" fill="#000"/>`).join('')}</mask></defs>
    <g mask="url(#${u}r)"><g class="kropp t">${rG(f.gronn, 1.3, 248, 270)}</g></g>${smuler(f.gronn, [[436, 118, 22], [462, 156, 15], [446, 192, 10]])}`,
  ord: { html: bk('rawbyte'), css: 'font-weight:900' },
  spill(s, l) {
    a(s, '.flis', [{ opacity: 0 }, { opacity: 1 }], { d: 300 });
    a(s, '.kropp', [{ transform: 'translateY(-300px)', easing: E.inn }, { transform: 'scale(1.08,.9)', offset: .6, easing: E.ut }, { transform: 'none' }], { d: 800, delay: 100 });
    a(s, '.bt', [{ transform: 'scale(0)' }, { transform: 'none' }], { d: 220, delay: 1050, stagger: 160, e: E.ut });
    a(s, '.smule', [{ transform: 'translate(-50px,-40px) scale(0)', opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 700, delay: 1100, stagger: 120, e: E.stor });
    lockIkon(l, 1500); ordInn(l, 'fall', 1650);
  } });

/* 27 · Versal-R */
RB.legg({ nr: 27, navn: 'Versal-R', av: '11', scene: 'svart', palett: [f.blekk, f.krem, f.mint],
  ide: 'Samme bitt flis, men med en versal R i Meno Banner, og mint smuler mot svart. Med for å sammenligne liten og stor bokstav.',
  hvorfor: 'Versal R er mer «merke», statelig og symmetrisk, mens liten r er varmere og nærmere Raw Studios-logoen, som er helt i små bokstaver. Se dem side om side i oppgavelinja øverst.',
  anim: 'R-en vokser opp fra grunnlinja, og så går tre jafs i hjørnet med mint smuler. Ordmerket blendes inn.',
  ikon: (u) => `<defs>${bitMaske(u)}</defs><g mask="url(#${u}m)"><g class="kropp t"><rect width="512" height="512" rx="116" fill="${f.blekk}"/><g class="rr tb">${meno('R', 248, 392, 360, 900, f.krem, 'text-anchor="middle"')}</g></g></g>${smuler(f.mint)}`,
  ord: { html: bk('rawbyte'), css: 'font-weight:800' },
  spill(s, l) {
    a(s, '.kropp', [{ opacity: 0, transform: 'scale(.9)' }, { opacity: 1, transform: 'none' }], { d: 500 });
    a(s, '.rr', [{ transform: 'scaleY(0)' }, { transform: 'scaleY(1.06)', offset: .7 }, { transform: 'none' }], { d: 700, delay: 200, e: E.ut });
    jafs(s, 900); lockStd(l, 1800);
  } });

/* 28 · Sirkelen med bit */
RB.legg({ nr: 28, navn: 'Sirkelen med bit', av: '11 + 07', scene: 'sand', palett: [f.gronn, f.krem],
  ide: 'Raw Studios’ grønne sirkel med en pikselbit ut av kanten oppe til høyre, og en stor krem-r. Logoen stables som Raw Studios: raw / byte.',
  hvorfor: 'Slår sammen favoritten (biten) med det sterkeste familiebåndet (sirkelen). Ved siden av Raw Studios-logoen ser det ut som søsken, og biten gjør at de ikke kan forveksles.',
  anim: 'Sirkelen spretter ut, r-en stiger opp inne i den, og tre jafs tar kanten. Logoen løftes linje for linje.',
  ikon: (u) => `<defs>${bitMaske(u, '<circle cx="256" cy="256" r="256" fill="#fff"/>').replace(/x="360" y="-10" width="170" height="70"/, 'x="350" y="-10" width="180" height="84"').replace(/x="408" y="60"/, 'x="404" y="72"').replace(/x="456" y="108"/, 'x="452" y="118"')}</defs>
    <g mask="url(#${u}m)"><g class="kropp t"><circle cx="256" cy="256" r="256" fill="${f.gronn}"/>${rG(f.krem, 1.32, 244, 276, 'class="rr"')}</g></g>${smuler(f.gronn, [[380, 30, 24], [430, 86, 18], [476, 130, 12]])}`,
  ord: { html: `<span style="display:block">${bk('raw', true)}</span><span style="display:block">${bk('byte', true)}</span>`, css: 'font-weight:800;line-height:.8;font-size:clamp(46px,5.4vw,78px)' },
  spill(s, l) {
    a(s, '.kropp', [{ transform: 'scale(0)' }, { transform: 'none' }], { d: 800, e: E.fjaer });
    a(s, '.rr', [{ transform: 'translateY(300px)' }, { transform: 'none' }], { d: 900, delay: 250, e: E.ut });
    jafs(s, 1000); lockIkon(l, 1800); ordInn(l, 'loft', 1950);
  } });

/* 29 · Oppløsning */
const EROSJON = (() => { let h = 0; const ut = []; const tilf = () => (h = (h * 9301 + 49297) % 233280) / 233280;
  for (let y = 0; y < 220; y += 22) for (let x = 292; x < 512; x += 22) {
    const d = Math.hypot(512 - x, y) / 300; // 0 i hjørnet, 1 langt unna
    if (d > .78) continue;
    const p = Math.max(0, (d - .22) / .56) - tilf() * .25;
    if (p > .5) ut.push({ x, y, hull: false }); else ut.push({ x, y, hull: true, flyg: tilf() });
  } return ut; })();
RB.legg({ nr: 29, navn: 'Oppløsning', av: '11', scene: 'mork', palett: [f.gronn, f.krem, f.mint],
  ide: 'I stedet for et skarpt bitt er hjørnet av flisa «spist» i et rutenett av piksler som blir glissere mot kanten, nesten som dithering.',
  hvorfor: 'Mer stemning enn vits: biten er en tekstur, som en råfil som lastes inn rute for rute. På 24 px leser det som et frynsete hjørne, gjenkjennelig og uten å være uryddig.',
  anim: 'Fra inspirasjonsbokas «Oppløsning»: hjørnepikslene blåser bort som støv og kommer så hjem igjen i en bølge. Laster-løkka puster i erosjonen.',
  ikon: (u) => `<defs><mask id="${u}e" maskUnits="userSpaceOnUse" x="0" y="0" width="512" height="512"><rect width="512" height="512" fill="#fff"/>${EROSJON.map(p => `<rect x="${p.x}" y="${p.y}" width="22" height="22" fill="#000"/>`).join('')}</mask></defs>
    <rect class="flis t" width="512" height="512" rx="116" fill="${f.gronn}" mask="url(#${u}e)"/>
    ${EROSJON.filter(p => !p.hull).map(p => `<rect class="ep t" x="${p.x + 2}" y="${p.y + 2}" width="18" height="18" rx="3" fill="${f.gronn}"/>`).join('')}
    ${rG(f.krem, 1.2, 238, 278, 'class="rr t"')}`,
  ord: { html: 'rawbyte', css: 'font-weight:800' },
  spill(s, l) {
    a(s, '.flis', [{ opacity: 0, transform: 'scale(.92)' }, { opacity: 1, transform: 'none' }], { d: 500 });
    s.querySelectorAll('.ep').forEach((el, i) => a(s, el, [{ transform: `translate(${(Math.random() * 220 + 60).toFixed(0)}px,${(-Math.random() * 220 - 40).toFixed(0)}px) rotate(${(Math.random() * 180).toFixed(0)}deg) scale(.4)`, opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 1000, delay: 400 + i * 22, e: E.ut }));
    a(s, '.rr', [{ transform: 'scale(.7)', opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 700, delay: 250, e: E.fjaer });
    lockIkon(l, 1500); ordInn(l, 'piksel', 1650);
  },
  laster(s) { return [...s.querySelectorAll('.ep')].map((el, i) => a(s, el, [{ transform: 'none', opacity: 1 }, { transform: `translate(${30 + (i % 5) * 12}px,-${20 + (i % 7) * 9}px)`, opacity: 0, offset: .4 }, { transform: 'none', opacity: 1, offset: .8 }, { transform: 'none', opacity: 1 }], { d: 2200, it: Infinity, delay: (i % 9) * 60, e: E.myk, fill: 'none' })); } });

/* 30 · Systemet: bitt ordmerke */
const E_HEL = 'polygon(0 0,100% 0,100% 0,100% 0,100% 0,100% 0,100% 100%,0 100%)';
const E_BITT = 'polygon(0 0,46% 0,46% 52%,66% 52%,66% 64%,100% 64%,100% 100%,0 100%)';
RB.legg({ nr: 30, navn: 'Systemet: bitt ordmerke', av: '11', scene: 'lys', palett: [f.krem, f.gronn, f.blekk],
  ide: 'Biten blir en signatur i hele systemet: krem flis med grønn r og bitt hjørne, og ordmerket der siste «e» har nøyaktig samme pikseltrapp, med to smuler etter.',
  hvorfor: 'Viser at idéen bærer en hel identitet, ikke bare et ikon. Trappen kan gå igjen på knapper, kort, hjørner av bilder og 404-sider. Kremflis er sjeldent i oppgavelinja og blir derfor lagt merke til.',
  anim: 'Ikonet bites, og ordmerket blendes inn. Så tar et lite jafs hjørnet av «e»-en, og smulene ramler ned bak.',
  ikon: (u) => `<defs>${bitMaske(u)}</defs><g mask="url(#${u}m)"><g class="kropp t"><rect width="512" height="512" rx="116" fill="${f.krem}"/>${rG(f.gronn, 1.22, 242, 272)}</g></g>${smuler(f.krem)}`,
  ord: { html: bk('rawbyt') + `<span class="bk ebit" style="clip-path:${E_BITT}">e</span><span class="bk sm" style="display:inline-block;width:.1em;height:.1em;background:currentColor;margin-left:.05em;vertical-align:.62em;border-radius:.015em"></span><span class="bk sm" style="display:inline-block;width:.065em;height:.065em;background:currentColor;margin-left:.03em;vertical-align:.86em;border-radius:.01em"></span>`, css: 'font-weight:800' },
  spill(s, l) {
    a(s, '.kropp', [{ transform: 'translateY(-60px) scale(.85)', opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 650, e: E.stor });
    jafs(s, 700); lockIkon(l, 1500); ordInn(l, 'blur', 1650);
    a(l, '.ebit', [{ clipPath: E_HEL }, { clipPath: E_HEL, offset: .9 }, { clipPath: E_BITT }], { d: 2950, e: E.lin });
    a(l, '.sm', [{ transform: 'translate(-30px,-30px) scale(0)', opacity: 0 }, { transform: 'translate(6px,-14px) scale(1.2)', opacity: 1, offset: .5, easing: E.inn }, { transform: 'none', opacity: 1 }], { d: 700, delay: 2700, stagger: 120, e: E.ut });
  } });
})();
