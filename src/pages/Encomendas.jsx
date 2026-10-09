import { useState, useEffect, useId } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useScrollReveal } from '../hooks'
import { useForm, rules } from '../hooks/useForm'
import { ORDER_PAGE, SERVICE_OPTIONS } from '../data/ui'
import { buildMessage, openWhatsApp, waLink, mailLink } from '../lib/whatsapp'
import { PageHero, Field, SentPanel } from '../components/ui'
import { IconArrow, IconWhatsApp } from '../components/icons'

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  const id = useId()
  return (
    <div className={`faq-item${open ? ' open' : ''}`}>
      <button className="faq-item__q" onClick={() => setOpen(v => !v)} aria-expanded={open} aria-controls={id}>
        {q}
        <span className="faq-item__icon" aria-hidden="true">
          <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" width="12" height="12">
            <path d="M6 2v8M2 6h8" />
          </svg>
        </span>
      </button>
      <div className="faq-item__a" id={id} role="region">
        <div><p>{a}</p></div>
      </div>
    </div>
  )
}

const SCHEMA = {
  name: [rules.required('Indique o seu nome.')],
  email: [rules.email()],
  service: [rules.required('Escolha o tipo de obra.')],
  desc: [rules.required('Descreva a sua ideia.'), rules.minLength(15, 'Conte-nos um pouco mais (mín. 15 caracteres).')],
}

const serviceLabel = v => SERVICE_OPTIONS.find(o => o.value === v)?.label ?? v

