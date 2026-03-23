/* ─────────────────────────────────────────────
   portfolio projects — script.js
   • IntersectionObserver scroll reveal
   • Subtle parallax on background watermark
   • Mobile hamburger drawer
───────────────────────────────────────────── */
(function () {
  'use strict';

  /* ── 1. SCROLL REVEAL ───────────────────── */
  const cards = document.querySelectorAll('.project-card');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const idx = parseInt(entry.target.dataset.index || '0', 10);
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, idx * 90);
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.10, rootMargin: '0px 0px -50px 0px' }
  );

  cards.forEach((card) => revealObserver.observe(card));


  /* ── 2. PARALLAX WATERMARK ──────────────── */
  const bgText = document.querySelector('.bg-text');
  let ticking  = false;

  if (bgText) {
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const drift = window.scrollY * 0.16;
          bgText.style.transform =
            `translate(-50%, calc(-50% + ${drift}px))`;
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }


  /* ── 3. HAMBURGER MENU ──────────────────── */
  const toggle  = document.querySelector('.nav-toggle');
  const navList = document.querySelector('.nav-links');
  const overlay = document.querySelector('.nav-overlay');

  function openMenu() {
    navList.classList.add('open');
    overlay.classList.add('visible');
    toggle.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    navList.classList.remove('open');
    overlay.classList.remove('visible');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (toggle && navList && overlay) {
    toggle.addEventListener('click', () => {
      const isOpen = navList.classList.contains('open');
      isOpen ? closeMenu() : openMenu();
    });

    // Close when tapping overlay
    overlay.addEventListener('click', closeMenu);

    // Close when a nav link is clicked
    navList.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });

    // Close drawer when resized to desktop width
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) closeMenu();
    });
  }

})();
