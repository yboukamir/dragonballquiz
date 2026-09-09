import { accent } from '../../lib/accents'

/** Étiquette compacte (catégorie, difficulté, mention "record"). */
export default function Badge({
  children,
  tone = 'orange',
  solid = false,
  className = '',
}) {
  const a = accent(tone)
  return (
    <span
      className={[
        'inline-flex items-center gap-1.5 border-2 border-ink px-2.5 py-1',
        'font-label text-xs font-bold uppercase tracking-[0.12em] whitespace-nowrap',
        solid ? a.solid : `${a.soft} border-current`,
        className,
      ].join(' ')}
    >
      {children}
    </span>
  )
}
