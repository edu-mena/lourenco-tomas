import { useScrollReveal } from '../hooks'
import { Link } from 'react-router-dom'
import { ABOUT_SECTION } from '../data/ui'
import { IconArrow } from './icons'
import { useSiteContent } from '../content/SiteContent'

function ArtCard({ label, desc, img, filterKey }) {
  return (
    <Link to={`/obras?filter=${filterKey}`} className="art-card">
      <div className="art-card__img-wrap">
        <img src={img} alt="" loading="lazy" className="art-card__img" />
      </div>
      <div className="art-card__body">
        <span className="art-card__label">{label}</span>
        <p className="art-card__desc">{desc}</p>
        <span className="art-card__cta">
          {ABOUT_SECTION.ctaLabel} <IconArrow size={12} />
        </span>
      </div>
    </Link>
  )
}

export default function About() {
  const [imgRef, imgVisible] = useScrollReveal()
  const [textRef, textVisible] = useScrollReveal()
  const [cardsRef, cardsVisible] = useScrollReveal()
  const { about } = useSiteContent()
  // Os cartões têm categorias fixas (ligam à galeria filtrada); só os textos e imagens mudam
  const cards = ABOUT_SECTION.cards.map(c => ({ ...c, ...about.cards.find(x => x.key === c.key) }))

  return (
    <section id="about" className="about" aria-labelledby="about-title">
      <div ref={imgRef} className={`about__visual reveal-left${imgVisible ? ' visible' : ''}`}>
        <div className="about__img-frame">
          <img
            className="about__img"
            src={about.image}
            alt={about.imageAlt}
            loading="lazy"
          />
        </div>
      </div>

      <div ref={textRef} className={`about__text reveal-right${textVisible ? ' visible' : ''}`}>
        <h2 id="about-title" className="about__heading">{about.heading}</h2>
        <p className="about__body">{about.body}</p>
        <Link to="/sobre" className="link-arrow about__more">
          {ABOUT_SECTION.moreLabel} <IconArrow size={14} />
        </Link>

        <div ref={cardsRef} className={`art-cards${cardsVisible ? ' art-cards--visible' : ''}`}>
          {cards.map((a, i) => (
            <div key={a.key} className="art-cards__item" style={{ '--i': i }}>
              <ArtCard label={a.label} desc={a.desc} img={a.img} filterKey={a.key} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}