import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useAdminData } from '../../contexts/AdminDataContext'

const EMPTY = { label: '', src: '' }

export default function VideoForm() {
  const { id }   = useParams()
  const navigate = useNavigate()
  const { videos, addVideo, updateVideo } = useAdminData()

  const existing = id ? videos.find(v => v.id === id) : null
  const isEdit   = !!existing

  const [form, setForm] = useState(existing ? { ...existing } : { ...EMPTY })
  const [error, setError] = useState('')

  const set = (field, value) => setForm(prev => ({ ...prev, [field]: value }))

  const handleSave = () => {
    if (!form.label.trim()) { setError('O nome é obrigatório.'); return }
    if (!form.src.trim())   { setError('A URL é obrigatória.'); return }
    setError('')
    if (isEdit) updateVideo(existing.id, form)
    else        addVideo(form)
    navigate('/admin/videos')
  }

  return (
    <>
      <div className="admin-form-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link to="/admin/videos" className="admin-btn admin-btn--ghost admin-btn--sm">← Voltar</Link>
          <span className="admin-form-header__title">
            {isEdit ? `Editar — ${existing.label}` : 'Novo vídeo'}
          </span>
        </div>
        <div className="admin-form-header__actions">
          {error && <span style={{ fontSize: 12, color: '#f87171', alignSelf: 'center' }}>{error}</span>}
          <Link to="/admin/videos" className="admin-btn admin-btn--ghost">Cancelar</Link>
          <button className="admin-btn admin-btn--primary" onClick={handleSave}>Guardar</button>
        </div>
      </div>

      <div style={{ maxWidth: 560 }}>
        <div className="admin-form-group">
          <label className="admin-form-label">Nome / Etiqueta *</label>
          <input className="admin-form-input" value={form.label} onChange={e => set('label', e.target.value)} placeholder="Aerografia" />
        </div>
        <div className="admin-form-group">
          <label className="admin-form-label">URL do vídeo (.mp4) *</label>
          <input className="admin-form-input" value={form.src} onChange={e => set('src', e.target.value)} placeholder="https://…/videos/Aerografia.mp4" />
          <span className="admin-form-hint">Ficheiro hospedado no servidor remoto</span>
        </div>
        {form.src && (
          <div className="admin-form-group">
            <label className="admin-form-label">Pré-visualização</label>
            <video
              src={form.src}
              controls
              style={{ width: '100%', maxHeight: 200, borderRadius: 6, background: '#0d1117', border: '1px solid #1e2a3a' }}
            />
          </div>
        )}
      </div>
    </>
  )
}
