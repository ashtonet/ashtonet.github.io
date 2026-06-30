const effects = [
  {
    id: '01',
    title: 'Water Shimmer',
    description: 'Restrained coastal light movement over the photo.',
    className: 'effect-water-shimmer',
  },
  {
    id: '02',
    title: 'Cinematic Letterbox',
    description: 'Film-still framing with dark bars, grain, and slow drift.',
    className: 'effect-letterbox',
  },
  {
    id: '03',
    title: 'Exposure Bloom',
    description: 'A dim photo gently opens up like a camera exposure.',
    className: 'effect-exposure-bloom',
  },
  {
    id: '04',
    title: 'Frosted Title Zone',
    description: 'Invisible glass around the hero text for a premium focus area.',
    className: 'effect-frosted-title',
  },
  {
    id: '05',
    title: 'Photo Reel Crossfade',
    description: 'Memory-like photo cycling simulated with layered image moods.',
    className: 'effect-photo-reel',
  },
  {
    id: '06',
    title: 'Light Behind Text',
    description: 'A soft highlight passes behind the title area only.',
    className: 'effect-title-light',
  },
  {
    id: '07',
    title: 'Cloud Veil',
    description: 'Airy cloudlike gradients drifting across the sky.',
    className: 'effect-cloud-veil',
  },
  {
    id: '08',
    title: 'Horizon Anchor',
    description: 'A composition-led treatment that darkens around the horizon.',
    className: 'effect-horizon-anchor',
  },
]

export default function VisualEffectsLab() {
  return (
    <section className="section min-h-screen pt-32">
      <div className="shell">
        <div className="max-w-3xl">
          <p className="eyebrow">Visual direction lab</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white md:text-6xl">Pick the atmosphere.</h1>
          <p className="mt-5 text-lg leading-8 text-slate-400">
            These are quick live previews for possible homepage background effects. They are intentionally small and numbered so you can choose a direction before we commit it to the real hero.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {effects.map((effect) => (
            <article key={effect.id} className="effect-lab-card">
              <div className={`effect-preview ${effect.className}`}>
                <div className="effect-photo" />
                <div className="effect-layer" />
                <div className="effect-extra" />
                <div className="effect-title">
                  <span>{effect.id}</span>
                  <strong>{effect.title}</strong>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3">
                  <span className="grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-white/[.04] text-xs font-bold text-slate-300">{effect.id}</span>
                  <h2 className="text-lg font-semibold text-white">{effect.title}</h2>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-500">{effect.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
