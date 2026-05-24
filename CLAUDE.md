# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static marketing/pitch site for **exolab.llc** — Greg Klassen's solo R&D lab building open exoskeleton control systems for SCA3 (neurological mobility). Target audience: researchers, clinicians, engineers, investors, and the ataxia community.

## Architecture

Single-file static site: **everything is in `index.html`** — all CSS (`<style>`), all JS (`<script>`), and all markup. No build process, no dependencies, no backend.

**Fonts** (Google Fonts, loaded in `<head>`):
- `Orbitron` — display/headings (`--font-display`)
- `DM Mono` — labels, code-style UI (`--font-mono`)
- `Syne` — body text (`--font-body`)

**Color tokens** (CSS custom properties in `:root`):
- `--teal: #00e5c8` — primary accent
- `--amber: #f0a500` — budget/status callouts
- `--bg / --bg2 / --bg3` — dark background layers

**Page sections** (nav anchor IDs): `#hero`, `#about`, `#gallery`, `#labdoc`, `#skills`, `#roadmap`, `#resources`, `#contact`

**JS features** (all vanilla, no libraries):
- Custom cursor (`#cursor`, `#cursorDot`)
- Scroll reveal (`IntersectionObserver` on `.reveal` elements)
- Skill bar animations (triggered when `.dsp-card` enters viewport)
- Animated stat counters (`data-count` attribute on `.stat-num`)
- Phase tab switcher (`showPhase(n)` function, `#pd0`–`#pd4`)
- Nav opacity on scroll
- Contact form (`handleSubmit`) — **cosmetic only, no actual submission**

## Known Placeholders / TODOs

- **Contact form**: currently fakes success; needs a real backend or third-party form service (Formspree, Netlify Forms, etc.)
- **Gallery images**: two slots marked "YOUR PHOTO HERE" (lines ~924, ~938); three others use Unsplash URLs with `onerror` fallbacks
- **Hero image**: Unsplash placeholder with `onerror` fallback — replace with real photo
- **Email address**: not yet displayed on the page; contact is form-only

## Development

No build step. Preview locally:
```bash
python -m http.server 8080
# then open http://localhost:8080 in browser
```

For ChromeOS/Crostini: set up port forwarding in ChromeOS settings to reach `localhost:8080` from the Chrome browser.
