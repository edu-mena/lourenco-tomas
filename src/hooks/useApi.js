import { useState, useEffect, useCallback } from 'react'
import { api } from '../lib/api'
import {
  transformTribute,
  transformPost,
  transformGalleryItem,
  transformTestimonial,
  transformCompany,
  transformVideo,
} from '../lib/transform'

function useFetch(fetchFn, deps) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)
    fetchFn()
      .then(d => { if (!cancelled) { setData(d); setLoading(false) } })
      .catch(e => { if (!cancelled) { setError(e); setLoading(false) } })
    return () => { cancelled = true }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, attempt])

  const reload = useCallback(() => setAttempt(a => a + 1), [])
  return { data, loading, error, reload }
}

export function useTributes() {
  const { data, loading, error, reload } = useFetch(
    () => api.tributes.list().then(list => list.map(transformTribute)),
    []
  )
  return { tributes: data ?? [], loading, error, reload }
}

export function useTributeBySlug(slug) {
  const [tribute, setTribute] = useState(null)
  const [allTributes, setAllTributes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!slug) return
    let cancelled = false
    setLoading(true)
    setError(null)

    api.tributes.list()
      .then(list => {
        if (cancelled) return
        const all = list.map(transformTribute)
        setAllTributes(all)
        const found = list.find(t => t.slug === slug)
        if (!found) { setTribute(null); setLoading(false); return }
        return api.tributes.get(found.id).then(full => {
          if (!cancelled) { setTribute(transformTribute(full)); setLoading(false) }
        })
      })
      .catch(e => { if (!cancelled) { setError(e); setLoading(false) } })

    return () => { cancelled = true }
  }, [slug])

  return { tribute, allTributes, loading, error }
}

export function usePosts() {
  const { data, loading, error, reload } = useFetch(
    () => api.posts.list().then(list => list.map(p => transformPost(p, list))),
    []
  )
  return { posts: data ?? [], loading, error, reload }
}

export function usePostBySlug(slug) {
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!slug) return
    let cancelled = false
    setLoading(true)
    setError(null)

    api.posts.list()
      .then(list => {
        if (cancelled) return
        const found = list.find(p => p.slug === slug)
        if (!found) { setPost(null); setLoading(false); return }
        return api.posts.get(found.id).then(full => {
          if (!cancelled) { setPost(transformPost(full, list)); setLoading(false) }
        })
      })
      .catch(e => { if (!cancelled) { setError(e); setLoading(false) } })

    return () => { cancelled = true }
  }, [slug])

  return { post, loading, error }
}

export function useGallery() {
  const { data, loading, error, reload } = useFetch(
    () => api.gallery.list().then(list => list.map(transformGalleryItem)),
    []
  )
  return { items: data ?? [], loading, error, reload }
}

export function useTestimonials() {
  const { data, loading, error, reload } = useFetch(
    () => api.testimonials.list().then(list => list.map(transformTestimonial)),
    []
  )
  return { testimonials: data ?? [], loading, error, reload }
}

export function useCompanies() {
  const { data, loading, error, reload } = useFetch(
    () => api.companies.list().then(list => list.map(transformCompany)),
    []
  )
  return { companies: data ?? [], loading, error, reload }
}

export function useVideos() {
  const { data, loading, error, reload } = useFetch(
    () => api.videos.list().then(list => list.map(transformVideo)),
    []
  )
  return { videos: data ?? [], loading, error, reload }
}
