import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const INDEX_VIEWS = ['/', '/grid']
const isTogglePair = (a, b) => INDEX_VIEWS.includes(a) && INDEX_VIEWS.includes(b)

// Crossfade route transitions (.35s linear, house style). The List⇄Gallery
// toggle swaps instantly — GSAP Flip owns that continuity.
export default function PageTransitions({ children }) {
  const location = useLocation()
  const [displayLocation, setDisplayLocation] = useState(location)
  const mainRef = useRef(null)
  const tlRef = useRef(null)

  useEffect(() => {
    if (location.pathname === displayLocation.pathname) {
      if (location !== displayLocation) setDisplayLocation(location)
      return
    }

    if (isTogglePair(location.pathname, displayLocation.pathname)) {
      setDisplayLocation(location)
      return
    }

    const el = mainRef.current
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || !el) {
      setDisplayLocation(location)
      window.scrollTo(0, 0)
      return
    }

    tlRef.current?.kill()
    const tl = gsap.timeline()
    tlRef.current = tl
    tl.to(el, { opacity: 0, duration: 0.35, ease: 'none' })
      .add(() => {
        setDisplayLocation(location)
        window.scrollTo(0, 0)
      })
      .add(() => ScrollTrigger.refresh(), '+=0.05')
      .to(el, { opacity: 1, duration: 0.35, ease: 'none' })

    return () => {
      // a newer navigation supersedes this one; never leave the page hidden
      if (tlRef.current === tl) return
      tl.kill()
    }
  }, [location, displayLocation])

  // safety net: whatever happens, the page must never stay invisible
  useEffect(() => {
    const el = mainRef.current
    if (!el) return
    const id = setInterval(() => {
      if (
        !tlRef.current?.isActive() &&
        Number(getComputedStyle(el).opacity) < 1
      ) {
        gsap.set(el, { opacity: 1 })
      }
    }, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <main ref={mainRef} id="main">
      {typeof children === 'function' ? children(displayLocation) : children}
      <div aria-live="polite" className="sr-only" id="route-announcer" />
    </main>
  )
}
