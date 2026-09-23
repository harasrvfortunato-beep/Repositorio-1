// Informações gerais do haras: contato, links e textos da Home.
export const site = {
  nome: "Haras RV Fortunato",
  slogan: "Viva o campo de perto",
  descricao:
    "Passeios a cavalo guiados entre as árvores, produtos do haras e nossos animais. Um pedaço do campo esperando por você.",
  whatsapp: "5511982203336",
  whatsappExibicao: "(11) 98220-3336",
  linkAgendar: "https://gallop-guardian.lovable.app/agendar",
  linkMapa: "https://maps.app.goo.gl/8eyHg7m5frJeZF2j6",
  // Deixe o campo vazio ("") para esconder a rede social no rodapé.
  redes: {
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
  },
  comoChegar:
    "Estamos no meio do verde, com acesso por estrada de terra bem sinalizada. Abra o mapa para traçar a rota do seu endereço até a porteira do haras.",
};

export const destaques = [
  { valor: "R$ 100", rotulo: "por pessoa" },
  { valor: "1h30", rotulo: "de passeio" },
  { valor: "12+", rotulo: "anos de idade" },
  { valor: "6", rotulo: "cavalos por horário" },
];

export const passos = [
  {
    titulo: "Escolha data e horário",
    texto: "Veja os horários livres na agenda e reserve o seu lugar na trilha.",
  },
  {
    titulo: "Pague 50% de sinal no Pix",
    texto: "O sinal garante a sua vaga. É rápido e você recebe o comprovante na hora.",
  },
  {
    titulo: "Confirmação e passeio",
    texto: "Você recebe a confirmação e é só vir. O restante é pago no dia do passeio.",
  },
];

export function linkWhatsApp(mensagem?: string) {
  const base = `https://wa.me/${site.whatsapp}`;
  return mensagem ? `${base}?text=${encodeURIComponent(mensagem)}` : base;
}
