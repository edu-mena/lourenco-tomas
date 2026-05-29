import { useScrollReveal } from '../hooks'
import { Link } from 'react-router-dom'

const ARTS = [
  { key: 'tshirts',  label: 'T-Shirts', desc: 'Aerografia sobre tecido — cada peça única e irrepetível.', img: '/images/about/arte1.jpeg' },
  { key: 'murais',   label: 'Murais',   desc: 'Pinturas que transformam espaços e comunidades urbanas.', img: '/images/about/arte2.png' },
  { key: 'telas',    label: 'Telas',    desc: 'Retratos e composições com técnica e sensibilidade únicas.', img: '/images/about/arte3.png' },
  { key: 'calcados', label: 'Calçados', desc: 'Customização exclusiva com a identidade do cliente.', img: '/images/about/arte4.jpeg' },
]

function ArtCard({ label, desc, img, filterKey }) {
  return (
    <Link to={`/portfolio?filter=${filterKey}`} className="art-card">
      <div className="art-card__img-wrap">
        <img src={img} alt={label} loading="lazy" className="art-card__img" />
      </div>
      <div className="art-card__body">
        <span className="art-card__label">{label}</span>
        <p className="art-card__desc">{desc}</p>
        <span className="art-card__cta">
          Ver obras
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" width="12" height="12">
            <path d="M3 8h10M9 4l4 4-4 4"/>
          </svg>
        </span>
      </div>
    </Link>
  )
}

export default function About() {
  const [imgRef, imgVisible] = useScrollReveal()
  const [textRef, textVisible] = useScrollReveal()
  const [cardsRef, cardsVisible] = useScrollReveal()

  return (
    <section id="about" className="about" aria-label="Sobre o Artista">
      <div ref={imgRef} className={`about__visual reveal-left${imgVisible ? ' visible' : ''}`}>
        <div className="about__img-frame">
          <img
            className="about__img"
            src="/images/about/santuario1.jpeg"
            alt="Arte — Lourenço Tomas"
            loading="lazy"
          />
        </div>
      </div>

      <div ref={textRef} className={`about__text reveal-right${textVisible ? ' visible' : ''}`}>
        <div className="section-label">Sobre o Artista</div>

        <p className="about__body">
          Especialista em aerografia, diversas técnicas de estamparia em roupas, customização
          de calçados e acessórios. Com mais de 30 anos de experiência, transforma a peça de
          roupa numa verdadeira obra de arte.
        </p>

        <div ref={cardsRef} className={`art-cards${cardsVisible ? ' art-cards--visible' : ''}`}>
          {ARTS.map((a, i) => (
            <div key={a.key} className="art-cards__item" style={{ '--i': i }}>
              <ArtCard {...a} filterKey={a.key} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}