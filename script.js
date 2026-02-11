const tabButtons = document.querySelectorAll(".tab-btn");
const tabPanels = document.querySelectorAll(".tab-panel");

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetId = button.dataset.target;

    tabButtons.forEach((btn) => {
      btn.classList.remove("active");
      btn.setAttribute("aria-selected", "false");
    });

    tabPanels.forEach((panel) => panel.classList.remove("active"));

    button.classList.add("active");
    button.setAttribute("aria-selected", "true");

    const activePanel = document.getElementById(targetId);
    if (activePanel) activePanel.classList.add("active");
  });
});

const gallerySlides = document.querySelectorAll(".gallery-slide");
const galleryButtons = document.querySelectorAll(".slider-btn");
const galleryThumbs = document.querySelectorAll(".thumb");
let galleryIndex = 0;

function setGallerySlide(index) {
  gallerySlides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });

  galleryThumbs.forEach((thumb, i) => {
    thumb.classList.toggle("active", i === index);
  });
}

galleryButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const direction = btn.dataset.dir;
    galleryIndex = direction === "next"
      ? (galleryIndex + 1) % gallerySlides.length
      : (galleryIndex - 1 + gallerySlides.length) % gallerySlides.length;

    setGallerySlide(galleryIndex);
  });
});

galleryThumbs.forEach((thumb) => {
  thumb.addEventListener("click", () => {
    galleryIndex = Number(thumb.dataset.index);
    setGallerySlide(galleryIndex);
  });
});

let touchStartX = 0;
let touchEndX = 0;
const gallerySlider = document.querySelector(".gallery-slider");

if (gallerySlider) {
  gallerySlider.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0].screenX;
  });

  gallerySlider.addEventListener("touchend", (event) => {
    touchEndX = event.changedTouches[0].screenX;
    const delta = touchStartX - touchEndX;
    if (Math.abs(delta) < 40) return;

    galleryIndex = delta > 0
      ? (galleryIndex + 1) % gallerySlides.length
      : (galleryIndex - 1 + gallerySlides.length) % gallerySlides.length;

    setGallerySlide(galleryIndex);
  });
}

const testimonials = document.querySelectorAll(".testimonial");
const testimonialButtons = document.querySelectorAll(".test-btn");
let testimonialIndex = 0;

function setTestimonial(index) {
  testimonials.forEach((item, i) => {
    item.classList.toggle("active", i === index);
  });
}

testimonialButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const direction = btn.dataset.dir;
    testimonialIndex = direction === "next"
      ? (testimonialIndex + 1) % testimonials.length
      : (testimonialIndex - 1 + testimonials.length) % testimonials.length;

    setTestimonial(testimonialIndex);
  });
});

const leadForm = document.querySelector(".lead-form");
const mobileToggle = document.querySelector(".mobile-form-toggle");

if (leadForm && mobileToggle) {
  mobileToggle.addEventListener("click", () => {
    const isOpen = leadForm.classList.toggle("mobile-open");
    mobileToggle.setAttribute("aria-expanded", String(isOpen));
    mobileToggle.textContent = isOpen ? "Close Form" : "Enquire Now";
  });
}
