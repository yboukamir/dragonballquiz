/**
 * Rangs attribués en fin de partie, du plus faible au plus fort.
 *
 * `min` est le pourcentage de bonnes réponses à partir duquel le rang est
 * atteint. Les libellés dépendent de la langue et vivent dans
 * `src/i18n/` : ici on ne garde que le seuil et la couleur.
 */
export const RANKS = [
  { id: 'terrien', min: 0, color: 'smoke' },
  { id: 'eleve', min: 20, color: 'sky' },
  { id: 'guerrier-z', min: 40, color: 'cobalt' },
  { id: 'super-saiyan', min: 60, color: 'ki' },
  { id: 'blue', min: 75, color: 'sky' },
  { id: 'ultra-instinct', min: 90, color: 'orange' },
  { id: 'zeno', min: 100, color: 'crimson' },
]

export function getRank(score, total) {
  const pct = total > 0 ? (score / total) * 100 : 0
  let rank = RANKS[0]
  for (const candidate of RANKS) if (pct >= candidate.min) rank = candidate
  return rank
}

/**
 * Traduit un score en "puissance de combat", pour le plaisir du partage.
 * Progression exponentielle calibrée sur deux bornes canoniques :
 * 0 % → 5 (le fermier), 100 % → 120 000 000 (Freezer à pleine puissance).
 */
export function toPowerLevel(score, total) {
  if (total <= 0) return 5
  const ratio = score / total
  const raw = 5 * Math.pow(24_000_000, ratio)
  if (raw < 1000) return Math.round(raw)
  if (raw < 100_000) return Math.round(raw / 10) * 10
  return Math.round(raw / 1000) * 1000
}

export const formatPowerLevel = (value, locale = 'fr-FR') =>
  new Intl.NumberFormat(locale).format(value)
