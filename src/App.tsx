import { AnimatePresence, motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { lazy, Suspense, useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
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
import VisualEffectsLab from './components/VisualEffectsLab'
import SiteTranslator from './i18n/SiteTranslator'
import { getProjectBySlug } from './data/projects'

const Travel = lazy(() => import('./components/Travel'))
const HomeGlobeSection = lazy(() => import('./components/Travel').then((module) => ({ default: module.HomeGlobeSection })))

const pages = ['home', 'about', 'experience', 'volunteering', 'education', 'projects', 'research', 'timeline', 'travel', 'contact', 'effects'] as const
type Page = (typeof pages)[number]

const pageTitles: Partial<Record<Page, string>> = {
  timeline: 'Photos',
}

function readRoute(): { page: Page, projectSlug?: string } {
  const rawPath = window.location.hash.startsWith('#/') ? window.location.hash.slice(2) || 'home' : 'home'
  const path = rawPath.split('?')[0]
  const [candidate, projectSlug] = path.split('/')
  if (candidate === 'projects' && projectSlug) return { page: 'projects', projectSlug }
  return { page: pages.includes(candidate as Page) ? candidate as Page : 'home' }
}

function readPage(): Page {
  return readRoute().page
}

function PageContent({ page }: { page: Page }) {
  switch (page) {
    case 'about': return <HomeAtmosphere><About /><Timeline /></HomeAtmosphere>
    case 'experience': return <Experience />
    case 'volunteering': return <Volunteering />
    case 'education': return <><Education /><Timeline variant="education" /></>
    case 'projects': return <Projects />
    case 'research': return <Research />
    case 'timeline': return <Timeline />
    case 'travel': return <Suspense fallback={<div className="grid min-h-[70vh] place-items-center text-sm text-slate-500">Loading travel atlas…</div>}><Travel /></Suspense>
    case 'contact': return <><MusicProfile /><ResumeCard /><Contact /></>
    case 'effects': return <VisualEffectsLab />
    default: return <><Hero /><HomeAtmosphere><About /><Projects featured /><Research /><Volunteering /><LazyHomeGlobeSection /><MusicProfile /><ResumeCard /><Contact /></HomeAtmosphere></>
  }
}

function HomeGlobeFallback() {
  return (
    <section id="home-globe" className="section overflow-hidden">
      <div className="shell">
        <div className="glass relative overflow-hidden rounded-[1.5rem] p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(96,165,250,.12),transparent_34%),radial-gradient(circle_at_80%_40%,rgba(167,139,250,.12),transparent_36%)]" />
          <div className="relative z-10 grid min-h-[22rem] place-items-center text-center">
            <div>
              <div className="eyebrow justify-center">Travel globe</div>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-.04em] text-white sm:text-4xl">Preparing the world view.</h2>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-500">The globe is lazy-loaded so the home page stays quick, then the map data arrives as you scroll here.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function LazyHomeGlobeSection() {
  const ref = useRef<HTMLDivElement | null>(null)
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    if (shouldLoad) return
    const element = ref.current
    if (!element) return
    if (!('IntersectionObserver' in window)) {
      setShouldLoad(true)
      return
    }

    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return
      setShouldLoad(true)
      observer.disconnect()
    }, { rootMargin: '700px 0px' })

    observer.observe(element)
    return () => observer.disconnect()
  }, [shouldLoad])

  return (
    <div ref={ref}>
      {shouldLoad ? (
        <Suspense fallback={<HomeGlobeFallback />}>
          <HomeGlobeSection />
        </Suspense>
      ) : <HomeGlobeFallback />}
    </div>
  )
}

function HomeAtmosphere({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const warmDrift = useTransform(scrollYProgress, [0, 1], ['-8%', '10%'])
  const coolDrift = useTransform(scrollYProgress, [0, 1], ['7%', '-12%'])
  const violetDrift = useTransform(scrollYProgress, [0, 1], ['-4%', '12%'])
  const hazeDrift = useTransform(scrollYProgress, [0, 1], ['5%', '-6%'])

  return (
    <div ref={ref} className="home-atmosphere relative isolate overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <motion.div style={{ y: warmDrift }} className="home-gradient-field home-gradient-warm" />
        <motion.div style={{ y: coolDrift }} className="home-gradient-field home-gradient-cool" />
        <motion.div style={{ y: violetDrift }} className="home-gradient-field home-gradient-violet" />
        <motion.div style={{ y: hazeDrift }} className="home-gradient-field home-gradient-haze" />
        <motion.div style={{ y: warmDrift }} className="home-gradient-sweep home-gradient-sweep-a" />
        <motion.div style={{ y: coolDrift }} className="home-gradient-sweep home-gradient-sweep-b" />
        <div className="home-atmosphere-texture" />
        <div className="home-atmosphere-vignette" />
      </div>

      <div className="relative z-10">{children}</div>
    </div>
  )
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
    const title = pageTitles[page] ?? `${page[0].toUpperCase()}${page.slice(1)}`
    document.title = page === 'home' ? 'Ashton Thomas — Engineer & Researcher' : `${title} — Ashton Thomas`
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
