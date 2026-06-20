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
          {ed.map((e) => (
            <div key={e.school} className="glass-card flex justify-between items-center">
              <div>
                <div className="text-white font-medium">{e.school}</div>
                <div className="text-slate-400 text-sm">{e.degree}</div>
              </div>
              <div className="text-slate-400 text-sm">{e.date}</div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
