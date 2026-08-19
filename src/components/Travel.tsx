import { motion } from 'framer-motion'
import { ArrowUpRight, Globe2, Home, Map as MapIcon, MapPin, Minus, Plus, Search, X } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { Feature, FeatureCollection, Geometry } from 'geojson'
import * as L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { travelPlaces, type TravelPlace } from '../data/travelPlaces'
import BlurredPhotoParallax from './BlurredPhotoParallax'

type TravelKind = TravelPlace['kind']
type TravelView = 'atlas' | 'globe'

const googleMyMapsUrl = ''
const globeDetailedMapResolution = '10m'
const globeMediumMapResolution = 'medium'
const globeFastMapResolution = '50m'
const detailedWorldMapRingsUrl = `${import.meta.env.BASE_URL}data/world-map-units-${globeDetailedMapResolution}-rings.json`
const detailedVisitedMapRingsUrl = `${import.meta.env.BASE_URL}data/world-visited-map-units-${globeDetailedMapResolution}-rings.json`
const mediumWorldMapRingsUrl = `${import.meta.env.BASE_URL}data/world-map-units-${globeMediumMapResolution}-rings.json`
const mediumVisitedMapRingsUrl = `${import.meta.env.BASE_URL}data/world-visited-map-units-${globeMediumMapResolution}-rings.json`
const fastWorldMapRingsUrl = `${import.meta.env.BASE_URL}data/world-map-units-${globeFastMapResolution}-rings.json`
const fastVisitedMapRingsUrl = `${import.meta.env.BASE_URL}data/world-visited-map-units-${globeFastMapResolution}-rings.json`

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

// Detailed country boundary data is fetched at runtime from public/data/countries/
// (rather than bundled as source) so it doesn't bloat this route's JS chunk. The
// underlying .ts data modules still exist for scripts/generateWorldGlobeRings.cjs.
const countryDataBase = `${import.meta.env.BASE_URL}data/countries/`
const detailedCountryDataFiles = [
  'detailedCountries', 'detailedCountriesExtended', 'detailedMicroCountries', 'detailedAlpineCountries',
  'detailedSoutheastAsiaCore', 'detailedIndonesia', 'detailedIslandCountries', 'detailedCyprusAndPuertoRico',
  'detailedUnitedStates', 'detailedCanada', 'correctedCountries', 'detailedSaintMartin',
] as const

type CountryFeature = Feature<Geometry, { name: string }>
type CountryShapeData = { renderedCountryShapes: FeatureCollection<Geometry, { name: string }>, globeCountryRings: Coordinate[][] }

let countryShapeDataPromise: Promise<CountryShapeData> | null = null

function fetchCountryShapeData(): Promise<CountryShapeData> {
  if (!countryShapeDataPromise) {
    countryShapeDataPromise = Promise.all([
      Promise.all(detailedCountryDataFiles.map((name) => fetch(`${countryDataBase}${name}.json`).then((response) => response.json() as Promise<FeatureCollection<Geometry, { name: string }>>))),
      fetch(`${countryDataBase}visitedCountries.json`).then((response) => response.json() as Promise<FeatureCollection<Geometry, { name: string }>>),
    ]).then(([detailedCollections, visitedCountryShapes]) => {
      const detailedCountryFeatures = [...new Map(
        detailedCollections.flatMap((collection) => collection.features as CountryFeature[])
          .map((country) => [country.properties.name, country]),
      ).values()]
      const detailedCountryNames = new Set(detailedCountryFeatures.map((country) => country.properties.name))
      const renderedCountryShapes: FeatureCollection<Geometry, { name: string }> = {
        ...visitedCountryShapes,
        features: [
          ...(visitedCountryShapes.features as CountryFeature[]).filter((country) => !detailedCountryNames.has(country.properties.name)),
          ...detailedCountryFeatures,
        ],
      }
      const globeCountryRings = renderedCountryShapes.features.flatMap((feature) => (
        extractRings(feature.geometry).map(simplifyRing).filter((ring) => ring.length > 2)
      ))
      return { renderedCountryShapes, globeCountryRings }
    })
  }
  return countryShapeDataPromise
}

function useCountryShapeData() {
  const [data, setData] = useState<CountryShapeData | null>(null)
  useEffect(() => {
    let mounted = true
    fetchCountryShapeData().then((result) => { if (mounted) setData(result) })
    return () => { mounted = false }
  }, [])
  return data
}

const globeSize = 720
const globeCenter = globeSize / 2
const globeRadius = 302
const globeMinZoom = 1
const globeMaxZoom = 50
const globeMinZoomStep = .22
const globeZoomStepRatio = .2
const globeMaxZoomStep = 4
const globeMinDragScale = .1
const globeDragZoomExponent = .8
const globeWheelDeltaBaseline = 100
const globeWheelMaxDelta = 100
const globeWheelLineDelta = 16
const globeWheelPageDelta = 800
const degreeToRadian = Math.PI / 180

