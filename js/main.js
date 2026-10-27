// Pretty Woman · «Satén»: pliegues de seda rosa generados en un canvas pequeño y escalados (el cursor los ondula),
// la caligrafía se escribe al cargar y la cita se arma como un mensaje de WhatsApp
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const L = () => document.documentElement.lang;
  const T = (es, ca, en) => (L() === 'ca' ? ca : L() === 'en' ? en : es);
  const WA = 'https://wa.me/34605448431?text=';

  function satin() {
    const cv = document.getElementById('satin'), g = cv.getContext('2d'), hero = document.getElementById('hero');
    const sw = 160, sh = 100, off = document.createElement('canvas'); off.width = sw; off.height = sh;
    const og = off.getContext('2d'), img = og.createImageData(sw, sh), p = img.data;
    let W, H, vis = true, mx = .5, my = .5, tx = .5, ty = .5;
    const size = () => { const r = cv.getBoundingClientRect(); W = cv.width = Math.round(r.width); H = cv.height = Math.round(r.height); };
    size(); new ResizeObserver(size).observe(cv);
    new IntersectionObserver(([e]) => (vis = e.isIntersecting)).observe(cv);
    hero.addEventListener('pointermove', (e) => { const r = hero.getBoundingClientRect(); tx = (e.clientX - r.left) / r.width; ty = (e.clientY - r.top) / r.height; });
    const A = [246, 228, 227], B = [233, 184, 189], C = [255, 250, 248], D = [196, 140, 156];
    const frame = (t) => {
      t *= .00035; mx += (tx - mx) * .04; my += (ty - my) * .04;
      for (let y = 0, i = 0; y < sh; y++) for (let x = 0; x < sw; x++, i += 4) {
        const u = x / sw, v = y / sh, dx = u - mx, dy = v - my, bump = Math.exp(-(dx * dx + dy * dy) * 18) * 1.4;
        const f = Math.sin(u * 7 + t * 3 + Math.sin(v * 4 + t * 2) * 2.2 + bump) * .6 + Math.sin(v * 9 - t * 2.4 + u * 3) * .4;
        const s = .5 + .5 * f, hi = Math.max(0, s - .82) * 5.5, lo = Math.max(0, .25 - s) * 3;
        for (let k = 0; k < 3; k++) p[i + k] = (B[k] + (A[k] - B[k]) * s) * (1 - hi) + C[k] * hi - (A[k] - D[k]) * lo;
        p[i + 3] = 255;
      }
      og.putImageData(img, 0, 0); g.imageSmoothingQuality = 'high'; g.drawImage(off, 0, 0, W, H);
    };
    if (reduce) { frame(0); return; }
    const loop = (t) => { if (vis) frame(t); requestAnimationFrame(loop); };
    requestAnimationFrame(loop);
  }

  function intro() {
    if (reduce || typeof gsap === 'undefined') return;
    gsap.fromTo('.script', { clipPath: 'inset(0 100% 0 0)', filter: 'blur(6px)' }, { clipPath: 'inset(0 0% 0 0)', filter: 'blur(0px)', duration: 1.8, ease: 'power2.inOut', delay: .1, clearProps: 'filter' });
    gsap.fromTo('.card', { y: 120, opacity: 0, rotate: 0 }, { y: 0, opacity: 1, rotate: (i) => [-8, 7, -4][i], duration: 1.6, ease: 'expo.out', stagger: .12, delay: .35 });
    gsap.utils.toArray('.card').forEach((c, i) => gsap.to(c, { y: i % 2 ? -18 : 16, duration: 3 + i, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 2 }));
    gsap.to('.hero-in', { yPercent: -14, opacity: .3, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
  }

  // ---------- la cita en tres toques ----------
  const SVC = [['Manicura', 'Manicura', 'Manicure'], ['Diseño de uñas', 'Disseny d’ungles', 'Nail art'], ['Pedicura', 'Pedicura', 'Pedicure'], ['Pestañas', 'Pestanyes', 'Lashes'], ['Cejas con hilo', 'Celles amb fil', 'Brow threading'], ['Maquillaje', 'Maquillatge', 'Make-up'], ['Facial', 'Facial', 'Facial'], ['Presoterapia', 'Pressoteràpia', 'Pressotherapy'], ['Láser', 'Làser', 'Laser']];
  const WHEN = [['Por la mañana', 'Al matí', 'In the morning'], ['Por la tarde', 'A la tarda', 'In the afternoon'], ['Me da igual', 'M’és igual', 'Any time']];
  const pick = { s: new Set(), w: 2 };
  function cita() {
    const chips = document.getElementById('chips'), when = document.getElementById('when'), prev = document.getElementById('preview'), send = document.getElementById('send');
    const li = () => ({ es: 0, ca: 1, en: 2 }[L()] || 0);
    const render = () => {
      chips.innerHTML = SVC.map((s, i) => `<button type="button" data-i="${i}" aria-pressed="${pick.s.has(i)}">${s[li()]}</button>`).join('');
      when.innerHTML = WHEN.map((w, i) => `<button type="button" data-i="${i}" aria-pressed="${pick.w === i}">${w[li()]}</button>`).join('');
      const list = [...pick.s].map((i) => SVC[i][li()].toLowerCase());
      const what = list.length ? list.join(', ') : T('un tratamiento', 'un tractament', 'a treatment');
      const msg = T(`Hola Diana, me gustaría pedir cita para ${what}. ${pick.w < 2 ? 'Me va mejor ' + WHEN[pick.w][0].toLowerCase() + '.' : 'Tengo horario flexible.'} ¡Gracias!`,
        `Hola Diana, voldria demanar hora per a ${what}. ${pick.w < 2 ? 'Em va millor ' + WHEN[pick.w][1].toLowerCase() + '.' : 'Tinc horari flexible.'} Gràcies!`,
        `Hi Diana, I would like to book ${what}. ${pick.w < 2 ? 'I prefer ' + WHEN[pick.w][2].toLowerCase() + '.' : 'My schedule is flexible.'} Thank you!`);
      prev.textContent = msg; send.href = WA + encodeURIComponent(msg);
      document.querySelectorAll('a.wa').forEach((a) => (a.href = WA + encodeURIComponent(T('Hola Diana, me gustaría pedir cita.', 'Hola Diana, voldria demanar hora.', 'Hi Diana, I would like to book an appointment.'))));
    };
    chips.addEventListener('click', (e) => { const b = e.target.closest('button'); if (!b) return; const i = +b.dataset.i; pick.s.has(i) ? pick.s.delete(i) : pick.s.add(i); render(); });
    when.addEventListener('click', (e) => { const b = e.target.closest('button'); if (!b) return; pick.w = +b.dataset.i; render(); });
    document.getElementById('citaForm').addEventListener('submit', (e) => e.preventDefault());
    document.addEventListener('langchange', render); render();
  }

  function init() { satin(); intro(); cita(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
