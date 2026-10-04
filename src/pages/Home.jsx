import Hero from '../components/Hero'
import Gallery from '../components/Gallery'
import Process from '../components/Process'
import About from '../components/About'
import Testimonials from '../components/Testimonials'
import Contact from '../components/Contact'

/* As obras primeiro: o visitante vê o trabalho antes de ler a biografia */
export default function Home() {
  return (
    <>
      <Hero />
      <Gallery />
      <Process />
      <About />
      <Testimonials />
      <Contact />
    </>
  )
}
