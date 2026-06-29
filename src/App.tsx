import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { lazy, Suspense, useCallback, useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Volunteering from './components/Volunteering'
import Education from './components/Education'
import Projects from './components/Projects'
import Research from './components/Research'
import Timeline from './components/Timeline'
import ResumeCard from './components/ResumeCard'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ProjectDetail from './components/ProjectDetail'
import MusicProfile from './components/MusicProfile'
import AppleMusicDock from './components/AppleMusicDock'
import SiteTranslator from './i18n/SiteTranslator'
import { getProjectBySlug } from './data/projects'

const Travel = lazy(() => import('./components/Travel'))

const pages = ['home', 'about', 'experience', 'volunteering', 'education', 'projects', 'research', 'timeline', 'travel', 'contact'] as const
type Page = (typeof pages)[number]

function readRoute(): { page: Page, projectSlug?: string } {
  const path = window.location.hash.startsWith('#/') ? window.location.hash.slice(2) || 'home' : 'home'
  const [candidate, projectSlug] = path.split('/')
  if (candidate === 'projects' && projectSlug) return { page: 'projects', projectSlug }
  return { page: pages.includes(candidate as Page) ? candidate as Page : 'home' }
}

function readPage(): Page {
  return readRoute().page
}

function PageContent({ page }: { page: Page }) {
  switch (page) {
    case 'about': return <><About /><Timeline /></>
    case 'experience': return <Experience />
    case 'volunteering': return <Volunteering />
    case 'education': return <><Education /><Timeline /></>
    case 'projects': return <Projects />
    case 'research': return <Research />
    case 'timeline': return <Timeline />
    case 'travel': return <Suspense fallback={<div className="grid min-h-[70vh] place-items-center text-sm text-slate-500">Loading travel atlas…</div>}><Travel /></Suspense>
    case 'contact': return <><MusicProfile /><ResumeCard /><Contact /></>
    default: return <><Hero /><About /><Projects featured /><Research /><Volunteering /><MusicProfile /><ResumeCard /><Contact /></>
  }
}

export default function App() {
  const [page, setPage] = useState<Page>(readPage)
  const [projectSlug, setProjectSlug] = useState(() => readRoute().projectSlug)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 24, restDelta: 0.001 })

  useEffect(() => {
    const updatePage = () => { const route = readRoute(); setPage(route.page); setProjectSlug(route.projectSlug) }
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
    setProjectSlug(undefined)
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    document.title = page === 'home' ? 'Ashton Thomas — Engineer & Researcher' : `${page[0].toUpperCase()}${page.slice(1)} — Ashton Thomas`
  }, [page, projectSlug])

  const skipToContent = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    document.getElementById('main')?.focus()
  }

  return (
    <div className="site-root min-h-screen text-slate-200">
      <SiteTranslator />
      <a className="skip-link" href="#main" onClick={skipToContent}>Skip to content</a>
      <motion.div className="fixed inset-x-0 top-0 z-[70] h-px origin-left bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-500" style={{ scaleX }} />
      <Navbar activePage={page} onNavigate={navigate} />
      <AppleMusicDock />
      <main id="main" tabIndex={-1}>
        <AnimatePresence mode="wait">
          <motion.div key={projectSlug ?? page} className={page === 'home' ? '' : 'page-view'} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: .3 }}>
            {projectSlug && getProjectBySlug(projectSlug) ? <ProjectDetail project={getProjectBySlug(projectSlug)!} /> : <PageContent page={page} />}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}
