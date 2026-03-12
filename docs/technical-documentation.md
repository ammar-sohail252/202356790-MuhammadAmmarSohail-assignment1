# Technical Documentation

---

## Assignment 1 – Architecture Overview

The project follows the **Separation of Concerns** principle across three files:

- **Structure (`index.html`)** – Semantic HTML5 tags (`<nav>`, `<main>`, `<section>`, `<article>`) for accessibility and SEO.
- **Presentation (`styles.css`)** – All visual styling using a custom design system built on CSS Custom Properties (`:root`).
- **Behavior (`script.js`)** – DOM manipulation, state management, and user interaction handling.

### Design System (CSS Variables)

| Token | Dark value | Light value |
|---|---|---|
| `--bg-color` | `#0a0a0a` | `#f5f5f5` |
| `--text-color` | `#f0f0f0` | `#1a1a1a` |
| `--accent-color` | `#00ff88` | `#0055ff` |
| `--secondary-color` | `#7000ff` | `#e60050` |
| `--nav-bg` | `rgba(10,10,10,0.8)` | `rgba(245,245,245,0.8)` |

The `[data-theme="light"]` selector on `<html>` overrides all tokens. JavaScript sets this attribute on toggle and persists the choice in `localStorage`.

### Assignment 1 JavaScript Features

#### Theme Persistence
```javascript
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);
```

#### Scroll Reveal
Uses the Intersection Observer API (threshold 0.1). Adds `.visible` class to trigger `opacity` and `translateY` transitions. More performant than listening to `window.onscroll`.

#### 3D Tilt
Calculates mouse position relative to the card center on `mousemove`, applies `perspective rotateX/Y` transforms. Resets on `mouseleave`.

#### Skills Ticker
Two identical `.ticker-group` blocks stacked in a flex column. The animation translates `Y` by exactly `-50%`, so group 1 exits while group 2 enters seamlessly, then the position resets. A fixed viewport height (`calc(--ticker-item-height * 5)`) ensures only one set is visible at once.

---

## Assignment 2 – Added Features

### 1. Dynamic Project Explorer

**Data layer** – Project data is extracted from HTML into a `PROJECTS` array in `script.js`. Each object stores `{ id, title, role, desc, tags, categories, visual }`.

**Rendering** – `renderProjects()` calls `getFilteredProjects()` and generates card HTML via `buildCardHTML()`. Results are injected into `#projectsGrid` using `innerHTML`. An empty-state `#projectsEmpty` element is shown/hidden based on result count.

**Filtering flow:**

```
User types in #project-search  →  searchQuery updated  →  renderProjects()
User clicks .filter-chip        →  activeFilter updated  →  renderProjects()
```

Both filters are combined in `getFilteredProjects()`:
- Category: checks if `project.categories` includes `activeFilter` (or passes when `activeFilter === 'all'`).
- Search: case-insensitive match on `title`, `role`, `desc`, and `tags`.

**Dynamic scroll reveal and tilt** – After each `renderProjects()` call, `applyScrollRevealToCards()` and `applyTiltToCards()` are called to attach the Intersection Observer and mouse listeners to the freshly created DOM nodes.

**Empty state** – `#projectsEmpty` with a `.reset-filters-btn` resets both `searchQuery` and `activeFilter`, clears the input, and re-renders.

---

### 2. Contact Form Validation & Draft Save

**Validation rules:**

| Field | Rule |
|---|---|
| Name | Minimum 2 characters after trimming |
| Email | Must match `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` |
| Message | Minimum 10 characters; maximum 500 (enforced by `maxlength`) |

`validateForm()` runs on submit. If any field fails, `setFieldError()` sets `aria-describedby` on the input, adds `.field-invalid` (red border), and injects text into the `role="alert"` span — which screen readers announce immediately.

On `input` events, `clearFieldError()` removes the error state, giving live feedback as the user corrects mistakes.

**Draft save/restore** – `saveDraft()` serializes `{ name, email, message }` to `localStorage` under the key `contactDraft`. On `DOMContentLoaded`, if a draft exists it is restored into the inputs. `clearDraft()` removes the key after a successful submission.

**Character counter** – Updates on every `input` event. Adds `.char-counter--warn` at 450 characters to warn before the 500-character limit.

**Status banner** – `#formStatus` uses `role="status"` and `aria-live="polite"`. `.form-status--success` or `.form-status--error` classes control colour. The banner auto-hides after 5 seconds.

---

### 3. Mobile Navigation

The `.hamburger` element was changed from a `<div>` to a `<button>` to fix the accessibility issue from Assignment 1 feedback.

**Toggle state management:**

```
openNav()  → adds .nav-open to #nav-links, shows overlay, sets aria-expanded="true"
closeNav() → removes .nav-open, hides overlay, sets aria-expanded="false"
```

The nav panel slides in from the right using `right: -100%` → `right: 0` with a CSS transition. The overlay (`#nav-overlay`) is a fixed, semi-transparent backdrop that closes the menu on click.

**Keyboard interaction:**
- `Escape` key triggers `closeNav()` and returns focus to the hamburger button.
- Any `.nav-link` click triggers `closeNav()` before smooth-scrolling to the section.
- Body scroll is locked (`overflow: hidden`) while the menu is open.

---

### 4. Accessibility

- **Semantic HTML**: `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`.
- **ARIA**: `aria-expanded`, `aria-controls`, `aria-label` on all interactive controls. `role="alert"` on field error messages. `role="status"` on the form status banner. `aria-live="polite"` on the char counter.
- **Focus management**: `:focus-visible` outlines on all interactive elements (2px solid `--accent-color`). Does not apply during mouse interaction, only keyboard navigation.
- **Reduced motion**: `@media (prefers-reduced-motion: reduce)` reduces all animation and transition durations to near zero and sets `scroll-behavior: auto`.
- **Custom cursor**: Disabled on touch/mobile devices (checked via `window.matchMedia("(pointer: fine)")`).

---

### 5. Testing Notes

| Test | Result |
|---|---|
| Theme toggle — dark / light | Persists across reload |
| Project search — "torch" | Shows PyTorch-tagged projects only |
| Project filter — "Computer Vision" | Shows CANDID CAM only |
| Search + filter combined | Both conditions applied |
| Empty state | Shown when no results; "Clear filters" resets correctly |
| Form: empty submit | All three error messages shown |
| Form: invalid email | Email error shown, others pass |
| Form: valid submit | Success banner shown, draft cleared |
| Form: draft restore | Values restored on page reload before submit |
| Mobile nav: open/close | Hamburger, overlay click, and Escape all work |
| Mobile nav: close on link click | Navigates and closes correctly |
| Keyboard-only navigation | Tab order logical; focus-visible outlines visible |
| Reduced-motion preference | Animations disabled when `prefers-reduced-motion: reduce` |
| Cross-browser | Chrome, Firefox, Safari (desktop and mobile) |
