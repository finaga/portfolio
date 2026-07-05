import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { Flip } from 'gsap/Flip'
import { projects, categories } from '../data/projects'
import ViewToggle from '../components/ViewToggle'
import ImageReveal from '../components/ImageReveal'
import { useLenis } from '../lib/LenisProvider'
import { usePageTitle } from '../lib/usePageTitle'

gsap.registerPlugin(Flip)

const galleryPlacements = [
  'gi--wide',
  'gi--left',
  'gi--right',
  'gi--mid',
]

export default function Index({ view }) {
  const [activeSlug, setActiveSlug] = useState(projects[0].slug)
  const flipStateRef = useRef(null)
  const rootRef = useRef(null)
  const lenisRef = useLenis()

  const isList = view === 'list'
  usePageTitle(isList ? '' : 'Gallery')

  // List view is a single fixed viewport on desktop: no page scroll.
  // On mobile the list flows normally (it can be taller than the screen).
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 650px)')
    const apply = () => {
      if (isList && desktop.matches) {
        document.body.style.overflow = 'hidden'
        lenisRef?.current?.stop()
      } else {
        document.body.style.overflow = ''
        lenisRef?.current?.start()
      }
    }
    apply()
    desktop.addEventListener('change', apply)
    return () => {
      desktop.removeEventListener('change', apply)
      document.body.style.overflow = ''
      lenisRef?.current?.start()
    }
  }, [isList, lenisRef])

  // FLIP continuity between List active image and its Gallery tile.
  const captureFlip = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    flipStateRef.current = Flip.getState('[data-flip-id]')
  }

  useLayoutEffect(() => {
    const state = flipStateRef.current
    if (!state) return
    flipStateRef.current = null

    const target = rootRef.current?.querySelector(
      `[data-flip-id="pi-${activeSlug}"]`,
    )
    if (target && !isList) {
      // bring the matching tile roughly where the eye is before flipping
      target.closest('.gi')?.scrollIntoView({ block: 'center', behavior: 'instant' })
    }
    Flip.from(state, {
      targets: '[data-flip-id]',
      duration: 1,
      ease: 'expo.inOut',
      absolute: true,
      onEnter: (els) =>
        gsap.fromTo(els, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: 'none' }),
      onLeave: (els) => gsap.to(els, { opacity: 0, duration: 0.35, ease: 'none' }),
    })
  }, [view]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div ref={rootRef}>
      {isList ? (
        <ListView activeSlug={activeSlug} onActivate={setActiveSlug} />
      ) : (
        <GalleryView />
      )}
      <ViewToggle onBeforeToggle={captureFlip} />
    </div>
  )
}

function ListView({ activeSlug, onActivate }) {
  return (
    <article className="list">
      <h1 className="sr-only">Selected work of André Finageiv</h1>
      <div className="site-max site-grid list__content">
        <div className="list__index" data-intro="up">
          {categories.map((cat) => {
            const items = projects.filter((p) => p.category === cat.key)
            return (
              <div className="list__group" key={cat.key}>
                <h3 className="list__cat">{cat.label}</h3>
                <ul className="list__items">
                  {items.map((p) => (
                    <li key={p.slug}>
                      <Link
                        to={`/project/${p.slug}`}
                        className={
                          'list__item' +
                          (p.slug === activeSlug ? ' is-active' : '')
                        }
                        onMouseEnter={() => onActivate(p.slug)}
                        onFocus={() => onActivate(p.slug)}
                      >
                        {p.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
        <div className="list__media" data-intro="fade" aria-hidden="true">
          {projects.map((p) => (
            <div
              key={p.slug}
              className={
                'list__image' + (p.slug === activeSlug ? ' is-active' : '')
              }
            >
              <img
                src={p.hero}
                alt=""
                loading="eager"
                decoding="async"
                data-flip-id={p.slug === activeSlug ? `pi-${p.slug}` : undefined}
              />
            </div>
          ))}
        </div>
      </div>
    </article>
  )
}

function GalleryView() {
  return (
    <article className="gallery">
      <h1 className="sr-only">Selected work of André Finageiv, gallery view</h1>
      <div className="site-max site-grid gallery__grid">
        {projects.map((p, i) => (
          <Link
            to={`/project/${p.slug}`}
            className={'gi h-trig ' + galleryPlacements[i % galleryPlacements.length]}
            key={p.slug}
          >
            <ImageReveal
              src={p.hero}
              alt={p.title}
              aspect={p.heroAspect}
              eager={i < 2}
              flipId={`pi-${p.slug}`}
            />
            <p className="gi__caption">
              <span className="gi__title">{p.title}</span>
              <span className="gi__year">{p.year}</span>
            </p>
          </Link>
        ))}
      </div>
    </article>
  )
}
