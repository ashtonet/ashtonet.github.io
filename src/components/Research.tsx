import { motion } from 'framer-motion'
import { Book } from 'lucide-react'

const items = [
  { title: 'Machine Learning', desc: 'Algorithms and systems for learning at scale', icon: Book },
  { title: 'Computer Vision', desc: 'Perception and visual understanding', icon: Book },
  { title: 'Optimization', desc: 'Optimization methods for models and systems', icon: Book },
  { title: 'Distributed Systems', desc: 'Scalable systems and infrastructure', icon: Book },
  { title: 'Large-Scale Systems', desc: 'Engineering systems at internet scale', icon: Book },
  { title: 'Robotics', desc: 'Algorithms for embodied agents', icon: Book },
  { title: 'Quantum Computing', desc: 'Exploratory research directions', icon: Book },
]

export default function Research() {
  return (
    <motion.section
      id="research"
      className="py-20"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container-wide">
        <h2 className="text-2xl text-white font-semibold">Research</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((it) => {
            const Icon = it.icon
            return (
              <div key={it.title} className="glass-card flex gap-4 items-center">
                <div className="p-3 rounded-lg bg-white/5">
                  <Icon size={20} className="text-white" />
                </div>
                <div>
                  <div className="text-white font-medium">{it.title}</div>
                  <div className="text-slate-400 text-sm">{it.desc}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </motion.section>
  )
}
