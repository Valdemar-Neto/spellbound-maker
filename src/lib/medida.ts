// Medida de pneu (ex.: 175/70 R14) escolhida no seletor da seção "Procurando pneu?".
export interface Medida {
  largura: string;
  perfil: string;
  aro: string;
}

export const MEDIDA_VAZIA: Medida = { largura: "", perfil: "", aro: "" };

export const LARGURAS = ["145", "155", "165", "175", "185", "195", "205", "215", "225"];
export const PERFIS = ["45", "50", "55", "60", "65", "70", "75", "80"];
export const AROS = ["13", "14", "15", "16", "17", "18"];

/** Texto da lateral do pneu 3D enquanto nenhuma medida completa foi escolhida. */
export const TEXTO_PADRAO_PNEU = "SANTA INÊS-MA";

/** "175/70 R14" quando os três números foram escolhidos; senão `null`. */
export const formatMedida = (m: Medida) => (m.largura && m.perfil && m.aro ? `${m.largura}/${m.perfil} R${m.aro}` : null);

const CAMPOS = [
  { key: "largura", nome: "a largura" },
  { key: "perfil", nome: "o perfil" },
  { key: "aro", nome: "o aro" },
] as const;

/** Orientação para quem ainda não escolheu os três números. */
export function textoFaltando(m: Medida): string {
  const faltam = CAMPOS.filter((c) => !m[c.key]).map((c) => c.nome);
  if (faltam.length === 3) return "Escolha os três números para perguntar";
  if (faltam.length === 1) return `Falta escolher ${faltam[0]}`;
  return `Falta escolher ${faltam.slice(0, -1).join(", ")} e ${faltam[faltam.length - 1]}`;
}
