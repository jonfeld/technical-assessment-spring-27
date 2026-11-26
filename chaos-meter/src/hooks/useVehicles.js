import { useCallback, useEffect, useState } from 'react'

const API_KEY = import.meta.env.VITE_MBTA_API_KEY
const VEHICLES_URL =
  `https://api-v3.mbta.com/vehicles?filter[route_type]=0,1&include=stop,route&api_key=${API_KEY}`
const REFRESH_MS = 10000

export function useVehicles(autoRefresh) {
  const [vehicles, setVehicles] = useState([])
  const [stopsById, setStopsById] = useState({})
  const [routesById, setRoutesById] = useState({})
  const [error, setError] = useState(null)
  const [lastUpdated, setLastUpdated] = useState(null)

  const loadVehicles = useCallback(async () => {
    try {
      const res = await fetch(VEHICLES_URL)
      if (!res.ok) throw new Error(`MBTA API error: ${res.status}`)
      const json = await res.json()

      const stops = {}
      const routes = {}
      for (const item of json.included ?? []) {
        if (item.type === 'stop') stops[item.id] = item
        if (item.type === 'route') routes[item.id] = item
      }

      setStopsById(stops)
      setRoutesById(routes)


      setVehicles(json.data)
      setLastUpdated(new Date())
      setError(null)
    } catch (err) {
      setError(err.message)
    }
  }, [])

  useEffect(() => {
    loadVehicles()
    if (!autoRefresh) return
    const intervalId = setInterval(loadVehicles, REFRESH_MS)
    return () => clearInterval(intervalId)
  }, [autoRefresh, loadVehicles])

  return { vehicles, stopsById, routesById, error, lastUpdated, refresh: loadVehicles }
}