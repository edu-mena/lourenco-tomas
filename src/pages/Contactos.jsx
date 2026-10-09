import { WA_DEFAULT_MESSAGE, INSTAGRAM_URL, INSTAGRAM_HANDLE, WA_DISPLAY, LOCATION_URL, LOCATION_LABEL } from '../data/content'
import { ABOUT_PAGE, LINKS_PAGE } from '../data/ui'
import { waLink } from '../lib/whatsapp'
import { usePageTitle } from '../hooks'
import { IconWhatsApp, IconInstagram, IconPin } from '../components/icons'

/*
 * Página de links para a bio das redes sociais: foto, bio curta e ícones.
 * Ocupa exactamente a altura do ecrã — a foto encolhe para caber, nunca há scroll.
 */
const LINKS = [
  { id: 'whatsapp', label: `WhatsApp ${WA_DISPLAY}`, href: waLink(WA_DEFAULT_MESSAGE), Icon: IconWhatsApp },
  { id: 'instagram', label: `Instagram ${INSTAGRAM_HANDLE}`, href: INSTAGRAM_URL, Icon: IconInstagram },
  { id: 'location', label: `Localização — ${LOCATION_LABEL}`, href: LOCATION_URL, Icon: IconPin },
]

export default function Contactos() {
  usePageTitle('Contactos')
  return (
    <main className="links-page">
      <img className="links-page__photo" src={ABOUT_PAGE.bioImage} alt={ABOUT_PAGE.bioImageAlt} />

      <p className="links-page__bio">
        <strong>{LINKS_PAGE.name}</strong> {LINKS_PAGE.bio}
      </p>

      <div className="links-page__actions">
        <h1 className="links-page__title">{LINKS_PAGE.title}</h1>
        <ul className="links-page__list">
          {LINKS.map(({ id, label, href, Icon }, i) => (
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
