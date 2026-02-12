const plansData = {
  plan1: {
    title: "3 BHK",
    image: "3bhk.jpg",
    desc: "3 Bedrooms - 3 Bathrooms - Living & Dining Hall - Kitchen - Private Deck - Utility Room\n\nCarpet Area: 1265 Sq.Ft."
  },
  plan2: {
    title: "3 BHK + Study",
    image: "3bhkstudy.jpg",
    desc: "3 Bedrooms - 3 Bathrooms - Living & Dining Hall - Kitchen - 2 Private Decks - Utility Room - Dedicated Study\n\nCarpet Area: 1583 Sq.Ft."
  }
};

function openPlan(planKey) {
  const grid = document.getElementById("plansGrid");
  const expanded = document.getElementById("planExpanded");
  if (!grid || !expanded || !plansData[planKey]) return;

  grid.style.display = "none";
  expanded.style.display = "block";

  document.getElementById("expandedTitle").innerText = plansData[planKey].title;
  document.getElementById("expandedImg").src = plansData[planKey].image;
  document.getElementById("expandedImg").alt = `${plansData[planKey].title} floor plan`;
  document.getElementById("expandedDesc").innerText = plansData[planKey].desc;
}

function closePlan() {
  const expanded = document.getElementById("planExpanded");
  const grid = document.getElementById("plansGrid");
  if (!expanded || !grid) return;
  expanded.style.display = "none";
  grid.style.display = "flex";
}

const gallerySlides = Array.from(document.querySelectorAll(".gallery-slide"));
const galleryNext = document.querySelector(".gallery-nav.next");
const galleryPrev = document.querySelector(".gallery-nav.prev");
const galleryDots = Array.from(document.querySelectorAll(".gallery-dot"));
const galleryCounter = document.querySelector(".gallery-counter");

let galleryIndex = 0;
let galleryLocked = false;

function syncGalleryUi() {
  const total = gallerySlides.length;
  if (galleryCounter) {
    galleryCounter.textContent = `${galleryIndex + 1} / ${total}`;
  }
  galleryDots.forEach((dot, i) => {
    dot.classList.toggle("active", i === galleryIndex);
    dot.setAttribute("aria-selected", i === galleryIndex ? "true" : "false");
  });
}

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
  syncGalleryUi();

  setTimeout(() => {
    galleryLocked = false;
  }, 420);
}

if (galleryNext && galleryPrev && gallerySlides.length) {
  galleryNext.addEventListener("click", () => setGallerySlide(galleryIndex + 1));
  galleryPrev.addEventListener("click", () => setGallerySlide(galleryIndex - 1));
  galleryDots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const index = Number(dot.dataset.slideIndex);
      if (Number.isNaN(index)) return;
      setGallerySlide(index);
    });
  });
  syncGalleryUi();
}

const legalLinks = document.querySelectorAll(".legal-link");
const legalModals = document.querySelectorAll(".legal-modal");
const enquiryModal = document.getElementById("enquiry-modal");
const enquiryOpeners = document.querySelectorAll(".js-open-enquiry-modal");
const enquiryCloseBtn = enquiryModal ? enquiryModal.querySelector(".enquiry-close") : null;
const modalLeadSourceInput = document.getElementById("modalLeadSource");
const enquiryModalTitle = document.getElementById("enquiry-modal-title");
const formsubmitForms = document.querySelectorAll('form[action*="formsubmit.co"]');

function getThankYouUrl() {
  const basePath = window.location.pathname.replace(/[^/]*$/, "");
  return `${window.location.origin}${basePath}thank-you.html`;
}

function getOpenLegalModal() {
  return Array.from(legalModals).find((modal) => !modal.hasAttribute("hidden"));
}

function closeLegalModal(modal) {
  if (!modal) return;
  modal.setAttribute("hidden", "");
  if (!enquiryModal || enquiryModal.hasAttribute("hidden")) {
    document.body.classList.remove("modal-open");
  }
}

