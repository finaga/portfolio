import { useEffect, useRef } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import gsap from 'gsap'
import { bySlug, related } from '../data/projects'
import ImageReveal from '../components/ImageReveal'
import DescriptionDrawer from '../components/DescriptionDrawer'
import Footer from '../components/Footer'
import { usePageTitle } from '../lib/usePageTitle'

const spanClass = {
  full: 'ps--full',
  left: 'ps--left',
  right: 'ps--right',
  center: 'ps--center',
}

export default function ProjectPage() {
  const { slug } = useParams()
  const project = bySlug(slug)
  const titleRef = useRef(null)
  usePageTitle(project?.title ?? '')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  useEffect(() => {
    const el = titleRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const tween = gsap.fromTo(
      el,
      { y: '40%', opacity: 0 },
      { y: '0%', opacity: 1, duration: 1.1, ease: 'expo.out', delay: 0.1 },
    )
    return () => tween.kill()
  }, [slug])

  if (!project) return <Navigate to="/" replace />

  const rel = related(slug)

  return (
    <article className="project">
      <div className="site-max project__head">
        <div className="project__title-clip">
          <h1 className="project__title" ref={titleRef}>
            {project.title}
          </h1>
        </div>
      </div>

      <div className="project__stream">
        {project.images.map((im, i) => {
          const media =
            im.kind === 'iframe' ? (
              <div className="media-fill aspect ps__iframe" style={{ '--aspect': `${im.aspect}%` }}>
                <iframe
                  src={im.src}
                  title={`${project.short}, live demo`}
                  loading="lazy"
                />
              </div>
            ) : (
              <ImageReveal
                src={im.src}
                alt={`${project.short}, plate ${i + 1}`}
                aspect={im.aspect}
                eager={i === 0}
                hoverScale={false}
              />
            )
          return im.span === 'full' ? (
            <div className="ps ps--full" key={i}>
              {media}
            </div>
          ) : (
            <div className="site-max site-grid ps" key={i}>
              <div className={spanClass[im.span] || 'ps--center'}>{media}</div>
            </div>
          )
        })}
      </div>

      {rel.length > 0 && (
        <section className="site-max project__related">
          <h2 className="project__related-title">Related projects</h2>
          <div className="site-grid project__related-grid">
            {rel.map((p) => (
              <Link
                to={`/project/${p.slug}`}
                className="project__related-item h-trig"
                key={p.slug}
              >
                <div className="media-fill aspect h-scale" style={{ '--aspect': '75%' }}>
                  <img src={p.hero} alt={p.title} loading="lazy" decoding="async" />
                </div>
                <p className="project__related-name">{p.short}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <Footer />
      <DescriptionDrawer project={project} />
    </article>
  )
}
