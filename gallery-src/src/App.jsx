import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import IntroLoader from './components/IntroLoader'
import Index from './pages/Index'
import ProjectPage from './pages/ProjectPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import { LenisProvider } from './lib/LenisProvider'
import { ThemeProvider } from './lib/ThemeProvider'
import PageTransitions from './lib/PageTransitions'

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
                <Route path="/project/:slug" element={<ProjectPage />} />
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
