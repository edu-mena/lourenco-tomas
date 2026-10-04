import { useEffect, useRef } from 'react'

const FOCUSABLE = 'a[href], button:not([disabled]), input, select, textarea, video[controls], [tabindex]:not([tabindex="-1"])'

/*
 * Comportamento comum a todos os modais: bloqueia o scroll, fecha com Esc,
 * mantém o foco dentro do modal e devolve-o ao elemento que o abriu.
 * `onKey` recebe as restantes teclas (ex.: setas para navegar).
 */
export function useModal(open, onClose, onKey) {
  const ref = useRef(null)
  const handlers = useRef({ onClose, onKey })
  handlers.current = { onClose, onKey }

  useEffect(() => {
    if (!open) return
    const opener = document.activeElement
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const focusables = () =>
      ref.current ? [...ref.current.querySelectorAll(FOCUSABLE)].filter(el => el.offsetParent !== null) : []

    const raf = requestAnimationFrame(() => {
      const [first] = focusables()
      ;(first || ref.current)?.focus({ preventScroll: true })
    })

    const onKeyDown = e => {
      if (e.key === 'Escape') { handlers.current.onClose(); return }
      if (e.key === 'Tab') {
        const els = focusables()
        if (!els.length) return
        const first = els[0], last = els[els.length - 1]
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
        return
      }
      handlers.current.onKey?.(e)
    }
    document.addEventListener('keydown', onKeyDown)

    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = prevOverflow
      opener?.focus?.({ preventScroll: true })
    }
  }, [open])

  return ref
}

/* Swipe horizontal simples para modais com navegação */
export function useSwipe(onLeft, onRight, threshold = 45) {
  const start = useRef(null)
  return {
    onTouchStart: e => { start.current = e.touches[0].clientX },
    onTouchEnd: e => {
      if (start.current === null) return
      const dx = e.changedTouches[0].clientX - start.current
      if (dx < -threshold) onLeft()
      else if (dx > threshold) onRight()
      start.current = null
    },
  }
}
