import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAdminData } from '../../contexts/AdminDataContext'
import ConfirmDialog from '../../components/admin/ConfirmDialog'

const CATEGORIES = ['Música', 'Cinema', 'Desporto', 'Moda', 'Arte']

export default function AdminTributes() {
  const { tributes, deleteTribute, updateTribute } = useAdminData()
  const [search, setSearch]   = useState('')
  const [catFilter, setCat]   = useState('')
  const [confirmId, setConfirmId] = useState(null)

  const filtered = tributes.filter(t => {
    const name = t.celebrity?.name ?? ''
    const matchSearch = name.toLowerCase().includes(search.toLowerCase())
    const matchCat    = catFilter ? t.work?.category === catFilter : true
    return matchSearch && matchCat
  })

  const handleDelete = () => {
    deleteTribute(confirmId)
    setConfirmId(null)
  }

  const toggleFeatured = (t) =>
    updateTribute(t.id, { featured: !t.featured })

  return (
    <>
      <div className="admin-form-header">
        <span className="admin-page-title">Homenagens</span>
        <Link to="/admin/tributes/new" className="admin-btn admin-btn--primary">
          + Nova homenagem
        </Link>
      </div>

      {/* Toolbar */}
      <div className="admin-toolbar">
        <input
          className="admin-search"
          placeholder="Pesquisar por nome…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          className="admin-filter"
          value={catFilter}
          onChange={e => setCat(e.target.value)}
        >
          <option value="">Todas as categorias</option>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <span className="admin-toolbar__spacer" />
        <span style={{ fontSize: 12, color: '#3d4f63' }}>{filtered.length} resultado{filtered.length !== 1 ? 's' : ''}</span>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="admin-empty">
          <div className="admin-empty__title">Nenhuma homenagem encontrada</div>
          <div className="admin-empty__desc">Tenta ajustar os filtros ou cria uma nova.</div>
          <Link to="/admin/tributes/new" className="admin-btn admin-btn--primary">+ Nova homenagem</Link>
        </div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: 52 }}>Capa</th>
                <th>Nome</th>
                <th>Categoria</th>
                <th>Ano</th>
                <th style={{ width: 80 }}>Destaque</th>
                <th style={{ width: 120 }}>Acções</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(t => (
                <tr key={t.id}>
                  <td>
                    {t.cover
                      ? <img src={t.cover} alt="" className="admin-thumb" />
                      : <div className="admin-thumb-placeholder">—</div>
                    }
                  </td>
                  <td>
                    <div className="admin-td-name">{t.celebrity?.name}</div>
                    <div className="admin-td-sub">{t.celebrity?.role}</div>
                  </td>
                  <td>
                    <span className="admin-badge">{t.work?.category}</span>
                  </td>
                  <td>{t.work?.year}</td>
                  <td>
                    <label className="admin-toggle">
                      <input
                        type="checkbox"
                        checked={!!t.featured}
                        onChange={() => toggleFeatured(t)}
                      />
                      <div className="admin-toggle__track">
                        <div className="admin-toggle__thumb" />
                      </div>
                    </label>
                  </td>
                  <td>
                    <div className="admin-td-actions">
                      <Link
                        to={`/admin/tributes/${t.id}/edit`}
                        className="admin-btn admin-btn--ghost admin-btn--sm"
                      >
                        Editar
                      </Link>
                      <button
                        className="admin-btn admin-btn--danger admin-btn--sm"
                        onClick={() => setConfirmId(t.id)}
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

      {confirmId && (
        <ConfirmDialog
          message={`Tens a certeza que queres eliminar "${tributes.find(t => t.id === confirmId)?.celebrity?.name}"? Esta acção não pode ser revertida.`}
          onConfirm={handleDelete}
          onCancel={() => setConfirmId(null)}
        />
      )}
    </>
  )
}
