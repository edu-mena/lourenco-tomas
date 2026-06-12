import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useScrollReveal } from '../hooks'
import { ORDER_PAGE } from '../data/ui'

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`faq-item${open ? ' open' : ''}`}>
      <button className="faq-item__q" onClick={() => setOpen(v => !v)}>
        {q}
        <span className="faq-item__icon">
          <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" width="12" height="12">
            <path d="M6 2v8M2 6h8"/>
          </svg>
        </span>
      </button>
      <div className="faq-item__a">
        <p>{a}</p>
      </div>
    </div>
  )
}

export default function Encomendas() {
  const [sent, setSent] = useState(false)
  const [servicesRef, servicesVisible] = useScrollReveal()
  const [stepsRef, stepsVisible] = useScrollReveal()
  const [formRef, formVisible] = useScrollReveal()
  const [faqRef, faqVisible] = useScrollReveal()

  const { hero, sectionLabels, sectionTitles, services, steps, faqs, form } = ORDER_PAGE

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 3500)
    e.target.reset()
  }

  return (
    <>
      {/* ── Page Hero ─────────────────────────────── */}
      <div className="page-hero">
        <div className="page-hero__breadcrumb">
          <Link to="/">Início</Link>
          <span> / {hero.breadcrumb}</span>
        </div>
        <h1 className="page-hero__title">
          {hero.title.split('\n').map((line, i, arr) => (
            <span key={i}>{line}{i < arr.length - 1 && <br/>}</span>
          ))}
        </h1>
        <p className="page-hero__sub">{hero.subtitle}</p>
        <div className="page-hero__deco" aria-hidden>{hero.deco}</div>
      </div>

      {/* ── Serviços ──────────────────────────────── */}
      <section className="services-section">
        <div ref={servicesRef} className={`reveal${servicesVisible ? ' visible' : ''}`}>
          <div className="section-label">{sectionLabels.services}</div>
          <h2 className="section-title-display" style={{ marginBottom: '56px' }}>{sectionTitles.services}</h2>
          <div className="services-grid">
            {services.map(s => (
              <div key={s.title} className="service-card">
                <span className="service-card__icon">{s.icon}</span>
                <h3 className="service-card__title">{s.title}</h3>
                <p className="service-card__desc">{s.desc}</p>
                <div className="service-card__price">{s.price}</div>
                <ul className="service-card__includes">
                  {s.includes.map(item => <li key={item}>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Como Funciona ─────────────────────────── */}
      <section className="order-process">
        <div ref={stepsRef} className={`reveal${stepsVisible ? ' visible' : ''}`}>
          <div className="section-label">{sectionLabels.process}</div>
          <h2 className="section-title-display" style={{ marginBottom: '56px' }}>{sectionTitles.process}</h2>
          <div className="order-process__grid">
            {steps.map(s => (
              <div key={s.num} className="order-step">
                <div className="order-step__num">{s.num}</div>
                <h3 className="order-step__title">{s.title}</h3>
                <p className="order-step__desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Formulário ────────────────────────────── */}
      <section className="encomendas-form-section">
        <div ref={formRef} className={`encomendas-form-inner reveal${formVisible ? ' visible' : ''}`}>
          <div className="section-label">{sectionLabels.form}</div>
          <h2 className="section-title-display" style={{ marginBottom: '56px' }}>{sectionTitles.form}</h2>

          <form className="contact__form encomendas-form" onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="enc-name">{form.fields.name.label}</label>
                <input id="enc-name" className="form-input" type="text" placeholder={form.fields.name.placeholder} required />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="enc-email">{form.fields.email.label}</label>
                <input id="enc-email" className="form-input" type="email" placeholder={form.fields.email.placeholder} required />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="enc-phone">{form.fields.phone.label}</label>
                <input id="enc-phone" className="form-input" type="tel" placeholder={form.fields.phone.placeholder} />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="enc-service">{form.fields.service.label}</label>
                <select id="enc-service" className="form-select" required>
                  {form.fields.service.options.map(o => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="enc-size">{form.fields.size.label}</label>
                <input id="enc-size" className="form-input" type="text" placeholder={form.fields.size.placeholder} />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="enc-deadline">{form.fields.deadline.label}</label>
                <input id="enc-deadline" className="form-input" type="text" placeholder={form.fields.deadline.placeholder} />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="enc-desc">{form.fields.desc.label}</label>
              <textarea
                id="enc-desc"
                className="form-textarea"
                placeholder={form.fields.desc.placeholder}
                required
              />
            </div>
            <button type="submit" className={`form-submit${sent ? ' form-submit--sent' : ''}`}>
              {sent ? form.submit.sent : (
                <>
                  {form.submit.default}
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M3 8h10M9 4l4 4-4 4"/>
                  </svg>
                </>
              )}
            </button>
          </form>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────── */}
      <section className="faq-section">
        <div ref={faqRef} className={`faq-inner reveal${faqVisible ? ' visible' : ''}`}>
          <div className="section-label">{sectionLabels.faq}</div>
          <h2 className="section-title-display" style={{ marginBottom: '56px' }}>{sectionTitles.faq}</h2>
          <div className="faq-list">
            {faqs.map(f => <FaqItem key={f.q} {...f} />)}
          </div>
        </div>
      </section>
    </>
  )
}
