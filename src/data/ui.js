import { mediaUrl } from './media'

export const NAV_LINKS = [
  { label: 'Obras', to: '/obras' },
  { label: 'Corporativo', to: '/corporativos' },
  { label: 'Homenagens', to: '/homenagens' },
  { label: 'Blog', to: '/blog' },
  { label: 'Sobre o Artista', to: '/sobre' },
  { label: 'Contacto', to: '/contacto' },
]

export const HERO_CONTENT = {
  title: ['Lourenço', 'Tomás'],
  subtitle: 'Transformando superfícies em emoções através da aerografia.',
  ctaPrimary: 'Explorar Obras',
  ctaSecondary: 'Encomendar',
  scrollLabel: 'Scroll',
}

export const ABOUT_SECTION = {
  label: 'Sobre o Artista',
  heading: 'Sobre o Artista',
  body: [
    'Especialista em aerografia, diversas técnicas de estamparia em roupas, customização de calçados e acessórios. Com mais de 30 anos de experiência, transforma a peça de roupa numa verdadeira obra de arte.',
  ],
  image: mediaUrl('/images/about/santuario1.jpeg'),
  imageAlt: 'Arte — Lourenço Tomas',
  cards: [
    { key: 'tshirts',  label: 'T-Shirts', desc: 'Aerografia sobre tecido — cada peça única e irrepetível.', img: mediaUrl('/images/about/arte1.jpeg') },
    { key: 'murais',   label: 'Murais',   desc: 'Pinturas que transformam espaços e comunidades urbanas.', img: mediaUrl('/images/about/arte2.png') },
    { key: 'telas',    label: 'Telas',    desc: 'Retratos e composições com técnica e sensibilidade únicas.', img: mediaUrl('/images/about/arte3.png') },
    { key: 'calcados', label: 'Calçados', desc: 'Customização exclusiva com a identidade do cliente.', img: mediaUrl('/images/about/arte4.jpeg') },
  ],
  ctaLabel: 'Ver obras',
}

export const MARQUEE_ITEMS = ['T-Shirts','Murais','Telas','Calçados', 'T-Shirts','Murais','Telas','Calçados']

export const GALLERY_SECTION = {
  label: 'Galeria',
  title: 'OBRAS',
  sub: 'Uma selecção das peças mais icónicas',
  homLink: { label: 'Homenagens a Celebridades', to: '/homenagens' },
}

export const PROCESS_SECTION = {
  label: 'Bastidores',
  title: 'O PROCESSO\nCRIATIVO',
  intro: 'Cada obra começa numa ideia, ganha vida através da aerografia e termina como uma peça única de arte.',
}

export const TESTIMONIALS_SECTION = {
  label: 'Clientes',
  title: 'PALAVRAS\nQUE FICAM',
}

export const FOOTER_CONTENT = {
  quote: 'A arte não reproduz o que é visível — ela torna visível o que nem sempre é.',
  links: [
    { to: '/sobre', label: 'Obras' },
    { to: '/portfolio', label: 'Portfolio' },
    { to: '/encomendas', label: 'Encomendas' },
    { to: '/contacto', label: 'Contacto' },
  ],
}

export const BLOG_PAGE = {
  hero: {
    breadcrumb: 'Blog',
    title: 'Blog',
    subtitle: 'Processo criativo, bastidores e histórias por trás de cada obra.',
    deco: 'BLG',
  },
  filters: ['Todos', 'Processo', 'Homenagens', 'Técnica', 'Bastidores'],
  featuredCta: 'Ler artigo →',
  cardReadLabel: 'Ler mais',
  emptyState: 'Nenhum artigo nesta categoria ainda.',
}

export const BLOG_POST_PAGE = {
  cta: {
    label: 'Quer uma obra assim?',
    title: 'Encomendar uma peça única',
    description: 'Cada obra é criada de raiz, com dedicação total ao detalhe e à emoção. Entre em contacto e transformemos a sua ideia em arte.',
    button: 'Encomendar Agora →',
  },
  notFound: {
    message: 'Artigo não encontrado.',
    backLabel: '← Voltar ao Blog',
  },
  relatedSectionLabel: 'Continue a ler',
  relatedTitle: 'Outros artigos',
}

