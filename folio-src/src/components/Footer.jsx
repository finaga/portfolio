import { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { LINKS } from '../data/cases.js'
import { revealLines, fadeUp } from '../lib/anim.js'

export default function Footer({ fontsReady }) {
  const scope = useRef(null)
  const [copied, setCopied] = useState(false)

  useGSAP(
    () => {
      if (!fontsReady) return
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        revealLines('.footer-avail, .footer-email')
        // near page end — fire as soon as they enter the viewport,
        // 'top 85%' is unreachable at max scroll
        fadeUp('.footer-links, .footer-bottom', { stagger: 0.1, start: 'top bottom-=24' })
      })
      return () => mm.revert()
    },
    { scope, dependencies: [fontsReady] },
  )

  async function onEmailClick(e) {
    // plain click copies; cmd/ctrl-click falls through to mailto
    if (e.metaKey || e.ctrlKey) return
    e.preventDefault()
    let ok = false
    try {
      // race a timeout — writeText can hang in unfocused documents
      await Promise.race([
        navigator.clipboard.writeText(LINKS.email),
        new Promise((_, rej) => setTimeout(rej, 500)),
      ])
      ok = true
    } catch {
      const ta = document.createElement('textarea')
      ta.value = LINKS.email
      ta.style.cssText = 'position:fixed;opacity:0'
      document.body.appendChild(ta)
      ta.select()
      try {
        ok = document.execCommand('copy')
      } catch {
        ok = false
      }
      ta.remove()
    }
    if (ok) {
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } else {
      window.location.href = `mailto:${LINKS.email}`
    }
  }

  return (
    <footer className="footer" id="contact" ref={scope}>
      <div className="container">
        <p className="footer-avail">
          Available for one senior engagement in Q3 2026.
        </p>

        <a
          className="footer-email"
          href={`mailto:${LINKS.email}`}
          onClick={onEmailClick}
        >
          {LINKS.email}
        </a>
        <p className="footer-hint label" aria-live="polite">
          {copied ? 'Copied to clipboard' : 'Click to copy the address'}
        </p>

        <nav className="footer-links" aria-label="Profiles">
          <a href={LINKS.linkedin} target="_blank" rel="noreferrer">
            LinkedIn <span aria-hidden="true">↗</span>
          </a>
          <a href={LINKS.instagram} target="_blank" rel="noreferrer">
            Instagram <span aria-hidden="true">↗</span>
          </a>
        </nav>

        <div className="footer-bottom">
          <span>© 2026 André Finageiv</span>
          <span>São Paulo, Brazil</span>
          <a href="#top">
            Back to top <span aria-hidden="true">↑</span>
          </a>
        </div>
      </div>
    </footer>
  )
}
