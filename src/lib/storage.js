/**
 * Persistance des meilleurs scores.
 *
 * Pas de backend en v1 : tout vit dans le localStorage du visiteur.
 * Chaque accès est protégé — navigation privée, cookies bloqués ou quota
 * dépassé ne doivent jamais casser le jeu, seulement désactiver la mémoire.
 *
 * Forme stockée : { [categorie]: { normal?: Record, chrono?: Record } }
 *
 * Les deux modes ont leur propre emplacement. Les mélanger reviendrait à
 * comparer un score au chronomètre avec un score sans contrainte de temps :
 * le second l'emporterait presque toujours au pourcentage, et le mode
 * chrono ne décrocherait jamais de record.
 */
const KEY = 'dbq.best.v2'
const KEY_V1 = 'dbq.best.v1'

const estRecord = (r) =>
  r && typeof r === 'object' && typeof r.score === 'number' && typeof r.total === 'number'

function lireBrut(cle) {
  try {
    const brut = window.localStorage.getItem(cle)
    if (!brut) return null
    const parsed = JSON.parse(brut)
    return parsed && typeof parsed === 'object' ? parsed : null
  } catch {
    return null
  }
}

function ecrire(donnees) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(donnees))
    return true
  } catch {
    return false
  }
}

/**
 * Reprend les records de la v1, qui ne connaissait qu'un score par
 * catégorie, et les range dans l'emplacement « normal ». La clé v1 est
 * laissée en place : elle ne gêne pas, et la perdre serait irréversible
 * si une version antérieure du site revenait à être servie depuis un cache.
 */
function migrerV1() {
  const ancien = lireBrut(KEY_V1)
  if (!ancien) return {}

  const migre = {}
  for (const [categorie, record] of Object.entries(ancien)) {
    if (estRecord(record)) migre[categorie] = { normal: record }
  }
  if (Object.keys(migre).length > 0) ecrire(migre)
  return migre
}

/** @returns {{ [categorie: string]: { normal?: object, chrono?: object } }} */
export function loadBestScores() {
  const actuel = lireBrut(KEY)
  if (actuel) return actuel
  return migrerV1()
}

/**
 * Enregistre le résultat s'il bat le meilleur score du même mode, dans la
 * même catégorie. La comparaison se fait sur le pourcentage, puis sur le
 * nombre de bonnes réponses.
 */
export function saveScore(categoryId, { score, total, difficulty, chrono = false }) {
  const tout = loadBestScores()
  const emplacement = chrono ? 'chrono' : 'normal'
  const parCategorie = tout[categoryId] ?? {}
  const precedent = parCategorie[emplacement]
  const pct = total > 0 ? score / total : 0

  const meilleur =
    !precedent || pct > precedent.pct || (pct === precedent.pct && score > precedent.score)

  if (!meilleur) return { all: tout, updated: false }

  const suivant = {
    ...tout,
    [categoryId]: {
      ...parCategorie,
      [emplacement]: {
        score,
        total,
        pct,
        difficulty,
        chrono,
        date: new Date().toISOString(),
      },
    },
  }
  ecrire(suivant)
  return { all: suivant, updated: true }
}

export function clearBestScores() {
  try {
    window.localStorage.removeItem(KEY)
    window.localStorage.removeItem(KEY_V1)
  } catch {
    /* rien à faire : la mémoire n'était de toute façon pas disponible */
  }
  return {}
}
