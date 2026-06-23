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

## Design System (authoritative, in `css/tokens.css` + `css/components.css`)

All foundations are CSS custom properties in `css/tokens.css`. Reusable component primitives live in `css/components.css` under the `.ds-*` prefix. **New CSS must use tokens and (where possible) `.ds-*` primitives.** Existing hardcoded values migrate opportunistically.

### Colors
- **Neutrals** — `--ink: #050608` (deepest), `--ink-2: #0C0F14`, `--bone: #ECECEA`, `--paper: #F5F4F0`. Dark bg is `#0f1117` ("almost black, not black").
- **Accent** — `--lime: #B8FF3D` (primary signature), `--lime-2: #9EEA1E` (softer).
- **Semantic (theme-aware)** — `--bg`, `--fg`, `--rule`, `--muted`, `--dim`, `--bg-hover`, `--fg-on-lime`. Dark theme: bone fg + 10/45/30% alphas + rgba(255,255,255,0.03) hover. Light theme inverts.
- **Lime discipline** — appears only on: active nav, active project-tab (folio + label + bottom rule), LIVE dot, AFMark signature moments, lime pull-quote ("TWENTY YEARS DOING IT." on About), Q3 accent on Contact, hollow-outline on READ FULL CASE CTA. Do not over-lime.

### Typography
- **Families** — `--ff-display: 'Big Shoulders'` (condensed industrial) · `--ff-sans: 'Space Grotesk'` (geometric neo-grotesque) · `--ff-mono: 'JetBrains Mono'` (technical).
- **Size scale — fixed (body + labels)** — `--fs-micro` 9 · `--fs-xxs` 10 · `--fs-xs` 11 · `--fs-sm` 12 · `--fs-md` 14 · `--fs-lg` 16 · `--fs-xl` 18 · `--fs-2xl` 24 · `--fs-3xl` 32.
- **Size scale — fluid (display, clamp)** — `--fs-display-sm` (28–48) · `--fs-display-md` (36–56, case headline) · `--fs-display-lg` (48–80, avail-big) · `--fs-display-xl` (56–104, deep-dive §) · `--fs-display-pull` (44–96, About pull-quote) · `--fs-display-2xl` (72–148, About stats) · `--fs-display-3xl` (88–220, pages hero) · `--fs-display-ultra` (88–260, About wordmark) · `--fs-display-mega` (120–200, case number "001").
- **Weight policy** — `--fw-regular` 400 (body, ultra-display, KPI values) · `--fw-medium` 500 (mono labels, display voice with Big Shoulders) · `--fw-bold` 700 (reserved for heavier display experiments).
- **Line heights** — `--lh-tight` 1.0 · `--lh-snug` 1.1 · `--lh-heading` 1.2 · `--lh-body` 1.5 · `--lh-relaxed` 1.65.
- **Letter-spacing** — `--ls-wide` 0.12em (mono uppercase) · `--ls-normal` 0 · `--ls-tight` -0.02em (large display).
- 9 display slots currently consume `--fs-display-*` + `--fw-medium` (case name, About wordmark/lede/pull-quote, stat bignums, client wordmarks, deep-dive §, page-hero, avail-big).

### Spacing
4/8-based scale with editorial macro-steps. **12 tokens**:
`--sp-0` 0 · `--sp-1` 4 · `--sp-2` 8 · `--sp-3` 12 · `--sp-4` 16 · `--sp-5` 24 · `--sp-6` 32 · `--sp-7` 40 · `--sp-8` 48 · `--sp-9` 64 · `--sp-10` 80 · `--sp-11` 120 · `--sp-12` 160.

### Corners / Radius
Editorial discipline: **sharp rectangles by default**. `--r-none` 0 (everywhere) · `--r-sm` 2px (focus ring, subtle corners) · `--r-full` 50% (dots) · `--r-pill` 999px (reserved).

### Shadows
Minimal — "type and imagery lead". `--shadow-none` · `--shadow-glow-lime` `0 0 8px var(--lime)` (LIVE dot, availability dot). No elevation shadows; flat surfaces are the style.

### Z-index layers
`--z-base` 0 · `--z-raised` 1 · `--z-elevated` 2 · `--z-sticky` 5 · `--z-overlay` 20 · `--z-deepdive` 25 · `--z-statusbar` 30 · `--z-topbar` 40 · `--z-modal` 50.

