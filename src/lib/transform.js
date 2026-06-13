const INSTAGRAM_URL = 'https://instagram.com/lourenco.tomas.art'

function fmtDate(iso) {
  if (!iso) return ''
  try {
    return new Intl.DateTimeFormat('pt-PT', {
      day: '2-digit', month: 'short', year: 'numeric',
    }).format(new Date(iso))
  } catch { return iso.slice(0, 10) }
}

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
    avatar: cover,
    instagram: INSTAGRAM_URL,

    celebrity: {
      name: t.name,
      role: t.category || '',
      bio: fullDesc.join('\n\n'),
      instagram: INSTAGRAM_URL,
    },

    work: {
      title: t.short_desc || t.name,
      category: t.category || '',
      year: t.death_year || t.birth_year || null,
      shortDesc: t.short_desc || '',
      fullDesc,
    },

    specs: t.specs || {},

    gallery: (t.media || [])
      .filter(m => m.type === 'photo')
      .map((m, i) => ({
        id: m.id ?? `m${i}`,
        type: 'image',
        role: 'gallery',
        src: m.url,
        caption: m.caption || '',
        width: 900,
        height: 900,
      })),

    videos: (t.media || [])
      .filter(m => m.type === 'video')
      .map((m, i) => ({
        id: m.id ?? `v${i}`,
        type: 'video',
        src: m.url,
        thumb: cover,
        title: m.caption || 'Vídeo',
        duration: '',
      })),
  }
}

export function transformPost(p, allPosts = []) {
  const idToSlug = {}
  allPosts.forEach(post => { idToSlug[post.id] = post.slug })

  const rawBody = Array.isArray(p.body) ? p.body : []
  const body = rawBody.map(block => ({
    type: block.type === 'quote' ? 'quote' : 'p',
    text: block.content || '',
  }))

  return {
    slug: p.slug,
    cat: p.category || '',
    date: fmtDate(p.created_at),
    title: p.title,
    excerpt: p.subtitle || '',
    img: p.cover_url || '',
    featured: !!p.featured,
    lead: body[0]?.text || p.subtitle || '',
    body,
    related: (p.related || []).map(id => idToSlug[id]).filter(Boolean),
  }
}

export function transformGalleryItem(item) {
  return {
    id: item.id,
    cat: item.category || 'all',
    name: item.alt || '',
    title: item.alt || '',
    sub: '',
    size: '',
    technique: '',
    img: item.src,
    priceHref: null,
    h: item.height || 350,
    grad: 'linear-gradient(145deg,#1a0d06 0%,#3a1e0c 35%,#4d2a12 55%,#281508 80%,#100908 100%)',
  }
}

export function transformTestimonial(t) {
  const initials = t.author
    .split(' ')
    .map(n => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
  return {
    id: t.id,
    text: t.content,
    name: t.author,
    role: t.role || '',
    avatar: t.avatar_url || initials,
  }
}

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

export function transformVideo(v) {
  return {
    id: v.id,
    title: v.title,
    youtubeId: v.youtube_id,
    category: v.category || '',
    featured: !!v.featured,
  }
}
