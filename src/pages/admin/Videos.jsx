import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAdminData } from '../../contexts/AdminDataContext'
import ConfirmDialog from '../../components/admin/ConfirmDialog'

export default function AdminVideos() {
  const { videos, deleteVideo } = useAdminData()
  const [confirmId, setConfirmId] = useState(null)

  return (
    <>
      <div className="admin-form-header">
        <span className="admin-page-title">Vídeos</span>
        <Link to="/admin/videos/new" className="admin-btn admin-btn--primary">+ Novo vídeo</Link>
      </div>

      {videos.length === 0 ? (
        <div className="admin-empty">
          <div className="admin-empty__title">Nenhum vídeo</div>
          <div className="admin-empty__desc">Adiciona o primeiro vídeo ao reel.</div>
          <Link to="/admin/videos/new" className="admin-btn admin-btn--primary">+ Novo vídeo</Link>
        </div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: 36 }}>#</th>
                <th>Etiqueta</th>
                <th>URL</th>
                <th style={{ width: 130 }}>Acções</th>
              </tr>
            </thead>
            <tbody>
              {videos.map((v, i) => (
                <tr key={v.id}>
                  <td style={{ color: '#3d4f63', fontSize: 12 }}>{i + 1}</td>
                  <td><div className="admin-td-name">{v.label}</div></td>
                  <td>
                    <span style={{ fontSize: 11, color: '#475569', fontFamily: 'monospace', wordBreak: 'break-all' }}>
                      {v.src}
                    </span>
                  </td>
                  <td>
                    <div className="admin-td-actions">
                      <Link to={`/admin/videos/${v.id}/edit`} className="admin-btn admin-btn--ghost admin-btn--sm">Editar</Link>
                      <button className="admin-btn admin-btn--danger admin-btn--sm" onClick={() => setConfirmId(v.id)}>Eliminar</button>
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
          message={`Eliminar "${videos.find(v => v.id === confirmId)?.label}"?`}
          onConfirm={() => { deleteVideo(confirmId); setConfirmId(null) }}
          onCancel={() => setConfirmId(null)}
        />
      )}
    </>
  )
}
