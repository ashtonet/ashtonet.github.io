import { motion } from 'framer-motion'
import { ArrowUpRight, Code2, FileText, Link2, Mail, UserRound } from 'lucide-react'

const contacts = [
  { icon: Mail, label: 'Email', value: 'aethom@umich.edu', href: 'mailto:aethom@umich.edu' },
  { icon: Code2, label: 'GitHub archive', value: '@aethom00', href: 'https://github.com/aethom00' },
  { icon: UserRound, label: 'LinkedIn', value: '/in/aethom', href: 'https://www.linkedin.com/in/aethom' },
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
