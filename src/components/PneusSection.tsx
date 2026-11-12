import { Camera } from "lucide-react";
import { WhatsAppIcon } from "@/components/brand";
import { AROS, formatMedida, LARGURAS, PERFIS, textoFaltando, type Medida } from "@/lib/medida";
import { whatsappMessages, whatsappUrl } from "@/lib/site";
import { cn } from "@/lib/utils";

interface CampoProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  format?: (option: string) => string;
  accent?: boolean;
}

/** Um número da medida: rótulo acima, <select> nativo em tipografia de display. */
const Campo = ({ label, value, options, onChange, format = (o) => o, accent }: CampoProps) => (
  <label className="flex flex-col gap-2 text-sm font-semibold text-muted-foreground">
    {label}
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={cn(
        "medida-select min-h-[84px] w-full cursor-pointer rounded-[14px] border-2 bg-surface hover:border-ink-dim px-3.5 font-display text-5xl font-extrabold max-md:min-h-[72px] max-md:px-2 max-md:text-[38px]",
        value ? "border-fire-orange" : "border-border",
        accent ? "text-fire-orange" : "text-foreground",
      )}
    >
      <option value="">—</option>
      {options.map((o) => (
        <option key={o} value={o}>
          {format(o)}
        </option>
      ))}
    </select>
  </label>
);

/** Lateral de pneu com a medida 175/70 R14 e o que cada número significa. */
const DiagramaMedida = () => {
  const numero = {
    textAnchor: "middle" as const,
    fontFamily: "Big Shoulders Display, sans-serif",
    fontWeight: 800,
    fontSize: 52,
    fill: "#8C7B6E",
  };
  const rotulo = {
    textAnchor: "middle" as const,
    fontFamily: "Instrument Sans, sans-serif",
    fontSize: 15,
    fontWeight: 600,
    fill: "hsl(var(--foreground))",
  };
  const chave = { fill: "none", stroke: "hsl(var(--fire-orange))", strokeWidth: 3 };

  return (
    <figure className="m-0 flex flex-col gap-2.5">
      <svg
        viewBox="0 0 460 150"
        role="img"
        aria-label="Lateral de pneu com a medida 175/70 R14: 175 é a largura, 70 é o perfil e R14 é o aro"
        className="block h-auto w-full max-w-[460px]"
      >
        <path d="M10 110 Q230 -10 450 110 L450 150 L10 150 Z" fill="hsl(var(--background))" />
        <path d="M10 110 Q230 -10 450 110" fill="none" stroke="hsl(var(--border))" strokeWidth="2" />
        <text x="150" y="98" {...numero}>
          175
        </text>
        <text x="195" y="98" {...numero}>
          /
        </text>
        <text x="240" y="98" {...numero}>
          70
        </text>
        <text x="318" y="98" {...numero}>
          R14
        </text>
        <path d="M114 110 V118 H186 V110" {...chave} />
        <path d="M216 110 V118 H264 V110" {...chave} />
        <path d="M281 110 V118 H355 V110" {...chave} />
        <text x="150" y="140" {...rotulo}>
          largura
        </text>
        <text x="240" y="140" {...rotulo}>
          perfil
        </text>
        <text x="318" y="140" {...rotulo}>
          aro
        </text>
      </svg>
    </figure>
  );
};

interface PneusSectionProps {
  medida: Medida;
  onChange: (medida: Medida) => void;
}

const PneusSection = ({ medida, onChange }: PneusSectionProps) => {
  const completa = formatMedida(medida);
  const set = (key: keyof Medida) => (value: string) => onChange({ ...medida, [key]: value });

  return (
    <section id="pneus" aria-labelledby="t-pneus" className="bg-surface">
      <div className="mx-auto grid max-w-[1240px] items-center gap-10 px-7 py-[72px] min-[901px]:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] min-[901px]:gap-16 min-[901px]:py-24">
        <div className="flex flex-col gap-[22px]">
          <h2 id="t-pneus" className="m-0 font-display text-[clamp(48px,6vw,84px)] font-extrabold leading-[0.92]">
            Procurando pneu?
          </h2>
          <p className="m-0 max-w-[25em] text-[19px] text-ink-soft">
            Escolha a medida e pergunte direto no WhatsApp se tem novo ou seminovo. Ela está escrita na lateral do
            pneu, assim:
          </p>
          <DiagramaMedida />
        </div>

        <form
          aria-label="Escolher a medida do pneu"
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col gap-[22px] rounded-3xl border border-border bg-background p-8 max-md:p-5"
        >
          <div className="grid grid-cols-3 gap-3">
            <Campo label="Largura" value={medida.largura} options={LARGURAS} onChange={set("largura")} />
            <Campo label="Perfil" value={medida.perfil} options={PERFIS} onChange={set("perfil")} />
            <Campo
              label="Aro"
              value={medida.aro}
              options={AROS}
              onChange={set("aro")}
              format={(o) => `R${o}`}
              accent
            />
          </div>

          <div aria-live="polite">
            {completa ? (
              <a
                href={whatsappUrl(whatsappMessages.medida(completa))}
                target="_blank"
                rel="noopener noreferrer"
                className="press flex min-h-[60px] items-center justify-center gap-2.5 rounded-full bg-fire-orange px-6 text-lg font-bold text-background"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Perguntar se tem {completa}
              </a>
            ) : (
              <p className="m-0 flex min-h-[60px] items-center justify-center rounded-full border-2 border-dashed border-line-strong px-6 text-center text-base font-semibold text-muted-foreground">
                {textoFaltando(medida)}
              </p>
            )}
          </div>

          <div className="flex items-center gap-3.5 text-sm text-muted-foreground">
            <span aria-hidden="true" className="h-px flex-1 bg-border" />
            não sabe a medida?
            <span aria-hidden="true" className="h-px flex-1 bg-border" />
          </div>

          <a
            href={whatsappUrl(whatsappMessages.foto)}
            target="_blank"
            rel="noopener noreferrer"
            className="press lift flex min-h-14 items-center justify-center gap-2.5 rounded-full border-2 border-line-strong px-[22px] text-[17px] font-semibold text-foreground"
          >
            <Camera className="h-5 w-5" aria-hidden="true" />
            Mandar foto da lateral do pneu
          </a>
        </form>
      </div>
    </section>
  );
};

export default PneusSection;
