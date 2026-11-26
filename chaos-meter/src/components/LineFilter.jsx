import { LINES } from '../lines'

function LineFilter({ selectedLines, onToggle }) {
  return (
    <div className="line-filter">
      {LINES.map((line) => {
        const isActive = selectedLines.includes(line.id)
        return (
          <button
            key={line.id}
            className={isActive ? 'line-chip active' : 'line-chip'}
            style={{ '--line-color': line.color }}
            onClick={() => onToggle(line.id)}
            aria-pressed={isActive}
          >
            {line.name}
          </button>
        )
      })}
    </div>
  )
}

export default LineFilter