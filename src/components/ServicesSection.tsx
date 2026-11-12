import Reveal from "@/components/motion/Reveal";
import { site, whatsappMessages, whatsappUrl } from "@/lib/site";

const services = [
  { name: "Venda e troca de pneus", desc: "Novos e seminovos para carro, moto e caminhão, montados na hora." },
  { name: "Conserto de furos", desc: "Reparo rápido para você seguir viagem no mesmo dia." },
  { name: "Vulcanização", desc: "Para corte que o remendo comum não resolve." },
  { name: "Calibragem", desc: "Pressão certa para o pneu durar mais." },
  { name: "Pneu de caminhão", desc: "Atendimento para veículos pesados e de carga." },
  { name: "Emergência", desc: `Furou no caminho? Ligue e combine o atendimento. ${site.deliveryFee}` },
];

/** Serviços no estilo placa de beira de estrada: vermelho, amarelo e letra condensada. */
const ServicesSection = () => (
  <section
    id="servicos"
    aria-labelledby="t-serv"
    className="border-y-[5px] border-background bg-fire-red text-white"
  >
    <div className="mx-auto flex max-w-[1200px] flex-col gap-9 px-6 py-[88px]">
      <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-4">
        <h2 id="t-serv" className="m-0 font-placa text-[clamp(56px,7vw,96px)] font-normal uppercase leading-[0.95]">
          O que a Fênix faz
        </h2>
        <a
          href={whatsappUrl(whatsappMessages.geral)}
          target="_blank"
          rel="noopener noreferrer"
          className="push flex min-h-[60px] items-center rounded-[10px] border-[3px] border-background bg-fire-yellow px-[26px] font-placa text-2xl uppercase tracking-[0.03em] text-background shadow-[4px_4px_0_hsl(var(--background))]"
        >
          Chamar no WhatsApp
        </a>
      </div>

      <Reveal stagger={0.07}>
        <ul className="m-0 list-none columns-1 gap-16 p-0 md:columns-2">
          {services.map((s) => (
            <li
              key={s.name}
              data-reveal
              className="flex break-inside-avoid items-baseline gap-[18px] border-b-[3px] border-white/35 py-3.5"
            >
              <span
                aria-hidden="true"
                className="h-[18px] w-[18px] flex-none translate-y-1 border-[3px] border-background bg-fire-yellow"
              />
              <span className="flex flex-col gap-0.5">
                <span className="font-placa text-[40px] uppercase leading-none tracking-[0.01em]">{s.name}</span>
                <span className="text-base font-semibold">{s.desc}</span>
              </span>
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  </section>
);

export default ServicesSection;
