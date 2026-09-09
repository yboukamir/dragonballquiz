import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  LangContext,
  LANGUES,
  STORAGE_KEY,
  cheminDe,
  langueDepuisURL,
  preferenceEnregistree,
} from './index'

/**
 * Fournit la langue courante à toute l'application.
 *
 * Dans son propre fichier : un module qui exporte à la fois un composant et
 * des constantes casse le rafraîchissement à chaud de Vite.
 *
 * L'URL fait foi. Le changement de langue est une vraie navigation —
 * `pushState` plutôt qu'un rechargement, pour garder l'instantanéité — et le
 * bouton « précédent » du navigateur ramène bien à la langue précédente.
 */
export default function LanguageProvider({ children }) {
  // Un visiteur qui a déjà choisi une langue repart dans la sienne, même
  // s'il arrive sur l'URL de l'autre. La décision est prise dès l'état
  // initial : la passer par un effet afficherait brièvement la mauvaise
  // langue avant de la corriger.
  const [lang, setLangEtat] = useState(() => {
    const depuisURL = langueDepuisURL()
    const preferee = preferenceEnregistree()
    return preferee && LANGUES[preferee] ? preferee : depuisURL
  })

  const setLang = useCallback((code, { pousserHistorique = true } = {}) => {
    if (!LANGUES[code]) return
    setLangEtat(code)
    try {
      window.localStorage.setItem(STORAGE_KEY, code)
    } catch {
      /* le choix ne survivra pas au rechargement, mais la session tient */
    }
    if (pousserHistorique && window.location.pathname !== cheminDe(code)) {
      window.history.pushState({ lang: code }, '', cheminDe(code))
    }
  }, [])

  // L'URL est alignée sur la langue retenue. `replace` et non `push` : le
  // bouton précédent ne doit pas renvoyer sur la page qu'on vient de quitter.
  useEffect(() => {
    if (window.location.pathname !== cheminDe(lang)) {
      window.history.replaceState({ lang }, '', cheminDe(lang))
    }
    // Uniquement au montage : les bascules ultérieures poussent elles-mêmes
    // leur entrée d'historique via `setLang`.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Bouton précédent / suivant : l'URL change sans que React en soit averti.
  // On enregistre aussi la préférence, car revenir sur la page française est
  // un acte délibéré : sans cela, un rafraîchissement renverrait le visiteur
  // vers la langue qu'il vient justement de quitter.
  useEffect(() => {
    const surNavigation = () => setLang(langueDepuisURL(), { pousserHistorique: false })
    window.addEventListener('popstate', surNavigation)
    return () => window.removeEventListener('popstate', surNavigation)
  }, [setLang])

  const t = LANGUES[lang]

  // Le HTML statique porte déjà les bonnes valeurs au chargement ; on les
  // remet à jour après une bascule sans rechargement, sans quoi l'onglet
  // garderait le titre de l'autre langue.
  useEffect(() => {
    document.documentElement.lang = t.htmlLang
    document.title = t.meta.title
  }, [t])

  const valeur = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t])

  return <LangContext.Provider value={valeur}>{children}</LangContext.Provider>
}
