import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FOOTER_CONTENT, NAV_BRAND } from '../data/ui'
import { waLink } from '../lib/whatsapp'
import { IconWhatsApp, SOCIAL_ICONS } from './icons'
import { useSiteContent, socialLinks } from '../content/SiteContent'

/* ── Footer ─────────────────────────────────────── */
export function Footer() {
  const { contact, general } = useSiteContent()
  return (
    <footer className="footer" data-hide-wa>
      <div className="footer__brand">
        <Link to="/" className="footer__logo">{NAV_BRAND.logo}</Link>
        <p className="footer__tagline">{general.tagline}</p>
      </div>
      <nav className="footer__nav" aria-label="Rodapé">
        {FOOTER_CONTENT.links.map(({ to, label }) => (
          <Link key={to} to={to}>{label}</Link>
        ))}
      </nav>
      <div className="footer__social">
        {socialLinks(contact).map(s => {
          const Icon = SOCIAL_ICONS[s.icon]
          return (
            <a key={s.id} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} title={s.handle}>
              <Icon size={17} />
            </a>
          )
        })}
      </div>
      <p className="footer__copy">
        © {new Date().getFullYear()} Lourenço Tomás · {contact.locationLabel}
      </p>
    </footer>
  )
}

/* ── WhatsApp Float ──────────────────────────────
 * Aparece depois do hero, esconde-se sobre formulários e footer
 * (para não tapar botões) e acena uma única vez por sessão.
 */
const NUDGE_KEY = 'wa-nudged'

export function WhatsApp() {
  const { pathname } = useLocation()
  const { contact } = useSiteContent()
  const [pastHero, setPastHero] = useState(false)
  const [overForm, setOverForm] = useState(false)
  const [nudge, setNudge] = useState(false)

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.6)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [pathname])

  useEffect(() => {
    const targets = document.querySelectorAll('[data-hide-wa]')
    if (!targets.length) return
    const visible = new Set()
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)))
      setOverForm(visible.size > 0)
    })
    targets.forEach(t => obs.observe(t))
    return () => obs.disconnect()
  }, [pathname])

  useEffect(() => {
    let seen = false
    try { seen = sessionStorage.getItem(NUDGE_KEY) === '1' } catch { /* storage bloqueado */ }
    if (seen) return
    let hide
    const t = setTimeout(() => {
      setNudge(true)
      try { sessionStorage.setItem(NUDGE_KEY, '1') } catch { /* storage bloqueado */ }
      hide = setTimeout(() => setNudge(false), 4500)
    }, 25000)
    return () => { clearTimeout(t); clearTimeout(hide) }
  }, [])

  const shown = pastHero && !overForm

  return (
    <a
      className={`wa-float${shown ? ' wa-float--shown' : ''}${nudge && shown ? ' wa-float--nudge' : ''}`}
      href={waLink(contact.whatsappMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      tabIndex={shown ? undefined : -1}
    >
      <IconWhatsApp size={28} />
      <span className="wa-tooltip" aria-hidden="true">{FOOTER_CONTENT.waTooltip}</span>
    </a>
  )
}
