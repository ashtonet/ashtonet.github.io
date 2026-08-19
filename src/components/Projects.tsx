import { motion } from 'framer-motion'
import { ArrowUpRight, Check, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Code2, Search } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { getProjectSlug, projectCategories, projects, type Project } from '../data/projects'

const highlightedProjectTitles = [
  'Automated Engineering Agent',
  'Geoguessr AI',
  'Search Engine',
  'Virtual Memory Pager',
  'Networked File Server',
  'Invariant Learning Experiments',
  'Quantum Study Group Coordinator',
  'MadiTaylorPhoto Website',
  'Personal Website',
]

const highlightedProjectTitleSet = new Set(highlightedProjectTitles)
const desktopFeaturedWindowSize = 3

function projectInitials(title: string) {
  return title
    .split(/\s+/)
    .map((word) => word[0])
    .join('')
    .slice(0, 3)
    .toUpperCase()
}

function ProjectCard({ project, index }: { project: Project, index: number }) {
  return (
    <motion.article layout key={project.title} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .1 }} transition={{ delay: Math.min(index, 5) * .05 }} className="glass card group flex flex-col">
      <a href={`#/projects/${getProjectSlug(project)}`} className="relative block aspect-[16/9] overflow-hidden border-b border-white/[.06] bg-gradient-to-br from-blue-500/15 via-slate-900 to-violet-500/10" aria-label={`Open ${project.title} project page`}>
        {project.image ? <img src={project.image} alt="" loading="lazy" className="h-full w-full object-cover opacity-75 transition duration-500 group-hover:scale-[1.04] group-hover:opacity-95" /> : <div className="grid h-full place-items-center"><span className="text-5xl font-semibold tracking-[-.08em] text-white/10">{projectInitials(project.title)}</span></div>}
        <span className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-slate-950/70 text-slate-300 backdrop-blur"><ArrowUpRight size={16} /></span>
      </a>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-4"><div><p className="text-[.68rem] font-semibold uppercase tracking-[.16em] text-indigo-400">{project.categories[0]}</p><h3 className="mt-2 text-xl font-semibold tracking-tight text-white"><a href={`#/projects/${getProjectSlug(project)}`} className="transition hover:text-indigo-200">{project.title}</a></h3></div>{project.date && <span className="text-xs text-slate-600">{project.date}</span>}</div>
        <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-400">{project.description}</p>
        <details className="project-details mt-3 text-sm text-slate-400"><summary className="cursor-pointer text-xs font-medium text-indigo-300">Read full description</summary><p className="mt-3 leading-6">{project.description}</p></details>
        <div className="flex flex-wrap gap-2 pt-5">{project.languages.map((language) => <span className="pill" key={language}>{language}</span>)}</div>
        <a href={`#/projects/${getProjectSlug(project)}`} className="mt-auto flex items-center gap-2 pt-5 text-xs font-semibold text-indigo-300 transition hover:text-white">See more <ArrowUpRight size={14} /></a>
      </div>
    </motion.article>
  )
}

function projectMatches(project: Project, category: string, search: string) {
  const matchesCategory = category === 'All' || project.categories.includes(category)
  const matchesSearch = !search || [project.title, project.description, ...project.languages].join(' ').toLowerCase().includes(search)
  return matchesCategory && matchesSearch
}

