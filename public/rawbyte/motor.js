/* Rawbyte-ikonprøveboka · felles motor
   Hvert forslag: { nr, navn, scene, ide, hvorfor, anim, palett, ikon(u, o), ord:{html, stil, under}, spill(stor, lock), laster?(stor) }
   ikon() gir innholdet i en <svg viewBox="0 0 512 512">; u = unikt id-prefiks (clipPath/gradienter). */
(() => {
const R = window.RB = { forslag: [], farge: {
  gronn:'#325f4e', mork:'#1f3d32', dyp:'#15291f', krem:'#f5f0eb', sand:'#eae1da', blekk:'#1d1d1f',
  mint:'#a0d2b9', rav:'#c8833a', lys:'#5fce96' } };

let teller = 0;
R.uid = () => 'u' + (++teller).toString(36);
R.E = { ut:'cubic-bezier(.16,1,.3,1)', fjaer:'cubic-bezier(.34,1.56,.64,1)', stor:'cubic-bezier(.5,1.8,.5,.8)', inn:'cubic-bezier(.7,0,.84,0)', myk:'cubic-bezier(.65,0,.35,1)', lin:'linear' };
const redusert = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Animer alle treff på sel inne i root. o: d (varighet), delay, stagger, e (easing), it, dir, fill */
R.a = (root, sel, kf, o = {}) => {
  const els = typeof sel === 'string' ? [...root.querySelectorAll(sel)] : (Array.isArray(sel) ? sel : [sel]);
  return els.map((el, i) => el.animate(kf, {
    duration: redusert ? 1 : (o.d ?? 700),
    delay: redusert ? 0 : (o.delay ?? 0) + (typeof o.stagger === 'function' ? o.stagger(el, i) : (o.stagger ?? 0) * i),
    easing: o.e ?? R.E.ut, fill: o.fill ?? 'both', iterations: o.it ?? 1, direction: o.dir ?? 'normal', composite: o.comp ?? 'replace'
  }));
};
R.stopp = el => {
  el.getAnimations({ subtree: true }).forEach(a => a.cancel());
  [el, ...el.querySelectorAll('*')].forEach(n => { if (n._t) { n._t.forEach(t => { clearTimeout(t); clearInterval(t); cancelAnimationFrame(t); }); n._t = []; } if (n._rydd) { n._rydd(); n._rydd = null; } });
};
/* Tidtakere som ryddes av R.stopp (for animasjoner som bytter tegn o.l.) */
R.etter = (el, ms, fn) => { (el._t ||= []).push(setTimeout(fn, redusert ? 0 : ms)); };
R.hver = (el, ms, fn) => { const id = setInterval(fn, ms); (el._t ||= []).push(id); return { cancel: () => clearInterval(id) }; };

/* Bokstaver som spans. maske=true pakker hver bokstav i en .maske (for løft nedenfra). */
R.bk = (t, maske = false, cls = '') => [...t].map(c => {
  const s = `<span class="bk ${cls}">${c === ' ' ? '&nbsp;' : c}</span>`;
  return maske ? `<span class="maske">${s}</span>` : s;
}).join('');

/* Ordmerket inn. stil: loft | spre | blur | fall | sveip | skriv | tone */
R.ordInn = (lock, stil = 'loft', delay = 0) => {
  const ord = lock.querySelector('.ord'); const under = lock.querySelector('.under');
  const bk = '.ord .bk';
  if (under) R.a(lock, '.under', [{ opacity: 0, transform: 'translateY(8px)' }, { opacity: .55, transform: 'none' }], { d: 700, delay: delay + 500 });
  switch (stil) {
    case 'loft':  return R.a(lock, bk, [{ transform: 'translateY(110%)' }, { transform: 'none' }], { d: 900, delay, stagger: 45, e: R.E.ut });
    case 'spre':  return R.a(lock, '.ord', [{ letterSpacing: '.6em', opacity: 0, filter: 'blur(6px)' }, { letterSpacing: getComputedStyle(ord).letterSpacing, opacity: 1, filter: 'blur(0)' }], { d: 1200, delay, e: R.E.ut });
    case 'blur':  return R.a(lock, bk, [{ opacity: 0, filter: 'blur(14px)', transform: 'scale(1.3)' }, { opacity: 1, filter: 'blur(0)', transform: 'none' }], { d: 900, delay, stagger: 55 });
    case 'fall':  return R.a(lock, bk, [{ opacity: 0, transform: 'translateY(-70px) rotate(-14deg)' }, { opacity: 1, transform: 'none' }], { d: 800, delay, stagger: 50, e: R.E.stor });
    case 'sveip': return R.a(lock, '.ord', [{ clipPath: 'inset(-10% 100% -20% 0)' }, { clipPath: 'inset(-10% 0 -20% 0)' }], { d: 1000, delay, e: R.E.myk });
    case 'skriv': return R.a(lock, bk, [{ opacity: 0 }, { opacity: 1 }], { d: 1, delay, stagger: 70, e: 'steps(1)' });
    case 'tone':  return R.a(lock, bk, [{ opacity: 0, transform: 'translateX(-10px)' }, { opacity: 1, transform: 'none' }], { d: 700, delay, stagger: 35 });
    case 'fokus': /* Skarpstilling: hele ordet ute av fokus og for stort, trekkes skarpt */
      return R.a(lock, '.ord', [{ filter: 'blur(18px)', opacity: 0, transform: 'scale(1.12)' }, { filter: 'blur(6px)', opacity: .7, offset: .55 }, { filter: 'blur(0)', opacity: 1, transform: 'none' }], { d: 1300, delay, e: R.E.ut });
    case 'dekoder': return R.tegnBytte(lock, delay, '0123456789ABCDEF', 26, false);
    case 'tavle':   return R.tegnBytte(lock, delay, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 70, true);
    case 'piksel':  return R.pikselOrd(lock, delay);
    default: return R.ordStil?.[stil]?.(lock, delay) ?? [];
  }
};

/* Dekoder / avgangstavle: hver bokstav ruller gjennom tilfeldige tegn før den lander */
R.tegnBytte = (lock, delay, tegn, fart, vend) => {
  const bks = [...lock.querySelectorAll('.ord .bk')];
  bks.forEach(b => { b._f ??= b.textContent; b.style.opacity = '0'; });
  const stor = /[A-ZÆØÅ]/.test(bks.map(b => b._f).join('')), alfa = stor ? tegn : tegn.toLowerCase();
  R.etter(lock, delay, () => {
    const t0 = performance.now();
    const steg = () => {
      const t = performance.now() - t0; let ferdig = true;
      bks.forEach((b, i) => {
        const lander = 260 + i * (vend ? 130 : 90);
        if (t < i * 40) { ferdig = false; return; }
        b.style.opacity = '1';
        if (t < lander) {
          ferdig = false;
          const nytt = /\s/.test(b._f) ? b._f : alfa[(Math.random() * alfa.length) | 0];
          if (b.textContent !== nytt && (!vend || Math.random() < .6)) {
            b.textContent = nytt;
            if (vend) b.animate([{ transform: 'perspective(400px) rotateX(-70deg)', filter: 'brightness(.6)' }, { transform: 'none', filter: 'none' }], { duration: fart, easing: 'ease-out' });
          }
        } else if (b.textContent !== b._f) {
          b.textContent = b._f;
          b.animate(vend ? [{ transform: 'perspective(400px) rotateX(-80deg)' }, { transform: 'none' }] : [{ color: '#a0d2b9' }, { color: 'inherit' }], { duration: vend ? 220 : 400, easing: R.E.ut });
        }
      });
      if (!ferdig) (lock._t ||= []).push(requestAnimationFrame(() => setTimeout(steg, fart)));
    };
    steg();
  });
  lock._rydd = () => bks.forEach(b => { b.textContent = b._f; b.style.opacity = ''; });
  return [];
};

/* Byte-støv: ordmerket tegnes på et lerret, samples til firkanter som flyr inn fra venstre mot høyre */
R.pikselOrd = (lock, delay) => {
  const ord = lock.querySelector('.ord'); if (!ord) return [];
  ord.style.opacity = '0';
  lock._rydd = () => { ord.style.opacity = ''; lock.querySelectorAll('canvas.stov').forEach(c => c.remove()); };
  R.etter(lock, delay, async () => {
    await document.fonts.ready;
    const cs = getComputedStyle(ord), rect = ord.getBoundingClientRect();
    const pad = rect.height * .6, W = Math.ceil(rect.width + pad * 2), H = Math.ceil(rect.height + pad * 2), d = Math.min(devicePixelRatio || 1, 2);
    const c = document.createElement('canvas'); c.className = 'stov';
    c.width = W * d; c.height = H * d; Object.assign(c.style, { position: 'absolute', left: -pad + 'px', top: -pad + 'px', width: W + 'px', height: H + 'px', pointerEvents: 'none' });
    ord.parentElement.style.position = 'relative'; ord.parentElement.appendChild(c);
    const off = document.createElement('canvas'); off.width = W; off.height = H; const ox = off.getContext('2d', { willReadFrequently: true });
    ox.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`; ox.letterSpacing = cs.letterSpacing; ox.textBaseline = 'alphabetic';
    const m = ox.measureText('Hg'); const fs = parseFloat(cs.fontSize), lh = parseFloat(cs.lineHeight) || fs;
    const base = pad + (lh - (m.fontBoundingBoxAscent + m.fontBoundingBoxDescent)) / 2 + m.fontBoundingBoxAscent;
    ox.fillText(ord.textContent, pad + (ord.offsetLeft - ord.offsetLeft), base);
    const data = ox.getImageData(0, 0, W, H).data, st = Math.max(3, Math.round(fs / 18)), biter = [];
    for (let y = 0; y < H; y += st) for (let x = 0; x < W; x += st) if (data[(y * W + x) * 4 + 3] > 120)
      biter.push({ x, y, sx: x + (Math.random() - .3) * W * .9, sy: y + (Math.random() - .5) * H * 2.2, f: (x / W) * .45 + Math.random() * .12 });
    const cx = c.getContext('2d'); cx.scale(d, d); cx.fillStyle = cs.color;
    const t0 = performance.now(), varig = 1500;
    const ramme = () => {
      const t = (performance.now() - t0) / varig; cx.clearRect(0, 0, W, H);
      for (const b of biter) {
        const q = Math.min(1, Math.max(0, (t - b.f) / .45)), e = 1 - Math.pow(1 - q, 3);
        if (q <= 0) continue;
        const s = st * (.4 + .5 * e);
        cx.globalAlpha = Math.min(1, q * 2);
        cx.fillRect(b.sx + (b.x - b.sx) * e - s / 2 + st / 2, b.sy + (b.y - b.sy) * e - s / 2 + st / 2, s, s);
      }
      if (t < 1) (lock._t ||= []).push(requestAnimationFrame(ramme));
      else { ord.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 450, fill: 'forwards' }).onfinish = () => { ord.style.opacity = ''; };
        c.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 500, fill: 'forwards' }).onfinish = () => c.remove(); }
    };
    ramme();
  });
  return [];
};
R.lockIkon = (lock, delay = 0, kf) => R.a(lock, '.lock-ikon', kf || [{ opacity: 0, transform: 'scale(.6) rotate(-8deg)' }, { opacity: 1, transform: 'none' }], { d: 700, delay, e: R.E.fjaer });

/* Felles byggeklosser i 512-rommet */
R.flis = (fill, rx = 116) => `<rect class="flis t" width="512" height="512" rx="${rx}" fill="${fill}"/>`;
R.ring = (cx, cy, Ro, Ri) => `M${cx - Ro},${cy}a${Ro},${Ro} 0 1,0 ${2 * Ro},0a${Ro},${Ro} 0 1,0 ${-2 * Ro},0Z M${cx - Ri},${cy}a${Ri},${Ri} 0 1,0 ${2 * Ri},0a${Ri},${Ri} 0 1,0 ${-2 * Ri},0Z`;
/* Konstruert «b»: stamme + bolle med rom. Sentrert i flisa. */
R.B = { sx: 118, sw: 80, top: 100, bunn: 412, cx: 282, cy: 300, Ro: 112, Ri: 50 };
R.svg = (innhold, cls = '') => `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" class="${cls}">${innhold}</svg>`;

R.legg = p => R.forslag.push(p);

/* ── Bygg siden ── */
R.start = (opt = {}) => {
  R.forslag.sort((a, b) => a.nr - b.nr);
  const MAKS = opt.maks || 20;
  const liste = document.getElementById('liste'), indeks = document.getElementById('indeks');
  const ikoner = {};
  for (const p of R.forslag) {
    const nr2 = String(p.nr).padStart(2, '0');
    const statisk = (o) => R.svg(p.ikon(R.uid(), o || {}));
    ikoner[p.nr] = statisk;
    indeks.insertAdjacentHTML('beforeend', `<a href="#f${nr2}" data-nr="${p.nr}">${statisk({ liten: true })}${nr2}</a>`);
    const art = document.createElement('article');
    art.className = 'forslag'; art.id = 'f' + nr2;
    art.innerHTML = `
      <div class="scene ${p.scene || 'mork'}">
        <span class="nr">${nr2} / ${MAKS}${p.av ? ` · videre fra ${p.av}` : ''}</span>
        <div class="knapper">
          <button class="spill" title="Spill av"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M13.5 8a5.5 5.5 0 1 1-1.6-3.9M13.5 2.5v3h-3"/></svg>Spill av</button>
          ${p.laster ? `<button class="laster" aria-pressed="false" title="Laster-løkke"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M8 2a6 6 0 1 0 6 6"/></svg>Laster</button>` : ''}
        </div>
        <div class="stor-wrap"><div class="stor" title="Klikk for å spille av">${R.svg(p.ikon(R.uid(), {}))}</div></div>
        <div class="lock">
          <div class="lock-ikon">${statisk({ liten: true })}</div>
          <div><div class="ord ${p.ord.klasse || 'meno'}" style="${p.ord.css || ''}">${p.ord.html}</div>${p.ord.under ? `<span class="under">${p.ord.under}</span>` : ''}${R.endoHtml ? R.endoHtml(p) : ''}</div>
        </div>
      </div>
      <div class="info">
        <div class="tekst">
          <h2><small>${nr2}</small>${p.navn}</h2>
          <dl><dt>Idé</dt><dd>${p.ide}</dd><dt>Hvorfor</dt><dd>${p.hvorfor}</dd><dt>Bevegelse</dt><dd>${p.anim}</dd></dl>
        </div>
        <div class="storrelser">
          <div class="rad m">${statisk({ liten: true }).replace('<svg', '<svg width="48" height="48"')}${statisk({ liten: true }).replace('<svg', '<svg width="32" height="32"')}${statisk({ liten: true }).replace('<svg', '<svg width="24" height="24"')}${statisk({ liten: true, mikro: true }).replace('<svg', '<svg width="16" height="16"')}<span>48 · 32 · 24 · 16</span></div>
          <div class="rad l">${statisk({ liten: true }).replace('<svg', '<svg width="48" height="48"')}${statisk({ liten: true }).replace('<svg', '<svg width="32" height="32"')}${statisk({ liten: true }).replace('<svg', '<svg width="24" height="24"')}${statisk({ liten: true, mikro: true }).replace('<svg', '<svg width="16" height="16"')}<span>lys</span></div>
          <div class="fane">${statisk({ liten: true, mikro: true })}Rawbyte · Skapet</div>
          <div style="display:flex;align-items:center;justify-content:space-between;gap:10px">
            <div class="palett">${(p.palett || []).map(c => `<i style="background:${c}" title="${c}"></i>`).join('')}</div>
            <button class="lastned">Last ned SVG</button>
          </div>
        </div>
      </div>`;
    liste.appendChild(art);

    const scene = art.querySelector('.scene'), stor = art.querySelector('.stor svg'), lock = art.querySelector('.lock');
    let lasterAnim = null;
    /* Pikselikonene har en sammenslått «hel»-sti under pikslene; den skjules mens pikslene beveger seg */
    const helSkjul = (rot, uendelig) => { if (!rot.querySelector('.hel')) return null;
      if (uendelig) return R.a(rot, '.hel', [{ opacity: 0 }, { opacity: 0 }], { d: 1000, it: Infinity, fill: 'none' });
      const slutt = Math.max(0, ...rot.getAnimations({ subtree: true }).map(x => x.effect.getComputedTiming().endTime).filter(Number.isFinite));
      return slutt ? R.a(rot, '.hel', [{ opacity: 0 }, { opacity: 0 }], { d: slutt, fill: 'none' }) : null; };
    const stoppLaster = () => { if (lasterAnim) { lasterAnim.flat().forEach(a => a.cancel()); lasterAnim = null; const b = art.querySelector('.laster'); if (b) b.setAttribute('aria-pressed', 'false'); } };
    const spill = () => { stoppLaster(); R.stopp(scene); try { p.spill(stor, lock); } catch (e) { console.error(p.nr, e); }
      helSkjul(stor); const ordEl = lock.querySelector('.ord'); if (ordEl) helSkjul(ordEl);
      if (R.endoHtml) R.a(lock, '.endo', [{ opacity: 0, transform: 'translateY(8px)', filter: 'blur(6px)' }, { opacity: 1, transform: 'none', filter: 'blur(0)' }], { d: 800, delay: p.endoDelay ?? 2300 }); };
    art.querySelector('.spill').onclick = spill;
    art.querySelector('.stor').onclick = spill;
    const lb = art.querySelector('.laster');
    if (lb) lb.onclick = () => {
      if (lasterAnim) return stoppLaster();
      R.stopp(scene); lb.setAttribute('aria-pressed', 'true'); lasterAnim = p.laster(stor) || []; const h = helSkjul(stor, true); if (h) lasterAnim.push(h);
    };
    art.querySelector('.lastned').onclick = () => {
      const s = R.svg(`<style>@import url(https://use.typekit.net/sbv2wli.css);</style>` + p.ikon(R.uid(), {}));
      const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([s], { type: 'image/svg+xml' }));
      a.download = `rawbyte-ikon-${nr2}.svg`; a.click();
    };
    art._spill = spill; art._ute = true;
  }

  /* Spill av når forslaget rulles inn (igjen) */
  const io = new IntersectionObserver(ent => ent.forEach(e => {
    const art = e.target.closest('.forslag');
    if (e.isIntersecting && e.intersectionRatio >= .5 && art._ute) { art._ute = false; art._spill(); }
    else if (!e.isIntersecting) art._ute = true;
  }), { threshold: [0, .5] });
  document.querySelectorAll('.forslag .scene').forEach(s => io.observe(s));

  /* Aktiv i indeksen */
  const io2 = new IntersectionObserver(ent => ent.forEach(e => {
    if (!e.isIntersecting) return;
    const nr = +e.target.id.slice(1);
    indeks.querySelectorAll('a').forEach(a => a.classList.toggle('aktiv', +a.dataset.nr === nr));
  }), { rootMargin: '-45% 0px -45% 0px' });
  document.querySelectorAll('.forslag').forEach(f => io2.observe(f));

  /* Oppgavelinja */
  const bar = (el, str) => {
    const pad = Math.round(str * .45);
    el.innerHTML = `<a class="slot gammel" href="#" style="width:${str + pad * 2}px;height:${str + pad * 2}px" title="Dagens ikon"><img src="gammel.png" width="${str}" height="${str}" alt=""><b>nå</b></a>` +
      R.forslag.map(p => `<a class="slot" href="#f${String(p.nr).padStart(2, '0')}" style="width:${str + pad * 2}px;height:${str + pad * 2}px" title="${p.nr} · ${p.navn}">${ikoner[p.nr]({ liten: true, mikro: str <= 16 }).replace('<svg', `<svg width="${str}" height="${str}"`)}<b>${p.nr}</b></a>`).join('');
  };
  const settStr = str => { bar(document.getElementById('barMork'), str); bar(document.getElementById('barLys'), str); document.querySelectorAll('.str-velg button').forEach(b => b.setAttribute('aria-pressed', String(+b.dataset.str === str))); };
  document.querySelectorAll('.str-velg button').forEach(b => b.onclick = () => settStr(+b.dataset.str));
  settStr(24);

  /* Hero: alle tjue som et svevende felt */
  const hb = document.getElementById('heroBilde');
  let h = '';
  R.forslag.forEach((p, i) => {
    const kol = i % 7, rad = Math.floor(i / 7);
    const x = 70 + kol * 230 + (rad % 2) * 115, y = 60 + rad * 290;
    h += `<g class="svev" style="--d:${(i * 0.37) % 4}s" opacity=".13"><svg x="${x}" y="${y}" width="170" height="170" viewBox="0 0 512 512">${p.ikon(R.uid(), { liten: true })}</svg></g>`;
  });
  hb.innerHTML = `<style>.svev{animation:svev 9s ease-in-out infinite alternate;animation-delay:calc(var(--d) * -1)}@keyframes svev{to{transform:translateY(-26px)}}</style><g transform="rotate(-8 800 450)">${h}</g>`;
};
})();
