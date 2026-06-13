import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAdminData } from '../../contexts/AdminDataContext'
import ConfirmDialog from '../../components/admin/ConfirmDialog'

export default function AdminCorporate() {
  const { companies, deleteCompany } = useAdminData()
  const [confirmId, setConfirmId] = useState(null)

  return (
    <>
      <div className="admin-form-header">
        <span className="admin-page-title">Clientes Corporativos</span>
        <Link to="/admin/corporate/new" className="admin-btn admin-btn--primary">+ Novo cliente</Link>
      </div>

      {companies.length === 0 ? (
        <div className="admin-empty">
          <div className="admin-empty__title">Nenhum cliente corporativo</div>
          <div className="admin-empty__desc">Adiciona o primeiro cliente.</div>
          <Link to="/admin/corporate/new" className="admin-btn admin-btn--primary">+ Novo cliente</Link>
        </div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: 52 }}>Capa</th>
                <th>Empresa</th>
                <th>Sector</th>
                <th>Ano</th>
                <th style={{ width: 72, textAlign: 'center' }}>Obras</th>
                <th style={{ width: 130 }}>Acções</th>
              </tr>
            </thead>
            <tbody>
              {companies.map(c => (
                <tr key={c.id}>
                  <td>{c.cover ? <img src={c.cover} alt="" className="admin-thumb" /> : <div className="admin-thumb-placeholder">—</div>}</td>
                  <td>
                    <div className="admin-td-name">{c.name}</div>
                    <div className="admin-td-sub">{c.slug}</div>
                  </td>
                  <td>{c.sector || <span style={{ color: '#3d4f63' }}>—</span>}</td>
                  <td>{c.year}</td>
                  <td style={{ textAlign: 'center' }}>
                    <span className="admin-badge">{c.works?.length ?? 0}</span>
                  </td>
                  <td>
                    <div className="admin-td-actions">
                      <Link to={`/admin/corporate/${c.id}/edit`} className="admin-btn admin-btn--ghost admin-btn--sm">Editar</Link>
                      <button className="admin-btn admin-btn--danger admin-btn--sm" onClick={() => setConfirmId(c.id)}>Eliminar</button>
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
          message={`Eliminar "${companies.find(c => c.id === confirmId)?.name}" e todas as suas obras?`}
          onConfirm={() => { deleteCompany(confirmId); setConfirmId(null) }}
          onCancel={() => setConfirmId(null)}
        />
      )}
    </>
  )
}
