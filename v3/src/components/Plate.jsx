// Editorial plates — honest system/data diagrams standing in for enterprise
// work that can't be screenshotted (NDA). Drawn in the two site colors only.
// tone 'paper': ink strokes on bone. tone 'ink': bone strokes on ink.

const W = 800
const H = 500

function Frame({ tone = 'paper', children, label }) {
  const isInk = tone === 'ink'
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label={label}
      preserveAspectRatio="xMidYMid slice"
      style={{ color: isInk ? 'var(--bg)' : 'var(--ink)', display: 'block', width: '100%', height: 'auto' }}
    >
      <rect width={W} height={H} fill={isInk ? 'var(--ink)' : 'var(--bg-2)'} />
      {children}
    </svg>
  )
}

const ln = (x1, y1, x2, y2, o = 0.3, w = 1) => (
  <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth={w} opacity={o} />
)
const box = (x, y, w, h, o = 0.4, sw = 1) => (
  <rect x={x} y={y} width={w} height={h} fill="none" stroke="currentColor" strokeWidth={sw} opacity={o} />
)
const bar = (x, y, w, h, o = 1) => <rect x={x} y={y} width={w} height={h} fill="currentColor" opacity={o} />
const txt = (x, y, s, size = 13, o = 0.75, anchor = 'start', weight = 560) => (
  <text
    x={x} y={y}
    fontFamily="var(--sans)"
    fontSize={size}
    fontWeight={weight}
    letterSpacing="0.08em"
    fill="currentColor"
    opacity={o}
    textAnchor={anchor}
    style={{ textTransform: 'uppercase' }}
  >
    {s}
  </text>
)

/* ---- Farsight ---- */

function SystemOverview() {
  // 20+ modules aligning to one system: a field of module cells converging
  // on a single highlighted language block.
  const cells = []
  const cols = 8, rows = 3
  const cw = 84, ch = 84, gx = 8, gy = 8
  const ox = (W - cols * (cw + gx) + gx) / 2
  const oy = 120
  let n = 0
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      n++
      const x = ox + c * (cw + gx)
      const y = oy + r * (ch + gy)
      const hot = r === 1 && c === 3
      cells.push(
        <g key={`${r}-${c}`}>
          {hot ? bar(x, y, cw, ch) : box(x, y, cw, ch, 0.35)}
          <text x={x + 10} y={y + 24} fontFamily="var(--sans)" fontSize="12" fontWeight="560"
            fill={hot ? 'var(--bg)' : 'currentColor'} opacity={hot ? 1 : 0.55}>
            {String(n).padStart(2, '0')}
          </text>
          {!hot && ln(x + 10, y + ch - 18, x + 10 + 40, y + ch - 18, 0.35)}
          {!hot && ln(x + 10, y + ch - 10, x + 10 + 26, y + ch - 10, 0.2)}
        </g>
      )
    }
  }
  return (
    <Frame label="System overview diagram — twenty modules aligned to one design language">
      {txt(40, 60, 'Farsight — Design system', 13)}
      {txt(W - 40, 60, '20+ modules · 6 teams', 13, 0.5, 'end')}
      {ln(40, 80, W - 40, 80, 0.4)}
      {cells}
      {ln(40, 430, W - 40, 430, 0.4)}
      {txt(40, 456, 'One language', 13)}
      {txt(W - 40, 456, '30+ engineers', 13, 0.5, 'end')}
    </Frame>
  )
}

function Density() {
  // Data-table density study: tight rows, calibrated columns.
  const rows = []
  for (let i = 0; i < 12; i++) {
    const y = 116 + i * 26
    rows.push(
      <g key={i}>
        {ln(40, y, W - 40, y, i === 0 ? 0.5 : 0.18)}
        {bar(40, y + 9, 26 + ((i * 37) % 60), 7, 0.7)}
        {bar(200, y + 9, 60 + ((i * 53) % 130), 7, 0.28)}
        {bar(470, y + 9, 40 + ((i * 29) % 80), 7, 0.28)}
        {bar(660, y + 9, 24 + ((i * 17) % 46), 7, i % 3 === 0 ? 0.85 : 0.28)}
      </g>
    )
  }
  return (
    <Frame label="Interface density study — calibrated data table">
      {txt(40, 60, 'Density · expert daily use', 13)}
      {txt(W - 40, 60, 'Grid 8pt', 13, 0.5, 'end')}
      {ln(40, 80, W - 40, 80, 0.4)}
      {txt(40, 104, 'Asset', 11, 0.5)}
      {txt(200, 104, 'Output', 11, 0.5)}
      {txt(470, 104, 'Status', 11, 0.5)}
      {txt(660, 104, 'Δ 24h', 11, 0.5)}
      {rows}
    </Frame>
  )
}

