import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { revealLines, fadeUp } from '../lib/anim.js'

export default function Hero({ fontsReady }) {
  const scope = useRef(null)

  useGSAP(
    () => {
      if (!fontsReady) return
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.set('.hero-gate', { autoAlpha: 1 })
        revealLines('.hero-title', { trigger: false, delay: 0.15, stagger: 0.14 })
        fadeUp(['.hero-eyebrow', '.hero-sub', '.hero-foot'], {
          trigger: false,
          delay: 0.55,
          stagger: 0.12,
        })
      })
      return () => mm.revert()
    },
    { scope, dependencies: [fontsReady] },
  )

  return (
    <section className="hero container" id="top" ref={scope}>
      <p className="hero-eyebrow label hero-gate">Product designer, São Paulo</p>

      <div className="hero-block">
        <h1 className="hero-title hero-gate">
          <span className="hero-line">I design software.</span>
          <span className="hero-line hero-line-ghost">Twenty years doing it.</span>
        </h1>

        <div className="hero-under">
          <p className="hero-sub hero-gate">
            SaaS, design ops, and the occasional apparel line.
          </p>
          <div className="hero-foot hero-gate">
            <a className="hero-cta" href="#work">
              Selected work <span aria-hidden="true">↓</span>
            </a>
            <p className="hero-status">
              <span className="status-dot" aria-hidden="true" />
              Open · Q3 2026
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
