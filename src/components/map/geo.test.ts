import { readFileSync } from "node:fs";
import path from "node:path";
import { feature } from "topojson-client";
import { describe, expect, it } from "vitest";
import { buildDotGrid, createProjection, distanceKm, fitTransform, MARANHAO_CODE, type StateFeature } from "./geo";
import { contatos, site, whatsappUrl } from "@/lib/site";

const topo = JSON.parse(readFileSync(path.resolve(__dirname, "../../../public/geo/brasil-uf.topo.json"), "utf8"));
const states = (feature(topo, topo.objects.BRUF) as unknown as { features: StateFeature[] }).features;

describe("mapa GeoJSON", () => {
  const projection = createProjection({ type: "FeatureCollection", features: states }, 600, 600);
  const dots = buildDotGrid(states, projection, 600, 600, 8, site.coordinates);

  it("carrega os 27 estados e encontra o Maranhão", () => {
    expect(states).toHaveLength(27);
    expect(states.some((s) => s.properties.codarea === MARANHAO_CODE)).toBe(true);
  });

  it("gera uma grade pontilhada com o Maranhão destacado", () => {
    expect(dots.length).toBeGreaterThan(1000);
    expect(dots.length).toBeLessThan(3000);
    const highlighted = dots.filter((d) => d.highlight);
    expect(highlighted.length).toBeGreaterThan(20);
    // Os pontos mais próximos do pino estão no Maranhão
    const nearest = [...dots].sort((a, b) => a.distance - b.distance).slice(0, 5);
    expect(nearest.every((d) => d.highlight)).toBe(true);
  });

  it("calcula distância e enquadramento", () => {
    expect(distanceKm(site.coordinates, [-44.3028, -2.5297])).toBeGreaterThan(150);
    const { k } = fitTransform(
      [
        [0, 0],
        [100, 50],
      ],
      600,
      600,
      1,
    );
    expect(k).toBe(6);
  });
});

describe("site", () => {
  it("monta o link do WhatsApp com texto codificado", () => {
    expect(whatsappUrl("Olá! Oi")).toBe("https://wa.me/5598984701635?text=Ol%C3%A1!%20Oi");
    expect(whatsappUrl("Oi", contatos[1])).toBe("https://wa.me/5598981796941?text=Oi");
  });
});
