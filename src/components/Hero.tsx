import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, ChevronLeft, ChevronRight, Code2 as Github, Mail, UserRound as Linkedin } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { TypeAnimation } from 'react-type-animation'
import { landscapeHeroImages, portraitHeroImages } from '../data/heroImages.generated'
import BlurredPhotoParallax from './BlurredPhotoParallax'

const fallbackHeroImage = { src: '/images/hero-landscape/Honolulu.jpg', label: 'HONOLULU', position: 'center 48%' }

const HERO_ROTATION_MS = 12000
const HERO_PRE_SWITCH_MS = 1800

const getGoogleMapsUrl = (label: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(label)}`

export default function Hero() {
  const heroRef = useRef<HTMLElement | null>(null)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [isPreparingImageSwitch, setIsPreparingImageSwitch] = useState(false)
  const [isMobileHero, setIsMobileHero] = useState(false)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const fadeOpacity = useTransform(scrollYProgress, [0, .62, 1], [0, .18, .72])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 44])
  const heroImages = useMemo(
    () => (isMobileHero && portraitHeroImages.length > 0 ? portraitHeroImages : landscapeHeroImages),
    [isMobileHero],
  )
  const activeImage = heroImages[activeImageIndex] ?? fallbackHeroImage
  const canControlHeroImages = heroImages.length > 1

  const showHeroImage = (nextIndex: number, prepare = true) => {
    if (heroImages.length < 1) return
    const normalizedIndex = (nextIndex + heroImages.length) % heroImages.length
    if (!prepare) {
      setActiveImageIndex(normalizedIndex)
      setIsPreparingImageSwitch(false)
      return
    }
    setIsPreparingImageSwitch(true)
    window.setTimeout(() => {
      setActiveImageIndex(normalizedIndex)
      setIsPreparingImageSwitch(false)
    }, HERO_PRE_SWITCH_MS)
  }

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)')
    const updateHeroMode = () => {
      setIsMobileHero(mediaQuery.matches)
      setActiveImageIndex(0)
      setIsPreparingImageSwitch(false)
    }
    updateHeroMode()
    mediaQuery.addEventListener('change', updateHeroMode)
    return () => mediaQuery.removeEventListener('change', updateHeroMode)
  }, [])

  useEffect(() => {
    if (heroImages.length < 2) return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return
    let switchTimer: number | undefined
    const timer = window.setInterval(() => {
      setIsPreparingImageSwitch(true)
      switchTimer = window.setTimeout(() => {
        setActiveImageIndex((current) => (current + 1) % heroImages.length)
        setIsPreparingImageSwitch(false)
      }, HERO_PRE_SWITCH_MS)
    }, HERO_ROTATION_MS)
    return () => {
      window.clearInterval(timer)
      if (switchTimer) window.clearTimeout(switchTimer)
    }
  }, [heroImages.length])

  useEffect(() => {
    if (heroImages.length < 2) return
    const nextImage = heroImages[(activeImageIndex + 1) % heroImages.length]
    if (!nextImage) return
    const preload = new Image()
    preload.decoding = 'async'
    preload.src = nextImage.src
  }, [activeImageIndex, heroImages])

  return (
    <section ref={heroRef} id="home" className={`hero-section relative flex min-h-screen items-center overflow-hidden pt-24 ${isPreparingImageSwitch ? 'hero-section-preparing' : ''}`}>
      <BlurredPhotoParallax image={(heroImages[0] ?? fallbackHeroImage).src} activeImage={activeImage.src} variant="hero" position={(heroImages[0] ?? fallbackHeroImage).position} activePosition={activeImage.position} />
      <div className="mesh-bg hero-photo-mesh"><div className="mesh-grid" /></div>
      <motion.div className="hero-scroll-transition" style={{ opacity: fadeOpacity }} aria-hidden="true" />
      <motion.a
        key={activeImage.label}
        className="hero-location-note"
        href={getGoogleMapsUrl(activeImage.label)}
        target="_blank"
        rel="noreferrer"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2.2, ease: [0.45, 0, 0.2, 1] }}
        aria-label={`Open ${activeImage.label} in Google Maps`}
      >
        {activeImage.label}
      </motion.a>
      {canControlHeroImages && (
        <div className="hero-photo-controls" aria-label="Hero photo controls">
          <button type="button" className="hero-photo-arrow" onClick={() => showHeroImage(activeImageIndex - 1, false)} aria-label="Previous hero photo"><ChevronLeft size={16} /></button>
          <div className="hero-photo-dots" aria-label="Choose hero photo">
            {heroImages.map((image, index) => (
              <button
                type="button"
                key={image.src}
                className={`hero-photo-dot ${index === activeImageIndex ? 'active' : ''}`}
                onClick={() => showHeroImage(index, false)}
                aria-label={`Show ${image.label} hero photo`}
                aria-current={index === activeImageIndex ? 'true' : undefined}
              />
            ))}
          </div>
          <button type="button" className="hero-photo-arrow" onClick={() => showHeroImage(activeImageIndex + 1, false)} aria-label="Next hero photo"><ChevronRight size={16} /></button>
        </div>
      )}
      <motion.div className="shell relative z-10 py-24 text-center" style={{ y: contentY }}>
        <motion.div className="hero-copy-lockup mx-auto max-w-5xl" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }}>
          <h1 className="gradient-text hero-name-light mx-auto max-w-5xl text-[clamp(3.2rem,10vw,7.5rem)] font-semibold leading-[.86] tracking-[-.075em]">Ashton Thomas</h1>
          <p className="hero-role mt-7 text-sm font-medium uppercase tracking-[.22em]">Software Development Engineer &middot; Amazon</p>
          <div className="hero-type mt-4 min-h-9 text-xl md:text-2xl">
            <TypeAnimation sequence={['Machine learning systems', 1700, 'Computer vision', 1700, 'Distributed infrastructure', 1700, 'Optimization & robotics', 1700]} repeat={Infinity} speed={45} />
            <span className="text-indigo-400">_</span>
          </div>
          <p className="hero-summary mx-auto mt-6 max-w-2xl text-base leading-7 md:text-lg">I design intelligent, reliable systems that turn ambitious ideas into useful software at scale.</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <a href="#/projects" className="primary-button hero-primary-button">Explore my work <ArrowDown size={15} /></a>
            <a href="#/contact" className="secondary-button">Start a conversation</a>
          </div>
          <div className="mt-8 flex justify-center gap-2">
            <a className="grid h-10 w-10 place-items-center rounded-full text-slate-500 transition hover:bg-white/5 hover:text-white" href="https://github.com/aethom00" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={18} /></a>
            <a className="grid h-10 w-10 place-items-center rounded-full text-slate-500 transition hover:bg-white/5 hover:text-white" href="#/contact" aria-label="LinkedIn"><Linkedin size={18} /></a>
            <a className="grid h-10 w-10 place-items-center rounded-full text-slate-500 transition hover:bg-white/5 hover:text-white" href="#/contact" aria-label="Email"><Mail size={18} /></a>
          </div>
        </motion.div>
      </motion.div>
      <a href="#/about" aria-label="Open about page" className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 text-slate-600 transition hover:text-slate-300"><ArrowDown size={18} /></a>
    </section>
  )
}
