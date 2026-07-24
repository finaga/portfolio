# finageiv.com — work index

André Finageiv's site. A landing **hub** at the root links to the portfolio and a growing set of experiments and interface studies.

**Live →** https://portfolio-finaga-5767s-projects.vercel.app

---

## Structure

```
index.html            # the hub (Index 2026) — links every page below
vercel.json           # cleanUrls + trailingSlash:true + asset caching
portfolio/            # the main portfolio (React 18 via CDN, zero build)
fluted-glass/         # WebGL fluted-glass shader study (vanilla WebGL, zero build)
marathon-preview/     # Marathon HUD widget (static)
option2/              # built output of the Button System (served at /option2/)
option2-src/          # Vite source for option2 — build, then copy dist → /option2/
portfolio-v3/         # built output of the v3 redesign (served at /portfolio-v3/)
v3/                   # Vite source for portfolio-v3 — build, then copy dist → /portfolio-v3/
```

Every page is its own folder with an `index.html`, served at `/<name>/`. `vercel.json` sets `trailingSlash: true` so subpaths keep their slash (the portfolio uses relative script paths and breaks without it).

## Stack

Most of the site is **zero-build**: the portfolio and fluted-glass run React-via-CDN / vanilla WebGL with no bundler. The one exception is **option2**, a Vite app — its source lives in `option2-src/` and its built output is committed to `option2/`.

## Local dev

```bash
npx serve -l 5173 .      # serves the whole site; open http://localhost:5173
```

### Rebuilding option2

```bash
cd option2-src
npm install
npm run build            # vite build (base is /option2/)
rm -rf ../option2 && mkdir ../option2 && cp -R dist/. ../option2/
```

Then commit the updated `option2/`.

### Rebuilding portfolio-v3

```bash
cd v3
npm install
npx vite build --base=/portfolio-v3/
rm -rf ../portfolio-v3 && mkdir ../portfolio-v3 && cp -R dist/. ../portfolio-v3/
cp ../portfolio-v3/index.html ../portfolio-v3/404.html   # SPA deep-link fallback
```

Then commit the updated `portfolio-v3/`.

## Deploy

Vercel via GitHub integration — every push to `main` auto-deploys production (project `portfolio`). The hub lives at the repo root, so Vercel's Root Directory stays `/`. See [`portfolio/DEPLOY.md`](./portfolio/DEPLOY.md).

Internal design-system notes and session history for the portfolio live in [`portfolio/PROJECT.md`](./portfolio/PROJECT.md).

---

© André Finageiv
