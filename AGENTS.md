# Contributor Guide

## Scope and structure

This repository is a dependency-free static site intended for GitHub Pages. Keep deployment at the repository root and preserve relative internal paths. `index.html` contains the semantic dashboard, accessible controls, metadata, and no-JavaScript fallback; `style.css` owns the responsive monochrome visual system; `script.js` is the single interaction layer; and `grabbed.html` is a safe legacy route that redirects home. Do not change `README.md` or `license.md` unless a task explicitly asks for it.

## Content and implementation

SYLEIT.OS is deliberately playful, sparse, and mixed English/German. Keep the joke harmless: never add Robux claims, IP collection, trackers, malware-related copy, third-party runtime code, media hotlinks, or data-collection claims. UI state must stay local to the browser using the `syleit-meme-os:v1` storage namespace, with a graceful in-memory fallback.

Use plain semantic HTML, modern CSS, and vanilla JavaScript only. Keep visible controls and console commands routed through the same action functions in `script.js`; do not add inline event handlers. New copy should remain legible without JavaScript, use language attributes for non-English phrases, and avoid making meaning depend on color alone.

## Accessibility and responsiveness

Retain keyboard access, visible `:focus-visible` states, logical headings, accessible labels, and dialog focus restoration. Sound must be off by default, opt-in after a user gesture, and generated locally only. Respect `prefers-reduced-motion`, including any new interactive effect. Test the dashboard around 320px, 768px, and 1440px with no horizontal clipping.

## Validation

Before handing off, run `node --check script.js`, inspect all internal links and asset references, and serve the root with a local static server to check `/`, `/style.css`, `/script.js`, and `/grabbed.html`. Exercise each visible utility and every console command; test `Ctrl/Cmd + K`, Escape, copy feedback, the Konami sequence, disabled local storage, and no-JavaScript behavior. Keep changes limited to the requested surface and review `git diff` before committing.
