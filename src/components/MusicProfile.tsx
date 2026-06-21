import { motion } from 'framer-motion'
import { ArrowUpRight, Headphones, LoaderCircle, Music2 } from 'lucide-react'
import { useEffect, useState } from 'react'

const appleProfileUrl = 'https://music.apple.com/profile/thomasash2003'
const bars = [10, 18, 27, 15, 23, 32, 19, 28, 13, 24, 17, 30]

type Track = {
  name: string
  artist: string
  album: string
  image: string
  url: string
  nowPlaying: boolean
}

type Artist = { name: string, playcount: string, url: string }
type ListeningData = { tracks: Track[], artists: Artist[] }

function imageFrom(images?: { '#text': string }[]) {
  return [...(images ?? [])].reverse().find((image) => image['#text'])?.['#text'] ?? ''
}

function appleSearchUrl(term: string) {
  return `https://music.apple.com/us/search?term=${encodeURIComponent(term)}`
}

async function findOnAppleMusic(track: Track): Promise<Track> {
  try {
    const term = encodeURIComponent(`${track.artist} ${track.name}`)
    const response = await fetch(`https://itunes.apple.com/search?term=${term}&entity=song&limit=1`)
    if (!response.ok) return track
    const result = (await response.json()).results?.[0]
    if (!result) return track
    return {
      ...track,
      image: result.artworkUrl100?.replace('100x100bb', '600x600bb') || track.image,
      url: result.trackViewUrl || appleSearchUrl(`${track.artist} ${track.name}`),
    }
  } catch {
    return track
  }
}

