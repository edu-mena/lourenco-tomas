/* ── Navigation ─────────────────────────────────── */
export const NAV_LINKS = [
  { label: 'Sobre', href: '#about' },
  { label: 'Obras', href: '#gallery' },
  { label: 'Processo', href: '#process' },
  { label: 'Clientes', href: '#testimonials' },
]

/* ── Gallery ────────────────────────────────────── */
export const GALLERY_ITEMS = [
  { id: 1, cat: 'tshirts', title: 'Retrato Mãe', sub: 'T-Shirt · Aerografia', h: 340,
    grad: 'linear-gradient(145deg,#1a0d06 0%,#3a1e0c 35%,#4d2a12 55%,#281508 80%,#100908 100%)' },
  { id: 2, cat: 'telas', title: 'Alma Urbana', sub: 'Tela 60×80cm', h: 460,
    grad: 'linear-gradient(155deg,#060b16 0%,#0e182d 35%,#141e36 55%,#0a1022 80%,#050812 100%)' },
  { id: 3, cat: 'murais', title: 'Luanda Viva', sub: 'Mural · Exterior', h: 380,
    grad: 'linear-gradient(135deg,#0d1208 0%,#1a200f 35%,#222c18 55%,#141a09 80%,#090d05 100%)' },
  { id: 4, cat: 'calcados', title: 'Air Max Custom', sub: 'Calçado · Edição única', h: 290,
    grad: 'linear-gradient(140deg,#150e0d 0%,#291818 35%,#371f1f 55%,#201010 80%,#0e0808 100%)' },
  { id: 5, cat: 'tshirts', title: 'Leão Africano', sub: 'T-Shirt · Aerografia', h: 380,
    grad: 'linear-gradient(150deg,#140e06 0%,#251809 35%,#312013 55%,#1c1308 80%,#0b0906 100%)' },
  { id: 6, cat: 'telas', title: 'Mulher de Luanda', sub: 'Tela 80×100cm', h: 500,
    grad: 'linear-gradient(160deg,#0f0812 0%,#1c1024 35%,#24162e 55%,#17101c 80%,#0b0812 100%)' },
  { id: 7, cat: 'murais', title: 'Identidade', sub: 'Mural · Interior', h: 350,
    grad: 'linear-gradient(130deg,#110d08 0%,#201608 35%,#2c1f0e 55%,#1a1309 80%,#0b0908 100%)' },
  { id: 8, cat: 'calcados', title: 'Jordan x Art', sub: 'Calçado · Nike', h: 310,
    grad: 'linear-gradient(145deg,#090d16 0%,#10162c 35%,#161e38 55%,#0d1222 80%,#060810 100%)' },
  { id: 9, cat: 'tshirts', title: 'Retrato Ancestral', sub: 'T-Shirt · Série limitada', h: 420,
    grad: 'linear-gradient(155deg,#110b07 0%,#221408 35%,#2e1e0c 55%,#1c1208 80%,#0b0906 100%)' },
  { id: 10, cat: 'telas', title: 'Cosmos Africano', sub: 'Tela 50×70cm', h: 340,
    grad: 'linear-gradient(140deg,#0c1009 0%,#172012 35%,#1f2c19 55%,#131a0d 80%,#090e07 100%)' },
  { id: 11, cat: 'murais', title: 'Raízes', sub: 'Mural · Projecto público', h: 440,
    grad: 'linear-gradient(125deg,#0e0b08 0%,#1a1610 35%,#241e15 55%,#18140d 80%,#0d0a08 100%)' },
  { id: 12, cat: 'calcados', title: 'Vans Custom', sub: 'Calçado · Vans', h: 270,
    grad: 'linear-gradient(150deg,#100812 0%,#201022 35%,#2c1530 55%,#1c0e1e 80%,#0a0812 100%)' },
]

export const GALLERY_FILTERS = [
  { key: 'all', label: 'Todas as Obras' },
  { key: 'tshirts', label: 'T-Shirts' },
  { key: 'telas', label: 'Telas' },
  { key: 'murais', label: 'Murais' },
  { key: 'calcados', label: 'Calçados' },
]

