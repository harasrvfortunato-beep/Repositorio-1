// Produtos exibidos na página /produtos.
// "categoria" precisa ser um dos nomes listados em "categoriasProdutos".
export const categoriasProdutos = ["Selaria", "Alimentos", "Lembranças"] as const;
export type CategoriaProduto = (typeof categoriasProdutos)[number];

export type Produto = {
  id: string;
  nome: string;
  descricao: string;
  preco: number; // em reais
  categoria: CategoriaProduto;
  imagem: string;
  imagemAlt: string;
};

export const produtos: Produto[] = [
  {
    id: "cabresto",
    nome: "Cabresto de couro",
    descricao: "Couro legítimo com fivelas reforçadas, feito à mão.",
    preco: 180,
    categoria: "Selaria",
    imagem: "/images/produto-cabresto.svg",
    imagemAlt: "Cabresto de couro marrom com argolas douradas",
  },
  {
    id: "sela",
    nome: "Sela de passeio",
    descricao: "Confortável para trilhas longas, com acabamento em couro.",
    preco: 1450,
    categoria: "Selaria",
    imagem: "/images/produto-sela.svg",
    imagemAlt: "Sela de couro marrom",
  },
  {
    id: "doce-de-leite",
    nome: "Doce de leite caseiro",
    descricao: "Pote de 400 g, feito no tacho com leite da fazenda.",
    preco: 28,
    categoria: "Alimentos",
    imagem: "/images/produto-doce-de-leite.svg",
    imagemAlt: "Pote de vidro de doce de leite com tampa marrom",
  },
  {
    id: "queijo",
    nome: "Queijo meia-cura",
    descricao: "Cerca de 500 g, curado por 20 dias.",
    preco: 45,
    categoria: "Alimentos",
    imagem: "/images/produto-queijo.svg",
    imagemAlt: "Fatia de queijo amarelo",
  },
  {
    id: "caneca",
    nome: "Caneca RV Fortunato",
    descricao: "Caneca esmaltada para o café da manhã no campo.",
    preco: 55,
    categoria: "Lembranças",
    imagem: "/images/produto-caneca.svg",
    imagemAlt: "Caneca verde com as letras RV em dourado",
  },
  {
    id: "bone",
    nome: "Boné do haras",
    descricao: "Boné bordado com a marca do haras, ajuste traseiro.",
    preco: 70,
    categoria: "Lembranças",
    imagem: "/images/produto-bone.svg",
    imagemAlt: "Boné verde-musgo com o bordado RV",
  },
];
