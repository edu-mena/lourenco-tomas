import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useScrollReveal } from '../hooks'
import TributeStories from '../components/TributeStories'

function IgIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 18, height: 18 }}>
      <rect x="2" y="2" width="20" height="20" rx="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/>
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

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="16" height="16">
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12 5 19 12 12 19"/>
    </svg>
  )
}

export const TRIBUTES = [
  {
    id: 1,
    slug: 'anselmo-ralph',
    celebrity: 'Anselmo Ralph',
    role: 'Músico · Kizomba',
    category: 'Música',
    title: 'Retrato Realista em Aerografia',
    desc: 'Uma homenagem de alma ao maior nome da kizomba angolana. O retrato foi executado em aerografia sobre tela de 60×80cm, com um nível de detalhe quase fotográfico — cada expressão, cada sombra construída gota a gota de tinta.',
    img: '/images/about/santuario1.jpeg',
    instagram: 'https://instagram.com/lourenco.tomas.art',
    featured: true,
  },
  {
    id: 2,
    slug: 'c4-pedro',
    celebrity: 'C4 Pedro',
    role: 'Músico · Semba',
    category: 'Música',
    title: 'Aerografia sobre Tela 80×100cm',
    desc: 'O rosto do semba moderno imortalizado numa tela de grandes dimensões. Esta obra nasceu do desejo de celebrar a voz que deu nova vida à música tradicional angolana.',
    img: '/images/about/arte1.jpeg',
    instagram: 'https://instagram.com/lourenco.tomas.art',
    featured: true,
  },
  {
    id: 3,
    slug: 'matias-damasio',
    celebrity: 'Matias Damásio',
    role: 'Músico · Afrobeat',
    category: 'Música',
    title: 'T-Shirt Exclusiva com Retrato',
    desc: 'Uma peça de vestuário elevada a obra de arte. A T-shirt foi pintada à mão com aerografia de alta precisão, reproduzindo o rosto do artista com detalhe e emoção.',
    img: '/images/about/arte2.png',
    instagram: 'https://instagram.com/lourenco.tomas.art',
    featured: true,
  },
  {
    id: 4,
    slug: 'yola-araujo',
    celebrity: 'Yola Araújo',
    role: 'Actriz · Cinema',
    category: 'Cinema',
    title: 'Tela em Técnica Mista',
    desc: 'Retrato da actriz e empresária angolana em técnica mista — aerografia combinada com pintura acrílica e elementos texturizados.',
    img: '/images/about/arte3.png',
    instagram: 'https://instagram.com/lourenco.tomas.art',
    featured: true,
  },
  {
    id: 5,
    slug: 'paulo-flores',
    celebrity: 'Paulo Flores',
    role: 'Músico · Semba',
    category: 'Música',
    title: 'Sapatilhas Custom Edition',
    desc: 'Um par de sapatilhas transformado em escultura vestível. O retrato do cantor foi pintado em aerografia sobre couro, com protecção em verniz UV.',
    img: '/images/about/arte4.jpeg',
    instagram: 'https://instagram.com/lourenco.tomas.art',
    featured: true,
  },
]

/* ── Story Modal Overlay ──────────────────────────── */
function StoryModal({ tributes, activeIdx, onIdxChange, onClose }) {
  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div className="story-modal" onClick={onClose}>
      <button className="story-modal__close" onClick={onClose} aria-label="Fechar">
        <CloseIcon />
      </button>
      {/* Stop click propagation so clicking the inner content doesn't close */}
      <div className="story-modal__inner" onClick={e => e.stopPropagation()}>
        <TributeStories
          tributes={tributes}
          activeIdx={activeIdx}
          onIdxChange={onIdxChange}
        />
      </div>
    </div>
  )
}

