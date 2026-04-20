# Portfolio 2026 — Project Context

Snapshot as of 2026-04-20. Read this first before making any changes.

---

## ⚠ Rule — this file IS the project memory

**Every change, decision, correction, or new constraint made in this project MUST be appended to this file.** This is Claude's external memory for the Portfolio — across sessions, there is no other source of truth for intent, rationale, or history.

How to write to it:
- **Session log** goes in the `Session history` section, dated, as a bulleted list — what changed and *why*.
- **Durable constraints** (things that must remain true in future sessions) go in `Non-negotiable constraints` or the relevant design section above.
- **Open questions / carry-forwards** go in `Known carry-forwards`.
- **Be synthetic, not exhaustive.** Lead with the outcome. One line per change unless the *why* needs a sentence.
- Never delete prior log entries — supersede them with a new dated note instead.
- Update this file *in the same turn* as the change, not "later".

---

## What this is

André Finageiv's personal design portfolio. Editorial-luxury aesthetic inspired by Italian fashion case sites. Four case studies + About + Contact + Deep-dive.

- **User / subject**: André Finageiv. 20+ yr product designer. **Based in São Paulo, Brazil** (23.55°S 46.63°W — NOT Lisbon; we corrected this). Leads design ops for Farsight at BaxEnergy (a Yokogawa company). Runs Fit4Box (Crossfit apparel). Primary email `hello@finageiv.com`, personal `finaga@gmail.com`.
- **Availability**: one senior engagement open Q3 2026.
- **Destination URL**: likely `finageiv.com` (or Vercel subdomain for now).

---

## Non-negotiable constraints

- **Zero build step.** React 18 via CDN + Babel Standalone compiles `.jsx` at runtime. Do NOT introduce Vite, Webpack, etc.
- **No new dependencies.** No icon libraries, no CSS-in-JS, no state managers. Pure React hooks, CSS custom properties.
- **Copy is sacred.** Don't rewrite user-facing text unless explicitly asked. Case abstracts, KPI numbers, bios, role/scope — all are André's voice.
- **Lime accent discipline.** `#B8FF3D` appears only on: active nav button, active project-tab (folio + label + bottom rule), LIVE dot in statusbar, AF-mark-style signature moments, lime pull-quote ("TWENTY YEARS DOING IT." on About), Q3 accent on Contact, hollow-outline on READ FULL CASE CTA. Do not over-lime.
- **Use CSS variables, not hex.** All colors go through `var(--bg)`, `var(--fg)`, `var(--rule)`, `var(--muted)`, `var(--dim)`, `var(--lime)`.
- **Preserve São Paulo positioning.** User is in São Paulo. Any "Lisbon" reference is a bug — always correct.
- **GitHub account — NEVER `AndreFinageiv`.** That's André's BaxEnergy (work) account. The portfolio is personal. Before any `gh` / `git push` to a GitHub remote, verify `gh auth status` shows a personal account. If only `AndreFinageiv` is logged in, stop and ask which account to use — don't push speculatively.
- **Git author identity — the global config on this machine is the WORK identity** (`AndreFinageiv <andre.finageiv@baxenergy.com>`). This repo has local overrides set (`finaga <finaga@gmail.com>`). For any new personal repo created on this machine, Claude must set local `user.name` / `user.email` **before the first commit**, or commits will be mis-attributed. Do not "fix" by setting global — that would corrupt work repos.

---

## Tech stack

| Concern | Choice |
|---|---|
| Framework | React 18 via UMD CDN |
| JSX compile | Babel Standalone at runtime |
| Styling | Plain CSS with custom properties |
| Build | **None** — serve `portfolio/` as static files |
| Dev server | `npx serve` (launch.json in `.claude/`) or `python3 -m http.server` |
| Preview | `preview_*` MCP tools, served at `/portfolio/` subpath |
| Deploy | Vercel (`vercel.json` present); Netlify via drag-drop alt |

---

## File tree (post-split architecture)

