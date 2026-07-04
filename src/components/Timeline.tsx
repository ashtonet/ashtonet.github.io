import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react'
import { type KeyboardEvent as ReactKeyboardEvent, type WheelEvent as ReactWheelEvent, useEffect, useMemo, useRef, useState } from 'react'

type TimelineEvent = {
  dateLabel: string
  sortDate: string
  title: string
  text: string
  kind: 'photo' | 'milestone'
  image?: string
  imagePosition?: string
  place?: string
  meta?: string
}

const photoEvents: TimelineEvent[] = [
  {
    dateLabel: 'May 7, 2025',
    sortDate: '2025-05-07T00:00:00',
    title: 'Gibraltar',
    text: 'Travel photo from the landscape hero collection.',
    kind: 'photo',
    image: '/images/hero-landscape/Gibraltar.JPG',
    imagePosition: 'center 48%',
    place: 'GIBRALTAR',
  },
  {
    dateLabel: 'May 19, 2025',
    sortDate: '2025-05-19T00:00:00',
    title: 'Malbun',
    text: 'Travel photo from the landscape hero collection.',
    kind: 'photo',
    image: '/images/hero-landscape/Malbun.JPG',
    imagePosition: 'center 48%',
    place: 'MALBUN',
  },
  {
    dateLabel: 'March 1, 2023',
    sortDate: '2023-03-01T23:15:00',
    title: 'Gros Piton',
    text: 'Travel photo from the landscape hero collection.',
    kind: 'photo',
    image: '/images/hero-landscape/Gros_Piton.jpeg',
    imagePosition: 'center 48%',
    place: 'GROS PITON',
  },
  {
    dateLabel: 'March 4, 2023',
    sortDate: '2023-03-04T01:09:00',
    title: 'Marigot',
    text: 'Travel photo from the landscape hero collection.',
    kind: 'photo',
    image: '/images/hero-landscape/Marigot.jpeg',
    imagePosition: 'center 48%',
    place: 'MARIGOT',
  },
  {
    dateLabel: 'June 9, 2023',
    sortDate: '2023-06-09T15:46:00',
    title: 'Vienna',
    text: 'Travel photo from the portrait hero collection.',
    kind: 'photo',
    image: '/images/hero-portrait/Vienna.jpeg',
    imagePosition: 'center 42%',
    place: 'VIENNA',
  },
  {
    dateLabel: 'May 3, 2024',
    sortDate: '2024-05-03T19:22:00',
    title: 'Tokyo',
    text: 'Travel photo from the portrait hero collection.',
    kind: 'photo',
    image: '/images/hero-portrait/Tokyo.jpeg',
    imagePosition: 'center 42%',
    place: 'TOKYO',
  },
  {
    dateLabel: 'May 5, 2024',
    sortDate: '2024-05-05T03:37:00',
    title: 'Fuji',
    text: 'Travel photo from the landscape hero collection.',
    kind: 'photo',
    image: '/images/hero-landscape/Fuji.jpeg',
    imagePosition: 'center 48%',
    place: 'FUJI',
  },
  {
    dateLabel: 'May 6, 2024',
    sortDate: '2024-05-06T04:59:00',
    title: 'Sapporo',
    text: 'Travel photo from the portrait hero collection.',
    kind: 'photo',
    image: '/images/hero-portrait/Sapporo.jpeg',
    imagePosition: 'center 42%',
    place: 'SAPPORO',
  },
  {
    dateLabel: 'May 6, 2024',
    sortDate: '2024-05-06T05:02:00',
    title: 'Sapporo',
    text: 'Travel photo from the landscape hero collection.',
    kind: 'photo',
    image: '/images/hero-landscape/Sapporo.jpeg',
    imagePosition: 'center 48%',
    place: 'SAPPORO',
  },
  {
    dateLabel: 'May 7, 2024',
    sortDate: '2024-05-07T15:13:00',
    title: 'Hill of the Buddha',
    text: 'Travel photo from the portrait hero collection.',
    kind: 'photo',
    image: '/images/hero-portrait/Hill_of_the_Buddha.jpeg',
    imagePosition: 'center 42%',
    place: 'HILL OF THE BUDDHA',
  },
  {
    dateLabel: 'May 10, 2024',
    sortDate: '2024-05-10T04:47:00',
    title: 'Osaka',
    text: 'Travel photo from the landscape hero collection.',
    kind: 'photo',
    image: '/images/hero-landscape/Osaka.jpeg',
    imagePosition: 'center 48%',
    place: 'OSAKA',
  },
  {
    dateLabel: 'May 11, 2024',
    sortDate: '2024-05-11T02:12:00',
    title: 'Kyoto',
    text: 'Travel photo from the portrait hero collection.',
    kind: 'photo',
    image: '/images/hero-portrait/Kyoto.jpeg',
    imagePosition: 'center 42%',
    place: 'KYOTO',
  },
  {
    dateLabel: 'May 12, 2024',
    sortDate: '2024-05-12T01:56:00',
    title: 'Matsuyama',
    text: 'Travel photo from the landscape hero collection.',
    kind: 'photo',
    image: '/images/hero-landscape/Matsuyama.jpeg',
    imagePosition: 'center 48%',
    place: 'MATSUYAMA',
  },
  {
    dateLabel: 'December 12, 2024',
    sortDate: '2024-12-12T22:48:00',
    title: 'Sydney Zoo',
    text: 'Travel photo from the portrait hero collection.',
    kind: 'photo',
    image: '/images/hero-portrait/Sydney_Zoo.jpeg',
    imagePosition: 'center 42%',
    place: 'SYDNEY ZOO',
  },
  {
    dateLabel: 'December 13, 2024',
    sortDate: '2024-12-13T05:55:00',
    title: 'Sydney',
    text: 'Travel photo from the landscape hero collection.',
    kind: 'photo',
    image: '/images/hero-landscape/Sydney.jpeg',
    imagePosition: 'center 48%',
    place: 'SYDNEY',
  },
  {
    dateLabel: 'December 13, 2024',
    sortDate: '2024-12-13T05:55:01',
    title: 'Sydney',
    text: 'Travel photo from the portrait hero collection.',
    kind: 'photo',
    image: '/images/hero-portrait/Sydney.jpeg',
    imagePosition: 'center 42%',
    place: 'SYDNEY',
  },
  {
    dateLabel: 'May 12, 2024',
    sortDate: '2024-05-12T00:00:00',
    title: 'Downtown Matsuyama',
    text: 'Travel photo from the landscape hero collection.',
    kind: 'photo',
    image: '/images/hero-landscape/Downtown_Matsuyama.jpg',
    imagePosition: 'center 48%',
    place: 'DOWNTOWN MATSUYAMA',
  },
  {
    dateLabel: 'December 11, 2024',
    sortDate: '2024-12-11T00:00:00',
    title: 'Honolulu',
    text: 'Travel photo from the landscape hero collection.',
    kind: 'photo',
    image: '/images/hero-landscape/Honolulu.jpg',
    imagePosition: 'center 48%',
    place: 'HONOLULU',
  },
  {
    dateLabel: 'May 26, 2024',
    sortDate: '2024-05-26T00:00:00',
    title: 'Singapore',
    text: 'Travel photo from the portrait hero collection.',
    kind: 'photo',
    image: '/images/hero-portrait/Singapore.jpeg',
    imagePosition: 'center 42%',
    place: 'SINGAPORE',
  },
  {
    dateLabel: 'July 1, 2023',
    sortDate: '2023-07-01T00:00:00',
    title: 'Vatican',
    text: 'Travel photo from the landscape hero collection.',
    kind: 'photo',
    image: '/images/hero-landscape/Vatican.jpeg',
    imagePosition: 'center 48%',
    place: 'VATICAN',
  },
  {
    dateLabel: 'May 19, 2024',
    sortDate: '2024-05-19T00:00:00',
    title: 'Hanoi',
    text: 'Travel photo from the portrait hero collection.',
    kind: 'photo',
    image: '/images/hero-portrait/Hanoi.png',
    imagePosition: 'center 42%',
    place: 'HANOI',
  },
  {
    dateLabel: 'July 7, 2023',
    sortDate: '2023-07-07T00:00:00',
    title: 'San Marino',
    text: 'Travel photo from the portrait hero collection.',
    kind: 'photo',
    image: '/images/hero-portrait/San_Marino.jpeg',
    imagePosition: 'center 42%',
    place: 'SAN MARINO',
  },
  {
    dateLabel: 'July 3, 2023',
    sortDate: '2023-07-03T00:00:00',
    title: 'Victoria',
    text: 'Travel photo from the portrait hero collection.',
    kind: 'photo',
    image: '/images/hero-portrait/Victoria.jpeg',
    imagePosition: 'center 42%',
    place: 'VICTORIA',
  },
]

