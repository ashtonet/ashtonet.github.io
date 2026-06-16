export default function Footer() {
  return (
    <footer className="py-8">
      <div className="container-wide text-center text-slate-500 text-sm">
        © {new Date().getFullYear()} — Built with React, TypeScript and love.
      </div>
    </footer>
  )
}
