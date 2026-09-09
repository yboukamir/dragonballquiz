const LETTERS = ['A', 'B', 'C', 'D']

/**
 * Une proposition de réponse.
 *
 * `state` : 'idle' avant réponse, puis 'correct' / 'wrong' pour le choix
 * du joueur, et 'revealed' pour signaler la bonne réponse manquée.
 */
export default function AnswerButton({ label, index, state, disabled, onClick }) {
  const tones = {
    idle: 'bg-paper text-ink hover:-translate-y-0.5 hover:shadow-[7px_7px_0_0_var(--color-void)]',
    correct: 'bg-jade text-ink animate-burst',
    wrong: 'bg-crimson text-paper animate-shake',
    revealed: 'bg-ki text-ink',
    muted: 'bg-paper/40 text-ink/50',
  }

  const marks = { correct: '✔', wrong: '✕', revealed: '✔' }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={[
        'flex w-full items-center gap-3 border-[3px] border-ink p-3 text-left tap-safe',
        'shadow-[5px_5px_0_0_var(--color-void)] transition-all duration-150',
        'disabled:cursor-default sm:p-4',
        tones[state] ?? tones.idle,
      ].join(' ')}
    >
      <span
        className={[
          'flex h-9 w-9 shrink-0 items-center justify-center border-2 border-current',
          'font-display text-lg leading-none',
        ].join(' ')}
        aria-hidden="true"
      >
        {marks[state] ?? LETTERS[index]}
      </span>

      <span className="font-body text-base font-semibold leading-snug sm:text-lg">
        {label}
      </span>
    </button>
  )
}
