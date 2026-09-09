/**
 * Formatage des nombres affichés au joueur.
 *
 * Points et puissances de combat se comptent en milliers : sans séparateur,
 * « 6300 » et « 63000 » se confondent au premier coup d'œil. Le séparateur
 * dépend de la langue, d'où le passage par `Intl`.
 *
 * Les formateurs sont mis en cache par locale : en instancier un à chaque
 * cellule d'un tableau coûterait cher pour un résultat identique.
 */
const formateurs = new Map()

export function formatNombre(valeur, locale = 'fr-FR') {
  if (!formateurs.has(locale)) {
    formateurs.set(locale, new Intl.NumberFormat(locale))
  }
  return formateurs.get(locale).format(valeur)
}
