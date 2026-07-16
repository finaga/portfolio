import { useEffect, useRef, useState } from 'react'
import { gsap, EASE_IO, useGSAP, prefersReduced } from '../lib/motion'
import { useApp } from '../lib/AppContext'

/* First-visit-only counter → curtain lift. Session-scoped. */
export default function Preloader() {
  const { setReady } = useApp()
  const [show] = useState(() => {
    if (typeof window === 'undefined') return false
    if (prefersReduced()) return false
    return !window.sessionStorage.getItem('v3-seen')
  })
  const rootRef = useRef(null)
  const countRef = useRef(null)
  const doneRef = useRef(false)

  useEffect(() => {
    if (!show && !doneRef.current) {
      doneRef.current = true
      setReady(true)
    }
  }, [show, setReady])

  useGSAP(
    () => {
      if (!show) return
      window.sessionStorage.setItem('v3-seen', '1')
      const state = { v: 0 }
      const tl = gsap.timeline({
        onComplete: () => {
          doneRef.current = true
          setReady(true)
          rootRef.current?.remove()
        },
      })
      tl.to(state, {
        v: 100,
        duration: 1.3,
        ease: 'expo.inOut',
        onUpdate: () => {
          if (countRef.current) countRef.current.textContent = String(Math.round(state.v)).padStart(3, '0')
        },
      })
        .to(rootRef.current, { yPercent: -101, duration: 0.75, ease: EASE_IO }, '+=0.15')
    },
    { scope: rootRef, dependencies: [show] }
  )

  if (!show) return null
  return (
    <div className="preloader" ref={rootRef} aria-hidden="true">
      <div className="pl-name">André Finageiv</div>
      <div className="pl-count" ref={countRef}>000</div>
    </div>
  )
}
