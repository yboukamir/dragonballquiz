/**
 * Niveaux de difficulté et tirage d'une manche.
 *
 * Aucun libellé ici : ils dépendent de la langue et vivent dans
 * `src/i18n/`. Ce fichier ne décrit que des règles de jeu, identiques
 * quelle que soit la banque de questions utilisée.
 *
 * `mix` décrit la répartition souhaitée entre questions faciles (1),
 * moyennes (2) et difficiles (3). Si la banque ne contient pas assez de
 * questions d'un palier, `buildRound` complète avec les questions
 * restantes les plus proches du palier visé — le tirage ne casse jamais.
 */
export const DIFFICULTIES = [
  {
    id: 'facile',
    count: 10,
    mix: { 1: 0.7, 2: 0.3, 3: 0 },
    accent: 'jade',
    // Secondes par question en mode chrono. Le temps se resserre avec le
    // niveau : les questions difficiles sont plus longues à lire, mais
    // celui qui les connaît répond d'instinct.
    seconds: 15,
  },
  {
    id: 'moyen',
    count: 10,
    mix: { 1: 0.2, 2: 0.6, 3: 0.2 },
    accent: 'orange',
    seconds: 12,
  },
  {
    id: 'difficile',
    // 10 et non 15 : tirer 15 questions dans le vivier moyen+difficile
    // imposait un minimum de questions communes entre deux parties
    // consécutives. À 10, ce plancher tombe à zéro.
    count: 10,
    mix: { 1: 0, 2: 0.4, 3: 0.6 },
    accent: 'crimson',
    seconds: 10,
  },
]

export const getDifficulty = (id) =>
  DIFFICULTIES.find((d) => d.id === id) ?? DIFFICULTIES[0]

/**
 * Barème : ce que rapporte une bonne réponse, selon le palier de la question.
 *
 * Une manche mélange toujours plusieurs paliers (voir `mix` ci-dessus).
 * Compter chaque bonne réponse pour un point revenait donc à payer une
 * évidence au prix d'un détail que presque personne ne connaît. Trois
 * valeurs rondes suffisent : l'écart doit se sentir sans qu'on ait à
 * calculer.
 */
export const POINTS = { 1: 300, 2: 500, 3: 1000 }

export const pointsOf = (question) => POINTS[question?.diff] ?? POINTS[1]

/**
 * Bilan d'une manche : bonnes réponses d'un côté, points de l'autre.
 *
 * Les deux sont conservés. Le rapport `points / maxPoints` sert au rang et
 * à la puissance de combat, mais « 8/10 » reste ce qu'on annonce à un ami :
 * le remplacer par un total de points seul rendrait le score illisible.
 *
 * `results` fait foi sur le nombre de questions réellement jouées.
 */
export function scoreRound(round, results) {
  let correct = 0
  let points = 0
  let maxPoints = 0

  for (let i = 0; i < results.length; i++) {
    const valeur = pointsOf(round?.[i])
    maxPoints += valeur
    if (results[i]) {
      correct++
      points += valeur
    }
  }

  return { correct, total: results.length, points, maxPoints }
}

/** Regroupe une banque par catégorie, sans hypothèse sur la langue. */
export function groupByCategory(questions) {
  const parCategorie = {}
  for (const q of questions) {
    ;(parCategorie[q.cat] ??= []).push(q)
  }
  return parCategorie
}

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
 * Dans les fichiers de données, la bonne réponse est toujours `a[0]` :
 * c'est ici, et seulement ici, que sa position réelle est décidée.
 */
export function buildRound(questions, categoryId, difficultyId) {
  const difficulty = getDifficulty(difficultyId)
  const pool = (questions ?? []).filter((q) => q.cat === categoryId)
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
