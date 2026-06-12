import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useScrollReveal } from '../hooks'
import { GALLERY_ITEMS, GALLERY_FILTERS } from '../data/content'
import { WORKS_PAGE } from '../data/ui'
import { GalleryItem, Lightbox } from '../components/ArtCanvas'

export default function Obras() {
  const location = useLocation()
  const params   = new URLSearchParams(location.search)
  const initial  = params.get('filter') ?? 'all'
  const [filter, setFilter] = useState(initial)
  const [lightboxItem, setLightboxItem] = useState(null)
  const [headerRef, headerVisible] = useScrollReveal()
  const [ctaRef, ctaVisible] = useScrollReveal()

  const filtered = filter === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(i => i.cat === filter)

  const countSuffix = filtered.length !== 1 ? WORKS_PAGE.countLabelPlural : WORKS_PAGE.countLabel

  return (
    <>
      {/* ── Page Hero ─────────────────────────────── */}
      <div className="page-hero">
        <div className="page-hero__breadcrumb">
          <Link to="/">Início</Link>
          <span> / {WORKS_PAGE.hero.breadcrumb}</span>
        </div>
        <h1 className="page-hero__title">{WORKS_PAGE.hero.title}</h1>
        <p className="page-hero__sub">{WORKS_PAGE.hero.subtitle}</p>
        <div className="page-hero__deco" aria-hidden>{WORKS_PAGE.hero.deco}</div>
      </div>

      {/* ── Stats strip ───────────────────────────── */}
      <div className="portfolio-stats">
        {WORKS_PAGE.stats.map((s, i) => (
          <div key={s.label} style={{ display: 'contents' }}>
            {i > 0 && <div className="portfolio-stat__divider" />}
            <div className="portfolio-stat">
              <span className="portfolio-stat__num">{s.num}</span>
              <span className="portfolio-stat__label">{s.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ── Gallery ───────────────────────────────── */}
      <section className="gallery-section" aria-label="Portfolio completo">
        <div
          ref={headerRef}
          className={`gallery-section__header reveal${headerVisible ? ' visible' : ''}`}
        >
          <div className="gallery-section__meta">
            <div className="section-label">Galeria</div>
            <h2 className="section-title-display">OBRAS</h2>
            <p className="gallery-section__sub">
              {filtered.length} {countSuffix} · clica para ampliar
            </p>
          </div>
        </div>

        <div
          className={`gallery__filters reveal${headerVisible ? ' visible' : ''}`}
          style={{ transitionDelay: '0.15s' }}
        >
          {GALLERY_FILTERS.map(f => (
            <button
              key={f.key}
              className={`gallery__filter-btn${filter === f.key ? ' active' : ''}`}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="gallery__grid">
          {filtered.map((item, i) => (
            <div
              key={item.id}
              style={{
                opacity: 0,
                animation: `fadeUp 0.6s var(--ease-out) ${i * 0.06}s forwards`,
              }}
            >
              <GalleryItem item={item} onOpen={setLightboxItem} />
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────── */}
      <section className="page-cta" ref={ctaRef}>
        <div className={`page-cta__inner reveal${ctaVisible ? ' visible' : ''}`}>
          <div className="section-label">Encomendas</div>
          <h2 className="page-cta__title">{WORKS_PAGE.cta.label}</h2>
          <p>{WORKS_PAGE.cta.description}</p>
          <Link to="/encomendas" className="btn-primary">
            {WORKS_PAGE.cta.button}
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" width="16" height="16">
              <path d="M3 8h10M9 4l4 4-4 4"/>
            </svg>
          </Link>
        </div>
      </section>

      <Lightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />
    </>
  )
}
