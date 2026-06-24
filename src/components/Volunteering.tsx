import { motion } from 'framer-motion'
import { ArrowUpRight, HeartHandshake } from 'lucide-react'

const volunteering = [
  {
    role: 'Volunteer',
    organization: 'The Kosciuszko Foundation',
    date: 'Oct 2025 — Present',
    cause: 'Politics',
    description: 'Volunteer work with The Kosciuszko Foundation, supporting civic and cultural engagement through an organization dedicated to Polish-American connection and public life.',
    link: 'https://www.thekf.org/',
    tags: ['Civic engagement', 'Polish-American community', 'Public service'],
  },
  {
    role: 'Volunteer',
    organization: 'National Honor Society',
    date: 'Aug 2021 — May 2022',
    cause: 'Service',
    description: 'Contributed to service-oriented work through National Honor Society, emphasizing community involvement, leadership, and academic responsibility.',
    tags: ['Community service', 'Leadership', 'Academic service'],
  },
]

export default function Volunteering() {
  return (
    <section id="volunteering" className="section">
      <div className="shell">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <div className="eyebrow">Volunteering</div>
            <h2 className="section-title">Service beyond the resume.</h2>
            <p className="section-copy">A few ways I’ve stayed involved in community, civic, and service-focused work.</p>
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {volunteering.map((item, index) => (
            <motion.article
              key={`${item.organization}-${item.date}`}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: .2 }}
              transition={{ delay: index * .08 }}
              className="glass card relative overflow-hidden p-6 md:p-8"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[var(--accent-a)] to-[var(--accent-b)] opacity-80" />
              <div className="flex items-start justify-between gap-5">
                <div className="icon-box"><HeartHandshake size={19} /></div>
                <span className="rounded-full border border-white/10 bg-white/[.04] px-3 py-1 text-xs font-semibold text-slate-300">{item.date}</span>
              </div>

              <div className="mt-7">
                <p className="text-xs font-semibold uppercase tracking-[.16em] text-indigo-400">{item.cause}</p>
                <h3 className="mt-2 text-xl font-semibold text-white">{item.role}</h3>
                {item.link ? (
                  <a href={item.link} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-indigo-300 transition hover:text-white">
                    {item.organization} <ArrowUpRight size={14} />
                  </a>
                ) : (
                  <p className="mt-2 text-sm text-indigo-300">{item.organization}</p>
                )}
              </div>

              <p className="mt-5 text-sm leading-6 text-slate-500">{item.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {item.tags.map((tag) => <span className="pill" key={tag}>{tag}</span>)}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
