import { AnimatePresence, motion } from 'framer-motion'
import { Globe2, Menu, Palette, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useLanguage, type Language } from '../i18n/LanguageContext'
import { themes, useTheme, type Theme } from '../theme/ThemeContext'

const links = [
  { key: 'home', page: 'home', href: '#/' },
  { key: 'about', page: 'about', href: '#/about' },
  { key: 'experience', page: 'experience', href: '#/experience' },
  { key: 'education', page: 'education', href: '#/education' },
  { key: 'projects', page: 'projects', href: '#/projects' },
  { key: 'research', page: 'research', href: '#/research' },
  { key: 'timeline', page: 'timeline', href: '#/timeline' },
  { key: 'travel', page: 'travel', href: '#/travel' },
  { key: 'contact', page: 'contact', href: '#/contact' },
] as const

const languages: { code: Language, short: string, label: string }[] = [
  { code: 'en', short: 'EN', label: 'English' },
  { code: 'de', short: 'DE', label: 'Deutsch' },
  { code: 'fr', short: 'FR', label: 'Français' },
  { code: 'pl', short: 'PL', label: 'Polski' },
]

type NavbarProps = {
  activePage: string
  onNavigate: (page: string) => void
}

export default function Navbar({ activePage, onNavigate }: NavbarProps) {
  const [open, setOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()
  const { theme, setTheme } = useTheme()
  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [])

  return (
    <motion.header initial={{ y: -24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="fixed inset-x-0 top-0 z-50 px-3 pt-3">
      <nav aria-label={t('navigation')} className="shell glass flex h-16 items-center justify-between rounded-2xl px-4">
        <a href="#/" onClick={(event) => { event.preventDefault(); onNavigate('home') }} className="flex items-center gap-3" aria-label="Ashton Thomas, home">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 text-xs font-bold text-white shadow-lg shadow-indigo-950/50">AT</span>
          <span className="text-sm font-semibold tracking-tight text-white">Ashton Thomas</span>
        </a>
        <div className="hidden items-center lg:flex">
          {links.map((link) => <a key={link.page} href={link.href} onClick={(event) => { event.preventDefault(); onNavigate(link.page) }} aria-current={activePage === link.page ? 'page' : undefined} className={`nav-link ${activePage === link.page ? 'active' : ''}`}>{t(link.key)}</a>)}
          <label className="ml-2 flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[.03] px-2 text-slate-400"><Palette size={13} /><span className="sr-only">Theme</span><select value={theme} onChange={(event) => setTheme(event.target.value as Theme)} className="h-8 max-w-[5.25rem] cursor-pointer bg-transparent text-[.68rem] font-semibold outline-none">{themes.map((item) => <option key={item.id} value={item.id} className="bg-slate-950 text-white">{item.label}</option>)}</select></label>
          <label className="ml-2 flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[.03] px-2 text-slate-400 transition focus-within:border-indigo-400/50 focus-within:text-white"><Globe2 size={13} /><span className="sr-only">{t('language')}</span><select value={language} onChange={(event) => setLanguage(event.target.value as Language)} className="h-8 cursor-pointer bg-transparent text-[.68rem] font-semibold text-inherit outline-none">{languages.map((item) => <option key={item.code} value={item.code} className="bg-slate-950 text-white">{item.short}</option>)}</select></label>
        </div>
        <button type="button" onClick={() => setOpen(!open)} className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 lg:hidden" aria-label={t('toggle')} aria-expanded={open} aria-controls="mobile-navigation">
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>
      <AnimatePresence>
        {open && <motion.div id="mobile-navigation" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="shell glass mt-2 grid rounded-2xl p-3 lg:hidden">
          {links.map((link) => <a key={link.page} href={link.href} onClick={(event) => { event.preventDefault(); onNavigate(link.page); setOpen(false) }} aria-current={activePage === link.page ? 'page' : undefined} className={`nav-link rounded-lg px-4 py-3 ${activePage === link.page ? 'active bg-white/5' : ''}`}>{t(link.key)}</a>)}
          <div className="mt-2 border-t border-white/[.06] px-3 pt-3"><div className="mb-2 flex items-center gap-2 text-[.65rem] uppercase tracking-[.14em] text-slate-600"><Palette size={13} />Theme</div><div className="grid grid-cols-3 gap-2">{themes.map((item) => <button type="button" key={item.id} onClick={() => setTheme(item.id)} title={item.label} aria-label={`${item.label} theme`} aria-pressed={theme === item.id} className={`grid h-9 place-items-center rounded-lg border transition ${theme === item.id ? 'border-white/50 bg-white/10' : 'border-white/10'}`}><span className="h-3.5 w-3.5 rounded-full" style={{ background: `linear-gradient(135deg, ${item.colors[0]}, ${item.colors[1]})` }} /></button>)}</div></div>
          <div className="mt-2 border-t border-white/[.06] px-3 pt-3"><div className="mb-2 flex items-center gap-2 text-[.65rem] uppercase tracking-[.14em] text-slate-600"><Globe2 size={13} />{t('language')}</div><div className="grid grid-cols-4 gap-2">{languages.map((item) => <button type="button" key={item.code} onClick={() => setLanguage(item.code)} className={`rounded-lg border px-2 py-2 text-xs transition ${language === item.code ? 'border-indigo-400/50 bg-indigo-500/15 text-white' : 'border-white/10 text-slate-500 hover:text-white'}`} aria-pressed={language === item.code}>{item.short}</button>)}</div></div>
        </motion.div>}
      </AnimatePresence>
    </motion.header>
  )
}
