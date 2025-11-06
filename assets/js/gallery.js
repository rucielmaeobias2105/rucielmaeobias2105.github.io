// ==================== GALLERY FUNCTIONALITY ====================
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
    updateThumbnails();
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
    }
}

function updateProgressBar() {
    const progressFill = document.getElementById('progress-fill');
    if (progressFill && slides.length > 0) {
        const progress = ((currentIndex + 1) / slides.length) * 100;
        progressFill.style.width = progress + '%';
    }
}

function updateThumbnails() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumb, index) => {
        thumb.classList.toggle('active', index === currentIndex);
    });
}

function createThumbnails() {
    const thumbnailContainer = document.getElementById('thumbnail-container');
    if (!thumbnailContainer) return;
    
    thumbnailContainer.innerHTML = '';
    
    slides.forEach((slide, index) => {
        const img = slide.querySelector('img');
        if (img) {
            const thumbnail = document.createElement('img');
            thumbnail.src = img.src;
            thumbnail.alt = `Thumbnail ${index + 1}`;
            thumbnail.className = 'thumbnail';
            thumbnail.addEventListener('click', () => {
                stopSlideShow();
                currentIndex = index;
                showSlide(currentIndex);
                startSlideShow();
            });
            thumbnailContainer.appendChild(thumbnail);
        }
    });
    
    updateThumbnails();
}

function toggleFullscreen() {
    const slider = document.getElementById('slider');
    if (!slider) return;
    
    if (!document.fullscreenElement) {
        if (slider.requestFullscreen) {
            slider.requestFullscreen();
        }
        slider.classList.add('fullscreen');
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
        slider.classList.remove('fullscreen');
    }
}

function downloadCurrentSlide() {
    const currentSlide = slides[currentIndex];
    const img = currentSlide.querySelector('img');
    if (img) {
        const link = document.createElement('a');
        link.href = img.src;
        link.download = `gallery-image-${currentIndex + 1}.jpg`;
        link.click();
    }
}

// ==================== THEME & STYLE SWITCHER ====================
const styleSwitcher = document.getElementById('style-switcher');
const switcherToggle = document.getElementById('switcher-toggler');
const switcherClose = document.getElementById('switcher-close');
const themeToggler = document.getElementById('theme-toggler');


function toggleStyleSwitcher() {
    if (styleSwitcher) {
        styleSwitcher.classList.toggle('show-switcher');
    }
}

function closeStyleSwitcher() {
    if (styleSwitcher) {
        styleSwitcher.classList.remove('show-switcher');
    }
}

function toggleTheme() {
    const body = document.body;
    const themeIcon = document.getElementById('theme-icon');
    const isDark = body.classList.contains('dark-theme');
    
    if (isDark) {
        body.classList.remove('dark-theme');
        if (themeIcon) {
            themeIcon.className = 'ri-sun-line';
        }
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.add('dark-theme');
        if (themeIcon) {
            themeIcon.className = 'ri-moon-line';
        }
        localStorage.setItem('theme', 'dark');
    }
}

function applySavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    const themeIcon = document.getElementById('theme-icon');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        if (themeIcon) {
            themeIcon.className = 'ri-moon-line';
        }
    } else {
        document.body.classList.remove('dark-theme');
        if (themeIcon) {
            themeIcon.className = 'ri-sun-line';
        }
    }
}

function applyColor(hue) {
    document.documentElement.style.setProperty("--hue", hue);
    localStorage.setItem("siteColor", hue);
    
    const colors = document.querySelectorAll(".theme-img");
    colors.forEach(color => color.classList.remove('active'));
    
    const activeColor = Array.from(colors).find(color => 
        color.style.getPropertyValue('--hue') === hue
    );
    if (activeColor) {
        activeColor.classList.add('active');
    }
}

function initializeColorTheme() {
    const savedColor = localStorage.getItem("siteColor") || "271";
    applyColor(savedColor);
}

// ==================== EVENT LISTENERS ====================
function initializeEventListeners() {

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

    const downloadBtn = document.getElementById('download-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', downloadCurrentSlide);
    }

    const fullscreenBtn = document.getElementById('fullscreen-toggle');
    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', toggleFullscreen);
    }


    if (switcherToggle) {
        switcherToggle.addEventListener('click', toggleStyleSwitcher);
    }

    if (switcherClose) {
        switcherClose.addEventListener('click', closeStyleSwitcher);
    }

    if (themeToggler) {
        themeToggler.addEventListener('click', toggleTheme);
    }


    const colors = document.querySelectorAll(".theme-img");
    colors.forEach(function(color) {
        color.addEventListener("click", function() {
            const newHue = color.style.getPropertyValue("--hue");
            if (newHue) {
                applyColor(newHue);
            }
        });
    });


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
                toggleFullscreen();
            } else if (e.key === 'Escape') {
                closeStyleSwitcher();
            }
        }
    });


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

    const sliderElement = document.querySelector('.slider');
    if (sliderElement) {
        sliderElement.addEventListener('touchstart', handleTouchStart, false);
        sliderElement.addEventListener('touchend', handleTouchEnd, false);
    }


    document.addEventListener('click', (e) => {
        if (styleSwitcher && 
            !styleSwitcher.contains(e.target) && 
            !switcherToggle.contains(e.target) &&
            styleSwitcher.classList.contains('show-switcher')) {
            closeStyleSwitcher();
        }
    });
}

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
 
    if (slides.length > 0) {
        showSlide(currentIndex);
        createThumbnails();
        startSlideShow();
        

        const totalSlidesElement = document.getElementById('total-slides');
        if (totalSlidesElement) {
            totalSlidesElement.textContent = slides.length;
        }
        

        const slider = document.querySelector('.slider');
        if (slider) {
            slider.addEventListener('mouseenter', stopSlideShow);
            slider.addEventListener('mouseleave', () => {
                if (!isPaused) startSlideShow();
            });
        }
    }

    applySavedTheme();
    initializeColorTheme();

    initializeEventListeners();
    
    console.log('Gallery initialized successfully');
});