/**
 * Jauge de ki : un segment par question, rempli au fur et à mesure.
 * Le rendu segmenté (plutôt qu'une barre continue) rend la progression
 * lisible d'un coup d'œil sur mobile, même à 15 questions.
 */
export default function ProgressBar({ current, total, results = [] }) {
  return (
    <div className="w-full">
      <div className="mb-2 flex items-end justify-between font-label uppercase tracking-[0.14em]">
        <span className="text-sm text-paper-dim">
          Question <span className="text-ki">{Math.min(current + 1, total)}</span> / {total}
        </span>
        <span className="text-sm text-paper-dim">
          {results.filter(Boolean).length} bonne
          {results.filter(Boolean).length > 1 ? 's' : ''}
        </span>
      </div>

      <div
        className="flex gap-[3px] border-[3px] border-ink bg-ink-soft p-[3px]"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={Math.min(current, total)}
        aria-label={`Progression : question ${Math.min(current + 1, total)} sur ${total}`}
      >
        {Array.from({ length: total }, (_, i) => {
          const answered = i < results.length
          const tone = !answered
            ? i === current
              ? 'bg-ki/40 animate-charge'
              : 'bg-smoke/40'
            : results[i]
              ? 'bg-ki'
              : 'bg-crimson'

          return (
            <span
              key={i}
              className={`h-3 flex-1 -skew-x-12 transition-colors duration-200 ${tone}`}
            />
          )
        })}
      </div>
    </div>
  )
}
