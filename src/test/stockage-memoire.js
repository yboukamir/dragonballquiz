/**
 * Stockage en mémoire pour les tests, posé sur `globalThis.window`.
 *
 * Le code testé lit `window.localStorage` explicitement. Node n'a pas de
 * `window`, et jsdom serait une dépendance lourde pour trois méthodes. Les
 * deux options reproduisent les pannes réelles que le jeu doit encaisser
 * sans casser : un quota plein, et un stockage refusé en bloc (navigation
 * privée stricte, cookies bloqués).
 *
 * Renvoie la Map sous-jacente, pour préparer ou inspecter l'état brut sans
 * passer par le code testé.
 */
export function installerStockage({ plein = false, indisponible = false } = {}) {
  const donnees = new Map()

  const localStorage = {
    getItem: (cle) => (donnees.has(cle) ? donnees.get(cle) : null),
    setItem: (cle, valeur) => {
      if (plein) {
        const erreur = new Error('Quota dépassé')
        erreur.name = 'QuotaExceededError'
        throw erreur
      }
      donnees.set(cle, String(valeur))
    },
    removeItem: (cle) => {
      donnees.delete(cle)
    },
    clear: () => donnees.clear(),
  }

  if (indisponible) {
    globalThis.window = {}
    Object.defineProperty(globalThis.window, 'localStorage', {
      get() {
        const erreur = new Error('Accès refusé')
        erreur.name = 'SecurityError'
        throw erreur
      },
    })
  } else {
    globalThis.window = { localStorage }
  }

  return donnees
}