function AssetDetail() {
  return (
    <Frame label="Asset detail screen wireframe — the canonical screen">
      {box(40, 48, W - 80, H - 96, 0.5)}
      {ln(40, 108, W - 40, 108, 0.4)}
      {bar(64, 72, 120, 12, 0.85)}
      {bar(W - 200, 72, 136, 12, 0.3)}
      {/* main chart */}
      {box(64, 136, 448, 216, 0.4)}
      <polyline
        points="88,304 152,268 216,286 280,224 344,240 408,196 472,208"
        fill="none" stroke="currentColor" strokeWidth="2"
      />
      {ln(88, 328, 472, 328, 0.25)}
      {/* side facts */}
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          {ln(544, 152 + i * 52, W - 64, 152 + i * 52, 0.2)}
          {bar(544, 162 + i * 52, 54, 8, 0.3)}
          {bar(640, 162 + i * 52, 96 - i * 14, 8, 0.75)}
        </g>
      ))}
      {/* footer modules */}
      {[0, 1, 2].map((i) => (
        <g key={i}>{box(64 + i * 232, 376, 216, 40, 0.35)}</g>
      ))}
    </Frame>
  )
}

/* ---- Grid-Ops ---- */

function ControlRoom() {
  // 4K wall: panels, one alarming.
  const panels = []
  const cols = 4, rows = 2
  const pw = 164, ph = 130, g = 12
  const ox = (W - cols * (pw + g) + g) / 2
  const oy = 116
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = ox + c * (pw + g), y = oy + r * (ph + g)
      const hot = r === 0 && c === 2
      panels.push(
        <g key={`${r}${c}`}>
          {hot ? bar(x, y, pw, ph) : box(x, y, pw, ph, 0.4)}
          {!hot && (
            <polyline
              points={`${x + 16},${y + ph - 28} ${x + 52},${y + ph - 48 - (c * 7) % 20} ${x + 88},${y + ph - 34} ${x + 124},${y + ph - 56 - (r * 9) % 18} ${x + pw - 16},${y + ph - 40}`}
              fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.7"
            />
          )}
          {hot && (
            <text x={x + pw / 2} y={y + ph / 2 + 7} textAnchor="middle" fontFamily="var(--sans)"
              fontSize="15" fontWeight="600" letterSpacing="0.08em" fill="var(--bg)">
              ALERT 03
            </text>
          )}
        </g>
      )
    }
  }
  return (
    <Frame label="Control-room wall diagram — eight panels, one active alert">
      {txt(40, 60, 'Grid-Ops · control wall', 13)}
      {txt(W - 40, 60, '03:00 · 12k assets', 13, 0.5, 'end')}
      {ln(40, 80, W - 40, 80, 0.4)}
      {panels}
      {ln(40, 430, W - 40, 430, 0.4)}
      {txt(40, 456, 'Time-to-diagnose −62%', 13)}
      {txt(W - 40, 456, 'Uptime 99.9%', 13, 0.5, 'end')}
    </Frame>
  )
}

function AlertTriage() {
  const rows = [0.95, 0.8, 0.55, 0.4, 0.3, 0.22]
  return (
    <Frame label="Alarm triage diagram — severity ranked above noise">
      {txt(40, 60, 'Triage · severity first', 13)}
      {ln(40, 80, W - 40, 80, 0.4)}
      {rows.map((o, i) => {
        const y = 116 + i * 56
        return (
          <g key={i}>
            {ln(40, y + 40, W - 40, y + 40, 0.15)}
            {bar(40, y, 14, 28, o)}
            {bar(78, y + 6, 180 - i * 18, 9, o * 0.85)}
            {bar(78, y + 20, 90 - i * 8, 6, 0.25)}
            {txt(W - 40, y + 22, i < 2 ? 'Act' : i < 4 ? 'Watch' : 'Log', 11, o, 'end')}
          </g>
        )
      })}
    </Frame>
  )
}

