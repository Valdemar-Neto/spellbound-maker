import { site } from "@/lib/site";

// Santa Inês-MA fica em UTC-3 o ano todo (sem horário de verão).
const UTC_OFFSET_HORAS = -3;

export interface StatusAtendimento {
  aberto: boolean;
  texto: string;
  /** Quando a loja retorna um pedido deixado agora: "hoje/amanhã/na segunda a partir das 7h20". */
  retorno: string;
}

function horaLocal(agora: Date) {
  const local = new Date(agora.getTime() + UTC_OFFSET_HORAS * 3600e3);
  const dia = local.getUTCDay(); // 0 = domingo
  const minuto = local.getUTCHours() * 60 + local.getUTCMinutes();
  const { dias, abre, fecha } = site.openingHours;
  const diaUtil = dias.includes(dia);
  return { dia, minuto, abre, fecha, diaUtil, amanhaUtil: diaUtil && dias.includes((dia + 1) % 7) };
}

/**
 * Diz se a borracharia está aberta no instante dado, no horário local de Santa Inês.
 * `forcarFechado` simula a loja fechada (usado em desenvolvimento com `?fechado`).
 */
export function statusAtendimento(agora: Date = new Date(), forcarFechado = false): StatusAtendimento {
  const { minuto, abre, fecha, diaUtil, amanhaUtil } = horaLocal(agora);
  const antesDeAbrir = diaUtil && minuto < abre;
  const retorno = antesDeAbrir
    ? "hoje a partir das 7h20"
    : amanhaUtil
      ? "amanhã a partir das 7h20"
      : "na segunda a partir das 7h20";

  if (!forcarFechado && diaUtil && minuto >= abre && minuto < fecha) {
    return { aberto: true, texto: "Aberto agora, fecha às 18h30", retorno };
  }
  if (antesDeAbrir) return { aberto: false, texto: "Fechado agora, abre hoje às 7h20", retorno };
  if (amanhaUtil) return { aberto: false, texto: "Fechado agora, abre amanhã às 7h20", retorno };
  return { aberto: false, texto: "Fechado agora, abre segunda às 7h20", retorno };
}
