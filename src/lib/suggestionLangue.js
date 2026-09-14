/**
 * Faut-il proposer l'autre langue au visiteur, et laquelle ?
 *
 * Une **proposition**, jamais une redirection : rediriger selon la langue du
 * navigateur enverrait Googlebot, qui explore en anglais, loin de la page
 * française (voir `preferenceEnregistree` dans `src/i18n`).
 *
 * - Sur la page française, on propose l'anglais à un navigateur qui ne
 *   déclare pas le français du tout : le site vit sur un .com, un visiteur
 *   espagnol ou allemand lit plus probablement l'anglais.
 * - Sur la page anglaise, on propose le français seulement si c'est la
 *   première langue du navigateur : un anglophone qui lit aussi le français
 *   n'a rien demandé.
 *
 * Rien n'est proposé à qui a déjà choisi une langue, ni à qui a fermé le
 * bandeau.
 */
export const CLE_SUGGESTION = 'dbq.suggestionLangue.v1'

export function langueSuggeree({ lang, languesNavigateur = [], preference = null, fermee = false }) {
  if (preference || fermee) return null
  const prefixes = languesNavigateur
    .filter(Boolean)
    .map((l) => String(l).slice(0, 2).toLowerCase())
  if (!prefixes.length) return null
  if (lang === 'fr') return prefixes.includes('fr') ? null : 'en'
  if (lang === 'en') return prefixes[0] === 'fr' ? 'fr' : null
  return null
}
