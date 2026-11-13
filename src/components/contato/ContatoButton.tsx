import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { useContato, type AcaoContato } from "./contato-context";

interface ContatoButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick" | "type"> {
  acao: AcaoContato;
  /** Texto pronto do WhatsApp (padrão: "Olá! Vim pelo site da Fênix."). */
  mensagem?: string;
}

/** Botão de WhatsApp/ligar: abre o painel para escolher entre Flávio e Ana. */
const ContatoButton = ({ acao, mensagem, className, children, ...props }: ContatoButtonProps) => {
  const { abrir } = useContato();
  return (
    <button
      type="button"
      aria-haspopup="dialog"
      onClick={() => abrir(acao, mensagem)}
      className={cn("cursor-pointer", className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default ContatoButton;
