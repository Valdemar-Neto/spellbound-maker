import { useCallback, useMemo, useRef, useState, type ReactNode } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Phone, X } from "lucide-react";
import { WhatsAppIcon } from "@/components/brand";
import { contatos, telefoneHref, whatsappMessages, whatsappUrl } from "@/lib/site";
import { ContatoContext, type AcaoContato } from "./contato-context";

const textos: Record<AcaoContato, { titulo: string; descricao: string }> = {
  whatsapp: {
    titulo: "Mandar mensagem para quem?",
    descricao: "Os dois atendem a Fênix. A mensagem já vai escrita, é só tocar em enviar.",
  },
  ligar: { titulo: "Ligar para quem?", descricao: "Os dois atendem a Fênix." },
};

/**
 * Painel "Falar com quem?": todo botão de WhatsApp ou de ligar do site abre este
 * painel para a pessoa escolher entre Flávio e Ana. Bottom sheet no
 * celular, janela centralizada no desktop (Radix Dialog: foco preso, Esc fecha).
 */
const ContatoProvider = ({ children }: { children: ReactNode }) => {
  const [aberto, setAberto] = useState(false);
  const primeiroContato = useRef<HTMLAnchorElement>(null);
  const [acao, setAcao] = useState<AcaoContato>("whatsapp");
  const [mensagem, setMensagem] = useState<string>(whatsappMessages.geral);

  const abrir = useCallback((novaAcao: AcaoContato, novaMensagem?: string) => {
    setAcao(novaAcao);
    setMensagem(novaMensagem ?? whatsappMessages.geral);
    setAberto(true);
  }, []);

  const value = useMemo(() => ({ abrir }), [abrir]);
  const { titulo, descricao } = textos[acao];
  const Icone = acao === "whatsapp" ? WhatsAppIcon : Phone;

  return (
    <ContatoContext.Provider value={value}>
      {children}
      <DialogPrimitive.Root open={aberto} onOpenChange={setAberto}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-background/80 duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:duration-150 motion-reduce:animate-none" />
          <DialogPrimitive.Content
            // Foco inicial no primeiro contato (a ação esperada), não no botão de fechar.
            onOpenAutoFocus={(e) => {
              e.preventDefault();
              primeiroContato.current?.focus();
            }}
            className="fixed inset-x-0 bottom-0 z-50 flex flex-col gap-5 rounded-t-3xl border border-border bg-background p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] duration-200 ease-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-bottom-full data-[state=open]:slide-in-from-bottom-full data-[state=closed]:duration-150 motion-reduce:animate-none sm:inset-0 sm:m-auto sm:h-fit sm:max-w-md sm:rounded-3xl sm:pb-6 sm:data-[state=closed]:slide-out-to-bottom-0 sm:data-[state=open]:slide-in-from-bottom-0 sm:data-[state=closed]:zoom-out-95 sm:data-[state=open]:zoom-in-95"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col gap-1">
                <DialogPrimitive.Title className="m-0 font-display text-[32px] font-extrabold leading-none">
                  {titulo}
                </DialogPrimitive.Title>
                <DialogPrimitive.Description className="m-0 text-[15px] text-ink-soft">
                  {descricao}
                </DialogPrimitive.Description>
              </div>
              <DialogPrimitive.Close
                aria-label="Fechar"
                className="press -mr-2 -mt-2 flex h-11 w-11 flex-none cursor-pointer items-center justify-center rounded-full text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </DialogPrimitive.Close>
            </div>

            <ul className="m-0 flex list-none flex-col gap-3 p-0">
              {contatos.map((c, i) => (
                <li key={c.id}>
                  <a
                    ref={i === 0 ? primeiroContato : undefined}
                    href={acao === "whatsapp" ? whatsappUrl(mensagem, c) : telefoneHref(c)}
                    {...(acao === "whatsapp" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    onClick={() => setAberto(false)}
                    className="press lift flex min-h-[76px] items-center gap-4 rounded-2xl border-2 border-line-strong px-5 text-foreground"
                  >
                    <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-fire-orange text-background">
                      <Icone className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="flex flex-col">
                      <strong className="text-lg">{c.nome}</strong>
                      <span className="text-[15px] text-muted-foreground">{c.telefone}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </ContatoContext.Provider>
  );
};

export default ContatoProvider;
