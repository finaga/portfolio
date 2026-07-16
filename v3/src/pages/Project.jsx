import { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { gsap, EASE, useGSAP, prefersReduced } from '../lib/motion'
import { useApp, TLink } from '../lib/AppContext'
import { bySlug, nextOf } from '../data/projects'
import Plate from '../components/Plate'
import Counter from '../components/Counter'
import Footer from '../components/Footer'
import { Lines, Reveal, MediaReveal } from '../components/Reveal'
import NotFound from './NotFound'

export default function Project() {
  const { slug } = useParams()
  const project = bySlug(slug)
  const { ready, registerMorphTarget } = useApp()
  const mediaRef = useRef(null)
  const registeredRef = useRef(false)

  useEffect(() => {
    if (project) document.title = `${project.short} — André Finageiv`
  }, [project])

  /* Hero media entrance: either the FLIP ghost lands on it, or it wipes in. */
  useGSAP(
    () => {
      if (!project || !ready || registeredRef.current) return
      registeredRef.current = true
      const el = mediaRef.current
      registerMorphTarget(project.slug, el, (morphed) => {
        if (morphed || prefersReduced() || !el) return
        gsap.fromTo(
          el,
          { clipPath: 'inset(0 0 100% 0)' },
          { clipPath: 'inset(0% 0 0% 0)', duration: 1.1, ease: EASE, delay: 0.25 }
        )
      })
    },
    { dependencies: [ready, project?.slug] }
  )

  if (!project) return <NotFound />

  const next = nextOf(project.slug)
  const isLab = project.category === 'lab'

  return (
    <article>
      <header className="case-hero container">
        <div className="case-kicker">
          <span className="num">{project.num} / 08</span>
          <span>{project.discipline}</span>
          <span className="num">{project.year}</span>
        </div>
        <Lines as="h1" className="case-title" scroll={false} delay={0.1}>
          {project.title}
        </Lines>
        <div className={`case-media${project.image ? ' full' : ''}`} ref={mediaRef}>
          {project.image ? (
            <img src={project.image} alt={project.imageAlt} fetchPriority="high" width="1200" height="800" />
          ) : (
            <Plate kind={project.plateHero} />
          )}
        </div>

        <Reveal as="dl" className="facts" stagger={0.06}>
          <div>
            <dt>Client</dt>
            <dd>{project.client}</dd>
          </div>
          <div>
            <dt>Year</dt>
            <dd>{project.year}</dd>
          </div>
          <div>
            <dt>Role</dt>
            <dd>{project.role}</dd>
          </div>
          <div>
            <dt>Scope</dt>
            <dd>{project.scope}</dd>
          </div>
        </Reveal>
      </header>

      <section className="case-abstract container">
        <Lines as="p" scroll>{project.description}</Lines>
      </section>

      {project.kpis && (
        <section className="container" aria-label="Outcomes">
          <div className="kpis">
            {project.kpis.map((k) => (
              <div key={k.label}>
                <div className="kpi-value">
                  <Counter value={k.value} prefix={k.prefix} suffix={k.suffix} decimals={k.decimals} />
                </div>
                <div className="kpi-label">{k.label}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {isLab ? (
        <section className="case-body container" aria-label="Live demo">
          <div className="demo">
            <MediaReveal className="demo-frame" parallax={false}>
              <iframe
                src={project.live}
                title={`${project.title} — live demo`}
                loading="lazy"
              />
            </MediaReveal>
            <div className="demo-bar">
              <span className="live">Live — this is the real build, not a screenshot</span>
              <a className="link-tail" href={project.live} target="_blank" rel="noreferrer">
                Open standalone ↗
              </a>
            </div>
          </div>
        </section>
      ) : (
        <section className="case-body container" aria-label="Process plates">
          {project.plates.map((pl, i) =>
            pl.span === 'full' ? (
              <figure className="case-fig" key={pl.kind}>
                <MediaReveal>
                  <Plate kind={pl.kind} />
                </MediaReveal>
                <figcaption>
                  <span>{pl.caption}</span>
                  <span>Fig. {String(i + 1).padStart(2, '0')}</span>
                </figcaption>
              </figure>
            ) : null
          )}
          <div className="case-duo">
            {project.plates.map((pl, i) =>
              pl.span === 'duo' ? (
                <figure className="case-fig" key={pl.kind}>
                  <MediaReveal parallax={false}>
                    <Plate kind={pl.kind} />
                  </MediaReveal>
                  <figcaption>
                    <span>{pl.caption}</span>
                    <span>Fig. {String(i + 1).padStart(2, '0')}</span>
                  </figcaption>
                </figure>
              ) : null
            )}
          </div>
        </section>
      )}

      <div className="container">
        <TLink to={`/work/${next.slug}`} className="next">
          <p className="label-next">Next — {next.category === 'lab' ? 'Experiment' : 'Case'} {next.num}</p>
          <span className="next-title">
            {next.short}
            <span className="arrow" aria-hidden="true">⟶</span>
          </span>
        </TLink>
      </div>

      <Footer />
    </article>
  )
}
