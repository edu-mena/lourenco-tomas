import { mediaUrl } from './media'
import { INSTAGRAM_URL, INSTAGRAM_HANDLE } from './content'

/*
 * Textos da interface pública.
 * Registo: "você" (o seu, a sua) em todo o site.
 * Títulos com \n quebram linha de propósito — nunca a meio de uma palavra.
 */

export const NAV_LINKS = [
  { label: 'Obras', to: '/obras' },
  { label: 'Corporativo', to: '/corporativos' },
  { label: 'Homenagens', to: '/homenagens' },
  { label: 'Blog', to: '/blog' },
  { label: 'Sobre', to: '/sobre' },
  { label: 'Contacto', to: '/contacto' },
]

export const NAV_BRAND = {
  logo: 'LOURENÇO TOMÁS',
  cta: { label: 'Encomendar', to: '/encomendas' },
  mobileAriaLabel: 'Abrir menu',
}

/* Categoria da galeria → valor do serviço no formulário de encomenda */
export const CATEGORY_TO_SERVICE = {
  tshirts: 'tshirt',
  telas: 'tela',
  murais: 'mural',
  calcados: 'calcado',
}

export const SERVICE_OPTIONS = [
  { value: '', label: 'Escolha um tipo de obra' },
  { value: 'tshirt', label: 'Pintura em t-shirt' },
  { value: 'tela', label: 'Pintura em tela' },
  { value: 'mural', label: 'Mural' },
  { value: 'calcado', label: 'Customização de calçado' },
  { value: 'outro', label: 'Outro / personalizado' },
]

export const HERO_CONTENT = {
  eyebrow: 'Aerografia · Luanda, Angola',
  title: ['Lourenço', 'Tomás'],
  subtitle: 'T-shirts, telas, murais e calçado pintados à mão com aerógrafo. Cada peça é feita uma única vez.',
  ctaPrimary: 'Ver obras',
  ctaSecondary: 'Encomendar',
  scrollLabel: 'Continuar',
}

export const ABOUT_SECTION = {
  label: 'O artista',
  heading: 'Da oficina do pai ao aerógrafo',
  body: [
    'Lourenço cresceu na oficina de pintura automóvel do pai, em Luanda. Hoje pinta com aerógrafo sobre t-shirts, telas, paredes e sapatilhas — sempre à mão, peça a peça.',
  ],
  image: mediaUrl('/images/about/santuario1.jpeg'),
  imageAlt: 'Obra de Lourenço Tomás em aerografia',
  moreLabel: 'Ler a história completa',
  cards: [
    { key: 'tshirts',  label: 'T-Shirts', desc: 'Retratos e ilustrações pintados directamente no tecido.', img: mediaUrl('/images/about/arte1.jpeg') },
    { key: 'murais',   label: 'Murais',   desc: 'Paredes interiores e exteriores, de casas a empresas.', img: mediaUrl('/images/about/arte2.png') },
    { key: 'telas',    label: 'Telas',    desc: 'Retratos e composições, do pequeno ao grande formato.', img: mediaUrl('/images/about/arte3.png') },
    { key: 'calcados', label: 'Calçados', desc: 'Sapatilhas e calçado de couro personalizados.', img: mediaUrl('/images/about/arte4.jpeg') },
  ],
  ctaLabel: 'Ver obras',
}

export const GALLERY_SECTION = {
  label: 'Galeria',
  title: 'OBRAS',
  sub: 'Selecção recente. Clique numa obra para a ver inteira.',
  homLink: { label: 'Homenagens a celebridades', to: '/homenagens' },
}

export const PROCESS_SECTION = {
  label: 'Bastidores',
  title: 'O PROCESSO',
  intro: 'Do esboço ao último detalhe: veja as obras a ganhar forma no ateliê.',
}

export const TESTIMONIALS_SECTION = {
  label: 'Clientes',
  title: 'O QUE DIZEM\nOS CLIENTES',
}

export const CONTACT_SECTION = {
  heading: 'Encomendas',
  title: 'TEM UMA IDEIA?\nVAMOS PINTÁ-LA.',
  body: 'T-shirt, tela, mural ou sapatilhas: descreva o que imagina e receba uma proposta. A conversa continua no WhatsApp.',
  primary: 'Fazer encomenda',
  whatsapp: 'Falar no WhatsApp',
}

