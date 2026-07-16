import { useRef } from 'react'
import { gsap, useGSAP, prefersReduced } from '../lib/motion'

/* Magnetic hover — element leans toward the cursor. Fine pointers only. */
export default function Magnetic({ children, strength = 0.3, className = '' }) {
  const ref = useRef(null)

  useGSAP(
    () => {
      if (prefersReduced()) return
      if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
      const el = ref.current
      const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' })
      const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' })
      const move = (e) => {
        const r = el.getBoundingClientRect()
        xTo((e.clientX - r.left - r.width / 2) * strength)
        yTo((e.clientY - r.top - r.height / 2) * strength)
      }
      const leave = () => { xTo(0); yTo(0) }
      el.addEventListener('mousemove', move)
      el.addEventListener('mouseleave', leave)
      return () => {
        el.removeEventListener('mousemove', move)
        el.removeEventListener('mouseleave', leave)
      }
    },
    { scope: ref }
  )

  return (
    <div ref={ref} className={className} style={{ display: 'inline-block' }}>
      {children}
    </div>
  )
}
