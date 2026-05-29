import { Link } from 'react-router-dom'
import { useScrollReveal } from '../hooks'
import { ARTIST_PHOTO } from '../data/photo'
import { TIMELINE } from '../data/content'

const PILLARS = [
  { icon: '◈', title: 'Retratos Realistas', desc: 'A captação da alma humana com precisão cirúrgica e profunda sensibilidade emocional. Cada traço conta uma história.' },
  { icon: '◉', title: 'Arte Experimental', desc: 'A fusão entre técnica aerográfica e expressão livre — camadas de tinta que dialogam com a espontaneidade e o acaso.' },
  { icon: '◫', title: 'Arte Urbana', desc: 'Murais que transformam paredes cinzentas em obras vivas, trazendo identidade e cor aos espaços de Luanda e além.' },
  { icon: '◬', title: 'Personalização', desc: 'Cada encomenda nasce de uma conversa. O cliente traz uma ideia, o artista transforma-a numa peça única e irrepetível.' },
]

const STATS = [
  { num: '10+', label: 'Anos de Arte' },
  { num: '200+', label: 'Peças Criadas' },
  { num: '50+', label: 'Clientes Satisfeitos' },
]

export default function Sobre() {
  const [imgRef, imgVisible] = useScrollReveal()
  const [textRef, textVisible] = useScrollReveal()
  const [pillarsRef, pillarsVisible] = useScrollReveal()
  const [timelineRef, timelineVisible] = useScrollReveal()
  const [statsRef, statsVisible] = useScrollReveal()
  const [ctaRef, ctaVisible] = useScrollReveal()

  return (
    <>
      {/* ── Page Hero ─────────────────────────────── */}
      <div className="page-hero">
        <div className="page-hero__breadcrumb">
          <Link to="/">Início</Link>
          <span> / Obras</span>
        </div>
        <h1 className="page-hero__title">LOURENÇO<br/>TOMAS</h1>
        <p className="page-hero__sub">
          Artista plástico angolano · Aerografia & Arte · Luanda, Angola
        </p>
        <div className="page-hero__deco" aria-hidden>ARTE</div>
      </div>

      {/* ── Bio ───────────────────────────────────── */}
      <section className="sobre-bio">
        <div ref={imgRef} className={`sobre-bio__visual reveal-left${imgVisible ? ' visible' : ''}`}>
          <div className="about__img-frame">
            <img
              className="about__img"
              src={ARTIST_PHOTO}
              alt="Lourenço Tomas — Artista Plástico"
              loading="lazy"
            />
          </div>
          <div className="about__badge">
            <span className="about__badge-num">10+</span>
            <span className="about__badge-text">Anos de<br/>Arte</span>
          </div>
        </div>

        <div ref={textRef} className={`sobre-bio__text reveal-right${textVisible ? ' visible' : ''}`}>
          <div className="section-label">Biografia</div>
          <h2 className="sobre-heading">
            Arte que nasce<br/>do <em>movimento</em><br/>e da emoção
          </h2>
          <p className="sobre-body">
            Lourenço Tomas é um artista plástico angolano cuja obra transcende os limites da arte convencional.
            Natural de Luanda, cresceu rodeado pela vibrante cultura visual da cidade — uma mistura de influências
            africanas, portuguesas e do street art global que moldaram a sua visão artística desde cedo.
          </p>
          <p className="sobre-body">
            Com a aerografia como linguagem principal, ele constrói universos visuais que dialogam com a identidade
            africana, a energia urbana de Luanda e a profundidade emocional do ser humano. A técnica — dominada ao
            longo de mais de uma década de prática intensa — permite-lhe criar gradientes impossíveis, retratos de
            uma vivacidade quase fotográfica e composições abstractas de rara beleza.
          </p>
          <p className="sobre-body">
            Cada obra é uma conversa entre o artista e a superfície — seja uma tela, uma t-shirt, um mural ou um
            par de sapatilhas. A tinta flui, revela e esconde, criando camadas de realidade e imaginação que
            convidam o observador a uma experiência sensorial única.
          </p>
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────── */}
      <div ref={statsRef} className={`sobre-stats reveal${statsVisible ? ' visible' : ''}`}>
        {STATS.map(s => (
          <div key={s.label} className="sobre-stat">
            <div className="sobre-stat__num">{s.num}</div>
            <div className="sobre-stat__label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── Valores ───────────────────────────────── */}
      <section className="sobre-values">
        <div ref={pillarsRef} className={`reveal${pillarsVisible ? ' visible' : ''}`}>
          <div className="section-label">Filosofia</div>
          <h2 className="section-title-display" style={{ marginBottom: '56px' }}>VALORES</h2>
          <div className="sobre-values__grid">
            {PILLARS.map((p, i) => (
              <div
                key={p.title}
                className="sobre-pillar"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="sobre-pillar__icon">{p.icon}</div>
                <div className="sobre-pillar__title">{p.title}</div>
                <p className="sobre-pillar__desc">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ──────────────────────────────── */}
      <section className="sobre-timeline-section">
        <div ref={timelineRef} className={`reveal${timelineVisible ? ' visible' : ''}`}>
          <div className="section-label">Percurso</div>
          <h2 className="section-title-display" style={{ marginBottom: '56px' }}>HISTÓRIA</h2>
          <div className="timeline">
            {TIMELINE.map(t => (
              <div key={t.year} className="timeline__item">
                <div className="timeline__year">{t.year}</div>
                <div className="timeline__event">{t.event}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────── */}
      <section className="page-cta" ref={ctaRef}>
        <div className={`page-cta__inner reveal${ctaVisible ? ' visible' : ''}`}>
          <div className="section-label">Colaboração</div>
          <h2 className="page-cta__title">Vamos criar juntos</h2>
          <p>Uma obra feita à tua medida, com a alma do artista em cada traço.</p>
          <div className="page-cta__btns">
            <Link to="/encomendas" className="btn-primary">
              Encomendar
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" width="16" height="16">
                <path d="M3 8h10M9 4l4 4-4 4"/>
              </svg>
            </Link>
            <Link to="/portfolio" className="btn-outline">Ver Portfolio</Link>
          </div>
        </div>
      </section>
    </>
  )
}