type GlobeRotation = { lat: number; lng: number }
type Coordinate = [number, number]
type GlobePointerPosition = { x: number; y: number }
type GlobePinchStart = { distance: number; zoom: number }

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function projectPoint(lat: number, lng: number, rotation: GlobeRotation, radius = globeRadius) {
  const phi = lat * degreeToRadian
  const lambda = (lng - rotation.lng) * degreeToRadian
  const phi0 = rotation.lat * degreeToRadian
  const cosPhi = Math.cos(phi)
  const x = cosPhi * Math.sin(lambda)
  const y = Math.cos(phi0) * Math.sin(phi) - Math.sin(phi0) * cosPhi * Math.cos(lambda)
  const z = Math.sin(phi0) * Math.sin(phi) + Math.cos(phi0) * cosPhi * Math.cos(lambda)

  return {
    x: globeCenter + radius * x,
    y: globeCenter - radius * y,
    visible: z > -.03,
  }
}

function projectedShapeSegments(points: Coordinate[], rotation: GlobeRotation, radius = globeRadius) {
  const outlines: string[] = []
  const fills: string[] = []
  let current: string[] = []

  const flush = () => {
    if (current.length > 1) outlines.push(`M${current.join(' L')}`)
    if (current.length > 2) fills.push(`M${current.join(' L')} Z`)
    current = []
  }

  points.forEach(([lng, lat]) => {
    const point = projectPoint(lat, lng, rotation, radius)
    if (!point.visible) {
      flush()
      return
    }

    current.push(`${point.x.toFixed(1)} ${point.y.toFixed(1)}`)
  })

  flush()
  return { outlines, fills }
}

function extractRings(geometry: Geometry): Coordinate[][] {
  if (geometry.type === 'Polygon') return geometry.coordinates as Coordinate[][]
  if (geometry.type === 'MultiPolygon') return (geometry.coordinates as Coordinate[][][]).flat()
  return []
}

function simplifyRing(ring: Coordinate[]) {
  if (ring.length <= 20) return ring
  const step = Math.max(1, Math.ceil(ring.length / 48))
  const simplified = ring.filter((_, index) => index % step === 0)
  const first = ring[0]
  const last = ring[ring.length - 1]

  if (first && last && simplified[simplified.length - 1] !== last) simplified.push(last)
  return simplified
}

function markerRadius(kind: TravelKind) {
  return kind === 'country' ? 3.2 : kind === 'lived' ? 5.2 : 3.8
}

function circlePath(x: number, y: number, radius: number) {
  const size = radius * 2
  return `M${(x - radius).toFixed(1)} ${y.toFixed(1)}a${radius} ${radius} 0 1 0 ${size} 0a${radius} ${radius} 0 1 0 ${-size} 0`
}

function travelPlaceKey(place: TravelPlace | null) {
  return place ? `${place.kind}:${place.name}` : ''
}

function globeZoomStepFor(current: number) {
  return clamp(current * globeZoomStepRatio, globeMinZoomStep, globeMaxZoomStep)
}

function nextGlobeZoom(current: number, direction: 1 | -1) {
  return clamp(Number((current + direction * globeZoomStepFor(current)).toFixed(2)), globeMinZoom, globeMaxZoom)
}

function normalizedWheelDelta(event: WheelEvent) {
  const delta = event.deltaMode === 1
    ? event.deltaY * globeWheelLineDelta
    : event.deltaMode === 2
      ? event.deltaY * globeWheelPageDelta
      : event.deltaY
  return clamp(delta, -globeWheelMaxDelta, globeWheelMaxDelta)
}

function nextGlobeWheelZoom(current: number, event: WheelEvent) {
  const delta = normalizedWheelDelta(event)
  if (delta === 0) return current
  const zoomDelta = -(delta / globeWheelDeltaBaseline) * globeZoomStepFor(current)
  return clamp(Number((current + zoomDelta).toFixed(2)), globeMinZoom, globeMaxZoom)
}

function globeDragScale(zoom: number) {
  return Math.max(globeMinDragScale, 1 / Math.max(zoom, globeMinZoom) ** globeDragZoomExponent)
}

function globePointerDistance(first: GlobePointerPosition, second: GlobePointerPosition) {
  return Math.hypot(second.x - first.x, second.y - first.y)
}

