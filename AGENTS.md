# Contributor Guide

## Scope and structure

This is a dependency-free static joke site deployed from the GitHub Pages repository root. `index.html` holds the visible meme collage and clearly labelled controls, `style.css` supplies the deliberately chaotic presentation, `script.js` owns all interaction logic, `assets/` contains local meme and audio files, and `grabbed.html` is a harmless legacy prank page. Keep internal paths relative. Do not change `README.md` or `license.md` unless a task explicitly requests it.

## Visual and content direction

The site should feel like a funny personal homepage made by someone experimenting with HTML and CSS, not a polished product, design-system demo, terminal UI, or neo-brutalist dashboard. Uneven rotations, clashing colors, old-web buttons, oversized type, visual overlap, and silly motion are intentional. Preserve the actual meme assets—especially `assets/unpleasantgradient.jpg`—instead of replacing them with generated phrases or CSS imitations.

Keep jokes concrete and recognizable. Buttons need obvious labels and immediate effects: Random Meme changes the image, Make It Worse adds visual damage, Print Bogos reveals the printer mouse and plays local audio, and rat/cheese/troll controls add those objects. Never add trackers, IP collection, fake malware downloads, runtime dependencies, or third-party media hotlinks.

## Accessibility and validation

Chaos must remain usable. Preserve semantic headings, keyboard controls, visible focus indicators, useful image alt text, an operable no-JavaScript page, and `prefers-reduced-motion`. Audio may only start after the Print Bogos button is pressed. Prevent horizontal overflow around 320px, 768px, and 1440px.

Before handoff, run `node --check script.js`, verify every local asset path, serve the repository root, and exercise Random Meme, all five damage levels, reset, printer audio, rat sizing, cheese rain, trollface, Konami mode, and `grabbed.html`. Review `git diff` and keep unrelated user files uncommitted.
