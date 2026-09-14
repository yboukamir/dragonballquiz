import { useState } from 'react'
import { LANGUES, cheminDe, preferenceEnregistree, useLang } from '../i18n'
import { CLE_SUGGESTION, langueSuggeree } from '../lib/suggestionLangue'

function bandeauFerme() {
  try {
    return window.localStorage.getItem(CLE_SUGGESTION) === 'ferme'
  } catch {
    return false
  }
}

function languesDuNavigateur() {
  if (typeof navigator === 'undefined') return []
  return navigator.languages?.length ? navigator.languages : [navigator.language]
}

/**
 * Bandeau qui propose l'autre langue, écrit dans cette langue-là : un
 * visiteur qui ne lit pas le français ne comprendrait pas une proposition
 * rédigée en français. Voir `src/lib/suggestionLangue.js` pour la règle.
 */
export default function LanguageSuggestion() {
  const { lang, setLang } = useLang()

  // Décidé au premier rendu : le bandeau est là dès l'affichage, et la page
  // ne se décale pas quand il apparaît.
  const [autre, setAutre] = useState(() =>
    langueSuggeree({
      lang,
      languesNavigateur: languesDuNavigateur(),
      preference: preferenceEnregistree(),
      fermee: bandeauFerme(),
    }),
  )

  // Tout changement de langue, par le bandeau ou par le sélecteur, est un
  // choix : le bandeau disparaît pour de bon, même si l'on revient ensuite.
  const [langVue, setLangVue] = useState(lang)
  if (lang !== langVue) {
    setLangVue(lang)
    if (autre) setAutre(null)
  }

  if (!autre) return null
  const cible = LANGUES[autre]
  const s = cible.suggestion

  function fermer() {
    setAutre(null)
    try {
      window.localStorage.setItem(CLE_SUGGESTION, 'ferme')
    } catch {
      /* le bandeau reviendra à la prochaine visite, rien de plus */
    }
  }

  return (
    <aside lang={cible.htmlLang} aria-label={s.region} className="border-b-[3px] border-ink bg-ki text-ink">
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-3 px-4">
        <p className="py-2 font-body text-sm leading-snug">
          {s.texte}{' '}
          <a
            href={cheminDe(autre)}
            hrefLang={cible.htmlLang}
            onClick={(e) => {
              // Même règle que le sélecteur : un clic modifié ouvre un onglet.
              if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
              e.preventDefault()
              setLang(autre)
            }}
            className="whitespace-nowrap font-bold underline decoration-2 underline-offset-4"
          >
            {s.lien}
          </a>
        </p>
        <button
          type="button"
          onClick={fermer}
          aria-label={s.fermer}
          className="tap-safe flex w-12 shrink-0 items-center justify-center font-label text-xl leading-none"
        >
          <span aria-hidden="true">✕</span>
        </button>
      </div>
    </aside>
  )
}
