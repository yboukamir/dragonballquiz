import { CATEGORIES } from '../data/questions'
import { formatWhen } from '../lib/history'
import { getRank } from '../lib/ranks'
import { accent } from '../lib/accents'

const LIBELLES = Object.fromEntries(CATEGORIES.map((c) => [c.id, c.label]))
const ACCENTS = Object.fromEntries(CATEGORIES.map((c) => [c.id, c.accent]))

/**
 * Les six dernières parties, de la plus récente à la plus ancienne.
 *
 * Le journal en conserve vingt : afficher tout ferait un mur, alors que
 * six suffisent à lire une tendance juste après avoir joué.
 */
const A_AFFICHER = 6

export default function GameHistory({ history }) {
  if (!history || history.length === 0) return null

  const parties = history.slice(0, A_AFFICHER)

  return (
    <section className="border-[3px] border-paper/25 bg-ink-soft">
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b-[3px] border-paper/25 px-4 py-3">
        <h2 className="font-display text-2xl leading-none text-paper">Dernières parties</h2>
        {history.length > A_AFFICHER && (
          <p className="font-label text-xs uppercase tracking-[0.14em] text-smoke">
            {parties.length} sur {history.length} conservées
          </p>
        )}
      </div>

      <ol className="divide-y-2 divide-paper/10">
        {parties.map((partie, i) => {
          const pct = partie.total > 0 ? partie.score / partie.total : 0
          const rang = getRank(partie.score, partie.total)
          const a = accent(ACCENTS[partie.category] ?? 'orange')
          const courante = i === 0

          return (
            <li
              key={`${partie.date}-${i}`}
              className={[
                'flex items-center gap-3 px-4 py-3',
                courante ? 'bg-ki/10' : '',
              ].join(' ')}
            >
              {/* Barre de score : lire une progression est plus rapide en
                  comparant des longueurs qu'en lisant des fractions. */}
              <span
                className="h-9 w-1.5 shrink-0 border border-ink bg-smoke/40"
                aria-hidden="true"
              >
                <span
                  className="block w-full bg-ki"
                  style={{ height: `${pct * 100}%`, marginTop: `${(1 - pct) * 100}%` }}
                />
              </span>

              <span className="min-w-0 flex-1">
                <span className="block truncate font-body text-sm font-semibold text-paper">
                  {LIBELLES[partie.category] ?? partie.category}
                  {partie.chrono && <span className="text-crimson"> ⏱</span>}
                </span>
                <span className="block font-label text-xs uppercase tracking-wider text-smoke">
                  {partie.difficulty} · {formatWhen(partie.date)}
                  {courante && <span className="text-ki"> · cette partie</span>}
                </span>
              </span>

              <span className="shrink-0 text-right">
                <span className="block font-display text-lg leading-none tabular-nums text-paper">
                  {partie.score}/{partie.total}
                </span>
                <span className={`block font-label text-[0.65rem] uppercase tracking-wider ${a.text}`}>
                  {rang.label}
                </span>
              </span>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
