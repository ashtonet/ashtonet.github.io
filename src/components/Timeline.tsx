import { motion } from 'framer-motion'

const events = [
  { year: '2003', title: 'Born' },
  { year: '2021', title: "Associate's Degree completed" },
  { year: '2024', title: 'Joined Amazon' },
  { year: '2024', title: "Bachelor's Degree completed" },
  { year: '2025', title: "Master's Degree in Computer Engineering completed (while working full-time)" },
  { year: 'Future', title: 'Potential PhD and research directions' },
]

export default function Timeline() {
  return (
    <motion.section
      id="timeline"
      className="py-20"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container-wide">
        <h2 className="text-2xl text-white font-semibold">Timeline</h2>
        <div className="mt-8 border-l border-white/6 pl-6 space-y-8">
          {events.map((ev) => (
            <div key={ev.year} className="relative">
              <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-gradient-to-br from-primary to-violet-500" />
              <div className="text-white font-medium">{ev.title}</div>
              <div className="text-slate-400 text-sm">{ev.year}</div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
