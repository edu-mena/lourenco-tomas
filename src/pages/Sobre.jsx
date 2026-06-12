import { Link } from 'react-router-dom'
import { useScrollReveal } from '../hooks'
import { TIMELINE } from '../data/content'
import { ABOUT_PAGE } from '../data/ui'

export default function Sobre() {
  const [imgRef, imgVisible] = useScrollReveal()
  const [textRef, textVisible] = useScrollReveal()
  const [pillarsRef, pillarsVisible] = useScrollReveal()
  const [timelineRef, timelineVisible] = useScrollReveal()
  const [statsRef, statsVisible] = useScrollReveal()
  const [ctaRef, ctaVisible] = useScrollReveal()

  const { hero, bioImage, bioImageAlt, badge, paragraphs, stats, sectionLabels, pillars, cta } = ABOUT_PAGE

  return (
    <>
      {/* ── Page Hero ─────────────────────────────── */}
      <div className="page-hero">
        <div className="page-hero__breadcrumb">
          <Link to="/">Início</Link>
          <span> / {hero.breadcrumb}</span>
        </div>
        <h1 className="page-hero__title">
          {hero.title.split('\n').map((line, i, arr) => (
            <span key={i}>{line}{i < arr.length - 1 && <br/>}</span>
          ))}
        </h1>
        <p className="page-hero__sub">{hero.subtitle}</p>
        <div className="page-hero__deco" aria-hidden>{hero.deco}</div>
      </div>

      {/* ── Bio ───────────────────────────────────── */}
      <section className="sobre-bio">
        <div ref={imgRef} className={`sobre-bio__visual reveal-left${imgVisible ? ' visible' : ''}`}>
          <div className="about__img-frame">
            <img
              className="about__img"
              src={bioImage}
              alt={bioImageAlt}
              loading="lazy"
            />
          </div>
          <div className="about__badge">
            <span className="about__badge-num">{badge.num} </span>
            <span className="about__badge-text">{badge.text}</span>
          </div>
        </div>

        <div ref={textRef} className={`sobre-bio__text reveal-right${textVisible ? ' visible' : ''}`}>
          <div className="section-label">{sectionLabels.bio}</div>
          <h2 className="sobre-heading">Sobre o Artista</h2>
          {paragraphs.map((p, i) => (
            <p key={i} className="sobre-body">{p}</p>
          ))}
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────── */}
      <div ref={statsRef} className={`sobre-stats reveal${statsVisible ? ' visible' : ''}`}>
        {stats.map(s => (
          <div key={s.label} className="sobre-stat">
            <div className="sobre-stat__num">{s.num}</div>
            <div className="sobre-stat__label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── Valores ───────────────────────────────── */}
      <section className="sobre-values">
        <div ref={pillarsRef} className={`reveal${pillarsVisible ? ' visible' : ''}`}>
          <div className="section-label">{sectionLabels.values}</div>
          <h2 className="section-title-display" style={{ marginBottom: '56px' }}>VALORES</h2>
          <div className="sobre-values__grid">
            {pillars.map((p, i) => (
              <div
                key={p.title}
                className="sobre-pillar"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="sobre-pillar__icon">{p.icon}</div>
                <div className="sobre-pillar__title">{p.title}</div>
                <p className="sobre-pillar__desc">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ──────────────────────────────── */}
      <section className="sobre-timeline-section">
        <div ref={timelineRef} className={`reveal${timelineVisible ? ' visible' : ''}`}>
          <div className="section-label">{sectionLabels.timeline}</div>
          <h2 className="section-title-display" style={{ marginBottom: '56px' }}>HISTÓRIA</h2>
          <div className="timeline">
            {TIMELINE.map(t => (
              <div key={t.year} className="timeline__item">
                <div className="timeline__year">{t.year}</div>
                <div className="timeline__event">{t.event}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────── */}
      <section className="page-cta" ref={ctaRef}>
        <div className={`page-cta__inner reveal${ctaVisible ? ' visible' : ''}`}>
          <div className="section-label">{cta.label}</div>
          <h2 className="page-cta__title">{cta.title}</h2>
          <p>{cta.description}</p>
          <div className="page-cta__btns">
            <Link to={cta.primary.to} className="btn-primary">
              {cta.primary.label}
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" width="16" height="16">
                <path d="M3 8h10M9 4l4 4-4 4"/>
              </svg>
            </Link>
            <Link to={cta.secondary.to} className="btn-outline">{cta.secondary.label}</Link>
          </div>
        </div>
      </section>
    </>
  )
}
