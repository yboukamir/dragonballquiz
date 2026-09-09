import { DIFFICULTIES } from '../lib/quiz'
import { accent } from '../lib/accents'

/** Choix du niveau : trois paliers, un seul actif à la fois. */
export default function DifficultyPicker({ value, onChange }) {
  return (
    <fieldset className="border-0 p-0">
      <legend className="mb-3 font-label text-sm uppercase tracking-[0.18em] text-paper-dim">
        Niveau de difficulté
      </legend>

      <div className="grid gap-3 sm:grid-cols-3">
        {DIFFICULTIES.map((d) => {
          const a = accent(d.accent)
          const active = value === d.id

          return (
            <button
              key={d.id}
              type="button"
              onClick={() => onChange(d.id)}
              aria-pressed={active}
              className={[
                'flex flex-col items-start gap-1 border-[3px] border-ink p-3 text-left tap-safe',
                'transition-all duration-150',
                active
                  ? `${a.solid} -translate-y-1 shadow-[6px_6px_0_0_var(--color-void)]`
                  : 'bg-ink-soft text-paper shadow-[3px_3px_0_0_var(--color-void)] hover:-translate-y-0.5',
              ].join(' ')}
            >
              <span className="flex w-full items-baseline justify-between gap-2">
                <span className="font-display text-xl leading-none">{d.label}</span>
                <span className="font-label text-xs uppercase tracking-widest opacity-80">
                  {d.subtitle}
                </span>
              </span>
              <span className={`font-body text-xs ${active ? 'opacity-80' : 'text-paper-dim/70'}`}>
                {d.blurb}
              </span>
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}
