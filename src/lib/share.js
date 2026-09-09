import { getRank, toPowerLevel, formatPowerLevel } from './ranks.js'

const SITE = 'https://dragonballquiz.com'

/** Résumé texte de la partie, prêt à coller dans un message ou un post. */
export function buildShareText({ category, difficulty, results }) {
  const total = results.length
  const score = results.filter(Boolean).length
  const rank = getRank(score, total)
  const grid = results.map((ok) => (ok ? '🟡' : '⬛')).join('')

  return [
    `⚡ Dragon Ball Quiz — ${category.label} (${difficulty.label.toLowerCase()})`,
    `${grid}`,
    `Score : ${score}/${total} · Rang : ${rank.label}`,
    `Puissance de combat estimée : ${formatPowerLevel(toPowerLevel(score, total))}`,
    '',
    `À toi de faire mieux → ${SITE}`,
  ].join('\n')
}
