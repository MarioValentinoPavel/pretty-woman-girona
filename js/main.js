// Pretty Woman · «Maison»: dos reels de Diana se destapan sobre ciruela (el retrato y, encima, el círculo con las uñas),
// la caligrafía de la marca se escribe detrás y la cita se arma como un mensaje de WhatsApp
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const L = () => document.documentElement.lang;
  const T = (es, ca, en) => (L() === 'ca' ? ca : L() === 'en' ? en : es);
  const WA = 'https://wa.me/34605448431?text=';

  function intro() {
    if (reduce || typeof gsap === 'undefined') return;
    gsap.fromTo('.script', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 2.4, ease: 'power2.inOut', delay: .1 });
    gsap.fromTo('#v1', { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.6, ease: 'expo.inOut', delay: .15 });
    gsap.fromTo('#v1 video', { scale: 1.3 }, { scale: 1, duration: 2.4, ease: 'expo.out', delay: .15 });
    gsap.fromTo('#v2', { scale: 0, rotate: -30 }, { scale: 1, rotate: 0, duration: 1.4, ease: 'expo.out', delay: .9 });
    gsap.to('#v2', { yPercent: -40, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
    gsap.to('.script', { xPercent: -12, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
    if (fine) {
      const x = gsap.quickTo('#v2', 'x', { duration: 1.2, ease: 'power3.out' }), y = gsap.quickTo('#v2', 'y', { duration: 1.2, ease: 'power3.out' });
      document.getElementById('hero').addEventListener('pointermove', (e) => { x(((e.clientX / innerWidth) - .5) * -40); y(((e.clientY / innerHeight) - .5) * -30); });
    }
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

  function init() { intro(); cita(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
