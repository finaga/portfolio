import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { BIO, STATS, CLIENTS } from '../data/cases.js'
import { revealLines, fadeUp, countUp } from '../lib/anim.js'

export default function About({ fontsReady }) {
  const scope = useRef(null)

  useGSAP(
    () => {
      if (!fontsReady) return
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        revealLines('.about-title')
        fadeUp('.about-body p, .stat-cell, .client-row', { stagger: 0.06 })
        countUp('.stat-num')
      })
      return () => mm.revert()
    },
    { scope, dependencies: [fontsReady] },
  )

  return (
    <section className="about container" id="about" ref={scope}>
      <hr className="rule" />

      <div className="about-grid grid-12">
        <h2 className="about-title">About</h2>
        <div className="about-body">
          {BIO.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      </div>

      <ul className="stats" aria-label="Career stats">
        {STATS.map((s) => (
          <li className="stat-cell" key={s.label}>
            <span className="stat-value">
              <span aria-hidden="true">
                <span className="stat-num" data-value={s.value} data-decimals="0">
                  {s.value}
                </span>
                {s.suffix ? <span className="stat-affix">{s.suffix}</span> : null}
              </span>
              <span className="sr-only">{`${s.value}${s.suffix || ''}`}</span>
            </span>
            <span className="stat-label label">{s.label}</span>
          </li>
        ))}
      </ul>

      <div className="clients">
        <h3 className="clients-title label">Selected clients</h3>
        <ul className="client-list">
          {CLIENTS.map((cl) => (
            <li className="client-row" key={cl.name}>
              <span className="client-name">{cl.name}</span>
              <span className="client-years">{cl.years}</span>
            </li>
          ))}
          <li className="client-row client-row-dim">
            <span className="client-name">More under NDA</span>
            <span className="client-years"></span>
          </li>
        </ul>
      </div>
    </section>
  )
}
