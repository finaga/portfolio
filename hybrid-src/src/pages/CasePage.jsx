import { useEffect, useRef } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'
import { bySlug } from '../data/projects'
import { revealLines, fadeUp, countUp, mediaReveal } from '../lib/anim'
import CaseFooter from '../components/CaseFooter'
import { usePageTitle } from '../lib/usePageTitle'

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP)

function Kpi({ k }) {
  const decimals = k.decimals || 0
  const full = `${k.prefix || ''}${k.value.toFixed(decimals)}${k.suffix || ''}`
  return (
    <li>
      <span className="cp__kpi-value">
        <span aria-hidden="true">
          {k.prefix ? <span className="cp__kpi-affix">{k.prefix}</span> : null}
          <span className="cp__kpi-num" data-value={k.value} data-decimals={decimals}>
            {k.value.toFixed(decimals)}
          </span>
          {k.suffix ? <span className="cp__kpi-affix">{k.suffix}</span> : null}
        </span>
        <span className="sr-only">{full}</span>
      </span>
      <span className="cp__kpi-label">{k.label}</span>
    </li>
  )
}

function Media({ im, alt, eager = false }) {
  if (im.kind === 'iframe') {
    return (
      <div className="media-fill aspect cp__iframe" style={{ '--aspect': `${im.aspect}%` }}>
        <iframe src={im.src} title={alt} loading="lazy" />
      </div>
    )
  }
  return (
    <figure className="cp__media" data-media>
      <div className="media-fill aspect" style={{ '--aspect': `${im.aspect}%` }}>
        <img src={im.src} alt={im.alt || alt} loading={eager ? 'eager' : 'lazy'} decoding="async" />
      </div>
    </figure>
  )
}

const SECTIONS = [
  { key: 'context', n: '§1', label: 'Context' },
  { key: 'approach', n: '§2', label: 'Approach' },
  { key: 'outcome', n: '§3', label: 'Outcome' },
  { key: 'reflection', n: '§4', label: 'Reflection' },
]

export default function CasePage() {
  const { slug } = useParams()
  const project = bySlug(slug)
  const scope = useRef(null)
  usePageTitle(project?.short ?? '')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  useGSAP(
    () => {
      if (!project) return
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        revealLines('.cp__title', { trigger: false, delay: 0.1 })
        revealLines('.cp__sec-body p')
        fadeUp('.cp__meta, .cp__abstract, .cp__sec-label')
        countUp('.cp__kpi-num')
        mediaReveal('[data-media]')
      })
      return () => mm.revert()
    },
    { scope, dependencies: [slug] },
  )

  if (!project) return <Navigate to="/" replace />

  // images[0] is the full-bleed hero; the rest interleave between sections,
  // alternating left/right offsets (Folio's case-v0/v1 rhythm).
  const [heroIm, ...streamIms] = project.images
  const streamFor = (i) => {
    const im = streamIms[i]
    if (!im) return null
    const side = i % 2 === 0 ? 'cp__stream--left' : 'cp__stream--right'
    return (
      <div className={`site-max site-grid cp__stream ${im.span === 'full' ? '' : side}`}>
        <div className={im.span === 'full' ? 'cp__stream-full' : 'cp__stream-cell'}>
          <Media im={im} alt={`${project.short}, plate ${i + 2}`} />
        </div>
      </div>
    )
  }

  return (
    <article className="cp" ref={scope}>
      <header className="site-max cp__head">
        <p className="cp__crumb">
          Case · {project.client} · {project.year}
        </p>
        <div className="cp__title-clip">
          <h1 className="cp__title">{project.title}</h1>
        </div>
        <div className="site-grid cp__head-grid">
          <dl className="cp__meta">
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
          </dl>
          <p className="cp__abstract">{project.description}</p>
        </div>
        <ul className="cp__kpis" aria-label="Key results">
          {project.kpis.map((k) => (
            <Kpi k={k} key={k.label} />
          ))}
        </ul>
      </header>

      {heroIm && (
        <div className="cp__hero">
          <Media im={heroIm} alt={`${project.short}, hero`} eager />
        </div>
      )}

      <div className="site-max cp__body">
        {SECTIONS.map(({ key, n, label }, si) => {
          const text = project.deep?.[key]
          if (!text) return null
          return (
            <div key={key}>
              <section className="site-grid cp__sec">
                <p className="cp__sec-label">
                  <span className="cp__sec-n">{n}</span> {label}
                </p>
                <div className="cp__sec-body">
                  <p>{text}</p>
                  {key === 'outcome' && project.impact && (
                    <ul className="cp__enabled" aria-label="What this enabled">
                      {project.impact.map((row) => (
                        <li key={row.k}>
                          <span className="cp__enabled-k">{row.k}</span>
                          <span className="cp__enabled-note">{row.note}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>
              {si < SECTIONS.length - 1 && streamFor(si)}
            </div>
          )
        })}
      </div>

      <CaseFooter slug={project.slug} />
    </article>
  )
}
