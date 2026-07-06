# CLAUDE.md — Hybrid Portfolio (Gallery × Folio)

The **main portfolio** since 2026-07. Design spec: `../docs/superpowers/specs/2026-07-06-hybrid-portfolio-design.md` — read it for every design decision and its rationale.

## What this is

The "Two-World Hybrid": a **dark image-led index** (grown from `gallery-src/` — GSAP Flip List/Grid toggle, Lenis, masonry) that opens into **light paper editorial case pages** (ported from `folio-src/` — masked line reveals, KPI count-ups, clip-path media reveals, dark footer finale). The dark→light flip is the navigation metaphor. Theme is **route-driven, not a user preference** — see `src/lib/ThemeProvider.jsx`; do not add a theme toggle.

## Hard constraints

- **This is a Vite project.** The zero-build rule in `portfolio-v1/PROJECT.md` belongs to the OLD portfolio only — do not "fix" this one by removing the build.
- **Copy is sacred.** All case narrative, KPIs, abstracts in `src/data/projects.js` are André's voice, migrated verbatim from the old portfolio. Don't rewrite unless asked.
- **Marcellus everywhere** — display type in both worlds. Hanken Grotesk body, JetBrains Mono labels (the thread stitching the two worlds).
- **Lime `#B8FF3D` is scarce**: active index item (dark), dark-footer availability + next-hover. KPI numerals stay ink on paper — lime fails contrast on the light world.
- **Cases vs experiments**: `category` field in `projects.js`. Cases get full deep-dive pages (`/case/:slug`), experiments get mini pages (`/exp/:slug`). Legacy `/project/:slug` redirects by category.
- GitHub identity rules are the same as the rest of this repo — see `portfolio-v1/PROJECT.md § Non-negotiable constraints` (never push as `AndreFinageiv`).

## Commands

```bash
npm run dev      # dev server (port 5177)
npm run build    # production build, base=/portfolio/
```

**Deploy**: build output is committed to the repo at `/portfolio/` (same pattern as `/gallery/`). After changing source: `npm run build && rm -rf ../portfolio && cp -R dist ../portfolio`, commit both. Root `vercel.json` carries the SPA rewrites for `/portfolio/*`.

## Structure

- `src/data/projects.js` — ALL content: 4 cases (kpis + deep{context,approach,outcome,reflection} + impact) and 6 experiments (kpis + liveUrl). Helpers: `bySlug`, `nextOf` (cyclic next within category), `pathFor` (route by category).
- `src/pages/Index.jsx` — dark index, List/Grid + Flip (untouched Gallery logic).
- `src/pages/CasePage.jsx` / `ExperimentPage.jsx` — light documents; share `case.css` (`.cp` classes) and `CaseFooter` (dark finale).
- `src/lib/anim.js` — Folio's reveal language (revealLines/fadeUp/countUp/mediaReveal). All gated behind `prefers-reduced-motion` via `gsap.matchMedia`.
- `src/lib/plate.js` — SVG plate factory (includes `loss-waterfall`, `availability-gap` for the Financial Losses case).
- Live iframes on experiment pages point at hub-root paths (`/marathon-preview/`, `/tabuada-pokemon/`) — they 404 in `npm run dev` (different origin), work in production.
