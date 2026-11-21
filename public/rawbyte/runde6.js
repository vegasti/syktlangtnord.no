/* Runde 6
   85–94: «raw» alltid i Meno (som i Raw Studios-logoen), «byte» i Futura — x-høydene avstemt.
   95–104: helt frie forslag — ingen hensyn til noe som er sagt før. */
window.RB6 = () => {
const { a, E, flis, bk, ordInn, lockIkon } = RB;
const f = RB.farge;
const lockStd = (l, d, stil = 'blur') => { lockIkon(l, d); ordInn(l, stil, d + 150); };

/* x-høyde-forhold: hvor mye større Futura må settes for å matche Menos x-høyde */
const ctx = document.createElement('canvas').getContext('2d');
const xh = (fam, w) => { ctx.font = PM.font(w, 100, 'normal', fam); return ctx.measureText('x').actualBoundingBoxAscent; };
const XR = (wm, wf) => xh('meno', wm) / xh('futura', wf);

/* «raw» (Meno) over «byte» (Futura), samme x-høyde, tilpasset bredde */
const stabel = ({ wM = 900, wF = 600, maxB = 340, cy1 = 180, cy2 = 326, venstre = false } = {}) => {
  const k = XR(wM, wF);
  let r = PM.plasser('raw', { fam: 'meno', w: wM, s: 100 }), b = PM.plasser('byte', { fam: 'futura', w: wF, s: 100 * k });
  const bredest = Math.max(r.boks[2] - r.boks[0], b.boks[2] - b.boks[0]), s = 100 * maxB / bredest;
  r = PM.plasser('raw', { fam: 'meno', w: wM, s, cy: cy1 }); b = PM.plasser('byte', { fam: 'futura', w: wF, s: s * k, cy: cy2 });
  if (venstre) { const L = 256 - maxB / 2; const fl = (p) => { const d = L - p.boks[0]; p.x += d; p.boks = [p.boks[0] + d, p.boks[1], p.boks[2] + d, p.boks[3]]; }; fl(r); fl(b); }
  return [r, b];
};
const mikro = (bg, fg = f.krem) => `${flis(bg)}${PM.tekst(PM.plasser('r', { fam: 'meno', w: 900, maxH: 300, cx: 248 }), fg)}`;
/* Ordmerke: raw (Meno) + byte (Futura) på samme grunnlinje og x-høyde */
const ORD_MF = (wM, wF, byteHtml, ls = '-.01em') => ({ klasse: '', css: '',
  html: `<span class="meno" style="font-weight:${wM}">${bk('raw')}</span><span class="futura" style="font-weight:${wF};font-size:${XR(wM, wF).toFixed(3)}em;letter-spacing:${ls}">${byteHtml ?? bk('byte')}</span>` });

/* Celler av «byte» i Futura (for pikselvariantene), i eget rom */
const ordCeller = (celleAndel, w = 600) => {
  const F = 200, celle = Math.max(4, Math.round(F * celleAndel)), c = document.createElement('canvas'), x = c.getContext('2d', { willReadFrequently: true });
  x.font = PM.font(w, F, 'normal', 'futura'); const m = x.measureText('byte');
  const fa = Math.ceil(m.fontBoundingBoxAscent), fd = Math.ceil(m.fontBoundingBoxDescent), W = Math.ceil(m.width), H = fa + fd;
  c.width = W; c.height = H; x.font = PM.font(w, F, 'normal', 'futura'); x.fillText('byte', 0, fa);
  const d = x.getImageData(0, 0, W, H).data, celler = [];
  for (let gy = 0; gy < H; gy += celle) for (let gx = 0; gx < W; gx += celle) { let s = 0, n = 0; for (let y = gy; y < Math.min(H, gy + celle); y++) for (let xx = gx; xx < Math.min(W, gx + celle); xx++) { s += d[(y * W + xx) * 4 + 3]; n++; } celler.push({ x: gx, y: gy, a: s / n / 255 }); }
  return { celler, celle, W, H, fa, fd, F };
};
const ordSvg = (oc, inn, pad = 0) => `<svg class="byteord" viewBox="0 ${-pad} ${oc.W + pad} ${oc.H + 2 * pad}" style="height:${((oc.H + 2 * pad) / oc.F).toFixed(3)}em;width:auto;vertical-align:${(-(oc.fd + pad) / oc.F).toFixed(3)}em;overflow:visible;display:inline-block">${inn}</svg>`;
const q4 = v => Math.min(1, Math.round(v * 4) / 4 || .25);
const celleRect = (p, c, fy, op = 1, cls = 'bc') => `<rect class="${cls} t" data-x="${p.x}" data-y="${p.y}" x="${p.x}" y="${p.y}" width="${c + .5}" height="${c + .5}" fill="${fy}" fill-opacity="${op}"/>`;
const popp = (rot, sel, d) => a(rot, sel, [{ transform: 'scale(0)', opacity: 0 }, { transform: 'scale(1.3)', opacity: 1, offset: .6 }, { transform: 'none', opacity: 1 }], { d: 380, delay: d, stagger: () => Math.random() * 650, e: E.ut });

/* Felles animasjon for A-sporet */
const spillA = (s, l, ekstra) => {
  a(s, '.flis', [{ transform: 'scale(.75)', opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 550, e: E.fjaer });
  a(s, '.raw', [{ transform: 'translateY(36px)', opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 700, delay: 200, e: E.ut });
  a(s, '.byte', [{ transform: 'translateY(-26px)', opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 700, delay: 380, e: E.ut });
  ekstra?.();
  lockStd(l, 1300);
};

/* ═══════ A · raw i Meno, byte i Futura ═══════ */

/* 85 */
RB.legg({ nr: 85, navn: 'raw Meno · byte Futura', scene: 'mork', palett: [f.gronn, f.krem, f.mint],
  ide: '«raw» i Meno Banner, akkurat som i Raw Studios-logoen, og «byte» i Futura PT. Futura er satt litt større, slik at x-høydene møtes og ordet henger sammen.',
  hvorfor: 'Navnet forteller historien: «raw» er arven og det samme ordet i samme skrift som morselskapet, «byte» er det nye. Du trenger strengt tatt ikke «by raw studios» lenger, fordi slektskapet står i selve ordet.',
  anim: '«raw» glir opp nedenfra, «byte» kommer ovenfra og møter det, og så blendes ordmerket inn.',
  ikon: (u, o) => { if (o.mikro) return mikro(f.gronn); const [r, b] = stabel(); return `${flis(f.gronn)}<g class="raw t">${PM.tekst(r, f.krem)}</g><g class="byte t">${PM.tekst(b, f.mint)}</g>`; },
  ord: ORD_MF(800, 500),
  spill(s, l) { spillA(s, l); } });

/* 86 */
RB.legg({ nr: 86, navn: 'Tung og lett', scene: 'svart', palett: [f.blekk, f.krem],
  ide: '«raw» i den tyngste Meno-vekten, «byte» i lett Futura (300). Stor vektkontrast, én farge.',
  hvorfor: 'Kontrasten gjør jobben fargen gjorde: det tunge, varme håndverket og det lette, presise digitale. Elegant og redaksjonelt, som et magasinomslag.',
  anim: 'Det tunge ordet faller på plass, og det lette svever ned etter.',
  ikon: (u, o) => { if (o.mikro) return mikro(f.blekk); const [r, b] = stabel({ wF: 400 }); return `${flis(f.blekk)}<g class="raw t">${PM.tekst(r, f.krem)}</g><g class="byte t">${PM.tekst(b, f.krem)}</g>`; },
  ord: ORD_MF(900, 300, null, '0'),
  spill(s, l) { spillA(s, l); } });

/* 87 */
RB.legg({ nr: 87, navn: 'BYTE som påskrift', scene: 'lys', palett: [f.gronn, f.krem, f.mint],
  ide: '«raw» i stor Meno, og «BYTE» i små, sperrede Futura-versaler under, som en påskrift eller modellbetegnelse.',
  hvorfor: '«raw» får all oppmerksomheten og er umiddelbart i slekt med Raw Studios. «BYTE» blir en presis merkelapp som sier hva slags raw dette er. Fungerer også for fremtidige søsken: raw MOTION, raw PHOTO.',
  anim: '«raw» glir opp, og påskriften spres ut fra midten med sperringen.',
  ikon: (u, o) => { if (o.mikro) return mikro(f.gronn); const r = PM.plasser('raw', { fam: 'meno', w: 900, maxB: 330, cy: 228 }), b = PM.plasser('BYTE', { fam: 'futura', w: 500, maxB: 170, cy: 350 });
    return `${flis(f.gronn)}<g class="raw t">${PM.tekst(r, f.krem)}</g><g class="byte t"><text x="256" y="${b.y.toFixed(1)}" text-anchor="middle" font-family='${PM.FAM.futura}' font-weight="500" font-size="${(b.s * .78).toFixed(1)}" letter-spacing="${(b.s * .3).toFixed(1)}" fill="${f.mint}">BYTE</text></g>`; },
  ord: { klasse: '', html: `<span class="meno" style="font-weight:800">${bk('raw')}</span><span class="futura byte-tag" style="font-weight:500;font-size:.34em;letter-spacing:.32em;margin-left:.5em;vertical-align:.2em;color:#3f8f6b">${bk('BYTE')}</span>` },
  spill(s, l) { spillA(s, l); } });

/* 88 */
RB.legg({ nr: 88, navn: 'Familien: raw / byte', scene: 'sand', palett: [f.gronn, f.krem, f.mint],
  ide: 'Bygd nøyaktig som Raw Studios-logoen: «raw» over, venstrejustert, og andre ord under. Der Raw Studios har «studios» i Meno, har Rawbyte «byte» i Futura.',
  hvorfor: 'Står de to logoene side om side, ser man at det er samme hus med en ny dør. Oppbygningen er identisk, og bare skrifta i andre linje skiller produktet fra studioet.',
  anim: 'Linjene løftes inn hver for seg, «raw» først og «byte» etter, akkurat som Raw Studios-logoen kan animeres.',
  ikon: (u, o) => { if (o.mikro) return mikro(f.gronn); const [r, b] = stabel({ venstre: true, maxB: 320, cy1: 186, cy2: 324, wF: 700 }); return `${flis(f.gronn)}<g class="raw t">${PM.tekst(r, f.krem)}</g><g class="byte t">${PM.tekst(b, f.krem)}</g>`; },
  ord: { klasse: '', css: 'line-height:.86', html: `<span class="meno" style="display:block;font-weight:800">${bk('raw', true)}</span><span class="futura" style="display:block;font-weight:700;font-size:${XR(800, 700).toFixed(3)}em;letter-spacing:-.01em">${bk('byte', true)}</span>` },
  spill(s, l) { spillA(s, l); lockIkon(l, 1300); ordInn(l, 'loft', 1450); } });

/* 89 */
RB.legg({ nr: 89, navn: 'rb-monogram, to skrifter', scene: 'mork', palett: [f.gronn, f.krem, f.mint],
  ide: 'Ikonet er en Meno-r og en Futura-b som står tett. To skrifter i ett tegn, akkurat som i navnet. Ordmerket er raw i Meno og byte i Futura.',
  hvorfor: 'Gir et kompakt ikon som fortsatt bærer begge halvdelene. Kontrasten mellom den karakterfulle r-en og den geometriske b-en gjør monogrammet eget.',
  anim: 'r-en kommer fra venstre og b-en fra høyre, og de låser seg tett sammen.',
  ikon: () => { const r = PM.plasser('r', { fam: 'meno', w: 900, maxH: 196, cx: 0, cy: 290 }), b = PM.plasser('b', { fam: 'futura', w: 600, s: r.s * XR(900, 600), cx: 0, cy: 0 });
    b.x += r.boks[2] - 6 - b.boks[0]; b.y = r.y; const venstre = r.boks[0], hoyre = r.boks[2] - 6 + (b.boks[2] - b.boks[0]), dx = 256 - (venstre + hoyre) / 2; r.x += dx; b.x += dx;
    return `${flis(f.gronn)}<g class="raw t">${PM.tekst(r, f.krem)}</g><g class="byte t">${PM.tekst(b, f.mint)}</g>`; },
  ord: ORD_MF(800, 500),
  spill(s, l) {
    a(s, '.flis', [{ transform: 'scale(.75)', opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 550, e: E.fjaer });
    a(s, '.raw', [{ transform: 'translateX(-150px)', opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 650, delay: 250, e: E.ut });
    a(s, '.byte', [{ transform: 'translateX(150px)', opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 650, delay: 250, e: E.ut });
    lockStd(l, 1200);
  } });

/* 90 */
RB.legg({ nr: 90, navn: 'byte i mosaikk', scene: 'mork', palett: [f.gronn, f.krem, f.mint],
  ide: '«raw» i ren Meno, og «byte» i Futura som en lavoppløst mosaikk av seg selv.',
  hvorfor: 'Tre lag, tre budskap: Meno-arven, Futura-produktet og pikslene som viser det digitale. Mosaikken er myk, så den tar ikke over.',
  anim: '«raw» glir opp, og byte-pikslene popper inn som et bilde som lastes.',
  ikon: (u, o) => { if (o.mikro) return mikro(f.gronn); const [r, b] = stabel(); return `${flis(f.gronn)}<g class="raw t">${PM.tekst(r, f.krem)}</g>${PM.mosaikk(b, 13, { fill: f.mint }).replace(/class="mp t"/g, 'class="bc t"')}`; },
  ord: (() => { const oc = ordCeller(.085); return ORD_MF(800, 600, ordSvg(oc, oc.celler.filter(p => p.a > .14).map(p => celleRect(p, oc.celle, '#6fb898', q4(p.a))).join(''))); })(),
  spill(s, l) { spillA(s, l, () => popp(s, '.bc', 500)); popp(l, '.ord .bc', 1800); } });

/* 91 */
const PXB = (s, x0, y0, fy) => PX.tekst('byte').c.map(p => `<rect class="bc t" x="${(x0 + p.x * s).toFixed(1)}" y="${(y0 + p.y * s).toFixed(1)}" width="${(s + .5).toFixed(1)}" height="${(s + .5).toFixed(1)}" fill="${fy}" data-x="${p.x}" data-y="${p.y}"/>`).join('');
RB.legg({ nr: 91, navn: 'byte i pikselskrift', scene: 'svart', palett: [f.blekk, f.krem, f.lys],
  ide: '«raw» i Meno, «byte» i en ekte pikselskrift med x-høyden avstemt mot Meno. Gammelt og nytt side om side.',
  hvorfor: 'Den største kontrasten: en klassisk serif og en 8-bit-skrift i samme ord. Det funker fordi hver skrift bare har én oppgave. Morsomt, selvsikkert og lett å huske.',
  anim: 'Pikselbokstavene faller ned kolonne for kolonne og stabler seg under det rolige «raw».',
  ikon: (u, o) => { if (o.mikro) return mikro(f.blekk); const r = PM.plasser('raw', { fam: 'meno', w: 900, maxB: 330, cy: 176 }), xhr = (r.boks[3] - r.boks[1]), s = xhr / 5 * .98, sett = PX.tekst('byte');
    return `${flis(f.blekk)}<g class="raw t">${PM.tekst(r, f.krem)}</g><g class="byte">${PXB(s, 256 - sett.w * s / 2, 262, f.lys)}</g>`; },
  ord: (() => { const xm = xh('meno', 800) / 100, row = xm / 5, sett = PX.tekst('byte');
    return { klasse: '', html: `<span class="meno" style="font-weight:800">${bk('raw')}</span><svg class="byteord" viewBox="0 0 ${sett.w * 10} ${sett.h * 10}" style="height:${(sett.h * row).toFixed(3)}em;width:auto;vertical-align:${(-2 * row).toFixed(3)}em;margin-left:.06em;display:inline-block" shape-rendering="crispEdges">${PXB(10, 0, 0, f.lys)}</svg>` }; })(),
  spill(s, l) { spillA(s, l, () => a(s, '.bc', [{ transform: 'translateY(-180px)', opacity: 0, easing: E.inn }, { transform: 'none', opacity: 1, offset: .75 }, { transform: 'none', opacity: 1 }], { d: 600, delay: 450, stagger: el => +el.dataset.x * 34 + (8 - +el.dataset.y) * 20 }));
    a(l, '.ord .bc', [{ transform: 'translateY(-60px)', opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 500, delay: 1800, stagger: el => +el.dataset.x * 22 }); } });

/* 92 */
RB.legg({ nr: 92, navn: 'byte med bit', scene: 'lys', palett: [f.gronn, f.krem, f.mint],
  ide: '«raw» i Meno, «byte» i Futura, og noen har tatt en pikselbit av hjørnet på e-en. Smulene ligger igjen. Byte ≈ bite.',
  hvorfor: 'Vitsen fra 11 i sin mest diskré form: ordet er helt rent, bortsett fra én liten trapp. Du får familie, produkt og et smil, uten at noe roper.',
  anim: 'Ordene møtes, og så tar tre raske jafs hjørnet av e-en mens smulene spretter ut.',
  ikon: (u, o) => { if (o.mikro) return mikro(f.gronn); const [r, b] = stabel(), q = Math.round(b.s * .085), ex = b.boks[2], ey = b.y - (xh('futura', 600) / 100) * b.s;
    return `${flis(f.gronn)}<defs><mask id="${u}m" maskUnits="userSpaceOnUse" x="0" y="0" width="512" height="512"><rect width="512" height="512" fill="#fff"/>${[[ex - q, ey - 4, q + 6, q + 4], [ex - 2 * q, ey - 4, q + 2, q * .55 + 4], [ex - q * .5, ey + q - 2, q * .5 + 6, q * .8]].map(([x, y, w, h]) => `<rect class="bt" style="transform-box:fill-box;transform-origin:100% 0" x="${x.toFixed(0)}" y="${y.toFixed(0)}" width="${w.toFixed(0)}" height="${h.toFixed(0)}" fill="#000"/>`).join('')}</mask></defs>
      <g class="raw t">${PM.tekst(r, f.krem)}</g><g class="byte t" mask="url(#${u}m)">${PM.tekst(b, f.mint)}</g>${[[ex + q * .8, ey - q * 1.2, q * .7], [ex + q * 1.9, ey + q * .2, q * .5], [ex + q * 1.2, ey + q * 1.4, q * .35]].map(([x, y, z]) => `<rect class="smule t" x="${x.toFixed(0)}" y="${y.toFixed(0)}" width="${z.toFixed(0)}" height="${z.toFixed(0)}" fill="${f.mint}"/>`).join('')}`; },
  ord: ORD_MF(800, 500, bk('byt') + `<span class="bk" style="clip-path:polygon(0 0,52% 0,52% 40%,72% 40%,72% 54%,100% 54%,100% 100%,0 100%)">e</span><span class="bk sm" style="display:inline-block;width:.09em;height:.09em;background:currentColor;margin-left:.05em;vertical-align:.5em"></span>`),
  spill(s, l) { spillA(s, l, () => { a(s, '.bt', [{ transform: 'scale(0)' }, { transform: 'scale(0)', offset: .01 }, { transform: 'none' }], { d: 200, delay: 1150, stagger: 220, e: E.ut });
    a(s, '.smule', [{ transform: 'translate(-30px,24px) scale(0)', opacity: 0 }, { transform: 'translate(5px,-16px) scale(1.2)', opacity: 1, offset: .5, easing: E.inn }, { transform: 'none', opacity: 1 }], { d: 700, delay: 1190, stagger: 220, e: E.ut }); }); } });

/* 93 */
RB.legg({ nr: 93, navn: 'byte i brikke', scene: 'mork', palett: [f.gronn, f.krem, f.mint, f.mork],
  ide: '«raw» i Meno, med «byte» i Futura inne i en liten mint brikke, som en merkelapp eller et filformat (.raw, .byte).',
  hvorfor: 'Brikken gjør «byte» til et tydelig, eget element som kan stå alene: i knapper, i menyer og som merke på filer i skapet. «raw» bærer familien.',
  anim: '«raw» glir opp, og brikken spretter inn under med ordet i.',
  ikon: (u, o) => { if (o.mikro) return mikro(f.gronn); const r = PM.plasser('raw', { fam: 'meno', w: 900, maxB: 320, cy: 210 }), b = PM.plasser('byte', { fam: 'futura', w: 600, maxB: 150, cy: 346 });
    const pw = (b.boks[2] - b.boks[0]) + 56, ph = (b.boks[3] - b.boks[1]) + 34;
    return `${flis(f.gronn)}<g class="raw t">${PM.tekst(r, f.krem)}</g><g class="byte t"><rect x="${(256 - pw / 2).toFixed(1)}" y="${(346 - ph / 2).toFixed(1)}" width="${pw.toFixed(1)}" height="${ph.toFixed(1)}" rx="${(ph / 2).toFixed(1)}" fill="${f.mint}"/>${PM.tekst(b, f.mork)}</g>`; },
  ord: { klasse: '', html: `<span class="meno" style="font-weight:800">${bk('raw')}</span><span class="futura bk" style="display:inline-block;font-weight:600;font-size:.5em;letter-spacing:0;background:${f.mint};color:${f.mork};border-radius:1em;padding:.06em .55em .16em;margin-left:.28em;vertical-align:.18em">byte</span>` },
  spill(s, l) { spillA(s, l); } });

/* 94 */
const LAG = [40, 24, 14, 8];
RB.legg({ nr: 94, navn: 'byte fremkalles', scene: 'mork', palett: [f.gronn, f.krem, f.mint],
  ide: 'Rent i ro: «raw» i Meno og «byte» i Futura. Pikslene finnes bare i bevegelsen, der «byte» kommer inn som et bilde som lastes, mens «raw» alltid står skarpt.',
  hvorfor: 'Den roligste utgaven: merket er bare to skrifter, og det digitale vises i animasjonen. Den samme effekten kan brukes på alle bilder i skapet mens de laster.',
  anim: '«byte» går fra grove piksler til skarp Futura i fire trinn, både i ikonet og i ordmerket. «raw» rører seg knapt.',
  ikon: (u, o) => { if (o.mikro) return mikro(f.gronn); const [r, b] = stabel();
    return `${flis(f.gronn)}<g class="raw t">${PM.tekst(r, f.krem)}</g>${o.liten ? '' : LAG.map(c => `<g class="lag" opacity="0">${PM.mosaikk(b, c, { fill: f.mint })}</g>`).join('')}<g class="skarp">${PM.tekst(b, f.mint)}</g>`; },
  ord: { klasse: '', html: `<span class="meno" style="font-weight:800">${bk('raw')}</span><span class="futura byteSpan" style="font-weight:500;font-size:${XR(800, 500).toFixed(3)}em;letter-spacing:-.01em">byte</span>` },
  spill(s, l) {
    a(s, '.flis', [{ transform: 'scale(.75)', opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 550, e: E.fjaer });
    a(s, '.raw', [{ opacity: 0 }, { opacity: 1 }], { d: 500, delay: 200 });
    a(s, '.lag', [{ opacity: 1 }, { opacity: 1 }], { d: 160, delay: 450, stagger: 160, fill: 'none' });
    a(s, '.skarp', [{ opacity: 0 }, { opacity: 0, offset: .9 }, { opacity: 1 }], { d: 450 + LAG.length * 160 + 120, e: E.lin });
    lockIkon(l, 1300); ordInn(l, 'blur', 1450); skarpPaa(l, '.byteSpan', 1700);
  } });

/* «skarp» på ett element i ordmerket (bare byte) */
function skarpPaa(lock, sel, delay) {
  const el = lock.querySelector(sel); if (!el) return;
  el.style.opacity = '0';
  lock._rydd = () => { el.style.opacity = ''; lock.querySelectorAll('canvas.skarp').forEach(c => c.remove()); };
  RB.etter(lock, delay, () => {
    const cs = getComputedStyle(el), r = el.getBoundingClientRect(), pr = el.offsetParent.getBoundingClientRect(), d = Math.min(devicePixelRatio || 1, 2), W = Math.ceil(r.width) + 8, H = Math.ceil(r.height) + 8;
    const c = document.createElement('canvas'); c.className = 'skarp'; c.width = W * d; c.height = H * d;
    Object.assign(c.style, { position: 'absolute', left: (r.left - pr.left - 4) + 'px', top: (r.top - pr.top - 4) + 'px', width: W + 'px', height: H + 'px', pointerEvents: 'none' });
    el.offsetParent.appendChild(c);
    const fs = parseFloat(cs.fontSize);
    const tegnC = cel => { const sw = Math.max(1, Math.round(W / cel)), sh = Math.max(1, Math.round(H / cel)), li = document.createElement('canvas'); li.width = sw; li.height = sh; const lx = li.getContext('2d');
      lx.scale(sw / W, sh / H); lx.font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`; lx.fillStyle = cs.color; const m = lx.measureText('Hg');
      lx.fillText(el.textContent, 4, 4 + (r.height - (m.fontBoundingBoxAscent + m.fontBoundingBoxDescent)) / 2 + m.fontBoundingBoxAscent);
      const x = c.getContext('2d'); x.setTransform(1, 0, 0, 1, 0, 0); x.clearRect(0, 0, c.width, c.height); x.imageSmoothingEnabled = false; x.drawImage(li, 0, 0, c.width, c.height); };
    [.45, .26, .14, .07].forEach((k, i) => RB.etter(lock, i * 140, () => tegnC(fs * k)));
    RB.etter(lock, 4 * 140, () => { el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 240, fill: 'forwards' }).onfinish = () => (el.style.opacity = ''); c.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 280, fill: 'forwards' }).onfinish = () => c.remove(); });
  });
}

/* ═══════ B · helt frie forslag ═══════ */
const G = { unb: 'Unbounded, sans-serif', ins: '"Instrument Serif", serif', spg: '"Space Grotesk", sans-serif', bri: '"Bricolage Grotesque", sans-serif', arb: '"Archivo Black", sans-serif', sten: '"Big Shoulders Stencil Display", sans-serif', syne: 'Syne, sans-serif', fra: 'Fraunces, serif', dms: '"DM Serif Display", serif', arc: 'Archivo, sans-serif' };
const ORDG = (fam, css = '', html = bk('rawbyte')) => ({ klasse: '', html, css: `font-family:${fam};${css}` });

/* 95 · Banen */
const BANE = (() => { const ut = [], v = -18 * Math.PI / 180; for (let i = 0; i <= 36; i++) { const t = i / 36 * Math.PI * 2 + Math.PI / 6, x = 205 * Math.cos(t), y = 58 * Math.sin(t); ut.push([256 + x * Math.cos(v) - y * Math.sin(v), 256 + x * Math.sin(v) + y * Math.cos(v)]); } return ut; })();
RB.legg({ nr: 95, navn: 'Banen', fri: true, scene: 'svart', palett: ['#0e1630', '#f2b544', '#d9792b', '#f5f0eb'],
  ide: 'En gyllen planet med en ring rundt, og en liten firkantet satellitt i bane. Arkivet ditt er en verden, og filene går i bane rundt den.',
  hvorfor: 'Stort, rolig og eventyrlig: Rawbyte som et sted, ikke et verktøy. Dyp marine og gull skiller seg fra alt annet på skrivebordet. Satellitten er et naturlig levende element (synk, opplasting).',
  anim: 'Planeten stiger opp, ringen tegnes rundt, og satellitten fullfører en hel bane. Laster-løkka lar satellitten gå rundt og rundt.',
  ikon: (u) => `<defs><radialGradient id="${u}p" cx="38%" cy="32%" r="75%"><stop offset="0" stop-color="#ffd27a"/><stop offset=".6" stop-color="#f2a33a"/><stop offset="1" stop-color="#b85a1c"/></radialGradient></defs>${flis('#0e1630')}
    ${[[96, 110, 2], [410, 96, 1.6], [430, 400, 2.2], [80, 380, 1.4], [300, 70, 1.2], [140, 450, 1.6]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#f5f0eb" opacity=".7"/>`).join('')}
    <g transform="rotate(-18 256 256)"><ellipse class="ring1" cx="256" cy="256" rx="205" ry="58" fill="none" stroke="#f5f0eb" stroke-opacity=".55" stroke-width="10" pathLength="1"/></g>
    <circle class="planet t" cx="256" cy="256" r="118" fill="url(#${u}p)"/>
    <g transform="rotate(-18 256 256)"><path class="ring2" d="M51,256 A205,58 0 0 0 461,256" fill="none" stroke="#f5f0eb" stroke-width="10" pathLength="1"/></g>
    <rect class="sat" x="-12" y="-12" width="24" height="24" fill="#f5f0eb" style="transform:translate(${BANE[0][0].toFixed(1)}px,${BANE[0][1].toFixed(1)}px)"/>`,
  ord: ORDG(G.unb, 'font-weight:600;letter-spacing:-.02em;font-size:clamp(40px,5.4vw,78px)'),
  spill(s, l) {
    a(s, '.flis', [{ opacity: 0 }, { opacity: 1 }], { d: 300 });
    a(s, '.planet', [{ transform: 'translateY(80px) scale(.6)', opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 900, delay: 150, e: E.ut });
    a(s, '.ring1,.ring2', [{ strokeDasharray: '0 1' }, { strokeDasharray: '1 0' }], { d: 900, delay: 700, e: E.myk });
    a(s, '.sat', BANE.map(([x, y]) => ({ transform: `translate(${x.toFixed(1)}px,${y.toFixed(1)}px)` })), { d: 1800, delay: 1100, e: E.myk });
    lockStd(l, 1500);
  },
  laster(s) { return a(s, '.sat', BANE.map(([x, y]) => ({ transform: `translate(${x.toFixed(1)}px,${y.toFixed(1)}px)` })), { d: 2400, it: Infinity, e: E.lin, fill: 'none' }); } });

/* 96 · Sjøglass */
RB.legg({ nr: 96, navn: 'Sjøglass', fri: true, scene: 'lys', palett: ['#cfe9e4', '#7fbfc0', '#2f7a80', '#ffffff'],
  ide: 'En matt glassbit fra fjæra, slipt rund av havet, med en r preget inn i overflaten. Ordmerket står i en lett, kursiv serif.',
  hvorfor: 'Taktilt, nordisk og rolig, som å ta vare på noe fint du har funnet. Uttrykket gjør ikke krav på teknologi, og akkurat det får det til å skille seg ut. Det myke lyset gir et premium-preg.',
  anim: 'En bølge skyller glassbiten inn, den legger seg, og lyset glir over overflaten.',
  ikon: (u) => { const r = PM.plasser('r', { fam: G.ins, w: 400, st: 'italic', maxH: 200, cx: 270, cy: 272 });
    return `<defs><linearGradient id="${u}b" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e3f3ef"/><stop offset="1" stop-color="#8fc8c6"/></linearGradient><linearGradient id="${u}g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff" stop-opacity=".95"/><stop offset=".55" stop-color="#bfe6e0" stop-opacity=".75"/><stop offset="1" stop-color="#5fa9ab" stop-opacity=".9"/></linearGradient>
      <filter id="${u}s" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="14" stdDeviation="14" flood-color="#1d5a5e" flood-opacity=".35"/></filter><linearGradient id="${u}l" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".8"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
      <clipPath id="${u}k"><path d="M140,300 C122,196 214,118 322,136 C414,152 438,256 398,332 C356,410 236,428 184,390 C158,372 146,338 140,300 Z"/></clipPath></defs>
      <rect class="flis" width="512" height="512" rx="116" fill="url(#${u}b)"/>
      <g class="sten t" filter="url(#${u}s)"><path d="M140,300 C122,196 214,118 322,136 C414,152 438,256 398,332 C356,410 236,428 184,390 C158,372 146,338 140,300 Z" fill="url(#${u}g)"/>
      <g clip-path="url(#${u}k)">${PM.tekst({ ...r, x: r.x + 2, y: r.y + 3 }, '#ffffff', 'opacity=".7"')}${PM.tekst(r, '#3b8a8e')}<rect class="lys" x="-200" y="80" width="140" height="400" fill="url(#${u}l)" transform="rotate(20 256 256)" opacity="0"/></g>
      <ellipse cx="226" cy="186" rx="60" ry="22" fill="#fff" opacity=".55" transform="rotate(-22 226 186)"/></g>`; },
  ord: ORDG(G.ins, 'font-style:italic;font-weight:400;letter-spacing:-.01em;color:#2f7a80;font-size:clamp(50px,6.8vw,96px)'),
  spill(s, l) {
    a(s, '.flis', [{ opacity: 0 }, { opacity: 1 }], { d: 400 });
    a(s, '.sten', [{ transform: 'translate(-60px,160px) rotate(-30deg)', opacity: 0 }, { transform: 'translate(10px,-10px) rotate(4deg)', opacity: 1, offset: .7 }, { transform: 'none', opacity: 1 }], { d: 1400, delay: 150, e: E.ut });
    a(s, '.lys', [{ transform: 'rotate(20deg) translateX(0)', opacity: .9 }, { transform: 'rotate(20deg) translateX(620px)', opacity: .9 }], { d: 1100, delay: 1300, e: E.myk, fill: 'none' });
    lockStd(l, 1500, 'fokus');
  } });

/* 97 · Hullkortet */
const HULL = (() => { const r = PX.tekst('rb'); return r; })();
RB.legg({ nr: 97, navn: 'Hullkortet', fri: true, scene: 'sand', palett: ['#c9a878', '#efe6d2', '#3a2a1a'],
  ide: 'Et gammeldags hullkort, slik data ble lagret før skjermer fantes, der de stansede hullene staver «rb».',
  hvorfor: 'Den opprinnelige byten: papir og hull. Varmt, analogt og overraskende for et digitalt arkiv. Kortets avkuttede hjørne gir en egen silhuett, og formen er sterk også uten bokstavene.',
  anim: 'Kortet legges ned, og hullene stanses ett og ett med et lite rykk i kortet. Laster-løkka stanser rad for rad.',
  ikon: () => { const c = 30, sett = HULL, x0 = 256 - sett.w * c / 2 + 6, y0 = 262 - sett.h * c / 2;
    return `${flis('#c9a878')}<g class="kort t"><path d="M160,104 H392 Q406,104 406,118 V394 Q406,408 392,408 H120 Q106,408 106,394 V158 Z" fill="#efe6d2"/>
      ${[...Array(9)].map((_, i) => `<line x1="128" x2="388" y1="${140 + i * 30}" y2="${140 + i * 30}" stroke="#c9b693" stroke-width="1.2"/>`).join('')}
      <text x="132" y="128" font-family='${G.spg}' font-size="13" fill="#9c8660" letter-spacing="2">0 1 2 3 4 5 6 7 8 9</text>
      ${sett.c.map((p, i) => `<rect class="hull t" data-x="${p.x}" data-y="${p.y}" x="${x0 + p.x * c + 7}" y="${y0 + p.y * c + 3}" width="16" height="24" rx="3" fill="#3a2a1a"/>`).join('')}</g>`; },
  ord: ORDG(G.spg, 'font-weight:600;letter-spacing:-.02em'),
  spill(s, l) {
    a(s, '.flis', [{ opacity: 0 }, { opacity: 1 }], { d: 300 });
    a(s, '.kort', [{ transform: 'translateY(-60px) rotate(-6deg)', opacity: 0 }, { transform: 'none', opacity: 1 }], { d: 700, delay: 100, e: E.ut });
    a(s, '.hull', [{ transform: 'scale(0)' }, { transform: 'scale(1.2)', offset: .5 }, { transform: 'none' }], { d: 160, delay: 700, stagger: el => (+el.dataset.x * 7 + +el.dataset.y) * 18, e: 'steps(2)' });
    lockStd(l, 1700, 'tone');
  },
  laster(s) { return a(s, '.hull', [{ opacity: 1 }, { opacity: .15, offset: .3 }, { opacity: 1, offset: .6 }], { d: 1600, it: Infinity, stagger: el => +el.dataset.y * 120, e: 'steps(1)', fill: 'none' }); } });

/* 98 · Diasrammen */
RB.legg({ nr: 98, navn: 'Diasrammen', fri: true, scene: 'mork', palett: ['#f4f1ea', '#ffffff', '#ffb46b', '#6aa7d8', '#2b2b2e'],
  ide: 'En diasramme på et lysbord: den hvite plastrammen rundt et lite, lysende bilde av fjell og solnedgang, og en håndskrevet lapp på kanten.',
  hvorfor: 'Bildearkivet slik det så ut før skyen: små, kostbare øyeblikk tatt vare på i hver sin ramme. Varmt og nostalgisk, men formen er ren og moderne. Det lysende vinduet trekker øyet til seg i oppgavelinja.',
  anim: 'Rammen legges ned på lysbordet og retter seg opp, så tennes lyset bakfra og bildet lyser opp.',
  ikon: (u) => `<defs><linearGradient id="${u}h" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff9f5a"/><stop offset=".55" stop-color="#ffd3a1"/><stop offset="1" stop-color="#6aa7d8"/></linearGradient><filter id="${u}s" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="10" stdDeviation="12" flood-color="#000" flood-opacity=".22"/></filter><clipPath id="${u}v"><rect x="166" y="170" width="180" height="160" rx="16"/></clipPath></defs>
    ${flis('#f4f1ea')}<g class="ramme t" filter="url(#${u}s)" transform="rotate(-4 256 256)"><rect x="98" y="98" width="316" height="316" rx="30" fill="#ffffff"/>
    <g class="bilde" clip-path="url(#${u}v)"><rect x="166" y="170" width="180" height="160" fill="url(#${u}h)"/><circle cx="300" cy="236" r="22" fill="#fff4d6"/><path d="M166,300 L214,250 L246,278 L282,236 L346,296 V330 H166 Z" fill="#2c3e50"/><path d="M166,316 L236,286 L346,318 V330 H166 Z" fill="#1b2733"/></g>
    <text x="256" y="378" text-anchor="middle" font-family='"Instrument Serif", serif' font-style="italic" font-size="30" fill="#5a5a5a">rawbyte · 1979</text><circle cx="130" cy="130" r="7" fill="#e85d3a"/></g>`,
  ord: ORDG(G.bri, 'font-weight:700;letter-spacing:-.03em'),
  spill(s, l) {
    a(s, '.flis', [{ opacity: 0 }, { opacity: 1 }], { d: 300 });
    a(s, '.ramme', [{ transform: 'translateY(-140px) rotate(-16deg) scale(1.1)', opacity: 0 }, { transform: 'rotate(2deg)', opacity: 1, offset: .75 }, { transform: 'none', opacity: 1 }], { d: 900, delay: 150, e: E.ut });
    a(s, '.bilde', [{ filter: 'brightness(.25)' }, { filter: 'brightness(.25)', offset: .2 }, { filter: 'brightness(1.4)', offset: .35 }, { filter: 'brightness(.7)', offset: .45 }, { filter: 'brightness(1)' }], { d: 1100, delay: 900, e: E.lin });
    lockStd(l, 1500);
  } });

/* 99 · Passmerket */
const PASS = (fy, cls) => `<g class="${cls}" style="mix-blend-mode:multiply"><circle cx="256" cy="256" r="104" fill="none" stroke="${fy}" stroke-width="24"/><rect x="244" y="86" width="24" height="340" fill="${fy}"/><rect x="86" y="244" width="340" height="24" fill="${fy}"/></g>`;
RB.legg({ nr: 99, navn: 'Passmerket', fri: true, scene: 'lys', palett: ['#ffffff', '#00a6e8', '#e6007e', '#ffd400', '#111'],
  ide: 'Trykkerens passmerke, sikteringen i hjørnet av hvert trykkark, i cyan, magenta og gult som ikke helt treffer hverandre.',
  hvorfor: 'Fra fil til ferdig trykk. Merket sier «presisjon» og «produksjon», og den lille feilregistreringen gir varme og sjel. Ikonet er fargesterkt, grafisk og helt uavhengig av bokstaver.',
  anim: 'De tre fargene glir inn fra hver sin kant og nesten treffer, akkurat som på et ekte trykk. Ordmerket får samme fargeforskyvning.',
  ikon: () => `${flis('#ffffff')}<g transform="translate(-9 -6)">${PASS('#00a6e8', 'pc')}</g><g transform="translate(9 -4)">${PASS('#e6007e', 'pm')}</g><g transform="translate(1 10)">${PASS('#ffd400', 'py')}</g>`,
  ord: ORDG(G.arb, 'font-weight:400;letter-spacing:-.01em;color:#111;text-shadow:-.04em -.02em 0 rgba(0,166,232,.75),.04em -.01em 0 rgba(230,0,126,.65),.01em .04em 0 rgba(255,212,0,.8)'),
  spill(s, l) {
    a(s, '.flis', [{ opacity: 0 }, { opacity: 1 }], { d: 300 });
    a(s, '.pc', [{ transform: 'translate(-160px,-90px)', opacity: 0 }, { transform: 'translate(6px,4px)', opacity: 1, offset: .75 }, { transform: 'none', opacity: 1 }], { d: 1200, delay: 200, e: E.ut });
    a(s, '.pm', [{ transform: 'translate(170px,-60px)', opacity: 0 }, { transform: 'translate(-5px,3px)', opacity: 1, offset: .75 }, { transform: 'none', opacity: 1 }], { d: 1200, delay: 300, e: E.ut });
    a(s, '.py', [{ transform: 'translate(20px,180px)', opacity: 0 }, { transform: 'translate(-2px,-6px)', opacity: 1, offset: .75 }, { transform: 'none', opacity: 1 }], { d: 1200, delay: 400, e: E.ut });
    lockStd(l, 1500, 'fokus');
  } });

/* 100 · Arkivboksen */
RB.legg({ nr: 100, navn: 'Arkivboksen', fri: true, scene: 'sand', palett: ['#c8a06b', '#b38a55', '#3b2a18', '#9aa0a6', '#ffffff'],
  ide: 'Enden av en arkivboks i brun kartong, med gripehull og en liten metallramme der etiketten «RB» står i sjablongskrift.',
  hvorfor: 'Ærlig og fysisk: det er dette Rawbyte er, arkivet der alt ligger trygt og merket. Kartong og sjablong sier «oppbevaring for livet» og står ut blant alle de glatte appikonene.',
  anim: 'Boksen settes ned med et lite dunk, og etiketten skyves inn i rammen fra siden.',
  ikon: () => { const t = PM.plasser('RB', { fam: G.sten, w: 800, maxB: 150, maxH: 82, cx: 256, cy: 302 });
    return `${flis('#c8a06b')}<g class="boks t"><rect x="70" y="70" width="372" height="372" rx="22" fill="#d2ab76" stroke="#b38a55" stroke-width="6"/>
      <rect x="196" y="118" width="120" height="34" rx="17" fill="#3b2a18"/><path d="M96,96 L142,142 M416,96 L370,142" stroke="#b38a55" stroke-width="4" opacity=".6"/>
      <rect x="144" y="238" width="224" height="128" rx="10" fill="none" stroke="#9aa0a6" stroke-width="10"/><circle cx="160" cy="254" r="5" fill="#9aa0a6"/><circle cx="352" cy="254" r="5" fill="#9aa0a6"/>
      <g class="etikett"><rect x="160" y="252" width="192" height="100" rx="4" fill="#ffffff"/>${PM.tekst(t, '#1d1d1f')}</g></g>`; },
  ord: ORDG(G.sten, 'font-weight:800;letter-spacing:.04em;text-transform:uppercase', bk('RAWBYTE')),
  spill(s, l) {
    a(s, '.flis', [{ opacity: 0 }, { opacity: 1 }], { d: 300 });
    a(s, '.boks', [{ transform: 'translateY(-120px)', opacity: 0, easing: E.inn }, { transform: 'translateY(0) scale(1.02,.97)', opacity: 1, offset: .7, easing: E.ut }, { transform: 'none', opacity: 1 }], { d: 700, delay: 100 });
    a(s, '.etikett', [{ transform: 'translateX(260px)', opacity: 0 }, { transform: 'translateX(-6px)', opacity: 1, offset: .8 }, { transform: 'none', opacity: 1 }], { d: 700, delay: 900, e: E.ut });
    lockStd(l, 1500, 'tavle');
  } });

/* 101 · Gnisten */
const STJ = 'M256,90 C268,198 314,244 422,256 C314,268 268,314 256,422 C244,314 198,268 90,256 C198,244 244,198 256,90 Z';
RB.legg({ nr: 101, navn: 'Gnisten', fri: true, scene: 'svart', palett: ['#0b0b0d', '#ff8ad8', '#8be9ff', '#ffd28a'],
  ide: 'En firarmet gnist i et skimrende perlemorsforløp mot svart, med en liten gnist ved siden av. Ordmerket står i en bred, moderne grotesk.',
  hvorfor: 'Sier magi og intelligens (Rawbot, søk som forstår deg) i ett glimt. Det er det mest «AI-produkt»-aktige forslaget, og det skinner i både mørk og lys oppgavelinje.',
  anim: 'Gnisten tennes med en blink og snur seg en kvart runde, og den lille gnisten spretter fram. Laster-løkka lar den glitre.',
  ikon: (u) => `<defs><linearGradient id="${u}g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff8ad8"/><stop offset=".45" stop-color="#8be9ff"/><stop offset=".7" stop-color="#ffffff"/><stop offset="1" stop-color="#ffd28a"/></linearGradient><filter id="${u}b" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="22"/></filter></defs>
    ${flis('#0b0b0d')}<path class="glod" d="${STJ}" fill="url(#${u}g)" filter="url(#${u}b)" opacity=".55"/><path class="stj t" d="${STJ}" fill="url(#${u}g)"/><path class="liten t" d="${STJ}" fill="url(#${u}g)" transform="translate(338 70) scale(.22)"/>`,
  ord: { klasse: '', html: `<span style="background:linear-gradient(100deg,#ff8ad8,#8be9ff 50%,#ffd28a);-webkit-background-clip:text;background-clip:text;color:transparent">${bk('rawbyte')}</span>`, css: `font-family:${G.syne};font-weight:800;letter-spacing:-.03em` },
  spill(s, l) {
    a(s, '.flis', [{ opacity: 0 }, { opacity: 1 }], { d: 300 });
    a(s, '.stj', [{ transform: 'scale(0) rotate(-90deg)' }, { transform: 'scale(1.15) rotate(8deg)', offset: .6 }, { transform: 'none' }], { d: 900, delay: 200, e: E.ut });
    a(s, '.glod', [{ opacity: 0 }, { opacity: 1, offset: .3 }, { opacity: .55 }], { d: 1200, delay: 300 });
    lockStd(l, 1300, 'fokus');
  },
  laster(s) { return [a(s, '.stj', [{ transform: 'none' }, { transform: 'scale(.86) rotate(45deg)' }], { d: 900, it: Infinity, dir: 'alternate', e: E.myk, fill: 'none' }), a(s, '.glod', [{ opacity: .3 }, { opacity: .8 }], { d: 900, it: Infinity, dir: 'alternate', e: E.myk, fill: 'none' })]; } });

/* 102 · Fingeravtrykket */
RB.legg({ nr: 102, navn: 'Fingeravtrykket', fri: true, scene: 'lys', palett: ['#f3efe6', '#1f3d32'],
  ide: 'Et fingeravtrykk tegnet med fine, brutte linjer. Ditt materiale, din identitet, ditt samtykke.',
  hvorfor: 'Rawbytes største forskjell fra andre lagringstjenester er eierskap og samtykke (samtykkemotoren, private mapper). Fingeravtrykket sier «dette er ditt, og bare du bestemmer» uten et ord. Linjekunst på papir føles menneskelig og ekte.',
  anim: 'Linjene tegnes fra midten og ut, som når et avtrykk presses ned på papiret.',
  ikon: () => { let h = 3; const t = () => (h = (h * 9301 + 49297) % 233280) / 233280;
    return `${flis('#f3efe6')}<g transform="rotate(-12 256 262)">${[...Array(10)].map((_, i) => { const rx = 22 + i * 19, ry = 30 + i * 21, gap = 4 + t() * 8, d1 = 30 + t() * 40;
      return `<ellipse class="rille" data-i="${i}" cx="256" cy="${262 + i * 2}" rx="${rx}" ry="${ry}" fill="none" stroke="#1f3d32" stroke-width="9" stroke-linecap="round" pathLength="100" stroke-dasharray="${d1.toFixed(0)} ${gap.toFixed(0)} ${(100 - d1 - gap * 2).toFixed(0)} ${gap.toFixed(0)}" stroke-dashoffset="${(t() * 100).toFixed(0)}"/>`; }).join('')}</g>`; },
  ord: ORDG(G.fra, 'font-weight:600;letter-spacing:-.02em;color:#1f3d32'),
  spill(s, l) {
    a(s, '.flis', [{ opacity: 0 }, { opacity: 1 }], { d: 300 });
    a(s, '.rille', [{ opacity: 0, transform: 'scale(.85)' }, { opacity: 1, transform: 'none' }], { d: 700, delay: 200, stagger: el => +el.dataset.i * 90, e: E.ut });
    lockStd(l, 1500);
  } });

/* 103 · Trykkblokka */
RB.legg({ nr: 103, navn: 'Trykkblokka', fri: true, scene: 'sand', palett: ['#c58b54', '#a96f3d', '#161210'],
  ide: 'En trykkblokk i tre med en speilvendt r skåret ut og innsvertet, klar til å trykkes. Ordmerket i en klassisk, høykontrast serif.',
  hvorfor: 'Håndverk i sin reneste form, verktøyet som lager originalen. Speilvendingen gir et lite «aha» når du skjønner det. Tre og blekk er varmt og eksklusivt, og ingen andre i oppgavelinja ser slik ut.',
  anim: 'En blekkvalse ruller over blokka, og bokstaven blir svart der den treffer.',
  ikon: (u) => { const r = PM.plasser('r', { fam: G.dms, w: 400, maxH: 300, cx: 256, cy: 262 });
    return `<defs><linearGradient id="${u}w" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#d39a62"/><stop offset="1" stop-color="#a96f3d"/></linearGradient><filter id="${u}t"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="4"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 -2.2 1.6"/><feComposite in2="SourceGraphic" operator="in"/></filter></defs>
      <rect class="flis" width="512" height="512" rx="116" fill="url(#${u}w)"/>${[...Array(9)].map((_, i) => `<path d="M60,${80 + i * 44} C180,${66 + i * 44} 300,${100 + i * 44} 452,${78 + i * 44}" stroke="#8a5629" stroke-width="2" fill="none" opacity=".35"/>`).join('')}
      <g class="blekk" transform="translate(512 0) scale(-1 1)">${PM.tekst(r, '#161210')}<g filter="url(#${u}t)" opacity=".5">${PM.tekst(r, '#3a2a1a')}</g></g>
      <rect class="valse" x="-120" y="0" width="90" height="512" fill="#161210" opacity="0"/>`; },
  ord: ORDG(G.dms, 'font-weight:400;letter-spacing:-.01em'),
  spill(s, l) {
    a(s, '.flis', [{ opacity: 0 }, { opacity: 1 }], { d: 300 });
    a(s, '.valse', [{ transform: 'translateX(0)', opacity: .5 }, { transform: 'translateX(700px)', opacity: .5 }], { d: 900, delay: 300, e: E.myk, fill: 'none' });
    a(s, '.blekk', [{ opacity: 0 }, { opacity: 0, offset: .3 }, { opacity: 1 }], { d: 900, delay: 300, e: E.lin });
    lockStd(l, 1400);
  } });

/* 104 · Sveits */
RB.legg({ nr: 104, navn: 'Sveits', fri: true, scene: 'lys', palett: ['#e2231a', '#ffffff', '#111'],
  ide: 'Rød flis i sveitsisk plakatstil: «rb» i en tett, kraftig grotesk satt nede til venstre, en hårfin linje øverst og navnet i liten skrift. Rutenett, rødt og hvitt.',
  hvorfor: 'Tidløst, selvsikkert og profesjonelt, det byråer og kreative kjenner som god smak. Rødt er sterkt i oppgavelinja, og formen er streng nok til å leses på 16 px.',
  anim: 'Linja tegnes fra venstre, bokstavene skyves opp fra rutenettet, og den lille teksten tikker inn.',
  ikon: (u) => { const r = PM.plasser('rb', { fam: G.arc, w: 800, maxB: 330, cx: 0, cy: 0 }), dx = 64 - r.boks[0], dy = 436 - r.boks[3];
    return `${flis('#e2231a')}<defs><clipPath id="${u}k"><rect x="0" y="120" width="512" height="${(r.boks[3] + dy + 2 - 120).toFixed(0)}"/></clipPath></defs>
      <rect class="linje tl" x="64" y="98" width="384" height="6" fill="#fff"/><text class="liten" x="64" y="84" font-family='${G.arc}' font-weight="600" font-size="28" fill="#fff">rawbyte</text>
      <g clip-path="url(#${u}k)"><g class="rb">${PM.tekst({ ...r, x: r.x + dx, y: r.y + dy }, '#fff', 'letter-spacing="-12"')}</g></g>`; },
  ord: ORDG(G.arc, 'font-weight:800;letter-spacing:-.05em;color:#e2231a'),
  spill(s, l) {
    a(s, '.flis', [{ opacity: 0 }, { opacity: 1 }], { d: 300 });
    a(s, '.linje', [{ transform: 'scaleX(0)' }, { transform: 'none' }], { d: 700, delay: 200, e: E.myk });
    a(s, '.rb', [{ transform: 'translateY(300px)' }, { transform: 'none' }], { d: 800, delay: 500, e: E.ut });
    a(s, '.liten', [{ opacity: 0 }, { opacity: 1 }], { d: 500, delay: 900 });
    lockStd(l, 1400, 'tone');
  } });
};
