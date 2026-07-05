import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './styles/index.css'
import './styles/header.css'
import './styles/index-page.css'
import './styles/project.css'
import './styles/pages.css'

// import.meta.env.BASE_URL mirrors vite.config's `base` exactly: '/' in
// dev, '/gallery/' in production — so this needs no env-specific branching.
const basename = import.meta.env.BASE_URL.replace(/\/$/, '')

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
