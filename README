# Wanderly SPA — Technical Report

## Project overview

Wanderly is a small, responsive single-page travel-planning simulation. Visitors can browse destination ideas, filter them by category, save places to a personal planner, and navigate between sections without reloading the document.

## Project structure

```text
week-5-spa/
├── index.html             # Static application shell and shared navigation
├── styles.css             # Responsive layout, component styles, and motion
├── app.js                 # Route rendering, destination data, and planner state
└── TECHNICAL-REPORT.md    # Architecture, decisions, and testing notes
```

The app uses plain HTML, CSS, and JavaScript and does not need a framework, build step, or package installation. Destination records are held in one JavaScript array and reused by the discovery cards, category filters, and planner.

## Architecture and navigation

- `index.html` contains the persistent header, navigation, application mount point, footer, and live announcement region. The browser loads this document once.
- Routes use URL fragments (`#/home`, `#/destinations`, `#/planner`, and `#/about`). Links therefore work on static hosting without server-side URL rewrite configuration.
- JavaScript listens for `hashchange`, selects a page renderer, and replaces only the contents of `#app`. It also updates the document title, active navigation state, planner count, and mobile menu state.
- An unknown fragment displays a friendly not-found view instead of leaving an empty screen.
- Destination cards are generated from shared data. Category buttons filter that data in place.
- The planner stores destination IDs in `localStorage`, validates stored IDs when loading, and derives its list and estimated starting-price total from the shared destination data.
- Add/remove actions announce updates using an accessible live region. Navigation uses native links, buttons have accessible labels, images have alt text, and reduced-motion preferences are respected.

## Design choices

The interface uses a calm, editorial travel aesthetic: warm neutral backgrounds, deep green actions, serif display headings, and rounded destination photography. The responsive layout switches to a compact, collapsible navigation and single-column cards on smaller screens. Small hover and page-entry transitions add feedback without requiring a CSS or JavaScript animation library.

Remote Unsplash image URLs and Google Fonts are used for visual presentation. The core routes and planner logic do not depend on those assets; if a remote image or font is unavailable, the page remains usable with its fallback styling.

## Implementation challenges and approaches

1. **Keeping navigation lightweight:** Full-page navigation would undermine the SPA objective. Hash-based routes provide URL changes and back/forward support while keeping the app deployable as static files.
2. **Keeping planner UI consistent:** The planner count, saved button state, and planner page are all rendered from the same `savedTrips` state. A single toggle handler avoids separate, potentially inconsistent updates.
3. **Handling browser storage failures:** Reading and writing `localStorage` are guarded because storage can be unavailable or contain malformed data. Invalid saved IDs are discarded; write failures are logged and announced rather than pretending persistence succeeded.
4. **Supporting smaller screens and accessibility:** CSS breakpoints adapt the navigation and content layout. Buttons expose state and labels, the active route is indicated with `aria-current`, route changes are announced through `aria-live`, and reduced-motion settings disable nonessential animation.

## Testing and debugging

The following manual checks cover the main SPA workflow:

1. Open `index.html` in a modern browser or serve the project using any static HTTP server.
2. Navigate between Discover, Destinations, My planner, and Our story. Verify that the URL fragment and page title update and the document does not reload.
3. Use browser back and forward; verify that the matching view and active navigation item are restored.
4. Filter destinations by category and confirm that only matching cards remain visible.
5. Add and remove destinations. Confirm the planner badge, saved button state, planner list, and starting-price total update.
6. Reload the page and confirm saved destinations are restored from browser storage.
7. Open an unrecognized fragment such as `#/missing` and confirm the not-found view appears.
8. Resize to a narrow viewport and test the navigation toggle, cards, and planner layout.

This project has no automated test runner or external runtime dependencies; these checks are intended for browser-based verification.

## Running the project

Open `index.html` directly in a browser, or serve the folder using a static file server. For example, if Python is installed, run `python -m http.server 8000` from the project folder and visit `http://localhost:8000`.
