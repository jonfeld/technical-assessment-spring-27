import { useState } from 'react'
import { NavLink, Route, Routes } from 'react-router'
import { useVehicles } from './hooks/useVehicles'
import MapView from './views/MapView'
import AlertsView from './views/AlertsView'
import AnalyticsView from './views/AnalyticsView'

function App() {
  const [autoRefresh, setAutoRefresh] = useState(true)
  const { vehicles, stopsById, routesById, error, lastUpdated, refresh } = useVehicles(autoRefresh)

  return (
    <>
      <header className="app-header">
        <h1>Chaos Meter</h1>

        <nav className="nav">
          <NavLink to="/" end>Live Map</NavLink>
          <NavLink to="/alerts">Alerts</NavLink>
          <NavLink to="/analytics">Analytics</NavLink>
        </nav>

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
            {lastUpdated ? `Updated ${lastUpdated.toLocaleTimeString()}` : 'Loading trains…'}
          </span>
        </div>
      </header>

      {error && <p className="error">Couldn't update: {error}</p>}

      <main>
        <Routes>
          <Route
            path="/"
            element={<MapView vehicles={vehicles} stopsById={stopsById} routesById={routesById} />}
          />
          <Route path="/alerts" element={<AlertsView />} />
          <Route path="/analytics" element={<AnalyticsView />} />
          <Route path="*" element={<p className="view">Page not found.</p>} />
        </Routes>
      </main>
    </>
  )
}

export default App