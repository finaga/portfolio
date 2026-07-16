import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { gsap, ScrollTrigger, EASE_IO, prefersReduced } from '../lib/motion'
import { useApp, TLink } from '../lib/AppContext'
import { LINKS } from '../data/projects'

const NavRoll = ({ label }) => (
  <span className="roll" aria-hidden="true">
    <span>{label}</span>
    <span>{label}</span>
  </span>
)

export default function Header() {
  const location = useLocation()
  const { lenisRef } = useApp()
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)
  const closeRef = useRef(null)
  const headerRef = useRef(null)

  // Close menu on route change
  useEffect(() => { setOpen(false) }, [location.pathname])

  // Hide on scroll down, return on scroll up — keeps the poster clean
  useEffect(() => {
    if (prefersReduced()) return undefined
    const el = headerRef.current
    let hidden = false
    const st = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        const shouldHide = self.direction === 1 && self.scroll() > 220
        if (shouldHide !== hidden) {
          hidden = shouldHide
          gsap.to(el, { yPercent: hidden ? -130 : 0, duration: 0.45, ease: 'power3.out', overwrite: 'auto' })
        }
      },
    })
    return () => st.kill()
  }, [])

  useEffect(() => {
    const menu = menuRef.current
    if (!menu) return
    const lenis = lenisRef.current
    if (open) {
      lenis?.stop()
      gsap.set(menu, { visibility: 'visible' })
      if (prefersReduced()) {
        gsap.set(menu, { clipPath: 'inset(0% 0 0% 0)' })
      } else {
        gsap.fromTo(
          menu,
          { clipPath: 'inset(0 0 100% 0)' },
          { clipPath: 'inset(0% 0 0% 0)', duration: 0.65, ease: EASE_IO }
        )
        gsap.fromTo(
          menu.querySelectorAll('.menu-links a'),
          { y: 48, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'expo.out', stagger: 0.06, delay: 0.25 }
        )
      }
      closeRef.current?.focus()
    } else {
      lenis?.start()
      if (prefersReduced()) {
        gsap.set(menu, { clipPath: 'inset(0 0 100% 0)', visibility: 'hidden' })
      } else {
        gsap.to(menu, {
          clipPath: 'inset(0 0 100% 0)',
          duration: 0.5,
          ease: EASE_IO,
          onComplete: () => gsap.set(menu, { visibility: 'hidden' }),
        })
      }
    }
  }, [open, lenisRef])

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const isHome = location.pathname === '/'
  const isAbout = location.pathname === '/about'

  return (
    <>
      <header className="header" ref={headerRef}>
        <TLink to="/" className="wordmark" aria-label="André Finageiv — index">
          André Finageiv
        </TLink>
        <nav aria-label="Primary">
          <TLink to="/" aria-current={isHome ? 'page' : undefined} className="link-tail" aria-label="Index">
            <NavRoll label="Index" />
          </TLink>
          <TLink to="/about" aria-current={isAbout ? 'page' : undefined} className="link-tail" aria-label="About">
            <NavRoll label="About" />
          </TLink>
          <a href={`mailto:${LINKS.email}`} className="link-tail" aria-label="Contact by email">
            <NavRoll label="Contact" />
          </a>
        </nav>
        <button type="button" className="menu-btn" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="menu">
          Menu
        </button>
      </header>

      <div className="menu" id="menu" ref={menuRef} role="dialog" aria-modal="true" aria-label="Menu">
        <button type="button" className="menu-close" ref={closeRef} onClick={() => setOpen(false)}>
          Close
        </button>
        <nav className="menu-links" aria-label="Menu">
          <TLink to="/"><small>01</small>Index</TLink>
          <TLink to="/about"><small>02</small>About</TLink>
          <a href={`mailto:${LINKS.email}`}><small>03</small>Contact</a>
        </nav>
        <div className="menu-foot">
          <span>São Paulo · 23.55°S 46.63°W</span>
          <span>Open · Q3 2026</span>
        </div>
      </div>
    </>
  )
}
