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
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <line x1="3" y1="3" x2="10" y2="10" stroke="#d6c2a8" strokeWidth="4" strokeLinecap="round"/>
          <line x1="10" y1="10" x2="14" y2="14" stroke="#7a6050" strokeWidth="5.5" strokeLinecap="butt"/>
          <line x1="14" y1="14" x2="25" y2="25" stroke="#c09060" strokeWidth="3" strokeLinecap="round"/>
        </svg>
      </div>
    </>
  )
}
