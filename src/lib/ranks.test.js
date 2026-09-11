import { describe, expect, it } from 'vitest'
import { RANKS, getRank, ratioDe, toPowerLevel } from './ranks.js'

describe('ratioDe', () => {
  it('pondère par les points quand ils sont connus', () => {
    expect(ratioDe({ score: 5, total: 10, points: 5000, maxPoints: 8000 })).toBe(0.625)
  })

  it("retombe sur la fraction pour un enregistrement d'avant le barème", () => {
    expect(ratioDe({ score: 8, total: 10 })).toBe(0.8)
  })

  it('prend en compte des points nuls plutôt que de retomber sur la fraction', () => {
    expect(ratioDe({ score: 3, total: 10, points: 0, maxPoints: 8000 })).toBe(0)
  })

  it('ignore des points sans total en jeu', () => {
    expect(ratioDe({ score: 4, total: 10, points: 100, maxPoints: 0 })).toBe(0.4)
  })

  it('vaut 0 sans résultat exploitable', () => {
    expect(ratioDe(null)).toBe(0)
    expect(ratioDe(undefined)).toBe(0)
    expect(ratioDe({ score: 0, total: 0 })).toBe(0)
  })
})

describe('getRank', () => {
  it('garde des seuils strictement croissants, sans quoi un rang serait inatteignable', () => {
    const seuils = RANKS.map((r) => r.min)
    expect(seuils).toEqual([...seuils].sort((a, b) => a - b))
    expect(new Set(seuils).size).toBe(seuils.length)
  })

  it.each([
    [0, 'terrien'],
    [0.1999, 'terrien'],
    [0.2, 'eleve'],
    [0.4, 'guerrier-z'],
    [0.6, 'super-saiyan'],
    [0.7499, 'super-saiyan'],
    [0.75, 'blue'],
    [0.8999, 'blue'],
    [0.9, 'ultra-instinct'],
    [0.9999, 'ultra-instinct'],
    [1, 'zeno'],
  ])('un taux de %s donne le rang %s', (ratio, id) => {
    expect(getRank(ratio).id).toBe(id)
  })

  it('atteint Super Saiyan Blue à 6 000 points sur 8 000, comme en production', () => {
    expect(getRank(ratioDe({ score: 7, total: 10, points: 6000, maxPoints: 8000 })).id).toBe('blue')
  })
})

describe('toPowerLevel', () => {
  it('va du fermier (5) à Freezer à pleine puissance (120 000 000)', () => {
    expect(toPowerLevel(0)).toBe(5)
    expect(toPowerLevel(1)).toBe(120_000_000)
  })

  it('reste dans ses bornes même avec un taux aberrant', () => {
    expect(toPowerLevel(-0.5)).toBe(5)
    expect(toPowerLevel(2)).toBe(120_000_000)
  })

  it('reproduit la valeur affichée en production pour 75 %', () => {
    expect(toPowerLevel(0.75)).toBe(1_714_000)
  })

  it('ne baisse jamais quand le taux monte, et arrondit selon la grandeur', () => {
    let precedent = 0
    for (let i = 0; i <= 100; i++) {
      const valeur = toPowerLevel(i / 100)
      expect(valeur).toBeGreaterThanOrEqual(precedent)
      expect(Number.isInteger(valeur)).toBe(true)
      if (valeur >= 100_000) expect(valeur % 1000).toBe(0)
      else if (valeur >= 1000) expect(valeur % 10).toBe(0)
      precedent = valeur
    }
  })
})
