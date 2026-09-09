/**
 * Case de manga : fond papier crème, contour d'encre épais, ombre dure.
 * `tone="ink"` inverse le rapport pour les panneaux posés sur du papier.
 */
export default function Panel({
  children,
  tone = 'paper',
  className = '',
  as: Tag = 'div',
  ...props
}) {
  const tones = {
    paper: 'bg-paper text-ink border-ink shadow-[6px_6px_0_0_var(--color-void)]',
    ink: 'bg-ink-soft text-paper border-paper/80 shadow-[6px_6px_0_0_var(--color-void)]',
    bare: 'bg-transparent text-paper border-paper/25 shadow-none',
  }

  return (
    <Tag
      className={['relative border-[3px]', tones[tone] ?? tones.paper, className].join(' ')}
      {...props}
    >
      {children}
    </Tag>
  )
}
