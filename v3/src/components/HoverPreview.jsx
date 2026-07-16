import { useEffect, useRef } from 'react'
import { gsap, useGSAP, prefersReduced } from '../lib/motion'
import Plate from './Plate'

/* Floating media preview that trails the cursor over the index. */
export default function HoverPreview({ item }) {
  const ref = useRef(null)

  useGSAP(() => {
    if (prefersReduced()) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const el = ref.current
    const xTo = gsap.quickTo(el, 'x', { duration: 0.55, ease: 'power3.out' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.55, ease: 'power3.out' })
    const move = (e) => {
      xTo(e.clientX + 32)
      yTo(e.clientY - el.offsetHeight / 2)
    }
    window.addEventListener('mousemove', move, { passive: true })
    return () => window.removeEventListener('mousemove', move)
  }, [])

  useEffect(() => {
    if (prefersReduced()) return
    const el = ref.current
    if (!el) return
    if (item) {
      gsap.to(el, { autoAlpha: 1, scale: 1, duration: 0.35, ease: 'power3.out' })
    } else {
      gsap.to(el, { autoAlpha: 0, scale: 0.92, duration: 0.3, ease: 'power3.out' })
    }
  }, [item])

  return (
    <div className="preview" ref={ref} aria-hidden="true">
      {item &&
        (item.image ? (
          <img src={item.image} alt="" />
        ) : (
          <Plate kind={item.plateHero} />
        ))}
    </div>
  )
}
