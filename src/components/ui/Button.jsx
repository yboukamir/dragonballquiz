import { accent } from '../../lib/accents'

const BASE =
  'relative inline-flex items-center justify-center gap-2 tap-safe select-none ' +
  'font-label font-bold uppercase tracking-[0.06em] border-[3px] border-ink ' +
  'transition-[transform,box-shadow,background-color] duration-100 ease-out ' +
  'disabled:opacity-45 disabled:pointer-events-none ' +
  'shadow-[5px_5px_0_0_var(--color-ink)] ' +
  'hover:-translate-x-[1px] hover:-translate-y-[1px] hover:shadow-[7px_7px_0_0_var(--color-ink)] ' +
  'active:translate-x-[3px] active:translate-y-[3px] active:shadow-[1px_1px_0_0_var(--color-ink)]'

const SIZES = {
  sm: 'px-4 py-2 text-base',
  md: 'px-6 py-3 text-lg',
  lg: 'px-8 py-4 text-2xl',
}

const VARIANTS = {
  paper: 'bg-paper text-ink hover:bg-white',
  ink: 'bg-ink-soft text-paper border-paper/70 hover:bg-smoke',
}

/**
 * Bouton "encre" : bordure épaisse, ombre portée dure (jamais floue) et
 * léger cisaillement pour la dynamique manga.
 *
 * @param {'sm'|'md'|'lg'} size
 * @param {'paper'|'ink'|keyof typeof import('../../lib/accents').ACCENTS} variant
 * @param {boolean} skew  cisaillement -6deg, compensé sur le contenu
 */
export default function Button({
  children,
  size = 'md',
  variant = 'orange',
  skew = true,
  className = '',
  ...props
}) {
  const tone = VARIANTS[variant] ?? accent(variant).solid

  return (
    <button
      type="button"
      className={[
        BASE,
        SIZES[size] ?? SIZES.md,
        tone,
        skew ? '-skew-x-6' : '',
        className,
      ].join(' ')}
      {...props}
    >
      <span className={skew ? 'skew-x-6 inline-flex items-center gap-2' : 'inline-flex items-center gap-2'}>
        {children}
      </span>
    </button>
  )
}
