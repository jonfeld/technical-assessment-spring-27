export const LINES = [
  { id: 'Red', name: 'Red Line', color: '#DA291C' },
  { id: 'Orange', name: 'Orange Line', color: '#ED8B00' },
  { id: 'Blue', name: 'Blue Line', color: '#003DA5' },
  { id: 'Green', name: 'Green Line', color: '#00843D' },
  { id: 'Mattapan', name: 'Mattapan', color: '#DA291C' },
]

export function getLineId(routeId) {
  if (routeId.startsWith('Green')) return 'Green'
  return routeId
}

export function getLineColor(routeId) {
  const line = LINES.find((line) => line.id === getLineId(routeId))
  return line?.color ?? '#888888'
}