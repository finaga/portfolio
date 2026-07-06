// Abstracts, roles, scopes, years, KPIs, and all deep-dive narrative are
// André's voice, migrated verbatim from portfolio/data.js (post PR #8) —
// do not rewrite.
//
// Stream imagery: cases mix real product screenshots (Farsight design
// system, Turbulence Intensity KPI pages, Grid-Ops dashboards) with
// editorial "plate" diagrams (see lib/plate.js) — the same instrument-panel
// data visualizations the old portfolio used. Experiments with no shareable
// photo get a plate label + a live iframe of the actual working demo.
import { plate } from '../lib/plate'
import heroFarsight from '../assets/images/bg-farsight.jpg'
import heroGridOps from '../assets/images/bg-grid-ops.jpg'
import heroToptal from '../assets/images/bg-toptal.jpg'
import heroFit4box from '../assets/images/bg-fit4box.jpg'
import heroErico from '../assets/images/bg-erico.jpg'
import heroDestiny from '../assets/images/bg-destiny-pixel.png'
import imgTiOverTime from '../assets/images/ti-over-time.png'
import imgTiPowerCurve from '../assets/images/ti-power-curve.png'
import imgDesignSystem from '../assets/images/design-system.png'
import imgDashWidgets from '../assets/images/dashboard-widgets.png'
import imgDash1 from '../assets/images/dashboard-1.png'

export const categories = [
  { key: 'case', label: 'Case Studies' },
  { key: 'experiment', label: 'Experiments' },
]

