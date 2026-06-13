import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useAdminData } from '../../contexts/AdminDataContext'
import MediaPreview from '../../components/admin/MediaPreview'

const CATS = [
  { value: 'tshirts',    label: 'T-Shirts' },
  { value: 'murais',     label: 'Murais' },
  { value: 'telas',      label: 'Telas' },
  { value: 'calcados',   label: 'Calçados' },
  { value: 'homenagens', label: 'Homenagens' },
]

const EMPTY = { cat: 'tshirts', label: '', img: '', size: '', technique: '' }

export default function GalleryForm() {
  const { id }   = useParams()
  const navigate = useNavigate()
  const { galleryItems, addGalleryItem, updateGalleryItem } = useAdminData()

  const existing = id ? galleryItems.find(g => String(g.id) === id) : null
  const isEdit   = !!existing

  const [form, setForm] = useState(existing ? { ...existing } : { ...EMPTY })
  const [error, setError] = useState('')

  const set = (field, value) => setForm(prev => ({ ...prev, [field]: value }))

  const handleSave = () => {
    if (!form.label.trim()) { setError('O nome é obrigatório.'); return }
    setError('')
    if (isEdit) updateGalleryItem(existing.id, form)
    else        addGalleryItem(form)
    navigate('/admin/gallery')
  }

  return (
    <>
      <div className="admin-form-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link to="/admin/gallery" className="admin-btn admin-btn--ghost admin-btn--sm">← Voltar</Link>
          <span className="admin-form-header__title">
            {isEdit ? `Editar — ${existing.label}` : 'Nova obra'}
          </span>
        </div>
        <div className="admin-form-header__actions">
          {error && <span style={{ fontSize: 12, color: '#f87171', alignSelf: 'center' }}>{error}</span>}
          <Link to="/admin/gallery" className="admin-btn admin-btn--ghost">Cancelar</Link>
          <button className="admin-btn admin-btn--primary" onClick={handleSave}>Guardar</button>
        </div>
      </div>

      <div style={{ maxWidth: 640 }}>
        <div className="admin-form-row">
          <div className="admin-form-group">
            <label className="admin-form-label">Nome / Título *</label>
            <input className="admin-form-input" value={form.label} onChange={e => set('label', e.target.value)} placeholder="T-Shirt Customizada" />
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Categoria</label>
            <select className="admin-form-select" value={form.cat} onChange={e => set('cat', e.target.value)}>
              {CATS.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </div>
        </div>

        <div className="admin-form-row">
          <div className="admin-form-group">
            <label className="admin-form-label">Dimensões / Tamanho</label>
            <input className="admin-form-input" value={form.size} onChange={e => set('size', e.target.value)} placeholder="T-Shirt standard" />
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Técnica</label>
            <input className="admin-form-input" value={form.technique} onChange={e => set('technique', e.target.value)} placeholder="Aerografia têxtil" />
          </div>
        </div>

        <MediaPreview label="URL da imagem" value={form.img} onChange={v => set('img', v)} />
      </div>
    </>
  )
}
