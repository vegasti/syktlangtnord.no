/* Forslag 01–10 */
(() => {
const { a, E, F = RB.farge, flis, ring, bk, ordInn, lockIkon } = RB;
const f = RB.farge;
const meno = (t, x, y, s, w = 900, fill = f.krem, ekstra = '') => `<text x="${x}" y="${y}" font-family="meno-banner, Georgia, serif" font-weight="${w}" font-size="${s}" fill="${fill}" ${ekstra}>${t}</text>`;
const lockStd = (lock, d = 900, stil = 'loft') => { lockIkon(lock, d); ordInn(lock, stil, d + 150); };
const rnd = (a, b) => a + Math.random() * (b - a);

/* 01 · rb-ligaturen */
RB.legg({ nr: 1, navn: 'rb-ligaturen', scene: 'mork',
  palett: [f.gronn, f.krem, f.mint],
  ide: 'Den tunge Meno Banner-«r»-en og «b»-en fra Raw Studios-logoen, trukket så tett at de låser seg sammen til én form.',
  hvorfor: 'Samme skrift og samme grønne som Raw Studios, så slektskapet er tydelig. To bokstaver i stedet for sju gjør at formen holder seg ned til 24 px.',
  anim: 'Flisa spretter opp, bokstavene kommer fra hver sin side og «klikker» sammen med et lite trykk. Passer som innlasting og som kvittering på «lagret».',
  ikon: (u) => `${flis(f.gronn)}<g class="rb t">${meno('r', 252, 372, 330, 900, f.krem, 'text-anchor="end" class="r t"')}${meno('b', 222, 372, 330, 900, f.krem, 'class="b t"')}</g>`,
  ord: { html: bk('rawbyte', true), css: 'font-weight:800' },
  spill(s, l) {
    a(s, '.flis', [{ transform: 'scale(.4)', opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 750, e: E.fjaer });
    a(s, '.r', [{ transform: 'translateX(-190px)', opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 650, delay: 260, e: E.ut });
    a(s, '.b', [{ transform: 'translateX(190px)', opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 650, delay: 260, e: E.ut });
    a(s, '.rb', [{ transform: 'none' }, { transform: 'scale(1.08,.9)', offset: .35 }, { transform: 'scale(.97,1.03)', offset: .7 }, { transform: 'none' }], { d: 480, delay: 820, e: E.myk });
    lockStd(l, 1000);
  } });

/* 02 · Byten 01110010 */
const BITS = c => c.charCodeAt(0).toString(2).padStart(8, '0').split('').map(Number);
const BX = i => 61 + i * 50, HOY = 280, LAV = 92, BUNN = 400;
RB.legg({ nr: 2, navn: 'Byten', scene: 'svart',
  palett: [f.blekk, f.krem, f.lys],
  ide: 'Åtte stolper, høy = 1 og lav = 0. Mønsteret er <span class="mono">01110010</span>, bokstaven «r» i ASCII: én byte som staver raw.',
  hvorfor: 'Navnet bokstavelig: en byte. Ser ut som en lydbølge eller en strekkode, altså media og data på én gang. Det tegnes med tykke runde stolper og leser derfor rent på 16 px.',
  anim: 'Stolpene spinner som en spilleautomat og låser seg én og én til «r». Laster-løkka staver r-a-w-b-y-t-e i binært, om og om igjen.',
  ikon: () => `${flis(f.blekk)}${BITS('r').map((b, i) => `<rect class="bit tb" x="${BX(i)}" y="${BUNN - (b ? HOY : LAV)}" width="40" height="${b ? HOY : LAV}" rx="20" fill="${b ? f.krem : f.lys}"/>`).join('')}`,
  ord: { html: bk('rawbyte'), under: '01110010 = r', css: 'font-weight:800' },
  spill(s, l) {
    a(s, '.flis', [{ opacity: 0 }, { opacity: 1 }], { d: 300 });
    const fasit = BITS('r');
    [...s.querySelectorAll('.bit')].forEach((el, i) => {
      const h = fasit[i] ? HOY : LAV; const kf = [];
      for (let k = 0; k < 6 + i; k++) kf.push({ transform: `scaleY(${(Math.random() > .5 ? HOY : LAV) / h})`, easing: 'steps(1)' });
      kf.push({ transform: 'scaleY(1.12)', easing: E.ut }, { transform: 'scaleY(1)' });
      a(s, el, kf, { d: 380 + i * 95, delay: 120 });
    });
    lockIkon(l, 1100); ordInn(l, 'skriv', 1250);
  },
  laster(s) {
    const ord = [...'rawbyte'].map(BITS), fasit = BITS('r');
    return [...s.querySelectorAll('.bit')].map((el, i) => {
      const h = fasit[i] ? HOY : LAV;
      const kf = ord.map(bits => ({ transform: `scaleY(${(bits[i] ? HOY : LAV) / h})`, easing: E.fjaer }));
      kf.push(kf[0]);
      return a(s, el, kf, { d: 3200, it: Infinity, delay: i * 30, fill: 'none' });
    });
  } });

/* 03 · Skuffen */
RB.legg({ nr: 3, navn: 'Skuffen', scene: 'lys',
  palett: [f.gronn, f.krem, f.mint, f.dyp],
  ide: 'To skuffer med håndtak: Skapet sett forfra, i den enkleste formen som finnes.',
  hvorfor: 'Sier hva produktet gjør, et sted å legge ting, uten å trenge navnet. To brede flater og to streker kan ikke bli utydelige, heller ikke på 16 px.',
  anim: 'Skuffene glir inn. Den øverste trekkes ut mot deg, et kort spretter opp og synker tilbake, og skuffen lukkes. Gir god mening ved «fil lagt i Skapet».',
  ikon: () => `${flis(f.gronn)}
    <rect class="inni" x="112" y="124" width="288" height="30" rx="12" fill="${f.dyp}" opacity="0"/>
    <rect class="kort t" x="198" y="128" width="116" height="92" rx="14" fill="${f.mint}" opacity="0" transform-origin="256 174"/>
    <g class="sk sk1 t"><rect x="112" y="134" width="288" height="114" rx="26" fill="${f.krem}"/><rect x="212" y="181" width="88" height="20" rx="10" fill="${f.gronn}"/></g>
    <g class="sk sk2 t"><rect x="112" y="264" width="288" height="114" rx="26" fill="${f.krem}"/><rect x="212" y="311" width="88" height="20" rx="10" fill="${f.gronn}"/></g>`,
  ord: { html: bk('rawbyte', true), css: 'font-weight:700' },
  spill(s, l) {
    a(s, '.flis', [{ transform: 'scale(.6)', opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 650, e: E.fjaer });
    a(s, '.sk', [{ transform: 'translateX(-70px)', opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 600, delay: 200, stagger: 110 });
    a(s, '.sk1', [{ transform: 'none' }, { transform: 'translateY(16px) scale(1.07)', offset: .25 }, { transform: 'translateY(16px) scale(1.07)', offset: .75 }, { transform: 'none' }], { d: 1500, delay: 900, e: E.myk, comp: 'add' });
    a(s, '.inni', [{ opacity: 0 }, { opacity: 1, offset: .25 }, { opacity: 1, offset: .75 }, { opacity: 0 }], { d: 1500, delay: 900, e: E.myk });
    a(s, '.kort', [{ opacity: 0, transform: 'translateY(40px)' }, { opacity: 1, transform: 'translateY(-78px) rotate(-8deg)', offset: .4, easing: E.fjaer }, { opacity: 1, transform: 'translateY(-78px) rotate(-8deg)', offset: .6 }, { opacity: 0, transform: 'translateY(40px)' }], { d: 1400, delay: 1000, e: E.myk });
    lockStd(l, 1500);
  } });

/* 04 · Beskjæringen */
RB.legg({ nr: 4, navn: 'Beskjæringen', scene: 'svart',
  palett: [f.blekk, f.krem, f.mint],
  ide: 'En tung «b» innrammet av to mint beskjæringshjørner, det første fotografer ser når de redigerer.',
  hvorfor: 'Snakker fotografens språk: rå, beskåret, ferdig. Mint mot svart skiller seg fra alle de blå og grønne ikonene i oppgavelinja.',
  anim: 'Bokstaven starter for stor, hjørnene klemmer seg inn og bildet «beskjæres» på plass med et lite blitzglimt. Laster-løkka puster i rammen.',
  ikon: () => `${flis(f.blekk)}<g class="bb t">${meno('b', 256, 392, 380, 900, f.krem, 'text-anchor="middle"')}</g>
    <path class="hj hj1" d="M96,178 V96 H178" fill="none" stroke="${f.mint}" stroke-width="26" stroke-linejoin="round" stroke-linecap="round"/>
    <path class="hj hj2" d="M416,334 V416 H334" fill="none" stroke="${f.mint}" stroke-width="26" stroke-linejoin="round" stroke-linecap="round"/>
    <rect class="blitz" width="512" height="512" rx="116" fill="#fff" opacity="0"/>`,
  ord: { html: bk('rawbyte'), css: 'font-weight:900' },
  spill(s, l) {
    a(s, '.flis', [{ opacity: 0 }, { opacity: 1 }], { d: 300 });
    a(s, '.bb', [{ transform: 'scale(1.7)', opacity: 0 }, { transform: 'scale(1.7)', opacity: 1, offset: .2 }, { transform: 'none', opacity: 1 }], { d: 1100, delay: 100, e: E.myk });
    a(s, '.hj1', [{ transform: 'translate(-110px,-110px)', opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 700, delay: 450, e: E.fjaer });
    a(s, '.hj2', [{ transform: 'translate(110px,110px)', opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 700, delay: 450, e: E.fjaer });
    a(s, '.blitz', [{ opacity: 0 }, { opacity: .45, offset: .1 }, { opacity: 0 }], { d: 500, delay: 1150, e: E.lin });
    lockIkon(l, 1300); ordInn(l, 'sveip', 1400);
  },
  laster(s) { return [a(s, '.hj1', [{ transform: 'none' }, { transform: 'translate(-22px,-22px)' }], { d: 700, it: Infinity, dir: 'alternate', e: E.myk, fill: 'none' }), a(s, '.hj2', [{ transform: 'none' }, { transform: 'translate(22px,22px)' }], { d: 700, it: Infinity, dir: 'alternate', e: E.myk, fill: 'none' })]; } });

/* 05 · Blenderen */
const iris = (cx, cy, h) => {
  let hex = '', linjer = '';
  const V = k => [cx + h * Math.cos((k * 60 - 90) * Math.PI / 180), cy + h * Math.sin((k * 60 - 90) * Math.PI / 180)];
  for (let k = 0; k < 6; k++) {
    const [x1, y1] = V(k), [x2, y2] = V(k + 1);
    hex += (k ? 'L' : 'M') + x1.toFixed(1) + ',' + y1.toFixed(1);
    const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy);
    linjer += `M${x1.toFixed(1)},${y1.toFixed(1)}L${(x1 - dx / L * 260).toFixed(1)},${(y1 - dy / L * 260).toFixed(1)}`;
  }
  return { hex: hex + 'Z', linjer };
};
RB.legg({ nr: 5, navn: 'Blenderen', scene: 'mork',
  palett: [f.gronn, f.krem, f.dyp],
  ide: 'En bygd «b» der bollen er en kamerablender. Seks lameller gir en sekskantet åpning i midten.',
  hvorfor: 'Bokstaven og kameraet i samme tegn. Bollen er én stor rund form, så den leser som «b» lenge før lamellene blir synlige.',
  anim: 'Stammen faller ned, bollen spretter fram og blenderen vrir seg åpen. Laster-løkka åpner og lukker blenderen, og passer godt ved opplasting og eksport.',
  ikon: (u) => { const B = RB.B, i = iris(B.cx, B.cy, 58); return `${flis(f.gronn)}
    <defs><clipPath id="${u}c"><circle cx="${B.cx}" cy="${B.cy}" r="${B.Ro - 1}"/></clipPath></defs>
    <circle class="bolle t" cx="${B.cx}" cy="${B.cy}" r="${B.Ro}" fill="${f.krem}"/>
    <g clip-path="url(#${u}c)"><g class="iris" style="transform-box:view-box;transform-origin:${B.cx}px ${B.cy}px">
      <path d="${i.hex}" fill="${f.gronn}"/><path d="${i.linjer}" stroke="${f.gronn}" stroke-width="7" stroke-linecap="round" fill="none"/></g></g>
    <path class="stamme t" d="M${B.sx - 30},${B.top} H${B.sx + B.sw} V${B.bunn} H${B.sx} V${B.top + 44} Q${B.sx},${B.top + 18} ${B.sx - 30},${B.top + 18} Z" fill="${f.krem}"/>`; },
  ord: { html: bk('rawbyte'), klasse: 'futura', css: 'font-weight:500;letter-spacing:-.01em' },
  spill(s, l) {
    a(s, '.flis', [{ transform: 'scale(.6)', opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 600, e: E.fjaer });
    a(s, '.stamme', [{ transform: 'translateY(-240px)', opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 650, delay: 200, e: E.stor });
    a(s, '.bolle', [{ transform: 'scale(0)' }, { transform: 'none' }], { d: 650, delay: 420, e: E.fjaer });
    a(s, '.iris', [{ transform: 'rotate(-140deg) scale(.08)' }, { transform: 'none' }], { d: 1200, delay: 650, e: E.ut });
    lockIkon(l, 1300); ordInn(l, 'blur', 1400);
  },
  laster(s) { return a(s, '.iris', [{ transform: 'none' }, { transform: 'rotate(-120deg) scale(.15)', offset: .5 }, { transform: 'rotate(-240deg)' }], { d: 2200, it: Infinity, e: E.myk, fill: 'none' }); } });

/* 06 · b-punktum */
RB.legg({ nr: 6, navn: 'b-punktum', scene: 'lys',
  palett: [f.gronn, f.krem, f.mint],
  ide: 'Én tung Meno Banner-«b» og et mint punktum. «b.» Ferdig. Punktumet går igjen i ordmerket: rawbyte.',
  hvorfor: 'Det enkleste forslaget, og derfor det mest robuste. Punktumet blir en signatur som kan leve alene: lasteprikk, varselprikk, kulepunkt.',
  anim: 'Bokstaven faller inn og klemmes flat, punktumet spretter etter tre ganger. I ordmerket hopper punktumet bort til slutten av ordet.',
  ikon: () => `${flis(f.gronn)}<g class="bb tb">${meno('b', 236, 392, 380, 900, f.krem, 'text-anchor="middle"')}</g><circle class="prikk tb" cx="384" cy="358" r="38" fill="${f.mint}"/>`,
  ord: { html: bk('rawbyte') + `<span class="bk pkt" style="color:${f.mint === '#a0d2b9' ? '#5fae8a' : f.mint}">.</span>`, css: 'font-weight:900' },
  spill(s, l) {
    a(s, '.flis', [{ transform: 'scale(.7)', opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 600, e: E.fjaer });
    a(s, '.bb', [{ transform: 'translateY(-480px)', easing: E.inn }, { transform: 'translateY(0) scale(1.15,.8)', offset: .55, easing: E.ut }, { transform: 'scale(.95,1.06)', offset: .78 }, { transform: 'none' }], { d: 900, delay: 150 });
    a(s, '.prikk', [{ transform: 'translateY(-420px)', easing: E.inn }, { transform: 'scale(1.3,.7)', offset: .35, easing: E.ut }, { transform: 'translateY(-110px)', offset: .55, easing: E.inn }, { transform: 'scale(1.15,.85)', offset: .72, easing: E.ut }, { transform: 'translateY(-30px)', offset: .86, easing: E.inn }, { transform: 'none' }], { d: 1300, delay: 650 });
    lockIkon(l, 1500); ordInn(l, 'fall', 1600);
    a(l, '.pkt', [{ transform: 'translateY(-90px)', opacity: 0, easing: E.inn }, { transform: 'none', opacity: 1, offset: .5, easing: E.ut }, { transform: 'translateY(-26px)', offset: .75, easing: E.inn }, { transform: 'none' }], { d: 900, delay: 2050 });
  } });

/* 07 · Familiesirkelen */
RB.legg({ nr: 7, navn: 'Familiesirkelen', scene: 'sand',
  palett: [f.gronn, f.krem, f.sand],
  ide: 'Raw Studios’ grønne sirkel med «raw» blir Rawbytes grønne sirkel med én stor «b» som stikker ut av kanten. Logoen stables slik Raw Studios gjør: raw / byte.',
  hvorfor: 'Gir det tydeligste familiebåndet: sirkelen, skriften og stablingen er de samme. Den store, avkuttede bokstaven er grafisk nok til at sirkelen ikke bare blir en grønn prikk på 16 px.',
  anim: 'Sirkelen spretter ut fra midten, og bokstaven stiger opp nedenfra inne i den, som om den var der hele tiden. Logoen løftes linje for linje.',
  ikon: (u) => `<defs><clipPath id="${u}c"><circle cx="256" cy="256" r="256"/></clipPath></defs>
    <circle class="flis t" cx="256" cy="256" r="256" fill="${f.gronn}"/>
    <g clip-path="url(#${u}c)"><g class="bb">${meno('b', 276, 448, 560, 900, f.krem, 'text-anchor="middle"')}</g></g>`,
  ord: { html: `<span style="display:block">${bk('raw', true)}</span><span style="display:block">${bk('byte', true)}</span>`, css: 'font-weight:800;line-height:.8;font-size:clamp(46px,5.4vw,78px)' },
  spill(s, l) {
    a(s, '.flis', [{ transform: 'scale(0)' }, { transform: 'none' }], { d: 900, e: E.fjaer });
    a(s, '.bb', [{ transform: 'translateY(420px)' }, { transform: 'translateY(-14px)', offset: .75 }, { transform: 'none' }], { d: 1100, delay: 350, e: E.ut });
    lockIkon(l, 1200); ordInn(l, 'loft', 1350);
  } });

/* 08 · Kuben */
const C = { t: [256, 94], ur: [401.5, 178], lr: [401.5, 346], bu: [256, 430], ll: [110.5, 346], ul: [110.5, 178], m: [256, 262] };
const pt = (...p) => p.map(k => C[k].join(',')).join(' ');
RB.legg({ nr: 8, navn: 'Kuben', scene: 'mork',
  palett: [f.gronn, f.krem, f.mint, f.mork],
  ide: 'En isometrisk kube, en datablokk, med «b» skrevet inn på venstresiden i perspektiv. Ordmerket står i Futura PT med versaler.',
  hvorfor: 'Lagring, struktur og «byte» i en ting man kan ta på. Tre tydelige flater i tre toner gir en form som er gjenkjennelig også når bokstaven forsvinner i små størrelser.',
  anim: 'Flatene flyr inn fra tre retninger og bygger kuben, som lander med et lite hopp. Laster-løkka lar lyset vandre rundt flatene mens kuben svever.',
  ikon: () => `${flis(f.gronn)}<g class="kube t">
    <polygon class="fl fl-t" points="${pt('t', 'ur', 'm', 'ul')}" fill="${f.krem}"/>
    <g class="fl fl-l"><polygon points="${pt('ul', 'm', 'bu', 'll')}" fill="${f.mint}"/>
      <g transform="matrix(0.866,0.5,0,1,110.5,178)">${meno('b', 84, 150, 168, 900, f.gronn, 'text-anchor="middle"')}</g></g>
    <polygon class="fl fl-r" points="${pt('m', 'ur', 'lr', 'bu')}" fill="${f.mork}"/>
    <polygon class="glans" points="${pt('t', 'ur', 'm', 'ul')}" fill="#fff" opacity="0"/></g>`,
  ord: { html: bk('RAWBYTE'), klasse: 'futura', css: 'font-weight:700;letter-spacing:.08em;font-size:clamp(40px,5vw,72px)' },
  spill(s, l) {
    a(s, '.flis', [{ opacity: 0 }, { opacity: 1 }], { d: 400 });
    a(s, '.fl-t', [{ transform: 'translateY(-200px)', opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 700, delay: 150, e: E.ut });
    a(s, '.fl-l', [{ transform: 'translate(-180px,100px)', opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 700, delay: 300, e: E.ut });
    a(s, '.fl-r', [{ transform: 'translate(180px,100px)', opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 700, delay: 450, e: E.ut });
    a(s, '.kube', [{ transform: 'none' }, { transform: 'translateY(-34px)', offset: .4, easing: E.inn }, { transform: 'translateY(0) scale(1.04,.96)', offset: .8 }, { transform: 'none' }], { d: 600, delay: 1100, e: E.ut });
    a(s, '.glans', [{ opacity: 0 }, { opacity: .5, offset: .3 }, { opacity: 0 }], { d: 700, delay: 1300 });
    lockIkon(l, 1500); ordInn(l, 'tone', 1600);
  },
  laster(s) {
    return [a(s, '.kube', [{ transform: 'none' }, { transform: 'translateY(-18px)' }], { d: 1100, it: Infinity, dir: 'alternate', e: E.myk, fill: 'none' }),
      a(s, '.fl', [{ filter: 'brightness(1)' }, { filter: 'brightness(1.35)', offset: .15 }, { filter: 'brightness(1)', offset: .33 }], { d: 1500, it: Infinity, stagger: 500, e: E.myk, fill: 'none' })];
  } });

/* 09 · Mappa som er en b */
const MAPPE = 'M110,128 Q110,100 138,100 H178 Q206,100 206,128 V196 H378 Q406,196 406,224 V384 Q406,412 378,412 H138 Q110,412 110,384 Z';
const KLAFF = 'M110,240 H406 V384 Q406,412 378,412 H138 Q110,412 110,384 Z';
const HULL = ' M230,306 a54,54 0 1,0 108,0 a54,54 0 1,0 -108,0 Z';
RB.legg({ nr: 9, navn: 'Mappa som er en b', scene: 'sand',
  palett: [f.gronn, '#3d7360', f.krem, f.sand],
  ide: 'En mappe der fanen er blitt til stammen på en «b» og et rundt hull er bollen. Mappe og bokstav i samme silhuett.',
  hvorfor: 'Folk skjønner med en gang at det er her filene bor. Hullet gjør at det er Rawbytes mappe og ikke hvilken som helst mappe. Det er en flat silhuett, og den er rask å lese.',
  anim: 'Mappa vokser opp, klaffen vipper fram og tre filer titter opp før den lukkes. Kan spilles hver gang noe lastes opp.',
  ikon: () => `${flis(f.sand)}<path class="mappe" d="${MAPPE}${HULL}" fill="${f.gronn}" fill-rule="evenodd"/>
    <g class="filer">${[0, 1, 2].map(i => `<rect class="fil t" x="${150 + i * 74}" y="210" width="68" height="90" rx="10" fill="${[f.krem, f.mint, '#fff'][i]}" opacity="0"/>`).join('')}</g>
    <path class="klaff tb" d="${KLAFF}${HULL}" fill="#3d7360" fill-rule="evenodd"/>`,
  ord: { html: bk('rawbyte', true), css: 'font-weight:700' },
  spill(s, l) {
    a(s, '.flis', [{ opacity: 0 }, { opacity: 1 }], { d: 300 });
    a(s, ['.mappe', '.klaff'].map(q => s.querySelector(q)), [{ transform: 'translateY(60px) scale(.8)', opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 700, delay: 120, e: E.fjaer });
    a(s, '.klaff', [{ transform: 'none' }, { transform: 'scaleY(.72) skewX(-6deg)', offset: .25 }, { transform: 'scaleY(.72) skewX(-6deg)', offset: .75 }, { transform: 'none' }], { d: 1600, delay: 800, e: E.myk, comp: 'add' });
    a(s, '.fil', [{ opacity: 0, transform: 'translateY(40px)' }, { opacity: 1, transform: 'translateY(-62px) rotate(-6deg)', offset: .35 }, { opacity: 1, transform: 'translateY(-62px) rotate(-6deg)', offset: .65 }, { opacity: 0, transform: 'translateY(40px)' }], { d: 1400, delay: 900, stagger: 90, e: E.fjaer });
    lockStd(l, 1700);
  } });

/* 10 · Bunken */
const kort = (rot, fill, foto) => `<g class="kort vb"><g transform="rotate(${rot} 256 256)">
  <rect x="138" y="118" width="236" height="276" rx="22" fill="${fill}"/>
  ${foto ? `<rect x="158" y="138" width="196" height="176" rx="12" fill="${f.gronn}"/><circle class="sol t" cx="312" cy="180" r="20" fill="${f.rav}"/><path d="M158,290 L216,226 L256,266 L290,236 L354,300 V302 Q354,314 342,314 H170 Q158,314 158,302 Z" fill="${f.mint}"/>` : ''}</g></g>`;
RB.legg({ nr: 10, navn: 'Bunken', scene: 'mork',
  palett: [f.gronn, f.krem, f.mint, f.rav],
  ide: 'Tre bilder i en bunke, det øverste med fjell og en ravgul sol. Ordmerket står i Meno Banner kursiv.',
  hvorfor: 'Det mest «bildebank»-aktige forslaget: det viser innholdet, ikke teknikken. Sola gir en varm prikk som skiller ikonet fra resten i oppgavelinja.',
  anim: 'Bildene deles ut som kort ett etter ett og lander skjevt i bunken, og sola står opp. Laster-løkka stokker det øverste bildet bakerst.',
  ikon: () => `${flis(f.gronn)}${kort(-14, f.mint)}${kort(-4, f.sand)}${kort(7, f.krem, true)}`,
  ord: { html: bk('rawbyte'), css: 'font-weight:400;font-style:italic' },
  spill(s, l) {
    a(s, '.flis', [{ transform: 'scale(.7)', opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 600, e: E.fjaer });
    a(s, '.kort', [{ transform: 'translate(360px,-160px) rotate(40deg)', opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 700, delay: 250, stagger: 170, e: E.ut });
    a(s, '.sol', [{ transform: 'translateY(60px)', opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 800, delay: 1050, e: E.fjaer });
    lockIkon(l, 1300); ordInn(l, 'blur', 1400);
  },
  laster(s) { const k = s.querySelectorAll('.kort'); return a(s, k[2], [{ transform: 'none' }, { transform: 'translate(230px,-30px) rotate(24deg)', offset: .4 }, { transform: 'translate(230px,-30px) rotate(24deg)', offset: .5 }, { transform: 'none' }], { d: 1400, it: Infinity, e: E.myk, fill: 'none' }); } });
})();