```
portfolio/
├── index.html               # shell: meta, script tags (per-component), CSS links (per-partial)
├── app.jsx                  # top-level state, routing, keyboard, global wheel handler, theme,
│                            # aria-live, prefers-reduced-motion gating
├── data.js                  # 4 cases with hero/kpis/deep.context/approach/outcome/reflection/
│                            # impact/plates. `plate()` factory generates editorial SVG plates
│                            # for the deep-dive thumbs.
├── vercel.json              # deploy config (cleanUrls + asset cache headers)
├── DEPLOY.md                # 5-line deploy instructions (Vercel primary, Netlify alt)
├── PROJECT.md               # THIS FILE
│
├── assets/
│   ├── bg-farsight.jpg      # 867K — architectural facade (real hero for 001)
│   ├── bg-grid-ops.jpg      # 155K — industrial control-room
│   ├── bg-toptal.jpg        # 195K — earth-from-space (global talent)
│   └── bg-fit4box.jpg       # 295K — gym battle-rope athlete
│
├── components/
│   ├── Shell.jsx            # StatusBar (with live São Paulo clock + blinking cursor),
│   │                        # SteppedCounter, ProjectTabs, ScrollCue.
│   │                        # NOTE: AFMark was removed in session 2026-04-19.
│   ├── Viewport.jsx         # left pane: breadcrumb, big number, hero image + scrim
│   ├── Console.jsx          # right pane: title, meta, KPIs, abstract, CTA, next-nav
│   ├── DeepDive.jsx         # slide-up panel with sticky §1-§4 TOC, scrollspy,
│   │                        # "What this enabled", colophon with ↑ TOP back-to-top
│   ├── AboutPage.jsx        # 12-col editorial spread
│   └── ContactPage.jsx      # cards + 14-day calendar with click-to-mailto per slot
│
└── css/
    ├── tokens.css           # :root vars, html/body, theme attributes, focus-visible,
    │                        # sr-only utility, prefers-reduced-motion global gate
    ├── shell.css            # topbar, stage, project-tabs (AT TOP, not bottom),
    │                        # statusbar, tweaks, fadeUp, grid-overlay, grid-debug
    ├── work.css             # split, viewport, console, kpis, CTA (hollow-outline)
    ├── deepdive.css         # deepdive, sticky TOC, plates, enabled-list, colophon
    ├── pages.css            # shared .page-hero base for About/Contact
    ├── about.css            # 12-col spread, hero, bio, pull-quote, stats rail, clients
    ├── contact.css          # contact-cards, availability, cal-strip
    └── responsive.css       # @media (max-width: 900px) — mobile overrides
```

Script and stylesheet load order matters (runtime compilation, globals via `window.`). Order is set in `index.html`.

---

## Design tokens (authoritative, in `css/tokens.css`)

### Colors
- `--ink: #050608` (deepest), `--bone: #ECECEA`, `--lime: #B8FF3D`, `--lime-2: #9EEA1E`
- **Dark bg uses `#0f1117`** (slightly lighter than `--ink` — user asked for "almost black, not black")
- Semantic (theme-aware): `--bg`, `--fg`, `--rule`, `--muted`, `--dim`

### Typography
- `--ff-display: 'Big Shoulders'` (headlines, numbers, display)
- `--ff-sans: 'Space Grotesk'` (body, sub)
- `--ff-mono: 'JetBrains Mono'` (labels, mono readouts)

### Motion
- `--ease: cubic-bezier(0.625, 0.05, 0, 1)`
- `--dur-enter: 0.8s` · `--dur-hover: 0.6s` · `--dur-theme: 0.6s`

---

## Layout & behavior decisions

### Layout zones (desktop)
| Zone | Top | Bottom | Height |
|---|---|---|---|
| Topbar | 0 | 56px | 56px fixed |
| Project tabs | 56px | 100px | 44px fixed (**relocated from bottom → top** on 2026-04-19) |
| Split (viewport + console) | 100px | `100vh - 28px` | `calc(100vh - 128px)` |
| Statusbar | `100vh - 28px` | `100vh` | 28px fixed |

### Theme
- **All Work cases are DARK** (`#0f1117` bg) — previously alternating dark/light; user preferred uniform dark.
- **About: dark. Contact: light.**
- Theme applied to both `html[data-theme]` and `body[data-theme]` in a `useEffect`.
- NO `transition: background ...` on html/body (caused a stuck-bg bug with the cubic-bezier ease).

### Scroll behavior
- Global `wheel` listener on `window` drives `consoleRef.current.scrollTop`. Console scrollbar hidden.
- Scrolling past console bottom (`remaining < 80px`) pulls the deep-dive up.
- In deep-dive, scrolling up from its top closes it AND resets console scrollTop to 0.
- Also: Enter opens deep-dive; Escape closes.

