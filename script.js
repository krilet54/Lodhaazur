const plansData = {
  plan1: {
    title: "3 BHK",
    image: "3bhk.jpg",
    desc: "3 Bedrooms · 3 Bathrooms · Living & Dining Hall · Kitchen · Private Deck · Utility Room\n\nCarpet Area: 1265 Sq.Ft."
  },
  plan2: {
    title: "3 BHK + Study",
    image: "3bhkstudy.jpg",
    desc: "3 Bedrooms · 3 Bathrooms · Living & Dining Hall · Kitchen · 2 Private Decks · Utility Room · Dedicated Study\n\nCarpet Area: 1583 Sq.Ft."
  }
};

function openPlan(planKey) {
  document.getElementById("plansGrid").style.display = "none";
  document.getElementById("planExpanded").style.display = "block";

  document.getElementById("expandedTitle").innerText = plansData[planKey].title;
  document.getElementById("expandedImg").src = plansData[planKey].image;
  document.getElementById("expandedDesc").innerText = plansData[planKey].desc;
}

function closePlan() {
  document.getElementById("planExpanded").style.display = "none";
  document.getElementById("plansGrid").style.display = "flex";
}

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

/* Highlight background rotator (cycles images) */
(() => {
  const images = [
    "g2.webp",
    "23.03.2024_1855055434_L-Azur_Image-Resize_1000X480_SN4.jpg",
    "23.03.2024_1855055434_L-Azur_Image-Resize_1000X480_SN5.jpg",
    "g3.webp"
  ];

  let current = 0;
  const bg = document.querySelector(".highlight-bg");
  if (!bg) return;

  // ensure initial image
  bg.style.backgroundImage = `url(${images[0]})`;
  bg.style.opacity = 1;

  setInterval(() => {
    current = (current + 1) % images.length;
    bg.style.opacity = 0;

    setTimeout(() => {
      bg.style.backgroundImage = `url(${images[current]})`;
      bg.style.opacity = 1;
    }, 600);

  }, 5000);
})();

