import { useState, useRef, useCallback } from 'react'
import { useScrollReveal, useMediaQuery, useHScroll } from '../hooks'
import { useVideos } from '../hooks/useApi'
import { useModal } from '../hooks/useModal'
import { PROCESS_SECTION } from '../data/ui'
import { IconClose, IconPlay, IconChevron } from './icons'

/* Os vídeos são reels verticais: a miniatura usa um fotograma a meio segundo
   (o primeiro costuma ser preto) */
const THUMB_T = 0.5

function VideoCard({ video, onOpen, canPreview }) {
  const ref = useRef(null)
  // Em dispositivos com rato, o vídeo começa a tocar (sem som) ao passar por cima
  const preview = play => {
    const v = ref.current
    if (!canPreview || !v) return
    if (play) v.play().catch(() => {})
    else { v.pause(); v.currentTime = THUMB_T }
  }

  return (
    <button
      type="button"
      className="video-card"
      onClick={() => onOpen(video)}
      onMouseEnter={() => preview(true)}
      onMouseLeave={() => preview(false)}
      aria-label={`Ver vídeo: ${video.title}`}
    >
      <video ref={ref} className="video-card__thumb" preload="metadata" muted loop playsInline src={`${video.src}#t=${THUMB_T}`} tabIndex={-1} />
      <span className="video-card__play" aria-hidden="true"><span className="video-card__play-icon"><IconPlay size={18} /></span></span>
      <span className="video-card__info">
        {video.label && <span className="video-card__label">{video.label}</span>}
        <span className="video-card__title">{video.title}</span>
      </span>
    </button>
  )
}

function VideoModal({ video, onClose }) {
  const ref = useModal(!!video, onClose)
  if (!video) return null
  return (
    <div ref={ref} className="video-modal" role="dialog" aria-modal="true" aria-label={video.title}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="video-modal__inner">
        <button className="video-modal__close" onClick={onClose} aria-label="Fechar vídeo"><IconClose /></button>
        <video className="video-modal__video" src={video.src} autoPlay controls playsInline />
        <p className="video-modal__title">{video.title}</p>
      </div>
    </div>
  )
}

export default function Process() {
  const [headerRef, headerVisible] = useScrollReveal()
  const [gridRef, gridVisible] = useScrollReveal()
  const rail = useHScroll()
  const setGrid = useCallback(el => { gridRef(el); rail.ref(el) }, [gridRef, rail.ref])
  const [selectedVideo, setSelectedVideo] = useState(null)
  const canPreview = useMediaQuery('(hover: hover) and (pointer: fine)')
  const { videos: rawVideos } = useVideos()
  const videos = [...rawVideos].sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))

  if (!videos.length) return null

  return (
    <section id="process" className="process" aria-labelledby="process-title">
      <div className="process__inner">
        <div ref={headerRef} className={`process__header reveal${headerVisible ? ' visible' : ''}`}>
          <div>
            <h2 id="process-title" className="section-title-display">{PROCESS_SECTION.title}</h2>
          </div>
          <div className="process__aside">
            <p className="process__intro">{PROCESS_SECTION.intro}</p>
            {(rail.prev || rail.next) && (
              <div className="rail-nav">
                <button type="button" className="rail-nav__btn" onClick={() => rail.scroll(-1)} disabled={!rail.prev} aria-label="Vídeos anteriores">
                  <IconChevron size={18} dir="left" />
                </button>
                <button type="button" className="rail-nav__btn" onClick={() => rail.scroll(1)} disabled={!rail.next} aria-label="Vídeos seguintes">
                  <IconChevron size={18} />
                </button>
              </div>
            )}
          </div>
        </div>

        <div ref={setGrid} className={`process__grid reveal${gridVisible ? ' visible' : ''}`}>
          {videos.map(v => (
            <VideoCard key={v.id} video={v} onOpen={setSelectedVideo} canPreview={canPreview} />
          ))}
        </div>
      </div>

      <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
    </section>
  )
}
