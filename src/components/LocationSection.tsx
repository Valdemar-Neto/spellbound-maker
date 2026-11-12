import DotMap from "@/components/map/DotMap";
import { contatos, site, telefoneHref } from "@/lib/site";
import ContatoButton from "@/components/contato/ContatoButton";

const LocationSection = () => (
  <section id="onde" aria-labelledby="t-onde" className="theme-paper bg-background text-foreground">
    <div className="mx-auto flex max-w-[1200px] flex-wrap items-center gap-10 px-6 py-[88px]">
      <div className="flex flex-[1_1_360px] flex-col gap-5">
        <h2 id="t-onde" className="m-0 text-base font-semibold text-muted-foreground">
          Como chegar
        </h2>
        <address className="font-display text-[clamp(52px,6.4vw,88px)] font-extrabold not-italic leading-[0.92]">
          {site.address.street}, {site.address.district}
        </address>
        <span className="text-[17px] text-muted-foreground">
          {site.address.city}, CEP {site.address.cep}
        </span>
        <dl className="m-0 grid grid-cols-[auto_1fr] gap-x-5 gap-y-1.5 text-base">
          <dt className="text-muted-foreground">Horário</dt>
          <dd className="m-0 font-semibold">{site.hours}</dd>
          <dt className="text-muted-foreground">Telefones</dt>
          <dd className="m-0 flex flex-col font-semibold">
            {contatos.map((c) => (
              <a key={c.id} href={telefoneHref(c)} className="underline underline-offset-2">
                {c.telefone} <span className="font-normal text-muted-foreground">{c.nome.split(" ")[0]}</span>
              </a>
            ))}
          </dd>
        </dl>
        <div className="flex flex-wrap gap-3">
          <a
            href={site.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="press flex min-h-[52px] items-center rounded-full bg-foreground px-[22px] font-bold text-background"
          >
            Abrir no Google Maps
          </a>
          <ContatoButton
            acao="whatsapp"
            className="press flex min-h-[52px] items-center rounded-full border-2 border-foreground px-[22px] font-semibold"
          >
            Pedir a localização
          </ContatoButton>
        </div>
      </div>

      <div className="flex-[1.4_1_460px]">
        <DotMap className="mx-auto aspect-square w-full max-h-[560px]" />
      </div>
    </div>
  </section>
);

export default LocationSection;
