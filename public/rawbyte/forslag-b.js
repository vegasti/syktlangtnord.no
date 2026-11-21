/* Forslag 11–20 */
(() => {
const { a, E, flis, ring, bk, ordInn, lockIkon } = RB;
const f = RB.farge, B = RB.B;
const meno = (t, x, y, s, w = 900, fill = f.krem, ekstra = '') => `<text x="${x}" y="${y}" font-family="meno-banner, Georgia, serif" font-weight="${w}" font-size="${s}" fill="${fill}" ${ekstra}>${t}</text>`;
const lockStd = (lock, d = 900, stil = 'loft') => { lockIkon(lock, d); ordInn(lock, stil, d + 150); };
const stammeSti = (dx = 0) => `M${B.sx - 30 + dx},${B.top} H${B.sx + B.sw + dx} V${B.bunn} H${B.sx + dx} V${B.top + 44} Q${B.sx + dx},${B.top + 18} ${B.sx - 30 + dx},${B.top + 18} Z`;

/* 11 · Biten */
const BIT = [[360, 104], [312, 104], [360, 152]];
const SMULER = [[388, 50, 26], [446, 98, 18], [430, 168, 14], [470, 52, 12]];
RB.legg({ nr: 11, navn: 'Biten', scene: 'lys',
  palett: [f.gronn, f.krem, f.mint],
  ide: 'Byte ≈ bite. En kremfarget blokk med en «b» der noen har tatt en bit av hjørnet, i firkantede piksler.',
  hvorfor: 'Ordspillet i navnet blir et bilde, med et glimt i øyet. Pikselbiten gjør at det ikke kan forveksles med et velkjent eple. Blokken er stor og rolig, og bokstaven leser fint på 24 px.',
  anim: 'Blokken lander og får tre raske jafs, piksel for piksel, mens smuler flyr ut av hjørnet. Laster-løkka spiser og bygger opp igjen.',
  ikon: () => `${flis(f.gronn)}<g class="blokk t"><rect x="104" y="104" width="304" height="304" rx="54" fill="${f.krem}"/>${meno('b', 236, 372, 270, 900, f.gronn, 'text-anchor="middle"')}</g>
    ${BIT.map(([x, y], i) => `<rect class="px t" x="${x}" y="${y}" width="48" height="48" fill="${f.gronn}"/>`).join('')}
    ${SMULER.map(([x, y, s]) => `<rect class="smule t" x="${x}" y="${y}" width="${s}" height="${s}" rx="3" fill="${f.krem}"/>`).join('')}`,
  ord: { html: bk('rawbyte') + `<span class="bk sm" style="display:inline-block;width:.14em;height:.14em;background:currentColor;margin-left:.06em;vertical-align:.55em"></span><span class="bk sm" style="display:inline-block;width:.09em;height:.09em;background:currentColor;margin-left:.04em;vertical-align:.85em"></span>`, css: 'font-weight:800' },
  spill(s, l) {
    a(s, '.flis', [{ opacity: 0 }, { opacity: 1 }], { d: 300 });
    a(s, '.blokk', [{ transform: 'translateY(-90px) scale(.8)', opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 700, delay: 100, e: E.stor });
    a(s, '.px', [{ transform: 'scale(0)' }, { transform: 'scale(1.15)', offset: .6 }, { transform: 'none' }], { d: 220, delay: 900, stagger: 260, e: E.ut });
    a(s, '.smule', [{ transform: 'translate(-60px,60px) scale(0) rotate(0)', opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 700, delay: 950, stagger: i => i * 200, e: E.fjaer });
    a(s, '.blokk', [{ transform: 'none' }, { transform: 'scale(.97)', offset: .5 }, { transform: 'none' }], { d: 260, delay: 900, it: 3, comp: 'add' });
    lockIkon(l, 1700); ordInn(l, 'tone', 1800);
    a(l, '.sm', [{ transform: 'translate(-20px,10px) scale(0)' }, { transform: 'none' }], { d: 600, delay: 2200, stagger: 120, e: E.fjaer });
  },
  laster(s) { return a(s, '.px', [{ transform: 'scale(0)' }, { transform: 'scale(1)', offset: .3 }, { transform: 'scale(1)', offset: .7 }, { transform: 'scale(0)' }], { d: 1600, it: Infinity, stagger: 140, e: 'steps(3)', fill: 'none' }); } });

/* 12 · Én strek */
const STREK = 'M168,112 Q232,96 232,150 V352 C232,410 280,420 316,420 C380,420 414,372 414,318 C414,262 376,222 322,222 C280,222 246,246 232,280';
RB.legg({ nr: 12, navn: 'Én strek', scene: 'mork',
  palett: [f.gronn, f.krem, f.mint],
  ide: 'En «b» tegnet med én sammenhengende strek, med en liten krok øverst lånt fra Meno Banners serif. Ordmerket understrekes med samme strek.',
  hvorfor: 'Den mest animerbare av alle. Streken tegner seg selv, og den samme streken kan være spinner, framdriftslinje og understrekning. Jevn strektykkelse gjør den robust på 16 px.',
  anim: 'Streken tegnes på 1,4 sekunder, og ordmerket avdekkes mens en mint linje trekkes under. Laster-løkka sender et lysende segment rundt bokstaven.',
  ikon: () => `${flis(f.gronn)}<g transform="translate(-35 0)"><path d="${STREK}" stroke="${f.dyp}" stroke-opacity=".35" stroke-width="46" fill="none" stroke-linecap="round" stroke-linejoin="round" class="spor" opacity="0"/>
    <path class="strek" d="${STREK}" pathLength="1" stroke-dasharray="1 0" stroke="${f.krem}" stroke-width="46" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`,
  ord: { html: bk('rawbyte') + `<svg class="u" viewBox="0 0 300 20" preserveAspectRatio="none" style="position:absolute;left:0;bottom:-.14em;width:100%;height:.2em;overflow:visible"><path d="M4,12 C80,3 200,3 296,9" pathLength="1" stroke="${f.mint}" stroke-width="5" fill="none" stroke-linecap="round" stroke-dasharray="1 1" vector-effect="non-scaling-stroke"/></svg>`, css: 'font-weight:400' },
  spill(s, l) {
    a(s, '.flis', [{ transform: 'scale(.7)', opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 600, e: E.fjaer });
    a(s, '.strek', [{ strokeDasharray: '0 1' }, { strokeDasharray: '1 0' }], { d: 1400, delay: 350, e: E.myk });
    lockIkon(l, 1500); ordInn(l, 'sveip', 1600);
    a(l, '.u path', [{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], { d: 900, delay: 2200, e: E.myk });
  },
  laster(s) {
    return [a(s, '.spor', [{ opacity: 1 }, { opacity: 1 }], { d: 1000, it: Infinity, fill: 'none' }),
      a(s, '.strek', [{ strokeDasharray: '.22 .78', strokeDashoffset: 0 }, { strokeDasharray: '.22 .78', strokeDashoffset: -1 }], { d: 1300, it: Infinity, e: E.lin, fill: 'none' })];
  } });

/* 13 · Rasteret */
const sd = (x, y) => {
  const sx = Math.max(Math.abs(x - (B.sx + B.sw / 2)) - B.sw / 2, Math.abs(y - (B.top + B.bunn) / 2) - (B.bunn - B.top) / 2);
  const d = Math.hypot(x - B.cx, y - B.cy);
  return Math.min(sx, Math.max(d - B.Ro, B.Ri - d));
};
const PRIKKER = []; for (let j = 0; j < 18; j++) for (let i = 0; i < 18; i++) {
  const x = 35 + i * 26, y = 35 + j * 26, t = Math.min(1, Math.max(0, (16 - sd(x, y)) / 46));
  PRIKKER.push([x, y, (1.4 + 11.6 * t).toFixed(1), Math.hypot(x - 40, y - 470)]);
}
RB.legg({ nr: 13, navn: 'Rasteret', scene: 'lys',
  palett: [f.krem, f.gronn, f.mint],
  ide: 'En «b» bygd av halvtoneprikker, slik bilder trykkes. Den er <b>adaptiv</b>: under 48 px blir prikkene en heltrukken bokstav.',
  hvorfor: 'Fotografi og trykk i ett grep, og prikkene er et mønster vi kan bruke overalt (bakgrunner, lasting, kort). Den adaptive småversjonen gjør at oppgavelinja får et skarpt tegn.',
  anim: 'Prikkene vokser fram i en bølge fra hjørnet. Laster-løkka sender bølger gjennom rasteret, rolig og nesten hypnotisk.',
  ikon: (u, o) => o.liten
    ? `${flis(f.krem)}<path d="${stammeSti()}" fill="${f.gronn}"/><path d="${ring(B.cx, B.cy, B.Ro, B.Ri)}" fill="${f.gronn}" fill-rule="evenodd"/>`
    : `${flis(f.krem)}${PRIKKER.map(([x, y, r, d]) => `<circle class="pk t" data-d="${d.toFixed(0)}" cx="${x}" cy="${y}" r="${r}" fill="${f.gronn}"/>`).join('')}`,
  ord: { html: bk('rawbyte'), klasse: 'futura', css: 'font-weight:400;letter-spacing:.01em' },
  spill(s, l) {
    a(s, '.flis', [{ opacity: 0 }, { opacity: 1 }], { d: 300 });
    a(s, '.pk', [{ transform: 'scale(0)' }, { transform: 'scale(1.6)', offset: .5 }, { transform: 'none' }], { d: 700, delay: 150, stagger: el => +el.dataset.d * 2.2, e: E.ut });
    lockIkon(l, 1500); ordInn(l, 'blur', 1600);
  },
  laster(s) { return a(s, '.pk', [{ transform: 'none' }, { transform: 'scale(1.7)', offset: .15 }, { transform: 'scale(.5)', offset: .35 }, { transform: 'none', offset: .55 }, { transform: 'none' }], { d: 2400, it: Infinity, stagger: el => +el.dataset.d * 2.4, e: E.myk, fill: 'none' }); } });

/* 14 · Murverket */
const FLIS_M = [
  { x: 80, y: 80, w: 106, h: 352, b: 1 },
  { x: 203, y: 80, w: 107, h: 120 }, { x: 327, y: 80, w: 105, h: 64 }, { x: 327, y: 160, w: 105, h: 40 }];
RB.legg({ nr: 14, navn: 'Murverket', scene: 'mork',
  palett: [f.gronn, f.krem, f.mint],
  ide: 'Skapets eget murverk-rutenett, der fire av flisene utgjør en «b». Resten ligger svakt rundt, som filene i en mappe.',
  hvorfor: 'Ikonet er bokstavelig talt produktet: det samme rutenettet kundene ser når de åpner Skapet. Inngangsbølgen i ikonet er den samme som kortene har, så merket og appen beveger seg likt.',
  anim: 'Flisene kommer inn i den samme bølgen som kortene i Skapet, og b-en løfter seg ut av rutenettet. Laster-løkka er en «skjelett»-puls flis for flis, klar til å bli lastetilstanden i appen.',
  ikon: () => `${flis(f.gronn)}${FLIS_M.map(t => `<rect class="m t ${t.b ? 'bdel' : 'svak'}" x="${t.x}" y="${t.y}" width="${t.w}" height="${t.h}" rx="22" fill="${t.b ? f.krem : f.mint}" ${t.b ? '' : 'fill-opacity=".3"'}/>`).join('')}
    <path class="m t bdel" d="M225,216 H324 A108,108 0 0 1 324,432 H225 Q203,432 203,410 V238 Q203,216 225,216 Z M272,324 a46,46 0 1,0 92,0 a46,46 0 1,0 -92,0 Z" fill="${f.krem}" fill-rule="evenodd"/>`,
  ord: { html: bk('rawbyte', true), css: 'font-weight:800' },
  spill(s, l) {
    a(s, '.flis', [{ opacity: 0 }, { opacity: 1 }], { d: 300 });
    const rekke = [...s.querySelectorAll('.m')].sort((p, q) => (+p.getAttribute('x') || 203) + (+p.getAttribute('y') || 216) - ((+q.getAttribute('x') || 203) + (+q.getAttribute('y') || 216)));
    a(s, rekke, [{ transform: 'translateY(48px) scale(.92)', opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 650, delay: 150, stagger: 90, e: E.ut });
    a(s, '.bdel', [{ transform: 'none' }, { transform: 'translateY(-10px) scale(1.03)', offset: .4 }, { transform: 'none' }], { d: 700, delay: 1000, comp: 'add', e: E.myk });
    lockStd(l, 1300);
  },
  laster(s) { return a(s, '.m', [{ opacity: 1 }, { opacity: .35, offset: .5 }, { opacity: 1 }], { d: 1200, it: Infinity, stagger: 150, e: E.myk, fill: 'none' }); } });

/* 15 · Synk-løkka */
const bue = (r, a0, a1) => { const p = g => [B.cx + r * Math.cos(g * Math.PI / 180), B.cy + r * Math.sin(g * Math.PI / 180)].map(v => v.toFixed(1)); const [x0, y0] = p(a0), [x1, y1] = p(a1); return `M${x0},${y0} A${r},${r} 0 ${a1 - a0 > 180 ? 1 : 0},1 ${x1},${y1}`; };
RB.legg({ nr: 15, navn: 'Synk-løkka', scene: 'svart',
  palett: [f.blekk, f.krem, f.lys],
  ide: 'En bygd «b» med en grønn bue rundt bollen, som en synkpil eller en komet i bane.',
  hvorfor: 'Rawbyte synker mellom maskin, nett og app (Transfer, rawMotion, mobilappen). Buen blir et selvskrevet statusikon: når den roterer, jobber Rawbyte.',
  anim: 'Bokstaven bygges, og buen skytes rundt bollen én gang og legger seg. Laster-løkka er buen i bane, og kan stå i systemstatusfeltet mens Transfer laster opp.',
  ikon: () => `${flis(f.blekk)}<path class="stamme t" d="${stammeSti()}" fill="${f.krem}"/><path class="bolle t" d="${ring(B.cx, B.cy, B.Ro, B.Ri)}" fill="${f.krem}" fill-rule="evenodd"/>
    <g class="bane" style="transform-box:view-box;transform-origin:${B.cx}px ${B.cy}px"><path d="${bue(152, -80, 70)}" stroke="${f.lys}" stroke-width="28" fill="none" stroke-linecap="round"/><circle cx="${(B.cx + 152 * Math.cos(70 * Math.PI / 180)).toFixed(1)}" cy="${(B.cy + 152 * Math.sin(70 * Math.PI / 180)).toFixed(1)}" r="24" fill="${f.lys}"/></g>`,
  ord: { html: bk('rawbyte'), css: 'font-weight:700' },
  spill(s, l) {
    a(s, '.flis', [{ opacity: 0 }, { opacity: 1 }], { d: 300 });
    a(s, '.stamme', [{ transform: 'translateY(80px)', opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 600, delay: 150, e: E.ut });
    a(s, '.bolle', [{ transform: 'scale(.2)', opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 650, delay: 300, e: E.fjaer });
    a(s, '.bane', [{ transform: 'rotate(-400deg) scale(.6)', opacity: 0 }, { opacity: 1, offset: .2 }, { transform: 'none', opacity: 1 }], { d: 1400, delay: 550, e: E.ut });
    lockIkon(l, 1500); ordInn(l, 'tone', 1600);
  },
  laster(s) { return a(s, '.bane', [{ transform: 'rotate(0)' }, { transform: 'rotate(360deg)' }], { d: 1100, it: Infinity, e: E.lin, fill: 'none' }); } });

/* 16 · Bayer-mosaikken */
const BF = { R: '#d4643f', G: '#4fb886', B: '#3f6fb3' };
const Q = { R: [76, 76], G1: [265, 76], G2: [76, 265], B: [265, 265] };
const MOS = (() => { const teller = { R: 0, G1: 0, G2: 0, B: 0 }, ut = [];
  for (let r = 0; r < 8; r++) for (let c = 0; c < 8; c++) {
    const g = r % 2 ? (c % 2 ? 'B' : 'G2') : (c % 2 ? 'G1' : 'R'); const k = teller[g]++;
    const tx = Q[g][0] + (k % 4) * 42.75 + 2.4, ty = Q[g][1] + Math.floor(k / 4) * 42.75 + 2.4;
    ut.push({ g, tx, ty, dx: 76 + c * 45 + 3 - tx, dy: 76 + r * 45 + 3 - ty });
  } return ut; })();
RB.legg({ nr: 16, navn: 'Bayer-mosaikken', scene: 'svart',
  palett: [f.blekk, BF.R, BF.G, BF.B, f.krem],
  ide: 'En råfil er bokstavelig talt en mosaikk av røde, grønne og blå piksler (RGGB). Fire felt, med «r» i det røde og «b» i det blå: raw-byte diagonalt.',
  hvorfor: 'Det mest «raw» et merke kan bli, og fotografer kjenner det igjen med en gang. Fire fargeflater gjør det til det tydeligste ikonet i hele oppgavelinja.',
  anim: '«Demosaikk»: 64 små piksler i Bayer-mønster sorterer seg selv inn i fire felt, og bokstavene dukker opp. Laster-løkka sorterer fram og tilbake, som en råfil som fremkalles.',
  ikon: () => `${flis(f.blekk)}
    ${Object.entries(Q).map(([g, [x, y]]) => `<rect class="kv t" x="${x}" y="${y}" width="171" height="171" rx="30" fill="${BF[g[0]]}"/>`).join('')}
    ${MOS.map(m => `<rect class="mp t" data-dx="${m.dx}" data-dy="${m.dy}" x="${m.tx.toFixed(1)}" y="${m.ty.toFixed(1)}" width="38" height="38" rx="7" fill="${BF[m.g[0]]}" opacity="0"/>`).join('')}
    <g class="bok">${meno('r', 161, 214, 170, 900, f.krem, 'text-anchor="middle"')}${meno('b', 350, 404, 170, 900, f.krem, 'text-anchor="middle"')}</g>`,
  ord: { html: bk('rawbyte'), under: 'R · G · G · B', css: 'font-weight:800' },
  spill(s, l) {
    a(s, '.flis', [{ opacity: 0 }, { opacity: 1 }], { d: 300 });
    s.querySelectorAll('.mp').forEach((el, i) => a(s, el, [{ opacity: 0, transform: `translate(${el.dataset.dx}px,${el.dataset.dy}px) scale(.4)` }, { opacity: 1, transform: `translate(${el.dataset.dx}px,${el.dataset.dy}px)`, offset: .25 }, { opacity: 1, transform: 'none', offset: .85 }, { opacity: 0, transform: 'none' }], { d: 1700, delay: 150 + (i % 8) * 25 + Math.floor(i / 8) * 25, e: E.myk }));
    a(s, '.kv', [{ opacity: 0, transform: 'scale(.96)' }, { opacity: 1, transform: 'none' }], { d: 500, delay: 1450, e: E.ut });
    a(s, '.bok text', [{ opacity: 0, transform: 'translateY(30px)' }, { opacity: 1, transform: 'none' }], { d: 600, delay: 1700, stagger: 150, e: E.fjaer });
    lockIkon(l, 1900); ordInn(l, 'blur', 2000);
  },
  laster(s) {
    return [a(s, ['.kv', '.bok'].flatMap(q => [...s.querySelectorAll(q)]), [{ opacity: 0 }, { opacity: 0 }], { d: 1000, it: Infinity, fill: 'none' }),
      ...[...s.querySelectorAll('.mp')].map((el, i) => a(s, el, [{ opacity: 1, transform: `translate(${el.dataset.dx}px,${el.dataset.dy}px)` }, { opacity: 1, transform: 'none', offset: .4 }, { opacity: 1, transform: 'none', offset: .6 }, { opacity: 1, transform: `translate(${el.dataset.dx}px,${el.dataset.dy}px)` }], { d: 2600, it: Infinity, delay: (i % 8 + Math.floor(i / 8)) * 20, e: E.myk, fill: 'none' }))];
  } });

/* 17 · Opptak */
RB.legg({ nr: 17, navn: 'Opptak', scene: 'mork',
  palett: [f.dyp, f.krem, f.rav],
  ide: 'En bygd «b» der rommet i bollen er en ravgul opptaksprikk, som blir til en avspillingstrekant når noe spilles av.',
  hvorfor: 'Video er halve Rawbyte (RawPlayer, RawEditor, rawMotion). Ravgult mot mørkegrønt er varmt, eget og synlig på lang avstand. Én form som kan bytte tilstand er gull i et produkt.',
  anim: 'Bokstaven settes sammen, REC-prikken blinker to ganger og vrir seg til en ▶. Laster-løkka er et rolig REC-blink.',
  ikon: () => `${flis(f.dyp)}<path class="stamme t" d="${stammeSti()}" fill="${f.krem}"/><path class="bolle t" d="${ring(B.cx, B.cy, B.Ro, 64)}" fill="${f.krem}" fill-rule="evenodd"/>
    <circle class="rec t" cx="${B.cx}" cy="${B.cy}" r="36" fill="${f.rav}"/>
    <path class="play t" d="M${B.cx - 22},${B.cy - 36} L${B.cx + 38},${B.cy} L${B.cx - 22},${B.cy + 36} Z" fill="${f.rav}" stroke="${f.rav}" stroke-width="10" stroke-linejoin="round" opacity="0"/>`,
  ord: { html: bk('rawbyte'), klasse: 'futura', under: '● ta opp · ▶ spill av', css: 'font-weight:600;letter-spacing:-.01em' },
  spill(s, l) {
    a(s, '.flis', [{ transform: 'scale(.7)', opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 600, e: E.fjaer });
    a(s, '.stamme', [{ transform: 'translateY(120px)', opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 600, delay: 200, e: E.ut });
    a(s, '.bolle', [{ transform: 'rotate(-90deg) scale(.3)', opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 700, delay: 350, e: E.fjaer });
    a(s, '.rec', [{ transform: 'scale(0)', opacity: 1 }, { transform: 'scale(1)', opacity: 1, offset: .2 }, { opacity: .25, offset: .3 }, { opacity: 1, offset: .4 }, { opacity: .25, offset: .5 }, { opacity: 1, offset: .6 }, { transform: 'scale(1)', opacity: 1, offset: .72 }, { transform: 'scale(0)', opacity: 1, offset: .8 }, { transform: 'scale(0)', offset: .88 }, { transform: 'scale(1)', opacity: 1 }], { d: 3600, delay: 700, e: E.myk });
    a(s, '.play', [{ transform: 'rotate(-120deg) scale(0)', opacity: 1 }, { transform: 'none', opacity: 1, offset: .45, easing: E.fjaer }, { transform: 'none', opacity: 1, offset: .8 }, { transform: 'scale(0)', opacity: 1 }], { d: 1500, delay: 3200 - 400, e: E.ut, fill: 'none' });
    lockIkon(l, 1300); ordInn(l, 'tone', 1400);
  },
  laster(s) { return a(s, '.rec', [{ opacity: 1, transform: 'none' }, { opacity: .2, transform: 'scale(.85)' }], { d: 650, it: Infinity, dir: 'alternate', e: E.myk, fill: 'none' }); } });

/* 18 · Merkelappen */
RB.legg({ nr: 18, navn: 'Merkelappen', scene: 'sand',
  palett: [f.gronn, f.krem, f.sand],
  ide: 'En merkelapp på en hyssing, med «b» trykt på. Metadata, tagger, søk: det som gjør en haug filer til et bibliotek.',
  hvorfor: 'Rawbytes fortrinn er ikke at den lagrer, men at den <i>finner</i> (tagger, ansikter, Rawbot-søk). Merkelappen sier «organisert» og er varm og fysisk som en papirlapp.',
  anim: 'Lappen svinger inn på hyssingen og dempes som en pendel, akkurat litt for lenge, så den føles ekte. Ordmerket faller ned bokstav for bokstav.',
  ikon: () => `${flis(f.gronn)}<g class="lapp" style="transform-box:view-box;transform-origin:256px 160px"><g transform="rotate(-10 256 160)">
    <path d="M256,92 Q246,62 268,38" stroke="${f.krem}" stroke-width="7" fill="none" stroke-linecap="round"/>
    <path d="M256,86 L346,166 V394 Q346,424 316,424 H196 Q166,424 166,394 V166 Z" fill="${f.krem}" stroke="${f.krem}" stroke-width="14" stroke-linejoin="round"/>
    <circle cx="256" cy="162" r="17" fill="${f.gronn}"/>${meno('b', 256, 388, 200, 900, f.gronn, 'text-anchor="middle"')}</g></g>`,
  ord: { html: bk('rawbyte'), under: 'tagg · finn · del', css: 'font-weight:800' },
  spill(s, l) {
    a(s, '.flis', [{ opacity: 0 }, { opacity: 1 }], { d: 300 });
    a(s, '.lapp', [{ transform: 'translateY(-420px) rotate(0)', easing: E.ut }, { transform: 'rotate(38deg)', offset: .2 }, { transform: 'rotate(-26deg)', offset: .38 }, { transform: 'rotate(16deg)', offset: .54 }, { transform: 'rotate(-9deg)', offset: .68 }, { transform: 'rotate(4deg)', offset: .82 }, { transform: 'rotate(-1.5deg)', offset: .92 }, { transform: 'none' }], { d: 2400, delay: 150, e: E.myk });
    lockIkon(l, 1300, [{ opacity: 0, transform: 'rotate(30deg)', transformOrigin: '50% 0' }, { opacity: 1, transform: 'none', transformOrigin: '50% 0' }]); ordInn(l, 'fall', 1400);
  } });

/* 19 · Origami */
const fasetter = () => {
  const ut = []; const tone = (x, y) => { const v = (x * -0.7 + y * -0.7); return v; };
  const S = [[B.sx - 30, B.top], [B.sx + B.sw, B.top], [B.sx + B.sw, B.bunn], [B.sx, B.bunn], [B.sx, B.top + 40]];
  ut.push([[S[0], S[1], S[4]], 0], [[S[1], S[2], S[4]], 1], [[S[4], S[2], S[3]], 2]);
  const N = 8, Ro = B.Ro + 4, Ri = B.Ri + 6;
  for (let k = 0; k < N; k++) {
    const g0 = (k / N) * Math.PI * 2 - Math.PI / 2, g1 = ((k + 1) / N) * Math.PI * 2 - Math.PI / 2;
    const P = (r, g) => [B.cx + r * Math.cos(g), B.cy + r * Math.sin(g)];
    ut.push([[P(Ro, g0), P(Ro, g1), P(Ri, g0)], 3 + k * 2], [[P(Ro, g1), P(Ri, g1), P(Ri, g0)], 4 + k * 2]);
  }
  const farger = ['#f5f0eb', '#e6ddd3', '#cfe6da', '#a0d2b9', '#bcdccb', '#eae1da'];
  return ut.map(([p, i]) => { const cx = (p[0][0] + p[1][0] + p[2][0]) / 3, cy = (p[0][1] + p[1][1] + p[2][1]) / 3;
    const lys = Math.max(0, Math.min(5, Math.round(((cx - 100) + (cy - 100)) / 120 + (i % 2) * 1.2)));
    return `<polygon class="fa t" data-i="${i}" points="${p.map(q => q.map(v => v.toFixed(1)).join(',')).join(' ')}" fill="${farger[lys]}" stroke="${farger[lys]}" stroke-width="1.5" stroke-linejoin="round"/>`; }).join('');
};
RB.legg({ nr: 19, navn: 'Origami', scene: 'mork',
  palett: [f.gronn, f.krem, '#cfe6da', f.mint],
  ide: 'En «b» brettet av papir: stammen i tre fasetter og bollen som en slipt ring i seksten. Ordmerket står i tynn Futura med luft mellom bokstavene.',
  hvorfor: 'Gir dybde uten 3D-effekter, og fasettene fanger lys som en lysboks. Det mest «premium» uttrykket, godt egnet når Rawbyte selges til større kunder. Silhuetten er den samme bygde b-en, så den leser også i små størrelser.',
  anim: 'Fasettene brettes ut én og én rundt bollen, og en lysstripe glir over papiret. Laster-løkka glitrer fasett for fasett.',
  ikon: () => `${flis(f.gronn)}${fasetter()}`,
  ord: { html: bk('RAWBYTE'), klasse: 'futura', css: 'font-weight:300;letter-spacing:.28em;font-size:clamp(34px,4.4vw,64px)' },
  spill(s, l) {
    a(s, '.flis', [{ transform: 'scale(.7)', opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 600, e: E.fjaer });
    a(s, '.fa', [{ transform: 'scale(0) rotate(-60deg)', opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 520, delay: 250, stagger: el => +el.dataset.i * 55, e: E.fjaer });
    a(s, '.fa', [{ filter: 'brightness(1)' }, { filter: 'brightness(1.25)', offset: .5 }, { filter: 'brightness(1)' }], { d: 500, delay: 1500, stagger: el => (+el.getAttribute('points').split(',')[0]) * 1.6, comp: 'add' });
    lockIkon(l, 1500); ordInn(l, 'spre', 1600);
  },
  laster(s) { return a(s, '.fa', [{ filter: 'brightness(1)' }, { filter: 'brightness(1.3)', offset: .1 }, { filter: 'brightness(1)', offset: .25 }], { d: 2200, it: Infinity, stagger: el => +el.dataset.i * 110, fill: 'none' }); } });

/* 20 · Splitten */
RB.legg({ nr: 20, navn: 'Splitten raw/byte', scene: 'lys',
  palett: [f.gronn, f.krem, f.blekk],
  ide: 'Flisa er delt på skrå i grønt og krem, og «rb» står over skillet og bytter farge der det krysser. Ordmerket deler seg også: <span class="meno" style="font-weight:900">raw</span> i tung Meno Banner og <span class="futura" style="font-weight:300">byte</span> i tynn Futura.',
  hvorfor: 'Produktets to sider, håndverk og teknologi, i ett tegn. Diagonalen gjør ikonet dynamisk også når det står stille, og de to tonene skaper kontrast både i mørk og lys oppgavelinje.',
  anim: 'En diagonal glir over flisa og bytter fargene på bokstavene i farten. Logoen åpner seg i midten: «raw» skyves ut til venstre og «byte» til høyre.',
  ikon: (u) => { const rb = (fill) => `<g class="rb2">${meno('r', 250, 370, 320, 900, fill, 'text-anchor="end"')}${meno('b', 222, 370, 320, 900, fill)}</g>`;
    return `<defs><clipPath id="${u}a"><polygon class="dk" points="-40,-40 552,-40 -40,552"/></clipPath><clipPath id="${u}b"><polygon class="dk2" points="552,-40 2000,-40 2000,2000 -40,2000 -40,552"/></clipPath><clipPath id="${u}f"><rect width="512" height="512" rx="116"/></clipPath></defs>
    <g clip-path="url(#${u}f)" class="hel t"><rect width="512" height="512" fill="${f.krem}"/><polygon class="dk" points="-40,-40 552,-40 -40,552" fill="${f.gronn}"/>
    <g clip-path="url(#${u}a)">${rb(f.krem)}</g><g clip-path="url(#${u}b)">${rb(f.gronn)}</g></g>`; },
  ord: { html: `<span class="meno" style="font-weight:900">${bk('raw', true, 'v')}</span><span class="futura" style="font-weight:300;letter-spacing:-.01em">${bk('byte', true, 'h')}</span>`, klasse: '' },
  spill(s, l) {
    a(s, '.hel', [{ transform: 'scale(.7)', opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 600, e: E.fjaer });
    a(s, '.dk', [{ transform: 'translate(-560px,-560px)' }, { transform: 'translate(40px,40px)', offset: .8 }, { transform: 'none' }], { d: 1300, delay: 350, e: E.myk });
    a(s, '.dk2', [{ transform: 'translate(-560px,-560px)' }, { transform: 'translate(40px,40px)', offset: .8 }, { transform: 'none' }], { d: 1300, delay: 350, e: E.myk });
    a(s, '.rb2', [{ transform: 'translateX(40px)' }, { transform: 'none' }], { d: 1300, delay: 350, e: E.myk });
    lockIkon(l, 1300);
    a(l, '.v', [{ transform: 'translateX(110%)' }, { transform: 'none' }], { d: 900, delay: 1450, stagger: -60, e: E.ut });
    a(l, '.h', [{ transform: 'translateX(-110%)' }, { transform: 'none' }], { d: 900, delay: 1450, stagger: 60, e: E.ut });
  } });
})();
