import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/* Topo da página a cada navegação — ou a secção indicada no #hash */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) { window.scrollTo(0, 0); return }
    // Espera pelo render da nova página antes de procurar a âncora
    const t = setTimeout(() => {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' })
    }, 60)
    return () => clearTimeout(t)
  }, [pathname, hash])
  return null
}
