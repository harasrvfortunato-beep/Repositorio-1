# Haras RV Fortunato — site

Site do Haras RV Fortunato feito com React, Vite, TypeScript, Tailwind CSS e React Router.

## Rodar no computador

```bash
cd haras-rv-fortunato
npm install
npm run dev      # abre em http://localhost:5173
npm run build    # gera a versão final em dist/
```

## Onde editar o conteúdo

Todo o conteúdo fica em `src/data/`:

| Arquivo | O que tem |
| --- | --- |
| `src/data/passeios.ts` | Passeios: nome, descrição, foto, duração, valor, idade mínima, vagas e selo opcional |
| `src/data/produtos.ts` | Produtos, preços e a lista de categorias (`categoriasProdutos`) |
| `src/data/animais.ts` | Animais, a lista de tipos (`tiposAnimais`), raça, idade, curiosidade, descrição e fotos |
| `src/data/site.ts` | WhatsApp, link de agendamento, mapa, redes sociais, faixa de destaques, passos do "Como funciona" e texto do "Como chegar" |

Para adicionar um item, copie um bloco `{ ... }` da lista, cole logo abaixo e troque os valores. O `id` de cada item precisa ser único.

## Fotos

As imagens ficam em `public/images/`. As que estão lá agora são ilustrações provisórias, geradas por `scripts/gerar-placeholders.mjs`.

Para usar uma foto real:
1. Coloque o arquivo em `public/images/` (ex.: `trovao-1.jpg`).
2. No arquivo de dados, troque o caminho (ex.: `imagem: "/images/trovao-1.jpg"`) e atualize o texto alternativo (`imagemAlt` / `alt`).

As fotos do topo e dos 3 cards da Home ficam em `src/pages/Home.tsx`.

## Publicar

O site é uma SPA. `public/_redirects` (Netlify) e `vercel.json` (Vercel) já fazem as rotas `/passeios`, `/produtos` e `/animais` funcionarem ao recarregar a página.
