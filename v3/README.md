# v3 — Swiss poster portfolio

The third portfolio: **bold Swiss poster** voice, strict two-color palette
(warm bone `oklch(93.5% 0.012 85)` + soft ink `oklch(23% 0.008 80)`),
Bodoni Moda display serif over Archivo grotesk, GSAP motion system.

Direction distilled from research on Awwwards-winning architecture portfolios
(MERSI, OH Architecture, Æbele Interiors, Powerhouse Company, Pelizzari).

## Anatomy

- `/` — poster hero, typographic work index (01–04) + experiments index (05–08,
  ink-drenched), pull-quote, contact footer
- `/work/:slug` — one page per project: title poster, hero media, facts grid,
  abstract (André's verbatim copy), KPI counters, editorial plates (honest
  system diagrams for NDA'd enterprise work) or a **live iframe demo** for
  experiments, next-project footer
- `/about` — bio (verbatim), portrait, stats band, clients, contact

## Motion

Lenis smooth scroll synced to GSAP ticker · SplitText masked line reveals ·
FLIP image morph from index row → case hero · ink curtain route transitions ·
clip-path menu overlay · magnetic CTA · KPI count-ups · scroll parallax on
media · header hides on scroll down, returns on scroll up ·
full `prefers-reduced-motion` gate (no Lenis, no preloader, no reveals).

## Stack

Vite + React 19 + react-router 7 + GSAP 3.15 (ScrollTrigger, SplitText, Flip
patterns) + Lenis. Fonts self-hosted via @fontsource-variable.

```bash
npm install
npm run dev      # port 5180
npm run build    # dist/
```

## Deploy

Separate Vercel project (not the hub's `portfolio` project). SPA rewrites and
asset caching live in `vercel.json`. Experiments embed the hub's live pages
(`portfolio-finaga-5767s-projects.vercel.app/...`) as iframes.
