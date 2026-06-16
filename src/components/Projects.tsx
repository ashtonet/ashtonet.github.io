import { motion } from 'framer-motion'

const projects = [
  { title: 'Project One', desc: 'A short description', tech: ['TS', 'React'] },
  { title: 'Project Two', desc: 'Another project', tech: ['Py', 'ML'] },
  { title: 'Project Three', desc: 'Research + product', tech: ['Go', 'Rust'] },
]

export default function Projects() {
  return (
    <motion.section
      id="projects"
      className="py-20"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container-wide">
        <h2 className="text-2xl text-white font-semibold">Projects</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((p) => (
            <motion.a
              key={p.title}
              href="#"
              className="glass-card hover:scale-[1.02] transition-transform"
              whileHover={{ scale: 1.02 }}
            >
              <div className="text-white font-medium">{p.title}</div>
              <div className="text-slate-400 text-sm mt-2">{p.desc}</div>
              <div className="mt-4 flex gap-2 text-xs text-slate-400">
                {p.tech.map((t) => (
                  <span key={t} className="px-2 py-1 bg-white/3 rounded-md">{t}</span>
                ))}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
