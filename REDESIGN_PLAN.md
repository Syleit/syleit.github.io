# Syleit Meme OS Redesign

## Summary

Rebuild the site as a responsive, monochrome-brutalist “Meme OS”: an asymmetric interactive dashboard rather than a conventional hero/CTA website. Retire the Free Robux and IP-grab premise, preserve the playful mixed German/English tone, and keep Syleit’s GitHub profile as the primary external destination.

Use plain HTML, CSS, and vanilla JavaScript with no framework, build step, tracking, or runtime dependencies.

## Implementation Changes

- Replace the homepage with a semantic OS-style interface containing:
  - A compact system bar with `SYLEIT.OS`, local time, session status, sound control, and GitHub link.
  - An artifact viewer featuring a locally rendered, CSS-based “unpleasant gradient.”
  - Meme Roulette with curated absurd events that update the interface and activity log.
  - A Bogos Binted phrase generator with a copy action.
  - Panic Mode that temporarily scrambles/inverts the interface without rapid flashing.
  - A visible console launcher plus `Ctrl/Cmd + K` command dialog.
  - Local-only visit and interaction counters clearly labelled as such.
- Support console commands: `help`, `random`, `bogos`, `panic`, `github`, `sound`, and `clear`. The console and visible controls must call the same underlying actions.
- Add an optional Konami-code easter egg that activates a temporary “BINTED protocol” state.
- Use namespaced local storage under `syleit-meme-os:v1` for visit count, interaction count, and sound preference. Gracefully fall back to in-memory state if storage is unavailable.
- Generate restrained interface sounds through the Web Audio API. Sound remains off by default, requires a user gesture, and never autoplays.
- Build a near-black/off-white visual system with hard borders, mechanical typography, sparse safety-color accents, subtle grid/scanline texture, and short snap/glitch transitions. Avoid gradients as general decoration, glassmorphism, floating cards, and generic AI-style marketing layouts.
- On narrow screens, convert the asymmetric desktop grid into a readable stacked dashboard. Preserve full keyboard operation, visible focus states, dialog focus management, and `prefers-reduced-motion`.
- Add complete metadata, viewport configuration, theme color, semantic headings, and language annotations for deliberately mixed English/German text.
- Remove all third-party media hotlinks and malware-related URLs. Replace `grabbed.html` with a lightweight legacy redirect/fallback link to the homepage so existing bookmarks do not break.
- Preserve the intent of the current uncommitted safety and viewport fixes while replacing the obsolete presentation.

## Interfaces and Repository Guidance

- Add `script.js` as the single interaction layer, organized around shared action functions and local content arrays; no exported or public JavaScript API is required.
- Keep GitHub Pages deployment from the repository root and use relative internal URLs.
- Add `AGENTS.md` documenting the static architecture, file responsibilities, mixed-language writing style, accessibility requirements, no-tracking/no-external-dependency rules, local preview command, and validation checklist.
- Leave `README.md` and `license.md` unchanged.

## Test Plan

- Verify the homepage and legacy route through a local static server and GitHub Pages-compatible relative paths.
- Test at approximately 320px, 768px, and 1440px widths with no clipped content or unintended horizontal scrolling.
- Exercise every utility through both visible controls and console commands.
- Verify keyboard navigation, `Ctrl/Cmd + K`, Escape handling, focus restoration, copy success/failure feedback, and the Konami easter egg.
- Confirm sound is opt-in, reduced-motion removes disruptive animation, and Panic Mode contains no flashing.
- Test with local storage unavailable and JavaScript disabled; core content and the GitHub link must remain usable.
- Confirm there are no console errors, third-party runtime requests, trackers, malware links, or claims that visitor data/IP information was collected.

## Assumptions

- The canonical external profile is `https://github.com/Syleit`.
- Handmade utilities and code-native visuals replace a larger meme-image gallery.
- Mixed English and German is intentional, while accessibility and metadata default to English.
- Existing uncommitted edits belong to the user and will be reconciled, never discarded blindly.
