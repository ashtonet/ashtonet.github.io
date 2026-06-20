 
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Education from './components/Education'
import Projects from './components/Projects'
import Research from './components/Research'
import Timeline from './components/Timeline'
import Contact from './components/Contact'
import Footer from './components/Footer'
import './index.css'

function App() {
  return (
    <div className="min-h-screen text-slate-200 bg-[var(--bg)]">
      <a href="#home" className="skip-link">Skip to content</a>
      <div id="scroll-progress" className="scroll-progress" />
      <div className="noise" aria-hidden />
      <Navbar />
      <main className="pt-28">
        <Hero />
        <div className="section-divider" />
        <About />
        <div className="section-divider" />
        <Experience />
        <Education />
        <div className="section-divider" />
        <Projects />
        <Research />
        <Timeline />
        <Contact />
      </main>
      <Footer />
      <ScrollProgressTracker />
    </div>
  )
}

export default App

function ScrollProgressTracker() {
  // updates the progress bar width
  if (typeof window === 'undefined') return null
  useEffect(() => {
    const el = document.getElementById('scroll-progress')
    if (!el) return
    const handler = () => {
      const doc = document.documentElement
      const total = doc.scrollHeight - doc.clientHeight
      const pct = total > 0 ? (window.scrollY / total) * 100 : 0
      el.style.width = pct + '%'
    }
    handler()
    window.addEventListener('scroll', handler, { passive: true })
    window.addEventListener('resize', handler)
    return () => {
      window.removeEventListener('scroll', handler)
      window.removeEventListener('resize', handler)
    }
  }, [])
  return null
}
