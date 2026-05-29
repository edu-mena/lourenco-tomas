function ArrowRight() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 8h10M9 4l4 4-4 4"/>
    </svg>
  )
}

export default function Hero() {
  const scrollTo = (href) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="hero">
      <div className="hero__overlay" />

      <div className="hero__content">
        <h1 className="hero__title">
          Lourenço<br />
          <span>Tomás</span>
        </h1>

        <p className="hero__subtitle">
          Transformando superfícies em emoções através da aerografia.
        </p>

        <div className="hero__cta-wrap">
          <button className="btn-primary" onClick={() => scrollTo('#gallery')}>
            Explorar Obras <ArrowRight />
          </button>
          <button className="btn-ghost" onClick={() => scrollTo('#contact')}>
            Encomendar
          </button>
        </div>
      </div>

      <div className="hero__scroll">
        <div className="hero__scroll-line" />
        Scroll
      </div>
    </section>
  )
}
