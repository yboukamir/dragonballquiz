import { describe, expect, it } from 'vitest'
import { aDesPoints, labelNiveau, valeurScore } from './labels.js'
import { formatNombre } from './format.js'
import fr from '../i18n/fr.js'
import en from '../i18n/en.js'

describe('labelNiveau', () => {
  it('l’identifiant explicite prime, traduit dans la langue affichée', () => {
    const record = { difficultyId: 'moyen', difficulty: fr.niveaux.moyen.label }
    expect(labelNiveau(record, en)).toBe(en.niveaux.moyen.label)
    expect(labelNiveau(record, fr)).toBe(fr.niveaux.moyen.label)
  })

  it('reconnaît un libellé français figé et le traduit en anglais', () => {
    expect(labelNiveau({ difficulty: fr.niveaux.moyen.label }, en)).toBe(en.niveaux.moyen.label)
  })

  it('reconnaît un libellé anglais figé et le traduit en français', () => {
    expect(labelNiveau({ difficulty: en.niveaux.difficile.label }, fr)).toBe(
      fr.niveaux.difficile.label,
    )
  })

  it('ignore la casse du libellé enregistré', () => {
    const record = { difficulty: fr.niveaux.facile.label.toUpperCase() }
    expect(labelNiveau(record, fr)).toBe(fr.niveaux.facile.label)
  })

  it('retombe sur le libellé stocké quand l’identifiant est inconnu', () => {
    const record = { difficultyId: 'extreme', difficulty: fr.niveaux.moyen.label }
    expect(labelNiveau(record, en)).toBe(en.niveaux.moyen.label)
  })

  it('réaffiche tel quel un libellé qu’il ne reconnaît pas', () => {
    expect(labelNiveau({ difficulty: 'Légendaire' }, fr)).toBe('Légendaire')
  })

  it('rend une chaîne vide quand il n’y a rien à afficher', () => {
    expect(labelNiveau({}, fr)).toBe('')
    expect(labelNiveau(undefined, fr)).toBe('')
  })
})

describe('aDesPoints', () => {
  it('reconnaît un enregistrement pondéré, même à zéro point', () => {
    expect(aDesPoints({ points: 0, maxPoints: 8000 })).toBe(true)
  })

  it('écarte les enregistrements d’avant le barème et les valeurs absentes', () => {
    expect(aDesPoints({ score: 8, total: 10 })).toBe(false)
    expect(aDesPoints({ points: '5000' })).toBe(false)
    expect(aDesPoints(null)).toBe(false)
  })
})

describe('valeurScore', () => {
  it('affiche les points au format de chaque langue', () => {
    const record = { score: 10, total: 10, points: 5600, maxPoints: 5600 }
    expect(valeurScore(record, fr)).toBe(`${formatNombre(5600, fr.locale)} ${fr.unites.points}`)
    expect(valeurScore(record, en)).toBe(`${formatNombre(5600, en.locale)} ${en.unites.points}`)
  })

  it('retombe sur la fraction pour un record d’avant le barème', () => {
    expect(valeurScore({ score: 8, total: 10 }, fr)).toBe('8/10')
  })

  it('affiche « 0 pts » plutôt que la fraction quand les points valent zéro', () => {
    expect(valeurScore({ score: 1, total: 10, points: 0, maxPoints: 8000 }, fr)).toBe(
      `0 ${fr.unites.points}`,
    )
  })
})
