import { describe, expect, it } from "vitest";
import { errosMensagem, mensagemHero, montarMensagem } from "./mensagem";
import { errosPedido, mascaraTelefone, pedidoComoMensagem } from "./pedido";
import { statusAtendimento } from "./horario";

const vazio = { nome: "", assunto: "", veiculo: "", medida: "", bairro: "", detalhes: "" };

describe("montarMensagem", () => {
  it("monta uma linha por informação preenchida", () => {
    expect(
      montarMensagem({
        nome: " Maria ",
        assunto: "Conserto de furo",
        veiculo: "Carro",
        medida: "175/70 R14",
        bairro: "Sabbak",
        detalhes: "",
      }),
    ).toBe(
      [
        "Olá, Fênix! Vim pelo site.",
        "Meu nome é Maria.",
        "Preciso de: conserto de furo",
        "Veículo: carro",
        "Medida do pneu: 175/70 R14",
        "Estou em: Sabbak",
      ].join("\n"),
    );
  });

  it("só a saudação quando nada foi preenchido", () => {
    expect(montarMensagem(vazio)).toBe("Olá, Fênix! Vim pelo site.");
  });

  it("exige nome e assunto", () => {
    expect(errosMensagem({ nome: "M", assunto: "" })).toEqual({
      nome: "Escreva seu nome.",
      assunto: "Escolha uma opção.",
    });
    expect(errosMensagem({ nome: "Maria", assunto: "Calibragem" })).toEqual({ nome: "", assunto: "" });
  });

  it("o chip do hero entra no texto do WhatsApp", () => {
    expect(mensagemHero(null)).toBe("Olá! Vim pelo site da Fênix.");
    expect(mensagemHero("furo")).toBe("Olá! Vim pelo site da Fênix. Meu pneu furou, vocês consertam?");
  });
});

describe("pedido com a loja fechada", () => {
  it("mascara o telefone enquanto digita", () => {
    expect(mascaraTelefone("9")).toBe("(9");
    expect(mascaraTelefone("98981")).toBe("(98) 981");
    expect(mascaraTelefone("9836531234")).toBe("(98) 3653-1234");
    expect(mascaraTelefone("98981796941")).toBe("(98) 98179-6941");
    expect(mascaraTelefone("989817969419999")).toBe("(98) 98179-6941");
  });

  it("valida nome e telefone com DDD", () => {
    expect(errosPedido({ nome: "Jo", telefone: "(98) 98179-6941" })).toEqual({ nome: "", telefone: "" });
    expect(errosPedido({ nome: "", telefone: "(98) 9817" }).telefone).toBe("Confira o número com DDD.");
  });

  it("vira mensagem de WhatsApp quando o envio falha", () => {
    expect(pedidoComoMensagem({ nome: "Ana", telefone: "", detalhes: "Furou na BR" })).toBe(
      "Olá, Fênix! Vim pelo site e a loja estava fechada.\nMeu nome é Ana.\nFurou na BR",
    );
  });

  it("diz quando a loja retorna o pedido", () => {
    expect(statusAtendimento(new Date("2026-11-11T09:00:00Z")).retorno).toBe("hoje a partir das 7h20");
    expect(statusAtendimento(new Date("2026-11-11T23:00:00Z")).retorno).toBe("amanhã a partir das 7h20");
    expect(statusAtendimento(new Date("2026-11-14T23:00:00Z")).retorno).toBe("na segunda a partir das 7h20");
    expect(statusAtendimento(new Date("2026-11-15T15:00:00Z")).retorno).toBe("na segunda a partir das 7h20");
  });

  it("simula a loja fechada em horário de funcionamento", () => {
    expect(statusAtendimento(new Date("2026-11-11T13:00:00Z"), true)).toMatchObject({
      aberto: false,
      texto: "Fechado agora, abre amanhã às 7h20",
    });
  });
});
