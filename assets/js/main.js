/*==================== MENU SHOW / HIDE ====================*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close');

/*===== MENU SHOW =====*/
if(navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

/*===== MENU HIDE =====*/
if(navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLinks = document.querySelectorAll('.nav-link');

function linkAction() {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('show-menu');
}
navLinks.forEach(n => n.addEventListener('click', linkAction));

const mobileNavLinks = document.querySelectorAll('.nav-link-mobile');
mobileNavLinks.forEach(link => {
    link.addEventListener('click', function() {
        mobileNavLinks.forEach(l => l.classList.remove('active-link'));
        this.classList.add('active-link');
    });
});

/*==================== SLIDESHOW ====================*/
const slides = document.querySelectorAll('.slide');
let currentIndex = 0;
let slideInterval;
let isPaused = false;

function showSlide(index) {
    if (slides.length === 0) return;
    
    slides.forEach((slide, i) => {
        slide.classList.toggle('current', i === index);
    });
    
    const currentSlideElement = document.getElementById('current-slide');
    if (currentSlideElement) {
        currentSlideElement.textContent = index + 1;
    }
    
    updateProgressBar();
}

function nextSlide() {
    if (slides.length === 0) return;
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
}

function prevSlide() {
    if (slides.length === 0) return;
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
}

function startSlideShow() {
    if (slides.length === 0 || isPaused) return;
    slideInterval = setInterval(nextSlide, 5000);
}

function stopSlideShow() {
    clearInterval(slideInterval);
}

function toggleSlideShow() {
    isPaused = !isPaused;
    const playPauseIcon = document.getElementById('play-pause-icon');
    const playPauseText = document.getElementById('play-pause-text');
    
    if (playPauseIcon && playPauseText) {
        if (isPaused) {
            playPauseIcon.className = 'ri-play-line';
            playPauseText.textContent = 'Play';
            stopSlideShow();
        } else {
            playPauseIcon.className = 'ri-pause-line';
            playPauseText.textContent = 'Pause';
            startSlideShow();
        }
    } else {
        if (isPaused) {
            stopSlideShow();
        } else {
            startSlideShow();
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (slides.length > 0) {
        showSlide(currentIndex);
        startSlideShow();
        
 
        const slider = document.querySelector('.slider');
        if (slider) {
            slider.addEventListener('mouseenter', () => {
                stopSlideShow();
            });
            
            slider.addEventListener('mouseleave', () => {
                if (!isPaused) {
                    startSlideShow();
                }
            });
        }
        

        const totalSlidesElement = document.getElementById('total-slides');
        if (totalSlidesElement) {
            totalSlidesElement.textContent = slides.length;
        }
    }
});

document.querySelectorAll('#next').forEach(btn => {
    btn.addEventListener('click', () => {
        stopSlideShow();
        nextSlide();
        startSlideShow();
    });
});

document.querySelectorAll('#prev').forEach(btn => {
    btn.addEventListener('click', () => {
        stopSlideShow();
        prevSlide();
        startSlideShow();
    });
});

const playPauseBtn = document.getElementById('play-pause');
if (playPauseBtn) {
    playPauseBtn.addEventListener('click', toggleSlideShow);
}

function updateProgressBar() {
    const progressFill = document.getElementById('progress-fill');
    if (progressFill && slides.length > 0) {
        const progress = ((currentIndex + 1) / slides.length) * 100;
        progressFill.style.width = progress + '%';
    }
}

document.addEventListener('keydown', (e) => {
    if (slides.length > 0) {
        if (e.key === 'ArrowRight') {
            stopSlideShow();
            nextSlide();
            startSlideShow();
        } else if (e.key === 'ArrowLeft') {
            stopSlideShow();
            prevSlide();
            startSlideShow();
        } else if (e.key === ' ') {
            e.preventDefault();
            toggleSlideShow();
        } else if (e.key === 'f' || e.key === 'F') {
            const slider = document.querySelector('.slider');
            if (slider && slider.requestFullscreen) {
                slider.requestFullscreen();
            }
        }
    }
});

/*==================== STYLE SWITCHER ====================*/
const styleSwitcher = document.getElementById('style-switcher');
const switcherToggle = document.getElementById('switcher-toggler');
const switcherClose = document.getElementById('switcher-close');

if(switcherToggle) {
    switcherToggle.addEventListener('click', () => {
        styleSwitcher.classList.add('show-switcher');
    });
}

if(switcherClose) {
    switcherClose.addEventListener('click', () => {
        styleSwitcher.classList.remove('show-switcher');
    });
}

/*==================== DARK / LIGHT THEME ====================*/
window.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('theme-toggler');
    const icon = document.getElementById('theme-icon');
    const body = document.body;

    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const savedTheme = localStorage.getItem('theme') || (prefersDarkScheme.matches ? 'dark' : 'light');
    
    applyTheme(savedTheme);

    function applyTheme(theme) {
        if (theme === 'dark') {
            body.classList.add('dark-theme');
            if (icon) {
                icon.classList.remove('ri-sun-line');
                icon.classList.add('ri-moon-line');
            }
        } else {
            body.classList.remove('dark-theme');
            if (icon) {
                icon.classList.remove('ri-moon-line');
                icon.classList.add('ri-sun-line');
            }
        }
        localStorage.setItem('theme', theme);
    }

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const isDark = body.classList.contains('dark-theme');
            applyTheme(isDark ? 'light' : 'dark');
        });
    }

    prefersDarkScheme.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });
});

