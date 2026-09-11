import { beforeEach, describe, expect, it } from 'vitest'
import { clearBestScores, loadBestScores, saveScore } from './storage.js'
import { installerStockage } from '../test/stockage-memoire.js'

const V1 = 'dbq.best.v1'
const V2 = 'dbq.best.v2'
const V3 = 'dbq.best.v3'

let memoire
beforeEach(() => {
  memoire = installerStockage()
})

const lire = (cle) => JSON.parse(memoire.get(cle))
const poser = (cle, valeur) => memoire.set(cle, JSON.stringify(valeur))

/** Un record tel que les versions sans barème l'enregistraient. */
const ancien = (score, total, extra = {}) => ({
  score,
  total,
  pct: score / total,
  difficulty: 'Moyen',
  ...extra,
})

/** Une partie jouée avec le barème pondéré. */
const partie = (extra = {}) => ({
  score: 5,
  total: 10,
  points: 5000,
  maxPoints: 8000,
  difficultyId: 'difficile',
  difficulty: 'Difficile',
  ...extra,
})

describe('loadBestScores — migrations', () => {
  it('rend un objet vide sur un navigateur vierge, sans rien écrire', () => {
    expect(loadBestScores()).toEqual({})
    expect(memoire.has(V3)).toBe(false)
  })

  it('reprend les records v1 dans l’emplacement classique', () => {
    poser(V1, { sagas: ancien(7, 10) })
    expect(loadBestScores()).toEqual({ sagas: { normal: ancien(7, 10) } })
    expect(lire(V3)).toEqual({ sagas: { normal: ancien(7, 10) } })
  })

  it('reprend les records v2, en mode classique comme en chrono', () => {
    const v2 = { sagas: { normal: ancien(8, 10), chrono: ancien(6, 10, { chrono: true }) } }
    poser(V2, v2)
    expect(loadBestScores()).toEqual(v2)
    expect(lire(V3)).toEqual(v2)
  })

  it('laisse les anciennes clés en place après migration', () => {
    poser(V1, { sagas: ancien(7, 10) })
    poser(V2, { power: { normal: ancien(4, 10) } })
    loadBestScores()
    expect(memoire.has(V1)).toBe(true)
    expect(memoire.has(V2)).toBe(true)
  })

  it('écarte les enregistrements malformés sans perdre les autres', () => {
    poser(V2, {
      sagas: { normal: ancien(8, 10), chrono: { score: 'huit' } },
      power: null,
      techniques: { normal: 42 },
    })
    expect(loadBestScores()).toEqual({ sagas: { normal: ancien(8, 10) } })
  })

  it('préfère la v2 à la v1 quand les deux existent', () => {
    poser(V1, { sagas: ancien(2, 10) })
    poser(V2, { sagas: { normal: ancien(9, 10) } })
    expect(loadBestScores().sagas.normal.score).toBe(9)
  })

  it('ne remigre pas une fois la v3 écrite', () => {
    poser(V3, { power: { normal: ancien(3, 10) } })
    poser(V2, { sagas: { normal: ancien(9, 10) } })
    expect(loadBestScores()).toEqual({ power: { normal: ancien(3, 10) } })
  })

  it('survit à un contenu corrompu', () => {
    memoire.set(V3, '{pas du json')
    expect(loadBestScores()).toEqual({})
  })

  it('fonctionne quand le stockage est refusé en bloc', () => {
    installerStockage({ indisponible: true })
    expect(loadBestScores()).toEqual({})
  })
})

