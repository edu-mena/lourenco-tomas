import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAdminData } from '../../contexts/AdminDataContext'
import ConfirmDialog from '../../components/admin/ConfirmDialog'

export default function AdminTestimonials() {
  const { testimonials, deleteTestimonial } = useAdminData()
  const [search, setSearch] = useState('')
  const [confirmId, setConfirmId] = useState(null)

  const filtered = testimonials.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.text.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <div className="admin-form-header">
        <span className="admin-page-title">Testemunhos</span>
        <Link to="/admin/testimonials/new" className="admin-btn admin-btn--primary">+ Novo testemunho</Link>
      </div>

      <div className="admin-toolbar">
        <input className="admin-search" placeholder="Pesquisar por nome ou texto…" value={search} onChange={e => setSearch(e.target.value)} />
        <span className="admin-toolbar__spacer" />
        <span style={{ fontSize: 12, color: '#3d4f63' }}>{filtered.length} testemunho{filtered.length !== 1 ? 's' : ''}</span>
      </div>

      {filtered.length === 0 ? (
        <div className="admin-empty">
          <div className="admin-empty__title">Nenhum testemunho encontrado</div>
          <div className="admin-empty__desc">Ajusta a pesquisa ou adiciona um novo.</div>
          <Link to="/admin/testimonials/new" className="admin-btn admin-btn--primary">+ Novo testemunho</Link>
        </div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: 48 }}>Avatar</th>
                <th>Nome</th>
                <th>Papel</th>
                <th>Texto</th>
                <th style={{ width: 130 }}>Acções</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(t => (
                <tr key={t.id}>
                  <td>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#1e2a3a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>
                      {t.avatar}
                    </div>
                  </td>
                  <td><div className="admin-td-name">{t.name}</div></td>
                  <td style={{ fontSize: 12, color: '#64748b' }}>{t.role}</td>
                  <td>
                    <span style={{ fontSize: 12, color: '#64748b', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', maxWidth: 320 }}>
                      {t.text}
                    </span>
                  </td>
                  <td>
                    <div className="admin-td-actions">
                      <Link to={`/admin/testimonials/${t.id}/edit`} className="admin-btn admin-btn--ghost admin-btn--sm">Editar</Link>
                      <button className="admin-btn admin-btn--danger admin-btn--sm" onClick={() => setConfirmId(t.id)}>Eliminar</button>
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
          message={`Eliminar o testemunho de "${testimonials.find(t => t.id === confirmId)?.name}"?`}
          onConfirm={() => { deleteTestimonial(confirmId); setConfirmId(null) }}
          onCancel={() => setConfirmId(null)}
        />
      )}
    </>
  )
}
