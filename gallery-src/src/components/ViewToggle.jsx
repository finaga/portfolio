import { Link, useLocation } from 'react-router-dom'

export default function ViewToggle({ onBeforeToggle }) {
  const { pathname } = useLocation()
  const isGallery = pathname === '/grid'

  return (
    <nav className="view-toggle" aria-label="Index view">
      <div className="site-max site-grid view-toggle__row">
        <div className="view-toggle__cell view-toggle__cell--list">
          <Link
            to="/"
            className={'uline' + (!isGallery ? ' is-active' : '')}
            onClick={() => isGallery && onBeforeToggle?.()}
            aria-current={!isGallery ? 'page' : undefined}
          >
            List
          </Link>
        </div>
        <div className="view-toggle__cell view-toggle__cell--gallery">
          <Link
            to="/grid"
            className={'uline' + (isGallery ? ' is-active' : '')}
            onClick={() => !isGallery && onBeforeToggle?.()}
            aria-current={isGallery ? 'page' : undefined}
          >
            Gallery
          </Link>
        </div>
      </div>
    </nav>
  )
}
