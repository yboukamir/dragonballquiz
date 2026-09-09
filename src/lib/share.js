import { getRank, ratioDe, toPowerLevel } from './ranks.js'
import { formatNombre } from './format.js'

export const SITE_URL = 'https://dragonballquiz.com'

/**
 * Prépare le résumé de la partie sous deux formes, parce que les deux
 * canaux de partage n'attendent pas la même chose :
 *
 * - `text` + `url` séparés pour l'API Web Share, qui ajoute elle-même le
 *   lien. Les concaténer ici le ferait apparaître deux fois.
 * - `full` d'un seul tenant pour le presse-papier, qui n'ajoute rien.
 */
export function buildSharePayload({ categoryId, difficultyId, bilan, results, chrono = false, t }) {
  const { correct, total, points, maxPoints } = bilan
  const ratio = ratioDe(bilan)
  const rang = t.rangs[getRank(ratio).id].label
  const grille = results.map((ok) => (ok ? '🟡' : '⬛')).join('')

  const niveau = t.niveaux[difficultyId].label.toLowerCase()
  const mode = chrono ? `${niveau}, ${t.partage.mentionChrono}` : niveau

  const corps = [
    `⚡ ${t.partage.titre} — ${t.categories[categoryId].label} (${mode})`,
    grille,
    t.partage.ligneScore(correct, total, rang),
    t.partage.lignePoints(formatNombre(points, t.locale), formatNombre(maxPoints, t.locale)),
    t.partage.lignePuissance(formatNombre(toPowerLevel(ratio), t.locale)),
  ].join('\n')

  return {
    title: t.partage.titre,
    text: `${corps}\n\n${t.partage.invitation} :`,
    url: SITE_URL,
    full: `${corps}\n\n${t.partage.invitation} → ${SITE_URL}`,
  }
}
