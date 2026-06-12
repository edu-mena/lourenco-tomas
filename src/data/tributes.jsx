/**
 * tributes.js — Dados mockados de homenagens
 *
 * ESTRUTURA DE BASE DE DADOS SUGERIDA
 * ─────────────────────────────────────────────────────────────────
 *
 * Tabelas principais:
 *   tributes          → registo principal de cada homenagem
 *   tribute_media     → imagens e vídeos associados (galeria + processo)
 *   tribute_stories   → slides do modo story (ordem + conteúdo multimedia)
 *   tribute_process   → passos do processo criativo
 *   tribute_specs     → especificações técnicas (técnica, suporte, dimensões…)
 *
 * Relações:
 *   tribute_media.tribute_id       → tributes.id
 *   tribute_stories.tribute_id     → tributes.id
 *   tribute_process.tribute_id     → tributes.id
 *   tribute_specs.tribute_id       → tributes.id  (1:1)
 *
 * ─────────────────────────────────────────────────────────────────
 */

import { mediaUrl } from './media'

// ─── Enums / constantes ──────────────────────────────────────────

export const MEDIA_TYPE = {
  IMAGE: 'image',
  VIDEO: 'video',       // vídeo hospedado localmente / CDN
  YOUTUBE: 'youtube',   // embed YouTube
  INSTAGRAM: 'instagram_reel',
}

export const MEDIA_ROLE = {
  COVER: 'cover',           // imagem principal / thumbnail de capa
  GALLERY: 'gallery',       // galeria da página de detalhe
  zSTORY: 'story',           // apenas usado em tribute_stories
  AVATAR: 'avatar',         // círculo de destaque no topo da página
}

export const STORY_SLIDE_TYPE = {
  IMAGE: 'image',
  VIDEO: 'video',
  QUOTE: 'quote',           // slide com texto grande / citação
  BEFORE_AFTER: 'before_after', // comparação antes/depois
}

export const CATEGORY = {
  MUSICA: 'Música',
  CINEMA: 'Cinema',
  DESPORTO: 'Desporto',
  MODA: 'Moda',
  ARTE: 'Arte',
}

// ─── Dados mockados ──────────────────────────────────────────────

