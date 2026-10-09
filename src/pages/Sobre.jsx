import { Link } from 'react-router-dom'
import { useScrollReveal } from '../hooks'
import { TIMELINE } from '../data/content'
import { ABOUT_PAGE } from '../data/ui'
import { PageHero, CountUp } from '../components/ui'
import { IconArrow } from '../components/icons'

export default function Sobre() {
  const [imgRef, imgVisible] = useScrollReveal()
  const [textRef, textVisible] = useScrollReveal()
  const [pillarsRef, pillarsVisible] = useScrollReveal()
  const [timelineRef, timelineVisible] = useScrollReveal()
  const [statsRef, statsVisible] = useScrollReveal()
  const [ctaRef, ctaVisible] = useScrollReveal()

  const { hero, bioImage, bioImageAlt, badge, paragraphs, stats, sectionTitles, pillars, cta } = ABOUT_PAGE

  return (
    <>
      <PageHero {...hero} />

      {/* ── Bio ── */}
      <section className="sobre-bio">
        <div ref={imgRef} className={`sobre-bio__visual reveal${imgVisible ? ' visible' : ''}`}>
          <div className="about__img-frame">
            <img className="about__img" src={bioImage} alt={bioImageAlt} loading="lazy" />
          </div>
          {badge?.num && (
            <div className="about__badge">
              <span className="about__badge-num">{badge.num}</span>
              <span className="about__badge-text">{badge.text}</span>
            </div>
          )}
        </div>

        <div ref={textRef} className={`sobre-bio__text reveal${textVisible ? ' visible' : ''}`}>
          <h2 className="sobre-heading">{sectionTitles.heading}</h2>
          {paragraphs.map((p, i) => (
            <p key={i} className="sobre-body">{p}</p>
          ))}
        </div>
      </section>

      {/* ── Números ── */}
      <div ref={statsRef} className={`sobre-stats reveal${statsVisible ? ' visible' : ''}`}>
        {stats.map(s => (
          <div key={s.label} className="sobre-stat">
            <div className="sobre-stat__num"><CountUp value={s.num} start={statsVisible} /></div>
            <div className="sobre-stat__label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── Especialidades ── */}
      <section className="sobre-values">
        <div ref={pillarsRef} className={`reveal${pillarsVisible ? ' visible' : ''}`}>
          <h2 className="section-title-display section-title-display--spaced">{sectionTitles.values}</h2>
          <div className="sobre-values__grid">
            {pillars.map((p, i) => (
              <div key={p.title} className="sobre-pillar">
                <div className="sobre-pillar__icon">{String(i + 1).padStart(2, '0')}</div>
                <div className="sobre-pillar__title">{p.title}</div>
                <p className="sobre-pillar__desc">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Percurso ── */}
      <section className="sobre-timeline-section">
        <div ref={timelineRef} className={`reveal${timelineVisible ? ' visible' : ''}`}>
          <h2 className="section-title-display section-title-display--spaced">{sectionTitles.timeline}</h2>
          <ol className="timeline">
            {TIMELINE.map(t => (
              <li key={t.year} className="timeline__item">
                <div className="timeline__year">{t.year}</div>
                <div className="timeline__event">{t.event}</div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="page-cta" ref={ctaRef}>
        <div className={`page-cta__inner reveal${ctaVisible ? ' visible' : ''}`}>
          <h2 className="page-cta__title">{cta.title}</h2>
          <p>{cta.description}</p>
          <div className="page-cta__btns">
            <Link to={cta.primary.to} className="btn-primary">
              {cta.primary.label} <IconArrow size={15} />
            </Link>
            <Link to={cta.secondary.to} className="btn-outline">{cta.secondary.label}</Link>
          </div>
        </div>
      </section>
    </>
  )
}
