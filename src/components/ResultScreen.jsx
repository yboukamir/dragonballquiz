import { useMemo, useState } from 'react'
import Panel from './ui/Panel'
import Button from './ui/Button'
import Badge from './ui/Badge'
import KiOrb from './ui/KiOrb'
import ShareButton from './ShareButton'
import ScoreTable from './ScoreTable'
import { accent } from '../lib/accents'
import { getRank, toPowerLevel, formatPowerLevel } from '../lib/ranks'
import { buildSharePayload } from '../lib/share'

export default function ResultScreen({
  category,
  difficulty,
  round,
  results,
  chrono,
  isRecord,
  bestScores,
  onReplay,
  onHome,
}) {
  const [showRecap, setShowRecap] = useState(false)

  // Identite stable : ShareButton interroge navigator.canShare dans un effet
  // qui depend de cet objet.
  const sharePayload = useMemo(
    () => buildSharePayload({ category, difficulty, results, chrono }),
    [category, difficulty, results, chrono],
  )

  const total = results.length
  const score = results.filter(Boolean).length
  const rank = getRank(score, total)
  const a = accent(rank.color)
  const power = toPowerLevel(score, total)

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-5 px-4 py-8 sm:py-12">
      <Panel className="overflow-hidden p-6 text-center sm:p-10">
        <span
          className="speedlines pointer-events-none absolute inset-0 opacity-10"
          aria-hidden="true"
        />

        <KiOrb
          className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 opacity-20 sm:h-52 sm:w-52"
          tone="var(--color-orange)"
        />

        <div className="relative flex flex-col items-center gap-3">
          <span className="flex flex-wrap justify-center gap-2">
            <Badge tone={category.accent} solid>
              {category.label} · {difficulty.label}
            </Badge>
            {chrono && (
              <Badge tone="crimson" solid>
                ⏱ Chrono
              </Badge>
            )}
          </span>

          <p className="font-label text-sm uppercase tracking-[0.2em] text-ink/60">
            Rang atteint
          </p>

          <h1 className={`title-ink font-display text-5xl leading-[0.9] sm:text-7xl ${a.text}`}>
            {rank.label}
          </h1>

          <p className="max-w-md font-body text-sm text-ink/75 sm:text-base">{rank.tagline}</p>

          <div className="mt-2 flex flex-wrap items-stretch justify-center gap-3">
            <div className="min-w-32 border-[3px] border-ink bg-ink px-5 py-3 text-paper">
              <p className="font-label text-xs uppercase tracking-[0.16em] text-paper-dim">
                Score
              </p>
              <p className="font-display text-4xl leading-none text-ki">
                {score}
                <span className="text-2xl text-paper-dim">/{total}</span>
              </p>
            </div>

            <div className="min-w-32 border-[3px] border-ink bg-ink px-5 py-3 text-paper">
              <p className="font-label text-xs uppercase tracking-[0.16em] text-paper-dim">
                Puissance
              </p>
              <p className="font-display text-4xl leading-none text-orange">
                {formatPowerLevel(power)}
              </p>
            </div>
          </div>

          {isRecord && (
            <p className="animate-burst mt-1 border-2 border-ink bg-ki px-3 py-1 font-label text-sm font-bold uppercase tracking-[0.12em] text-ink">
              ★ Nouveau record dans cette catégorie
            </p>
          )}
        </div>
      </Panel>

      <div className="grid gap-3 sm:grid-cols-2">
        <Button variant="orange" size="lg" onClick={onReplay} className="w-full">
          ↻ Rejouer
        </Button>
        <Button variant="ink" size="lg" onClick={onHome} className="w-full">
          Changer de catégorie
        </Button>
      </div>

      <ShareButton payload={sharePayload} />

      <ScoreTable
        bestScores={bestScores}
        categoryId={category.id}
        chrono={chrono}
        isRecord={isRecord}
      />

      <div>
        <button
          type="button"
          onClick={() => setShowRecap((v) => !v)}
          aria-expanded={showRecap}
          className="w-full border-[3px] border-paper/25 bg-ink-soft px-4 py-3 font-label text-sm uppercase tracking-[0.14em] text-paper-dim transition-colors hover:text-ki tap-safe"
        >
          {showRecap ? '▲ Masquer le détail' : `▼ Revoir les ${total} questions`}
        </button>

        {showRecap && (
          <ul className="mt-3 flex flex-col gap-2">
            {round.map((question, i) => (
              <li
                key={question.id}
                className={`animate-rise border-l-[8px] border-[3px] border-paper/20 bg-ink-soft p-3 ${
                  results[i] ? 'border-l-jade' : 'border-l-crimson'
                }`}
              >
                <p className="font-body text-sm font-semibold text-paper">{question.prompt}</p>
                <p className="mt-1 font-body text-sm text-ki">
                  {question.answers[question.correctIndex].label}
                </p>
                <p className="mt-1 font-body text-xs leading-relaxed text-paper-dim">
                  {question.why}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