export default function Travel() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<L.Map | null>(null)
  const groupsRef = useRef<Record<TravelKind, L.LayerGroup> | null>(null)
  const markersRef = useRef(new Map<string, L.CircleMarker>())
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<TravelPlace | null>(null)
  const [travelView, setTravelView] = useState<TravelView>('atlas')
  const [visibleLayers, setVisibleLayers] = useState<Record<TravelKind, boolean>>({ lived: true, visited: true, country: true })
  const countryData = useCountryShapeData()

  const results = useMemo(() => {
    const search = query.trim().toLocaleLowerCase()
    if (!search) return []
    return travelPlaces.filter((place) => place.name.toLocaleLowerCase().includes(search)).slice(0, 8)
  }, [query])

  useEffect(() => {
    if (travelView !== 'atlas') return undefined
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
  }, [travelView])

  useEffect(() => {
    if (!countryData || !groupsRef.current) return

    const countryLayer = L.geoJSON(countryData.renderedCountryShapes, {
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
    })
    countryLayer.addTo(groupsRef.current.country)
    return () => {
      countryLayer.remove()
    }
  }, [countryData, travelView])

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
    if (travelView === 'globe') {
      if (!visibleLayers[place.kind]) setVisibleLayers((current) => ({ ...current, [place.kind]: true }))
      setSelected(place)
      setQuery('')
      return
    }

    const map = mapRef.current
    if (!map) return
    if (!visibleLayers[place.kind]) setVisibleLayers((current) => ({ ...current, [place.kind]: true }))
    map.flyTo([place.lat, place.lng], place.kind === 'country' ? 5 : 9, { duration: 1.4 })
    setSelected(place)
    setQuery('')
    window.setTimeout(() => markersRef.current.get(`${place.kind}:${place.name}`)?.openPopup(), 850)
  }

  const resetMap = () => {
    if (travelView === 'atlas') mapRef.current?.flyTo([27, 5], 2, { duration: 1.2 })
    setSelected(null)
    setQuery('')
  }

  return <section id="travel" className="section overflow-hidden"><BlurredPhotoParallax image="/ashton-travel.jpg" variant="travel" position="center 45%" /><div className="shell relative z-10">
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
        <div className="flex flex-wrap gap-2 lg:justify-end">
          <div className="flex h-11 overflow-hidden rounded-xl border border-white/[.08] bg-slate-950/70 p-1">
            {([
              { view: 'atlas' as const, label: 'Atlas', icon: MapIcon },
              { view: 'globe' as const, label: 'Globe', icon: Globe2 },
            ]).map(({ view, label, icon: Icon }) => <button type="button" key={view} onClick={() => setTravelView(view)} aria-pressed={travelView === view} className={`flex items-center gap-2 rounded-lg px-3 text-xs font-semibold transition ${travelView === view ? 'bg-white/[.1] text-white' : 'text-slate-500 hover:text-slate-200'}`}><Icon size={14} />{label}</button>)}
          </div>
          {googleMyMapsUrl && <a href={googleMyMapsUrl} target="_blank" rel="noreferrer" className="flex h-11 items-center gap-2 rounded-xl border border-white/[.08] bg-white/[.04] px-3 text-xs font-semibold text-slate-300 transition hover:border-white/20 hover:text-white">Google My Maps <ArrowUpRight size={13} /></a>}
          {(Object.keys(layerDetails) as TravelKind[]).map((kind) => <button type="button" key={kind} onClick={() => setVisibleLayers((current) => ({ ...current, [kind]: !current[kind] }))} aria-pressed={visibleLayers[kind]} className={`flex h-11 items-center gap-2 rounded-xl border px-3 text-xs transition ${visibleLayers[kind] ? 'border-white/15 bg-white/[.07] text-white' : 'border-white/[.06] text-slate-600 hover:text-slate-300'}`}><span className={`h-2 w-2 rounded-full ${visibleLayers[kind] ? '' : 'opacity-30'}`} style={{ backgroundColor: layerDetails[kind].color }} />{layerDetails[kind].label}</button>)}
        </div>
      </div>

      {travelView === 'atlas' ? (
        <div className="relative isolate overflow-hidden rounded-[1rem]">
          <div ref={containerRef} className="travel-map h-[70vh] min-h-[34rem] w-full bg-[#07101d]" aria-label="Interactive map of places Ashton has visited" />
          <button type="button" onClick={resetMap} className="glass absolute bottom-4 left-4 z-[450] flex h-10 items-center gap-2 rounded-xl px-3 text-xs text-slate-300 transition hover:text-white"><Globe2 size={14} />World view</button>
          {selected && <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="glass absolute bottom-4 left-1/2 z-[450] hidden -translate-x-1/2 items-center gap-3 rounded-xl px-4 py-3 sm:flex"><span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: layerDetails[selected.kind].color }} /><div><div className="text-xs text-slate-500">{layerDetails[selected.kind].description}</div><div className="text-sm font-medium text-white">{selected.name}</div></div><button type="button" onClick={() => { setSelected(null); mapRef.current?.closePopup() }} aria-label="Close location details" className="ml-3 text-slate-600 hover:text-white"><X size={14} /></button></motion.div>}
        </div>
      ) : (
        <InteractiveGlobe selected={selected} visibleLayers={visibleLayers} onSelect={setSelected} onReset={resetMap} globeCountryRings={countryData?.globeCountryRings ?? []} />
      )}
    </motion.div>
    <p className="mt-4 text-center text-xs text-slate-600">Map data migrated from the original travel atlas. Tiles by OpenStreetMap and CARTO; boundaries by Natural Earth and geoBoundaries.</p>
  </div></section>
}

