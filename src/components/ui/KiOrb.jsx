/**
 * Illustration vectorielle originale : une sphère d'énergie stylisée.
 *
 * Volontairement abstraite (anneaux concentriques + éclats), sans aucun
 * élément repris de l'œuvre d'Akira Toriyama. Purement décoratif, donc
 * masquée aux lecteurs d'écran.
 */
export default function KiOrb({ className = '', tone = 'var(--color-ki)', spikes = 12 }) {
  const rays = Array.from({ length: spikes }, (_, i) => (i * 360) / spikes)

  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {rays.map((angle) => (
        <path
          key={angle}
          d="M100 12 L106 46 L100 40 L94 46 Z"
          fill={tone}
          opacity="0.75"
          transform={`rotate(${angle} 100 100)`}
        />
      ))}
      <circle cx="100" cy="100" r="52" fill={tone} />
      <circle
        cx="100"
        cy="100"
        r="52"
        fill="none"
        stroke="var(--color-ink)"
        strokeWidth="5"
      />
      <circle
        cx="100"
        cy="100"
        r="34"
        fill="none"
        stroke="var(--color-ink)"
        strokeWidth="3"
        opacity="0.45"
      />
      <path
        d="M78 78 Q92 66 108 72"
        fill="none"
        stroke="var(--color-paper)"
        strokeWidth="7"
        strokeLinecap="round"
        opacity="0.85"
      />
    </svg>
  )
}
