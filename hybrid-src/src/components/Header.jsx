import { useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import MobileMenu from './MobileMenu'

const navItems = [
  { to: '/', label: 'Projects' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()
  // Projects is "active" on the index views and any case/experiment page
  const projectsActive =
    pathname === '/' ||
    pathname === '/grid' ||
    pathname.startsWith('/case/') ||
    pathname.startsWith('/exp/')

  return (
    <header className="sh sh--blend">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <nav className="site-max site-grid sh__nav" aria-label="Primary">
        <div className="sh__logo-cell">
          <Link to="/" className="sh__wordmark" aria-label="André Finageiv, home">
            <span className="sh__wordmark-inner" data-intro="wordmark">
              {[...'Finageiv'].map((ch, i) => (
                <span className="sh__wordmark-letter" key={i}>
                  {ch}
                </span>
              ))}
            </span>
          </Link>
        </div>
        <div className="sh__contact" data-intro="down">
          <a href="mailto:hello@finageiv.com" className="uline">
            hello@finageiv.com
          </a>
        </div>
        <div className="sh__links" data-intro="down">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={() =>
                'uline' +
                ((item.to === '/' ? projectsActive : pathname === item.to)
                  ? ' is-active'
                  : '')
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
        <div className="sh__menu-cell" data-intro="down">
          <button
            type="button"
            className="sh__menu-btn"
            onClick={() => setMenuOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
          >
            Menu
          </button>
        </div>
      </nav>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  )
}
