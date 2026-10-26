# My Developer Portfolio

Hi! I'm Natnael, a full-stack developer student at Chas Academy.

This is my portfolio website, built as part of my individual JavaScript assignment. It introduces me, presents my skills and experience, and showcases my projects. I built it using HTML, CSS, JavaScript, and JSON.

## Live Website

[Visit my portfolio](https://nate1721.github.io/natnael-portfolio/)

## Pages

- **Home:** An introduction to me.
- **About:** My background, education, and work experience.
- **Tech Stack:** The technologies and tools I'm learning.
- **Projects:** Selected projects fetched from GitHub's API.
- **Contact:** Information on how to get in touch with me.

## Technologies

- HTML
- CSS
- JavaScript (ES2024+)
- JSON
- Fetch API
- DOM manipulation
- Git and GitHub

## Features

- Responsive layout for desktop and mobile.
- Mobile navigation menu.
- Light and dark themes.
- CV generated from a separate JSON file.
- Project information retrieved from GitHub's API.
- Loading and error messages when fetching projects.
- An empty state when no projects are available.
- Interactive profile image animation.

## Reflection

### 1. Data flow: GitHub API

On the Projects page, JavaScript uses `fetch()` to request repository information from GitHub's API. The browser sends an HTTP request, and GitHub responds with a status code and JSON data. My code checks whether the response was successful before converting it into JavaScript data using `response.json()`.

The code then reads each repository's name, description, and URL. It creates HTML elements using DOM methods and inserts them into the page. This means the project cards are generated from the API response instead of being written directly into the HTML.

### 2. Two data sources

My CV information is stored in `cv.json`, which I control and can update myself. JavaScript reads this file and generates the education and work experience sections.

The projects come from GitHub's API. Unlike my local JSON file, this information depends on an external service and can change when repositories are updated. The API request can also fail because of network problems or an unavailable repository. This is why the two data sources need different handling.

### 3. DOM manipulation and events

I use JavaScript to create elements, add content, set attributes, and insert elements into the page. This allows the CV and project information to be generated dynamically.

I also use event listeners for interactions such as opening the mobile menu, changing the theme, and triggering the profile image animation. Event listeners let the page respond to user actions instead of remaining static.

### 4. Semantic HTML and accessibility

I use semantic HTML elements to give the page a clear structure. When JavaScript generates content, I create elements such as headings, paragraphs, articles, and links instead of placing everything inside generic containers.

I also use accessible labels for interactive controls and consider keyboard navigation and reduced-motion preferences. These details matter because a website should be usable by people who navigate differently, not only by visitors using a mouse.

Before submitting, I will validate the HTML and test the interactive features using a keyboard.

### 5. Light and dark themes

The theme is controlled through CSS and JavaScript. CSS variables keep the colours in one place, while JavaScript changes a class to activate the selected theme. This makes the theme easier to maintain because I can update colours in CSS without adding individual colour values throughout the JavaScript.

I also use `localStorage` to remember the visitor's theme preference between visits in the same browser.

### 6. Handling problems during data fetching

While GitHub data is loading, the page displays a loading message so the visitor knows that something is happening. If the request fails, the page displays an error message rather than leaving the visitor with a blank section.

I also added an empty-state check for situations where there are no projects to display. These states make the page easier to understand when something unexpected happens.

A slow response can still delay the results, so one improvement would be to add a timeout or another way to handle requests that take too long.

### 7. Strengths and improvements

One strength of my portfolio is that it separates content from presentation and uses JavaScript to generate dynamic content. The website also has responsive layouts and interactive features.

If I had more time, I would improve the data-fetching logic so it could handle individual repository failures more gracefully. I would also expand my accessibility testing, particularly keyboard navigation and colour contrast, to make sure the whole website is usable.

### 8. Use of AI tools

I used ChatGPT to help me understand JavaScript, review code, and identify possible improvements. I did not treat generated code as automatically correct. I reviewed the suggestions, adapted them to my project, and tested the functionality in the browser.

Using AI helped me work through problems, but I still need to understand how the code works so I can explain and maintain it independently.

## How to Run Locally

1. Clone this repository.
2. Open the project folder in VS Code.
3. Use the Live Server extension to run `index.html`.

## Author

**Natnael Teshome**  
Full-stack developer student at Chas Academy.