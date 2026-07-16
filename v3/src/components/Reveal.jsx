import { useRef } from 'react'
import { gsap, SplitText, EASE, useGSAP, prefersReduced } from '../lib/motion'
import { useApp } from '../lib/AppContext'

/*
 * Masked line reveal for display type. Content is visible by default;
 * we only hide it inside the animation frame right before animating,
 * so no-JS / reduced-motion users always see the text.
 */
export function Lines({ as: Tag = 'h2', children, className = '', delay = 0, scroll = true, ...rest }) {
  const ref = useRef(null)
  const splitRef = useRef(null)
  const { ready } = useApp()

  useGSAP(
    (context, contextSafe) => {
      if (!ready || prefersReduced()) return
      document.fonts.ready.then(
        contextSafe(() => {
          if (!ref.current) return
          splitRef.current = SplitText.create(ref.current, {
            type: 'lines',
            mask: 'lines',
            linesClass: 'split-line',
          })
          gsap.fromTo(
            splitRef.current.lines,
            { yPercent: 115 },
            {
              yPercent: 0,
              duration: 1.1,
              ease: EASE,
              stagger: 0.09,
              delay,
              scrollTrigger: scroll
                ? { trigger: ref.current, start: 'top 90%', once: true }
                : undefined,
            }
          )
        })
      )
      return () => {
        splitRef.current?.revert()
        splitRef.current = null
      }
    },
    { dependencies: [ready], scope: ref }
  )

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  )
}

/* Generic fade-up reveal for blocks; stagger children when `stagger` set. */
export function Reveal({ as: Tag = 'div', children, className = '', y = 36, stagger = 0, delay = 0, ...rest }) {
  const ref = useRef(null)
  const { ready } = useApp()

  useGSAP(
    () => {
      if (!ready || prefersReduced()) return
      const targets = stagger ? Array.from(ref.current.children) : [ref.current]
      gsap.fromTo(
        targets,
        { y, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.95,
          ease: EASE,
          stagger,
          delay,
          scrollTrigger: { trigger: ref.current, start: 'top 88%', once: true },
        }
      )
    },
    { dependencies: [ready], scope: ref }
  )

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  )
}

/* Media clip reveal — image wipes open from the bottom as it enters. */
export function MediaReveal({ children, className = '', parallax = true }) {
  const ref = useRef(null)
  const { ready } = useApp()

  useGSAP(
    () => {
      if (!ready || prefersReduced()) return
      gsap.fromTo(
        ref.current,
        { clipPath: 'inset(12% 4% 12% 4%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.2,
          ease: EASE,
          scrollTrigger: { trigger: ref.current, start: 'top 92%', once: true },
        }
      )
      if (parallax) {
        const media = ref.current.querySelector('img, svg')
        if (media) {
          gsap.fromTo(
            media,
            { yPercent: -6 },
            {
              yPercent: 6,
              ease: 'none',
              scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true },
            }
          )
        }
      }
    },
    { dependencies: [ready], scope: ref }
  )

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
