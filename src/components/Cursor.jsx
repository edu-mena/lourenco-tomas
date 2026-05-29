import { useEffect, useRef } from 'react'
import { useSprayCanvas } from '../hooks'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const sprayCanvasRef = useSprayCanvas()
  const pos = useRef({ x: -200, y: -200 })
  const ring = useRef({ x: -200, y: -200 })
  const raf = useRef(null)

  useEffect(() => {
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px'
        dotRef.current.style.top = e.clientY + 'px'
      }
    }

    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.11
      ring.current.y += (pos.current.y - ring.current.y) * 0.11
      if (ringRef.current) {
        ringRef.current.style.left = ring.current.x + 'px'
        ringRef.current.style.top = ring.current.y + 'px'
      }
      raf.current = requestAnimationFrame(animate)
    }

    const onEnter = () => document.body.classList.add('cursor--hover')
    const onLeave = () => document.body.classList.remove('cursor--hover')

    const bindHover = () => {
      document.querySelectorAll('a, button, .gallery__item, .video-card, .pillar, .testimonial').forEach(el => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    raf.current = requestAnimationFrame(animate)
    // Bind after slight delay to ensure DOM is ready
    const t = setTimeout(bindHover, 300)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf.current)
      clearTimeout(t)
    }
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
      <div ref={ringRef} className="cursor__ring" />
      <div ref={dotRef} className="cursor" style={{ position: 'fixed', zIndex: 9999, pointerEvents: 'none', transform: 'translate(-50%,-50%)' }}>
        <div className="cursor__dot" />
      </div>
    </>
  )
}
