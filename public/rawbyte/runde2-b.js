/* Runde 2 · 31–40: nye retninger, mange med bevegelse fra «Rawbyte i bevegelse» (H:\rawbyte-animasjoner) */
(() => {
const { a, E, flis, bk, ordInn, lockIkon, rG, R_KROPP, R_ARM } = RB;
const f = RB.farge;
const meno = (t, x, y, s, w = 900, fill = f.krem, ekstra = '') => `<text x="${x}" y="${y}" font-family="meno-banner, Georgia, serif" font-weight="${w}" font-size="${s}" fill="${fill}" ${ekstra}>${t}</text>`;
const lockStd = (l, d, stil = 'blur') => { lockIkon(l, d); ordInn(l, stil, d + 150); };
const flisKlipp = (u) => `<clipPath id="${u}k"><rect width="512" height="512" rx="116"/></clipPath>`;
const BOKST = 'abcdefghijklmnopqrstuvwxyz';

/* 31 · Avgangstavla */
const TAVLE_T = (cls, fill = f.krem) => meno('r', 256, 372, 400, 900, fill, `text-anchor="middle" class="${cls}"`);
const flipp = (s, fra, til, dur) => {
  const sett = (q, t) => s.querySelectorAll(q).forEach(e => (e.textContent = t));
  sett('.t-o', til); sett('.t-n', fra); sett('.t-fo', fra); sett('.t-fn', til);
  a(s, '.fo', [{ transform: 'scaleY(1)', opacity: 1, filter: 'brightness(1)' }, { transform: 'scaleY(0)', opacity: 1, filter: 'brightness(.5)' }], { d: dur / 2, e: E.inn, fill: 'none' });
  a(s, '.fn', [{ transform: 'scaleY(0)', opacity: 1, filter: 'brightness(1.6)' }, { transform: 'scaleY(1)', opacity: 1, filter: 'brightness(1)' }], { d: dur / 2, delay: dur / 2, e: E.ut, fill: 'backwards' });
  RB.etter(s, dur, () => sett('.t-n', til));
};
RB.legg({ nr: 31, navn: 'Avgangstavla', scene: 'svart', palett: [f.blekk, '#2b2b2e', f.krem],
  ide: 'r-en står på en bladvendingsbrikke fra en gammel avgangstavle: mørk brikke, delt på midten, med små hengsler. Ordmerket ruller inn bokstav for bokstav.',
  hvorfor: 'Alt i Rawbyte er i bevegelse: filer kommer, går, leveres. Tavla er et varmt, mekanisk bilde på det. Brikken er en tydelig, høy form, så r-en blir stor og skarp på små størrelser.',
  anim: 'Bladene vender tilfeldige bokstaver raskere og raskere til de lander på r med et klakk. Laster-løkka staver r-a-w-b-y-t-e på brikken, om og om igjen.',
  ikon: (u) => `${flis(f.blekk)}<defs><clipPath id="${u}o"><rect x="100" y="80" width="312" height="176"/></clipPath><clipPath id="${u}n"><rect x="100" y="256" width="312" height="176"/></clipPath></defs>
    <rect class="kort t" x="116" y="96" width="280" height="320" rx="30" fill="#2b2b2e"/>
    <path d="M116,256 H396 V386 Q396,416 366,416 H146 Q116,416 116,386 Z" fill="#242427"/>
    <g clip-path="url(#${u}o)">${TAVLE_T('t-o')}</g><g clip-path="url(#${u}n)">${TAVLE_T('t-n')}</g>
    <g class="fo tb" opacity="0"><path d="M116,256 V126 Q116,96 146,96 H366 Q396,96 396,126 V256 Z" fill="#2b2b2e"/><g clip-path="url(#${u}o)">${TAVLE_T('t-fo')}</g></g>
    <g class="fn tt" opacity="0"><path d="M116,256 H396 V386 Q396,416 366,416 H146 Q116,416 116,386 Z" fill="#242427"/><g clip-path="url(#${u}n)">${TAVLE_T('t-fn')}</g></g>
    <rect x="112" y="253" width="288" height="6" fill="${f.blekk}"/><rect x="104" y="236" width="12" height="40" rx="4" fill="#47474c"/><rect x="396" y="236" width="12" height="40" rx="4" fill="#47474c"/>`,
  ord: { html: bk('rawbyte'), css: 'font-weight:800' },
  spill(s, l) {
    a(s, '.flis', [{ opacity: 0 }, { opacity: 1 }], { d: 300 });
    a(s, '.kort', [{ transform: 'scale(.8)', opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 500, e: E.fjaer });
    const rekke = [...Array(9)].map(() => BOKST[(Math.random() * 26) | 0]).concat('r');
    let t = 300, forrige = 'r';
    rekke.forEach((c, i) => { const dur = 120 + i * i * 4; const fra = forrige; RB.etter(s, t, () => flipp(s, fra, c, dur)); forrige = c; t += dur; });
    lockIkon(l, t - 200); ordInn(l, 'tavle', t - 50);
  },
  laster(s) { let i = 0; const ord = 'rawbyte'; return [RB.hver(s, 520, () => { const fra = ord[i % 7], til = ord[(i + 1) % 7]; i++; flipp(s, fra, til, 300); })]; } });

/* 32 · Dekoderen */
RB.legg({ nr: 32, navn: 'Dekoderen', scene: 'mork', palett: [f.gronn, f.krem, f.mint],
  ide: 'En tung Meno-r med en mint markør etter, som i en terminal. Rawbyte «skriver» r. Ordmerket dekodes fra heksadesimaler.',
  hvorfor: 'Gir et diskré nikk til «byte» og til at Rawbyte er teknologi. Serifen holder det varmt og mennesklig, så det ikke blir et utviklerverktøy. Markøren er et gratis levende element: den kan blinke når Rawbot tenker.',
  anim: 'Bokstaven ruller gjennom tegn (0–F) og låser seg på r med et mint glimt, så blinker markøren tre ganger. Laster-løkka er markøren som blinker mens r-en dekodes på nytt i ny og ne.',
  ikon: () => `${flis(f.gronn)}${meno('r', 232, 364, 380, 900, f.krem, 'text-anchor="middle" class="kode"')}<rect class="mark" x="336" y="322" width="74" height="42" rx="8" fill="${f.mint}"/>`,
  ord: { html: bk('rawbyte'), css: 'font-weight:800' },
  spill(s, l) {
    const k = s.querySelector('.kode'); const HEX = '0123456789abcdef';
    a(s, '.flis', [{ transform: 'scale(.7)', opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 600, e: E.fjaer });
    for (let i = 0; i < 16; i++) RB.etter(s, 250 + i * 55, () => (k.textContent = HEX[(Math.random() * 16) | 0]));
    RB.etter(s, 250 + 16 * 55, () => { k.textContent = 'r'; k.animate([{ fill: f.mint }, { fill: f.krem }], { duration: 600 }); });
    a(s, '.mark', [{ opacity: 1 }, { opacity: 0, offset: .17 }, { opacity: 1, offset: .33 }, { opacity: 0, offset: .5 }, { opacity: 1, offset: .67 }, { opacity: 0, offset: .83 }, { opacity: 1 }], { d: 1500, delay: 1200, e: 'steps(1)' });
    s._rydd = () => (k.textContent = 'r');
    lockIkon(l, 1300); ordInn(l, 'dekoder', 1450);
  },
  laster(s) { const k = s.querySelector('.kode'); s._rydd = () => (k.textContent = 'r'); let n = 0;
    return [a(s, '.mark', [{ opacity: 1 }, { opacity: 0 }], { d: 530, it: Infinity, dir: 'alternate', e: 'steps(1)', fill: 'none' }),
      RB.hver(s, 90, () => { n = (n + 1) % 30; k.textContent = n < 12 ? '0123456789abcdef'[(Math.random() * 16) | 0] : 'r'; })]; } });

/* 33 · Før / etter */
RB.legg({ nr: 33, navn: 'Før / etter', scene: 'lys', palett: ['#7d8681', '#c9cdc8', f.gronn, f.krem],
  ide: 'Flisa er delt av en sammenligningsstrek: til venstre flatt og grått som en råfil før redigering, til høyre fremkalt i Raw Studios-grønt. r-en går gjennom begge.',
  hvorfor: 'Viser hva Rawbyte gjør med materialet ditt: rått inn, ferdig ut. Håndtaket kjenner alle fotografer fra før/etter-visningen. Det er et mer handlingsorientert ikon enn de andre.',
  anim: 'Fra «Fremkalling» i inspirasjonsboka: håndtaket sveiper over flisa og fremkaller den, går litt for langt og legger seg på midten. Ordmerket sveipes fram etter.',
  ikon: (u) => `<defs>${flisKlipp(u)}<clipPath id="${u}h"><rect class="del" x="256" y="-10" width="600" height="540"/></clipPath></defs>
    <g clip-path="url(#${u}k)" class="hel t"><rect width="512" height="512" fill="#7d8681"/>${rG('#c9cdc8', 1.25, 252, 268)}
      <g clip-path="url(#${u}h)"><rect width="512" height="512" fill="${f.gronn}"/>${rG(f.krem, 1.25, 252, 268)}</g>
      <g class="hndl"><rect x="253" y="0" width="6" height="512" fill="${f.krem}"/><circle cx="256" cy="256" r="30" fill="${f.krem}"/><path d="M243,256 l10,-10 v20 Z M269,256 l-10,-10 v20 Z" fill="${f.gronn}"/></g></g>`,
  ord: { html: bk('rawbyte'), under: 'rått inn · ferdig ut', css: 'font-weight:800' },
  spill(s, l) {
    a(s, '.hel', [{ transform: 'scale(.8)', opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 600, e: E.fjaer });
    a(s, ['.del', '.hndl'].map(q => s.querySelector(q)), [{ transform: 'translateX(-230px)' }, { transform: 'translateX(-230px)', offset: .15 }, { transform: 'translateX(200px)', offset: .65 }, { transform: 'none' }], { d: 2200, delay: 300, e: E.myk });
    lockIkon(l, 1800); ordInn(l, 'sveip', 1950);
  },
  laster(s) { return a(s, ['.del', '.hndl'].map(q => s.querySelector(q)), [{ transform: 'translateX(-200px)' }, { transform: 'translateX(200px)' }], { d: 1400, it: Infinity, dir: 'alternate', e: E.myk, fill: 'none' }); } });

/* 34 · Filmremsa */
const RAMME = 224, RAMMER = ['e', 'r', 'a', 'w', 'b', 'y', 't', 'e'];
RB.legg({ nr: 34, navn: 'Filmremsa', scene: 'svart', palett: [f.blekk, '#2c2c30', f.krem, f.gronn],
  ide: 'En filmremse med perforering, der rammen i midten viser r-en. Over og under skimtes neste og forrige ramme.',
  hvorfor: 'Bilde og video i én analog form, og «raw» i ordets egentlige forstand: negativet før det fremkalles. Den lyse midtrammen gir en tydelig form på små størrelser, og perforeringen er gjenkjennelig også på 32 px.',
  anim: 'Remsa ruller gjennom r-a-w-b-y-t-e, bremser opp og låser seg på r med et lite rykk, som en projektor. Laster-løkka ruller remsa jevnt.',
  ikon: (u) => `<defs>${flisKlipp(u)}</defs><g clip-path="url(#${u}k)"><rect class="flis" width="512" height="512" fill="${f.blekk}"/>
    <g class="remse">${RAMMER.map((c, k) => { const y = 156 + (1 - k) * RAMME; return `<rect x="166" y="${y}" width="180" height="200" rx="14" fill="${k === 1 ? f.krem : '#d9d1c8'}"/>${meno(c, 256, y + 150, 190, 900, f.gronn, 'text-anchor="middle"')}`; }).join('')}
      <rect x="128" y="-1500" width="30" height="2200" fill="#2c2c30"/><rect x="354" y="-1500" width="30" height="2200" fill="#2c2c30"/>
      ${[...Array(56)].map((_, i) => { const y = -1490 + i * 40; return `<rect x="135" y="${y}" width="16" height="22" rx="4" fill="${f.blekk}"/><rect x="361" y="${y}" width="16" height="22" rx="4" fill="${f.blekk}"/>`; }).join('')}</g></g>`,
  ord: { html: bk('rawbyte', true), css: 'font-weight:800' },
  spill(s, l) {
    a(s, '.flis', [{ opacity: 0 }, { opacity: 1 }], { d: 300 });
    a(s, '.remse', [{ transform: `translateY(${-6 * RAMME}px)` }, { transform: 'translateY(14px)', offset: .88 }, { transform: 'none' }], { d: 1900, delay: 150, e: 'cubic-bezier(.3,.0,.2,1)' });
    lockStd(l, 1700, 'loft');
  },
  laster(s) { return a(s, '.remse', [{ transform: `translateY(${-RAMME}px)` }, { transform: 'none' }], { d: 450, it: Infinity, e: E.lin, fill: 'none' }); } });

/* 35 · Signaturen */
const SIGN_R = 'M172,248 C186,238 196,230 204,220 C206,264 208,306 208,348 C226,280 262,222 308,212 C332,207 348,222 338,242';
const SIGN_U = 'M118,404 C210,384 318,374 420,386';
RB.legg({ nr: 35, navn: 'Signaturen', scene: 'mork', palett: [f.gronn, f.krem, f.mint],
  ide: 'En håndskrevet r i én strek, med en lang understrek. Som når fotografen signerer et ferdig trykk. Ordmerket står i Meno Banner kursiv.',
  hvorfor: 'Det mest personlige forslaget: det sier at det er menneskene og håndverket som står i sentrum, ikke lagringen. Understreken er en naturlig bunnlinje for knapper og lasting.',
  anim: 'Fra «Signatur»: r-en skrives i ett drag, og understreken trekkes etter med en mint ettertanke. Laster-løkka skriver og visker ut signaturen.',
  ikon: () => `${flis(f.gronn)}<g transform="translate(12 -8)"><path class="sg sg1" d="${SIGN_R}" pathLength="1" stroke-dasharray="1 0" fill="none" stroke="${f.krem}" stroke-width="30" stroke-linecap="round" stroke-linejoin="round"/>
    <path class="sg sg2" d="${SIGN_U}" pathLength="1" stroke-dasharray="1 0" fill="none" stroke="${f.mint}" stroke-width="18" stroke-linecap="round"/></g>`,
  ord: { html: bk('rawbyte'), css: 'font-weight:400;font-style:italic' },
  spill(s, l) {
    a(s, '.flis', [{ transform: 'scale(.7)', opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 600, e: E.fjaer });
    a(s, '.sg1', [{ strokeDasharray: '0 1' }, { strokeDasharray: '1 0' }], { d: 1300, delay: 350, e: 'cubic-bezier(.4,.1,.3,1)' });
    a(s, '.sg2', [{ strokeDasharray: '0 1' }, { strokeDasharray: '1 0' }], { d: 600, delay: 1600, e: E.ut });
    lockIkon(l, 1800); ordInn(l, 'sveip', 1950);
  },
  laster(s) { return [a(s, '.sg1', [{ strokeDasharray: '0 1' }, { strokeDasharray: '1 0', offset: .5 }, { strokeDasharray: '1 0', offset: .7 }, { strokeDasharray: '0 1' }], { d: 2400, it: Infinity, e: E.myk, fill: 'none' }),
    a(s, '.sg2', [{ strokeDasharray: '0 1' }, { strokeDasharray: '0 1', offset: .45 }, { strokeDasharray: '1 0', offset: .6 }, { strokeDasharray: '1 0', offset: .75 }, { strokeDasharray: '0 1', offset: .9 }, { strokeDasharray: '0 1' }], { d: 2400, it: Infinity, e: E.myk, fill: 'none' })]; } });

/* 36 · Mørkerommet */
RB.legg({ nr: 36, navn: 'Mørkerommet', scene: 'svart', palett: ['#16120e', f.rav, f.krem],
  ide: 'En nesten svart flis med ravgult mørkeromslys som gløder fra midten, og r-en som et fremkalt bilde i krem.',
  hvorfor: 'Stemning og håndverk: stedet der råmaterialet blir til bilder. Det varme ravlyset er helt eget i en oppgavelinje full av blått, og r-en står sterkt mot det mørke.',
  anim: 'Fra «Mørkerommet»: lyset tennes, og r-en kommer langsomt fram fra ingenting, uskarp først og så skarp, som papir i fremkallerbadet. Laster-løkka puster i lyset.',
  ikon: (u) => `<defs><radialGradient id="${u}g" cx="50%" cy="46%" r="60%"><stop offset="0" stop-color="${f.rav}" stop-opacity=".55"/><stop offset=".55" stop-color="#8a4a1c" stop-opacity=".18"/><stop offset="1" stop-color="#16120e" stop-opacity="0"/></radialGradient></defs>
    ${flis('#16120e')}<rect class="glod t" width="512" height="512" rx="116" fill="url(#${u}g)"/>${rG(f.krem, 1.2, 246, 268, 'class="rr"')}`,
  ord: { html: bk('rawbyte'), css: 'font-weight:700' },
  spill(s, l) {
    a(s, '.flis', [{ opacity: 0 }, { opacity: 1 }], { d: 400 });
    a(s, '.glod', [{ opacity: 0 }, { opacity: .6, offset: .1 }, { opacity: .3, offset: .14 }, { opacity: 1 }], { d: 900, delay: 200, e: E.lin });
    a(s, '.rr', [{ opacity: 0, filter: 'blur(14px)' }, { opacity: .35, filter: 'blur(8px)', offset: .4 }, { opacity: 1, filter: 'blur(0)' }], { d: 2400, delay: 600, e: E.myk });
    lockIkon(l, 2400); ordInn(l, 'fokus', 2550);
  },
  laster(s) { return a(s, '.glod', [{ opacity: 1, transform: 'none' }, { opacity: .45, transform: 'scale(.92)' }], { d: 1400, it: Infinity, dir: 'alternate', e: E.myk, fill: 'none' }); } });

/* 37 · Flytende */
const KL = 1.15, KX = 256, KY = 262, T = (x, y) => [KX + KL * (x - 269), KY + KL * (y - 287)];
const BLOBBER = [[219, 192, 44], [219, 224, 44], [219, 256, 44], [219, 288, 44], [219, 320, 44], [219, 352, 44], [219, 382, 42], [150, 208, 22], [166, 398, 22], [276, 398, 22], [264, 228, 34], [304, 196, 34], [352, 208, 48]]
  .map(([x, y, r]) => { const [X, Y] = T(x, y); return [X, Y, r * KL]; });
RB.legg({ nr: 37, navn: 'Flytende', scene: 'mork', palett: [f.gronn, f.krem],
  ide: 'r-en er laget av flytende dråper som smelter sammen, en myk, organisk bokstav uten en eneste rett strek.',
  hvorfor: 'Leken og moderne, og tar «filer som flyter fritt mellom maskiner» bokstavelig. Formen er tung og rund, så den leser godt som silhuett på 16 px.',
  anim: 'Fra «Metaballer»: dråpene svever inn fra alle kanter, finner hverandre og smelter sammen til r-en. Laster-løkka lar bokstaven bølge som væske.',
  ikon: (u) => `<defs><filter id="${u}f" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="11"/><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10"/></filter></defs>
    ${flis(f.gronn)}<g filter="url(#${u}f)">${BLOBBER.map(([x, y, r], i) => `<circle class="dr t" data-i="${i}" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="${f.krem}"/>`).join('')}</g>`,
  ord: { html: bk('rawbyte'), css: 'font-weight:800' },
  spill(s, l) {
    a(s, '.flis', [{ transform: 'scale(.7)', opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 600, e: E.fjaer });
    s.querySelectorAll('.dr').forEach((el, i) => { const v = Math.random() * 6.283, d = 160 + Math.random() * 120;
      a(s, el, [{ transform: `translate(${(Math.cos(v) * d).toFixed(0)}px,${(Math.sin(v) * d).toFixed(0)}px) scale(.5)` }, { transform: 'none' }], { d: 1400, delay: 200 + i * 40, e: 'cubic-bezier(.3,1.25,.4,1)' }); });
    lockStd(l, 1700);
  },
  laster(s) { return [...s.querySelectorAll('.dr')].map((el, i) => a(s, el, [{ transform: 'none' }, { transform: `translate(${Math.sin(i) * 14}px,${Math.cos(i * 1.7) * 14}px) scale(1.08)` }], { d: 900 + (i % 4) * 150, it: Infinity, dir: 'alternate', e: E.myk, fill: 'none' })); } });

/* 38 · Stempelet */
RB.legg({ nr: 38, navn: 'Stempelet', scene: 'sand', palett: [f.gronn, f.krem],
  ide: 'Et rundt segl: «RAWBYTE · SKAPET ·» løper rundt kanten, og en krem-r står i midten. Som godkjent-stempelet på et ferdig oppdrag.',
  hvorfor: 'Sier «levert, godkjent, trygt», altså det kundene faktisk kjøper. Ringen gir et tydelig merke for klistremerker, vannmerker og innbygginger, og på 16 px står r-en igjen alene.',
  anim: 'Fra «Signatur» (stempelet): seglet slås ned fra lufta med et tungt dunk, og ringen fortsetter å rotere litt etter. Laster-løkka er ringen som snurrer rolig.',
  ikon: (u) => `${flis(f.gronn)}<defs><path id="${u}p" d="M256,84 a172,172 0 1,1 0,344 a172,172 0 1,1 0,-344"/></defs><g class="segl t">
    <circle cx="256" cy="256" r="206" fill="none" stroke="${f.krem}" stroke-width="7"/><circle cx="256" cy="256" r="140" fill="none" stroke="${f.krem}" stroke-width="4"/>
    <g class="ring" style="transform-box:view-box;transform-origin:256px 256px"><text font-family="futura-pt, Futura, sans-serif" font-weight="700" font-size="34" letter-spacing="7" fill="${f.krem}"><textPath href="#${u}p">RAWBYTE · SKAPET · RAWBYTE · SKAPET ·</textPath></text></g>
    ${rG(f.krem, .78, 256, 262)}</g>`,
  ord: { html: bk('rawbyte'), css: 'font-weight:800' },
  spill(s, l) {
    a(s, '.flis', [{ opacity: 0 }, { opacity: 1 }], { d: 300 });
    a(s, '.segl', [{ transform: 'scale(2.4) rotate(-25deg)', opacity: 0, easing: E.inn }, { transform: 'scale(.92) rotate(2deg)', opacity: 1, offset: .55, easing: E.ut }, { transform: 'none', opacity: 1 }], { d: 900, delay: 150 });
    a(s, '.ring', [{ transform: 'rotate(-200deg)' }, { transform: 'none' }], { d: 2600, delay: 150, e: E.ut });
    a(s, '.flis', [{ transform: 'none' }, { transform: 'scale(.97)', offset: .3 }, { transform: 'none' }], { d: 300, delay: 640, comp: 'add' });
    lockIkon(l, 1300); ordInn(l, 'spre', 1450);
  },
  laster(s) { return a(s, '.ring', [{ transform: 'rotate(0)' }, { transform: 'rotate(360deg)' }], { d: 6000, it: Infinity, e: E.lin, fill: 'none' }); } });

/* 39 · Voksel-r */
const PIX = ['XX.XX.', '.XX..X', '.X....', '.X....', 'XXX...'];
const VC = 50, VG = 6, VD = 18, VX0 = 82, VY0 = 110;
RB.legg({ nr: 39, navn: 'Voksel-r', scene: 'mork', palett: [f.gronn, f.krem, f.mint, '#7fb79d'],
  ide: 'Pikselkunst-r-en fra 23, trukket ut i 3D: hver piksel er en liten kloss. Byte, piksel og blokk på én gang.',
  hvorfor: 'Gir pikselidéen tyngde og dybde uten å bli flat retro. Klossene minner om å «bygge» et bibliotek. Siden kantene er mint mot grønt, holder r-en seg skarp på små størrelser.',
  anim: 'Klossene faller ned én etter én og spretter på plass, som noen som stabler opp skapet. Ordmerket samles av byte-støv.',
  ikon: () => `${flis(f.gronn)}${PIX.flatMap((r, j) => [...r].map((c, i) => { if (c !== 'X') return ''; const x = VX0 + i * (VC + VG), y = VY0 + j * (VC + VG);
    return `<g class="vx t" data-k="${j * 6 + i}"><polygon points="${x + VC},${y} ${x + VC + VD},${y + VD} ${x + VC + VD},${y + VC + VD} ${x + VC},${y + VC}" fill="${f.mint}"/><polygon points="${x},${y + VC} ${x + VC},${y + VC} ${x + VC + VD},${y + VC + VD} ${x + VD},${y + VC + VD}" fill="#7fb79d"/><rect x="${x}" y="${y}" width="${VC}" height="${VC}" rx="5" fill="${f.krem}"/></g>`; })).join('')}`,
  ord: { html: 'rawbyte', css: 'font-weight:800' },
  spill(s, l) {
    a(s, '.flis', [{ transform: 'scale(.7)', opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 600, e: E.fjaer });
    a(s, '.vx', [{ transform: 'translateY(-380px)', opacity: 0, easing: E.inn }, { transform: 'translateY(0)', opacity: 1, offset: .6, easing: E.ut }, { transform: 'translateY(-16px)', offset: .8, easing: E.inn }, { transform: 'none', opacity: 1 }], { d: 700, delay: 200, stagger: (el, i) => i * 95 });
    lockIkon(l, 1700); ordInn(l, 'piksel', 1850);
  } });

/* 40 · Nordlys */
const LYS = [[150, 130, 190, f.lys, .9], [410, 170, 170, f.mint, .85], [340, 440, 200, f.rav, .8], [110, 420, 160, f.gronn, 1]];
RB.legg({ nr: 40, navn: 'Nordlys', scene: 'svart', palett: [f.dyp, f.lys, f.mint, f.rav, f.krem],
  ide: 'En levende fargeflate i Raw Studios’ farger (grønt, mint og ravgult), myk som nordlys, med en skarp krem-r foran.',
  hvorfor: 'Det mest «moderne app-ikon»-aktige forslaget, og det fargerikeste. Det skiller seg ut i oppgavelinja og i App Store. Fargene er hentet fra paletten vi allerede har, så det er fortsatt Raw Studios. Kan gi Tromsø-assosiasjoner, med vilje.',
  anim: 'Fra «Nordlys»: fargene tennes og glir langsomt rundt hverandre bak bokstaven. Laster-løkka lar lyset vandre kontinuerlig.',
  ikon: (u) => `<defs>${flisKlipp(u)}<filter id="${u}b" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="58"/></filter></defs>
    <g clip-path="url(#${u}k)" class="hel t"><rect width="512" height="512" fill="${f.dyp}"/><g filter="url(#${u}b)">${LYS.map(([x, y, r, c, o], i) => `<circle class="ly" data-i="${i}" cx="${x}" cy="${y}" r="${r}" fill="${c}" opacity="${o}"/>`).join('')}</g>
    ${rG(f.krem, 1.22, 248, 268, 'class="rr t"')}</g>`,
  ord: { html: bk('rawbyte'), css: 'font-weight:800' },
  spill(s, l) {
    a(s, '.hel', [{ transform: 'scale(.8)', opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 700, e: E.fjaer });
    s.querySelectorAll('.ly').forEach((el, i) => a(s, el, [{ transform: `translate(${(i % 2 ? -1 : 1) * 160}px,${(i < 2 ? 1 : -1) * 140}px)`, opacity: 0 }, { transform: 'none', opacity: +el.getAttribute('opacity') }], { d: 2200, delay: 150 + i * 120, e: E.ut }));
    a(s, '.rr', [{ transform: 'translateY(50px)', opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 900, delay: 700, e: E.ut });
    lockStd(l, 1700);
  },
  laster(s) { return [...s.querySelectorAll('.ly')].map((el, i) => a(s, el, [{ transform: 'none' }, { transform: `translate(${[120, -140, -100, 130][i]}px,${[110, 120, -130, -100][i]}px)` }], { d: 3000 + i * 400, it: Infinity, dir: 'alternate', e: E.myk, fill: 'none' })); } });
})();