export const CONTACT_SECTION = {
  heading: 'Contacto',
  title: 'VAMOS\nCRIAR ALGO\nÚNICO',
  body: 'Cada encomenda é uma obra exclusiva. Seja uma t-shirt, uma tela, um mural ou um par de sapatilhas — o resultado será sempre único e artístico.',
  form: {
    name: { label: 'Nome', placeholder: 'O seu nome' },
    email: { label: 'Email', placeholder: 'o.seu@email.com' },
    service: { label: 'Tipo de Encomenda', placeholder: 'Seleccionar serviço', options: [
      { value: '', label: 'Seleccionar serviço' },
      { value: 'tshirt', label: 'Pintura em T-Shirt' },
      { value: 'tela', label: 'Pintura em Tela' },
      { value: 'mural', label: 'Pintura Mural' },
      { value: 'calcado', label: 'Customização de Calçado' },
      { value: 'outro', label: 'Outro / Personalizado' },
    ]},
    message: { label: 'Descreva o Projecto', placeholder: 'Conte-me a sua ideia, dimensões, referências...' },
    submit: { default: 'Enviar Encomenda', sent: 'Enviado! ✓' },
  },
}

export const CONTACTO_PAGE = {
  hero: {
    breadcrumb: 'Contacto',
    title: 'CONTA\nCTO',
    subtitle: 'Vamos criar algo único juntos — cada conversa começa aqui.',
    deco: 'OLÁ',
  },
  channels: {
    heading: 'Canais de Contacto',
    title: 'FALA\nCONNOSCO',
    body: 'A forma mais rápida de obter resposta é pelo WhatsApp. Para projectos maiores como murais e telas, o email permite partilhar mais detalhes e referências.',
  },
  form: {
    intro: 'Mensagem Directa',
    titles: 'ENVIAR\nMENSAGEM',
    fields: {
      name: { label: 'Nome', placeholder: 'O seu nome' },
      email: { label: 'Email', placeholder: 'o.seu@email.com' },
      subject: { label: 'Assunto', options: [
        { value: '', label: 'Seleccionar assunto' },
        { value: 'encomenda', label: 'Fazer uma encomenda' },
        { value: 'orcamento', label: 'Pedir orçamento' },
        { value: 'colaboracao', label: 'Proposta de colaboração' },
        { value: 'press', label: 'Imprensa / Media' },
        { value: 'outro', label: 'Outro' },
      ] },
      message: { label: 'Mensagem', placeholder: 'Escreva a sua mensagem aqui...' },
    },
    submit: { default: 'Enviar Mensagem', sent: 'Enviado! ✓' },
    whatsapp: 'WhatsApp',
  },
  infoCards: [
    { iconKey: 'pin',   label: 'Localização',        value: 'Luanda, Angola' },
    { iconKey: 'clock', label: 'Tempo de resposta',   value: '24–48 horas úteis' },
    { iconKey: 'globe', label: 'Envios',              value: 'Internacionais disponíveis' },
    { iconKey: 'brush', label: 'Projectos',           value: 'Murais, telas, encomendas' },
  ],
}

