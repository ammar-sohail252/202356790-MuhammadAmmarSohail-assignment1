# Muhammad Ammar Sohail – Personal Portfolio

A personal portfolio website built with vanilla HTML, CSS, and JavaScript, showcasing my work in AI, Computer Vision, and Full Stack Development.

---

## Assignment 1 Foundation

The original portfolio established the core structure and design:

- **Cyber-Minimalist visual identity** – dark/light themes, neon accents, glitch typography
- **Custom trailing cursor**
- **Time-aware dynamic greeting** (Morning / Afternoon / Evening)
- **Dark / Light mode toggle** with `localStorage` persistence
- **Scroll-triggered reveal animations** using the Intersection Observer API
- **3D tilt effect** on project cards
- **Animated skills ticker**
- **Contact form UI** (simulated submit)
- **Experience timeline**

---

## Assignment 2 Additions

Building on Assignment 1, the following interactive features were added:

### 1. Dynamic Project Explorer
- Projects are defined in a JavaScript data array and rendered entirely by the browser.
- A **live search field** lets users search projects by title, role, description, or technology.
- **Category filter chips** (All / AI-ML / Full Stack / Computer Vision / Research) narrow results instantly.
- A clear **empty state message** with a "Clear filters" button appears when no projects match.

### 2. Interactive Contact Form with Validation
- **Client-side validation** on all fields (name length, email format, message length).
- **Inline error messages** appear beside each invalid field immediately on submit.
- **Character counter** on the message field (limit 500), turning orange as the limit approaches.
- **Draft auto-save** to `localStorage` — the form restores your progress if you leave and come back.
- **Success / error status banner** appears after submission, styled consistently with the site theme.
- The form only reports success after all fields pass validation.

### 3. Functional Mobile Navigation
- The hamburger button is now a proper `<button>` element with `aria-expanded` and `aria-controls` attributes.
- Tapping the hamburger slides in the nav panel from the right with an animated overlay.
- The menu closes on overlay click, nav link click, or pressing **Escape**.
- Body scroll is locked while the menu is open.

### 4. Accessibility Improvements
- `aria-label` added to all icon-only controls (theme toggle, social links, hamburger).
- `:focus-visible` outlines applied consistently to all interactive elements.
- `@media (prefers-reduced-motion: reduce)` disables animations for users who prefer it.
- All new form error regions use `role="alert"` so screen readers announce them automatically.

---

## Tech Stack

- **HTML5** — Semantic structure, ARIA attributes
- **CSS3** — Custom variables, Grid/Flexbox, animations, glassmorphism
- **JavaScript (ES6+)** — DOM manipulation, Intersection Observer, LocalStorage, client-side validation
- **No frameworks** — Pure vanilla implementation

---

## Folder Structure

```
363a1/
├── index.html              # Main entry point
├── css/
│   └── styles.css          # All styles and animations
├── js/
│   └── script.js           # All interactions and data
├── assets/
│   └── images/             # Static assets
├── docs/
│   ├── ai-usage-report.md       # AI tools documentation
│   └── technical-documentation.md  # Implementation details
└── README.md
```

---

## Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ammar-sohail252/202356790-MuhammadAmmarSohail-assignment2.git
   ```
2. **Navigate to the folder**:
   ```bash
   cd 202356790-MuhammadAmmarSohail-assignment2
   ```
3. **Open in browser**:
   - Open `index.html` directly in any modern browser.
   - Or use the VS Code Live Server extension for automatic reload.

No build step, no dependencies, no installation required.

---

## User Guide

| Feature | How to use |
|---|---|
| **Dark / Light mode** | Click the moon / sun icon in the top-right corner of the navbar. Preference is remembered across visits. |
| **Mobile nav** | On screens ≤ 768 px, tap the hamburger icon (top-right) to open the nav panel. Tap the overlay, a nav link, or press Escape to close. |
| **Project search** | Type in the search box above the projects to filter by title, role, description, or technology. |
| **Project filters** | Click any category chip (AI / ML, Full Stack, etc.) to show only matching projects. Chips and search can be combined. |
| **Contact form** | Fill in your name, email, and message. Errors appear immediately if any field is invalid. Your draft is auto-saved — it will be restored if you reload the page. |

---

## AI Usage Summary

AI tools (Cursor/Claude) were used to:
- Generate and debug JavaScript logic for the project explorer, filter system, and form validation.
- Suggest accessible markup patterns (`aria-expanded`, `role="alert"`, `:focus-visible`).
- Review and revise documentation drafts for clarity.

*(Full details in `docs/ai-usage-report.md`)*

---

## Live Deployment

[GitHub Pages link – to be added after submission]
