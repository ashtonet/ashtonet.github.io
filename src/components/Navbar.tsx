import { motion } from 'framer-motion'

const links = [
  'Home',
  'About',
  'Experience',
  'Education',
  'Projects',
  'Research',
  'Timeline',
  'Contact',
]

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45 }}
      className="fixed top-4 left-0 right-0 z-40 mx-auto container-wide"
    >
      <div className="glass flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="text-white font-semibold">Ashton Thomas</span>
          <span className="text-sm text-slate-400">· Portfolio</span>
        </div>
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="nav-link">
              {l}
            </a>
          ))}
        </div>
      </div>
    </motion.nav>
  )
}
