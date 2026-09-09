import { accent } from '../lib/accents'
import Badge from './ui/Badge'

/** Carte de sélection d'une catégorie, avec rappel du record personnel. */
export default function CategoryCard({ category, best, selected, onSelect }) {
  const a = accent(category.accent)

  return (
    <button
      type="button"
      onClick={() => onSelect(category.id)}
      aria-pressed={selected}
      className={[
        'group relative flex w-full flex-col items-start gap-1 overflow-hidden',
        'border-[3px] border-ink p-4 text-left transition-all duration-150 tap-safe sm:p-5',
        selected
          ? 'bg-paper text-ink -translate-y-1 shadow-[7px_7px_0_0_var(--color-void)]'
          : 'bg-ink-soft text-paper shadow-[4px_4px_0_0_var(--color-void)] hover:-translate-y-0.5 hover:bg-ink-soft/80',
      ].join(' ')}
    >
      {/* Bandeau d'accent : la seule surface colorée, pour hiérarchiser. */}
      <span
        className={`absolute inset-y-0 left-0 w-2 ${a.solid.split(' ')[0]}`}
        aria-hidden="true"
      />

      <span
        className={`halftone pointer-events-none absolute -right-6 -top-6 h-24 w-24 opacity-20 transition-opacity group-hover:opacity-40 ${a.text}`}
        aria-hidden="true"
      />

      <span className="pl-3 font-display text-2xl leading-none sm:text-3xl">
        {category.label}
      </span>
      <span
        className={`pl-3 font-body text-sm ${selected ? 'text-ink/70' : 'text-paper-dim/80'}`}
      >
        {category.tagline}
      </span>

      {/* Les deux modes ont leur propre record : un score au chronomètre
          ne se compare pas à un score sans contrainte de temps. */}
      <span className="mt-2 flex flex-wrap gap-1.5 pl-3">
        {!best?.normal && !best?.chrono && <Badge tone="smoke">Jamais tenté</Badge>}

        {best?.normal && (
          <Badge tone={selected ? category.accent : 'ki'}>
            Record {best.normal.score}/{best.normal.total} · {best.normal.difficulty}
          </Badge>
        )}

        {best?.chrono && (
          <Badge tone="crimson">
            ⏱ {best.chrono.score}/{best.chrono.total} · {best.chrono.difficulty}
          </Badge>
        )}
      </span>
    </button>
  )
}
