# AI Usage Report

---

## Assignment 1

### Tools Used

#### Cursor (AI Code Editor)
- **Code generation**: Scaffolded the initial HTML structure and generated complex CSS keyframes for the glitch effect and floating background shapes.
- **Refactoring**: Assisted in converting hardcoded values to CSS variables for the dark/light theme system.
- **Debugging**: Identified the cause of scroll bars on mobile (solution: `overflow-x: hidden` and disabling the custom cursor on touch devices).

#### ChatGPT / Claude (Conceptualization)
- **Design inspiration**: Prompted with "creative, non-standard portfolio ideas" which led to the "Cyber/Industrial" aesthetic rather than a generic Bootstrap look.
- **Copywriting**: Helped draft initial section headings. These were later revised manually to tone down wording like "The Architect" and "Data Packet."

#### Documentation (Assignment 1)
The initial README and technical documentation were drafted by me and then refined using Cursor/Claude for phrasing, section structure, and completeness checks. This was not explicitly disclosed in the original report and is corrected here.

---

## Assignment 2

### Tools Used

#### Cursor / Claude (Primary)

| Task | AI contribution | Human modification |
|---|---|---|
| Project data structure | Suggested shape of `PROJECTS` array | Tailored categories and descriptions to match actual projects |
| `renderProjects()` / `buildCardHTML()` | Generated initial rendering function | Added `innerHTML` injection, revised HTML template, connected to empty state |
| Filter + search logic | Provided `filter()` + `includes()` pattern | Added combined filtering (category AND search), integrated with `renderProjects()` |
| Contact form validation | Suggested regex for email, field-check structure | Wrote `setFieldError` / `clearFieldError` helpers, added `aria-describedby` integration |
| Draft save/restore | Suggested `localStorage` pattern | Chose key name, added restore on page load, wired to form reset |
| Mobile nav toggle | Provided `aria-expanded` toggle pattern | Added Escape key handler, focus return, scroll lock, overlay click close |
| Accessibility markup | Suggested `role="alert"`, `aria-controls` | Applied selectively based on element context; avoided over-labelling |
| CSS transitions | Suggested `right: -100%` → `0` for nav slide | Tuned timing, matched existing cubic-bezier, integrated dark/light theme vars |
| `@media (prefers-reduced-motion)` | Suggested block structure | Verified scope — applied to all elements, not just animations |

#### Documentation (Assignment 2)
Both `README.md` and `technical-documentation.md` were written collaboratively — I drafted the content and structure; Claude reviewed and suggested phrasing improvements. All factual content (feature descriptions, test results, code examples) was verified and edited by me.

---

## Benefits & Challenges

### Benefits
- **Speed**: Boilerplate DOM rendering code generated quickly, letting me focus on the filtering logic and UX details.
- **Accessibility patterns**: AI provided correct ARIA attribute patterns that I might have looked up separately otherwise.
- **Debugging**: Helped identify a bug where the tilt effect did not apply to dynamically rendered cards (solution: call `applyTiltToCards()` after each `renderProjects()` call).

### Challenges
- **Over-engineering**: Initial AI suggestion for the project data layer included a full class-based model. I simplified it to a plain object array.
- **Generic validation**: First draft validation code used browser-native `reportValidity()`, which doesn't match the custom error styling. I rewrote it using manual DOM manipulation.
- **Template wording**: Earlier AI-generated copy tended toward marketing language ("The Architect," "Data Packet"). All copy was reviewed and revised to a more grounded tone.

---

## Learning Outcomes

- **Intersection Observer + dynamic DOM**: Learned that `IntersectionObserver` only works on elements present in the DOM at observation time — new cards rendered after page load need to be re-observed.
- **ARIA live regions**: Understood the difference between `aria-live="polite"`, `aria-live="assertive"`, and `role="alert"` for appropriate announcement timing.
- **localStorage granularity**: Chose per-field draft saving rather than a single serialized object to avoid accidentally restoring stale state — then revised to a single JSON object for simplicity and atomic save.
- **CSS custom properties across themes**: Using a `--accent-color-transparent` variable prevents having to write hardcoded rgba values in multiple places when the accent color changes between themes.

---

## Responsible Use Statement

All AI-generated code was reviewed, understood, and either used as-is with clear comprehension or modified to better fit the project. No AI output was submitted without understanding it. This report documents all meaningful AI contributions, including documentation assistance, so the scope of AI involvement is fully transparent.
