# Lourenço Tomas — Website

Website premium do artista plástico Lourenço Tomas, construído com **React + Vite**.

## Stack
- React 18
- Vite 5
- CSS puro com custom properties (sem Tailwind)
- Canvas API para animações
- Sem dependências externas além de React

## Início Rápido

```bash
# 1. Instalar dependências
npm install

# 2. Desenvolvimento (hot reload)
npm run dev

# 3. Build para produção (gera /dist estático)
npm run build

# 4. Preview do build
npm run preview
```

O comando `npm run build` gera a pasta `dist/` com ficheiros estáticos prontos para
deploy em qualquer hosting (Netlify, Vercel, GitHub Pages, etc.).

## Estrutura

```
src/
├── components/
│   ├── Cursor.jsx       — Cursor personalizado + partículas
│   ├── Nav.jsx          — Navegação responsiva
│   ├── Hero.jsx         — Hero fullscreen com canvas animado
│   ├── Marquee.jsx      — Fita de texto animada
│   ├── About.jsx        — Secção sobre o artista
│   ├── Gallery.jsx      — Galeria com filtros e lightbox
│   ├── Process.jsx      — Processo criativo / vídeos
│   ├── Testimonials.jsx — Depoimentos de clientes
│   ├── Contact.jsx      — Formulário + redes sociais
│   └── FooterWA.jsx     — Rodapé + botão WhatsApp
├── hooks/
│   └── index.js         — useScrollReveal, useSprayCanvas
├── data/
│   ├── content.js       — Todos os dados/conteúdos
│   └── photo.js         — Foto do artista (base64, já incluída)
├── App.jsx              — Componente raiz
├── main.jsx             — Entry point
└── index.css            — Design system completo
```

## Personalização

- **Cores**: editar variáveis CSS em `src/index.css` (`:root { ... }`)
- **Conteúdo**: editar `src/data/content.js`
- **Foto**: substituir `src/data/photo.js` com nova imagem em base64
- **Contactos**: actualizar links e telefone em `src/data/content.js` → `SOCIAL_LINKS`

## Deploy

```bash
npm run build
# Upload da pasta dist/ para o seu hosting
```

Para **Netlify**: arraste a pasta `dist/` para app.netlify.com/drop

Para **Vercel**: `npx vercel --prod` (a partir da raiz do projecto)
