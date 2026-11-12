import * as THREE from "three";

/** Raio do aro (unidade da cena: raio externo do pneu = 1). */
export const RIM_RADIUS = 0.59;
const TIRE_HALF_WIDTH = 0.29;

export const TEXTURE_WIDTH = 4096;
export const TEXTURE_HEIGHT = 1024;
export const DEFAULT_FONT = "'Big Shoulders Display', 'Arial Narrow', sans-serif";

/** Perfil da seção do pneu (raio, largura) girado em torno do eixo para formar a carcaça. */
export function tireProfile(): THREE.Vector2[] {
  const points: [number, number][] = [
    [RIM_RADIUS, 0.235], [0.66, 0.272], [0.76, 0.292], [0.86, 0.288], [0.935, 0.262], [0.978, 0.215],
    [0.996, 0.15], [1, 0.06], [1, -0.06], [0.996, -0.15], [0.978, -0.215], [0.935, -0.262],
    [0.86, -0.288], [0.76, -0.292], [0.66, -0.272], [RIM_RADIUS, -0.235],
  ];
  return new THREE.SplineCurve(points.map(([x, y]) => new THREE.Vector2(x, y))).getSpacedPoints(180);
}

export interface ProfileRegions {
  /** Faixa (em v, 0..1) da banda de rodagem. */
  tread: [number, number];
  /** Faixa (em v, 0..1) da lateral onde vai a inscrição. */
  sidewall: [number, number];
}

/** Descobre, no espaço de UV do torno, onde ficam a banda de rodagem e a lateral. */
export function profileRegions(profile: THREE.Vector2[]): ProfileRegions {
  const last = profile.length - 1;
  let start: number | null = null;
  let end = 0;
  profile.forEach((p, i) => {
    if (p.x > 0.985) {
      if (start === null) start = i / last;
      end = i / last;
    }
  });
  const treadStart = start ?? 0.45;
  return { tread: [treadStart, end], sidewall: [0.06, Math.max(0.1, treadStart - 0.12)] };
}

export const sidewallText = (medida: string) => `  FÊNIX PNEUS   ${medida}   DEUS É FIEL   ${medida}  `;

/**
 * Desenha a textura de cor e o bump map do pneu: banda de rodagem com sulcos
 * e a inscrição em alto-relevo nas duas laterais.
 */
export function drawTireTextures(
  color: HTMLCanvasElement,
  bump: HTMLCanvasElement,
  medida: string,
  regions: ProfileRegions,
  font = DEFAULT_FONT,
) {
  const W = TEXTURE_WIDTH;
  const H = TEXTURE_HEIGHT;
  for (const c of [color, bump]) {
    c.width = W;
    c.height = H;
  }
  const co = color.getContext("2d");
  const bo = bump.getContext("2d");
  if (!co || !bo) return;
  const y = (v: number) => (1 - v) * H;

  co.fillStyle = "#1b1a19";
  co.fillRect(0, 0, W, H);
  bo.fillStyle = "#7a7a7a";
  bo.fillRect(0, 0, W, H);

  // Banda de rodagem
  const top = y(regions.tread[1]);
  const h = y(regions.tread[0]) - top;
  bo.fillStyle = "#e6e6e6";
  bo.fillRect(0, top, W, h);
  co.fillStyle = "#121212";
  co.fillRect(0, top, W, h);

  // Sulcos longitudinais
  bo.fillStyle = "#111";
  co.fillStyle = "#0b0b0b";
  for (const f of [0.18, 0.4, 0.6, 0.82]) {
    const m = top + h * f;
    bo.fillRect(0, m - h * 0.028, W, h * 0.056);
    co.fillRect(0, m - h * 0.028, W, h * 0.056);
  }

  // Sulcos transversais em zigue-zague
  const step = 64;
  bo.strokeStyle = "#111";
  co.strokeStyle = "#0b0b0b";
  for (let x = 0; x < W + step; x += step) {
    for (const ctx of [bo, co]) {
      ctx.lineWidth = 7;
      ctx.beginPath();
      ctx.moveTo(x, top);
      ctx.lineTo(x + 18, top + h * 0.18);
      ctx.moveTo(x + 22, top + h * 0.18);
      ctx.lineTo(x + 6, top + h * 0.4);
      ctx.moveTo(x + 6, top + h * 0.6);
      ctx.lineTo(x + 22, top + h * 0.82);
      ctx.moveTo(x + 18, top + h * 0.82);
      ctx.lineTo(x, top + h);
      ctx.stroke();
    }
    bo.lineWidth = 3;
    bo.beginPath();
    bo.moveTo(x + 32, top + h * 0.42);
    bo.lineTo(x + 40, top + h * 0.58);
    bo.stroke();
  }

  // Inscrição nas duas laterais (a de trás espelhada para ler do lado certo)
  const [s0, s1] = regions.sidewall;
  const text = sidewallText(medida);
  for (const [from, to, mirrored] of [
    [s0, s1, false],
    [1 - s1, 1 - s0, true],
  ] as const) {
    const bandTop = y(to);
    const bandH = y(from) - bandTop;
    const size = Math.round(bandH * 0.62);
    const center = bandTop + bandH * 0.5;
    for (const [ctx, fill] of [
      [bo, "#ffffff"],
      [co, "#5a5550"],
    ] as const) {
      ctx.save();
      ctx.font = `800 ${size}px ${font}`;
      ctx.textBaseline = "middle";
      ctx.fillStyle = fill;
      const textW = ctx.measureText(text).width;
      const repeats = Math.max(1, Math.round(W / textW));
      if (mirrored) {
        ctx.translate(0, center * 2);
        ctx.scale(1, -1);
      } else {
        ctx.translate(W, 0);
        ctx.scale(-1, 1);
      }
      ctx.scale(W / (textW * repeats), 1);
      for (let i = 0; i < repeats; i++) ctx.fillText(text, i * textW, center);
      ctx.restore();
    }
  }

  // Friso do talão
  bo.fillStyle = "#d0d0d0";
  bo.fillRect(0, y(0.03) - 6, W, 6);
}

