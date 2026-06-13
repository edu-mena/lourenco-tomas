import { Routes, Route } from 'react-router-dom'
import Cursor from './components/Cursor'
import Nav from './components/Nav'
import { Footer, WhatsApp } from './components/FooterWA'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Obras from './pages/Obras'
import Corporativos from './pages/Corporativos'
import Sobre from './pages/Sobre'
import Encomendas from './pages/Encomendas'
import Contacto from './pages/Contacto'
import Homenagens from './pages/Homenagens'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import HomenagensDetalhe from './pages/HomenagensDetalhe'

// Admin
import { AdminDataProvider } from './contexts/AdminDataContext'
import AdminLayout from './components/admin/AdminLayout'
import Dashboard from './pages/admin/Dashboard'
import AdminTributes from './pages/admin/Tributes'
import TributeForm from './pages/admin/TributeForm'
import AdminBlog from './pages/admin/Blog'
import BlogForm from './pages/admin/BlogForm'
import AdminGallery from './pages/admin/Gallery'
import GalleryForm from './pages/admin/GalleryForm'
import AdminVideos from './pages/admin/Videos'
import VideoForm from './pages/admin/VideoForm'
import AdminTestimonials from './pages/admin/Testimonials'
import TestimonialForm from './pages/admin/TestimonialForm'
import AdminCorporate from './pages/admin/Corporate'
import CorporateForm from './pages/admin/CorporateForm'
import AdminHero from './pages/admin/settings/Hero'
import AdminAbout from './pages/admin/settings/About'
import AdminContact from './pages/admin/settings/Contact'
import AdminOrders from './pages/admin/settings/Orders'
import AdminFooter from './pages/admin/settings/Footer'

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
        {/* Site público */}
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

        {/* Admin — sem Nav/Footer/Cursor públicos */}
        <Route path="/admin" element={<AdminDataProvider><AdminLayout /></AdminDataProvider>}>
          <Route index element={<Dashboard />} />
          <Route path="tributes" element={<AdminTributes />} />
          <Route path="tributes/new" element={<TributeForm />} />
          <Route path="tributes/:id/edit" element={<TributeForm />} />
          <Route path="blog" element={<AdminBlog />} />
          <Route path="blog/new" element={<BlogForm />} />
          <Route path="blog/:slug/edit" element={<BlogForm />} />
          <Route path="gallery" element={<AdminGallery />} />
          <Route path="gallery/new" element={<GalleryForm />} />
          <Route path="gallery/:id/edit" element={<GalleryForm />} />
          <Route path="videos" element={<AdminVideos />} />
          <Route path="videos/new" element={<VideoForm />} />
          <Route path="videos/:id/edit" element={<VideoForm />} />
          <Route path="testimonials" element={<AdminTestimonials />} />
          <Route path="testimonials/new" element={<TestimonialForm />} />
          <Route path="testimonials/:id/edit" element={<TestimonialForm />} />
          <Route path="corporate" element={<AdminCorporate />} />
          <Route path="corporate/new" element={<CorporateForm />} />
          <Route path="corporate/:id/edit" element={<CorporateForm />} />
          <Route path="settings/hero" element={<AdminHero />} />
          <Route path="settings/about" element={<AdminAbout />} />
          <Route path="settings/contact" element={<AdminContact />} />
          <Route path="settings/orders" element={<AdminOrders />} />
          <Route path="settings/footer" element={<AdminFooter />} />
        </Route>
      </Routes>
    </>
  )
}
