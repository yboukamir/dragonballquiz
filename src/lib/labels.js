import { DIFFICULTIES } from './quiz.js'
import { LANGUES } from '../i18n'

/**
 * Retrouve l'identifiant de niveau à partir d'un libellé figé.
 *
 * Les records enregistrés avant le passage au bilingue ne portaient que le
 * texte affiché à l'époque. Comme les libellés possibles sont en nombre
 * fini et connus, on peut les reconnaître et les traduire quand même,
 * plutôt que d'afficher « Moyen » au milieu d'une interface anglaise.
 */
const parLibelle = new Map()
for (const langue of Object.values(LANGUES)) {
  for (const d of DIFFICULTIES) {
    parLibelle.set(langue.niveaux[d.id].label.toLowerCase(), d.id)
  }
}

/**
 * Libellé de niveau d'un enregistrement, dans la langue courante.
 * L'identifiant explicite prime ; sinon on tente la reconnaissance ; en
 * dernier recours on réaffiche le texte stocké tel quel, ce qui reste
 * préférable à un blanc.
 */
export function labelNiveau(enregistrement, t) {
  const explicite = enregistrement?.difficultyId
  if (explicite && t.niveaux[explicite]) return t.niveaux[explicite].label

  const stocke = enregistrement?.difficulty
  if (!stocke) return ''

  const reconnu = parLibelle.get(String(stocke).toLowerCase())
  return reconnu ? t.niveaux[reconnu].label : stocke
}
