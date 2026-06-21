import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'

const links = [
  { label: 'Home', page: 'home', href: '#/' },
  { label: 'About', page: 'about', href: '#/about' },
  { label: 'Experience', page: 'experience', href: '#/experience' },
  { label: 'Education', page: 'education', href: '#/education' },
  { label: 'Projects', page: 'projects', href: '#/projects' },
  { label: 'Research', page: 'research', href: '#/research' },
  { label: 'Timeline', page: 'timeline', href: '#/timeline' },
  { label: 'Travel', page: 'travel', href: '#/travel' },
  { label: 'Contact', page: 'contact', href: '#/contact' },
]

type NavbarProps = {
  activePage: string
  onNavigate: (page: string) => void
}

export default function Navbar({ activePage, onNavigate }: NavbarProps) {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [])

  return (
    <motion.header initial={{ y: -24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="fixed inset-x-0 top-0 z-50 px-3 pt-3">
      <nav aria-label="Main navigation" className="shell glass flex h-16 items-center justify-between rounded-2xl px-4">
        <a href="#/" onClick={(event) => { event.preventDefault(); onNavigate('home') }} className="flex items-center gap-3" aria-label="Ashton Thomas, home">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 text-xs font-bold text-white shadow-lg shadow-indigo-950/50">AT</span>
          <span className="text-sm font-semibold tracking-tight text-white">Ashton Thomas</span>
        </a>
        <div className="hidden items-center lg:flex">
          {links.map((link) => <a key={link.page} href={link.href} onClick={(event) => { event.preventDefault(); onNavigate(link.page) }} aria-current={activePage === link.page ? 'page' : undefined} className={`nav-link ${activePage === link.page ? 'active' : ''}`}>{link.label}</a>)}
        </div>
        <button type="button" onClick={() => setOpen(!open)} className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 lg:hidden" aria-label="Toggle navigation" aria-expanded={open} aria-controls="mobile-navigation">
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>
      <AnimatePresence>
        {open && <motion.div id="mobile-navigation" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="shell glass mt-2 grid rounded-2xl p-3 lg:hidden">
          {links.map((link) => <a key={link.page} href={link.href} onClick={(event) => { event.preventDefault(); onNavigate(link.page); setOpen(false) }} aria-current={activePage === link.page ? 'page' : undefined} className={`nav-link rounded-lg px-4 py-3 ${activePage === link.page ? 'active bg-white/5' : ''}`}>{link.label}</a>)}
        </motion.div>}
      </AnimatePresence>
    </motion.header>
  )
}
