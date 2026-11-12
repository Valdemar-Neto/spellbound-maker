import { createContext, useContext } from "react";

export type AcaoContato = "whatsapp" | "ligar";

export interface ContatoContextValue {
  /** Abre o painel "Falar com quem?". `mensagem` é o texto pronto do WhatsApp. */
  abrir: (acao: AcaoContato, mensagem?: string) => void;
}

export const ContatoContext = createContext<ContatoContextValue | null>(null);

export function useContato() {
  const ctx = useContext(ContatoContext);
  if (!ctx) throw new Error("useContato precisa estar dentro de <ContatoProvider>");
  return ctx;
}
