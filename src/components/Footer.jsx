import { useLang } from '../i18n'

export default function Footer() {
  const { t } = useLang()

  return (
    <footer className="mt-auto border-t-[3px] border-paper/15 px-4 py-8">
      <div className="mx-auto flex max-w-3xl flex-col gap-3 text-center">
        <p className="font-label text-sm uppercase tracking-[0.16em] text-paper-dim">
          {t.pied.marque}
        </p>

        <p className="font-body text-xs leading-relaxed text-mist">{t.pied.mention}</p>

        <p className="font-body text-xs text-mist">{t.pied.credit}</p>
      </div>
    </footer>
  )
}