const milestoneEvents: TimelineEvent[] = [
  {
    dateLabel: 'June 2022',
    sortDate: '2022-06-01T00:00:00',
    title: 'High school diploma',
    text: 'Graduated from high school before completing an accelerated early-college path.',
    kind: 'milestone',
    image: '/images/academic-photos/Highschool_Graduation.jpeg',
    imagePosition: 'center 45%',
    place: 'HIGH SCHOOL GRADUATION',
    meta: 'Education',
  },
  {
    dateLabel: 'June 2022',
    sortDate: '2022-06-01T00:00:01',
    title: 'Associate’s degree',
    text: 'Completed an Associate Degree in Liberal Arts at Northwestern Michigan College.',
    kind: 'milestone',
    meta: 'Education',
  },
  {
    dateLabel: 'September 2024',
    sortDate: '2024-09-01T00:00:00',
    title: 'Polk Lab',
    text: 'Started computational neuroscience research work at the University of Michigan Polk Lab.',
    kind: 'milestone',
    meta: 'Research',
  },
  {
    dateLabel: 'September 2024',
    sortDate: '2024-09-01T00:00:01',
    title: 'Amazon internship',
    text: 'Completed a Fall 2024 SDE internship on Alexa endpoint experiences in Boston.',
    kind: 'milestone',
    meta: 'Experience',
  },
  {
    dateLabel: 'May 2025',
    sortDate: '2025-05-01T00:00:00',
    title: 'Bachelor’s degree',
    text: 'Earned a B.S.E. in Computer Science Engineering with a minor in International Engineering from the University of Michigan College of Engineering.',
    kind: 'milestone',
    image: '/images/academic-photos/Bachelors_Graduation.jpeg',
    imagePosition: 'center 45%',
    place: 'UNIVERSITY OF MICHIGAN',
    meta: 'Education',
  },
  {
    dateLabel: 'June 2025',
    sortDate: '2025-06-01T00:00:00',
    title: 'Amazon full-time',
    text: 'Started full-time at AWS, working on developer-insights platforms, observability, data pipelines, and AI-assisted engineering tooling.',
    kind: 'milestone',
    meta: 'Experience',
  },
  {
    dateLabel: 'May 2026',
    sortDate: '2026-05-01T00:00:00',
    title: 'Master’s degree',
    text: 'Completed an M.S.E. in Computer Engineering with a Computer Vision Concentration through the University of Michigan Rackham Graduate School and College of Engineering.',
    kind: 'milestone',
    meta: 'Education',
  },
]

