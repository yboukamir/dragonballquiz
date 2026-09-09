import { QUESTIONS_BY_CATEGORY } from '../data/questions.js'

/**
 * Niveaux de difficulté.
 *
 * `mix` décrit la répartition souhaitée entre questions faciles (1),
 * moyennes (2) et difficiles (3). Si la banque ne contient pas assez de
 * questions d'un palier, `buildRound` complète avec les questions
 * restantes les plus proches du palier visé — le tirage ne casse jamais.
 */
export const DIFFICULTIES = [
  {
    id: 'facile',
    label: 'Facile',
    subtitle: '10 questions',
    blurb: 'Les bases de la série. Idéal pour chauffer.',
    count: 10,
    mix: { 1: 0.7, 2: 0.3, 3: 0 },
    accent: 'jade',
  },
  {
    id: 'moyen',
    label: 'Moyen',
    subtitle: '10 questions',
    blurb: 'Il faut avoir suivi les arcs jusqu’au bout.',
    count: 10,
    mix: { 1: 0.2, 2: 0.6, 3: 0.2 },
    accent: 'orange',
  },
  {
    id: 'difficile',
    label: 'Difficile',
    subtitle: '10 questions',
    blurb: 'Chiffres exacts, seconds rôles, détails de films.',
    // 10 et non 15 : tirer 15 questions dans le vivier moyen+difficile
    // (22 questions) imposait au minimum 8 questions communes entre deux
    // parties consécutives. À 10, ce plancher tombe à zéro.
    count: 10,
    mix: { 1: 0, 2: 0.4, 3: 0.6 },
    accent: 'crimson',
  },
]

export const getDifficulty = (id) =>
  DIFFICULTIES.find((d) => d.id === id) ?? DIFFICULTIES[0]

/** Mélange de Fisher-Yates, sur une copie du tableau. */
export function shuffle(list) {
  const out = [...list]
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

/**
 * Construit une manche : tire les questions selon la difficulté, mélange
 * leur ordre, puis mélange les 4 propositions de chacune.
 *
 * Dans `data/questions.js`, la bonne réponse est toujours `a[0]` : c'est
 * ici, et seulement ici, que sa position réelle est décidée.
 */
export function buildRound(categoryId, difficultyId) {
  const difficulty = getDifficulty(difficultyId)
  const pool = QUESTIONS_BY_CATEGORY[categoryId] ?? []
  const picked = pickQuestions(pool, difficulty)

  return shuffle(picked).map((question) => {
    const answers = shuffle(
      question.a.map((label, index) => ({ label, correct: index === 0 })),
    )
    return {
      id: question.id,
      diff: question.diff,
      prompt: question.q,
      why: question.why,
      answers,
      correctIndex: answers.findIndex((answer) => answer.correct),
    }
  })
}

function pickQuestions(pool, difficulty) {
  const { count, mix } = difficulty
  const byLevel = { 1: [], 2: [], 3: [] }
  for (const question of pool) byLevel[question.diff]?.push(question)

  const selected = []
  const used = new Set()

  // 1. Quota par palier, arrondi à l'entier inférieur.
  for (const level of [3, 2, 1]) {
    const quota = Math.floor(count * (mix[level] ?? 0))
    for (const question of shuffle(byLevel[level]).slice(0, quota)) {
      selected.push(question)
      used.add(question.id)
    }
  }

  // 2. Complément : on pioche dans le reste, en privilégiant les paliers
  //    les plus proches de la difficulté dominante demandée.
  if (selected.length < count) {
    const target = Number(
      Object.keys(mix).reduce((a, b) => (mix[a] >= mix[b] ? a : b)),
    )
    const rest = shuffle(pool.filter((q) => !used.has(q.id))).sort(
      (a, b) => Math.abs(a.diff - target) - Math.abs(b.diff - target),
    )
    selected.push(...rest.slice(0, count - selected.length))
  }

  return selected.slice(0, count)
}
