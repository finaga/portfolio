// Console.jsx — right pane: title, metadata, KPIs, abstract, CTA, next-nav

function Console({ caseData, onReadMore, nextCase, onNextCase, kpiTrigger, consoleRef }) {
  return (
    <div className="console" ref={consoleRef}>
      <div className="console-section enter" style={{ animationDelay: '80ms' }}>
        <span className="section-label">CASE / {caseData.num} · {caseData.domain.toUpperCase()}</span>
        <h2 className="case-name" dangerouslySetInnerHTML={{
          __html: caseData.projectShort.toUpperCase().replace(/ /g, '<br/>')
        }}/>
      </div>

      <div className="console-section enter" style={{ animationDelay: '160ms' }}>
        <div className="meta-grid">
          <span className="k">Client</span><span className="v">{caseData.clientShort}</span>
          <span className="k">Year</span><span className="v">{caseData.year}</span>
          <span className="k">Role</span><span className="v">{caseData.role}</span>
          <span className="k">Scope</span><span className="v">{caseData.scope}</span>
        </div>
      </div>

      <div className="console-section enter" style={{ animationDelay: '240ms' }}>
        <span className="section-label">OUTCOMES /</span>
        <div className="kpis-grid">
          {caseData.kpis.map((kpi, i) => (
            <div className="kpi" key={i}>
              <div className="kpi-v">
                {kpi.v < 0 && '−'}
                <SteppedCounter value={Math.abs(kpi.v)} decimals={kpi.decimals || 0} trigger={kpiTrigger}/>
                <span className="unit">{kpi.suffix}</span>
              </div>
              <div className="kpi-k">{kpi.k}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="console-section enter" style={{ animationDelay: '320ms' }}>
        <span className="section-label">ABSTRACT /</span>
        <p className="abstract">{caseData.abstract}</p>
        <button className="cta-read" onClick={onReadMore}>Read full case →</button>
      </div>

      <div className="console-nav enter" style={{ animationDelay: '400ms' }}>
        <span><span className="label">NOW VIEWING /</span> <b>{caseData.num} {caseData.projectShort.toUpperCase()}</b></span>
        <button className="next" onClick={onNextCase}>
          NEXT: {nextCase.num} {nextCase.projectShort.toUpperCase()} →
        </button>
      </div>
    </div>
  );
}

Object.assign(window, { Console });
