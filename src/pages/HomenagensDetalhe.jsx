import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import { useTributeBySlug } from '../hooks/useApi'

// ─── Icons ──────────────────────────────────────────────────────

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

// ─── Video Card ──────────────────────────────────────────────────

function VideoCard({ video }) {
  const [playing, setPlaying] = useState(false)

  if (video.type === 'youtube' && playing) {
    return (
      <div className="hdet-video-card">
        <div className="hdet-video-card__thumb" style={{ padding: 0, background: '#000' }}>
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
            title={video.title}
            allow="autoplay; encrypted-media"
            allowFullScreen
            style={{ border: 0, display: 'block', aspectRatio: '16/9' }}
          />
        </div>
        <div className="hdet-video-card__info">
          <p className="hdet-video-card__title">{video.title}</p>
        </div>
      </div>
    )
  }

  if (video.type === 'video' && playing) {
    return (
      <div className="hdet-video-card">
        <div className="hdet-video-card__thumb hdet-video-card__thumb--video" style={{ padding: 0, background: '#000' }}>
          <video
            controls
            autoPlay
            preload="metadata"
            style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'contain' }}
          >
            <source src={video.src} type="video/mp4" />
            O seu navegador não suporta este vídeo.
          </video>
        </div>
        <div className="hdet-video-card__info">
          <p className="hdet-video-card__title">{video.title}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="hdet-video-card" onClick={() => setPlaying(true)} style={{ cursor: 'pointer' }}>
      <div className={`hdet-video-card__thumb${video.type === 'video' ? ' hdet-video-card__thumb--video' : ''}`}>
        {video.thumb ? (
          <img src={video.thumb} alt={video.title} loading="lazy" />
        ) : (
          <div style={{ width: '100%', aspectRatio: '16/9', background: '#1a1a1a' }} />
        )}
        <div className="hdet-video-card__play"><PlayIcon /></div>
        {video.duration && <span className="hdet-video-card__duration">{video.duration}</span>}
      </div>
      <div className="hdet-video-card__info">
        <p className="hdet-video-card__title">{video.title}</p>
      </div>
    </div>
  )
}

// ─── Lightbox ────────────────────────────────────────────────────

function Lightbox({ images, activeIdx, onClose, onNav }) {
  return (
    <div className="hdet-lightbox" onClick={onClose}>
      <button className="hdet-lightbox__close" onClick={onClose}>✕</button>
      <button
        className="hdet-lightbox__nav hdet-lightbox__nav--l"
        onClick={e => { e.stopPropagation(); onNav(-1) }}
      >
        <ArrowIcon dir="left" />
      </button>
      <div className="hdet-lightbox__inner" onClick={e => e.stopPropagation()}>
        <img src={images[activeIdx].src} alt={images[activeIdx].caption} className="hdet-lightbox__img" />
        <p className="hdet-lightbox__caption">{images[activeIdx].caption}</p>
      </div>
      <button
        className="hdet-lightbox__nav hdet-lightbox__nav--r"
        onClick={e => { e.stopPropagation(); onNav(1) }}
      >
        <ArrowIcon />
      </button>
    </div>
  )
}

// ─── Main Detail Page ────────────────────────────────────────────

