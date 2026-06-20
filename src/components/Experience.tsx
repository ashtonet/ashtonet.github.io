import { motion } from 'framer-motion'

const items = [
  { role: 'Software Development Engineer', org: 'Amazon', date: '2024–Present' },
]

export default function Experience() {
  return (
    <motion.section
      id="experience"
      className="py-20"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container-wide">
        <h2 className="section-heading">Experience</h2>
        <div className="mt-6 space-y-4">
          {items.map((it, idx) => (
            <article key={it.role} tabIndex={0} aria-labelledby={`exp-${idx}-title`} className="glass-card flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div className="flex-1 min-w-0">
                <div id={`exp-${idx}-title`} className="text-white font-medium truncate">{it.role}</div>
                <div className="text-slate-400 text-sm">{it.org}</div>
              </div>
              <div className="text-slate-400 text-sm sm:ml-4">{it.date}</div>
            </article>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
