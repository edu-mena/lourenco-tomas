import { Routes, Route } from 'react-router-dom'
import Cursor from './components/Cursor'
import Nav from './components/Nav'
import { Footer, WhatsApp } from './components/FooterWA'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Obras from './pages/Obras'
import Corporativos from './pages/corporativos'
import Sobre from './pages/Sobre'
import Encomendas from './pages/Encomendas'
import Contacto from './pages/Contacto'
import Homenagens from './pages/Homenagens'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import HomenagensDetalhe from './pages/HomenagensDetalhe'

function Layout({ children }) {
  return (
    <>
      <Cursor />
      <Nav />
      <main>{children}</main>
      <Footer />
      <WhatsApp />
    </>
  )
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/obras" element={<Layout><Obras /></Layout>} />
        <Route path="/corporativos" element={<Layout><Corporativos /></Layout>} />
        <Route path="/sobre" element={<Layout><Sobre /></Layout>} />
        <Route path="/encomendas" element={<Layout><Encomendas /></Layout>} />
        <Route path="/contacto" element={<Layout><Contacto /></Layout>} />
        <Route path="/homenagens" element={<Layout><Homenagens /></Layout>} />
        <Route path="/homenagens/:slug" element={<Layout><HomenagensDetalhe /></Layout>} />
        <Route path="/blog" element={<Layout><Blog /></Layout>} />
        <Route path="/blog/:slug" element={<Layout><BlogPost /></Layout>} />
      </Routes>
    </>
  )
}
