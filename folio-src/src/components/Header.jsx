export default function Header() {
  return (
    <header className="site-header">
      <div className="container header-row">
        <a className="header-name" href="#top" aria-label="André Finageiv, back to top">
          André Finageiv
        </a>
        <nav className="header-nav" aria-label="Primary">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
    </header>
  )
}
