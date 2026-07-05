import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { CASES } from '../data/cases.js'
import { revealLines, fadeUp, countUp } from '../lib/anim.js'

function formatKpi(k) {
  const decimals = k.decimals || 0
  return `${k.prefix || ''}${k.value.toFixed(decimals)}${k.suffix || ''}`
}

function CaseBlock({ c, i }) {
  return (
    <article className={`case case-v${i % 2}`} id={c.id}>
      <hr className="rule" />

      <div className="case-head grid-12">
        <h3 className="case-title">{c.title}</h3>
        <dl className="case-meta">
          <div>
            <dt>Discipline</dt>
            <dd>{c.discipline}</dd>
          </div>
          <div>
            <dt>Client</dt>
            <dd>{c.client}</dd>
          </div>
          <div>
            <dt>Role</dt>
            <dd>{c.role}</dd>
          </div>
          <div>
            <dt>Scope</dt>
            <dd>{c.scope}</dd>
          </div>
          <div>
            <dt>Year</dt>
            <dd>{c.year}</dd>
          </div>
        </dl>
      </div>

      <figure className="case-media">
        <img
          src={c.image}
          alt={c.imageAlt}
          loading={i === 0 ? 'eager' : 'lazy'}
          fetchPriority={i === 0 ? 'high' : undefined}
        />
      </figure>

      <div className="case-body grid-12">
        <p className="case-abstract">{c.abstract}</p>
        <ul className="case-kpis" aria-label="Key results">
          {c.kpis.map((k) => (
            <li key={k.label}>
              <span className="kpi-value">
                <span aria-hidden="true">
                  {k.prefix ? <span className="kpi-affix">{k.prefix}</span> : null}
                  <span
                    className="kpi-num"
                    data-value={k.value}
                    data-decimals={k.decimals || 0}
                  >
                    {k.value.toFixed(k.decimals || 0)}
                  </span>
                  {k.suffix ? <span className="kpi-affix">{k.suffix}</span> : null}
                </span>
                <span className="sr-only">{formatKpi(k)}</span>
              </span>
              <span className="kpi-label label">{k.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}

export default function Work({ fontsReady }) {
  const scope = useRef(null)

  useGSAP(
    () => {
      if (!fontsReady) return
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        revealLines('.work-title, .case-title')
        fadeUp('.case-meta, .case-abstract')
        countUp('.kpi-num')

        // media: clip reveal once + slow parallax drift while in view
        gsap.utils.toArray('.case-media').forEach((fig) => {
          const img = fig.querySelector('img')
          gsap.from(fig, {
            clipPath: 'inset(0% 0% 100% 0%)',
            duration: 1.2,
            ease: 'power4.inOut',
            scrollTrigger: { trigger: fig, start: 'top 85%', once: true },
          })
          gsap.fromTo(
            img,
            { yPercent: -8, scale: 1.12 },
            {
              yPercent: 8,
              scale: 1.12,
              ease: 'none',
              scrollTrigger: {
                trigger: fig,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            },
          )
        })
      })
      return () => mm.revert()
    },
    { scope, dependencies: [fontsReady] },
  )

  return (
    <section className="work container" id="work" ref={scope}>
      <div className="work-head">
        <h2 className="work-title">
          Selected work <sup className="work-count">4</sup>
        </h2>
      </div>
      {CASES.map((c, i) => (
        <CaseBlock key={c.id} c={c} i={i} />
      ))}
    </section>
  )
}
