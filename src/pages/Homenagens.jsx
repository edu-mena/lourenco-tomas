import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useScrollReveal } from '../hooks'
import TributeStories from '../components/TributeStories'
import TRIBUTES from '../data/tributes'

// ─── Icons ──────────────────────────────────────────────────────

function IgIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 18, height: 18 }}>
      <rect x="2" y="2" width="20" height="20" rx="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/>
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="16" height="16">
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12 5 19 12 12 19"/>
    </svg>
  )
}

// ─── Story Modal ─────────────────────────────────────────────────

function StoryModal({ tributes, activeIdx, onIdxChange, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div className="story-modal" onClick={onClose}>
      <button className="story-modal__close" onClick={onClose} aria-label="Fechar">
        <CloseIcon />
      </button>
      <div className="story-modal__inner" onClick={e => e.stopPropagation()}>
        <TributeStories
          tributes={tributes}
          activeIdx={activeIdx}
          onIdxChange={onIdxChange}
        />
      </div>
    </div>
  )
}

// ─── Main Page ───────────────────────────────────────────────────

export default function Homenagens() {
  const [gridRef, gridVisible] = useScrollReveal()
  const [ctaRef,  ctaVisible]  = useScrollReveal()
  const [storyOpen, setStoryOpen] = useState(false)
  const [storyIdx,  setStoryIdx]  = useState(0)

  const openStory = (i) => { setStoryIdx(i); setStoryOpen(true) }

  const featured = TRIBUTES.filter(t => t.featured)

  return (
    <>
      {/* Story Modal */}
      {storyOpen && (
        <StoryModal
          tributes={TRIBUTES}
          activeIdx={storyIdx}
          onIdxChange={setStoryIdx}
          onClose={() => setStoryOpen(false)}
        />
      )}

      {/* Page Hero */}
      <div className="page-hero">
        <p className="page-hero__breadcrumb">
          <Link to="/">Início</Link> / Homenagens
        </p>
        <h1 className="page-hero__title">Home<br/>nagens</h1>
        <p className="page-hero__sub">
          Arte como forma de reconhecimento — retratos e obras dedicadas a celebridades angolanas, do esboço à entrega em mãos.
        </p>
        <div className="page-hero__deco">HON</div>
      </div>

      {/* Destaques — circular avatars */}
      <section className="hom-featured-section">
        <div className="hom-featured-header">
          <div className="section-label">Destaques</div>
        </div>
        <div className="hom-featured-grid">
          {featured.map((t, i) => (
            <button
              key={t.id}
              className="hom-avatar-card"
              style={{ '--i': i }}
              onClick={() => openStory(TRIBUTES.indexOf(t))}
              aria-label={`Ver story de ${t.celebrity.name}`}
            >
              <div className="hom-avatar-card__ring">
                <div className="hom-avatar-card__img-wrap">
                  {/* Usa avatar se existir, caso contrário cover */}
                  <img src={t.avatar ?? t.cover} alt={t.celebrity.name} loading="lazy" />
                </div>
              </div>
              <span className="hom-avatar-card__cat">{t.work.category}</span>
              <span className="hom-avatar-card__name">{t.celebrity.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Full Grid */}
      <section className="hom-grid-section">
        <div className="hom-grid-header">
          <div className="section-label">Todas as Homenagens</div>
          <p className="hom-grid-sub">
            Clique no ícone de story para ver o processo em formato Stories, ou na obra para ver o detalhe completo.
          </p>
        </div>

        <div
          ref={gridRef}
          className={`hom-grid hom-grid--new${gridVisible ? ' hom-grid--visible' : ''}`}
        >
          {TRIBUTES.map((t, i) => (
            <div key={t.id} className="hom-card" style={{ '--i': i }}>
              {/* Thumbnail */}
              <div className="hom-card__thumb-wrap">
                <img src={t.cover} alt={t.celebrity.name} loading="lazy" className="hom-card__thumb" />
                <button
                  className="hom-card__story-btn"
                  onClick={() => openStory(i)}
                  aria-label={`Ver story de ${t.celebrity.name}`}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="16" height="16">
                    <circle cx="12" cy="12" r="10"/>
                    <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none"/>
                  </svg>
                  Story
                </button>
              </div>

              {/* Body */}
              <div className="hom-card__body">
                <span className="hom-card__cat">{t.work.category}</span>
                <h3 className="hom-card__name">{t.celebrity.name}</h3>
                <p className="hom-card__role">{t.celebrity.role}</p>
                <p className="hom-card__work">{t.work.title}</p>
                <Link to={`/homenagens/${t.slug}`} className="hom-card__link">
                  Ver detalhe <ArrowIcon />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Instagram CTA */}
      <section
        ref={ctaRef}
        className={`hom-cta reveal${ctaVisible ? ' visible' : ''}`}
      >
        <div className="hom-cta__inner">
          <div className="section-label">Acompanhe</div>
          <h2 className="hom-cta__title">Todo o processo<br /><span>no Instagram</span></h2>
          <p className="hom-cta__desc">
            Os bastidores, o processo criativo e os momentos de entrega são partilhados em tempo real. Siga para não perder nenhuma homenagem.
          </p>
          <a
            href="https://instagram.com/lourenco.tomas.art"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <IgIcon />
            @lourenco.tomas.art
          </a>
        </div>
      </section>
    </>
  )
}