import { QUESTIONS as FR } from '../src/data/questions.fr.js'
import { QUESTIONS as EN } from '../src/data/questions.en.js'
import { CATEGORIES } from '../src/data/categories.js'
import { buildRound, DIFFICULTIES, POINTS, scoreRound } from '../src/lib/quiz.js'
import { ratioDe } from '../src/lib/ranks.js'
import frStrings from '../src/i18n/fr.js'
import enStrings from '../src/i18n/en.js'

let fail = 0
const err = (m) => {
  console.log('  ✗ ' + m)
  fail++
}

const BANQUES = { fr: FR, en: EN }

// Normalisation grossière : deux questions qui ne different que par la
// ponctuation ou la casse sont des doublons pour le joueur.
const normaliser = (s) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{M}/gu, '') // marques diacritiques isolées par la décomposition NFD
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()

for (const [langue, banque] of Object.entries(BANQUES)) {
  console.log(`\n=== Banque ${langue.toUpperCase()} — ${banque.length} questions ===`)

  const enonces = new Map()
  const ids = new Set()

  for (const q of banque) {
    const cle = normaliser(q.q)
    if (enonces.has(cle)) err(`${langue} : énoncé en double — ${q.id} et ${enonces.get(cle)}`)
    else enonces.set(cle, q.id)

    if (ids.has(q.id)) err(`${langue} : id dupliqué — ${q.id}`)
    ids.add(q.id)

    if (q.a.length !== 4) err(`${langue}/${q.id} : ${q.a.length} propositions au lieu de 4`)
    if (new Set(q.a).size !== 4) err(`${langue}/${q.id} : propositions en double`)
    if (![1, 2, 3].includes(q.diff)) err(`${langue}/${q.id} : diff invalide`)
    if (!CATEGORIES.some((c) => c.id === q.cat)) err(`${langue}/${q.id} : catégorie inconnue`)
    if (!q.why) err(`${langue}/${q.id} : explication manquante`)
  }

  for (const c of CATEGORIES) {
    const pool = banque.filter((q) => q.cat === c.id)
    const by = [1, 2, 3].map((d) => pool.filter((q) => q.diff === d).length)
    console.log(
      `  ${c.id.padEnd(14)} ${String(pool.length).padStart(2)} (facile ${by[0]} / moyen ${by[1]} / difficile ${by[2]})`,
    )
  }

  // Le tirage doit toujours rendre le bon nombre de questions, sans doublon.
  for (const c of CATEGORIES) {
    for (const d of DIFFICULTIES) {
      for (let i = 0; i < 120; i++) {
        const round = buildRound(banque, c.id, d.id)
        if (round.length !== d.count) {
          err(`${langue}/${c.id}/${d.id} : ${round.length} questions au lieu de ${d.count}`)
          break
        }
        if (new Set(round.map((q) => q.id)).size !== round.length) {
          err(`${langue}/${c.id}/${d.id} : doublon dans la manche`)
          break
        }
        for (const q of round) {
          if (!banque.some((src) => src.id === q.id && src.cat === c.id)) {
            err(`${langue}/${c.id}/${d.id} : ${q.id} n'appartient pas à la catégorie`)
            break
          }
          if (q.answers.filter((a) => a.correct).length !== 1) {
            err(`${langue}/${c.id}/${d.id} : ${q.id} n'a pas exactement 1 bonne réponse`)
            break
          }
          if (!q.answers[q.correctIndex]?.correct) {
            err(`${langue}/${c.id}/${d.id} : correctIndex incohérent sur ${q.id}`)
            break
          }
        }
      }
    }
  }
}

