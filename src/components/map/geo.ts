import { geoContains, geoDistance, geoMercator, geoPath, type GeoProjection } from "d3-geo";
import type { Feature, FeatureCollection, Geometry } from "geojson";

export type StateFeature = Feature<Geometry, { codarea: string }>;

export interface Dot {
  x: number;
  y: number;
  /** Ponto dentro do estado em destaque. */
  highlight: boolean;
  /** Distância (px) até o pino, usada para a onda de revelação. */
  distance: number;
}

export const MARANHAO_CODE = "21";
const EARTH_RADIUS_KM = 6371;

export const createProjection = (states: FeatureCollection, width: number, height: number) =>
  geoMercator().fitSize([width, height], states);

/**
 * Gera a grade pontilhada (estilo halftone) só dentro do contorno do país.
 * Cada estado é testado primeiro pelo retângulo projetado, e só então com geoContains.
 */
export function buildDotGrid(
  states: StateFeature[],
  projection: GeoProjection,
  width: number,
  height: number,
  step: number,
  pin: [number, number],
  highlightCode = MARANHAO_CODE,
): Dot[] {
  const path = geoPath(projection);
  const boxes = states.map((f) => ({ feature: f, bounds: path.bounds(f) }));
  const [px, py] = projection(pin) ?? [0, 0];
  const dots: Dot[] = [];

  for (let y = step / 2; y < height; y += step) {
    for (let x = step / 2; x < width; x += step) {
      const lonLat = projection.invert?.([x, y]);
      if (!lonLat) continue;
      const hit = boxes.find(
        ({ feature, bounds: [[x0, y0], [x1, y1]] }) =>
          x >= x0 && x <= x1 && y >= y0 && y <= y1 && geoContains(feature, lonLat),
      );
      if (!hit) continue;
      dots.push({
        x,
        y,
        highlight: hit.feature.properties.codarea === highlightCode,
        distance: Math.hypot(x - px, y - py),
      });
    }
  }
  return dots;
}

/** Distância em linha reta, arredondada de 5 em 5 km. */
export const distanceKm = (a: [number, number], b: [number, number]) =>
  Math.round((geoDistance(a, b) * EARTH_RADIUS_KM) / 5) * 5;

/** Transformação SVG que enquadra `bounds` no viewport, com folga. */
export function fitTransform(
  [[x0, y0], [x1, y1]]: [[number, number], [number, number]],
  width: number,
  height: number,
  padding = 0.75,
) {
  const k = Math.min(width / (x1 - x0), height / (y1 - y0)) * padding;
  return { k, tx: width / 2 - k * ((x0 + x1) / 2), ty: height / 2 - k * ((y0 + y1) / 2) };
}
