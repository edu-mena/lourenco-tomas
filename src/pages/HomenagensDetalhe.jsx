import { useParams, Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { TRIBUTES } from './Homenagens'

function ArrowIcon({ dir = 'right' }) {
  return (
    <svg
      viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
      width="16" height="16"
      style={{ transform: dir === 'left' ? 'rotate(180deg)' : 'none' }}
    >
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12 5 19 12 12 19"/>
    </svg>
  )
}

function IgIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18">
      <rect x="2" y="2" width="20" height="20" rx="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/>
    </svg>
  )
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22">
      <circle cx="12" cy="12" r="10"/>
      <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none"/>
    </svg>
  )
}

/* ── Placeholder sections ─────────────────────────── */

// Simulates a detail data structure — replace with real data when available
function getDetailData(tribute) {
  return {
    ...tribute,
    fullDesc: [
      `${tribute.desc} O processo demorou mais de 12 horas e foi documentado em vídeo do início ao fim. A entrega aconteceu pessoalmente, num momento que ficou para a história.`,
      'Foram usadas mais de 20 tonalidades diferentes para capturar a profundidade do olhar e a força da expressão. Cada camada de tinta foi aplicada com precisão milimétrica, respeitando a anatomia do rosto e a luz natural do modelo.',
      'O momento da entrega foi filmado e partilhado no Instagram, gerando milhares de reacções em poucas horas — um testemunho do impacto que a arte pode ter quando feita com intenção e respeito.',
    ],
    process: [
      { step: '01', title: 'Referência & Esboço', desc: 'Selecção criteriosa de fotografias de referência de alta resolução. Estudo das proporções, luz e expressão. Esboço a lápis para mapear as grandes formas antes de tocar a tela.' },
      { step: '02', title: 'Base em Acrílico', desc: 'Aplicação da base monocromática em acrílico para definir os volumes principais, os contrastes de luz e sombra que vão guiar toda a aerografia posterior.' },
      { step: '03', title: 'Aerografia em Camadas', desc: 'Trabalho progressivo em aerografia — das sombras mais profundas às luzes mais delicadas. Cada sessão de 2 a 3 horas, com períodos de secagem controlada entre camadas.' },
      { step: '04', title: 'Detalhes & Acabamento', desc: 'Refinamento dos detalhes finais: brilho nos olhos, textura da pele, cabelo fio a fio. Verniz de protecção UV para garantir durabilidade ao longo dos anos.' },
    ],
    // Placeholder gallery — replace src with real image paths
    gallery: [
      { src: tribute.img, caption: 'Obra finalizada', type: 'image' },
      { src: tribute.img, caption: 'Detalhe do rosto', type: 'image' },
      { src: tribute.img, caption: 'Processo intermédio', type: 'image' },
      { src: tribute.img, caption: 'Entrega ao artista', type: 'image' },
      { src: tribute.img, caption: 'Estúdio — aerografia', type: 'image' },
      { src: tribute.img, caption: 'Pormenor do acabamento', type: 'image' },
    ],
    // Placeholder videos — replace with real video IDs or paths
    videos: [
      { id: 'placeholder-1', thumb: tribute.img, title: 'Processo completo — time-lapse', duration: '2:34' },
      { id: 'placeholder-2', thumb: tribute.img, title: 'Momento da entrega', duration: '1:12' },
    ],
    specs: {
      técnica: 'Aerografia + Acrílico',
      suporte: 'Tela de algodão 300g',
      dimensões: '60 × 80 cm',
      duração: '12+ horas',
      ano: '2024',
    },
  }
}

/* ── Lightbox ─────────────────────────────────────── */
function Lightbox({ images, activeIdx, onClose, onNav }) {
  return (
    <div className="hdet-lightbox" onClick={onClose}>
      <button className="hdet-lightbox__close" onClick={onClose}>✕</button>
      <button className="hdet-lightbox__nav hdet-lightbox__nav--l" onClick={e => { e.stopPropagation(); onNav(-1) }}>
        <ArrowIcon dir="left" />
      </button>
      <div className="hdet-lightbox__inner" onClick={e => e.stopPropagation()}>
        <img src={images[activeIdx].src} alt={images[activeIdx].caption} className="hdet-lightbox__img" />
        <p className="hdet-lightbox__caption">{images[activeIdx].caption}</p>
      </div>
      <button className="hdet-lightbox__nav hdet-lightbox__nav--r" onClick={e => { e.stopPropagation(); onNav(1) }}>
        <ArrowIcon />
      </button>
    </div>
  )
}

