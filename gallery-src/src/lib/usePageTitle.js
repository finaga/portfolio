import { useEffect } from 'react'

const BASE = 'André Finageiv, Product Designer'

export function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} · André Finageiv` : BASE
    const announcer = document.getElementById('route-announcer')
    if (announcer) announcer.textContent = title || 'Projects'
  }, [title])
}
