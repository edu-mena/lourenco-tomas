const INSTAGRAM_URL = 'https://instagram.com/lourenco.tomas.art'
const WA_NUMBER = '244923340114'
const DEFAULT_GRAD = 'linear-gradient(145deg,#1a0d06 0%,#3a1e0c 35%,#4d2a12 55%,#281508 80%,#100908 100%)'

function fmtDate(iso) {
  if (!iso) return ''
  try {
    return new Intl.DateTimeFormat('pt-PT', {
      day: '2-digit', month: 'short', year: 'numeric',
    }).format(new Date(iso))
  } catch { return iso.slice(0, 10) }
}

function waHref(name, id) {
  const msg = `Olá Lourenço! Quero preço para a obra "${name}" (ID: ${id}).`
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`
}

// ── Tributes ──────────────────────────────────────────────────────────────────
export function transformTribute(t) {
  const cover = t.cover_url || ''
  const fullDesc = Array.isArray(t.full_desc)
    ? t.full_desc
    : t.full_desc ? [t.full_desc] : []

  return {
    id: t.id,
    slug: t.slug,
    featured: !!t.featured,
    cover,
    avatar: t.avatar_url || cover,
    instagram: t.instagram || INSTAGRAM_URL,

    celebrity: {
      name: t.name,
      role: t.role || '',                        // DB: role (was category)
      bio: t.bio || fullDesc.join('\n\n'),        // DB: bio field
      instagram: t.instagram || INSTAGRAM_URL,
    },

    work: {
      title: t.work_title || t.short_desc || t.name,  // DB: work_title
      category: t.category || '',
      year: t.year || null,                      // DB: year (was birth_year/death_year)
      shortDesc: t.short_desc || '',
      fullDesc,
    },

    specs: t.specs || {},

    // DB: media_type === 'image' (was type === 'photo'), src (was url)
    gallery: (t.media || [])
      .filter(m => m.media_type === 'image')
      .map((m, i) => ({
        id: m.id ?? `m${i}`,
        type: 'image',
        role: m.media_role || 'gallery',
        src: m.src || '',
        caption: m.caption || '',
        width: 900,
        height: 900,
      })),

    videos: (t.media || [])
      .filter(m => m.media_type === 'video')
      .map((m, i) => ({
        id: m.id ?? `v${i}`,
        type: 'video',
        src: m.src || '',
        thumb: cover,
        title: m.caption || 'Vídeo',
        duration: '',
      })),
  }
}

// ── Blog Posts ────────────────────────────────────────────────────────────────
export function transformPost(p, allPosts = []) {
  const idToSlug = {}
  allPosts.forEach(post => { idToSlug[post.id] = post.slug })

  const rawBody = Array.isArray(p.body) ? p.body : []
  const body = rawBody.map(block => ({
    type: block.type === 'quote' ? 'quote' : 'p',
    text: block.content || block.text || '',  // handles both admin form format and seed data
  }))

  return {
    slug: p.slug,
    cat: p.category || '',
    date: fmtDate(p.date || p.created_at),    // DB: date field (was created_at)
    title: p.title,
    excerpt: p.excerpt || '',                  // DB: excerpt (was subtitle)
    img: p.img_url || '',                      // DB: img_url (was cover_url)
    featured: !!p.featured,
    lead: p.lead || body[0]?.text || p.excerpt || '',  // DB: lead field
    body,
    related: (p.related || []).map(id => idToSlug[id]).filter(Boolean),
  }
}

// ── Gallery Items ─────────────────────────────────────────────────────────────
export function transformGalleryItem(item) {
  return {
    id: item.id,
    cat: item.cat || 'all',                    // DB: cat (was category)
    name: item.name || '',                     // DB: name (was alt)
    title: item.name || '',
    sub: item.subtitle || '',                  // DB: subtitle
    size: item.size_label || '',               // DB: size_label
    technique: item.technique || '',
    img: item.img_url || null,                 // DB: img_url (was src)
    priceHref: waHref(item.name, item.id),
    h: item.height_hint || 350,               // DB: height_hint (was height)
    grad: item.gradient || DEFAULT_GRAD,       // DB: gradient
  }
}

// ── Testimonials ──────────────────────────────────────────────────────────────
export function transformTestimonial(t) {
  const initials = (t.name || '')
    .split(' ')
    .map(n => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
  return {
    id: t.id,
    text: t.text,                              // DB: text (was content)
    name: t.name,                              // DB: name (was author)
    role: t.role || '',
    avatar: t.avatar || initials,              // DB: avatar VARCHAR(10) — initial letter
  }
}

// ── Companies ─────────────────────────────────────────────────────────────────
export function transformCompany(c) {
  return {
    id: c.id,
    slug: c.slug,
    name: c.name,
    sector: c.sector || '',
    cover: c.cover_url || '',
    year: c.year ? String(c.year) : '',
    desc: c.description || '',
    works: (c.works || []).map(w => ({
      id: w.id,
      title: w.title,
      type: w.work_type || '',
      img: w.img_url || '',
      year: w.year ? String(w.year) : '',
    })),
  }
}

// ── Videos ────────────────────────────────────────────────────────────────────
export function transformVideo(v) {
  return {
    id: v.id,
    label: v.label || '',                      // DB: label (was missing)
    title: v.title || '',
    src: v.src || '',                          // DB: src video URL (was youtube_id)
    featured: !!v.featured,
    grad: v.gradient || DEFAULT_GRAD,          // DB: gradient
    sort_order: v.sort_order ?? 0,
  }
}
