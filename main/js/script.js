// ========================================
// LUVIA - Professional Healthcare App
// Advanced JavaScript with Animations
// ========================================

'use strict';

// ========================================
// INITIALIZATION
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    initPreloader();
    initParticleCanvas();
    initNavigation();
    initScrollAnimations();
    initDownload();
    initBackToTop();
    initSmoothScroll();
});

// ========================================
// PRELOADER
// ========================================
function initPreloader() {
    const preloader = document.getElementById('preloader');
    
    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.classList.add('hidden');
            setTimeout(function() {
                preloader.style.display = 'none';
            }, 500);
        }, 1500);
    });
}

// ========================================
// PARTICLE CANVAS BACKGROUND
// ========================================
function initParticleCanvas() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Particle class
    class Particle {
        constructor() {
            this.reset();
            this.y = Math.random() * canvas.height;
            this.opacity = Math.random() * 0.5 + 0.3;
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = -10;
            this.speed = Math.random() * 1 + 0.5;
            this.size = Math.random() * 2 + 1;
            const colors = ['#D42221', '#FD6B26', '#FDD92D'];
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }
        
        update() {
            this.y += this.speed;
            if (this.y > canvas.height) {
                this.reset();
            }
        }
        
        draw() {
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.opacity;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }
    
    // Create particles
    function createParticles() {
        const particleCount = Math.floor(window.innerWidth / 20);
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        animationId = requestAnimationFrame(animate);
    }
    
    createParticles();
    animate();
}

// ========================================
// NAVIGATION
// ========================================
function initNavigation() {
    const nav = document.getElementById('mainNav');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navItems = document.querySelectorAll('.nav-item');
    
    // Scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking nav item
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Active nav item on scroll
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === '#' + current) {
                item.classList.add('active');
            }
        });
    });
}

// ========================================
// SCROLL ANIMATIONS
// ========================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements
    const animateElements = document.querySelectorAll(`
        .feature-card,
        .benefit-item,
        .team-card,
        .section-header
    `);
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ========================================
// APK DOWNLOAD
// ========================================
function initDownload() {
    const downloadBtn = document.getElementById('downloadAPK');
    if (!downloadBtn) return;
    
    downloadBtn.addEventListener('click', handleDownload);
}

