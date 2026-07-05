import { useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import MobileMenu from './MobileMenu'
import { useTheme } from '../lib/ThemeProvider'

const navItems = [
  { to: '/', label: 'Projects' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()
  const { theme, toggle } = useTheme()
  // Projects is "active" on both index views and project pages
  const projectsActive =
    pathname === '/' || pathname === '/grid' || pathname.startsWith('/project/')

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
          <button
            type="button"
            className="uline sh__theme-btn"
            onClick={toggle}
            aria-pressed={theme === 'dark'}
          >
            {theme === 'dark' ? 'Light' : 'Dark'}
          </button>
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