export const FOOTER_CONTENT = {
  tagline: 'Aerografia pintada à mão em Luanda, Angola.',
  waTooltip: 'Falar no WhatsApp',
  links: [
    { to: '/obras', label: 'Obras' },
    { to: '/encomendas', label: 'Encomendas' },
    { to: '/homenagens', label: 'Homenagens' },
    { to: '/blog', label: 'Blog' },
    { to: '/sobre', label: 'Sobre' },
    { to: '/contacto', label: 'Contacto' },
  ],
}

export const BLOG_PAGE = {
  hero: {
    breadcrumb: 'Blog',
    title: 'Blog',
    subtitle: 'Processo criativo, bastidores e as histórias por trás de cada obra.',
  },
  filters: ['Todos', 'Processo', 'Homenagens', 'Técnica', 'Bastidores'],
  featuredCta: 'Ler artigo',
  cardReadLabel: 'Ler mais',
  emptyState: 'Ainda não há artigos nesta categoria.',
}

export const BLOG_POST_PAGE = {
  cta: {
    label: 'Gostou desta obra?',
    title: 'Encomende uma peça única',
    description: 'Cada obra é criada de raiz. Descreva a sua ideia e receba uma proposta.',
    button: 'Fazer encomenda',
  },
  notFound: {
    message: 'Artigo não encontrado.',
    backLabel: 'Voltar ao blog',
  },
  relatedSectionLabel: 'Continue a ler',
  relatedTitle: 'Outros artigos',
}

export const CONTACTO_PAGE = {
  hero: {
    breadcrumb: 'Contacto',
    title: 'Contacto',
    subtitle: 'A resposta mais rápida é pelo WhatsApp. Para murais e projectos grandes, o email permite enviar referências.',
  },
  channels: {
    heading: 'Canais',
    title: 'FALE\nCONNOSCO',
    body: 'Escolha o canal que preferir. Toque no ícone de copiar para guardar o número ou o email.',
  },
  form: {
    intro: 'Mensagem directa',
    titles: 'ENVIAR\nMENSAGEM',
    fields: {
      name: { label: 'Nome', placeholder: 'O seu nome' },
      email: { label: 'Email', placeholder: 'o.seu@email.com' },
      subject: { label: 'Assunto', options: [
        { value: '', label: 'Escolha um assunto' },
        { value: 'Encomenda', label: 'Fazer uma encomenda' },
        { value: 'Orçamento', label: 'Pedir orçamento' },
        { value: 'Colaboração', label: 'Proposta de colaboração' },
        { value: 'Imprensa', label: 'Imprensa / media' },
        { value: 'Outro', label: 'Outro' },
      ] },
      message: { label: 'Mensagem', placeholder: 'Escreva a sua mensagem…' },
    },
    submitWhatsApp: 'Enviar pelo WhatsApp',
    submitEmail: 'Enviar por email',
    sent: {
      title: 'Mensagem pronta',
      body: 'Abrimos a conversa com a sua mensagem já escrita — só falta carregar em enviar. Se nada abriu, use os botões abaixo.',
    },
  },
  infoCards: [
    { iconKey: 'pin',   label: 'Localização',      value: 'Luanda, Angola' },
    { iconKey: 'clock', label: 'Tempo de resposta', value: '24–48 horas úteis' },
    { iconKey: 'globe', label: 'Envios',            value: 'Internacionais disponíveis' },
    { iconKey: 'brush', label: 'Projectos',         value: 'Murais, telas, encomendas' },
  ],
}

