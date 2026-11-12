import { describe, expect, it } from "vitest";
import { statusAtendimento } from "./horario";
import { formatMedida, MEDIDA_VAZIA, textoFaltando } from "./medida";

// Horários em UTC: Santa Inês = UTC-3. 2026-11-11 é quarta-feira.
const em = (iso: string) => new Date(iso);

describe("statusAtendimento", () => {
  it("aberto em dia útil dentro do horário", () => {
    expect(statusAtendimento(em("2026-11-11T13:00:00Z"))).toMatchObject({
      aberto: true,
      texto: "Aberto agora, fecha às 18h30",
    });
  });

  it("abre às 7h20 e fecha às 18h30 locais", () => {
    expect(statusAtendimento(em("2026-11-11T10:19:00Z")).aberto).toBe(false); // 7h19
    expect(statusAtendimento(em("2026-11-11T10:20:00Z")).aberto).toBe(true); // 7h20
    expect(statusAtendimento(em("2026-11-11T21:29:00Z")).aberto).toBe(true); // 18h29
    expect(statusAtendimento(em("2026-11-11T21:30:00Z")).aberto).toBe(false); // 18h30
  });

  it("antes de abrir diz que abre hoje", () => {
    expect(statusAtendimento(em("2026-11-11T09:00:00Z")).texto).toBe("Fechado agora, abre hoje às 7h20");
  });

  it("depois de fechar num dia de semana diz que abre amanhã", () => {
    expect(statusAtendimento(em("2026-11-11T23:00:00Z")).texto).toBe("Fechado agora, abre amanhã às 7h20");
  });

  it("sábado à noite e domingo dizem que abre segunda", () => {
    expect(statusAtendimento(em("2026-11-14T23:00:00Z")).texto).toBe("Fechado agora, abre segunda às 7h20");
    expect(statusAtendimento(em("2026-11-15T15:00:00Z")).texto).toBe("Fechado agora, abre segunda às 7h20");
  });

  it("sexta à noite diz que abre amanhã (sábado)", () => {
    expect(statusAtendimento(em("2026-11-13T23:00:00Z")).texto).toBe("Fechado agora, abre amanhã às 7h20");
  });
});

describe("medida", () => {
  it("só formata com os três números", () => {
    expect(formatMedida({ largura: "175", perfil: "70", aro: "14" })).toBe("175/70 R14");
    expect(formatMedida({ largura: "175", perfil: "", aro: "14" })).toBeNull();
  });

  it("orienta o que falta escolher com o artigo certo", () => {
    expect(textoFaltando(MEDIDA_VAZIA)).toBe("Escolha os três números para perguntar");
    expect(textoFaltando({ largura: "175", perfil: "", aro: "" })).toBe("Falta escolher o perfil e o aro");
    expect(textoFaltando({ largura: "", perfil: "", aro: "14" })).toBe("Falta escolher a largura e o perfil");
    expect(textoFaltando({ largura: "175", perfil: "70", aro: "" })).toBe("Falta escolher o aro");
    expect(textoFaltando({ largura: "", perfil: "70", aro: "14" })).toBe("Falta escolher a largura");
  });
});
