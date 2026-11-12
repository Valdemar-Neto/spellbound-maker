import { site } from "@/lib/site";

const faq = [
  {
    q: "Vocês têm pneu seminovo?",
    a: "Sim. Cada seminovo é avaliado um a um, com sulco medido e foto do próprio pneu. Peça as fotos pelo WhatsApp antes de vir.",
  },
  {
    q: "Como descubro a medida do meu pneu?",
    a: "Olhe a lateral do pneu: são três números, como 175/70 R14 (largura, perfil e aro). Se não achar, mande uma foto da lateral pelo WhatsApp que a gente lê para você.",
  },
  { q: "Atendem caminhão e moto?", a: "Sim. Trabalhamos com pneus e serviços para carro, moto e caminhão." },
  { q: "Qual o horário?", a: `${site.hours}, na ${site.address.street}, ${site.address.district}.` },
];

const FaqSection = () => (
  <section
    id="duvidas"
    aria-labelledby="t-duv"
    className="mx-auto flex w-full max-w-[900px] flex-col gap-6 px-6 py-[88px]"
  >
    <h2 id="t-duv" className="m-0 font-display text-[64px] font-extrabold leading-[0.95]">
      Dúvidas
    </h2>
    <div className="flex flex-col">
      {faq.map((item) => (
        <details key={item.q} className="faq border-t border-border py-5">
          <summary className="flex justify-between gap-4 text-[19px] font-semibold">
            {item.q}
            <span aria-hidden="true" className="faq-icon text-2xl leading-none text-fire-orange">
              +
            </span>
          </summary>
          <p className="mb-0 mt-3 max-w-[40em] text-ink-soft">{item.a}</p>
        </details>
      ))}
    </div>
  </section>
);

export default FaqSection;
