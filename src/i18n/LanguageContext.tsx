import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { LanguageContext, initialLanguage, messages, type Language, type LanguageContextValue } from './languageState'

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(initialLanguage)

  useEffect(() => {
    localStorage.setItem('site-language', language)
    document.documentElement.lang = language
  }, [language])

  const value = useMemo<LanguageContextValue>(() => ({ language, setLanguage, t: (key) => messages[language][key] }), [language])
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
