import { buildSharePayload } from '../src/lib/share.js'
import { getRank, toPowerLevel, formatPowerLevel } from '../src/lib/ranks.js'
import fr from '../src/i18n/fr.js'
import en from '../src/i18n/en.js'

const results = [true, false, true, true, false, true, true, false, true, true]

for (const t of [fr, en]) {
  console.log(`\n=== ${t.nom} ===`)
  console.log(buildSharePayload({
    categoryId: 'power',
    difficultyId: 'difficile',
    results,
    chrono: true,
    t,
  }).full)

  console.log('\n--- paliers de rang ---')
  const lignes = []
  for (let s = 0; s <= 10; s++) {
    const r = t.rangs[getRank(s, 10).id].label
    lignes.push(`${s}/10 ${r} (${formatPowerLevel(toPowerLevel(s, 10), t.locale)})`)
  }
  console.log(lignes.join('\n'))
}
