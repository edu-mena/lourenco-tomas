import Hero from '../components/Hero'
import { Marquee } from '../components/Marquee'
import About from '../components/About'
import Historia from '../components/Historia'
import Gallery from '../components/Gallery'
import Process from '../components/Process'
import Testimonials from '../components/Testimonials'
import Contact from '../components/Contact'

function Divider() {
  return <div className="section-divider" style={{ padding: '0 var(--px)' }} />
}

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Divider />
      <About />
      <Historia />
      <Divider />
      <Gallery />
      <Divider />
      <Process />
      <Divider />
      <Testimonials />
      <Divider />
      <Contact />
    </>
  )
}
