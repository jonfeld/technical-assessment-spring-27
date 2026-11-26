import { useState } from 'react'
import VehicleMap from './components/VehicleMap'
import { useVehicles } from './hooks/useVehicles'

function App() {
  const [autoRefresh, setAutoRefresh] = useState(true)
  const { vehicles, stopsById, error, lastUpdated, refresh } = useVehicles(autoRefresh)

  return (
    <main>
      <h1>Chaos Meter</h1>

      <div className="controls">
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
            ? `${vehicles.length} trains · updated ${lastUpdated.toLocaleTimeString()}`
            : 'Loading trains…'}
        </span>
      </div>

      {error && <p className="error">Couldn't update: {error}</p>}

      <VehicleMap vehicles={vehicles} stopsById={stopsById} />
    </main>
  )
}

export default App