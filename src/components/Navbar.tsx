import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'

const links = [
  'Home',
  'About',
  'Experience',
  'Education',
  'Projects',
  'Research',
  'Timeline',
  'Contact',
]

export default function Navbar() {
  const [active, setActive] = useState('home')
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement | null>(null)
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null)
  const lastLinkRef = useRef<HTMLAnchorElement | null>(null)
  const menuRef = useRef<HTMLDivElement | null>(null)

  const menuList = {
    hidden: {},
    show: { transition: { staggerChildren: 0.06 } },
  }
  const menuItem = {
    hidden: { opacity: 0, y: 6 },
    show: { opacity: 1, y: 0 },
  }

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        return
      }
      if (e.key === 'Tab') {
        const focusable = menuRef.current?.querySelectorAll<HTMLElement>('a,button') || []
        if (!focusable || focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    const prev = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'
    // focus first link when menu opens
    setTimeout(() => firstLinkRef.current?.focus(), 50)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.documentElement.style.overflow = prev
      // return focus to toggle
      toggleRef.current?.focus()
    }
  }, [open])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { root: null, rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    )
    links.forEach((l) => {
      const id = l.toLowerCase()
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45 }}
      className="fixed top-3 left-0 right-0 z-40 mx-auto container-wide"
    >
      <div className="nav-glass glass flex items-center justify-between px-4 py-2 bg-black/30 backdrop-blur-xs" role="navigation" aria-label="Main navigation">
        <div className="flex items-center gap-3 site-logo">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
            <circle cx="12" cy="12" r="10" fill="url(#g)" />
            <defs>
              <linearGradient id="g" x1="0" x2="1">
                <stop offset="0" stopColor="#60a5fa" />
                <stop offset="1" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
          </svg>
          <div>
            <div className="text-white font-semibold">Ashton Thomas</div>
            <div className="text-xs text-slate-400">Portfolio</div>
          </div>
        </div>
        <div className="nav-links hidden md:flex items-center gap-4" role="menubar">
          {links.map((l) => {
            const id = l.toLowerCase()
            return (
              <a
                key={l}
                href={`#${id}`}
                onClick={() => setOpen(false)}
                  className={`nav-link px-3 py-2 rounded-md text-sm ${active === id ? 'active text-white' : 'text-slate-300 hover:text-white'}`}
                role="menuitem"
                aria-current={active === id ? 'page' : undefined}
              >
                {l}
              </a>
            )
          })}
        </div>

        {/* mobile */}
        <div className="md:hidden">
          <button
            ref={toggleRef}
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-haspopup="dialog"
            onClick={() => setOpen((s) => !s)}
            className="p-2 rounded-md bg-white/3 relative z-50"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-slate-200"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
            <motion.div
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-labelledby="mobile-menu-title"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 z-50"
            >
            <div className="mobile-menu-backdrop fixed inset-0" onClick={() => setOpen(false)} aria-hidden />
            <motion.div
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={menuList}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              className="fixed inset-x-4 top-16 z-50"
              role="menu"
              aria-label="Mobile navigation"
            >
              <div ref={menuRef} className="glass p-4 space-y-2 rounded-lg shadow-lg">
                <h2 id="mobile-menu-title" className="sr-only">Navigation menu</h2>
                {links.map((l, i) => {
                  const id = l.toLowerCase()
                  return (
                    <motion.a ref={i === 0 ? firstLinkRef : i === links.length - 1 ? lastLinkRef : undefined} key={`m-${l}`} href={`#${id}`} onClick={() => setOpen(false)} variants={menuItem} className={`block nav-link px-3 py-2 rounded-md ${active === id ? 'active text-white' : 'text-slate-300 hover:text-white'}`}>
                      {l}
                    </motion.a>
                  )
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
