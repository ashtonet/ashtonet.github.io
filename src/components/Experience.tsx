import { motion } from 'framer-motion'
import { BriefcaseBusiness, Building2, ExternalLink, MapPin } from 'lucide-react'

const experiences = [
  {
    role: 'Software Development Engineer I', company: 'Amazon Web Services (AWS)', type: 'Full-time', date: 'Jun 2025 — Present', location: 'New York, New York · On-site',
    description: 'Building and operating software for AWS in an on-site engineering role in New York.', skills: ['Web Development', 'HTML', 'Software Engineering'], current: true,
  },
  {
    role: 'Computational Neuroscience Research Assistant — Polk Lab', company: 'University of Michigan', type: 'Part-time', date: 'Sep 2024 — Jun 2025', location: 'Ann Arbor, Michigan · Hybrid',
    description: 'Contributed to computational neuroscience research in the Polk Lab using MATLAB, Git, and research workflows.', skills: ['Computational Neuroscience', 'MATLAB', 'Git'], url: 'https://sites.lsa.umich.edu/polklab/',
  },
  {
    role: 'SDE Software Engineer Intern', company: 'Amazon', type: 'Full-time', date: 'Sep 2024 — Nov 2024', location: 'Boston, Massachusetts · On-site',
    description: 'Completed a Fall 2024 SDE internship focused on software engineering, responsive web design, and React Native.', skills: ['Software Engineering', 'Responsive Web Design', 'React Native'],
  },
  {
    role: 'Software Development Intern', company: 'U.S. Army DEVCOM Ground Vehicle Systems Center', type: 'Internship', date: 'May 2024 — Jul 2024', location: 'Warren, Michigan · Hybrid',
    description: 'Developed software in a hybrid internship at DEVCOM GVSC, working with responsive web design and MagicDraw.', skills: ['Software Development', 'MagicDraw', 'Responsive Web Design'], url: 'https://gvsc.devcom.army.mil',
  },
  {
    role: 'Full Stack Developer', company: 'Madi Taylor Photo', type: 'Part-time', date: 'Jun 2022 — Jul 2024', location: 'Traverse City, Michigan',
    description: 'Designed and maintained the company website with HTML, CSS, and JavaScript; implemented payment solutions and form validation; and partnered with a professional photographer on marketing imagery.', skills: ['Full-Stack Development', 'HTML', 'CSS', 'JavaScript'], url: 'https://maditaylorphoto.com',
  },
]

export default function Experience() {
  return <section id="experience" className="section"><div className="shell">
    <div className="eyebrow">Experience</div><h2 className="section-title">Building for real-world scale.</h2>
    <div className="mt-10 grid gap-4">{experiences.map((item, index) => <motion.article key={`${item.company}-${item.role}`} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ delay: Math.min(index, 4) * .06 }} className={`glass card grid gap-5 p-6 md:grid-cols-[auto_1fr] md:p-8 ${item.current ? 'experience-current' : ''}`}>
      <div className="icon-box">{item.current ? <Building2 size={20} /> : <BriefcaseBusiness size={20} />}</div>
      <div className="min-w-0">
        <div className="flex flex-col justify-between gap-3 lg:flex-row lg:items-start"><div><div className="flex flex-wrap items-center gap-3"><h3 className="text-xl font-semibold text-white">{item.role}</h3><span className="pill">{item.type}</span>{item.current && <span className="experience-live"><i />Current</span>}</div>{item.url ? <a className="mt-1 inline-flex items-center gap-1.5 text-indigo-300 transition-colors hover:text-indigo-200" href={item.url} target="_blank" rel="noreferrer">{item.company}<ExternalLink size={13} aria-hidden="true" /></a> : <p className="mt-1 text-indigo-300">{item.company}</p>}</div><div className="shrink-0 text-sm text-slate-500">{item.date}</div></div>
        <p className="mt-4 flex items-center gap-2 text-xs text-slate-500"><MapPin size={13} />{item.location}</p>
        <p className="mt-4 max-w-3xl leading-7 text-slate-400">{item.description}</p>
        <div className="mt-5 flex flex-wrap gap-2">{item.skills.map((skill) => <span className="pill" key={skill}>{skill}</span>)}</div>
      </div>
    </motion.article>)}</div>
  </div></section>
}
