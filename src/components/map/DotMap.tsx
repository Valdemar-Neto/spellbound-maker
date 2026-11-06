import { useEffect, useMemo, useRef, useState } from "react";
import { geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { FeatureCollection, Geometry } from "geojson";
import type { Topology, GeometryCollection } from "topojson-specification";
import { gsap, useGSAP, prefersReducedMotion, EASE_OUT, EASE_IN_OUT } from "@/lib/gsap";
import { site } from "@/lib/site";
import { buildDotGrid, createProjection, distanceKm, fitTransform, MARANHAO_CODE, type StateFeature } from "./geo";

const WIDTH = 600;
const HEIGHT = 600;
const STEP = 8;

const CITIES: { name: string; coordinates: [number, number] }[] = [
  { name: "São Luís", coordinates: [-44.3028, -2.5297] },
  { name: "Bacabal", coordinates: [-44.7917, -4.2917] },
  { name: "Zé Doca", coordinates: [-45.6553, -3.2703] },
  { name: "Santa Luzia", coordinates: [-45.69, -4.069] },
];

type StatesTopology = Topology<{ BRUF: GeometryCollection<{ codarea: string }> }>;

const useStates = () => {
  const [states, setStates] = useState<StateFeature[] | null>(null);
  useEffect(() => {
    let cancelled = false;
    fetch(`${import.meta.env.BASE_URL}geo/brasil-uf.topo.json`)
      .then((r) => r.json() as Promise<StatesTopology>)
      .then((topo) => {
        const fc = feature(topo, topo.objects.BRUF) as FeatureCollection<Geometry, { codarea: string }>;
        if (!cancelled) setStates(fc.features);
      })
      .catch(() => !cancelled && setStates([]));
    return () => {
      cancelled = true;
    };
  }, []);
  return states;
};

const DotMap = ({ className }: { className?: string }) => {
  const states = useStates();
  const svgRef = useRef<SVGSVGElement>(null);
  const zoomRef = useRef<SVGGElement>(null);

  const scene = useMemo(() => {
    if (!states?.length) return null;
    const collection: FeatureCollection = { type: "FeatureCollection", features: states };
    const projection = createProjection(collection, WIDTH, HEIGHT);
    const path = geoPath(projection);
    const maranhao = states.find((s) => s.properties.codarea === MARANHAO_CODE)!;
    const zoom = fitTransform(path.bounds(maranhao), WIDTH, HEIGHT);
    const [pinX, pinY] = projection(site.coordinates)!;
    return {
      dots: buildDotGrid(states, projection, WIDTH, HEIGHT, STEP, site.coordinates),
      maranhaoPath: path(maranhao) ?? "",
      zoom,
      pin: { x: pinX, y: pinY },
      cities: CITIES.map((c) => {
        const [x, y] = projection(c.coordinates)!;
        // Arco levemente curvado entre o pino e a cidade
        const mx = (pinX + x) / 2 - (y - pinY) * 0.25;
        const my = (pinY + y) / 2 + (x - pinX) * 0.25;
        return {
          ...c,
          x,
          y,
          arc: `M${pinX},${pinY} Q${mx},${my} ${x},${y}`,
          km: distanceKm(site.coordinates, c.coordinates),
        };
      }),
    };
  }, [states]);

  useGSAP(
    () => {
      if (!scene || !zoomRef.current) return;
      const { k, tx, ty } = scene.zoom;
      const setZoom = (s: { k: number; tx: number; ty: number }) =>
        zoomRef.current?.setAttribute("transform", `translate(${s.tx},${s.ty}) scale(${s.k})`);

      if (prefersReducedMotion()) {
        setZoom({ k, tx, ty });
        return;
      }

      const maxDistance = Math.max(...scene.dots.map((d) => d.distance));
      const view = { k: 1, tx: 0, ty: 0 };
      setZoom(view);
      gsap.set(".map-dot", { opacity: 0 });
      gsap.set(".map-overlay", { opacity: 0 });
      gsap.set(".map-arc", { strokeDashoffset: 1 });

      gsap
        .timeline({ scrollTrigger: { trigger: svgRef.current, start: "top 75%", once: true } })
        // Brasil acende em onda a partir de Santa Inês
        .to(".map-dot", {
          opacity: (_, el: SVGCircleElement) => (el.dataset.highlight ? 1 : 0.35),
          duration: 0.5,
          ease: EASE_OUT,
          delay: (i) => (scene.dots[i].distance / maxDistance) * 1.1,
        })
        // Zoom do país para o Maranhão
        .to(view, { k, tx, ty, duration: 1.4, ease: EASE_IN_OUT, onUpdate: () => setZoom(view) }, "-=0.2")
        .to(".map-dot:not([data-highlight])", { opacity: 0.15, duration: 0.6 }, "<")
        .to(".map-overlay", { opacity: 1, duration: 0.5, stagger: 0.05, ease: EASE_OUT }, "-=0.3")
        .to(".map-arc", { strokeDashoffset: 0, duration: 0.9, stagger: 0.12, ease: EASE_OUT }, "<")
        .from(".map-pin", { y: -24 / k, opacity: 0, duration: 0.6, ease: "back.out(2)" }, "<");
    },
    { scope: svgRef, dependencies: [scene] },
  );

  if (!scene) {
    return <div className={`${className} animate-pulse bg-card/40 rounded-lg`} aria-busy="true" />;
  }

  const k = scene.zoom.k;
  const { pin } = scene;

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      className={className}
      role="img"
      aria-label="Mapa do Brasil em pontos, com zoom no Maranhão e a localização da Fênix Borracharia em Santa Inês"
    >
      <defs>
        <radialGradient id="map-fade">
          <stop offset="0.6" stopColor="white" />
          <stop offset="1" stopColor="black" />
        </radialGradient>
        <mask id="map-mask">
          <rect width={WIDTH} height={HEIGHT} fill="url(#map-fade)" />
        </mask>
      </defs>
      <g mask="url(#map-mask)">
        <g ref={zoomRef}>
          {scene.dots.map((d, i) => (
            <circle
              key={i}
              className="map-dot"
              cx={d.x}
              cy={d.y}
              r={STEP * 0.28}
              data-highlight={d.highlight || undefined}
              fill={d.highlight ? "hsl(var(--fire-orange))" : "hsl(var(--muted-foreground))"}
              opacity={d.highlight ? 1 : 0.15}
            />
          ))}

          <path
            className="map-overlay"
            d={scene.maranhaoPath}
            fill="none"
            stroke="hsl(var(--fire-orange))"
            strokeOpacity={0.5}
            strokeWidth={1.2 / k}
          />

          {/* No celular os rótulos ficariam ilegíveis: mostra só o pino */}
          {scene.cities.map((c) => (
            <g key={c.name} className="max-sm:hidden">
              <path
                className="map-arc"
                d={c.arc}
                pathLength={1}
                strokeDasharray={1}
                fill="none"
                stroke="hsl(var(--fire-yellow))"
                strokeOpacity={0.7}
                strokeWidth={1.5 / k}
              />
              <g className="map-overlay">
                <circle cx={c.x} cy={c.y} r={3 / k} fill="hsl(var(--foreground))" />
                <text
                  x={c.x + 7 / k}
                  y={c.y + 4 / k}
                  fontSize={14 / k}
                  className="font-body"
                  fill="hsl(var(--foreground))"
                  paintOrder="stroke"
                  stroke="hsl(var(--background))"
                  strokeWidth={3 / k}
                >
                  {c.name}
                  <tspan fill="hsl(var(--muted-foreground))"> ~{c.km} km</tspan>
                </text>
              </g>
            </g>
          ))}

          <g className="map-pin">
            <circle className="map-pulse" cx={pin.x} cy={pin.y} r={14 / k} fill="hsl(var(--fire-red))" />
            <circle
              cx={pin.x}
              cy={pin.y}
              r={6 / k}
              fill="hsl(var(--fire-red))"
              stroke="hsl(var(--foreground))"
              strokeWidth={2 / k}
            />
            <text
              x={pin.x + 11 / k}
              y={pin.y + 5 / k}
              fontSize={18 / k}
              className="font-display uppercase max-sm:hidden"
              fontWeight={700}
              fill="hsl(var(--foreground))"
              paintOrder="stroke"
              stroke="hsl(var(--background))"
              strokeWidth={4 / k}
            >
              Fênix Borracharia
            </text>
          </g>
        </g>
      </g>
    </svg>
  );
};

export default DotMap;
