// Abstracts, roles, scopes, and years are André's voice, verbatim from
// portfolio/data.js — do not rewrite.
//
// Stream imagery: each case ships its one real hero photo plus editorial
// "plate" diagrams (see lib/plate.js) — the same instrument-panel data
// visualizations the real portfolio uses for these exact cases. Enterprise
// client work (Farsight, Toptal) can't be screenshotted, so these
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
    slug: 'toptal',
    title: 'Growth Design',
    short: 'Growth Design',
    client: 'Toptal',
    category: 'case',
    year: '2019 — 2023',
    role: 'Growth Designer',
    scope: '5 products · homepage, landing pages, calculator, assessment, signup',
    description:
      'Four years of growth design on the freelancer side of Toptal — homepage, dynamic landing pages, a rate calculator, talent assessment, and a rebuilt signup. The brief: turn freelancers into leads, keep the journey consistent end to end, and make the pages earn their traffic organically.',
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
    year: 'Jul 2023 — Feb 2024',
    role: 'Founder & Designer',
    scope: 'Brand · e-commerce · apparel',
    description:
      'My own brand — CrossFit apparel built for people who actually train. I ran the whole thing for eight months: identity, e-commerce, photography direction, and the product line itself.',
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
