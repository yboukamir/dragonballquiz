import { getRank, toPowerLevel, formatPowerLevel } from './ranks.js'

export const SITE_URL = 'https://dragonballquiz.com'

/**
 * Prépare le résumé de la partie sous deux formes, parce que les deux
 * canaux de partage n'attendent pas la même chose :
 *
 * - `text` + `url` séparés pour l'API Web Share, qui ajoute elle-même le
 *   lien. Les concaténer ici le ferait apparaître deux fois.
 * - `full` d'un seul tenant pour le presse-papier, qui n'ajoute rien.
 */
export function buildSharePayload({ categoryId, difficultyId, results, chrono = false, t }) {
  const total = results.length
  const score = results.filter(Boolean).length
  const rang = t.rangs[getRank(score, total).id].label
  const grille = results.map((ok) => (ok ? '🟡' : '⬛')).join('')

  const niveau = t.niveaux[difficultyId].label.toLowerCase()
  const mode = chrono ? `${niveau}, ${t.partage.mentionChrono}` : niveau

  const corps = [
    `⚡ ${t.partage.titre} — ${t.categories[categoryId].label} (${mode})`,
    grille,
    t.partage.ligneScore(score, total, rang),
    t.partage.lignePuissance(formatPowerLevel(toPowerLevel(score, total), t.locale)),
  ].join('\n')

  return {
    title: t.partage.titre,
    text: `${corps}\n\n${t.partage.invitation} :`,
    url: SITE_URL,
    full: `${corps}\n\n${t.partage.invitation} → ${SITE_URL}`,
  }
}
