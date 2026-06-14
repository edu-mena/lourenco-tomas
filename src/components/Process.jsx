import { useState } from 'react'
import { useScrollReveal } from '../hooks'
import { useVideos } from '../hooks/useApi'
import { PROCESS_SECTION } from '../data/ui'

export default function Process() {
  const [headerRef, headerVisible] = useScrollReveal()
  const [gridRef, gridVisible] = useScrollReveal()
  const [selectedVideo, setSelectedVideo] = useState(null)
  const { videos: rawVideos } = useVideos()
  const videos = [...rawVideos].sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))

  const handlePlayClick = (video) => {
    setSelectedVideo(video)
  }

  const handleCloseVideo = () => {
    setSelectedVideo(null)
  }

  return (
    <section id="process" className="process" aria-label="Processo Criativo">
      <div className="process__inner">
        <div
          ref={headerRef}
          className={`process__header reveal${headerVisible ? ' visible' : ''}`}
        >
          <div>
            <div className="section-label">{PROCESS_SECTION.label}</div>
            <h2 className="section-title-display">{PROCESS_SECTION.title.split('\n').map((line, index) => (
              <span key={index}>
                {line}
                {index < PROCESS_SECTION.title.split('\n').length - 1 && <br />}
              </span>
            ))}</h2>
          </div>
          <p className="process__intro">
            {PROCESS_SECTION.intro}
          </p>
        </div>

        <div
          ref={gridRef}
          className={`process__grid reveal${gridVisible ? ' visible' : ''}`}
          style={{ transitionDelay: '0.15s' }}
        >
          {videos.map(v => (
            <div
              key={v.id}
              className={`video-card${v.featured ? ' video-card--featured' : ''}`}
              onClick={() => handlePlayClick(v)}
              style={{ cursor: 'pointer', height: '100%' }}
            >
              <video
                className="video-card__thumb"
                preload="metadata"
                muted
              >
                <source src={v.src} type="video/mp4" />
              </video>
              <div className="video-card__play">
                <div className="video-card__play-icon" />
              </div>
              <div className="video-card__info">
                <div className="video-card__label">{v.label}</div>
                <div className="video-card__title">{v.title}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Video Modal */}
        {selectedVideo && (
          <div 
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.95)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 2000,
              backdropFilter: 'blur(8px)',
            }}
            onClick={handleCloseVideo}
          >
            <div 
              style={{
                position: 'relative',
                width: '90%',
                maxWidth: '900px',
                maxHeight: '90vh',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleCloseVideo}
                style={{
                  position: 'absolute',
                  top: '-44px',
                  right: '0',
                  background: 'none',
                  border: 'none',
                  color: 'rgba(255,255,255,0.8)',
                  fontSize: '28px',
                  cursor: 'pointer',
                  transition: 'color 0.25s',
                  zIndex: 2001,
                }}
                onMouseEnter={(e) => e.target.style.color = 'white'}
                onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.8)'}
              >
                ✕
              </button>
              <video
                autoPlay
                controls
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '80vh',
                  borderRadius: '8px',
                }}
              >
                <source src={selectedVideo.src} type="video/mp4" />
              </video>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
