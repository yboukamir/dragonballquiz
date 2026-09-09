/**
 * Persistance des meilleurs scores.
 *
 * Pas de backend en v1 : tout vit dans le localStorage du visiteur.
 * Chaque accès est protégé — navigation privée, cookies bloqués ou quota
 * dépassé ne doivent jamais casser le jeu, seulement désactiver la mémoire.
 */
const KEY = 'dbq.best.v1'

function readAll() {
  try {
    const raw = window.localStorage.getItem(KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw)
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch {
    return {}
  }
}

function writeAll(data) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(data))
    return true
  } catch {
    return false
  }
}

/** @returns {{ [categoryId: string]: BestScore }} */
export function loadBestScores() {
  return readAll()
}

/**
 * Enregistre le résultat s'il bat le meilleur score de la catégorie.
 * La comparaison se fait sur le pourcentage, puis sur le nombre de bonnes
 * réponses : 10/10 en facile ne doit pas écraser 14/15 en difficile.
 */
export function saveScore(categoryId, { score, total, difficulty }) {
  const all = readAll()
  const previous = all[categoryId]
  const pct = total > 0 ? score / total : 0

  const isBetter =
    !previous ||
    pct > previous.pct ||
    (pct === previous.pct && score > previous.score)

  if (!isBetter) return { all, updated: false }

  const next = {
    ...all,
    [categoryId]: {
      score,
      total,
      pct,
      difficulty,
      date: new Date().toISOString(),
    },
  }
  writeAll(next)
  return { all: next, updated: true }
}

export function clearBestScores() {
  try {
    window.localStorage.removeItem(KEY)
  } catch {
    /* rien à faire : la mémoire n'était de toute façon pas disponible */
  }
  return {}
}
