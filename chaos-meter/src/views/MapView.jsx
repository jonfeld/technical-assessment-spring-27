import { useState } from 'react'
import VehicleMap from '../components/VehicleMap'
import LineFilter from '../components/LineFilter'
import { LINES, getLineId } from '../lines'

function MapView({ vehicles, stopsById, routesById }) {
  const [selectedLines, setSelectedLines] = useState(LINES.map((line) => line.id))
  const [search, setSearch] = useState('')

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
    <section>
      <LineFilter selectedLines={selectedLines} onToggle={toggleLine} />

      <div className="controls">
        <input
          type="search"
          className="search"
          placeholder="Search stops (e.g. Kenmore)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <span>Showing {filteredVehicles.length} of {vehicles.length} trains</span>
      </div>

      <VehicleMap vehicles={filteredVehicles} stopsById={stopsById} routesById={routesById} />
    </section>
  )
}

export default MapView