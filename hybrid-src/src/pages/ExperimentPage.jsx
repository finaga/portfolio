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
import { useFontsReady } from '../lib/useFontsReady'

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP)

// Experiment mini page — same document language as the case page at
// roughly half the height: reduced hero, 2-3 KPIs, one media block,
// a live link where one exists, and the shared dark footer finale.
export default function ExperimentPage() {
  const { slug } = useParams()
  const project = bySlug(slug)
  const scope = useRef(null)
  const fontsReady = useFontsReady()
  usePageTitle(project?.short ?? '')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  useGSAP(
    () => {
      if (!project || !fontsReady) return
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        revealLines('.cp__title', { trigger: false, delay: 0.1 })
        fadeUp('.cp__meta, .cp__abstract')
        countUp('.cp__kpi-num')
        mediaReveal('[data-media]')
      })
      return () => mm.revert()
    },
    { scope, dependencies: [slug, fontsReady] },
  )

  if (!project) return <Navigate to="/" replace />

  return (
    <article className="cp cp--mini" ref={scope}>
      <header className="site-max cp__head">
        <p className="cp__crumb">
          Experiment · {project.client} · {project.year}
        </p>
        <div className="cp__title-clip">
          <h1 className="cp__title">{project.title}</h1>
        </div>
        <div className="site-grid cp__head-grid">
          <dl className="cp__meta">
            <div>
              <dt>Role</dt>
              <dd>{project.role}</dd>
            </div>
            <div>
              <dt>Scope</dt>
              <dd>{project.scope}</dd>
            </div>
            <div>
              <dt>Year</dt>
              <dd>{project.year}</dd>
            </div>
          </dl>
          <p className="cp__abstract">{project.description}</p>
        </div>
        <ul className="cp__kpis cp__kpis--mini" aria-label="Key facts">
          {project.kpis.map((k) => {
            const decimals = k.decimals || 0
            const full = `${k.prefix || ''}${k.value.toFixed(decimals)}${k.suffix || ''}`
            return (
              <li key={k.label}>
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
          })}
        </ul>
        {project.liveUrl && (
          <p className="cp__live">
            <a
              href={project.liveUrl}
              className="uline"
              target={project.liveUrl.startsWith('http') ? '_blank' : undefined}
              rel={project.liveUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              Visit live ↗
            </a>
          </p>
        )}
      </header>

      <div className="site-max cp__mini-stream">
        {project.images.map((im, i) =>
          im.kind === 'iframe' ? (
            <div
              className="media-fill aspect cp__iframe"
              style={{ '--aspect': `${im.aspect}%` }}
              key={i}
            >
              <iframe src={im.src} title={`${project.short}, live demo`} loading="lazy" />
            </div>
          ) : (
            <figure className="cp__media" data-media key={i}>
              <div className="media-fill aspect" style={{ '--aspect': `${im.aspect}%` }}>
                <img
                  src={im.src}
                  alt={im.alt || `${project.short}, plate ${i + 1}`}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                />
              </div>
            </figure>
          ),
        )}
      </div>

      <CaseFooter slug={project.slug} />
    </article>
  )
}
