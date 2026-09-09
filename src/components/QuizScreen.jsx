import { useEffect, useRef, useState } from 'react'
import AnswerButton from './AnswerButton'
import ProgressBar from './ui/ProgressBar'
import Panel from './ui/Panel'
import Badge from './ui/Badge'
import Button from './ui/Button'

export default function QuizScreen({ round, category, difficulty, onFinish, onQuit }) {
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState(null)
  const [results, setResults] = useState([])
  const nextRef = useRef(null)

  const question = round[index]
  const answered = picked !== null
  const isCorrect = answered && question.answers[picked].correct

  // Le bouton de suite prend le focus dès le feedback : la partie reste
  // entièrement jouable au clavier, sans re-tabuler toute la liste.
  useEffect(() => {
    if (answered) nextRef.current?.focus()
  }, [answered])

  function choose(i) {
    if (answered) return
    setPicked(i)
    setResults((r) => [...r, round[index].answers[i].correct])
  }

  function next() {
    if (index + 1 >= round.length) {
      onFinish(results)
      return
    }
    setIndex((i) => i + 1)
    setPicked(null)
  }

  function stateFor(i) {
    if (!answered) return 'idle'
    if (i === picked) return isCorrect ? 'correct' : 'wrong'
    if (i === question.correctIndex) return 'revealed'
    return 'muted'
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-5 px-4 py-6 sm:py-10">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone={category.accent} solid>
            {category.label}
          </Badge>
          {/* Le niveau choisi pour la partie — stable d'une question a l'autre. */}
          <Badge tone={difficulty.accent}>{difficulty.label}</Badge>
        </div>

        <button
          type="button"
          onClick={onQuit}
          className="font-label text-sm uppercase tracking-[0.14em] text-paper-dim underline decoration-2 underline-offset-4 hover:text-ki tap-safe"
        >
          Abandonner
        </button>
      </header>

      <ProgressBar current={index} total={round.length} results={results} />

      <Panel className="animate-rise p-5 sm:p-7" key={question.id}>
        <span
          className="speedlines pointer-events-none absolute inset-0 opacity-[0.07]"
          aria-hidden="true"
        />
        <h2 className="relative font-display text-2xl leading-[1.05] sm:text-4xl">
          {question.prompt}
        </h2>
      </Panel>

      <div className="grid gap-3" role="group" aria-label="Propositions de réponse">
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
                <span className="text-jade">Dans le mille.</span>
              ) : (
                <span className="text-crimson">Raté.</span>
              )}{' '}
              <span className="text-paper">
                {isCorrect
                  ? ''
                  : `La bonne réponse : ${question.answers[question.correctIndex].label}.`}
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
              {index + 1 >= round.length ? 'Voir le résultat →' : 'Question suivante →'}
            </Button>
          </Panel>
        )}
      </div>
    </div>
  )
}
