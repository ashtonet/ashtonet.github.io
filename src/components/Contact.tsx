import { motion } from 'framer-motion'
import { ArrowUpRight, FileText, Link2, Mail } from 'lucide-react'

function GitHubLogo({ size = 18 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .7a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2.23c-3.22.7-3.9-1.37-3.9-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.77 2.72 1.26 3.38.96.1-.75.4-1.26.74-1.55-2.57-.29-5.27-1.29-5.27-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.16 1.18A10.95 10.95 0 0 1 12 6.12c.98 0 1.94.13 2.85.39 2.19-1.49 3.16-1.18 3.16-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.4-2.71 5.38-5.29 5.67.42.36.79 1.07.79 2.16v3.25c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .7Z" /></svg>
}

function LinkedInLogo({ size = 18 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V8.98h3.42v1.57h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.29ZM5.32 7.41a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.04H3.54V8.98H7.1v11.47Z" /></svg>
}

const contacts = [
  { icon: Mail, label: 'Email', value: 'aethom@umich.edu', href: 'mailto:aethom@umich.edu' },
  { icon: GitHubLogo, label: 'GitHub archive', value: '@aethom00', href: 'https://github.com/aethom00' },
  { icon: LinkedInLogo, label: 'LinkedIn', value: '/in/aethom', href: 'https://www.linkedin.com/in/aethom' },
  { icon: FileText, label: 'Résumé', value: 'View PDF', href: 'https://aethom00.github.io/Ashton_resume.pdf' },
]

const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/ashton.thomas_/' },
  { label: 'Facebook', href: 'https://www.facebook.com/ashton.thomas.125760/' },
  { label: 'Linktree', href: 'https://linktr.ee/thomasash00' },
  { label: 'Discord', href: 'https://discordapp.com/users/greenbacon' },
]

export default function Contact() {
  return <section id="contact" className="section border-t border-white/[.05]"><div className="shell">
    <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative overflow-hidden rounded-[2rem] border border-indigo-400/15 bg-gradient-to-br from-blue-600/10 via-slate-950 to-violet-600/10 px-6 py-14 text-center sm:px-12 sm:py-20"><div className="absolute left-1/2 top-0 h-56 w-96 -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl" /><div className="relative"><div className="eyebrow justify-center before:hidden">Contact</div><h2 className="section-title mx-auto max-w-3xl">Let’s build something<br />worth caring about.</h2><p className="mx-auto mt-5 max-w-xl leading-7 text-slate-400">Questions, ideas, or just want to say hello? I’m always happy to talk about ambitious engineering, research, or the interesting space between them.</p><a href="mailto:aethom@umich.edu" className="primary-button mt-8">Send a message <Mail size={16} /></a></div></motion.div>
    <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{contacts.map(({ icon: Icon, label, value, href }) => <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noreferrer' : undefined} className="glass card group flex items-center gap-4 p-4"><div className="icon-box"><Icon size={18} /></div><div className="min-w-0"><div className="text-xs text-slate-500">{label}</div><div className="mt-1 truncate text-sm text-slate-200">{value}</div></div><ArrowUpRight size={14} className="ml-auto shrink-0 text-slate-600 transition group-hover:text-white" /></a>)}</div>
    <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-slate-500"><span className="flex items-center gap-2 text-slate-600"><Link2 size={13} />Elsewhere</span>{socialLinks.map((link) => <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="transition hover:text-white">{link.label}</a>)}</div>
  </div></section>
}