function BeforeAfter() {
  return (
    <Frame label="Before and after — diagnosis time cut by 62 percent">
      {ln(W / 2, 48, W / 2, H - 48, 0.3)}
      {txt(40, 60, 'Before', 13, 0.5)}
      {txt(W / 2 + 24, 60, 'After', 13)}
      {/* before: scattered blocks */}
      {[
        [60, 120, 110, 44], [200, 180, 90, 44], [90, 260, 130, 44],
        [240, 330, 100, 44], [70, 390, 80, 44],
      ].map((r, i) => (
        <g key={i}>{box(r[0], r[1], r[2], r[3], 0.35)}</g>
      ))}
      {/* after: aligned stack */}
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>{bar(W / 2 + 24, 120 + i * 72, 300 - i * 60, 44, 0.9 - i * 0.18)}</g>
      ))}
      <text x={W - 40} y={H - 58} textAnchor="end" fontFamily="var(--serif)" fontSize="64" fontWeight="560" fill="currentColor">
        −62%
      </text>
    </Frame>
  )
}

/* ---- Toptal ---- */

function Funnel() {
  const steps = [
    { w: 640, label: 'Visit', v: '100%' },
    { w: 470, label: 'Start', v: '73%' },
    { w: 350, label: 'Qualify', v: '55%' },
    { w: 280, label: 'Complete', v: '+37%' },
  ]
  return (
    <Frame label="Acquisition funnel — signup completion up 37 percent">
      {txt(40, 60, 'Talent signup · top of funnel', 13)}
      {txt(W - 40, 60, '8 experiments', 13, 0.5, 'end')}
      {ln(40, 80, W - 40, 80, 0.4)}
      {steps.map((s, i) => {
        const y = 120 + i * 84
        return (
          <g key={i}>
            {bar(40, y, s.w, 52, i === steps.length - 1 ? 1 : 0.28 + i * 0.14)}
            <text x={52} y={y + 32} fontFamily="var(--sans)" fontSize="13" fontWeight="560" letterSpacing="0.08em"
              fill={i === steps.length - 1 ? 'var(--bg)' : 'currentColor'} style={{ textTransform: 'uppercase' }}>
              {s.label}
            </text>
            {txt(W - 40, y + 32, s.v, 13, 0.7, 'end')}
          </g>
        )
      })}
    </Frame>
  )
}

function LandingVariants() {
  const wire = (x, hero) => (
    <g>
      {box(x, 100, 320, 330, 0.45)}
      {bar(x + 20, 124, 90, 10, 0.8)}
      {hero ? (
        <>
          {bar(x + 20, 156, 280, 90, 0.85)}
          {bar(x + 20, 262, 190, 12, 0.35)}
          {bar(x + 20, 284, 150, 12, 0.35)}
          {bar(x + 20, 320, 120, 34, 0.9)}
        </>
      ) : (
        <>
          {bar(x + 20, 156, 200, 14, 0.5)}
          {bar(x + 20, 180, 240, 14, 0.35)}
          {[0, 1, 2].map((i) => (
            <g key={i}>{box(x + 20, 214 + i * 52, 280, 38, 0.3)}</g>
          ))}
          {bar(x + 20, 380, 120, 34, 0.9)}
        </>
      )}
    </g>
  )
  return (
    <Frame label="Two landing page variants under A/B test">
      {txt(60, 78, 'Variant A', 12, 0.55)}
      {txt(440, 78, 'Variant B — winner', 12)}
      {wire(60, true)}
      {wire(440, false)}
    </Frame>
  )
}

function Experiments() {
  const outcomes = [1, 1, 0, 1, 0, 1, 1, 1]
  return (
    <Frame label="Eight A/B experiments — six wins compounding to 2.1x lift">
      {txt(40, 60, 'Experiment ledger', 13)}
      {txt(W - 40, 60, 'Compound 2.1×', 13, 0.5, 'end')}
      {ln(40, 80, W - 40, 80, 0.4)}
      {outcomes.map((win, i) => {
        const y = 106 + i * 42
        return (
          <g key={i}>
            {ln(40, y + 30, W - 40, y + 30, 0.15)}
            {txt(40, y + 18, `EXP-0${i + 1}`, 12, 0.55)}
            {bar(160, y + 8, 180 + ((i * 61) % 220), 8, win ? 0.85 : 0.25)}
            {txt(W - 40, y + 18, win ? 'Ship' : 'Kill', 11, win ? 0.9 : 0.35, 'end')}
          </g>
        )
      })}
    </Frame>
  )
}

