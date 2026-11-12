import { contatos, site } from "@/lib/site";
import { cn } from "@/lib/utils";

const items = [
  { title: "Carro, moto e caminhão", text: "Pneus de passeio, utilitário, moto e carga." },
  { title: "Seminovo avaliado um a um", text: "Sulco, reparos e foto do próprio pneu antes da venda." },
  {
    title: "Emergência",
    text: `Furou no caminho? Ligue para ${contatos.map((c) => c.telefone).join(" ou ")}. ${site.deliveryFee}`,
  },
];

/** Faixa de resumo logo abaixo do hero: três fatos, separados por fios verticais. */
const HighlightsStrip = () => (
  <section aria-label="Resumo" className="border-y border-border">
    <div className="mx-auto flex max-w-[1200px] flex-wrap px-6">
      {items.map((item, i) => (
        <div
          key={item.title}
          className={cn(
            "flex flex-[1_1_300px] flex-col gap-1 py-7",
            i === 0 ? "md:pr-6" : "max-md:border-t md:border-l",
            i > 0 && (i === items.length - 1 ? "md:pl-6" : "md:px-6"),
          )}
        >
          <strong className="text-lg">{item.title}</strong>
          <span className="text-[15px] text-muted-foreground">{item.text}</span>
        </div>
      ))}
    </div>
  </section>
);

export default HighlightsStrip;
