export default function Footer() {
  return (
    <footer className="py-8">
      <div className="container-wide">
        <div className="gradient-border">
          <div className="inner border-t border-white/6 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-slate-400 text-sm">© {new Date().getFullYear()} — Built with React, TypeScript.</div>
            <div className="flex items-center gap-3">
              <a href="#" className="badge badge-dark" target="_blank" rel="noreferrer">Resume</a>
              <a href="https://github.com/placeholder" className="badge badge-dark" target="_blank" rel="noreferrer">GitHub</a>
              <a href="https://linkedin.com/in/placeholder" className="badge badge-dark" target="_blank" rel="noreferrer">LinkedIn</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
