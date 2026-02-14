# Technical Documentation

## Architecture Overview
The project follows a standard static site architecture using the **Separation of Concerns** principle:
- **Structure (`index.html`)**: Semantic HTML5 tags (`<main>`, `<section>`, `<article>`) are used for accessibility and SEO.
- **Presentation (`styles.css`)**: All visual styling, including a custom Design System using CSS Variables (`:root`).
- **Behavior (`script.js`)**: Handles DOM manipulation and state management (theme).

## Design Decisions

### 1. Visual Identity ("Cyber-Minimalism")
- **Color Palette**: High contrast. Black background (`#0a0a0a`) with Acid Green (`#00ff88`) accents to signify "code/terminal" vibes.
- **Typography**: 
  - `Syne` for headers (Bold, wide, impactful).
  - `Space Grotesk` for body (Monospaced feel but readable).
- **Glassmorphism**: Used in the Navbar and Cards (`rgba(255,255,255,0.05)` + `backdrop-filter`) to create depth without clutter.

### 2. CSS-Only Animations
To maintain high performance and avoid external libraries:
- **Glitch Effect**: Uses `::before` and `::after` pseudo-elements with `clip-path` animations.
- **Floating Shapes**: Background blobs use infinite CSS animations (`transform: translate`).
- **Infinite Ticker**: A flexbox container translating X-axis infinitely.

### 3. JavaScript Interactions

#### Theme Persistence
```javascript
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);
```
- Uses `localStorage` to remember user preference across reloads.
- Toggles CSS variables via a data attribute on the `<html>` tag.

#### Scroll Reveal
- Implemented using the **Intersection Observer API**.
- Adds a `.visible` class when elements enter the viewport (threshold 0.1).
- Much more performant than listening to `window.onscroll`.

#### 3D Tilt
- Calculates mouse position relative to the card center.
- Applies `rotateX` and `rotateY` transforms dynamically.
- Resets on `mouseleave`.

## Accessibility (a11y)
- **Semantic Tags**: Used `<nav>`, `<main>`, `<footer>` instead of generic `<div>`.
- **Contrast**: Ensured text colors meet WCAG AA standards against the dark background.
- **Reduced Motion**: The custom cursor is disabled on touch devices/mobile to prevent UX issues.
- **Keyboard Nav**: Form inputs and links have clear focus states (via the custom label animation).

## Future Improvements
- Add a backend service (e.g., Formspree) to the contact form.
- Implement a true WebGL background if performance allows.
- Add project case study pages.
