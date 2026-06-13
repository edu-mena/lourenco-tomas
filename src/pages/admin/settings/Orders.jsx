import { useState } from 'react'
import { useAdminData } from '../../../contexts/AdminDataContext'

export default function AdminOrders() {
  const { siteSettings, updateSettings } = useAdminData()
  const [tab, setTab] = useState(0)
  const [form, setForm] = useState({
    services: siteSettings.orders.services.map(s => ({ ...s, includes: [...s.includes] })),
    steps:    siteSettings.orders.steps.map(s => ({ ...s })),
    faqs:     siteSettings.orders.faqs.map(f => ({ ...f })),
  })
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    updateSettings('orders', { ...siteSettings.orders, ...form })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  // ── Services ──────────────────────────────────────
  const setService = (i, key, val) =>
    setForm(p => ({ ...p, services: p.services.map((s, idx) => idx === i ? { ...s, [key]: val } : s) }))
  const setInclude = (si, ii, val) =>
    setForm(p => ({ ...p, services: p.services.map((s, idx) => idx === si ? { ...s, includes: s.includes.map((inc, jdx) => jdx === ii ? val : inc) } : s) }))
  const addInclude = (si) =>
    setForm(p => ({ ...p, services: p.services.map((s, idx) => idx === si ? { ...s, includes: [...s.includes, ''] } : s) }))
  const removeInclude = (si, ii) =>
    setForm(p => ({ ...p, services: p.services.map((s, idx) => idx === si ? { ...s, includes: s.includes.filter((_, jdx) => jdx !== ii) } : s) }))
  const addService = () =>
    setForm(p => ({ ...p, services: [...p.services, { icon: '◈', title: '', desc: '', price: '', includes: [] }] }))
  const removeService = (i) =>
    setForm(p => ({ ...p, services: p.services.filter((_, idx) => idx !== i) }))

  // ── Steps ─────────────────────────────────────────
  const setStep = (i, key, val) =>
    setForm(p => ({ ...p, steps: p.steps.map((s, idx) => idx === i ? { ...s, [key]: val } : s) }))
  const addStep = () =>
    setForm(p => ({ ...p, steps: [...p.steps, { num: String(p.steps.length + 1).padStart(2, '0'), title: '', desc: '' }] }))
  const removeStep = (i) =>
    setForm(p => ({ ...p, steps: p.steps.filter((_, idx) => idx !== i) }))

  // ── FAQs ──────────────────────────────────────────
  const setFaq = (i, key, val) =>
    setForm(p => ({ ...p, faqs: p.faqs.map((f, idx) => idx === i ? { ...f, [key]: val } : f) }))
  const addFaq = () =>
    setForm(p => ({ ...p, faqs: [...p.faqs, { q: '', a: '' }] }))
  const removeFaq = (i) =>
    setForm(p => ({ ...p, faqs: p.faqs.filter((_, idx) => idx !== i) }))

  const TABS = ['Serviços', 'Processo', 'FAQ']

  return (
    <>
      <div className="admin-form-header">
        <span className="admin-page-title">Encomendas</span>
        <button className="admin-btn admin-btn--primary" onClick={handleSave}>
          {saved ? 'Guardado ✓' : 'Guardar alterações'}
        </button>
      </div>
      <p className="admin-page-sub">Conteúdo da página /encomendas — serviços, processo e perguntas frequentes.</p>

      <div className="admin-tabs">
        {TABS.map((t, i) => (
          <button key={i} className={`admin-tab${tab === i ? ' active' : ''}`} onClick={() => setTab(i)}>{t}</button>
        ))}
      </div>

      {tab === 0 && (
        <div className="admin-form">
          {form.services.map((svc, i) => (
            <div key={i} style={{ background: '#0d1117', border: '1px solid #1e2a3a', borderRadius: 8, padding: 16, marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span style={{ color: '#c09060', fontWeight: 600, fontSize: 14 }}>Serviço {i + 1}</span>
                <button className="admin-btn admin-btn--danger admin-btn--sm" onClick={() => removeService(i)}>Eliminar</button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr 1fr', gap: 8, marginBottom: 8 }}>
                <div className="admin-form-group" style={{ margin: 0 }}>
                  <label className="admin-form-label">Ícone</label>
                  <input className="admin-form-input" value={svc.icon} onChange={e => setService(i, 'icon', e.target.value)} />
                </div>
                <div className="admin-form-group" style={{ margin: 0 }}>
                  <label className="admin-form-label">Título</label>
                  <input className="admin-form-input" value={svc.title} onChange={e => setService(i, 'title', e.target.value)} />
                </div>
                <div className="admin-form-group" style={{ margin: 0 }}>
                  <label className="admin-form-label">Preço</label>
                  <input className="admin-form-input" value={svc.price} onChange={e => setService(i, 'price', e.target.value)} />
                </div>
              </div>
              <div className="admin-form-group" style={{ margin: '0 0 8px' }}>
                <label className="admin-form-label">Descrição</label>
                <textarea className="admin-form-textarea" rows={2} value={svc.desc} onChange={e => setService(i, 'desc', e.target.value)} />
              </div>
              <div className="admin-form-group" style={{ margin: 0 }}>
                <label className="admin-form-label">Inclui</label>
                {svc.includes.map((inc, ii) => (
                  <div key={ii} style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
                    <input className="admin-form-input" value={inc} onChange={e => setInclude(i, ii, e.target.value)} />
                    <button className="admin-btn admin-btn--danger admin-btn--sm" onClick={() => removeInclude(i, ii)}>✕</button>
                  </div>
                ))}
                <button className="admin-btn admin-btn--ghost admin-btn--sm" onClick={() => addInclude(i)}>+ Item</button>
              </div>
            </div>
          ))}
          <button className="admin-btn admin-btn--ghost" onClick={addService}>+ Serviço</button>
        </div>
      )}

      {tab === 1 && (
        <div className="admin-form">
          {form.steps.map((step, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '80px 1fr 1fr auto', gap: 8, alignItems: 'start', marginBottom: 10 }}>
              <div className="admin-form-group" style={{ margin: 0 }}>
                <label className="admin-form-label">Número</label>
                <input className="admin-form-input" value={step.num} onChange={e => setStep(i, 'num', e.target.value)} />
              </div>
              <div className="admin-form-group" style={{ margin: 0 }}>
                <label className="admin-form-label">Título</label>
                <input className="admin-form-input" value={step.title} onChange={e => setStep(i, 'title', e.target.value)} />
              </div>
              <div className="admin-form-group" style={{ margin: 0 }}>
                <label className="admin-form-label">Descrição</label>
                <textarea className="admin-form-textarea" rows={2} value={step.desc} onChange={e => setStep(i, 'desc', e.target.value)} />
              </div>
              <button className="admin-btn admin-btn--danger admin-btn--sm" style={{ marginTop: 20 }} onClick={() => removeStep(i)}>✕</button>
            </div>
          ))}
          <button className="admin-btn admin-btn--ghost" onClick={addStep}>+ Passo</button>
        </div>
      )}

      {tab === 2 && (
        <div className="admin-form">
          {form.faqs.map((faq, i) => (
            <div key={i} style={{ background: '#0d1117', border: '1px solid #1e2a3a', borderRadius: 8, padding: 14, marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ color: '#64748b', fontSize: 12 }}>FAQ {i + 1}</span>
                <button className="admin-btn admin-btn--danger admin-btn--sm" onClick={() => removeFaq(i)}>Eliminar</button>
              </div>
              <div className="admin-form-group" style={{ margin: '0 0 8px' }}>
                <label className="admin-form-label">Pergunta</label>
                <input className="admin-form-input" value={faq.q} onChange={e => setFaq(i, 'q', e.target.value)} />
              </div>
              <div className="admin-form-group" style={{ margin: 0 }}>
                <label className="admin-form-label">Resposta</label>
                <textarea className="admin-form-textarea" rows={3} value={faq.a} onChange={e => setFaq(i, 'a', e.target.value)} />
              </div>
            </div>
          ))}
          <button className="admin-btn admin-btn--ghost" onClick={addFaq}>+ Pergunta</button>
        </div>
      )}
    </>
  )
}
