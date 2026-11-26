import { useState } from 'react'
import VehicleMap from './components/VehicleMap'
import LineFilter from './components/LineFilter'
import { useVehicles } from './hooks/useVehicles'
import { LINES, getLineId } from './lines'

function App() {
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [selectedLines, setSelectedLines] = useState(LINES.map((line) => line.id))
  const [search, setSearch] = useState('')
  const { vehicles, stopsById, routesById, error, lastUpdated, refresh } = useVehicles(autoRefresh)

  function toggleLine(lineId) {
    setSelectedLines((current) =>
      current.includes(lineId)
        ? current.filter((id) => id !== lineId)
        : [...current, lineId]
    )
  }

  const query = search.trim().toLowerCase()
  const filteredVehicles = vehicles.filter((v) => {
    const routeId = v.relationships.route.data?.id ?? ''
    if (!selectedLines.includes(getLineId(routeId))) return false
    if (query === '') return true

    const stopId = v.relationships.stop.data?.id
    const stopName = stopsById[stopId]?.attributes.name ?? ''
    return stopName.toLowerCase().includes(query) || routeId.toLowerCase().includes(query)
  })

  return (
    <main>
      <h1>Chaos Meter</h1>

      <LineFilter selectedLines={selectedLines} onToggle={toggleLine} />

      <div className="controls">
        <input
          type="search"
          className="search"
          placeholder="Search stops (e.g. Kenmore)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={refresh}>Refresh now</button>
        <label>
          <input
            type="checkbox"
            checked={autoRefresh}
            onChange={(e) => setAutoRefresh(e.target.checked)}
          />
          Auto-refresh every 10s
        </label>
        <span>
          {lastUpdated
            ? `${filteredVehicles.length} of ${vehicles.length} trains · updated ${lastUpdated.toLocaleTimeString()}`
            : 'Loading trains…'}
        </span>
      </div>

      {error && <p className="error">Couldn't update: {error}</p>}

      <VehicleMap vehicles={filteredVehicles} stopsById={stopsById} routesById={routesById} />
    </main>
  )
}

export default App