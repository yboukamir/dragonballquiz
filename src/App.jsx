import { useEffect, useState } from 'react'
import { CATEGORIES } from './data/categories'
import { buildRound, getDifficulty } from './lib/quiz'
import { loadBestScores, saveScore, clearBestScores } from './lib/storage'
import { loadHistory, pushGame, clearHistory } from './lib/history'
import { useLang } from './i18n'
import useQuestionBank from './hooks/useQuestionBank'
import HomeScreen from './components/HomeScreen'
import QuizScreen from './components/QuizScreen'
import ResultScreen from './components/ResultScreen'
import Footer from './components/Footer'

/**
 * Machine à états volontairement minimale : trois écrans, aucun routeur.
 * Le site reste un fichier HTML unique, déployable tel quel en statique
 * (pas de règle de réécriture à configurer côté hébergeur).
 */
export default function App() {
  const { lang, t } = useLang()
  const { questions, ready } = useQuestionBank(lang)

  const [screen, setScreen] = useState('home')
  const [categoryId, setCategoryId] = useState(null)
  const [difficultyId, setDifficultyId] = useState('moyen')
  const [chrono, setChrono] = useState(false)

  const [round, setRound] = useState([])
  const [roundChrono, setRoundChrono] = useState(false)
  const [roundKey, setRoundKey] = useState(0)
  const [results, setResults] = useState([])
  const [isRecord, setIsRecord] = useState(false)

  // Initialisation paresseuse : le localStorage est lu une seule fois, avant
  // le premier rendu, plutot que via un effet qui declencherait un re-rendu.
  const [bestScores, setBestScores] = useState(loadBestScores)
  const [history, setHistory] = useState(loadHistory)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [screen, roundKey])

  // Une manche en cours porte des questions dans l'ancienne langue : la
  // poursuivre mélangerait les deux, on revient donc à l'accueil. Les autres
  // écrans se contentent de se retraduire — le score est déjà enregistré.
  // Réinitialisation pendant le rendu plutôt que dans un effet, pour éviter
  // le rendu intermédiaire où le quiz s'afficherait dans les deux langues.
  const [langPrecedente, setLangPrecedente] = useState(lang)
  if (lang !== langPrecedente) {
    setLangPrecedente(lang)
    if (screen === 'quiz') setScreen('home')
  }

  const category = CATEGORIES.find((c) => c.id === categoryId) ?? null
  const difficulty = getDifficulty(difficultyId)

  function start(id = categoryId) {
    if (!id || !ready) return
    setRound(buildRound(questions, id, difficultyId))
    setRoundChrono(chrono)
    setRoundKey((k) => k + 1)
    setResults([])
    setIsRecord(false)
    setScreen('quiz')
  }

  function finish(roundResults) {
    setResults(roundResults)

    const score = roundResults.filter(Boolean).length
    const { all, updated } = saveScore(categoryId, {
      score,
      total: roundResults.length,
      difficultyId,
      // Libellé conservé en repli : les records enregistrés avant le bilingue
      // n ont pas d identifiant, et doivent rester lisibles.
      difficulty: t.niveaux[difficultyId].label,
      chrono: roundChrono,
    })

    setBestScores(all)
    setIsRecord(updated)

    // Le journal enregistre toutes les parties, y compris ratees : c'est
    // la qu'on lit sa progression, pas dans les seuls records.
    setHistory(
      pushGame({
        category: categoryId,
        difficultyId,
        difficulty: t.niveaux[difficultyId].label,
        chrono: roundChrono,
        score,
        total: roundResults.length,
      }),
    )

    setScreen('result')
  }

  function goHome() {
    setScreen('home')
  }

  return (
    <div className="flex min-h-dvh flex-col">
      <main className="flex-1">
        {screen === 'home' && (
          <HomeScreen
            category={categoryId}
            difficulty={difficultyId}
            chrono={chrono}
            bestScores={bestScores}
            questionCount={questions?.length ?? 0}
            ready={ready}
            onSelectCategory={setCategoryId}
            onSelectDifficulty={setDifficultyId}
            onToggleChrono={setChrono}
            onStart={() => start()}
            onReset={() => {
              setBestScores(clearBestScores())
              setHistory(clearHistory())
            }}
          />
        )}

        {screen === 'quiz' && (
          <QuizScreen
            key={roundKey}
            round={round}
            category={category}
            difficulty={difficulty}
            chrono={roundChrono}
            onFinish={finish}
            onQuit={goHome}
          />
        )}

        {screen === 'result' && (
          <ResultScreen
            category={category}
            difficulty={difficulty}
            round={round}
            results={results}
            chrono={roundChrono}
            isRecord={isRecord}
            bestScores={bestScores}
            history={history}
            onReplay={() => start()}
            onHome={goHome}
          />
        )}
      </main>

      <Footer />
    </div>
  )
}
