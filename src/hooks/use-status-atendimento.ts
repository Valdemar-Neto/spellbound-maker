import { useEffect, useState } from "react";
import { statusAtendimento } from "@/lib/horario";

/** Status "Aberto/Fechado agora", reavaliado a cada minuto. */
export function useStatusAtendimento() {
  const [status, setStatus] = useState(() => statusAtendimento());

  useEffect(() => {
    const id = window.setInterval(() => setStatus(statusAtendimento()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  return status;
}
