import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useScrollReveal } from '../hooks'
import { CORPORATE_PAGE } from '../data/ui'
import { WA_NUMBER } from '../data/content'
import { useCompanies } from '../hooks/useApi'

// ─── Icons ──────────────────────────────────────────────────────

function ArrowIcon({ dir = 'right' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
      width="16" height="16"
      style={{ transform: dir === 'left' ? 'rotate(180deg)' : 'none' }}>
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12 5 19 12 12 19"/>
    </svg>
  )
}

function WaIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  )
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
      <circle cx="12" cy="12" r="10"/>
      <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none"/>
    </svg>
  )
}

function ZoomIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="16" height="16">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      <line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
    </svg>
  )
}

// ─── Lightbox ────────────────────────────────────────────────────

function Lightbox({ image, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', handler) }
  }, [onClose])

  return (
    <div className="hdet-lightbox" onClick={onClose}>
      <button className="hdet-lightbox__close" onClick={onClose}><CloseIcon /></button>
      <div className="hdet-lightbox__inner" onClick={e => e.stopPropagation()}>
        <img src={image.img} alt={image.title} className="hdet-lightbox__img" />
        <p className="hdet-lightbox__caption">{image.title}</p>
      </div>
    </div>
  )
}

// ─── Company Card ─────────────────────────────────────────────────

function CompanyCard({ company, index, onOpen }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="corp2-card"
      style={{ '--i': index }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="corp2-card__cover">
        <img src={company.cover} alt={company.name} loading="lazy" />
        <div className="corp2-card__cover-grad" />
        <span className="corp2-card__year">{company.year}</span>
        <span className="corp2-card__count">
          {company.works.length} {company.works.length === 1 ? 'obra' : 'obras'}
        </span>
      </div>

      <div className="corp2-card__body">
        <div className="corp2-card__top">
          <span className="corp2-card__sector">{company.sector}</span>
          <h3 className="corp2-card__name">{company.name}</h3>
          <p className="corp2-card__desc">{company.desc}</p>
        </div>

        <div className="corp2-card__types">
          {[...new Set(company.works.map(w => w.type))].map(t => (
            <span key={t} className="corp2-card__pill">{t}</span>
          ))}
        </div>

        <div className="corp2-card__thumbs">
          {company.works.slice(0, 3).map((w) => (
            <button
              key={w.id}
              className="corp2-card__thumb"
              onClick={() => onOpen(w)}
              aria-label={`Ver ${w.title}`}
            >
              <img src={w.img} alt={w.title} loading="lazy" />
              <div className="corp2-card__thumb-overlay"><ZoomIcon /></div>
            </button>
          ))}
          {company.works.length > 3 && (
            <div className="corp2-card__thumb corp2-card__thumb--more">
              +{company.works.length - 3}
            </div>
          )}
        </div>

        <Link to={`/corporativos/${company.slug}`} className="corp2-card__link">
          Ver portfolio completo <ArrowIcon />
        </Link>
      </div>
    </div>
  )
}

// ─── Works Grid Item ─────────────────────────────────────────────

