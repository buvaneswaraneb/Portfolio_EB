/* ─────────────────────────────────────────
   portfolio projects — script.js
   Scroll reveal (IntersectionObserver)
   + subtle parallax on background text
───────────────────────────────────────── */

(function () {
  'use strict';

  /* ── 1. SCROLL REVEAL ─────────────────── */
  const cards = document.querySelectorAll('.project-card');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Stagger slightly per card index
          const idx = parseInt(entry.target.dataset.index || '0', 10);
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, idx * 80);

          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -60px 0px',
    }
  );

  cards.forEach((card) => revealObserver.observe(card));

  /* ── 2. PARALLAX ON BACKGROUND TEXT ─── */
  const bgText = document.querySelector('.bg-text');

  if (bgText) {
    let ticking = false;

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          // Slow drift: moves at 20% of scroll speed
          const offset = scrollY * 0.18;
          bgText.style.transform =
            `translate(-50%, calc(-50% + ${offset}px))`;
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ── 3. NAVBAR ACTIVE STATE ──────────── */
  // Re-highlight active link based on current pathname
  const navLinks = document.querySelectorAll('.nav-links a');
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  navLinks.forEach((link) => {
    const href = link.getAttribute('href') || '';
    if (href && currentPath.includes(href.replace(/^\.\//, ''))) {
      link.classList.add('nav-active');
    }
  });

})();
