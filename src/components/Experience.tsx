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
        <h2 className="text-2xl text-white font-semibold">Experience</h2>
        <div className="mt-6 space-y-4">
          {items.map((it) => (
            <div key={it.role} className="glass-card flex justify-between items-center">
              <div>
                <div className="text-white font-medium">{it.role}</div>
                <div className="text-slate-400 text-sm">{it.org}</div>
              </div>
              <div className="text-slate-400 text-sm">{it.date}</div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