### Component primitives (`css/components.css`, prefix `.ds-*`)
- **`.ds-dot`** — 8px lime circle with lime glow. `.ds-dot--pulse` for animated variant. (LIVE indicator pattern.)
- **`.ds-label`** — mono 10px uppercase label with wide letter-spacing. Variants: `.ds-label--lime`, `.ds-label--strong`. (Eyebrow, cockpit readout.)
- **`.ds-btn-outline-lime`** — lime hollow button; fills lime on hover with ink text; 1px-offset on active. (Primary CTA.)
- **`.ds-btn-ghost`** — borderless mono text button; opacity 0.6 → 1 + lime color on hover. (Back, close, subtle nav.)
- **`.ds-card`** — interactive surface with `--bg-hover` on hover. (Click-through card foundation.)
- **`.ds-underline-tail`** — pseudo-element underline that scales from 0 → full on hover. Variant class `.ds-underline-tail--active` for always-on state.

### Existing-component inventory (canonical examples, not yet refactored)
These work and look right; new similar components should use `.ds-*` instead.
| Pattern | Existing class | File | `.ds-*` equivalent |
|---|---|---|---|
| Primary CTA | `.cta-read` | [css/work.css:202](css/work.css:202) | `.ds-btn-outline-lime` |
| Back/close | `.deepdive-close` | [css/deepdive.css:25](css/deepdive.css:25) | `.ds-btn-ghost` |
| Clickable card | `.contact-card` | [css/contact.css:13](css/contact.css:13) | `.ds-card` + `.ds-underline-tail` on foot |
| Status dot | `.statusbar .live-dot` | [css/shell.css:304](css/shell.css:304) | `.ds-dot` + `.ds-dot--pulse` |
| Active underline | `.project-tabs .pt-rule` | [css/shell.css:178](css/shell.css:178) | `.ds-underline-tail` (adaptation) |

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

