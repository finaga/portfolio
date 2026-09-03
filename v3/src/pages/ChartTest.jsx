import { useId, useState } from 'react'

/**
 * Mock data — no real per-skill usage telemetry exists (see chat).
 * Categories fold ~130 installed skills into 8 slots (dataviz skill's
 * categorical cap); dates are real sync-batch dates where known, usage
 * counts are illustrative.
 */
const DATA = [
  { key: 'design', label: 'Design / UI', installed: '2026-04-04', usage: 512 },
  { key: 'sales', label: 'Sales suite', installed: '2026-04-04', usage: 340 },
  { key: 'frontend', label: 'Frontend / code craft', installed: '2026-04-14', usage: 178 },
  { key: 'strategy', label: 'Strategy / product', installed: '2026-04-22', usage: 96 },
  { key: 'firecrawl', label: 'Firecrawl', installed: '2026-06-11', usage: 64 },
  { key: 'growth', label: 'Growth / persuasion', installed: '2026-04-22', usage: 52 },
  { key: 'other', label: 'Other (Farsight, misc, claude-mem tools)', installed: '2026-06-01', usage: 21 },
  { key: '3d', label: '3D / animation', installed: '2026-07-23', usage: 0 },
]

// dataviz reference palette — fixed categorical order, both modes pre-validated
const SERIES_COLORS = {
  light: ['#2a78d6', '#eb6834', '#1baf7a', '#eda100', '#e87ba4', '#008300', '#4a3aa7', '#e34948'],
  dark: ['#3987e5', '#d95926', '#199e70', '#c98500', '#d55181', '#008300', '#9085e9', '#e66767'],
}

function polarToCartesian(cx, cy, r, angleDeg) {
  const a = ((angleDeg - 90) * Math.PI) / 180
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) }
}

