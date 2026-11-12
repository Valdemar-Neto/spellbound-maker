import Reveal from "@/components/motion/Reveal";
import { site, whatsappMessages, whatsappUrl } from "@/lib/site";

const CtaSection = () => (
  <section aria-labelledby="t-cta" className="bg-fire-orange text-background">
    <Reveal
      stagger={0.08}
      className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-6 px-6 py-16"
    >
      <h2
        id="t-cta"
        data-reveal
        className="m-0 max-w-[12em] font-display text-[clamp(44px,6vw,72px)] font-extrabold leading-[0.95]"
      >
        Pneu careca ou furado? Fala com a Fênix.
      </h2>
      <div data-reveal className="flex flex-wrap gap-3">
        <a
          href={whatsappUrl(whatsappMessages.geral)}
          target="_blank"
          rel="noopener noreferrer"
          className="press flex min-h-14 items-center rounded-full bg-background px-[26px] font-bold text-white"
        >
          Chamar no WhatsApp
        </a>
        <a
          href={site.phoneHref}
          className="press flex min-h-14 items-center rounded-full border-2 border-background px-6 font-bold"
        >
          Ligar agora
        </a>
      </div>
    </Reveal>
  </section>
);

export default CtaSection;
