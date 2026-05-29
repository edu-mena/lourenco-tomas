import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useScrollReveal } from '../hooks'
import { GALLERY_ITEMS, GALLERY_FILTERS } from '../data/content'
import { GalleryItem, Lightbox } from '../components/ArtCanvas'

export default function Portfolio() {
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

  return (
    <>
      {/* ── Page Hero ─────────────────────────────── */}
      <div className="page-hero">
        <div className="page-hero__breadcrumb">
          <Link to="/">Início</Link>
          <span> / Portfolio</span>
        </div>
        <h1 className="page-hero__title">PORT<br/>FOLIO</h1>
        <p className="page-hero__sub">
          Aerografia sobre t-shirts, telas, murais e calçado — cada peça é única e irrepetível.
        </p>
        <div className="page-hero__deco" aria-hidden>OBRAS</div>
      </div>

      {/* ── Stats strip ───────────────────────────── */}
      <div className="portfolio-stats">
        <div className="portfolio-stat">
          <span className="portfolio-stat__num">12</span>
          <span className="portfolio-stat__label">Obras em Exposição</span>
        </div>
        <div className="portfolio-stat__divider" />
        <div className="portfolio-stat">
          <span className="portfolio-stat__num">4</span>
          <span className="portfolio-stat__label">Categorias</span>
        </div>
        <div className="portfolio-stat__divider" />
        <div className="portfolio-stat">
          <span className="portfolio-stat__num">10+</span>
          <span className="portfolio-stat__label">Anos de Arte</span>
        </div>
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
              {filtered.length} peça{filtered.length !== 1 ? 's' : ''} · clica para ampliar
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
          <h2 className="page-cta__title">Cria a tua obra exclusiva</h2>
          <p>Cada peça é pensada, sentida e criada de raiz para o cliente.</p>
          <Link to="/encomendas" className="btn-primary">
            Encomendar Agora
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
