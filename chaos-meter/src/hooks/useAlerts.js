import { useCallback, useEffect, useState } from 'react'

const API_KEY = import.meta.env.VITE_MBTA_API_KEY
const ALERTS_URL =
  `https://api-v3.mbta.com/alerts?filter[route_type]=0,1&filter[datetime]=NOW&api_key=${API_KEY}`
const REFRESH_MS = 60000

export function useAlerts(autoRefresh) {
  const [alerts, setAlerts] = useState([])
  const [error, setError] = useState(null)

  const loadAlerts = useCallback(async () => {
    try {
      const res = await fetch(ALERTS_URL)
      if (!res.ok) throw new Error(`MBTA API error: ${res.status}`)
      const json = await res.json()
      setAlerts(json.data)
      setError(null)
    } catch (err) {
      setError(err.message)
    }
  }, [])

  useEffect(() => {
    loadAlerts()
    if (!autoRefresh) return
    const intervalId = setInterval(loadAlerts, REFRESH_MS)
    return () => clearInterval(intervalId)
  }, [autoRefresh, loadAlerts])

  return { alerts, error, refresh: loadAlerts }
}