import { site, whatsappMessages, whatsappUrl } from "@/lib/site";

/** Barra fixa de contato no celular: ligar, rota e WhatsApp sempre ao alcance do polegar. */
const MobileContactBar = () => (
  <nav
    aria-label="Contato rápido"
    className="sticky bottom-0 z-40 flex gap-2 border-t border-border bg-background px-3 pb-3.5 pt-2.5 md:hidden"
  >
    <a
      href={site.phoneHref}
      className="press flex min-h-[52px] flex-1 items-center justify-center rounded-[14px] border-2 border-line-strong font-bold text-foreground"
    >
      Ligar
    </a>
    <a
      href={site.directionsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="press flex min-h-[52px] flex-1 items-center justify-center rounded-[14px] border-2 border-line-strong font-bold text-foreground"
    >
      Rota
    </a>
    <a
      href={whatsappUrl(whatsappMessages.geral)}
      target="_blank"
      rel="noopener noreferrer"
      className="press flex min-h-[52px] flex-[1.4] items-center justify-center rounded-[14px] bg-fire-orange font-bold text-background"
    >
      WhatsApp
    </a>
  </nav>
);

export default MobileContactBar;
