import { useEffect } from 'react'
import { aboutParagraphs } from '../../data/portfolio'
import './AboutModal.css'

interface Props {
  open: boolean
  onClose: () => void
}

export default function AboutModal({ open, onClose }: Props) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null
  return (
    <div className="modal" onClick={onClose} role="presentation">
      <div className="card modal__box" role="dialog" aria-modal="true" aria-label="Sobre" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal__close" onClick={onClose} aria-label="Fechar">×</button>
        <span className="tag">{'// whoami'}</span>
        <h2 className="modal__title">Sobre mim</h2>
        {aboutParagraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
    </div>
  )
}
