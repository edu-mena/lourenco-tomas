import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { api } from '../lib/api'
import { setContactConfig } from '../lib/whatsapp'
import {
  WA_NUMBER, WA_DISPLAY, WA_DEFAULT_MESSAGE, CONTACT_EMAIL, INSTAGRAM_HANDLE, INSTAGRAM_URL,
  LOCATION_LABEL, LOCATION_URL, TIMELINE,
} from '../data/content'
import {
  HERO_CONTENT, ABOUT_SECTION, ABOUT_PAGE, CONTACT_SECTION, CONTACTO_PAGE, ORDER_PAGE,
  FOOTER_CONTENT, WORKS_PAGE, CORPORATE_PAGE, TRIBUTES_PAGE, BLOG_PAGE, LINKS_PAGE,
} from '../data/ui'

/*
 * Textos, imagens e contactos editáveis no admin (GET /api/settings).
 * Os valores abaixo são os do código — o site mostra-os enquanto nada foi
 * gravado no admin, ou se a API falhar. Mesmo formato que o admin
 * (lourenco-tomas-admin: src/lib/site-defaults.ts).
 */
export const DEFAULT_CONTENT = {
  hero: {
    title: HERO_CONTENT.title,
    ctaPrimary: HERO_CONTENT.ctaPrimary,
    ctaSecondary: HERO_CONTENT.ctaSecondary,
    image: HERO_CONTENT.image,
    imageAlt: HERO_CONTENT.imageAlt,
  },
  about: {
    heading: ABOUT_SECTION.heading,
    body: ABOUT_SECTION.body[0],
    image: ABOUT_SECTION.image,
    imageAlt: ABOUT_SECTION.imageAlt,
    cards: ABOUT_SECTION.cards,
  },
  aboutPage: {
    title: ABOUT_PAGE.hero.title,
    subtitle: ABOUT_PAGE.hero.subtitle,
    bioImage: ABOUT_PAGE.bioImage,
    bioImageAlt: ABOUT_PAGE.bioImageAlt,
    badge: ABOUT_PAGE.badge,
    heading: ABOUT_PAGE.sectionTitles.heading,
    paragraphs: ABOUT_PAGE.paragraphs,
    stats: ABOUT_PAGE.stats,
    pillars: ABOUT_PAGE.pillars,
    timeline: TIMELINE,
    ctaTitle: ABOUT_PAGE.cta.title,
    ctaDescription: ABOUT_PAGE.cta.description,
  },
  contact: {
    whatsappNumber: WA_NUMBER,
    whatsappDisplay: WA_DISPLAY,
    whatsappMessage: WA_DEFAULT_MESSAGE,
    email: CONTACT_EMAIL,
    instagramHandle: INSTAGRAM_HANDLE,
    instagramUrl: INSTAGRAM_URL,
    facebookLabel: 'Lourenço Tomás Arte',
    facebookUrl: 'https://facebook.com/lourenco.tomas.art',
    locationLabel: LOCATION_LABEL,
    locationUrl: LOCATION_URL,
    homeTitle: CONTACT_SECTION.title,
    homeBody: CONTACT_SECTION.body,
    pageSubtitle: CONTACTO_PAGE.hero.subtitle,
    channelsTitle: CONTACTO_PAGE.channels.title,
    channelsBody: CONTACTO_PAGE.channels.body,
    infoCards: CONTACTO_PAGE.infoCards.map(({ label, value }) => ({ label, value })),
  },
  orders: {
    subtitle: ORDER_PAGE.hero.subtitle,
    services: ORDER_PAGE.services.map(({ key, title, img, desc, price, includes }) => ({ key, title, img, desc, price, includes })),
    steps: ORDER_PAGE.steps.map(({ title, desc }) => ({ title, desc })),
    faqs: ORDER_PAGE.faqs,
    note: ORDER_PAGE.form.note,
  },
  general: {
    tagline: FOOTER_CONTENT.tagline,
    worksSubtitle: WORKS_PAGE.hero.subtitle,
    corporateSubtitle: CORPORATE_PAGE.hero.subtitle,
    tributesSubtitle: TRIBUTES_PAGE.hero.subtitle,
    blogSubtitle: BLOG_PAGE.hero.subtitle,
    linksBio: LINKS_PAGE.bio,
  },
}

const kind = v => (Array.isArray(v) ? 'array' : v === null ? 'null' : typeof v)

/* Só aceita um valor gravado se tiver o mesmo tipo do valor por omissão —
   um campo mal gravado nunca parte a página, cai no texto original. */
function mergeSection(defaults, remote) {
  if (!remote || kind(remote) !== 'object') return defaults
  const out = { ...defaults }
  for (const key of Object.keys(defaults)) {
    if (key in remote && kind(remote[key]) === kind(defaults[key])) out[key] = remote[key]
  }
  return out
}

export function mergeContent(remote) {
  return Object.fromEntries(
    Object.entries(DEFAULT_CONTENT).map(([key, defaults]) => [key, mergeSection(defaults, remote?.[key])]),
  )
}

const CACHE_KEY = 'lt-site-content'
const readCache = () => {
  try { return JSON.parse(localStorage.getItem(CACHE_KEY)) } catch { return null }
}

const SiteContentContext = createContext({ ...DEFAULT_CONTENT, ready: true })

export function SiteContentProvider({ children }) {
  // A última versão vista fica em cache: na visita seguinte o texto certo aparece logo
  const [remote, setRemote] = useState(readCache)
  const [ready, setReady] = useState(() => remote !== null)

  useEffect(() => {
    // Sem resposta rápida, mostra os textos por omissão em vez de esperar
    const giveUp = setTimeout(() => setReady(true), 1200)
    api.settings.all()
      .then(s => {
        setRemote(s)
        try { localStorage.setItem(CACHE_KEY, JSON.stringify(s)) } catch { /* storage bloqueado */ }
      })
      .catch(() => { /* API em baixo — ficam os textos por omissão */ })
      .finally(() => { clearTimeout(giveUp); setReady(true) })
    return () => clearTimeout(giveUp)
  }, [])

  const value = useMemo(() => {
    const content = mergeContent(remote)
    // waLink/mailLink são funções simples usadas em todo o lado: lêem daqui o número e o email
    setContactConfig(content.contact)
    return { ...content, ready }
  }, [remote, ready])

  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>
}

export const useSiteContent = () => useContext(SiteContentContext)

/* Canais de contacto (WhatsApp, Instagram, Facebook, Email) a partir das definições */
export function socialLinks(c) {
  const wa = `https://wa.me/${c.whatsappNumber}?text=${encodeURIComponent(c.whatsappMessage)}`
  return [
    { id: 'whatsapp', label: 'WhatsApp', handle: c.whatsappDisplay, copy: c.whatsappDisplay, href: wa, icon: 'whatsapp' },
    { id: 'instagram', label: 'Instagram', handle: c.instagramHandle, href: c.instagramUrl, icon: 'instagram' },
    { id: 'facebook', label: 'Facebook', handle: c.facebookLabel, href: c.facebookUrl, icon: 'facebook' },
    { id: 'email', label: 'Email', handle: c.email, copy: c.email, href: `mailto:${c.email}`, icon: 'email' },
  ].filter(s => s.href && s.handle)
}
