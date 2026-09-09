import { createContext, useContext } from 'react'
import fr from './fr'
import en from './en'

export const LANGUES = { fr, en }
export const CODES = Object.keys(LANGUES)
export const STORAGE_KEY = 'dbq.lang.v1'

/**
 * Langue de départ : le choix explicite du visiteur d'abord, sinon celle
 * de son navigateur. Un francophone qui arrive sur un domaine en .com ne
 * devrait pas avoir à chercher le sélecteur, et l'inverse est tout aussi
 * vrai — d'où la détection plutôt qu'un défaut arbitraire.
 */
export function detecterLangue() {
  try {
    const choisie = window.localStorage.getItem(STORAGE_KEY)
    if (choisie && LANGUES[choisie]) return choisie
  } catch {
    /* stockage indisponible : on retombe sur la détection */
  }

  try {
    const preferees = navigator.languages?.length ? navigator.languages : [navigator.language]
    for (const etiquette of preferees) {
      const code = String(etiquette).toLowerCase().split('-')[0]
      if (LANGUES[code]) return code
    }
  } catch {
    /* navigator indisponible */
  }

  return 'fr'
}

export const LangContext = createContext(null)

export function useLang() {
  const valeur = useContext(LangContext)
  if (!valeur) throw new Error('useLang doit être utilisé dans un LanguageProvider')
  return valeur
}
