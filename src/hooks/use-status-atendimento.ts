import { useEffect, useState } from "react";
import { statusAtendimento } from "@/lib/horario";

// Em desenvolvimento, `?fechado` na URL simula a loja fechada para testar o pedido.
const forcarFechado = () => import.meta.env.DEV && new URLSearchParams(window.location.search).has("fechado");

/** Status "Aberto/Fechado agora", reavaliado a cada minuto. */
export function useStatusAtendimento() {
  const [status, setStatus] = useState(() => statusAtendimento(new Date(), forcarFechado()));

  useEffect(() => {
    const id = window.setInterval(() => setStatus(statusAtendimento(new Date(), forcarFechado())), 60_000);
    return () => window.clearInterval(id);
  }, []);

  return status;
}
