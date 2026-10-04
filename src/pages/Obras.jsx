import { Link, useSearchParams } from 'react-router-dom'
import { useScrollReveal } from '../hooks'
import { WORKS_PAGE } from '../data/ui'
import { useGallery } from '../hooks/useApi'
import GalleryBrowser from '../components/GalleryBrowser'
import { PageHero } from '../components/ui'
import { IconArrow } from '../components/icons'

export default function Obras() {
  // O filtro vive no URL: partilhável e respeitado pelo botão "voltar"
  const [params, setParams] = useSearchParams()
  const filter = params.get('filter') ?? 'all'
  const setFilter = key => setParams(key === 'all' ? {} : { filter: key }, { replace: true, preventScrollReset: true })

  const [ctaRef, ctaVisible] = useScrollReveal()
  const { items, loading, error, reload } = useGallery()

  const count = filter === 'all' ? items.length : items.filter(i => i.cat === filter).length
  const countSuffix = count !== 1 ? WORKS_PAGE.countLabelPlural : WORKS_PAGE.countLabel

  return (
    <>
      <PageHero {...WORKS_PAGE.hero} />

      <section className="gallery-section" aria-label="Portfolio completo">
        {!loading && !error && (
          <p className="gallery-section__count" aria-live="polite">
            <strong>{count}</strong> {countSuffix}
          </p>
        )}
        <GalleryBrowser
          items={items}
          loading={loading}
          error={error}
          onRetry={reload}
          filter={filter}
          onFilterChange={setFilter}
        />
      </section>

      <section className="page-cta" ref={ctaRef}>
        <div className={`page-cta__inner reveal${ctaVisible ? ' visible' : ''}`}>
          <h2 className="page-cta__title">{WORKS_PAGE.cta.label}</h2>
          <p>{WORKS_PAGE.cta.description}</p>
          <Link to="/encomendas" className="btn-primary">
            {WORKS_PAGE.cta.button} <IconArrow size={15} />
          </Link>
        </div>
      </section>
    </>
  )
}
