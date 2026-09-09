import { CATEGORIES } from '../data/categories'
import { getRank, ratioDe } from '../lib/ranks'
import { formatNombre } from '../lib/format'
import { useLang } from '../i18n'
import { aDesPoints, labelNiveau } from '../lib/labels'

/**
 * Tableau des meilleurs scores : une ligne par catégorie, une colonne par
 * mode. Contrairement aux cartes d'accueil, qui n'affichent que le mode
 * sélectionné pour rester lisibles, on montre ici les deux — en fin de
 * partie, voir ce qui reste à conquérir est précisément l'intérêt.
 *
 * La case qui vient d'être jouée est mise en évidence, et signalée d'une
 * étoile si elle constitue un nouveau record.
 */
function Cellule({ record, courante, nouveau, t }) {
  if (!record) {
    return (
      <td
        className={[
          'border-2 border-ink px-2 py-2 text-center align-middle',
          courante ? 'bg-ki/25' : '',
        ].join(' ')}
      >
        <span className="font-body text-sm text-ink/35">—</span>
      </td>
    )
  }

  const rang = t.rangs[getRank(ratioDe(record)).id]
  // Les records d'avant le barème n'ont pas de points : on retombe alors
  // sur la fraction, qui est ce qu'ils mesuraient réellement.
  const pondere = aDesPoints(record)

  return (
    <td
      className={[
        'border-2 border-ink px-2 py-2 text-center align-middle',
        courante ? 'bg-ki/25' : '',
      ].join(' ')}
    >
      <span className="block font-display text-lg leading-none tabular-nums">
        {nouveau && <span aria-label={t.tableau.nouveauRecord}>★ </span>}
        {pondere ? (
          <>
            {formatNombre(record.points, t.locale)}
            <span className="text-xs text-ink/50"> {t.unites.points}</span>
          </>
        ) : (
          <>
            {record.score}/{record.total}
          </>
        )}
      </span>
      <span className="mt-0.5 block font-label text-[0.65rem] uppercase leading-tight tracking-wider text-ink/60">
        {labelNiveau(record, t)} · {rang.label}
      </span>
    </td>
  )
}

export default function ScoreTable({ bestScores, categoryId, chrono, isRecord }) {
  const { t } = useLang()
  const joues = CATEGORIES.filter(
    (c) => bestScores[c.id]?.normal || bestScores[c.id]?.chrono,
  ).length

  return (
    <section className="border-[3px] border-ink bg-paper text-ink shadow-[6px_6px_0_0_var(--color-void)]">
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b-[3px] border-ink px-4 py-3">
        <h2 className="font-display text-2xl leading-none">{t.tableau.titre}</h2>
        <p className="font-label text-xs uppercase tracking-[0.14em] text-ink/60">
          {t.tableau.entamees(joues, CATEGORIES.length)}
        </p>
      </div>

      {/* Le tableau reste étroit, mais on garde le conteneur défilant :
          une traduction plus longue ne doit pas déborder de la page. */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <caption className="sr-only">
            {t.tableau.legende}
          </caption>
          <thead>
            <tr>
              <th
                scope="col"
                className="border-2 border-ink bg-ink px-3 py-2 text-left font-label text-xs uppercase tracking-[0.12em] text-paper"
              >
                {t.tableau.colCategorie}
              </th>
              <th
                scope="col"
                className="border-2 border-ink bg-ink px-2 py-2 font-label text-xs uppercase tracking-[0.12em] text-paper"
              >
                {t.tableau.colClassique}
              </th>
              <th
                scope="col"
                className="border-2 border-ink bg-ink px-2 py-2 font-label text-xs uppercase tracking-[0.12em] text-paper"
              >
                {t.tableau.colChrono}
              </th>
            </tr>
          </thead>

          <tbody>
            {CATEGORIES.map((c) => {
              const best = bestScores[c.id] ?? {}
              const estCourante = c.id === categoryId

              return (
                <tr key={c.id}>
                  <th
                    scope="row"
                    className={[
                      'border-2 border-ink px-3 py-2 text-left font-body text-sm font-semibold',
                      estCourante ? 'bg-ki/25' : '',
                    ].join(' ')}
                  >
                    {t.categories[c.id].label}
                  </th>

                  <Cellule
                    t={t}
                    record={best.normal}
                    courante={estCourante && !chrono}
                    nouveau={estCourante && !chrono && isRecord}
                  />
                  <Cellule
                    t={t}
                    record={best.chrono}
                    courante={estCourante && chrono}
                    nouveau={estCourante && chrono && isRecord}
                  />
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}
