import type { SVGProps } from "react";

/** Marca da Fênix: pneu (anel) com a chama no centro. */
export const FenixMark = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 48 48" {...props}>
    <circle cx="24" cy="24" r="21" fill="none" stroke="currentColor" strokeWidth="6" />
    <path
      d="M24 34c-5 0-8-3-8-7 0-3 2-5 3-7 1 2 2 3 3 3 0-3 1-6 4-8 0 4 5 6 5 11 0 5-3 8-7 8z"
      fill="currentColor"
    />
  </svg>
);

/** Glifo do WhatsApp (não existe no lucide-react). */
export const WhatsAppIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm4.5 12.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.9 11.9 0 0 0 4.6 4c1.7.7 2.4.8 3.2.7a2.8 2.8 0 0 0 1.8-1.3 2.3 2.3 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3z" />
  </svg>
);
