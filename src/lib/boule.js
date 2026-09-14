/**
 * Boule de cristal dessinée pour le site, à la manière d'un quiz book imprimé :
 * aplat orange, contour d'encre épais, ombre en trame de points, reflet blanc
 * et étoiles rouges cernées d'encre. Dessin original en SVG : aucune image,
 * aucun artwork repris de l'œuvre.
 *
 * Le dessin est partagé entre le composant `DragonBall` et les images de
 * partage (`scripts/og-images.mjs`) : une seule source, pas de copie qui
 * diverge.
 */

export const CENTRE = 100
export const RAYON = 80

/** Décalage du disque qui découpe l'ombre : la lumière vient d'en haut à gauche. */
export const DECALAGE_OMBRE = 20

// Disposition des étoiles, en décalages depuis le centre, de 1 à 7 étoiles.
const DISPOSITIONS = {
  1: { r: 26, points: [[0, 0]] },
  2: { r: 19, points: [[-22, 0], [22, 0]] },
  3: { r: 18, points: [[0, -24], [-22, 14], [22, 14]] },
  4: { r: 17, points: [[-20, -20], [20, -20], [-20, 20], [20, 20]] },
  5: { r: 14, points: [[0, -32], [-30, -8], [30, -8], [-18, 28], [18, 28]] },
  6: { r: 13, points: [[-20, -30], [20, -30], [-34, 2], [34, 2], [-18, 32], [18, 32]] },
  7: { r: 13, points: [[0, 0], [0, -36], [-32, -18], [32, -18], [-32, 18], [32, 18], [0, 36]] },
}

/** Tracé d'une étoile à cinq branches, pointe en haut. */
export function cheminEtoile(cx, cy, r) {
  const sommets = Array.from({ length: 10 }, (_, i) => {
    const distance = i % 2 === 0 ? r : r * 0.45
    const angle = -Math.PI / 2 + (i * Math.PI) / 5
    return `${(cx + distance * Math.cos(angle)).toFixed(1)} ${(cy + distance * Math.sin(angle)).toFixed(1)}`
  })
  return `M${sommets.join(' L')} Z`
}

/** Nombre d'étoiles ramené entre 1 et 7, comme les boules de la série. */
export const bornerEtoiles = (n) => Math.min(7, Math.max(1, Math.round(Number(n) || 1)))

/** Centres et rayon des étoiles d'une boule à `n` étoiles. */
export function etoilesDe(n) {
  const { r, points } = DISPOSITIONS[bornerEtoiles(n)]
  return points.map(([dx, dy]) => ({ cx: CENTRE + dx, cy: CENTRE + dy, r }))
}

/**
 * Contenu SVG de la boule (sans la balise <svg>), pour un viewBox 0 0 200 200.
 * `id` doit être unique dans la page : il nomme la trame et le masque d'ombre.
 * Les couleurs acceptent aussi des variables CSS.
 */
export function contenuBoule({
  id = 'boule',
  teinte = '#ff6b00',
  encre = '#0f0e14',
  papier = '#fff7e8',
  rouge = '#dc1a3b',
  etoiles = 4,
} = {}) {
  const trame = `${id}-trame`
  const ombre = `${id}-ombre`
  const traces = etoilesDe(etoiles)
    .map(
      ({ cx, cy, r }) =>
        `<path d="${cheminEtoile(cx, cy, r)}" fill="${rouge}" stroke="${encre}" stroke-width="2.5" stroke-linejoin="round"/>`,
    )
    .join('')

  return `<defs>
<pattern id="${trame}" width="8" height="8" patternUnits="userSpaceOnUse"><circle cx="4" cy="4" r="1.8" fill="${encre}"/></pattern>
<mask id="${ombre}"><circle cx="${CENTRE}" cy="${CENTRE}" r="${RAYON}" fill="#fff"/><circle cx="${CENTRE - DECALAGE_OMBRE}" cy="${CENTRE - DECALAGE_OMBRE}" r="${RAYON}" fill="#000"/></mask>
</defs>
<circle cx="${CENTRE}" cy="${CENTRE}" r="${RAYON}" fill="${teinte}"/>
${traces}
<rect width="200" height="200" fill="url(#${trame})" mask="url(#${ombre})" opacity="0.55"/>
<path d="M50 96 Q58 60 96 50" fill="none" stroke="${papier}" stroke-width="9" stroke-linecap="round"/>
<circle cx="47" cy="117" r="5.5" fill="${papier}"/>
<circle cx="${CENTRE}" cy="${CENTRE}" r="${RAYON}" fill="none" stroke="${encre}" stroke-width="6"/>`
}

/** La boule en SVG autonome, pour les pages générées hors de React. */
export function bouleSvg({ classe = '', ...options } = {}) {
  return `<svg class="${classe}" viewBox="0 0 200 200" aria-hidden="true">${contenuBoule(options)}</svg>`
}
