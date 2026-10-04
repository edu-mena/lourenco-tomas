import { useEffect, useRef } from 'react'
import { useSprayCanvas, useMediaQuery } from '../hooks'

const TEXT_FIELDS = 'input, textarea, select, [contenteditable="true"]'

/* Cursor de pincel — só em dispositivos com rato; em ecrãs táteis não é montado */
export default function Cursor() {
  const finePointer = useMediaQuery('(hover: hover) and (pointer: fine)')

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('has-brush-cursor', finePointer)
    return () => root.classList.remove('has-brush-cursor')
  }, [finePointer])

  return finePointer ? <BrushCursor /> : null
}

function BrushCursor() {
  const brushRef = useRef(null)
  const sprayCanvasRef = useSprayCanvas()

  useEffect(() => {
    const el = brushRef.current
    const onMove = (e) => {
      el.style.transform = `translate3d(${e.clientX - 3}px, ${e.clientY - 3}px, 0)`
      // Sobre campos de texto mostra-se o cursor nativo (I-beam)
      el.classList.toggle('brush-cursor--hidden', !!e.target.closest?.(TEXT_FIELDS))
    }
    const onDown = () => el.classList.add('brush-cursor--pressed')
    const onUp = () => el.classList.remove('brush-cursor--pressed')
    const onLeave = () => el.classList.add('brush-cursor--hidden')

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    document.documentElement.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      document.documentElement.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <>
      <canvas ref={sprayCanvasRef} className="spray-canvas" aria-hidden="true" />
      <div ref={brushRef} className="brush-cursor brush-cursor--hidden" aria-hidden="true">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          {/* Cerdas — 5 fios curvos que se abrem na ponta e convergem na virola */}
          <path d="M6 1 Q8 4 12 12" stroke="#bfaa88" strokeWidth="0.8" strokeLinecap="round"/>
          <path d="M4 2 Q7 5 12 12" stroke="#d6c2a8" strokeWidth="1" strokeLinecap="round"/>
          <path d="M3 3 Q6 6.5 12 12" stroke="#ecdcbc" strokeWidth="1.4" strokeLinecap="round"/>
          <path d="M2 4 Q5 7 12 12" stroke="#d6c2a8" strokeWidth="1" strokeLinecap="round"/>
          <path d="M1 6 Q4 8 12 12" stroke="#bfaa88" strokeWidth="0.8" strokeLinecap="round"/>
          {/* Virola — banda perpendicular ao eixo 45° */}
          <line x1="11" y1="14.5" x2="15.5" y2="10" stroke="#4a3828" strokeWidth="4" strokeLinecap="butt"/>
          <line x1="11" y1="14.5" x2="15.5" y2="10" stroke="#7a5c40" strokeWidth="2" strokeLinecap="butt"/>
          {/* Cabo com leve curva */}
          <path d="M15 15 Q21 21 28 28" stroke="#b8844a" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M15 15 Q21 21 28 28" stroke="#e0b070" strokeWidth="1" strokeLinecap="round"/>
        </svg>
      </div>
    </>
  )
}
