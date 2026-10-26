// script.js - runs on every page.
// The <script> tag has "defer", so the HTML is already loaded when this runs.

// ---------- 1. Mobile menu ----------
const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-navigation");

function openMenu() {
  navigation.classList.add("is-open");
  menuToggle.setAttribute("aria-expanded", "true");
  menuToggle.setAttribute("aria-label", "Close navigation menu");
}

function closeMenu() {
  navigation.classList.remove   ("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
}

menuToggle.addEventListener("click", () => {
  if (navigation.classList.contains("is-open")) {
    closeMenu();
  } else {
    openMenu();
  }
});

// Close the menu when a link is clicked
const menuLinks = navigation.querySelectorAll("a");
menuLinks.forEach((link) => link.addEventListener("click", closeMenu));

// Close the menu with the Escape key
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

// Close the menu if the window becomes wider than the mobile layout
window.addEventListener("resize", () => {
  if (window.innerWidth > 700) {
    closeMenu();
  }
});

// ---------- 2. Dark mode (saved in localStorage) ----------
const themeToggle = document.querySelector(".theme-toggle");

function applyTheme(isDark) {
  document.body.classList.toggle("dark-mode", isDark);

  themeToggle.textContent = isDark ? "☀️" : "🌙";
  themeToggle.setAttribute(
    "aria-label",
    isDark ? "Switch to light mode" : "Switch to dark mode",
  );
  themeToggle.setAttribute("aria-pressed", String(isDark));
}

// Use the theme the visitor chose last time
applyTheme(localStorage.getItem("theme") === "dark");

themeToggle.addEventListener("click", () => {
  const isDark = !document.body.classList.contains("dark-mode");

  applyTheme(isDark);
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

// ---------- 3. Projects page: load repositories from the GitHub API ----------
const repoContainer = document.querySelector("#github-repositories");

// The repositories I want to show (owner/name on GitHub + a nicer title)
const selectedRepos = [
  { owner: "morenorodri", name: "landingpage-volvo", title: "Volvo Car Landing Page" },
  { owner: "nate1721", name: "natnael-portfolio", title: "Personal Portfolio" },
  { owner: "morenorodri", name: "quizgame-group8", title: "Quiz Game" },
  { owner: "nate1721", name: "grisspelet-grupp6", title: "Grisspelet" },
];

function createRepoCard(title, description, url) {
  const card = document.createElement("article");
  card.classList.add("github-repo-card");

  const heading = document.createElement("h3");
  heading.textContent = title;

  const text = document.createElement("p");
  text.textContent = description;

  const link = document.createElement("a");
  link.href = url;
  link.textContent = "View Code";
  link.target = "_blank";
  link.rel = "noopener noreferrer";

  card.append(heading, text, link);
  return card;
}

async function loadRepositories() {
  repoContainer.textContent = "Loading selected projects...";

  try {
    const cards = [];

    // Fetch one repository at a time
    for (const repo of selectedRepos) {
      const response = await fetch(
        `https://api.github.com/repos/${repo.owner}/${repo.name}`,
      );

      if (!response.ok) {
        throw new Error(`Could not load ${repo.name}`);
      }

      const data = await response.json();
      const description =
        data.description || "Project built with code and creativity.";

      cards.push(createRepoCard(repo.title, description, data.html_url));
    }

    // Only change the page when ALL repositories were loaded
    repoContainer.textContent = "";
    cards.forEach((card) => repoContainer.append(card));
  } catch (error) {
    repoContainer.textContent =
      "Some projects could not be loaded. Please try again later.";
    console.error("GitHub API error:", error);
  }
}

// Only runs on the projects page (the other pages have no container)
if (repoContainer) {
  loadRepositories();
}

// ---------- 4. Home page: energy burst on the profile picture ----------
const profileImage = document.querySelector(".hero img");

const particleCount = 14;

function createParticle(centerX, centerY, index) {
  const particle = document.createElement("span");
  particle.classList.add("profile-particle");

  // Spread the particles evenly around a circle
  const angle = (Math.PI * 2 * index) / particleCount;
  const distance = 55 + Math.random() * 45;

  particle.style.left = `${centerX}px`;
  particle.style.top = `${centerY}px`;
  // The CSS animation reads these two values (--x and --y)
  particle.style.setProperty("--x", `${Math.cos(angle) * distance}px`);
  particle.style.setProperty("--y", `${Math.sin(angle) * distance}px`);

  // Remove the particle when its animation is done
  particle.addEventListener("animationend", () => particle.remove());

  document.body.append(particle);
}

function energyBurst() {
  // Accessibility: no animation for visitors who turned motion off
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (reduceMotion.matches) {
    return;
  }

  // Do not start a new burst while one is already playing
  if (profileImage.classList.contains("energy-burst")) {
    return;
  }

  profileImage.classList.add("energy-burst");

  const box = profileImage.getBoundingClientRect();
  const centerX = box.left + box.width / 2;
  const centerY = box.top + box.height / 2;

  for (let i = 0; i < particleCount; i++) {
    createParticle(centerX, centerY, i);
  }
}

// Only runs on the home page
if (profileImage) {
  profileImage.addEventListener("mouseenter", energyBurst);
  profileImage.addEventListener("click", energyBurst);

  // Remove the class when the image animation has finished
  profileImage.addEventListener("animationend", () => {
    profileImage.classList.remove("energy-burst");
  });
}