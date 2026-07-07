import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'

// Ported from folio-src — the hybrid's light case pages reuse Folio's
// reveal language. Call inside a useGSAP context so tweens and splits
// are cleaned up on unmount. Pass trigger: false for load-time reveals.
export function revealLines(targets, { trigger = true, start = 'top 82%', delay = 0, stagger = 0.09 } = {}) {
  gsap.utils.toArray(targets).forEach((el) => {
    const split = SplitText.create(el, { type: 'lines', mask: 'lines', autoSplit: true })
    gsap.from(split.lines, {
      yPercent: 110,
      duration: 1.1,
      ease: 'power4.out',
      stagger,
      delay,
      scrollTrigger: trigger
        ? { trigger: el, start, once: true }
        : undefined,
    })
  })
}

// Simple fade-up for meta/body elements.
export function fadeUp(targets, { trigger = true, start = 'top 85%', delay = 0, stagger = 0.08 } = {}) {
  gsap.utils.toArray(targets).forEach((el, i) => {
    gsap.from(el, {
      autoAlpha: 0,
      y: 28,
      duration: 0.9,
      ease: 'power3.out',
      delay: delay + i * stagger,
      scrollTrigger: trigger
        ? { trigger: el, start, once: true }
        : undefined,
    })
  })
}

// Count-up for elements carrying data-value / data-decimals.
// Markup already contains the final number, so no-JS and
// reduced-motion users see real values.
export function countUp(els) {
  gsap.utils.toArray(els).forEach((el) => {
    const end = parseFloat(el.dataset.value)
    const decimals = parseInt(el.dataset.decimals || '0', 10)
    const state = { v: 0 }
    gsap.to(state, {
      v: end,
      duration: 1.6,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      onUpdate() {
        el.textContent = state.v.toFixed(decimals)
      },
    })
  })
}

// Clip reveal once + slow parallax drift while in view — Folio's
// case-media treatment, applied to any figure containing an img.
export function mediaReveal(figures) {
  gsap.utils.toArray(figures).forEach((fig) => {
    const img = fig.querySelector('img')
    gsap.from(fig, {
      clipPath: 'inset(0% 0% 100% 0%)',
      duration: 1.2,
      ease: 'power4.inOut',
      scrollTrigger: { trigger: fig, start: 'top 85%', once: true },
    })
    if (!img) return
    gsap.fromTo(
      img,
      { yPercent: -8, scale: 1.12 },
      {
        yPercent: 8,
        scale: 1.12,
        ease: 'none',
        scrollTrigger: {
          trigger: fig,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      },
    )
  })
}
