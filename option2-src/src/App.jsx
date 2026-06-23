import { Progress } from '@base-ui/react/progress';
import './App.css';

const SESSION = { pct: 5,  reset: '4 hr 40 min' };
const WEEKLY  = { pct: 59, reset: 'Mon 9:00 AM' };
const TODAY   = { input: 42100, output: 8400, cache: 12700, cost: '$0.0284' };
const DAYS    = [
  { label: 'Thu', pct: 30 },
  { label: 'Fri', pct: 55 },
  { label: 'Sat', pct: 0  },
  { label: 'Sun', pct: 0  },
  { label: 'Mon', pct: 80 },
  { label: 'Tue', pct: 45 },
  { label: 'Wed', pct: 100, today: true },
];

function thresholdColor(pct) {
  if (pct >= 80) return 'var(--crit)';
  if (pct >= 50) return 'var(--warn)';
  return 'var(--accent)';
}

function fmt(n) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000)     return (n / 1_000).toFixed(1) + 'k';
  return String(n);
}

function UsageBar({ pct, label, sublabel }) {
  const clr = thresholdColor(pct);
  return (
    <div className="usage-row">
      <div className="usage-head">
        <span className="usage-label">{label}</span>
        <span className="usage-pct" style={{ color: clr }}>{pct}%</span>
      </div>
      <Progress.Root value={pct} max={100} className="bar-root">
        <Progress.Track className="bar-track">
          <Progress.Indicator className="bar-fill" style={{ width: `${pct}%`, background: clr }} />
        </Progress.Track>
      </Progress.Root>
      <p className="usage-sub">{sublabel}</p>
    </div>
  );
}

function DayBar({ label, pct, today }) {
  return (
    <div className="day-col">
      <Progress.Root value={pct} max={100} orientation="vertical" className="day-root">
        <Progress.Track className="day-track">
          <Progress.Indicator
            className="day-fill"
            style={{ height: `${Math.max(pct, pct > 0 ? 3 : 0)}%`, background: today ? 'var(--accent)' : 'var(--muted)' }}
          />
        </Progress.Track>
      </Progress.Root>
      <span className={`day-label${today ? ' today' : ''}`}>{label}</span>
    </div>
  );
}

function Divider() {
  return <div className="divider" />;
}

function SectionTitle({ children }) {
  return <h2 className="section-title">{children}</h2>;
}

export default function Widget() {
  return (
    <div className="shell">
      <div className="menubar">
        <span className="mb-text">Thu Mar 19</span>
        <span className="mb-text">9:41 AM</span>
        <span className="mb-active">✦ 59%</span>
        <span className="mb-text">🔋</span>
      </div>

      <div className="widget">
        <header className="w-header">
          <div className="h-left">
            <div className="h-icon">✦</div>
            <div>
              <p className="h-eyebrow">Plan Usage Limits</p>
              <h1 className="h-title">Claude</h1>
            </div>
          </div>
          <div className="h-right">
            <div className="h-badge"><span className="h-dot" />Online</div>
            <button className="h-btn" aria-label="Settings">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                <circle cx="12" cy="12" r="3"/>
                <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-2.82 1.17V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-2.82-1.17l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>
              </svg>
            </button>
          </div>
        </header>

        <div className="w-body">
          <SectionTitle>Current Session</SectionTitle>
          <UsageBar pct={SESSION.pct} label="Session usage" sublabel={`Resets in ${SESSION.reset}`} />

          <Divider />

          <SectionTitle>Weekly Limits</SectionTitle>
          <UsageBar pct={WEEKLY.pct} label="All models" sublabel={`Resets ${WEEKLY.reset}`} />

          <Divider />

          <SectionTitle>Today</SectionTitle>
          <div className="token-grid">
            {[
              { label: 'Input',  value: TODAY.input,  clr: 'var(--accent)' },
              { label: 'Output', value: TODAY.output, clr: 'var(--warn)'   },
              { label: 'Cache',  value: TODAY.cache,  clr: 'var(--muted)'  },
            ].map(({ label, value, clr }) => (
              <div key={label} className="token-col">
                <span className="token-val" style={{ color: clr }}>{fmt(value)}</span>
                <span className="token-lbl">{label}</span>
              </div>
            ))}
          </div>
          <p className="token-cost">{TODAY.cost} est. cost</p>

          <Divider />

          <SectionTitle>7-Day Activity</SectionTitle>
          <div className="chart">
            {DAYS.map(d => <DayBar key={d.label} {...d} />)}
          </div>
        </div>

        <footer className="w-footer">
          <span className="f-sync">Last updated <strong>2 min ago</strong></span>
          <div className="f-actions">
            <button className="f-btn">Refresh</button>
            <button className="f-btn f-quit">Quit</button>
          </div>
        </footer>
      </div>
    </div>
  );
}
