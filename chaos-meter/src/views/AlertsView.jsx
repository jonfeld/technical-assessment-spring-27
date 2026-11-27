import { useState } from 'react'
import AlertCard from '../components/AlertCard'
import LineFilter from '../components/LineFilter'
import { LINES } from '../lines'
import { getAlertLineIds, isFacilityAlert } from '../alerts'

function AlertsView({ alerts }) {
  const [selectedLines, setSelectedLines] = useState(LINES.map((line) => line.id))
  const [showFacilities, setShowFacilities] = useState(false)

  function toggleLine(lineId) {
    setSelectedLines((current) =>
      current.includes(lineId)
        ? current.filter((id) => id !== lineId)
        : [...current, lineId]
    )
  }

  const visibleAlerts = alerts
    .filter((alert) => showFacilities || !isFacilityAlert(alert))
    .filter((alert) => {
      const lineIds = getAlertLineIds(alert)
      return lineIds.length === 0 || lineIds.some((id) => selectedLines.includes(id))
    })
    .sort((a, b) => b.attributes.severity - a.attributes.severity)

  return (
    <section className="view">
      <h2>Service Alerts</h2>

      <LineFilter selectedLines={selectedLines} onToggle={toggleLine} />

      <label className="facility-toggle">
        <input
          type="checkbox"
          checked={showFacilities}
          onChange={(e) => setShowFacilities(e.target.checked)}
        />
        Show elevator &amp; escalator alerts
      </label>

      {visibleAlerts.length === 0 ? (
        <p className="empty-state">No major disruptions right now 🎉</p>
      ) : (
        <div className="alert-list">
          {visibleAlerts.map((alert) => (
            <AlertCard key={alert.id} alert={alert} />
          ))}
        </div>
      )}
    </section>
  )
}

export default AlertsView