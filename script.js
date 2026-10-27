// script.js - runs on every page.
// The HTML is loaded before this script runs because the script tag uses "defer".

// ---------- 1. Mobile navigation ----------

const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-navigation");

function closeMenu() {
  if (!menuToggle || !navigation) return;

  navigation.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
}

function openMenu() {
  if (!menuToggle || !navigation) return;

  navigation.classList.add("is-open");
  menuToggle.setAttribute("aria-expanded", "true");
  menuToggle.setAttribute("aria-label", "Close navigation menu");
}

if (menuToggle && navigation) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navigation.classList.contains("is-open");

    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 700) {
      closeMenu();
    }
  });
}

// ---------- 2. Light and dark theme ----------

const themeToggle = document.querySelector(".theme-toggle");

function applyTheme(isDark) {
  document.documentElement.classList.toggle("dark-mode", isDark);

  if (!themeToggle) return;

  themeToggle.textContent = isDark ? "☀️" : "🌙";
  themeToggle.setAttribute(
    "aria-label",
    isDark ? "Switch to light mode" : "Switch to dark mode",
  );
  themeToggle.setAttribute("aria-pressed", String(isDark));
}

let savedTheme = "light";

try {
  savedTheme = localStorage.getItem("theme") || "light";
} catch (error) {
  console.warn("Theme preference could not be read from storage.");
}

applyTheme(savedTheme === "dark");

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isDark = !document.documentElement.classList.contains("dark-mode");

    applyTheme(isDark);

    try {
      localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch (error) {
      console.warn("Theme preference could not be saved.");
    }
  });
}

// ---------- 3. Projects: GitHub API ----------

const repoContainer = document.querySelector("#github-repositories");

const selectedRepos = [
  {
    owner: "morenorodri",
    name: "landingpage-volvo",
    title: "Volvo Car Landing Page",
  },
  {
    owner: "nate1721",
    name: "natnael-portfolio",
    title: "Personal Portfolio",
  },
  {
    owner: "morenorodri",
    name: "quizgame-group8",
    title: "Quiz Game",
  },
  {
    owner: "nate1721",
    name: "grisspelet-grupp6",
    title: "Grisspelet",
  },
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

async function fetchRepository(repo) {
  const response = await fetch(
    `https://api.github.com/repos/${repo.owner}/${repo.name}`,
    {
      signal: AbortSignal.timeout(8000),
    },
  );

  if (!response.ok) {
    throw new Error(`GitHub returned HTTP ${response.status}`);
  }

  const data = await response.json();

  if (!data.html_url) {
    throw new Error("The repository URL is missing.");
  }

  return createRepoCard(
    repo.title,
    data.description || "Project built with code and creativity.",
    data.html_url,
  );
}

async function loadRepositories() {
  if (!repoContainer) return;

  repoContainer.setAttribute("aria-live", "polite");
  repoContainer.setAttribute("aria-busy", "true");
  repoContainer.textContent = "Loading selected projects...";

  try {
    const results = await Promise.allSettled(
      selectedRepos.map((repo) => fetchRepository(repo)),
    );

    const cards = [];
    let failedCount = 0;

    results.forEach((result, index) => {
      if (result.status === "fulfilled") {
        cards.push(result.value);
      } else {
        failedCount++;
        console.error(
          `Could not load ${selectedRepos[index].name}:`,
          result.reason,
        );
      }
    });

    repoContainer.textContent = "";

    if (cards.length === 0) {
      const message = document.createElement("p");
      message.textContent =
        failedCount === 0
          ? "No projects are available yet."
          : "Projects could not be loaded right now. Please try again later.";

      repoContainer.append(message);
      return;
    }

    cards.forEach((card) => repoContainer.append(card));

    if (failedCount > 0) {
      const message = document.createElement("p");
      message.textContent =
        "Some projects could not be loaded. The available projects are shown above.";

      repoContainer.append(message);
    }
  } catch (error) {
    // Fallback for an unexpected error outside individual requests.
    console.error("Unexpected projects loading error:", error);
    repoContainer.textContent =
      "Projects could not be loaded right now. Please try again later.";
  } finally {
    repoContainer.setAttribute("aria-busy", "false");
  }
}

if (repoContainer) {
  loadRepositories();
}

// ---------- 4. Home page: profile image animation ----------

const profileImage = document.querySelector(".hero img");
const particleCount = 14;

function createParticle(centerX, centerY, index) {
  const particle = document.createElement("span");
  particle.classList.add("profile-particle");

  const angle = (Math.PI * 2 * index) / particleCount;
  const distance = 55 + Math.random() * 45;

  particle.style.left = `${centerX}px`;
  particle.style.top = `${centerY}px`;

  particle.style.setProperty("--x", `${Math.cos(angle) * distance}px`);
  particle.style.setProperty("--y", `${Math.sin(angle) * distance}px`);

  particle.addEventListener("animationend", () => particle.remove());

  document.body.append(particle);
}

function energyBurst() {
  if (!profileImage) return;

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  );

  if (reduceMotion.matches) return;
  if (profileImage.classList.contains("energy-burst")) return;

  profileImage.classList.add("energy-burst");

  const box = profileImage.getBoundingClientRect();
  const centerX = box.left + box.width / 2;
  const centerY = box.top + box.height / 2;

  for (let index = 0; index < particleCount; index++) {
    createParticle(centerX, centerY, index);
  }
}

if (profileImage) {
  profileImage.addEventListener("mouseenter", energyBurst);
  profileImage.addEventListener("click", energyBurst);

  // Allow keyboard users to trigger the effect if the image is focusable.
  profileImage.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      energyBurst();
    }
  });

  profileImage.addEventListener("animationend", () => {
    profileImage.classList.remove("energy-burst");
  });
}