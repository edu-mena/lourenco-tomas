import { useState } from 'react'
import { useAdminData } from '../../../contexts/AdminDataContext'

export default function AdminHero() {
  const { siteSettings, updateSettings } = useAdminData()
  const [form, setForm] = useState({ ...siteSettings.hero })
  const [saved, setSaved] = useState(false)

  const set = (key, val) => setForm(p => ({ ...p, [key]: val }))

  const addTitleLine  = () => set('title', [...form.title, ''])
  const removeTitleLine = (i) => set('title', form.title.filter((_, idx) => idx !== i))
  const setTitleLine  = (i, val) => set('title', form.title.map((l, idx) => idx === i ? val : l))

  const handleSave = () => {
    updateSettings('hero', form)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <>
      <div className="admin-form-header">
        <span className="admin-page-title">Hero</span>
        <button className="admin-btn admin-btn--primary" onClick={handleSave}>
          {saved ? 'Guardado ✓' : 'Guardar alterações'}
        </button>
      </div>
      <p className="admin-page-sub">Écran completo da homepage — título, subtítulo e botões de acção.</p>

      <div className="admin-form">
        <div className="admin-form-row">
          <div className="admin-form-group">
            <label className="admin-form-label">Linhas do título</label>
            {form.title.map((line, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                <input
                  className="admin-form-input"
                  value={line}
                  onChange={e => setTitleLine(i, e.target.value)}
                  placeholder={`Linha ${i + 1}`}
                />
                {form.title.length > 1 && (
                  <button className="admin-btn admin-btn--danger admin-btn--sm" onClick={() => removeTitleLine(i)}>✕</button>
                )}
              </div>
            ))}
            <button className="admin-btn admin-btn--ghost admin-btn--sm" onClick={addTitleLine}>+ Linha</button>
          </div>
        </div>

        <div className="admin-form-row">
          <div className="admin-form-group">
            <label className="admin-form-label">Subtítulo</label>
            <input className="admin-form-input" value={form.subtitle} onChange={e => set('subtitle', e.target.value)} />
          </div>
        </div>

        <div className="admin-form-row" style={{ gridTemplateColumns: '1fr 1fr' }}>
          <div className="admin-form-group">
            <label className="admin-form-label">Botão primário</label>
            <input className="admin-form-input" value={form.ctaPrimary} onChange={e => set('ctaPrimary', e.target.value)} />
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Botão secundário</label>
            <input className="admin-form-input" value={form.ctaSecondary} onChange={e => set('ctaSecondary', e.target.value)} />
          </div>
        </div>

        <div className="admin-form-row">
          <div className="admin-form-group">
            <label className="admin-form-label">Etiqueta scroll</label>
            <input className="admin-form-input" value={form.scrollLabel} onChange={e => set('scrollLabel', e.target.value)} />
          </div>
        </div>
      </div>
    </>
  )
}
