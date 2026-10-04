import { Link } from 'react-router-dom'
import { IconArrow } from '../components/icons'

export default function NotFound() {
  return (
    <section className="not-found">
      <p className="section-label">Erro 404</p>
      <h1 className="not-found__title">Esta página não existe</h1>
      <p className="not-found__desc">O link pode estar errado ou a página foi movida.</p>
      <div className="not-found__actions">
        <Link to="/obras" className="btn-primary">Ver obras <IconArrow size={15} /></Link>
        <Link to="/" className="btn-text">Voltar ao início</Link>
      </div>
    </section>
  )
}
