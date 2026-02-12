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

const gallerySlides = Array.from(document.querySelectorAll(".gallery-slide"));
const galleryNext = document.querySelector(".gallery-nav.next");
const galleryPrev = document.querySelector(".gallery-nav.prev");

let galleryIndex = 0;
let galleryLocked = false;

function setGallerySlide(targetIndex) {
  if (galleryLocked || targetIndex === galleryIndex) return;
  const total = gallerySlides.length;
  if (!total) return;

  galleryLocked = true;

  const current = gallerySlides[galleryIndex];
  const next = gallerySlides[(targetIndex + total) % total];

  current.classList.remove("active");
  next.classList.add("active");

  galleryIndex = (targetIndex + total) % total;

  setTimeout(() => {
    galleryLocked = false;
  }, 420);
}

if (galleryNext && galleryPrev && gallerySlides.length) {
  galleryNext.addEventListener("click", () => setGallerySlide(galleryIndex + 1));
  galleryPrev.addEventListener("click", () => setGallerySlide(galleryIndex - 1));
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

/* Location visual toggle (photo ↔ map) */
(() => {
  const toggleBtn = document.querySelector(".loc-toggle-btn");
  const photoPane = document.querySelector(".loc-photo");
  const mapPane = document.querySelector(".loc-map");
  if (!toggleBtn || !photoPane || !mapPane) return;

  const setView = (view) => {
    const showMap = view === "map";
    photoPane.classList.toggle("active", !showMap);
    mapPane.classList.toggle("active", showMap);
    photoPane.setAttribute("aria-hidden", showMap ? "true" : "false");
    mapPane.setAttribute("aria-hidden", showMap ? "false" : "true");
    toggleBtn.textContent = showMap ? "View photo" : "Open in map";
    toggleBtn.setAttribute("aria-pressed", showMap ? "true" : "false");
  };

  toggleBtn.addEventListener("click", () => {
    const showingMap = mapPane.classList.contains("active");
    setView(showingMap ? "photo" : "map");
  });
})();

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

