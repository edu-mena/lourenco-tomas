import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useScrollReveal } from '../hooks'

const SERVICES = [
  {
    icon: '◈',
    title: 'T-Shirts',
    desc: 'Retratos, paisagens ou arte abstracta em tecido. Cada peça é aerografada à mão com tintas especializadas para tecido.',
    price: 'A partir de 15.000 AOA',
    includes: ['Escolha do design', 'Provas de cor', 'Fixação profissional', 'Cuidados de manutenção'],
  },
  {
    icon: '◉',
    title: 'Telas',
    desc: 'Obras em tela de algodão ou linho, em diferentes formatos. Da miniatura ao grande formato, cada tela é uma declaração artística.',
    price: 'A partir de 30.000 AOA',
    includes: ['Tela profissional incluída', 'Verniz de protecção', 'Certificado de autenticidade', 'Moldura opcional'],
  },
  {
    icon: '◫',
    title: 'Murais',
    desc: 'Intervenções murais para espaços interiores e exteriores. Do pequeno destaque visual ao grande mural de impacto urbano.',
    price: 'Orçamento personalizado',
    includes: ['Visita ao espaço', 'Projecto digital', 'Execução completa', 'Protecção anti-UV'],
  },
  {
    icon: '◬',
    title: 'Calçado',
    desc: 'Customização exclusiva de sapatilhas e calçado de couro. Cada par torna-se numa peça de arte portável e intransferível.',
    price: 'A partir de 20.000 AOA',
    includes: ['Limpeza e preparação', 'Arte customizada', 'Selante protector', 'Caixa de apresentação'],
  },
]

const STEPS = [
  { num: '01', title: 'Contacto', desc: 'Envia-nos a tua ideia por WhatsApp, email ou pelo formulário abaixo. Quanto mais detalhe, melhor.' },
  { num: '02', title: 'Conceito', desc: 'Desenvolvemos juntos o conceito visual. Partilhamos esboços digitais para aprovação antes de começar.' },
  { num: '03', title: 'Criação', desc: 'A obra ganha vida no ateliê. Partilhamos actualizações do processo ao longo da criação.' },
  { num: '04', title: 'Entrega', desc: 'A obra é embalada com cuidado e entregue pessoalmente ou enviada para qualquer parte do mundo.' },
]

const FAQS = [
  { q: 'Qual é o tempo de entrega?', a: 'T-shirts e calçado: 7 a 14 dias úteis. Telas: 14 a 21 dias. Murais: acordado no orçamento inicial. Encomendas urgentes têm suplemento.' },
  { q: 'Como funciona o pagamento?', a: 'Pedimos 50% de sinal no momento da confirmação e os restantes 50% na entrega. Aceitamos transferência bancária, multicaixa e dinheiro.' },
  { q: 'Posso acompanhar a criação?', a: 'Sim! Partilhamos actualizações regulares por WhatsApp ou Instagram durante todo o processo criativo.' },
  { q: 'Fazem envios internacionais?', a: 'Sim, enviamos telas e calçado para qualquer país. Os custos de envio são calculados no momento da encomenda.' },
  { q: 'Quantas revisões estão incluídas?', a: 'Incluímos até 2 revisões no conceito digital antes de iniciar a obra. Revisões adicionais têm custo acrescido.' },
]

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`faq-item${open ? ' open' : ''}`}>
      <button className="faq-item__q" onClick={() => setOpen(v => !v)}>
        {q}
        <span className="faq-item__icon">
          <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" width="12" height="12">
            <path d="M6 2v8M2 6h8"/>
          </svg>
        </span>
      </button>
      <div className="faq-item__a">
        <p>{a}</p>
      </div>
    </div>
  )
}

