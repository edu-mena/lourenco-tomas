import { useEffect, useRef, useState } from 'react'

/* ── Scroll Reveal ──────────────────────────────
 * O elemento fica em estado (ref = setEl): funciona quando só aparece
 * depois de carregar dados e sobrevive ao duplo-mount do StrictMode.
 */
export function useScrollReveal(options = {}) {
  const [el, setEl] = useState(null)
  const [visible, setVisible] = useState(false)
  const optsRef = useRef(options)

  useEffect(() => {
    if (!el || visible) return
    if (typeof IntersectionObserver === 'undefined') { setVisible(true); return }
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px', ...optsRef.current }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [el, visible])

  return [setEl, visible]
}

/* ── Media query ────────────────────────────────── */
export function useMediaQuery(query) {
  const get = () => typeof window !== 'undefined' && window.matchMedia(query).matches
  const [matches, setMatches] = useState(get)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const on = () => setMatches(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [query])
  return matches
}

export const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* ── Spray (assinatura da marca) ────────────────────
 * Partículas só dentro de zonas [data-spray] (o hero) e numa rajada
 * quando se clica num CTA. O loop de animação só corre enquanto há partículas.
 */
export function useSprayCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const cv = canvasRef.current
    if (!cv || prefersReducedMotion()) return
    const ctx = cv.getContext('2d')
    let W, H
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      W = window.innerWidth; H = window.innerHeight
      cv.width = W * dpr; cv.height = H * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    const particles = []
    const COLORS = ['rgba(214,194,168,', 'rgba(255,255,255,', 'rgba(184,149,106,']
    let raf = null

    const emit = (x, y, count, force) => {
      const c = COLORS[Math.floor(Math.random() * COLORS.length)]
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = (Math.random() * 1.5 + 0.2) * force
        particles.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.4,
          r: Math.random() * 2.4 + 0.4,
          a: Math.random() * 0.35 + 0.08,
          color: c, life: 1,
          decay: 0.022 + Math.random() * 0.03,
        })
      }
      if (particles.length > 260) particles.splice(0, particles.length - 260)
      if (!raf) raf = requestAnimationFrame(draw)
    }

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
      raf = particles.length ? requestAnimationFrame(draw) : null
    }

    const onMove = (e) => {
      if (Math.random() > 0.55 || !e.target.closest?.('[data-spray]')) return
      emit(e.clientX, e.clientY, 3, 1)
    }
    const onClick = (e) => {
      if (e.target.closest?.('.btn-primary, .form-submit, .nav__cta')) emit(e.clientX, e.clientY, 36, 2.2)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('click', onClick)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('click', onClick)
      cancelAnimationFrame(raf)
    }
  }, [])

  return canvasRef
}
