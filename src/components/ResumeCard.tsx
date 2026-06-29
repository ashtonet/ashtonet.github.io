import { motion } from 'framer-motion'
import { ArrowUpRight, CalendarClock, FileText } from 'lucide-react'

const resumeUrl = 'https://aethom00.github.io/Ashton_resume.pdf'
const resumeViewerUrl = `https://docs.google.com/gview?embedded=false&url=${encodeURIComponent(resumeUrl)}`
const cvRequestUrl = 'mailto:aethom@umich.edu?subject=CV%20request'
const highlights = [
  'Software Development Engineer I at AWS',
  'M.S.E. Computer Engineering · Computer Vision Concentration',
  'Computational Neuroscience Research Assistant · Polk Lab',
]

export default function ResumeCard() {
  return (
    <section id="resume" className="section border-t border-white/[.05]">
      <div className="shell">
        <motion.article initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .25 }} className="glass card overflow-hidden">
          <div className="grid gap-0 lg:grid-cols-[.9fr_1.1fr]">
            <div className="relative overflow-hidden bg-gradient-to-br from-[var(--accent-a)]/20 via-slate-950 to-[var(--accent-b)]/20 p-6 md:p-8">
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
              <div className="relative">
                <div className="icon-box"><FileText size={20} /></div>
                <div className="eyebrow mt-8">Résumé</div>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-.045em] text-white md:text-4xl">A quick snapshot, ready to share.</h2>
                <p className="mt-4 max-w-xl leading-7 text-slate-400">Software engineer working across AWS-scale systems, computer vision research, and full-stack web engineering.</p>
                <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[.04] px-3 py-1 text-xs font-semibold text-slate-300"><CalendarClock size={14} />Updated June 2026</p>
              </div>
            </div>

            <div className="p-6 md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[.16em] text-slate-500">Highlights</p>
              <ul className="mt-4 grid gap-3">
                {highlights.map((item) => (
                  <li key={item} className="flex gap-3 rounded-2xl border border-white/[.07] bg-white/[.03] p-4 text-sm text-slate-300">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)] shadow-[0_0_14px_var(--accent)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex flex-wrap gap-3">
                <a href={resumeViewerUrl} target="_blank" rel="noreferrer" className="primary-button">View PDF <ArrowUpRight size={16} /></a>
                <a href={cvRequestUrl} className="secondary-button">View CV <FileText size={16} /></a>
              </div>
            </div>
          </div>
        </motion.article>
      </div>
    </section>
  )
}
