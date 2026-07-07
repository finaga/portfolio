import { Link } from 'react-router-dom'
import { nextOf, pathFor } from '../data/projects'

// Dark footer finale — Folio's editorial punctuation, shared by case and
// experiment pages. The dark world returns at the bottom of every light
// document: next-project nav + contact line + route back to the index.
export default function CaseFooter({ slug }) {
  const next = nextOf(slug)
  return (
    <footer className="cf">
      <div className="site-max cf__inner">
        {next && (
          <Link to={pathFor(next)} className="cf__next h-trig">
            <span className="cf__next-label">
              Next {next.category === 'case' ? 'case' : 'experiment'}
            </span>
            <span className="cf__next-title">
              {next.short} <span className="cf__next-arrow" aria-hidden="true">→</span>
            </span>
          </Link>
        )}
        <div className="cf__meta">
          <Link to="/" className="uline">
            Back to index
          </Link>
          <a href="mailto:hello@finageiv.com" className="uline">
            hello@finageiv.com
          </a>
          <p className="cf__who">
            André Finageiv · São Paulo · <span className="cf__avail">Open Q3 2026</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
