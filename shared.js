/* ============================================================
   SHARED JS — cursor, nav scroll, reveal
   ============================================================ */

(function () {
  // ── Custom Cursor ──
  const cursor = document.getElementById('cursor');
  const ring   = document.getElementById('cursorRing');
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  function animateCursor() {
    if (cursor) { cursor.style.left = mx + 'px'; cursor.style.top = my + 'px'; }
    rx += (mx - rx) * 0.13; ry += (my - ry) * 0.13;
    if (ring) { ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; }
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  document.querySelectorAll('a, button, .service-card, .project-card, .project-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
      if (cursor) { cursor.style.width = '16px'; cursor.style.height = '16px'; }
      if (ring)   { ring.style.width = '46px'; ring.style.height = '46px'; ring.style.opacity = '0.2'; }
    });
    el.addEventListener('mouseleave', () => {
      if (cursor) { cursor.style.width = '9px'; cursor.style.height = '9px'; }
      if (ring)   { ring.style.width = '32px'; ring.style.height = '32px'; ring.style.opacity = '1'; }
    });
  });

  // ── Scroll Reveal ──
  const revealEls = document.querySelectorAll('.reveal');
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.08 });
  revealEls.forEach(r => revealObs.observe(r));

  // ── Nav active link ──
  const navLinks = document.querySelectorAll('.nav-links a');
  const page = window.location.pathname;
  navLinks.forEach(a => {
    if (a.getAttribute('href') === page || (page === '/' && a.getAttribute('href') === '/')) {
      a.classList.add('active');
    }
  });
})();
