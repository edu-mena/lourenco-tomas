import { Fragment } from 'react'
import { HERO_CONTENT } from '../data/ui'

function ArrowRight() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 8h10M9 4l4 4-4 4"/>
    </svg>
  )
}

export default function Hero() {
  const scrollTo = (href) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="hero">
      <div className="hero__overlay" />

      <div className="hero__content">
        <h1 className="hero__title">
          {HERO_CONTENT.title.map((line, index) => (
            <Fragment key={index}>
              {line}
              {index < HERO_CONTENT.title.length - 1 && <br />}
            </Fragment>
          ))}
        </h1>

        <p className="hero__subtitle">
          {HERO_CONTENT.subtitle}
        </p>

        <div className="hero__cta-wrap">
          <button className="btn-primary" onClick={() => scrollTo('#gallery')}>
            {HERO_CONTENT.ctaPrimary} <ArrowRight />
          </button>
          <button className="btn-ghost" onClick={() => scrollTo('#contact')}>
            {HERO_CONTENT.ctaSecondary}
          </button>
        </div>
      </div>

      <div className="hero__scroll">
        <div className="hero__scroll-line" />
        {HERO_CONTENT.scrollLabel}
      </div>
    </section>
  )
}
