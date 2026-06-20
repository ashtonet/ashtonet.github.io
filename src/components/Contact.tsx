import { motion } from 'framer-motion'
import { Mail, FileText } from 'lucide-react'

export default function Contact() {
  return (
    <motion.section
      id="contact"
      className="py-20"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container-wide">
        <h2 className="section-heading">Contact</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <a href="mailto:placeholder@example.com" className="glass-card flex items-center gap-3">
            <Mail /> <div className="text-sm">placeholder@example.com</div>
          </a>
          <a href="https://github.com/placeholder" className="glass-card flex items-center gap-3">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.36-1.3-1.72-1.3-1.72-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.72 1.27 3.38.97.11-.75.41-1.27.74-1.56-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.45.11-3.03 0 0 .97-.31 3.18 1.18a11.05 11.05 0 0 1 2.9-.39c.99 0 1.99.13 2.9.39 2.2-1.5 3.17-1.18 3.17-1.18.64 1.58.24 2.74.12 3.03.74.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.4-5.27 5.68.42.36.8 1.08.8 2.18 0 1.57-.01 2.84-.01 3.23 0 .31.21.68.8.56C20.71 21.39 24 17.08 24 12c0-6.27-5.23-11.5-12-11.5z" fill="currentColor" />
            </svg>
            <div className="text-sm">GitHub</div>
          </a>
          <a href="https://linkedin.com/in/placeholder" className="glass-card flex items-center gap-3">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M4.98 3.5a2.5 2.5 0 11-.001 5.001A2.5 2.5 0 014.98 3.5zM3 8.99h4v12H3v-12zM9 8.99h3.84v1.64h.05c.54-1.02 1.86-2.09 3.83-2.09C20.9 8.54 22 10.6 22 13.79v6.2h-4v-5.5c0-1.31-.02-3-1.83-3-1.83 0-2.11 1.43-2.11 2.9v5.6H9v-12z" fill="currentColor" />
            </svg>
            <div className="text-sm">LinkedIn</div>
          </a>
          <a href="#" className="glass-card flex items-center gap-3">
            <FileText /> <div className="text-sm">Resume (placeholder)</div>
          </a>
        </div>
      </div>
    </motion.section>
  )
}
