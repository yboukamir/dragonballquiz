import { describe, expect, it } from 'vitest'
import { DIFFICULTIES, buildRound, getDifficulty, pointsOf, scoreRound } from './quiz.js'

describe('pointsOf', () => {
  it('suit le barème 300 / 500 / 1 000', () => {
    expect([1, 2, 3].map((diff) => pointsOf({ diff }))).toEqual([300, 500, 1000])
  })

  it('retombe sur le palier facile pour une question inconnue', () => {
    expect(pointsOf({ diff: 7 })).toBe(300)
    expect(pointsOf(undefined)).toBe(300)
  })
})

describe('scoreRound', () => {
  // Deux difficiles, une moyenne, une facile : 2 800 points en jeu.
  const manche = [3, 3, 2, 1].map((diff, i) => ({ id: `q${i}`, diff }))

  it('compte les bonnes réponses et les points qu’elles valent', () => {
    expect(scoreRound(manche, [true, false, true, false])).toEqual({
      correct: 2,
      total: 4,
      points: 1500,
      maxPoints: 2800,
    })
  })

  it('un sans-faute vaut exactement le total en jeu', () => {
    const bilan = scoreRound(manche, [true, true, true, true])
    expect(bilan.points).toBe(bilan.maxPoints)
  })

  it('un zéro pointé vaut zéro, avec le même total en jeu', () => {
    expect(scoreRound(manche, [false, false, false, false])).toEqual({
      correct: 0,
      total: 4,
      points: 0,
      maxPoints: 2800,
    })
  })

  it('ne compte que les réponses réellement données', () => {
    expect(scoreRound(manche, [true, true])).toEqual({
      correct: 2,
      total: 2,
      points: 2000,
      maxPoints: 2000,
    })
  })
})

describe('buildRound', () => {
  const banque = Array.from({ length: 36 }, (_, i) => ({
    id: `x${i}`,
    cat: i < 30 ? 'sagas' : 'power',
    diff: (i % 3) + 1,
    q: `Question ${i}`,
    a: [`bonne ${i}`, 'leurre 1', 'leurre 2', 'leurre 3'],
    why: 'Explication.',
  }))

  it.each(DIFFICULTIES.map((d) => [d.id, d.count]))(
    'en %s, tire %i questions de la catégorie demandée, sans doublon',
    (difficulte, nombre) => {
      const tirage = buildRound(banque, 'sagas', difficulte)
      expect(tirage).toHaveLength(nombre)
      expect(new Set(tirage.map((q) => q.id)).size).toBe(nombre)
      for (const q of tirage) expect(banque.find((b) => b.id === q.id).cat).toBe('sagas')
    },
  )

  it('marque une seule bonne réponse, là où correctIndex l’annonce', () => {
    for (const q of buildRound(banque, 'sagas', 'moyen')) {
      expect(q.answers.filter((a) => a.correct)).toHaveLength(1)
      expect(q.answers[q.correctIndex].label).toBe(banque.find((b) => b.id === q.id).a[0])
    }
  })

  it('getDifficulty retombe sur le premier niveau pour un identifiant inconnu', () => {
    expect(getDifficulty('inconnu')).toBe(DIFFICULTIES[0])
  })
})
