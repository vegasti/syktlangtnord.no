/* Runde 4 · 61–72: Meno Banner er hovedpersonen, pikslene er krydderet — og pikslene er laget av Meno selv.
   Registreres etter at skrifta er lastet (mosaikken måles på ekte glyfer). */
window.RB4 = () => {
const { a, E, flis, bk, ordInn, lockIkon } = RB;
const f = RB.farge;
const lockStd = (l, d, stil = 'blur') => { lockIkon(l, d); ordInn(l, stil, d + 150); };
const TRT = 'style="transform-box:fill-box;transform-origin:100% 0"';
const mikroR = (bg, fg) => `${flis(bg)}${PM.tekst(PM.plasser('r', { maxH: 330, cx: 252 }), fg)}`;
/* Felles: «raw» og «byte» stablet i samme størrelse */
const stablet = (maxB = 350, y1 = 182, y2 = 334) => {
  const s = Math.min(PM.plasser('raw', { maxB }).s, PM.plasser('byte', { maxB }).s);
  return [PM.plasser('raw', { s, cy: y1 }), PM.plasser('byte', { s, cy: y2 })];
};

/* 61 · raw skarp, byte pikslet */
RB.legg({ nr: 61, navn: 'raw skarp, byte pikslet', scene: 'mork', palett: [f.gronn, f.krem, f.mint],
  ide: 'Dagens stablede «raw / byte», nå i tung Meno. «raw» står knivskarp, mens «byte» er den <i>samme skrifta</i> i lav oppløsning: en mosaikk av Meno-bokstavene.',
  hvorfor: 'Navnet forklarer seg selv: raw er håndverket i vektor, byte er det digitale i piksler. Pikslene er laget av Meno, så de har samme tyngde og rytme og ser ikke ut som en fremmed skrift. Det er familie med Raw Studios.',
  anim: '«raw» glir opp, og pikslene i «byte» popper inn i tilfeldig rekkefølge, som et bilde som laster. Ordmerket blendes inn: raw skarp, byte pikslet.',
  ikon: (u, o) => { if (o.mikro) return mikroR(f.gronn, f.krem); const [r, b] = stablet();
    return `${flis(f.gronn)}<g class="raw t">${PM.tekst(r, f.krem)}</g>${PM.mosaikk(b, 14, { fill: f.mint, kontrast: true })}`; },
  ord: { html: bk('raw') + PM.ordMosaikk('byte', { celle: .085, fill: '#6fb898' }), css: 'font-weight:800' },
  spill(s, l) {
    a(s, '.flis', [{ transform: 'scale(.7)', opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 550, e: E.fjaer });
    a(s, '.raw', [{ transform: 'translateY(40px)', opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 700, delay: 200, e: E.ut });
    a(s, '.mp', [{ opacity: 0, transform: 'scale(.2)' }, { opacity: 1, transform: 'none' }], { d: 260, delay: 500, stagger: () => Math.random() * 700, e: E.ut });
    lockStd(l, 1400);
  } });

/* 62 · Fremkallingen */
const LAG = [56, 36, 22, 13, 7];
RB.legg({ nr: 62, navn: 'Fremkallingen', scene: 'mork', palett: [f.gronn, f.krem, f.mint],
  ide: 'Ikonet er rett og slett «raw» i tung Meno, med en liten mint piksel som punktum. Pikselidéen bor i <b>bevegelsen</b>: alt i merket kommer inn som et bilde som lastes, fra grove piksler til knivskarp skrift.',
  hvorfor: 'Merket står helt rent, Meno og Raw Studios som før, men hver gang det vises, forteller det hva Rawbyte gjør: gjør det rå om til det ferdige. Den samme effekten kan brukes på bilder i skapet mens de laster.',
  anim: 'Fem trinn fra grov mosaikk til skarp skrift på et knapt sekund. Ordmerket fremkalles på samme måte. Laster-løkka går gjennom trinnene igjen og igjen.',
  ikon: (u, o) => { if (o.mikro) return mikroR(f.gronn, f.krem); const p = PM.plasser('raw', { maxB: 350, cx: 246 }), q = p.s * .13;
    return `${flis(f.gronn)}${o.liten ? '' : LAG.map(c => `<g class="lag" opacity="0">${PM.mosaikk(p, c)}</g>`).join('')}<g class="skarp">${PM.tekst(p, f.krem)}</g><rect class="pkt t" x="${(p.boks[2] + q * .45).toFixed(1)}" y="${(p.y - q).toFixed(1)}" width="${q.toFixed(1)}" height="${q.toFixed(1)}" fill="${f.mint}"/>`; },
  ord: { html: bk('rawbyte'), css: 'font-weight:800' },
  spill(s, l) {
    a(s, '.flis', [{ transform: 'scale(.8)', opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 450, e: E.fjaer });
    a(s, '.lag', [{ opacity: 1 }, { opacity: 1 }], { d: 150, delay: 300, stagger: 150, fill: 'none' });
    a(s, '.skarp', [{ opacity: 0 }, { opacity: 0, offset: .85 }, { opacity: 1 }], { d: 300 + LAG.length * 150 + 200, e: E.lin });
    a(s, '.pkt', [{ transform: 'scale(0)' }, { transform: 'scale(1.4)', offset: .6 }, { transform: 'none' }], { d: 380, delay: 1300, e: 'steps(3)' });
    lockStd(l, 1300, 'skarp');
  },
  laster(s) { const n = LAG.length, T = (n + 3) * 160;
    return [...[...s.querySelectorAll('.lag')].map((el, i) => a(s, el, [{ opacity: 0 }, { opacity: 0, offset: i / (n + 3) }, { opacity: 1, offset: i / (n + 3) }, { opacity: 1, offset: (i + 1) / (n + 3) }, { opacity: 0, offset: (i + 1) / (n + 3) }, { opacity: 0 }], { d: T, it: Infinity, e: E.lin, fill: 'none' })).flat(),
      ...a(s, '.skarp', [{ opacity: 0 }, { opacity: 0, offset: n / (n + 3) }, { opacity: 1, offset: n / (n + 3) }, { opacity: 1 }], { d: T, it: Infinity, e: E.lin, fill: 'none' })]; } });

/* 63 · Analog → digital (ekte Meno) */
RB.legg({ nr: 63, navn: 'Analog → digital', scene: 'mork', palett: [f.mork, f.krem, f.mint],
  ide: 'En stor Meno-r der stammen og serifene er skarpe, mens armen og dråpen går over i piksler, laget av den samme bokstaven. Noen piksler har løsnet og driver ut.',
  hvorfor: 'Den riktige utgaven av 22. Pikslene er ikke tegnet på, de er bokstaven selv i lavere oppløsning, så overgangen er sømløs. Raw blir byte i én bokstav, og Meno beholder hele sin karakter.',
  anim: 'Pikslene suser inn fra høyre og setter seg i armen, og den skarpe delen av bokstaven løfter seg på plass. Ordmerket fremkalles fra grove piksler.',
  ikon: (u, o) => { const p = PM.plasser('r', { maxH: 330, cx: 236, cy: 262 }), X = p.boks[0] + (p.boks[2] - p.boks[0]) * .56, c = 17;
    const loss = [[p.boks[2] + 14, p.boks[1] + 30, 15], [p.boks[2] + 44, p.boks[1] + 6, 11], [p.boks[2] + 34, p.boks[1] + 70, 8]];
    return `${flis(f.mork)}<defs><clipPath id="${u}c"><rect x="0" y="0" width="${X.toFixed(1)}" height="512"/></clipPath></defs><g class="skarp" clip-path="url(#${u}c)">${PM.tekst(p, f.krem)}</g>
      ${PM.mosaikk(p, c, { region: (x) => x > X })}${loss.map(([x, y, z]) => `<rect class="mp los t" x="${x.toFixed(0)}" y="${y.toFixed(0)}" width="${z}" height="${z}" fill="${f.mint}"/>`).join('')}`; },
  ord: { html: bk('rawbyte'), css: 'font-weight:800' },
  spill(s, l) {
    a(s, '.flis', [{ opacity: 0 }, { opacity: 1 }], { d: 300 });
    s.querySelectorAll('.mp').forEach(el => a(s, el, [{ transform: `translate(${(140 + Math.random() * 200).toFixed(0)}px,${((Math.random() - .5) * 240).toFixed(0)}px) scale(.3)`, opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 900, delay: 150 + Math.random() * 500, e: E.ut }));
    a(s, '.skarp', [{ transform: 'translateY(60px)', opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 800, delay: 600, e: E.ut });
    lockStd(l, 1500, 'skarp');
  } });

/* 64 · Pikselpunktum */
RB.legg({ nr: 64, navn: 'Pikselpunktum', scene: 'lys', palett: [f.gronn, f.krem, f.mint],
  ide: 'En tung Meno-r med ett eneste firkantet mint punktum. Én piksel, det er hele byten. Ordmerket ender på samme piksel: rawbyte▪.',
  hvorfor: 'Den roligste måten å ha med pikselen på: Meno får være Meno, og pikselen er en signatur som kan leve alene som lasteprikk, varselprikk, markør eller kulepunkt. Fullt leselig på 16 px.',
  anim: 'Bokstaven glir opp, og pikselen faller ned og lander stivt, uten å bli klemt flat siden den er en piksel. Så blinker den to ganger som en markør. Laster-løkka er pikselen som blinker.',
  ikon: () => { const p = PM.plasser('r', { maxH: 270, cx: 216, cy: 262 }), q = p.s * .12;
    return `${flis(f.gronn)}<g class="rr t">${PM.tekst(p, f.krem)}</g><rect class="pkt" x="${(p.boks[2] + q * .35).toFixed(1)}" y="${(p.y - q).toFixed(1)}" width="${q.toFixed(1)}" height="${q.toFixed(1)}" fill="${f.mint}"/>`; },
  ord: { html: bk('rawbyte') + `<span class="bk pkt" style="display:inline-block;width:.15em;height:.15em;background:#5fae8a;margin-left:.05em"></span>`, css: 'font-weight:900' },
  spill(s, l) {
    a(s, '.flis', [{ transform: 'scale(.7)', opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 550, e: E.fjaer });
    a(s, '.rr', [{ transform: 'translateY(50px)', opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 700, delay: 200, e: E.ut });
    a(s, '.pkt', [{ transform: 'translateY(-360px)', easing: E.inn }, { transform: 'none', offset: .5, easing: E.ut }, { transform: 'translateY(-34px)', offset: .7, easing: E.inn }, { transform: 'none' }], { d: 800, delay: 650 });
    a(s, '.pkt', [{ opacity: 1 }, { opacity: 0, offset: .25 }, { opacity: 1, offset: .5 }, { opacity: 0, offset: .75 }, { opacity: 1 }], { d: 1000, delay: 1500, e: 'steps(1)' });
    lockStd(l, 1300);
    a(l, '.ord .pkt', [{ transform: 'translateY(-1.2em)', opacity: 0, easing: E.inn }, { transform: 'none', opacity: 1, offset: .6 }, { transform: 'none', opacity: 1 }], { d: 600, delay: 2000 });
  },
  laster(s) { return a(s, '.pkt', [{ opacity: 1 }, { opacity: 0 }], { d: 530, it: Infinity, dir: 'alternate', e: 'steps(1)', fill: 'none' }); } });

/* 65 · Pikselskygge */
RB.legg({ nr: 65, navn: 'Pikselskygge', scene: 'mork', palett: [f.gronn, f.krem, '#183428'],
  ide: '«raw» i skarp Meno, med en skygge av piksler: den samme bokstaven i lav oppløsning, litt forskjøvet bak.',
  hvorfor: 'Dybde uten blanke effekter. Skyggen er «byte-laget» bak håndverket, det digitale som alltid følger med det ekte. Diskret nok til at Meno eier ikonet, og eget nok til at ingen andre har det.',
  anim: 'Bokstavene lander, og skyggen bygges piksel for piksel i en diagonal bølge ut bak dem. Ordmerket fremkalles.',
  ikon: (u, o) => { if (o.mikro) return mikroR(f.gronn, f.krem); const p = PM.plasser('raw', { maxB: 340, cx: 248, cy: 250 });
    return `${flis(f.gronn)}${PM.mosaikk(p, 11, { dx: 14, dy: 14, fill: '#1c3a2e', kontrast: true })}<g class="skarp t">${PM.tekst(p, f.krem)}</g>`; },
  ord: { html: bk('rawbyte'), css: 'font-weight:800' },
  spill(s, l) {
    a(s, '.flis', [{ opacity: 0 }, { opacity: 1 }], { d: 300 });
    a(s, '.skarp', [{ transform: 'translate(18px,18px)', opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 600, delay: 200, e: E.ut });
    a(s, '.mp', [{ opacity: 0 }, { opacity: 1 }], { d: 1, delay: 700, stagger: el => (+el.dataset.x + +el.dataset.y) * 1.2, e: 'steps(1)' });
    lockStd(l, 1500, 'skarp');
  } });

/* 66 · Bitt flis med Meno */
const BIT = [[352, -10, 180, 66], [408, 56, 120, 50], [460, 106, 70, 50]];
RB.legg({ nr: 66, navn: 'Bitt flis med Meno', scene: 'lys', palett: [f.gronn, f.krem],
  ide: '«raw» i tung Meno på grønn flis, med en pikselbit tatt ut av hjørnet. Trinnene er like brede som stammene i Meno, så biten og bokstavene snakker samme språk.',
  hvorfor: 'Favoritten fra 11, med «raw» i stedet for én bokstav og Meno i stedet for pikselskrift. Biten sitter i silhuetten, så den synes også på 16 px.',
  anim: 'Flisa lander og får tre raske jafs, og smulene spretter ut. Ordmerket blendes inn, og to smuler ramler etter.',
  ikon: (u, o) => { const p = PM.plasser(o.mikro ? 'r' : 'raw', o.mikro ? { maxH: 300, cx: 238, cy: 272 } : { maxB: 330, cx: 244, cy: 286 });
    return `<defs><mask id="${u}m" maskUnits="userSpaceOnUse" x="-20" y="-20" width="560" height="560"><rect width="512" height="512" rx="116" fill="#fff"/>${BIT.map(([x, y, w, h]) => `<rect class="bt" ${TRT} x="${x}" y="${y}" width="${w}" height="${h}" fill="#000"/>`).join('')}</mask></defs>
    <g mask="url(#${u}m)"><g class="kropp t"><rect width="512" height="512" rx="116" fill="${f.gronn}"/>${PM.tekst(p, f.krem)}</g></g>
    ${[[372, 16, 26], [426, 74, 19], [478, 124, 13]].map(([x, y, z]) => `<rect class="smule t" x="${x}" y="${y}" width="${z}" height="${z}" fill="${f.gronn}"/>`).join('')}`; },
  ord: { html: bk('rawbyte') + `<span class="bk sm" style="display:inline-block;width:.1em;height:.1em;background:currentColor;margin-left:.06em;vertical-align:.6em"></span><span class="bk sm" style="display:inline-block;width:.065em;height:.065em;background:currentColor;margin-left:.03em;vertical-align:.85em"></span>`, css: 'font-weight:800' },
  spill(s, l) {
    a(s, '.kropp', [{ transform: 'translateY(-50px) scale(.85)', opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 650, e: E.stor });
    a(s, '.bt', [{ transform: 'scale(0)' }, { transform: 'none' }], { d: 200, delay: 800, stagger: 240, e: E.ut });
    a(s, '.kropp', [{ transform: 'none' }, { transform: 'scale(.965) rotate(-1deg)', offset: .4 }, { transform: 'none' }], { d: 240, delay: 800, it: 3, comp: 'add' });
    a(s, '.smule', [{ transform: 'translate(-60px,60px) scale(0)', opacity: 0 }, { transform: 'translate(8px,-30px) scale(1.2)', opacity: 1, offset: .5, easing: E.inn }, { transform: 'none', opacity: 1 }], { d: 750, delay: 840, stagger: 240, e: E.ut });
    lockStd(l, 1700);
    a(l, '.sm', [{ transform: 'translate(-20px,-20px) scale(0)', opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 600, delay: 2400, stagger: 120, e: E.fjaer });
  } });

/* 67 · Trappeflisa med Meno */
RB.legg({ nr: 67, navn: 'Trappeflisa med Meno', scene: 'sand', palett: [f.krem, f.gronn],
  ide: 'Bare <i>silhuetten</i> er pikslet: flisa har trinn i hjørnene i stedet for glatte runde hjørner. Inni står «raw» i ren, tung Meno.',
  hvorfor: 'Den tydeligste balansen: Meno er urørt, og pikselen er formen rundt. I oppgavelinja er det det eneste ikonet med trappehjørner, så det kjennes igjen på silhuetten alene.',
  anim: 'Flisa vokser i hakk som i et gammelt dataspill, og så glir ordet mykt opp i den. Ordmerket fremkalles fra piksler til skarp skrift.',
  ikon: (u, o) => { const p = o.mikro ? PM.plasser('r', { maxH: 320, cx: 252 }) : PM.plasser('raw', { maxB: 350, cx: 256, cy: 258 });
    return `<path class="flis t" d="${PM.trapp()}" fill="${f.krem}"/><g class="rr t">${PM.tekst(p, f.gronn)}</g>`; },
  ord: { html: bk('rawbyte'), css: 'font-weight:800' },
  spill(s, l) {
    a(s, '.flis', [{ transform: 'scale(.2)' }, { transform: 'none' }], { d: 500, e: 'steps(5)' });
    a(s, '.rr', [{ transform: 'translateY(40px)', opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 800, delay: 550, e: E.ut });
    lockStd(l, 1200, 'skarp');
  } });

/* 68 · Oppløsningstrappen */
RB.legg({ nr: 68, navn: 'Oppløsningstrappen', scene: 'svart', palett: [f.blekk, f.krem],
  ide: '«raw» der hver bokstav har sin egen oppløsning: r er skarp Meno, a er fint pikslet og w grovere. Tre trinn fra vektor til byte.',
  hvorfor: 'Viser overgangen som en rytme lest fra venstre mot høyre. Siden bare to av tre bokstaver er pikslet, og r-en er helt ren, blir det aldri «for pikslet». Svart flis gir god kontrast.',
  anim: 'Hele ordet kommer inn grovt pikslet, og så skjerpes det bokstav for bokstav fra venstre, men stopper med vilje før w-en blir skarp.',
  ikon: (u, o) => { if (o.mikro) return mikroR(f.blekk, f.krem); const p = PM.plasser('raw', { maxB: 370, cy: 258 }), xr = PM.fram(p, 1), xa = PM.fram(p, 2);
    return `${flis(f.blekk)}<defs><clipPath id="${u}c"><rect width="${xr.toFixed(1)}" height="512"/></clipPath></defs>${o.liten ? '' : `<g class="lag" opacity="0">${PM.mosaikk(p, 30, { cls: 'gr' })}</g>`}
      <g class="t1" clip-path="url(#${u}c)">${PM.tekst(p, f.krem)}</g><g class="t2">${PM.mosaikk(p, 8, { region: x => x >= xr && x < xa })}</g><g class="t3">${PM.mosaikk(p, 17, { region: x => x >= xa })}</g>`; },
  ord: { html: bk('rawbyte'), css: 'font-weight:800' },
  spill(s, l) {
    a(s, '.flis', [{ opacity: 0 }, { opacity: 1 }], { d: 300 });
    a(s, '.lag', [{ opacity: 1 }, { opacity: 1 }], { d: 700, delay: 200, fill: 'none' });
    ['.t3', '.t2', '.t1'].forEach((q, i) => a(s, q, [{ opacity: 0 }, { opacity: 0 }, { opacity: 1 }], { d: 900 + i * 220, delay: 0, e: 'steps(1)' }));
    lockStd(l, 1400, 'skarp');
  } });

/* 69 · Smulene */
RB.legg({ nr: 69, navn: 'Smulene', scene: 'mork', palett: [f.gronn, f.krem, f.mint],
  ide: '«raw» i tung Meno, der w-en har mistet et lite pikselhjørne nederst til høyre. Smulene ligger under: byte ≈ bite, så vidt.',
  hvorfor: 'Det mest diskré av bite-forslagene: et blikk avslører vitsen, men ordet står nesten urørt. Smulene er et lite levende element som kan falle mens noe laster.',
  anim: 'Et lite jafs tar hjørnet av w-en, og smulene faller ned og spretter. Laster-løkka lar smulene drysse.',
  ikon: (u, o) => { if (o.mikro) return mikroR(f.gronn, f.krem); const p = PM.plasser('raw', { maxB: 350, cx: 250, cy: 240 }), q = Math.round(p.s * .075), bx = p.boks[2], by = p.y;
    return `${flis(f.gronn)}<defs><mask id="${u}m" maskUnits="userSpaceOnUse" x="0" y="0" width="512" height="512"><rect width="512" height="512" fill="#fff"/><rect class="bt" ${TRT} x="${bx - q}" y="${by - 2 * q}" width="${q + 4}" height="${2 * q + 4}" fill="#000"/><rect class="bt" ${TRT} x="${bx - 2 * q}" y="${by - q}" width="${q + 2}" height="${q + 4}" fill="#000"/></mask></defs>
      <g mask="url(#${u}m)">${PM.tekst(p, f.krem)}</g>${[[bx - q * .6, by + q * 1.3, q], [bx + q * .5, by + q * 2.6, Math.round(q * .7)], [bx - q * 1.6, by + q * 3.3, Math.round(q * .5)]].map(([x, y, z]) => `<rect class="smule t" x="${x.toFixed(0)}" y="${y.toFixed(0)}" width="${z}" height="${z}" fill="${f.krem}"/>`).join('')}`; },
  ord: { html: bk('rawbyte'), css: 'font-weight:800' },
  spill(s, l) {
    a(s, '.flis', [{ transform: 'scale(.7)', opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 550, e: E.fjaer });
    a(s, 'text', [{ transform: 'translateY(40px)', opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 700, delay: 200, e: E.ut });
    a(s, '.bt', [{ transform: 'scale(0)' }, { transform: 'none' }], { d: 180, delay: 1000, stagger: 200, e: E.ut });
    a(s, '.smule', [{ transform: 'translateY(-70px) scale(0)', opacity: 0, easing: E.inn }, { transform: 'none', opacity: 1, offset: .6, easing: E.ut }, { transform: 'translateY(-12px)', offset: .8, easing: E.inn }, { transform: 'none', opacity: 1 }], { d: 800, delay: 1050, stagger: 160 });
    lockStd(l, 1500);
  },
  laster(s) { return a(s, '.smule', [{ transform: 'translateY(-60px)', opacity: 0 }, { opacity: 1, offset: .3 }, { transform: 'translateY(30px)', opacity: 0 }], { d: 1100, it: Infinity, stagger: 300, e: E.inn, fill: 'none' }); } });

/* 70 · Dagens idé, tung */
RB.legg({ nr: 70, navn: 'Dagens idé, gjort tung', scene: 'sand', palett: [f.gronn, f.krem, f.mint],
  ide: 'Kontrollforslaget: nøyaktig dagens ikon, «raw» over «byte», men i Meno Banner 900 i stedet for den tynne vekten, og med «byte» i mint. Ingen piksler.',
  hvorfor: 'For å skille de to problemene: var det idéen som var feil, eller bare at streken var for tynn? Sammenlign i oppgavelinja øverst med dagens ikon (stiplet). Stablingen er hentet rett fra Raw Studios-logoen.',
  anim: 'Linjene løftes inn hver for seg bak en kant, akkurat som Raw Studios-logoen kan gjøre det. Ordmerket stables og løftes på samme måte.',
  ikon: (u, o) => { if (o.mikro) return mikroR(f.gronn, f.krem); const [r, b] = stablet();
    return `${flis(f.gronn)}<defs><clipPath id="${u}a"><rect x="0" y="0" width="512" height="${(r.y + 6).toFixed(0)}"/></clipPath><clipPath id="${u}b"><rect x="0" y="${(r.y + 6).toFixed(0)}" width="512" height="512"/></clipPath></defs>
      <g clip-path="url(#${u}a)"><g class="l1">${PM.tekst(r, f.krem)}</g></g><g clip-path="url(#${u}b)"><g class="l2">${PM.tekst(b, f.mint)}</g></g>`; },
  ord: { html: `<span style="display:block">${bk('raw', true)}</span><span style="display:block">${bk('byte', true)}</span>`, css: 'font-weight:800;line-height:.8;font-size:clamp(46px,5.4vw,78px)' },
  spill(s, l) {
    a(s, '.flis', [{ transform: 'scale(.7)', opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 550, e: E.fjaer });
    a(s, '.l1', [{ transform: 'translateY(140px)' }, { transform: 'none' }], { d: 800, delay: 250, e: E.ut });
    a(s, '.l2', [{ transform: 'translateY(-170px)' }, { transform: 'none' }], { d: 800, delay: 400, e: E.ut });
    lockIkon(l, 1100); ordInn(l, 'loft', 1250);
  } });

/* 71 · Lastepikslene */
RB.legg({ nr: 71, navn: 'Lastepikslene', scene: 'mork', palett: [f.gronn, f.krem, f.mint],
  ide: '«raw» i tung Meno med fem små firkanter under, en framdriftsindikator i piksler. Pikselen er et element ved siden av skrifta, ikke inni den.',
  hvorfor: 'Meno står uberørt, og pikslene gjør en jobb: de viser framdrift. De fem rutene blir Rawbytes egen lasteindikator, i appen, i Transfer og på nettsida.',
  anim: 'Rutene fylles én og én fra venstre, og ordet glir opp når den siste er fylt. Laster-løkka fyller rutene om og om igjen.',
  ikon: (u, o) => { if (o.mikro) return mikroR(f.gronn, f.krem); const p = PM.plasser('raw', { maxB: 340, cx: 256, cy: 226 }), q = 30, g = 12, x0 = 256 - (5 * q + 4 * g) / 2;
    return `${flis(f.gronn)}<g class="rr t">${PM.tekst(p, f.krem)}</g>${[0, 1, 2, 3, 4].map(i => `<rect class="lp" x="${x0 + i * (q + g)}" y="352" width="${q}" height="${q}" fill="${i < 4 ? f.krem : f.mint}"/>`).join('')}`; },
  ord: { html: bk('rawbyte'), css: 'font-weight:800' },
  spill(s, l) {
    a(s, '.flis', [{ opacity: 0 }, { opacity: 1 }], { d: 300 });
    a(s, '.lp', [{ opacity: 0 }, { opacity: 1 }], { d: 1, delay: 250, stagger: 170, e: 'steps(1)' });
    a(s, '.rr', [{ transform: 'translateY(40px)', opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 700, delay: 1100, e: E.ut });
    lockStd(l, 1600);
  },
  laster(s) { return a(s, '.lp', [{ opacity: .15 }, { opacity: 1, offset: .15 }, { opacity: 1, offset: .8 }, { opacity: .15, offset: .85 }], { d: 1600, it: Infinity, stagger: 160, e: 'steps(1)', fill: 'none' }); } });

/* 72 · Pikselluppen */
RB.legg({ nr: 72, navn: 'Pikselluppen', scene: 'mork', palett: [f.gronn, f.krem, f.mint],
  ide: '«raw» i skarp Meno, med en firkantet lupe over a-en. Under lupen ser du bokstavene i piksler, som når man zoomer helt inn på et bilde.',
  hvorfor: 'Det mest fortellende forslaget: på overflaten håndverk, innerst bytes. Lupen er en naturlig knagg for søk og Rawbot («Rawbyte finner det»), og pikslene holder seg inne i en avgrenset rute.',
  anim: 'Lupen glir over ordet fra venstre og pikseliserer det den passerer, før den stopper over a-en. Laster-løkka lar lupen lete fram og tilbake.',
  ikon: (u, o) => { if (o.mikro) return mikroR(f.gronn, f.krem); const p = PM.plasser('raw', { maxB: 370, cy: 250 }), ax = (PM.fram(p, 1) + PM.fram(p, 2)) / 2, L = 150, lx = ax - L / 2, ly = 250 - L / 2 - 6;
    return `${flis(f.gronn)}${PM.tekst(p, f.krem)}<defs><clipPath id="${u}l"><rect class="lens" x="${lx.toFixed(1)}" y="${ly.toFixed(1)}" width="${L}" height="${L}" rx="20"/></clipPath></defs>
      <g clip-path="url(#${u}l)"><rect width="512" height="512" fill="#2b5444"/>${PM.mosaikk(p, 15)}</g>
      <g class="lens"><rect x="${lx.toFixed(1)}" y="${ly.toFixed(1)}" width="${L}" height="${L}" rx="20" fill="none" stroke="${f.mint}" stroke-width="8"/><path d="M${(lx + L - 6).toFixed(0)},${(ly + L - 6).toFixed(0)} l44,44" stroke="${f.mint}" stroke-width="16" stroke-linecap="round"/></g>`; },
  ord: { html: bk('rawbyte'), css: 'font-weight:800' },
  spill(s, l) {
    a(s, '.flis', [{ opacity: 0 }, { opacity: 1 }], { d: 300 });
    a(s, 'text', [{ opacity: 0 }, { opacity: 1 }], { d: 500, delay: 150 });
    a(s, '.lens', [{ transform: 'translateX(-140px)', opacity: 0 }, { transform: 'translateX(-140px)', opacity: 1, offset: .1 }, { transform: 'translateX(130px)', offset: .6 }, { transform: 'none' }], { d: 2000, delay: 400, e: E.myk });
    lockStd(l, 1700, 'skarp');
  },
  laster(s) { return a(s, '.lens', [{ transform: 'translateX(-130px)' }, { transform: 'translateX(130px)' }], { d: 1500, it: Infinity, dir: 'alternate', e: E.myk, fill: 'none' }); } });
};