/* ---- Fit4Box ---- */

function Identity() {
  return (
    <Frame label="Fit4Box identity lockup" tone="ink">
      <text x={W / 2} y={230} textAnchor="middle" fontFamily="var(--serif)" fontSize="110" fontWeight="600"
        letterSpacing="0.01em" fill="currentColor">
        FIT4BOX
      </text>
      {ln(120, 270, W - 120, 270, 0.5)}
      {txt(W / 2, 300, 'Built for people who actually train', 13, 0.7, 'middle')}
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>{bar(120 + i * 148, 350, 100, 56, 0.16 + i * 0.1)}</g>
      ))}
    </Frame>
  )
}

function Lookbook() {
  const cells = [
    [40, 48, 220, 270], [276, 48, 150, 130], [442, 48, 318, 200],
    [276, 194, 150, 124], [40, 334, 386, 118], [442, 264, 318, 188],
  ]
  return (
    <Frame label="Lookbook grid — photography direction">
      {cells.map((c, i) => (
        <g key={i}>
          {bar(c[0], c[1], c[2], c[3], 0.1 + (i % 3) * 0.08)}
          {box(c[0], c[1], c[2], c[3], 0.4)}
          <line x1={c[0]} y1={c[1] + c[3]} x2={c[0] + c[2]} y2={c[1]} stroke="currentColor" strokeWidth="1" opacity="0.25" />
        </g>
      ))}
      {txt(52, 76, 'LOOK 01', 11, 0.6)}
      {txt(454, 76, 'LOOK 02', 11, 0.6)}
    </Frame>
  )
}

function Pdp() {
  return (
    <Frame label="Product page wireframe — zero friction to purchase">
      {box(40, 48, W - 80, H - 96, 0.5)}
      {bar(64, 76, 300, 336, 0.14)}
      {box(64, 76, 300, 336, 0.4)}
      <line x1="64" y1="412" x2="364" y2="76" stroke="currentColor" strokeWidth="1" opacity="0.25" />
      {bar(404, 90, 200, 16, 0.85)}
      {bar(404, 120, 90, 12, 0.4)}
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>{box(404 + i * 56, 156, 44, 32, 0.4)}</g>
      ))}
      {bar(404, 216, 240, 10, 0.3)}
      {bar(404, 236, 200, 10, 0.3)}
      {bar(404, 256, 220, 10, 0.3)}
      {bar(404, 300, 180, 44, 0.95)}
      <text x={418} y={328} fontFamily="var(--sans)" fontSize="13" fontWeight="600" letterSpacing="0.08em" fill="var(--bg)">
        ADD TO RACK
      </text>
    </Frame>
  )
}

/* ---- Lab hero panels (ink) ---- */

function HeroFluted() {
  const flutes = []
  for (let i = 0; i < 16; i++) {
    const x = 40 + i * 45
    flutes.push(
      <g key={i}>
        <rect x={x} y={48} width={30} height={H - 96} fill="currentColor" opacity={0.05 + (i % 4) * 0.03} />
        <line x1={x + 6} y1={48} x2={x + 6} y2={H - 48} stroke="currentColor" strokeWidth="1.5" opacity="0.35" />
        <line x1={x + 24} y1={48} x2={x + 24} y2={H - 48} stroke="currentColor" strokeWidth="0.75" opacity="0.18" />
      </g>
    )
  }
  return (
    <Frame label="Fluted glass shader study" tone="ink">
      {flutes}
      <text x={W / 2} y={H / 2 + 16} textAnchor="middle" fontFamily="var(--serif)" fontStyle="italic"
        fontSize="56" fontWeight="500" fill="currentColor">
        refraction
      </text>
    </Frame>
  )
}

