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

### One thing done deliberately — and one claim retracted

**`components.json` was written by hand rather than via `shadcn init`.** `init` rewrites the target
CSS file with its own token block and base layer. On a bespoke stylesheet that is destructive.
Writing the config by hand and running only `add` kept the installer additive — the actual diff to
`index.css` was **88 insertions, 0 deletions**.

**Retracted: the claim that Preflight would damage this design system.** It does not, and this was
measured rather than assumed after a peer session pushed back on the original assertion.

Why it's safe: v3's own reset (`*, *::before, *::after { box-sizing; margin: 0; padding: 0 }` and
the element rules below it) is **unlayered**. Per the CSS cascade-layers spec, unlayered rules beat
layered ones regardless of source order — and Tailwind's Preflight ships inside `@layer base`. So
the hand-written reset wins every conflict automatically.

The measurement: full computed-style fingerprint of the live Home page, **296 elements × 27
properties**, captured with Preflight on and off and diffed.

| Result | |
|---|---|
| Properties that differed | **`border-top-style` only** |
| Elements affected | 289 |
| Elements with a non-zero top border | 5 — all of which set their own style |
| Every other property | identical |

`border-top-style: solid` on a zero-width border renders nothing. Visually inert.

**And the theme/utilities-only import turned out to be the riskier option.** It drops Preflight's
`border: 0 solid`, which Tailwind's own `border-*` utilities rely on for their style — so a future
`border` class would silently render nothing. The chart package doesn't use border utilities today
(the six apparent `ring` matches are substrings of "during", "string", "spring"), but new code
would hit it.

**Conclusion: use the plain `@import "tailwindcss";`.** It costs ~4 KB of CSS, changes nothing
visually, and keeps Tailwind's utilities behaving as documented.

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
