import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { HERO_CONTENT } from '../data/ui'
import { IconArrow } from './icons'
import { usePageTitle } from '../hooks'

export default function Hero() {
  usePageTitle(null)
  const scrollToGallery = () => {
    document.querySelector('#gallery')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="hero" data-spray>
      <img className="hero__img" src={HERO_CONTENT.image} alt={HERO_CONTENT.imageAlt} fetchpriority="high" decoding="async" />
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

        <div className="hero__cta-wrap">
          <button className="btn-primary" onClick={scrollToGallery}>
            {HERO_CONTENT.ctaPrimary} <IconArrow size={15} />
          </button>
          <Link className="btn-ghost" to="/encomendas">
            {HERO_CONTENT.ctaSecondary}
          </Link>
        </div>
      </div>

      <button className="hero__scroll" onClick={scrollToGallery}>
        <span className="hero__scroll-line" aria-hidden="true" />
        {HERO_CONTENT.scrollLabel}
      </button>
    </section>
  )
}
