import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/space-grotesk'
import '@fontsource-variable/jetbrains-mono'
import './styles/tokens.css'
import './styles/base.css'
import './styles/header.css'
import './styles/hero.css'
import './styles/work.css'
import './styles/about.css'
import './styles/footer.css'
import App from './App.jsx'

// Gate load-time hero hiding on JS + motion preference so no-JS
// and reduced-motion visitors always see content.
if (window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
  document.documentElement.classList.add('motion-ok')
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
