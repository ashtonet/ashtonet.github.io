import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, ArrowUpRight, CalendarDays, Code2, GitBranch, Layers3 } from 'lucide-react'
import { getProjectSlug, projects, type Project } from '../data/projects'

function projectFocus(project: Project) {
  const areas = project.categories.join(', ')
  const tools = project.languages.join(', ')
  return `This project sits at the intersection of ${areas}. It was built with ${tools}, with an emphasis on turning the underlying technical ideas into a complete, working system.`
}

export default function ProjectDetail({ project }: { project: Project }) {
  const index = projects.indexOf(project)
  const previous = projects[(index - 1 + projects.length) % projects.length]
  const next = projects[(index + 1) % projects.length]

  return (
    <section className="section overflow-hidden">
      <div className="mesh-bg"><div className="mesh-grid" /></div>
      <div className="shell relative">
        <a href="#/projects" className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white">
          <ArrowLeft size={16} /> Back to all projects
        </a>

        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
          <div className="eyebrow">Project case study</div>
          <div className="mt-4 grid items-end gap-6 lg:grid-cols-[1fr_auto]">
            <div>
              <h1 className="max-w-4xl text-5xl font-semibold leading-[.95] tracking-[-.06em] text-white sm:text-6xl lg:text-7xl">{project.title}</h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-400">{project.description}</p>
            </div>
            <div className="flex flex-wrap gap-2 lg:max-w-xs lg:justify-end">
              {project.languages.map((language) => <span className="pill" key={language}>{language}</span>)}
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .08 }} className="glass mt-12 overflow-hidden rounded-[1.75rem]">
          <div className="aspect-[16/7] min-h-64 bg-gradient-to-br from-blue-500/15 via-slate-900 to-violet-500/10">
            {project.image ? <img src={project.image} alt={`${project.title} project`} className="h-full w-full object-cover opacity-80" /> : <div className="grid h-full place-items-center"><span className="text-8xl font-semibold tracking-[-.08em] text-white/10">VR</span></div>}
          </div>
        </motion.div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.6fr_.8fr]">
          <motion.article initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass rounded-3xl p-7 sm:p-10">
            <div className="flex items-center gap-3 text-indigo-300"><Layers3 size={19} /><span className="text-xs font-semibold uppercase tracking-[.16em]">The work</span></div>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white">From idea to implementation.</h2>
            <p className="mt-5 leading-8 text-slate-400">{project.description}</p>
            <p className="mt-5 leading-8 text-slate-400">{projectFocus(project)}</p>
          </motion.article>

          <motion.aside initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: .06 }} className="glass rounded-3xl p-7 sm:p-8">
            <h2 className="text-lg font-semibold text-white">Project details</h2>
            <dl className="mt-6 space-y-6">
              {project.date && <div><dt className="flex items-center gap-2 text-xs uppercase tracking-[.14em] text-slate-600"><CalendarDays size={14} />Completed</dt><dd className="mt-2 text-sm text-slate-300">{project.date}</dd></div>}
              <div><dt className="flex items-center gap-2 text-xs uppercase tracking-[.14em] text-slate-600"><Code2 size={14} />Built with</dt><dd className="mt-3 flex flex-wrap gap-2">{project.languages.map((item) => <span className="pill" key={item}>{item}</span>)}</dd></div>
              <div><dt className="text-xs uppercase tracking-[.14em] text-slate-600">Focus areas</dt><dd className="mt-3 flex flex-wrap gap-2">{project.categories.map((item) => <span className="pill" key={item}>{item}</span>)}</dd></div>
            </dl>
          </motion.aside>
        </div>

        {project.versions && <motion.section initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-12">
          <div className="flex items-center gap-3 text-indigo-300"><GitBranch size={19} /><span className="text-xs font-semibold uppercase tracking-[.16em]">Evolution</span></div>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Three versions, one evolving story.</h2>
          <p className="mt-4 max-w-2xl leading-7 text-slate-400">The portfolio has changed alongside the work it documents. Each generation kept what mattered from the last while rethinking how the projects should be presented.</p>

          <div className="relative mt-9 space-y-5 before:absolute before:bottom-8 before:left-[1.15rem] before:top-8 before:w-px before:bg-gradient-to-b before:from-blue-500 before:via-indigo-500 before:to-violet-500 sm:before:left-[1.4rem]">
            {project.versions.map((item, index) => <article key={item.version} className="glass relative ml-12 rounded-3xl p-6 sm:ml-16 sm:p-8">
              <span className="absolute -left-[3.7rem] top-8 grid h-9 w-9 place-items-center rounded-full border border-indigo-400/40 bg-[#080d1b] text-xs font-semibold text-indigo-200 sm:-left-[4.7rem] sm:h-11 sm:w-11">{index + 1}</span>
              <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
                <div>
                  <p className="text-[.68rem] font-semibold uppercase tracking-[.16em] text-indigo-400">{item.version}</p>
                  <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">{item.title}</h3>
                </div>
                {item.href && <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel={item.href.startsWith('http') ? 'noreferrer' : undefined} className="secondary-button shrink-0">{item.linkLabel} <ArrowUpRight size={15} /></a>}
              </div>
              <p className="mt-5 max-w-4xl leading-8 text-slate-400">{item.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">{item.technologies.map((technology) => <span className="pill" key={technology}>{technology}</span>)}</div>
            </article>)}
          </div>
        </motion.section>}

        <nav aria-label="Adjacent projects" className="mt-10 grid gap-4 sm:grid-cols-2">
          <a href={`#/projects/${getProjectSlug(previous)}`} className="glass card flex items-center gap-4 p-5"><ArrowLeft size={18} className="text-indigo-300" /><div><span className="text-xs text-slate-600">Previous project</span><div className="mt-1 font-medium text-white">{previous.title}</div></div></a>
          <a href={`#/projects/${getProjectSlug(next)}`} className="glass card flex items-center justify-end gap-4 p-5 text-right"><div><span className="text-xs text-slate-600">Next project</span><div className="mt-1 font-medium text-white">{next.title}</div></div><ArrowRight size={18} className="text-indigo-300" /></a>
        </nav>
      </div>
    </section>
  )
}
