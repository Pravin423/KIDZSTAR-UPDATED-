# Task: Disable Navbar Color Change on About Us Page

## Objective
Prevent the Navbar from changing its background color to dark blue while scrolling on the About Us page, specifically during the zoom animation. Also ensure the text color in the animation matches the user's preference (White text with Gray shadow) using ONLY Tailwind CSS (no external CSS).

## Changes Made

### 1. Modified `src/components/Navbar.js`
- Added a `disableScrollEffect` prop (defaulting to `false`).
- Updated the `useEffect` hook to skip the scroll event listener if `disableScrollEffect` is true.
- Updated the `nav` className logic to check `!disableScrollEffect` before applying the darkened background class.

### 2. Modified `src/pages/about.js`
- Passed `disableScrollEffect={true}` to the `<Navbar />` component.
- **Replaced external CSS classes with inline Tailwind arbitrary values.**
    - Replaced `text-shadow-glow-blue` and `text-shadow-glow-yellow` with `text-white [text-shadow:...]`.
    - The shadow value is inlined directly in the className: `[text-shadow:6px_6px_#808080,5px_5px_#808080,...]`.

### 3. Modified `src/styles/globals.css`
- **Removed** `.text-shadow-glow-blue` and `.text-shadow-glow-yellow` classes entirely, as requested ("no external css").

## Result
The Navbar will now remain transparent on the About Us page regardless of scroll position. The animated text will appear in White with a Gray shadow/glow using purely inline Tailwind classes.
