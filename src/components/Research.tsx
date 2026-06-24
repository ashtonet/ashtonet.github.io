import { motion } from 'framer-motion'
import { ArrowUpRight, BrainCircuit, Code2, GitBranch, Microscope } from 'lucide-react'

const researchMethods = [
  { icon: BrainCircuit, title: 'Computational Neuroscience', text: 'Cognition, behavior, and computational models.' },
  { icon: Code2, title: 'MATLAB + analysis tooling', text: 'Data processing, analysis, and result evaluation.' },
  { icon: GitBranch, title: 'Research workflows', text: 'Organized, version-controlled, reproducible work.' },
]

export default function Research() {
  return (
    <section id="research" className="section border-y border-white/[.05] bg-white/[.012]">
      <div className="shell">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex justify-center">
            <div className="eyebrow">Research</div>
          </div>
          <h2 className="section-title">Computational cognition in practice.</h2>
          <p className="section-copy mx-auto">My research experience is rooted in the Polk Lab at the University of Michigan, where I contributed to computational neuroscience work using MATLAB, Git, and structured research workflows.</p>
        </div>

        <motion.article initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .25 }} className="glass card mx-auto mt-12 max-w-5xl overflow-hidden p-0">
          <div className="grid md:grid-cols-[14rem_1fr]">
            <aside className="relative border-b border-white/[.06] bg-white/[.025] p-6 md:border-b-0 md:border-r md:p-8">
              <div className="icon-box"><Microscope size={20} /></div>
              <p className="mt-6 text-xs font-semibold uppercase tracking-[.16em] text-indigo-400">Polk Lab</p>
              <p className="mt-2 text-sm leading-6 text-slate-500">University of Michigan</p>
              <div className="mt-8 h-px w-16 bg-gradient-to-r from-[var(--accent-a)] to-[var(--accent-b)] md:h-20 md:w-px" />
              <span className="mt-6 inline-flex rounded-full border border-white/10 bg-white/[.04] px-3 py-1 text-xs font-semibold text-slate-300">Sep 2024 — Jun 2025</span>
            </aside>

            <div className="p-6 md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[.16em] text-indigo-400">Computational neuroscience</p>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">Research Assistant</h3>
              <p className="mt-5 max-w-3xl leading-7 text-slate-400">Contributed to computational neuroscience research in the Polk Lab, supporting analysis and research workflows with MATLAB, Git, and reproducible technical practices.</p>

              <div className="mt-7 grid gap-3 lg:grid-cols-3">
                {researchMethods.map(({ icon: Icon, title, text }) => (
                  <div key={title} className="rounded-2xl border border-white/[.08] bg-slate-950/35 p-4">
                    <Icon size={17} className="text-indigo-300" />
                    <h4 className="mt-4 text-sm font-semibold text-white">{title}</h4>
                    <p className="mt-2 text-xs leading-5 text-slate-500">{text}</p>
                  </div>
                ))}
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                {['MATLAB', 'Git', 'Research Methods'].map((skill) => <span className="pill" key={skill}>{skill}</span>)}
                <a href="https://sites.lsa.umich.edu/polklab/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-300 transition hover:text-white">
                  Polk Lab Website <ArrowUpRight size={15} />
                </a>
              </div>
            </div>
          </div>
        </motion.article>
      </div>
    </section>
  )
}
