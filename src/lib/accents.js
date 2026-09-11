/**
 * Table des accents de couleur.
 *
 * Tailwind analyse le code source à la recherche de classes littérales :
 * une classe construite dynamiquement (`bg-${accent}`) ne serait jamais
 * générée. On écrit donc chaque combinaison en toutes lettres ici, et les
 * composants se contentent de piocher dedans.
 *
 * `surSombre` est la couleur de texte à employer sur l’encre : cobalt et
 * crimson y descendent sous le seuil de contraste WCAG, d’où leurs variantes.
 */
export const ACCENTS = {
  orange: {
    solid: 'bg-orange text-ink',
    text: 'text-orange',
    border: 'border-orange',
    soft: 'bg-orange/15 text-orange',
    surSombre: 'text-orange',
    glow: 'shadow-[0_0_40px_-6px_var(--color-orange)]',
  },
  ki: {
    solid: 'bg-ki text-ink',
    text: 'text-ki',
    border: 'border-ki',
    soft: 'bg-ki/15 text-ki',
    surSombre: 'text-ki',
    glow: 'shadow-[0_0_40px_-6px_var(--color-ki)]',
  },
  cobalt: {
    solid: 'bg-cobalt text-paper',
    text: 'text-cobalt',
    border: 'border-cobalt',
    soft: 'bg-cobalt/20 text-sky',
    surSombre: 'text-sky',
    glow: 'shadow-[0_0_40px_-6px_var(--color-cobalt)]',
  },
  sky: {
    solid: 'bg-sky text-ink',
    text: 'text-sky',
    border: 'border-sky',
    soft: 'bg-sky/15 text-sky',
    surSombre: 'text-sky',
    glow: 'shadow-[0_0_40px_-6px_var(--color-sky)]',
  },
  crimson: {
    solid: 'bg-crimson text-paper',
    text: 'text-crimson',
    border: 'border-crimson',
    soft: 'bg-crimson/15 text-rose',
    surSombre: 'text-rose',
    glow: 'shadow-[0_0_40px_-6px_var(--color-crimson)]',
  },
  jade: {
    solid: 'bg-jade text-ink',
    text: 'text-jade',
    border: 'border-jade',
    soft: 'bg-jade/15 text-jade',
    surSombre: 'text-jade',
    glow: 'shadow-[0_0_40px_-6px_var(--color-jade)]',
  },
  smoke: {
    solid: 'bg-smoke text-paper',
    text: 'text-smoke',
    border: 'border-smoke',
    soft: 'bg-smoke/20 text-paper-dim',
    surSombre: 'text-mist',
    glow: 'shadow-[0_0_40px_-6px_var(--color-smoke)]',
  },
}

export const accent = (name) => ACCENTS[name] ?? ACCENTS.orange
