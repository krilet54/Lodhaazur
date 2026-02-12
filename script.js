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

const legalLinks = document.querySelectorAll(".legal-link");
const legalModals = document.querySelectorAll(".legal-modal");

function getOpenLegalModal() {
  return Array.from(legalModals).find((modal) => !modal.hasAttribute("hidden"));
}

function closeLegalModal(modal) {
  if (!modal) return;
  modal.setAttribute("hidden", "");
  if (!getOpenLegalModal()) {
    document.body.classList.remove("modal-open");
  }
}

function openLegalModal(modal) {
  if (!modal) return;
  legalModals.forEach((item) => item.setAttribute("hidden", ""));
  modal.removeAttribute("hidden");
  document.body.classList.add("modal-open");
}

legalLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const targetId = link.dataset.modalTarget;
    if (!targetId) return;
    const targetModal = document.getElementById(targetId);
    openLegalModal(targetModal);
  });
});

legalModals.forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeLegalModal(modal);
    }
  });

  const closeBtn = modal.querySelector(".legal-close");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => closeLegalModal(modal));
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  closeLegalModal(getOpenLegalModal());
});

