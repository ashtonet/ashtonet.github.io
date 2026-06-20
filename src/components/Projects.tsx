import { motion } from 'framer-motion'

const projects = [
  { title: 'Project One', desc: 'A short description', tech: ['TS', 'React'], thumb: '/images/project1.svg' },
  { title: 'Project Two', desc: 'Another project', tech: ['Py', 'ML'], thumb: '/images/project2.svg' },
  { title: 'Project Three', desc: 'Research + product', tech: ['Go', 'Rust'], thumb: '/images/project3.svg' },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}
const item = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0 },
}

export default function Projects() {
  return (
    <section id="projects" className="py-20">
      <div className="container-wide">
        <h2 className="section-heading">Projects</h2>
        <motion.div
          className="mt-6 grid grid-cols-1 gap-6 project-grid-sm project-grid-lg"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {projects.map((p, idx) => (
            <motion.article key={`project-${idx}-${p.title}`} tabIndex={0} aria-labelledby={`proj-${idx}-title`} className="glass-card relative project-card-hover flex flex-col overflow-hidden" variants={item} whileHover={{ scale: 1.02 }}>
              {idx === 0 && <div className="absolute -top-3 -right-3 tag">Featured</div>}
              <a href="#" aria-label={`Open project ${p.title}`} className="block">
                <div className="relative">
                  <div className="project-media" aria-hidden style={{ backgroundImage: `url(${p.thumb})` }} />
                  <span className="sr-only">Thumbnail for {p.title}</span>
                </div>
                <div className="mt-3 px-3 pb-4">
                  <div id={`proj-${idx}-title`} className="text-white font-semibold text-lg heading-gradient">{p.title}</div>
                  <div className="text-slate-400 text-sm mt-2">{p.desc}</div>
                </div>
              </a>
              <div className="mt-4 flex gap-2 text-xs text-slate-300 flex-wrap">
                {p.tech.map((t, j) => (
                  <span key={`tech-${idx}-${j}`} className="tag">{t}</span>
                ))}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
