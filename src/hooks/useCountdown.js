import { useEffect, useRef, useState } from 'react'

const TICK_MS = 100

/**
 * Compte à rebours en secondes, avec deux garanties :
 *
 * - il se met en pause quand l'onglet passe en arrière-plan. Perdre une
 *   question parce qu'on a basculé sur une notification serait injuste, et
 *   les navigateurs bridant les timers des onglets cachés, un décompte
 *   naïf y deviendrait de toute façon faux ;
 * - le temps restant se calcule à partir du temps réellement écoulé
 *   (`performance.now`) et non d'un compteur décrémenté à chaque tick, qui
 *   dériverait au fil des imprécisions de `setInterval`.
 *
 * @param {number} seconds durée totale
 * @param {boolean} running le décompte avance-t-il
 * @param {() => void} onExpire appelé une seule fois, à zéro
 * @returns {number} secondes restantes (décimal, pour animer finement)
 */
export default function useCountdown(seconds, running, onExpire) {
  const [remaining, setRemaining] = useState(seconds)

  // Réinitialisation pendant le rendu plutôt que dans un effet : c'est le
  // motif recommandé par React pour remettre un état à zéro quand une
  // entrée change, et il évite le rendu intermédiaire où la jauge
  // afficherait encore la valeur du cycle précédent.
  const cycle = `${seconds}|${running}`
  const [cyclePrecedent, setCyclePrecedent] = useState(cycle)
  if (cycle !== cyclePrecedent) {
    setCyclePrecedent(cycle)
    setRemaining(seconds)
  }

  // Gardé dans une ref : un changement de callback ne doit pas relancer
  // le décompte à zéro.
  const onExpireRef = useRef(onExpire)
  useEffect(() => {
    onExpireRef.current = onExpire
  }, [onExpire])

  useEffect(() => {
    if (!running) return

    let restant = seconds * 1000
    let dernierTick = performance.now()
    let termine = false

    const id = setInterval(() => {
      const maintenant = performance.now()
      const ecoule = maintenant - dernierTick
      dernierTick = maintenant

      // Onglet caché : on laisse filer le temps réel sans le décompter.
      if (document.hidden) return

      restant -= ecoule
      if (restant <= 0) {
        restant = 0
        if (!termine) {
          termine = true
          clearInterval(id)
          setRemaining(0)
          onExpireRef.current?.()
        }
        return
      }
      setRemaining(restant / 1000)
    }, TICK_MS)

    return () => clearInterval(id)
  }, [seconds, running])

  return remaining
}
