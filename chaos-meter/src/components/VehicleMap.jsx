import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet'
import { getLineColor } from '../lines'

const BOSTON = [42.3601, -71.0589]


const STATUS_TEXT = {
  IN_TRANSIT_TO: 'In transit to',
  INCOMING_AT: 'Arriving at',
  STOPPED_AT: 'Stopped at',
}


function VehicleMap({ vehicles, stopsById }) {
  return (
    <MapContainer center={BOSTON} zoom={12} className="vehicle-map">
            <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {vehicles.map((v) => {
        const { latitude, longitude, current_status, label, updated_at } = v.attributes
        const routeId = v.relationships.route.data?.id ?? 'No route'
        const stopId = v.relationships.stop.data?.id
        const stopName = stopsById[stopId]?.attributes.name ?? 'unknown stop'

        return (
          <CircleMarker
            key={v.id}
            center={[latitude, longitude]}
            radius={7}
            pathOptions={{
              color: 'white',
              weight: 2,
              fillColor: getLineColor(routeId),
              fillOpacity: 1,
            }}
          >
            <Popup>
              <strong>{routeId}</strong> · Car {label}
              <br />
              {STATUS_TEXT[current_status] ?? current_status} {stopName}
              <br />
              <small>Updated {new Date(updated_at).toLocaleTimeString()}</small>
            </Popup>
          </CircleMarker>
        )
      })}
    </MapContainer>
  )
}

export default VehicleMap