// Fetches the photo assets when they're absent (e.g. a file-based Vercel
// deploy that carries source only). Pinned to the commit that added the
// optimized images, so the fetch is immutable. No-op when files exist —
// git checkouts already carry them.
import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dir = join(root, 'public', 'img')
const BASE =
  'https://raw.githubusercontent.com/finaga/portfolio/2bbb3d29df04fb0c8ac01279c2ff6c59983f3958/v3/public/img/'
const FILES = ['farsight.jpg', 'grid-ops.jpg', 'toptal.jpg', 'fit4box.jpg', 'ski.jpg']

mkdirSync(dir, { recursive: true })
for (const f of FILES) {
  const dest = join(dir, f)
  if (existsSync(dest)) continue
  const res = await fetch(BASE + f)
  if (!res.ok) throw new Error(`fetch ${f}: ${res.status}`)
  writeFileSync(dest, Buffer.from(await res.arrayBuffer()))
  console.log('fetched', f)
}
