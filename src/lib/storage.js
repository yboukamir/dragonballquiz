/**
 * Persistance des meilleurs scores.
 *
 * Pas de backend en v1 : tout vit dans le localStorage du visiteur.
 * Chaque accès est protégé — navigation privée, cookies bloqués ou quota
 * dépassé ne doivent jamais casser le jeu, seulement désactiver la mémoire.
 *
 * Forme stockée : { [categorie]: { normal?: Record, chrono?: Record } }
 * Record : { score, total, points, maxPoints, ratio, difficultyId, ... }
 *
 * Les deux modes ont leur propre emplacement. Les mélanger reviendrait à
 * comparer un score au chronomètre avec un score sans contrainte de temps :
 * le second l'emporterait presque toujours au pourcentage, et le mode
 * chrono ne décrocherait jamais de record.
 */
import { ratioDe } from './ranks.js'

const KEY = 'dbq.best.v3'
const KEY_V2 = 'dbq.best.v2'
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
 * catégorie, et les range dans l'emplacement « normal ». Chaînée derrière
 * la v2 : un visiteur revenu après une longue absence peut n'avoir jamais
 * connu de version intermédiaire.
 */
function migrerV1() {
  const ancien = lireBrut(KEY_V1)
  if (!ancien) return {}

  const migre = {}
  for (const [categorie, record] of Object.entries(ancien)) {
    if (estRecord(record)) migre[categorie] = { normal: record }
  }
  return migre
}

/**
 * Reprend les records de la v2. La forme ne change pas ; ce qui change est
 * la façon de départager deux résultats, désormais pondérée par la
 * difficulté des questions tirées. Les records repris n'ont pas de points :
 * `ratioDe` les compare sur leur rapport brut, faute de mieux. Le premier
 * résultat pondéré qui les dépasse remet la catégorie sur la bonne échelle.
 */
function migrerV2() {
  const ancien = lireBrut(KEY_V2)
  if (!ancien) return migrerV1()

  const migre = {}
  for (const [categorie, modes] of Object.entries(ancien)) {
    if (!modes || typeof modes !== 'object') continue
    const repris = {}
    for (const mode of ['normal', 'chrono']) {
      if (estRecord(modes[mode])) repris[mode] = modes[mode]
    }
    if (Object.keys(repris).length > 0) migre[categorie] = repris
  }
  return migre
}

/** @returns {{ [categorie: string]: { normal?: object, chrono?: object } }} */
export function loadBestScores() {
  const actuel = lireBrut(KEY)
  if (actuel) return actuel

  const migre = migrerV2()
  // Les anciennes clés sont laissées en place : les perdre serait
  // irréversible si une version antérieure du site revenait d'un cache.
  if (Object.keys(migre).length > 0) ecrire(migre)
  return migre
}

/**
 * Enregistre le résultat s'il bat le meilleur score du même mode, dans la
 * même catégorie. La comparaison se fait sur le taux pondéré par la
 * difficulté, puis sur les points, enfin sur le nombre de bonnes réponses.
 *
 * L'ordre compte : à taux égal, deux manches n'ont pas forcément le même
 * total de points en jeu, et celle qui en a engrangé le plus a affronté les
 * questions les plus chères.
 */
export function saveScore(
  categoryId,
  { score, total, points, maxPoints, difficulty, difficultyId, chrono = false },
) {
  const tout = loadBestScores()
  const emplacement = chrono ? 'chrono' : 'normal'
  const parCategorie = tout[categoryId] ?? {}
  const precedent = parCategorie[emplacement]

  const candidat = { score, total, points, maxPoints }
  const ratio = ratioDe(candidat)
  const ratioPrecedent = ratioDe(precedent)

  const meilleur =
    !precedent ||
    ratio > ratioPrecedent ||
    (ratio === ratioPrecedent &&
      ((points ?? 0) > (precedent.points ?? 0) || score > precedent.score))

  if (!meilleur) return { all: tout, updated: false }

  const suivant = {
    ...tout,
    [categoryId]: {
      ...parCategorie,
      [emplacement]: {
        score,
        total,
        points,
        maxPoints,
        ratio,
        // On garde l identifiant du niveau, traduisible a l affichage, et le
        // libelle d origine comme repli pour les records d avant le bilingue.
        difficultyId,
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
    window.localStorage.removeItem(KEY_V2)
    window.localStorage.removeItem(KEY_V1)
  } catch {
    /* rien à faire : la mémoire n'était de toute façon pas disponible */
  }
  return {}
}
