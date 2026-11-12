import { lazy, Suspense, useCallback, useMemo, useRef, useState } from "react";
import { Clock, MapPin } from "lucide-react";
import tireImage from "@/assets/pneu-medida.webp";
import { gsap, useGSAP, prefersReducedMotion, EASE_OUT } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { site, whatsappMessages, whatsappUrl } from "@/lib/site";
import { cn } from "@/lib/utils";

const HeroScene = lazy(() => import("@/components/three/HeroScene"));

const LARGURAS = ["145", "155", "165", "175", "185", "195", "205", "215", "225"];
const PERFIS = ["45", "50", "55", "60", "65", "70", "75", "80"];
const AROS = ["13", "14", "15", "16", "17", "18"];

const supportsWebGL = () => {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
};

interface MedidaFieldProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  format?: (option: string) => string;
  accent?: boolean;
}

/** Um número da medida como <select> nativo em tipografia de display, com rótulo sublinhado. */
const MedidaField = ({ label, value, options, onChange, format = (o) => o, accent }: MedidaFieldProps) => (
  <label className="flex flex-col gap-1">
    <select
      aria-label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={cn(
        "medida-select cursor-pointer border-0 bg-transparent pr-5 font-display text-[clamp(56px,8vw,92px)] font-extrabold leading-none",
        accent ? "text-fire-orange" : "text-foreground",
      )}
    >
      {options.map((o) => (
        <option key={o} value={o}>
          {format(o)}
        </option>
      ))}
    </select>
    <span className="border-t-[3px] border-fire-orange pt-1.5 text-[13px] font-medium text-muted-foreground">
      {label.toLowerCase()}
    </span>
  </label>
);

const HeroSection = () => {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const show3D = useMemo(supportsWebGL, []);
  const [sceneReady, setSceneReady] = useState(false);
  const onSceneReady = useCallback(() => setSceneReady(true), []);

  const [largura, setLargura] = useState("175");
  const [perfil, setPerfil] = useState("70");
  const [aro, setAro] = useState("14");
  const medida = `${largura}/${perfil} R${aro}`;

  // Momento orquestrado da página: a entrada do hero.
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from(".hero-reveal", { opacity: 0, y: 16, duration: 0.9, ease: EASE_OUT, stagger: 0.07 });
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      aria-labelledby="titulo"
      className="relative isolate min-h-[820px] overflow-hidden max-md:min-h-0"
    >
      {/* Palco do pneu: à direita no desktop, acima do texto no celular */}
      <div className="absolute right-[-14%] top-0 -z-10 h-full w-[78%] md:max-[1180px]:right-[-30%] md:max-[1180px]:w-[80%] max-md:relative max-md:right-auto max-md:-ml-[10%] max-md:h-[300px] max-md:w-[120%]">
        {show3D && (
          <div
            className={cn(
              "absolute inset-0 transition-opacity duration-500 [transition-timing-function:var(--ease-out)] motion-reduce:transition-none",
              sceneReady ? "opacity-100" : "opacity-0",
            )}
          >
            <Suspense fallback={null}>
              <HeroScene medida={medida} reducedMotion={reducedMotion} onReady={onSceneReady} />
            </Suspense>
          </div>
        )}
        <img
          src={tireImage}
          alt="Pneu com roda de liga e a medida 175/70 R14 escrita na lateral"
          aria-hidden={sceneReady || undefined}
          width={1100}
          height={1100}
          className={cn(
            "pointer-events-none absolute inset-0 h-full w-full object-contain transition-opacity delay-200 duration-500 motion-reduce:transition-none",
            sceneReady && "opacity-0",
          )}
        />
      </div>

      <div className="mx-auto flex min-h-[inherit] max-w-[1240px] flex-col justify-center px-7 pb-16 pt-24 max-md:-mt-5 max-md:pt-0">
        <div className="flex max-w-[640px] flex-col gap-6 md:max-[1180px]:max-w-[540px]">
          <span className="hero-reveal flex items-center gap-2 text-[15px] font-medium text-muted-foreground">
            <MapPin className="h-[18px] w-[18px] shrink-0 text-fire-orange" aria-hidden="true" />
            {site.address.street}, {site.address.district}, {site.address.city}
          </span>

          <h1
            id="titulo"
            className="hero-reveal m-0 font-display text-[clamp(52px,6.2vw,100px)] font-extrabold leading-[0.9] max-md:text-[clamp(44px,12vw,60px)]"
          >
            Diga a medida. A gente separa o pneu.
          </h1>

          <form
            id="pneus"
            aria-label="Buscar pneu pela medida"
            className="flex scroll-mt-6 flex-col gap-3.5"
            onSubmit={(e) => e.preventDefault()}
          >
            <p className="hero-reveal m-0 text-lg text-ink-soft">
              Qual a medida do seu pneu? Está escrita na lateral, como no pneu ao lado.
            </p>
            <div className="hero-reveal flex flex-wrap items-end gap-2.5">
              <MedidaField label="Largura" value={largura} options={LARGURAS} onChange={setLargura} />
              <span
                aria-hidden="true"
                className="pb-[30px] font-display text-[clamp(56px,8vw,92px)] font-extrabold leading-none text-ink-dim"
              >
                /
              </span>
              <MedidaField label="Perfil" value={perfil} options={PERFIS} onChange={setPerfil} />
              <MedidaField label="Aro" value={aro} options={AROS} onChange={setAro} format={(o) => `R${o}`} accent />
            </div>
            <div className="hero-reveal flex flex-wrap gap-3">
              <a
                href={whatsappUrl(whatsappMessages.medida(medida))}
                target="_blank"
                rel="noopener noreferrer"
                className="press flex min-h-14 items-center rounded-full bg-fire-orange px-[26px] text-[17px] font-bold text-background"
              >
                Perguntar se tem {medida}
              </a>
              <a
                href={site.phoneHref}
                className="press lift flex min-h-14 items-center rounded-full border-2 border-line-strong px-6 text-[17px] font-semibold text-foreground"
              >
                Ligar {site.displayPhone}
              </a>
            </div>
          </form>

          <span className="hero-reveal flex items-center gap-2 text-[15px] text-muted-foreground">
            <Clock className="h-[18px] w-[18px] shrink-0" aria-hidden="true" />
            {site.hours}
          </span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
