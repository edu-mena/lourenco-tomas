import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useScrollReveal } from '../hooks'
import { GALLERY_SECTION } from '../data/ui'
import { useGallery } from '../hooks/useApi'
import GalleryBrowser from './GalleryBrowser'
import { IconArrow } from './icons'

const HOME_LIMIT = 6

/* Selecção curta na Home — a galeria completa vive em /obras */
export default function Gallery() {
  const [filter, setFilter] = useState('all')
  const [headerRef, headerVisible] = useScrollReveal()
  const { items, loading, error, reload } = useGallery()

  const total = filter === 'all' ? items.length : items.filter(i => i.cat === filter).length
  const moreHref = filter === 'all' ? '/obras' : `/obras?filter=${filter}`

  return (
    <section id="gallery" className="gallery-section" aria-labelledby="gallery-title">
      <div ref={headerRef} className={`gallery-section__header reveal${headerVisible ? ' visible' : ''}`}>
        <div>
          <h2 id="gallery-title" className="section-title-display">{GALLERY_SECTION.title}</h2>
          <p className="gallery-section__sub">{GALLERY_SECTION.sub}</p>
        </div>
        <Link to={GALLERY_SECTION.homLink.to} className="link-arrow">
          {GALLERY_SECTION.homLink.label} <IconArrow size={14} />
        </Link>
      </div>

      <GalleryBrowser
        items={items}
        loading={loading}
        error={error}
        onRetry={reload}
        filter={filter}
        onFilterChange={setFilter}
        limit={HOME_LIMIT}
      />

      {!loading && total > HOME_LIMIT && (
        <div className="gallery-section__more">
          <Link to={moreHref} className="btn-outline">
            Ver todas as {total} obras <IconArrow size={14} />
          </Link>
        </div>
      )}
    </section>
  )
}
