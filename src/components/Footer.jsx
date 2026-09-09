export default function Footer() {
  return (
    <footer className="mt-auto border-t-[3px] border-paper/15 px-4 py-8">
      <div className="mx-auto flex max-w-3xl flex-col gap-3 text-center">
        <p className="font-label text-sm uppercase tracking-[0.16em] text-paper-dim">
          Dragon&nbsp;Ball&nbsp;Quiz
        </p>

        <p className="font-body text-xs leading-relaxed text-smoke">
          Site de fan non officiel, sans lien avec Toei Animation, Shueisha ou les
          ayants droit d&apos;Akira Toriyama. Dragon Ball et les noms qui en sont
          issus appartiennent à leurs propriétaires respectifs. Aucune image, aucun
          artwork ni aucun logo tiré de l&apos;œuvre originale n&apos;est utilisé ici :
          l&apos;habillage graphique et les questions sont des créations originales.
        </p>

        <p className="font-body text-xs text-smoke">
          {/* Remplacer par un lien vers le portfolio si besoin. */}
          Conçu et développé par Yassine Boukamir.
        </p>
      </div>
    </footer>
  )
}
