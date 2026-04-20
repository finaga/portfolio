// Viewport.jsx — left pane: breadcrumb, big number, hero image + scrim
// `plateIdx` / `setPlateIdx` are still passed in by app.jsx but no longer
// consumed here — the plate-dot switcher was removed (vestigial without a
// visible plate to switch between). The `plates` array stays in data.js and
// is used by DeepDive.

function Viewport({ caseData, wipePhase, activeIdx }) {
  const bgImage = caseData.hero ? `url(${caseData.hero})` : null;
  return (
    <div className="viewport" data-has-image={bgImage ? 'true' : 'false'}>
      {bgImage && (
        <>
          <div className="viewport-bg" style={{ backgroundImage: bgImage }}/>
          <div className="viewport-scrim"/>
        </>
      )}
      <div className="breadcrumb enter" style={{ animationDelay: '0ms' }}>
        CASE / {caseData.num} · {caseData.domain.toUpperCase()}
      </div>
      <div className="big-num enter" style={{ animationDelay: '160ms' }}>
        {caseData.num}
      </div>
      {wipePhase && <div className="wipe" data-phase={wipePhase} key={wipePhase + '-' + activeIdx}/>}
    </div>
  );
}

Object.assign(window, { Viewport });
