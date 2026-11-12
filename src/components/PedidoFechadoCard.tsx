import { useRef, useState, type FormEvent } from "react";
import { CircleCheck } from "lucide-react";
import { fieldClass, textareaClass } from "@/components/form/classes";
import { Field } from "@/components/form/fields";
import { enviarPedido, errosPedido, mascaraTelefone, pedidoComoMensagem } from "@/lib/pedido";
import ContatoButton from "@/components/contato/ContatoButton";

type Estado = "editando" | "enviando" | "enviado" | "falhou";

/**
 * "Fechado agora? Deixe seu pedido." Aparece no hero só com a loja fechada.
 * O envio vai para o Worker (VITE_PEDIDO_URL); se não houver Worker ou o envio
 * falhar, oferece o mesmo pedido pelo WhatsApp em vez de fingir que deu certo.
 */
const PedidoFechadoCard = ({ retorno }: { retorno: string }) => {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [detalhes, setDetalhes] = useState("");
  const [isca, setIsca] = useState(""); // honeypot contra robôs
  const [tentou, setTentou] = useState(false);
  const [estado, setEstado] = useState<Estado>("editando");
  const nomeRef = useRef<HTMLInputElement>(null);
  const telRef = useRef<HTMLInputElement>(null);

  const erros = tentou ? errosPedido({ nome, telefone }) : { nome: "", telefone: "" };
  const primeiroNome = nome.trim().split(" ")[0];
  const pedido = { nome, telefone, detalhes };

  const enviar = async (e: FormEvent) => {
    e.preventDefault();
    if (estado === "enviando" || estado === "enviado") return;
    if (isca) {
      setEstado("enviado");
      return;
    }
    const agora = errosPedido({ nome, telefone });
    setTentou(true);
    if (agora.nome || agora.telefone) {
      (agora.nome ? nomeRef : telRef).current?.focus();
      return;
    }
    setEstado("enviando");
    try {
      await enviarPedido(pedido);
      setEstado("enviado");
    } catch {
      setEstado("falhou");
    }
  };

  const anuncio =
    estado === "enviado"
      ? "Pedido recebido."
      : estado === "falhou"
        ? "Não deu para enviar o pedido."
        : erros.nome || erros.telefone
          ? "Confira os campos marcados."
          : "";

  return (
    <div className="relative flex flex-col gap-4 rounded-[20px] border border-border bg-surface p-6">
      {estado === "enviado" ? (
        <div className="flex items-start gap-3.5">
          <CircleCheck className="mt-0.5 h-7 w-7 flex-none text-status-open" strokeWidth={2.5} aria-hidden="true" />
          <div className="flex flex-col gap-1">
            <strong className="text-[19px]">Pedido recebido, {primeiroNome}.</strong>
            <span className="text-ink-soft">
              A Fênix chama você no {mascaraTelefone(telefone)} {retorno}. Se for urgente, mande mensagem agora mesmo.
            </span>
          </div>
        </div>
      ) : (
        <form aria-labelledby="t-pedido" noValidate onSubmit={enviar} className="relative flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h2 id="t-pedido" className="m-0 font-display text-[32px] font-extrabold leading-none">
              Fechado agora? Deixe seu pedido.
            </h2>
            <p className="m-0 text-[15px] text-ink-soft">A Fênix chama você no WhatsApp {retorno}.</p>
          </div>

          <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
            <label>
              Site
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={isca}
                onChange={(e) => setIsca(e.target.value)}
              />
            </label>
          </div>

          <div className="grid grid-cols-2 gap-3 max-[560px]:grid-cols-1">
            <Field label="Seu nome" error={erros.nome} errorId="erro-nome">
              <input
                ref={nomeRef}
                type="text"
                name="nome"
                autoComplete="given-name"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                aria-invalid={!!erros.nome}
                aria-describedby={erros.nome ? "erro-nome" : undefined}
                className={fieldClass(!!erros.nome)}
              />
            </Field>
            <Field label="WhatsApp com DDD" error={erros.telefone} errorId="erro-fone">
              <input
                ref={telRef}
                type="tel"
                name="telefone"
                autoComplete="tel"
                inputMode="tel"
                placeholder="(98) 90000-0000"
                value={telefone}
                onChange={(e) => setTelefone(mascaraTelefone(e.target.value))}
                aria-invalid={!!erros.telefone}
                aria-describedby={erros.telefone ? "erro-fone" : undefined}
                className={fieldClass(!!erros.telefone)}
              />
            </Field>
          </div>

          <Field label="O que aconteceu?" hint="Opcional: medida, carro, onde você está">
            <textarea
              name="detalhes"
              rows={2}
              value={detalhes}
              onChange={(e) => setDetalhes(e.target.value)}
              className={textareaClass()}
            />
          </Field>

          {estado === "falhou" && (
            <p className="m-0 flex flex-wrap items-center gap-x-3 gap-y-1 text-[15px] font-medium text-error">
              Não deu para enviar o pedido agora.
              <ContatoButton
                acao="whatsapp"
                mensagem={pedidoComoMensagem(pedido)}
                className="link inline-flex min-h-11 items-center font-semibold underline underline-offset-4"
              >
                Mandar pelo WhatsApp
              </ContatoButton>
            </p>
          )}

          <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
            <button
              type="submit"
              aria-disabled={estado === "enviando"}
              className="press min-h-14 cursor-pointer rounded-full bg-fire-orange px-[26px] text-[17px] font-bold text-background aria-disabled:opacity-70"
            >
              {estado === "enviando" ? "Enviando…" : "Deixar meu pedido"}
            </button>
            <span className="max-w-[26em] text-[13px] text-muted-foreground">
              Seu número é usado só para responder este pedido. Nada de lista, nada de propaganda.
            </span>
          </div>
        </form>
      )}
      <p aria-live="polite" className="sr-only">
        {anuncio}
      </p>
    </div>
  );
};

export default PedidoFechadoCard;