describe('saveScore — qui détient le record', () => {
  it('enregistre un premier résultat avec ses points et son taux', () => {
    const { all, updated } = saveScore('sagas', partie())
    expect(updated).toBe(true)
    expect(all.sagas.normal).toMatchObject({
      score: 5,
      total: 10,
      points: 5000,
      maxPoints: 8000,
      ratio: 0.625,
      difficultyId: 'difficile',
      chrono: false,
    })
    expect(lire(V3)).toEqual(all)
  })

  it('un taux pondéré supérieur bat le record', () => {
    saveScore('sagas', partie({ points: 5000 }))
    expect(saveScore('sagas', partie({ score: 6, points: 6000 })).updated).toBe(true)
    expect(lire(V3).sagas.normal.points).toBe(6000)
  })

  it('un taux inférieur ne le bat pas, même avec plus de bonnes réponses', () => {
    saveScore('sagas', partie({ score: 5, points: 5000, maxPoints: 8000 })) // 62,5 %
    // 6/10, mais surtout sur des questions faciles : 2 400 / 5 600, soit 43 %
    expect(saveScore('sagas', partie({ score: 6, points: 2400, maxPoints: 5600 })).updated).toBe(false)
  })

  it('à taux égal, les points départagent avant le nombre de bonnes réponses', () => {
    saveScore('sagas', partie({ score: 5, points: 4000, maxPoints: 8000 })) // 50 %
    // 50 % aussi et une bonne réponse de plus, mais 1 200 points de moins :
    // le record en place a affronté des questions plus chères, il reste.
    expect(saveScore('sagas', partie({ score: 6, points: 2800, maxPoints: 5600 })).updated).toBe(false)
    expect(lire(V3).sagas.normal.points).toBe(4000)
  })

  it('à taux et points égaux, plus de bonnes réponses l’emporte', () => {
    saveScore('sagas', partie({ score: 2, points: 2000, maxPoints: 5600 }))
    expect(saveScore('sagas', partie({ score: 4, points: 2000, maxPoints: 5600 })).updated).toBe(true)
  })

  it('à égalité parfaite, le record en place est conservé', () => {
    saveScore('sagas', partie())
    expect(saveScore('sagas', partie()).updated).toBe(false)
  })

  it('un ancien record sans points cède à taux égal, et la catégorie repasse au barème', () => {
    poser(V3, { sagas: { normal: ancien(5, 10) } }) // 50 %, sans points
    expect(saveScore('sagas', partie({ points: 4000, maxPoints: 8000 })).updated).toBe(true)
    expect(lire(V3).sagas.normal.points).toBe(4000)
  })

  it('un ancien record reste en place face à un taux pondéré plus faible', () => {
    poser(V3, { sagas: { normal: ancien(8, 10) } }) // 80 %
    expect(saveScore('sagas', partie()).updated).toBe(false) // 62,5 %
  })

  it('tient un record séparé pour le mode chrono', () => {
    saveScore('sagas', partie({ points: 7000 }))
    const { all, updated } = saveScore('sagas', partie({ points: 3000, chrono: true }))
    expect(updated).toBe(true)
    expect(all.sagas.normal.points).toBe(7000)
    expect(all.sagas.chrono.points).toBe(3000)
  })

  it('garde les catégories indépendantes', () => {
    saveScore('sagas', partie({ points: 7000 }))
    saveScore('power', partie({ points: 2000 }))
    expect(lire(V3).sagas.normal.points).toBe(7000)
    expect(lire(V3).power.normal.points).toBe(2000)
  })

  it('ne plante pas quand le quota est dépassé', () => {
    installerStockage({ plein: true })
    expect(() => saveScore('sagas', partie())).not.toThrow()
  })

  it('ne plante pas quand le stockage est refusé en bloc', () => {
    installerStockage({ indisponible: true })
    expect(() => saveScore('sagas', partie())).not.toThrow()
  })
})

describe('clearBestScores', () => {
  it('efface les trois versions sans toucher aux autres données', () => {
    poser(V1, {})
    poser(V2, {})
    poser(V3, { sagas: { normal: ancien(7, 10) } })
    memoire.set('dbq.lang.v1', 'en')
    memoire.set('dbq.history.v1', '[]')

    expect(clearBestScores()).toEqual({})
    expect([V1, V2, V3].some((cle) => memoire.has(cle))).toBe(false)
    expect(memoire.get('dbq.lang.v1')).toBe('en')
    expect(memoire.has('dbq.history.v1')).toBe(true)
  })

  it('ne plante pas quand le stockage est refusé en bloc', () => {
    installerStockage({ indisponible: true })
    expect(clearBestScores()).toEqual({})
  })
})
