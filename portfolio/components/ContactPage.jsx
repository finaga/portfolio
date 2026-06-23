// ContactPage.jsx — contact cards + availability calendar

const { useMemo, useState, useCallback } = React;

const EMAIL_PRIMARY = 'hello@finageiv.com';

function ContactPage() {
  const days = ['MON','TUE','WED','THU','FRI','SAT','SUN'];
  const today = new Date();
  const [copied, setCopied] = useState(false);

  const slots = useMemo(() => {
    const out = [];
    for (let i = 0; i < 14; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const dow = (d.getDay() + 6) % 7;
      let slot = 'open';
      if (dow >= 5) slot = 'weekend';
      else if (i === 0 || i === 1 || i === 8) slot = 'full';
      else if (((i * 9301 + 49297) % 233280) / 233280 < 0.25) slot = 'full';
      out.push({
        date: d,
        slot,
        day: d.getDate(),
        dow: days[dow],
      });
    }
    return out;
  }, []);

  const fmtDate = (d) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  };
  const fmtHuman = (d) => d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

  const handleEmailClick = useCallback((e) => {
    // Let cmd/ctrl/middle-click fall through to mailto
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
    e.preventDefault();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(EMAIL_PRIMARY).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }).catch(() => {
        // Fallback: open mailto if clipboard blocked
        window.location.href = `mailto:${EMAIL_PRIMARY}`;
      });
    } else {
      window.location.href = `mailto:${EMAIL_PRIMARY}`;
    }
  }, []);

  const handleSlotClick = (s) => {
    if (s.slot !== 'open') return;
    const iso = fmtDate(s.date);
    const human = fmtHuman(s.date);
    const subject = encodeURIComponent('Q3 2026 engagement');
    const body = encodeURIComponent(`Proposed slot: ${human} (${iso})\n\n`);
    window.location.href = `mailto:${EMAIL_PRIMARY}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="page-contact">
      <div className="page-hero">
        <div>
          <div className="section-label">§ CONTACT / OPEN</div>
          <h1>LET'S<br/>TALK.</h1>
          <p className="hero-sub">
            One engagement open in Q3 2026. São Paulo — UTC-3.
          </p>
        </div>
      </div>

      <div className="contact-cards">
        <a
          className="contact-card"
          href={`mailto:${EMAIL_PRIMARY}`}
          onClick={handleEmailClick}
          aria-label={`Copy email ${EMAIL_PRIMARY} to clipboard`}
        >
          <div className="c-k">Email / Primary</div>
          <div className="c-v">hello@<br/>finageiv.com</div>
          <div className={`c-foot${copied ? ' is-confirmed' : ''}`}>
            {copied ? '→ Copied ✓' : '→ Copy'}
          </div>
        </a>
        <a
          className="contact-card"
          href="https://www.linkedin.com/in/andrefinageiv/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="c-k">LinkedIn</div>
          <div className="c-v">/in/andre<br/>finageiv</div>
          <div className="c-foot">→ Open</div>
        </a>
        <a
          className="contact-card"
          href="https://instagram.com/af.design"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="c-k">Instagram</div>
          <div className="c-v">@af.design<br/>@fit4box</div>
          <div className="c-foot">→ Follow</div>
        </a>
        <a
          className="contact-card"
          href={`mailto:${EMAIL_PRIMARY}?subject=${encodeURIComponent('Book 30 min — intro call')}&body=${encodeURIComponent('Hi André,\n\nI\'d love to book a 30-minute intro call. A few times that work for me:\n\n1.\n2.\n3.\n\nThanks,')}`}
        >
          <div className="c-k">Book 30 min</div>
          <div className="c-v">Intro<br/>call</div>
          <div className="c-foot">→ Request</div>
        </a>
      </div>

      <div className="availability">
        <div>
          <div className="avail-label">Status /</div>
          <div className="avail-big">
            OPEN<br/>FOR <span className="q3-accent">Q3</span>
          </div>
          <p className="avail-body">
            Full-time leadership or high-impact freelance. Enterprise SaaS and design-ops preferred.
          </p>
        </div>
        <div>
          <div className="avail-label">Next 14 days /</div>
          <div className="cal-strip">
            {slots.map((s, i) => {
              const isOpen = s.slot === 'open';
              const label = isOpen
                ? `Propose ${fmtHuman(s.date)} — open slot`
                : `${fmtHuman(s.date)} — ${s.slot === 'full' ? 'booked' : 'weekend'}`;
              return (
                <button
                  key={i}
                  type="button"
                  className="cal-cell"
                  data-slot={s.slot}
                  onClick={() => handleSlotClick(s)}
                  disabled={!isOpen}
                  aria-label={label}
                  title={label}
                >
                  <div>{s.dow}</div>
                  <div className="d">{s.day}</div>
                </button>
              );
            })}
          </div>
          <p className="cal-legend">
            Open slot · Filled · Weekend
          </p>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ContactPage });
