import { Outlet, NavLink, useLocation } from 'react-router-dom'
import '../../admin.css'

const NAV_GROUPS = [
  {
    label: '★ Prioritário',
    items: [
      { to: '/admin/tributes', label: 'Homenagens' },
      { to: '/admin/blog',     label: 'Artigos & Blog' },
    ],
  },
  {
    label: 'Conteúdo',
    items: [
      { to: '/admin/gallery',       label: 'Galeria' },
      { to: '/admin/videos',        label: 'Vídeos' },
      { to: '/admin/testimonials',  label: 'Testemunhos' },
      { to: '/admin/corporate',     label: 'Clientes Corp.' },
    ],
  },
  {
    label: 'Configurações',
    items: [
      { to: '/admin/settings/hero',    label: 'Hero' },
      { to: '/admin/settings/about',   label: 'Sobre' },
      { to: '/admin/settings/contact', label: 'Contacto' },
      { to: '/admin/settings/orders',  label: 'Encomendas' },
      { to: '/admin/settings/footer',  label: 'Rodapé & Nav' },
    ],
  },
]

const ROUTE_LABELS = {
  '/admin':                    'Dashboard',
  '/admin/tributes':           'Homenagens',
  '/admin/blog':               'Artigos & Blog',
  '/admin/gallery':            'Galeria',
  '/admin/videos':             'Vídeos',
  '/admin/testimonials':       'Testemunhos',
  '/admin/corporate':          'Clientes Corporativos',
  '/admin/settings/hero':      'Hero',
  '/admin/settings/about':     'Sobre',
  '/admin/settings/contact':   'Contacto',
  '/admin/settings/orders':    'Encomendas',
  '/admin/settings/footer':    'Rodapé & Nav',
}

export default function AdminLayout() {
  const { pathname } = useLocation()
  const title = ROUTE_LABELS[pathname] ?? 'Admin'

  return (
    <div className="admin-root">
      <aside className="admin-sidebar">
        <div className="admin-sidebar__brand">
          <div className="admin-sidebar__name">Lourenço Tomás</div>
          <div className="admin-sidebar__sub">Painel de administração</div>
        </div>

        <nav className="admin-nav">
          {NAV_GROUPS.map(({ label, items }) => (
            <div key={label} className="admin-nav__group">
              <div className="admin-nav__group-label">{label}</div>
              {items.map(({ to, label: lbl }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `admin-nav__link${isActive ? ' active' : ''}`
                  }
                >
                  <span className="admin-nav__dot" />
                  {lbl}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <span className="admin-topbar__crumb">Admin</span>
          <span className="admin-topbar__sep">/</span>
          <span className="admin-topbar__title">{title}</span>
        </header>
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