const events = [...photoEvents, ...milestoneEvents].sort((a, b) => a.sortDate.localeCompare(b.sortDate))
const imageEvents = events.filter((event) => event.image)

export default function Timeline() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [fullscreenEvent, setFullscreenEvent] = useState<TimelineEvent | null>(null)
  const sectionRef = useRef<HTMLElement | null>(null)
  const eventRefs = useRef<Array<HTMLDivElement | null>>([])
  const activeIndexRef = useRef(0)
  const suppressViewportSelectionUntil = useRef(0)
  const lastWheelStepAt = useRef(0)
  const wheelCorrectionTimeout = useRef<number | null>(null)
  const activeEvent = events[activeIndex] ?? events[0]
  const nextImage = useMemo(() => events.slice(activeIndex + 1).find((event) => event.image)?.image, [activeIndex])
  const fullscreenImageIndex = fullscreenEvent ? imageEvents.findIndex((event) => event.image === fullscreenEvent.image && event.sortDate === fullscreenEvent.sortDate) : -1

  useEffect(() => () => {
    if (wheelCorrectionTimeout.current !== null) window.clearTimeout(wheelCorrectionTimeout.current)
  }, [])

  const showFullscreenNeighbor = (direction: 1 | -1) => {
    if (!fullscreenEvent || imageEvents.length === 0) return
    const currentIndex = fullscreenImageIndex >= 0 ? fullscreenImageIndex : 0
    const nextIndex = (currentIndex + direction + imageEvents.length) % imageEvents.length
    setFullscreenEvent(imageEvents[nextIndex])
  }

  useEffect(() => {
    if (!fullscreenEvent) return undefined

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setFullscreenEvent(null)
      if (event.key === 'ArrowLeft') showFullscreenNeighbor(-1)
      if (event.key === 'ArrowRight') showFullscreenNeighbor(1)
    }

    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [fullscreenEvent, fullscreenImageIndex])

  const centerSelectedEvent = (behavior: ScrollBehavior = 'smooth') => {
    const node = eventRefs.current[activeIndexRef.current]
    if (!node) return
    node.focus({ preventScroll: true })
    node.scrollIntoView({ behavior, block: 'center' })
  }

  const scheduleWheelCorrection = () => {
    if (wheelCorrectionTimeout.current !== null) window.clearTimeout(wheelCorrectionTimeout.current)
    wheelCorrectionTimeout.current = window.setTimeout(() => {
      suppressViewportSelectionUntil.current = window.performance.now() + 450
      centerSelectedEvent('smooth')
    }, 180)
  }

  const selectEvent = (index: number, behavior: ScrollBehavior = 'smooth') => {
    const boundedIndex = Math.min(Math.max(index, 0), events.length - 1)
    activeIndexRef.current = boundedIndex
    suppressViewportSelectionUntil.current = window.performance.now() + 650
    setActiveIndex(boundedIndex)
    window.requestAnimationFrame(() => {
      centerSelectedEvent(behavior)
    })
  }

  const getKeyTargetIndex = (key: string, index: number) => {
    const keyActions: Record<string, number> = {
      ArrowDown: index + 1,
      ArrowRight: index + 1,
      PageDown: index + 3,
      ArrowUp: index - 1,
      ArrowLeft: index - 1,
      PageUp: index - 3,
      Home: 0,
      End: events.length - 1,
    }

    return keyActions[key]
  }

  const handleTimelineKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>, index: number) => {
    const nextIndex = getKeyTargetIndex(event.key, index)
    if (nextIndex === undefined) return
    event.preventDefault()
    event.stopPropagation()
    selectEvent(nextIndex)
  }

  const handleTimelineWheel = (event: ReactWheelEvent<HTMLElement>) => {
    if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return

    const direction = event.deltaY > 0 ? 1 : -1
    const nextIndex = activeIndexRef.current + direction
    if (nextIndex < 0 || nextIndex >= events.length) return

    event.preventDefault()
    scheduleWheelCorrection()
    const now = window.performance.now()
    if (now - lastWheelStepAt.current < 260) return

    lastWheelStepAt.current = now
    selectEvent(nextIndex, 'auto')
  }

  return (
    <section id="timeline" className="section" ref={sectionRef} onWheel={handleTimelineWheel}>
      <div className="shell">
        <div className="eyebrow">Timeline</div>
        <h2 className="section-title">A path through work, school, and places.</h2>

        <div className="timeline-journey mt-14">
          <div className="relative">
            <div className="timeline-line absolute bottom-0 left-[5.95rem] top-0 w-px sm:left-[7.95rem]" />
            {events.map((event, i) => (
              <motion.div
                key={`${event.sortDate}-${event.title}-${event.image ?? event.kind}`}
                initial={{ opacity: 0, x: -18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: .72 }}
                transition={{ delay: Math.min(i, 4) * .04 }}
                onViewportEnter={() => {
                  if (window.performance.now() < suppressViewportSelectionUntil.current) return
                  activeIndexRef.current = i
                  setActiveIndex(i)
                }}
                onMouseEnter={() => {
                  activeIndexRef.current = i
                  setActiveIndex(i)
                }}
                onFocus={() => {
                  activeIndexRef.current = i
                  setActiveIndex(i)
                }}
                onKeyDown={(event) => handleTimelineKeyDown(event, i)}
                ref={(node) => { eventRefs.current[i] = node }}
                tabIndex={0}
                role="button"
                aria-label={`${event.dateLabel}: ${event.title}. Use arrow keys to move through the timeline.`}
                className={`timeline-event relative grid grid-cols-[5.5rem_1fr] gap-8 pb-12 sm:grid-cols-[7.5rem_1fr] ${activeIndex === i ? 'timeline-event-active' : ''}`}
              >
                <div className="pt-1 text-right text-sm font-medium text-indigo-300">{event.dateLabel}</div>
                <div className="relative pl-4">
                  <span className="timeline-dot absolute -left-[.46rem] top-1.5 h-3 w-3 rounded-full border-2 border-indigo-400 bg-[#030712] shadow-[0_0_18px_rgba(99,102,241,.7)]" />
                  <div className="timeline-event-card">
                    {event.image && (
                      <div className="timeline-mobile-photo mb-4 overflow-hidden rounded-2xl border border-white/10 md:hidden">
                        <img
                          src={event.image}
                          alt={`${event.place ?? event.title} timeline photograph`}
                          loading="lazy"
                          decoding="async"
                          className="h-44 w-full object-cover"
                          style={{ objectPosition: event.imagePosition }}
                        />
                        <button
                          type="button"
                          className="timeline-photo-expand timeline-photo-expand-mobile"
                          onClick={(clickEvent) => {
                            clickEvent.stopPropagation()
                            setFullscreenEvent(event)
                          }}
                          aria-label={`View ${event.place ?? event.title} photo fullscreen`}
                        >
                          <Maximize2 size={16} aria-hidden="true" />
                        </button>
                      </div>
                    )}
                    <div className="mb-3 inline-flex rounded-full border border-white/10 bg-white/[.04] px-2.5 py-1 text-[.62rem] font-bold uppercase tracking-[.18em] text-slate-400">{event.kind === 'photo' ? 'Photo' : event.meta}</div>
                    <h3 className="font-semibold text-white">{event.title}</h3>
                    <p className="mt-2 leading-6 text-slate-500">{event.text}</p>
                    <div className="mt-4 text-[.65rem] font-bold uppercase tracking-[.24em] text-indigo-300/80">{event.meta ?? event.place}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <aside className="timeline-photo-rail" aria-label="Timeline photograph">
            <div className={`timeline-photo-frame ${activeEvent.image ? '' : 'timeline-photo-frame-empty'}`}>
              <AnimatePresence mode="wait">
                {activeEvent.image ? (
                  <motion.div
                    key={activeEvent.image}
                    className="timeline-photo-stage"
                    initial={{ opacity: 0, scale: 1.035 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: .985 }}
                    transition={{ duration: .75, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <img
                      src={activeEvent.image}
                      alt={`${activeEvent.place ?? activeEvent.title} timeline photograph`}
                      loading="lazy"
                      decoding="async"
                      className="timeline-photo"
                      style={{ objectPosition: activeEvent.imagePosition }}
                    />
                    <button
                      type="button"
                      className="timeline-photo-expand"
                      onClick={() => setFullscreenEvent(activeEvent)}
                      aria-label={`View ${activeEvent.place ?? activeEvent.title} photo fullscreen`}
                    >
                      <Maximize2 size={17} aria-hidden="true" />
                      <span>View</span>
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key={`${activeEvent.sortDate}-${activeEvent.title}`}
                    className="timeline-photo-placeholder"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: .45 }}
                  >
                    <span>{activeEvent.meta}</span>
                    <strong>Photo coming later</strong>
                    <p>Add an image for this milestone whenever you want, and we can wire it in here.</p>
                  </motion.div>
                )}
              </AnimatePresence>
              {nextImage && <link rel="prefetch" as="image" href={nextImage} />}
              <div className="timeline-photo-glow" />
              <div className="timeline-photo-caption">
                <span>{activeEvent.dateLabel}</span>
                <strong>{activeEvent.place ?? activeEvent.title}</strong>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <AnimatePresence>
        {fullscreenEvent?.image && (
          <motion.div
            className="timeline-fullscreen"
            role="dialog"
            aria-modal="true"
            aria-label={`${fullscreenEvent.place ?? fullscreenEvent.title} fullscreen timeline photo`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setFullscreenEvent(null)}
          >
            <button
              type="button"
              className="timeline-fullscreen-close"
              onClick={() => setFullscreenEvent(null)}
              aria-label="Close fullscreen photo"
            >
              <X size={20} aria-hidden="true" />
            </button>
            <button
              type="button"
              className="timeline-fullscreen-nav timeline-fullscreen-nav-prev"
              onClick={(event) => {
                event.stopPropagation()
                showFullscreenNeighbor(-1)
              }}
              aria-label="Previous timeline photo"
            >
              <ChevronLeft size={26} aria-hidden="true" />
            </button>
            <button
              type="button"
              className="timeline-fullscreen-nav timeline-fullscreen-nav-next"
              onClick={(event) => {
                event.stopPropagation()
                showFullscreenNeighbor(1)
              }}
              aria-label="Next timeline photo"
            >
              <ChevronRight size={26} aria-hidden="true" />
            </button>
            <motion.img
              key={fullscreenEvent.image}
              src={fullscreenEvent.image}
              alt={`${fullscreenEvent.place ?? fullscreenEvent.title} fullscreen timeline photograph`}
              className="timeline-fullscreen-image"
              initial={{ opacity: 0, scale: .96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: .98 }}
              transition={{ duration: .35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
            />
            <div className="timeline-fullscreen-caption">
              <span>{fullscreenEvent.dateLabel}</span>
              <strong>{fullscreenEvent.place ?? fullscreenEvent.title}</strong>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
