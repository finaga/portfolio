// app.jsx — editorial portfolio shell

const { useState, useEffect, useRef, useCallback } = React;

// Respect user's OS-level "reduce motion" preference.
function prefersReducedMotion() {
  try {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch (e) {
    return false;
  }
}

function App() {
  const cases = window.CASES;
  const [view, setView] = useState('work');
  const [activeIdx, setActiveIdx] = useState(() => {
    try { return parseInt(localStorage.getItem('pf.case') || '0') || 0; } catch(e){ return 0; }
  });
  const [plateIdx, setPlateIdx] = useState(0);
  const [wipePhase, setWipePhase] = useState(null);
  const [kpiTrigger, setKpiTrigger] = useState(0);
  const [deepOpen, setDeepOpen] = useState(false);
  const deepRef = useRef(null);
  const consoleRef = useRef(null);

  const [tweaksOpen, setTweaksOpen] = useState(false);
  const [gridDebug, setGridDebug] = useState(TWEAK_DEFAULTS.gridDebug);
  const [fontScale, setFontScale] = useState(TWEAK_DEFAULTS.fontScale);
  const [liveMessage, setLiveMessage] = useState('');

  const caseData = cases[activeIdx];
  const nextCase = cases[(activeIdx + 1) % cases.length];

  // theme: always dark for work view
  // About = dark, Contact = light
  const theme =
    view === 'contact' ? 'light' : 'dark';

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.body.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    try { localStorage.setItem('pf.case', String(activeIdx)); } catch(e){}
  }, [activeIdx]);

  // Announce view + case changes to assistive tech via aria-live region.
  useEffect(() => {
    if (view === 'work') {
      const c = cases[activeIdx];
      if (c) setLiveMessage(`Case ${c.num} ${c.projectShort || c.project}`);
    } else if (view === 'about') {
      setLiveMessage('About page');
    } else if (view === 'contact') {
      setLiveMessage('Contact page');
    }
  }, [view, activeIdx, cases]);
  useEffect(() => {
    document.documentElement.style.setProperty('--font-scale', fontScale);
  }, [fontScale]);
  useEffect(() => {
    document.body.dataset.grid = gridDebug ? 'true' : 'false';
  }, [gridDebug]);

  const goToCase = useCallback((idx) => {
    if (idx === activeIdx) return;
    const n = ((idx % cases.length) + cases.length) % cases.length;
    const reduce = prefersReducedMotion();
    if (reduce) {
      // Skip wipe transitions entirely.
      setActiveIdx(n);
      setPlateIdx(0);
      setDeepOpen(false);
      setKpiTrigger(k => k + 1);
      setWipePhase(null);
      if (consoleRef.current) consoleRef.current.scrollTop = 0;
      return;
    }
    setWipePhase('out');
    setTimeout(() => {
      setActiveIdx(n);
      setPlateIdx(0);
      setDeepOpen(false);
      setKpiTrigger(k => k + 1);
      setWipePhase('in');
      if (consoleRef.current) consoleRef.current.scrollTop = 0;
      setTimeout(() => setWipePhase(null), 240);
    }, 220);
  }, [activeIdx, cases.length]);

  const nextPlate = useCallback(() => {
    setPlateIdx(i => (i + 1) % caseData.plates.length);
  }, [caseData.plates.length]);
  const prevPlate = useCallback(() => {
    setPlateIdx(i => (i - 1 + caseData.plates.length) % caseData.plates.length);
  }, [caseData.plates.length]);

  useEffect(() => {
    function onKey(e) {
      if (e.target.matches('input, textarea, select')) return;
      if (view !== 'work') return;
      if (e.key === 'ArrowRight') { goToCase(activeIdx + 1); e.preventDefault(); }
      else if (e.key === 'ArrowLeft') { goToCase(activeIdx - 1); e.preventDefault(); }
      else if (e.key === 'ArrowDown') { nextPlate(); e.preventDefault(); }
      else if (e.key === 'ArrowUp') { prevPlate(); e.preventDefault(); }
      else if (e.key === 'Enter') {
        setDeepOpen(true);
      }
      else if (e.key === 'Escape' && deepOpen) {
        setDeepOpen(false);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeIdx, view, goToCase, nextPlate, prevPlate, deepOpen]);

  useEffect(() => {
    let x0 = null, y0 = null;
    function ts(e) { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }
    function te(e) {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0;
      const dy = e.changedTouches[0].clientY - y0;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
        if (dx < 0) goToCase(activeIdx + 1);
        else goToCase(activeIdx - 1);
      }
      x0 = null;
    }
    const el = document.querySelector('.viewport');
    if (!el) return;
    el.addEventListener('touchstart', ts, { passive: true });
    el.addEventListener('touchend', te, { passive: true });
    return () => {
      el.removeEventListener('touchstart', ts);
      el.removeEventListener('touchend', te);
    };
  }, [view, activeIdx, goToCase]);

  // Global wheel → drives console scroll; at bottom pulls deep dive;
  // scroll up from deep dive top → close + reset console
  useEffect(() => {
    if (view !== 'work') return;
    function onWheel(e) {
      if (deepOpen) {
        if (e.deltaY < 0) {
          const dd = deepRef.current;
          if (!dd || dd.scrollTop <= 0) {
            e.preventDefault();
            setDeepOpen(false);
            if (consoleRef.current) consoleRef.current.scrollTop = 0;
          }
        }
        return;
      }
      const el = consoleRef.current;
      if (!el) return;
      e.preventDefault();
      el.scrollTop += e.deltaY;
      const remaining = el.scrollHeight - (el.scrollTop + el.clientHeight);
      if (remaining < 80) setDeepOpen(true);
    }
    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
  }, [view, deepOpen]);

  useEffect(() => {
    function onMsg(ev) {
      const d = ev.data || {};
      if (d.type === '__activate_edit_mode') setTweaksOpen(true);
      if (d.type === '__deactivate_edit_mode') setTweaksOpen(false);
    }
    window.addEventListener('message', onMsg);
    try { window.parent.postMessage({ type: '__edit_mode_available' }, '*'); } catch(e){}
    return () => window.removeEventListener('message', onMsg);
  }, []);

  return (
    <>
      <div className="grid-overlay"/>
      <div className="grid-debug"/>

      <header className="topbar">
        <button
          type="button"
          className="t-left"
          aria-label="Home — go to case 001"
          onClick={() => { setView('work'); goToCase(0); }}
        >
          André Finageiv
        </button>
        <nav className="t-right" aria-label="Primary">
          <button aria-current={view === 'work' ? 'true' : 'false'} onClick={() => setView('work')}>Work</button>
          <span className="sep" aria-hidden="true">·</span>
          <button aria-current={view === 'about' ? 'true' : 'false'} onClick={() => setView('about')}>About</button>
          <span className="sep" aria-hidden="true">·</span>
          <button aria-current={view === 'contact' ? 'true' : 'false'} onClick={() => setView('contact')}>Contact</button>
        </nav>
      </header>

      <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {liveMessage}
      </div>

      <main className="stage">
        {view === 'work' && (
          <>
            <div className="split" key={'work-' + activeIdx}>
              <Viewport
                caseData={caseData}
                plateIdx={plateIdx}
                setPlateIdx={setPlateIdx}
                wipePhase={wipePhase}
                activeIdx={activeIdx}
              />
              <Console
                caseData={caseData}
                onReadMore={() => setDeepOpen(true)}
                nextCase={nextCase}
                onNextCase={() => goToCase(activeIdx + 1)}
                kpiTrigger={kpiTrigger + '-' + activeIdx}
                consoleRef={consoleRef}
              />
            </div>
            <ProjectTabs cases={cases} activeIdx={activeIdx} onSelect={goToCase}/>
            <DeepDive caseData={caseData} forwardedRef={deepRef} open={deepOpen} onClose={() => setDeepOpen(false)}/>
          </>
        )}
        {view === 'about' && <AboutPage/>}
        {view === 'contact' && <ContactPage/>}
      </main>

      <StatusBar/>

      <div className="tweaks" data-open={tweaksOpen ? 'true' : 'false'}>
        <h3>Tweaks</h3>
        <div className="row">
          <label>Grid debug</label>
          <div className="switch">
            <button aria-pressed={!gridDebug} onClick={() => setGridDebug(false)}>Off</button>
            <button aria-pressed={gridDebug} onClick={() => setGridDebug(true)}>On</button>
          </div>
        </div>
        <div className="row">
          <label>Font scale · {fontScale.toFixed(2)}×</label>
          <input
            type="range" min="0.85" max="1.25" step="0.05"
            value={fontScale}
            onChange={e => setFontScale(parseFloat(e.target.value))}
          />
        </div>
        <div className="tw-keys">
          Keys: ← → case · ↑ ↓ plate · ↵ deep
        </div>
      </div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
