// Pedido deixado com a loja fechada ("Fechado agora? Deixe seu pedido.").
// Diferente da mensagem montada, este precisa de servidor: é enviado para um
// Worker da Cloudflare (URL em VITE_PEDIDO_URL), que ainda não existe.

export const apenasDigitos = (v: string) => v.replace(/\D/g, "");

/** Máscara de telefone com DDD: (98) 98179-6941 / (98) 3653-1234. */
export function mascaraTelefone(valor: string): string {
  const d = apenasDigitos(valor).slice(0, 11);
  if (d.length <= 2) return d ? `(${d}` : "";
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, d.length - 4)}-${d.slice(-4)}`;
}

export interface DadosPedido {
  nome: string;
  telefone: string;
  detalhes: string;
}

export function errosPedido(p: Pick<DadosPedido, "nome" | "telefone">) {
  const d = apenasDigitos(p.telefone);
  return {
    nome: p.nome.trim().length < 2 ? "Escreva seu nome." : "",
    telefone: d.length < 10 || d.length > 11 ? "Confira o número com DDD." : "",
  };
}

/** Mesmo pedido em texto, para mandar pelo WhatsApp se o envio falhar. */
export function pedidoComoMensagem(p: DadosPedido): string {
  const linhas = ["Olá, Fênix! Vim pelo site e a loja estava fechada.", `Meu nome é ${p.nome.trim()}.`];
  if (p.detalhes.trim()) linhas.push(p.detalhes.trim());
  return linhas.join("\n");
}

export const PEDIDO_URL: string | undefined = import.meta.env.VITE_PEDIDO_URL || undefined;

/**
 * Envia o pedido ao Worker. Lança erro se a URL não estiver configurada,
 * se a resposta não for 2xx ou se demorar mais de 10 s.
 */
export async function enviarPedido(p: DadosPedido, url = PEDIDO_URL): Promise<void> {
  if (!url) throw new Error("VITE_PEDIDO_URL não configurada");
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 10_000);
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome: p.nome.trim(),
        telefone: apenasDigitos(p.telefone),
        detalhes: p.detalhes.trim(),
        origem: "site",
      }),
      signal: controller.signal,
    });
    if (!res.ok) throw new Error(`Pedido recusado (${res.status})`);
  } finally {
    window.clearTimeout(timeout);
  }
}