/*==================== COLOR THEMES ====================*/
const colors = document.querySelectorAll(".theme-img");

function applyColor(hue) {
    document.documentElement.style.setProperty("--hue", hue);
    localStorage.setItem("siteColor", hue);
    
    colors.forEach(color => color.classList.remove('active'));
    const activeColor = Array.from(colors).find(color => 
        color.style.getPropertyValue('--hue') === hue
    );
    if (activeColor) {
        activeColor.classList.add('active');
    }
}

window.addEventListener("DOMContentLoaded", function() {
    const savedColor = localStorage.getItem("siteColor");
    if (savedColor) {
        applyColor(savedColor);
    } else {
        applyColor("271");
    }
});

colors.forEach(function(color) {
    color.addEventListener("click", function() {
        const newHue = color.style.getPropertyValue("--hue");
        if (newHue) {
            applyColor(newHue);
        }
    });
});

/*==================== SCROLL REVEAL ANIMATION ====================*/
if (typeof ScrollReveal !== 'undefined') {
    const sr = ScrollReveal({
        origin: 'top',
        distance: '60px',
        duration: 2500,
        delay: 400,
    });

    sr.reveal('.home-content, .section-title, .section-subtitle');
    sr.reveal('.home-img, .about-info, .skills-group, .portfolio-card, .contact-card', {delay: 500, origin: 'bottom'});
    sr.reveal('.stats-box, .resume-item', {interval: 100});
    sr.reveal('.skills-data', {interval: 50});
}

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav-link[href*=' + sectionId + ']')?.classList.add('active-link');
        } else {
            document.querySelector('.nav-link[href*=' + sectionId + ']')?.classList.remove('active-link');
        }
    });
}
window.addEventListener('scroll', scrollActive);

/*==================== SMOOTH SCROLL ====================*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/*==================== BACK TO TOP BUTTON ====================*/
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="ri-arrow-up-line"></i>';
scrollTopBtn.className = 'scroll-top';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    background: var(--first-color);
    color: white;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: none;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    cursor: pointer;
    border: none;
    z-index: 1000;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
`;

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollTopBtn.addEventListener('mouseenter', () => {
    scrollTopBtn.style.transform = 'translateY(-2px)';
    scrollTopBtn.style.boxShadow = '0 6px 20px rgba(0,0,0,0.2)';
});

scrollTopBtn.addEventListener('mouseleave', () => {
    scrollTopBtn.style.transform = 'translateY(0)';
    scrollTopBtn.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
});

document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.style.display = 'flex';
        scrollTopBtn.classList.add('show-scroll');
    } else {
        scrollTopBtn.style.display = 'none';
        scrollTopBtn.classList.remove('show-scroll');
    }
});

/*==================== TOUCH SWIPE FOR GALLERY ====================*/
let touchStartX = 0;
let touchEndX = 0;

function handleTouchStart(e) {
    touchStartX = e.changedTouches[0].screenX;
}

function handleTouchEnd(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}

function handleSwipe() {
    const swipeThreshold = 50;
    
    if (touchEndX < touchStartX - swipeThreshold) {
        stopSlideShow();
        nextSlide();
        startSlideShow();
    }
    
    if (touchEndX > touchStartX + swipeThreshold) {
        stopSlideShow();
        prevSlide();
        startSlideShow();
    }
}

// Add touch events for mobile gallery
const sliderElement = document.querySelector('.slider');
if (sliderElement) {
    sliderElement.addEventListener('touchstart', handleTouchStart, false);
    sliderElement.addEventListener('touchend', handleTouchEnd, false);
}

/*==================== RESPONSIVE NAVIGATION ====================*/
function handleResize() {
    const navMobile = document.querySelector('.nav-mobile');
    const navDesktop = document.querySelector('.nav');
    
    if (window.innerWidth <= 768) {
        navMobile?.style.display === 'block';
        navDesktop?.style.display === 'none';
    } else {
        navMobile?.style.display === 'none';
        navDesktop?.style.display === 'flex';
    }
}

handleResize();

window.addEventListener('resize', handleResize);

/*==================== LOADING ANIMATION ====================*/
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.style.display = 'none';
    }
});


document.addEventListener('click', (e) => {
    if (styleSwitcher && !styleSwitcher.contains(e.target) && 
        switcherToggle && !switcherToggle.contains(e.target) &&
        styleSwitcher.classList.contains('show-switcher')) {
        styleSwitcher.classList.remove('show-switcher');
    }
});