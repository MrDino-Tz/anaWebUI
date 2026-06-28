import { useEffect, useRef, useState } from 'react'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../ThemeProvider'

export default function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const buttonRef = useRef(null)
  const [ripple, setRipple] = useState(null)

  useEffect(() => {
    if (!ripple) return
    const timer = window.setTimeout(() => setRipple(null), 750)
    return () => window.clearTimeout(timer)
  }, [ripple])

  const handleClick = () => {
    const rect = buttonRef.current?.getBoundingClientRect()
    if (rect) {
      setRipple({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      })
    }
    toggle()
  }

  return (
    <>
      <button
        ref={buttonRef}
        onClick={handleClick}
        className="p-2 rounded-lg transition-colors"
        style={{ background: 'var(--bg-200)', color: 'var(--text-200)' }}
        title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      >
        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
      </button>
      {ripple ? (
        <div
          className="theme-toggle-ripple"
          style={{ left: `${ripple.x}px`, top: `${ripple.y}px`, background: 'var(--accent)' }}
        />
      ) : null}
    </>
  )
}
