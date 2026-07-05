# folio — André Finageiv, 2026

Minimal editorial portfolio. React + Vite + GSAP.

- **Stack**: React 19, Vite, GSAP 3.13 (ScrollTrigger + SplitText, free since 3.13), self-hosted fonts via Fontsource.
- **Design system**: all foundations are CSS custom properties in `src/styles/tokens.css` (color, type scale, spacing, motion, layers). Components consume vars only — no raw hex outside tokens.
- **Brand**: paper/ink neutrals, single lime accent `#B8FF3D`, Space Grotesk + JetBrains Mono. One deliberate theme flip: light page, ink contact finale.
- **Copy**: case abstracts, KPIs, bio are André's voice, verbatim from the 2026 portfolio (`../portfolio/data.js`). Do not rewrite.
- **Motion**: masked line reveals, image clip reveals + scrub parallax, KPI count-ups. Everything gated behind `prefers-reduced-motion: no-preference`; reduced-motion and no-JS get full static content.

## Dev

```bash
npm install
npm run dev        # http://localhost:5176
npm run build      # dist/, relative base — works standalone or nested (e.g. /folio/)
```

## Deploy under the hub

Build, then copy `dist/` to a `folio/` directory at the repo root (same pattern as `option2`):

```bash
npm run build && rm -rf ../folio && cp -R dist ../folio
```
