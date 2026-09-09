import { useEffect, useRef, useState } from 'react'
import Button from './ui/Button'

/**
 * Copie le résumé de la partie dans le presse-papier.
 * Aucune API réseau social : juste du texte, que le joueur colle où il veut.
 *
 * Trois cas à couvrir :
 *  1. `navigator.clipboard` en contexte sécurisé — le cas normal ;
 *  2. le repli historique par <textarea> + execCommand (http, vieux Safari) ;
 *  3. le refus pur et simple du navigateur (permission, absence de geste
 *     utilisateur, iframe restreinte) : on affiche alors le texte,
 *     pré-sélectionné, pour que la copie manuelle reste possible.
 */
async function copyText(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
      return true
    }
  } catch {
    /* on tente la solution de repli */
  }

  try {
    const area = document.createElement('textarea')
    area.value = text
    area.setAttribute('readonly', '')
    area.style.position = 'fixed'
    area.style.opacity = '0'
    document.body.appendChild(area)
    area.select()
    const ok = document.execCommand('copy')
    document.body.removeChild(area)
    return ok
  } catch {
    return false
  }
}

export default function ShareButton({ text, className = '' }) {
  const [status, setStatus] = useState('idle')
  const fallbackRef = useRef(null)

  useEffect(() => {
    if (status !== 'done') return
    const t = setTimeout(() => setStatus('idle'), 2400)
    return () => clearTimeout(t)
  }, [status])

  // Copie refusée : on met le texte sous les yeux du joueur, déjà
  // sélectionné, pour qu'un simple Ctrl+C suffise.
  useEffect(() => {
    if (status !== 'failed') return
    fallbackRef.current?.focus()
    fallbackRef.current?.select()
  }, [status])

  return (
    <div className={className}>
      <Button
        variant="paper"
        size="md"
        className="w-full"
        onClick={async () => setStatus((await copyText(text)) ? 'done' : 'failed')}
      >
        {status === 'done' ? '✔ Copié !' : '⧉ Partager mon score'}
      </Button>

      <p aria-live="polite" className="mt-2 min-h-5 text-center font-body text-xs text-paper-dim">
        {status === 'done' && 'Le résumé est dans ton presse-papier, colle-le où tu veux.'}
        {status === 'failed' &&
          'Ton navigateur a bloqué la copie — le texte est sélectionné, fais Ctrl+C (ou ⌘+C).'}
      </p>

      {status === 'failed' && (
        <textarea
          ref={fallbackRef}
          readOnly
          rows={6}
          value={text}
          aria-label="Résumé de la partie à copier"
          className="w-full resize-none border-[3px] border-paper/30 bg-ink-soft p-3 font-body text-sm text-paper"
        />
      )}
    </div>
  )
}