export default function Encomendas() {
  const [params] = useSearchParams()
  const [servicesRef, servicesVisible] = useScrollReveal()
  const [stepsRef, stepsVisible] = useScrollReveal()
  const [sentMsg, setSentMsg] = useState(null)

  const { hero, sectionLabels, sectionTitles, services, steps, faqs, form } = ORDER_PAGE
  const f = form.fields

  // Pré-preenchido a partir da galeria: /encomendas?servico=tela&ref=Nome
  const ref = params.get('ref')
  const presetService = params.get('servico')
  const order = useForm({
    idPrefix: 'enc',
    schema: SCHEMA,
    initial: {
      name: '', email: '', phone: '', size: '', deadline: '',
      service: SERVICE_OPTIONS.some(o => o.value === presetService) ? presetService : '',
      desc: ref ? `${form.reference(ref)}\n\n` : '',
    },
  })

  // Vindo de "Encomendar algo assim": foca a descrição, pronta a escrever
  useEffect(() => {
    if (!ref) return
    const t = setTimeout(() => {
      const el = document.getElementById('enc-desc')
      el?.focus({ preventScroll: true })
      el?.setSelectionRange(el.value.length, el.value.length)
    }, 700)
    return () => clearTimeout(t)
  }, [ref])

  const chooseService = value => {
    order.setValue('service', value)
    document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' })
    setTimeout(() => {
      const firstEmpty = ['name', 'desc'].find(n => !order.values[n].trim())
      document.getElementById(`enc-${firstEmpty || 'desc'}`)?.focus({ preventScroll: true })
    }, 600)
  }

  const submit = order.handleSubmit(v => {
    const msg = buildMessage('Pedido de encomenda — website', [
      ['Nome', v.name],
      ['Email', v.email],
      ['Telefone', v.phone],
      ['Tipo de obra', serviceLabel(v.service)],
      ['Dimensões', v.size],
      ['Prazo', v.deadline],
    ], v.desc.trim())
    openWhatsApp(msg)
    setSentMsg(msg)
  })

  const resetForm = () => { order.reset(); setSentMsg(null) }

  return (
    <>
      <PageHero {...hero} />

      {/* ── Serviços — cada cartão leva ao formulário com o serviço escolhido ── */}
      <section className="services-section">
        <div ref={servicesRef} className={`reveal${servicesVisible ? ' visible' : ''}`}>
          <h2 className="section-title-display section-title-display--spaced">{sectionTitles.services}</h2>
          <div className="services-grid">
            {services.map(s => (
              <article key={s.title} className="service-card">
                <div className="service-card__img"><img src={s.img} alt="" loading="lazy" /></div>
                <h3 className="service-card__title">{s.title}</h3>
                <p className="service-card__desc">{s.desc}</p>
                <div className="service-card__price">{s.price}</div>
                <ul className="service-card__includes">
                  {s.includes.map(item => <li key={item}>{item}</li>)}
                </ul>
                <button type="button" className="service-card__cta" onClick={() => chooseService(s.value)}>
                  {ORDER_PAGE.serviceCta} {s.title.toLowerCase()} <IconArrow size={13} />
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Como funciona ── */}
      <section className="order-process">
        <div ref={stepsRef} className={`reveal${stepsVisible ? ' visible' : ''}`}>
          <h2 className="section-title-display section-title-display--spaced">{sectionTitles.process}</h2>
          <ol className="order-process__grid">
            {steps.map(s => (
              <li key={s.num} className="order-step">
                <div className="order-step__num">{s.num}</div>
                <h3 className="order-step__title">{s.title}</h3>
                <p className="order-step__desc">{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Pedido + dúvidas lado a lado ── */}
      <section id="formulario" className="encomendas-form-section" data-hide-wa>
        <div className="encomendas-layout">
          <div className="encomendas-form-inner">
            <h2 className="section-title-display section-title-display--spaced">{sectionTitles.form}</h2>

            {sentMsg ? (
              <SentPanel
                title={form.sent.title}
                body={form.sent.body}
                waHref={waLink(sentMsg)}
                mailHref={mailLink('Pedido de encomenda', sentMsg.replace(/\*/g, ''))}
                onReset={resetForm}
                resetLabel="Fazer outro pedido"
              />
            ) : (
              <form ref={order.formRef} className="contact__form" onSubmit={submit} noValidate>
                <div className="form-row">
                  <Field label={f.name.label} htmlFor="enc-name" error={order.errorFor('name')}>
                    <input className="form-input" type="text" autoComplete="name" placeholder={f.name.placeholder} {...order.field('name')} />
                  </Field>
                  <Field label={f.service.label} htmlFor="enc-service" error={order.errorFor('service')}>
                    <select className="form-select" {...order.field('service')}>
                      {SERVICE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                  </Field>
                </div>
                <div className="form-row">
                  <Field label={f.email.label} htmlFor="enc-email" optional error={order.errorFor('email')}>
                    <input className="form-input" type="email" autoComplete="email" placeholder={f.email.placeholder} {...order.field('email')} />
                  </Field>
                  <Field label={f.phone.label} htmlFor="enc-phone" optional>
                    <input className="form-input" type="tel" autoComplete="tel" placeholder={f.phone.placeholder} {...order.field('phone')} />
                  </Field>
                </div>
                <div className="form-row">
                  <Field label={f.size.label} htmlFor="enc-size" optional>
                    <input className="form-input" type="text" placeholder={f.size.placeholder} {...order.field('size')} />
                  </Field>
                  <Field label={f.deadline.label} htmlFor="enc-deadline" optional>
                    <input className="form-input" type="text" placeholder={f.deadline.placeholder} {...order.field('deadline')} />
                  </Field>
                </div>
                <Field label={f.desc.label} htmlFor="enc-desc" hint={f.desc.hint} error={order.errorFor('desc')}>
                  <textarea className="form-textarea" placeholder={f.desc.placeholder} rows={6} {...order.field('desc')} />
                </Field>
                <div className="form-actions">
                  <button type="submit" className="form-submit">
                    <IconWhatsApp size={16} /> {form.submit}
                  </button>
                  <p className="form-note">{form.note}</p>
                </div>
              </form>
            )}
          </div>

          <aside className="faq-aside" aria-labelledby="faq-title">
            <h2 id="faq-title" className="faq-aside__title">{sectionLabels.faq}</h2>
            <div className="faq-list">
              {faqs.map(q => <FaqItem key={q.q} {...q} />)}
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
