/* ═══════════════════════════════════════════════════════════════
   ORIGINAL CODE — fully preserved, zero changes
═══════════════════════════════════════════════════════════════ */

// Dark/Light Mode Toggle
const themeSwitch = document.getElementById('theme-switch');
const body = document.body;

const currentTheme = sessionStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    themeSwitch.checked = true;
}

themeSwitch.addEventListener('change', function () {
    if (this.checked) {
        body.classList.add('dark-mode');
        sessionStorage.setItem('theme', 'dark');
    } else {
        body.classList.remove('dark-mode');
        sessionStorage.setItem('theme', 'light');
    }
});

// Typing Animation
const heroTitle = document.getElementById('hero-title');

const textList = [
    "BUVANESWARAN E",
    "ASPIRING SOFTWARE DEVELOPER",
    "THIRD YEAR ENGINEERING STUDENT",
    "PROBLEM SOLVER",
    "DSA ENTHUSIAST",
    "JAVA PROGRAMMER",
    "PYTHON DEVELOPER",
    "C PROGRAMMING BASICS",
    "LOGIC DRIVEN CODER",
    "PASSIONATE LEARNER",
    "MICROSOFT CERTIFIED",
    "BACKEND DEVELOPMENT INTEREST",
    "SQL & POSTGRESQL USER",
    "GIT & VERSION CONTROL",
    "BUILDING SKILLS EVERY DAY"
];

let currentIndex      = 0;
const charTypingSpeed   = 40;
const displayTime       = 3500;
const delayBetweenWords = 800;

function typeWriter() {
    const currentText = textList[currentIndex];
    heroTitle.textContent = '';
    let charIndex = 0;
    const typingInterval = setInterval(() => {
        if (charIndex < currentText.length) {
            heroTitle.textContent += currentText[charIndex];
            charIndex++;
        } else {
            clearInterval(typingInterval);
            setTimeout(deleteText, displayTime);
        }
    }, charTypingSpeed);
}

function deleteText() {
    let textLength = heroTitle.textContent.length;
    const deletingInterval = setInterval(() => {
        if (textLength > 0) {
            heroTitle.textContent = heroTitle.textContent.substring(0, textLength - 1);
            textLength--;
        } else {
            clearInterval(deletingInterval);
            currentIndex = (currentIndex + 1) % textList.length;
            setTimeout(typeWriter, delayBetweenWords);
        }
    }, charTypingSpeed);
}

window.addEventListener('load', () => { setTimeout(typeWriter, 1000); });

// Scroll Progress Bar
window.addEventListener('scroll', () => {
    const bar        = document.querySelector('.scroll-progress');
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    if (bar) bar.style.width = (window.pageYOffset / scrollable * 100) + '%';
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Parallax on bg-mark
window.addEventListener('scroll', () => {
    const bgMark = document.querySelector('.bg-mark');
    if (bgMark) {
        bgMark.style.transform =
            `translate(-50%, calc(-50% + ${window.pageYOffset * 0.2}px))`;
    }
});

// Smooth Scroll for nav links (original logic)
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            const target = document.querySelector(href);
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Click ripple
document.addEventListener('click', (e) => {
    const ripple = document.createElement('div');
    Object.assign(ripple.style, {
        position: 'fixed', width: '20px', height: '20px',
        borderRadius: '50%', background: 'rgba(252,68,15,0.3)',
        left: (e.clientX - 10) + 'px', top: (e.clientY - 10) + 'px',
        pointerEvents: 'none', animation: 'rippleEffect 0.6s ease-out', zIndex: '9999'
    });
    document.body.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
});
const _rStyle = document.createElement('style');
_rStyle.textContent = `@keyframes rippleEffect{0%{transform:scale(1);opacity:1}100%{transform:scale(20);opacity:0}}`;
document.head.appendChild(_rStyle);

// IntersectionObserver for original elements
const _observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity   = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.project-card, .stamp, .location')
            .forEach(el => _observer.observe(el));
});


/* ═══════════════════════════════════════════════════════════════
   HAMBURGER — RIGHT-SIDE DRAWER + OVERLAY
   Replaces the old simple toggle.
   ─ Creates .nav-mob-overlay scrim on first open.
   ─ Body scroll locked while drawer is open.
   ─ Closed by: hamburger click, scrim click, nav-link click, Esc key.
═══════════════════════════════════════════════════════════════ */
(function initHamburger() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu   = document.querySelector('.nav-menu');
    if (!hamburger || !navMenu) return;

    /* Create scrim element once */
    let overlay = null;
    function getOverlay() {
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'nav-mob-overlay';
            document.body.appendChild(overlay);
            overlay.addEventListener('click', closeMenu);
        }
        return overlay;
    }

    function openMenu() {
        navMenu.classList.add('active');
        hamburger.classList.add('active');
        hamburger.setAttribute('aria-expanded', 'true');
        const scrim = getOverlay();
        /* Force reflow so transition fires */
        scrim.offsetHeight; // eslint-disable-line
        scrim.classList.add('visible');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        if (overlay) overlay.classList.remove('visible');
        document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', () => {
        navMenu.classList.contains('active') ? closeMenu() : openMenu();
    });

    /* Close on any nav-link click (page nav or external) */
    navMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    /* Close on Escape */
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeMenu();
    });

    /* Auto-close if resized to desktop */
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) closeMenu();
    });
}());


