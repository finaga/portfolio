// Abstracts, roles, scopes, years, KPIs, bio and stats are André's voice,
// verbatim from portfolio/data.js, folio-src/src/data/cases.js and the hub —
// do not rewrite.

const HUB = 'https://portfolio-finaga-5767s-projects.vercel.app'
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
    slug: 'grid-ops',
    num: '02',
    title: 'Grid-Ops Control Center',
    short: 'Grid-Ops',
    client: 'BaxEnergy — a Yokogawa Company',
    category: 'work',
    year: '2023',
    role: 'Senior Product Designer',
    scope: 'Real-time SaaS · 24/7 control room',
    discipline: 'Product design',
    image: IMG('grid-ops.jpg'),
    imageAlt: 'Industrial control room with wall displays',
    description:
      'Grid-Ops is the command surface for operators monitoring thousands of renewable assets in real time. The brief: cut time-to-diagnose, reduce alarm fatigue, make the interface readable at 3am on a 4K wall.',
    kpis: [
      { label: 'Time-to-diagnose', value: 62, prefix: '−', suffix: '%' },
      { label: 'Alarm fatigue', value: 48, prefix: '−', suffix: '%' },
      { label: 'Assets monitored', value: 12, suffix: 'k' },
      { label: 'Uptime', value: 99.9, suffix: '%', decimals: 1 },
    ],
    plates: [
      { kind: 'control-room', caption: 'Readable at 3am on a 4K wall', span: 'full' },
      { kind: 'alert-triage', caption: 'Alarm triage — severity before noise', span: 'duo' },
      { kind: 'before-after', caption: 'Time-to-diagnose, before and after', span: 'duo' },
    ],
  },
  {
    slug: 'toptal',
    num: '03',
    title: 'Growth Funnel Redesign',
    short: 'Growth Funnel',
    client: 'Toptal',
    category: 'work',
    year: '2022',
    role: 'Product Designer · Growth',
    scope: 'Acquisition funnel · 8 A/B tests',
    discipline: 'Growth & conversion',
    image: IMG('toptal.jpg'),
    imageAlt: 'Earth from space at night, city lights of a global network',
    description:
      'Rethought the top-of-funnel flow for talent signup. Cut form friction without cutting qualification. Every pixel on these pages costs or earns money — so every change ran as an experiment.',
    kpis: [
      { label: 'Signup completion', value: 37, prefix: '+', suffix: '%' },
      { label: 'Cost per acquisition', value: 24, prefix: '−', suffix: '%' },
      { label: 'Experiments shipped', value: 8 },
      { label: 'Compound lift', value: 2.1, suffix: '×', decimals: 1 },
    ],
    plates: [
      { kind: 'funnel', caption: 'The funnel, measured at every step', span: 'full' },
      { kind: 'landing-variants', caption: 'Landing variants under test', span: 'duo' },
      { kind: 'experiments', caption: 'Eight experiments, one compounding lift', span: 'duo' },
    ],
  },
  {
    slug: 'fit4box',
    num: '04',
    title: 'Fit4Box — Crossfit Apparel Brand',
    short: 'Fit4Box',
    client: 'Fit4Box',
    category: 'work',
    year: '2023 — Present',
    role: 'Founder & Designer',
    scope: 'Brand · e-commerce · apparel',
    discipline: 'Brand & art direction',
    image: IMG('fit4box.jpg'),
    imageAlt: 'Athlete training with battle ropes in a gym',
    description:
      'My own brand — Crossfit apparel built for people who actually train. I run the whole thing: identity, e-commerce, photography direction, and the product line itself.',
    kpis: [
      { label: 'SKUs shipped', value: 42 },
      { label: 'Repeat customers', value: 38, suffix: '%' },
      { label: 'Organic followers', value: 4.2, suffix: 'k', decimals: 1 },
      { label: 'Months running', value: 24 },
    ],
    plates: [
      { kind: 'identity', caption: 'Identity — built to be worn, not framed', span: 'full' },
      { kind: 'lookbook', caption: 'Lookbook grid, photography direction', span: 'duo' },
      { kind: 'pdp', caption: 'Product page — zero friction to the rack', span: 'duo' },
    ],
  },
  {
    slug: 'fluted-glass',
    num: '05',
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
    num: '06',
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
    num: '07',
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
    num: '08',
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
  'I work where the problems are hardest and the users care the most: enterprise SaaS, real-time control rooms, growth funnels that turn pixels into revenue. I also run Fit4Box, my own Crossfit apparel brand, because sometimes you need to ship your own thing.',
  'Based in São Paulo, available for one senior engagement in Q3 2026. Currently open to full-time leadership roles and select freelance projects.',
]

export const STATS = [
  { label: 'Years designing', value: 20, suffix: '+' },
  { label: 'Teams led', value: 6 },
  { label: 'Modules shipped', value: 20, suffix: '+' },
  { label: 'Clients served', value: 10, suffix: '+' },
]

export const CLIENTS = [
  { name: 'BaxEnergy', years: 'Since 2022' },
  { name: 'Yokogawa', years: 'Since 2023' },
  { name: 'Toptal', years: '2019 to 2022' },
  { name: 'Fit4Box', years: 'Since 2024' },
]

export const LINKS = {
  email: 'hello@finageiv.com',
  linkedin: 'https://linkedin.com/in/andrefinageiv/',
  instagram: 'https://instagram.com/af.design',
}
