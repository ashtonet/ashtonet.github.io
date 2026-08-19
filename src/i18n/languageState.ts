import { createContext, useContext } from 'react'

export type Language = 'en' | 'de' | 'fr' | 'pl' | 'es'

export const supportedLanguages: Language[] = ['en', 'de', 'fr', 'pl', 'es']

export const messages = {
  en: { home: 'Home', about: 'About', experience: 'Experience', volunteering: 'Volunteering', education: 'Education', projects: 'Projects', research: 'Research', timeline: 'Photos', travel: 'Travel', contact: 'Contact', navigation: 'Main navigation', toggle: 'Toggle navigation', language: 'Language' },
  de: { home: 'Startseite', about: 'Über mich', experience: 'Erfahrung', volunteering: 'Ehrenamt', education: 'Ausbildung', projects: 'Projekte', research: 'Forschung', timeline: 'Fotos', travel: 'Reisen', contact: 'Kontakt', navigation: 'Hauptnavigation', toggle: 'Navigation öffnen', language: 'Sprache' },
  fr: { home: 'Accueil', about: 'À propos', experience: 'Expérience', volunteering: 'Bénévolat', education: 'Formation', projects: 'Projets', research: 'Recherche', timeline: 'Photos', travel: 'Voyages', contact: 'Contact', navigation: 'Navigation principale', toggle: 'Ouvrir la navigation', language: 'Langue' },
  pl: { home: 'Strona główna', about: 'O mnie', experience: 'Doświadczenie', volunteering: 'Wolontariat', education: 'Edukacja', projects: 'Projekty', research: 'Badania', timeline: 'Zdjęcia', travel: 'Podróże', contact: 'Kontakt', navigation: 'Nawigacja główna', toggle: 'Otwórz nawigację', language: 'Język' },
  es: { home: 'Inicio', about: 'Sobre mí', experience: 'Experiencia', volunteering: 'Voluntariado', education: 'Educación', projects: 'Proyectos', research: 'Investigación', timeline: 'Fotos', travel: 'Viajes', contact: 'Contacto', navigation: 'Navegación principal', toggle: 'Abrir navegación', language: 'Idioma' },
} as const

type MessageKey = keyof typeof messages.en
export type LanguageContextValue = { language: Language, setLanguage: (language: Language) => void, t: (key: MessageKey) => string }

export const LanguageContext = createContext<LanguageContextValue | null>(null)

export function initialLanguage(): Language {
  const saved = localStorage.getItem('site-language') as Language | null
  if (saved && supportedLanguages.includes(saved)) return saved
  const browser = navigator.language.slice(0, 2) as Language
  return supportedLanguages.includes(browser) ? browser : 'en'
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used inside LanguageProvider')
  return context
}
