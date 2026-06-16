 
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
    <div className="min-h-screen text-slate-200">
      <Navbar />
      <main className="pt-24">
        <Hero />
        <About />
        <Experience />
        <Education />
        <Projects />
        <Research />
        <Timeline />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
