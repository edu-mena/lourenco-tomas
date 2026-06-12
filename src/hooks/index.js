import { useEffect, useRef, useState, useCallback } from 'react'

/* ── Scroll Reveal ──────────────────────────────── */
export function useScrollReveal(options = {}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          obs.unobserve(el)
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px', ...options }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return [ref, visible]
}

/* ── Mouse Position ─────────────────────────────── */
export function useMousePosition() {
  const pos = useRef({ x: -200, y: -200 })
  const ring = useRef({ x: -200, y: -200 })
  const raf = useRef(null)

  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px'
        dotRef.current.style.top = e.clientY + 'px'
      }
    }

    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12
      ring.current.y += (pos.current.y - ring.current.y) * 0.12
      if (ringRef.current) {
        ringRef.current.style.left = ring.current.x + 'px'
        ringRef.current.style.top = ring.current.y + 'px'
      }
      raf.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    raf.current = requestAnimationFrame(animate)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  const addHoverListeners = useCallback((el) => {
    if (!el) return
    const enter = () => document.body.classList.add('cursor--hover')
    const leave = () => document.body.classList.remove('cursor--hover')
    el.addEventListener('mouseenter', enter)
    el.addEventListener('mouseleave', leave)
    return () => {
      el.removeEventListener('mouseenter', enter)
      el.removeEventListener('mouseleave', leave)
    }
  }, [])

  return { dotRef, ringRef, addHoverListeners }
}

/* ── Canvas Spray Particles ─────────────────────── */
export function useSprayCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const cv = canvasRef.current
    if (!cv) return
    const ctx = cv.getContext('2d')
    let W = window.innerWidth
    let H = window.innerHeight
    cv.width = W; cv.height = H

    const onResize = () => {
      W = window.innerWidth; H = window.innerHeight
      cv.width = W; cv.height = H
    }
    window.addEventListener('resize', onResize, { passive: true })

    const particles = []
    const COLORS = [
      'rgba(214,194,168,', 'rgba(255,255,255,', 'rgba(184,149,106,',
    ]

    const onMove = (e) => {
      if (Math.random() > 0.55) return
      const c = COLORS[Math.floor(Math.random() * COLORS.length)]
      for (let i = 0; i < 3; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = Math.random() * 1.5 + 0.2
        particles.push({
          x: e.clientX, y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.4,
          r: Math.random() * 2.4 + 0.4,
          a: Math.random() * 0.35 + 0.08,
          color: c,
          life: 1,
          decay: 0.022 + Math.random() * 0.03,
        })
      }
      if (particles.length > 220) particles.splice(0, 25)
    }
    window.addEventListener('mousemove', onMove, { passive: true })

    let raf
    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.x += p.vx; p.y += p.vy; p.vy += 0.05
        p.life -= p.decay
        if (p.life <= 0) { particles.splice(i, 1); continue }
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.color + (p.a * p.life) + ')'
        ctx.fill()
      }
      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return canvasRef
}
