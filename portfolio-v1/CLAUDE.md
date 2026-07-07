# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Read PROJECT.md first, every session

`PROJECT.md` is the authoritative memory for this project — design decisions, constraints, session history, and the full design system reference. It contains a binding rule: **every change, decision, correction, or new constraint must be appended to `PROJECT.md` in the same turn as the change**, not later. Session-log entries go under the dated section; durable rules go in `Non-negotiable constraints` or the relevant design section.

This `CLAUDE.md` is intentionally minimal. If you need *why* something is the way it is, look in `PROJECT.md` — especially the session history.

## What this project is

André Finageiv's personal design portfolio. **André is a product designer, not a developer** — favour design-oriented framing and avoid assuming deep coding knowledge. Editorial-luxury visual system inspired by Italian fashion case sites, with a cockpit-style statusbar. Four case studies + About + Contact + slide-up deep-dive.

## Hard constraints (read before editing)

Full list in `PROJECT.md § Non-negotiable constraints`. The ones that will bite hardest if ignored:

- **Zero build step.** React 18 via CDN, Babel Standalone compiles `.jsx` at runtime. Do NOT introduce Vite, Webpack, `package.json`, or any bundler.
- **No new dependencies.** No icon libraries, no CSS-in-JS, no state managers. Pure React hooks + CSS custom properties.
- **Use tokens, not hex/px.** All colors, sizes, spacing, radii, shadows, z-indexes go through the `--*` CSS custom properties defined in `css/tokens.css`. New components should use the `.ds-*` primitives in `css/components.css` where possible (full reference: `PROJECT.md § Design System`).
- **Copy is sacred.** Don't rewrite user-facing text unless explicitly asked. Case abstracts, KPI numbers, bios — all are André's voice.
- **GitHub account — NEVER `AndreFinageiv`.** That's the BaxEnergy work account. The portfolio repo is `finaga/portfolio` (personal). Before any `gh` / `git push`, verify `gh auth status` shows `finaga` as the active account.
- **Git author identity — machine global is the WORK identity.** This repo has a local override (`finaga <finaga@gmail.com>`). For any NEW personal repo on this machine, set local `user.name` / `user.email` *before the first commit*, or commits will be misattributed. Never "fix" by changing global — that would corrupt work repos.
- **São Paulo, not Lisbon.** André is in São Paulo (23.55°S 46.63°W). Any "Lisbon" reference is a bug.
- **Lime discipline.** `#B8FF3D` appears only in the specific places listed in `PROJECT.md`. Don't over-lime.

## Commands

```bash
# Dev server (zero install needed)
npx serve -l 5173 .

# Also launchable via .claude/launch.json and preview_start tools
```

No build, no lint, no tests configured. There is no `package.json`.

For deploys: push to `main` on GitHub (`finaga/portfolio`) — Vercel auto-deploys production. Pushing any other branch creates a preview URL. CLI fallback is documented in `DEPLOY.md`.

## Architecture

The runtime model matters more than the file tree:

**Script loading.** `index.html` loads scripts in a fixed order, each compiled at runtime by Babel Standalone. Components register themselves on `window.*` (no ES modules, no imports) so later scripts can reference earlier ones. Load order is currently:
```
data.js → Shell → Viewport → Console → DeepDive → AboutPage → ContactPage → app.jsx
```
Re-ordering these without care will break the site. Adding a new component means appending a `<script type="text/babel" src="components/Foo.jsx">` tag in the right position *and* attaching the component to `window`.

**State flow.** `app.jsx` owns all top-level state: current view (`work` | `about` | `contact`), active case index, deep-dive open/closed, theme, keyboard handling, global `wheel` listener, `aria-live` region, and `prefers-reduced-motion` gating. Components receive props and refs; there is no context provider.

**Scroll → deep-dive choreography.** A global `wheel` listener on `window` drives `consoleRef.current.scrollTop` (the right pane). Scrolling past the console bottom (`remaining < 80px`) pulls the deep-dive up. In the deep-dive, scrolling up past its top closes it AND resets the console. Enter also opens; Escape closes. This is not CSS — it's imperative JS in `app.jsx`. Touching scroll behavior means reading that file first.

**Theme.** Dark on Work + About (`#0f1117`), light on Contact (`#ECECEA`). Applied by setting `data-theme` on BOTH `html` and `body` in a `useEffect` in `app.jsx`. Do NOT add `transition: background` to `html`/`body` — that caused a stuck-bg bug with the cubic-bezier ease.

**CSS organization.**
- `css/tokens.css` — all design-system tokens (colors, type scale, spacing, radius, shadow, z-index) + theme blocks + `prefers-reduced-motion` gate. **This is the only place any primitive value should live.**
- `css/components.css` — reusable `.ds-*` primitives built on tokens.
- Per-surface stylesheets: `shell.css`, `work.css`, `deepdive.css`, `pages.css`, `about.css`, `contact.css`, `responsive.css`.
- Stylesheets are linked in `index.html` with `tokens.css` and `components.css` first so everything else can consume their variables.

**Layout zones.** Fixed vertical layout on desktop — topbar (56px), project tabs (44px), split viewport+console (rest), statusbar (28px fixed bottom). Full table in `PROJECT.md § Layout zones`.

**Case content + SVG plate factory.** All four cases live in `data.js` with a `plate(kind, opts)` factory that generates editorial SVG composites for deep-dive thumbnails. The factory hardcodes font-family strings for `DISP`/`SANS`/`MONO` — if the type stack changes in `tokens.css`, those strings in `data.js` must change too.

**Responsive.** Single `@media (max-width: 900px)` block in `css/responsive.css`. Mobile stacks the split vertically, hides the ScrollCue, and adds bottom padding to `.console` so the fixed statusbar doesn't occlude content.

## Before pushing

- Verify `gh auth status` shows `finaga` as active (not `AndreFinageiv`).
- Verify the repo's local git identity with `git config --local user.email` — should be `finaga@gmail.com`.
- Update `PROJECT.md § Session history` with what changed and why in the same turn as the code edit.
- For "big swings" (new case study, major redesign, nav overhaul), push to a branch — Vercel makes a preview URL you can sit on before merging to main.
