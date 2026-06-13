import { useState } from 'react'
import { useAdminData } from '../../../contexts/AdminDataContext'

export default function AdminContact() {
  const { siteSettings, updateSettings } = useAdminData()
  const [tab, setTab] = useState(0)
  const [sec, setSec] = useState({ ...siteSettings.contact.section })
  const [page, setPage] = useState({ ...siteSettings.contact.page })
  const [saved, setSaved] = useState(false)

  const setSF = (path, val) => {
    if (!path.includes('.')) { setSec(p => ({ ...p, [path]: val })); return }
    const [head, ...rest] = path.split('.')
    setSec(p => ({ ...p, [head]: setDeep(p[head] ?? {}, rest.join('.'), val) }))
  }
  const setPF = (path, val) => {
    if (!path.includes('.')) { setPage(p => ({ ...p, [path]: val })); return }
    const [head, ...rest] = path.split('.')
    setPage(p => ({ ...p, [head]: setDeep(p[head] ?? {}, rest.join('.'), val) }))
  }

  function setDeep(obj, path, value) {
    if (!path.includes('.')) return { ...obj, [path]: value }
    const [head, ...rest] = path.split('.')
    return { ...obj, [head]: setDeep(obj[head] ?? {}, rest.join('.'), value) }
  }

  const handleSave = () => {
    updateSettings('contact', { section: sec, page })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  // Service options
  const setOption = (i, key, val) =>
    setSec(p => ({ ...p, form: { ...p.form, service: { ...p.form.service, options: p.form.service.options.map((o, idx) => idx === i ? { ...o, [key]: val } : o) } } }))
  const addOption = () =>
    setSec(p => ({ ...p, form: { ...p.form, service: { ...p.form.service, options: [...p.form.service.options, { value: '', label: '' }] } } }))
  const removeOption = (i) =>
    setSec(p => ({ ...p, form: { ...p.form, service: { ...p.form.service, options: p.form.service.options.filter((_, idx) => idx !== i) } } }))

  // Info cards
  const setCard = (i, key, val) =>
    setPage(p => ({ ...p, infoCards: p.infoCards.map((c, idx) => idx === i ? { ...c, [key]: val } : c) }))

  const TABS = ['Secção Homepage', 'Página /contacto']

  return (
    <>
      <div className="admin-form-header">
        <span className="admin-page-title">Contacto</span>
        <button className="admin-btn admin-btn--primary" onClick={handleSave}>
          {saved ? 'Guardado ✓' : 'Guardar alterações'}
        </button>
      </div>
      <p className="admin-page-sub">Textos e formulário da secção contacto e da página /contacto.</p>

      <div className="admin-tabs">
        {TABS.map((t, i) => (
          <button key={i} className={`admin-tab${tab === i ? ' active' : ''}`} onClick={() => setTab(i)}>{t}</button>
        ))}
      </div>

      {tab === 0 && (
        <div className="admin-form">
          <div className="admin-form-row" style={{ gridTemplateColumns: '1fr 1fr' }}>
            <div className="admin-form-group">
              <label className="admin-form-label">Heading</label>
              <input className="admin-form-input" value={sec.heading} onChange={e => setSF('heading', e.target.value)} />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Título (usa \n para quebra de linha)</label>
              <input className="admin-form-input" value={sec.title} onChange={e => setSF('title', e.target.value)} />
            </div>
          </div>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-form-label">Corpo</label>
              <textarea className="admin-form-textarea" rows={3} value={sec.body} onChange={e => setSF('body', e.target.value)} />
            </div>
          </div>

          <div className="admin-form-row" style={{ gridTemplateColumns: '1fr 1fr' }}>
            <div className="admin-form-group">
              <label className="admin-form-label">Label campo Nome</label>
              <input className="admin-form-input" value={sec.form.name.label} onChange={e => setSF('form.name', { ...sec.form.name, label: e.target.value })} />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Placeholder campo Nome</label>
              <input className="admin-form-input" value={sec.form.name.placeholder} onChange={e => setSF('form.name', { ...sec.form.name, placeholder: e.target.value })} />
            </div>
          </div>

          <div className="admin-form-row" style={{ gridTemplateColumns: '1fr 1fr' }}>
            <div className="admin-form-group">
              <label className="admin-form-label">Label campo Email</label>
              <input className="admin-form-input" value={sec.form.email.label} onChange={e => setSF('form.email', { ...sec.form.email, label: e.target.value })} />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Placeholder campo Email</label>
              <input className="admin-form-input" value={sec.form.email.placeholder} onChange={e => setSF('form.email', { ...sec.form.email, placeholder: e.target.value })} />
            </div>
          </div>

          <div className="admin-form-row" style={{ gridTemplateColumns: '1fr 1fr' }}>
            <div className="admin-form-group">
              <label className="admin-form-label">Label campo Mensagem</label>
              <input className="admin-form-input" value={sec.form.message.label} onChange={e => setSF('form.message', { ...sec.form.message, label: e.target.value })} />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Placeholder campo Mensagem</label>
              <input className="admin-form-input" value={sec.form.message.placeholder} onChange={e => setSF('form.message', { ...sec.form.message, placeholder: e.target.value })} />
            </div>
          </div>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-form-label">Opções de serviço</label>
              {sec.form.service.options.map((opt, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: 8, marginBottom: 8 }}>
                  <input className="admin-form-input" placeholder="value (id)" value={opt.value} onChange={e => setOption(i, 'value', e.target.value)} />
                  <input className="admin-form-input" placeholder="Label visível" value={opt.label} onChange={e => setOption(i, 'label', e.target.value)} />
                  <button className="admin-btn admin-btn--danger admin-btn--sm" onClick={() => removeOption(i)}>✕</button>
                </div>
              ))}
              <button className="admin-btn admin-btn--ghost admin-btn--sm" onClick={addOption}>+ Opção</button>
            </div>
          </div>
        </div>
      )}

      {tab === 1 && (
        <div className="admin-form">
          <div className="admin-form-row" style={{ gridTemplateColumns: '1fr 1fr' }}>
            <div className="admin-form-group">
              <label className="admin-form-label">Canais — Heading</label>
              <input className="admin-form-input" value={page.channels?.heading ?? ''} onChange={e => setPF('channels', { ...page.channels, heading: e.target.value })} />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Canais — Título</label>
              <input className="admin-form-input" value={page.channels?.title ?? ''} onChange={e => setPF('channels', { ...page.channels, title: e.target.value })} />
            </div>
          </div>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-form-label">Canais — Corpo</label>
              <textarea className="admin-form-textarea" rows={3} value={page.channels?.body ?? ''} onChange={e => setPF('channels', { ...page.channels, body: e.target.value })} />
            </div>
          </div>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-form-label">Cards de informação</label>
              {page.infoCards?.map((card, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '120px 1fr 1fr', gap: 8, marginBottom: 8 }}>
                  <input className="admin-form-input" placeholder="iconKey" value={card.iconKey} onChange={e => setCard(i, 'iconKey', e.target.value)} />
                  <input className="admin-form-input" placeholder="Label" value={card.label} onChange={e => setCard(i, 'label', e.target.value)} />
                  <input className="admin-form-input" placeholder="Valor" value={card.value} onChange={e => setCard(i, 'value', e.target.value)} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
