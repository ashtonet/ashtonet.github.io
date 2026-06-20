import { motion } from 'framer-motion'

const ed = [
  { school: "Associate's Degree (completed at age 18)", degree: "Associate's", date: '2021' },
  { school: "Bachelor's Degree in Computer Engineering (completed at age 21)", degree: "B.S. Computer Engineering", date: '2024' },
  { school: 'University of Michigan', degree: "M.S. Computer Engineering (completed while working full-time)", date: '2025' },
]

export default function Education() {
  return (
    <motion.section
      id="education"
      className="py-20"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container-wide">
        <h2 className="section-heading">Education</h2>
        <div className="mt-6 space-y-4">
          {ed.map((e, idx) => (
            <article key={e.school} tabIndex={0} aria-labelledby={`edu-${idx}-title`} className="glass-card flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div className="flex-1 min-w-0">
                <div id={`edu-${idx}-title`} className="text-white font-medium truncate">{e.school}</div>
                <div className="text-slate-400 text-sm">{e.degree}</div>
              </div>
              <div className="text-slate-400 text-sm sm:ml-4">{e.date}</div>
            </article>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
