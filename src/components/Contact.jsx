import { Link } from 'react-router-dom'
import { useScrollReveal } from '../hooks'
import { SOCIAL_LINKS, WA_DEFAULT_MESSAGE } from '../data/content'
import { CONTACT_SECTION } from '../data/ui'
import { waLink } from '../lib/whatsapp'
import { IconArrow, IconWhatsApp, SOCIAL_ICONS } from './icons'

/* Fecho da Home: um só caminho para encomendar, sem formulário duplicado */
export default function Contact() {
  const [leftRef, leftVisible] = useScrollReveal()
  const [rightRef, rightVisible] = useScrollReveal()

  return (
    <section id="contact" className="contact" aria-labelledby="contact-title">
      <div className="contact__grid">
        <div ref={leftRef} className={`contact__left reveal${leftVisible ? ' visible' : ''}`}>
          <div className="section-label">{CONTACT_SECTION.heading}</div>
          <h2 id="contact-title" className="contact__heading">{CONTACT_SECTION.title}</h2>
          <p className="contact__desc">{CONTACT_SECTION.body}</p>
          <div className="contact__actions">
            <Link to="/encomendas" className="btn-primary">
              {CONTACT_SECTION.primary} <IconArrow size={15} />
            </Link>
            <a href={waLink(WA_DEFAULT_MESSAGE)} target="_blank" rel="noopener noreferrer" className="btn-wa">
              <IconWhatsApp size={16} /> {CONTACT_SECTION.whatsapp}
            </a>
          </div>
        </div>

        <div ref={rightRef} className={`social-links reveal${rightVisible ? ' visible' : ''}`} style={{ transitionDelay: '0.1s' }}>
          {SOCIAL_LINKS.map(s => {
            const Icon = SOCIAL_ICONS[s.icon]
            return (
              <a key={s.id} href={s.href} target="_blank" rel="noopener noreferrer" className="social-link">
                <span className="social-link__icon"><Icon size={18} /></span>
                <span className="social-link__info">
                  <span className="social-link__name">{s.label}</span>
                  <span className="social-link__handle">{s.handle}</span>
                </span>
                <span className="social-link__arrow"><IconArrow /></span>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
