import { useEffect, useRef } from 'react'
import { useSprayCanvas } from '../hooks'

export default function Cursor() {
  const brushRef = useRef(null)
  const sprayCanvasRef = useSprayCanvas()

  useEffect(() => {
    const onMove = (e) => {
      if (brushRef.current) {
        brushRef.current.style.left = e.clientX + 'px'
        brushRef.current.style.top = e.clientY + 'px'
      }
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <>
      <canvas
        ref={sprayCanvasRef}
        style={{
          position: 'fixed', inset: 0,
          width: '100%', height: '100%',
          pointerEvents: 'none', zIndex: 9997,
        }}
      />
      <div
        ref={brushRef}
        style={{
          position: 'fixed',
          zIndex: 9999,
          pointerEvents: 'none',
          transform: 'translate(-3px, -3px)',
          left: '-200px',
          top: '-200px',
        }}
      >
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
