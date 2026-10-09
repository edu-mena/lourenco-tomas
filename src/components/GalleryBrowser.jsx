import { useState, useRef, useLayoutEffect, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { GALLERY_FILTERS } from '../data/content'
import { CATEGORY_TO_SERVICE } from '../data/ui'
import { useModal, useSwipe } from '../hooks/useModal'
import { SkeletonGrid, ErrorState } from './ui'
import { IconArrow, IconChevron, IconClose, IconWhatsApp } from './icons'

/* ── Filtros com indicador deslizante e contagens ── */
export function GalleryFilters({ items, filter, onChange }) {
  const wrapRef = useRef(null)
  const [pill, setPill] = useState(null)

  const counts = items.reduce((acc, i) => ({ ...acc, [i.cat]: (acc[i.cat] || 0) + 1 }), {})
  const filters = GALLERY_FILTERS.filter(f => f.key === 'all' || counts[f.key])

  useLayoutEffect(() => {
    const measure = () => {
      const btn = wrapRef.current?.querySelector('[aria-pressed="true"]')
      if (btn) setPill({ x: btn.offsetLeft, y: btn.offsetTop, w: btn.offsetWidth, h: btn.offsetHeight })
    }
    measure()
    // No telemóvel os filtros deslizam numa só linha: mantém o activo à vista
    const wrap = wrapRef.current
    const btn = wrap?.querySelector('[aria-pressed="true"]')
    if (btn && wrap.scrollWidth > wrap.clientWidth) {
      wrap.scrollTo({ left: btn.offsetLeft - (wrap.clientWidth - btn.offsetWidth) / 2, behavior: 'smooth' })
    }
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [filter, filters.length])

  return (
    <div ref={wrapRef} className="gallery__filters" role="group" aria-label="Filtrar por categoria">
      {pill && (
        <span className="gallery__filter-pill" aria-hidden="true"
          style={{ transform: `translate(${pill.x}px, ${pill.y}px)`, width: pill.w, height: pill.h }} />
      )}
      {filters.map(f => (
        <button
          key={f.key}
          className={`gallery__filter-btn${filter === f.key ? ' active' : ''}`}
          aria-pressed={filter === f.key}
          onClick={() => onChange(f.key)}
        >
          {f.label}
          <span className="gallery__filter-count">{f.key === 'all' ? items.length : counts[f.key]}</span>
        </button>
      ))}
    </div>
  )
}

/* Masonry em CSS grid: cada obra ocupa tantas linhas de ROW_UNIT px quanto a sua
 * altura. Ao contrário de `columns`, preenche linha a linha (sem buracos no topo)
 * e mantém a ordem do DOM — a navegação por teclado segue a ordem visual. */
const ROW_UNIT = 2
const GAP = 14

function useMasonrySpan() {
  const ref = useRef(null)
  useLayoutEffect(() => {
    const item = ref.current
    const art = item?.firstElementChild
    if (!art) return
    const fit = () => item.style.setProperty('--span', Math.ceil((art.offsetHeight + GAP) / ROW_UNIT))
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(art)
    return () => ro.disconnect()
  }, [])
  return ref
}

/* ── Item da galeria — mostra a obra real, com fade ao carregar ── */
export function GalleryItem({ item, index, onOpen }) {
  const [loaded, setLoaded] = useState(false)
  const ref = useMasonrySpan()
  const label = item.name || item.title

  return (
    <button
      ref={ref}
      type="button"
      className={`gallery__item${loaded || !item.img ? ' is-loaded' : ''}`}
      style={{ '--i': Math.min(index, 10) }}
      onClick={e => onOpen(index, e)}
      aria-label={`Ver ${label}${item.sub ? ` — ${item.sub}` : ''}`}
    >
      <div className="gallery__art" style={!loaded ? { minHeight: item.h } : undefined}>
        {item.img ? (
          <img src={item.img} alt="" loading="lazy" decoding="async" onLoad={() => setLoaded(true)} />
        ) : (
          <div className="gallery__placeholder" style={{ background: item.grad, height: item.h }}>
            <span>{label}</span>
          </div>
        )}
      </div>
      <div className="gallery__overlay" aria-hidden="true">
        <div className="gallery__info">
          <h4>{label}</h4>
          <span>{item.sub}</span>
        </div>
      </div>
    </button>
  )
}

/* ── Lightbox com navegação, swipe e contador ───── */
export function Lightbox({ items, index, origin, onClose, onNav }) {
  const open = index !== null
  // Mantém a última obra durante a animação de fecho
  const [shown, setShown] = useState(index)
  useEffect(() => { if (index !== null) setShown(index) }, [index])

  const prev = () => onNav(-1)
  const next = () => onNav(1)
  const ref = useModal(open, onClose, e => {
    if (e.key === 'ArrowLeft') prev()
    if (e.key === 'ArrowRight') next()
  })
  const swipe = useSwipe(next, prev)

  const item = shown !== null ? items[shown] : null
  const many = items.length > 1
  const service = item && CATEGORY_TO_SERVICE[item.cat]
  const orderHref = item
    ? `/encomendas?${new URLSearchParams({ ...(service && { servico: service }), ref: item.name || item.title })}#formulario`
    : '/encomendas'

  return (
    <div
      ref={ref}
      className={`lightbox${open ? ' open' : ''}`}
      onClick={e => e.target === e.currentTarget && onClose()}
      role="dialog" aria-modal="true" aria-label={item ? item.name || item.title : 'Obra'}
      aria-hidden={!open}
      inert={open ? undefined : ''}
      tabIndex={-1}
      style={origin ? { '--dx': `${origin.x}px`, '--dy': `${origin.y}px` } : undefined}
      {...swipe}
    >
      <button className="lightbox__close" onClick={onClose} aria-label="Fechar"><IconClose /></button>

      {many && (
        <>
          <button className="lightbox__nav lightbox__nav--l" onClick={prev} aria-label="Obra anterior"><IconChevron dir="left" /></button>
          <button className="lightbox__nav lightbox__nav--r" onClick={next} aria-label="Obra seguinte"><IconChevron /></button>
        </>
      )}

      {item && (
        <div className="lightbox__inner">
          <figure className="lightbox__figure" key={item.id}>
            {item.img
              ? <img src={item.img} alt={item.name || item.title} className="lightbox__img" />
              : <div className="lightbox__img lightbox__img--placeholder" style={{ background: item.grad }} />}
          </figure>

          <div className="lightbox__details">
            {many && <span className="lightbox__counter">{String(shown + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</span>}
            <h4>{item.name || item.title}</h4>
            <div className="lightbox__specs">
              {item.size && <span>{item.size}</span>}
              {item.technique && <span>{item.technique}</span>}
            </div>
            <div className="lightbox__actions">
              <Link className="btn-primary btn-primary--sm" to={orderHref} onClick={onClose}>
                Encomendar algo assim <IconArrow size={14} />
              </Link>
              <a className="btn-text" href={item.priceHref} target="_blank" rel="noopener noreferrer">
                <IconWhatsApp size={15} /> Perguntar o preço
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/* ── Galeria completa: filtros + grelha + lightbox ── */
export default function GalleryBrowser({ items, loading, error, onRetry, filter, onFilterChange, limit }) {
  const [openIdx, setOpenIdx] = useState(null)
  const [origin, setOrigin] = useState(null)

  const filtered = filter === 'all' ? items : items.filter(i => i.cat === filter)
  const visible = limit ? filtered.slice(0, limit) : filtered

  const open = (i, e) => {
    // A obra "cresce" a partir do ponto onde se clicou
    const r = e.currentTarget.getBoundingClientRect()
    setOrigin({ x: r.left + r.width / 2 - window.innerWidth / 2, y: r.top + r.height / 2 - window.innerHeight / 2 })
    setOpenIdx(i)
  }
  const nav = dir => setOpenIdx(i => (i + dir + visible.length) % visible.length)

  if (error) return <ErrorState message="Não foi possível carregar as obras." onRetry={onRetry} />

  return (
    <>
      {!loading && items.length > 0 && (
        <GalleryFilters items={items} filter={filter} onChange={onFilterChange} />
      )}

      {loading ? (
        <SkeletonGrid count={limit || 9} />
      ) : visible.length === 0 ? (
        <div className="state-msg"><p>Ainda não há obras nesta categoria.</p></div>
      ) : (
        <div className="gallery__grid" key={filter}>
          {visible.map((item, i) => (
            <GalleryItem key={item.id} item={item} index={i} onOpen={open} />
          ))}
        </div>
      )}

      <Lightbox items={visible} index={openIdx} origin={origin} onClose={() => setOpenIdx(null)} onNav={nav} />
    </>
  )
}
