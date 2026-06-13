import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAdminData } from '../../contexts/AdminDataContext'
import ConfirmDialog from '../../components/admin/ConfirmDialog'

const CATEGORIES = ['Processo', 'Homenagens', 'Técnica', 'Bastidores']

export default function AdminBlog() {
  const { posts, deletePost, updatePost } = useAdminData()
  const [search,  setSearch]  = useState('')
  const [catFilter, setCat]   = useState('')
  const [confirmSlug, setConfirmSlug] = useState(null)

  const filtered = posts.filter(p => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase())
    const matchCat    = catFilter ? p.cat === catFilter : true
    return matchSearch && matchCat
  })

  const handleDelete = () => {
    deletePost(confirmSlug)
    setConfirmSlug(null)
  }

  const toggleFeatured = (post) => {
    if (!post.featured) {
      posts.forEach(p => { if (p.featured) updatePost(p.slug, { featured: false }) })
      updatePost(post.slug, { featured: true })
    } else {
      updatePost(post.slug, { featured: false })
    }
  }

  return (
    <>
      <div className="admin-form-header">
        <span className="admin-page-title">Artigos & Blog</span>
        <Link to="/admin/blog/new" className="admin-btn admin-btn--primary">
          + Novo artigo
        </Link>
      </div>

      <div className="admin-toolbar">
        <input
          className="admin-search"
          placeholder="Pesquisar por título…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select className="admin-filter" value={catFilter} onChange={e => setCat(e.target.value)}>
          <option value="">Todas as categorias</option>
          {CATEGORIES.map(c => <option key={c}>{c}</option>)}
        </select>
        <span className="admin-toolbar__spacer" />
        <span style={{ fontSize: 12, color: '#3d4f63' }}>
          {filtered.length} artigo{filtered.length !== 1 ? 's' : ''}
        </span>
      </div>

      {filtered.length === 0 ? (
        <div className="admin-empty">
          <div className="admin-empty__title">Nenhum artigo encontrado</div>
          <div className="admin-empty__desc">Tenta ajustar os filtros ou cria um novo artigo.</div>
          <Link to="/admin/blog/new" className="admin-btn admin-btn--primary">+ Novo artigo</Link>
        </div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: 52 }}>Capa</th>
                <th>Título</th>
                <th>Categoria</th>
                <th>Data</th>
                <th style={{ width: 84 }}>Destaque</th>
                <th style={{ width: 130 }}>Acções</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(post => (
                <tr key={post.slug}>
                  <td>
                    {post.img
                      ? <img src={post.img} alt="" className="admin-thumb" />
                      : <div className="admin-thumb-placeholder">—</div>
                    }
                  </td>
                  <td>
                    <div className="admin-td-name">{post.title}</div>
                    <div className="admin-td-sub" style={{ maxWidth: 360, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {post.excerpt}
                    </div>
                  </td>
                  <td><span className="admin-badge">{post.cat}</span></td>
                  <td style={{ whiteSpace: 'nowrap' }}>{post.date}</td>
                  <td>
                    <label className="admin-toggle">
                      <input
                        type="checkbox"
                        checked={!!post.featured}
                        onChange={() => toggleFeatured(post)}
                      />
                      <div className="admin-toggle__track">
                        <div className="admin-toggle__thumb" />
                      </div>
                    </label>
                  </td>
                  <td>
                    <div className="admin-td-actions">
                      <Link
                        to={`/admin/blog/${post.slug}/edit`}
                        className="admin-btn admin-btn--ghost admin-btn--sm"
                      >
                        Editar
                      </Link>
                      <button
                        className="admin-btn admin-btn--danger admin-btn--sm"
                        onClick={() => setConfirmSlug(post.slug)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {confirmSlug && (
        <ConfirmDialog
          message={`Tens a certeza que queres eliminar "${posts.find(p => p.slug === confirmSlug)?.title}"? Esta acção não pode ser revertida.`}
          onConfirm={handleDelete}
          onCancel={() => setConfirmSlug(null)}
        />
      )}
    </>
  )
}
