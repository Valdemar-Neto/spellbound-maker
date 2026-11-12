import { cn } from "@/lib/utils";

/** Classe dos campos de texto/seleção dos formulários (borda marca o erro). */
export const fieldClass = (invalid = false) =>
  cn(
    "min-h-[52px] w-full rounded-xl border-2 bg-background px-3.5 text-[17px] font-medium text-foreground placeholder:text-placeholder",
    invalid ? "border-error" : "border-border",
  );

export const textareaClass = (invalid = false) =>
  cn(fieldClass(invalid), "min-h-0 resize-y py-3 text-base");
