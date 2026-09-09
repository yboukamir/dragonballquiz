/**
 * Rangs attribués en fin de partie, du plus faible au plus fort.
 * `min` est le pourcentage de bonnes réponses à partir duquel le rang
 * est atteint. Les libellés sont des clins d'œil, pas des citations.
 */
export const RANKS = [
  {
    id: 'terrien',
    label: 'Terrien lambda',
    min: 0,
    tagline: 'Le fermier au fusil a fait mieux. Et il n’avait qu’une puissance de 5.',
    color: 'smoke',
  },
  {
    id: 'eleve',
    label: 'Élève de la Tortue',
    min: 20,
    tagline: 'Tu as porté la carapace, mais tu n’as pas encore fini le premier tour de l’île.',
    color: 'sky',
  },
  {
    id: 'guerrier-z',
    label: 'Guerrier Z',
    min: 40,
    tagline: 'Solide. Tu tiens la ligne de front, même si Nappa te fait encore peur.',
    color: 'cobalt',
  },
  {
    id: 'super-saiyan',
    label: 'Super Saiyan',
    min: 60,
    tagline: 'La légende est réveillée. Les cheveux tiennent tout seuls, désormais.',
    color: 'ki',
  },
  {
    id: 'blue',
    label: 'Super Saiyan Blue',
    min: 75,
    tagline: 'Maîtrise divine du ki. Et un score qui commence à faire du bruit.',
    color: 'sky',
  },
  {
    id: 'ultra-instinct',
    label: 'Ultra Instinct',
    min: 90,
    tagline: 'Tu réponds avant même d’avoir lu la question. Le corps agit seul.',
    color: 'orange',
  },
  {
    id: 'zeno',
    label: 'Zeno en personne',
    min: 100,
    tagline: 'Sans faute. À ce niveau-là, tu n’es plus un joueur, tu es l’arbitre.',
    color: 'crimson',
  },
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

export const formatPowerLevel = (value) =>
  new Intl.NumberFormat('fr-FR').format(value)
