import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useScrollReveal } from '../hooks'
import { useModal } from '../hooks/useModal'
import TributeStories from '../components/TributeStories'
import { useTributes } from '../hooks/useApi'
import { TRIBUTES_PAGE } from '../data/ui'
import { PageHero, SkeletonGrid, ErrorState } from '../components/ui'
import { IconArrow, IconClose, IconInstagram, IconPlay } from '../components/icons'

// ─── Story Modal ─────────────────────────────────────────────────

function StoryModal({ storiesData, activeIdx, onIdxChange, onClose }) {
  const ref = useModal(true, onClose)

  return (
    <div ref={ref} className="story-modal" onClick={onClose} role="dialog" aria-modal="true" aria-label="Stories">
      <button className="story-modal__close" onClick={onClose} aria-label="Fechar">
        <IconClose />
      </button>
      <div className="story-modal__inner" onClick={e => e.stopPropagation()}>
        <TributeStories
          tributes={storiesData}
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

  const { tributes, loading, error, reload } = useTributes()

  const featured = tributes.filter(t => t.featured)

  // Flat shape expected by TributeStories
  const storiesData = tributes.map(t => ({
    id: t.id,
    img: t.cover,
    video: null,
    celebrity: t.celebrity.name,
    category: t.work.category,
    role: t.celebrity.role,
    title: t.work.title,
    desc: t.work.shortDesc,
    instagram: t.instagram,
  }))

  const openStory = (i) => { setStoryIdx(i); setStoryOpen(true) }

  return (
    <>
      {/* Story Modal */}
      {storyOpen && (
        <StoryModal
          storiesData={storiesData}
          activeIdx={storyIdx}
          onIdxChange={setStoryIdx}
          onClose={() => setStoryOpen(false)}
        />
      )}

      <PageHero {...TRIBUTES_PAGE.hero} />

      {loading ? (
        <section className="hom-grid-section"><SkeletonGrid count={6} variant="cards" /></section>
      ) : error ? (
        <ErrorState message="Não foi possível carregar as homenagens." onRetry={reload} />
      ) : (
        <>
          {/* Destaques — avatares circulares abrem os stories */}
          {featured.length > 0 && <section className="hom-featured-section">
            <div className="hom-featured-header">
              <div className="section-label">{TRIBUTES_PAGE.featuredLabel}</div>
            </div>
            <div className="hom-featured-grid">
              {featured.map((t, i) => (
                <button
                  key={t.id}
                  className="hom-avatar-card"
                  style={{ '--i': i }}
                  onClick={() => openStory(tributes.indexOf(t))}
                  aria-label={`Ver story de ${t.celebrity.name}`}
                >
                  <div className="hom-avatar-card__ring">
                    <div className="hom-avatar-card__img-wrap">
                      <img src={t.avatar ?? t.cover} alt={t.celebrity.name} loading="lazy" />
                    </div>
                  </div>
                  <span className="hom-avatar-card__cat">{t.work.category}</span>
                  <span className="hom-avatar-card__name">{t.celebrity.name}</span>
                </button>
              ))}
            </div>
          </section>}

          {/* Full Grid */}
          <section className="hom-grid-section">
            <div className="hom-grid-header">
              <div className="section-label">{TRIBUTES_PAGE.allLabel}</div>
            </div>

            <div
              ref={gridRef}
              className={`hom-grid hom-grid--new${gridVisible ? ' hom-grid--visible' : ''}`}
            >
              {tributes.map((t, i) => (
                <div key={t.id} className="hom-card" style={{ '--i': i }}>
                  {/* Thumbnail */}
                  <div className="hom-card__thumb-wrap">
                    <Link to={`/homenagens/${t.slug}`} tabIndex={-1} aria-hidden="true">
                      <img src={t.cover} alt="" loading="lazy" className="hom-card__thumb" />
                    </Link>
                    <button
                      className="hom-card__story-btn"
                      onClick={() => openStory(i)}
                      aria-label={`Ver story de ${t.celebrity.name}`}
                    >
                      <IconPlay size={14} />
                      {TRIBUTES_PAGE.storyLabel}
                    </button>
                  </div>

                  {/* Body */}
                  <div className="hom-card__body">
                    <span className="hom-card__cat">{t.work.category}</span>
                    <h3 className="hom-card__name">{t.celebrity.name}</h3>
                    <p className="hom-card__role">{t.celebrity.role}</p>
                    <p className="hom-card__work">{t.work.title}</p>
                    <Link to={`/homenagens/${t.slug}`} className="hom-card__link">
                      {TRIBUTES_PAGE.detailLabel} <IconArrow size={14} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* Instagram CTA */}
      <section
        ref={ctaRef}
        className={`hom-cta reveal${ctaVisible ? ' visible' : ''}`}
      >
        <div className="hom-cta__inner">
          <div className="section-label">{TRIBUTES_PAGE.cta.label}</div>
          <h2 className="hom-cta__title">{TRIBUTES_PAGE.cta.title}<br /><span>{TRIBUTES_PAGE.cta.titleAccent}</span></h2>
          <p className="hom-cta__desc">{TRIBUTES_PAGE.cta.description}</p>
          <a href={TRIBUTES_PAGE.instagramUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
            <IconInstagram size={18} /> {TRIBUTES_PAGE.cta.button}
          </a>
        </div>
      </section>
    </>
  )
}
