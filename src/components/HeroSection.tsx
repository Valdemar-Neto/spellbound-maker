import { lazy, Suspense, useCallback, useMemo, useRef, useState } from "react";
import { MapPin } from "lucide-react";
import tireImage from "@/assets/pneu-fenix.webp";
import { WhatsAppIcon } from "@/components/brand";
import { Chip } from "@/components/form/fields";
import PedidoFechadoCard from "@/components/PedidoFechadoCard";
import { gsap, useGSAP, prefersReducedMotion, EASE_OUT } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useStatusAtendimento } from "@/hooks/use-status-atendimento";
import { mensagemHero, TEMAS_HERO, type TemaHeroId } from "@/lib/mensagem";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import ContatoButton from "@/components/contato/ContatoButton";

const HeroScene = lazy(() => import("@/components/three/HeroScene"));

const supportsWebGL = () => {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
};

interface HeroSectionProps {
  /** Texto da lateral do pneu: a medida escolhida ou "SANTA INÊS-MA". */
  tireText: string;
}

const HeroSection = ({ tireText }: HeroSectionProps) => {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const show3D = useMemo(supportsWebGL, []);
  const [sceneReady, setSceneReady] = useState(false);
  const onSceneReady = useCallback(() => setSceneReady(true), []);
  const status = useStatusAtendimento();
  const [tema, setTema] = useState<TemaHeroId | null>(null);

  // Momento orquestrado da página: a entrada do hero.
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from(".hero-reveal", {
        opacity: 0,
        y: 16,
        duration: 0.9,
        ease: EASE_OUT,
        stagger: 0.07,
      });
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      aria-labelledby="titulo"
      className="relative isolate min-h-[780px] overflow-hidden max-md:flex max-md:min-h-0 max-md:flex-col"
    >
      {/* Palco do pneu: à direita no desktop, abaixo do texto no celular */}
      <div className="absolute right-[-14%] top-0 -z-10 h-full w-[78%] md:max-[1180px]:right-[-30%] md:max-[1180px]:w-[80%] max-md:relative max-md:right-auto max-md:order-2 max-md:-ml-[5%] max-md:-mt-2 max-md:h-[280px] max-md:w-[110%]">
        {show3D && (
          <div
            className={cn(
              "absolute inset-0 transition-opacity duration-500 [transition-timing-function:var(--ease-out)] motion-reduce:transition-none",
              sceneReady ? "opacity-100" : "opacity-0",
            )}
          >
            <Suspense fallback={null}>
              <HeroScene medida={tireText} reducedMotion={reducedMotion} onReady={onSceneReady} />
            </Suspense>
          </div>
        )}
        <img
          src={tireImage}
          alt="Pneu com roda de liga e FÊNIX PNEUS, SANTA INÊS-MA e DEUS É FIEL escritos na lateral"
          aria-hidden={sceneReady || undefined}
          width={1100}
          height={1100}
          className={cn(
            "pointer-events-none absolute inset-0 h-full w-full object-contain transition-opacity delay-200 duration-500 motion-reduce:transition-none",
            sceneReady && "opacity-0",
          )}
        />
      </div>

      <div className="mx-auto flex min-h-[inherit] w-full max-w-[1240px] flex-col justify-center px-7 pb-[72px] pt-[88px] max-md:pb-2 max-md:pt-10">
        <div className="flex max-w-[600px] flex-col gap-7 md:max-[1180px]:max-w-[540px]">
          <span className="hero-reveal inline-flex items-center gap-2.5 self-start rounded-full border border-border bg-surface py-2 pl-3 pr-4 text-[15px] font-semibold">
            <span
              aria-hidden="true"
              className={cn("h-2.5 w-2.5 rounded-full", status.aberto ? "bg-status-open" : "bg-muted-foreground")}
            />
            {status.texto}
          </span>

          <h1
            id="titulo"
            className="hero-reveal m-0 font-display text-[clamp(56px,6.6vw,104px)] font-extrabold leading-[0.9] max-md:text-[clamp(44px,12vw,60px)]"
          >
            Furou o pneu? A Fênix resolve.
          </h1>

          <p className="hero-reveal m-0 max-w-[27em] text-xl leading-normal text-ink-soft">
            Borracharia e pneus novos e seminovos em Santa Inês-MA. Conserto de furo, troca, vulcanização e calibragem
            para carro, moto e caminhão.
          </p>

          <div role="group" aria-labelledby="t-precisa" className="hero-reveal flex flex-col gap-2.5">
            <span id="t-precisa" className="text-[15px] font-semibold text-ink-soft">
              Do que você precisa?{" "}
              <span className="font-normal text-muted-foreground">Opcional, já vai na mensagem</span>
            </span>
            <div className="flex flex-wrap gap-2">
              {TEMAS_HERO.map((t) => (
                <Chip key={t.id} ativo={tema === t.id} onClick={() => setTema(tema === t.id ? null : t.id)}>
                  {t.rotulo}
                </Chip>
              ))}
            </div>
          </div>

          <div className="hero-reveal flex flex-wrap gap-3">
            <ContatoButton
              acao="whatsapp"
              mensagem={mensagemHero(tema)}
              className="press flex min-h-[60px] items-center gap-2.5 rounded-full bg-fire-orange px-7 text-lg font-bold text-background"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Chamar no WhatsApp
            </ContatoButton>
            <a
              href={site.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="press lift flex min-h-[60px] items-center gap-2.5 rounded-full border-2 border-line-strong px-[26px] text-lg font-semibold text-foreground"
            >
              <MapPin className="h-5 w-5" aria-hidden="true" />
              Como chegar
            </a>
          </div>

          <p className="hero-reveal -mt-3 mb-0 text-[15px] text-muted-foreground">
            Sem cadastro. A resposta vem no seu WhatsApp.{" "}
            <a
              href="#mensagem"
              className="link inline-flex min-h-11 items-center font-semibold underline underline-offset-4"
            >
              Prefere detalhar? Monte sua mensagem
            </a>
          </p>

          <div className="hero-reveal flex flex-wrap items-center gap-x-6 gap-y-1 text-[15px] text-muted-foreground">
            <span>
              {site.address.street}, {site.address.district}
            </span>
            <span>{site.hours}</span>
            <ContatoButton
              acao="ligar"
              className="inline-flex min-h-11 items-center font-semibold text-foreground underline underline-offset-4"
            >
              Ligar para a Fênix
            </ContatoButton>
          </div>

          {!status.aberto && (
            <div className="hero-reveal">
              <PedidoFechadoCard retorno={status.retorno} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
