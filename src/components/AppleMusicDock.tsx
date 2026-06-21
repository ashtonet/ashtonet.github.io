import { Headphones, Music2 } from 'lucide-react'

export default function AppleMusicDock() {
  const openMusic = () => {
    const scrollToMusic = () => {
      const music = document.getElementById('music')
      if (!music) return false
      music.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return true
    }

    if (scrollToMusic()) return

    window.location.hash = '#/'
    let attempts = 0
    const waitForHome = window.setInterval(() => {
      attempts += 1
      if (scrollToMusic() || attempts > 20) window.clearInterval(waitForHome)
    }, 75)
  }

  return (
    <button type="button" onClick={openMusic} className="group fixed bottom-3 left-3 z-[60] flex cursor-pointer items-center rounded-full border border-white/15 bg-[#100914]/90 p-1 text-white shadow-[0_14px_45px_rgba(250,45,101,.24)] backdrop-blur-xl transition hover:border-rose-300/40 hover:bg-[#170c1c] focus-visible:border-rose-300/50 sm:bottom-5 sm:left-5 sm:p-1.5" aria-label="Jump to my Apple Music activity" aria-describedby="apple-music-tooltip">
      <span className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-full bg-gradient-to-br from-[#fa2d65] via-[#d72a7d] to-[#8737bd] sm:h-11 sm:w-11">
        <span className="absolute inset-0 animate-pulse rounded-full bg-white/10" />
        <Music2 size={20} className="relative" />
      </span>
      <span id="apple-music-tooltip" role="tooltip" className="pointer-events-none absolute left-[calc(100%+.65rem)] grid translate-x-[-.35rem] whitespace-nowrap rounded-xl border border-white/10 bg-[#100914]/95 px-3 py-2 text-left opacity-0 shadow-xl backdrop-blur-xl transition duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100">
        <span className="text-[.62rem] font-semibold uppercase tracking-[.14em] text-rose-300">Listening lately</span>
        <span className="flex items-center gap-1.5 text-xs text-slate-300"><Headphones size={12} /> Apple Music</span>
      </span>
    </button>
  )
}
