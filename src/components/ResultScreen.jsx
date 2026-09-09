import { useMemo, useState } from 'react'
import Panel from './ui/Panel'
import Button from './ui/Button'
import Badge from './ui/Badge'
import KiOrb from './ui/KiOrb'
import ShareButton from './ShareButton'
import ScoreTable from './ScoreTable'
import GameHistory from './GameHistory'
import { accent } from '../lib/accents'
import { getRank, toPowerLevel, formatPowerLevel } from '../lib/ranks'
import { buildSharePayload } from '../lib/share'
import { useLang } from '../i18n'

export default function ResultScreen({
  category,
  difficulty,
  round,
  results,
  chrono,
  isRecord,
  bestScores,
  history,
  onReplay,
  onHome,
}) {
  const { t } = useLang()
  const [showRecap, setShowRecap] = useState(false)

  // Identite stable : ShareButton interroge navigator.canShare dans un memo
  // qui depend de cet objet.
  const sharePayload = useMemo(
    () =>
      buildSharePayload({
        categoryId: category.id,
        difficultyId: difficulty.id,
        results,
        chrono,
        t,
      }),
    [category.id, difficulty.id, results, chrono, t],
  )

  const total = results.length
  const score = results.filter(Boolean).length
  const rank = getRank(score, total)
  const rangLibelle = t.rangs[rank.id]
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
              {t.categories[category.id].label} · {t.niveaux[difficulty.id].label}
            </Badge>
            {chrono && (
              <Badge tone="crimson" solid>
                {t.quiz.badgeChrono}
              </Badge>
            )}
          </span>

          <p className="font-label text-sm uppercase tracking-[0.2em] text-ink/60">
            {t.resultat.rangAtteint}
          </p>

          <h1 className={`title-ink font-display text-5xl leading-[0.9] sm:text-7xl ${a.text}`}>
            {rangLibelle.label}
          </h1>

          <p className="max-w-md font-body text-sm text-ink/75 sm:text-base">
            {rangLibelle.tagline}
          </p>

          <div className="mt-2 flex flex-wrap items-stretch justify-center gap-3">
            <div className="min-w-32 border-[3px] border-ink bg-ink px-5 py-3 text-paper">
              <p className="font-label text-xs uppercase tracking-[0.16em] text-paper-dim">
                {t.resultat.score}
              </p>
              <p className="font-display text-4xl leading-none text-ki">
                {score}
                <span className="text-2xl text-paper-dim">/{total}</span>
              </p>
            </div>

            <div className="min-w-32 border-[3px] border-ink bg-ink px-5 py-3 text-paper">
              <p className="font-label text-xs uppercase tracking-[0.16em] text-paper-dim">
                {t.resultat.puissance}
              </p>
              <p className="font-display text-4xl leading-none text-orange">
                {formatPowerLevel(power, t.locale)}
              </p>
            </div>
          </div>

          {isRecord && (
            <p className="animate-burst mt-1 border-2 border-ink bg-ki px-3 py-1 font-label text-sm font-bold uppercase tracking-[0.12em] text-ink">
              {t.resultat.nouveauRecord}
            </p>
          )}
        </div>
      </Panel>

      <div className="grid gap-3 sm:grid-cols-2">
        <Button variant="orange" size="lg" onClick={onReplay} className="w-full">
          {t.resultat.rejouer}
        </Button>
        <Button variant="ink" size="lg" onClick={onHome} className="w-full">
          {t.resultat.changerCategorie}
        </Button>
      </div>

      <ShareButton payload={sharePayload} />

      <ScoreTable
        bestScores={bestScores}
        categoryId={category.id}
        chrono={chrono}
        isRecord={isRecord}
      />

      <GameHistory history={history} />

      <div>
        <button
          type="button"
          onClick={() => setShowRecap((v) => !v)}
          aria-expanded={showRecap}
          className="w-full border-[3px] border-paper/25 bg-ink-soft px-4 py-3 font-label text-sm uppercase tracking-[0.14em] text-paper-dim transition-colors hover:text-ki tap-safe"
        >
          {showRecap ? t.resultat.masquerQuestions : t.resultat.voirQuestions(total)}
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
