import { createContext, useContext, useState } from 'react'
import { TRIBUTES as INITIAL_TRIBUTES } from '../data/tributes'
import { POSTS as INITIAL_POSTS } from '../data/blog'
import { GALLERY_ITEMS as INITIAL_GALLERY, VIDEOS as INITIAL_VIDEOS, TESTIMONIALS as INITIAL_TESTIMONIALS } from '../data/content'
import { COMPANIES as INITIAL_COMPANIES } from '../data/corporativos'
import {
  HERO_CONTENT, ABOUT_SECTION, ABOUT_PAGE,
  FOOTER_CONTENT, NAV_BRAND,
  CONTACT_SECTION, CONTACTO_PAGE, ORDER_PAGE,
} from '../data/ui'

const AdminDataContext = createContext(null)

const slug = (str) =>
  str.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

export function AdminDataProvider({ children }) {
  const [tributes,     setTributes]     = useState(INITIAL_TRIBUTES)
  const [posts,        setPosts]        = useState(INITIAL_POSTS)
  const [galleryItems, setGallery]      = useState(INITIAL_GALLERY)
  const [videos,       setVideos]       = useState(INITIAL_VIDEOS)
  const [testimonials, setTestimonials] = useState(INITIAL_TESTIMONIALS)
  const [companies,    setCompanies]    = useState(INITIAL_COMPANIES)
  const [siteSettings, setSiteSettings] = useState({
    hero:    { ...HERO_CONTENT },
    about:   { section: { ...ABOUT_SECTION }, page: { ...ABOUT_PAGE } },
    footer:  { ...FOOTER_CONTENT },
    nav:     { ...NAV_BRAND },
    contact: { section: { ...CONTACT_SECTION }, page: { ...CONTACTO_PAGE } },
    orders:  { ...ORDER_PAGE },
  })

  // ── Tributes ──────────────────────────────────────
  const addTribute    = (d) => setTributes(p => [...p, { ...d, id: Date.now() }])
  const updateTribute = (id, d) => setTributes(p => p.map(t => t.id === id ? { ...t, ...d } : t))
  const deleteTribute = (id) => setTributes(p => p.filter(t => t.id !== id))

  // ── Posts ─────────────────────────────────────────
  const addPost    = (d) => setPosts(p => [...p, { ...d, id: Date.now() }])
  const updatePost = (s, d) => setPosts(p => p.map(t => t.slug === s ? { ...t, ...d } : t))
  const deletePost = (s) => setPosts(p => p.filter(t => t.slug !== s))

  // ── Gallery ───────────────────────────────────────
  const addGalleryItem    = (d) => setGallery(p => [...p, { ...d, id: Date.now() }])
  const updateGalleryItem = (id, d) => setGallery(p => p.map(g => g.id === id ? { ...g, ...d } : g))
  const deleteGalleryItem = (id) => setGallery(p => p.filter(g => g.id !== id))

  // ── Videos ────────────────────────────────────────
  const addVideo    = (d) => setVideos(p => [...p, { ...d, id: `v-${Date.now()}` }])
  const updateVideo = (id, d) => setVideos(p => p.map(v => v.id === id ? { ...v, ...d } : v))
  const deleteVideo = (id) => setVideos(p => p.filter(v => v.id !== id))

  // ── Testimonials ──────────────────────────────────
  const addTestimonial    = (d) => setTestimonials(p => [...p, { ...d, id: Date.now() }])
  const updateTestimonial = (id, d) => setTestimonials(p => p.map(t => t.id === id ? { ...t, ...d } : t))
  const deleteTestimonial = (id) => setTestimonials(p => p.filter(t => t.id !== id))

  // ── Companies ─────────────────────────────────────
  const addCompany    = (d) => setCompanies(p => [...p, { ...d, id: `c-${Date.now()}`, slug: slug(d.name), works: d.works ?? [] }])
  const updateCompany = (id, d) => setCompanies(p => p.map(c => c.id === id ? { ...c, ...d } : c))
  const deleteCompany = (id) => setCompanies(p => p.filter(c => c.id !== id))

  // ── Site Settings ─────────────────────────────────
  const updateSettings = (section, data) =>
    setSiteSettings(p => ({ ...p, [section]: data }))

  return (
    <AdminDataContext.Provider value={{
      tributes,     addTribute,     updateTribute,     deleteTribute,
      posts,        addPost,        updatePost,        deletePost,
      galleryItems, addGalleryItem, updateGalleryItem, deleteGalleryItem,
      videos,       addVideo,       updateVideo,       deleteVideo,
      testimonials, addTestimonial, updateTestimonial, deleteTestimonial,
      companies,    addCompany,     updateCompany,     deleteCompany,
      siteSettings, updateSettings,
    }}>
      {children}
    </AdminDataContext.Provider>
  )
}

export const useAdminData = () => useContext(AdminDataContext)