/* ── Main Page ────────────────────────────────────── */
export default function Homenagens() {
  const [gridRef, gridVisible] = useScrollReveal()
  const [ctaRef, ctaVisible] = useScrollReveal()
  const [storyOpen, setStoryOpen] = useState(false)
  const [storyIdx, setStoryIdx] = useState(0)

  const openStory = (i) => {
    setStoryIdx(i)
    setStoryOpen(true)
  }

  const featured = TRIBUTES.filter(t => t.featured)
  const regular  = TRIBUTES.filter(t => !t.featured)

  return (
    <>
      {/* ── Story Modal ─────────────────────────────── */}
      {storyOpen && (
        <StoryModal
          tributes={TRIBUTES}
          activeIdx={storyIdx}
          onIdxChange={setStoryIdx}
          onClose={() => setStoryOpen(false)}
        />
      )}

      {/* ── Page Hero ───────────────────────────────── */}
      <div className="page-hero">
        <p className="page-hero__breadcrumb">
          <Link to="/">Início</Link> / Homenagens
        </p>
        <h1 className="page-hero__title">Home<br/>nagens</h1>
        <p className="page-hero__sub">
          Arte como forma de reconhecimento — retratos e obras dedicadas a celebridades angolanas, do esboço à entrega em mãos.
        </p>
        <div className="page-hero__deco">HON</div>
      </div>

      {/* ── Destaques (featured — circular avatars) ─────── */}
      <section className="hom-featured-section">
        <div className="hom-featured-header">
          <div className="section-label">Destaques</div>
        </div>
        <div className="hom-featured-grid">
          {featured.map((t, i) => (
            <button
              key={t.id}
              className="hom-avatar-card"
              style={{ '--i': i }}
              onClick={() => openStory(TRIBUTES.indexOf(t))}
              aria-label={`Ver story de ${t.celebrity}`}
            >
              {/* Circular image with gradient ring */}
              <div className="hom-avatar-card__ring">
                <div className="hom-avatar-card__img-wrap">
                  <img src={t.img} alt={t.celebrity} loading="lazy" />
                </div>
              </div>
              {/* Category + Name */}
              <span className="hom-avatar-card__cat">{t.category}</span>
              <span className="hom-avatar-card__name">{t.celebrity}</span>
            </button>
          ))}
        </div>
      </section>

      {/* ── Full Grid ────────────────────────────────── */}
      <section className="hom-grid-section">
        <div className="hom-grid-header">
          <div className="section-label">Todas as Homenagens</div>
          <p className="hom-grid-sub">
            Clique no ícone de story para ver o processo em formato Stories, ou na obra para ver o detalhe completo.
          </p>
        </div>

        <div
          ref={gridRef}
          className={`hom-grid hom-grid--new${gridVisible ? ' hom-grid--visible' : ''}`}
        >
          {TRIBUTES.map((t, i) => (
            <div
              key={t.id}
              className="hom-card"
              style={{ '--i': i }}
            >
              {/* Thumbnail */}
              <div className="hom-card__thumb-wrap">
                <img src={t.img} alt={t.celebrity} loading="lazy" className="hom-card__thumb" />
                {/* Story button overlaid on image */}
                <button
                  className="hom-card__story-btn"
                  onClick={() => openStory(i)}
                  aria-label={`Ver story de ${t.celebrity}`}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="16" height="16">
                    <circle cx="12" cy="12" r="10"/>
                    <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none"/>
                  </svg>
                  Story
                </button>
              </div>

              {/* Body */}
              <div className="hom-card__body">
                <span className="hom-card__cat">{t.category}</span>
                <h3 className="hom-card__name">{t.celebrity}</h3>
                <p className="hom-card__role">{t.role}</p>
                <p className="hom-card__work">{t.title}</p>
                <Link to={`/homenagens/${t.slug}`} className="hom-card__link">
                  Ver detalhe <ArrowIcon />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Instagram CTA ────────────────────────────── */}
      <section
        ref={ctaRef}
        className={`hom-cta reveal${ctaVisible ? ' visible' : ''}`}
      >
        <div className="hom-cta__inner">
          <div className="section-label">Acompanhe</div>
          <h2 className="hom-cta__title">Todo o processo<br /><span>no Instagram</span></h2>
          <p className="hom-cta__desc">
            Os bastidores, o processo criativo e os momentos de entrega são partilhados em tempo real. Siga para não perder nenhuma homenagem.
          </p>
          <a
            href="https://instagram.com/lourenco.tomas.art"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <IgIcon />
            @lourenco.tomas.art
          </a>
        </div>
      </section>
    </>
  )
}