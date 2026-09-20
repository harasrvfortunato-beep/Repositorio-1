# Gustavo Laia — Web Design e Marketing Digital

Site de uma única página (one-page), em HTML, CSS e JavaScript puro, sem
dependências de build. Estética escura e minimalista: preto profundo, cinza e
branco, com bastante espaço negativo.

## Arquivos

| Arquivo | O que é |
| --- | --- |
| `index.html` | Todo o conteúdo e a estrutura da página |
| `style.css` | Estilos, design system (cores e medidas em variáveis CSS) e responsividade |
| `script.js` | Menu mobile, header ao rolar, animações de entrada e botão flutuante |
| `og-image.png` | Imagem de preview exibida quando o link é compartilhado |

## Como publicar

A forma mais simples é o **GitHub Pages**: em *Settings → Pages*, escolha a
branch do repositório e a pasta raiz (`/root`). Em poucos minutos o site fica no
ar. Qualquer hospedagem estática também funciona (Netlify, Vercel, Cloudflare
Pages) — basta enviar os quatro arquivos.

Para testar localmente, abra o `index.html` no navegador ou rode
`npx serve` na pasta do projeto.

## O que costuma mudar

**WhatsApp.** O número aparece em dois formatos: o link
(`https://wa.me/551195934801`) e o texto exibido (`(11) 95934-801`). Ao trocar,
atualize os dois — o link aparece em todos os botões e no rodapé. A mensagem
automática está codificada na própria URL, depois de `?text=`.

**Instagram.** Está no rodapé, apontando para
`https://instagram.com/gustavollaia.ads`.

**Cores e espaçamentos.** Ficam centralizados no bloco `:root` do `style.css`.
Mudar `--white`, `--muted` ou `--radius` ali reflete no site inteiro.

**Serviços.** Cada card é um bloco `<article class="card">` dentro da seção
`#servicos`. Para adicionar ou remover um serviço, copie ou apague o bloco
inteiro — a grade se reorganiza sozinha.

**Preview do link.** Ao publicar em um domínio, troque a meta tag `og:image` no
`index.html` pela URL absoluta da imagem (por exemplo
`https://seudominio.com.br/og-image.png`). O WhatsApp só mostra a prévia com
endereço completo.

## Acessibilidade e compatibilidade

O conteúdo continua visível mesmo se o JavaScript não carregar, as animações são
desligadas para quem usa `prefers-reduced-motion`, e os textos pequenos seguem o
contraste mínimo recomendado (4.5:1) sobre o fundo preto. O layout foi conferido
em 390px, 768px, 1024px e 1440px, sem rolagem horizontal.
