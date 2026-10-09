import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { HERO_CONTENT } from '../data/ui'
import { IconArrow } from './icons'
import { usePageTitle } from '../hooks'
import { useSiteContent } from '../content/SiteContent'

export default function Hero() {
  usePageTitle(null)
  const { hero, ready } = useSiteContent()
  const scrollToGallery = () => {
    document.querySelector('#gallery')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="hero" data-spray>
      {/* Espera pelos textos do admin (no máximo ~1s) para não trocar o título à vista */}
      {ready && <img className="hero__img" src={hero.image} alt={hero.imageAlt} fetchpriority="high" decoding="async" />}
      <div className="hero__overlay" />

      {ready && (
        <div className="hero__content">
          <h1 className="hero__title">
            {hero.title.map((line, index) => (
              <Fragment key={index}>
                {line}
                {index < hero.title.length - 1 && <br />}
              </Fragment>
            ))}
          </h1>

          <div className="hero__cta-wrap">
            <button className="btn-primary" onClick={scrollToGallery}>
              {hero.ctaPrimary} <IconArrow size={15} />
            </button>
            <Link className="btn-ghost" to="/encomendas">
              {hero.ctaSecondary}
            </Link>
          </div>
        </div>
      )}

      <button className="hero__scroll" onClick={scrollToGallery}>
        <span className="hero__scroll-line" aria-hidden="true" />
        {HERO_CONTENT.scrollLabel}
      </button>
    </section>
  )
}
