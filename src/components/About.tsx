import { motion } from 'framer-motion'

export default function About() {
  return (
    <motion.section
      id="about"
      className="py-20"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container-wide">
        <h2 className="text-2xl text-white font-semibold">About</h2>
        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <div className="glass-card">
            <p className="text-slate-300">
              I'm a software engineer based in New Jersey working on large-scale
              systems at Amazon. I joined Amazon in 2024 and completed my
              Master's degree in Computer Engineering from the University of
              Michigan while working full-time.
            </p>
          </div>
          <div className="glass-card">
            <p className="text-slate-300">
              My interests span machine learning, computer vision, optimization,
              algorithms, robotics, and distributed systems. I'm particularly
              interested in bridging theoretical ideas with practical
              applications operating at scale. Outside of work, I enjoy language
              learning, genealogy, history, and exploring culture and citizenship
              by descent.
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