function arcPath(cx, cy, rOuter, rInner, startAngle, endAngle) {
  const largeArc = endAngle - startAngle > 180 ? 1 : 0
  const o1 = polarToCartesian(cx, cy, rOuter, endAngle)
  const o2 = polarToCartesian(cx, cy, rOuter, startAngle)
  const i1 = polarToCartesian(cx, cy, rInner, startAngle)
  const i2 = polarToCartesian(cx, cy, rInner, endAngle)
  return [
    `M ${o1.x} ${o1.y}`,
    `A ${rOuter} ${rOuter} 0 ${largeArc} 0 ${o2.x} ${o2.y}`,
    `L ${i1.x} ${i1.y}`,
    `A ${rInner} ${rInner} 0 ${largeArc} 1 ${i2.x} ${i2.y}`,
    'Z',
  ].join(' ')
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

export default function ChartTest() {
  const total = DATA.reduce((sum, d) => sum + d.usage, 0)
  const gapDeg = 2 // surface-gap between slices
  let cursor = 0
  const slices = DATA.map((d, i) => {
    const sweep = total > 0 ? (d.usage / total) * (360 - gapDeg * DATA.length) : 0
    const start = cursor
    const end = cursor + sweep
    cursor = end + gapDeg
    return { ...d, start, end, color: SERIES_COLORS.light[i], colorDark: SERIES_COLORS.dark[i] }
  })

  const [hovered, setHovered] = useState(null)
  const [showTable, setShowTable] = useState(false)
  const clipId = useId()
  const size = 360
  const cx = size / 2
  const cy = size / 2
  const rOuter = 150
  const rInner = 92

  const active = hovered != null ? slices[hovered] : null

  return (
    <div className="viz-root" style={{ padding: '4rem clamp(1.25rem, 4vw, 4rem)', maxWidth: 920, margin: '0 auto' }}>
      <style>{`
        .viz-root {
          color-scheme: light;
          --surface-1: #fcfcfb;
          --text-primary: #0b0b0b;
          --text-secondary: #52514e;
          --text-muted: #898781;
          --gridline: #e1e0d9;
          --border: rgba(11,11,11,0.10);
        }
        @media (prefers-color-scheme: dark) {
          :root:where(:not([data-theme="light"])) .viz-root {
            color-scheme: dark;
            --surface-1: #1a1a19;
            --text-primary: #ffffff;
            --text-secondary: #c3c2b7;
            --text-muted: #898781;
            --gridline: #2c2c2a;
            --border: rgba(255,255,255,0.10);
          }
        }
        :root[data-theme="dark"] .viz-root {
          color-scheme: dark;
          --surface-1: #1a1a19;
          --text-primary: #ffffff;
          --text-secondary: #c3c2b7;
          --text-muted: #898781;
          --gridline: #2c2c2a;
          --border: rgba(255,255,255,0.10);
        }
        .viz-slice { cursor: pointer; transition: opacity 0.15s ease; }
        .viz-slice:hover, .viz-slice:focus-visible { opacity: 0.85; outline: none; }
        .viz-legend-row { display: flex; align-items: baseline; gap: 0.6rem; padding: 0.55rem 0; border-bottom: 1px solid var(--gridline); cursor: pointer; }
        .viz-legend-row:last-child { border-bottom: none; }
        .viz-swatch { width: 10px; height: 10px; border-radius: 2px; flex: none; margin-top: 0.3em; }
        table.viz-table { width: 100%; border-collapse: collapse; font-size: 0.875rem; }
        table.viz-table th, table.viz-table td { text-align: left; padding: 0.5rem 0.75rem; border-bottom: 1px solid var(--gridline); }
        table.viz-table th { color: var(--text-muted); font-weight: 500; text-transform: uppercase; font-size: 0.7rem; letter-spacing: 0.06em; }
        table.viz-table td:last-child, table.viz-table th:last-child { text-align: right; font-variant-numeric: tabular-nums; }
      `}</style>

      <h1 className="serif" style={{ marginBottom: '0.4rem' }}>Skills, by category</h1>
      <p style={{ color: 'var(--text-secondary)', maxWidth: '52ch', marginBottom: '0.75rem' }}>
        Install date and usage since installing, folded into 8 categories across ~130 installed skills.
      </p>
      <div
        style={{
          display: 'inline-block',
          fontSize: '0.75rem',
          fontWeight: 600,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          color: '#92400e',
          background: '#fef3c7',
          border: '1px solid #fde68a',
          borderRadius: 4,
          padding: '0.3rem 0.6rem',
          marginBottom: '2.5rem',
        }}
      >
        Sample data — usage counts are illustrative, not measured
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', alignItems: 'flex-start' }}>
        {/* Donut */}
        <div style={{ position: 'relative', flex: '0 0 auto' }}>
          <svg
            viewBox={`0 0 ${size} ${size}`}
            width={size}
            height={size}
            role="img"
            aria-label="Pie chart of installed skills by category, sized by mock usage count"
          >
            {slices.map((s, i) => (
              <path
                key={s.key}
                className="viz-slice"
                d={arcPath(cx, cy, rOuter, rInner, s.start, s.end)}
                fill={s.color}
                tabIndex={0}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(i)}
                onBlur={() => setHovered(null)}
              />
            ))}
          </svg>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              pointerEvents: 'none',
              padding: '0 3.2rem',
            }}
          >
            {active ? (
              <>
                <div style={{ fontSize: '1.9rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1 }}>
                  {active.usage.toLocaleString()}
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>uses</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.6rem' }}>{active.label}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                  installed {formatDate(active.installed)}
                </div>
              </>
            ) : (
              <>
                <div style={{ fontSize: '1.9rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1 }}>
                  {total.toLocaleString()}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>total uses (mock)</div>
              </>
            )}
          </div>
        </div>

        {/* Legend */}
        <div style={{ flex: '1 1 260px', minWidth: 240 }}>
          {slices.map((s, i) => (
            <div
              key={s.key}
              className="viz-legend-row"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{ opacity: hovered != null && hovered !== i ? 0.5 : 1 }}
            >
              <span className="viz-swatch" style={{ background: s.color }} />
              <span style={{ flex: 1 }}>
                <div style={{ color: 'var(--text-primary)', fontSize: '0.875rem' }}>{s.label}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>installed {formatDate(s.installed)}</div>
              </span>
              <span style={{ color: 'var(--text-secondary)', fontVariantNumeric: 'tabular-nums', fontSize: '0.875rem' }}>
                {s.usage.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => setShowTable((v) => !v)}
        style={{
          marginTop: '2.5rem',
          fontSize: '0.8rem',
          color: 'var(--text-secondary)',
          textDecoration: 'underline',
          textUnderlineOffset: '3px',
        }}
      >
        {showTable ? 'Hide table view' : 'Show table view'}
      </button>

      {showTable && (
        <table className="viz-table" style={{ marginTop: '1rem' }}>
          <thead>
            <tr>
              <th>Category</th>
              <th>Installed</th>
              <th>Usage (mock)</th>
            </tr>
          </thead>
          <tbody>
            {slices.map((s) => (
              <tr key={s.key}>
                <td style={{ color: 'var(--text-primary)' }}>{s.label}</td>
                <td style={{ color: 'var(--text-secondary)' }}>{formatDate(s.installed)}</td>
                <td style={{ color: 'var(--text-primary)' }}>{s.usage.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
