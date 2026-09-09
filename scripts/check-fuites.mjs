/**
 * Cherche les explications qui donnent la réponse d'une autre question.
 *
 *   npm run check:fuites
 *
 * Le feedback affiché après une réponse est lu attentivement : si son texte
 * contient mot pour mot la bonne réponse d'une autre question de la même
 * catégorie, cette question-là est déflorée pour le reste de la partie.
 *
 * Volontairement **hors de `npm run check`** : l'outil ne sait pas distinguer
 * une divulgation d'une simple mention. « Akira Toriyama » ou « Super Saiyan »
 * reviennent partout sans rien gâcher, alors que citer « le Black Freezer »
 * dans une explication tuait la question qui le demandait. C'est un rapport à
 * relire, pas un test à faire passer — d'où la sortie toujours en succès.
 *
 * Le seuil de longueur écarte le bruit : une réponse de moins de neuf
 * caractères (« 5 », « Goku », « 1984 ») se retrouve trop souvent par hasard.
 */
import { QUESTIONS as FR } from '../src/data/questions.fr.js'
import { QUESTIONS as EN } from '../src/data/questions.en.js'

const LONGUEUR_MIN = 9

const normaliser = (s) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()

let total = 0

for (const [langue, banque] of [
  ['fr', FR],
  ['en', EN],
]) {
  console.log(`\n=== Banque ${langue.toUpperCase()} ===`)
  let n = 0

  for (const q of banque) {
    const why = ` ${normaliser(q.why)} `
    for (const autre of banque) {
      if (autre.id === q.id || autre.cat !== q.cat) continue
      const reponse = normaliser(autre.a[0])
      if (reponse.length < LONGUEUR_MIN) continue
      if (why.includes(` ${reponse} `)) {
        console.log(`  ${q.id} → ${autre.id} : « ${autre.a[0]} »`)
        n++
      }
    }
  }

  console.log(n === 0 ? '  aucune mention croisée' : `  ${n} mentions à relire`)
  total += n
}

console.log(`\n${total} au total. À relire une à une : une mention n'est pas une divulgation.`)