export function HomeGlobeSection() {
  const [selected, setSelected] = useState<TravelPlace | null>(null)
  const visibleLayers = useMemo<Record<TravelKind, boolean>>(() => ({ lived: true, visited: true, country: true }), [])
  const countryData = useCountryShapeData()

  return (
    <section id="home-globe" className="section overflow-hidden">
      <BlurredPhotoParallax image="/ashton-travel.jpg" variant="travel" position="center 45%" />
      <div className="shell relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <div className="eyebrow">Travel globe</div>
            <h2 className="section-title">A world view of where I’ve been.</h2>
            <p className="section-copy">Spin through the same travel data from the atlas, with countries, cities, and lived-in places layered onto an interactive globe.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:items-end">
            <div className="grid grid-cols-3 gap-2">
              <Stat icon={Home} value={counts.lived} label="lived in" color="text-emerald-400" />
              <Stat icon={MapPin} value={counts.visited} label="visited" color="text-blue-400" />
              <Stat icon={Globe2} value={counts.country} label="countries" color="text-violet-400" />
            </div>
            <a href="#/travel" className="glass flex h-12 items-center justify-center gap-2 rounded-xl px-4 text-xs font-semibold text-slate-300 transition hover:text-white">Open atlas <ArrowUpRight size={14} /></a>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: .1 }} className="glass mt-10 overflow-hidden rounded-[1.5rem] p-2">
          <InteractiveGlobe selected={selected} visibleLayers={visibleLayers} onSelect={setSelected} onReset={() => setSelected(null)} globeCountryRings={countryData?.globeCountryRings ?? []} />
        </motion.div>
      </div>
    </section>
  )
}