export default function MusicProfile() {
  const [data, setData] = useState<ListeningData>({ tracks: [], artists: [] })
  const [loading, setLoading] = useState(Boolean(import.meta.env.VITE_LASTFM_API_KEY))
  const [available, setAvailable] = useState(Boolean(import.meta.env.VITE_LASTFM_API_KEY))

  useEffect(() => {
    const apiKey = import.meta.env.VITE_LASTFM_API_KEY
    const username = import.meta.env.VITE_LASTFM_USERNAME || 'aethom00'
    if (!apiKey) return

    const endpoint = 'https://ws.audioscrobbler.com/2.0/'
    const request = (method: string, extra = '') => fetch(`${endpoint}?method=${method}&user=${encodeURIComponent(username)}&api_key=${apiKey}&format=json${extra}`).then((response) => {
      if (!response.ok) throw new Error('Last.fm request failed')
      return response.json()
    })

    Promise.all([
      request('user.getRecentTracks', '&limit=6'),
      request('user.getTopArtists', '&period=7day&limit=5'),
    ]).then(async ([recent, top]) => {
      const rawTracks: Track[] = (recent.recenttracks?.track ?? []).map((track: { name: string, artist: { '#text': string }, album: { '#text': string }, image: { '#text': string }[], '@attr'?: { nowplaying?: string } }) => ({
        name: track.name,
        artist: track.artist['#text'],
        album: track.album['#text'],
        image: imageFrom(track.image),
        url: appleSearchUrl(`${track.artist['#text']} ${track.name}`),
        nowPlaying: track['@attr']?.nowplaying === 'true',
      }))
      const tracks = await Promise.all(rawTracks.map(findOnAppleMusic))
      const artists: Artist[] = (top.topartists?.artist ?? []).map((artist: { name: string, playcount: string }) => ({ name: artist.name, playcount: artist.playcount, url: appleSearchUrl(artist.name) }))
      setData({ tracks, artists })
      setAvailable(true)
    }).catch(() => setAvailable(false)).finally(() => setLoading(false))
  }, [])

  const leadTrack = data.tracks[0]

  return (
    <section id="music" className="section" aria-labelledby="music-profile-title">
      <div className="shell">
        <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} className="relative overflow-hidden rounded-[1.35rem] border border-rose-400/15 bg-[#0b0710] shadow-[0_30px_100px_rgba(0,0,0,.35)] sm:rounded-[2rem]">
          <div className="grid md:grid-cols-[.78fr_1.22fr]">
            <div className="relative min-h-[17rem] overflow-hidden bg-gradient-to-br from-[#fa2d65] via-[#b82891] to-[#5a32a3] p-5 sm:min-h-80 sm:p-10 md:min-h-[29rem]">
              {leadTrack?.image && <img src={leadTrack.image} alt="" className="absolute inset-0 h-full w-full scale-110 object-cover opacity-45 blur-2xl" />}
              <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/10 to-black/55" />
              <div className="relative flex min-h-[13.5rem] flex-col justify-between sm:min-h-[17rem] md:min-h-[24rem]">
                <div className="flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-[.18em] text-white/80"><span className="flex items-center gap-2"><Music2 size={16} /> Apple Music</span>{leadTrack?.nowPlaying && <span className="rounded-full bg-white/15 px-3 py-1.5 text-[.62rem] tracking-[.14em] backdrop-blur">Now playing</span>}</div>
                <div>
                  {leadTrack?.image && <a href={leadTrack.url} target="_blank" rel="noreferrer"><img src={leadTrack.image} alt={`${leadTrack.name} artwork`} className="mb-4 h-24 w-24 rounded-xl object-cover shadow-2xl ring-1 ring-white/20 transition hover:scale-[1.03] sm:mb-6 sm:h-28 sm:w-28 sm:rounded-2xl" /></a>}
                  <div className="flex h-10 items-end gap-1.5" aria-hidden="true">{bars.map((height, index) => <span key={index} className="music-bar w-1.5 rounded-full bg-white/85" style={{ height, animationDelay: `${index * -.11}s` }} />)}</div>
                  {leadTrack ? <div className="mt-5"><p className="text-lg font-semibold text-white">{leadTrack.name}</p><p className="mt-1 text-sm text-white/70">{leadTrack.artist}{leadTrack.album ? ` · ${leadTrack.album}` : ''}</p></div> : <p className="mt-5 text-sm text-white/70">A small window into what’s in my headphones.</p>}
                </div>
              </div>
            </div>

            <div className="relative p-5 py-7 sm:p-10 lg:p-12">
              <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-rose-500/10 blur-3xl" />
              <div className="relative">
                <div className="eyebrow before:bg-gradient-to-r before:from-rose-400 before:to-fuchsia-500">Listening lately</div>
                <h2 id="music-profile-title" className="mt-4 text-4xl font-semibold tracking-[-.045em] text-white sm:text-5xl">What’s been on repeat.</h2>

                {loading && <div className="mt-10 flex items-center gap-3 text-sm text-slate-500"><LoaderCircle size={17} className="animate-spin" /> Loading recent listens…</div>}

                {leadTrack && <a href={leadTrack.url} target="_blank" rel="noreferrer" className="mt-6 flex items-center gap-3 rounded-2xl border border-white/[.08] bg-white/[.04] p-3 transition active:bg-white/[.08] lg:hidden">
                  {leadTrack.image ? <img src={leadTrack.image} alt="" className="h-14 w-14 shrink-0 rounded-xl object-cover" /> : <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-white/[.06]"><Music2 size={18} /></span>}
                  <span className="min-w-0 flex-1"><span className="block text-[.62rem] font-semibold uppercase tracking-[.14em] text-rose-300">{leadTrack.nowPlaying ? 'Now playing' : 'Most recent'}</span><span className="mt-1 block truncate text-sm font-semibold text-white">{leadTrack.name}</span><span className="mt-0.5 block truncate text-xs text-slate-400">{leadTrack.artist}{leadTrack.album ? ` · ${leadTrack.album}` : ''}</span></span>
                  <ArrowUpRight size={15} className="shrink-0 text-slate-500" />
                </a>}

                {!loading && available && data.tracks.length > 0 && <div className="mt-6 grid gap-7 sm:mt-8 lg:grid-cols-[1.2fr_.8fr]">
                  <div>
                    <p className="text-[.68rem] font-semibold uppercase tracking-[.16em] text-slate-500">Recent tracks</p>
                    <div className="mt-3 space-y-2">{data.tracks.slice(leadTrack?.nowPlaying ? 1 : 0, 4).map((track) => <a key={`${track.name}-${track.artist}`} href={track.url} target="_blank" rel="noreferrer" className="group flex items-center gap-3 rounded-xl p-2 transition hover:bg-white/[.05]">{track.image ? <img src={track.image} alt="" className="h-11 w-11 rounded-lg object-cover" /> : <span className="grid h-11 w-11 place-items-center rounded-lg bg-white/5"><Music2 size={16} /></span>}<span className="min-w-0"><span className="block truncate text-sm font-medium text-slate-200 group-hover:text-white">{track.name}</span><span className="mt-1 block truncate text-xs text-slate-500">{track.artist}</span></span></a>)}</div>
                  </div>
                  <div>
                    <p className="text-[.68rem] font-semibold uppercase tracking-[.16em] text-slate-500">Top artists · 7 days</p>
                    <ol className="mt-4 space-y-3">{data.artists.map((artist, index) => <li key={artist.name}><a href={artist.url} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-sm transition hover:text-white"><span className="w-4 text-xs text-slate-600">{index + 1}</span><span className="min-w-0 flex-1 truncate text-slate-300">{artist.name}</span><span className="text-[.65rem] text-slate-600">{artist.playcount} plays</span></a></li>)}</ol>
                  </div>
                </div>}

                {!loading && (!available || data.tracks.length === 0) && <p className="mt-5 max-w-xl leading-7 text-slate-400">Music follows me through coding sessions, long drives, and everything between. Browse my public profile to see the playlists and music I’m sharing.</p>}

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <a href={appleProfileUrl} target="_blank" rel="noreferrer" className="secondary-button w-full sm:w-auto"><Headphones size={16} /> Apple Music <ArrowUpRight size={15} /></a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
