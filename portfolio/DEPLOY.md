# Deploy

Zero-build static site — any static host works.

## Vercel (recommended)

```
cd portfolio
vercel --prod
```

Requires the Vercel CLI (`npm i -g vercel`). First run links the project; subsequent runs redeploy.

## Netlify (alternative)

Drag-and-drop the `portfolio/` folder onto the Netlify dashboard, or `netlify deploy --prod --dir portfolio`.

## Domain

Point `finageiv.com` (or chosen subdomain) to the Vercel / Netlify deployment via the host's DNS panel.
