import { lazy, Suspense, useMemo, useRef } from "react";
import heroBg from "@/assets/hero-bg.jpg";
import { Phone, MessageCircle } from "lucide-react";
import { gsap, useGSAP, prefersReducedMotion, EASE_OUT } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { site, whatsappUrl } from "@/lib/site";

const HeroScene = lazy(() => import("@/components/three/HeroScene"));

const supportsWebGL = () => {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
};

const HeroFallback = () => (
  <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-60" />
);

const HeroSection = () => {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const show3D = useMemo(() => !reducedMotion && supportsWebGL(), [reducedMotion]);

  // Único momento orquestrado da página: a entrada do hero.
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap
        .timeline({ defaults: { ease: EASE_OUT, duration: 1 } })
        .from(".hero-scene", { opacity: 0, scale: 0.94, duration: 1.6 })
        .from(".hero-line", { yPercent: 110, stagger: 0.1 }, 0.2)
        .from(".hero-copy", { opacity: 0, y: 16 }, 0.6)
        .from(".hero-cta", { opacity: 0, y: 12, stagger: 0.08 }, 0.75);
    },
    { scope: ref },
  );

  return (
    <section id="inicio" ref={ref} className="relative min-h-[100svh] flex items-center overflow-hidden">
      {/* Cena 3D à direita no desktop, ao fundo no mobile */}
      <div className="hero-scene absolute inset-0 lg:left-[38%] opacity-50 lg:opacity-100">
        {show3D ? (
          <Suspense fallback={<HeroFallback />}>
            <HeroScene />
          </Suspense>
        ) : (
          <HeroFallback />
        )}
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent pointer-events-none" />

      <div className="relative z-10 container px-4 py-28">
        <div className="max-w-3xl">
          <p className="hero-copy font-body text-base text-fire-orange mb-4">Deus é Fiel · Santa Inês, MA</p>
          {/* pt reserva espaço para o acento de "Ê" dentro da máscara overflow-hidden */}
          <h1 className="font-display font-bold uppercase leading-[0.95] mb-8 text-[clamp(3.25rem,9vw,7.5rem)] drop-shadow-[0_0_40px_hsl(25_95%_53%/0.35)]">
            <span className="block overflow-hidden pt-[0.12em]">
              <span className="hero-line block">
                <span className="gradient-fire-text">Fênix</span>
              </span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-line block text-foreground">Borracharia</span>
            </span>
          </h1>
          <p className="hero-copy font-body text-lg md:text-xl text-muted-foreground max-w-lg mb-10">
            Troca, conserto e calibragem de pneus para carros, motos e caminhões. Atendimento rápido na Av. Castelo
            Branco.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={whatsappUrl("Olá! Gostaria de um orçamento.")}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-cta press inline-flex items-center justify-center gap-3 px-8 py-4 rounded-lg font-display text-lg uppercase tracking-wider gradient-fire text-primary-foreground shadow-fire-lg"
            >
              <MessageCircle className="w-5 h-5" />
              Chamar no WhatsApp
            </a>
            <a
              href={site.phoneHref}
              className="hero-cta press inline-flex items-center justify-center gap-3 px-8 py-4 rounded-lg font-display text-lg uppercase tracking-wider border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
            >
              <Phone className="w-5 h-5" />
              Ligar agora
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