export const CORPORATE_PAGE = {
  hero: {
    breadcrumb: 'Corporativos',
    title: 'Corpo\nrativos',
    subtitle: 'Arte criada para empresas angolanas — murais, retratos e instalações que transformam espaços de trabalho em experiências memoráveis.',
    deco: 'EMP',
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
    { icon: '🖼', title: 'Murais', desc: 'Arte de grande formato para lobbies, corredores e espaços de trabalho — do conceito ao acabamento final.', detail: 'A partir de 2 m²' },
    { icon: '🎨', title: 'Telas & Impressões', desc: 'Obras únicas ou séries para salas de reunião, recepções e escritórios de direcção.', detail: 'Formatos personalizados' },
    { icon: '👤', title: 'Retratos Corporativos', desc: 'Retratos de líderes, fundadores e equipas — perpetuando a identidade e a memória da empresa.', detail: 'Óleo, carvão ou digital' },
    { icon: '✦', title: 'Instalações', desc: 'Projectos artísticos integrados na arquitectura do espaço, criados em co-autoria com o cliente.', detail: 'Projecto à medida' },
  ],
  process: [
    { num: '01', title: 'Briefing', desc: 'Reunião para entender a identidade da empresa, espaço e objectivo da obra.' },
    { num: '02', title: 'Conceito', desc: 'Apresentação de propostas visuais, paleta de cores e referências estéticas.' },
    { num: '03', title: 'Execução', desc: 'Produção da obra com acompanhamento fotográfico e updates regulares.' },
    { num: '04', title: 'Entrega', desc: 'Instalação no local, documentação final e certificado de autenticidade.' },
  ],
  processTitle: { first: 'Do briefing', second: 'à entrega' },
  sectionLabels: {
    process: 'Como trabalhamos',
    services: 'O que oferecemos',
    cta: 'Próximo projecto',
  },
  emptyState: 'Nenhuma obra nesta categoria ainda.',
  cta: {
    title: ['A sua empresa', 'merece arte'],
    description: 'Cada espaço conta uma história. Fale connosco e descubra como a arte pode transformar o ambiente da sua empresa.',
    primaryBtn: 'Solicitar orçamento',
    waBtn: 'WhatsApp',
  },
}

export const ORDER_PAGE = {
  hero: {
    breadcrumb: 'Encomendas',
    title: 'ENCOMEN\nDAS',
    subtitle: 'Obra exclusiva, criada de raiz para ti — da ideia inicial à entrega final.',
    deco: 'ART',
  },
  sectionLabels: {
    services: 'O que criamos',
    process: 'Processo',
    form: 'Fazer uma Encomenda',
    faq: 'Dúvidas',
  },
  sectionTitles: {
    services: 'SERVIÇOS',
    process: 'COMO FUNCIONA',
    form: 'FORMULÁRIO',
    faq: 'FAQ',
  },
  form: {
    fields: {
      name: { label: 'Nome completo', placeholder: 'O seu nome' },
      email: { label: 'Email', placeholder: 'o.seu@email.com' },
      phone: { label: 'WhatsApp / Telefone', placeholder: '+244 9XX XXX XXX' },
      service: {
        label: 'Tipo de Encomenda',
        options: [
          { value: '', label: 'Seleccionar serviço' },
          { value: 'tshirt', label: 'Pintura em T-Shirt' },
          { value: 'tela', label: 'Pintura em Tela' },
          { value: 'mural', label: 'Pintura Mural' },
          { value: 'calcado', label: 'Customização de Calçado' },
          { value: 'outro', label: 'Outro / Personalizado' },
        ],
      },
      size: { label: 'Dimensões / Tamanho', placeholder: 'Ex: Tela 60×80cm, Camisola M' },
      deadline: { label: 'Prazo desejado', placeholder: 'Ex: 3 semanas, sem urgência' },
      desc: { label: 'Descreva o seu projecto', placeholder: 'Descreva a sua ideia em detalhe — tema, cores preferidas, referências visuais, uso previsto...' },
    },
    submit: { default: 'Enviar Encomenda', sent: 'Enviado! ✓' },
  },
  services: [
    { icon: '◈', title: 'T-Shirts', desc: 'Pinturas realistas feitas com técnica da aerografia e detalhes impressionantes. Retratos, paisagens ou arte abstracta em tecido. Cada peça é feita com amor e muita atenção aos detalhes.', price: 'A partir de 150.000 AOA', includes: ['Escolha do design', 'Provas de cor', 'Fixação profissional', 'Cuidados de manutenção'] },
    { icon: '◉', title: 'Telas', desc: 'Obras em tela de algodão ou linho, em diferentes formatos. Da miniatura ao grande formato, cada tela é uma declaração artística.', price: 'A partir de 30.000 AOA', includes: ['Tela profissional incluída', 'Verniz de protecção', 'Certificado de autenticidade', 'Moldura opcional'] },
    { icon: '◫', title: 'Murais', desc: 'Intervenções murais para espaços interiores e exteriores. Do pequeno destaque visual ao grande mural de impacto urbano.', price: 'Orçamento personalizado', includes: ['Visita ao espaço', 'Projecto digital', 'Execução completa', 'Protecção anti-UV'] },
    { icon: '◬', title: 'Calçado', desc: 'Customização exclusiva de sapatilhas e calçado de couro. Cada par torna-se numa peça de arte portável e intransferível.', price: 'A partir de 20.000 AOA', includes: ['Limpeza e preparação', 'Arte customizada', 'Selante protector', 'Caixa de apresentação'] },
  ],
  steps: [
    { num: '01', title: 'Contacto', desc: 'Envia-nos a tua ideia por WhatsApp, email ou pelo formulário abaixo. Quanto mais detalhe, melhor.' },
    { num: '02', title: 'Conceito', desc: 'Desenvolvemos juntos o conceito visual. Partilhamos esboços digitais para aprovação antes de começar.' },
    { num: '03', title: 'Criação', desc: 'A obra ganha vida no ateliê. Partilhamos actualizações do processo ao longo da criação.' },
    { num: '04', title: 'Entrega', desc: 'A obra é embalada com cuidado e entregue pessoalmente ou enviada para qualquer parte do mundo.' },
  ],
  faqs: [
    { q: 'Qual é o tempo de entrega?', a: 'T-shirts e calçado: 7 a 14 dias úteis. Telas: 14 a 21 dias. Murais: acordado no orçamento inicial. Encomendas urgentes têm suplemento.' },
    { q: 'Como funciona o pagamento?', a: 'Pedimos 50% de sinal no momento da confirmação e os restantes 50% na entrega. Aceitamos transferência bancária, multicaixa e dinheiro.' },
    { q: 'Posso acompanhar a criação?', a: 'Sim! Partilhamos actualizações regulares por WhatsApp ou Instagram durante todo o processo criativo.' },
    { q: 'Fazem envios internacionais?', a: 'Sim, enviamos telas e calçado para qualquer país. Os custos de envio são calculados no momento da encomenda.' },
    { q: 'Quantas revisões estão incluídas?', a: 'Incluímos até 2 revisões no conceito digital antes de iniciar a obra. Revisões adicionais têm custo acrescido.' },
  ],
}

