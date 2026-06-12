import { useScrollReveal } from '../hooks'
import { TIMELINE } from '../data/content'

export default function Historia() {
  const [headerRef, headerVisible] = useScrollReveal()
  const [trackRef, trackVisible] = useScrollReveal()

  return (
    <section className="historia" aria-label="História">
      <div
        ref={headerRef}
        className={`historia__header reveal${headerVisible ? ' visible' : ''}`}
      >
        <div className="section-label">História</div>
        <h2 className="historia__title">
          Uma jornada de <em>arte e identidade</em>
        </h2>
      </div>

      <div
        ref={trackRef}
        className={`historia__track${trackVisible ? ' visible' : ''}`}
      >
        <div className="historia__line" />

        {TIMELINE.map((item, i) => (
          <div
            key={item.year}
            className={`historia__item historia__item--${i % 2 === 0 ? 'above' : 'below'}`}
            style={{ '--i': i }}
          >
            <div className="historia__content">
              <span className="historia__year">{item.year}</span>
              <p className="historia__event">{item.event}</p>
            </div>
            <div className="historia__node">
              <div className="historia__dot" />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
