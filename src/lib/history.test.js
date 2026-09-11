import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { clearHistory, formatWhen, loadHistory, pushGame } from './history.js'
import { installerStockage } from '../test/stockage-memoire.js'

const CLE = 'dbq.history.v1'

let memoire
beforeEach(() => {
  memoire = installerStockage()
})

const partie = (extra = {}) => ({
  category: 'sagas',
  difficultyId: 'moyen',
  difficulty: 'Moyen',
  chrono: false,
  score: 6,
  total: 10,
  points: 3500,
  maxPoints: 5600,
  ...extra,
})

describe('journal des parties', () => {
  it('commence vide', () => {
    expect(loadHistory()).toEqual([])
  })

  it('ajoute chaque partie en tête et la conserve', () => {
    pushGame(partie({ score: 3 }))
    const journal = pushGame(partie({ score: 7 }))
    expect(journal.map((p) => p.score)).toEqual([7, 3])
    expect(loadHistory()).toEqual(journal)
  })

  it('normalise l’entrée enregistrée', () => {
    const [entree] = pushGame(partie({ chrono: 0 }))
    expect(entree.chrono).toBe(false)
    expect(entree).toMatchObject({ points: 3500, maxPoints: 5600, difficultyId: 'moyen' })
    expect(Number.isNaN(Date.parse(entree.date))).toBe(false)
  })

  it('plafonne le journal à 20 parties, en gardant les plus récentes', () => {
    let journal
    for (let i = 1; i <= 25; i++) journal = pushGame(partie({ category: `c${i}` }))
    expect(journal).toHaveLength(20)
    expect(journal[0].category).toBe('c25')
    expect(journal.at(-1).category).toBe('c6')
    expect(loadHistory()).toHaveLength(20)
  })

  it('ignore un journal corrompu ou qui n’est pas une liste', () => {
    memoire.set(CLE, '{oups')
    expect(loadHistory()).toEqual([])
    memoire.set(CLE, '{"partie":1}')
    expect(loadHistory()).toEqual([])
  })

  it('rend la partie jouée même quand le quota est dépassé', () => {
    installerStockage({ plein: true })
    const journal = pushGame(partie())
    expect(journal).toHaveLength(1)
  })

  it('ne plante pas quand le stockage est refusé en bloc', () => {
    installerStockage({ indisponible: true })
    expect(loadHistory()).toEqual([])
    expect(() => pushGame(partie())).not.toThrow()
    expect(clearHistory()).toEqual([])
  })

  it('clearHistory vide le journal', () => {
    pushGame(partie())
    expect(clearHistory()).toEqual([])
    expect(memoire.has(CLE)).toBe(false)
  })
})

describe('formatWhen', () => {
  const MAINTENANT = new Date('2026-09-11T12:00:00Z')
  const relatif = (locale) => new Intl.RelativeTimeFormat(locale, { numeric: 'auto' })

  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(MAINTENANT)
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  it('dit « maintenant » plutôt que « il y a 0 minute »', () => {
    expect(formatWhen('2026-09-11T11:59:50Z', 'fr-FR')).toBe(relatif('fr-FR').format(0, 'second'))
  })

  it('compte en minutes, puis en heures, puis en jours', () => {
    expect(formatWhen('2026-09-11T11:55:00Z', 'fr-FR')).toBe(relatif('fr-FR').format(-5, 'minute'))
    expect(formatWhen('2026-09-11T09:00:00Z', 'fr-FR')).toBe(relatif('fr-FR').format(-3, 'hour'))
    expect(formatWhen('2026-09-09T12:00:00Z', 'fr-FR')).toBe(relatif('fr-FR').format(-2, 'day'))
  })

  it('passe à une date courte au-delà d’une semaine', () => {
    const date = new Date('2026-08-01T12:00:00Z')
    const attendu = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'short' }).format(date)
    expect(formatWhen(date.toISOString(), 'fr-FR')).toBe(attendu)
  })

  it('suit la langue demandée', () => {
    expect(formatWhen('2026-09-11T11:55:00Z', 'en-GB')).toBe(relatif('en-GB').format(-5, 'minute'))
  })

  it('rend une chaîne vide pour une date illisible', () => {
    expect(formatWhen('pas une date')).toBe('')
  })
})
