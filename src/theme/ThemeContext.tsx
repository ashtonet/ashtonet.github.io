import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
export type Theme = 'midnight' | 'aurora' | 'ember' | 'ocean'
export const themes: { id: Theme, label: string, colors: [string, string] }[] = [
  { id: 'midnight', label: 'Midnight', colors: ['#3b82f6', '#8b5cf6'] }, { id: 'aurora', label: 'Aurora', colors: ['#10b981', '#22d3ee'] },
  { id: 'ember', label: 'Ember', colors: ['#f97316', '#e11d48'] }, { id: 'ocean', label: 'Ocean', colors: ['#06b6d4', '#2563eb'] },
]
const ThemeContext = createContext<{ theme: Theme, setTheme: (theme: Theme) => void } | null>(null)
function initialTheme(): Theme { const saved = localStorage.getItem('site-theme') as Theme | null; return themes.some((item) => item.id === saved) ? saved! : 'midnight' }
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(initialTheme)
  useEffect(() => { document.documentElement.dataset.theme = theme; localStorage.setItem('site-theme', theme) }, [theme])
  const value = useMemo(() => ({ theme, setTheme }), [theme])
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
export function useTheme() { const context = useContext(ThemeContext); if (!context) throw new Error('useTheme must be used inside ThemeProvider'); return context }
