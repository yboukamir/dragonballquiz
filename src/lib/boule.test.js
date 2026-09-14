import { describe, expect, it } from 'vitest'
import { CENTRE, RAYON, bornerEtoiles, contenuBoule, etoilesDe, etoilesPourRatio } from './boule'

describe('boule de cristal', () => {
  it('dessine autant d’étoiles que demandé, de 1 à 7', () => {
    for (let n = 1; n <= 7; n++) expect(etoilesDe(n)).toHaveLength(n)
  })

  it('ramène un nombre hors limites entre 1 et 7', () => {
    expect(bornerEtoiles(0)).toBe(1)
    expect(bornerEtoiles(12)).toBe(7)
    expect(bornerEtoiles('trois')).toBe(1)
  })

  it('garde chaque étoile à l’intérieur de la boule, contour compris', () => {
    for (let n = 1; n <= 7; n++) {
      for (const { cx, cy, r } of etoilesDe(n)) {
        expect(Math.hypot(cx - CENTRE, cy - CENTRE) + r).toBeLessThan(RAYON - 3)
      }
    }
  })

  it('nomme sa trame et son masque d’après l’identifiant reçu', () => {
    const svg = contenuBoule({ id: 'b1', etoiles: 4 })
    expect(svg).toContain('id="b1-trame"')
    expect(svg).toContain('mask="url(#b1-ombre)"')
    // Les étoiles sont les seuls tracés rouges : le reflet est un trait papier.
    expect(svg.match(/fill="#dc1a3b"/g)).toHaveLength(4)
  })

  it('donne à la boule de fin de partie de 1 à 7 étoiles selon le taux', () => {
    expect(etoilesPourRatio(0)).toBe(1)
    expect(etoilesPourRatio(0.5)).toBe(4)
    expect(etoilesPourRatio(6500 / 8000)).toBe(6)
    expect(etoilesPourRatio(1)).toBe(7)
    expect(etoilesPourRatio(1.4)).toBe(7)
    expect(etoilesPourRatio(Number.NaN)).toBe(1)
  })
})
