import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Lenis from 'lenis'
import { gsap, ScrollTrigger, EASE_IO, prefersReduced } from './motion'

const Ctx = createContext(null)
export const useApp = () => useContext(Ctx)

// BASE_URL is '/' in dev and '/portfolio-v3/' in the built site — strip the
// trailing slash so it composes cleanly with react-router's basename and TLink's href.
export const basename = import.meta.env.BASE_URL.replace(/\/$/, '')

// Module-level morph payload survives the route unmount/mount boundary.
let morphPayload = null

export function AppProvider({ children }) {
  const navigate = useNavigate()
  const location = useLocation()
  const ghostRef = useRef(null)
  const lenisRef = useRef(null)
  // ready: preloader finished (or skipped) — pages gate their intro on it
  const [ready, setReady] = useState(false)
  const [ghost, setGhost] = useState(null) // {src, alt, plateKind}

  /* ---- Lenis ---- */
  useEffect(() => {
    if (prefersReduced()) return undefined
    const lenis = new Lenis({ autoRaf: false, lerp: 0.115 })
    lenisRef.current = lenis
    const raf = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    lenis.on('scroll', ScrollTrigger.update)
    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  /* ---- scroll to top on every location change ---- */
  useEffect(() => {
    const lenis = lenisRef.current
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true })
    else window.scrollTo(0, 0)
    requestAnimationFrame(() => ScrollTrigger.refresh())
  }, [location.pathname])

  /* ---- transition navigation ---- */
  const nav = useCallback(
    (to, opts = {}) => {
      if (to === location.pathname) return
      if (opts.morph && opts.morph.el && !prefersReduced()) {
        // FLIP morph: clone the clicked media into a fixed ghost, navigate,
        // then fly it to the destination hero once it registers.
        const rect = opts.morph.el.getBoundingClientRect()
        morphPayload = { ...opts.morph, rect, to }
        setGhost({ ...opts.morph, rect })
      }
      navigate(to)
    },
    [navigate, location.pathname]
  )

  /* ---- morph target registration (called by Project hero) ---- */
  const registerMorphTarget = useCallback((slug, el, onDone) => {
    if (!morphPayload || !el || morphPayload.slug !== slug) {
      onDone?.(false)
      return
    }
    const payload = morphPayload
    morphPayload = null
    const ghostEl = ghostRef.current
    if (!ghostEl) {
      setGhost(null)
      onDone?.(false)
      return
    }
    gsap.set(el, { opacity: 0 })
    requestAnimationFrame(() => {
      const target = el.getBoundingClientRect()
      gsap.fromTo(
        ghostEl,
        {
          left: payload.rect.left,
          top: payload.rect.top,
          width: payload.rect.width,
          height: payload.rect.height,
        },
        {
          left: target.left,
          top: target.top,
          width: target.width,
          height: target.height,
          duration: 0.85,
          ease: EASE_IO,
          onComplete: () => {
            gsap.set(el, { opacity: 1 })
            setGhost(null)
            onDone?.(true)
          },
        }
      )
    })
  }, [])

  // Safety: never leave a ghost stranded (e.g. 404 or lab page without target)
  useEffect(() => {
    if (!ghost) return undefined
    const t = setTimeout(() => {
      if (morphPayload) {
        morphPayload = null
        const ghostEl = ghostRef.current
        if (ghostEl) gsap.to(ghostEl, { opacity: 0, duration: 0.3, onComplete: () => setGhost(null) })
        else setGhost(null)
      }
    }, 1200)
    return () => clearTimeout(t)
  }, [ghost])

  const value = useMemo(
    () => ({ nav, ready, setReady, registerMorphTarget, lenisRef }),
    [nav, ready, registerMorphTarget]
  )

  return (
    <Ctx.Provider value={value}>
      {children}
      {ghost && (
        <div
          className="flip-ghost"
          ref={ghostRef}
          aria-hidden="true"
          style={{
            left: ghost.rect.left,
            top: ghost.rect.top,
            width: ghost.rect.width,
            height: ghost.rect.height,
          }}
        >
          {ghost.src ? <img src={ghost.src} alt="" /> : ghost.plate}
        </div>
      )}
    </Ctx.Provider>
  )
}

/* Transition-aware link */
export function TLink({ to, morph, children, ...rest }) {
  const { nav } = useApp()
  return (
    <a
      href={`${basename}${to}`}
      {...rest}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
        e.preventDefault()
        nav(to, morph ? { morph: morph() } : undefined)
      }}
    >
      {children}
    </a>
  )
}
