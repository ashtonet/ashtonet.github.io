import { motion } from 'framer-motion'
import { BrainCircuit, Camera, Code2, Database, Globe2, Map, Mountain } from 'lucide-react'

const skills = [
  { icon: Code2, title: 'Software Engineering', text: 'Building production software with Python, React, APIs, automation, data pipelines, and reliability-focused engineering practices.' },
  { icon: BrainCircuit, title: 'Machine Learning', text: 'Training and evaluating models with Python, TensorFlow, Keras, optimization methods, and experiment-driven workflows.' },
  { icon: Camera, title: 'Computer Vision', text: 'Working with image-based models, visual datasets, ResNet-style architectures, geolocation tasks, and perception-focused research.' },
  { icon: Database, title: 'Systems & Algorithms', text: 'Designing lower-level projects around C/C++, virtual memory, file servers, threading, graph search, and performance.' },
  { icon: Globe2, title: 'Geography', text: 'A lifelong interest in countries, territories, capitals, flags, borders, and the human context behind places.' },
  { icon: Map, title: 'Mapping', text: 'Building and thinking through map interfaces, globes, spatial data, coordinates, routes, and geolocation systems.' },
]

const facts = [
  { icon: Globe2, label: 'Travel', value: 'Visited 52 countries & territories' },
  { icon: Mountain, label: 'Outdoors', value: 'Backpacking and hiking' },
  { icon: Camera, label: 'Travel photography', value: 'Documenting the places and perspectives I find along the way' },
]

export default function About() {
  return (
    <section id="about" className="section overflow-hidden border-t border-white/[.05]">
      <div className="shell relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_.85fr] lg:gap-16">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .25 }}>
            <div className="eyebrow">About</div>
            <h2 className="section-title">Engineering with<br /><span className="text-slate-500">research instincts.</span></h2>
            <div className="mt-8 max-w-2xl">
              <p className="text-lg leading-8 text-slate-300">I’m a software engineer based in New Jersey, currently building large-scale systems at Amazon. My work sits where rigorous computer science meets production engineering.</p>
              <p className="mt-5 leading-7 text-slate-400">My academic work at the University of Michigan spanned computer science, computer engineering, and international engineering. I’m drawn to machine learning, computer vision, optimization, robotics, distributed systems, geography, and mapping—especially ideas that can move from a prototype into something dependable and widely useful.</p>
            </div>
          </motion.div>

          <motion.div className="about-photo-wrap" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .3 }} transition={{ delay: .1 }}>
            <a className="about-portrait block" href="/ashton_pfp.jpg" target="_blank" rel="noreferrer" aria-label="View the full photograph of Ashton Thomas">
              <img src="/ashton_pfp.jpg" alt="Ashton Thomas" loading="lazy" />
            </a>
          </motion.div>
        </div>

        <div className="mt-14 grid gap-3 md:grid-cols-3">
          {facts.map(({ icon: Icon, label, value }, index) => (
            <motion.div key={label} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .06 }} className="glass card flex items-center gap-4 p-5">
              <div className="icon-box"><Icon size={18} /></div>
              <div>
                <div className="text-xs uppercase tracking-[.12em] text-slate-600">{label}</div>
                <div className="mt-1 text-sm text-slate-200">{value}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20">
          <div className="eyebrow">Skills & interests</div>
          <h3 className="mt-3 text-3xl font-semibold tracking-[-.04em] text-white">A broad technical toolkit.</h3>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {skills.map(({ icon: Icon, title, text }, index) => (
              <motion.article key={title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .05 }} className="glass card p-5">
                <div className="icon-box"><Icon size={18} /></div>
                <h4 className="mt-5 font-semibold text-white">{title}</h4>
                <p className="mt-2 text-sm leading-6 text-slate-500">{text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
