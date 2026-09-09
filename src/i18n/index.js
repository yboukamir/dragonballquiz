import { createContext, useContext } from 'react'
import fr from './fr'
import en from './en'

export const LANGUES = { fr, en }
export const CODES = Object.keys(LANGUES)
export const STORAGE_KEY = 'dbq.lang.v1'

/** Chemin canonique d'une langue. Le français vit à la racine. */
export function cheminDe(code) {
  return code === 'fr' ? '/' : `/${code}/`
}

/**
 * Langue portée par l'URL. C'est la source de vérité : chaque langue a sa
 * propre page, sa propre balise `lang` et sa propre description, ce qui la
 * rend indexable séparément. Déduire la langue d'ailleurs ferait diverger
 * ce qu'un robot lit dans le HTML de ce qu'il verrait à l'écran.
 */
export function langueDepuisURL(pathname = window.location.pathname) {
  const segment = pathname.split('/').filter(Boolean)[0]
  return segment && LANGUES[segment] ? segment : 'fr'
}

/**
 * Langue explicitement choisie lors d'une visite précédente, ou `null`.
 *
 * Volontairement distinct de la langue du navigateur : rediriger selon
 * `Accept-Language` enverrait Googlebot, qui explore le plus souvent en
 * anglais, de `/` vers `/en/` — et la version française ne serait jamais
 * indexée. Un robot n'ayant pas de `localStorage`, se fier au seul choix
 * explicite garde la redirection invisible pour eux.
 */
export function preferenceEnregistree() {
  try {
    const choisie = window.localStorage.getItem(STORAGE_KEY)
    return choisie && LANGUES[choisie] ? choisie : null
  } catch {
    return null
  }
}

export const LangContext = createContext(null)

export function useLang() {
  const valeur = useContext(LangContext)
  if (!valeur) throw new Error('useLang doit être utilisé dans un LanguageProvider')
  return valeur
}
