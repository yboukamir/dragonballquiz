import { useId } from 'react'
import { contenuBoule } from '../../lib/boule'

/**
 * Boule de cristal décorative, dessinée pour le site façon quiz book imprimé
 * (voir `src/lib/boule.js`). Purement décorative, donc masquée aux lecteurs
 * d'écran.
 */
export default function DragonBall({ className = '', tone = 'var(--color-orange)', etoiles = 4 }) {
  // Identifiant propre à chaque boule : deux boules dans la page ne doivent
  // pas se partager leur trame ni leur masque d'ombre.
  const id = `boule${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`

  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      aria-hidden="true"
      focusable="false"
      // Contenu statique produit par notre propre code, sans donnée utilisateur.
      dangerouslySetInnerHTML={{
        __html: contenuBoule({
          id,
          teinte: tone,
          encre: 'var(--color-ink)',
          papier: 'var(--color-paper)',
          rouge: 'var(--color-crimson)',
          etoiles,
        }),
      }}
    />
  )
}
