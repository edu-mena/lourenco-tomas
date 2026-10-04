import { WA_DEFAULT_MESSAGE, INSTAGRAM_URL, INSTAGRAM_HANDLE, WA_DISPLAY, LOCATION_URL, LOCATION_LABEL } from '../data/content'
import { waLink } from '../lib/whatsapp'
import { IconWhatsApp, IconInstagram, IconPin } from '../components/icons'

/* Página de links para a bio das redes sociais: só ícones, sem navegação */
const LINKS = [
  { id: 'whatsapp', label: `WhatsApp ${WA_DISPLAY}`, href: waLink(WA_DEFAULT_MESSAGE), Icon: IconWhatsApp },
  { id: 'instagram', label: `Instagram ${INSTAGRAM_HANDLE}`, href: INSTAGRAM_URL, Icon: IconInstagram },
  { id: 'location', label: `Localização — ${LOCATION_LABEL}`, href: LOCATION_URL, Icon: IconPin },
]

export default function Contactos() {
  return (
    <main className="links-page">
      <h1 className="links-page__title">Clique nos ícones para interagir</h1>
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
              <Icon size={30} />
            </a>
          </li>
        ))}
      </ul>
    </main>
  )
}
