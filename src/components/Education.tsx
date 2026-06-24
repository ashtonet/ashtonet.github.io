import { motion } from 'framer-motion'
import { GraduationCap } from 'lucide-react'

const schools = [
  {
    range: '2025 — 2026',
    degree: 'M.S.E. Computer Engineering · Computer Vision Concentration',
    school: 'University of Michigan Rackham Graduate School · College of Engineering',
    note: 'Completed a Computer Vision Concentration through Rackham and the College of Engineering while continuing an engineering path at Michigan.',
  },
  {
    range: '2022 — 2025',
    degree: 'B.S.E. Computer Science Engineering',
    school: 'University of Michigan College of Engineering',
    note: 'Majored in Computer Science Engineering with a minor in International Engineering.',
  },
  {
    range: '2021 — 2022',
    degree: 'Associate Degree in Liberal Arts',
    school: 'Northwestern Michigan College',
    note: 'Completed an accelerated early-college foundation before transferring into engineering.',
  },
]

export default function Education() {
  return (
    <section id="education" className="section border-y border-white/[.05] bg-white/[.012]">
      <div className="shell">
        <div className="eyebrow">Education</div>
        <h2 className="section-title">A fast, focused foundation.</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {schools.map((item, i) => (
            <motion.article
              key={item.degree}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * .08 }}
              className="glass card relative overflow-hidden p-6"
            >
              <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[var(--accent-a)] to-[var(--accent-b)] opacity-80" />
              <div className="flex items-center justify-between gap-4">
                <div className="icon-box"><GraduationCap size={19} /></div>
                <span className="rounded-full border border-white/10 bg-white/[.04] px-3 py-1 text-xs font-semibold text-slate-300">{item.range}</span>
              </div>
              <h3 className="mt-7 text-lg font-semibold text-white">{item.degree}</h3>
              <p className="mt-2 text-sm text-indigo-300">{item.school}</p>
              <p className="mt-4 text-sm leading-6 text-slate-500">{item.note}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
