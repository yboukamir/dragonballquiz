/**
 * Jauge de compte à rebours.
 *
 * Masquée aux lecteurs d'écran : annoncer chaque seconde saturerait la
 * synthèse vocale. L'information utile — le temps écoulé — est déjà portée
 * par le message de feedback, lui dans une région `aria-live`.
 */
export default function Countdown({ remaining, total }) {
  const ratio = total > 0 ? Math.max(0, Math.min(1, remaining / total)) : 0
  const urgent = ratio <= 0.25

  return (
    <div className="flex items-center gap-3" aria-hidden="true">
      <span
        className={[
          'flex h-9 w-11 shrink-0 items-center justify-center border-[3px] border-ink',
          'font-display text-xl leading-none tabular-nums',
          urgent ? 'bg-crimson text-paper animate-charge' : 'bg-ki text-ink',
        ].join(' ')}
      >
        {Math.ceil(remaining)}
      </span>

      <div className="h-4 flex-1 border-[3px] border-ink bg-ink-soft p-[2px]">
        <div
          className={[
            'h-full origin-left transition-[width,background-color] duration-100 ease-linear',
            urgent ? 'bg-crimson' : 'bg-ki',
          ].join(' ')}
          style={{ width: `${ratio * 100}%` }}
        />
      </div>
    </div>
  )
}