function InteractiveGlobe({ selected, visibleLayers, onSelect, onReset, globeCountryRings }: { selected: TravelPlace | null; visibleLayers: Record<TravelKind, boolean>; onSelect: (place: TravelPlace | null) => void; onReset: () => void; globeCountryRings: Coordinate[][] }) {
  const [rotation, setRotation] = useState<GlobeRotation>({ lat: 18, lng: -18 })
  const [globeZoom, setGlobeZoom] = useState(globeMinZoom)
  const [hoveredPlace, setHoveredPlace] = useState<TravelPlace | null>(null)
  const [detailedWorldOutlineRings, setDetailedWorldOutlineRings] = useState<Coordinate[][]>([])
  const [detailedVisitedOutlineRings, setDetailedVisitedOutlineRings] = useState<Coordinate[][]>([])
  const [mediumWorldOutlineRings, setMediumWorldOutlineRings] = useState<Coordinate[][]>([])
  const [mediumVisitedOutlineRings, setMediumVisitedOutlineRings] = useState<Coordinate[][]>([])
  const [fastWorldOutlineRings, setFastWorldOutlineRings] = useState<Coordinate[][]>([])
  const [fastVisitedOutlineRings, setFastVisitedOutlineRings] = useState<Coordinate[][]>([])
  const [isGlobeInteracting, setIsGlobeInteracting] = useState(false)
  const globeWheelRef = useRef<HTMLDivElement | null>(null)
  const activePointers = useRef(new Map<number, GlobePointerPosition>())
  const dragStart = useRef<{ x: number; y: number; rotation: GlobeRotation; moved: boolean } | null>(null)
  const activePointerId = useRef<number | null>(null)
  const pinchStart = useRef<GlobePinchStart | null>(null)
  const pendingRotation = useRef<GlobeRotation | null>(null)
  const pendingDragFrame = useRef<number | null>(null)
  const settleGlobeTimer = useRef<number | null>(null)

  useEffect(() => () => {
    if (pendingDragFrame.current !== null) window.cancelAnimationFrame(pendingDragFrame.current)
    if (settleGlobeTimer.current !== null) window.clearTimeout(settleGlobeTimer.current)
    activePointers.current.clear()
  }, [])

  const beginGlobeInteraction = () => {
    if (settleGlobeTimer.current !== null) window.clearTimeout(settleGlobeTimer.current)
    setIsGlobeInteracting(true)
  }

  const settleGlobeInteraction = (delay = 220) => {
    if (settleGlobeTimer.current !== null) window.clearTimeout(settleGlobeTimer.current)
    settleGlobeTimer.current = window.setTimeout(() => {
      setIsGlobeInteracting(false)
      settleGlobeTimer.current = null
    }, delay)
  }

  useEffect(() => {
    const globe = globeWheelRef.current
    if (!globe) return

    const handleGlobeWheel = (event: WheelEvent) => {
      event.preventDefault()
      event.stopPropagation()
      beginGlobeInteraction()
      setGlobeZoom((current) => nextGlobeWheelZoom(current, event))
      settleGlobeInteraction()
    }

    globe.addEventListener('wheel', handleGlobeWheel, { passive: false })
    return () => globe.removeEventListener('wheel', handleGlobeWheel)
  }, [])

  useEffect(() => {
    let mounted = true
    Promise.all([
      fetch(detailedWorldMapRingsUrl).then((response) => response.ok ? response.json() : Promise.reject(new Error('Unable to load detailed world outline data'))),
      fetch(detailedVisitedMapRingsUrl).then((response) => response.ok ? response.json() : Promise.reject(new Error('Unable to load detailed visited outline data'))),
      fetch(mediumWorldMapRingsUrl).then((response) => response.ok ? response.json() : Promise.reject(new Error('Unable to load medium world outline data'))),
      fetch(mediumVisitedMapRingsUrl).then((response) => response.ok ? response.json() : Promise.reject(new Error('Unable to load medium visited outline data'))),
      fetch(fastWorldMapRingsUrl).then((response) => response.ok ? response.json() : Promise.reject(new Error('Unable to load fast world outline data'))),
      fetch(fastVisitedMapRingsUrl).then((response) => response.ok ? response.json() : Promise.reject(new Error('Unable to load fast visited outline data'))),
    ])
      .then(([detailedWorldRings, detailedVisitedRings, mediumWorldRings, mediumVisitedRings, fastWorldRings, fastVisitedRings]: [Coordinate[][], Coordinate[][], Coordinate[][], Coordinate[][], Coordinate[][], Coordinate[][]]) => {
        if (!mounted) return
        setDetailedWorldOutlineRings(detailedWorldRings)
        setDetailedVisitedOutlineRings(detailedVisitedRings)
        setMediumWorldOutlineRings(mediumWorldRings)
        setMediumVisitedOutlineRings(mediumVisitedRings)
        setFastWorldOutlineRings(fastWorldRings)
        setFastVisitedOutlineRings(fastVisitedRings)
      })
      .catch(() => {
        if (!mounted) return
        setDetailedWorldOutlineRings([])
        setDetailedVisitedOutlineRings([])
        setMediumWorldOutlineRings([])
        setMediumVisitedOutlineRings([])
        setFastWorldOutlineRings([])
        setFastVisitedOutlineRings([])
      })
    return () => {
      mounted = false
    }
  }, [])

  const [prevSelected, setPrevSelected] = useState(selected)
  if (selected !== prevSelected) {
    setPrevSelected(selected)
    if (selected) setRotation({ lat: clamp(selected.lat, -62, 72), lng: selected.lng })
  }

  const projectedRadius = globeRadius * globeZoom
  const worldRingsForFrame = isGlobeInteracting
    ? mediumWorldOutlineRings.length > 0
      ? mediumWorldOutlineRings
      : fastWorldOutlineRings
    : detailedWorldOutlineRings.length > 0
      ? detailedWorldOutlineRings
      : fastWorldOutlineRings
  const visitedRingsForFrame = isGlobeInteracting
    ? mediumVisitedOutlineRings.length > 0
      ? mediumVisitedOutlineRings
      : fastVisitedOutlineRings
    : detailedVisitedOutlineRings.length > 0
      ? detailedVisitedOutlineRings
      : fastVisitedOutlineRings

  const projectedPlaces = useMemo(() => travelPlaces
    .filter((place) => visibleLayers[place.kind])
    .map((place) => ({ place, point: projectPoint(place.lat, place.lng, rotation, projectedRadius) }))
    .filter(({ point }) => point.visible), [projectedRadius, rotation, visibleLayers])

  const projectedGlobeMarkers = useMemo(() => (
    projectedPlaces.filter(({ place }) => place.kind !== 'country')
  ), [projectedPlaces])

  const selectedKey = travelPlaceKey(selected)
  const hoveredKey = travelPlaceKey(hoveredPlace)

  const baseOutlinePath = useMemo(() => {
    const rings = worldRingsForFrame.length > 0 ? worldRingsForFrame : globeCountryRings
    return rings.flatMap((ring) => projectedShapeSegments(ring, rotation, projectedRadius).outlines).join(' ')
  }, [projectedRadius, rotation, worldRingsForFrame, globeCountryRings])

  const visitedCountryShapePaths = useMemo(() => {
    const outlines: string[] = []
    const fills: string[] = []
    const rings = visitedRingsForFrame.length > 0 ? visitedRingsForFrame : globeCountryRings
    rings.forEach((ring) => {
      const projected = projectedShapeSegments(ring, rotation, projectedRadius)
      outlines.push(...projected.outlines)
      fills.push(...projected.fills)
    })
    return { outline: outlines.join(' '), fill: fills.join(' ') }
  }, [projectedRadius, rotation, visitedRingsForFrame, globeCountryRings])

  const markerPaths = useMemo(() => {
    const paths: Record<TravelKind, string[]> = { lived: [], visited: [], country: [] }
    projectedGlobeMarkers.forEach(({ place, point }) => {
      if (`${place.kind}:${place.name}` === selectedKey) return
      paths[place.kind].push(circlePath(point.x, point.y, markerRadius(place.kind)))
    })
    return {
      lived: paths.lived.join(' '),
      visited: paths.visited.join(' '),
      country: paths.country.join(' '),
    }
  }, [projectedGlobeMarkers, selectedKey])

  const selectedProjection = useMemo(() => {
    if (!selected || selected.kind === 'country') return null
    return projectedGlobeMarkers.find(({ place }) => place.name === selected.name && place.kind === selected.kind) ?? null
  }, [projectedGlobeMarkers, selected])

  const hoveredProjection = useMemo(() => {
    if (!hoveredPlace || hoveredPlace.kind === 'country' || hoveredKey === selectedKey) return null
    return projectedGlobeMarkers.find(({ place }) => place.name === hoveredPlace.name && place.kind === hoveredPlace.kind) ?? null
  }, [hoveredKey, hoveredPlace, projectedGlobeMarkers, selectedKey])

  const findNearestGlobePlace = (event: React.PointerEvent<SVGSVGElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - bounds.left) / bounds.width) * globeSize
    const y = ((event.clientY - bounds.top) / bounds.height) * globeSize
    let nearestPlace: TravelPlace | null = null
    let nearestDistance = Number.POSITIVE_INFINITY

    projectedGlobeMarkers.forEach(({ place, point }) => {
      const hitRadius = 13
      const distance = Math.hypot(point.x - x, point.y - y)
      if (distance <= hitRadius && distance < nearestDistance) {
        nearestPlace = place
        nearestDistance = distance
      }
    })

    return nearestPlace
  }

  const updateHoveredPlace = (place: TravelPlace | null) => {
    const nextKey = travelPlaceKey(place)
    setHoveredPlace((current) => travelPlaceKey(current) === nextKey ? current : place)
  }

  const firstTwoGlobePointers = () => {
    const pointers = [...activePointers.current.values()]
    return pointers.length >= 2 ? [pointers[0], pointers[1]] : null
  }

  const pointerPosition = (event: React.PointerEvent<SVGSVGElement>): GlobePointerPosition => ({
    x: event.clientX,
    y: event.clientY,
  })

  const beginPinchZoom = () => {
    const pointers = firstTwoGlobePointers()
    if (!pointers) return
    const distance = globePointerDistance(pointers[0], pointers[1])
    if (distance <= 0) return
    pinchStart.current = { distance, zoom: globeZoom }
    dragStart.current = null
    activePointerId.current = null
    updateHoveredPlace(null)
  }

  const updatePinchZoom = () => {
    const pointers = firstTwoGlobePointers()
    if (!pointers) return
    if (!pinchStart.current) beginPinchZoom()
    if (!pinchStart.current) return
    const distance = globePointerDistance(pointers[0], pointers[1])
    const ratio = distance / pinchStart.current.distance
    setGlobeZoom(clamp(Number((pinchStart.current.zoom * ratio).toFixed(2)), globeMinZoom, globeMaxZoom))
  }

  const handlePointerDown = (event: React.PointerEvent<SVGSVGElement>) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return
    event.preventDefault()
    event.currentTarget.setPointerCapture(event.pointerId)
    activePointers.current.set(event.pointerId, pointerPosition(event))
    beginGlobeInteraction()
    if (activePointers.current.size >= 2) {
      beginPinchZoom()
      return
    }
    activePointerId.current = event.pointerId
    dragStart.current = { x: event.clientX, y: event.clientY, rotation, moved: false }
  }

  const handlePointerMove = (event: React.PointerEvent<SVGSVGElement>) => {
    if (activePointers.current.has(event.pointerId)) {
      activePointers.current.set(event.pointerId, pointerPosition(event))
    }
    if (activePointers.current.size >= 2) {
      event.preventDefault()
      beginGlobeInteraction()
      updatePinchZoom()
      settleGlobeInteraction()
      return
    }
    if (!dragStart.current) {
      updateHoveredPlace(findNearestGlobePlace(event))
      return
    }
    if (activePointerId.current !== event.pointerId) return
    event.preventDefault()
    const dx = event.clientX - dragStart.current.x
    const dy = event.clientY - dragStart.current.y
    if (Math.hypot(dx, dy) > 4) {
      dragStart.current.moved = true
      updateHoveredPlace(null)
    }
    const dragScale = globeDragScale(globeZoom)
    pendingRotation.current = {
      lng: dragStart.current.rotation.lng - dx * .34 * dragScale,
      lat: clamp(dragStart.current.rotation.lat + dy * .24 * dragScale, -72, 72),
    }
    if (pendingDragFrame.current !== null) return
    pendingDragFrame.current = window.requestAnimationFrame(() => {
      if (pendingRotation.current) setRotation(pendingRotation.current)
      pendingRotation.current = null
      pendingDragFrame.current = null
    })
  }

  const clearDrag = () => {
    dragStart.current = null
    activePointerId.current = null
  }

  const stopDrag = (event: React.PointerEvent<SVGSVGElement>) => {
    const wasPinching = pinchStart.current !== null || activePointers.current.size > 1
    const clickedPlace = !wasPinching && !dragStart.current?.moved ? findNearestGlobePlace(event) : null
    if (activePointerId.current === event.pointerId && event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
    activePointers.current.delete(event.pointerId)
    pinchStart.current = null
    clearDrag()
    if (wasPinching && activePointers.current.size === 1) {
      const [remainingPointerId, remainingPointer] = [...activePointers.current.entries()][0]
      activePointerId.current = remainingPointerId
      dragStart.current = { ...remainingPointer, rotation, moved: true }
    }
    if (!(wasPinching && activePointers.current.size === 1)) settleGlobeInteraction(160)
    if (clickedPlace) onSelect(clickedPlace)
  }

  const cancelDrag = (event: React.PointerEvent<SVGSVGElement>) => {
    if (activePointerId.current === event.pointerId && event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
    activePointers.current.delete(event.pointerId)
    pinchStart.current = null
    clearDrag()
    settleGlobeInteraction(160)
  }

  const handleLostPointerCapture = (event: React.PointerEvent<SVGSVGElement>) => {
    activePointers.current.delete(event.pointerId)
    if (activePointerId.current === event.pointerId) clearDrag()
    if (activePointers.current.size < 2) pinchStart.current = null
  }

  const changeZoom = (direction: 1 | -1) => {
    beginGlobeInteraction()
    setGlobeZoom((current) => nextGlobeZoom(current, direction))
    settleGlobeInteraction()
  }

  const resetGlobeView = () => {
    beginGlobeInteraction()
    setGlobeZoom(globeMinZoom)
    setRotation({ lat: 18, lng: -18 })
    onReset()
    settleGlobeInteraction()
  }

  return (
    <div className="travel-globe-panel relative isolate overflow-hidden rounded-[1rem] bg-[#030712]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_16%,rgba(96,165,250,.16),transparent_28%),radial-gradient(circle_at_76%_22%,rgba(167,139,250,.15),transparent_30%),linear-gradient(180deg,rgba(2,6,23,.2),rgba(2,6,23,.88))]" />
      <div className="absolute inset-0 opacity-[.06] [background-image:radial-gradient(circle,rgba(255,255,255,.9)_0_1px,transparent_1.5px)] [background-size:32px_32px]" />
      <div className="travel-globe-layout relative grid min-h-[34rem] items-center gap-8 p-5 md:min-h-[70vh] lg:grid-cols-[minmax(0,1fr)_18rem] lg:p-8">
        <div ref={globeWheelRef} className="relative mx-auto aspect-square w-full max-w-[43rem]">
          <div className="absolute inset-[8%] rounded-full bg-blue-500/20 blur-3xl" />
          <svg
            viewBox={`0 0 ${globeSize} ${globeSize}`}
            role="img"
            aria-label="Interactive globe of places Ashton has visited"
            className="travel-globe-sphere relative z-10 h-full w-full cursor-grab touch-none active:cursor-grabbing"
            style={{ cursor: hoveredPlace ? 'pointer' : undefined }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={stopDrag}
            onPointerCancel={cancelDrag}
            onLostPointerCapture={handleLostPointerCapture}
            onPointerLeave={() => {
              if (!dragStart.current) updateHoveredPlace(null)
            }}
          >
            <defs>
              <radialGradient id="travel-globe-fill" cx="34%" cy="24%" r="78%">
                <stop offset="0%" stopColor="#334155" />
                <stop offset="46%" stopColor="#071427" />
                <stop offset="100%" stopColor="#020617" />
              </radialGradient>
              <clipPath id="travel-globe-clip">
                <circle cx={globeCenter} cy={globeCenter} r={globeRadius} />
              </clipPath>
            </defs>
            <circle cx={globeCenter} cy={globeCenter} r={globeRadius} fill="url(#travel-globe-fill)" stroke="rgba(255,255,255,.16)" strokeWidth="2" />
            <g clipPath="url(#travel-globe-clip)">
              <circle cx={globeCenter} cy={globeCenter} r={globeRadius} fill="rgba(59,130,246,.08)" />
              {baseOutlinePath && <path d={baseOutlinePath} className="travel-globe-country-outline-base" />}
              {visibleLayers.country && visitedCountryShapePaths.fill && <path d={visitedCountryShapePaths.fill} className="travel-globe-country-fill" />}
              {visibleLayers.country && visitedCountryShapePaths.outline && <path d={visitedCountryShapePaths.outline} className="travel-globe-country-outline" />}
              {(Object.keys(markerPaths) as TravelKind[]).map((kind) => markerPaths[kind] && (
                <path key={kind} d={markerPaths[kind]} fill={layerDetails[kind].color} stroke="rgba(255,255,255,.58)" strokeWidth={kind === 'lived' ? 1 : .72} className="travel-globe-marker-cluster" />
              ))}
              {hoveredProjection && (() => {
                const { place, point } = hoveredProjection
                const radius = markerRadius(place.kind)
                const labelOnLeft = point.x > globeCenter
                const labelX = clamp(point.x + (labelOnLeft ? -12 : 12), 90, globeSize - 90)
                const labelY = clamp(point.y - radius - 12, 24, globeSize - 24)
                return (
                  <g className="travel-globe-hover">
                    <circle cx={point.x} cy={point.y} r={radius + 6.5} className="travel-globe-hover-ring" />
                    <text x={labelX} y={labelY} textAnchor={labelOnLeft ? 'end' : 'start'} className="travel-globe-hover-label">{place.name}</text>
                  </g>
                )
              })()}
              {selectedProjection && (() => {
                const { place, point } = selectedProjection
                const detail = layerDetails[place.kind]
                const radius = markerRadius(place.kind)
                return (
                  <>
                    <circle cx={point.x} cy={point.y} r={radius + 5.5} fill={detail.color} opacity=".28" />
                    <circle cx={point.x} cy={point.y} r={radius + 1.8} fill={detail.color} stroke="rgba(255,255,255,.82)" strokeWidth="1.8" className="travel-globe-marker travel-globe-marker-selected" />
                  </>
                )
              })()}
              {projectedGlobeMarkers.map(({ place, point }, index) => (
                <circle
                  key={`hit-${index}:${place.kind}:${place.name}`}
                  cx={point.x}
                  cy={point.y}
                  r={15}
                  className="travel-globe-hit-target"
                  role="button"
                  tabIndex={0}
                  aria-label={`Select ${place.name}`}
                  onPointerDown={() => {
                    updateHoveredPlace(place)
                  }}
                  onPointerEnter={() => updateHoveredPlace(place)}
                  onPointerLeave={() => updateHoveredPlace(null)}
                  onClick={(event) => {
                    event.stopPropagation()
                    onSelect(place)
                  }}
                  onFocus={() => updateHoveredPlace(place)}
                  onBlur={() => updateHoveredPlace(null)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault()
                      onSelect(place)
                    }
                  }}
                />
              ))}
            </g>
            <circle cx={globeCenter} cy={globeCenter} r={globeRadius} fill="none" stroke="rgba(255,255,255,.2)" strokeWidth="1.5" />
          </svg>
        </div>

        <div className="relative z-10">
          <div className="glass rounded-2xl p-5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.18em] text-violet-300"><Globe2 size={15} />Globe mode</div>
            <p className="mt-3 text-sm leading-6 text-slate-500">Drag to rotate, scroll to zoom, or use search to jump to a place. Outlines sharpen while moving, then ease back once the globe settles.</p>
            <div className="mt-5 flex items-center gap-2">
              <button type="button" onClick={() => changeZoom(-1)} disabled={globeZoom <= globeMinZoom} aria-label="Zoom out globe" className="grid h-10 w-10 place-items-center rounded-xl border border-white/[.08] bg-white/[.04] text-slate-300 transition hover:border-white/20 hover:text-white disabled:cursor-not-allowed disabled:opacity-35"><Minus size={14} /></button>
              <div className="grid h-10 min-w-20 place-items-center rounded-xl border border-white/[.08] bg-slate-950/45 px-3 text-xs font-semibold text-slate-300">{Math.round(globeZoom * 100)}%</div>
              <button type="button" onClick={() => changeZoom(1)} disabled={globeZoom >= globeMaxZoom} aria-label="Zoom in globe" className="grid h-10 w-10 place-items-center rounded-xl border border-white/[.08] bg-white/[.04] text-slate-300 transition hover:border-white/20 hover:text-white disabled:cursor-not-allowed disabled:opacity-35"><Plus size={14} /></button>
            </div>
            <button type="button" onClick={resetGlobeView} className="mt-3 flex h-10 items-center gap-2 rounded-xl border border-white/[.08] bg-white/[.04] px-3 text-xs font-semibold text-slate-300 transition hover:border-white/20 hover:text-white"><Globe2 size={14} />Reset view</button>
          </div>

          {selected && <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="glass mt-4 rounded-2xl p-5">
            <div className="flex items-start gap-3">
              <span className="mt-1 h-2.5 w-2.5 rounded-full" style={{ backgroundColor: layerDetails[selected.kind].color }} />
              <div className="min-w-0 flex-1">
                <div className="text-xs text-slate-500">{layerDetails[selected.kind].description}</div>
                <div className="mt-1 text-lg font-semibold text-white">{selected.name}</div>
                <div className="mt-3 text-xs uppercase tracking-[.16em] text-slate-600">{selected.lat.toFixed(2)}, {selected.lng.toFixed(2)}</div>
              </div>
              <button type="button" onClick={() => onSelect(null)} aria-label="Close location details" className="text-slate-600 hover:text-white"><X size={14} /></button>
            </div>
          </motion.div>}
        </div>
      </div>
    </div>
  )
}

function Stat({ icon: Icon, value, label, color }: { icon: typeof Globe2; value: number; label: string; color: string }) {
  return <div className="glass min-w-24 rounded-xl px-4 py-3"><Icon size={15} className={color} /><div className="mt-2 text-xl font-semibold text-white">{value}</div><div className="text-[.65rem] text-slate-600">{label}</div></div>
}
