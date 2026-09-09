import { buildShareText } from '../src/lib/share.js'
import { CATEGORIES } from '../src/data/questions.js'
import { DIFFICULTIES } from '../src/lib/quiz.js'
import { getRank, toPowerLevel, formatPowerLevel } from '../src/lib/ranks.js'

const results = [true,false,true,true,false,true,true,false,true,true,false,true,true,false,false]
console.log(buildShareText({
  category: CATEGORIES[0],
  difficulty: DIFFICULTIES[2],
  results,
}))
console.log('\n--- Paliers de rang ---')
for (const total of [10, 15]) {
  const line = []
  for (let s = 0; s <= total; s++) line.push(`${s}/${total} ${getRank(s,total).label} (${formatPowerLevel(toPowerLevel(s,total))})`)
  console.log(line.join('\n'))
  console.log('')
}
