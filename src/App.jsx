import { useEffect, useState } from 'react'
import { CATEGORIES } from './data/questions'
import { buildRound, getDifficulty } from './lib/quiz'
import { loadBestScores, saveScore, clearBestScores } from './lib/storage'
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
  const [screen, setScreen] = useState('home')
  const [categoryId, setCategoryId] = useState(null)
  const [difficultyId, setDifficultyId] = useState('moyen')

  const [round, setRound] = useState([])
  const [roundKey, setRoundKey] = useState(0)
  const [results, setResults] = useState([])
  const [isRecord, setIsRecord] = useState(false)

  // Initialisation paresseuse : le localStorage est lu une seule fois, avant
  // le premier rendu, plutot que via un effet qui declencherait un re-rendu.
  const [bestScores, setBestScores] = useState(loadBestScores)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [screen, roundKey])

  const category = CATEGORIES.find((c) => c.id === categoryId) ?? null
  const difficulty = getDifficulty(difficultyId)

  function start(id = categoryId) {
    if (!id) return
    setRound(buildRound(id, difficultyId))
    setRoundKey((k) => k + 1)
    setResults([])
    setIsRecord(false)
    setScreen('quiz')
  }

  function finish(roundResults) {
    setResults(roundResults)

    const { all, updated } = saveScore(categoryId, {
      score: roundResults.filter(Boolean).length,
      total: roundResults.length,
      difficulty: difficulty.label,
    })

    setBestScores(all)
    setIsRecord(updated)
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
            bestScores={bestScores}
            onSelectCategory={setCategoryId}
            onSelectDifficulty={setDifficultyId}
            onStart={() => start()}
            onReset={() => setBestScores(clearBestScores())}
          />
        )}

        {screen === 'quiz' && (
          <QuizScreen
            key={roundKey}
            round={round}
            category={category}
            difficulty={difficulty}
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
            isRecord={isRecord}
            onReplay={() => start()}
            onHome={goHome}
          />
        )}
      </main>

      <Footer />
    </div>
  )
}
