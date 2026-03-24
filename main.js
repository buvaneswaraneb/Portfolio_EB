// Dark/Light Mode Toggle
const themeSwitch = document.getElementById('theme-switch');
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = sessionStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    themeSwitch.checked = true;
}

themeSwitch.addEventListener('change', function() {
    if (this.checked) {
        body.classList.add('dark-mode');
        sessionStorage.setItem('theme', 'dark');
    } else {
        body.classList.remove('dark-mode');
        sessionStorage.setItem('theme', 'light');
    }
});

// Smooth Typing Animation for Hero Title
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

let currentIndex = 0;
const charTypingSpeed = 40; // Speed per character (ms)
const displayTime = 3500; // Time to display full text (ms)
const delayBetweenWords = 800; // Delay between word transitions (ms)

function typeWriter() {
    const currentText = textList[currentIndex];
    heroTitle.textContent = '';
    
    // Typing phase
    let charIndex = 0;
    const typingInterval = setInterval(() => {
        if (charIndex < currentText.length) {
            heroTitle.textContent += currentText[charIndex];
            charIndex++;
        } else {
            clearInterval(typingInterval);
            
            // After displaying full text, delete it
            setTimeout(() => {
                deleteText();
            }, displayTime);
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
            
            // Move to next text
            currentIndex = (currentIndex + 1) % textList.length;
            
            // Smooth delay before next word
            setTimeout(() => {
                typeWriter();
            }, delayBetweenWords);
        }
    }, charTypingSpeed);
}

window.addEventListener('load', () => {
    setTimeout(typeWriter, 1000);
});

// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navOverlay = document.querySelector('.nav-overlay');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        navOverlay?.classList.toggle('visible');
    });
}

// Close menu when clicking overlay
if (navOverlay) {
    navOverlay.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        navOverlay.classList.remove('visible');
    });
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Only prevent default for hash links
        if (href && href.startsWith('#')) {
            e.preventDefault();
            
            // Remove active class from all links
            document.querySelectorAll('.nav-link').forEach(l => {
                l.classList.remove('active');
            });
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Close mobile menu if open
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            navOverlay?.classList.remove('visible');
            
            // Smooth scroll to section
            const targetSection = document.querySelector(href);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        } else {
            // For external links, just close the mobile menu
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            navOverlay?.classList.remove('visible');
        }
    });
});

// Scroll Progress Bar
window.addEventListener('scroll', () => {
    const scrollProgress = document.querySelector('.scroll-progress');
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.pageYOffset / scrollableHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Parallax Effect for Background Mark
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const bgMark = document.querySelector('.bg-mark');
    
    if (bgMark) {
        const speed = 0.2;
        bgMark.style.transform = `translate(-50%, calc(-50% + ${scrolled * speed}px))`;
    }
});

// Project Card Hover Effect
const projectCard = document.querySelector('.project-card');
if (projectCard) {
    projectCard.addEventListener('mouseenter', () => {
        projectCard.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    });
    
    projectCard.addEventListener('mouseleave', () => {
        projectCard.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    });
}

// Add ripple effect on click
document.addEventListener('click', (e) => {
    const ripple = document.createElement('div');
    ripple.style.position = 'fixed';
    ripple.style.width = '20px';
    ripple.style.height = '20px';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(252, 68, 15, 0.3)';
    ripple.style.left = e.clientX - 10 + 'px';
    ripple.style.top = e.clientY - 10 + 'px';
    ripple.style.pointerEvents = 'none';
    ripple.style.animation = 'rippleEffect 0.6s ease-out';
    ripple.style.zIndex = '9999';
    
    document.body.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
});

// Add ripple animation to CSS via JavaScript
const style = document.createElement('style');
style.textContent = `
    @keyframes rippleEffect {
        0% {
            transform: scale(1);
            opacity: 1;
        }
        100% {
            transform: scale(20);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe animated elements
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.project-card, .stamp, .location');
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
});