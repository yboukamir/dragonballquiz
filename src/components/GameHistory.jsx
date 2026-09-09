import { CATEGORIES } from '../data/categories'
import { formatWhen } from '../lib/history'
import { getRank, ratioDe } from '../lib/ranks'
import { formatNombre } from '../lib/format'
import { accent } from '../lib/accents'
import { useLang } from '../i18n'
import { aDesPoints, labelNiveau } from '../lib/labels'

const ACCENTS = Object.fromEntries(CATEGORIES.map((c) => [c.id, c.accent]))

/**
 * Les six dernières parties, de la plus récente à la plus ancienne.
 *
 * Le journal en conserve vingt : afficher tout ferait un mur, alors que
 * six suffisent à lire une tendance juste après avoir joué.
 */
const A_AFFICHER = 6

export default function GameHistory({ history }) {
  const { t } = useLang()
  if (!history || history.length === 0) return null

  const parties = history.slice(0, A_AFFICHER)

  return (
    <section className="border-[3px] border-paper/25 bg-ink-soft">
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b-[3px] border-paper/25 px-4 py-3">
        <h2 className="font-display text-2xl leading-none text-paper">{t.historique.titre}</h2>
        {history.length > A_AFFICHER && (
          <p className="font-label text-xs uppercase tracking-[0.14em] text-smoke">
            {t.historique.conservees(parties.length, history.length)}
          </p>
        )}
      </div>

      <ol className="divide-y-2 divide-paper/10">
        {parties.map((partie, i) => {
          const pct = ratioDe(partie)
          const rang = t.rangs[getRank(pct).id]
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
                  {t.categories[partie.category]?.label ?? partie.category}
                  {partie.chrono && <span className="text-crimson"> ⏱</span>}
                </span>
                <span className="block font-label text-xs uppercase tracking-wider text-smoke">
                  {partie.score}/{partie.total} · {labelNiveau(partie, t)} ·{' '}
                  {formatWhen(partie.date, t.locale)}
                  {courante && <span className="text-ki"> · {t.historique.cettePartie}</span>}
                </span>
              </span>

              <span className="shrink-0 text-right">
                <span className="block font-display text-lg leading-none tabular-nums text-paper">
                  {aDesPoints(partie) ? (
                    <>
                      {formatNombre(partie.points, t.locale)}
                      <span className="text-xs text-smoke"> {t.unites.points}</span>
                    </>
                  ) : (
                    <>
                      {partie.score}/{partie.total}
                    </>
                  )}
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
