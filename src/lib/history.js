/**
 * Journal des dernières parties.
 *
 * Stocké à part des records (`storage.js`) : ceux-ci ne gardent que le
 * meilleur résultat, alors qu'un historique a besoin de la chronologie,
 * y compris des parties ratées — c'est précisément là qu'on voit sa
 * progression.
 *
 * Le journal est plafonné : sans limite, un joueur assidu finirait par
 * remplir le quota du localStorage, et l'écriture échouerait alors
 * silencieusement pour tout le reste du site.
 */
const KEY = 'dbq.history.v1'
const MAX = 20

function lire() {
  try {
    const brut = window.localStorage.getItem(KEY)
    if (!brut) return []
    const parsed = JSON.parse(brut)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

/** @returns {Array<{category, difficulty, chrono, score, total, date}>} du plus récent au plus ancien */
export function loadHistory() {
  return lire()
}

/** Ajoute une partie en tête et renvoie le journal mis à jour. */
export function pushGame(partie) {
  const entree = {
    category: partie.category,
    difficulty: partie.difficulty,
    chrono: Boolean(partie.chrono),
    score: partie.score,
    total: partie.total,
    date: new Date().toISOString(),
  }

  const suivant = [entree, ...lire()].slice(0, MAX)
  try {
    window.localStorage.setItem(KEY, JSON.stringify(suivant))
  } catch {
    /* mémoire indisponible : la partie en cours reste affichable */
  }
  return suivant
}

export function clearHistory() {
  try {
    window.localStorage.removeItem(KEY)
  } catch {
    /* rien à faire */
  }
  return []
}

const relatif = new Intl.RelativeTimeFormat('fr', { numeric: 'auto' })
const dateCourte = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'short' })

/**
 * « à l'instant », « il y a 5 min », « hier », puis une date au-delà d'une
 * semaine — au-delà, l'écart en jours ne dit plus rien d'utile.
 */
export function formatWhen(iso) {
  const quand = new Date(iso)
  if (Number.isNaN(quand.getTime())) return ''

  const secondes = Math.round((quand.getTime() - Date.now()) / 1000)
  const absolu = Math.abs(secondes)

  if (absolu < 45) return "à l'instant"
  if (absolu < 3600) return relatif.format(Math.round(secondes / 60), 'minute')
  if (absolu < 86400) return relatif.format(Math.round(secondes / 3600), 'hour')
  if (absolu < 7 * 86400) return relatif.format(Math.round(secondes / 86400), 'day')
  return dateCourte.format(quand)
}
