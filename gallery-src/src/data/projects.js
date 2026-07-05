// Abstracts, roles, scopes, and years are André's voice, verbatim from
// portfolio/data.js — do not rewrite.
//
// Stream imagery: each case ships its one real hero photo plus editorial
// "plate" diagrams (see lib/plate.js) — the same instrument-panel data
// visualizations the real portfolio uses for these exact cases. Enterprise
// client work (Farsight, Grid-Ops, Toptal) can't be screenshotted, so these
// stand in as honest system/data visuals rather than fabricated product
// photos. Experiments with no shareable photo get a plate label + a live
// iframe of the actual working demo on their project page.
import { plate } from '../lib/plate'
import heroFarsight from '../assets/images/bg-farsight.jpg'
import heroGridOps from '../assets/images/bg-grid-ops.jpg'
import heroToptal from '../assets/images/bg-toptal.jpg'
import heroFit4box from '../assets/images/bg-fit4box.jpg'

export const categories = [
  { key: 'case', label: 'Case Studies' },
  { key: 'experiment', label: 'Experiments' },
]

export const projects = [
  {
    slug: 'farsight',
    title: 'Farsight Design Direction & System',
    short: 'Farsight',
    client: 'BaxEnergy — a Yokogawa Company',
    category: 'case',
    year: '2024 — Present',
    role: 'Lead Designer / Design Ops',
    scope: 'Enterprise SaaS · 20+ modules · 6 teams',
    description:
      'Farsight shipped with no unified design direction — new modules clashed, onboarding suffered, entry-users were lost. I led the visual and UX reset, built the system, and aligned 30+ engineers across 6 teams around a single language.',
    hero: heroFarsight,
    heroAspect: 66.667,
    images: [
      { src: heroFarsight, aspect: 66.667, span: 'full' },
      { src: plate('system-overview', { tone: 'dark' }), aspect: 66.667, span: 'left' },
      { src: plate('density', { tone: 'dark' }), aspect: 66.667, span: 'right' },
      { src: plate('asset-detail', { tone: 'dark' }), aspect: 66.667, span: 'center' },
    ],
  },
  {
    slug: 'grid-ops',
    title: 'Grid-Ops Control Center',
    short: 'Grid-Ops',
    client: 'BaxEnergy — a Yokogawa Company',
    category: 'case',
    year: '2023',
    role: 'Senior Product Designer',
    scope: 'Real-time SaaS · 24/7 control room',
    description:
      'Grid-Ops is the command surface for operators monitoring thousands of renewable assets in real time. The brief: cut time-to-diagnose, reduce alarm fatigue, make the interface readable at 3am on a 4K wall.',
    hero: heroGridOps,
    heroAspect: 66.667,
    images: [
      { src: heroGridOps, aspect: 66.667, span: 'full' },
      { src: plate('control-room', { tone: 'dark' }), aspect: 66.667, span: 'right' },
      { src: plate('alert-triage', { tone: 'dark' }), aspect: 66.667, span: 'left' },
      { src: plate('before-after', { tone: 'dark' }), aspect: 66.667, span: 'center' },
    ],
  },
  {
    slug: 'toptal',
    title: 'Growth Funnel Redesign',
    short: 'Growth Funnel',
    client: 'Toptal',
    category: 'case',
    year: '2022',
    role: 'Product Designer · Growth',
    scope: 'Acquisition funnel · 8 A/B tests',
    description:
      'Rethought the top-of-funnel flow for talent signup. Cut form friction without cutting qualification. Every pixel on these pages costs or earns money — so every change ran as an experiment.',
    hero: heroToptal,
    heroAspect: 66.667,
    images: [
      { src: heroToptal, aspect: 66.667, span: 'full' },
      { src: plate('landing-variants', { tone: 'dark' }), aspect: 66.667, span: 'left' },
      { src: plate('funnel', { tone: 'dark' }), aspect: 66.667, span: 'right' },
      { src: plate('experiments', { tone: 'dark' }), aspect: 66.667, span: 'center' },
    ],
  },
  {
    slug: 'fit4box',
    title: 'Fit4Box — Crossfit Apparel Brand',
    short: 'Fit4Box',
    client: 'Fit4Box',
    category: 'case',
    year: '2023 — Present',
    role: 'Founder & Designer',
    scope: 'Brand · e-commerce · apparel',
    description:
      'My own brand — Crossfit apparel built for people who actually train. I run the whole thing: identity, e-commerce, photography direction, and the product line itself.',
    hero: heroFit4box,
    heroAspect: 66.667,
    images: [
      { src: heroFit4box, aspect: 66.667, span: 'full' },
      { src: plate('identity', { tone: 'light' }), aspect: 66.667, span: 'right' },
      { src: plate('lookbook', { tone: 'light' }), aspect: 66.667, span: 'left' },
      { src: plate('pdp', { tone: 'light' }), aspect: 66.667, span: 'center' },
      { src: plate('packaging', { tone: 'light' }), aspect: 66.667, span: 'left' },
    ],
  },
  {
    slug: 'marathon-preview',
    title: 'Marathon Preview',
    short: 'Marathon Preview',
    client: 'Personal',
    category: 'experiment',
    year: '2026',
    role: 'Design & build',
    scope: 'Interactive race-preview HUD',
    description:
      'Interactive race-preview experiment — live pace, splits, and effort readouts. The image below is the live working demo, not a screenshot.',
    hero: plate('label', {
      tone: 'dark',
      eyebrow: 'WIDGET · HUD',
      title: 'MARATHON',
      sub: 'RACE-TELEMETRY PREVIEW',
    }),
    heroAspect: 66.667,
    images: [
      { kind: 'iframe', src: '/marathon-preview/', aspect: 66.667, span: 'full' },
    ],
  },
  {
    slug: 'fluted-glass',
    title: 'Fluted Glass Shader',
    short: 'Fluted Glass',
    client: 'Personal',
    category: 'experiment',
    year: '2026',
    role: 'Design & build',
    scope: 'WebGL refraction study',
    description:
      'WebGL replica of a fluted-glass refraction effect, built as a hero-surface study. The panel below is the live shader, not a screenshot.',
    hero: plate('label', {
      tone: 'dark',
      eyebrow: 'WEBGL · SHADER',
      title: 'FLUTED GLASS',
      sub: 'REFRACTION STUDY',
    }),
    heroAspect: 66.667,
    images: [
      { kind: 'iframe', src: '/fluted-glass/', aspect: 66.667, span: 'full' },
    ],
  },
]

export const bySlug = (slug) => projects.find((p) => p.slug === slug)

export const related = (slug, n = 4) => {
  const rest = projects.filter((p) => p.slug !== slug && p.category === 'case')
  return rest.slice(0, n)
}
