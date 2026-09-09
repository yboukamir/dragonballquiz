import { useEffect, useMemo, useRef, useState } from 'react'
import Button from './ui/Button'

/**
 * Partage du score, par ordre de préférence :
 *
 *  1. API Web Share — la feuille de partage native du système. C'est le
 *     chemin naturel sur mobile : messagerie, réseaux, notes, tout y passe
 *     sans qu'on ait à intégrer la moindre API tierce.
 *  2. Presse-papier, quand Web Share est absent (cas de la plupart des
 *     navigateurs de bureau).
 *  3. Champ de texte pré-sélectionné, si le navigateur refuse même la copie.
 */

/** Web Share n'existe qu'en contexte sécurisé et sur une partie des navigateurs. */
function supporteWebShare(payload) {
  if (typeof navigator === 'undefined' || typeof navigator.share !== 'function') return false
  // canShare valide la charge utile : certains navigateurs acceptent `text`
  // mais pas `url`, ou l'inverse.
  if (typeof navigator.canShare === 'function') {
    try {
      return navigator.canShare(payload)
    } catch {
      return false
    }
  }
  return true
}

async function copierTexte(texte) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(texte)
      return true
    }
  } catch {
    /* on tente la solution de repli */
  }

  try {
    const zone = document.createElement('textarea')
    zone.value = texte
    zone.setAttribute('readonly', '')
    zone.style.position = 'fixed'
    zone.style.opacity = '0'
    document.body.appendChild(zone)
    zone.select()
    const ok = document.execCommand('copy')
    document.body.removeChild(zone)
    return ok
  } catch {
    return false
  }
}

export default function ShareButton({ payload, className = '' }) {
  const [status, setStatus] = useState('idle')
  const replRef = useRef(null)

  // La disponibilité de Web Share ne varie pas pendant la session : c'est une
  // valeur dérivée du navigateur, pas un état à synchroniser dans un effet.
  const partageNatif = useMemo(
    () => supporteWebShare({ title: payload.title, text: payload.text, url: payload.url }),
    [payload],
  )

  useEffect(() => {
    if (status !== 'copied' && status !== 'shared') return
    const t = setTimeout(() => setStatus('idle'), 2400)
    return () => clearTimeout(t)
  }, [status])

  useEffect(() => {
    if (status !== 'failed') return
    replRef.current?.focus()
    replRef.current?.select()
  }, [status])

  async function copier() {
    setStatus((await copierTexte(payload.full)) ? 'copied' : 'failed')
  }

  async function partager() {
    const { title, text, url } = payload
    try {
      await navigator.share({ title, text, url })
      setStatus('shared')
    } catch (err) {
      // L'utilisateur a simplement fermé la feuille de partage : ce n'est
      // pas une erreur, et afficher un message serait déroutant.
      if (err?.name === 'AbortError') return
      await copier()
    }
  }

  const libelle = {
    shared: '✔ Partagé !',
    copied: '✔ Copié !',
  }

  return (
    <div className={className}>
      <Button
        variant="paper"
        size="md"
        className="w-full"
        onClick={partageNatif ? partager : copier}
      >
        {libelle[status] ?? (partageNatif ? '↗ Partager mon score' : '⧉ Copier mon score')}
      </Button>

      {/* Sur mobile, la feuille native ne remplace pas toujours le besoin
          d'un simple copier-coller : on laisse les deux accessibles. */}
      {partageNatif && (
        <button
          type="button"
          onClick={copier}
          className="mt-2 w-full font-label text-xs uppercase tracking-[0.14em] text-paper-dim underline decoration-2 underline-offset-4 hover:text-ki tap-safe"
        >
          ou copier le texte
        </button>
      )}

      <p aria-live="polite" className="mt-2 min-h-5 text-center font-body text-xs text-paper-dim">
        {status === 'shared' && 'Résumé envoyé à l’application choisie.'}
        {status === 'copied' && 'Le résumé est dans ton presse-papier, colle-le où tu veux.'}
        {status === 'failed' &&
          'Ton navigateur a bloqué la copie — le texte est sélectionné, fais Ctrl+C (ou ⌘+C).'}
      </p>

      {status === 'failed' && (
        <textarea
          ref={replRef}
          readOnly
          rows={6}
          value={payload.full}
          aria-label="Résumé de la partie à copier"
          className="w-full resize-none border-[3px] border-paper/30 bg-ink-soft p-3 font-body text-sm text-paper"
        />
      )}
    </div>
  )
}