/** Roda de liga com 5 raios, cubo e calota laranja. */
export function buildRim(): THREE.Group {
  const group = new THREE.Group();
  const metal = new THREE.MeshStandardMaterial({ color: "#B9BCC2", metalness: 0.95, roughness: 0.28 });
  const dark = new THREE.MeshStandardMaterial({
    color: "#2a2b2e",
    metalness: 0.85,
    roughness: 0.45,
    side: THREE.DoubleSide,
  });
  const accent = new THREE.MeshStandardMaterial({ color: "#FF6A2B", metalness: 0.4, roughness: 0.35 });

  const barrel = new THREE.Mesh(
    new THREE.CylinderGeometry(RIM_RADIUS - 0.005, RIM_RADIUS - 0.005, TIRE_HALF_WIDTH * 1.6, 128, 1, true),
    dark,
  );
  barrel.rotation.x = Math.PI / 2;
  group.add(barrel);

  // Face com 5 janelas entre os raios
  const face = new THREE.Shape();
  face.absarc(0, 0, RIM_RADIUS - 0.045, 0, Math.PI * 2, false);
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2 + Math.PI / 5;
    const inner = 0.16;
    const outer = RIM_RADIUS - 0.07;
    const spread = 0.5;
    const hole = new THREE.Path();
    hole.moveTo(Math.cos(a - spread * 0.55) * inner * 1.25, Math.sin(a - spread * 0.55) * inner * 1.25);
    hole.absarc(0, 0, outer, a - spread, a + spread, false);
    hole.lineTo(Math.cos(a + spread * 0.55) * inner * 1.25, Math.sin(a + spread * 0.55) * inner * 1.25);
    hole.closePath();
    face.holes.push(hole);
  }

  const lip = new THREE.Shape();
  lip.absarc(0, 0, RIM_RADIUS + 0.035, 0, Math.PI * 2, false);
  const lipHole = new THREE.Path();
  lipHole.absarc(0, 0, RIM_RADIUS - 0.05, 0, Math.PI * 2, true);
  lip.holes.push(lipHole);

  const lipMesh = new THREE.Mesh(
    new THREE.ExtrudeGeometry(lip, {
      depth: 0.03,
      bevelEnabled: true,
      bevelThickness: 0.012,
      bevelSize: 0.01,
      bevelSegments: 3,
      curveSegments: 96,
    }),
    metal,
  );
  lipMesh.position.z = 0.215;
  group.add(lipMesh);

  const back = new THREE.Mesh(new THREE.CylinderGeometry(RIM_RADIUS - 0.01, RIM_RADIUS - 0.01, 0.01, 96), dark);
  back.rotation.x = Math.PI / 2;
  back.position.z = -0.05;
  group.add(back);

  const faceMesh = new THREE.Mesh(
    new THREE.ExtrudeGeometry(face, {
      depth: 0.05,
      bevelEnabled: true,
      bevelThickness: 0.015,
      bevelSize: 0.012,
      bevelSegments: 3,
      curveSegments: 64,
    }),
    metal,
  );
  faceMesh.position.z = 0.17;
  group.add(faceMesh);

  const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.13, 0.08, 48), metal);
  hub.rotation.x = Math.PI / 2;
  hub.position.z = 0.22;
  group.add(hub);

  const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.065, 0.03, 48), accent);
  cap.rotation.x = Math.PI / 2;
  cap.position.z = 0.265;
  group.add(cap);

  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2;
    const nut = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.04, 6), metal);
    nut.rotation.x = Math.PI / 2;
    nut.position.set(Math.cos(a) * 0.155, Math.sin(a) * 0.155, 0.255);
    group.add(nut);
  }

  return group;
}

/** Sombra de contato suave sob o pneu (gradiente radial num plano). */
export function buildContactShadow(): THREE.Mesh {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 256;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    g.addColorStop(0, "rgba(0,0,0,0.55)");
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 256, 256);
  }
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(2.6, 0.9),
    new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(canvas), transparent: true, depthWrite: false }),
  );
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.y = -1.02;
  return mesh;
}

/** Libera geometrias, materiais e texturas de um objeto. */
export function disposeObject(root: THREE.Object3D) {
  root.traverse((obj) => {
    const mesh = obj as THREE.Mesh;
    if (!mesh.isMesh) return;
    mesh.geometry.dispose();
    const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
    for (const m of materials) {
      for (const value of Object.values(m)) if (value instanceof THREE.Texture) value.dispose();
      m.dispose();
    }
  });
}
