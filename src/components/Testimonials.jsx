import { useScrollReveal } from '../hooks'
import { TESTIMONIALS } from '../data/content'

function StarIcon() {
  return (
    <svg className="testimonial__star" viewBox="0 0 12 12" fill="currentColor">
      <path d="M6 0l1.5 4.5H12L8.5 7.3l1.3 4.2L6 9l-3.8 2.5 1.3-4.2L0 4.5h4.5z"/>
    </svg>
  )
}

export default function Testimonials() {
  const [headerRef, headerVisible] = useScrollReveal()

  return (
    <section id="testimonials" className="testimonials" aria-label="Depoimentos de Clientes">
      <div
        ref={headerRef}
        className={`testimonials__header reveal${headerVisible ? ' visible' : ''}`}
      >
        <div className="section-label">Clientes</div>
        <h2 className="section-title-display">PALAVRAS<br/>QUE FICAM</h2>
      </div>

      <div className="testimonials__grid">
        {TESTIMONIALS.map((t, i) => (
          <TestimonialCard key={t.id} item={t} delay={i * 0.12} />
        ))}
      </div>
    </section>
  )
}

function TestimonialCard({ item, delay }) {
  const [ref, visible] = useScrollReveal()

  return (
    <div
      ref={ref}
      className={`testimonial reveal${visible ? ' visible' : ''}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      <div className="testimonial__stars">
        {Array.from({ length: 5 }).map((_, i) => <StarIcon key={i} />)}
      </div>
      <div className="testimonial__quote">&ldquo;</div>
      <p className="testimonial__text">{item.text}</p>
      <div className="testimonial__author">
        <div className="testimonial__avatar">{item.avatar}</div>
        <div>
          <div className="testimonial__name">{item.name}</div>
          <div className="testimonial__role">{item.role}</div>
        </div>
      </div>
    </div>
  )
}
