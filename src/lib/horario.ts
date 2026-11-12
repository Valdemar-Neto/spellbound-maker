import { site } from "@/lib/site";

// Santa Inês-MA fica em UTC-3 o ano todo (sem horário de verão).
const UTC_OFFSET_HORAS = -3;

export interface StatusAtendimento {
  aberto: boolean;
  texto: string;
}

/** Diz se a borracharia está aberta no instante dado, no horário local de Santa Inês. */
export function statusAtendimento(agora: Date = new Date()): StatusAtendimento {
  const local = new Date(agora.getTime() + UTC_OFFSET_HORAS * 3600e3);
  const dia = local.getUTCDay(); // 0 = domingo
  const minuto = local.getUTCHours() * 60 + local.getUTCMinutes();
  const { dias, abre, fecha } = site.openingHours;
  const diaUtil = dias.includes(dia);

  if (diaUtil && minuto >= abre && minuto < fecha) {
    return { aberto: true, texto: "Aberto agora, fecha às 18h30" };
  }
  if (diaUtil && minuto < abre) return { aberto: false, texto: "Fechado agora, abre hoje às 7h20" };
  if (diaUtil && dias.includes((dia + 1) % 7)) return { aberto: false, texto: "Fechado agora, abre amanhã às 7h20" };
  return { aberto: false, texto: "Fechado agora, abre segunda às 7h20" };
}
