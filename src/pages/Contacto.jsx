import { useState } from 'react'
import { useScrollReveal } from '../hooks'
import { useForm, rules } from '../hooks/useForm'
import { CONTACTO_PAGE } from '../data/ui'
import { buildMessage, openWhatsApp, waLink, mailLink } from '../lib/whatsapp'
import { PageHero, Field, SentPanel, CopyButton } from '../components/ui'
import { IconArrow, IconWhatsApp, IconEmail, SOCIAL_ICONS } from '../components/icons'
import { useSiteContent, socialLinks } from '../content/SiteContent'

// ─── Ícones dos cartões de informação ───────────────────────────

function IconPin() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22">
      <path d="M12 2C8.686 2 6 4.686 6 8c0 4.5 6 12 6 12s6-7.5 6-12c0-3.314-2.686-6-6-6z"/>
      <circle cx="12" cy="8" r="2"/>
    </svg>
  )
}
function IconClock() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22">
      <circle cx="12" cy="12" r="9"/>
      <path d="M12 7v5l3 3"/>
    </svg>
  )
}
function IconGlobe() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22">
      <circle cx="12" cy="12" r="9"/>
      <path d="M3 12h18M12 3c-2.5 3-4 5.5-4 9s1.5 6 4 9M12 3c2.5 3 4 5.5 4 9s-1.5 6-4 9"/>
    </svg>
  )
}
function IconBrush() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22">
      <path d="M3 21c1.5-1 4-3.5 5-6l8-8a2.828 2.828 0 10-4-4L4 11c-2.5 1-5 3.5-6 5"/>
      <path d="M8 15c0 1.5-1.5 3-3 3"/>
    </svg>
  )
}

const INFO_ICON_MAP = { pin: IconPin, clock: IconClock, globe: IconGlobe, brush: IconBrush }

const SCHEMA = {
  name: [rules.required('Indique o seu nome.')],
  email: [rules.email()],
  subject: [rules.required('Escolha um assunto.')],
  message: [rules.required('Escreva a sua mensagem.'), rules.minLength(10)],
}

export default function Contacto() {
  const [sent, setSent] = useState(null)
  const [leftRef, leftVisible] = useScrollReveal()
  const [rightRef, rightVisible] = useScrollReveal()
  const [featRef, featVisible] = useScrollReveal()

  const { hero, form } = CONTACTO_PAGE
  const { contact: channels } = useSiteContent()
  // Os ícones dos cartões são fixos por posição; etiquetas e valores vêm do admin
  const infoCards = CONTACTO_PAGE.infoCards.map((card, i) => ({ ...card, ...channels.infoCards[i] }))
  const f = form.fields

  const contact = useForm({
    idPrefix: 'ct',
    schema: SCHEMA,
    initial: { name: '', email: '', subject: '', message: '' },
  })

  // Dois botões de envio: WhatsApp (principal) ou email
  const submit = contact.handleSubmit((v, submitter) => {
    const msg = buildMessage(`Contacto via website — ${v.subject}`, [
      ['Nome', v.name],
      ['Email', v.email],
    ], v.message.trim())
    const mail = mailLink(`${v.subject} — ${v.name}`, msg.replace(/\*/g, ''))
    if (submitter?.value === 'email') window.location.href = mail
    else openWhatsApp(msg)
    setSent({ wa: waLink(msg), mail })
  })

  return (
    <>
      <PageHero {...hero} subtitle={channels.pageSubtitle} />

      <section className="contacto-page">
        <div className="contacto-grid">

          {/* ── Canais ── */}
          <div ref={leftRef} className={`reveal${leftVisible ? ' visible' : ''}`}>
            <h2 className="contacto-heading">{channels.channelsTitle}</h2>
            <p className="contacto-desc">{channels.channelsBody}</p>
            <ul className="contacto-cards">
              {socialLinks(channels).map(s => {
                const Icon = SOCIAL_ICONS[s.icon]
                return (
                  <li key={s.id} className="contacto-card-wrap">
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="contacto-card">
                      <span className="contacto-card__icon"><Icon size={20} /></span>
                      <span className="contacto-card__info">
                        <span className="contacto-card__label">{s.label}</span>
                        <span className="contacto-card__handle">{s.handle}</span>
                      </span>
                      <span className="contacto-card__arrow"><IconArrow /></span>
                    </a>
                    {s.copy && <CopyButton value={s.copy} label={s.label} />}
                  </li>
                )
              })}
            </ul>
          </div>

          {/* ── Formulário ── */}
          <div ref={rightRef} className={`reveal${rightVisible ? ' visible' : ''}`} style={{ transitionDelay: '0.1s' }} data-hide-wa>
            <h2 className="contacto-heading contacto-heading--form">{form.titles}</h2>

            {sent ? (
              <SentPanel
                title={form.sent.title}
                body={form.sent.body}
                waHref={sent.wa}
                mailHref={sent.mail}
                onReset={() => { contact.reset(); setSent(null) }}
              />
            ) : (
              <form ref={contact.formRef} className="contact__form" onSubmit={submit} noValidate>
                <div className="form-row">
                  <Field label={f.name.label} htmlFor="ct-name" error={contact.errorFor('name')}>
                    <input className="form-input" type="text" autoComplete="name" placeholder={f.name.placeholder} {...contact.field('name')} />
                  </Field>
                  <Field label={f.email.label} htmlFor="ct-email" optional error={contact.errorFor('email')}>
                    <input className="form-input" type="email" autoComplete="email" placeholder={f.email.placeholder} {...contact.field('email')} />
                  </Field>
                </div>
                <Field label={f.subject.label} htmlFor="ct-subject" error={contact.errorFor('subject')}>
                  <select className="form-select" {...contact.field('subject')}>
                    {f.subject.options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </Field>
                <Field label={f.message.label} htmlFor="ct-message" error={contact.errorFor('message')}>
                  <textarea className="form-textarea" placeholder={f.message.placeholder} rows={6} {...contact.field('message')} />
                </Field>
                <div className="form-actions">
                  <button type="submit" value="whatsapp" className="form-submit">
                    <IconWhatsApp size={16} /> {form.submitWhatsApp}
                  </button>
                  <button type="submit" value="email" className="btn-text">
                    <IconEmail size={16} /> {form.submitEmail}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* ── Informações ── */}
          <ul ref={featRef} className={`contacto-features reveal${featVisible ? ' visible' : ''}`}>
            {infoCards.map(card => {
              const Icon = INFO_ICON_MAP[card.iconKey]
              return (
                <li key={card.iconKey} className="contacto-feature">
                  <span className="contacto-feature__icon"><Icon /></span>
                  <span className="contacto-feature__label">{card.label}</span>
                  <span className="contacto-feature__val">{card.value}</span>
                </li>
              )
            })}
          </ul>

        </div>
      </section>
    </>
  )
}
