import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import { type ComponentProps, useEffect, useRef } from 'react'

type BlurredPhotoParallaxProps = {
  image: string
  activeImage?: string
  variant?: 'hero' | 'section' | 'travel'
  position?: string
  activePosition?: string
}

export default function BlurredPhotoParallax({ image, activeImage, variant = 'section', position = 'center', activePosition }: BlurredPhotoParallaxProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const defaultY = useTransform(scrollYProgress, [0, 1], [-90, 90])
  const heroY = useTransform(scrollYProgress, [0, 1], [-18, 18])
  const defaultScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.18])
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.018])
  const y = variant === 'hero' ? heroY : defaultY
  const scale = variant === 'hero' ? heroScale : defaultScale
  const pointerX = useMotionValue(50)
  const pointerY = useMotionValue(45)
  const smoothX = useSpring(pointerX, { stiffness: 80, damping: 24, mass: .35 })
  const smoothY = useSpring(pointerY, { stiffness: 80, damping: 24, mass: .35 })
  const spotlightX = useTransform(smoothX, (value) => `${value}%`)
  const spotlightY = useTransform(smoothY, (value) => `${value}%`)
  const visibleImage = activeImage ?? image
  const visiblePosition = activePosition ?? position

  useEffect(() => {
    if (variant !== 'hero') return
    const updatePointer = (event: PointerEvent) => {
      const rect = ref.current?.getBoundingClientRect()
      if (!rect) return
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) {
        pointerX.set(50)
        pointerY.set(45)
        return
      }
      const x = ((event.clientX - rect.left) / rect.width) * 100
      const y = ((event.clientY - rect.top) / rect.height) * 100
      pointerX.set(Math.min(100, Math.max(0, x)))
      pointerY.set(Math.min(100, Math.max(0, y)))
    }
    window.addEventListener('pointermove', updatePointer, { passive: true })
    return () => window.removeEventListener('pointermove', updatePointer)
  }, [pointerX, pointerY, variant])

  return (
    <div ref={ref} className={`photo-parallax photo-parallax-${variant}`} aria-hidden="true">
      <AnimatePresence initial={false}>
        <motion.div
          key={`base-${visibleImage}`}
          className="photo-parallax-image"
          initial={variant === 'hero' ? { opacity: 0 } : undefined}
          animate={variant === 'hero' ? { opacity: .78 } : undefined}
          exit={variant === 'hero' ? { opacity: 0 } : undefined}
          transition={variant === 'hero' ? { duration: 5.2, ease: [0.45, 0, 0.2, 1] } : undefined}
          style={{ backgroundImage: `url(${visibleImage})`, backgroundPosition: visiblePosition, y, scale }}
        />
      </AnimatePresence>
      {variant === 'hero' && (
        <>
          <AnimatePresence initial={false}>
            <motion.div
              key={`focus-${visibleImage}`}
              className="photo-parallax-focus-image"
              initial={{ opacity: 0 }}
              animate={{ opacity: .68 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 5.2, ease: [0.45, 0, 0.2, 1] }}
              style={{
                backgroundImage: `url(${visibleImage})`,
                backgroundPosition: visiblePosition,
                y,
                scale,
                '--spotlight-x': spotlightX,
                '--spotlight-y': spotlightY,
              } as unknown as ComponentProps<typeof motion.div>['style']}
            />
          </AnimatePresence>
          <motion.div
            className="photo-parallax-camera-light"
            style={{
              '--spotlight-x': spotlightX,
              '--spotlight-y': spotlightY,
            } as unknown as ComponentProps<typeof motion.div>['style']}
          />
        </>
      )}
      <div className="photo-parallax-routes" />
      <div className="photo-parallax-shade" />
    </div>
  )
}
