import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Mask-reveal media block: clip-path opens on scroll enter, inner image
// counter-scales. Content stays visible if JS/motion is unavailable.
export default function ImageReveal({
  src,
  alt = '',
  aspect = 75,
  eager = false,
  flipId,
  hoverScale = true,
}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches)
      return undefined

    const img = el.querySelector('img')
    const tl = gsap.timeline({
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    })
    tl.fromTo(
      el,
      { clipPath: 'inset(10% 5% 10% 5%)' },
      { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'expo.out' },
    ).fromTo(
      img,
      { scale: 1.15 },
      { scale: 1, duration: 1.5, ease: 'expo.out', clearProps: 'transform' },
      0,
    )

    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [])

  return (
    <div
      ref={ref}
      className={'media-fill aspect' + (hoverScale ? ' h-scale' : '')}
      style={{ '--aspect': `${aspect}%` }}
    >
      <img
        src={src}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        data-flip-id={flipId}
      />
    </div>
  )
}
