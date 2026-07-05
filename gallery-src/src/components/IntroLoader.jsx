import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const KEY = 'introPlayed'

// First-load choreography: wordmark letters rise in at full grid width,
// the wordmark settles down to masthead scale, nav and index reveal.
// Plays once per session; skipped entirely under prefers-reduced-motion.
export default function IntroLoader() {
  const [active, setActive] = useState(() => {
    if (typeof window === 'undefined') return false
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
    return !sessionStorage.getItem(KEY)
  })
  const maskRef = useRef(null)

  useLayoutEffect(() => {
    if (!active) return undefined
    sessionStorage.setItem(KEY, '1')

    const wordmark = document.querySelector('[data-intro="wordmark"]')
    const downEls = gsap.utils.toArray('[data-intro="down"]')
    const upEls = gsap.utils.toArray('[data-intro="up"]')
    const fadeEls = gsap.utils.toArray('[data-intro="fade"]')
    if (!wordmark) {
      setActive(false)
      return undefined
    }

    // letters are pre-split into spans by Header itself (React-owned DOM) —
    // animate them in place rather than mutating React's subtree directly,
    // which would desync the reconciler on the next render.
    const letters = gsap.utils.toArray(wordmark.querySelectorAll('.sh__wordmark-letter'))

    // scale factor: wordmark grows to span the grid content width
    const containerW =
      wordmark.closest('.site-max')?.clientWidth -
        2 * parseFloat(getComputedStyle(document.documentElement).fontSize) * 2 ||
      window.innerWidth * 0.9
    const naturalW = wordmark.getBoundingClientRect().width
    const scaleUp = Math.max(1, (containerW || naturalW) / naturalW)

    document.body.style.overflow = 'hidden'

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'expo.out' },
        onComplete: () => {
          document.body.style.overflow = ''
          gsap.set([wordmark, ...downEls, ...upEls, ...fadeEls], {
            clearProps: 'all',
          })
          setActive(false)
        },
      })

      tl.set(wordmark, { scale: scaleUp, transformOrigin: 'top left' })
        .set(downEls, { opacity: 0, y: '-1.5rem' })
        .set(upEls, { opacity: 0, y: '3rem' })
        .set(fadeEls, { opacity: 0 })
        .from(letters, {
          yPercent: 115,
          opacity: 0,
          duration: 1,
          stagger: 0.045,
        })
        .to({}, { duration: 0.45 }) // hold the full-width wordmark for a beat
        .to(wordmark, { scale: 1, duration: 1.1, ease: 'expo.inOut' })
        .to(maskRef.current, { opacity: 0, duration: 0.5, ease: 'none' }, '-=0.55')
        .to(downEls, { opacity: 1, y: 0, duration: 0.9, stagger: 0.08 }, '-=0.5')
        .to(upEls, { opacity: 1, y: 0, duration: 0.9 }, '-=0.75')
        .to(fadeEls, { opacity: 1, duration: 0.6, ease: 'none' }, '-=0.6')
    })

    return () => {
      document.body.style.overflow = ''
      ctx.revert()
    }
  }, [active])

  if (!active) return null

  return <div className="intro-mask" ref={maskRef} aria-hidden="true" />
}
