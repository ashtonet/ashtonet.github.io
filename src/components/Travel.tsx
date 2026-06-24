import { motion } from 'framer-motion'
import { Globe2, Home, MapPin, Search, X } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { travelPlaces, type TravelPlace } from '../data/travelPlaces'
import { correctedCountryShapes } from '../data/correctedCountries'
import { detailedCanadaShape } from '../data/detailedCanada'
import { alpineDetailedCountryShapes } from '../data/detailedAlpineCountries'
import { detailedCyprusAndPuertoRicoShapes } from '../data/detailedCyprusAndPuertoRico'
import { detailedCountryShapes } from '../data/detailedCountries'
import { extendedDetailedCountryShapes } from '../data/detailedCountriesExtended'
import { detailedIndonesiaShape } from '../data/detailedIndonesia'
import { detailedIslandCountryShapes } from '../data/detailedIslandCountries'
import { microDetailedCountryShapes } from '../data/detailedMicroCountries'
import { southeastAsiaCoreShapes } from '../data/detailedSoutheastAsiaCore'
import { detailedSaintMartinShapes } from '../data/detailedSaintMartin'
import { detailedUnitedStatesShape } from '../data/detailedUnitedStates'
import { visitedCountryShapes } from '../data/visitedCountries'

type TravelKind = TravelPlace['kind']

const layerDetails: Record<TravelKind, { label: string; color: string; description: string }> = {
  lived: { label: 'Cities lived in', color: '#34d399', description: 'Places called home' },
  visited: { label: 'Places visited', color: '#60a5fa', description: 'Cities and landmarks' },
  country: { label: 'Countries & territories', color: '#a78bfa', description: 'National overview' },
}

const counts = travelPlaces.reduce<Record<TravelKind, number>>((total, place) => {
  total[place.kind] += 1
  return total
}, { lived: 0, visited: 0, country: 0 })

const atlasAliases: Record<string, string> = {
  'United States': 'United States of America',
  'Saint Kitts and Nevis': 'St. Kitts and Nevis',
  'Antigua and Barbuda': 'Antigua and Barb.',
  'Saint Martin': 'St-Martin',
  'Vatican City': 'Vatican',
  'U.S. Virgin Islands': 'U.S. Virgin Is.',
  'Gibraltar, U.K. British Territory': 'Gibraltar',
  'Cyprus UN Buffer Zone': 'Cyprus U.N. Buffer Zone',
  'Akrotiri U.K. Cyprus Territory': 'Akrotiri',
  'Dhekelia U.K. Cyprus Territory': 'Dhekelia',
  'Türkiye': 'Turkey',
  'Turkish Republic of Northern Cyprus': 'N. Cyprus',
}

const countryByAtlasName = new Map(
  travelPlaces
    .filter((place) => place.kind === 'country')
    .map((place) => [atlasAliases[place.name] ?? place.name, place]),
)

const detailedCountryFeatures = [...new Map([
  ...detailedCountryShapes.features,
  ...extendedDetailedCountryShapes.features,
  ...microDetailedCountryShapes.features,
  ...alpineDetailedCountryShapes.features,
  ...southeastAsiaCoreShapes.features,
  ...detailedIndonesiaShape.features,
  ...detailedIslandCountryShapes.features,
  ...detailedCyprusAndPuertoRicoShapes.features,
  ...detailedUnitedStatesShape.features,
  ...detailedCanadaShape.features,
  ...correctedCountryShapes.features,
  ...detailedSaintMartinShapes.features,
].map((country) => [country.properties.name, country])).values()]
const detailedCountryNames = new Set(detailedCountryFeatures.map((country) => country.properties.name))
const renderedCountryShapes = {
  ...visitedCountryShapes,
  features: [
    ...visitedCountryShapes.features.filter((country) => !detailedCountryNames.has(country.properties.name)),
    ...detailedCountryFeatures,
  ],
}

