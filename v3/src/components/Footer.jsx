import Magnetic from './Magnetic'
import { LINKS } from '../data/projects'

export default function Footer() {
  return (
    <footer className="footer container">
      <a className="footer-cta" href={`mailto:${LINKS.email}`}>
        <p className="invite">One senior engagement open — Q3 2026</p>
        <Magnetic strength={0.12}>
          <span className="big">Let’s talk</span>
        </Magnetic>
      </a>
      <div className="footer-grid">
        <span>© 2026 André Finageiv</span>
        <div className="links">
          <a className="link-tail" href={`mailto:${LINKS.email}`}>Email</a>
          <a className="link-tail" href={LINKS.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a className="link-tail" href={LINKS.instagram} target="_blank" rel="noreferrer">Instagram</a>
        </div>
        <span>São Paulo · 23.55°S 46.63°W</span>
      </div>
    </footer>
  )
}
