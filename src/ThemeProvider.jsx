import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem('ana-theme')
    if (stored) return stored
    return 'dark'
  })
  const [transitionOrigin, setTransitionOrigin] = useState(null)

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem('ana-theme', theme)
  }, [theme])

  useEffect(() => {
    if (!transitionOrigin) return
    const timer = window.setTimeout(() => setTransitionOrigin(null), 750)
    return () => window.clearTimeout(timer)
  }, [transitionOrigin])

  const toggle = (origin) => {
    setTheme(t => t === 'dark' ? 'light' : 'dark')
    setTransitionOrigin(origin ?? null)
  }

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
      {transitionOrigin ? (
        <div
          className={`theme-transition-layer ${transitionOrigin ? 'active' : ''}`}
          style={{ left: `${transitionOrigin.x}px`, top: `${transitionOrigin.y}px` }}
        />
      ) : null}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
