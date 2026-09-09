/**
 * Aperçu du texte de partage et de l'échelle des rangs, dans les deux
 * langues. Purement visuel : il s'agit de relire ce qu'un joueur va coller
 * dans une conversation, ce qu'aucune assertion ne remplace.
 *
 *   npm run check:share
 */
import { buildSharePayload } from '../src/lib/share.js'
import { getRank, toPowerLevel } from '../src/lib/ranks.js'
import { POINTS, scoreRound } from '../src/lib/quiz.js'
import { formatNombre } from '../src/lib/format.js'
import fr from '../src/i18n/fr.js'
import en from '../src/i18n/en.js'

const results = [true, false, true, true, false, true, true, false, true, true]

// Manche type du niveau difficile : 40 % de moyennes, 60 % de difficiles.
const round = [3, 3, 3, 3, 3, 3, 2, 2, 2, 2].map((diff, i) => ({ id: `q${i}`, diff }))
const bilan = scoreRound(round, results)

for (const t of [fr, en]) {
  console.log(`\n=== ${t.nom} ===`)
  console.log(
    buildSharePayload({
      categoryId: 'power',
      difficultyId: 'difficile',
      bilan,
      results,
      chrono: true,
      t,
    }).full,
  )

  console.log('\n--- paliers de rang (manche non pondérée) ---')
  const lignes = []
  for (let s = 0; s <= 10; s++) {
    const ratio = s / 10
    const r = t.rangs[getRank(ratio).id].label
    lignes.push(`${s}/10 ${r} (${formatNombre(toPowerLevel(ratio), t.locale)})`)
  }
  console.log(lignes.join('\n'))
}

// Le barème n'a d'intérêt que si l'écart se voit. À nombre de bonnes
// réponses identique, celui qui a répondu aux questions chères doit sortir
// devant : c'est exactement ce que l'ancien décompte ne distinguait pas.
console.log('\n=== Effet du barème, à 5/10 dans les deux cas ===')
console.log('Barème :', POINTS)
const grosses = scoreRound(round, [true, true, true, true, true, false, false, false, false, false])
const petites = scoreRound(round, [true, false, false, false, false, false, true, true, true, true])
for (const [nom, b] of [
  ['5 justes, toutes difficiles ', grosses],
  ['5 justes, surtout moyennes  ', petites],
]) {
  const ratio = b.points / b.maxPoints
  console.log(
    `${nom} → ${b.correct}/${b.total}, ${b.points}/${b.maxPoints} pts, ` +
      `${Math.round(ratio * 100)} % → ${fr.rangs[getRank(ratio).id].label}`,
  )
}
