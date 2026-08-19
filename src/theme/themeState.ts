import { createContext, useContext } from 'react'

export type Theme = 'automatic' | 'midnight' | 'spring' | 'summer' | 'autumn' | 'winter'
export type SeasonalTheme = 'spring' | 'summer' | 'autumn' | 'winter'
export type AutomaticTheme = SeasonalTheme | 'midnight'

export const themes: { id: Theme, label: string, colors: [string, string] }[] = [
  { id: 'automatic', label: 'Automatic', colors: ['#34d399', '#818cf8'] },
  { id: 'midnight', label: 'Midnight', colors: ['#3b82f6', '#8b5cf6'] },
  { id: 'spring', label: 'Spring', colors: ['#34d399', '#c084fc'] },
  { id: 'summer', label: 'Summer', colors: ['#22d3ee', '#fbbf24'] },
  { id: 'autumn', label: 'Autumn', colors: ['#f59e0b', '#be123c'] },
  { id: 'winter', label: 'Winter', colors: ['#bae6fd', '#818cf8'] },
]

export type ThemeContextValue = { theme: Theme, setTheme: (theme: Theme) => void }
export const ThemeContext = createContext<ThemeContextValue | null>(null)

export function currentSeason(): SeasonalTheme {
  const month = new Date().getMonth()
  if (month >= 2 && month <= 4) return 'spring'
  if (month >= 5 && month <= 7) return 'summer'
  if (month >= 8 && month <= 10) return 'autumn'
  return 'winter'
}

export function currentAutomaticTheme(): AutomaticTheme {
  const hour = new Date().getHours()
  return hour >= 21 || hour < 7 ? 'midnight' : currentSeason()
}

export function initialTheme(): Theme {
  const saved = localStorage.getItem('site-theme') as Theme | null
  return themes.some((item) => item.id === saved) ? saved! : 'automatic'
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used inside ThemeProvider')
  return context
}
