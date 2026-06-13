import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useAdminData } from '../../contexts/AdminDataContext'
import MediaPreview from '../../components/admin/MediaPreview'

const CATEGORIES = ['Processo', 'Homenagens', 'Técnica', 'Bastidores']

const PT_MONTHS = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez']
const PT_TO_NUM  = Object.fromEntries(PT_MONTHS.map((m, i) => [m, i + 1]))

function ptToIso(pt) {
  const parts = (pt ?? '').split(' ')
  if (parts.length !== 3) return ''
  const [d, m, y] = parts
  const mNum = PT_TO_NUM[m]
  if (!mNum) return ''
  return `${y}-${String(mNum).padStart(2,'0')}-${d.padStart(2,'0')}`
}

function isoToPt(iso) {
  if (!iso) return ''
  const [y, m, d] = iso.split('-')
  return `${parseInt(d)} ${PT_MONTHS[parseInt(m) - 1]} ${y}`
}

function slugify(str) {
  return str.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}

const EMPTY = {
  slug: '',
  cat: 'Processo',
  date: new Date().toISOString().split('T')[0],
  title: '',
  excerpt: '',
  img: '',
  featured: false,
  lead: '',
  body: [{ type: 'p', text: '' }],
  related: [],
}

export default function BlogForm() {
  const { slug } = useParams()
  const navigate  = useNavigate()
  const { posts, addPost, updatePost } = useAdminData()

  const existing = slug ? posts.find(p => p.slug === slug) : null
  const isEdit   = !!existing

  const [form, setForm] = useState(() => {
    if (!existing) return { ...EMPTY }
    return {
      slug:     existing.slug,
      cat:      existing.cat,
      date:     ptToIso(existing.date),
      title:    existing.title,
      excerpt:  existing.excerpt,
      img:      existing.img,
      featured: existing.featured ?? false,
      lead:     existing.lead ?? '',
      body:     existing.body?.map(b => ({ ...b })) ?? [{ type: 'p', text: '' }],
      related:  [...(existing.related ?? [])],
    }
  })

  const [error, setError] = useState('')

  const set = (field, value) => setForm(prev => ({ ...prev, [field]: value }))

  const handleTitleChange = (value) => {
    setForm(prev => ({ ...prev, title: value, slug: slugify(value) }))
  }

  // ── Body blocks ───────────────────────────────────
  const addBlock = (type) =>
    setForm(prev => ({ ...prev, body: [...prev.body, { type, text: '' }] }))

  const updateBlock = (i, field, value) =>
    setForm(prev => ({ ...prev, body: prev.body.map((b, idx) => idx === i ? { ...b, [field]: value } : b) }))

  const removeBlock = (i) =>
    setForm(prev => ({ ...prev, body: prev.body.filter((_, idx) => idx !== i) }))

  const moveBlock = (i, dir) => {
    const ni = i + dir
    if (ni < 0 || ni >= form.body.length) return
    setForm(prev => {
      const arr = [...prev.body];
      [arr[i], arr[ni]] = [arr[ni], arr[i]]
      return { ...prev, body: arr }
    })
  }

  // ── Related ───────────────────────────────────────
  const otherPosts = posts.filter(p => p.slug !== form.slug)

  const toggleRelated = (postSlug) => {
    setForm(prev => {
      const has = prev.related.includes(postSlug)
      return {
        ...prev,
        related: has
          ? prev.related.filter(s => s !== postSlug)
          : prev.related.length < 3 ? [...prev.related, postSlug] : prev.related,
      }
    })
  }

  // ── Save ──────────────────────────────────────────
  const handleSave = () => {
    if (!form.title.trim()) { setError('O título é obrigatório.'); return }
    if (!form.slug.trim())  { setError('O slug é obrigatório.'); return }
    setError('')

    const payload = { ...form, date: isoToPt(form.date) }

    if (isEdit) updatePost(existing.slug, payload)
    else        addPost(payload)

    navigate('/admin/blog')
  }

  return (
    <>
      {/* Header */}
      <div className="admin-form-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link to="/admin/blog" className="admin-btn admin-btn--ghost admin-btn--sm">← Voltar</Link>
          <span className="admin-form-header__title">
            {isEdit ? `Editar — ${existing.title}` : 'Novo artigo'}
          </span>
        </div>
        <div className="admin-form-header__actions">
          {error && <span style={{ fontSize: 12, color: '#f87171', alignSelf: 'center' }}>{error}</span>}
          <Link to="/admin/blog" className="admin-btn admin-btn--ghost">Cancelar</Link>
          <button className="admin-btn admin-btn--primary" onClick={handleSave}>Guardar</button>
        </div>
      </div>

      {/* Campos principais */}
      <div className="admin-form-row">
        <div className="admin-form-group">
          <label className="admin-form-label">Título *</label>
          <input
            className="admin-form-input"
            value={form.title}
            onChange={e => handleTitleChange(e.target.value)}
            placeholder="A Aerografia como Linguagem…"
          />
        </div>
        <div className="admin-form-group">
          <label className="admin-form-label">Slug *</label>
          <input
            className="admin-form-input"
            value={form.slug}
            onChange={e => set('slug', e.target.value)}
            placeholder="aerografia-como-linguagem"
          />
          <span className="admin-form-hint">Gerado automaticamente · usado na URL</span>
        </div>
      </div>

      <div className="admin-form-row">
        <div className="admin-form-group">
          <label className="admin-form-label">Categoria</label>
          <select className="admin-form-select" value={form.cat} onChange={e => set('cat', e.target.value)}>
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="admin-form-group">
          <label className="admin-form-label">Data de publicação</label>
          <input
            className="admin-form-input"
            type="date"
            value={form.date}
            onChange={e => set('date', e.target.value)}
          />
          {form.date && <span className="admin-form-hint">Será exibida como: {isoToPt(form.date)}</span>}
        </div>
      </div>

      <div className="admin-form-toggle-row" style={{ marginBottom: 16 }}>
        <label className="admin-toggle">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={e => set('featured', e.target.checked)}
          />
          <div className="admin-toggle__track"><div className="admin-toggle__thumb" /></div>
        </label>
        <span className="admin-form-toggle-label">
          Em destaque
          {form.featured && !isEdit && <span style={{ marginLeft: 8, fontSize: 11, color: '#f59e0b' }}>⚠ Outro artigo em destaque será removido ao guardar</span>}
        </span>
      </div>

      <MediaPreview
        label="URL da imagem de capa"
        value={form.img}
        onChange={v => set('img', v)}
      />

      <div className="admin-form-group">
        <label className="admin-form-label">Excerpt (resumo — exibido nos cards)</label>
        <textarea
          className="admin-form-textarea"
          value={form.excerpt}
          onChange={e => set('excerpt', e.target.value)}
          placeholder="2–3 linhas que resumem o artigo…"
          style={{ minHeight: 68 }}
        />
      </div>

      <div className="admin-form-group">
        <label className="admin-form-label">Lead (parágrafo de abertura)</label>
        <textarea
          className="admin-form-textarea"
          value={form.lead}
          onChange={e => set('lead', e.target.value)}
          placeholder="Parágrafo introdutório exibido abaixo do título…"
          style={{ minHeight: 80 }}
        />
      </div>

      {/* Editor de blocos */}
      <div className="admin-form-group">
        <label className="admin-form-label" style={{ marginBottom: 10 }}>
          Corpo do artigo — {form.body.length} bloco{form.body.length !== 1 ? 's' : ''}
        </label>
        <div className="admin-media-list">
          {form.body.map((block, i) => (
            <div key={i} className="admin-media-item">
              <div className="admin-media-item__header">
                <span className="admin-media-item__num">#{i + 1}</span>
                <div className="admin-block-type">
                  <button
                    className={`admin-block-type__btn${block.type === 'p' ? ' active' : ''}`}
                    onClick={() => updateBlock(i, 'type', 'p')}
                  >
                    Parágrafo
                  </button>
                  <button
                    className={`admin-block-type__btn${block.type === 'quote' ? ' active' : ''}`}
                    onClick={() => updateBlock(i, 'type', 'quote')}
                  >
                    Citação
                  </button>
                </div>
                <span className="admin-media-item__spacer" />
                <div className="admin-media-item__moves">
                  <button className="admin-btn admin-btn--ghost admin-btn--icon" onClick={() => moveBlock(i, -1)}>↑</button>
                  <button className="admin-btn admin-btn--ghost admin-btn--icon" onClick={() => moveBlock(i, 1)}>↓</button>
                </div>
                <button className="admin-btn admin-btn--danger admin-btn--icon" onClick={() => removeBlock(i)}>✕</button>
              </div>
              <textarea
                className={`admin-form-textarea${block.type === 'quote' ? ' admin-form-textarea--quote' : ''}`}
                value={block.text}
                onChange={e => updateBlock(i, 'text', e.target.value)}
                placeholder={block.type === 'quote' ? '"A aerografia não é sobre controlo…"' : 'Texto do parágrafo…'}
                style={{ minHeight: block.type === 'quote' ? 64 : 88 }}
              />
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
          <button className="admin-add-btn" style={{ flex: 1 }} onClick={() => addBlock('p')}>
            + Parágrafo
          </button>
          <button className="admin-add-btn" style={{ flex: 1 }} onClick={() => addBlock('quote')}>
            + Citação
          </button>
        </div>
      </div>

      {/* Artigos relacionados */}
      {otherPosts.length > 0 && (
        <div className="admin-form-group">
          <label className="admin-form-label">
            Artigos relacionados — {form.related.length}/3 seleccionados
          </label>
          <div className="admin-related-list">
            {otherPosts.map(p => {
              const checked  = form.related.includes(p.slug)
              const disabled = !checked && form.related.length >= 3
              return (
                <label
                  key={p.slug}
                  className={`admin-related-item${disabled ? ' disabled' : ''}`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    disabled={disabled}
                    onChange={() => toggleRelated(p.slug)}
                  />
                  <div>
                    <div className="admin-related-item__title">{p.title}</div>
                    <div className="admin-related-item__cat">{p.cat} · {p.date}</div>
                  </div>
                </label>
              )
            })}
          </div>
        </div>
      )}
    </>
  )
}
