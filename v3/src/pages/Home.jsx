import { useEffect, useRef, useState } from 'react'
import { gsap, EASE, useGSAP, prefersReduced } from '../lib/motion'
import { useApp } from '../lib/AppContext'
import { WORK, LAB } from '../data/projects'
import IndexRow from '../components/IndexRow'
import HoverPreview from '../components/HoverPreview'
import Footer from '../components/Footer'
import { Lines, Reveal } from '../components/Reveal'

export default function Home() {
  const { ready } = useApp()
  const heroRef = useRef(null)
  const [hovered, setHovered] = useState(null)

  useEffect(() => {
    document.title = 'André Finageiv — Product Designer'
  }, [])

  useGSAP(
    () => {
      if (!ready || prefersReduced()) return
      const tl = gsap.timeline({ defaults: { ease: EASE } })
      tl.fromTo(
        heroRef.current.querySelector('.hero-meta'),
        { opacity: 0, y: -14 },
        { opacity: 1, y: 0, duration: 0.9 },
        0.05
      ).fromTo(
        heroRef.current.querySelector('.hero-statement'),
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.9 },
        0.2
      )
    },
    { dependencies: [ready], scope: heroRef }
  )

  return (
    <>
      <section className="hero container" ref={heroRef}>
        <div className="hero-meta">
          <span>Product Designer</span>
          <span>São Paulo · 23.55°S 46.63°W</span>
          <span>Open — Q3 2026</span>
        </div>
        <p className="hero-statement">
          I work where the problems are hardest and the users care the most:
          enterprise SaaS, real-time control rooms, growth funnels that turn
          pixels into revenue.
        </p>
      </section>

      <section className="work container" id="work" aria-labelledby="work-title">
        <div className="section-head">
          <Lines as="h2" id="work-title">Selected Work</Lines>
          <span className="count">(04)</span>
        </div>
        <Reveal className="index" stagger={0.07}>
          {WORK.map((p) => (
            <IndexRow key={p.slug} project={p} onHover={setHovered} />
          ))}
        </Reveal>
      </section>

      <section className="lab inv" aria-labelledby="lab-title">
        <div className="container">
          <div className="section-head">
            <Lines as="h2" id="lab-title">Experiments</Lines>
            <span className="count">(04)</span>
          </div>
          <Reveal className="index" stagger={0.07}>
            {LAB.map((p) => (
              <IndexRow key={p.slug} project={p} onHover={setHovered} />
            ))}
          </Reveal>
        </div>
      </section>

      <section className="quote-band container">
        <Lines as="blockquote">Twenty years doing it.</Lines>
      </section>

      <Footer />
      <HoverPreview item={hovered} />
    </>
  )
}
