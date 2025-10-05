// Get all slides
const slides = document.querySelectorAll('.slide');
let currentIndex = 0;
let slideInterval;

// Function to show a slide
function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('current');
    if (i === index) {
      slide.classList.add('current');
    }
  }); 
}

// Show next slide
function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
}

// Show previous slide
function prevSlide() {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  showSlide(currentIndex);
}

// Start automatic slideshow
function startSlideShow() {
  slideInterval = setInterval(nextSlide, 5000); // 5 seconds
}

// Stop automatic slideshow
function stopSlideShow() {
  clearInterval(slideInterval);
}

// Add event listeners for buttons
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

// Initialize
showSlide(currentIndex);
startSlideShow();
