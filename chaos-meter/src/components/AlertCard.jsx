import { LINES } from '../lines'
import { getAlertLineIds, formatEffect } from '../alerts'

function AlertCard({ alert }) {
  const { header, description, severity, effect, updated_at } = alert.attributes
  const lineIds = getAlertLineIds(alert)
  const lines = LINES.filter((line) => lineIds.includes(line.id))
  const accentColor = lines[0]?.color ?? '#888888'

  return (
    <article className="alert-card" style={{ '--line-color': accentColor }}>
      <div className="alert-meta">
        {lines.map((line) => (
          <span key={line.id} className="line-tag" style={{ background: line.color }}>
            {line.name}
          </span>
        ))}
        <span className="alert-effect">{formatEffect(effect)}</span>
        <span className="alert-severity">Severity {severity}/10</span>
      </div>

      <p className="alert-header">{header}</p>

      {description && (
        <details>
          <summary>More details</summary>
          <p className="alert-description">{description}</p>
        </details>
      )}

      <small>Updated {new Date(updated_at).toLocaleString()}</small>
    </article>
  )
}

export default AlertCard