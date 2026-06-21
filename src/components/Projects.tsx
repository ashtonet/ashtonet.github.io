import { motion } from 'framer-motion'
import { ArrowUpRight, Code2, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { projectCategories, projects } from '../data/projects'

export default function Projects({ featured = false }: { featured?: boolean }) {
  const [category, setCategory] = useState('All')
  const [query, setQuery] = useState('')
  const visibleProjects = useMemo(() => {
    if (featured) return projects.slice(0, 6)
    const search = query.trim().toLowerCase()
    return projects.filter((project) => {
      const matchesCategory = category === 'All' || project.categories.includes(category)
      const matchesSearch = !search || [project.title, project.description, ...project.languages].join(' ').toLowerCase().includes(search)
      return matchesCategory && matchesSearch
    })
  }, [category, featured, query])

  return (
    <section id="projects" className="section">
      <div className="shell">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div><div className="eyebrow">{featured ? 'Selected projects' : 'Project archive'}</div><h2 className="section-title">{featured ? 'Ideas, made tangible.' : 'A complete body of work.'}</h2><p className="section-copy">{featured ? 'A preview of work spanning intelligent systems, full-stack engineering, and low-level computing.' : `${projects.length} projects across systems, machine learning, algorithms, web development, optimization, and quantum computing.`}</p></div>
          {featured ? <a href="#/projects" className="secondary-button w-fit">All projects <ArrowUpRight size={16} /></a> : <a href="https://github.com/aethom00" target="_blank" rel="noreferrer" className="secondary-button w-fit"><Code2 size={16} />GitHub archive</a>}
        </div>

        {!featured && <div className="mt-9 space-y-4">
          <label className="glass flex max-w-md items-center gap-3 rounded-xl px-4"><Search size={17} className="text-slate-500" /><span className="sr-only">Search projects</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search projects or technologies" className="h-12 w-full bg-transparent text-sm text-white placeholder:text-slate-600 focus:outline-none" /></label>
          <div className="flex flex-wrap gap-2" aria-label="Filter projects by category">{projectCategories.map((item) => <button type="button" key={item} onClick={() => setCategory(item)} aria-pressed={category === item} className={`pill cursor-pointer transition ${category === item ? 'border-indigo-400/50 bg-indigo-500/15 text-indigo-200' : 'hover:border-white/25 hover:text-white'}`}>{item}</button>)}</div>
        </div>}

        <motion.div layout className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {visibleProjects.map((project, index) => <motion.article layout key={project.title} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .1 }} transition={{ delay: Math.min(index, 5) * .05 }} className="glass card group flex flex-col">
            <a href={project.href} target="_blank" rel="noreferrer" className="relative block aspect-[16/9] overflow-hidden border-b border-white/[.06] bg-gradient-to-br from-blue-500/15 via-slate-900 to-violet-500/10" aria-label={`Open ${project.title} project page`}>
              {project.image ? <img src={project.image} alt="" loading="lazy" className="h-full w-full object-cover opacity-75 transition duration-500 group-hover:scale-[1.04] group-hover:opacity-95" /> : <div className="grid h-full place-items-center"><span className="text-5xl font-semibold tracking-[-.08em] text-white/10">VR</span></div>}
              <span className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-slate-950/70 text-slate-300 backdrop-blur"><ArrowUpRight size={16} /></span>
            </a>
            <div className="flex flex-1 flex-col p-5">
              <div className="flex items-start justify-between gap-4"><div><p className="text-[.68rem] font-semibold uppercase tracking-[.16em] text-indigo-400">{project.categories[0]}</p><h3 className="mt-2 text-xl font-semibold tracking-tight text-white">{project.title}</h3></div>{project.date && <span className="text-xs text-slate-600">{project.date}</span>}</div>
              <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-400">{project.description}</p>
              <details className="project-details mt-3 text-sm text-slate-400"><summary className="cursor-pointer text-xs font-medium text-indigo-300">Read full description</summary><p className="mt-3 leading-6">{project.description}</p></details>
              <div className="mt-auto flex flex-wrap gap-2 pt-5">{project.languages.map((language) => <span className="pill" key={language}>{language}</span>)}</div>
            </div>
          </motion.article>)}
        </motion.div>
        {!visibleProjects.length && <div className="glass mt-8 rounded-2xl p-10 text-center text-slate-400">No projects match that filter.</div>}
      </div>
    </section>
  )
}