export const projects = [
  // ------------------------------------------------------------------ cases
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
      'Farsight shipped with no unified design direction — new modules clashed, onboarding suffered, entry-users were lost. I led the visual and UX reset: a 3-layer token architecture, 24 production components, and a reusable KPI-page pattern that let 30+ engineers across 6 teams ship consistent analysis pages without re-inventing layout each time.',
    hero: heroFarsight,
    heroAspect: 66.667,
    kpis: [
      { label: 'Clients onboarded', value: 10, suffix: '+' },
      { label: 'New modules', value: 20, suffix: '+' },
      { label: 'Engineers guided', value: 30, suffix: '+' },
      { label: 'Teams aligned', value: 6 },
    ],
    images: [
      { src: imgTiOverTime, aspect: 36, span: 'full', alt: 'Turbulence Intensity KPI page — reference template' },
      { src: imgDesignSystem, aspect: 66.667, span: 'left', alt: 'Design system token and component viewer' },
      { src: imgTiPowerCurve, aspect: 49.7, span: 'right', alt: 'Power curve coloured by turbulence regime' },
      { src: plate('system-overview', { tone: 'dark' }), aspect: 66.667, span: 'center' },
    ],
    impact: [
      { k: 'Clients onboarded', note: 'Enterprise rollouts ship without bespoke UI per tenant.' },
      { k: 'New modules', note: 'New surface area ships on-system — no more quarterly re-skin.' },
      { k: 'Engineers guided', note: 'Design reviews embedded in every sprint across 6 teams.' },
      { k: 'Teams aligned', note: 'One type scale, one density, one motion language.' },
    ],
    deep: {
      context:
        'Farsight is BaxEnergy\'s flagship platform for monitoring renewable-energy assets — wind, solar, hydro, storage — at utility scale. When I joined, the product had grown by accretion: six teams, each owning their modules, each drifting in their own direction. Different densities, three button variants, two motion languages, inconsistent severity colors. The cost landed on the users — grid operators, not software engineers — who had to relearn the interface every time they crossed a module boundary. Heavy-weight users shipped around it with keyboard hacks and saved queries; entry users quit. Sales demos started with apologies. The engineering leads weren\'t wrong — they were unmanaged.',
      approach:
        'I ran a 6-week audit across every module, catalogued every control, state, and motion curve, and mapped the overlaps and conflicts. Then I rebuilt the vocabulary from zero: one type scale, four density modes (so the same component reads at both a laptop and a 4K wall), one severity color ramp, one stepped motion language. The system itself has three layers — primitives, semantic aliases, components — validated by an automated pipeline so a raw hex value never survives review; it now ships 24 production components in light and dark. For the analysis surfaces specifically, I built one KPI-page pattern — header, control bar, KPI strip, chart array — starting with the Turbulence Intensity page, then reused it verbatim for Wind Curtailment, NTF, and Solar Analysis, so every new analysis page shipped in days, not a fresh layout negotiation. The deliverable was not a Figma file — it was a shared ritual. Design reviews embedded in every sprint. A weekly system-sync with eng leads where we argued tradeoffs before code, not after. Most importantly: I co-owned roadmap decisions with engineering, so design constraints became product constraints. Killing the "designer hands off, engineering re-invents" loop was worth more than any specific token.',
      outcome:
        'Over 18 months: 20+ new modules shipped on-system, 10+ enterprise clients onboarded without custom design work, 30+ engineers fluent in the language. The system scales without me — junior designers ship against it, engineers catch drift in review. What the numbers don\'t show: the sales org stopped starting demos with apologies, and onboarding for a new grid operator dropped from weeks to days. Design stopped being a cost center; it became a velocity multiplier.',
      reflection:
        'What I\'d do differently: I under-invested in component governance early. For the first quarter I was the bottleneck — every new token came through me. I should have handed ownership to a lead-per-team sooner and kept only final sign-off. The lesson: systems scale when authorship does. My job is to make my role redundant.',
    },
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
      'Grid-Ops is the command surface for operators monitoring thousands of renewable assets in real time — a portfolio dashboard built on a 12-column widget grid with 9 reusable chart types (KPI cards, stacked-area, donut, gauge, heatmap, sparkline tables, scatter maps). The brief: cut time-to-diagnose, reduce alarm fatigue, make the interface readable at 3am on a 4K wall.',
    hero: heroGridOps,
    heroAspect: 66.667,
    kpis: [
      { label: 'Time-to-diagnose', value: 62, prefix: '−', suffix: '%' },
      { label: 'Alarm fatigue', value: 48, prefix: '−', suffix: '%' },
      { label: 'Assets monitored', value: 12, suffix: 'k' },
      { label: 'Uptime', value: 99.9, suffix: '%', decimals: 1 },
    ],
    images: [
      { src: imgDashWidgets, aspect: 70.3, span: 'full', alt: 'Portfolio dashboard — 12-column widget grid, 9 chart types' },
      { src: imgDash1, aspect: 37.4, span: 'center', alt: 'Fleet availability dashboard' },
      { src: plate('alert-triage', { tone: 'dark' }), aspect: 66.667, span: 'left' },
      { src: plate('before-after', { tone: 'dark' }), aspect: 66.667, span: 'right' },
    ],
    impact: [
      { k: 'Time-to-diagnose', note: 'A shift lead now handles 3 concurrent incidents where one used to saturate them.' },
      { k: 'Alarm fatigue', note: 'Operators stopped dismissing alarms by reflex — real criticals get acted on.' },
      { k: 'Assets monitored', note: '12k assets across wind, solar, and storage surface in one coherent view.' },
      { k: 'Uptime', note: 'Four control centers across Europe and Asia-Pacific, zero UI-caused incidents.' },
    ],
    deep: {
      context:
        'Grid-Ops operators work 12-hour shifts inside control rooms that never sleep. A single dispatcher watches thousands of turbines, inverters, and substations across a continent, and the consequence of missing something isn\'t a bad UX score — it\'s a grid event, a fined customer, or worse. The legacy UI was built by the engineers who understood the data best, which meant everything shouted. Every anomaly — a 2°C temperature drift, a critical ground fault — looked the same shade of red. Operators coped by dismissing alarms in bulk, which meant real criticals got lost in noise. On ride-alongs I watched a shift lead miss an inverter fault for 11 minutes because it rendered identically to 40 routine warnings stacked above it. That was the north star: the UI should not be a source of cognitive load at 3am.',
      approach:
        'Three decisions shaped everything. First, severity-first information architecture: every screen sorts by impact, not by timestamp or asset ID. A critical fault owns the top of the viewport until acknowledged; lows fall into an ambient band that can be scanned peripherally. Second, color as hazard, not decoration: I pulled red from the palette entirely except for genuine P0 events. Standard state lives in neutral steel; severity uses shape, position, and weight before it uses hue. Third, stepped mechanical motion — no springs, no easing flourishes. Operators read motion as change, so a wobble means data moved; a slide means the user moved. Spring physics in a control room is a lie. I also designed four density modes so the same components read at a laptop, a wall-desk, and a 4K control wall without re-layout. The dashboard itself is a drag-and-resize 12-column widget grid, so an operator\'s own priority view — which KPIs, which chart type, which arrangement — persists per-shift without engineering time; the same 9 chart primitives compose every widget on the wall.',
      outcome:
        'Time-to-diagnose cut by 62% on the internal benchmark. Alarm-fatigue survey scores dropped 48% over six months. The operational result is what mattered: a shift lead now handles three concurrent incidents where one used to saturate them. Deployed across four control centers in Europe and Asia-Pacific, monitoring 12k+ assets at 99.9% uptime. One grid operator put it best in a post-launch interview: "I don\'t fight the screen anymore."',
      reflection:
        'The hardest decision was killing color. Engineering pushed back hard — red is information density, they said. I built the dark-mode prototype, put it in a real control room for a week, and let the operators decide. They decided in an hour. The lesson: when domain experts defend the status quo on first principles, get them in a room with the users. First principles lose to lived experience.',
    },
  },
  {
    slug: 'financial-losses',
    title: 'Financial Losses — Loss Taxonomy & Revenue Strategy',
    short: 'Financial Losses',
    client: 'BaxEnergy — a Yokogawa Company',
    category: 'case',
    year: '2026',
    role: 'Design Lead · Product Strategy',
    scope: 'Research → spec · loss-accounting module',
    description:
      'Farsight could tell an operator an asset\'s availability % but never how much revenue that represented, or why. I bridged three conflicting IEC standards — pre-construction, operational, contractual — into one loss taxonomy, and exposed the industry\'s most-disputed number: the 1–2% gap between OEM-reported and technical availability. The brief: turn a compliance metric into an auditable revenue argument.',
    hero: plate('loss-waterfall', { tone: 'dark' }),
    heroAspect: 66.667,
    kpis: [
      { label: 'Loss categories mapped', value: 8 },
      { label: 'IEC standards bridged', value: 3 },
      { label: 'Competitors benchmarked', value: 6 },
      { label: 'Differentiation angles', value: 3 },
    ],
    images: [
      { src: plate('loss-waterfall', { tone: 'dark' }), aspect: 66.667, span: 'full' },
      { src: plate('availability-gap', { tone: 'dark' }), aspect: 66.667, span: 'center' },
    ],
    impact: [
      { k: 'Loss categories mapped', note: 'Every lost MWh now has a named cause — fault, curtailment, environmental, missing data — instead of one blended availability number.' },
      { k: 'IEC standards bridged', note: 'What the energy assessor predicted at project finance can finally be compared to what Farsight reports operationally — no platform on the market does this.' },
      { k: 'Competitors benchmarked', note: 'Benchmarked against Power Factors, Bazefield, Vestas Scipher, GE APM, Clir, and AVEVA to find where every existing platform under-serves the financial layer.' },
      { k: 'Differentiation angles', note: 'Three scoped opportunities handed to product and engineering, ranked by design complexity vs. contract/investor value.' },
    ],
    deep: {
      context:
        'Farsight monitors wind, solar, and BESS assets and reports availability as a single percentage. It has never answered the two questions asset owners actually ask: how much energy did we lose and why, and how much revenue did that represent? The gap is structural, not cosmetic. Three IEC standards define this space — 61400-15 for pre-construction loss waterfalls, 61400-26-1/-2 for operational availability — and they use incompatible category definitions. An asset manager cannot compare what an energy assessor predicted at project finance with what the REMS reports two years into operation. Worse: the same operational data produces three legitimate but different availability numbers — technical, operational, contractual — depending on whether scheduled maintenance counts as downtime. The contractual number (the one OEMs report) runs 1–2% higher than the technical one by design. That 1–2% is real revenue, and it is the single largest source of disputes between asset owners and turbine OEMs.',
      approach:
        'Three moves. First, I built a Farsight-native loss taxonomy — 8 categories — that maps cleanly onto IEC 61400-26\'s 13 operational turbine states while staying legible to an operator who has never read the standard: "turbine fault," "grid curtailment," "no wind," not state codes. Second, I split "compensated curtailment" out as its own category: when a grid operator curtails a site and pays for the lost production, that MWh is not a real revenue loss, and most platforms conflate it with uncompensated curtailment, systematically overstating losses. Third, I specced the page around two audiences sharing one dataset instead of two builds — Operator mode (last 7 days, MWh, "what\'s losing right now," click-through to the asset) and Manager mode (month-to-date, €, export) — because the same loss ledger has to serve a control-room decision and a board report without becoming two products. I benchmarked six platforms (Power Factors, Bazefield, Vestas, GE APM, Clir, AVEVA) to confirm the gap was real: nobody bridges pre-construction and operational taxonomies, and financial translation everywhere else is a single price multiplier bolted onto MWh, not a first-class model.',
      outcome:
        'This shipped as a research brief and locked page structure — header, KPI strip, loss waterfall, category trend, detail table — not yet a built module; the open questions (which categories the backend can derive today, what price reference to use, whether curtailment compensation applies per client) went to product and engineering with clear ownership rather than sitting as unstated assumptions in a Figma file. Three differentiation angles came out ranked by cost and value: bridging the two IEC taxonomies (high design complexity, high investor value), a first-class carve-out ledger for OEM warranty disputes (medium complexity, very high contract value), and a toggle between the three availability definitions so the 1–2% gap becomes visible and auditable instead of a line item in a dispute (high value for owners in active OEM negotiations). Any of the three is a sellable feature on its own.',
      reflection:
        'What I\'d do differently: I wrote most of this from standards documents and competitor teardown before pressure-testing the taxonomy with a single asset manager conversation. The 8 categories are probably right, but I don\'t yet know which distinctions an asset manager actually argues about at contract renewal versus which ones only matter to an energy assessor. The lesson: reference standards give you shared vocabulary, but only a domain user tells you which distinctions carry money.',
    },
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
    kpis: [
      { label: 'Signup completion', value: 37, prefix: '+', suffix: '%' },
      { label: 'CPA', value: 24, prefix: '−', suffix: '%' },
      { label: 'Experiments shipped', value: 8 },
      { label: 'Lift compound', value: 2.1, suffix: '×', decimals: 1 },
    ],
    images: [
      { src: heroToptal, aspect: 66.667, span: 'full', alt: 'Growth Funnel hero' },
      { src: plate('landing-variants', { tone: 'dark' }), aspect: 66.667, span: 'left' },
      { src: plate('funnel', { tone: 'dark' }), aspect: 66.667, span: 'right' },
      { src: plate('experiments', { tone: 'dark' }), aspect: 66.667, span: 'center' },
    ],
    impact: [
      { k: 'Signup completion', note: 'More qualified talent reaching the screen without softening the bar.' },
      { k: 'CPA', note: 'Same quality, cheaper acquisition — the growth team reallocated the delta.' },
      { k: 'Experiments shipped', note: '8 shipped variants built on a shared hypothesis library, not one-off tests.' },
      { k: 'Lift compound', note: '2.1× over control — compounding came from staying in the same flow for a year.' },
    ],
    deep: {
      context:
        'Toptal\'s top-of-funnel signup had plateaued. The product team had run dozens of tests and were getting diminishing returns — a hero-image swap, a CTA-color tweak, a headline A/B — all within noise. The hard constraint was that Toptal can\'t just "make it easier to sign up." The entire business model depends on the quality bar holding; more applicants matters only if they\'re more qualified applicants. So the question wasn\'t "how do we lift conversion" — it was "how do we lift qualified conversion without cutting the filter." That required treating the form as a product, not a wall.',
      approach:
        'Three moves. First, I reframed the form as a conversation, not a gate. The old form front-loaded every sensitive question — resume, rate, legal status, references — on page one. Drop-off was enormous. I rebuilt it as progressive disclosure: skills and experience first (candidates love talking about those), credentials and rate later (once they\'ve invested). Second, social-proof at micro-moments: peer counts, domain-specific testimonials placed at the exact points on the hesitation curve where drop-off clustered. Third, a hypothesis library — every test logged its prior, the question it answered, and the cross-experiment interactions. Instead of 8 independent tests we got one learning system; we could compound lifts by knowing which variants played well together.',
      outcome:
        '+37% completion, −24% CPA, 2.1× compound lift over the control across 8 shipped experiments. The quality bar held — the filter moved from the form into the vetting loop behind it. Growth reallocated the CPA delta into new channels. The hypothesis library outlived the project: the team kept using it for two years after I left.',
      reflection:
        'The biggest surprise was how much of the lift came from removing a single credentials-upload step from page one. A full quarter of the compound came from that one change. The lesson: in growth work, the expensive tests aren\'t the ones that move the number — the expensive ones are the ones that tell you which decision in the flow is actually binding. Everything else is local optimization.',
    },
  },

  // ------------------------------------------------------------ experiments
  {
    slug: 'fit4box',
    title: 'Fit4Box — Crossfit Apparel Brand',
    short: 'Fit4Box',
    client: 'Fit4Box',
    category: 'experiment',
    year: '2023 — Present',
    role: 'Founder & Designer',
    scope: 'Brand · e-commerce · apparel',
    description:
      'My own brand — Crossfit apparel built for people who actually train. I run the whole thing: identity, e-commerce, photography direction, and the product line itself.',
    hero: heroFit4box,
    heroAspect: 66.667,
    kpis: [
      { label: 'SKUs shipped', value: 42 },
      { label: 'Repeat customers', value: 38, suffix: '%' },
      { label: 'Months running', value: 24 },
    ],
    images: [
      { src: heroFit4box, aspect: 66.667, span: 'full', alt: 'Fit4Box athlete' },
      { src: plate('identity', { tone: 'light' }), aspect: 66.667, span: 'right' },
      { src: plate('lookbook', { tone: 'light' }), aspect: 66.667, span: 'left' },
    ],
  },
  {
    slug: 'erico-adv',
    title: 'Erico Advogados — Brand Microsite',
    short: 'Erico Adv',
    client: 'Erico Advogados',
    category: 'experiment',
    year: '2026',
    role: 'Brand & Web Designer',
    scope: 'Brand microsite · single-page',
    description:
      'A brand microsite for a Brasília strategic-litigation firm, taken from positioning brief through to a deployed production build — plus a second, animation-heavy dark concept built to compare against the shipped direction.',
    hero: heroErico,
    heroAspect: 66.667,
    liveUrl: 'https://ericoadv.vercel.app',
    kpis: [
      { label: 'Logo variants', value: 60, suffix: '+' },
      { label: 'Design concepts', value: 2 },
      { label: 'Build step', value: 0 },
    ],
    images: [{ src: heroErico, aspect: 66.667, span: 'full', alt: 'Erico Advogados hero' }],
  },
  {
    slug: 'destiny-pixel',
    title: 'Destiny Pixel — Run & Gun',
    short: 'Destiny Pixel',
    client: 'Personal',
    category: 'experiment',
    year: '2026',
    role: 'Solo Designer / Builder',
    scope: 'Kaplay engine · single-file · solo',
    description:
      'A Destiny-inspired pixel-art run-and-gun built solo end-to-end — three playable classes, five enemy variants, and a three-phase boss fight — directed and built through AI-orchestrated iteration rather than a traditional dev team.',
    hero: heroDestiny,
    heroAspect: 66.99,
    liveUrl: 'https://destiny-pixel.vercel.app',
    kpis: [
      { label: 'Playable classes', value: 3 },
      { label: 'Enemy variants', value: 5 },
      { label: 'Boss phases', value: 3 },
    ],
    images: [{ src: heroDestiny, aspect: 66.99, span: 'full', alt: 'Destiny Pixel title screen' }],
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
    liveUrl: '/marathon-preview/',
    kpis: [
      { label: 'Race distance', value: 42.2, suffix: 'km', decimals: 1 },
      { label: 'Live readouts', value: 3 },
    ],
    images: [{ kind: 'iframe', src: '/marathon-preview/', aspect: 66.667, span: 'full' }],
  },
  {
    slug: 'tabuada-pokemon',
    title: 'Pokémon Times Tables',
    short: 'Pokémon Tables',
    client: 'Personal',
    category: 'experiment',
    year: '2026',
    role: 'Design & build',
    scope: 'Educational HTML game',
    description:
      'A Pokémon-themed multiplication trainer built for my daughter — clear the times tables, catch the Pokémon. The panel below is the live game, not a screenshot.',
    hero: plate('label', {
      tone: 'dark',
      eyebrow: 'GAME · EDUCATION',
      title: 'TABUADA',
      sub: 'POKÉMON TIMES TABLES',
    }),
    heroAspect: 66.667,
    liveUrl: '/tabuada-pokemon/',
    kpis: [
      { label: 'Times tables', value: 10 },
      { label: 'Player that matters', value: 1 },
    ],
    images: [{ kind: 'iframe', src: '/tabuada-pokemon/', aspect: 66.667, span: 'full' }],
  },
  {
    slug: 'claude-usage-meter',
    title: 'Claude Usage Meter',
    short: 'Usage Meter',
    client: 'Personal',
    category: 'experiment',
    year: '2026',
    role: 'Design & build',
    scope: 'macOS menu-bar app · Swift',
    description:
      'A native macOS menu-bar app that tracks Claude usage in real time — Swift, no Electron, built because I wanted the number one glance away.',
    hero: plate('label', {
      tone: 'dark',
      eyebrow: 'MACOS · MENU BAR',
      title: 'USAGE METER',
      sub: 'NATIVE SWIFT · CLAUDE API',
    }),
    heroAspect: 66.667,
    kpis: [
      { label: 'Native Swift', value: 100, suffix: '%' },
      { label: 'Electron', value: 0 },
    ],
    images: [
      { src: plate('label', { tone: 'dark', eyebrow: 'MACOS · MENU BAR', title: 'USAGE METER', sub: 'NATIVE SWIFT · CLAUDE API' }), aspect: 66.667, span: 'full' },
    ],
  },
]

export const bySlug = (slug) => projects.find((p) => p.slug === slug)

export const cases = projects.filter((p) => p.category === 'case')
export const experiments = projects.filter((p) => p.category === 'experiment')

// Next project within the same category (cyclic) — used by the dark
// footer finale on case and experiment pages.
export const nextOf = (slug) => {
  const p = bySlug(slug)
  if (!p) return null
  const pool = p.category === 'case' ? cases : experiments
  const i = pool.findIndex((x) => x.slug === slug)
  return pool[(i + 1) % pool.length]
}

export const related = (slug, n = 4) => {
  const rest = projects.filter((p) => p.slug !== slug && p.category === 'case')
  return rest.slice(0, n)
}

// Route helper — cases and experiments live at different paths.
export const pathFor = (p) =>
  p.category === 'case' ? `/case/${p.slug}` : `/exp/${p.slug}`
