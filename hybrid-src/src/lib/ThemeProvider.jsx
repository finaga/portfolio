import { createContext, useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Two fixed worlds — theme is structural, not a user preference.
// Dark: the index (browsing). Light: case pages, experiment pages,
// About, Contact (reading). The dark→light flip is the navigation
// metaphor of the hybrid; there is deliberately no user toggle.
const ThemeCtx = createContext('dark')

const DARK_ROUTES = new Set(['/', '/grid'])

export function themeForPath(pathname) {
  return DARK_ROUTES.has(pathname) ? 'dark' : 'light'
}

export function ThemeProvider({ children }) {
  const { pathname } = useLocation()
  const theme = themeForPath(pathname)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return <ThemeCtx.Provider value={{ theme }}>{children}</ThemeCtx.Provider>
}

export function useTheme() {
  return useContext(ThemeCtx)
}