export const ABOUT_PAGE = {
  hero: {
    breadcrumb: 'Sobre',
    title: 'LOURENÇO\nTOMAS',
    subtitle: 'Artista angolano · Aerografia & Arte · Luanda, Angola',
    deco: 'ARTE',
  },
  bioImage: mediaUrl('/images/about/about.jpeg'),
  bioImageAlt: 'Lourenço Tomas — Artista Plástico',
  badge: { num: '30+', text: 'Anos de Arte' },
  paragraphs: [
    'Lourenço Joaquim Tomás nasceu em Luanda, Angola, a 18 de novembro de 1982. Filho de Amável Tomás e Mariana Joaquim António, ambos naturais da Gabela, província do Kwanza Sul, cresceu numa família numerosa, sendo o sétimo de dez filhos.',
    'Os seus pais mudaram-se para Luanda em busca de melhores condições de vida, enfrentando inúmeras dificuldades. Após vários desafios, incluindo a perda da casa onde viviam e anos de grande sacrifício, o pai estabeleceu uma oficina de bate-chapa e pintura automóvel, onde quase todos os filhos aprenderam a profissão.',
    'Desde cedo, Lourenço demonstrou uma forte paixão pelo desenho. Apesar da preocupação do pai, que via a arte como um passatempo sem futuro, ele manteve-se firme no seu sonho de se tornar artista. Em 2003 ingressou na Escola Nacional de Artes Plásticas (ENAP), onde foi reconhecido pelo seu talento em desenho. Contudo, enfrentou reprovações e dificuldades académicas que o levaram a abandonar a formação artística formal.',
    'Determinado a seguir o seu caminho, passou a desenvolver os seus conhecimentos de forma autodidata. Em 2007 dedicou-se ao design gráfico, área em que trabalhou durante dez anos, colaborando com diversas empresas e garantindo o seu sustento.',
    'Em 2017 regressou às artes plásticas com foco na aerografia, técnica que sempre desejou dominar. Com muita dedicação, estudo independente e prática constante, rapidamente alcançou resultados que impressionaram o público e os seus seguidores.',
    'Em novembro de 2018 realizou a sua primeira grande exposição individual de pintura em aerografia, intitulada “Seguindo o Sonho”. Hoje, a arte é a sua profissão e a principal fonte de sustento da sua família, tornando-se a prova de que a perseverança, a paixão e a fé podem transformar um sonho em realidade.',
  ],
  stats: [
    { num: '30+', label: 'Anos de Arte' },
    { num: '1000+', label: 'Peças Criadas' },
    { num: '1000+', label: 'Clientes Satisfeitos' },
  ],
  sectionLabels: {
    bio: 'Biografia',
    values: 'Filosofia',
    timeline: 'Percurso',
    cta: 'Colaboração',
  },
  pillars: [
    { icon: '◈', title: 'T-Shirts', desc: 'Peças personalizadas através de técnicas de aerografia e estamparia artística, transformando cada t-shirt numa expressão única de identidade e criatividade.' },
    { icon: '◈', title: 'Murais', desc: 'Intervenções artísticas em espaços públicos e privados, criando composições visuais que valorizam ambientes e comunicam ideias de forma impactante.' },
    { icon: '◈', title: 'Telas', desc: 'Obras produzidas sobre tela que combinam técnica, imaginação e experiência, resultando em peças originais destinadas à decoração e colecionismo.' },
    { icon: '◈', title: 'Calçados', desc: 'Customização exclusiva de sapatilhas e calçados, onde cada detalhe é cuidadosamente trabalhado para criar peças verdadeiramente diferenciadas.' },
  ],
  cta: {
    label: 'Colaboração',
    title: 'Vamos criar juntos',
    description: 'Uma obra feita à tua medida, com a alma do artista em cada traço.',
    primary: { label: 'Encomendar', to: '/encomendas' },
    secondary: { label: 'Ver Portfolio', to: '/portfolio' },
  },
}

