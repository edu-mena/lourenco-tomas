import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useAdminData } from '../../contexts/AdminDataContext'
import MediaPreview from '../../components/admin/MediaPreview'

const CATEGORIES = ['Música', 'Cinema', 'Desporto', 'Moda', 'Arte']
const MEDIA_TYPES = ['image', 'video', 'youtube', 'instagram_reel']
const MEDIA_ROLES = ['gallery', 'cover', 'avatar']
const STORY_TYPES = ['image', 'video', 'quote', 'before_after']
const TABS = ['Info', 'Obra', 'Specs', 'Galeria', 'Stories']

const SPEC_KEYS = ['técnica', 'suporte', 'dimensões', 'duração', 'ano', 'verniz']

const EMPTY = {
  slug: '', featured: false,
  celebrity: { name: '', role: '', bio: '', instagram: '' },
  work: { title: '', category: 'Música', year: new Date().getFullYear(), shortDesc: '', fullDesc: [''] },
  specs: { técnica: '', suporte: '', dimensões: '', duração: '', ano: '', verniz: '' },
  instagram: '', cover: '', avatar: '',
  gallery: [], stories: [],
}

function setPath(obj, path, value) {
  if (!path.includes('.')) return { ...obj, [path]: value }
  const [head, ...rest] = path.split('.')
  return { ...obj, [head]: setPath(obj[head] ?? {}, rest.join('.'), value) }
}

function slugify(str) {
  return str.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}