function handleDownload(e) {
    e.preventDefault();
    const btn = e.currentTarget;
    const btnContent = btn.querySelector('.dl-btn-content');
    const originalHTML = btnContent.innerHTML;
    
    // Disable button
    btn.disabled = true;
    btn.style.cursor = 'not-allowed';
    
    // Show loading state
    btnContent.innerHTML = `
        <svg class="dl-icon" viewBox="0 0 50 50" style="animation: spin 1s linear infinite;">
            <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" stroke-width="4" opacity="0.3"/>
            <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" stroke-width="4" stroke-dasharray="31.4 31.4" stroke-dashoffset="0" stroke-linecap="round">
                <animateTransform attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="1s" repeatCount="indefinite"/>
            </circle>
        </svg>
        <div class="dl-text">
            <span class="dl-label">Preparing Download...</span>
            <span class="dl-info">Please wait</span>
        </div>
    `;
    
    // Simulate download
    setTimeout(function() {
        // IMPORTANT: Replace 'app.apk' with your actual APK file path
        const apkPath = 'main\\apk\\luvia.apk';  // <-- CHANGE THIS TO YOUR APK FILENAME
        
        // Create download link
        const link = document.createElement('a');
        link.href = apkPath;
        link.download = 'luvia.apk';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Success state
        btnContent.innerHTML = `
            <svg class="dl-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M5 13l4 4L19 7" stroke-width="3" stroke-linecap="round"/>
            </svg>
            <div class="dl-text">
                <span class="dl-label">Download Started!</span>
                <span class="dl-info">Check your downloads</span>
            </div>
        `;
        
        showNotification('✓ Download started! Check your downloads folder.', 'success');
        
        // Reset button after 3 seconds
        setTimeout(function() {
            btnContent.innerHTML = originalHTML;
            btn.disabled = false;
            btn.style.cursor = 'pointer';
        }, 3000);
    }, 1500);
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = 'notification notification-' + type;
    notification.textContent = message;
    
    const styles = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: linear-gradient(135deg, #D42221, #FD6B26);
        color: white;
        padding: 1.2rem 2rem;
        border-radius: 16px;
        box-shadow: 0 10px 40px rgba(212, 34, 33, 0.4);
        z-index: 10000;
        font-weight: 600;
        font-size: 1rem;
        animation: slideIn 0.5s ease, slideOut 0.5s ease 3.5s;
        max-width: 350px;
    `;
    
    notification.style.cssText = styles;
    
    // Add animation styles to document
    if (!document.getElementById('notification-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'notification-styles';
        styleSheet.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(styleSheet);
    }
    
    document.body.appendChild(notification);
    
    setTimeout(function() {
        notification.remove();
    }, 4000);
}

// ========================================
// BACK TO TOP BUTTON
// ========================================
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    if (!backToTop) return;
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ========================================
// SMOOTH SCROLL
// ========================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
// PARALLAX EFFECTS
// ========================================
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    
    // Parallax gradient
    const heroGradient = document.querySelector('.hero-gradient');
    if (heroGradient) {
        heroGradient.style.transform = `translate(${scrolled * 0.05}px, ${scrolled * 0.1}px) rotate(${scrolled * 0.02}deg)`;
    }
    
    // Parallax phone
    const phoneMockup = document.querySelector('.phone-mockup');
    if (phoneMockup && window.innerWidth > 968) {
        const phoneTop = phoneMockup.offsetTop;
        const distance = scrolled - phoneTop + window.innerHeight;
        if (distance > 0 && distance < window.innerHeight * 2) {
            phoneMockup.style.transform = `translateY(${distance * 0.05}px)`;
        }
    }
});

// ========================================
// CONSOLE MESSAGE
// ========================================
console.log('%c🏥 LUVIA - Your Lifelong Health Companion', 'color: #D42221; font-size: 24px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);');
console.log('%c✨ Professional Healthcare Platform', 'color: #FD6B26; font-size: 16px; font-weight: bold;');
console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #FDD92D;');
console.log('%c📱 To enable APK download:', 'color: #fff; font-size: 14px; font-weight: bold;');
console.log('%c1. Place your APK file in the same directory as index.html', 'color: #ccc; font-size: 12px;');
console.log('%c2. Name it "app.apk" OR edit line 190 in script.js', 'color: #ccc; font-size: 12px;');
console.log('%c3. Upload developer photos: developer1.png, developer2.png, developer3.png, developer4.png', 'color: #ccc; font-size: 12px;');
console.log('%c4. Upload your logo as logo.png', 'color: #ccc; font-size: 12px;');
console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #FDD92D;');
console.log('%c⚡ All systems loaded successfully!', 'color: #0f0; font-size: 14px; font-weight: bold;');

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================

// Lazy load images
const imageObserver = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            }
            observer.unobserve(img);
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// Debounce resize events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = function() {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

window.addEventListener('resize', debounce(function() {
    // Handle resize events
}, 250));

// ========================================
// EASTER EGG - KONAMI CODE
// ========================================
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        activatePartyMode();
    }
});

function activatePartyMode() {
    showNotification('🎉 Party mode activated! Enjoy the rainbow!', 'success');
    
    document.body.style.animation = 'rainbow 3s linear infinite';
    
    const style = document.createElement('style');
    style.id = 'party-mode';
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    // Create confetti
    for (let i = 0; i < 100; i++) {
        createConfetti();
    }
    
    setTimeout(function() {
        document.body.style.animation = '';
        const partyStyle = document.getElementById('party-mode');
        if (partyStyle) partyStyle.remove();
    }, 5000);
}

function createConfetti() {
    const confetti = document.createElement('div');
    const colors = ['#D42221', '#FD6B26', '#FDD92D'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    confetti.style.cssText = `
        position: fixed;
        width: ${Math.random() * 10 + 5}px;
        height: ${Math.random() * 10 + 5}px;
        background: ${color};
        left: ${Math.random() * 100}vw;
        top: -10px;
        border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
        opacity: ${Math.random() * 0.8 + 0.2};
        transform: rotate(${Math.random() * 360}deg);
        animation: confettiFall ${Math.random() * 3 + 2}s linear;
        z-index: 10000;
        pointer-events: none;
    `;
    
    if (!document.getElementById('confetti-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'confetti-styles';
        styleSheet.textContent = `
            @keyframes confettiFall {
                to {
                    transform: translateY(100vh) rotate(${Math.random() * 720}deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(styleSheet);
    }
    
    document.body.appendChild(confetti);
    
    setTimeout(function() {
        confetti.remove();
    }, 5000);
}