/* ── Main Detail Page ─────────────────────────────── */
export default function HomenagensDetalhe() {
  const { slug } = useParams()
  const navigate  = useNavigate()
  const tribute   = TRIBUTES.find(t => t.slug === slug)

  const [lightboxIdx, setLightboxIdx] = useState(null)

  if (!tribute) {
    return (
      <div className="blog-404">
        <p>Homenagem não encontrada.</p>
        <Link to="/homenagens" className="btn-outline" style={{ marginTop: 24 }}>
          ← Voltar às Homenagens
        </Link>
      </div>
    )
  }

  const data = getDetailData(tribute)

  const prevTribute = TRIBUTES[TRIBUTES.indexOf(tribute) - 1] ?? null
  const nextTribute = TRIBUTES[TRIBUTES.indexOf(tribute) + 1] ?? null

  const navLightbox = (dir) => {
    setLightboxIdx(prev => (prev + dir + data.gallery.length) % data.gallery.length)
  }

  return (
    <>
      {/* Lightbox */}
      {lightboxIdx !== null && (
        <Lightbox
          images={data.gallery}
          activeIdx={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
          onNav={navLightbox}
        />
      )}

      {/* ── Hero ─────────────────────────────────── */}
      <div className="hdet-hero">
        <img src={tribute.img} alt={tribute.celebrity} className="hdet-hero__img" />
        <div className="hdet-hero__grad" />
        <div className="hdet-hero__back">
          <Link to="/homenagens" className="bpost-back-link">← Homenagens</Link>
        </div>
        <div className="hdet-hero__content">
          <span className="hdet-hero__cat">{tribute.category}</span>
          <h1 className="hdet-hero__name">{tribute.celebrity}</h1>
          <p className="hdet-hero__role">{tribute.role}</p>
        </div>
      </div>

      {/* ── Article wrapper ──────────────────────── */}
      <div className="hdet-article">

        {/* ── Intro ────────────────────────────── */}
        <section className="hdet-intro">
          <div className="hdet-intro__lead">
            <div className="section-label">A Obra</div>
            <h2 className="hdet-intro__title">{tribute.title}</h2>
          </div>
          <div className="hdet-intro__body">
            {data.fullDesc.map((p, i) => (
              <p key={i} className="bpost-p">{p}</p>
            ))}
          </div>
        </section>

        {/* ── Specs ────────────────────────────── */}
        <section className="hdet-specs">
          {Object.entries(data.specs).map(([k, v]) => (
            <div key={k} className="hdet-specs__item">
              <span className="hdet-specs__key">{k}</span>
              <span className="hdet-specs__val">{v}</span>
            </div>
          ))}
        </section>

        {/* ── Process ──────────────────────────── */}
        <section className="hdet-process">
          <div className="section-label">Processo Criativo</div>
          <div className="hdet-process__grid">
            {data.process.map((step) => (
              <div key={step.step} className="hdet-process__step">
                <span className="hdet-process__num">{step.step}</span>
                <h3 className="hdet-process__step-title">{step.title}</h3>
                <p className="hdet-process__step-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Gallery ──────────────────────────── */}
        <section className="hdet-gallery">
          <div className="section-label">Galeria</div>
          <div className="hdet-gallery__grid">
            {data.gallery.map((img, i) => (
              <button
                key={i}
                className="hdet-gallery__item"
                onClick={() => setLightboxIdx(i)}
                aria-label={`Abrir ${img.caption}`}
              >
                <img src={img.src} alt={img.caption} loading="lazy" />
                <div className="hdet-gallery__overlay">
                  <span className="hdet-gallery__caption">{img.caption}</span>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* ── Videos ───────────────────────────── */}
        <section className="hdet-videos">
          <div className="section-label">Vídeos</div>
          <div className="hdet-videos__grid">
            {data.videos.map((v, i) => (
              <div key={i} className="hdet-video-card">
                <div className="hdet-video-card__thumb">
                  <img src={v.thumb} alt={v.title} loading="lazy" />
                  <div className="hdet-video-card__play">
                    <PlayIcon />
                  </div>
                  <span className="hdet-video-card__duration">{v.duration}</span>
                </div>
                <div className="hdet-video-card__info">
                  <p className="hdet-video-card__title">{v.title}</p>
                </div>
              </div>
            ))}
            {/* Placeholder slot for more videos */}
            <div className="hdet-video-card hdet-video-card--placeholder">
              <div className="hdet-video-card__thumb hdet-video-card__thumb--empty">
                <PlayIcon />
                <span>Em breve</span>
              </div>
              <div className="hdet-video-card__info">
                <p className="hdet-video-card__title" style={{ color: 'rgba(255,255,255,0.25)' }}>Mais vídeos a caminho</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA Instagram ─────────────────────── */}
        <section className="hdet-ig-cta">
          <div className="hdet-ig-cta__inner">
            <div className="section-label">Acompanhe</div>
            <h2 className="hdet-ig-cta__title">Veja o processo<br /><span>no Instagram</span></h2>
            <p className="hdet-ig-cta__desc">
              Os bastidores, o processo criativo e os momentos de entrega são partilhados em tempo real.
            </p>
            <a
              href={tribute.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <IgIcon />
              @lourenco.tomas.art
            </a>
          </div>
        </section>

        {/* ── Prev / Next navigation ────────────── */}
        <nav className="hdet-nav">
          {prevTribute ? (
            <Link to={`/homenagens/${prevTribute.slug}`} className="hdet-nav__item hdet-nav__item--prev">
              <span className="hdet-nav__dir"><ArrowIcon dir="left" /> Anterior</span>
              <span className="hdet-nav__tribute-name">{prevTribute.celebrity}</span>
            </Link>
          ) : <div />}
          {nextTribute ? (
            <Link to={`/homenagens/${nextTribute.slug}`} className="hdet-nav__item hdet-nav__item--next">
              <span className="hdet-nav__dir">Seguinte <ArrowIcon /></span>
              <span className="hdet-nav__tribute-name">{nextTribute.celebrity}</span>
            </Link>
          ) : <div />}
        </nav>

      </div>
    </>
  )
}