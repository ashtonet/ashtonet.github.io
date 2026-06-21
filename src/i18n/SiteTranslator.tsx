import { useEffect } from 'react'
import { useLanguage } from './LanguageContext'
import { sitePhrases } from './sitePhrases'
import { projectPhrases } from './projectPhrases'
import { sectionPhrases } from './sectionPhrases'
import { getLocalizedCountryName } from './countryNames'

const originals = new WeakMap<Text, string>()
const lastApplied = new WeakMap<Text, string>()

export default function SiteTranslator() {
  const { language } = useLanguage()

  useEffect(() => {
    const translateTree = () => {
      const map: Record<string, string> = language === 'en' ? {} : { ...sitePhrases[language], ...projectPhrases[language], ...sectionPhrases[language] }
      const translate = (source: string) => {
        if (language === 'en') return source
        const locationSearch = source.match(/^Search (\d+) locations$/)
        if (locationSearch) {
          const labels = { de: `${locationSearch[1]} Orte durchsuchen`, fr: `Rechercher parmi ${locationSearch[1]} lieux`, pl: `Szukaj wśród ${locationSearch[1]} miejsc` }
          return labels[language]
        }
        return map[source] ?? getLocalizedCountryName(source, language) ?? source
      }
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
      let node = walker.nextNode() as Text | null
      while (node) {
        const parent = node.parentElement
        if (parent && !['SCRIPT', 'STYLE', 'OPTION'].includes(parent.tagName)) {
          const prior = originals.get(node)
          const applied = lastApplied.get(node)
          // Preserve the original English across language switches. If React changes
          // this text node later, capture that new source text before translating it.
          if (prior === undefined || (applied !== undefined && node.data !== applied)) {
            originals.set(node, node.data)
          }
          const original = originals.get(node) ?? node.data
          const trimmed = original.trim()
          const translated = translate(trimmed)
          const nextValue = original.replace(trimmed, translated)
          if (node.data !== nextValue) node.data = nextValue
          lastApplied.set(node, nextValue)
        }
        node = walker.nextNode() as Text | null
      }

      document.querySelectorAll<HTMLElement>('[placeholder], [aria-label], [title]').forEach((element) => {
        ;(['placeholder', 'aria-label', 'title'] as const).forEach((attribute) => {
          const value = element.getAttribute(attribute)
          if (!value) return
          const sourceKey = `data-i18n-${attribute}`
          const source = element.getAttribute(sourceKey) ?? value
          if (!element.hasAttribute(sourceKey)) element.setAttribute(sourceKey, source)
          element.setAttribute(attribute, translate(source))
        })
      })
    }

    translateTree()
    const observer = new MutationObserver(translateTree)
    observer.observe(document.body, { childList: true, subtree: true, characterData: true })
    return () => observer.disconnect()
  }, [language])

  return null
}