export const WORKS_PAGE = {
  hero: {
    breadcrumb: 'Obras',
    title: 'OBRAS',
    subtitle: 'Aerografia sobre t-shirts, telas, murais e calçado — cada peça é única e irrepetível.',
    deco: 'OBRAS',
  },
  stats: [
    { num: '12', label: 'Obras em Exposição' },
    { num: '4', label: 'Categorias' },
    { num: '10+', label: 'Anos de Arte' },
  ],
  cta: {
    label: 'Cria a tua obra exclusiva',
    description: 'Cada peça é pensada, sentida e criada de raiz para o cliente.',
    button: 'Encomendar Agora',
  },
  countLabel: 'peça',
  countLabelPlural: 'peças',
}

export const TRIBUTES_PAGE = {
  hero: {
    breadcrumb: 'Homenagens',
    title: 'Home\nnagens',
    subtitle: 'Arte como forma de reconhecimento — retratos e obras dedicadas a celebridades angolanas, do esboço à entrega em mãos.',
    deco: 'HON',
  },
  featuredLabel: 'Destaques',
  featuredSubtitle: 'Clique no ícone de story para ver o processo em formato Stories, ou na obra para ver o detalhe completo.',
  allLabel: 'Todas as Homenagens',
  cta: {
    label: 'Acompanhe',
    title: 'Todo o processo\nno Instagram',
    description: 'Os bastidores, o processo criativo e os momentos de entrega são partilhados em tempo real. Siga para não perder nenhuma homenagem.',
    button: '@lourenco.tomas.art',
  },
  instagramUrl: 'https://instagram.com/lourenco.tomas.art',
}

export const NAV_BRAND = {
  logo: 'LOURENÇO TOMÁS',
  cta: { label: 'Encomendar', to: '/encomendas' },
  mobileAriaLabel: 'Abrir menu',
}

export const TRIBUTE_DETAIL_PAGE = {
  notFound: {
    message: 'Homenagem não encontrada.',
    backLabel: '← Voltar às Homenagens',
  },
  heroBackLabel: '← Homenagens',
  heroInstagramLabel: 'Instagram do artista ↗',
  sectionLabel: 'A Obra',
  cta: {
    label: 'Acompanhe',
    title: 'Veja o processo\nno Instagram',
    description: 'Os bastidores, o processo criativo e os momentos de entrega são partilhados em tempo real.',
  },
  placeholder: {
    title: 'Mais vídeos a caminho',
    label: 'Em breve',
  },
}
