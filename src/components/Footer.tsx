import { ArrowUp } from 'lucide-react'

export default function Footer() {
  return <footer className="border-t border-white/[.05] py-8"><div className="shell flex flex-col items-center justify-between gap-4 text-xs text-slate-600 sm:flex-row"><p>&copy; {new Date().getFullYear()} Ashton Thomas.</p><a href="#/" className="flex items-center gap-2 transition hover:text-slate-300">Home <ArrowUp size={13} /></a></div></footer>
}
