import { CATEGORIES } from '../data/categories'
import { getDifficulty } from '../lib/quiz'
import { useLang } from '../i18n'
import CategoryCard from './CategoryCard'
import DifficultyPicker from './DifficultyPicker'
import LanguageSwitch from './LanguageSwitch'
import Button from './ui/Button'
import Toggle from './ui/Toggle'
import KiOrb from './ui/KiOrb'

export default function HomeScreen({
  category,
  difficulty,
  chrono,
  bestScores,
  questionCount,
  ready,
  onSelectCategory,
  onSelectDifficulty,
  onToggleChrono,
  onStart,
  onReset,
}) {
  const { t } = useLang()
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

        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="font-label text-sm uppercase tracking-[0.3em] text-ki">
            {t.accueil.surtitre}
          </p>
          <LanguageSwitch />
        </div>

        <h1 className="mt-2 font-display leading-[0.82]">
          <span className="block text-5xl text-paper sm:text-8xl">Dragon Ball</span>
          <span className="mt-2 inline-block -skew-x-6 border-[3px] border-ink bg-orange px-4 py-1 text-5xl text-ink shadow-[6px_6px_0_0_var(--color-void)] sm:text-8xl">
            <span className="inline-block skew-x-6">Quiz</span>
          </span>
        </h1>

        <p className="mt-5 max-w-xl font-body text-base leading-relaxed text-paper-dim sm:text-lg">
          {ready ? t.accueil.accroche(questionCount, CATEGORIES.length) : t.accueil.chargement}
        </p>
      </header>

      {/* --------------------------------------------------- Catégories */}
      <section aria-labelledby="cat-title" className="flex flex-col gap-4">
        <h2 id="cat-title" className="font-display text-3xl text-paper sm:text-4xl">
          <span className="text-ki">1.</span> {t.accueil.etapeCategorie}
        </h2>

        <div className="grid gap-3 sm:grid-cols-2">
          {CATEGORIES.map((c, i) => (
            <CategoryCard
              key={c.id}
              category={c}
              // Sur deux colonnes, un nombre impair de catégories laisserait
              // la dernière carte seule à gauche : on l'étale sur la ligne.
              wide={CATEGORIES.length % 2 === 1 && i === CATEGORIES.length - 1}
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
          <span className="text-ki">2.</span> {t.accueil.etapeNiveau}
        </h2>
        <DifficultyPicker value={difficulty} onChange={onSelectDifficulty} />

        <Toggle
          checked={chrono}
          onChange={onToggleChrono}
          label={t.accueil.chronoLabel}
          description={t.accueil.chronoDescription(niveau.seconds)}
        />
      </section>

      {/* -------------------------------------------------------- Départ */}
      <section className="flex flex-col items-center gap-3">
        <Button
          size="lg"
          variant="ki"
          onClick={onStart}
          disabled={!category || !ready}
          className="w-full sm:w-auto sm:px-16"
        >
          {category ? t.accueil.commencer : t.accueil.choisirCategorie}
        </Button>

        {hasRecords && (
          <button
            type="button"
            onClick={onReset}
            className="font-label text-xs uppercase tracking-[0.14em] text-mist underline decoration-2 underline-offset-4 hover:text-rose tap-safe"
          >
            {t.accueil.effacer}
          </button>
        )}
      </section>
    </div>
  )
}
