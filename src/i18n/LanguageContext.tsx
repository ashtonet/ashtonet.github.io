import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

export type Language = 'en' | 'de' | 'fr' | 'pl' | 'es'

const supported: Language[] = ['en', 'de', 'fr', 'pl', 'es']

const messages = {
  en: { home: 'Home', about: 'About', experience: 'Experience', volunteering: 'Volunteering', education: 'Education', projects: 'Projects', research: 'Research', timeline: 'Timeline', travel: 'Travel', contact: 'Contact', navigation: 'Main navigation', toggle: 'Toggle navigation', language: 'Language' },
  de: { home: 'Startseite', about: 'Über mich', experience: 'Erfahrung', volunteering: 'Ehrenamt', education: 'Ausbildung', projects: 'Projekte', research: 'Forschung', timeline: 'Werdegang', travel: 'Reisen', contact: 'Kontakt', navigation: 'Hauptnavigation', toggle: 'Navigation öffnen', language: 'Sprache' },
  fr: { home: 'Accueil', about: 'À propos', experience: 'Expérience', volunteering: 'Bénévolat', education: 'Formation', projects: 'Projets', research: 'Recherche', timeline: 'Parcours', travel: 'Voyages', contact: 'Contact', navigation: 'Navigation principale', toggle: 'Ouvrir la navigation', language: 'Langue' },
  pl: { home: 'Strona główna', about: 'O mnie', experience: 'Doświadczenie', volunteering: 'Wolontariat', education: 'Edukacja', projects: 'Projekty', research: 'Badania', timeline: 'Oś czasu', travel: 'Podróże', contact: 'Kontakt', navigation: 'Nawigacja główna', toggle: 'Otwórz nawigację', language: 'Język' },
  es: { home: 'Inicio', about: 'Sobre mí', experience: 'Experiencia', volunteering: 'Voluntariado', education: 'Educación', projects: 'Proyectos', research: 'Investigación', timeline: 'Trayectoria', travel: 'Viajes', contact: 'Contacto', navigation: 'Navegación principal', toggle: 'Abrir navegación', language: 'Idioma' },
} as const

type MessageKey = keyof typeof messages.en
type LanguageContextValue = { language: Language, setLanguage: (language: Language) => void, t: (key: MessageKey) => string }

const LanguageContext = createContext<LanguageContextValue | null>(null)

function initialLanguage(): Language {
  const saved = localStorage.getItem('site-language') as Language | null
  if (saved && supported.includes(saved)) return saved
  const browser = navigator.language.slice(0, 2) as Language
  return supported.includes(browser) ? browser : 'en'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(initialLanguage)

  useEffect(() => {
    localStorage.setItem('site-language', language)
    document.documentElement.lang = language
  }, [language])

  const value = useMemo<LanguageContextValue>(() => ({ language, setLanguage, t: (key) => messages[language][key] }), [language])
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used inside LanguageProvider')
  return context
}
