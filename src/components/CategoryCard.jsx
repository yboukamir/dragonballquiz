import { accent } from '../lib/accents'
import Badge from './ui/Badge'

/** Carte de sélection d'une catégorie, avec rappel du record personnel. */
export default function CategoryCard({ category, best, chrono, selected, onSelect }) {
  const a = accent(category.accent)
  const record = chrono ? best?.chrono : best?.normal

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

      {/* Chaque mode a son propre record — un score au chronomètre ne se
          compare pas à un score sans contrainte de temps — mais seul celui
          du mode sélectionné est affiché, pour ne pas charger la carte.
          Le pictogramme ⏱ lève l'ambiguïté quand le chrono est actif. */}
      <span className="mt-2 pl-3">
        {record ? (
          <Badge tone={chrono ? 'crimson' : selected ? category.accent : 'ki'}>
            {chrono ? '⏱ ' : 'Record '}
            {record.score}/{record.total} · {record.difficulty}
          </Badge>
        ) : (
          <Badge tone="smoke">{chrono ? '⏱ Jamais tenté' : 'Jamais tenté'}</Badge>
        )}
      </span>
    </button>
  )
}