export default function Projects({ featured = false }: { featured?: boolean }) {
  const [category, setCategory] = useState('All')
  const [query, setQuery] = useState('')
  const [archiveLoaded, setArchiveLoaded] = useState(false)
  const [featuredStart, setFeaturedStart] = useState(0)
  const [isMobileCarousel, setIsMobileCarousel] = useState(() => typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches)
  const highlightedProjects = useMemo(() => highlightedProjectTitles
    .map((title) => projects.find((project) => project.title === title))
    .filter((project): project is Project => Boolean(project)), [])
  const archiveProjects = useMemo(() => projects.filter((project) => !highlightedProjectTitleSet.has(project.title)), [])
  const searchableProjects = useMemo(() => archiveLoaded ? [...highlightedProjects, ...archiveProjects] : highlightedProjects, [archiveLoaded, highlightedProjects, archiveProjects])
  const availableCategories = useMemo(() => projectCategories.filter((item) => item === 'All' || searchableProjects.some((project) => project.categories.includes(item))), [searchableProjects])
  const search = query.trim().toLowerCase()
  const effectiveCategory = availableCategories.includes(category) ? category : 'All'
  const visibleHighlightedProjects = useMemo(() => highlightedProjects.filter((project) => projectMatches(project, effectiveCategory, search)), [effectiveCategory, highlightedProjects, search])
  const visibleArchiveProjects = useMemo(() => {
    if (!archiveLoaded) return []
    return archiveProjects.filter((project) => projectMatches(project, effectiveCategory, search))
  }, [archiveLoaded, archiveProjects, effectiveCategory, search])
  const featuredWindowSize = isMobileCarousel ? 1 : desktopFeaturedWindowSize
  const featuredStep = featuredWindowSize
  const maxFeaturedStart = Math.max(highlightedProjects.length - featuredWindowSize, 0)
  const effectiveFeaturedStart = Math.min(featuredStart, maxFeaturedStart)
  const visibleProjects = featured ? highlightedProjects.slice(effectiveFeaturedStart, effectiveFeaturedStart + featuredWindowSize) : visibleHighlightedProjects

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)')
    const updateMobileState = () => setIsMobileCarousel(mediaQuery.matches)
    updateMobileState()
    mediaQuery.addEventListener('change', updateMobileState)
    return () => mediaQuery.removeEventListener('change', updateMobileState)
  }, [])

  return (
    <section id="projects" className="section">
      <div className="shell">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div><div className="eyebrow">{featured ? 'Selected projects' : 'Highlighted projects'}</div><h2 className="section-title">{featured ? 'Ideas, made tangible.' : 'The strongest work up front.'}</h2><p className="section-copy">{featured ? 'A preview of work spanning intelligent systems, full-stack engineering, and low-level computing.' : 'A curated set of the projects that best represent my current software engineering, AI, systems, web, and research work.'}</p></div>
          {featured ? <a href="#/projects" className="secondary-button w-fit">All projects <ArrowUpRight size={16} /></a> : <a href="https://github.com/aethom00" target="_blank" rel="noreferrer" className="secondary-button w-fit"><Code2 size={16} />GitHub archive</a>}
        </div>

        {!featured && <div className="mt-9 space-y-4">
          <label className="glass flex max-w-md items-center gap-3 rounded-xl px-4"><Search size={17} className="text-slate-500" /><span className="sr-only">Search projects</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search projects or technologies" className="h-12 w-full bg-transparent text-sm text-white placeholder:text-slate-600 focus:outline-none" /></label>
          <div className="flex flex-wrap gap-2" aria-label="Filter projects by category">{availableCategories.map((item) => <button type="button" key={item} onClick={() => setCategory(item)} aria-pressed={effectiveCategory === item} className={`pill project-filter cursor-pointer transition ${effectiveCategory === item ? 'active' : 'hover:border-white/25 hover:text-white'}`}>{effectiveCategory === item && <Check size={12} strokeWidth={2.5} />}{item}</button>)}</div>
        </div>}

        <motion.div layout className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {visibleProjects.map((project, index) => <ProjectCard project={project} index={index} key={project.title} />)}
        </motion.div>

        {featured && maxFeaturedStart > 0 && <div className="mx-auto mt-7 flex max-w-2xl items-center justify-center gap-4">
          <button type="button" onClick={() => setFeaturedStart((value) => Math.max(value - featuredStep, 0))} disabled={effectiveFeaturedStart === 0} aria-label="Previous highlighted projects" className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[.04] text-slate-300 transition hover:border-indigo-300/40 hover:bg-white/[.08] hover:text-white disabled:cursor-not-allowed disabled:opacity-35">
            <ChevronLeft size={18} />
          </button>
          <button type="button" onClick={() => setFeaturedStart((value) => Math.min(value + featuredStep, maxFeaturedStart))} disabled={effectiveFeaturedStart === maxFeaturedStart} aria-label="Next highlighted projects" className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[.04] text-slate-300 transition hover:border-indigo-300/40 hover:bg-white/[.08] hover:text-white disabled:cursor-not-allowed disabled:opacity-35">
            <ChevronRight size={18} />
          </button>
        </div>}

        {!featured && !visibleProjects.length && <div className="glass mt-8 rounded-2xl p-10 text-center text-slate-400">No projects match that filter.</div>}

        {!featured && <div className="mt-14">
          <div className="flex justify-center">
            <button type="button" onClick={() => setArchiveLoaded((loaded) => !loaded)} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[.04] px-5 py-3 text-sm font-semibold text-slate-300 transition hover:border-indigo-300/40 hover:bg-white/[.08] hover:text-white">
              {archiveLoaded ? 'Hide extra projects' : 'See more projects'}
              {archiveLoaded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>

          {archiveLoaded && <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="mt-8">
            <motion.div layout className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {visibleArchiveProjects.map((project, index) => <ProjectCard project={project} index={index} key={project.title} />)}
            </motion.div>
            {!visibleArchiveProjects.length && <div className="glass mt-8 rounded-2xl p-10 text-center text-slate-400">No projects match that filter.</div>}
          </motion.div>}
        </div>}
      </div>
    </section>
  )
}
