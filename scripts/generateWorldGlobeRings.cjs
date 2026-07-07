const fs = require('fs')
const path = require('path')

const root = path.resolve(__dirname, '..')
const detailedMapResolution = '10m'
const fastMapResolution = '50m'
const maxRingPoints = 48
const fastRingPoints = 8
const europeanRingPoints = 2500
const southeastAsiaRingPoints = 5000
const detailedCountryRingTargets = new Map([
  ['Canada', 1200],
  ['United States', 1200],
  ['United States of America', 1200],
  ['Brazil', 240],
  ['Russia', 300],
  ['Russian Federation', 300],
  ['China', 14000],
  ["People's Republic of China", 14000],
  ['Mongolia', 1600],
  ['Kazakhstan', 240],
  ['Antarctica', 640],
  ['Norway', 9000],
  ['Sweden', 4000],
  ['Kingdom of Sweden', 4000],
  ['Mexico', 6500],
  ['United Mexican States', 6500],
  ['Saudi Arabia', 2200],
  ['Kingdom of Saudi Arabia', 2200],
  ['Chile', 1600],
  ['Republic of Chile', 1600],
  ['Argentina', 5000],
  ['Argentine Republic', 5000],
  ['Australia', 5000],
  ['Commonwealth of Australia', 5000],
  ['Iraq', 1300],
  ['Republic of Iraq', 1300],
  ['Iran', 2800],
  ['Islamic Republic of Iran', 2800],
  ['India', 8000],
  ['Republic of India', 8000],
  ['Pakistan', 2200],
  ['Islamic Republic of Pakistan', 2200],
  ['South Korea', 3200],
  ['Republic of Korea', 3200],
  ['North Korea', 2000],
  ['Dem. Rep. Korea', 2000],
  ["Democratic People's Republic of Korea", 2000],
  ['Korean Demilitarized Zone', 200],
  ['Korean DMZ (south)', 200],
  ['Korean DMZ (north)', 200],
  ['Germany', 3200],
  ['Federal Republic of Germany', 3200],
  ['Turkey', 4000],
  ['Republic of Turkey', 4000],
  ['TÃ¼rkiye', 4000],
  ['Belgium', 700],
  ['Netherlands', 1000],
  ['Kingdom of the Netherlands', 1000],
  ['France', 4000],
  ['Metropolitan France', 4000],
  ['Spain', 3200],
  ['Kingdom of Spain', 3200],
].map(([name, target]) => [normalize(name), target]))
const detailedSourcePath = path.join(root, 'public', 'data', `world-map-units-${detailedMapResolution}.geojson`)
const detailedBaseOutputPath = path.join(root, 'public', 'data', `world-map-units-${detailedMapResolution}-rings.json`)
const detailedVisitedOutputPath = path.join(root, 'public', 'data', `world-visited-map-units-${detailedMapResolution}-rings.json`)
const fastSourcePath = path.join(root, 'public', 'data', `world-map-units-${fastMapResolution}.geojson`)
const fastBaseOutputPath = path.join(root, 'public', 'data', `world-map-units-${fastMapResolution}-rings.json`)
const fastVisitedOutputPath = path.join(root, 'public', 'data', `world-visited-map-units-${fastMapResolution}-rings.json`)
const travelPlacesPath = path.join(root, 'src', 'data', 'travelPlaces.ts')
const customVisitedCountriesPath = path.join(root, 'src', 'data', 'visitedCountries.ts')

const visitedAliases = new Map([
  ['United States', ['United States of America']],
  ['Saint Kitts and Nevis', ['St. Kitts and Nevis']],
  ['Antigua and Barbuda', ['Antigua and Barb.']],
  ['Saint Martin', ['St-Martin', 'Saint-Martin']],
  ['Vatican City', ['Vatican']],
  ['U.S. Virgin Islands', ['U.S. Virgin Is.', 'United States Virgin Islands']],
  ['Gibraltar, U.K. British Territory', ['Gibraltar']],
  ['Türkiye', ['Turkey']],
  ['Turkish Republic of Northern Cyprus', ['N. Cyprus', 'Northern Cyprus']],
  ['Cyprus UN Buffer Zone', ['Cyprus U.N. Buffer Zone']],
  ['Akrotiri U.K. Cyprus Territory', ['Akrotiri', 'Akrotiri Sovereign Base Area']],
  ['Dhekelia U.K. Cyprus Territory', ['Dhekelia', 'Dhekelia Sovereign Base Area']],
  ['South Korea', ['Republic of Korea', 'Korea, South']],
  ['Puerto Rico', ['Puerto Rico']],
  ['Catalonia', ['Catalonia']],
])

function readTravelCountryNames() {
  const source = fs.readFileSync(travelPlacesPath, 'utf8')
  const entries = [...source.matchAll(/"name": "([^"]+)"[\s\S]*?"kind": "([^"]+)"/g)]
  return entries
    .filter((entry) => entry[2] === 'country')
    .map((entry) => entry[1])
}

