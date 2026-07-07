import { Navigate, Route, Routes, useParams } from 'react-router-dom'
import Header from './components/Header'
import IntroLoader from './components/IntroLoader'
import Index from './pages/Index'
import CasePage from './pages/CasePage'
import ExperimentPage from './pages/ExperimentPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import { LenisProvider } from './lib/LenisProvider'
import { ThemeProvider } from './lib/ThemeProvider'
import PageTransitions from './lib/PageTransitions'
import { bySlug, pathFor } from './data/projects'

// Legacy /project/:slug URLs route to the right world by category.
function LegacyProjectRedirect() {
  const { slug } = useParams()
  const p = bySlug(slug)
  return <Navigate to={p ? pathFor(p) : '/'} replace />
}

export default function App() {
  return (
    <ThemeProvider>
      <LenisProvider>
        <div className="site">
          <Header />
          <IntroLoader />
          <PageTransitions>
            {(location) => (
              <Routes location={location}>
                <Route path="/" element={<Index view="list" />} />
                <Route path="/grid" element={<Index view="gallery" />} />
                <Route path="/case/:slug" element={<CasePage />} />
                <Route path="/exp/:slug" element={<ExperimentPage />} />
                <Route path="/project/:slug" element={<LegacyProjectRedirect />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="*" element={<Index view="list" />} />
              </Routes>
            )}
          </PageTransitions>
        </div>
      </LenisProvider>
    </ThemeProvider>
  )
}
