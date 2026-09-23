// Passeios exibidos na página /passeios.
// Para adicionar um passeio, copie um bloco { ... } e altere os campos.
// As imagens ficam em public/images (use o caminho começando com /images/).
export type Passeio = {
  id: string;
  nome: string;
  descricao: string;
  imagem: string;
  imagemAlt: string;
  duracao: string;
  valor: number; // em reais, por pessoa
  idadeMinima: number;
  vagas: number; // por horário
  destaque?: string; // selo opcional no card, ex.: "Mais procurado"
};

export const passeios: Passeio[] = [
  {
    id: "guiado",
    nome: "Passeio a cavalo guiado",
    descricao:
      "Uma trilha tranquila entre as árvores, com guia do haras do começo ao fim. Ideal para quem quer sentir o campo sem pressa.",
    imagem: "/images/passeio-guiado.svg",
    imagemAlt: "Dois cavaleiros em uma trilha de terra entre árvores",
    duracao: "1h30",
    valor: 100,
    idadeMinima: 12,
    vagas: 6,
    destaque: "Mais procurado",
  },
  {
    id: "por-do-sol",
    nome: "Passeio ao pôr do sol",
    descricao:
      "(Exemplo editável) Saída no fim da tarde para ver o céu mudar de cor do alto da trilha.",
    imagem: "/images/passeio-por-do-sol.svg",
    imagemAlt: "Cavaleiro na trilha com o sol se pondo ao fundo",
    duracao: "1h30",
    valor: 130,
    idadeMinima: 12,
    vagas: 6,
  },
  {
    id: "infantil",
    nome: "Passeio infantil",
    descricao:
      "(Exemplo editável) Volta curta e conduzida no pônei, com um adulto do haras sempre ao lado.",
    imagem: "/images/passeio-infantil.svg",
    imagemAlt: "Criança montada em um pônei conduzido",
    duracao: "30 min",
    valor: 60,
    idadeMinima: 4,
    vagas: 4,
  },
];
