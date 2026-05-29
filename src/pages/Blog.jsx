import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useScrollReveal } from '../hooks'
import { POSTS } from '../data/blog'

const CATS = ['Todos', 'Processo', 'Homenagens', 'Técnica', 'Bastidores']

export default function Blog() {
  const [filter, setFilter] = useState('Todos')
  const [featuredRef, featuredVisible] = useScrollReveal()
  const [gridRef, gridVisible] = useScrollReveal()

  const filtered = filter === 'Todos' ? POSTS : POSTS.filter(p => p.cat === filter)
  const featured = filtered[0] ?? null
  const rest = filtered.slice(1)

  return (
    <>
      <div className="page-hero">
        <p className="page-hero__breadcrumb">
          <Link to="/">Início</Link> / Blog
        </p>
        <h1 className="page-hero__title">Blog</h1>
        <p className="page-hero__sub">
          Processo criativo, bastidores e histórias por trás de cada obra.
        </p>
        <div className="page-hero__deco">BLG</div>
      </div>

      {/* Filter bar */}
      <div className="blog-filters-wrap">
        <div className="blog-filters">
          {CATS.map(c => (
            <button
              key={c}
              className={`blog-filter-btn${filter === c ? ' active' : ''}`}
              onClick={() => setFilter(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Featured post */}
      {featured && (
        <section className="blog-featured-section">
          <Link
            to={`/blog/${featured.slug}`}
            ref={featuredRef}
            className={`blog-featured reveal${featuredVisible ? ' visible' : ''}`}
          >
            <div className="blog-featured__img-wrap">
              <img src={featured.img} alt={featured.title} />
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
                Ler artigo <span className="blog-arrow">→</span>
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
                  <img src={post.img} alt={post.title} loading="lazy" />
                </div>
                <div className="blog-card__body">
                  <div className="blog-card__meta">
                    <span className="blog-cat">{post.cat}</span>
                    <span className="blog-date">{post.date}</span>
                  </div>
                  <h3 className="blog-card__title">{post.title}</h3>
                  <p className="blog-card__excerpt">{post.excerpt}</p>
                  <span className="blog-card__read">Ler mais <span className="blog-arrow">→</span></span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {filtered.length === 0 && (
        <div className="blog-empty">
          <p>Nenhum artigo nesta categoria ainda.</p>
        </div>
      )}
    </>
  )
}
