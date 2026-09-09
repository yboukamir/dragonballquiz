import { CODES, LANGUES, useLang } from '../i18n'

/**
 * Sélecteur de langue : deux boutons plutôt qu'une liste déroulante.
 * Avec deux options seulement, la liste ajoute un clic et masque le choix
 * disponible ; ici les deux langues sont visibles en permanence.
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
          <button
            key={code}
            type="button"
            onClick={() => setLang(code)}
            aria-pressed={actif}
            lang={LANGUES[code].htmlLang}
            className={[
              'px-3 py-1.5 font-label text-xs font-bold uppercase tracking-[0.14em] transition-colors tap-safe',
              actif ? 'bg-ki text-ink' : 'text-paper-dim hover:text-ki',
            ].join(' ')}
          >
            {code}
          </button>
        )
      })}
    </div>
  )
}