export const CORPORATE_PAGE = {
  hero: {
    breadcrumb: 'Corporativo',
    title: 'Corporativo',
    subtitle: 'Arte criada para empresas angolanas — murais, retratos e instalações que transformam espaços de trabalho.',
  },
  stats: [
    { num: null, label: 'Empresas parceiras' },
    { num: null, label: 'Obras entregues' },
    { num: null, label: 'Formatos disponíveis' },
    { num: '100%', label: 'Projectos à medida' },
  ],
  views: [
    { key: 'empresas', label: 'Empresas' },
    { key: 'obras',    label: 'Todas as obras' },
  ],
  filters: ['Todos', 'Mural', 'Retrato', 'Tela', 'Impressão', 'Instalação'],
  services: [
    { title: 'Murais', desc: 'Arte de grande formato para lobbies, corredores e espaços de trabalho — do conceito ao acabamento final.', detail: 'A partir de 2 m²' },
    { title: 'Telas & impressões', desc: 'Obras únicas ou séries para salas de reunião, recepções e gabinetes de direcção.', detail: 'Formatos personalizados' },
    { title: 'Retratos corporativos', desc: 'Retratos de líderes, fundadores e equipas, para a memória e identidade da empresa.', detail: 'Óleo, carvão ou digital' },
    { title: 'Instalações', desc: 'Projectos artísticos integrados na arquitectura do espaço, criados em conjunto com o cliente.', detail: 'Projecto à medida' },
  ],
  process: [
    { num: '01', title: 'Briefing', desc: 'Reunião para perceber a identidade da empresa, o espaço e o objectivo da obra.' },
    { num: '02', title: 'Conceito', desc: 'Apresentação de propostas visuais, paleta de cores e referências.' },
    { num: '03', title: 'Execução', desc: 'Produção da obra com registo fotográfico e actualizações regulares.' },
    { num: '04', title: 'Entrega', desc: 'Instalação no local, documentação final e certificado de autenticidade.' },
  ],
  processTitle: { first: 'Do briefing', second: 'à entrega' },
  sectionLabels: {
    process: 'Como trabalhamos',
    services: 'O que oferecemos',
    cta: 'Próximo projecto',
  },
  emptyState: 'Ainda não há obras nesta categoria.',
  companyFilterLabel: 'Empresa',
  cta: {
    title: ['A sua empresa', 'merece arte'],
    description: 'Fale connosco e descubra como uma obra pode transformar o ambiente da sua empresa.',
    primaryBtn: 'Pedir orçamento',
    waBtn: 'WhatsApp',
  },
}

