import { motion } from 'framer-motion'
import { BookOpen, BrainCircuit, Code2, Database, Globe2, Map, Tv, Wifi } from 'lucide-react'

const skills = [
  { icon: Wifi, title: 'Web Development', text: 'Building full-stack experiences with HTML, CSS, JavaScript, React, APIs, and modern web tooling.' },
  { icon: Code2, title: 'C / C++', text: 'My primary languages for performant algorithms, systems software, simulations, and large-scale data structures.' },
  { icon: Code2, title: 'Python', text: 'A preferred language for machine learning, graph problems, APIs, data workflows, and algorithm practice.' },
  { icon: Database, title: 'SQL', text: 'Designing reliable database operations and efficient back-end data flows for full-stack applications.' },
  { icon: BrainCircuit, title: 'Machine Learning', text: 'Developing models with Python, Keras, TensorFlow, C++, computer vision architectures, and custom optimization methods.' },
  { icon: Map, title: 'Geography', text: 'A lifelong interest in countries, capitals, flags, mapping, navigation, and the technology behind digital maps.' },
]

const facts = [
  { icon: Globe2, label: 'Travel', value: 'Visited 52 countries & territories' },
  { icon: BookOpen, label: 'Favorite books', value: 'A Song of Ice and Fire' },
  { icon: Tv, label: 'Favorite television', value: 'Game of Thrones & House of the Dragon' },
]

export default function About() {
  return <section id="about" className="section border-t border-white/[.05]"><div className="shell">
    <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .4 }}><div className="eyebrow">About</div><h2 className="section-title">Engineering with<br /><span className="text-slate-500">research instincts.</span></h2></motion.div>
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .3 }} transition={{ delay: .1 }}><p className="text-lg leading-8 text-slate-300">I’m a software engineer based in New Jersey, currently building large-scale systems at Amazon. My work sits where rigorous computer science meets production engineering.</p><p className="mt-5 leading-7 text-slate-400">My academic work at the University of Michigan spanned computer science, computer engineering, and international engineering. I’m drawn to machine learning, computer vision, optimization, robotics, distributed systems, geography, and mapping—especially ideas that can move from a prototype into something dependable and widely useful.</p></motion.div>
    </div>

    <div className="mt-14 grid gap-3 md:grid-cols-3">{facts.map(({ icon: Icon, label, value }, index) => <motion.div key={label} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .06 }} className="glass card flex items-center gap-4 p-5"><div className="icon-box"><Icon size={18} /></div><div><div className="text-xs uppercase tracking-[.12em] text-slate-600">{label}</div><div className="mt-1 text-sm text-slate-200">{value}</div></div></motion.div>)}</div>

    <div className="mt-20"><div className="eyebrow">Skills & interests</div><h3 className="mt-3 text-3xl font-semibold tracking-[-.04em] text-white">A broad technical toolkit.</h3><div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{skills.map(({ icon: Icon, title, text }, index) => <motion.article key={title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .05 }} className="glass card p-5"><div className="icon-box"><Icon size={18} /></div><h4 className="mt-5 font-semibold text-white">{title}</h4><p className="mt-2 text-sm leading-6 text-slate-500">{text}</p></motion.article>)}</div></div>
  </div></section>
}
