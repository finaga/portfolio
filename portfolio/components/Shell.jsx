// Shell.jsx — StatusBar, SteppedCounter, ProjectTabs, ScrollCue

const { useState, useEffect } = React;

// ---------- LIVE CLOCK (local, São Paulo) -----------------------------------
function useLiveClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    // Align tick to the next whole second, then run every 1s cleanly.
    const ms = 1000 - (Date.now() % 1000);
    let interval;
    const timeout = setTimeout(() => {
      setNow(new Date());
      interval = setInterval(() => setNow(new Date()), 1000);
    }, ms);
    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, []);
  return now;
}

function formatTime(d) {
  const h = String(d.getHours()).padStart(2, '0');
  const m = String(d.getMinutes()).padStart(2, '0');
  const s = String(d.getSeconds()).padStart(2, '0');
  return `${h}:${m}:${s}`;
}

// ---------- STATUS BAR ------------------------------------------------------
function StatusBar() {
  const now = useLiveClock();
  return (
    <footer className="statusbar">
      <span>SYS / <b>{formatTime(now)}</b><span className="cursor" aria-hidden="true"/></span>
      <span className="sep">·</span>
      <span>LOC / <b>SÃO PAULO</b> · 23.55°S 46.63°W</span>
      <span className="sep">·</span>
      <span>FILE / PORTFOLIO.2026</span>
      <span className="live"><span className="live-dot"/> LIVE</span>
    </footer>
  );
}

// ---------- STEPPED COUNTER -------------------------------------------------
function SteppedCounter({ value, decimals = 0, duration = 900, trigger }) {
  const [shown, setShown] = useState(value);
  useEffect(() => {
    let raf;
    let cancelled = false;
    const start = performance.now();
    const to = value;
    const steps = 8;
    setShown(0);
    function tick(t) {
      if (cancelled) return;
      const p = Math.min(1, (t - start) / duration);
      const stepped = Math.min(1, Math.ceil(p * steps) / steps);
      const v = to * stepped;
      setShown(v);
      if (p < 1) raf = requestAnimationFrame(tick);
      else setShown(to);
    }
    raf = requestAnimationFrame(tick);
    return () => { cancelled = true; cancelAnimationFrame(raf); };
  }, [value, duration, trigger]);
  const formatted = decimals > 0 ? shown.toFixed(decimals) : Math.round(shown).toString();
  return <span>{formatted}</span>;
}

// ---------- PROJECT TABS ----------------------------------------------------
// Upgraded treatment:
//   - Per-tab folio number (01, 02, 03, 04) — small, mono, dimmed
//   - Primary tab label (project short, uppercase, tight tracking)
//   - Secondary domain tag below label (SAAS / GROWTH / BRAND)
//   - Active state: brighter label + lime underline rule above the tab
//   - Hover: raise opacity, subtle rule above
function ProjectTabs({ cases, activeIdx, onSelect }) {
  return (
    <>
      {/* ScrollCue is rendered alongside the project tabs because they share
          the work-view lifecycle (ProjectTabs is only mounted while view==='work'
          per app.jsx), and the cue's viewport affordance targets the console
          pane inside that view. */}
      <ScrollCue/>
      <div className="project-tabs">
        {cases.map((c, i) => {
          const isActive = i === activeIdx;
          const folio = String(i + 1).padStart(2, '0');
          return (
            <React.Fragment key={c.id}>
              <button
                className="pt-btn"
                aria-current={isActive ? 'true' : 'false'}
                onClick={() => onSelect(i)}
              >
                <span className="pt-rule" aria-hidden="true"/>
                <span className="pt-folio">{folio}</span>
                <span className="pt-body">
                  <span className="pt-label">{c.tabLabel}</span>
                  <span className="pt-domain">{c.domain ? c.domain.toUpperCase() : ''}</span>
                </span>
              </button>
              {i < cases.length - 1 && <span className="sep" aria-hidden="true"/>}
            </React.Fragment>
          );
        })}
      </div>
    </>
  );
}

// ---------- SCROLL CUE ------------------------------------------------------
// A subtle vertical rule + "SCROLL" label anchored to the bottom-right of the
// viewport. Fades out once the user has scrolled more than 100px via either
// the window wheel handler (app.jsx captures wheel events globally and drives
// the console pane) or any scrollable child. Respects prefers-reduced-motion
// for its subtle "nudge" keyframe.
function ScrollCue() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // If user already has scroll progress when cue mounts (e.g. nav across
    // tabs returned to work), keep it hidden.
    try {
      const el = document.querySelector('.console');
      if (el && el.scrollTop > 100) { setHidden(true); return; }
    } catch (e) {}

    let accumulated = 0;
    let ticking = false;

    function check() {
      ticking = false;
      const el = document.querySelector('.console');
      const elScroll = el ? el.scrollTop : 0;
      if (accumulated > 100 || elScroll > 100) setHidden(true);
    }

    function onWheel(e) {
      accumulated += Math.abs(e.deltaY || 0);
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(check);
      }
    }
    function onTouch(e) {
      // Any touch-move should dismiss eventually.
      accumulated += 10;
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(check);
      }
    }
    function onKey(e) {
      if (['ArrowDown','ArrowUp','PageDown','PageUp',' '].includes(e.key)) {
        accumulated += 120;
        check();
      }
    }

    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('touchmove', onTouch, { passive: true });
    window.addEventListener('keydown', onKey);
    // Also poll console scrollTop on scroll events (in case the pane scrolls
    // without a wheel event — e.g. programmatic scroll during case switch).
    const el = document.querySelector('.console');
    if (el) el.addEventListener('scroll', check, { passive: true });

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchmove', onTouch);
      window.removeEventListener('keydown', onKey);
      if (el) el.removeEventListener('scroll', check);
    };
  }, []);

  // Local prefers-reduced-motion check (Stream F will also gate globally).
  const prefersReduced = typeof window !== 'undefined'
    && window.matchMedia
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <div
      className="scroll-cue"
      data-hidden={hidden ? 'true' : 'false'}
      data-reduced={prefersReduced ? 'true' : 'false'}
      aria-hidden="true"
    >
      <span className="sc-label">SCROLL</span>
      <span className="sc-rule"/>
    </div>
  );
}

Object.assign(window, { StatusBar, SteppedCounter, ProjectTabs, ScrollCue });
