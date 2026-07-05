---
name: André Finageiv — Work Index & Portfolio
description: Editorial-luxury portfolio with instrument-panel precision, near-black stage, disciplined lime signal color.
colors:
  void-ink: "#050608"
  cockpit-black: "#0f1117"
  cockpit-lime: "#B8FF3D"
  cockpit-lime-deep: "#9EEA1E"
  bone-white: "#ECECEA"
  paper-white: "#F5F4F0"
  fg-on-dark: "#E6E8EC"
  fg-on-light: "#050608"
typography:
  display:
    fontFamily: "Big Shoulders, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(120px, 18vw, 200px)"
    fontWeight: 700
    lineHeight: 1.0
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Big Shoulders, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(36px, 4.5vw, 56px)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Space Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  label:
    fontFamily: "JetBrains Mono, ui-monospace, 'SF Mono', Menlo, monospace"
    fontSize: "10px"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0.12em"
rounded:
  none: "0"
  sm: "2px"
  full: "50%"
spacing:
  1: "4px"
  2: "8px"
  3: "12px"
  4: "16px"
  5: "24px"
  6: "32px"
  7: "40px"
  8: "48px"
  9: "64px"
  10: "80px"
  11: "120px"
  12: "160px"
components:
  button-outline-lime:
    backgroundColor: "transparent"
    textColor: "{colors.cockpit-lime}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "12px 24px"
  button-outline-lime-hover:
    backgroundColor: "{colors.cockpit-lime}"
    textColor: "{colors.void-ink}"
    rounded: "{rounded.none}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.fg-on-dark}"
    typography: "{typography.label}"
    padding: "8px 0"
---

# Design System: André Finageiv — Work Index & Portfolio

## 1. Overview

**Creative North Star: "The Instrument Panel"**

This is a cockpit, not a brochure. The visual system reads as calibrated equipment: a live São Paulo clock, real coordinates (23.55°S 46.63°W), a statusbar with `SYS / HH:MM:SS`, folio-numbered project tabs, a pulsing `● LIVE` dot. Editorial-luxury type (Big Shoulders at mega scale, Space Grotesk body) sits on top of this instrument chrome the way a fashion editorial sits on a gallery wall — the panel frames the work, it doesn't compete with it.

The system explicitly rejects the generic template portfolio (Squarespace/Webflow card grids, uppercase eyebrow kickers scaffolding every section) and cold gray minimalism (flat, colorless, identity-less dark mode). Every readout is real: real time, real coordinates, real URLs. Nothing is decorative filler dressed as data.

**Key Characteristics:**
- Near-black stage (`#0f1117`, deliberately lighter than true ink — "almost black, not black")
- One accent color, spent with discipline: lime appears only at named signature moments
- Sharp rectangles everywhere; radius is reserved for dots and focus rings, never cards or buttons
- Mono type for every readout/label; display type only for headlines and hero numerals
- Flat surfaces at rest; the only glow in the system signals "live"

## 2. Colors

The palette is almost monochrome by design — one near-black stage, one nearly-white counter-theme, one accent spent with total discipline.

### Primary
- **Cockpit Lime** (`#B8FF3D`): the single signal color in the entire system. Reserved for: active nav button, active project-tab (folio + label + bottom rule), the `● LIVE` statusbar dot, signature pull-quotes ("TWENTY YEARS DOING IT."), the Q3 availability accent, and the hollow-outline CTA. It never appears as decoration — only as a marker of "this is active / this is the signal."
- **Cockpit Lime Deep** (`#9EEA1E`): hover-state and light-theme variant of Lime, used where the base lime would lose contrast (light-theme focus rings, hover fills).

### Neutral
- **Void Ink** (`#050608`): the deepest neutral — page background candidate and `fg-on-light` text color. The floor of the palette.
- **Cockpit Black** (`#0f1117`): the actual dark-theme stage background. Deliberately lifted off Void Ink — "almost black, not black" was an explicit correction against a colder pure-black.
- **Bone White** (`#ECECEA`): light-theme background (Contact page).
- **Paper White** (`#F5F4F0`): secondary light neutral, reserved for surfaces that need to sit apart from pure Bone.
- **fg-on-dark** (`#E6E8EC`) / **fg-on-light** (`#050608`): primary text colors per theme. `--muted` and `--dim` are alpha-reduced steps of these (45% / 30%) for secondary and tertiary text — never a separately-picked gray.

### Named Rules
**The One-Signal Rule.** Lime is the only accent in the system. If a second saturated color shows up anywhere, it's a bug, not a variant.

**The Real-Data Rule.** Every readout (clock, coordinates, live dot, statusbar) reflects real state. Never fabricate a stat or a timestamp for decorative effect.

## 3. Typography

**Display Font:** Big Shoulders (condensed industrial display), with `ui-sans-serif, system-ui, sans-serif` fallback
**Body Font:** Space Grotesk (neutral geometric sans), with `ui-sans-serif, system-ui, sans-serif` fallback
**Label/Mono Font:** JetBrains Mono, with `ui-monospace, 'SF Mono', Menlo, monospace` fallback

**Character:** A condensed, weighty display face for scale and confidence, paired with a quiet geometric body face and a technical mono for every instrument readout — three registers, each doing one job only.

