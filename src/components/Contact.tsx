import { motion } from 'framer-motion'
import { ArrowUpRight, FileText, Link2 } from 'lucide-react'
import { GitHubLogo, InstagramLogo, LinkedInLogo } from './BrandIcons'

function FacebookLogo({ size = 18 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14.3 8.1V6.6c0-.74.49-.91.84-.91h2.14V2.2L14.33 2.2c-3.28 0-4.03 2.46-4.03 4.03v1.87H7.72v3.6h2.58V22h4V11.7h3.02l.4-3.6h-3.42Z" /></svg>
}

function DiscordLogo({ size = 18 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19.2 5.1A16.1 16.1 0 0 0 15.1 3.8l-.2.4c1.5.4 2.2 1 2.2 1s-1.9-1-5.1-1-5.1 1-5.1 1 .8-.6 2.3-1l-.3-.4A16.1 16.1 0 0 0 4.8 5.1C2.2 9 1.5 12.8 1.8 16.5A16.5 16.5 0 0 0 6.8 19c.4-.5.7-1 1-1.5-.6-.2-1.2-.5-1.8-.9l.4-.3c3.4 1.6 7.1 1.6 10.5 0l.4.3c-.6.4-1.2.7-1.8.9.3.5.6 1 1 1.5a16.4 16.4 0 0 0 5-2.5c.4-4.3-.7-8-2.3-11.4ZM8.6 14.2c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2Zm6.8 0c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2Z" /></svg>
}

const linkGroups = [
  {
    title: 'Work',
    accent: 'from-cyan-300/70 to-blue-400/70',
    description: 'Code, professional context, and technical projects.',
    links: [
      { icon: GitHubLogo, label: 'GitHub', value: '@aethom00', href: 'https://github.com/aethom00' },
      { icon: LinkedInLogo, label: 'LinkedIn', value: '/in/aethom', href: 'https://www.linkedin.com/in/aethom' },
    ],
  },
  {
    title: 'Personal',
    accent: 'from-rose-300/70 to-amber-300/70',
    description: 'Travel photos, snapshots, and broader internet presence.',
    links: [
      { icon: InstagramLogo, label: 'Instagram', value: '@ashton.thomas_', href: 'https://www.instagram.com/ashton.thomas_/' },
      { icon: Link2, label: 'Linktree', value: 'thomasash00', href: 'https://linktr.ee/thomasash00' },
      { icon: FacebookLogo, label: 'Facebook', value: 'Ashton Thomas', href: 'https://www.facebook.com/ashton.thomas.125760/' },
    ],
  },
  {
    title: 'Documents',
    accent: 'from-violet-300/70 to-fuchsia-300/70',
    description: 'A compact professional snapshot and academic CV.',
    links: [
      { icon: FileText, label: 'Résumé', value: 'View résumé', href: 'https://ashtonet.github.io/generated-pdfs/resume.pdf' },
      { icon: FileText, label: 'CV', value: 'View CV', href: 'https://ashtonet.github.io/generated-pdfs/cv.pdf' },
    ],
  },
  {
    title: 'Chat',
    accent: 'from-emerald-300/70 to-teal-300/70',
    description: 'A casual place to reach me online.',
    links: [
      { icon: DiscordLogo, label: 'Discord', value: 'greenbacon', href: 'https://discordapp.com/users/greenbacon' },
    ],
  },
]

export default function Contact() {
  return <section id="contact" className="section border-t border-white/[.05]"><div className="shell">
    <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="contact-business-card relative overflow-hidden rounded-[2.4rem] border border-white/[.09] p-5 shadow-2xl shadow-black/30 sm:p-7 lg:p-10">
      <div aria-hidden="true" className="contact-card-glow absolute inset-0" />
      <div aria-hidden="true" className="contact-card-topography absolute inset-0" />
      <div aria-hidden="true" className="contact-card-sheen absolute inset-0" />
      <div aria-hidden="true" className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      <div aria-hidden="true" className="absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div className="relative grid gap-8 lg:grid-cols-[1.04fr_.96fr] lg:items-stretch">
        <div className="contact-identity-panel flex min-h-[30rem] flex-col justify-between rounded-[1.9rem] border border-white/[.07] p-6 sm:p-8">
          <div>
            <div className="eyebrow before:bg-gradient-to-r before:from-amber-300 before:to-rose-400">Contact</div>
            <h2 className="mt-6 max-w-2xl bg-gradient-to-br from-white via-slate-100 to-amber-100 bg-clip-text text-[clamp(2.5rem,9vw,6rem)] font-semibold leading-[1.05] tracking-[-.075em] text-transparent">Ashton Thomas</h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-slate-400">Software engineer, researcher, map obsessive, and travel-photo collector. This is the small directory of places where my work, documents, and life outside the terminal live.</p>
          </div>

          <div className="mt-10 flex flex-col gap-5 border-t border-white/[.08] pt-6 sm:flex-row sm:items-center">
            <img src="/ashton_pfp.jpg" alt="Ashton Thomas" loading="lazy" className="h-24 w-24 rounded-3xl border border-white/10 object-cover object-[50%_54%] shadow-xl shadow-black/30" />
            <div>
              <div className="text-sm font-medium text-white">Personal portfolio directory</div>
              <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">A cleaner closing card for the practical links: professional profiles, social spaces, résumé, and CV.</p>
            </div>
          </div>
        </div>

        <div className="contact-directory-panel rounded-[1.9rem] border border-white/[.08] p-4 shadow-inner shadow-white/[.03] backdrop-blur-md sm:p-5">
          <div className="flex items-center justify-between gap-4 border-b border-white/[.08] px-2 pb-5">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[.18em] text-slate-500">Find me elsewhere</div>
              <p className="mt-2 text-sm text-slate-500">No contact form, no friction — just the useful places.</p>
            </div>
            <div className="hidden h-12 w-12 place-items-center rounded-full border border-white/[.08] bg-white/[.04] text-sm font-semibold text-white sm:grid">AT</div>
          </div>

          <div className="divide-y divide-white/[.06]">
            {linkGroups.filter(({ title }) => title !== 'Documents').map((group) => <div key={group.title} className="py-5">
              <div className="mb-2 px-2 text-xs font-medium uppercase tracking-[.16em] text-slate-600">{group.title}</div>
              {group.links.map(({ icon: Icon, label, value, href }) => <a key={label} href={href} target="_blank" rel="noreferrer" className="group flex items-center gap-4 rounded-2xl px-2 py-3 transition hover:bg-white/[.045]">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-white/[.08] bg-white/[.04] text-slate-400 shadow-inner shadow-white/[.03] transition group-hover:border-white/20 group-hover:text-white"><Icon size={17} /></span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium text-slate-200 transition group-hover:text-white">{label}</span>
                  <span className="mt-1 block truncate text-xs text-slate-600 transition group-hover:text-slate-400">{value}</span>
                </span>
                <ArrowUpRight size={14} className="text-slate-700 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
              </a>)}
            </div>)}
          </div>

          <div className="grid gap-3 border-t border-white/[.08] pt-5 sm:grid-cols-2">
            {linkGroups.find(({ title }) => title === 'Documents')?.links.map(({ icon: Icon, label, value, href }) => <a key={label} href={href} target="_blank" rel="noreferrer" className="group rounded-3xl border border-white/[.08] bg-white/[.04] p-4 transition hover:border-white/20 hover:bg-white/[.065]">
              <span className="flex items-center justify-between gap-4">
                <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white/[.06] text-slate-300 transition group-hover:text-white"><Icon size={17} /></span>
                <ArrowUpRight size={14} className="text-slate-700 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
              </span>
              <span className="mt-5 block text-lg font-semibold tracking-[-.03em] text-white">{label}</span>
              <span className="mt-1 block text-xs text-slate-500">{value}</span>
            </a>)}
          </div>
        </div>
      </div>
    </motion.div>
  </div></section>
}
