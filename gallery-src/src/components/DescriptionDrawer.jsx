import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function DescriptionDrawer({ project }) {
  const [open, setOpen] = useState(false)
  const panelRef = useRef(null)

  useEffect(() => {
    const panel = panelRef.current
    if (!panel) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      panel.style.height = open ? 'auto' : '0px'
      return
    }
    gsap.to(panel, {
      height: open ? 'auto' : 0,
      duration: 0.75,
      ease: 'expo.out',
      overwrite: true,
    })
    if (open) {
      gsap.fromTo(
        panel.querySelectorAll('.drawer__col'),
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'expo.out', stagger: 0.06, delay: 0.12 },
      )
    }
  }, [open])

  return (
    <aside className="drawer">
      <div className="site-max">
        <button
          type="button"
          className="drawer__bar"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="project-description"
        >
          <span>Description</span>
          <span className={'drawer__plus' + (open ? ' is-open' : '')} aria-hidden="true">
            +
          </span>
        </button>
      </div>
      <div className="drawer__panel" id="project-description" ref={panelRef}>
        <div className="site-max site-grid drawer__inner">
          <div className="drawer__col drawer__text">
            <p>{project.description}</p>
          </div>
          <div className="drawer__col drawer__meta">
            <dl>
              <div className="drawer__row">
                <dt>Client</dt>
                <dd>{project.client}</dd>
              </div>
              <div className="drawer__row">
                <dt>Year</dt>
                <dd>{project.year}</dd>
              </div>
              <div className="drawer__row">
                <dt>Role</dt>
                <dd>{project.role}</dd>
              </div>
              <div className="drawer__row">
                <dt>Scope</dt>
                <dd>{project.scope}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </aside>
  )
}
