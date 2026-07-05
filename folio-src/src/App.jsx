import { useEffect, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Work from './components/Work.jsx'
import About from './components/About.jsx'
import Footer from './components/Footer.jsx'

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText)

if (import.meta.env.DEV) {
  // debug handle for headless preview verification
  window.gsap = gsap
  window.ScrollTrigger = ScrollTrigger
}

export default function App() {
  // SplitText needs final metrics — wait for fonts before any
  // text splitting so lines break where they'll stay.
  const [fontsReady, setFontsReady] = useState(false)
  useEffect(() => {
    document.fonts.ready.then(() => setFontsReady(true))
  }, [])

  return (
    <>
      <Header />
      <main>
        <Hero fontsReady={fontsReady} />
        <Work fontsReady={fontsReady} />
        <About fontsReady={fontsReady} />
      </main>
      <Footer fontsReady={fontsReady} />
    </>
  )
}
