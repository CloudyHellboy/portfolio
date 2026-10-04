/* =========================================================
   CLOUD HELLBOY — FULL DEMO WEBSITE
   SCRIPT.JS
   ========================================================= */
"use strict";

const header = document.getElementById("header");
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
const navLinks = document.querySelectorAll(".nav a");
const currentYear = document.getElementById("currentYear");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

function updateHeader() {
  if (!header) return;
  header.classList.toggle("scrolled", window.scrollY > 40);
}
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

function openMenu() {
  if (!menuToggle || !nav) return;
  menuToggle.classList.add("active");
  nav.classList.add("active");
  document.body.classList.add("menu-open");
  menuToggle.setAttribute("aria-expanded", "true");
}

function closeMenu() {
  if (!menuToggle || !nav) return;
  menuToggle.classList.remove("active");
  nav.classList.remove("active");
  document.body.classList.remove("menu-open");
  menuToggle.setAttribute("aria-expanded", "false");
}

function toggleMenu() {
  if (!nav) return;
  nav.classList.contains("active") ? closeMenu() : openMenu();
}

if (menuToggle) menuToggle.addEventListener("click", toggleMenu);
navLinks.forEach(link => link.addEventListener("click", closeMenu));

document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeMenu();
});

const animatedElements = document.querySelectorAll(".section-content, .contact > *");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -50px 0px" });

  animatedElements.forEach(el => revealObserver.observe(el));
} else {
  animatedElements.forEach(el => el.classList.add("visible"));
}

const sections = document.querySelectorAll("main section[id]");

function updateActiveNavigation() {
  let currentSection = "";
  const position = window.scrollY + 180;

  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    if (position >= top && position < top + height) {
      currentSection = section.id;
    }
  });

  navLinks.forEach(link => {
    link.classList.toggle(
      "active-link",
      link.getAttribute("href") === `#${currentSection}`
    );
  });
}

window.addEventListener("scroll", updateActiveNavigation, { passive: true });
updateActiveNavigation();

const heroBackground = document.querySelector(".hero-background");
function updateHeroParallax() {
  if (!heroBackground) return;
  if (window.innerWidth <= 768) {
    heroBackground.style.transform = "scale(1.05)";
    return;
  }
  const y = window.scrollY;
  if (y < window.innerHeight * 1.2) {
    heroBackground.style.transform = `scale(1.05) translateY(${y * 0.08}px)`;
  }
}
window.addEventListener("scroll", updateHeroParallax, { passive: true });

document.querySelectorAll(".music-card").forEach(card => {
  card.addEventListener("mouseenter", () => card.classList.add("is-hovered"));
  card.addEventListener("mouseleave", () => card.classList.remove("is-hovered"));
});

document.querySelectorAll(".play-button").forEach(button => {
  button.addEventListener("click", event => {
    event.preventDefault();
    event.stopPropagation();
    button.classList.toggle("playing");
    const playing = button.classList.contains("playing");
    button.textContent = playing ? "Ⅱ" : "▶";
    button.setAttribute("aria-label", playing ? "Pausar música" : "Reproduzir música");
  });
});

const videoPlayButton = document.querySelector(".video-play");
if (videoPlayButton) {
  videoPlayButton.addEventListener("click", () => {
    videoPlayButton.classList.toggle("playing");
    const playing = videoPlayButton.classList.contains("playing");
    videoPlayButton.textContent = playing ? "Ⅱ" : "▶";
    videoPlayButton.setAttribute("aria-label", playing ? "Pausar vídeo" : "Reproduzir vídeo");
  });
}

document.querySelectorAll('a[href="#"]').forEach(link => {
  link.addEventListener("click", event => event.preventDefault());
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 1000) closeMenu();
});

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
if (reducedMotion.matches) {
  animatedElements.forEach(el => el.classList.add("visible"));
}

document.documentElement.classList.add("js-enabled");