### Topbar
- 2-col grid (`1fr 1fr`): name left, nav right.
- "ANDRÉ FINAGEIV" (left) is a `<button.t-left>` — clicking goes Home (Work view + `goToCase(0)`). Hover = lime.
- **No more "Portfolio · 2026" center** — removed on 2026-04-19.
- Nav right: WORK · ABOUT · CONTACT. Active = lime + underline.

### Project tabs
- `01 BAXENERGY FARSIGHT · SAAS` pattern — folio + label + domain.
- Active state: lime folio + lime label + lime rule at the bottom of the tab.
- Separators are 0.5px hairlines.

### Statusbar (cockpit readouts)
- `SYS / HH:MM:SS ▍` (live clock, São Paulo local, with blinking mono cursor)
- `LOC / SÃO PAULO · 23.55°S 46.63°W`
- `FILE / PORTFOLIO.2026`
- `● LIVE` (lime dot, pulses)

### Deep-dive
- Slide-up panel, `translateY(100%) → 0` at 0.8s with `--ease`.
- Sticky TOC on the left: `§1 CONTEXT`, `§2 APPROACH`, `§3 OUTCOME`, `§4 REFLECTION` — active item shows lime `§N` marker via scrollspy.
- "What this enabled /" list replaces duplicate mini-KPIs (human-legible one-liner per metric).
- Colophon at bottom with `END · NNN / PROJECT` + `↑ TOP` back-to-top.

### About
- 12-col editorial spread.
- Hero: folio `/ 00`, eyebrow `§ ABOUT / PROFILE`, locator `§ SÃO PAULO · BR · 2026`, massive wordmark.
- Bio column with display lede "I DESIGN SOFTWARE." + lime pull-quote "TWENTY YEARS DOING IT.".
- Role/Base/Status meta rail with green `Open · Q3 2026` dot.
- `§01 BIO · §02 STATS · §03 CLIENTS` index rail.
- 4-wide stats ledger. Indexed client wordmark rows with year columns.
- **No AF mark** — removed per user on 2026-04-19.

### Contact (light theme)
- Real URLs: mailto, `https://linkedin.com/in/andrefinageiv/`, `https://instagram.com/af.design`.
- Email card click → `navigator.clipboard.writeText('hello@finageiv.com')`, shows `→ Copied ✓` (lime-2) for 1.5s. Cmd/Ctrl-click bypasses to native mailto.
- Calendar cells are `<button>` elements. Open slots clickable → open mailto with prefilled `Proposed slot: <date>`. Filled/weekend cells are `disabled`.
- `OPEN FOR Q3` avail-big with lime `Q3` accent.

### Accessibility
- `:focus-visible` lime outline (lime-2 in light theme).
- `aria-live="polite"` region in `app.jsx` announces view + case changes.
- `@media (prefers-reduced-motion: reduce)` in tokens.css disables fadeUp, pulse, wipe, deepdive slide; `app.jsx` `goToCase` short-circuits the wipe under reduced-motion.

### Branding assets
- **No favicon, no OG image, no apple-touch-icon.** All were derived from the AFMark which was removed on 2026-04-19. `index.html` has `og:title/description/url` but no `og:image`. Twitter card downgraded to `summary`. A new favicon/OG treatment is TBD.

---

## Session history — what has been decided

### Initial brief (prior session)
- Fetched Portfolio Hi-Fi.html prototype, applied editorial-luxury redesign
- Adopted Finaga design system's typography + neutrals (NOT its brutalist aesthetic)
- Added SYS/NOMINAL cockpit statusbar
- Added BG image for case 001 Farsight
- Fixed viewport + scrollable console + deep-dive slide trigger