### Session 2026-04-21
- **Added `CLAUDE.md`** at repo root via `/init`. Lean onboarding doc for future Claude Code sessions; points to `PROJECT.md` as the authoritative memory rather than duplicating content. Covers: the PROJECT.md "always read first, always log changes" rule, the hard constraints most likely to bite (zero-build, no new deps, tokens-not-hex, GitHub account safety, git identity trap, São Paulo, lime discipline), dev command (`npx serve -l 5173 .`), and the non-obvious architecture facts (script load order with Babel Standalone, state flow in `app.jsx`, scroll-to-deep-dive choreography, `data-theme` on html+body, CSS organization with tokens.css/components.css first). Carry-forward: parent-level `/Users/andre.finageiv/Library/CloudStorage/Dropbox/_Claude/CLAUDE.md` describes this sub-project as "React 19 + TypeScript + Tailwind v4 + Vite" — that's wrong (it's React 18 via CDN + Babel Standalone, no build). Should be corrected in a future session scoped to that file.
- **Design System promoted to `main`** — branch `claude/inspiring-mendeleev-2a7575` fast-forwarded to `main` on GitHub (commits `e23d01b`, `3b1a0a6`, `cdcb8d3`). Vercel auto-deployed production at commit `cdcb8d3` (deploy `dpl_3HcK16d…`, state READY, `portfolio-finaga-5767s-projects.vercel.app` HTTP 200). Remote feature branch deleted; commit SHAs from the Fraunces exploration remain resolvable on `main`.
- **Full Design System foundation committed** — after typography exploration, formalized foundations for Colors, Typography, Spacing, Corners, Shadows, Z-index, plus a `css/components.css` file with 6 reusable `.ds-*` primitives (dot, label, btn-outline-lime, btn-ghost, card, underline-tail). New CSS files must use these tokens / primitives; existing hardcoded values migrate opportunistically. Added `--bg-hover` and `--fg-on-lime` theme-aware tokens. Linked `components.css` in `index.html` right after `tokens.css`. Documented the whole system in the "Design System" section above (replaces previous "Design tokens" section).
- **Font pivot (option A) rejected after preview review** — André preferred the pre-Fraunces look. Reverted `--ff-display/sans/mono` back to Big Shoulders / Space Grotesk / JetBrains Mono in `css/tokens.css` and `data.js` (SVG plate factory). Reverted the 9 display slots from `var(--fw-bold)` (700) → `var(--fw-medium)` (500) to restore the original visual weight. Kept all the new typography tokens (`--fs-*`, `--fw-*`, `--lh-*`, `--ls-*`) — those are stack-agnostic and were the real deliverable of the exploration. The Fraunces exploration lives in commits `e23d01b` and `3b1a0a6` on this branch; history is preserved for future reference.
- **Typography token system added** — formalized a basic design system for type after the font pivot. Added `--fs-*` (9 fixed-px body/label steps + 9 fluid clamp-based display steps), `--fw-*` (regular/medium/bold), `--lh-*` (tight/snug/heading/body/relaxed), `--ls-*` (wide/normal/tight) to `css/tokens.css`. Policy: display voice = 700; body + ultra-display (case number, at 120–200px where size carries voice) = 400; mono labels = 500.
- **Applied `--fw-bold` (700) to 9 display slots** — `.case-name` (work.css), `.about-hero h1`, `.ab-lede`, `.ab-pull`, `.asr-v`, `.ac-name` (about.css), `.page-hero h1` (pages.css), `.deepdive h2` (deepdive.css), `.avail-big` (contact.css). Primary motivation: the skill's editorial-serif reference uses 700 for display, and Fraunces at 500 was reading under-weighted for "magazine masthead" presence. Verified via `preview_inspect` — case headline now 700 at 46.8px (desktop), About wordmark 700 at 171.6px (desktop clamp-resolved), deep-dive § 700 at 78px. No console errors. Left at 400: `.big-num` case number (at 200px size carries the voice; 700 would be brutal), body prose, mono labels (500).
- Used `ui-ux-pro-max` skill to validate the pairing against its 57-pairing typography DB. Skill's canonical "Editorial Serif" pick for portfolio/luxury = Playfair Display / Lora / Courier Prime. Our pick (Fraunces / Inter / IBM Plex Mono) diverges deliberately because the site is a hybrid — editorial-luxury aesthetic over SaaS/control-room content. A serif body (Lora) would undercut KPI tables and console readouts; Inter is right. Fraunces ≈ Playfair in editorial register but with variable axes; Plex Mono ≈ Courier Prime but with software precision vs. typewriter warmth. Decision logged in this session as "better-calibrated for hybrid brief".
- **Typography pivot — Editorial Serif direction (option A)**. Swapped the type stack from Big Shoulders / Space Grotesk / JetBrains Mono → **Fraunces / Inter / IBM Plex Mono**. Rationale: aligns the site more closely with the stated "Italian fashion case site" editorial-luxury brief than the prior industrial-condensed stack. Fraunces' high contrast makes the lime `#B8FF3D` punch harder on headlines; IBM Plex Mono is warmer + more editorial than JetBrains Mono; Inter is the neutral workhorse body. Two other directions considered but not chosen: B (Bodoni Moda / Inter Tight / JetBrains Mono — full couture Didone) and C (Bebas Neue / Manrope / Space Mono — industrial-refined, same lane). Edits: `css/tokens.css` (@import + `--ff-*` vars) and `data.js` (SVG plate factory font-family strings at lines 26, 46-48). Verified in preview on Work/001 Farsight and About views — all three families load (`document.fonts` = 23 entries across Fraunces, Inter, IBM Plex Mono), no console errors, lime CTA and pull-quote still hold. Shipped on branch `claude/inspiring-mendeleev-2a7575` for preview-URL review before merge.

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
- **Verified email linking**: GitHub's commit `author` field resolves to user `finaga` → means `finaga@gmail.com` is already verified on the account, commits will show Andre's avatar and count in the contribution graph. Profile's public `email` and `name` are `null` (privacy choice, not a bug).
- **Decided GitHub workflow** (new section above): solo-designer-lightweight. Main-line for small changes, branches only for "big swings" to get Vercel preview URLs, Issues as design backlog, short public-facing README separate from this internal PROJECT.md, no CI / no Dependabot / no branch protection. Priority next steps: (1) wire Vercel↔GitHub for auto-deploy, (2) write README.md, (3) promote carry-forwards to Issues.
- **Vercel↔GitHub wiring done** (user connected via dashboard). Active team: `finaga-5767s-projects` (`team_y5GaYAU4NKo0bDNkPkdtKR1N`). Canonical project: `portfolio` (`prj_IuRliC3CyeOTMsjyWTS2TXhkaiNZ`). Latest deploy = commit `936a9e9`, state `READY`, auto-triggered by GitHub integration. **Two cleanup actions pending in Vercel dashboard (user):** (a) delete duplicate projects `portfolio2026` and `portfolio-c1xc` — same repo imported 3×; (b) disable Deployment Protection on `portfolio` project — production URL currently returns 401 to anonymous visitors (blocks recruiters).
- **Added Vercel MCP plugin** (`npx plugins add vercel/vercel-plugin` → `vercel@claude-plugins-official`). Adds 25 skills, 6 cmds, 3 agents, hooks, MCP tools. Requires `/restart` to load.
- **Both Vercel cleanups done by user**: duplicates deleted (only `portfolio` remains), Deployment Protection disabled. Live URL `https://portfolio-finaga-5767s-projects.vercel.app` now returns HTTP 200 to anonymous visitors — **site is publicly viewable**.
- **Added README.md** — short public-facing intro for the GitHub repo page (what it is, live URL, stack, zero-build rationale, local dev, structure). Distinct from PROJECT.md (internal memory).
- **Promoted `Known carry-forwards` to GitHub Issues** — filed via `gh issue create`. Labels created: `case`, `copy`, `visual`, `a11y`, `mobile`, `branding`, `content`, `performance`, `new-case`.
- **Closed Issues #1 + #2 (mobile fixes)** — one-file edit to `css/responsive.css`:
  - **#1** (ScrollCue overlap): added `.scroll-cue { display: none; }` at ≤900px. ScrollCue is a desktop-only wayfinding affordance; on stacked mobile the "there's more below" is self-evident and the cue's fixed `right: 40px; bottom: 104px` coords were landing over the right-edge KPI card.
  - **#2** (console bleed): bumped `.console` mobile `padding` from `40px 24px` → `40px 24px 80px`. Last line of content now sits ~50px above the 28px fixed statusbar at max scroll.
  - Verified at both mobile (375×812, cue hidden + console padding 80px) and desktop (1040×1306, cue still `display: flex` at original coords). No regression.
