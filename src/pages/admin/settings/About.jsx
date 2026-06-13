import { useState } from 'react'
import { useAdminData } from '../../../contexts/AdminDataContext'
import MediaPreview from '../../../components/admin/MediaPreview'

function setPath(obj, path, value) {
  if (!path.includes('.')) return { ...obj, [path]: value }
  const [head, ...rest] = path.split('.')
  return { ...obj, [head]: setPath(obj[head] ?? {}, rest.join('.'), value) }
}

export default function AdminAbout() {
  const { siteSettings, updateSettings } = useAdminData()
  const [tab, setTab] = useState(0)
  const [section, setSection] = useState({ ...siteSettings.about.section })
  const [page, setPage] = useState({ ...siteSettings.about.page })
  const [saved, setSaved] = useState(false)

  const setS = (key, val) => setSection(p => ({ ...p, [key]: val }))
  const setP = (path, val) => setPage(p => setPath(p, path, val))

  const handleSave = () => {
    updateSettings('about', { section, page })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  // ── Section: body paragraphs ──────────────────────
  const addBodyPara   = () => setS('body', [...section.body, ''])
  const removeBodyPara = (i) => setS('body', section.body.filter((_, idx) => idx !== i))
  const setBodyPara   = (i, val) => setS('body', section.body.map((p, idx) => idx === i ? val : p))

  // ── Section: cards ────────────────────────────────
  const setCard = (i, key, val) => setS('cards', section.cards.map((c, idx) => idx === i ? { ...c, [key]: val } : c))

  // ── Page: paragraphs ──────────────────────────────
  const addPara   = () => setP('paragraphs', [...page.paragraphs, ''])
  const removePara = (i) => setP('paragraphs', page.paragraphs.filter((_, idx) => idx !== i))
  const setPara   = (i, val) => setP('paragraphs', page.paragraphs.map((p, idx) => idx === i ? val : p))

  // ── Page: stats ───────────────────────────────────
  const setStat = (i, key, val) => setP('stats', page.stats.map((s, idx) => idx === i ? { ...s, [key]: val } : s))

  // ── Page: pillars ─────────────────────────────────
  const setPillar = (i, key, val) => setP('pillars', page.pillars.map((p, idx) => idx === i ? { ...p, [key]: val } : p))

  const TABS = ['Secção Homepage', 'Página /sobre']

  return (
    <>
      <div className="admin-form-header">
        <span className="admin-page-title">Sobre</span>
        <button className="admin-btn admin-btn--primary" onClick={handleSave}>
          {saved ? 'Guardado ✓' : 'Guardar alterações'}
        </button>
      </div>
      <p className="admin-page-sub">Conteúdo da secção sobre na homepage e da página /sobre.</p>

      <div className="admin-tabs">
        {TABS.map((t, i) => (
          <button key={i} className={`admin-tab${tab === i ? ' active' : ''}`} onClick={() => setTab(i)}>{t}</button>
        ))}
      </div>

      {tab === 0 && (
        <div className="admin-form">
          <div className="admin-form-row" style={{ gridTemplateColumns: '1fr 1fr' }}>
            <div className="admin-form-group">
              <label className="admin-form-label">Label</label>
              <input className="admin-form-input" value={section.label} onChange={e => setS('label', e.target.value)} />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Heading</label>
              <input className="admin-form-input" value={section.heading} onChange={e => setS('heading', e.target.value)} />
            </div>
          </div>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-form-label">Parágrafos do corpo</label>
              {section.body.map((para, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                  <textarea
                    className="admin-form-textarea"
                    rows={2}
                    value={para}
                    onChange={e => setBodyPara(i, e.target.value)}
                  />
                  {section.body.length > 1 && (
                    <button className="admin-btn admin-btn--danger admin-btn--sm" onClick={() => removeBodyPara(i)}>✕</button>
                  )}
                </div>
              ))}
              <button className="admin-btn admin-btn--ghost admin-btn--sm" onClick={addBodyPara}>+ Parágrafo</button>
            </div>
          </div>

          <div className="admin-form-row" style={{ gridTemplateColumns: '1fr 1fr' }}>
            <div className="admin-form-group">
              <label className="admin-form-label">Imagem</label>
              <MediaPreview value={section.image} onChange={val => setS('image', val)} />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Alt da imagem</label>
              <input className="admin-form-input" value={section.imageAlt} onChange={e => setS('imageAlt', e.target.value)} />
              <label className="admin-form-label" style={{ marginTop: 16 }}>Label do CTA</label>
              <input className="admin-form-input" value={section.ctaLabel} onChange={e => setS('ctaLabel', e.target.value)} />
            </div>
          </div>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-form-label">Cards de categoria</label>
              {section.cards.map((card, i) => (
                <div key={i} style={{ background: '#0d1117', border: '1px solid #1e2a3a', borderRadius: 8, padding: 12, marginBottom: 12 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 8 }}>
                    <div className="admin-form-group" style={{ margin: 0 }}>
                      <label className="admin-form-label">Label</label>
                      <input className="admin-form-input" value={card.label} onChange={e => setCard(i, 'label', e.target.value)} />
                    </div>
                    <div className="admin-form-group" style={{ margin: 0 }}>
                      <label className="admin-form-label">Key</label>
                      <input className="admin-form-input" value={card.key} onChange={e => setCard(i, 'key', e.target.value)} />
                    </div>
                  </div>
                  <div className="admin-form-group" style={{ margin: 0 }}>
                    <label className="admin-form-label">Descrição</label>
                    <input className="admin-form-input" value={card.desc} onChange={e => setCard(i, 'desc', e.target.value)} />
                  </div>
                  <div className="admin-form-group" style={{ margin: '8px 0 0' }}>
                    <label className="admin-form-label">Imagem URL</label>
                    <MediaPreview value={card.img} onChange={val => setCard(i, 'img', val)} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 1 && (
        <div className="admin-form">
          <div className="admin-form-row" style={{ gridTemplateColumns: '1fr 1fr' }}>
            <div className="admin-form-group">
              <label className="admin-form-label">Imagem bio</label>
              <MediaPreview value={page.bioImage} onChange={val => setP('bioImage', val)} />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Alt da imagem bio</label>
              <input className="admin-form-input" value={page.bioImageAlt} onChange={e => setP('bioImageAlt', e.target.value)} />
              <label className="admin-form-label" style={{ marginTop: 16 }}>Badge — número</label>
              <input className="admin-form-input" value={page.badge?.num ?? ''} onChange={e => setP('badge', { ...page.badge, num: e.target.value })} />
              <label className="admin-form-label" style={{ marginTop: 8 }}>Badge — texto</label>
              <input className="admin-form-input" value={page.badge?.text ?? ''} onChange={e => setP('badge', { ...page.badge, text: e.target.value })} />
            </div>
          </div>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-form-label">Parágrafos da bio</label>
              {page.paragraphs.map((para, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                  <textarea
                    className="admin-form-textarea"
                    rows={3}
                    value={para}
                    onChange={e => setPara(i, e.target.value)}
                  />
                  {page.paragraphs.length > 1 && (
                    <button className="admin-btn admin-btn--danger admin-btn--sm" onClick={() => removePara(i)}>✕</button>
                  )}
                </div>
              ))}
              <button className="admin-btn admin-btn--ghost admin-btn--sm" onClick={addPara}>+ Parágrafo</button>
            </div>
          </div>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-form-label">Estatísticas</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                {page.stats.map((stat, i) => (
                  <div key={i} style={{ background: '#0d1117', border: '1px solid #1e2a3a', borderRadius: 8, padding: 10 }}>
                    <div className="admin-form-group" style={{ margin: '0 0 6px' }}>
                      <label className="admin-form-label">Número</label>
                      <input className="admin-form-input" value={stat.num} onChange={e => setStat(i, 'num', e.target.value)} />
                    </div>
                    <div className="admin-form-group" style={{ margin: 0 }}>
                      <label className="admin-form-label">Label</label>
                      <input className="admin-form-input" value={stat.label} onChange={e => setStat(i, 'label', e.target.value)} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-form-label">Pilares</label>
              {page.pillars.map((pillar, i) => (
                <div key={i} style={{ background: '#0d1117', border: '1px solid #1e2a3a', borderRadius: 8, padding: 12, marginBottom: 10 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: 8, marginBottom: 8 }}>
                    <div className="admin-form-group" style={{ margin: 0 }}>
                      <label className="admin-form-label">Ícone</label>
                      <input className="admin-form-input" value={pillar.icon} onChange={e => setPillar(i, 'icon', e.target.value)} />
                    </div>
                    <div className="admin-form-group" style={{ margin: 0 }}>
                      <label className="admin-form-label">Título</label>
                      <input className="admin-form-input" value={pillar.title} onChange={e => setPillar(i, 'title', e.target.value)} />
                    </div>
                  </div>
                  <div className="admin-form-group" style={{ margin: 0 }}>
                    <label className="admin-form-label">Descrição</label>
                    <textarea className="admin-form-textarea" rows={2} value={pillar.desc} onChange={e => setPillar(i, 'desc', e.target.value)} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
