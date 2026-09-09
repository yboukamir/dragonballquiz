import { accent as accentDe } from '../../lib/accents'

/**
 * Interrupteur à deux états, dessiné dans le même langage que le reste :
 * contour d'encre épais, ombre dure, et un curseur qui claque d'un côté
 * à l'autre. C'est un `button` avec `aria-pressed`, pas une case à cocher :
 * il déclenche un changement immédiat plutôt que de préparer un envoi.
 */
export default function Toggle({
  checked,
  onChange,
  label,
  description,
  tone = 'crimson',
  className = '',
}) {
  const a = accentDe(tone)

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={[
        'flex w-full items-center gap-4 border-[3px] border-ink p-3 text-left tap-safe',
        'transition-all duration-150 sm:p-4',
        checked
          ? `${a.solid} -translate-y-1 shadow-[6px_6px_0_0_var(--color-void)]`
          : 'bg-ink-soft text-paper shadow-[3px_3px_0_0_var(--color-void)] hover:-translate-y-0.5',
        className,
      ].join(' ')}
    >
      <span
        className={[
          'relative flex h-8 w-14 shrink-0 items-center border-[3px] border-ink transition-colors',
          checked ? 'bg-ink' : 'bg-smoke/50',
        ].join(' ')}
        aria-hidden="true"
      >
        <span
          className={[
            'absolute h-5 w-5 border-2 border-ink transition-transform duration-150',
            checked ? 'translate-x-[26px] bg-ki' : 'translate-x-[3px] bg-paper-dim',
          ].join(' ')}
        />
      </span>

      <span className="min-w-0">
        <span className="block font-display text-xl leading-none">{label}</span>
        {description && (
          <span
            className={`mt-1 block font-body text-xs ${checked ? 'opacity-85' : 'text-paper-dim/70'}`}
          >
            {description}
          </span>
        )}
      </span>
    </button>
  )
}