export const ORDER_PAGE = {
  hero: {
    breadcrumb: 'Encomendas',
    title: 'Encomendas',
    subtitle: 'Uma obra criada de raiz para si — da ideia à entrega.',
  },
  sectionLabels: {
    services: 'O que criamos',
    process: 'Processo',
    form: 'Pedido',
    faq: 'Antes de encomendar',
  },
  sectionTitles: {
    services: 'SERVIÇOS',
    process: 'COMO FUNCIONA',
    form: 'O SEU PEDIDO',
  },
  serviceCta: 'Encomendar',
  form: {
    fields: {
      name: { label: 'Nome', placeholder: 'O seu nome' },
      email: { label: 'Email', placeholder: 'o.seu@email.com' },
      phone: { label: 'Telefone', placeholder: '+244 9XX XXX XXX' },
      service: { label: 'Tipo de obra' },
      size: { label: 'Dimensões / tamanho', placeholder: 'Ex.: tela 60×80 cm, t-shirt M' },
      deadline: { label: 'Prazo', placeholder: 'Ex.: 3 semanas, sem pressa' },
      desc: {
        label: 'A sua ideia',
        placeholder: 'Tema, cores, referências, onde vai ser usada…',
        hint: 'Quanto mais detalhe, mais rigorosa a proposta.',
      },
    },
    reference: ref => `Referência: obra «${ref}» da galeria.`,
    submit: 'Enviar pedido pelo WhatsApp',
    note: 'O pedido abre no WhatsApp já preenchido. Não há compromisso até aprovar a proposta.',
    sent: {
      title: 'Pedido pronto a enviar',
      body: 'Abrimos o WhatsApp com o seu pedido já escrito — só falta carregar em enviar. Se nada abriu, use os botões abaixo.',
    },
  },
  services: [
    { key: 'tshirts', value: 'tshirt', title: 'T-Shirts', img: mediaUrl('/images/about/arte1.jpeg'), desc: 'Pinturas realistas em aerografia directamente no tecido: retratos, paisagens ou arte abstracta.', price: 'A partir de 150.000 AOA', includes: ['Escolha do design', 'Provas de cor', 'Fixação profissional', 'Cuidados de manutenção'] },
    { key: 'telas', value: 'tela', title: 'Telas', img: mediaUrl('/images/about/arte3.png'), desc: 'Obras em tela de algodão ou linho, da miniatura ao grande formato.', price: 'A partir de 30.000 AOA', includes: ['Tela profissional incluída', 'Verniz de protecção', 'Certificado de autenticidade', 'Moldura opcional'] },
    { key: 'murais', value: 'mural', title: 'Murais', img: mediaUrl('/images/about/arte2.png'), desc: 'Murais para espaços interiores e exteriores, do pequeno destaque ao grande formato.', price: 'Orçamento personalizado', includes: ['Visita ao espaço', 'Projecto digital', 'Execução completa', 'Protecção anti-UV'] },
    { key: 'calcados', value: 'calcado', title: 'Calçado', img: mediaUrl('/images/about/arte4.jpeg'), desc: 'Customização de sapatilhas e calçado de couro — cada par é exclusivo.', price: 'A partir de 20.000 AOA', includes: ['Limpeza e preparação', 'Arte personalizada', 'Selante protector', 'Caixa de apresentação'] },
  ],
  steps: [
    { num: '01', title: 'Contacto', desc: 'Envie a sua ideia pelo formulário, WhatsApp ou email. Quanto mais detalhe, melhor.' },
    { num: '02', title: 'Conceito', desc: 'Desenvolvemos o conceito em conjunto e partilhamos esboços digitais para aprovação.' },
    { num: '03', title: 'Criação', desc: 'A obra ganha vida no ateliê, com actualizações do processo ao longo da criação.' },
    { num: '04', title: 'Entrega', desc: 'A obra é embalada com cuidado e entregue em mãos ou enviada para qualquer país.' },
  ],
  faqs: [
    { q: 'Qual é o tempo de entrega?', a: 'T-shirts e calçado: 7 a 14 dias úteis. Telas: 14 a 21 dias. Murais: acordado no orçamento. Encomendas urgentes têm suplemento.' },
    { q: 'Como funciona o pagamento?', a: '50% de sinal na confirmação e 50% na entrega. Aceitamos transferência bancária, Multicaixa e numerário.' },
    { q: 'Posso acompanhar a criação?', a: 'Sim. Partilhamos actualizações regulares por WhatsApp ou Instagram durante todo o processo.' },
    { q: 'Fazem envios internacionais?', a: 'Sim, enviamos telas e calçado para qualquer país. Os portes são calculados no momento da encomenda.' },
    { q: 'Quantas revisões estão incluídas?', a: 'Até 2 revisões do conceito digital antes de começar a obra. Revisões adicionais têm custo.' },
  ],
}

