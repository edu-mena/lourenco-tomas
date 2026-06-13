const API_BASE = 'https://lightblue-lemur-704992.hostingersite.com/api'

export async function apiFetch(path) {
  const res = await fetch(API_BASE + path)
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || `HTTP ${res.status}`)
  }
  return res.json()
}

export const api = {
  tributes: {
    list: () => apiFetch('/tributes'),
    get: (id) => apiFetch(`/tributes/${id}`),
  },
  posts: {
    list: () => apiFetch('/posts'),
    get: (id) => apiFetch(`/posts/${id}`),
  },
  gallery: {
    list: () => apiFetch('/gallery'),
  },
  videos: {
    list: () => apiFetch('/videos'),
  },
  testimonials: {
    list: () => apiFetch('/testimonials'),
  },
  companies: {
    list: () => apiFetch('/companies?with_works=1'),
    get: (id) => apiFetch(`/companies/${id}`),
  },
}
