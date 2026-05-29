import { useParams, Link } from 'react-router-dom'
import { useScrollReveal } from '../hooks'
import { POSTS } from '../data/blog'

export default function BlogPost() {
  const { slug } = useParams()
  const post = POSTS.find(p => p.slug === slug)
  const [articleRef, articleVisible] = useScrollReveal()
  const [relatedRef, relatedVisible] = useScrollReveal()

  if (!post) {
    return (
      <div className="blog-404">
        <p>Artigo não encontrado.</p>
        <Link to="/blog" className="btn-ghost">← Voltar ao Blog</Link>
      </div>
    )
  }

  const relatedPosts = post.related
    .map(s => POSTS.find(p => p.slug === s))
    .filter(Boolean)

  return (
    <>
      {/* Hero image */}
      <div className="bpost-hero">
        <img src={post.img} alt={post.title} />
        <div className="bpost-hero__grad" />
        <div className="bpost-hero__back">
          <Link to="/blog" className="bpost-back-link">← Blog</Link>
        </div>
      </div>

      {/* Article */}
      <article
        ref={articleRef}
        className={`bpost-article reveal${articleVisible ? ' visible' : ''}`}
      >
        <header className="bpost-header">
          <div className="bpost-meta">
            <span className="blog-cat">{post.cat}</span>
            <span className="blog-date">{post.date}</span>
          </div>
          <h1 className="bpost-title">{post.title}</h1>
        </header>

        <p className="bpost-lead">{post.lead}</p>

        <div className="bpost-body">
          {post.body.map((block, i) =>
            block.type === 'quote' ? (
              <blockquote key={i} className="bpost-quote">
                <span className="bpost-quote__mark">"</span>
                <p>{block.text}</p>
              </blockquote>
            ) : (
              <p key={i} className="bpost-p">{block.text}</p>
            )
          )}
        </div>

        {/* Commission CTA */}
        <div className="bpost-cta">
          <p className="bpost-cta__label">Quer uma obra assim?</p>
          <h2 className="bpost-cta__title">Encomendar uma peça única</h2>
          <p className="bpost-cta__desc">
            Cada obra é criada de raiz, com dedicação total ao detalhe e à emoção. Entre em contacto e transformemos a sua ideia em arte.
          </p>
          <Link to="/encomendas" className="btn-primary">Encomendar Agora →</Link>
        </div>
      </article>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <section
          ref={relatedRef}
          className={`bpost-related reveal${relatedVisible ? ' visible' : ''}`}
        >
          <div className="bpost-related__header">
            <div className="section-label">Continue a ler</div>
            <h2 className="bpost-related__title">Outros artigos</h2>
          </div>
          <div className="bpost-related__grid">
            {relatedPosts.map((p, i) => (
              <Link
                key={p.slug}
                to={`/blog/${p.slug}`}
                className="blog-card blog-card--related"
                style={{ '--i': i }}
              >
                <div className="blog-card__img">
                  <img src={p.img} alt={p.title} loading="lazy" />
                </div>
                <div className="blog-card__body">
                  <div className="blog-card__meta">
                    <span className="blog-cat">{p.cat}</span>
                    <span className="blog-date">{p.date}</span>
                  </div>
                  <h3 className="blog-card__title">{p.title}</h3>
                  <span className="blog-card__read">Ler mais <span className="blog-arrow">→</span></span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  )
}
