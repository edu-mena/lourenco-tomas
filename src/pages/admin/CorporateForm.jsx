import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useAdminData } from '../../contexts/AdminDataContext'
import MediaPreview from '../../components/admin/MediaPreview'

const WORK_TYPES = ['Retrato', 'Mural', 'Tela', 'Instalação', 'Impressão']

const EMPTY = { name: '', sector: '', cover: '', year: String(new Date().getFullYear()), desc: '', works: [] }

function slugify(str) {
  return str.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}

export default function CorporateForm() {
  const { id }   = useParams()
  const navigate = useNavigate()
  const { companies, addCompany, updateCompany } = useAdminData()

  const existing = id ? companies.find(c => c.id === id) : null
  const isEdit   = !!existing

  const [form, setForm] = useState(existing
    ? { ...existing, works: existing.works?.map(w => ({ ...w })) ?? [] }
    : { ...EMPTY }
  )
  const [error, setError] = useState('')

  const set = (field, value) => setForm(prev => ({ ...prev, [field]: value }))

  const handleNameChange = (value) =>
    setForm(prev => ({ ...prev, name: value, slug: slugify(value) }))

  // ── Works ─────────────────────────────────────────
  const addWork = () =>
    setForm(prev => ({ ...prev, works: [...prev.works, { id: `w-${Date.now()}`, title: '', type: 'Retrato', img: '', year: String(new Date().getFullYear()) }] }))

  const updateWork = (i, field, value) =>
    setForm(prev => ({ ...prev, works: prev.works.map((w, idx) => idx === i ? { ...w, [field]: value } : w) }))

  const removeWork = (i) =>
    setForm(prev => ({ ...prev, works: prev.works.filter((_, idx) => idx !== i) }))

  const handleSave = () => {
    if (!form.name.trim()) { setError('O nome é obrigatório.'); return }
    setError('')
    if (isEdit) updateCompany(existing.id, form)
    else        addCompany(form)
    navigate('/admin/corporate')
  }

  return (
    <>
      <div className="admin-form-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link to="/admin/corporate" className="admin-btn admin-btn--ghost admin-btn--sm">← Voltar</Link>
          <span className="admin-form-header__title">
            {isEdit ? `Editar — ${existing.name}` : 'Novo cliente'}
          </span>
        </div>
        <div className="admin-form-header__actions">
          {error && <span style={{ fontSize: 12, color: '#f87171', alignSelf: 'center' }}>{error}</span>}
          <Link to="/admin/corporate" className="admin-btn admin-btn--ghost">Cancelar</Link>
          <button className="admin-btn admin-btn--primary" onClick={handleSave}>Guardar</button>
        </div>
      </div>

      <div className="admin-form-row">
        <div className="admin-form-group">
          <label className="admin-form-label">Nome da empresa *</label>
          <input className="admin-form-input" value={form.name} onChange={e => handleNameChange(e.target.value)} placeholder="Banco BAI" />
        </div>
        <div className="admin-form-group">
          <label className="admin-form-label">Sector</label>
          <input className="admin-form-input" value={form.sector} onChange={e => set('sector', e.target.value)} placeholder="Banca & Finanças" />
        </div>
      </div>

      <div className="admin-form-row">
        <div className="admin-form-group">
          <label className="admin-form-label">Ano</label>
          <input className="admin-form-input" type="number" value={form.year} onChange={e => set('year', e.target.value)} />
        </div>
        <div className="admin-form-group">
          <label className="admin-form-label">Slug</label>
          <input className="admin-form-input" value={form.slug ?? ''} onChange={e => set('slug', e.target.value)} placeholder="banco-bai" />
        </div>
      </div>

      <div className="admin-form-group">
        <label className="admin-form-label">Descrição</label>
        <textarea className="admin-form-textarea" value={form.desc} onChange={e => set('desc', e.target.value)} placeholder="Série de retratos institucionais…" style={{ minHeight: 72 }} />
      </div>

      <MediaPreview label="URL da imagem de capa" value={form.cover} onChange={v => set('cover', v)} />

      {/* Works */}
      <div className="admin-form-group" style={{ marginTop: 8 }}>
        <label className="admin-form-label" style={{ marginBottom: 10 }}>
          Obras — {form.works.length} item{form.works.length !== 1 ? 's' : ''}
        </label>
        <div className="admin-media-list">
          {form.works.map((w, i) => (
            <div key={w.id || i} className="admin-media-item">
              <div className="admin-media-item__header">
                <span className="admin-media-item__num">#{i + 1}</span>
                <select
                  className="admin-form-select"
                  style={{ width: 'auto', padding: '4px 8px', fontSize: 12 }}
                  value={w.type}
                  onChange={e => updateWork(i, 'type', e.target.value)}
                >
                  {WORK_TYPES.map(t => <option key={t}>{t}</option>)}
                </select>
                <span className="admin-media-item__spacer" />
                <button className="admin-btn admin-btn--danger admin-btn--icon" onClick={() => removeWork(i)}>✕</button>
              </div>
              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label className="admin-form-label">Título</label>
                  <input className="admin-form-input" value={w.title} onChange={e => updateWork(i, 'title', e.target.value)} placeholder="Retrato Institucional — CEO" />
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Ano</label>
                  <input className="admin-form-input" value={w.year} onChange={e => updateWork(i, 'year', e.target.value)} placeholder="2024" />
                </div>
              </div>
              <MediaPreview label="URL da imagem" value={w.img} onChange={v => updateWork(i, 'img', v)} />
            </div>
          ))}
        </div>
        <button className="admin-add-btn" onClick={addWork}>+ Adicionar obra</button>
      </div>
    </>
  )
}
