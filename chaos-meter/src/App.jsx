import { useEffect, useState } from 'react'
import VehicleMap from './components/VehicleMap'

const API_KEY = import.meta.env.VITE_MBTA_API_KEY
const VEHICLES_URL =
  `https://api-v3.mbta.com/vehicles?filter[route_type]=0,1&include=stop&api_key=${API_KEY}`

function App() {
  const [vehicles, setVehicles] = useState([])
  const [stopsById, setStopsById] = useState({})
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadVehicles(){
      try{
        const res = await fetch(VEHICLES_URL)
        if (!res.ok) throw new Error('MBTA API error: ${res.status}')
        const json = await res.json()
      console.log(json)

        const stops = {}
        for (const item of json.included ?? []) {
          if (item.type == 'stop') stops[item.id] = item
        }
      
       setStopsById(stops)
       setVehicles(json.data)
      } catch (err) {
        setError(err.message)
      }
    }
    loadVehicles()
  }, [])

  if (error) return <p>Something went wrong: {error}</p>

  return(
    <main>
      <h1>Chaos Meter </h1>
      <p>{vehicles.length} trains running right now</p>
      <VehicleMap vehicles={vehicles} stopsById={stopsById} />
    </main>
  )

}

export default App