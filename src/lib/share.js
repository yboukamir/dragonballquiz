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
export function buildSharePayload({ category, difficulty, results }) {
  const total = results.length
  const score = results.filter(Boolean).length
  const rank = getRank(score, total)
  const grid = results.map((ok) => (ok ? '🟡' : '⬛')).join('')

  const corps = [
    `⚡ Dragon Ball Quiz — ${category.label} (${difficulty.label.toLowerCase()})`,
    grid,
    `Score : ${score}/${total} · Rang : ${rank.label}`,
    `Puissance de combat estimée : ${formatPowerLevel(toPowerLevel(score, total))}`,
  ].join('\n')

  return {
    title: 'Dragon Ball Quiz',
    text: `${corps}\n\nÀ toi de faire mieux :`,
    url: SITE_URL,
    full: `${corps}\n\nÀ toi de faire mieux → ${SITE_URL}`,
  }
}

/** Résumé d'un seul tenant, pour le presse-papier. */
export const buildShareText = (partie) => buildSharePayload(partie).full
