import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

export type Theme = 'automatic' | 'midnight' | 'spring' | 'summer' | 'autumn' | 'winter'
type SeasonalTheme = 'spring' | 'summer' | 'autumn' | 'winter'
type AutomaticTheme = SeasonalTheme | 'midnight'

export const themes: { id: Theme, label: string, colors: [string, string] }[] = [
  { id: 'automatic', label: 'Automatic', colors: ['#34d399', '#818cf8'] },
  { id: 'midnight', label: 'Midnight', colors: ['#3b82f6', '#8b5cf6'] },
  { id: 'spring', label: 'Spring', colors: ['#34d399', '#c084fc'] },
  { id: 'summer', label: 'Summer', colors: ['#22d3ee', '#fbbf24'] },
  { id: 'autumn', label: 'Autumn', colors: ['#f59e0b', '#be123c'] },
  { id: 'winter', label: 'Winter', colors: ['#bae6fd', '#818cf8'] },
]

const ThemeContext = createContext<{ theme: Theme, setTheme: (theme: Theme) => void } | null>(null)

function currentSeason(): SeasonalTheme {
  const month = new Date().getMonth()
  if (month >= 2 && month <= 4) return 'spring'
  if (month >= 5 && month <= 7) return 'summer'
  if (month >= 8 && month <= 10) return 'autumn'
  return 'winter'
}

function currentAutomaticTheme(): AutomaticTheme {
  const hour = new Date().getHours()
  return hour >= 21 || hour < 7 ? 'midnight' : currentSeason()
}

function initialTheme(): Theme {
  const saved = localStorage.getItem('site-theme') as Theme | null
  return themes.some((item) => item.id === saved) ? saved! : 'automatic'
}

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

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used inside ThemeProvider')
  return context
}