function WorkGridItem({ work, companyName, companySlug, index, onOpen }) {
  return (
    <div className="corp2-work" style={{ '--i': index }}>
      <button className="corp2-work__img-wrap" onClick={() => onOpen(work)} aria-label={`Ver ${work.title}`}>
        <img src={work.img} alt={work.title} loading="lazy" />
        <div className="corp2-work__overlay">
          <ZoomIcon />
        </div>
      </button>
      <div className="corp2-work__body">
        <span className="corp2-work__type">{work.type}</span>
        <h4 className="corp2-work__title">{work.title}</h4>
        <div className="corp2-work__meta">
          <span className="corp2-work__company">{companyName}</span>
          <span className="corp2-work__year">{work.year}</span>
        </div>
        <Link to={`/corporativos/${companySlug}`} className="corp2-work__link">
          Ver empresa <ArrowIcon />
        </Link>
      </div>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────

export default function Corporativos() {
  const [view, setView]                 = useState(CORPORATE_PAGE.views[0].key)
  const [filter, setFilter]             = useState(CORPORATE_PAGE.filters[0])
  const [lightboxWork, setLightboxWork] = useState(null)

  const [statsRef,   statsVisible]   = useScrollReveal()
  const [cardsRef,   cardsVisible]   = useScrollReveal()
  const [worksRef,   worksVisible]   = useScrollReveal()
  const [procRef,    procVisible]    = useScrollReveal()
  const [servRef,    servVisible]    = useScrollReveal()
  const [ctaRef,     ctaVisible]     = useScrollReveal()

  const { companies: COMPANIES, loading } = useCompanies()

  const allWorks = COMPANIES.flatMap(c =>
    c.works.map(w => ({ ...w, companyName: c.name, companySlug: c.slug }))
  )
  const filteredWorks = filter === CORPORATE_PAGE.filters[0]
    ? allWorks
    : allWorks.filter(w => w.type === filter)

  const dynamicNums = [
    COMPANIES.length,
    allWorks.length,
    [...new Set(allWorks.map(w => w.type))].length,
    null,
  ]

  const heroLines = CORPORATE_PAGE.hero.title.split('\n')

  return (
    <>
      {lightboxWork && (
        <Lightbox image={lightboxWork} onClose={() => setLightboxWork(null)} />
      )}

      {/* ── Page Hero ── */}
      <div className="page-hero">
        <p className="page-hero__breadcrumb">
          <Link to="/">Início</Link> / {CORPORATE_PAGE.hero.breadcrumb}
        </p>
        <h1 className="page-hero__title">
          {heroLines.map((line, i) => (
            <span key={i}>{line}{i < heroLines.length - 1 && <br/>}</span>
          ))}
        </h1>
        <p className="page-hero__sub">{CORPORATE_PAGE.hero.subtitle}</p>
        <div className="page-hero__deco">{CORPORATE_PAGE.hero.deco}</div>
      </div>

      {loading && (
        <div style={{ textAlign: 'center', padding: '80px 0', color: 'rgba(245,245,245,0.35)' }}>
          A carregar…
        </div>
      )}

      {/* ── Stats Strip ── */}
      <div ref={statsRef} className={`corp2-stats reveal${statsVisible ? ' visible' : ''}`}>
        {CORPORATE_PAGE.stats.map((s, i) => (
          <div key={s.label} className="corp2-stats__item"
            style={i < CORPORATE_PAGE.stats.length - 1 ? {} : {}}>
            <span className="corp2-stats__num">{dynamicNums[i] ?? s.num}</span>
            <span className="corp2-stats__label">{s.label}</span>
            {i < CORPORATE_PAGE.stats.length - 1 && <div className="corp2-stats__divider" style={{ display: 'none' }} />}
          </div>
        ))}
      </div>

      {/* ── Toolbar ── */}
      <div className="corp2-toolbar">
        <div className="corp2-toolbar__views">
          {CORPORATE_PAGE.views.map(v => (
            <button
              key={v.key}
              className={`corp2-view-btn${view === v.key ? ' active' : ''}`}
              onClick={() => setView(v.key)}
            >
              {v.key === 'empresas' ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="14" height="14">
                  <rect x="3" y="3" width="8" height="8"/><rect x="13" y="3" width="8" height="8"/>
                  <rect x="3" y="13" width="8" height="8"/><rect x="13" y="13" width="8" height="8"/>
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="14" height="14">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/>
                </svg>
              )}
              {v.label}
            </button>
          ))}
        </div>

        {view === CORPORATE_PAGE.views[1].key && (
          <div className="corp2-toolbar__filters">
            {CORPORATE_PAGE.filters.map(t => (
              <button
                key={t}
                className={`blog-filter-btn${filter === t ? ' active' : ''}`}
                onClick={() => setFilter(t)}
              >
                {t}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Companies Grid ── */}
      {view === CORPORATE_PAGE.views[0].key && (
        <section className="corp2-section">
          <div
            ref={cardsRef}
            className={`corp2-cards-grid${cardsVisible ? ' corp2-cards-grid--visible' : ''}`}
          >
            {COMPANIES.map((c, i) => (
              <CompanyCard key={c.id} company={c} index={i} onOpen={setLightboxWork} />
            ))}
          </div>
        </section>
      )}

      {/* ── All Works Grid ── */}
      {view === CORPORATE_PAGE.views[1].key && (
        <section className="corp2-section">
          {filteredWorks.length > 0 ? (
            <div
              ref={worksRef}
              className={`corp2-works-grid${worksVisible ? ' corp2-works-grid--visible' : ''}`}
            >
              {filteredWorks.map((w, i) => (
                <WorkGridItem
                  key={w.id}
                  work={w}
                  companyName={w.companyName}
                  companySlug={w.companySlug}
                  index={i}
                  onOpen={setLightboxWork}
                />
              ))}
            </div>
          ) : (
            <div className="blog-empty">
              <p>{CORPORATE_PAGE.emptyState}</p>
            </div>
          )}
        </section>
      )}

      {/* ── Process Steps ── */}
      <section ref={procRef} className={`corp2-process reveal${procVisible ? ' visible' : ''}`}>
        <div className="corp2-process__inner">
          <div className="section-label">{CORPORATE_PAGE.sectionLabels.process}</div>
          <h2 className="corp2-process__title">
            {CORPORATE_PAGE.processTitle.first}<br /><em>{CORPORATE_PAGE.processTitle.second}</em>
          </h2>
          <div className="corp2-process__grid">
            {CORPORATE_PAGE.process.map((s, i) => (
              <div key={s.num} className="corp2-process__step" style={{ '--i': i }}>
                <span className="corp2-process__num">{s.num}</span>
                <div className="corp2-process__step-body">
                  <h4 className="corp2-process__step-title">{s.title}</h4>
                  <p className="corp2-process__step-desc">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section ref={servRef} className={`corp2-services reveal${servVisible ? ' visible' : ''}`}>
        <div className="corp2-services__inner">
          <div className="section-label">{CORPORATE_PAGE.sectionLabels.services}</div>
          <div className="corp2-services__grid">
            {CORPORATE_PAGE.services.map((s, i) => (
              <div key={i} className="corp2-service">
                <span className="corp2-service__icon">{s.icon}</span>
                <h4 className="corp2-service__title">{s.title}</h4>
                <p className="corp2-service__desc">{s.desc}</p>
                <span className="corp2-service__detail">{s.detail}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section ref={ctaRef} className={`hom-cta reveal${ctaVisible ? ' visible' : ''}`}>
        <div className="hom-cta__inner">
          <div className="section-label">{CORPORATE_PAGE.sectionLabels.cta}</div>
          <h2 className="hom-cta__title">
            {CORPORATE_PAGE.cta.title[0]}<br /><span>{CORPORATE_PAGE.cta.title[1]}</span>
          </h2>
          <p className="hom-cta__desc">{CORPORATE_PAGE.cta.description}</p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contacto" className="btn-primary">
              {CORPORATE_PAGE.cta.primaryBtn} <ArrowIcon />
            </Link>
            <a
              href={`https://wa.me/${WA_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              <WaIcon /> {CORPORATE_PAGE.cta.waBtn}
            </a>
          </div>
        </div>
      </section>

      {/* ── Scoped Styles ── */}
      <style>{`
        /* ── Stats ───────────────────────────── */
        .corp2-stats {
          display: flex;
          align-items: stretch;
          justify-content: center;
          border-top: 1px solid rgba(214,194,168,0.1);
          border-bottom: 1px solid rgba(214,194,168,0.1);
        }
        .corp2-stats__item {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: clamp(28px,4vw,48px) 0;
          text-align: center;
          position: relative;
        }
        .corp2-stats__item + .corp2-stats__item::before {
          content: '';
          position: absolute;
          left: 0; top: 16px; bottom: 16px;
          width: 1px;
          background: rgba(214,194,168,0.1);
        }
        .corp2-stats__num {
          font-family: var(--ff-display);
          font-size: clamp(2.4rem, 5vw, 4.2rem);
          color: var(--beige);
          line-height: 1;
          font-weight: 900;
        }
        .corp2-stats__label {
          font-family: var(--ff-mono);
          font-size: 0.62rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(245,245,245,0.38);
        }

        /* ── Toolbar ─────────────────────────── */
        .corp2-toolbar {
          display: flex;
          align-items: center;
          gap: 24px;
          flex-wrap: wrap;
          padding: 32px var(--px) 0;
          max-width: var(--max-w);
          margin: 0 auto;
        }
        .corp2-toolbar__views {
          display: flex;
          gap: 4px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(214,194,168,0.1);
          padding: 4px;
        }
        .corp2-view-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 22px;
          font-family: var(--ff-mono);
          font-size: 0.66rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.45);
          border: 1px solid transparent;
          transition: color 0.25s, background 0.25s, border-color 0.25s;
        }
        .corp2-view-btn:hover { color: var(--beige); }
        .corp2-view-btn.active {
          color: var(--ink);
          background: var(--beige);
          border-color: var(--beige);
        }
        .corp2-toolbar__filters {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }

        /* ── Section wrapper ─────────────────── */
        .corp2-section {
          padding: clamp(40px, 6vw, 72px) var(--px) clamp(60px, 8vw, 100px);
          max-width: var(--max-w);
          margin: 0 auto;
        }

        /* ── Companies Grid ──────────────────── */
        .corp2-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: rgba(214,194,168,0.07);
        }
        .corp2-card {
          background: var(--ink);
          display: flex;
          flex-direction: column;
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.7s var(--ease-out), transform 0.7s var(--ease-out);
          transition-delay: calc(var(--i) * 0.08s);
        }
        .corp2-cards-grid--visible .corp2-card {
          opacity: 1;
          transform: none;
        }

        /* Cover */
        .corp2-card__cover {
          position: relative;
          aspect-ratio: 16/10;
          overflow: hidden;
        }
        .corp2-card__cover img {
          width: 100%; height: 100%;
          object-fit: cover;
          display: block;
          filter: brightness(0.6) grayscale(10%);
          transition: transform 0.8s var(--ease-out), filter 0.5s;
        }
        .corp2-card:hover .corp2-card__cover img {
          transform: scale(1.06);
          filter: brightness(0.75) grayscale(0%);
        }
        .corp2-card__cover-grad {
          position: absolute; inset: 0;
          background: linear-gradient(180deg, transparent 40%, rgba(13,13,13,0.7) 100%);
        }
        .corp2-card__year {
          position: absolute;
          top: 14px; left: 14px;
          font-family: var(--ff-mono);
          font-size: 0.58rem;
          letter-spacing: 0.22em;
          color: rgba(255,255,255,0.55);
          background: rgba(13,13,13,0.6);
          backdrop-filter: blur(8px);
          padding: 4px 10px;
          border: 1px solid rgba(214,194,168,0.18);
        }
        .corp2-card__count {
          position: absolute;
          top: 14px; right: 14px;
          font-family: var(--ff-mono);
          font-size: 0.58rem;
          letter-spacing: 0.16em;
          color: var(--beige);
          background: rgba(13,13,13,0.65);
          backdrop-filter: blur(8px);
          padding: 4px 10px;
          border: 1px solid rgba(214,194,168,0.22);
        }

        /* Body */
        .corp2-card__body {
          padding: 22px 22px 26px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          flex: 1;
        }
        .corp2-card__top { display: flex; flex-direction: column; gap: 4px; }
        .corp2-card__sector {
          font-family: var(--ff-mono);
          font-size: 0.56rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--beige);
        }
        .corp2-card__name {
          font-size: 1.25rem;
          font-weight: 900;
          color: var(--white);
          line-height: 1.15;
          letter-spacing: -0.01em;
          margin: 2px 0 4px;
        }
        .corp2-card__desc {
          font-size: 0.78rem;
          color: rgba(255,255,255,0.44);
          line-height: 1.65;
        }

        /* Type pills */
        .corp2-card__types {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }
        .corp2-card__pill {
          font-family: var(--ff-mono);
          font-size: 0.52rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(214,194,168,0.7);
          border: 1px solid rgba(214,194,168,0.2);
          padding: 4px 10px;
          border-radius: 2px;
        }

        /* Thumbnail strip */
        .corp2-card__thumbs {
          display: flex;
          gap: 4px;
          margin-top: 4px;
        }
        .corp2-card__thumb {
          flex: 1;
          aspect-ratio: 1;
          overflow: hidden;
          position: relative;
          border: none;
          padding: 0;
          cursor: pointer;
          background: var(--ink-3);
          max-width: 72px;
        }
        .corp2-card__thumb img {
          width: 100%; height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.5s var(--ease-out), filter 0.35s;
          filter: brightness(0.7);
        }
        .corp2-card__thumb:hover img {
          transform: scale(1.12);
          filter: brightness(0.9);
        }
        .corp2-card__thumb-overlay {
          position: absolute; inset: 0;
          background: rgba(13,13,13,0.55);
          display: flex; align-items: center; justify-content: center;
          color: var(--beige);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .corp2-card__thumb:hover .corp2-card__thumb-overlay { opacity: 1; }
        .corp2-card__thumb--more {
          flex: 0 0 72px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(214,194,168,0.06);
          border: 1px dashed rgba(214,194,168,0.2);
          font-family: var(--ff-display);
          font-size: 1.1rem;
          font-weight: 900;
          color: rgba(214,194,168,0.5);
          cursor: default;
        }

        .corp2-card__link {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-family: var(--ff-mono);
          font-size: 0.62rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--beige);
          margin-top: auto;
          transition: gap 0.3s var(--ease-out);
          align-self: flex-start;
        }
        .corp2-card__link:hover { gap: 13px; }

        /* ── All Works Grid ───────────────────── */
        .corp2-works-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px 16px;
        }
        .corp2-work {
          display: flex;
          flex-direction: column;
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.6s var(--ease-out), transform 0.6s var(--ease-out);
          transition-delay: calc(var(--i) * 0.06s);
        }
        .corp2-works-grid--visible .corp2-work {
          opacity: 1;
          transform: none;
        }
        .corp2-work__img-wrap {
          aspect-ratio: 4/3;
          overflow: hidden;
          position: relative;
          border: none;
          padding: 0;
          cursor: pointer;
          background: var(--ink-3);
          display: block;
          width: 100%;
        }
        .corp2-work__img-wrap img {
          width: 100%; height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.7s var(--ease-out), filter 0.4s;
          filter: brightness(0.65);
        }
        .corp2-work__img-wrap:hover img {
          transform: scale(1.08);
          filter: brightness(0.85);
        }
        .corp2-work__overlay {
          position: absolute; inset: 0;
          background: rgba(13,13,13,0.45);
          display: flex; align-items: center; justify-content: center;
          color: var(--beige);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .corp2-work__img-wrap:hover .corp2-work__overlay { opacity: 1; }
        .corp2-work__body {
          padding: 14px 0 0;
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        .corp2-work__type {
          font-family: var(--ff-mono);
          font-size: 0.55rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--beige);
        }
        .corp2-work__title {
          font-size: 0.88rem;
          font-weight: 900;
          color: var(--white);
          line-height: 1.3;
          margin: 2px 0;
        }
        .corp2-work__meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 4px;
        }
        .corp2-work__company {
          font-family: var(--ff-mono);
          font-size: 0.6rem;
          letter-spacing: 0.12em;
          color: rgba(255,255,255,0.35);
          text-transform: uppercase;
        }
        .corp2-work__year {
          font-family: var(--ff-mono);
          font-size: 0.58rem;
          color: rgba(255,255,255,0.25);
        }
        .corp2-work__link {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-family: var(--ff-mono);
          font-size: 0.58rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(214,194,168,0.55);
          margin-top: 8px;
          transition: color 0.25s, gap 0.3s;
          align-self: flex-start;
        }
        .corp2-work__link:hover { color: var(--beige); gap: 10px; }

        /* ── Process ─────────────────────────── */
        .corp2-process {
          padding: clamp(72px, 10vw, 120px) var(--px);
          background: linear-gradient(180deg, var(--ink) 0%, #0f0c09 50%, var(--ink) 100%);
          border-top: 1px solid rgba(214,194,168,0.08);
        }
        .corp2-process__inner { max-width: var(--max-w); margin: 0 auto; }
        .corp2-process__title {
          font-family: var(--ff-serif);
          font-size: clamp(2rem, 4vw, 3.5rem);
          font-weight: 900;
          color: var(--white);
          line-height: 1.1;
          margin: 12px 0 56px;
        }
        .corp2-process__title em { font-style: italic; color: var(--beige); }
        .corp2-process__grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
          border-left: 1px solid rgba(214,194,168,0.1);
        }
        .corp2-process__step {
          display: flex;
          flex-direction: column;
          padding: clamp(24px,3vw,40px) clamp(20px,3vw,36px);
          border-right: 1px solid rgba(214,194,168,0.1);
          gap: 16px;
          opacity: 0;
          transform: translateX(20px);
          transition: opacity 0.7s var(--ease-out), transform 0.7s var(--ease-out);
          transition-delay: calc(var(--i) * 0.12s);
        }
        .corp2-process.visible .corp2-process__step {
          opacity: 1;
          transform: none;
        }
        .corp2-process__num {
          font-family: var(--ff-display);
          font-size: clamp(4rem, 7vw, 6rem);
          font-weight: 900;
          color: rgba(214,194,168,0.08);
          line-height: 1;
        }
        .corp2-process__step-body { display: flex; flex-direction: column; gap: 10px; }
        .corp2-process__step-title {
          font-family: var(--ff-display);
          font-size: 1rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--white);
        }
        .corp2-process__step-desc {
          font-size: 0.82rem;
          color: rgba(255,255,255,0.46);
          line-height: 1.75;
        }

        /* ── Services ────────────────────────── */
        .corp2-services {
          padding: clamp(72px, 10vw, 120px) var(--px);
          border-top: 1px solid rgba(214,194,168,0.08);
        }
        .corp2-services__inner { max-width: var(--max-w); margin: 0 auto; }
        .corp2-services__grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          margin-top: 40px;
          border: 1px solid rgba(214,194,168,0.1);
        }
        .corp2-service {
          padding: clamp(28px,4vw,48px) clamp(20px,3vw,36px);
          border-right: 1px solid rgba(214,194,168,0.1);
          display: flex;
          flex-direction: column;
          gap: 12px;
          transition: background 0.35s;
        }
        .corp2-service:last-child { border-right: none; }
        .corp2-service:hover { background: rgba(214,194,168,0.03); }
        .corp2-service__icon { font-size: 1.8rem; }
        .corp2-service__title {
          font-family: var(--ff-display);
          font-size: 1.2rem;
          letter-spacing: 0.06em;
          color: var(--white);
        }
        .corp2-service__desc {
          font-size: 0.82rem;
          color: rgba(255,255,255,0.5);
          line-height: 1.75;
          flex: 1;
        }
        .corp2-service__detail {
          font-family: var(--ff-mono);
          font-size: 0.62rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--beige);
          padding-top: 12px;
          border-top: 1px solid rgba(214,194,168,0.15);
        }

        /* ── Responsive ─────────────────────── */
        @media (max-width: 1100px) {
          .corp2-cards-grid { grid-template-columns: repeat(2, 1fr); }
          .corp2-works-grid { grid-template-columns: repeat(3, 1fr); }
          .corp2-process__grid { grid-template-columns: repeat(2, 1fr); }
          .corp2-services__grid { grid-template-columns: repeat(2, 1fr); }
          .corp2-service:nth-child(2) { border-right: none; }
          .corp2-service:nth-child(3) { border-top: 1px solid rgba(214,194,168,0.1); }
          .corp2-service:nth-child(4) { border-right: none; border-top: 1px solid rgba(214,194,168,0.1); }
        }
        @media (max-width: 768px) {
          .corp2-cards-grid { grid-template-columns: 1fr; }
          .corp2-works-grid { grid-template-columns: repeat(2, 1fr); }
          .corp2-stats { flex-wrap: wrap; }
          .corp2-stats__item { flex: 1 0 45%; }
          .corp2-toolbar { flex-direction: column; align-items: flex-start; }
          .corp2-process__grid { grid-template-columns: 1fr; }
          .corp2-process__step { border-right: none; border-bottom: 1px solid rgba(214,194,168,0.1); }
          .corp2-services__grid { grid-template-columns: 1fr; }
          .corp2-service { border-right: none; border-bottom: 1px solid rgba(214,194,168,0.1); }
          .corp2-service:last-child { border-bottom: none; }
        }
        @media (max-width: 480px) {
          .corp2-works-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  )
}
