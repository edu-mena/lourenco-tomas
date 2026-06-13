import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useAdminData } from '../../contexts/AdminDataContext'

const EMPTY = { name: '', role: '', avatar: '👤', text: '' }

export default function TestimonialForm() {
  const { id }   = useParams()
  const navigate = useNavigate()
  const { testimonials, addTestimonial, updateTestimonial } = useAdminData()

  const existing = id ? testimonials.find(t => String(t.id) === id) : null
  const isEdit   = !!existing

  const [form, setForm] = useState(existing ? { ...existing } : { ...EMPTY })
  const [error, setError] = useState('')

  const set = (field, value) => setForm(prev => ({ ...prev, [field]: value }))

  const handleSave = () => {
    if (!form.name.trim()) { setError('O nome é obrigatório.'); return }
    if (!form.text.trim()) { setError('O texto é obrigatório.'); return }
    setError('')
    if (isEdit) updateTestimonial(existing.id, form)
    else        addTestimonial(form)
    navigate('/admin/testimonials')
  }

  return (
    <>
      <div className="admin-form-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link to="/admin/testimonials" className="admin-btn admin-btn--ghost admin-btn--sm">← Voltar</Link>
          <span className="admin-form-header__title">
            {isEdit ? `Editar — ${existing.name}` : 'Novo testemunho'}
          </span>
        </div>
        <div className="admin-form-header__actions">
          {error && <span style={{ fontSize: 12, color: '#f87171', alignSelf: 'center' }}>{error}</span>}
          <Link to="/admin/testimonials" className="admin-btn admin-btn--ghost">Cancelar</Link>
          <button className="admin-btn admin-btn--primary" onClick={handleSave}>Guardar</button>
        </div>
      </div>

      <div style={{ maxWidth: 580 }}>
        <div className="admin-form-row">
          <div className="admin-form-group">
            <label className="admin-form-label">Nome *</label>
            <input className="admin-form-input" value={form.name} onChange={e => set('name', e.target.value)} placeholder="Maria Santos" />
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Avatar (emoji ou iniciais)</label>
            <input className="admin-form-input" value={form.avatar} onChange={e => set('avatar', e.target.value)} placeholder="👩🏾 ou MS" style={{ fontSize: 18 }} />
          </div>
        </div>

        <div className="admin-form-group">
          <label className="admin-form-label">Papel / Serviço contratado</label>
          <input className="admin-form-input" value={form.role} onChange={e => set('role', e.target.value)} placeholder="Cliente — T-Shirt Personalizada" />
        </div>

        <div className="admin-form-group">
          <label className="admin-form-label">Testemunho *</label>
          <textarea className="admin-form-textarea" value={form.text} onChange={e => set('text', e.target.value)} placeholder="O trabalho ficou incrível…" style={{ minHeight: 120 }} />
        </div>
      </div>
    </>
  )
}