/* ── Palette per category for canvas art ────────── */
export const ART_PALETTE = {
  tshirts: ['rgba(190,128,58,', 'rgba(230,175,95,', 'rgba(155,95,38,'],
  telas:   ['rgba(85,105,168,', 'rgba(65,85,148,',  'rgba(108,128,190,'],
  murais:  ['rgba(62,125,68,',  'rgba(82,148,88,',  'rgba(52,105,58,'],
  calcados:['rgba(148,62,108,', 'rgba(168,82,128,', 'rgba(128,52,95,'],
}

/* ── Testimonials ───────────────────────────────── */
export const TESTIMONIALS = [
  {
    id: 1,
    text: 'A t-shirt que o Lourenço me criou é literalmente uma obra de arte. As pessoas na rua param para perguntar onde comprei. É impossível descrever o nível de detalhe e emoção que ele consegue transmitir.',
    name: 'Miguel Ferreira',
    role: 'T-Shirt Personalizada',
    avatar: 'M',
  },
  {
    id: 2,
    text: 'Encomendei um mural para o espaço da minha empresa. O resultado superou todas as expectativas. O Lourenço entende o espaço e cria algo que parece ter pertencido àquele lugar desde sempre.',
    name: 'Ana Lopes',
    role: 'Empresária · Mural Corporativo',
    avatar: 'A',
  },
  {
    id: 3,
    text: 'Os meus Jordans customizados pelo Lourenço são peças de colecção. A qualidade do trabalho, o detalhe do retrato — é impressionante. Um artista dedicado, profissional e com uma visão única.',
    name: 'David Nkosi',
    role: 'Coleccionador · Calçados',
    avatar: 'D',
  },
]

/* ── Timeline ───────────────────────────────────── */
export const TIMELINE = [
  { year: '2013', event: 'Início da jornada artística — primeiros experimentos com aerografia em Luanda' },
  { year: '2016', event: 'Primeiro mural público — projecto de arte urbana no centro de Luanda' },
  { year: '2019', event: 'Lançamento da linha de customização exclusiva de vestuário e calçado' },
  { year: '2023', event: 'Exposição colectiva internacional — reconhecimento da arte africana contemporânea' },
]

/* ── Videos ─────────────────────────────────────── */
export const VIDEOS = [
  { id: 1, featured: true,  label: 'Destaque · 4:32', title: 'Retrato em Tempo Real — do branco ao rosto',
    src: '/videos/Aerografia.mp4',
    grad: 'linear-gradient(160deg,#110b06 0%,#221508 30%,#301e0a 55%,#1c1208 80%,#0c0906 100%)' },
  { id: 2, featured: false, label: 'Time-lapse · 1:15', title: 'Mural Urbano — 8 horas em 75 segundos',
    src: '/videos/Desfile.mp4',
    grad: 'linear-gradient(145deg,#080c16 0%,#101826 40%,#151e32 60%,#0c1222 85%,#060910 100%)' },
  { id: 3, featured: false, label: 'Tutorial · 2:48', title: 'T-Shirt Customization — técnicas de gradiente',
    src: '/videos/Santuario.mp4',
    grad: 'linear-gradient(130deg,#0d1009 0%,#171b0f 40%,#1e2416 60%,#111608 85%,#090c06 100%)' },
  { id: 4, featured: false, label: 'Bastidores · 3:20', title: 'Sapatilhas — processo exclusivo',
    src: '/videos/C4.mp4',
    grad: 'linear-gradient(150deg,#120908 0%,#221110 40%,#2c1715 60%,#1c0d0c 85%,#0d0808 100%)' },
]

/* ── WhatsApp Config ────────────────────────────── */
export const WA_NUMBER = '244941183309'
export const WA_DEFAULT_MESSAGE = 'Olá Lourenço! Gostaria de encomendar uma peça.'

/* ── Social Links ───────────────────────────────── */
export const SOCIAL_LINKS = [
  { id: 'whatsapp', label: 'WhatsApp', handle: '+244 941 183 309',
    href: `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_DEFAULT_MESSAGE)}`,
    icon: 'whatsapp' },
  { id: 'instagram', label: 'Instagram', handle: '@lourenco.tomas.art',
    href: 'https://instagram.com/lourenco.tomas', icon: 'instagram' },
  { id: 'facebook', label: 'Facebook', handle: 'Lourenço Tomas Arte',
    href: 'https://facebook.com/lourenco.tomas.art', icon: 'facebook' },
  { id: 'email', label: 'Email', handle: 'arte@lourenco-tomas.ao',
    href: 'mailto:arte@lourenco-tomas.ao', icon: 'email' },
]
