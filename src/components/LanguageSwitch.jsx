import { CODES, LANGUES, cheminDe, useLang } from '../i18n'

/**
 * Sélecteur de langue : deux options seulement, donc deux contrôles visibles
 * plutôt qu'une liste déroulante qui ajouterait un clic et masquerait le
 * choix disponible.
 *
 * Ce sont de **vrais liens** vers `/` et `/en/` : les moteurs de recherche
 * doivent pouvoir suivre le chemin vers l'autre version, et un clic du
 * milieu ou un « ouvrir dans un nouvel onglet » doivent fonctionner. Le clic
 * simple est intercepté pour basculer sur place, sans rechargement.
 */
export default function LanguageSwitch({ className = '' }) {
  const { lang, setLang, t } = useLang()

  return (
    <div
      className={['flex items-center gap-0 border-[3px] border-ink bg-ink-soft', className].join(' ')}
      role="group"
      aria-label={t.langue.label}
    >
      {CODES.map((code) => {
        const actif = code === lang
        return (
          <a
            key={code}
            href={cheminDe(code)}
            hrefLang={LANGUES[code].htmlLang}
            lang={LANGUES[code].htmlLang}
            aria-current={actif ? 'true' : undefined}
            onClick={(e) => {
              // On laisse le navigateur faire son travail sur un clic
              // modifié (nouvel onglet, nouvelle fenêtre) ou un clic non
              // primaire : l'intercepter casserait un usage légitime.
              if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
              e.preventDefault()
              setLang(code)
            }}
            className={[
              'px-3 py-1.5 font-label text-xs font-bold uppercase tracking-[0.14em] transition-colors tap-safe',
              'flex items-center no-underline',
              actif ? 'bg-ki text-ink' : 'text-paper-dim hover:text-ki',
            ].join(' ')}
          >
            {code}
          </a>
        )
      })}
    </div>
  )
}