function normalize(value) {
  return String(value ?? '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/&/g, 'and')
    .replace(/\bthe\b/gi, '')
    .replace(/[^a-z0-9]+/gi, ' ')
    .trim()
    .toLowerCase()
}

function featureNames(feature) {
  const properties = feature.properties ?? {}
  return [
    properties.name,
    properties.NAME,
    properties.NAME_LONG,
    properties.NAME_EN,
    properties.ADMIN,
    properties.GEOUNIT,
    properties.SUBUNIT,
    properties.BRK_NAME,
    properties.SOVEREIGNT,
    properties.FORMAL_EN,
  ].filter(Boolean)
}

function readExportedFeatureCollection(filePath, exportName) {
  const source = fs.readFileSync(filePath, 'utf8')
  const marker = `export const ${exportName} = `
  const start = source.indexOf(marker)
  if (start === -1) return { type: 'FeatureCollection', features: [] }

  const jsonStart = start + marker.length
  const jsonEnd = source.indexOf(' as FeatureCollection', jsonStart)
  if (jsonEnd === -1) return { type: 'FeatureCollection', features: [] }

  return JSON.parse(source.slice(jsonStart, jsonEnd).trim())
}

function geometryRings(geometry) {
  if (!geometry) return []
  if (geometry.type === 'Polygon') return geometry.coordinates
  if (geometry.type === 'MultiPolygon') return geometry.coordinates.flat()
  return []
}

function simplifyRing(ring, target = maxRingPoints) {
  if (ring.length <= target) return ring.map(roundCoordinate)
  const step = Math.max(1, Math.ceil(ring.length / target))
  const simplified = ring.filter((_, index) => index % step === 0)
  const last = ring[ring.length - 1]
  if (last && simplified[simplified.length - 1] !== last) simplified.push(last)
  return simplified.map(roundCoordinate)
}

function roundCoordinate([lng, lat]) {
  return [Number(lng.toFixed(4)), Number(lat.toFixed(4))]
}

function makeLookup(names) {
  const lookup = new Set()
  names.forEach((name) => {
    lookup.add(normalize(name))
    ;(visitedAliases.get(name) ?? []).forEach((alias) => lookup.add(normalize(alias)))
  })
  return lookup
}

function featureMatches(feature, lookup) {
  return featureNames(feature).some((name) => lookup.has(normalize(name)))
}

function featureRingTarget(feature) {
  const continentalTarget = Math.max(
    maxRingPoints,
    feature.properties?.CONTINENT === 'Europe' ? europeanRingPoints : maxRingPoints,
    feature.properties?.SUBREGION === 'South-Eastern Asia' ? southeastAsiaRingPoints : maxRingPoints,
  )
  return featureNames(feature).reduce((target, name) => (
    Math.max(target, detailedCountryRingTargets.get(normalize(name)) ?? target)
  ), continentalTarget)
}

function unmatchedVisitedNames(names, matchedNameLookup) {
  return names.filter((name) => {
    const possibleNames = [name, ...(visitedAliases.get(name) ?? [])].map(normalize)
    return !possibleNames.some((possibleName) => matchedNameLookup.has(possibleName))
  })
}

const customVisitedCountries = readExportedFeatureCollection(customVisitedCountriesPath, 'visitedCountryShapes')
const visitedNames = readTravelCountryNames()
const visitedLookup = makeLookup(visitedNames)

function generateRings({ label, sourcePath, baseOutputPath, visitedOutputPath, ringTargetForFeature, customRingTarget }) {
  const world = JSON.parse(fs.readFileSync(sourcePath, 'utf8'))
  const matchedNames = new Set()
  const allRings = []
  const visitedRings = []

  world.features.forEach((feature) => {
    const ringTarget = ringTargetForFeature(feature)
    const simplified = geometryRings(feature.geometry)
      .map((ring) => simplifyRing(ring, ringTarget))
      .filter((ring) => ring.length > 2)

    allRings.push(...simplified)

    if (featureMatches(feature, visitedLookup)) {
      visitedRings.push(...simplified)
      featureNames(feature).forEach((name) => {
        const normalized = normalize(name)
        if (visitedLookup.has(normalized)) matchedNames.add(normalized)
      })
    }
  })

  const missingFromWorld = unmatchedVisitedNames(visitedNames, matchedNames)
  const missingLookup = makeLookup(missingFromWorld)

  customVisitedCountries.features.forEach((feature) => {
    if (!featureMatches(feature, missingLookup)) return

    const customRings = geometryRings(feature.geometry)
      .map((ring) => simplifyRing(ring, customRingTarget))
      .filter((ring) => ring.length > 2)

    allRings.push(...customRings)
    visitedRings.push(...customRings)
    featureNames(feature).forEach((name) => {
      const normalized = normalize(name)
      if (missingLookup.has(normalized)) matchedNames.add(normalized)
    })
  })

  fs.writeFileSync(baseOutputPath, JSON.stringify(allRings))
  fs.writeFileSync(visitedOutputPath, JSON.stringify(visitedRings))

  const missing = unmatchedVisitedNames(visitedNames, matchedNames)

  return {
    label,
    worldRings: allRings.length,
    visitedRings: visitedRings.length,
    missing,
    baseBytes: fs.statSync(baseOutputPath).size,
    visitedBytes: fs.statSync(visitedOutputPath).size,
  }
}

const fastStats = generateRings({
  label: `${fastMapResolution}-fast`,
  sourcePath: fastSourcePath,
  baseOutputPath: fastBaseOutputPath,
  visitedOutputPath: fastVisitedOutputPath,
  ringTargetForFeature: () => fastRingPoints,
  customRingTarget: fastRingPoints,
})

const detailedStats = generateRings({
  label: `${detailedMapResolution}-detailed`,
  sourcePath: detailedSourcePath,
  baseOutputPath: detailedBaseOutputPath,
  visitedOutputPath: detailedVisitedOutputPath,
  ringTargetForFeature: featureRingTarget,
  customRingTarget: maxRingPoints,
})

console.log(JSON.stringify({
  fast: fastStats,
  detailed: detailedStats,
}, null, 2))