/* ═══════════════════════════════════════════════════════════════
   MOBILE LOCATION REPOSITION
   On ≤ 768px: moves the .location element from inside .hero-container
   to just after .stack-section, so it appears below the project cards.
   Adds class .stack-location-el for CSS targeting.
═══════════════════════════════════════════════════════════════ */
(function initMobileLocation() {
    if (window.innerWidth > 768) return;

    const locationEl    = document.querySelector('.location');
    const stackSection  = document.querySelector('.stack-section');
    if (!locationEl || !stackSection) return;

    /* Reset any keyframe animation that set opacity to 0 */
    locationEl.style.animation = 'none';
    locationEl.style.opacity   = '1';

    /* Add class so CSS can restyle it */
    locationEl.classList.add('stack-location-el');

    /* Move it after the stack section in the DOM */
    stackSection.insertAdjacentElement('afterend', locationEl);
}());


/* ═══════════════════════════════════════════════════════════════
   HORIZONTAL LOOPING PROJECT CAROUSEL
   Touch swipe ←→ · mouse wheel · dot clicks · keyboard arrows.
   Auto-advances every 3 s; pauses on user interaction then resumes.
   Loops infinitely in both directions.
   Self-contained IIFE — no global variable pollution.
═══════════════════════════════════════════════════════════════ */
(function initStackCards() {
    'use strict';

    const wrapper   = document.getElementById('stackWrapper');
    if (!wrapper) return;

    const cards     = Array.from(wrapper.querySelectorAll('.stack-card'));
    const dots      = Array.from(document.querySelectorAll('.stack-dot'));
    const hint      = document.getElementById('stackHint');
    const counterEl = document.getElementById('stackCurrent');

    const TOTAL        = cards.length;
    const AUTO_DELAY   = 4000;   // ms between auto-advances
    const RESUME_DELAY = 8000;   // ms after user interaction before resuming

    let active      = 0;
    let busy        = false;
    let autoTimer   = null;
    let resumeTimer = null;

    let touchStartX = 0;
    let touchStartT = 0;
    let wheelAccum  = 0;
    let wheelTimer  = null;

    /* ── Auto-play ─────────────────────────────────────────── */
    function startAuto() {
        clearInterval(autoTimer);
        autoTimer = setInterval(() => go(active + 1, 1), AUTO_DELAY);
    }

    /* Called on every manual interaction — pause, then resume */
    function resetAuto() {
        clearInterval(autoTimer);
        clearTimeout(resumeTimer);
        resumeTimer = setTimeout(startAuto, RESUME_DELAY);
    }

    /* Remove all state classes from every card */
    function clearAll() {
        cards.forEach(c => {
            c.classList.remove(
                'is-active',
                'is-entering-right', 'is-entering-left',
                'is-exiting-left',   'is-exiting-right'
            );
        });
    }

    /* Show card at index idx; dir > 0 = swiping left (next), dir < 0 = swiping right (prev) */
    function go(idx, dir) {
        if (busy) return;
        if (idx === active) return;
        busy = true;

        const prevIdx = active;
        active = ((idx % TOTAL) + TOTAL) % TOTAL;   // wrap

        const prev = cards[prevIdx];
        const next = cards[active];

        /* 1. Position incoming card off-screen instantly (no transition) */
        next.style.transition = 'none';
        next.classList.remove('is-active', 'is-exiting-left', 'is-exiting-right');
        next.classList.add(dir > 0 ? 'is-entering-right' : 'is-entering-left');
        next.style.opacity = '0';

        /* Force reflow */
        next.getBoundingClientRect();

        /* 2. Re-enable transitions */
        next.style.transition = '';
        next.style.opacity    = '';

        /* 3. Animate outgoing card */
        prev.classList.remove('is-active');
        prev.classList.add(dir > 0 ? 'is-exiting-left' : 'is-exiting-right');

        /* 4. Animate incoming card to active */
        next.classList.remove('is-entering-right', 'is-entering-left');
        next.classList.add('is-active');

        /* 5. Update dots + counter */
        dots.forEach((d, i) => d.classList.toggle('active', i === active));
        if (counterEl) counterEl.textContent = String(active + 1).padStart(2, '0');
        if (hint) hint.classList.add('hidden');

        /* 6. Clean up after transition */
        setTimeout(() => {
            prev.classList.remove('is-exiting-left', 'is-exiting-right');
            busy = false;
        }, 520);
    }

    /* Touch */
    wrapper.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartT = Date.now();
        resetAuto();
    }, { passive: true });

    wrapper.addEventListener('touchend', (e) => {
        const dx = touchStartX - e.changedTouches[0].clientX;
        const dt = Date.now() - touchStartT;
        if (Math.abs(dx) >= 40 && dt < 400) {
            go(active + (dx > 0 ? 1 : -1), dx > 0 ? 1 : -1);
        }
    }, { passive: true });

    /* Mouse wheel (horizontal or vertical delta) */
    wrapper.addEventListener('wheel', (e) => {
        e.preventDefault();
        resetAuto();
        const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
        wheelAccum += delta;
        clearTimeout(wheelTimer);
        wheelTimer = setTimeout(() => {
            if (Math.abs(wheelAccum) > 25) {
                const dir = wheelAccum > 0 ? 1 : -1;
                go(active + dir, dir);
            }
            wheelAccum = 0;
        }, 70);
    }, { passive: false });

    /* Dot clicks */
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            resetAuto();
            if (i !== active) go(i, i > active ? 1 : -1);
        });
    });

    /* Keyboard */
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { resetAuto(); go(active + 1,  1); }
        if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   { resetAuto(); go(active - 1, -1); }
    });

    /* Pause auto when user's finger is on the card */
    wrapper.addEventListener('touchstart', resetAuto, { passive: true });

    /* Init — show first card, then start auto-play */
    clearAll();
    cards[0].classList.add('is-active');
    if (dots[0]) dots[0].classList.add('active');
    startAuto();

}());