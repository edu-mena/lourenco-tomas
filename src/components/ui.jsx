import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { prefersReducedMotion, usePageTitle } from '../hooks'
import { IconCopy, IconCheck, IconWhatsApp, IconEmail } from './icons'

/* ── Page Hero ──────────────────────────────────── */
export function PageHero({ breadcrumb, title, subtitle }) {
  usePageTitle(breadcrumb)
  return (
    <header className="page-hero">
      <nav className="page-hero__breadcrumb" aria-label="Localização">
        <Link to="/">Início</Link>
        <span aria-hidden="true"> / </span>
        <span aria-current="page">{breadcrumb}</span>
      </nav>
      <h1 className="page-hero__title">{title}</h1>
      {subtitle && <p className="page-hero__sub">{subtitle}</p>}
    </header>
  )
}

/* ── Form field ─────────────────────────────────── */
export function Field({ label, htmlFor, error, optional, hint, children, className = '' }) {
  return (
    <div className={`form-group${error ? ' form-group--error' : ''} ${className}`}>
      <label className="form-label" htmlFor={htmlFor}>
        {label}
        {optional && <span className="form-label__opt"> · opcional</span>}
      </label>
      {children}
      {error
        ? <p id={`${htmlFor}-error`} className="form-error" role="alert">{error}</p>
        : hint && <p className="form-hint">{hint}</p>}
    </div>
  )
}

/* ── Painel de confirmação após envio ───────────── */
export function SentPanel({ title, body, waHref, mailHref, onReset, resetLabel = 'Escrever outra mensagem' }) {
  const ref = useRef(null)
  useEffect(() => { ref.current?.focus() }, [])
  return (
    <div ref={ref} className="sent-panel" tabIndex={-1} role="status">
      <div className="sent-panel__check" aria-hidden="true"><IconCheck size={22} /></div>
      <h3 className="sent-panel__title">{title}</h3>
      <p className="sent-panel__body">{body}</p>
      <div className="sent-panel__actions">
        <a className="btn-wa" href={waHref} target="_blank" rel="noopener noreferrer">
          <IconWhatsApp size={16} /> Abrir o WhatsApp
        </a>
        {mailHref && (
          <a className="btn-text" href={mailHref}><IconEmail size={16} /> Enviar por email</a>
        )}
        <button type="button" className="btn-text" onClick={onReset}>{resetLabel}</button>
      </div>
    </div>
  )
}

/* ── Estados de carregamento / erro ─────────────── */
export function SkeletonGrid({ count = 6, variant = 'masonry' }) {
  const heights = [340, 460, 380, 290, 420, 310, 400, 360]
  return (
    <div className={`skeleton-grid skeleton-grid--${variant}`} aria-busy="true" aria-label="A carregar">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="skeleton" style={variant === 'masonry' ? { height: heights[i % heights.length] } : undefined} />
      ))}
    </div>
  )
}

export function ErrorState({ message = 'Não foi possível carregar este conteúdo.', onRetry }) {
  return (
    <div className="state-msg" role="alert">
      <p>{message}</p>
      {onRetry && <button type="button" className="btn-text" onClick={onRetry}>Tentar novamente</button>}
    </div>
  )
}

/* ── Copiar para a área de transferência ────────── */
export function CopyButton({ value, label }) {
  const [copied, setCopied] = useState(false)
  const timer = useRef(null)
  useEffect(() => () => clearTimeout(timer.current), [])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      clearTimeout(timer.current)
      timer.current = setTimeout(() => setCopied(false), 1800)
    } catch { /* clipboard indisponível — o link continua a funcionar */ }
  }

  return (
    <button type="button" className={`copy-btn${copied ? ' copy-btn--done' : ''}`} onClick={copy}
      aria-label={copied ? 'Copiado' : `Copiar ${label}`}>
      {copied ? <IconCheck /> : <IconCopy />}
      <span className="copy-btn__label" aria-live="polite">{copied ? 'Copiado' : 'Copiar'}</span>
    </button>
  )
}

/* ── Número que conta até ao valor quando fica visível ── */
export function CountUp({ value, start }) {
  const match = /^(\d+)(.*)$/.exec(String(value))
  const target = match ? Number(match[1]) : null
  const [n, setN] = useState(target === null ? null : 0)

  useEffect(() => {
    if (!start || target === null) return
    if (prefersReducedMotion()) { setN(target); return }
    let raf
    const t0 = performance.now()
    const dur = 1400
    const tick = now => {
      const p = Math.min((now - t0) / dur, 1)
      setN(Math.round(target * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [start, target])

  if (target === null) return value
  return <>{n}{match[2]}</>
}
