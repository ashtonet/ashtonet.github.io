import { motion } from 'framer-motion'
import { ArrowDown, Code2 as Github, Mail, UserRound as Linkedin } from 'lucide-react'
import { TypeAnimation } from 'react-type-animation'
import Particles from './Particles'

export default function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-24">
      <div className="mesh-bg"><div className="mesh-grid" /></div><Particles />
      <div className="shell relative z-10 py-24 text-center">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }}>
          <h1 className="gradient-text mx-auto max-w-5xl text-[clamp(3.2rem,10vw,7.5rem)] font-semibold leading-[.86] tracking-[-.075em]">Ashton Thomas</h1>
          <p className="mt-7 text-sm font-medium uppercase tracking-[.22em] text-slate-500">Software Development Engineer &middot; Amazon</p>
          <div className="mt-4 min-h-9 text-xl text-slate-300 md:text-2xl">
            <TypeAnimation sequence={['Machine learning systems', 1700, 'Computer vision', 1700, 'Distributed infrastructure', 1700, 'Optimization & robotics', 1700]} repeat={Infinity} speed={45} />
            <span className="text-indigo-400">_</span>
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-400 md:text-lg">I design intelligent, reliable systems that turn ambitious ideas into useful software at scale.</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <a href="#/projects" className="primary-button">Explore my work <ArrowDown size={15} /></a>
            <a href="#/contact" className="secondary-button">Start a conversation</a>
          </div>
          <div className="mt-8 flex justify-center gap-2">
            <a className="grid h-10 w-10 place-items-center rounded-full text-slate-500 transition hover:bg-white/5 hover:text-white" href="https://github.com/aethom00" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={18} /></a>
            <a className="grid h-10 w-10 place-items-center rounded-full text-slate-500 transition hover:bg-white/5 hover:text-white" href="#/contact" aria-label="LinkedIn"><Linkedin size={18} /></a>
            <a className="grid h-10 w-10 place-items-center rounded-full text-slate-500 transition hover:bg-white/5 hover:text-white" href="#/contact" aria-label="Email"><Mail size={18} /></a>
          </div>
        </motion.div>
      </div>
      <a href="#/about" aria-label="Open about page" className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 text-slate-600 transition hover:text-slate-300"><ArrowDown size={18} /></a>
    </section>
  )
}
