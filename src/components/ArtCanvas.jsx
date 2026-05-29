import { useRef, useEffect } from 'react'
import { ART_PALETTE } from '../data/content'

/* ── Canvas art generation ──────────────────────── */
export function paintArt(cv, item) {
  if (!cv) return
  const ctx = cv.getContext('2d')
  const W = (cv.width = cv.offsetWidth || 320)
  const H = (cv.height = item.h)
  ctx.clearRect(0, 0, W, H)

  const palette = ART_PALETTE[item.cat] || ART_PALETTE.tshirts

  for (let i = 0; i < 22; i++) {
    const x = Math.random() * W
    const y = Math.random() * H
    const r = Math.random() * 130 + 40
    const c = palette[Math.floor(Math.random() * palette.length)]
    const grd = ctx.createRadialGradient(x, y, 0, x, y, r)
    grd.addColorStop(0, c + (Math.random() * 0.18 + 0.05) + ')')
    grd.addColorStop(1, 'transparent')
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fillStyle = grd; ctx.fill()
  }

  const id = ctx.getImageData(0, 0, W, H)
  const dt = id.data
  for (let i = 0; i < dt.length; i += 4) {
    const n = (Math.random() - 0.5) * 18
    dt[i] += n; dt[i + 1] += n; dt[i + 2] += n
  }
  ctx.putImageData(id, 0, 0)

  ctx.font = `bold ${Math.min(W, H) * 0.13}px 'Bebas Neue', sans-serif`
  ctx.fillStyle = 'rgba(214,194,168,0.055)'
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.fillText('L.T', W / 2, H / 2)
}

/* ── Gallery Item ───────────────────────────────── */
export function GalleryItem({ item, onOpen }) {
  const cvRef = useRef(null)

  useEffect(() => {
    const cv = cvRef.current
    if (!cv) return
    const ro = new ResizeObserver(() => paintArt(cv, item))
    ro.observe(cv)
    paintArt(cv, item)
    return () => ro.disconnect()
  }, [item])

  return (
    <div className="gallery__item" onClick={() => onOpen(item)}>
      <div className="gallery__item-inner">
        <div
          className="gallery__art"
          style={{ height: item.h, background: item.grad, position: 'relative', overflow: 'hidden' }}
        >
          <canvas
            ref={cvRef}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
          />
        </div>
        <div className="gallery__overlay">
          <div className="gallery__info">
            <h4>{item.title}</h4>
            <span>{item.sub}</span>
          </div>
        </div>
        <div className="gallery__zoom">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M10 10l4 4M2 7a5 5 0 1010 0A5 5 0 002 7zM7 4v6M4 7h6"/>
          </svg>
        </div>
      </div>
    </div>
  )
}

/* ── Lightbox ───────────────────────────────────── */
export function Lightbox({ item, onClose }) {
  const open = !!item

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const cvRef = useRef(null)
  useEffect(() => {
    if (item && cvRef.current) {
      cvRef.current.width = 900
      cvRef.current.height = 680
      paintArt(cvRef.current, { ...item, h: 680 })
    }
  }, [item])

  return (
    <div
      className={`lightbox${open ? ' open' : ''}`}
      onClick={e => e.target === e.currentTarget && onClose()}
      role="dialog" aria-modal="true"
    >
      <div className="lightbox__inner">
        <button className="lightbox__close" onClick={onClose} aria-label="Fechar">✕</button>
        <div style={{ background: item?.grad || '#111', maxWidth: '90vw', maxHeight: '82vh' }}>
          <canvas
            ref={cvRef}
            style={{ display: 'block', maxWidth: '90vw', maxHeight: '82vh', width: '100%' }}
          />
        </div>
        {item && (
          <div className="lightbox__caption">{item.title} — {item.sub}</div>
        )}
      </div>
    </div>
  )
}
