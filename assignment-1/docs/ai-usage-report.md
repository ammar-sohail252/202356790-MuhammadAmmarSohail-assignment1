# AI Usage Report

## 1. Tools Used & Use Cases

### Cursor (AI Code Editor)
- **Code Generation**: Used to scaffold the initial HTML structure and generate complex CSS keyframes for the "glitch" text effect and floating background shapes.
- **Refactoring**: Assisted in converting hardcoded values to CSS variables for easy theming (Dark/Light mode).
- **Debugging**: Helped identify why the custom cursor was causing scroll bars on mobile (solution: `overflow-x: hidden` and disabling cursor on touch devices).

### ChatGPT / Claude (Conceptualization)
- **Design Inspiration**: Asked for "creative, non-standard portfolio ideas" which led to the "Cyber/Industrial" aesthetic decision instead of a standard bootstrap look.
- **Copywriting**: Refined the resume text into punchy, marketing-style headers (e.g., "The Architect", "Data Packet").

## 2. Benefits & Challenges

### Benefits
- **Speed**: CSS animations that usually take hours to tweak (like the glitch effect) were generated in seconds.
- **Modern Practices**: AI suggested using `IntersectionObserver` for scroll reveals instead of the older `scroll` event listener approach, which improves performance.
- **Responsiveness**: Quickly generated media queries for tablet/mobile breakpoints.

### Challenges
- **Over-Engineering**: Initially, the AI suggested using WebGL (Three.js), which violated the "keep it simple/vanilla" goal. I had to restrict it to CSS-only visual effects.
- **Generic Output**: The first draft looked too generic. I had to explicitly prompt for "brutalist" and "neon" styles to get a unique look.

## 3. Learning Outcomes

- **CSS Variables**: Learned how powerful CSS variables are for dynamic theming when combined with JavaScript.
- **IntersectionObserver API**: Understood how to efficiently animate elements entering the viewport without impacting scroll performance.
- **Semantic HTML**: Reinforced the importance of accessibility (aria-labels) even when using heavy visual styling.

## 4. Responsible Use & Modifications

I ensured that all AI-generated code was reviewed and understood.
- **Modification**: The AI provided a complex JS solution for the "Ticker", but I replaced it with a pure CSS animation for better performance.
- **Verification**: I manually tested the responsive breakpoints because AI often guesses screen sizes wrong for specific designs.
- **Originality**: The core content, project descriptions, and design choice (color palette) were manually curated by me to reflect my personal brand, ensuring the portfolio is not just a template.
