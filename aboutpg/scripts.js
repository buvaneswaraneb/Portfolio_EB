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

// Smooth Typing Animation for {INFO}
const typingText = document.querySelector('.typing-text');
const words = ['I', 'IN', 'INF', 'INFO'];
let wordIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentWord = words[wordIndex];
    
    if (!isDeleting) {
        // Typing forward
        typingText.textContent = currentWord;
        
        if (wordIndex === words.length - 1) {
            // Pause at full word
            isDeleting = true;
            setTimeout(typeEffect, 2000);
        } else {
            wordIndex++;
            setTimeout(typeEffect, 300);
        }
    } else {
        // Deleting backward
        if (wordIndex > 0) {
            wordIndex--;
            typingText.textContent = words[wordIndex];
            setTimeout(typeEffect, 200);
        } else {
            // Start typing again
            isDeleting = false;
            setTimeout(typeEffect, 500);
        }
    }
}

// Start typing animation after page load
window.addEventListener('load', () => {
    setTimeout(typeEffect, 1000);
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        const linkText = this.textContent.trim();
        const href = this.getAttribute('href');
        console.log(`Clicked: ${linkText}`);
        
        // If it's an external link or cross-page link, redirect
        if (href && !href.startsWith('#')) {
            e.preventDefault();
            console.log(`Redirecting to: ${href}`);
            window.location.href = href;
            return;
        }
        
        e.preventDefault();
        
        // Remove active class from all links
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        
        // Add active class to clicked link
        this.classList.add('active');
        
        // Close mobile menu if open
        document.querySelector('.nav-menu').classList.remove('active');
        document.querySelector('.hamburger').classList.remove('active');
        
        // Smooth scroll to section
        const targetId = this.getAttribute('href');
        if (targetId.startsWith('#')) {
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navOverlay = document.querySelector('.nav-overlay');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    navOverlay?.classList.toggle('visible');
});

// Close menu when clicking overlay
if (navOverlay) {
    navOverlay.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        navOverlay.classList.remove('visible');
    });
}

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

// Parallax Effect for Background Text
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const bgText = document.querySelector('.bg-text');
    
    if (bgText) {
        const speed = 0.3;
        bgText.style.transform = `translate(-50%, calc(-50% + ${scrolled * speed}px))`;
    }
});

// Magnetic Effect on Social Links
document.querySelectorAll('.magnetic').forEach(element => {
    element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        element.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    
    element.addEventListener('mouseleave', () => {
        element.style.transform = 'translate(0, 0)';
    });
});

// Smooth Profile Image Hover
const profileImage = document.querySelector('.image-placeholder');
if (profileImage) {
    profileImage.addEventListener('mouseenter', () => {
        profileImage.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    });
    
    profileImage.addEventListener('mouseleave', () => {
        profileImage.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    });
}

// Animate elements on scroll
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
    const animatedElements = document.querySelectorAll('.hero-left, .hero-right');
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
});

// Add ripple effect on click
document.addEventListener('click', (e) => {
    const ripple = document.createElement('div');
    ripple.style.position = 'fixed';
    ripple.style.width = '20px';
    ripple.style.height = '20px';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 68, 68, 0.3)';
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