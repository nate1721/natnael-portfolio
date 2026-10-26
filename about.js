// about.js - loads work experience and education from cv.json
// and shows them on the About page.

const workContainer = document.querySelector("#work-experience");
const educationContainer = document.querySelector("#education-list");

// Small icons shown next to the company, location and dates
const buildingIcon =
  '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 21V3h10v6h6v12h-5v-4H9v4H4Zm3-14h2V5H7v2Zm0 4h2V9H7v2Zm0 4h2v-2H7v2Zm4-8h2V5h-2v2Zm0 4h2V9h-2v2Z"/></svg>';
const pinIcon =
  '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z"/></svg>';
const calendarIcon =
  '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 2v2H4v18h16V4h-3V2h-2v2H9V2H7Zm-1 8h12v10H6V10Z"/></svg>';

// Builds the HTML for one row (a job or a school)
function createRow(title, place, location, period, type) {
  // "type" (for example "Full Time") is optional in cv.json
  const badge = type ? `<span class="cv-badge">${type}</span>` : "";

  return `
    <article class="cv-item">
      <h3>${title}</h3>
      ${badge}
      <p class="cv-meta">
        <span>${buildingIcon}${place}</span>
        <span>${pinIcon}${location}</span>
      </p>
      <p class="cv-period">${calendarIcon}${period}</p>
    </article>
  `;
}

async function loadCv() {
  workContainer.textContent = "Loading work experience...";
  educationContainer.textContent = "Loading education...";

  try {
    const response = await fetch("./cv.json");

    if (!response.ok) {
      throw new Error("Failed to load cv.json");
    }

    // Destructuring: take the two arrays out of the JSON object
    const { workExperience, education } = await response.json();

    // map() makes one HTML string per item, join() puts them together
    workContainer.innerHTML = workExperience
      .map(({ role, company, location, period, type }) =>
        createRow(role, company, location, period, type),
      )
      .join("");

    educationContainer.innerHTML = education
      .map(({ title, school, location, period, type }) =>
        createRow(title, school, location, period, type),
      )
      .join("");
  } catch (error) {
    console.error("CV loading failed:", error);

    workContainer.textContent =
      "Could not load work experience. Please try again later.";
    educationContainer.textContent =
      "Could not load education. Please try again later.";
  }
}

loadCv();