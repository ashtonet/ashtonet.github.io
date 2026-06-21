import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { lazy, Suspense, useCallback, useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Education from './components/Education'
import Projects from './components/Projects'
import Research from './components/Research'
import Timeline from './components/Timeline'
import Contact from './components/Contact'
import Footer from './components/Footer'

const Travel = lazy(() => import('./components/Travel'))

const pages = ['home', 'about', 'experience', 'education', 'projects', 'research', 'timeline', 'travel', 'contact'] as const
type Page = (typeof pages)[number]

function readPage(): Page {
  const candidate = window.location.hash.startsWith('#/') ? window.location.hash.slice(2) : 'home'
  return pages.includes(candidate as Page) ? candidate as Page : 'home'
}

function PageContent({ page }: { page: Page }) {
  switch (page) {
    case 'about': return <><About /><Timeline /></>
    case 'experience': return <Experience />
    case 'education': return <><Education /><Timeline /></>
    case 'projects': return <Projects />
    case 'research': return <Research />
    case 'timeline': return <Timeline />
    case 'travel': return <Suspense fallback={<div className="grid min-h-[70vh] place-items-center text-sm text-slate-500">Loading travel atlas…</div>}><Travel /></Suspense>
    case 'contact': return <Contact />
    default: return <><Hero /><About /><Projects featured /><Research /><Contact /></>
  }
}

export default function App() {
  const [page, setPage] = useState<Page>(readPage)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 24, restDelta: 0.001 })

  useEffect(() => {
    const updatePage = () => setPage(readPage())
    window.addEventListener('hashchange', updatePage)
    window.addEventListener('popstate', updatePage)
    return () => {
      window.removeEventListener('hashchange', updatePage)
      window.removeEventListener('popstate', updatePage)
    }
  }, [])

  const navigate = useCallback((nextPage: string) => {
    const target = pages.includes(nextPage as Page) ? nextPage as Page : 'home'
    const nextHash = target === 'home' ? '#/' : `#/${target}`
    if (window.location.hash !== nextHash) window.history.pushState(null, '', nextHash)
    setPage(target)
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    document.title = page === 'home' ? 'Ashton Thomas — Engineer & Researcher' : `${page[0].toUpperCase()}${page.slice(1)} — Ashton Thomas`
  }, [page])

  const skipToContent = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    document.getElementById('main')?.focus()
  }

  return (
    <div className="min-h-screen bg-[#030712] text-slate-200">
      <a className="skip-link" href="#main" onClick={skipToContent}>Skip to content</a>
      <motion.div className="fixed inset-x-0 top-0 z-[70] h-px origin-left bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-500" style={{ scaleX }} />
      <Navbar activePage={page} onNavigate={navigate} />
      <main id="main" tabIndex={-1}>
        <AnimatePresence mode="wait">
          <motion.div key={page} className={page === 'home' ? '' : 'page-view'} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: .3 }}>
            <PageContent page={page} />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}
