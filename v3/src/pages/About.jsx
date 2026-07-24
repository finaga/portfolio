import { useEffect } from 'react'
import { BIO, STATS, CLIENTS, LINKS } from '../data/projects'
import Counter from '../components/Counter'
import Footer from '../components/Footer'
import { Lines, Reveal, MediaReveal } from '../components/Reveal'

export default function About() {
  useEffect(() => {
    document.title = 'About — André Finageiv'
  }, [])

  return (
    <article>
      <header className="about-hero container">
        <Lines as="h1" className="about-title" scroll={false} delay={0.1}>
          About
        </Lines>
      </header>

      <section className="about-grid container">
        <div className="about-copy">
          {BIO.map((p) => (
            <Lines as="p" key={p.slice(0, 24)}>{p}</Lines>
          ))}
          <Reveal className="avail">
            <a className="link-tail" href={`mailto:${LINKS.email}`}>
              {LINKS.email}
            </a>
          </Reveal>
        </div>
        <MediaReveal>
          <figure className="portrait">
            <img src={`${import.meta.env.BASE_URL}img/ski.jpg`} alt="André on a ski slope, goggles up" width="1200" height="800" />
            <figcaption>Off duty — somewhere above the tree line</figcaption>
          </figure>
        </MediaReveal>
      </section>

      <section className="stats-band inv" aria-label="Career numbers">
        <div className="container">
          <div className="stats">
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="kpi-value">
                  <Counter value={s.value} suffix={s.suffix} />
                </div>
                <div className="kpi-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="clients container" aria-labelledby="clients-title">
        <div className="section-head">
          <Lines as="h2" id="clients-title">Clients</Lines>
          <span className="count">(04)</span>
        </div>
        <Reveal as="ul" className="clients-list" stagger={0.06}>
          {CLIENTS.map((c) => (
            <li key={c.name}>
              <span className="name">{c.name}</span>
              <span className="years">{c.years}</span>
            </li>
          ))}
        </Reveal>
      </section>

      <Footer />
    </article>
  )
}
