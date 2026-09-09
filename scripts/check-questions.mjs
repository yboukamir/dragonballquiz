import { QUESTIONS, CATEGORIES, QUESTIONS_BY_CATEGORY } from '../src/data/questions.js'
import { buildRound, DIFFICULTIES } from '../src/lib/quiz.js'

let fail = 0
const err = (m) => { console.log('  ✗ ' + m); fail++ }

console.log(`Total : ${QUESTIONS.length} questions`)

const ids = new Set()
for (const q of QUESTIONS) {
  if (ids.has(q.id)) err(`id dupliqué : ${q.id}`)
  ids.add(q.id)
  if (q.a.length !== 4) err(`${q.id} : ${q.a.length} propositions au lieu de 4`)
  if (new Set(q.a).size !== 4) err(`${q.id} : propositions en double`)
  if (![1, 2, 3].includes(q.diff)) err(`${q.id} : diff invalide`)
  if (!CATEGORIES.some((c) => c.id === q.cat)) err(`${q.id} : catégorie inconnue`)
  if (!q.why) err(`${q.id} : explication manquante`)
}

for (const c of CATEGORIES) {
  const pool = QUESTIONS_BY_CATEGORY[c.id]
  const by = [1, 2, 3].map((d) => pool.filter((q) => q.diff === d).length)
  console.log(`  ${c.label.padEnd(30)} ${String(pool.length).padStart(2)} (facile ${by[0]} / moyen ${by[1]} / difficile ${by[2]})`)
}

// Le tirage doit toujours rendre le bon nombre de questions, sans doublon.
for (const c of CATEGORIES) {
  for (const d of DIFFICULTIES) {
    for (let i = 0; i < 200; i++) {
      const round = buildRound(c.id, d.id)
      if (round.length !== d.count) { err(`${c.id}/${d.id} : ${round.length} questions au lieu de ${d.count}`); break }
      if (new Set(round.map((q) => q.id)).size !== round.length) { err(`${c.id}/${d.id} : doublon dans la manche`); break }
      for (const q of round) {
        if (!QUESTIONS_BY_CATEGORY[c.id].some((src) => src.id === q.id)) { err(`${c.id}/${d.id} : ${q.id} n'appartient pas à la catégorie`); break }
        if (q.answers.length !== 4) { err(`${c.id}/${d.id} : ${q.id} n'a pas 4 réponses`); break }
        if (q.answers.filter((a) => a.correct).length !== 1) { err(`${c.id}/${d.id} : ${q.id} n'a pas exactement 1 bonne réponse`); break }
        if (!q.answers[q.correctIndex]?.correct) { err(`${c.id}/${d.id} : correctIndex incohérent sur ${q.id}`); break }
      }
    }
  }
}

// La bonne réponse doit finir répartie sur les 4 positions.
const spread = [0, 0, 0, 0]
for (let i = 0; i < 2000; i++) for (const q of buildRound('power', 'moyen')) spread[q.correctIndex]++
console.log('Répartition de la bonne réponse (A/B/C/D) :', spread.map((n) => `${Math.round((n / spread.reduce((a, b) => a + b)) * 100)}%`).join(' '))

console.log(fail === 0 ? '\n✓ Toutes les vérifications passent.' : `\n${fail} problème(s).`)
process.exit(fail ? 1 : 0)