export default function TributeForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { tributes, addTribute, updateTribute } = useAdminData()

  const existing = id ? tributes.find(t => String(t.id) === id) : null
  const isEdit = !!existing

  const [form, setForm] = useState(() => {
    if (!existing) return { ...EMPTY }
    return {
      slug:     existing.slug ?? '',
      featured: existing.featured ?? false,
      celebrity: { ...existing.celebrity },
      work: {
        title:     existing.work?.title ?? '',
        category:  existing.work?.category ?? 'Música',
        year:      existing.work?.year ?? new Date().getFullYear(),
        shortDesc: existing.work?.shortDesc ?? '',
        fullDesc:  existing.work?.fullDesc?.length ? [...existing.work.fullDesc] : [''],
      },
      specs:    { ...EMPTY.specs, ...existing.specs },
      instagram: existing.instagram ?? '',
      cover:     existing.cover  ?? '',
      avatar:    existing.avatar ?? '',
      gallery:   existing.gallery  ? existing.gallery.map(g => ({ ...g })) : [],
      stories:   existing.stories  ? existing.stories.map(s => ({ ...s })) : [],
    }
  })

  const [activeTab, setActiveTab] = useState(0)
  const [error, setError] = useState('')

  const handleChange = (path, value) =>
    setForm(prev => setPath(prev, path, value))

  const handleNameChange = (value) => {
    setForm(prev => ({
      ...setPath(prev, 'celebrity.name', value),
      slug: slugify(value),
    }))
  }

  // ── fullDesc ──────────────────────────────────────
  const addPara = () =>
    setForm(prev => ({ ...prev, work: { ...prev.work, fullDesc: [...prev.work.fullDesc, ''] } }))

  const updatePara = (i, val) =>
    setForm(prev => ({ ...prev, work: { ...prev.work, fullDesc: prev.work.fullDesc.map((p, idx) => idx === i ? val : p) } }))

  const removePara = (i) =>
    setForm(prev => ({ ...prev, work: { ...prev.work, fullDesc: prev.work.fullDesc.filter((_, idx) => idx !== i) } }))

  // ── Gallery ───────────────────────────────────────
  const addGallery = () =>
    setForm(prev => ({ ...prev, gallery: [...prev.gallery, { id: `g-${Date.now()}`, type: 'image', role: 'gallery', src: '', title: '', duration: '', caption: '' }] }))

  const updateGallery = (i, field, val) =>
    setForm(prev => ({ ...prev, gallery: prev.gallery.map((g, idx) => idx === i ? { ...g, [field]: val } : g) }))

  const removeGallery = (i) =>
    setForm(prev => ({ ...prev, gallery: prev.gallery.filter((_, idx) => idx !== i) }))

  const moveGallery = (i, dir) => {
    const ni = i + dir
    if (ni < 0 || ni >= form.gallery.length) return
    setForm(prev => {
      const arr = [...prev.gallery];
      [arr[i], arr[ni]] = [arr[ni], arr[i]]
      return { ...prev, gallery: arr }
    })
  }

  // ── Stories ───────────────────────────────────────
  const addStory = () =>
    setForm(prev => ({ ...prev, stories: [...prev.stories, { id: `s-${Date.now()}`, type: 'image', src: '', caption: '', beforeSrc: '', afterSrc: '' }] }))

  const updateStory = (i, field, val) =>
    setForm(prev => ({ ...prev, stories: prev.stories.map((s, idx) => idx === i ? { ...s, [field]: val } : s) }))

  const removeStory = (i) =>
    setForm(prev => ({ ...prev, stories: prev.stories.filter((_, idx) => idx !== i) }))

  const moveStory = (i, dir) => {
    const ni = i + dir
    if (ni < 0 || ni >= form.stories.length) return
    setForm(prev => {
      const arr = [...prev.stories];
      [arr[i], arr[ni]] = [arr[ni], arr[i]]
      return { ...prev, stories: arr }
    })
  }

  // ── Save ──────────────────────────────────────────
  const handleSave = () => {
    if (!form.celebrity.name.trim()) { setError('O nome é obrigatório.'); setActiveTab(0); return }
    if (!form.slug.trim())           { setError('O slug é obrigatório.'); setActiveTab(0); return }
    setError('')
    if (isEdit) updateTribute(existing.id, form)
    else        addTribute(form)
    navigate('/admin/tributes')
  }

  return (
    <>
      {/* Header */}
      <div className="admin-form-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link to="/admin/tributes" className="admin-btn admin-btn--ghost admin-btn--sm">← Voltar</Link>
          <span className="admin-form-header__title">
            {isEdit ? `Editar — ${existing.celebrity?.name}` : 'Nova homenagem'}
          </span>
        </div>
        <div className="admin-form-header__actions">
          {error && <span style={{ fontSize: 12, color: '#f87171', alignSelf: 'center' }}>{error}</span>}
          <Link to="/admin/tributes" className="admin-btn admin-btn--ghost">Cancelar</Link>
          <button className="admin-btn admin-btn--primary" onClick={handleSave}>Guardar</button>
        </div>
      </div>

      {/* Tabs */}
      <div className="admin-tabs">
        {TABS.map((tab, i) => (
          <button key={tab} className={`admin-tab${activeTab === i ? ' active' : ''}`} onClick={() => setActiveTab(i)}>
            {tab}
            {i === 3 && form.gallery.length > 0 && <span style={{ marginLeft: 4, fontSize: 10, color: '#c09060' }}>({form.gallery.length})</span>}
            {i === 4 && form.stories.length > 0 && <span style={{ marginLeft: 4, fontSize: 10, color: '#c09060' }}>({form.stories.length})</span>}
          </button>
        ))}
      </div>

      {/* ── TAB 0: Info ── */}
      {activeTab === 0 && (
        <div>
          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-form-label">Nome *</label>
              <input className="admin-form-input" value={form.celebrity.name} onChange={e => handleNameChange(e.target.value)} placeholder="C4 Pedro" />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Slug *</label>
              <input className="admin-form-input" value={form.slug} onChange={e => handleChange('slug', e.target.value)} placeholder="c4-pedro" />
              <span className="admin-form-hint">Gerado automaticamente a partir do nome</span>
            </div>
          </div>
          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-form-label">Papel / Subtítulo</label>
              <input className="admin-form-input" value={form.celebrity.role} onChange={e => handleChange('celebrity.role', e.target.value)} placeholder="Músico · Semba" />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Categoria</label>
              <select className="admin-form-select" value={form.work.category} onChange={e => handleChange('work.category', e.target.value)}>
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-form-label">Ano</label>
              <input className="admin-form-input" type="number" value={form.work.year} onChange={e => handleChange('work.year', Number(e.target.value))} />
            </div>
            <div className="admin-form-group" style={{ justifyContent: 'flex-end' }}>
              <label className="admin-form-label">Em destaque</label>
              <div className="admin-form-toggle-row">
                <label className="admin-toggle">
                  <input type="checkbox" checked={form.featured} onChange={e => handleChange('featured', e.target.checked)} />
                  <div className="admin-toggle__track"><div className="admin-toggle__thumb" /></div>
                </label>
                <span className="admin-form-toggle-label">{form.featured ? 'Sim' : 'Não'}</span>
              </div>
            </div>
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Bio</label>
            <textarea className="admin-form-textarea" value={form.celebrity.bio} onChange={e => handleChange('celebrity.bio', e.target.value)} placeholder="Breve descrição da celebridade…" />
          </div>
          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-form-label">Instagram URL</label>
              <input className="admin-form-input" value={form.celebrity.instagram} onChange={e => handleChange('celebrity.instagram', e.target.value)} placeholder="https://instagram.com/p/…" />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Instagram (raiz)</label>
              <input className="admin-form-input" value={form.instagram} onChange={e => handleChange('instagram', e.target.value)} placeholder="https://instagram.com/p/…" />
            </div>
          </div>
          <div className="admin-form-row">
            <MediaPreview label="URL da capa (cover)" value={form.cover} onChange={v => handleChange('cover', v)} />
            <MediaPreview label="URL do avatar" value={form.avatar} onChange={v => handleChange('avatar', v)} />
          </div>
        </div>
      )}

      {/* ── TAB 1: Obra ── */}
      {activeTab === 1 && (
        <div>
          <div className="admin-form-group">
            <label className="admin-form-label">Título da obra</label>
            <input className="admin-form-input" value={form.work.title} onChange={e => handleChange('work.title', e.target.value)} placeholder="Aerografia sobre T-Shirt 80×100 cm" />
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Descrição curta</label>
            <textarea className="admin-form-textarea" value={form.work.shortDesc} onChange={e => handleChange('work.shortDesc', e.target.value)} placeholder="1–2 linhas resumindo a obra…" style={{ minHeight: 60 }} />
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Descrição completa (parágrafos)</label>
            <div className="admin-media-list">
              {form.work.fullDesc.map((p, i) => (
                <div key={i} className="admin-para-item">
                  <textarea
                    className="admin-form-textarea"
                    value={p}
                    onChange={e => updatePara(i, e.target.value)}
                    placeholder={`Parágrafo ${i + 1}…`}
                    style={{ minHeight: 72 }}
                  />
                  <button className="admin-btn admin-btn--danger admin-btn--icon" onClick={() => removePara(i)} title="Remover parágrafo">✕</button>
                </div>
              ))}
            </div>
            <button className="admin-add-btn" onClick={addPara}>+ Adicionar parágrafo</button>
          </div>
        </div>
      )}

      {/* ── TAB 2: Specs ── */}
      {activeTab === 2 && (
        <div>
          <div className="admin-form-row">
            {SPEC_KEYS.map(key => (
              <div key={key} className="admin-form-group">
                <label className="admin-form-label">{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                <input
                  className="admin-form-input"
                  value={form.specs[key] ?? ''}
                  onChange={e => setForm(prev => ({ ...prev, specs: { ...prev.specs, [key]: e.target.value } }))}
                  placeholder={key === 'técnica' ? 'Aerografia' : key === 'suporte' ? 'T-Shirt algodão' : ''}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── TAB 3: Galeria ── */}
      {activeTab === 3 && (
        <div>
          <div className="admin-media-list">
            {form.gallery.map((item, i) => (
              <div key={item.id || i} className="admin-media-item">
                <div className="admin-media-item__header">
                  <span className="admin-media-item__num">#{i + 1}</span>
                  <select className="admin-form-select" style={{ width: 'auto', padding: '4px 8px', fontSize: 12 }} value={item.type} onChange={e => updateGallery(i, 'type', e.target.value)}>
                    {MEDIA_TYPES.map(t => <option key={t}>{t}</option>)}
                  </select>
                  <select className="admin-form-select" style={{ width: 'auto', padding: '4px 8px', fontSize: 12 }} value={item.role} onChange={e => updateGallery(i, 'role', e.target.value)}>
                    {MEDIA_ROLES.map(r => <option key={r}>{r}</option>)}
                  </select>
                  <span className="admin-media-item__spacer" />
                  <div className="admin-media-item__moves">
                    <button className="admin-btn admin-btn--ghost admin-btn--icon" onClick={() => moveGallery(i, -1)} title="Mover acima">↑</button>
                    <button className="admin-btn admin-btn--ghost admin-btn--icon" onClick={() => moveGallery(i, 1)} title="Mover abaixo">↓</button>
                  </div>
                  <button className="admin-btn admin-btn--danger admin-btn--icon" onClick={() => removeGallery(i)} title="Remover">✕</button>
                </div>
                <MediaPreview label="URL" value={item.src} onChange={v => updateGallery(i, 'src', v)} />
                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label className="admin-form-label">Título</label>
                    <input className="admin-form-input" value={item.title || ''} onChange={e => updateGallery(i, 'title', e.target.value)} placeholder="Título opcional" />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-form-label">Duração (vídeos)</label>
                    <input className="admin-form-input" value={item.duration || ''} onChange={e => updateGallery(i, 'duration', e.target.value)} placeholder="2:34" />
                  </div>
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Legenda</label>
                  <input className="admin-form-input" value={item.caption || ''} onChange={e => updateGallery(i, 'caption', e.target.value)} placeholder="Legenda opcional" />
                </div>
              </div>
            ))}
          </div>
          <button className="admin-add-btn" onClick={addGallery}>+ Adicionar item de galeria</button>
        </div>
      )}

      {/* ── TAB 4: Stories ── */}
      {activeTab === 4 && (
        <div>
          <div className="admin-media-list">
            {form.stories.map((s, i) => (
              <div key={s.id || i} className="admin-media-item">
                <div className="admin-media-item__header">
                  <span className="admin-media-item__num">#{i + 1}</span>
                  <select className="admin-form-select" style={{ width: 'auto', padding: '4px 8px', fontSize: 12 }} value={s.type} onChange={e => updateStory(i, 'type', e.target.value)}>
                    {STORY_TYPES.map(t => <option key={t}>{t}</option>)}
                  </select>
                  <span className="admin-media-item__spacer" />
                  <div className="admin-media-item__moves">
                    <button className="admin-btn admin-btn--ghost admin-btn--icon" onClick={() => moveStory(i, -1)}>↑</button>
                    <button className="admin-btn admin-btn--ghost admin-btn--icon" onClick={() => moveStory(i, 1)}>↓</button>
                  </div>
                  <button className="admin-btn admin-btn--danger admin-btn--icon" onClick={() => removeStory(i)}>✕</button>
                </div>

                {s.type !== 'before_after' && s.type !== 'quote' && (
                  <MediaPreview label="URL" value={s.src} onChange={v => updateStory(i, 'src', v)} />
                )}
                {s.type === 'before_after' && (
                  <div className="admin-form-row">
                    <MediaPreview label="Antes (URL)" value={s.beforeSrc} onChange={v => updateStory(i, 'beforeSrc', v)} />
                    <MediaPreview label="Depois (URL)" value={s.afterSrc}  onChange={v => updateStory(i, 'afterSrc', v)} />
                  </div>
                )}
                {s.type === 'quote' && (
                  <div className="admin-form-group">
                    <label className="admin-form-label">Texto da citação</label>
                    <textarea className="admin-form-textarea" value={s.src || ''} onChange={e => updateStory(i, 'src', e.target.value)} placeholder="Texto da citação…" />
                  </div>
                )}
                <div className="admin-form-group">
                  <label className="admin-form-label">Legenda</label>
                  <input className="admin-form-input" value={s.caption || ''} onChange={e => updateStory(i, 'caption', e.target.value)} placeholder="Legenda opcional" />
                </div>
              </div>
            ))}
          </div>
          <button className="admin-add-btn" onClick={addStory}>+ Adicionar slide</button>
        </div>
      )}
    </>
  )
}
