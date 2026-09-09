import { useCallback, useEffect, useMemo, useState } from 'react'
import { LangContext, LANGUES, STORAGE_KEY, detecterLangue } from './index'

/**
 * Fournit la langue courante à toute l'application.
 *
 * Dans son propre fichier : un module qui exporte à la fois un composant et
 * des constantes casse le rafraîchissement à chaud de Vite.
 */
export default function LanguageProvider({ children }) {
  const [lang, setLangEtat] = useState(detecterLangue)

  const setLang = useCallback((code) => {
    if (!LANGUES[code]) return
    setLangEtat(code)
    try {
      window.localStorage.setItem(STORAGE_KEY, code)
    } catch {
      /* le choix ne survivra pas au rechargement, mais la session tient */
    }
  }, [])

  const t = LANGUES[lang]

  // `lang` sur <html> conditionne la césure, la synthèse vocale et les
  // guillemets typographiques : le laisser figé à « fr » ferait lire la
  // version anglaise avec un accent français par les lecteurs d'écran.
  useEffect(() => {
    document.documentElement.lang = t.htmlLang
    document.title = t.meta.title
  }, [t])

  const valeur = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t])

  return <LangContext.Provider value={valeur}>{children}</LangContext.Provider>
}
