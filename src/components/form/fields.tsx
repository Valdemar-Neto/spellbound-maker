import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FieldProps {
  label: string;
  /** Texto auxiliar ao lado do rótulo, mais leve (ex.: "opcional"). */
  hint?: string;
  error?: string;
  errorId?: string;
  className?: string;
  children: ReactNode;
}

/** Rótulo acima do campo e aviso de erro embaixo (como na Airex). */
export const Field = ({ label, hint, error, errorId, className, children }: FieldProps) => (
  <label className={cn("flex flex-col gap-1.5 text-sm font-semibold text-ink-soft", className)}>
    <span>
      {label}
      {hint && <span className="font-normal text-muted-foreground"> {hint}</span>}
    </span>
    {children}
    {error && (
      <span id={errorId} className="font-medium text-error">
        {error}
      </span>
    )}
  </label>
);

interface ChipProps {
  ativo: boolean;
  onClick: () => void;
  children: ReactNode;
}

/** Botão de alternância em pílula (chips de assunto e de veículo). */
export const Chip = ({ ativo, onClick, children }: ChipProps) => (
  <button
    type="button"
    aria-pressed={ativo}
    onClick={onClick}
    className={cn(
      "press min-h-11 cursor-pointer rounded-full border-2 px-4 text-[15px] font-semibold text-foreground",
      ativo ? "border-fire-orange bg-fire-orange/[.16]" : "border-line-strong bg-transparent hover:border-ink-dim",
    )}
  >
    {children}
  </button>
);