function HeroMarathon() {
  return (
    <Frame label="Marathon race-telemetry HUD" tone="ink">
      {txt(40, 60, 'KM 32 / 42.2', 13, 0.7)}
      {txt(W - 40, 60, `4'58" / km`, 13, 0.7, 'end')}
      {ln(40, 80, W - 40, 80, 0.3)}
      <text x={40} y={300} fontFamily="var(--serif)" fontSize="150" fontWeight="560" fill="currentColor">
        2:57
      </text>
      {[...Array(21)].map((_, i) => (
        <rect key={i} x={40 + i * 35} y={360 + (i % 2 ? 0 : 0)} width={22}
          height={26 + ((i * 13) % 42)} fill="currentColor" opacity={i < 16 ? 0.7 : 0.2} transform={`translate(0 ${42 - ((i * 13) % 42)})`} />
      ))}
      {ln(40, 452, W - 40, 452, 0.3)}
    </Frame>
  )
}

function HeroButtons() {
  const variants = [
    { y: 120, w: 190, solid: true, label: 'PRIMARY' },
    { y: 190, w: 190, solid: false, label: 'SECONDARY' },
    { y: 260, w: 190, solid: false, label: 'GHOST', ghost: true },
  ]
  return (
    <Frame label="Button system study — variants, sizes, states" tone="ink">
      {txt(40, 60, 'Variants × sizes × states', 13, 0.7)}
      {ln(40, 80, W - 40, 80, 0.3)}
      {variants.map((v, i) => (
        <g key={i}>
          {v.solid ? bar(40, v.y, v.w, 48, 0.95) : v.ghost ? null : box(40, v.y, v.w, 48, 0.7)}
          <text x={40 + (v.ghost ? 0 : 24)} y={v.y + 30} fontFamily="var(--sans)" fontSize="13" fontWeight="600"
            letterSpacing="0.08em" fill={v.solid ? 'var(--ink)' : 'currentColor'} opacity={v.solid ? 1 : 0.85}>
            {v.label}
          </text>
        </g>
      ))}
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>{box(300 + i * 92, 120, 76, 48 - i * 7, 0.3 + i * 0.1)}</g>
      ))}
      {[0, 1, 2].map((i) => (
        <g key={`s${i}`}>
          {box(300 + i * 152, 260, 128, 48, 0.4)}
          {i === 1 && box(296 + i * 152, 256, 136, 56, 0.8)}
        </g>
      ))}
      {txt(40, 400, 'Hover · Focus · Active · Disabled', 12, 0.5)}
      {ln(40, 420, W - 40, 420, 0.3)}
    </Frame>
  )
}

function HeroTimeline() {
  return (
    <Frame label="Drag-scroll timeline prototype" tone="ink">
      {ln(40, H / 2, W - 40, H / 2, 0.5)}
      {[...Array(9)].map((_, i) => {
        const x = 60 + i * 85
        const major = i % 2 === 0
        return (
          <g key={i}>
            <line x1={x} y1={H / 2 - (major ? 26 : 12)} x2={x} y2={H / 2 + (major ? 26 : 12)}
              stroke="currentColor" strokeWidth={major ? 2 : 1} opacity={major ? 0.8 : 0.35} />
            {major && txt(x, H / 2 - 44, `${1998 + i * 4}`, 12, 0.6, 'middle')}
          </g>
        )
      })}
      <circle cx={W / 2} cy={H / 2} r="7" fill="currentColor" />
      <text x={W / 2} y={H / 2 + 110} textAnchor="middle" fontFamily="var(--serif)" fontStyle="italic"
        fontSize="40" fontWeight="500" fill="currentColor" opacity="0.9">
        drag →
      </text>
    </Frame>
  )
}

const KINDS = {
  'system-overview': SystemOverview,
  density: Density,
  'asset-detail': AssetDetail,
  'control-room': ControlRoom,
  'alert-triage': AlertTriage,
  'before-after': BeforeAfter,
  funnel: Funnel,
  'landing-variants': LandingVariants,
  experiments: Experiments,
  identity: Identity,
  lookbook: Lookbook,
  pdp: Pdp,
  'hero-fluted': HeroFluted,
  'hero-marathon': HeroMarathon,
  'hero-buttons': HeroButtons,
  'hero-timeline': HeroTimeline,
}

export default function Plate({ kind }) {
  const C = KINDS[kind]
  return C ? <C /> : null
}
