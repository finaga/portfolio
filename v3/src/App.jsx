import { Routes, Route, useParams } from 'react-router-dom'
import { AppProvider } from './lib/AppContext'
import Header from './components/Header'
import Preloader from './components/Preloader'
import Home from './pages/Home'
import Project from './pages/Project'
import About from './pages/About'
import NotFound from './pages/NotFound'

/* Remount Project per slug so intros and morph targets reset cleanly. */
function ProjectRoute() {
  const { slug } = useParams()
  return <Project key={slug} />
}

export default function App() {
  return (
    <AppProvider>
      <Preloader />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work/:slug" element={<ProjectRoute />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </AppProvider>
  )
}
