import { describe, expect, it } from 'vitest'
import { langueSuggeree } from './suggestionLangue'

describe('suggestion de langue', () => {
  it('propose l’anglais sur la page française à un navigateur sans français', () => {
    expect(langueSuggeree({ lang: 'fr', languesNavigateur: ['en-US'] })).toBe('en')
    expect(langueSuggeree({ lang: 'fr', languesNavigateur: ['es-ES', 'de'] })).toBe('en')
  })

  it('ne propose rien sur la page française si le navigateur lit le français', () => {
    expect(langueSuggeree({ lang: 'fr', languesNavigateur: ['fr-BE'] })).toBeNull()
    expect(langueSuggeree({ lang: 'fr', languesNavigateur: ['en-US', 'fr-FR'] })).toBeNull()
  })

  it('propose le français sur la page anglaise seulement en première langue', () => {
    expect(langueSuggeree({ lang: 'en', languesNavigateur: ['fr-BE', 'en'] })).toBe('fr')
    expect(langueSuggeree({ lang: 'en', languesNavigateur: ['en-GB', 'fr'] })).toBeNull()
    expect(langueSuggeree({ lang: 'en', languesNavigateur: ['de-DE'] })).toBeNull()
  })

  it('se tait après un choix explicite, un bandeau fermé ou sans langue connue', () => {
    expect(langueSuggeree({ lang: 'fr', languesNavigateur: ['en-US'], preference: 'fr' })).toBeNull()
    expect(langueSuggeree({ lang: 'fr', languesNavigateur: ['en-US'], fermee: true })).toBeNull()
    expect(langueSuggeree({ lang: 'fr', languesNavigateur: [] })).toBeNull()
    expect(langueSuggeree({ lang: 'fr', languesNavigateur: [undefined] })).toBeNull()
  })
})