export default function Encomendas() {
  const [sent, setSent] = useState(false)
  const [servicesRef, servicesVisible] = useScrollReveal()
  const [stepsRef, stepsVisible] = useScrollReveal()
  const [formRef, formVisible] = useScrollReveal()
  const [faqRef, faqVisible] = useScrollReveal()

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 3500)
    e.target.reset()
  }

  return (
    <>
      {/* ── Page Hero ─────────────────────────────── */}
      <div className="page-hero">
        <div className="page-hero__breadcrumb">
          <Link to="/">Início</Link>
          <span> / Encomendas</span>
        </div>
        <h1 className="page-hero__title">ENCOMEN<br/>DAS</h1>
        <p className="page-hero__sub">
          Obra exclusiva, criada de raiz para ti — da ideia inicial à entrega final.
        </p>
        <div className="page-hero__deco" aria-hidden>ART</div>
      </div>

      {/* ── Serviços ──────────────────────────────── */}
      <section className="services-section">
        <div ref={servicesRef} className={`reveal${servicesVisible ? ' visible' : ''}`}>
          <div className="section-label">O que criamos</div>
          <h2 className="section-title-display" style={{ marginBottom: '56px' }}>SERVIÇOS</h2>
          <div className="services-grid">
            {SERVICES.map(s => (
              <div key={s.title} className="service-card">
                <span className="service-card__icon">{s.icon}</span>
                <h3 className="service-card__title">{s.title}</h3>
                <p className="service-card__desc">{s.desc}</p>
                <div className="service-card__price">{s.price}</div>
                <ul className="service-card__includes">
                  {s.includes.map(item => <li key={item}>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Como Funciona ─────────────────────────── */}
      <section className="order-process">
        <div ref={stepsRef} className={`reveal${stepsVisible ? ' visible' : ''}`}>
          <div className="section-label">Processo</div>
          <h2 className="section-title-display" style={{ marginBottom: '56px' }}>COMO FUNCIONA</h2>
          <div className="order-process__grid">
            {STEPS.map(s => (
              <div key={s.num} className="order-step">
                <div className="order-step__num">{s.num}</div>
                <h3 className="order-step__title">{s.title}</h3>
                <p className="order-step__desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Formulário ────────────────────────────── */}
      <section className="encomendas-form-section">
        <div ref={formRef} className={`encomendas-form-inner reveal${formVisible ? ' visible' : ''}`}>
          <div className="section-label">Fazer uma Encomenda</div>
          <h2 className="section-title-display" style={{ marginBottom: '56px' }}>FORMULÁRIO</h2>

          <form className="contact__form encomendas-form" onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="enc-name">Nome completo</label>
                <input id="enc-name" className="form-input" type="text" placeholder="O seu nome" required />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="enc-email">Email</label>
                <input id="enc-email" className="form-input" type="email" placeholder="o.seu@email.com" required />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="enc-phone">WhatsApp / Telefone</label>
                <input id="enc-phone" className="form-input" type="tel" placeholder="+244 9XX XXX XXX" />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="enc-service">Tipo de Encomenda</label>
                <select id="enc-service" className="form-select" required>
                  <option value="">Seleccionar serviço</option>
                  <option value="tshirt">Pintura em T-Shirt</option>
                  <option value="tela">Pintura em Tela</option>
                  <option value="mural">Pintura Mural</option>
                  <option value="calcado">Customização de Calçado</option>
                  <option value="outro">Outro / Personalizado</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="enc-size">Dimensões / Tamanho</label>
                <input id="enc-size" className="form-input" type="text" placeholder="Ex: Tela 60×80cm, Camisola M" />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="enc-deadline">Prazo desejado</label>
                <input id="enc-deadline" className="form-input" type="text" placeholder="Ex: 3 semanas, sem urgência" />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="enc-desc">Descreva o seu projecto</label>
              <textarea
                id="enc-desc"
                className="form-textarea"
                placeholder="Descreva a sua ideia em detalhe — tema, cores preferidas, referências visuais, uso previsto..."
                required
              />
            </div>
            <button type="submit" className={`form-submit${sent ? ' form-submit--sent' : ''}`}>
              {sent ? 'Enviado! ✓' : (
                <>
                  Enviar Encomenda
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M3 8h10M9 4l4 4-4 4"/>
                  </svg>
                </>
              )}
            </button>
          </form>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────── */}
      <section className="faq-section">
        <div ref={faqRef} className={`faq-inner reveal${faqVisible ? ' visible' : ''}`}>
          <div className="section-label">Dúvidas</div>
          <h2 className="section-title-display" style={{ marginBottom: '56px' }}>FAQ</h2>
          <div className="faq-list">
            {FAQS.map(f => <FaqItem key={f.q} {...f} />)}
          </div>
        </div>
      </section>
    </>
  )
}
