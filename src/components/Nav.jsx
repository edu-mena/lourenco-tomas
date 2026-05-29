import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const NAV_LINKS = [
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Homenagens', to: '/homenagens' },
  { label: 'Blog', to: '/blog' },
  { label: 'Obras', to: '/sobre' },
  { label: 'Contacto', to: '/contacto' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [pathname])

  return (
    <>
      <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
        <Link to="/" className="nav__logo">
          LOURENÇO TOMÁS
        </Link>

        <ul className="nav__links">
          {NAV_LINKS.map(l => (
            <li key={l.to}>
              <Link
                className={`nav__link${pathname === l.to ? ' nav__link--active' : ''}`}
                to={l.to}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <Link className="nav__cta" to="/encomendas">
              Encomendar
            </Link>
          </li>
        </ul>

        <button
          className="nav__burger"
          aria-label="Abrir menu"
          onClick={() => setMobileOpen(v => !v)}
        >
          <span style={mobileOpen ? { transform: 'translateY(7px) rotate(45deg)' } : {}} />
          <span style={mobileOpen ? { opacity: 0 } : {}} />
          <span style={mobileOpen ? { transform: 'translateY(-7px) rotate(-45deg)' } : {}} />
        </button>
      </nav>

      <div className={`nav__mobile${mobileOpen ? ' open' : ''}`} aria-hidden={!mobileOpen}>
        {NAV_LINKS.map(l => (
          <Link key={l.to} to={l.to}>{l.label}</Link>
        ))}
        <Link to="/encomendas" style={{ color: 'var(--beige)' }}>Encomendar</Link>
      </div>
    </>
  )
}