### Hierarchy
- **Display** (700 weight, `clamp(120px, 18vw, 200px)`, line-height 1.0): case numerals (001), about wordmark. The heaviest, largest voice in the system — used sparingly.
- **Headline** (700, `clamp(36px, 4.5vw, 56px)`, 1.1): case headlines (FARSIGHT), section titles.
- **Title** (400–700, `clamp(28px,3.4vw,48px)`–`32px`, 1.2): display subtitles, card headings.
- **Body** (400, 14px, 1.5): console meta, reading copy. Longform prose steps up to 1.65 line-height.
- **Label** (500, 10–11px, letter-spacing 0.12em, uppercase): every cockpit readout — `§ CASE`, `SYS`, `LOC`, `FILE`, project-tab folios. This is the mono voice; it never appears in a serif or display weight.

### Named Rules
**The Three-Register Rule.** Display type headlines, Body type reads, Mono type instruments. A given piece of text belongs to exactly one register — never mix display weight into a mono readout or vice versa.

## 4. Elevation

**The Flat-by-Default, Glow-as-Signal Rule.** Surfaces never cast shadows — `--shadow-none` is the default and near-universal value across the system. The single exception is `--shadow-glow-lime` (`0 0 8px var(--lime)`), reserved exclusively for status dots (the statusbar `● LIVE` indicator, the About "Open · Q3 2026" availability dot). Depth is never used to imply hierarchy; hierarchy comes from type scale, rule weight, and the lime signal alone. If a shadow shows up anywhere else, it's a bug: this system conveys "active/live" with a glow, not "elevated" with a shadow.

## 5. Components

Buttons, cards, and dots read as calibrated equipment: sharp edges, mono labels, hairline rules, and one signal color. Nothing softens into a rounded SaaS default.

### Buttons
- **Shape:** `--r-none` (0px) — no exceptions. Radius is reserved for dots and the 2px focus-ring corner only.
- **Outline-Lime** (`.ds-btn-outline-lime`): transparent background, 1px lime border, lime mono label text (`--fs-xs`, uppercase, `--ls-wide`). This is the system's primary CTA shape — hollow, not filled, at rest.
- **Hover / Focus:** Outline-Lime inverts to a solid lime fill with `--fg-on-lime` (Void Ink) text on hover — a 0.15s ease transition, no scale or shadow change. Active state nudges `translate(1px, 1px)` for tactile press feedback.
- **Ghost** (`.ds-btn-ghost`): no border, no background, mono label at 60% opacity, brightening to full opacity + lime on hover. Used for back/close/subtle nav.

### Status Dot
- **Shape:** `--r-full` (50%), 8px.
- **Style:** solid lime fill + `--shadow-glow-lime`. The `--pulse` variant animates opacity 1→0.55 and scale 1→0.85 on a 1.4s loop — this is the system's only ambient animation loop, reserved for "this is live right now."

### Cards / Containers
- **Corner Style:** `--r-none` — flat rectangles, always.
- **Background:** transparent at rest; `--bg-hover` (3% white/black alpha) on hover only. No persistent card fill, no border, no shadow.
- **Shadow Strategy:** none — see Elevation. Cards separate via hairline `--rule` borders and whitespace, never depth.
- **Internal Padding:** `--sp-6 --sp-5` (32px / 24px).

### Navigation
- **Style:** mono labels (`.ds-label`), uppercase, `--ls-wide` letter-spacing. Active state is lime text + underline/bottom-rule; inactive is `--muted`.
- **Underline-tail:** hover-animated underline (`.ds-underline-tail`) — a 1px `currentColor` bar that scales in from `scaleX(0)` to `scaleX(1)` on hover/active, 0.6s ease. Used on card feet and inline links.
- **Mobile:** collapses to the same mono label system at reduced scale; no hamburger-and-drawer pattern — the instrument-panel chrome stays visible at every breakpoint.

### Cockpit Readouts (signature component)
The statusbar and project-tabs are the system's signature pattern: `SYS / HH:MM:SS ▍` with a live blinking mono cursor, `LOC / SÃO PAULO · 23.55°S 46.63°W`, `FILE / PORTFOLIO.2026`, and the pulsing `● LIVE` dot. Folio-numbered project tabs (`01 BAXENERGY FARSIGHT · SAAS`) follow the same instrument logic — every readout is mono, uppercase, and real.

## 6. Do's and Don'ts

### Do:
- **Do** keep every readout real — live clock, true coordinates, true URLs. No decorative fake data.
- **Do** spend lime only at the named signature moments (active nav, active tab, LIVE dot, pull-quotes, Q3 accent, outline CTA). Restraint is the identity.
- **Do** use `--r-none` for every card, button, and container. Radius exists only for dots (`--r-full`) and focus rings (`--r-sm`).
- **Do** signal "active/live" with the lime glow (`--shadow-glow-lime`), never with a drop shadow.
- **Do** keep type in its register: Display for headlines/numerals, Body for reading copy, Mono for every instrument label.
- **Do** cap body copy at 65–75ch and respect the existing `--fs-*` scale instead of hardcoding sizes.

### Don't:
- **Don't** build a generic template portfolio: no identical card grids, no uppercase eyebrow kicker stacked above every section, no Squarespace-shaped hero-stats-CTA block.
- **Don't** default to cold gray minimalism. The dark theme is `#0f1117` with lime and mono type as identity — a flat colorless "safe" dark mode is a regression, not restraint.
- **Don't** add a second saturated accent color anywhere. One signal color, no exceptions.
- **Don't** add shadows to cards, buttons, or panels for "depth." The system is flat by default; the only glow is the lime live-signal.
- **Don't** round a button or card corner. `--r-none` is not a starting point to soften later — it's the rule.
- **Don't** rewrite case-study copy (abstracts, KPIs, bios) without explicit sign-off — copy is André's voice, not the design system's to edit.
