import { getLineId } from './lines'

const FACILITY_EFFECTS = ['ELEVATOR_CLOSURE', 'ESCALATOR_CLOSURE', 'ACCESS_ISSUE']

export function isFacilityAlert(alert) {
  return FACILITY_EFFECTS.includes(alert.attributes.effect)
}

export function getAlertLineIds(alert) {
  const lineIds = new Set()
  for (const entity of alert.attributes.informed_entity ?? []) {
    if (entity.route) lineIds.add(getLineId(entity.route))
  }
  return [...lineIds]
}

export function formatEffect(effect) {
  if (!effect) return 'Alert'
  const text = effect.replaceAll('_', ' ').toLowerCase()
  return text.charAt(0).toUpperCase() + text.slice(1)
}