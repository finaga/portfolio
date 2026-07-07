// AboutPage.jsx — editorial About page (12-col spread)

function AboutPage() {
  const clients = [
    'BaxEnergy',
    'Yokogawa',
    'Toptal',
    'Fit4Box',
  ];

  return (
    <div className="page-about about-spread">
      {/* ───── HERO ───── */}
      <section className="about-hero">
        <div className="ah-folio">/ 00</div>

        <div className="ah-eyebrow">
          <div className="section-label">§ ABOUT / PROFILE</div>
          <div className="ah-locator">§ SÃO PAULO · BR · 2026</div>
        </div>

        <div className="ah-title">
          <h1>
            ANDRÉ<br/>FINAGEIV
          </h1>
        </div>

        <p className="ah-sub">
          Product Designer. SaaS, design ops, and the occasional apparel line.
        </p>

        <div className="ah-meta">
          <div><span className="k">Role</span><span className="v">Senior / Lead</span></div>
          <div><span className="k">Base</span><span className="v">São Paulo · BR</span></div>
          <div><span className="k">Status</span><span className="v"><span className="dot"/> Open · Q3 2026</span></div>
        </div>
      </section>

      {/* ───── INDEX RAIL (sticky-ish structure) ───── */}
      <nav className="about-index" aria-label="About sections">
        <span>§01 / BIO</span>
        <span className="sep">·</span>
        <span>§02 / STATS</span>
        <span className="sep">·</span>
        <span>§03 / CLIENTS</span>
      </nav>

      {/* ───── BIO ───── */}
      <section className="about-bio" id="bio">
        <div className="ab-label">
          <div className="section-label">§01 / BIO</div>
          <div className="ab-folio">01 — 03</div>
        </div>

        <div className="ab-body">
          <p className="ab-lede">I design software.</p>

          <p className="ab-pull">Twenty years doing it.</p>

          <p>Currently leading design operations for Farsight at BaxEnergy — a Yokogawa company — where I took every screen under my umbrella and am accountable for how the whole product feels.</p>

          <p>I work where the problems are hardest and the users care the most: enterprise SaaS, real-time control rooms, growth funnels that turn pixels into revenue. I also run Fit4Box, my own Crossfit apparel brand, because sometimes you need to ship your own thing.</p>

          <p>Based in São Paulo, available for one senior engagement in Q3 2026. Currently open to full-time leadership roles and select freelance projects.</p>
        </div>
      </section>

      {/* ───── STATS RAIL ───── */}
      <section className="about-stats-rail" id="stats">
        <div className="asr-head">
          <div className="section-label">§02 / STATS</div>
          <div className="asr-note">Career ledger · 2005 — 2026</div>
        </div>

        <div className="asr-grid">
          <div className="asr-cell">
            <div className="asr-k">Years designing</div>
            <div className="asr-v">20<span className="asr-sup">+</span></div>
          </div>
          <div className="asr-cell">
            <div className="asr-k">Teams led</div>
            <div className="asr-v">6</div>
          </div>
          <div className="asr-cell">
            <div className="asr-k">Modules shipped</div>
            <div className="asr-v">20<span className="asr-sup">+</span></div>
          </div>
          <div className="asr-cell">
            <div className="asr-k">Clients served</div>
            <div className="asr-v">10<span className="asr-sup">+</span></div>
          </div>
        </div>
      </section>

      {/* ───── SELECTED CLIENTS ───── */}
      <section className="about-clients" id="clients">
        <div className="ac-head">
          <div className="section-label">§03 / SELECTED CLIENTS</div>
          <div className="ac-note">+ others under NDA</div>
        </div>

        <ul className="ac-list">
          {clients.map((name, i) => (
            <li key={name} className="ac-row">
              <span className="ac-idx">{String(i + 1).padStart(2, '0')}</span>
              <span className="ac-name">{name}</span>
              <span className="ac-year">{['2022 — ', '2023 — ', '2019 — 22', '2024 — '][i]}</span>
            </li>
          ))}
          <li className="ac-row ac-row-dim">
            <span className="ac-idx">+</span>
            <span className="ac-name">More under NDA</span>
            <span className="ac-year">—</span>
          </li>
        </ul>
      </section>
    </div>
  );
}

Object.assign(window, { AboutPage });
