// Animais exibidos na página /animais.
// "fotos": a primeira aparece no card; todas aparecem no modal de detalhes.
export const tiposAnimais = ["Cavalos", "Pôneis", "Outros"] as const;
export type TipoAnimal = (typeof tiposAnimais)[number];

export type Animal = {
  id: string;
  nome: string;
  tipo: TipoAnimal;
  raca: string;
  idade: string;
  curiosidade: string; // frase curta que aparece no card
  descricao: string; // texto mais longo que aparece no modal
  fotos: { src: string; alt: string }[];
};

const fotos = (id: string, nome: string) =>
  [1, 2, 3].map((n) => ({
    src: `/images/animal-${id}-${n}.svg`,
    alt: `${nome} no pasto do haras, foto ${n}`,
  }));

export const animais: Animal[] = [
  {
    id: "trovao",
    nome: "Trovão",
    tipo: "Cavalos",
    raca: "Mangalarga Marchador",
    idade: "9 anos",
    curiosidade: "Calmo na trilha, mas adora uma corrida no fim da tarde.",
    descricao:
      "O Trovão é o guia da tropa. Conhece cada curva da trilha e passa segurança para quem monta pela primeira vez.",
    fotos: fotos("trovao", "Trovão"),
  },
  {
    id: "estrela",
    nome: "Estrela",
    tipo: "Cavalos",
    raca: "Crioula",
    idade: "7 anos",
    curiosidade: "Tem uma mancha branca na testa que deu origem ao nome.",
    descricao:
      "A Estrela é dócil e curiosa. Sempre é a primeira a vir até a cerca quando chega visita.",
    fotos: fotos("estrela", "Estrela"),
  },
  {
    id: "cigano",
    nome: "Cigano",
    tipo: "Cavalos",
    raca: "Quarto de Milha",
    idade: "11 anos",
    curiosidade: "Não recusa uma cenoura, nunca.",
    descricao:
      "O Cigano é forte e tranquilo. É o parceiro preferido dos cavaleiros mais experientes nos passeios longos.",
    fotos: fotos("cigano", "Cigano"),
  },
  {
    id: "pipoca",
    nome: "Pipoca",
    tipo: "Pôneis",
    raca: "Pônei Brasileiro",
    idade: "6 anos",
    curiosidade: "É o xodó das crianças e adora carinho na crina.",
    descricao:
      "A Pipoca é paciente e carinhosa, perfeita para a primeira montaria das crianças.",
    fotos: fotos("pipoca", "Pipoca"),
  },
  {
    id: "mel",
    nome: "Mel",
    tipo: "Pôneis",
    raca: "Pônei Shetland",
    idade: "4 anos",
    curiosidade: "Pequeno no tamanho, gigante na personalidade.",
    descricao:
      "O Mel é brincalhão e sempre encontra um jeito de roubar a cena nas fotos.",
    fotos: fotos("mel", "Mel"),
  },
  {
    id: "lua",
    nome: "Lua e Pintada",
    tipo: "Outros",
    raca: "Ovelha e galinha caipira",
    idade: "3 e 2 anos",
    curiosidade: "Inseparáveis: onde uma vai, a outra vai atrás.",
    descricao:
      "A ovelha Lua e a galinha Pintada vivem soltas perto da sede e recebem os visitantes antes de todo mundo.",
    fotos: fotos("lua", "Lua e Pintada"),
  },
];
