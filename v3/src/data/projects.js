// Abstracts, roles, scopes, years, KPIs, bio and stats are André's voice,
// verbatim from portfolio/data.js, folio-src/src/data/cases.js and the hub —
// do not rewrite.

// Same-origin, root-relative: the lab studies are siblings of this app on the
// same host. An absolute URL here rots whenever the deployment alias changes —
// which is exactly how these links ended up pointing at a dead host.
const HUB = ''
// import.meta.env.BASE_URL is '/' in dev and '/portfolio-v3/' in the built site — image
// paths must be prefixed with it so they resolve under either base.
const IMG = (name) => `${import.meta.env.BASE_URL}img/${name}`

export const PROJECTS = [
  {
    slug: 'farsight',
    num: '01',
    title: 'Farsight Design Direction & System',
    short: 'Farsight',
    client: 'BaxEnergy — a Yokogawa Company',
    category: 'work',
    year: '2024 — Present',
    role: 'Lead Designer / Design Ops',
    scope: 'Enterprise SaaS · 20+ modules · 6 teams',
    discipline: 'Design systems',
    image: IMG('farsight.jpg'),
    imageAlt: 'Architectural facade, the visual identity reference for Farsight',
    description:
      'Farsight shipped with no unified design direction — new modules clashed, onboarding suffered, entry-users were lost. I led the visual and UX reset, built the system, and aligned 30+ engineers across 6 teams around a single language.',
    kpis: [
      { label: 'Clients onboarded', value: 10, suffix: '+' },
      { label: 'New modules', value: 20, suffix: '+' },
      { label: 'Engineers guided', value: 30, suffix: '+' },
      { label: 'Teams aligned', value: 6 },
    ],
    plates: [
      { kind: 'system-overview', caption: 'One language across 20+ modules', span: 'full' },
      { kind: 'density', caption: 'Density calibrated for expert daily use', span: 'duo' },
      { kind: 'asset-detail', caption: 'Asset detail — the canonical screen', span: 'duo' },
    ],
  },
  {
    slug: 'toptal',
    num: '02',
    title: 'Growth Design',
    short: 'Growth Design',
    client: 'Toptal',
    category: 'work',
    year: '2019 — 2023',
    role: 'Growth Designer',
    scope: '5 products · homepage, landing pages, calculator, assessment, signup',
    discipline: 'Growth & conversion',
    image: IMG('toptal.jpg'),
    imageAlt: 'Earth from space at night, city lights of a global network',
    description:
      'Four years of growth design on the freelancer side of Toptal — homepage, dynamic landing pages, a rate calculator, talent assessment, and a rebuilt signup. The brief: turn freelancers into leads, keep the journey consistent end to end, and make the pages earn their traffic organically.',
    kpis: [
      { label: 'Years at Toptal', value: 4 },
      { label: 'Products shipped', value: 5 },
    ],
    plates: [
      { kind: 'funnel', caption: 'The funnel, measured at every step', span: 'full' },
      { kind: 'landing-variants', caption: 'Landing variants under test', span: 'duo' },
      { kind: 'experiments', caption: 'Experiments — ship or kill', span: 'duo' },
    ],
  },
  {
    slug: 'fit4box',
    num: '03',
    title: 'Fit4Box — Crossfit Apparel Brand',
    short: 'Fit4Box',
    client: 'Fit4Box',
    category: 'work',
    year: 'Jul 2023 — Feb 2024',
    role: 'Founder & Designer',
    scope: 'Brand · e-commerce · apparel',
    discipline: 'Brand & art direction',
    image: IMG('fit4box.jpg'),
    imageAlt: 'Athlete training with battle ropes in a gym',
    description:
      'My own brand — CrossFit apparel built for people who actually train. I ran the whole thing for eight months: identity, e-commerce, photography direction, and the product line itself.',
    kpis: [
      { label: 'SKUs shipped', value: 100, suffix: '+' },
      { label: 'Repeat customers', value: 38, suffix: '%' },
      { label: 'Organic followers', value: 500, suffix: '+' },
      { label: 'Months trading', value: 8 },
    ],
    plates: [
      { kind: 'identity', caption: 'Identity — built to be worn, not framed', span: 'full' },
      { kind: 'lookbook', caption: 'Lookbook grid, photography direction', span: 'duo' },
      { kind: 'pdp', caption: 'Product page — zero friction to the rack', span: 'duo' },
    ],
  },
  {
    slug: 'fluted-glass',
    num: '04',
    title: 'Fluted Glass',
    short: 'Fluted Glass',
    client: 'Self-initiated',
    category: 'lab',
    year: '2026',
    role: 'Design & build',
    scope: 'WebGL refraction study',
    discipline: 'WebGL · Shader',
    image: null,
    plateHero: 'hero-fluted',
    description:
      'WebGL refraction shader study — a faithful replica of the Semplice fluted-glass effect, built as a hero-surface study. The panel below is the live shader, not a screenshot.',
    live: `${HUB}/fluted-glass/`,
  },
  {
    slug: 'marathon-hud',
    num: '05',
    title: 'Marathon HUD',
    short: 'Marathon HUD',
    client: 'Self-initiated',
    category: 'lab',
    year: '2026',
    role: 'Design & build',
    scope: 'Interactive race-preview HUD',
    discipline: 'Widget · HUD',
    image: null,
    plateHero: 'hero-marathon',
    description:
      'Race-telemetry heads-up widget — live pace, splits, and effort readouts. The panel below is the live working demo, not a screenshot.',
    live: `${HUB}/marathon-preview/`,
  },
  {
    slug: 'button-system',
    num: '06',
    title: 'Button System',
    short: 'Button System',
    client: 'Self-initiated',
    category: 'lab',
    year: '2026',
    role: 'Design & build',
    scope: 'Headless component study',
    discipline: 'Components · Base UI',
    image: null,
    plateHero: 'hero-buttons',
    description:
      'Headless button showcase on Base UI — variants, sizes, states, theming. The panel below is the live app, not a screenshot.',
    live: `${HUB}/option2/`,
  },
  {
    slug: 'timeline',
    num: '07',
    title: 'Timeline Prototype',
    short: 'Timeline',
    client: 'Self-initiated',
    category: 'lab',
    year: '2026',
    role: 'Design & build',
    scope: 'Drag-scroll interaction study',
    discipline: 'Study · Vanilla JS',
    image: null,
    plateHero: 'hero-timeline',
    description:
      'Drag-scroll history timeline — a recreation of Floema’s “Our history” section, rAF-eased. The panel below is the live prototype, not a screenshot.',
    live: `${HUB}/timeline-prototype/`,
  },
]

