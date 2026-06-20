import { TypeAnimation } from 'react-type-animation'
import { motion } from 'framer-motion'
import Particles from './Particles'

export default function Hero() {
  return (
    <section id="home" className="relative hero-compact">
      <div className="particle-bg" aria-hidden />
      <Particles />
      <div className="container-wide relative z-10 hero-inner">
        <div className="absolute right-6 top-8 hidden lg:block">
          <div className="mesh" aria-hidden />
          <div className="orb orb-1" aria-hidden />
          <div className="orb orb-2" aria-hidden />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-3xl mx-auto px-4 text-center lg:text-left">
            <h1 className="text-4xl md:text-6xl font-extrabold heading-gradient leading-tight">
              Ashton Thomas
            </h1>
            <div className="mt-2 text-sm hero-sub">Software Development Engineer @ Amazon — Machine Learning & Systems</div>
            <div className="mt-3 text-base md:text-lg text-slate-300">
            <TypeAnimation
              sequence={[
                'Machine Learning',
                1200,
                'Computer Vision',
                1200,
                'Algorithms',
                1200,
                'Distributed Systems',
                1200,
                'Optimization',
                1200,
                'Robotics',
                1200,
                'Large-Scale Systems',
                1200,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="accent-gradient"
            />
          </div>

            <div className="mt-8 flex items-center justify-center lg:justify-start gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <a className="cta-primary inline-flex items-center gap-2 text-sm md:text-base" href="#contact">
                Contact
              </a>
              <a className="glass-card inline-flex items-center gap-2 text-sm md:text-base" href="#projects">
                Projects
              </a>
              <a className="badge" href="#" style={{ background: 'linear-gradient(90deg,#8b5cf6,#06b6d4)', color: 'white' }}>Resume</a>
            </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
