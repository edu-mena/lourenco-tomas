import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { NAV_LINKS, NAV_BRAND } from '../data/ui'
import { useModal } from '../hooks/useModal'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { pathname } = useLocation()
  const lastY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 60)
      // Esconde ao descer, volta ao subir — mais espaço para as obras
      if (Math.abs(y - lastY.current) > 6) {
        setHidden(y > lastY.current && y > 240)
        lastY.current = y
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMobileOpen(false); setHidden(false) }, [pathname])

  const menuRef = useModal(mobileOpen, () => setMobileOpen(false))

  const isActive = to => pathname === to || pathname.startsWith(to + '/')

  return (
    <>
      <nav className={`nav${scrolled ? ' scrolled' : ''}${hidden && !mobileOpen ? ' nav--hidden' : ''}`} aria-label="Principal">
        <Link to="/" className="nav__logo">{NAV_BRAND.logo}</Link>

        <ul className="nav__links">
          {NAV_LINKS.map(l => (
            <li key={l.to}>
              <Link
                className={`nav__link${isActive(l.to) ? ' nav__link--active' : ''}`}
                aria-current={isActive(l.to) ? 'page' : undefined}
                to={l.to}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <Link className="nav__cta" to={NAV_BRAND.cta.to}>{NAV_BRAND.cta.label}</Link>
          </li>
        </ul>

        <button
          className={`nav__burger${mobileOpen ? ' nav__burger--open' : ''}`}
          aria-label={mobileOpen ? 'Fechar menu' : NAV_BRAND.mobileAriaLabel}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileOpen(v => !v)}
        >
          <span /><span /><span />
        </button>
      </nav>

      <div
        id="mobile-menu"
        ref={menuRef}
        className={`nav__mobile${mobileOpen ? ' open' : ''}`}
        aria-hidden={!mobileOpen}
        inert={mobileOpen ? undefined : ''}
      >
        {NAV_LINKS.map((l, i) => (
          <Link key={l.to} to={l.to} style={{ '--i': i }}
            className={isActive(l.to) ? 'is-active' : undefined}>
            {l.label}
          </Link>
        ))}
        <Link to={NAV_BRAND.cta.to} className="nav__mobile-cta" style={{ '--i': NAV_LINKS.length }}>
          {NAV_BRAND.cta.label}
        </Link>
        <button type="button" className="nav__mobile-close" onClick={() => setMobileOpen(false)}>
          Fechar
        </button>
      </div>
    </>
  )
}
