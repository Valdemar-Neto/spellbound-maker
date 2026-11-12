// Mensagens montadas no site e abertas prontas no WhatsApp da loja.
// Nada passa por servidor: o texto vai do aparelho da pessoa direto para o wa.me.

/** Chips do hero: o escolhido entra no texto do botão "Chamar no WhatsApp". */
export const TEMAS_HERO = [
  { id: "furo", rotulo: "Pneu furado", msg: "Meu pneu furou, vocês consertam?" },
  { id: "novo", rotulo: "Pneu novo", msg: "Quero comprar pneu novo." },
  { id: "semi", rotulo: "Seminovo", msg: "Quero ver pneus seminovos." },
  { id: "caminhao", rotulo: "Caminhão", msg: "Preciso de atendimento para caminhão." },
  { id: "outro", rotulo: "Outro serviço", msg: "Preciso de outro serviço." },
] as const;

export type TemaHeroId = (typeof TEMAS_HERO)[number]["id"];

export const mensagemHero = (tema: TemaHeroId | null) => {
  const escolhido = TEMAS_HERO.find((t) => t.id === tema);
  return `Olá! Vim pelo site da Fênix.${escolhido ? ` ${escolhido.msg}` : ""}`;
};

/** Opções de "Do que você precisa?" no formulário "Fale com a Fênix". */
export const ASSUNTOS = [
  "Conserto de furo",
  "Pneu novo",
  "Pneu seminovo",
  "Vulcanização",
  "Calibragem",
  "Socorro na estrada",
  "Outro serviço",
];

export const VEICULOS = ["Carro", "Moto", "Caminhão", "Utilitário"];

export interface DadosMensagem {
  nome: string;
  assunto: string;
  veiculo: string;
  medida: string;
  bairro: string;
  detalhes: string;
}

/** Texto que abre no WhatsApp, uma informação por linha, só com o que foi preenchido. */
export function montarMensagem(d: DadosMensagem): string {
  const linhas = ["Olá, Fênix! Vim pelo site."];
  if (d.nome.trim()) linhas.push(`Meu nome é ${d.nome.trim()}.`);
  if (d.assunto) linhas.push(`Preciso de: ${d.assunto.toLowerCase()}`);
  if (d.veiculo) linhas.push(`Veículo: ${d.veiculo.toLowerCase()}`);
  if (d.medida.trim()) linhas.push(`Medida do pneu: ${d.medida.trim()}`);
  if (d.bairro.trim()) linhas.push(`Estou em: ${d.bairro.trim()}`);
  if (d.detalhes.trim()) linhas.push(d.detalhes.trim());
  return linhas.join("\n");
}

/** Campos obrigatórios: nome (2+ letras) e assunto. */
export function errosMensagem(d: Pick<DadosMensagem, "nome" | "assunto">) {
  return {
    nome: d.nome.trim().length < 2 ? "Escreva seu nome." : "",
    assunto: d.assunto ? "" : "Escolha uma opção.",
  };
}
