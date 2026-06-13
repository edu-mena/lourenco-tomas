import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAdminData } from '../../contexts/AdminDataContext'
import ConfirmDialog from '../../components/admin/ConfirmDialog'

const CAT_LABELS = { tshirts: 'T-Shirts', murais: 'Murais', telas: 'Telas', calcados: 'Calçados', homenagens: 'Homenagens' }
const CATS = Object.keys(CAT_LABELS)

export default function AdminGallery() {
  const { galleryItems, deleteGalleryItem } = useAdminData()
  const [search,  setSearch]  = useState('')
  const [catFilter, setCat]   = useState('')
  const [confirmId, setConfirmId] = useState(null)

  const filtered = galleryItems.filter(g => {
    const matchSearch = g.label.toLowerCase().includes(search.toLowerCase())
    const matchCat    = catFilter ? g.cat === catFilter : true
    return matchSearch && matchCat
  })

  return (
    <>
      <div className="admin-form-header">
        <span className="admin-page-title">Galeria</span>
        <Link to="/admin/gallery/new" className="admin-btn admin-btn--primary">+ Nova obra</Link>
      </div>

      <div className="admin-toolbar">
        <input className="admin-search" placeholder="Pesquisar…" value={search} onChange={e => setSearch(e.target.value)} />
        <select className="admin-filter" value={catFilter} onChange={e => setCat(e.target.value)}>
          <option value="">Todas</option>
          {CATS.map(c => <option key={c} value={c}>{CAT_LABELS[c]}</option>)}
        </select>
        <span className="admin-toolbar__spacer" />
        <span style={{ fontSize: 12, color: '#3d4f63' }}>{filtered.length} obra{filtered.length !== 1 ? 's' : ''}</span>
      </div>

      {filtered.length === 0 ? (
        <div className="admin-empty">
          <div className="admin-empty__title">Nenhuma obra encontrada</div>
          <div className="admin-empty__desc">Ajusta os filtros ou adiciona uma nova obra.</div>
          <Link to="/admin/gallery/new" className="admin-btn admin-btn--primary">+ Nova obra</Link>
        </div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: 52 }}>Imagem</th>
                <th>Nome</th>
                <th>Categoria</th>
                <th>Técnica</th>
                <th>Dimensões</th>
                <th style={{ width: 130 }}>Acções</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(g => (
                <tr key={g.id}>
                  <td>{g.img ? <img src={g.img} alt="" className="admin-thumb" /> : <div className="admin-thumb-placeholder">—</div>}</td>
                  <td><div className="admin-td-name">{g.label}</div></td>
                  <td><span className="admin-badge">{CAT_LABELS[g.cat] ?? g.cat}</span></td>
                  <td>{g.technique || <span style={{ color: '#3d4f63' }}>—</span>}</td>
                  <td>{g.size || <span style={{ color: '#3d4f63' }}>—</span>}</td>
                  <td>
                    <div className="admin-td-actions">
                      <Link to={`/admin/gallery/${g.id}/edit`} className="admin-btn admin-btn--ghost admin-btn--sm">Editar</Link>
                      <button className="admin-btn admin-btn--danger admin-btn--sm" onClick={() => setConfirmId(g.id)}>Eliminar</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {confirmId !== null && (
        <ConfirmDialog
          message={`Eliminar "${galleryItems.find(g => g.id === confirmId)?.label}"?`}
          onConfirm={() => { deleteGalleryItem(confirmId); setConfirmId(null) }}
          onCancel={() => setConfirmId(null)}
        />
      )}
    </>
  )
}
