import { useCallback, useEffect, useRef, useState } from 'react'
import AnswerButton from './AnswerButton'
import ProgressBar from './ui/ProgressBar'
import Countdown from './ui/Countdown'
import Panel from './ui/Panel'
import Badge from './ui/Badge'
import Button from './ui/Button'
import useCountdown from '../hooks/useCountdown'
import { pointsOf } from '../lib/quiz'
import { formatNombre } from '../lib/format'
import { useLang } from '../i18n'
import LanguageSwitch from './LanguageSwitch'

/** Valeur de `picked` quand le temps s'est écoulé sans réponse. */
const TEMPS_ECOULE = -1

export default function QuizScreen({ round, category, difficulty, chrono, onFinish, onQuit }) {
  const { t } = useLang()
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState(null)
  const [results, setResults] = useState([])
  const nextRef = useRef(null)
  const questionRef = useRef(null)

  // Verrou synchrone : sans lui, une réponse cliquée à l'instant précis où
  // le chrono expire enregistrerait deux résultats pour une seule question.
  const repondu = useRef(false)

  const question = round[index]
  const answered = picked !== null
  const isCorrect = answered && picked !== TEMPS_ECOULE && question.answers[picked].correct

  const expirer = useCallback(() => {
    if (repondu.current) return
    repondu.current = true
    setPicked(TEMPS_ECOULE)
    setResults((r) => [...r, false])
  }, [])

  const remaining = useCountdown(difficulty.seconds, chrono && !answered, expirer)

  // Le bouton de suite prend le focus dès le feedback : la partie reste
  // entièrement jouable au clavier, sans re-tabuler toute la liste.
  useEffect(() => {
    if (answered) nextRef.current?.focus()
  }, [answered])

  // À chaque nouvelle question, le focus va à l'énoncé. Sans cela, le bouton
  // de suite disparaît avec le retour et le focus retombe sur la page : au
  // clavier, il faudrait retraverser tout l'en-tête, et un lecteur d'écran
  // n'annoncerait pas la question suivante.
  useEffect(() => {
    questionRef.current?.focus({ preventScroll: true })
  }, [index])

  function choose(i) {
    if (repondu.current) return
    repondu.current = true
    setPicked(i)
    setResults((r) => [...r, round[index].answers[i].correct])
  }

  function next() {
    if (index + 1 >= round.length) {
      onFinish(results)
      return
    }
    repondu.current = false
    setIndex((i) => i + 1)
    setPicked(null)
  }

  function stateFor(i) {
    if (!answered) return 'idle'
    // `picked` vaut -1 en cas d'expiration : aucune proposition n'est alors
    // marquée comme choisie, seule la bonne réponse est révélée.
    if (i === picked) return isCorrect ? 'correct' : 'wrong'
    if (i === question.correctIndex) return 'revealed'
    return 'muted'
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-5 px-4 py-6 sm:py-10">
      {/* Titre de page pour les lecteurs d'écran : l'énoncé reste un h2, sous
          un h1 qui situe la question dans la manche. */}
      <h1 className="sr-only">
        {t.categories[category.id].label} — {t.quiz.questionSur(index + 1, round.length)}
      </h1>
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone={category.accent} solid>
            {t.categories[category.id].label}
          </Badge>
          <Badge tone={difficulty.accent}>{t.niveaux[difficulty.id].label}</Badge>
          {chrono && (
            <Badge tone="crimson" solid>
              {t.quiz.badgeChrono}
            </Badge>
          )}
        </div>

        {/* Placé auprès d Abandonner : changer de langue interrompt aussi la
            manche, autant regrouper les actions qui font quitter la partie. */}
        <div className="flex items-center gap-3">
          <LanguageSwitch />
          <button
            type="button"
            onClick={onQuit}
            className="font-label text-sm uppercase tracking-[0.14em] text-paper-dim underline decoration-2 underline-offset-4 hover:text-ki tap-safe"
          >
            {t.quiz.abandonner}
          </button>
        </div>
      </header>

      <ProgressBar current={index} total={round.length} results={results} />

      {/* Retiré dès la réponse : le décompte n'a plus de sens, et le laisser
          se réinitialiser sous les yeux du joueur serait déroutant. */}
      {chrono && !answered && (
        <Countdown remaining={remaining} total={difficulty.seconds} />
      )}

      <Panel className="animate-rise p-5 sm:p-7" key={question.id}>
        <span
          className="speedlines pointer-events-none absolute inset-0 opacity-[0.07]"
          aria-hidden="true"
        />
        {/* Plaque de question, à la manière des quiz books : numéro penché et
            valeur en points. Le numéro est masqué aux lecteurs d'écran, qui
            l'ont déjà dans le h1 ; ils entendent « Points 300 ». */}
        <p className="relative mb-4 inline-flex items-stretch border-2 border-ink bg-ink text-paper shadow-[3px_3px_0_0_var(--color-void)]">
          <span
            aria-hidden="true"
            className="flex items-center px-3 py-1 font-display text-2xl leading-none sm:text-3xl"
          >
            <span className="inline-block -skew-x-12">{t.quiz.numeroQuestion(index + 1)}</span>
          </span>
          <span className="flex items-center gap-2 border-l-2 border-paper/30 px-3 font-label text-xs uppercase tracking-[0.14em] text-paper-dim">
            {t.quiz.points}
            <span aria-hidden="true">▸</span>
            <span className="inline-block -skew-x-12 font-display text-xl leading-none tracking-normal text-ki sm:text-2xl">
              {formatNombre(pointsOf(question), t.locale)}
            </span>
          </span>
        </p>

        <h2 ref={questionRef} tabIndex={-1} className="relative font-titre text-2xl leading-[1.05] sm:text-4xl">
          {question.prompt}
        </h2>
      </Panel>

      <div className="grid gap-3" role="group" aria-label={t.quiz.propositions}>
        {question.answers.map((answer, i) => (
          <AnswerButton
            key={answer.label}
            index={i}
            label={answer.label}
            state={stateFor(i)}
            disabled={answered}
            onClick={() => choose(i)}
          />
        ))}
      </div>

      <div aria-live="polite" className="min-h-[1px]">
        {answered && (
          <Panel
            tone="ink"
            className={`animate-rise border-l-[10px] p-4 sm:p-5 ${
              isCorrect ? 'border-l-jade' : 'border-l-crimson'
            }`}
          >
            <p className="font-display text-xl sm:text-2xl">
              {isCorrect ? (
                <span className="text-jade">{t.quiz.juste}</span>
              ) : picked === TEMPS_ECOULE ? (
                <span className="text-rose">{t.quiz.tempsEcoule}</span>
              ) : (
                <span className="text-rose">{t.quiz.faux}</span>
              )}{' '}
              <span className="text-paper">
                {isCorrect
                  ? ''
                  : t.quiz.bonneReponse(question.answers[question.correctIndex].label)}
              </span>
            </p>

            <p className="mt-2 font-body text-sm leading-relaxed text-paper-dim sm:text-base">
              {question.why}
            </p>

            <Button
              ref={nextRef}
              onClick={next}
              variant="ki"
              size="md"
              className="mt-4 w-full sm:w-auto"
            >
              {index + 1 >= round.length ? t.quiz.voirResultat : t.quiz.suivante}
            </Button>
          </Panel>
        )}
      </div>
    </div>
  )
}
