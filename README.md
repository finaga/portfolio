# Portfolio 2026

André Finageiv's design portfolio — product design, enterprise SaaS, growth, and brand work.

**Live →** https://portfolio-finaga-5767s-projects.vercel.app

---

## What this is

Four case studies + About + Contact, each with a slide-up deep-dive panel. Editorial-luxury visual system with a cockpit-style statusbar. Based in São Paulo.

- `001` BaxEnergy Farsight — enterprise SaaS
- `002` BaxEnergy Grid-Ops — enterprise SaaS
- `003` Toptal Growth — growth
- `004` Fit4Box — brand

## Stack

- **React 18** via UMD CDN
- **Babel Standalone** compiles `.jsx` at runtime
- Plain CSS with custom properties
- **Zero build step** — no bundler, no `package.json`, no runtime dependencies

The constraint is deliberate: a portfolio shouldn't need `npm install` to open. Every file here is human-editable and browser-runnable as-is.

## Local dev

```bash
npx serve -l 5173 .
```

Open http://localhost:5173.

## Deploy

Static host. Currently deploying on Vercel via GitHub integration — every push to `main` auto-deploys production. See [`DEPLOY.md`](./DEPLOY.md) for details and alternatives (Netlify, CLI).

## Structure

```
index.html          # shell — script/stylesheet load order matters
app.jsx             # top-level state, routing, keyboard, theme
data.js             # case content + editorial SVG plate factory
components/         # Shell, Viewport, Console, DeepDive, AboutPage, ContactPage
css/                # tokens, shell, work, deepdive, pages, about, contact, responsive
assets/             # hero imagery per case
```

Internal design-system notes and session history live in [`PROJECT.md`](./PROJECT.md).

---

© André Finageiv
