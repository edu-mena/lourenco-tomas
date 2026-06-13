import { useState } from 'react'
import { useAdminData } from '../../../contexts/AdminDataContext'

export default function AdminFooter() {
  const { siteSettings, updateSettings } = useAdminData()
  const [footer, setFooter] = useState({ ...siteSettings.footer, links: siteSettings.footer.links.map(l => ({ ...l })) })
  const [nav, setNav] = useState({ ...siteSettings.nav, cta: { ...siteSettings.nav.cta } })
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    updateSettings('footer', footer)
    updateSettings('nav', nav)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  // ── Footer links ──────────────────────────────────
  const setLink = (i, key, val) =>
    setFooter(p => ({ ...p, links: p.links.map((l, idx) => idx === i ? { ...l, [key]: val } : l) }))
  const addLink = () =>
    setFooter(p => ({ ...p, links: [...p.links, { to: '/', label: '' }] }))
  const removeLink = (i) =>
    setFooter(p => ({ ...p, links: p.links.filter((_, idx) => idx !== i) }))
  const moveLink = (i, dir) => {
    const arr = [...footer.links]
    const j = i + dir
    if (j < 0 || j >= arr.length) return
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
    setFooter(p => ({ ...p, links: arr }))
  }

  return (
    <>
      <div className="admin-form-header">
        <span className="admin-page-title">Rodapé & Navegação</span>
        <button className="admin-btn admin-btn--primary" onClick={handleSave}>
          {saved ? 'Guardado ✓' : 'Guardar alterações'}
        </button>
      </div>
      <p className="admin-page-sub">Logótipo, botão de acção da nav, citação e links do rodapé.</p>

      <div className="admin-form">
        <div style={{ color: '#c09060', fontSize: 13, fontWeight: 600, marginBottom: 12 }}>Navegação</div>

        <div className="admin-form-row" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
          <div className="admin-form-group">
            <label className="admin-form-label">Logótipo (texto)</label>
            <input className="admin-form-input" value={nav.logo} onChange={e => setNav(p => ({ ...p, logo: e.target.value }))} />
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">CTA — Label</label>
            <input className="admin-form-input" value={nav.cta.label} onChange={e => setNav(p => ({ ...p, cta: { ...p.cta, label: e.target.value } }))} />
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">CTA — Destino</label>
            <input className="admin-form-input" value={nav.cta.to} onChange={e => setNav(p => ({ ...p, cta: { ...p.cta, to: e.target.value } }))} />
          </div>
        </div>

        <div className="admin-form-row">
          <div className="admin-form-group">
            <label className="admin-form-label">Aria-label menu mobile</label>
            <input className="admin-form-input" value={nav.mobileAriaLabel} onChange={e => setNav(p => ({ ...p, mobileAriaLabel: e.target.value }))} />
          </div>
        </div>

        <div style={{ height: 1, background: '#1e2a3a', margin: '8px 0 20px' }} />
        <div style={{ color: '#c09060', fontSize: 13, fontWeight: 600, marginBottom: 12 }}>Rodapé</div>

        <div className="admin-form-row">
          <div className="admin-form-group">
            <label className="admin-form-label">Citação</label>
            <textarea className="admin-form-textarea" rows={2} value={footer.quote} onChange={e => setFooter(p => ({ ...p, quote: e.target.value }))} />
          </div>
        </div>

        <div className="admin-form-row">
          <div className="admin-form-group">
            <label className="admin-form-label">Links de rodapé</label>
            {footer.links.map((link, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'center' }}>
                <input className="admin-form-input" placeholder="Destino (ex: /obras)" value={link.to} onChange={e => setLink(i, 'to', e.target.value)} />
                <input className="admin-form-input" placeholder="Label" value={link.label} onChange={e => setLink(i, 'label', e.target.value)} />
                <button className="admin-btn admin-btn--ghost admin-btn--sm" onClick={() => moveLink(i, -1)} disabled={i === 0}>↑</button>
                <button className="admin-btn admin-btn--ghost admin-btn--sm" onClick={() => moveLink(i, 1)} disabled={i === footer.links.length - 1}>↓</button>
                <button className="admin-btn admin-btn--danger admin-btn--sm" onClick={() => removeLink(i)}>✕</button>
              </div>
            ))}
            <button className="admin-btn admin-btn--ghost admin-btn--sm" onClick={addLink}>+ Link</button>
          </div>
        </div>
      </div>
    </>
  )
}
