import { Link } from 'react-router-dom'
import { TRIBUTES } from '../../data/tributes'
import { POSTS } from '../../data/blog'
import { GALLERY_ITEMS, VIDEOS, TESTIMONIALS } from '../../data/content'
import { COMPANIES } from '../../data/corporativos'

const MEDIA_BASE = 'https://lightblue-lemur-704992.hostingersite.com/public'

const stats = [
  { num: TRIBUTES.length,      label: 'Homenagens' },
  { num: POSTS.length,         label: 'Artigos' },
  { num: GALLERY_ITEMS.length, label: 'Obras em galeria' },
  { num: VIDEOS.length,        label: 'Vídeos' },
  { num: TESTIMONIALS.length,  label: 'Testemunhos' },
  { num: COMPANIES.length,     label: 'Clientes corp.' },
]

const quickLinks = [
  { to: '/admin/tributes', label: 'Homenagens',    hint: 'Criar · editar · eliminar',  count: TRIBUTES.length },
  { to: '/admin/blog',     label: 'Artigos & Blog', hint: 'Editor de conteúdo',         count: POSTS.length },
]

export default function Dashboard() {
  return (
    <>
      <p className="admin-page-title">Dashboard</p>
      <p className="admin-page-sub">Visão geral do conteúdo do site.</p>

      {/* Estatísticas */}
      <div className="admin-section-heading">Conteúdo actual</div>
      <div className="admin-stats">
        {stats.map(({ num, label }) => (
          <div key={label} className="admin-stat">
            <div className="admin-stat__num">{num}</div>
            <div className="admin-stat__label">{label}</div>
          </div>
        ))}
      </div>

      {/* Atalhos prioritários */}
      <div className="admin-section-heading">Acesso rápido</div>
      <div className="admin-quick-grid" style={{ marginBottom: 36 }}>
        {quickLinks.map(({ to, label, hint, count }) => (
          <Link key={to} to={to} className="admin-quick-card">
            <div className="admin-quick-card__left">
              <span className="admin-quick-card__label">{label}</span>
              <span className="admin-quick-card__hint">{hint}</span>
            </div>
            <span className="admin-quick-card__count">{count}</span>
          </Link>
        ))}
      </div>

      {/* Servidor de media */}
      <div className="admin-section-heading">Servidor de media</div>
      <div className="admin-info-bar">
        <span className="admin-info-bar__label">Base URL</span>
        <span className="admin-info-bar__value">{MEDIA_BASE}</span>
      </div>
    </>
  )
}
