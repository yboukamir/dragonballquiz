import { CATEGORIES, QUESTIONS } from '../data/questions'
import { getDifficulty } from '../lib/quiz'
import CategoryCard from './CategoryCard'
import DifficultyPicker from './DifficultyPicker'
import Button from './ui/Button'
import Toggle from './ui/Toggle'
import KiOrb from './ui/KiOrb'

export default function HomeScreen({
  category,
  difficulty,
  chrono,
  bestScores,
  onSelectCategory,
  onSelectDifficulty,
  onToggleChrono,
  onStart,
  onReset,
}) {
  const hasRecords = Object.keys(bestScores).length > 0
  const niveau = getDifficulty(difficulty)

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-4 py-8 sm:gap-10 sm:py-14">
      {/* ---------------------------------------------------------- Hero */}
      <header className="relative">
        <KiOrb
          className="pointer-events-none absolute -right-8 -top-12 h-36 w-36 opacity-30 sm:h-56 sm:w-56"
          tone="var(--color-orange)"
        />

        <p className="font-label text-sm uppercase tracking-[0.3em] text-ki">
          Quiz de fan · 100 % gratuit
        </p>

        <h1 className="mt-2 font-display leading-[0.82]">
          <span className="block text-5xl text-paper sm:text-8xl">Dragon Ball</span>
          <span className="mt-2 inline-block -skew-x-6 border-[3px] border-ink bg-orange px-4 py-1 text-5xl text-ink shadow-[6px_6px_0_0_var(--color-void)] sm:text-8xl">
            <span className="inline-block skew-x-6">Quiz</span>
          </span>
        </h1>

        <p className="mt-5 max-w-xl font-body text-base leading-relaxed text-paper-dim sm:text-lg">
          {QUESTIONS.length} questions originales réparties en 4 catégories et 3
          niveaux. Réponds vite, gagne ton rang, et va défier tes amis avec ta
          puissance de combat.
        </p>
      </header>

      {/* --------------------------------------------------- Catégories */}
      <section aria-labelledby="cat-title" className="flex flex-col gap-4">
        <h2 id="cat-title" className="font-display text-3xl text-paper sm:text-4xl">
          <span className="text-ki">1.</span> Choisis ton terrain
        </h2>

        <div className="grid gap-3 sm:grid-cols-2">
          {CATEGORIES.map((c) => (
            <CategoryCard
              key={c.id}
              category={c}
              best={bestScores[c.id]}
              chrono={chrono}
              selected={category === c.id}
              onSelect={onSelectCategory}
            />
          ))}
        </div>
      </section>

      {/* --------------------------------------------------- Difficulté */}
      <section aria-labelledby="diff-title" className="flex flex-col gap-4">
        <h2 id="diff-title" className="font-display text-3xl text-paper sm:text-4xl">
          <span className="text-ki">2.</span> Choisis ton niveau
        </h2>
        <DifficultyPicker value={difficulty} onChange={onSelectDifficulty} />

        <Toggle
          checked={chrono}
          onChange={onToggleChrono}
          label="⏱ Mode chrono"
          description={`${niveau.seconds} secondes par question. Passé le délai, la question est perdue.`}
        />
      </section>

      {/* -------------------------------------------------------- Départ */}
      <section className="flex flex-col items-center gap-3">
        <Button
          size="lg"
          variant="ki"
          onClick={onStart}
          disabled={!category}
          className="w-full sm:w-auto sm:px-16"
        >
          {category ? 'Commencer le combat →' : 'Choisis une catégorie'}
        </Button>

        {hasRecords && (
          <button
            type="button"
            onClick={onReset}
            className="font-label text-xs uppercase tracking-[0.14em] text-smoke underline decoration-2 underline-offset-4 hover:text-crimson tap-safe"
          >
            Effacer mes records
          </button>
        )}
      </section>
    </div>
  )
}