/* ---------------------------------------------------------------------
   Barème pondéré : un sans-faute doit valoir exactement le total en jeu,
   un zéro pointé valoir zéro, et le taux rester borné entre les deux.
   Une erreur ici fausserait silencieusement rangs, records et partages.
--------------------------------------------------------------------- */
console.log('\n=== Barème pondéré ===')
{
  for (const niveau of [1, 2, 3]) {
    if (!Number.isInteger(POINTS[niveau]) || POINTS[niveau] <= 0) {
      err(`barème : palier ${niveau} sans valeur exploitable`)
    }
  }
  if (!(POINTS[1] < POINTS[2] && POINTS[2] < POINTS[3])) {
    err('barème : les paliers ne sont pas strictement croissants')
  }

  let minRatio = 1
  let maxRatio = 0
  for (const c of CATEGORIES) {
    for (const d of DIFFICULTIES) {
      const round = buildRound(FR, c.id, d.id)

      const parfait = scoreRound(round, round.map(() => true))
      if (parfait.points !== parfait.maxPoints) {
        err(`barème/${c.id}/${d.id} : un sans-faute ne vaut pas le total en jeu`)
      }
      if (ratioDe(parfait) !== 1) err(`barème/${c.id}/${d.id} : sans-faute hors barème`)

      const nul = scoreRound(round, round.map(() => false))
      if (nul.points !== 0 || ratioDe(nul) !== 0) {
        err(`barème/${c.id}/${d.id} : un zéro pointé ne vaut pas zéro`)
      }
      if (nul.maxPoints !== parfait.maxPoints) {
        err(`barème/${c.id}/${d.id} : le total en jeu dépend des réponses`)
      }

      // Une manche à moitié réussie sert de témoin : son taux doit rester
      // dans les bornes, quelle que soit la répartition des paliers tirés.
      const moitie = scoreRound(round, round.map((_, i) => i % 2 === 0))
      const r = ratioDe(moitie)
      if (!(r > 0 && r < 1)) err(`barème/${c.id}/${d.id} : taux hors bornes (${r})`)
      minRatio = Math.min(minRatio, r)
      maxRatio = Math.max(maxRatio, r)
    }
  }
  console.log(
    `  5/10 vaut entre ${Math.round(minRatio * 100)} % et ${Math.round(maxRatio * 100)} % selon les questions tirées`,
  )
}

/* ---------------------------------------------------------------------
   Parité entre banques : une question traduite doit garder son identité,
   sa catégorie et son niveau, sans quoi un joueur qui change de langue
   verrait ses records porter sur un jeu différent.
--------------------------------------------------------------------- */
console.log('\n=== Parité FR / EN ===')
const parId = (banque) => new Map(banque.map((q) => [q.id, q]))
const frParId = parId(FR)
const enParId = parId(EN)

for (const id of frParId.keys()) {
  if (!enParId.has(id)) err(`parité : ${id} absent de la banque EN`)
}
for (const id of enParId.keys()) {
  if (!frParId.has(id)) err(`parité : ${id} absent de la banque FR`)
}
for (const [id, q] of frParId) {
  const autre = enParId.get(id)
  if (!autre) continue
  if (autre.cat !== q.cat) err(`parité : ${id} change de catégorie (${q.cat} ≠ ${autre.cat})`)
  if (autre.diff !== q.diff) err(`parité : ${id} change de niveau (${q.diff} ≠ ${autre.diff})`)
  if (autre.q === q.q) err(`parité : ${id} n'est pas traduit (énoncé identique)`)
}
console.log(`  ${frParId.size} identifiants comparés`)

/* ---------------------------------------------------------------------
   Parité des dictionnaires : une clé oubliée dans une langue produirait
   un « undefined » à l'écran, sans erreur ni avertissement.
--------------------------------------------------------------------- */
console.log('\n=== Parité des dictionnaires ===')
function chemins(objet, prefixe = '') {
  const sortie = []
  for (const [cle, valeur] of Object.entries(objet)) {
    const chemin = prefixe ? `${prefixe}.${cle}` : cle
    if (valeur && typeof valeur === 'object' && !Array.isArray(valeur)) {
      sortie.push(...chemins(valeur, chemin))
    } else {
      sortie.push(`${chemin}:${typeof valeur}`)
    }
  }
  return sortie
}

const clesFr = new Set(chemins(frStrings))
const clesEn = new Set(chemins(enStrings))
for (const cle of clesFr) if (!clesEn.has(cle)) err(`dictionnaire : ${cle} manquant ou de type différent en EN`)
for (const cle of clesEn) if (!clesFr.has(cle)) err(`dictionnaire : ${cle} manquant ou de type différent en FR`)
console.log(`  ${clesFr.size} clés comparées`)

console.log(
  fail === 0 ? '\n✓ Toutes les vérifications passent.' : `\n${fail} problème(s).`,
)
process.exit(fail ? 1 : 0)
