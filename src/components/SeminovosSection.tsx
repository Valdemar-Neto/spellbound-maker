import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion, EASE_OUT } from "@/lib/gsap";
import { whatsappMessages } from "@/lib/site";
import ContatoButton from "@/components/contato/ContatoButton";

// Oito barras de sulco crescentes; as cinco primeiras acesas = 5 mm de 8 mm.
const SULCO_MM = 5;
const bars = Array.from({ length: 8 }, (_, i) => ({ height: `${58 + i * 6}%`, filled: i < SULCO_MM }));

const reference = [
  { value: "8 mm", text: "pneu novo de passeio" },
  { value: "3 a 5", text: "seminovo com boa vida útil" },
  { value: "1,6 mm", text: "limite da lei: abaixo disso, trocar" },
];

const SeminovosSection = () => {
  const ref = useRef<HTMLElement>(null);
  const counter = useRef<HTMLElement>(null);

  // Explica o dado: o sulco "enche" barra a barra enquanto o número sobe até 5 mm.
  useGSAP(
    () => {
      if (prefersReducedMotion() || !counter.current) return;
      const value = { mm: 0 };
      const render = () => {
        if (counter.current) counter.current.textContent = `${Math.round(value.mm)} mm`;
      };
      render();

      const stagger = 0.06;
      gsap
        .timeline({ scrollTrigger: { trigger: ".sulco-bars", start: "top 75%", once: true } })
        .from(".sulco-bar", {
          scaleY: 0.1,
          opacity: 0,
          transformOrigin: "50% 100%",
          duration: 0.9,
          ease: EASE_OUT,
          stagger,
        })
        // O contador acompanha as barras acesas (as 5 primeiras).
        .to(value, { mm: SULCO_MM, duration: 0.6 + stagger * (SULCO_MM - 1), ease: EASE_OUT, onUpdate: render }, 0);
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="seminovos" aria-labelledby="t-semi" className="mx-auto w-full max-w-[1240px] px-7 py-28">
      <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:gap-16">
        <figure className="m-0">
          <div aria-hidden="true" className="sulco-bars flex h-[340px] items-end gap-3.5">
            {bars.map((b, i) => (
              <span
                key={i}
                className={`sulco-bar block flex-1 rounded-md ${b.filled ? "bg-fire-orange" : "bg-border"}`}
                style={{ height: b.height }}
              />
            ))}
          </div>
          <figcaption className="mt-[22px] flex flex-wrap items-baseline gap-3.5">
            <b
              ref={counter}
              aria-hidden="true"
              className="font-display text-[clamp(80px,10vw,140px)] font-extrabold tabular-nums leading-[0.85]"
            >
              {SULCO_MM} mm
            </b>
            <span className="max-w-[16em] text-muted-foreground">
              <span className="sr-only">{SULCO_MM} mm </span>
              de sulco num seminovo de 8 mm. Ainda tem muita estrada.
            </span>
          </figcaption>
        </figure>

        <div className="flex flex-col gap-5">
          <h2 id="t-semi" className="m-0 font-display text-[clamp(52px,7vw,96px)] font-extrabold leading-[0.9]">
            Seminovo com o estado à vista
          </h2>
          <p className="m-0 max-w-[32em] text-[19px] text-ink-soft">
            Cada seminovo é avaliado um a um. Você recebe a foto do próprio pneu e a profundidade do sulco antes de sair
            de casa.
          </p>
          <ul className="mb-1 mt-1.5 flex list-none flex-col gap-2.5 p-0">
            {reference.map((r) => (
              <li key={r.value} className="flex items-baseline gap-3.5 text-ink-soft">
                <b className="min-w-[76px] font-display text-[28px] font-extrabold text-foreground">{r.value}</b>
                {r.text}
              </li>
            ))}
          </ul>
          <div>
            <ContatoButton
              acao="whatsapp"
              mensagem={whatsappMessages.seminovos}
              className="press inline-flex min-h-14 items-center rounded-full bg-fire-orange px-[26px] font-bold text-background"
            >
              Pedir fotos dos seminovos
            </ContatoButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeminovosSection;