export default function Travel() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<L.Map | null>(null)
  const groupsRef = useRef<Record<TravelKind, L.LayerGroup> | null>(null)
  const markersRef = useRef(new Map<string, L.CircleMarker>())
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<TravelPlace | null>(null)
  const [visibleLayers, setVisibleLayers] = useState<Record<TravelKind, boolean>>({ lived: true, visited: true, country: true })

  const results = useMemo(() => {
    const search = query.trim().toLocaleLowerCase()
    if (!search) return []
    return travelPlaces.filter((place) => place.name.toLocaleLowerCase().includes(search)).slice(0, 8)
  }, [query])

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    const map = L.map(containerRef.current, {
      center: [27, 5],
      zoom: 2,
      minZoom: 2,
      maxZoom: 18,
      zoomControl: false,
      worldCopyJump: true,
      attributionControl: true,
    })

    const countryPane = map.createPane('country-polygons')
    countryPane.style.zIndex = '350'
    const markerPane = map.createPane('travel-markers')
    markerPane.style.zIndex = '450'

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      subdomains: 'abcd',
      maxZoom: 20,
      attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
    }).addTo(map)
    L.control.zoom({ position: 'bottomright' }).addTo(map)

    const groups: Record<TravelKind, L.LayerGroup> = {
      lived: L.layerGroup(),
      visited: L.layerGroup(),
      country: L.layerGroup(),
    }
    const markers = markersRef.current

    L.geoJSON(renderedCountryShapes, {
      style: {
        pane: 'country-polygons',
        color: '#8b5cf6',
        weight: .8,
        opacity: .7,
        fillColor: '#6366f1',
        fillOpacity: .14,
      },
      onEachFeature: (country, layer) => {
        const place = countryByAtlasName.get(country.properties.name)
        if (!place) return
        layer.bindTooltip(place.name, { sticky: true, opacity: .95 })
        layer.on({
          mouseover: () => (layer as L.Path).setStyle({ fillOpacity: .25, weight: 1.25, color: '#a78bfa' }),
          mouseout: () => (layer as L.Path).setStyle({ fillOpacity: .14, weight: .8, color: '#8b5cf6' }),
          click: () => setSelected(place),
        })
      },
    }).addTo(groups.country)

    travelPlaces.forEach((place) => {
      if (place.kind === 'country') return
      const detail = layerDetails[place.kind]
      const marker = L.circleMarker([place.lat, place.lng], {
        pane: 'travel-markers',
        radius: place.kind === 'lived' ? 4 : 2.6,
        color: detail.color,
        weight: place.kind === 'lived' ? 1.2 : .6,
        fillColor: detail.color,
        fillOpacity: .78,
        opacity: .95,
      })
      marker.bindTooltip(place.name, { direction: 'top', offset: [0, -5], opacity: .95 })
      marker.bindPopup(`<div class="travel-popup"><span>${detail.label}</span><strong>${place.name}</strong></div>`, { closeButton: false, offset: [0, -4] })
      marker.on('click', () => setSelected(place))
      marker.addTo(groups[place.kind])
      markers.set(`${place.kind}:${place.name}`, marker)
    })

    groups.lived.addTo(map)
    groups.visited.addTo(map)
    groups.country.addTo(map)
    groupsRef.current = groups
    mapRef.current = map

    window.setTimeout(() => map.invalidateSize(), 100)
    return () => {
      map.remove()
      mapRef.current = null
      groupsRef.current = null
      markers.clear()
    }
  }, [])

  useEffect(() => {
    const map = mapRef.current
    const groups = groupsRef.current
    if (!map || !groups) return
    groups.country.eachLayer((layer) => {
      if (layer instanceof L.CircleMarker) groups.country.removeLayer(layer)
    })
    ;(Object.keys(visibleLayers) as TravelKind[]).forEach((kind) => {
      if (visibleLayers[kind] && !map.hasLayer(groups[kind])) groups[kind].addTo(map)
      if (!visibleLayers[kind] && map.hasLayer(groups[kind])) map.removeLayer(groups[kind])
    })
  }, [visibleLayers])

  const focusPlace = (place: TravelPlace) => {
    const map = mapRef.current
    if (!map) return
    if (!visibleLayers[place.kind]) setVisibleLayers((current) => ({ ...current, [place.kind]: true }))
    map.flyTo([place.lat, place.lng], place.kind === 'country' ? 5 : 9, { duration: 1.4 })
    setSelected(place)
    setQuery('')
    window.setTimeout(() => markersRef.current.get(`${place.kind}:${place.name}`)?.openPopup(), 850)
  }

  const resetMap = () => {
    mapRef.current?.flyTo([27, 5], 2, { duration: 1.2 })
    setSelected(null)
    setQuery('')
  }

  return <section id="travel" className="section"><div className="shell">
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
      <div><div className="eyebrow">Travel atlas</div><h2 className="section-title">The world, explored.</h2><p className="section-copy">A living map of the cities, landmarks, countries, and territories that have shaped my view of the world.</p></div>
      <div className="grid grid-cols-3 gap-2">
        <Stat icon={Home} value={counts.lived} label="lived in" color="text-emerald-400" />
        <Stat icon={MapPin} value={counts.visited} label="visited" color="text-blue-400" />
        <Stat icon={Globe2} value={counts.country} label="countries" color="text-violet-400" />
      </div>
    </motion.div>

    <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: .1 }} className="glass mt-10 overflow-hidden rounded-[1.5rem] p-2">
      <div className="grid gap-3 p-2 lg:grid-cols-[minmax(16rem,1fr)_auto]">
        <div className="relative z-[500]">
          <label className="flex h-11 items-center gap-3 rounded-xl border border-white/[.08] bg-slate-950/80 px-3"><Search size={16} className="text-slate-500" /><span className="sr-only">Search travel locations</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={`Search ${travelPlaces.length} locations`} className="w-full bg-transparent text-sm text-white placeholder:text-slate-600 focus:outline-none" />{query && <button type="button" onClick={() => setQuery('')} aria-label="Clear search" className="text-slate-500 hover:text-white"><X size={14} /></button>}</label>
          {results.length > 0 && <div className="glass absolute inset-x-0 top-12 max-h-72 overflow-auto rounded-xl p-1 shadow-2xl">{results.map((place) => <button type="button" key={`${place.kind}:${place.name}`} onClick={() => focusPlace(place)} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition hover:bg-white/[.06]"><span className="h-2 w-2 rounded-full" style={{ backgroundColor: layerDetails[place.kind].color }} /><span className="text-sm text-slate-200">{place.name}</span><span className="ml-auto text-[.65rem] uppercase tracking-wider text-slate-600">{place.kind === 'country' ? 'country' : place.kind}</span></button>)}</div>}
        </div>
        <div className="flex flex-wrap gap-2">{(Object.keys(layerDetails) as TravelKind[]).map((kind) => <button type="button" key={kind} onClick={() => setVisibleLayers((current) => ({ ...current, [kind]: !current[kind] }))} aria-pressed={visibleLayers[kind]} className={`flex h-11 items-center gap-2 rounded-xl border px-3 text-xs transition ${visibleLayers[kind] ? 'border-white/15 bg-white/[.07] text-white' : 'border-white/[.06] text-slate-600 hover:text-slate-300'}`}><span className={`h-2 w-2 rounded-full ${visibleLayers[kind] ? '' : 'opacity-30'}`} style={{ backgroundColor: layerDetails[kind].color }} />{layerDetails[kind].label}</button>)}</div>
      </div>

      <div className="relative isolate overflow-hidden rounded-[1rem]">
        <div ref={containerRef} className="travel-map h-[70vh] min-h-[34rem] w-full bg-[#07101d]" aria-label="Interactive map of places Ashton has visited" />
        <button type="button" onClick={resetMap} className="glass absolute bottom-4 left-4 z-[450] flex h-10 items-center gap-2 rounded-xl px-3 text-xs text-slate-300 transition hover:text-white"><Globe2 size={14} />World view</button>
        {selected && <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="glass absolute bottom-4 left-1/2 z-[450] hidden -translate-x-1/2 items-center gap-3 rounded-xl px-4 py-3 sm:flex"><span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: layerDetails[selected.kind].color }} /><div><div className="text-xs text-slate-500">{layerDetails[selected.kind].description}</div><div className="text-sm font-medium text-white">{selected.name}</div></div><button type="button" onClick={() => { setSelected(null); mapRef.current?.closePopup() }} aria-label="Close location details" className="ml-3 text-slate-600 hover:text-white"><X size={14} /></button></motion.div>}
      </div>
    </motion.div>
    <p className="mt-4 text-center text-xs text-slate-600">Map data migrated from the original travel atlas. Tiles by OpenStreetMap and CARTO; boundaries by Natural Earth and geoBoundaries.</p>
  </div></section>
}

function Stat({ icon: Icon, value, label, color }: { icon: typeof Globe2; value: number; label: string; color: string }) {
  return <div className="glass min-w-24 rounded-xl px-4 py-3"><Icon size={15} className={color} /><div className="mt-2 text-xl font-semibold text-white">{value}</div><div className="text-[.65rem] text-slate-600">{label}</div></div>
}
