import { useState, useEffect, useRef, useCallback } from 'react'

const DURATION = 6000

function IgIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="2" width="20" height="20" rx="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/>
    </svg>
  )
}
function ChevL() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
}
function ChevR() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
}

export default function TributeStories({ tributes, activeIdx: externalIdx, onIdxChange }) {
  const [idx, setIdx] = useState(externalIdx ?? 0)
  const [animKey, setAnimKey] = useState(0)
  const [paused, setPaused] = useState(false)
  const [descOpen, setDescOpen] = useState(false)
  const timeoutRef = useRef(null)

  useEffect(() => {
    if (externalIdx !== undefined && externalIdx !== idx) {
      setIdx(externalIdx)
      setAnimKey(k => k + 1)
      setDescOpen(false)
    }
  }, [externalIdx])

  const goTo = useCallback((i) => {
    setIdx(i)
    setAnimKey(k => k + 1)
    setDescOpen(false)
    onIdxChange?.(i)
  }, [onIdxChange])

  const prev = useCallback(() => goTo((idx - 1 + tributes.length) % tributes.length), [idx, tributes.length, goTo])
  const next = useCallback(() => goTo((idx + 1) % tributes.length), [idx, tributes.length, goTo])

  useEffect(() => {
    if (paused) return
    timeoutRef.current = setTimeout(next, DURATION)
    return () => clearTimeout(timeoutRef.current)
  }, [idx, paused, next])

  const touchX = useRef(null)
  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX; setPaused(true) }
  const onTouchEnd = (e) => {
    if (touchX.current === null) return
    const dx = e.changedTouches[0].clientX - touchX.current
    if (dx < -40) next()
    else if (dx > 40) prev()
    touchX.current = null
    setPaused(false)
  }

  const t = tributes[idx]

  return (
    <div
      className="stories"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="stories__wrapper">

        <button className="stories__arrow stories__arrow--l" onClick={prev} aria-label="Anterior"><ChevL /></button>

        {/* Card column */}
        <div className="stories__card-col">
          {/* Progress bars */}
          <div className="stories__bars">
            {tributes.map((_, i) => (
              <div key={i} className="stories__bar">
                <div
                  key={i === idx ? `a-${animKey}` : i}
                  className={`stories__bar-fill${i < idx ? ' done' : i === idx ? ' active' : ''}`}
                  style={i === idx ? {
                    animationDuration: `${DURATION}ms`,
                    animationPlayState: paused ? 'paused' : 'running'
                  } : {}}
                />
              </div>
            ))}
          </div>

          {/* Story card */}
          <div className="stories__card">
            {tributes.map((item, i) => (
              <div key={item.id} className={`stories__media${i === idx ? ' stories__media--on' : ''}`}>
                {item.video
                  ? <video src={item.video} autoPlay muted loop playsInline />
                  : <img src={item.img} alt={item.celebrity} loading="lazy" />
                }
              </div>
            ))}

            <div className="stories__grad" />

            {/* Mobile overlay — name + title only (no description) */}
            <div className="stories__mob-overlay">
              <div className="stories__mob-top">
                <span className="stories__tag">{t.category}</span>
              </div>
              <div className="stories__mob-bottom">
                <p className="stories__role">{t.role}</p>
                <h3 className="stories__name">{t.celebrity}</h3>
                <p className="stories__piece">{t.title}</p>
              </div>
            </div>

            <button className="stories__zone stories__zone--l" onClick={prev} aria-label="Anterior" />
            <button className="stories__zone stories__zone--r" onClick={next} aria-label="Próximo" />
          </div>

          {/* Mobile: description outside card with expand/collapse */}
          <div className="stories__mob-desc">
            <div className={`stories__mob-desc-body${descOpen ? ' stories__mob-desc-body--open' : ''}`}>
              <p className="stories__desc">{t.desc}</p>
            </div>
            <button
              className="stories__expand-btn"
              onClick={e => { e.stopPropagation(); setDescOpen(v => !v) }}
            >
              {descOpen ? 'Ler menos ↑' : 'Ler mais ↓'}
            </button>
            <a
              href={t.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="stories__ig"
              onClick={e => e.stopPropagation()}
            >
              <IgIcon /> Ver no Instagram
            </a>
          </div>

          {/* Mobile dots */}
          <div className="stories__dots stories__dots--mob">
            {tributes.map((_, i) => (
              <button key={i} className={`stories__dot${i === idx ? ' stories__dot--on' : ''}`} onClick={() => goTo(i)} aria-label={`Story ${i + 1}`} />
            ))}
          </div>
        </div>

        {/* Desktop panel */}
        <div className="stories__panel">
          <span className="stories__counter">
            {String(idx + 1).padStart(2, '0')} / {String(tributes.length).padStart(2, '0')}
          </span>
          <span className="stories__tag">{t.category}</span>
          <p className="stories__role">{t.role}</p>
          <h3 className="stories__name">{t.celebrity}</h3>
          <p className="stories__piece">{t.title}</p>
          <p className="stories__desc">{t.desc}</p>
          <a
            href={t.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="stories__ig"
            onClick={e => e.stopPropagation()}
          >
            <IgIcon /> Ver no Instagram
          </a>
          <div className="stories__dots stories__dots--desk">
            {tributes.map((_, i) => (
              <button key={i} className={`stories__dot${i === idx ? ' stories__dot--on' : ''}`} onClick={() => goTo(i)} aria-label={`Story ${i + 1}`} />
            ))}
          </div>
        </div>

        <button className="stories__arrow stories__arrow--r" onClick={next} aria-label="Próximo"><ChevR /></button>
      </div>
    </div>
  )
}
