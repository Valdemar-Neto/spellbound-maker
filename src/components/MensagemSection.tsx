import { useRef, useState } from "react";
import { WhatsAppIcon } from "@/components/brand";
import { fieldClass, textareaClass } from "@/components/form/classes";
import { Chip, Field } from "@/components/form/fields";
import { ASSUNTOS, errosMensagem, montarMensagem, VEICULOS } from "@/lib/mensagem";
import { useContato } from "@/components/contato/contato-context";

const garantias = [
  { titulo: "Sem cadastro", texto: "Nada fica guardado no site. Tudo vai direto para o WhatsApp." },
  { titulo: "Quem responde é a loja", texto: "Atendimento da própria Fênix, de segunda a sábado, das 7h20 às 18h30." },
  { titulo: "Não sabe a medida?", texto: "Deixe em branco e mande a foto da lateral do pneu logo depois da mensagem." },
];

interface MensagemSectionProps {
  /** Medida escolhida em "Procurando pneu?", usada até a pessoa editar o campo. */
  medidaBusca: string;
}

/**
 * "Monte sua mensagem." no estilo do formulário da Airex: a mensagem é montada
 * no aparelho e abre pronta no WhatsApp da loja. Nada passa por servidor.
 */
const MensagemSection = ({ medidaBusca }: MensagemSectionProps) => {
  const [nome, setNome] = useState("");
  const [assunto, setAssunto] = useState("");
  const [veiculo, setVeiculo] = useState("");
  const [medida, setMedida] = useState<string | null>(null);
  const [bairro, setBairro] = useState("");
  const [detalhes, setDetalhes] = useState("");
  const [tentou, setTentou] = useState(false);
  const { abrir } = useContato();
  const nomeRef = useRef<HTMLInputElement>(null);
  const assuntoRef = useRef<HTMLSelectElement>(null);

  const medidaValor = medida ?? medidaBusca;
  const texto = montarMensagem({
    nome,
    assunto,
    veiculo,
    medida: medidaValor,
    bairro,
    detalhes,
  });
  const faltando = errosMensagem({ nome, assunto });
  const valida = !faltando.nome && !faltando.assunto;
  const erros = tentou ? faltando : { nome: "", assunto: "" };

  const tentarAbrir = () => {
    setTentou(true);
    (faltando.nome ? nomeRef : assuntoRef).current?.focus();
  };

  const botao = (
    <>
      <WhatsAppIcon className="h-5 w-5" />
      Abrir no WhatsApp
    </>
  );
  const botaoClass =
    "press inline-flex min-h-[58px] cursor-pointer items-center gap-2.5 rounded-full bg-fire-orange px-7 text-lg font-bold text-background";

  return (
    <section id="mensagem" aria-labelledby="t-msg" className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-[1240px] items-start gap-10 px-7 py-[72px] min-[901px]:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] min-[901px]:gap-16 min-[901px]:py-[104px]">
        <div className="flex flex-col gap-6">
          <h2 id="t-msg" className="m-0 font-display text-[clamp(48px,6vw,84px)] font-extrabold leading-[0.92]">
            Monte sua mensagem.
          </h2>
          <p className="m-0 max-w-[24em] text-[19px] text-ink-soft">
            Preencha o que souber. A mensagem abre pronta no WhatsApp da Fênix, é só tocar em enviar.
          </p>
          <dl className="mb-0 mt-2 flex flex-col border-t border-border">
            {garantias.map((g) => (
              <div
                key={g.titulo}
                className="grid grid-cols-[11em_1fr] gap-4 border-b border-border py-4 max-[560px]:grid-cols-1 max-[560px]:gap-1"
              >
                <dt className="font-bold text-fire-link">{g.titulo}</dt>
                <dd className="m-0 text-ink-soft">{g.texto}</dd>
              </div>
            ))}
          </dl>
        </div>

        <form
          aria-labelledby="t-msg-form"
          noValidate
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col gap-[18px] rounded-3xl border border-border bg-background p-8 max-[560px]:p-5"
        >
          <div className="flex flex-col gap-1 border-b border-border pb-3.5">
            <h3 id="t-msg-form" className="m-0 text-[22px] font-bold">
              Fale com a Fênix
            </h3>
            <span className="text-[15px] text-muted-foreground">Resposta pelo WhatsApp, no horário da loja</span>
          </div>

          <div className="grid grid-cols-2 gap-3.5 max-[560px]:grid-cols-1">
            <Field label="Seu nome" error={erros.nome} errorId="m-erro-nome">
              <input
                ref={nomeRef}
                type="text"
                name="nome"
                autoComplete="given-name"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                aria-invalid={!!erros.nome}
                aria-describedby={erros.nome ? "m-erro-nome" : undefined}
                className={fieldClass(!!erros.nome)}
              />
            </Field>
            <Field label="Do que você precisa?" error={erros.assunto} errorId="m-erro-assunto">
              <select
                ref={assuntoRef}
                name="assunto"
                value={assunto}
                onChange={(e) => setAssunto(e.target.value)}
                aria-invalid={!!erros.assunto}
                aria-describedby={erros.assunto ? "m-erro-assunto" : undefined}
                className={`${fieldClass(!!erros.assunto)} cursor-pointer`}
              >
                <option value="">Selecione</option>
                {ASSUNTOS.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <div role="group" aria-labelledby="m-veiculo" className="flex flex-col gap-2">
            <span id="m-veiculo" className="text-sm font-semibold text-ink-soft">
              Veículo <span className="font-normal text-muted-foreground">opcional</span>
            </span>
            <div className="flex flex-wrap gap-2">
              {VEICULOS.map((v) => (
                <Chip key={v} ativo={veiculo === v} onClick={() => setVeiculo(veiculo === v ? "" : v)}>
                  {v}
                </Chip>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3.5 max-[560px]:grid-cols-1">
            <Field label="Medida do pneu" hint="opcional">
              <input
                type="text"
                name="medida"
                autoComplete="off"
                placeholder="175/70 R14"
                value={medidaValor}
                onChange={(e) => setMedida(e.target.value)}
                className={fieldClass()}
              />
            </Field>
            <Field label="Bairro ou cidade" hint="opcional">
              <input
                type="text"
                name="bairro"
                autoComplete="address-level2"
                value={bairro}
                onChange={(e) => setBairro(e.target.value)}
                className={fieldClass()}
              />
            </Field>
          </div>

          <Field label="Conte o que aconteceu" hint="opcional">
            <textarea
              name="detalhes"
              rows={3}
              placeholder="Ex.: furou na estrada, o carro está parado perto do posto."
              value={detalhes}
              onChange={(e) => setDetalhes(e.target.value)}
              className={textareaClass()}
            />
          </Field>

          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-ink-soft">Sua mensagem vai assim</span>
            <div className="max-w-full self-start whitespace-pre-line rounded-[14px_14px_4px_14px] bg-whatsapp-bubble px-3.5 pb-2.5 pt-3 text-[15px] leading-[1.45] text-white">
              {texto}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-3 pt-1">
            <button
              type="button"
              aria-haspopup={valida ? "dialog" : undefined}
              onClick={() => (valida ? abrir("whatsapp", texto) : tentarAbrir())}
              className={botaoClass}
            >
              {botao}
            </button>
            <span className="max-w-[24em] text-[13px] text-muted-foreground">
              Seus dados só aparecem na conversa com a Fênix. Nada de lista, nada de propaganda.
            </span>
          </div>
        </form>
      </div>
    </section>
  );
};

export default MensagemSection;
