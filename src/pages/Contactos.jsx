import { LINKS_PAGE } from '../data/ui'
import { waLink } from '../lib/whatsapp'
import { usePageTitle } from '../hooks'
import { IconWhatsApp, IconInstagram, IconPin } from '../components/icons'
import { useSiteContent } from '../content/SiteContent'

/*
 * Página de links para a bio das redes sociais: foto, bio curta e ícones.
 * Ocupa exactamente a altura do ecrã — a foto encolhe para caber, nunca há scroll.
 */
export default function Contactos() {
  usePageTitle('Contactos')
  const { contact: c, aboutPage, general } = useSiteContent()
  const links = [
    { id: 'whatsapp', label: `WhatsApp ${c.whatsappDisplay}`, href: waLink(c.whatsappMessage), Icon: IconWhatsApp },
    { id: 'instagram', label: `Instagram ${c.instagramHandle}`, href: c.instagramUrl, Icon: IconInstagram },
    { id: 'location', label: `Localização — ${c.locationLabel}`, href: c.locationUrl, Icon: IconPin },
  ]
  return (
    <main className="links-page">
      <img className="links-page__photo" src={aboutPage.bioImage} alt={aboutPage.bioImageAlt} />

      <p className="links-page__bio">
        <strong>{LINKS_PAGE.name}</strong> {general.linksBio}
      </p>

      <div className="links-page__actions">
        <h1 className="links-page__title">{LINKS_PAGE.title}</h1>
        <ul className="links-page__list">
          {links.map(({ id, label, href, Icon }, i) => (
            <li key={id} style={{ '--i': i }}>
              <a
                className={`links-page__btn links-page__btn--${id}`}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
              >
                <Icon size={26} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
