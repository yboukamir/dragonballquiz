import { useEffect, useState } from 'react'

/**
 * Charge la banque de questions correspondant à la langue.
 *
 * Import dynamique et non statique : chaque banque pèse une cinquantaine
 * de kilo-octets, et les empiler ferait payer à tous les visiteurs une
 * langue qu'ils ne liront jamais. Vite en fait deux fragments séparés,
 * téléchargés à la demande.
 */
const BANQUES = {
  fr: () => import('../data/questions.fr.js'),
  en: () => import('../data/questions.en.js'),
}

// Une banque déjà téléchargée n'est pas rechargée au retour sur la langue.
const cache = new Map()

export default function useQuestionBank(lang) {
  const [etat, setEtat] = useState(() => ({
    questions: cache.get(lang) ?? null,
    ready: cache.has(lang),
  }))

  // Bascule immédiate pendant le rendu quand la banque est déjà en cache :
  // passer par un effet ferait clignoter l'écran par un rendu « non prêt ».
  const [langPrecedente, setLangPrecedente] = useState(lang)
  if (lang !== langPrecedente) {
    setLangPrecedente(lang)
    setEtat({ questions: cache.get(lang) ?? null, ready: cache.has(lang) })
  }

  useEffect(() => {
    if (cache.has(lang)) return

    let abandonne = false

    const charger = BANQUES[lang] ?? BANQUES.fr
    charger().then((module) => {
      cache.set(lang, module.QUESTIONS)
      // Un changement de langue pendant le téléchargement ne doit pas
      // faire atterrir l'ancienne banque dans l'état.
      if (!abandonne) setEtat({ questions: module.QUESTIONS, ready: true })
    })

    return () => {
      abandonne = true
    }
  }, [lang])

  return etat
}