### Session 2026-04-20
- Added the **"this file IS the project memory" rule** at the top. Every future change must be logged here in the same turn.
- Fixed `.claude/launch.json`: was `npm run dev` at :5173 but there's no `package.json` (zero-build site). Switched to `npx serve -l 5173 .`.
- Killed a stale Vite process (PID 75274) that had been running since 2026-04-06 from a ghost `node_modules/` — it was holding port 5173 and throwing a Cannot-find-module error on every request. Static serving works now; preview boots cleanly.
- Confirmed Farsight case 001 renders correctly (hero image, KPIs, abstract, lime READ FULL CASE CTA, São Paulo statusbar clock).
- **Initialized git** (`main` branch). User asked for a "Next.js" `.gitignore` — flagged that this isn't Next.js, went with a static-site `.gitignore` instead. Ignored: `node_modules/`, `.vite/`, `OLD test/` (legacy Vite scaffold), `.vercel/`, `.DS_Store`, `.env*`, `.claude/settings.local.json`, editor junk. Made first commit: `initial commit`.
- **Created GitHub repo**: [`AndreFinageiv/portfolio`](https://github.com/AndreFinageiv/portfolio) — **public**, `main` tracked to `origin/main`. First push complete.
- **Reverted**: the `AndreFinageiv` GitHub account is André's **BaxEnergy work account**, not personal. Portfolio should never live there. Removed the `origin` remote locally. Repo deletion on GitHub is pending — token lacked `delete_repo` scope; user to delete via web UI or via `gh auth refresh -h github.com -s delete_repo`. **Rule added above**: future GitHub operations must target André's personal account, not `AndreFinageiv`.
- **Wrong repo confirmed deleted** (user handled via web UI). `gh auth login --web` added `finaga` to the keyring; `finaga` is now the active account, `AndreFinageiv` remains present but inactive.
- **Re-created repo on correct account**: [`finaga/portfolio`](https://github.com/finaga/portfolio) — **public**, `main` tracked to `origin/main`. Push successful.
- **Fixed git author identity** — global git config on this machine is `AndreFinageiv <andre.finageiv@baxenergy.com>` (work), so the first 3 commits pushed under that identity. Set **local** (repo-scoped) config to `finaga <finaga@gmail.com>`, rebased `--root` to reauthor all 3 existing commits with `--reset-author`, then `git push --force-with-lease`. History is clean: `d9e9a24` `2126e67` `f40ffc0` all authored as `finaga`. **Global config intentionally left as `AndreFinageiv`** — protects BaxEnergy work repos on this machine from accidental personal attribution.

### Session 2026-04-19
_(prior session — summary only, not live)_
- Changed theme from alternating dark/light to all-dark work view
- Dark bg lifted from `#050608` → `#0f1117` ("almost black, not black")
- Global wheel handler replaces element scroll listener
- Deep-dive close-on-scroll-up + console reset-to-top
- **Refactored monolith into per-component / per-partial files (Stream 0)**
- **Ran 6 parallel sub-agent streams (A-F):**
  - A: case imagery + Viewport generalization (removed hardcoded `id === 'farsight'`)
  - B: About 12-col editorial spread
  - C: Contact real URLs + clipboard-copy + clickable calendar + São Paulo location
  - D: Deep-dive sticky TOC + §4 Reflection + "What this enabled" + editorial plate factory
  - E: Topbar hierarchy + project tabs (folio + domain) + ScrollCue + live clock
  - F: A11y + SEO meta + favicon/OG + reduced-motion + Vercel config
- Applied E's handoff: `.cta-read` switched to hollow-outline (was isolated lime fill)
- **Removed AFMark** everywhere (AboutPage hero, Shell.jsx, about.css, favicon.svg/ico, apple-touch-icon.png, og-image.svg/png, all related index.html links)
- **Relocated project-tabs from bottom to top** (below topbar). Updated .stage/.viewport/.console/.deepdive/.grid-debug offsets. Fixed mobile responsive rule too.
- **ANDRÉ FINAGEIV made clickable** → go home (Work + case 001). Hover = lime.
- **Removed "Portfolio · 2026"** center from topbar. Grid now 2-col.
- **Corrected all Lisbon references to São Paulo** (About locator, Base meta, bio paragraph).

---

## Known carry-forwards (small, not blocking)

- Mobile (≤900px): SCROLL cue overlaps right-edge KPI; console bleeds under fixed statusbar when scrolled long. Acceptable for now.
- A11y (for strict WCAG AA): no page-level `<h1>` anywhere; Tweaks panel range input lacks `for`/`id` association.
- No favicon / OG image currently — need a new treatment now that AFMark is gone.
- Deep-dive plate thumbs are editorial SVG composites — not real screens. Upgrade path is real project screenshots.
- `linkedin.com/in/andrefinageiv` URL was assumed — verify with André.

---

## Deploy

```bash
cd /Users/finaga/Library/CloudStorage/Dropbox/_PORT2023/_Port2026/portfolio
vercel --prod
```

See `DEPLOY.md` for Netlify alternative. `vercel.json` sets cleanUrls + 1-year immutable cache on `/assets/*`.