export const WORK = PROJECTS.filter((p) => p.category === 'work')
export const LAB = PROJECTS.filter((p) => p.category === 'lab')

export const bySlug = (slug) => PROJECTS.find((p) => p.slug === slug)

export const nextOf = (slug) => {
  const i = PROJECTS.findIndex((p) => p.slug === slug)
  return PROJECTS[(i + 1) % PROJECTS.length]
}

export const BIO = [
  'Currently leading design operations for Farsight at BaxEnergy — a Yokogawa company — where I took every screen under my umbrella and am accountable for how the whole product feels.',
  'I work where the problems are hardest and the users care the most: enterprise SaaS, real-time control rooms, growth funnels that turn pixels into revenue. I also ran Fit4Box, my own CrossFit apparel brand, because sometimes you need to ship your own thing.',
  'Based in São Paulo, available for one senior engagement in Q3 2026. Currently open to full-time leadership roles and select freelance projects.',
]

export const STATS = [
  { label: 'Years designing', value: 20, suffix: '+' },
  { label: 'Teams led', value: 6 },
  { label: 'Modules shipped', value: 20, suffix: '+' },
  { label: 'Clients served', value: 10, suffix: '+' },
]

export const CLIENTS = [
  { name: 'BaxEnergy — a Yokogawa Company', years: 'Since 2024' },
  { name: 'Fit4Box', years: 'Jul 2023 to Feb 2024' },
  { name: 'Toptal', years: 'Apr 2019 to Feb 2023' },
  { name: 'Accenture / Fjord', years: '2016 to 2019' },
]

export const LINKS = {
  email: 'hello@finageiv.com',
  linkedin: 'https://linkedin.com/in/andrefinageiv/',
  instagram: 'https://instagram.com/af.design',
}
