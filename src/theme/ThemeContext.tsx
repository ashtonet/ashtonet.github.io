import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { ThemeContext, currentAutomaticTheme, initialTheme, type AutomaticTheme, type Theme } from './themeState'

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(initialTheme)
  const [automaticTheme, setAutomaticTheme] = useState<AutomaticTheme>(currentAutomaticTheme)

  useEffect(() => {
    if (theme !== 'automatic') return
    const update = () => setAutomaticTheme(currentAutomaticTheme())
    update()
    const timer = window.setInterval(update, 60 * 1000)
    return () => window.clearInterval(timer)
  }, [theme])

  useEffect(() => {
    document.documentElement.dataset.theme = theme === 'automatic' ? automaticTheme : theme
    document.documentElement.dataset.themeChoice = theme
    localStorage.setItem('site-theme', theme)
  }, [automaticTheme, theme])

  const value = useMemo(() => ({ theme, setTheme }), [theme])
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