function openLegalModal(modal) {
  if (!modal) return;
  legalModals.forEach((item) => item.setAttribute("hidden", ""));
  modal.removeAttribute("hidden");
  document.body.classList.add("modal-open");
}

function isEnquiryModalOpen() {
  return Boolean(enquiryModal && !enquiryModal.hasAttribute("hidden"));
}

function closeEnquiryModal() {
  if (!enquiryModal) return;
  enquiryModal.setAttribute("hidden", "");
  if (!getOpenLegalModal()) {
    document.body.classList.remove("modal-open");
  }
}

function openEnquiryModal(sourceLabel) {
  if (!enquiryModal) return;
  const source = sourceLabel || "Brochure Download";
  const sourceForUi = source.toLowerCase();

  if (modalLeadSourceInput) {
    modalLeadSourceInput.value = source;
  }

  if (enquiryModalTitle) {
    if (sourceForUi.includes("pricing")) {
      enquiryModalTitle.textContent = "View Pricing";
    } else if (sourceForUi.includes("floor")) {
      enquiryModalTitle.textContent = "View Floor Plan";
    } else {
      enquiryModalTitle.textContent = "Download Brochure";
    }
  }

  enquiryModal.removeAttribute("hidden");
  document.body.classList.add("modal-open");
}

function setFormFeedback(form, message, type) {
  const node = form.querySelector(".form-feedback");
  if (!node) return;
  node.textContent = message || "";
  node.classList.toggle("is-success", type === "success");
  node.classList.toggle("is-error", type === "error");
}

function enhanceForm(form) {
  const nextInput = form.querySelector('input[name="_next"]');
  if (nextInput) {
    nextInput.value = getThankYouUrl();
  }

  const phoneInput = form.querySelector('input[name="Phone Number"]');
  const emailInput = form.querySelector('input[name="Email"]');
  const submitBtn = form.querySelector('button[type="submit"]');
  const submitLabel = submitBtn ? (submitBtn.dataset.submitLabel || submitBtn.textContent.trim()) : "Submit";

  if (phoneInput) {
    phoneInput.addEventListener("input", () => {
      phoneInput.value = phoneInput.value.replace(/[^0-9+\-\s]/g, "");
      const digits = phoneInput.value.replace(/\D/g, "");
      phoneInput.setCustomValidity(digits.length >= 10 ? "" : "Please enter a valid phone number.");
    });
  }

  if (emailInput) {
    emailInput.addEventListener("input", () => {
      const valid = emailInput.validity.valid || emailInput.value.trim() === "";
      emailInput.setCustomValidity(valid ? "" : "Please enter a valid email address.");
    });
  }

  form.addEventListener("submit", (event) => {
    const isValid = form.reportValidity();
    if (!isValid) {
      event.preventDefault();
      setFormFeedback(form, "Please complete all required details.", "error");
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Submitting...";
    }
    setFormFeedback(form, "Submitting your enquiry...", "success");

    setTimeout(() => {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = submitLabel;
      }
    }, 8000);
  });
}

formsubmitForms.forEach(enhanceForm);

legalLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const targetId = link.dataset.modalTarget;
    if (!targetId) return;
    openLegalModal(document.getElementById(targetId));
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

if (enquiryModal) {
  enquiryModal.addEventListener("click", (event) => {
    if (event.target === enquiryModal) {
      closeEnquiryModal();
    }
  });
}

if (enquiryCloseBtn) {
  enquiryCloseBtn.addEventListener("click", closeEnquiryModal);
}

enquiryOpeners.forEach((trigger) => {
  trigger.addEventListener("click", (event) => {
    event.preventDefault();
    openEnquiryModal(trigger.dataset.leadSource);
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  if (isEnquiryModalOpen()) {
    closeEnquiryModal();
    return;
  }
  closeLegalModal(getOpenLegalModal());
});

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
