import ContatoButton from "@/components/contato/ContatoButton";
import { parceiros, whatsappMessages } from "@/lib/site";
import { cn } from "@/lib/utils";

type Parceiro = (typeof parceiros)[number];

// Todas as logos aparecem numa cor clara única, direto sobre o fundo, sem caixa.
// Os arquivos chegam com fundos diferentes, então o filtro depende do tipo:
// - transparente: vira silhueta clara;
// - fundo-claro (fundo branco opaco): inverte em cinza; o fundo vira preto e some
//   no `mix-blend-mode: screen` sobre o fundo escuro da faixa;
// - fundo-escuro (fundo cinza opaco): contraste empurra o cinza para preto, que some no screen.
const filtros = {
  transparente: "[filter:brightness(0)_invert(1)]",
  "fundo-claro": "[filter:grayscale(1)_invert(1)_brightness(1.35)] mix-blend-screen",
  "fundo-escuro": "[filter:grayscale(1)_contrast(2)] mix-blend-screen",
} as const;

const apresentacao: Record<Parceiro["id"], { tipo: keyof typeof filtros; img: string }> = {
  // JPEG quadrado com muita margem: amplia para o nome ocupar a largura
  agronor: { tipo: "fundo-claro", img: "h-full w-full object-cover" },
  engecom: { tipo: "fundo-escuro", img: "h-full w-full object-cover" },
  sucena: { tipo: "transparente", img: "h-full w-full object-contain" },
  lokar: { tipo: "transparente", img: "h-[80%] w-full object-contain" },
  lucena: { tipo: "transparente", img: "h-[80%] w-full object-contain" },
  // Arquivo largo com o slogan à direita: a largura menor mostra só "MADRI LOGÍSTICA"
  madri: { tipo: "fundo-claro", img: "h-full w-[190px] object-cover object-left" },
  cgb: { tipo: "fundo-claro", img: "h-[85%] w-full object-contain" },
};

const LogoParceiro = ({ parceiro, decorativo }: { parceiro: Parceiro; decorativo?: boolean }) => {
  const { tipo, img } = apresentacao[parceiro.id];
  return (
    <li className="flex h-[132px] w-[280px] flex-none items-center justify-center border-r border-border px-8">
      <span className="flex h-[72px] w-full items-center justify-center">
        <img
          src={`${import.meta.env.BASE_URL}partners/${parceiro.arquivo}`}
          alt={decorativo ? "" : parceiro.nome}
          loading="lazy"
          decoding="async"
          draggable={false}
          className={cn("opacity-90", filtros[tipo], img)}
        />
      </span>
    </li>
  );
};

/** "Empresas que rodam com a Fênix": clientes B2B numa faixa que rola com fade nas laterais. */
const ParceirosSection = () => (
  <section aria-labelledby="t-parceiros" className="overflow-hidden">
    <div className="mx-auto flex max-w-[1200px] flex-col gap-10 px-6 py-24">
      <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
        <div className="flex max-w-[34rem] flex-col gap-4">
          <h2 id="t-parceiros" className="m-0 font-display text-[clamp(44px,5.6vw,72px)] font-extrabold leading-[0.95]">
            Empresas que rodam com a Fênix
          </h2>
          <p className="m-0 text-[17px] text-ink-soft">
            A Fênix também atende empresas da região: pneus, consertos e calibragem para frotas de carros, caminhões e
            máquinas.
          </p>
        </div>
        <ContatoButton
          acao="whatsapp"
          mensagem={whatsappMessages.empresa}
          className="press lift flex min-h-[52px] items-center rounded-full border-2 border-line-strong px-[22px] font-semibold text-foreground"
        >
          Atendimento para minha empresa
        </ContatoButton>
      </div>

      <div className="marquee border-y border-border [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        {/* bg-background: a faixa animada isola a composição; o mix-blend-mode das logos precisa do fundo aqui dentro */}
        <div className="marquee-track flex w-max bg-background">
          <ul aria-label="Empresas atendidas" className="m-0 flex list-none p-0">
            {parceiros.map((p) => (
              <LogoParceiro key={p.id} parceiro={p} />
            ))}
          </ul>
          {/* Cópia para o laço contínuo; escondida de leitores de tela */}
          <ul aria-hidden="true" className="marquee-copia m-0 flex list-none p-0">
            {parceiros.map((p) => (
              <LogoParceiro key={p.id} parceiro={p} decorativo />
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
);

export default ParceirosSection;
