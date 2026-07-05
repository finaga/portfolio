import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Link, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { useTheme } from '../lib/ThemeProvider'

const items = [
  { to: '/', label: 'Projects' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function MobileMenu({ open, onClose }) {
  const ref = useRef(null)
  const { pathname } = useLocation()
  const { theme, toggle } = useTheme()

  // close when navigation happens (not on mount)
  const prevPath = useRef(pathname)
  useEffect(() => {
    if (prevPath.current !== pathname) {
      prevPath.current = pathname
      onClose()
    }
  }, [pathname]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const el = ref.current
    if (!el || !open) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.mm__item',
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.8, ease: 'expo.out', stagger: 0.06 },
      )
    }, el)
    return () => ctx.revert()
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  // portal: escapes the header's mix-blend-difference context
  return createPortal(
    <div className="mm" ref={ref} role="dialog" aria-modal="true" aria-label="Menu">
      <div className="site-max mm__top">
        <button type="button" className="mm__close" onClick={onClose}>
          Close
        </button>
      </div>
      <nav className="site-max mm__nav" aria-label="Menu">
        <ul>
          {items.map((it) => (
            <li key={it.to} className="mm__clip">
              <Link to={it.to} className="mm__item" onClick={onClose}>
                {it.label}
              </Link>
            </li>
          ))}
        </ul>
        <a href="mailto:hello@finageiv.com" className="mm__mail uline">
          hello@finageiv.com
        </a>
        <button type="button" className="mm__theme uline" onClick={toggle}>
          {theme === 'dark' ? 'Light mode' : 'Dark mode'}
        </button>
      </nav>
    </div>,
    document.body,
  )
}
