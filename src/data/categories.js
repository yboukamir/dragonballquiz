/**
 * Catégories du quiz.
 *
 * Uniquement l'identité et l'accent de couleur : les libellés et accroches
 * dépendent de la langue et vivent donc dans `src/i18n/`. L'ordre de ce
 * tableau est l'ordre d'affichage.
 */
export const CATEGORIES = [
  { id: 'personnages', accent: 'orange' },
  { id: 'sagas', accent: 'cobalt' },
  { id: 'techniques', accent: 'ki' },
  { id: 'power', accent: 'crimson' },
]

export const CATEGORY_IDS = CATEGORIES.map((c) => c.id)
