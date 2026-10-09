import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useScrollReveal } from '../hooks'
import { usePosts } from '../hooks/useApi'
import { BLOG_PAGE } from '../data/ui'
import { PageHero, SkeletonGrid, ErrorState } from '../components/ui'
import { IconArrow } from '../components/icons'
import { useSiteContent } from '../content/SiteContent'

export default function Blog() {
  const [filter, setFilter] = useState('Todos')
  const [featuredRef, featuredVisible] = useScrollReveal()
  const [gridRef, gridVisible] = useScrollReveal()

  const { posts, loading, error, reload } = usePosts()
  const { general } = useSiteContent()

  const filtered = filter === 'Todos' ? posts : posts.filter(p => p.cat === filter)
  // O artigo marcado como destaque no admin; sem nenhum, o mais recente
  const featured = filtered.find(p => p.featured) ?? filtered[0] ?? null
  const rest = filtered.filter(p => p !== featured)

  return (
    <>
      <PageHero {...BLOG_PAGE.hero} subtitle={general.blogSubtitle} />

      {/* Filter bar */}
      <div className="blog-filters-wrap">
        <div className="blog-filters">
          {BLOG_PAGE.filters.map(c => (
            <button
              key={c}
              aria-pressed={filter === c}
              className={`blog-filter-btn${filter === c ? ' active' : ''}`}
              onClick={() => setFilter(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <section className="blog-grid-section"><SkeletonGrid count={3} variant="cards" /></section>
      ) : error ? (
        <ErrorState message="Não foi possível carregar os artigos." onRetry={reload} />
      ) : (
        <>
          {/* Featured post */}
          {featured && (
            <section className="blog-featured-section">
              <Link
                to={`/blog/${featured.slug}`}
                ref={featuredRef}
                className={`blog-featured reveal${featuredVisible ? ' visible' : ''}`}
              >
                <div className="blog-featured__img-wrap">
                  <img src={featured.img} alt="" />
                  <div className="blog-featured__shimmer" />
                </div>
                <div className="blog-featured__body">
                  <div className="blog-featured__meta">
                    <span className="blog-cat">{featured.cat}</span>
                    <span className="blog-date">{featured.date}</span>
                  </div>
                  <h2 className="blog-featured__title">{featured.title}</h2>
                  <p className="blog-featured__excerpt">{featured.excerpt}</p>
                  <span className="blog-featured__cta">
                    {BLOG_PAGE.featuredCta} <IconArrow size={14} />
                  </span>
                </div>
              </Link>
            </section>
          )}

          {/* Grid */}
          {rest.length > 0 && (
            <section className="blog-grid-section">
              <div
                ref={gridRef}
                className={`blog-grid${gridVisible ? ' blog-grid--visible' : ''}`}
              >
                {rest.map((post, i) => (
                  <Link
                    key={post.slug}
                    to={`/blog/${post.slug}`}
                    className="blog-card"
                    style={{ '--i': i }}
                  >
                    <div className="blog-card__num">
                      {String(i + 2).padStart(2, '0')}
                    </div>
                    <div className="blog-card__img">
                      <img src={post.img} alt="" loading="lazy" />
                    </div>
                    <div className="blog-card__body">
                      <div className="blog-card__meta">
                        <span className="blog-cat">{post.cat}</span>
                        <span className="blog-date">{post.date}</span>
                      </div>
                      <h3 className="blog-card__title">{post.title}</h3>
                      <p className="blog-card__excerpt">{post.excerpt}</p>
                      <span className="blog-card__read">{BLOG_PAGE.cardReadLabel} <span className="blog-arrow">→</span></span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {filtered.length === 0 && (
            <div className="blog-empty">
              <p>{BLOG_PAGE.emptyState}</p>
            </div>
          )}
        </>
      )}
    </>
  )
}