export const TRIBUTES = [
  // ── C4 Pedro ──────────────────────────────────────────────────
  {
    id: 1,
    slug: 'c4-pedro',
    featured: true,

    celebrity: {
      name: 'C4 Pedro',
      role: 'Músico · Semba',
      bio: 'O rosto do semba moderno que deu nova vida à música tradicional angolana para uma geração inteira.',
      instagram: 'https://www.instagram.com/p/DQr-E5WCnvX/',
    },

    work: {
      title: 'Aerografia sobre T-Shirt 80×100 cm',
      category: CATEGORY.MUSICA,
      year: 2025,
      shortDesc: 'A T-Shirt que retrata não apenas um ícone da música nacional mas também a fuigura que renasce para representar de forma orgulhosa as suas raíses culturais.',
      fullDesc: [
        'Esta obra nasceu do desejo de celebrar a voz que deu nova vida à música tradicional angolana. A T-Shirt foi escolhida para permitir o nível de detalhe que o tema exigia.',
        'A paleta de cores foi construída em torno dos tons quentes da pele, com fundos que evocam a textura das ruas de Luanda — camadas de tinta sobrepostas que criam profundidade e movimento.',
      ],
    },

    specs: {
      técnica: 'Aerografia',
      suporte: 'T-Shirt algodão 100%',
      dimensões: 'Tamanho M',
      duração: '18 horas',
      ano: '2025',
      verniz: 'UV brilhante',
    },

    instagram: 'https://www.instagram.com/p/DQr-E5WCnvX/',
    cover:  mediaUrl('/tributes/c4-pedro/poster.jpeg'),
    avatar: mediaUrl('/tributes/c4-pedro/poster.jpeg'),

    gallery: [
      {
        id: 'c4-g1',
        type: MEDIA_TYPE.IMAGE,
        role: MEDIA_ROLE.GALLERY,
        src: mediaUrl('/tributes/c4-pedro/banner.png'),
        caption: 'Obra finalizada',
        width: 1200, height: 1500,
      },
      ,
      {
        id: 'c4-g2',
        type: MEDIA_TYPE.IMAGE,
        role: MEDIA_ROLE.GALLERY,
        src: mediaUrl('/tributes/c4-pedro/images/2.png'),
        caption: 'Pormenor da obra',
        width: 900, height: 900,
      },
      {
        id: 'c4-g3',
        type: MEDIA_TYPE.IMAGE,
        role: MEDIA_ROLE.GALLERY,
        src: mediaUrl('/tributes/c4-pedro/images/1.png'),
        caption: 'Pormenor da obra',
        width: 900, height: 900,
      },
      {
        id: 'c4-g4',
        type: MEDIA_TYPE.IMAGE,
        role: MEDIA_ROLE.GALLERY,
        src: mediaUrl('/tributes/c4-pedro/images/3.png'),
        caption: 'Pormenor da obra',
        width: 900, height: 900,
      },
      {
        id: 'c4-g5',
        type: MEDIA_TYPE.IMAGE,
        role: MEDIA_ROLE.GALLERY,
        src: mediaUrl('/tributes/c4-pedro/images/4.png'),
        caption: 'Pormenor da obra',
        width: 900, height: 900,
      },
    ],

    videos: [
      {
        id: 'c4-v1',
        type: MEDIA_TYPE.VIDEO,
        role: MEDIA_ROLE.GALLERY,
        src: mediaUrl('/tributes/c4-pedro/videos/1.mp4'),
        thumb: mediaUrl('/tributes/c4-pedro/banner.png'),
        title: 'Time-lapse do processo',
        duration: '3:10',
      },
      {
        id: 'c4-v2',
        type: MEDIA_TYPE.VIDEO,
        role: MEDIA_ROLE.GALLERY,
        src: mediaUrl('/tributes/c4-pedro/videos/2.mp4'),
        thumb: mediaUrl('/tributes/c4-pedro/banner.png'),
        title: 'Time-lapse do processo',
        duration: '3:10',
      },
      {
        id: 'c4-v3',
        type: MEDIA_TYPE.VIDEO,
        role: MEDIA_ROLE.GALLERY,
        src: mediaUrl('/tributes/c4-pedro/videos/3.mp4'),
        thumb: mediaUrl('/tributes/c4-pedro/banner.png'),
        title: 'Time-lapse do processo',
        duration: '3:10',
      },
    ],

    stories: [
      {
        id: 'c4-s1',
        order: 1,
        type: STORY_SLIDE_TYPE.IMAGE,
        src: mediaUrl('/images/tributes/c4-pedro/story-1.jpeg'),
        duration: 5000,
        overlay: { title: 'C4 Pedro', subtitle: 'Tela 80×100 cm', position: 'bottom' },
      },
      {
        id: 'c4-s2',
        order: 2,
        type: STORY_SLIDE_TYPE.VIDEO,
        src: mediaUrl('/videos/tributes/c4-pedro/processo-story.mp4'),
        duration: 12000,
        overlay: { title: '18 horas', subtitle: 'Do esboço à obra', position: 'top' },
      },
      {
        id: 'c4-s3',
        order: 3,
        type: STORY_SLIDE_TYPE.IMAGE,
        src: mediaUrl('/images/tributes/c4-pedro/story-final.jpeg'),
        duration: 5000,
        overlay: { title: 'Obra entregue ✅', subtitle: null, position: 'bottom' },
      },
    ],
  },

  // ── Igor benza ────────────────────────────────────────────
  {
    id: 3,
    slug: 'igor-benza',
    featured: true,

    celebrity: {
      name: 'Igor Benza',
      role: 'Apresentador · TVZimbo',
      bio: 'Voz inconfundível da televisão angolana, conhecido por misturar géneros e criar pontes entre culturas.',
      instagram: 'https://instagram.com/matiasdamasio',
    },

    work: {
      title: 'Tela Exclusiva com Retrato',
      category: CATEGORY.MUSICA,
      year: 2023,
      shortDesc: 'Um quadro representativo elevado a obra de arte.',
      fullDesc: [
        'A Tela foi pintada à mão com aerografia de alta precisão, reproduzindo o rosto do artista com detalhe e emoção. A técnica em vestuário exige adaptações específicas — tintas têxteis, fixação a calor e uma abordagem mais rápida para evitar saturação do tecido.',
        'A peça foi oferecida ao artista num evento privado e tornou-se uma das homenagens mais partilhadas no Instagram do estúdio.',
      ],
    },

    specs: {
      técnica: 'Aerografia têxtil',
      suporte: 'T-shirt algodão 100%',
      dimensões: 'Tamanho L — frente 40 × 50 cm',
      duração: '6 horas',
      ano: '2023',
      fixação: 'Calor (heat press)',
    },

    instagram: 'https://instagram.com/lourenco.tomas.art',
    cover:  mediaUrl('/tributes/igor-benza/images/1.jpeg'),
    avatar: mediaUrl('/tributes/igor-benza/banner.png'),

    gallery: [
      {
        id: 'md-g1',
        type: MEDIA_TYPE.IMAGE,
        role: MEDIA_ROLE.GALLERY,
        src: mediaUrl('/tributes/igor-benza/images/1.jpeg'),
        caption: 'T-Shirt finalizada',
        width: 1200, height: 1400,
      },
    ],

    videos: [
      {
        id: 'md-v1',
        type: MEDIA_TYPE.VIDEO,
        role: MEDIA_ROLE.GALLERY,
        src: mediaUrl('/tributes/igor-benza/videos/1.mp4'),
        thumb: mediaUrl('/tributes/igor-benza/video-thumb.png'),
        title: 'Reel do processo',
        duration: '0:45',
      },
    ],

    stories: [
      {
        id: 'md-s1',
        order: 1,
        type: STORY_SLIDE_TYPE.IMAGE,
        src: mediaUrl('/tributes/igor-benza/images/2.png'),
        duration: 5000,
        overlay: { title: 'Matias Damásio', subtitle: 'T-Shirt Custom', position: 'bottom' },
      },
      {
        id: 'md-s2',
        order: 2,
        type: STORY_SLIDE_TYPE.VIDEO,
        src: mediaUrl('/tributes/igor-benza/videos/1.mp4'),
        duration: 10000,
        overlay: { title: '6 horas de trabalho', subtitle: null, position: 'top' },
      }
    ],
  },

  // ── Nair Nany ───────────────────────────────────────────────
  {
    id: 4,
    slug: 'nair-nany',
    featured: true,

    celebrity: {
      name: 'Nair Nany',
      role: 'Actriz · Cinema',
      bio: 'Actriz e empresária angolana, símbolo de elegância e determinação no panorama cultural do país.',
      instagram: 'https://instagram.com/nairnany',
    },

    work: {
      title: 'Tela em Técnica Mista',
      category: CATEGORY.CINEMA,
      year: 2024,
      shortDesc: 'Retrato em técnica mista — aerografia combinada com acrílico e elementos texturizados.',
      fullDesc: [
        'A técnica mista permitiu explorar uma dimensão mais expressiva e menos fotográfica. A aerografia define os valores de luz e sombra; o acrílico traz cor e textura; elementos decorativos completam a composição com profundidade táctil.',
        'Esta obra foi a primeira a combinar todas as técnicas do estúdio numa única peça, marcando uma evolução no estilo de Lourenço Tomás.',
      ],
    },

    specs: {
      técnica: 'Aerografia + Acrílico + Técnica Mista',
      suporte: 'Tela de algodão 400 g',
      dimensões: '70 × 90 cm',
      duração: '20 horas',
      ano: '2024',
      verniz: 'UV mate',
    },

    instagram: 'https://instagram.com/lourenco.tomas.art',
    cover:  mediaUrl('/tributes/nair-nany/banner.jpeg'),
    avatar: mediaUrl('/tributes/nair-nany/images/2.jpeg'),

    gallery: [
      {
        id: 'ya-g1',
        type: MEDIA_TYPE.IMAGE,
        role: MEDIA_ROLE.GALLERY,
        src: mediaUrl('/tributes/nair-nany/galeria-1.png'),
        caption: 'Obra finalizada',
        width: 1200, height: 1500,
      },
      {
        id: 'ya-g2',
        type: MEDIA_TYPE.IMAGE,
        role: MEDIA_ROLE.PROCESS,
        src: mediaUrl('/tributes/nair-nany/processo-1.png'),
        caption: 'Camada base acrílico',
        width: 1200, height: 1600,
      },
      {
        id: 'ya-g3',
        type: MEDIA_TYPE.IMAGE,
        role: MEDIA_ROLE.GALLERY,
        src: mediaUrl('/tributes/nair-nany/detalhe.png'),
        caption: 'Detalhe textura mista',
        width: 900, height: 900,
      },
    ],

    videos: [
      {
        id: 'ya-v1',
        type: MEDIA_TYPE.YOUTUBE,
        role: MEDIA_ROLE.GALLERY,
        youtubeId: 'PLACEHOLDER_YT_ID_3',
        thumb: mediaUrl('/tributes/nair-nany/video-thumb.png'),
        title: 'Criação da obra — vídeo completo',
        duration: '4:22',
      },
    ],

    stories: [
      {
        id: 'ya-s1',
        order: 1,
        type: STORY_SLIDE_TYPE.IMAGE,
        src: mediaUrl('/tributes/nair-nany/story-1.png'),
        duration: 5000,
        overlay: { title: 'Nair Nany', subtitle: 'Técnica Mista', position: 'bottom' },
      },
      {
        id: 'ya-s2',
        order: 2,
        type: STORY_SLIDE_TYPE.BEFORE_AFTER,
        beforeSrc: mediaUrl('/tributes/nair-nany/antes.png'),
        afterSrc:  mediaUrl('/tributes/nair-nany/depois.png'),
        duration: 8000,
        overlay: { title: 'Transformação', subtitle: null, position: 'top' },
      },
      {
        id: 'ya-s3',
        order: 3,
        type: STORY_SLIDE_TYPE.IMAGE,
        src: mediaUrl('/tributes/nair-nany/story-entrega.png'),
        duration: 5000,
        overlay: { title: 'Entregue 🎨', subtitle: '@lourenco.tomas.art', position: 'bottom' },
      },
    ],
  },

  // ── Paulo Flores ──────────────────────────────────────────────
  {
    id: 5,
    slug: 'paulo-flores',
    featured: true,

    celebrity: {
      name: 'Paulo Flores',
      role: 'Músico · Semba',
      bio: 'Lenda viva do semba angolano, com uma carreira de décadas que moldou a identidade musical de Angola.',
      instagram: 'https://instagram.com/pauloflores',
    },

    work: {
      title: 'Sapatilhas Custom Edition',
      category: CATEGORY.MUSICA,
      year: 2023,
      shortDesc: 'Um par de sapatilhas transformado em escultura vestível.',
      fullDesc: [
        'O retrato do cantor foi pintado em aerografia sobre couro, com protecção em verniz UV de alto brilho especial para superfícies flexíveis. O desafio técnico de pintar sobre couro — uma superfície que dobra e estira — exigiu tintas e vernizes específicos.',
        'As sapatilhas tornaram-se uma peça coleccionável, combinar moda e arte numa homenagem única a um dos maiores nomes da música angolana.',
      ],
    },

    specs: {
      técnica: 'Aerografia sobre couro',
      suporte: 'Sapatilhas couro genuíno',
      dimensões: 'Tamanho 43',
      duração: '8 horas',
      ano: '2023',
      verniz: 'Flexível UV brilhante',
    },

    instagram: 'https://instagram.com/lourenco.tomas.art',
    cover:  mediaUrl('/images/tributes/paulo-flores/cover.jpeg'),
    avatar: mediaUrl('/images/tributes/paulo-flores/avatar.jpeg'),

    gallery: [
      {
        id: 'pf-g1',
        type: MEDIA_TYPE.IMAGE,
        role: MEDIA_ROLE.GALLERY,
        src: mediaUrl('/images/tributes/paulo-flores/galeria-1.jpeg'),
        caption: 'Par finalizado',
        width: 1200, height: 900,
      },
      {
        id: 'pf-g2',
        type: MEDIA_TYPE.IMAGE,
        role: MEDIA_ROLE.GALLERY,
        src: mediaUrl('/images/tributes/paulo-flores/galeria-2.jpeg'),
        caption: 'Lateral direita',
        width: 1200, height: 900,
      },
      {
        id: 'pf-g3',
        type: MEDIA_TYPE.IMAGE,
        role: MEDIA_ROLE.PROCESS,
        src: mediaUrl('/images/tributes/paulo-flores/processo.jpeg'),
        caption: 'Aerografia em progresso',
        width: 1200, height: 1600,
      },
      {
        id: 'pf-g4',
        type: MEDIA_TYPE.IMAGE,
        role: MEDIA_ROLE.GALLERY,
        src: mediaUrl('/images/tributes/paulo-flores/detalhe.jpeg'),
        caption: 'Pormenor — detalhe couro',
        width: 900, height: 900,
      },
    ],

    videos: [
      {
        id: 'pf-v1',
        type: MEDIA_TYPE.VIDEO,
        role: MEDIA_ROLE.GALLERY,
        src: mediaUrl('/videos/tributes/paulo-flores/processo.mp4'),
        thumb: mediaUrl('/images/tributes/paulo-flores/video-thumb.jpeg'),
        title: 'Processo de pintura — sapatilhas',
        duration: '1:58',
      },
    ],

    stories: [
      {
        id: 'pf-s1',
        order: 1,
        type: STORY_SLIDE_TYPE.IMAGE,
        src: mediaUrl('/images/tributes/paulo-flores/story-1.jpeg'),
        duration: 5000,
        overlay: { title: 'Paulo Flores', subtitle: 'Custom Sneakers', position: 'bottom' },
      },
      {
        id: 'pf-s2',
        order: 2,
        type: STORY_SLIDE_TYPE.VIDEO,
        src: mediaUrl('/videos/tributes/paulo-flores/story-processo.mp4'),
        duration: 12000,
        overlay: { title: 'Arte sobre couro', subtitle: '8 horas de trabalho', position: 'top' },
      },
      {
        id: 'pf-s3',
        order: 3,
        type: STORY_SLIDE_TYPE.IMAGE,
        src: mediaUrl('/images/tributes/paulo-flores/story-final.jpeg'),
        duration: 5000,
        overlay: { title: 'Peça única 👟', subtitle: '@lourenco.tomas.art', position: 'bottom' },
      },
    ],
  },
]

// ─── Helpers ─────────────────────────────────────────────────────

/** Devolve apenas as imagens de galeria de uma homenagem */
export function getGalleryImages(tribute) {
  return tribute.gallery.filter(m => m.type === MEDIA_TYPE.IMAGE)
}

/** Devolve todos os vídeos de uma homenagem */
export function getTributeVideos(tribute) {
  return tribute.videos ?? []
}

/** Devolve a media de processo (imagens) */
export function getProcessMedia(tribute) {
  return tribute.gallery.filter(m => m.role === MEDIA_ROLE.PROCESS)
}

/** Encontra a media pelo id (gallery + videos) */
export function findMediaById(tribute, mediaId) {
  if (!mediaId) return null
  return (
    tribute.gallery.find(m => m.id === mediaId) ??
    tribute.videos.find(v => v.id === mediaId) ??
    null
  )
}

/** Encontra homenagem por slug */
export function findTributeBySlug(slug) {
  return TRIBUTES.find(t => t.slug === slug) ?? null
}

export default TRIBUTES