# Product

## Register

brand

## Users

- **Primary**: hiring managers, founders, and design leaders evaluating André Finageiv for a senior product-design engagement. Context: arriving from LinkedIn/referral, scanning on desktop, deciding in minutes whether the work merits a conversation.
- **Secondary**: design peers and recruiters browsing the work index.
- **Owner**: André Finageiv — 20+ yr product designer, São Paulo, Brazil. Leads design ops for Farsight at BaxEnergy (Yokogawa). One senior engagement open Q3 2026.

## Product Purpose

`finageiv.com`: a root **work index (hub)** linking to every destination page, each served at its own `/<name>/` path:

- `portfolio/` — main portfolio: four case studies + About + Contact + slide-up deep-dives (React 18 via CDN, zero build)
- `folio/` (+ `folio-src/`) — newer minimal editorial portfolio (React + GSAP, Vite-built)
- `fluted-glass/` — WebGL fluted-glass hero shader study
- `marathon-preview/` — Marathon HUD widget
- `option2/` (+ `option2-src/`) — Button System design-system app (Vite-built, output committed)

`hub-banner.js` gives every destination page a shared "← Hub" top banner. The site itself is the proof of craft. Success = the work converts the right visitor into the one open Q3 2026 engagement.

`portfolio/PROJECT.md` is the canonical AS-IS document for the main portfolio surface — read it before changing anything there. `portfolio/CLAUDE.md` binds every portfolio change to also update `PROJECT.md` in the same turn.

## Brand Personality

Editorial, precise, confident. Editorial-luxury aesthetic inspired by Italian fashion case sites, cut with instrument-panel precision (live São Paulo clock, coordinates, cockpit statusbar readouts). Dark near-black (`#0f1117`) with disciplined lime (`#B8FF3D`) accents. Big Shoulders display / Space Grotesk body / JetBrains Mono readouts on the hub and main portfolio; `folio/` explores its own editorial type system.

## Anti-references

- **Generic template portfolio**: Squarespace/Webflow-template feel, identical card grids, uppercase eyebrow kickers scaffolding every section.
- **Cold gray minimalism**: flat, colorless, ghost-minimal surfaces with no identity — the dark theme must feel authored (lime, typography, readouts), never default.

## Design Principles

1. **The portfolio is the fifth case study.** Every interaction, transition, and detail must itself demonstrate 20 years of craft — no placeholder-grade UI anywhere.
2. **Accent is earned.** Lime appears only at designated signature moments (active states, LIVE dot, pull-quotes, CTA outline). Restraint is the identity; do not over-lime.
3. **Copy is André's voice.** Never rewrite user-facing text (abstracts, KPIs, bios) unless explicitly asked.
4. **Instrument precision.** Readouts behave like real instruments — live clock, real coordinates, true URLs. Details are functional, not ornamental.
5. **Zero-friction stack per page.** Hub, portfolio, fluted-glass, marathon-preview stay zero-build (React via CDN or vanilla JS/WebGL, plain CSS). `folio-src/` and `option2-src/` are the only Vite-built exceptions; their compiled output is committed and served directly, no Vercel build step.

## Accessibility & Inclusion

Target **WCAG AA**. Already in place (main portfolio): `:focus-visible` outlines, `aria-live` view announcements, global `prefers-reduced-motion` gate. Known gaps to close over time: no page-level `<h1>` on the main portfolio, Tweaks-panel range input lacks `for`/`id` association, mobile scroll-cue/KPI overlap ≤900px. Newer surfaces (`folio/`, `option2/`) should be checked against the same bar as they mature.
