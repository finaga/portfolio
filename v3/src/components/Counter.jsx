import { useRef } from 'react'
import { gsap, EASE, useGSAP, prefersReduced } from '../lib/motion'
import { useApp } from '../lib/AppContext'

/* KPI number that counts up when scrolled into view. Final value is in the
   markup by default so it reads correctly without JS. The +/−/% affixes are
   rendered as grotesk spans (didone symbols go hairline at display sizes). */
export default function Counter({ value, prefix = '', suffix = '', decimals = 0, className = '' }) {
  const ref = useRef(null)
  const { ready } = useApp()

  useGSAP(
    () => {
      if (!ready || prefersReduced()) return
      const el = ref.current
      const state = { v: 0 }
      gsap.to(state, {
        v: value,
        duration: 1.6,
        ease: EASE,
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        onStart: () => { el.textContent = (0).toFixed(decimals) },
        onUpdate: () => { el.textContent = state.v.toFixed(decimals) },
      })
    },
    { dependencies: [ready] }
  )

  return (
    <span className={className}>
      {prefix && <span className="kpi-affix">{prefix}</span>}
      <span ref={ref}>{value.toFixed(decimals)}</span>
      {suffix && <span className="kpi-affix">{suffix}</span>}
    </span>
  )
}