export const ABOUT_PAGE = {
  hero: {
    breadcrumb: 'Sobre',
    title: 'Lourenço Tomás',
    subtitle: 'Artista angolano · Aerografia · Luanda',
  },
  bioImage: mediaUrl('/images/about/about.jpeg'),
  bioImageAlt: 'Lourenço Tomás',
  badge: { num: '30+', text: 'Anos de arte' },
  paragraphs: [
    'Lourenço Joaquim Tomás nasceu em Luanda, Angola, a 18 de Novembro de 1982. Filho de Amável Tomás e Mariana Joaquim António, ambos naturais da Gabela, província do Kwanza Sul, cresceu numa família numerosa, sendo o sétimo de dez filhos.',
    'Os pais mudaram-se para Luanda em busca de melhores condições de vida, enfrentando inúmeras dificuldades. Após vários desafios, incluindo a perda da casa onde viviam e anos de grande sacrifício, o pai estabeleceu uma oficina de bate-chapa e pintura automóvel, onde quase todos os filhos aprenderam a profissão.',
    'Desde cedo, Lourenço demonstrou uma forte paixão pelo desenho. Apesar da preocupação do pai, que via a arte como um passatempo sem futuro, manteve-se firme no sonho de ser artista. Em 2003 entrou na Escola Nacional de Artes Plásticas (ENAP), onde foi reconhecido pelo talento no desenho. Contudo, reprovações e dificuldades académicas levaram-no a abandonar a formação artística formal.',
    'Determinado a seguir o seu caminho, continuou a aprender de forma autodidata. Em 2007 dedicou-se ao design gráfico, área em que trabalhou durante dez anos, colaborando com diversas empresas.',
    'Em 2017 regressou às artes plásticas com foco na aerografia, técnica que sempre quis dominar. Com estudo independente e prática constante, rapidamente alcançou resultados que impressionaram o público.',
    'Em Novembro de 2018 realizou a primeira grande exposição individual de aerografia, «Seguindo o Sonho». Hoje, a arte é a sua profissão e o sustento da família — a prova de que a perseverança, a paixão e a fé podem transformar um sonho em realidade.',
  ],
  stats: [
    { num: '30+', label: 'Anos de arte' },
    { num: '1000+', label: 'Peças criadas' },
    { num: '1000+', label: 'Clientes' },
  ],
  sectionLabels: {
    bio: 'Biografia',
    values: 'O que faz',
    timeline: 'Percurso',
    cta: 'Colaboração',
  },
  sectionTitles: {
    heading: 'Sobre o artista',
    values: 'ESPECIALIDADES',
    timeline: 'PERCURSO',
  },
  pillars: [
    { title: 'T-Shirts', desc: 'Peças personalizadas com aerografia e estamparia artística — cada t-shirt é uma expressão de identidade.' },
    { title: 'Murais', desc: 'Intervenções em espaços públicos e privados que valorizam ambientes e comunicam ideias.' },
    { title: 'Telas', desc: 'Obras sobre tela que juntam técnica, imaginação e experiência, para decoração e colecção.' },
    { title: 'Calçados', desc: 'Customização de sapatilhas e calçado, com cada detalhe trabalhado à mão.' },
  ],
  cta: {
    label: 'Colaboração',
    title: 'Vamos criar juntos',
    description: 'Uma obra feita à sua medida, com a mão do artista em cada traço.',
    primary: { label: 'Encomendar', to: '/encomendas' },
    secondary: { label: 'Ver obras', to: '/obras' },
  },
}

/* /contactos — página de links para a bio do Instagram */
export const LINKS_PAGE = {
  name: 'Lourenço Tomás',
  bio: 'é artista plástico em Luanda. Aprendeu a pintar na oficina do pai e hoje cria à mão, com aerógrafo, t-shirts, telas, murais e calçado.',
  title: 'Clique nos ícones para interagir',
}

export const WORKS_PAGE = {
  hero: {
    breadcrumb: 'Obras',
    title: 'Obras',
    subtitle: 'Aerografia sobre t-shirts, telas, murais e calçado — cada peça é feita uma única vez.',
  },
  cta: {
    label: 'Não encontrou o que procura?',
    description: 'Cada peça é criada de raiz. Descreva a sua ideia e receba uma proposta.',
    button: 'Fazer encomenda',
  },
  countLabel: 'peça',
  countLabelPlural: 'peças',
}

export const TRIBUTES_PAGE = {
  hero: {
    breadcrumb: 'Homenagens',
    title: 'Homenagens',
    subtitle: 'Retratos e obras dedicadas a celebridades angolanas — do esboço à entrega em mãos.',
  },
  featuredLabel: 'Destaques',
  allLabel: 'Todas as homenagens',
  storyLabel: 'Ver story',
  detailLabel: 'Ver detalhe',
  cta: {
    label: 'Acompanhe',
    title: 'Todo o processo',
    titleAccent: 'no Instagram',
    description: 'Bastidores, processo criativo e entregas, partilhados em tempo real.',
    button: INSTAGRAM_HANDLE,
  },
  instagramUrl: INSTAGRAM_URL,
}

export const TRIBUTE_DETAIL_PAGE = {
  notFound: {
    message: 'Homenagem não encontrada.',
    backLabel: 'Voltar às homenagens',
  },
  heroBackLabel: 'Homenagens',
  heroInstagramLabel: 'Instagram do artista',
  sectionLabel: 'A obra',
  cta: {
    label: 'Acompanhe',
    title: 'Veja o processo\nno Instagram',
    description: 'Bastidores, processo criativo e entregas, partilhados em tempo real.',
  },
  placeholder: {
    title: 'Mais vídeos a caminho',
    label: 'Em breve',
  },
}
