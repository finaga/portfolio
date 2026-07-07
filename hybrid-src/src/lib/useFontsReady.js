import { useEffect, useState } from 'react'

// SplitText measures line-box height at split time. If a reveal runs before
// the display font finishes loading (font-display: swap renders the
// fallback serif first), the mask wrapper is sized for the fallback's
// metrics — then the real font swaps in with different glyph proportions
// and clips against that now-too-short mask. Gate any SplitText reveal on
// this. Folio's original Hero/Work/About/Footer did this via a fontsReady
// prop from App; this is the same gate as a shared hook.
export function useFontsReady() {
  const [ready, setReady] = useState(
    () => typeof document !== 'undefined' && document.fonts?.status === 'loaded',
  )
  useEffect(() => {
    if (ready) return
    let cancelled = false
    document.fonts.ready.then(() => {
      if (!cancelled) setReady(true)
    })
    return () => {
      cancelled = true
    }
  }, [ready])
  return ready
}
