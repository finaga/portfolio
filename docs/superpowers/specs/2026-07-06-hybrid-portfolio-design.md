# Hybrid Portfolio — Gallery × Folio Blend

**Date:** 2026-07-06
**Status:** Approved by André (design phase)
**Decided via:** brainstorming session with visual companion (mockups in `.superpowers/brainstorm/68202-1783373915/`)

## Why

André is targeting Design Lead roles at European renewable-energy companies. The current main portfolio (`portfolio/`, dark editorial, PR #8) carries the right content but two sibling explorations each do one thing better: **Gallery** (`gallery-src/`) has the strongest browsing experience (image-led index, GSAP Flip List/Grid toggle), and **Folio** (`folio-src/`) has the strongest reading experience (light-paper editorial case pages, masked reveals, dark footer finale). This project blends them into one site — "Two-World Hybrid" — which **becomes the main portfolio**, replacing `/portfolio/` as the site recruiters land on.

## Decisions (all confirmed with André)

| Decision | Choice |
|---|---|
| Blend direction | **C — Two-World Hybrid**: dark Gallery index for browsing → light Folio-style case pages for reading. Theme flip = navigation metaphor. |
| Placement | Hybrid becomes THE portfolio at `/portfolio/`. Old portfolio archived at `/portfolio-v1/`. Gallery + Folio stay untouched at the hub. |
| Typography | **A — Marcellus everywhere**: Marcellus (display), Hanken Grotesk (body), JetBrains Mono (labels) across both worlds. |
| Cases | 4 full cases: Farsight, Grid-Ops, Financial Losses, Growth Funnel. Content migrates **verbatim** from `portfolio/data.js` (copy is sacred — includes all PR #8 enrichment). |
| Experiments | 6, with **mini case pages**: Fit4Box, Erico Adv, Destiny-Pixel, Marathon HUD, Sofia's Pokémon math (`Projects/Sofia/Matematica/tabuada-pokemon/`), Claude token meter (ClaudeUsageMeter). Erico and Destiny-Pixel move from "light cases" to experiments. |
| About/Contact | Both carried over as pages, restyled in the hybrid's language. Copy untouched. |
| Build approach | **Grow from Gallery**: fork `gallery-src/` → `hybrid-src/`, port Folio's case-page components in. |

## §1 Structure & Navigation

```
/            Index (DARK) — List view default
/grid        Index (DARK) — Grid view via GSAP Flip toggle
/case/:slug  Case page (LIGHT) — 4 full cases
/exp/:slug   Experiment mini page (LIGHT) — 6 experiments
/about       About (LIGHT, restyled)
/contact     Contact (LIGHT, restyled)
```

- Index keeps Gallery's two modes intact: List = text index left (grouped "Cases /04", "Experiments /06") + image preview right, lime on active item; Grid = deterministic masonry (`gi--wide/left/right/mid` cycle), cases + experiments mixed with mono `CASE`/`EXPERIMENT` tags.
- Clicking any entry → light page. Dark→light flip signals "you've entered a document."
- Every light page ends in a **dark footer finale** (Folio's move): next-case/next-experiment nav + contact line. The dark world returns at the bottom of every page.
- Minimal top bar in both worlds: name (→ index), About, Contact.

## §2 Visual System

- **Dark world:** `#0f1117` bg, `#ececea` fg. **Light world:** `#f2f1ec` paper, `#0a0b0d` ink.
- **Lime `#B8FF3D` in exactly three places:** active index item, KPI numbers on case pages, availability dot. Nowhere else.
- **Type:** Marcellus display (index entries, case titles, KPI numerals) · Hanken Grotesk body · JetBrains Mono labels/metadata. Mono labels are the shared thread between worlds.
- **Motion:** index keeps Gallery's Flip toggle + clip-path image reveals + Lenis smooth scroll. Case pages inherit Folio's masked line reveals (SplitText), KPI count-ups, scrub parallax — retuned for the serif. All motion gated behind `prefers-reduced-motion` with static fallback (adopt Folio's existing architecture).

## §3 Content Model

Single `projects.js`, extending Gallery's existing shape (which already has `category`):

```js
{
  slug, title, client, year, role, scope,
  category: 'case' | 'experiment',
  abstract,                    // console-length summary
  kpis: [{ k, v, suffix }],    // 4 for cases, 2–3 for experiments
  hero, images: [...],         // Gallery's image/span system; plates + real screenshots
  liveUrl,                     // experiments with a live URL only
  deep: { context, approach, outcome, reflection }  // cases only
}
```

- Case content migrates verbatim from `portfolio/data.js` (post-PR #8 state), including real screenshots in `portfolio/assets/farsight/`, `grid-ops/`, and the `plate()` SVG artworks (factory already shared with Gallery).
- Fit4Box reuses its cut case copy, shortened to experiment scale.
- New copy needed (only): ~2-sentence abstracts for Marathon HUD, Sofia's Pokémon math, Claude token meter; shortened abstracts for Erico/Destiny-Pixel.
- New assets needed: tiles/screenshots for Sofia's Pokémon math and Claude token meter (menu bar app — needs a macOS screenshot).

## §4 Page Anatomy

**Case page (full):**
1. Light hero — mono breadcrumb, Marcellus title, meta grid (client/year/role/scope), 4 KPIs with count-up
2. Full-bleed hero image, clip reveal
3. §1 Context → §2 Approach → §3 Outcome → §4 Reflection — prose with masked line reveals, images interleaved in Folio's alternating left/right rhythm (case-v0/v1)
4. Dark footer finale — "Next case →", contact line

**Experiment mini page:** same skeleton at ~half height — reduced hero (title, 2–3 KPIs, abstract), one image row, "Visit live ↗" where `liveUrl` exists, same dark footer with next-experiment nav.

## §5 About & Contact

- **About:** light page, Marcellus wordmark hero, bio lede, stats ledger, indexed client rows. Copy ports untouched (São Paulo positioning, 20+ years, "Open Q3 2026").
- **Contact:** light page, contact cards (email copy-to-clipboard, LinkedIn, Instagram) + 14-day availability calendar, restyled. Real URLs carried over from `portfolio/`.

## §6 Tech & Deploy

- Fork `gallery-src/` → `hybrid-src/` (working name). Vite + React 18 + GSAP 3.13 (Flip, ScrollTrigger, SplitText — all free) + Lenis + React Router.
- Port Folio's case-page components (reveals, KPI count-up, alternating layout) from `folio-src/` and restyle to Marcellus.
- Build output deploys to `/portfolio/` at the hub. Old portfolio build moves to `/portfolio-v1/`. Hub `index.html` card copy updated accordingly.
- Same repo (`finaga/portfolio`), Vercel auto-deploy. Build on a branch → preview URL → merge on approval (repo's "big swings" rule).
- **Docs note:** the zero-build constraint in `portfolio/PROJECT.md`/`CLAUDE.md` applies to the old portfolio only. Hybrid is a Vite project. State this explicitly in the hybrid's own docs so future sessions don't "fix" it.

## §7 Verification

- Preview every route: index List↔Grid Flip at desktop + mobile widths, all 4 case pages, all 6 experiment pages, About, Contact.
- Check: KPI count-ups fire, reveals fire once per element, `prefers-reduced-motion` serves static content, zero console errors, images sized (no layout shift), dark-footer next-nav cycles correctly through cases and experiments respectively, lime appears only in its 3 sanctioned spots.
- Final gate: screenshot pass + Vercel preview URL for André's review before merge to `main`.

## Out of Scope

- No changes to `gallery-src/`, `folio-src/`, or their deployed builds.
- No new case copy — narrative content is migration-only.
- No CMS/backend; data stays hardcoded in `projects.js`.
- Favicon/OG treatment beyond carrying over the existing "Instrument Panel" reticle mark.