- **`READ FULL CASE` arrow changed from `→` → `↓`** (user request via launch-selected-element). Click target is the deep-dive panel which slides up from below; scrolling past console bottom also pulls the deep-dive up. Down-arrow matches that motion semantically. Single-source change in `components/Console.jsx` line 41 — affects all 4 cases. The `NEXT: <case> →` nav below keeps its right arrow (horizontal case-tab navigation, different metaphor).

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
- ~~Vercel duplicate projects `portfolio2026` / `portfolio-c1xc`~~ — **resolved 2026-04-20**: user deleted both in dashboard; only `portfolio` remains.
- ~~Vercel Deployment Protection is ON~~ — **resolved 2026-04-20**: user disabled it; prod URL now returns HTTP 200 anonymously.

---

## GitHub workflow

**Repo**: [`finaga/portfolio`](https://github.com/finaga/portfolio) (public, `main`).
**Local identity**: `finaga <finaga@gmail.com>` (per-repo override — machine global stays as work identity).

### The rules
1. **Most changes land on `main` directly.** Solo designer, zero collaborators — no branch ceremony for typos, copy edits, small visual tweaks.
2. **Use a short-lived branch for "big swings"** (new case study, major redesign, nav overhaul). Branch name pattern: `case/<slug>`, `design/<slug>`, `fix/<slug>`. Open a PR to self so Vercel generates a preview URL. Sit on the preview. Merge when happy.
3. **Commits**: loose convention — `<scope>: <outcome>` (`case(farsight): expand reflection section`, `fix: contact mailto Safari bug`, `docs: log deploy setup`). Avoid `wip`, `update`, `misc`.
4. **Issues are the design backlog.** Promote `Known carry-forwards` entries and "next cases" into GitHub Issues. Labels: `case`, `copy`, `visual`, `a11y`, `performance`, `new-case`. Close via commit trailer `Closes #N`.
5. **README.md is for visitors** (recruiters, peers). Keep it short: what it is, live URL, stack, zero-build rationale. `PROJECT.md` stays as internal memory and is NOT for the public face.
6. **Skipped by design** (don't add without a reason): CI / GitHub Actions, Dependabot, branch protection, releases/tags. The project has zero dependencies and one committer.
7. **Secrets never enter the repo.** `.env*` already in `.gitignore`. Any future API keys (contact form, analytics tokens) go into Vercel project env vars.

### Ideal deploy wiring
Connect Vercel to the GitHub repo so every `git push origin main` auto-deploys production; every branch/PR gets a preview URL. Replaces the current `vercel --prod` CLI flow.

---

## Deploy

### Preferred: GitHub-integrated Vercel (active)
Push to `main` → Vercel auto-deploys production. Push to any other branch / open a PR → Vercel builds a preview deployment at a unique URL.

- **Team**: `finaga-5767s-projects` (`team_y5GaYAU4NKo0bDNkPkdtKR1N`)
- **Project**: `portfolio` (`prj_IuRliC3CyeOTMsjyWTS2TXhkaiNZ`)
- **Production URL**: `portfolio-finaga-5767s-projects.vercel.app` (⚠ currently protected — see carry-forwards)
- **Git branch alias**: `portfolio-git-main-finaga-5767s-projects.vercel.app`
- **Framework detected**: `null` (correct — we're zero-build; Vercel serves as static).

### Fallback: CLI
```bash
cd "/Users/andre.finageiv/Library/CloudStorage/Dropbox/_Claude/2026 Portfolio"
vercel --prod
```

See `DEPLOY.md` for Netlify alternative. `vercel.json` sets cleanUrls + 1-year immutable cache on `/assets/*`.
