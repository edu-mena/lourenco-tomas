import { useScrollReveal } from '../hooks'
import { TESTIMONIALS_SECTION } from '../data/ui'
import { useTestimonials } from '../hooks/useApi'

export default function Testimonials() {
  const [headerRef, headerVisible] = useScrollReveal()
  const { testimonials } = useTestimonials()

  if (!testimonials.length) return null

  return (
    <section id="testimonials" className="testimonials" aria-labelledby="testimonials-title">
      <div ref={headerRef} className={`testimonials__header reveal${headerVisible ? ' visible' : ''}`}>
        <div className="section-label">{TESTIMONIALS_SECTION.label}</div>
        <h2 id="testimonials-title" className="section-title-display">{TESTIMONIALS_SECTION.title}</h2>
      </div>

      <div className="testimonials__grid">
        {testimonials.map((t, i) => (
          <TestimonialCard key={t.id} item={t} delay={i * 0.1} />
        ))}
      </div>
    </section>
  )
}

function TestimonialCard({ item, delay }) {
  const [ref, visible] = useScrollReveal()

  return (
    <figure ref={ref} className={`testimonial reveal${visible ? ' visible' : ''}`} style={{ transitionDelay: `${delay}s` }}>
      <blockquote className="testimonial__text">{item.text}</blockquote>
      <figcaption className="testimonial__author">
        <span className="testimonial__avatar" aria-hidden="true">{item.avatar}</span>
        <span>
          <span className="testimonial__name">{item.name}</span>
          {item.role && <span className="testimonial__role">{item.role}</span>}
        </span>
      </figcaption>
    </figure>
  )
}
