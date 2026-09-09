/**
 * Rangs attribués en fin de partie, du plus faible au plus fort.
 *
 * `min` est le taux de réussite, en pourcentage, à partir duquel le rang est
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

/**
 * Taux de réussite d'un résultat, entre 0 et 1.
 *
 * Pondéré par la difficulté dès que les points sont connus. Les records et
 * les parties enregistrés avant le barème n'en ont pas : ils retombent sur
 * le rapport brut, ce qui les garde lisibles plutôt que de les afficher à
 * zéro. Un même joueur peut donc avoir, un temps, des lignes calculées sur
 * deux échelles — l'écart se résorbe dès sa partie suivante.
 */
export function ratioDe(resultat) {
  if (!resultat) return 0
  const { points, maxPoints, score, total } = resultat
  if (typeof points === 'number' && maxPoints > 0) return points / maxPoints
  return total > 0 ? score / total : 0
}

export function getRank(ratio) {
  const pct = ratio * 100
  let rank = RANKS[0]
  for (const candidate of RANKS) if (pct >= candidate.min) rank = candidate
  return rank
}

/**
 * Traduit un score en "puissance de combat", pour le plaisir du partage.
 * Progression exponentielle calibrée sur deux bornes canoniques :
 * 0 % → 5 (le fermier), 100 % → 120 000 000 (Freezer à pleine puissance).
 */
export function toPowerLevel(ratio) {
  const borne = Math.min(Math.max(ratio, 0), 1)
  const raw = 5 * Math.pow(24_000_000, borne)
  if (raw < 1000) return Math.round(raw)
  if (raw < 100_000) return Math.round(raw / 10) * 10
  return Math.round(raw / 1000) * 1000
}

