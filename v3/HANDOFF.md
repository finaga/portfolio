# HANDOFF — v3 portfolio (Swiss poster) — session 2026-07-17

Continuation document: everything a fresh session needs to pick this up.

## The brief (user: André Finageiv, finaga@gmail.com)

Build **v3** of the portfolio: researched top Awwwards architecture portfolios,
GSAP + micro-interactions mandatory, sober palette, Swiss look with big hero
fonts, no dark theme needed, each project gets its own page, About page,
project list reused from earlier versions, mobile as good as desktop, new
folder in repo + **new Vercel project** (separate from the hub's `portfolio`
project). Design-award ambition.

**User-confirmed direction (via AskUserQuestion):**
1. Voice: **Bold Swiss poster** (not quiet-editorial)
2. Case pages: **Vertical + GSAP Flip morphs** (index thumb → case hero)
3. Palette: **strict two-color** — warm bone + soft ink, no accent at all
4. Type: **grotesk + serif pairing**

## What exists (all committed on branch `claude/portfolio-v3-design-7ekry6`)

- `v3/` — Vite + React 19 + react-router 7 + GSAP 3.15 + Lenis. Builds clean
  (`npm install && npm run build`), dev on port 5180. Zero console errors.
- Design system in `v3/src/styles/index.css`: bone `oklch(93.5% 0.012 85)` +
  ink `oklch(23% 0.008 80)`, all grays are color-mixes of the two; Bodoni Moda
  Variable (opsz) display serif + Archivo Variable grotesk (both @fontsource,
  self-hosted). Reflex-default fonts (Instrument Serif, Space Grotesk, Inter…)
  deliberately rejected per impeccable skill ban list.
- Pages: Home (poster hero ANDRÉ/*FINAGEIV*, work index 01–04 with ink-inversion
  row hovers + cursor-trailing preview, ink-drenched Experiments 05–08,
  pull-quote, giant Let's-talk footer) · `/work/:slug` ×8 · `/about` · 404.
- Motion (`src/lib/AppContext.jsx`, `src/components/Reveal.jsx`): session-once
  preloader counter, SplitText masked line reveals, Flip ghost morph
  index→hero, ink curtain route transitions, Lenis+ScrollTrigger sync,
  KPI count-ups, media clip reveals + parallax, magnetic CTA, header hides on
  scroll-down, clip-path mobile menu. Full `prefers-reduced-motion` gate.
- Plates (`src/components/Plate.jsx`): inline-SVG bone/ink system diagrams
  (module maps, alarm triage, funnels, A/B ledger…) standing in for NDA'd
  enterprise screenshots — honest visuals, two colors only.
- Data (`src/data/projects.js`): 4 cases (Farsight, Grid-Ops, Toptal, Fit4Box)
  + 4 experiments (Fluted Glass, Marathon HUD, Button System, Timeline).
  **All copy/KPIs/bio verbatim from previous versions — NEVER rewrite André's
  voice** (rule from PRODUCT.md). Experiments embed live demos via iframe from
  the hub: `https://portfolio-finaga-5767s-projects.vercel.app/...`.
- Photos in `v3/public/img/` optimized (3.1MB→650KB, mozjpeg q78 @1600px).
- `v3/scripts/fetch-assets.mjs` (prebuild): downloads photos from raw GitHub
  (pinned SHA 2bbb3d2) when absent — supports source-only file deploys; no-op
  on git checkouts.
- Verified via Playwright (chromium at /opt/pw-browsers/chromium-1194/...,
  playwright-core, dev server + screenshot script) at 1440px and 390px, all
  pages + menu + hover + morph. Fixed during iteration: clipped É accent
  (mask headroom on .line), full-bleed width bug (aspect-ratio+max-height
  transfer), hairline Bodoni +/− glyphs (KPI affixes now Archivo spans),
  mispositioned hover preview (missing left/top:0), React key warnings.

## Deployment status — THE OPEN ITEM

- User chose **option 1**: import `finaga/portfolio` at vercel.com/new with
  **Root Directory `v3`**, project name `portfolio-v3`, framework Vite.
- **Why not done by agent:** Vercel MCP connector token gets 403
  "You don't have permission to create a project" on team
  `team_y5GaYAU4NKo0bDNkPkdtKR1N` (finaga-projects) AND default scope.
  Deploying into an *existing* project may still work — only creation is blocked.
- **Production-branch nuance:** production tracks `main`; `v3/` exists only on
  `claude/portfolio-v3-design-7ekry6`. First import build may fail "v3 not
  found" → Settings → Git → Production Branch → set to the branch, redeploy.
  OR open a PR and merge to main (new folder, no conflicts — but note: pushing
  main requires explicit user permission; merging also redeploys the hub
  project, harmless but v3/ source becomes reachable under hub /v3/).
- **Fallback deploy path (tested, ready):** `deploy_to_vercel` with a 3-file
  bootstrap (package.json + bootstrap.mjs + vercel.json) that fetches the repo
  tarball at pinned SHA `d3fdc000422d1b4fcb8457950f7308157171b2f1` from
  codeload.github.com and builds v3 inside the Vercel build container. Works
  once a project named `portfolio-v3` exists. Do NOT deploy over the existing
  `portfolio` project (prj_IuRliC3CyeOTMsjyWTS2TXhkaiNZ) — that's the live hub.
- **Watcher armed:** send_later trigger `trig_018qbXLMs4wSHHBr8vjsYbGw` fires
  2026-07-17T19:14Z in the *original* session to poll for the project and
  verify (re-arms up to 3×30min). If continuing in a NEW session, that trigger
  still fires in the old one — either delete it (delete_trigger) or let it
  no-op.

## Post-deploy verification checklist (sandbox blocks vercel.app egress —
could not be tested locally; the local iframe failure was environmental)

1. Deployment READY, site renders at the prod URL (SPA rewrites from
   v3/vercel.json must be active — deep-link a case page directly).
2. The 4 experiment iframes load the live hub demos (no X-Frame-Options
   observed in repo configs, expected to work).
3. Reduced-motion, mobile menu, Flip morph on production.

## Remaining suggestions (not started)

- Case photos are stand-ins from earlier versions; real art-directed imagery
  would lift it further (layout now gives photography weight).
- Optional: add a v3 card to the hub index.html (07 entries currently) — only
  on user request; hub deploys from main.
- Optional PR for the branch — only if user asks (repo rule: never push other
  branches/main without permission).

## Key constraints (carry these forward)

- Copy is André's voice — reuse verbatim, never rewrite abstracts/KPIs/bio.
- v3 palette is strictly two colors; no lime in v3 (lime belongs to the hub /
  main portfolio identity).
- Develop ONLY on `claude/portfolio-v3-design-7ekry6`; `git push -u origin
  <branch>`; no PRs unless asked.
- The impeccable skill (.claude/skills/impeccable) governs design work here;
  PRODUCT.md + DESIGN.md are the project context (DESIGN.md describes the hub
  system, not v3 — v3 has its own system, sanctioned by user choices above).
