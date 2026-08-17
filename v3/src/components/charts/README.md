# Charts — `@bklit/area-chart`

Installed 2026-08-17 via `npx shadcn@latest add @bklit/area-chart`. Built on **visx**, not Recharts.

## What was added to v3 to make this work

| Change | Why |
|---|---|
| `tailwindcss` + `@tailwindcss/vite` | The components are Tailwind-class based |
| `@tailwindcss/vite` plugin + `resolve.alias['@']` in `vite.config.js` | Components import from `@/lib/utils` |
| `jsconfig.json` with `paths` | Editor resolution for the same alias |
| `clsx` + `tailwind-merge` + `src/lib/utils.js` | The `cn()` helper every component uses |
| `components.json` | Written **by hand** — see below |
| `--chart-*` tokens in `src/styles/index.css` | Added by the installer, additive only |

### ⚠️ Two things done deliberately — don't undo them

**1. Tailwind is imported WITHOUT preflight.** The top of `src/styles/index.css` reads:

```css
@layer theme, base, components, utilities;
@import "tailwindcss/theme.css" layer(theme);
@import "tailwindcss/utilities.css" layer(utilities);
```

Not `@import "tailwindcss";`. The full import pulls in preflight, which resets margins, the type
scale and borders — and would flatten the 740-line hand-written Swiss-poster system this site is
built on. Verified after install: preflight signature counts are identical to the pre-Tailwind build.

**2. `components.json` was written by hand rather than via `shadcn init`.** `init` rewrites the
target CSS file with its own token block and base layer. On a bespoke stylesheet that is a
destructive operation. Writing the config by hand and running only `add` keeps the installer
additive — the actual diff to `index.css` was **88 insertions, 0 deletions**.

## Bug fixed in the pulled package

`chart-loading-label.jsx` shipped importing `../components/shimmering-text`, but `shimmering-text.jsx`
lands one level up at `src/components/shimmering-text.jsx`. Corrected to `../shimmering-text`.
Without this the dev server 500s. Re-check after any re-install or update.

## Gotcha

**The chart needs real `Date` objects**, not ISO strings:

```jsx
// works
{ date: new Date(2026, 6, 10), included: 96 }
// renders an empty chart, silently, with no error
{ date: '2026-07-10', included: 96 }
```

## Usage

Compositional, like Recharts:

```jsx
<AreaChart data={data} xDataKey="date">
  <Grid />
  <XAxis />
  <Area dataKey="included" stroke="var(--chart-1)" />
  <Area dataKey="excluded" stroke="var(--chart-3)" />
</AreaChart>
```

The default `--chart-*` tokens are greyscale. Override them in `index.css` to bring charts into the
site's palette.

## Smoke test

`/chart-smoke.html` → `src/dev/chart-smoke.jsx`. Dev-only; Vite builds only `index.html`, so it
never reaches `dist/`. It renders the coverage series from the Farsight KPI case study — the numbers
reconcile to the real preview totals (972 included, 915 excluded, 1887 sampled). Delete both files
whenever you like.

**The production bundle is unchanged** — 410,187 bytes before and after, because nothing in the app
imports these components yet.