export default function HomenagensDetalhe() {
  const { slug } = useParams()
  const { tribute, allTributes, loading, error } = useTributeBySlug(slug)
  const [lightboxIdx, setLightboxIdx] = useState(null)

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '120px 0', color: 'rgba(245,245,245,0.35)' }}>
        A carregar…
      </div>
    )
  }

  if (error || !tribute) {
    return (
      <div className="blog-404">
        <p>Homenagem não encontrada.</p>
        <Link to="/homenagens" className="btn-outline" style={{ marginTop: 24 }}>
          ← Voltar às Homenagens
        </Link>
      </div>
    )
  }

  const tributeIdx  = allTributes.findIndex(t => t.slug === tribute.slug)
  const prevTribute = allTributes[tributeIdx - 1] ?? null
  const nextTribute = allTributes[tributeIdx + 1] ?? null

  const galleryImages = tribute.gallery
  const videos = tribute.videos

  const navLightbox = (dir) =>
    setLightboxIdx(prev => (prev + dir + galleryImages.length) % galleryImages.length)

  return (
    <>
      {/* Lightbox */}
      {lightboxIdx !== null && galleryImages.length > 0 && (
        <Lightbox
          images={galleryImages}
          activeIdx={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
          onNav={navLightbox}
        />
      )}

      {/* Hero */}
      <div className="hdet-hero">
        <img src={tribute.cover} alt={tribute.celebrity.name} className="hdet-hero__img" />
        <div className="hdet-hero__grad" />
        <div className="hdet-hero__back">
          <Link to="/homenagens" className="bpost-back-link">← Homenagens</Link>
        </div>
        <div className="hdet-hero__content">
          <span className="hdet-hero__cat">{tribute.work.category}</span>
          <h1 className="hdet-hero__name">{tribute.celebrity.name}</h1>
          <p className="hdet-hero__role">{tribute.celebrity.role}</p>
        </div>
      </div>

      {/* Article wrapper */}
      <div className="hdet-article">

        {/* Intro */}
        <section className="hdet-intro">
          <div className="hdet-intro__lead">
            <div className="section-label">A Obra</div>
            <h2 className="hdet-intro__title">{tribute.work.title}</h2>
          </div>
          <div className="hdet-intro__body">
            {tribute.work.fullDesc.map((p, i) => (
              <p key={i} className="bpost-p">{p}</p>
            ))}
          </div>
        </section>

        {/* Specs */}
        {Object.keys(tribute.specs).length > 0 && (
          <section className="hdet-specs">
            {Object.entries(tribute.specs).map(([k, v]) => (
              <div key={k} className="hdet-specs__item">
                <span className="hdet-specs__key">{k}</span>
                <span className="hdet-specs__val">{v}</span>
              </div>
            ))}
          </section>
        )}

        {/* Galeria */}
        {galleryImages.length > 0 && (
          <section className="hdet-gallery">
            <div className="section-label">Galeria</div>
            <div className="hdet-gallery__grid">
              {galleryImages.map((img, i) => (
                <button
                  key={img.id}
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
        )}

        {/* Vídeos */}
        {videos.length > 0 && (
          <section className="hdet-videos">
            <div className="section-label">Vídeos</div>
            <div className="hdet-videos__grid">
              {videos.map(v => <VideoCard key={v.id} video={v} />)}
              {/* Placeholder slot */}
              <div className="hdet-video-card hdet-video-card--placeholder">
                <div className="hdet-video-card__thumb hdet-video-card__thumb--empty">
                  <PlayIcon />
                  <span>Em breve</span>
                </div>
                <div className="hdet-video-card__info">
                  <p className="hdet-video-card__title" style={{ color: 'rgba(255,255,255,0.25)' }}>
                    Mais vídeos a caminho
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Bio da celebridade */}
        {tribute.celebrity.bio && (
          <section className="hdet-celeb-bio">
            <div className="section-label">Sobre {tribute.celebrity.name}</div>
            <p className="bpost-p">{tribute.celebrity.bio}</p>
            {tribute.celebrity.instagram && (
              <a
                href={tribute.celebrity.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hdet-celeb-bio__ig"
              >
                <IgIcon />
                Instagram do artista ↗
              </a>
            )}
          </section>
        )}

        {/* CTA Instagram */}
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

        {/* Prev / Next */}
        <nav className="hdet-nav">
          {prevTribute ? (
            <Link to={`/homenagens/${prevTribute.slug}`} className="hdet-nav__item hdet-nav__item--prev">
              <span className="hdet-nav__dir"><ArrowIcon dir="left" /> Anterior</span>
              <span className="hdet-nav__tribute-name">{prevTribute.celebrity.name}</span>
            </Link>
          ) : <div />}
          {nextTribute ? (
            <Link to={`/homenagens/${nextTribute.slug}`} className="hdet-nav__item hdet-nav__item--next">
              <span className="hdet-nav__dir">Seguinte <ArrowIcon /></span>
              <span className="hdet-nav__tribute-name">{nextTribute.celebrity.name}</span>
            </Link>
          ) : <div />}
        </nav>

      </div>
    </>
  )
}
