// DeepDive.jsx — full-viewport slide-up case narrative
//
// Layout: sticky TOC (§1–§5) on the left, narrative on the right. Plates flow
// between sections at composed breakpoints. Mini-KPIs are repurposed as
// "What this enabled /" notes — one human-legible sentence per metric — so
// they no longer duplicate the console.

const { useEffect: useEffectDD, useState: useStateDD, useRef: useRefDD } = React;

function DeepDive({ caseData, forwardedRef, open, onClose }) {
  const [active, setActive] = useStateDD('ctx');
  const sectionRefs = useRefDD({});

  // Update the sticky TOC's active state as the user scrolls.
  useEffectDD(() => {
    const root = forwardedRef && forwardedRef.current;
    if (!root || !open) return;
    function onScroll() {
      const top = root.scrollTop + 120;
      let current = 'ctx';
      for (const id of ['ctx', 'apr', 'out', 'ref']) {
        const el = sectionRefs.current[id];
        if (el && el.offsetTop <= top) current = id;
      }
      setActive(current);
    }
    root.addEventListener('scroll', onScroll);
    onScroll();
    return () => root.removeEventListener('scroll', onScroll);
  }, [open, forwardedRef, caseData.id]);

  // Jump to a section. Clean up scroll behaviour inside the panel.
  function jumpTo(id) {
    const root = forwardedRef && forwardedRef.current;
    const el = sectionRefs.current[id];
    if (!root || !el) return;
    root.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
  }

  // Reset scroll when the case changes or panel reopens
  useEffectDD(() => {
    const root = forwardedRef && forwardedRef.current;
    if (root && open) root.scrollTop = 0;
  }, [open, caseData.id, forwardedRef]);

  const ref = caseData.deep.reflection;
  const impact = caseData.impact || caseData.kpis.map(kpi => ({ k: kpi.k, note: '' }));

  const toc = [
    { id: 'ctx', n: '§1', label: 'CONTEXT' },
    { id: 'apr', n: '§2', label: 'APPROACH' },
    { id: 'out', n: '§3', label: 'OUTCOME' },
    { id: 'ref', n: '§4', label: 'REFLECTION' },
  ];

  function setRef(id) {
    return el => { sectionRefs.current[id] = el; };
  }

  const plates = caseData.plates || [];

  return (
    <div className="deepdive" ref={forwardedRef} data-open={open ? 'true' : 'false'} aria-hidden={!open}>
      <button className="deepdive-close" onClick={onClose} aria-label="Close deep dive">← Back to case</button>

      <div className="deepdive-shell">
        <aside className="deepdive-toc" aria-label="Deep dive sections">
          <div className="toc-eyebrow">CASE / {caseData.num}</div>
          <div className="toc-project">{caseData.projectShort}</div>
          <nav className="toc-list">
            {toc.map(t => (
              <button
                key={t.id}
                type="button"
                className="toc-item"
                data-active={active === t.id ? 'true' : 'false'}
                onClick={() => jumpTo(t.id)}
              >
                <span className="toc-n">{t.n}</span>
                <span className="toc-label">{t.label}</span>
              </button>
            ))}
          </nav>
          <div className="toc-meta">
            <div><span>ROLE</span>{caseData.role}</div>
            <div><span>YEAR</span>{caseData.year}</div>
            <div><span>SCOPE</span>{caseData.scope}</div>
          </div>
        </aside>

        <div className="deepdive-inner">
          <div className="eyebrow">CASE / {caseData.num} · DEEP DIVE</div>
          <h2>{caseData.project}</h2>

          <section ref={setRef('ctx')}>
            <div className="sec-label">§1 CONTEXT</div>
            <div className="sec-body">
              <p>{caseData.deep.context}</p>
            </div>
          </section>

          {plates[0] && (
            <figure className="plate-figure">
              <div className="plate-thumb" style={{ backgroundImage: plates[0].art }}/>
              <figcaption>{plates[0].label}</figcaption>
            </figure>
          )}

          <section ref={setRef('apr')}>
            <div className="sec-label">§2 APPROACH</div>
            <div className="sec-body">
              <p>{caseData.deep.approach}</p>
            </div>
          </section>

          {(plates[1] || plates[2]) && (
            <div className="plates-strip">
              {plates[1] && (
                <figure className="plate-figure">
                  <div className="plate-thumb" style={{ backgroundImage: plates[1].art }}/>
                  <figcaption>{plates[1].label}</figcaption>
                </figure>
              )}
              {plates[2] && (
                <figure className="plate-figure">
                  <div className="plate-thumb" style={{ backgroundImage: plates[2].art }}/>
                  <figcaption>{plates[2].label}</figcaption>
                </figure>
              )}
            </div>
          )}

          <section ref={setRef('out')}>
            <div className="sec-label">§3 OUTCOME</div>
            <div className="sec-body">
              <p>{caseData.deep.outcome}</p>

              <div className="enabled">
                <div className="enabled-eyebrow">WHAT THIS ENABLED /</div>
                <ul className="enabled-list">
                  {impact.map((row, i) => (
                    <li key={i} className="enabled-row">
                      <span className="enabled-k">{row.k}</span>
                      <span className="enabled-note">{row.note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {plates[3] && (
            <figure className="plate-figure">
              <div className="plate-thumb" style={{ backgroundImage: plates[3].art }}/>
              <figcaption>{plates[3].label}</figcaption>
            </figure>
          )}

          {plates[4] && (
            <figure className="plate-figure">
              <div className="plate-thumb" style={{ backgroundImage: plates[4].art }}/>
              <figcaption>{plates[4].label}</figcaption>
            </figure>
          )}

          {ref && (
            <section ref={setRef('ref')} className="reflection">
              <div className="sec-label">§4 REFLECTION</div>
              <div className="sec-body">
                <p>{ref}</p>
              </div>
            </section>
          )}

          <div className="deepdive-colophon">
            <span>END · {caseData.num} / {caseData.projectShort.toUpperCase()}</span>
            <button type="button" className="back-to-top" onClick={() => {
              const root = forwardedRef && forwardedRef.current;
              if (root) root.scrollTo({ top: 0, behavior: 'smooth' });
            }}>↑ TOP</button>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { DeepDive });
