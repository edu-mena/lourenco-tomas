import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useScrollReveal } from '../hooks'
import { GALLERY_ITEMS, GALLERY_FILTERS } from '../data/content'
import { GalleryItem, Lightbox } from './ArtCanvas'

/* ── Gallery Section ───────────────────────────── */
export default function Gallery() {
  const [filter, setFilter] = useState('all')
  const [lightboxItem, setLightboxItem] = useState(null)
  const [headerRef, headerVisible] = useScrollReveal()

  const filtered = filter === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(i => i.cat === filter)

  return (
    <>
      <section id="gallery" className="gallery-section" aria-label="Galeria de Obras">
        <div
          ref={headerRef}
          className={`gallery-section__header reveal${headerVisible ? ' visible' : ''}`}
        >
          <div className="gallery-section__meta">
            <div className="section-label">Galeria</div>
            <h2 className="section-title-display">OBRAS</h2>
            <p className="gallery-section__sub">Uma selecção das peças mais icónicas</p>
          </div>
          <Link to="/homenagens" className="gallery-hom-link">
            <span>Homenagens a Celebridades</span>
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
          </Link>
        </div>

        <div className={`gallery__filters reveal${headerVisible ? ' visible' : ''}`}
          style={{ transitionDelay: '0.15s' }}>
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

      <Lightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />
    </>
  )
}
