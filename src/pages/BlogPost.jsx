import { useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useScrollReveal, usePageTitle } from '../hooks'
import { usePostBySlug, usePosts } from '../hooks/useApi'
import { BLOG_POST_PAGE } from '../data/ui'
import { IconArrow } from '../components/icons'

/* Barra fina no topo que mostra quanto do artigo já foi lido */
function ReadingProgress({ targetRef }) {
  const barRef = useRef(null)
  useEffect(() => {
    let raf = null
    const update = () => {
      raf = null
      const el = targetRef.current
      if (!el || !barRef.current) return
      const r = el.getBoundingClientRect()
      const total = r.height - window.innerHeight
      const p = total > 0 ? Math.min(Math.max(-r.top / total, 0), 1) : 1
      barRef.current.style.transform = `scaleX(${p})`
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [targetRef])
  return <div className="reading-progress" aria-hidden="true"><div ref={barRef} className="reading-progress__bar" /></div>
}

export default function BlogPost() {
  const { slug } = useParams()
  const { post, loading, error } = usePostBySlug(slug)
  const { posts } = usePosts()
  const [articleRef, articleVisible] = useScrollReveal()
  const [relatedRef, relatedVisible] = useScrollReveal()
  const bodyRef = useRef(null)
  usePageTitle(post?.title ?? 'Blog')

  if (loading) {
    return (
      <div className="bpost-loading" aria-busy="true" aria-label="A carregar">
        <div className="skeleton bpost-loading__hero" />
        <div className="skeleton bpost-loading__line" />
        <div className="skeleton bpost-loading__line bpost-loading__line--short" />
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="blog-404">
        <p>{BLOG_POST_PAGE.notFound.message}</p>
        <Link to="/blog" className="btn-outline">{BLOG_POST_PAGE.notFound.backLabel}</Link>
      </div>
    )
  }

  const relatedPosts = post.related
    .map(s => posts.find(p => p.slug === s))
    .filter(Boolean)

  return (
    <>
      <ReadingProgress targetRef={bodyRef} />
      {/* Hero image */}
      <div className="bpost-hero">
        <img src={post.img} alt="" />
        <div className="bpost-hero__grad" />
        <div className="bpost-hero__back">
          <Link to="/blog" className="bpost-back-link"><IconArrow size={14} dir="left" /> Blog</Link>
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

        <div className="bpost-body" ref={bodyRef}>
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
          <h2 className="bpost-cta__title">{BLOG_POST_PAGE.cta.title}</h2>
          <p className="bpost-cta__desc">
            {BLOG_POST_PAGE.cta.description}
          </p>
          <Link to="/encomendas" className="btn-primary">{BLOG_POST_PAGE.cta.button} <IconArrow size={15} /></Link>
        </div>
      </article>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <section
          ref={relatedRef}
          className={`bpost-related reveal${relatedVisible ? ' visible' : ''}`}
        >
          <div className="bpost-related__header">
            <h2 className="bpost-related__title">{BLOG_POST_PAGE.relatedTitle}</h2>
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
                  <img src={p.img} alt="" loading="lazy" />
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
