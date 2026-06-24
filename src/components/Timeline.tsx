import { motion } from 'framer-motion'

const events = [
  { year: '2021 — 2022', title: 'Associate degree', text: 'Completed an Associate Degree in Liberal Arts at Northwestern Michigan College.' },
  { year: '2022 — 2025', title: 'Bachelor’s + Amazon', text: 'Earned a B.S.E. in Computer Science Engineering with a minor in International Engineering from the University of Michigan College of Engineering and began building at Amazon.' },
  { year: '2025 — 2026', title: 'Master’s degree', text: 'Completed an M.S.E. in Computer Engineering with a Computer Vision Concentration through the University of Michigan Rackham Graduate School and College of Engineering.' },
  { year: 'Next', title: 'The open frontier', text: 'Deeper research, harder systems problems, and work with meaningful reach.' },
]

export default function Timeline() {
  return (
    <section id="timeline" className="section">
      <div className="shell">
        <div className="eyebrow">Timeline</div>
        <h2 className="section-title">Momentum, over milestones.</h2>
        <div className="relative mx-auto mt-14 max-w-3xl">
          <div className="timeline-line absolute bottom-0 left-[4.45rem] top-0 w-px sm:left-[6.45rem]" />
          {events.map((event, i) => (
            <motion.div
              key={`${event.year}-${event.title}`}
              initial={{ opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: .5 }}
              transition={{ delay: i * .08 }}
              className="relative grid grid-cols-[4rem_1fr] gap-8 pb-12 sm:grid-cols-[6rem_1fr]"
            >
              <div className="pt-1 text-right text-sm font-medium text-indigo-300">{event.year}</div>
              <div className="relative pl-4">
                <span className="absolute -left-[.46rem] top-1.5 h-3 w-3 rounded-full border-2 border-indigo-400 bg-[#030712] shadow-[0_0_18px_rgba(99,102,241,.7)]" />
                <h3 className="font-semibold text-white">{event.title}</h3>
                <p className="mt-2 leading-6 text-slate-500">{event.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
