import { useEffect, useMemo, useRef, useState, type MutableRefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import {
  buildContactShadow,
  buildRim,
  disposeObject,
  drawTireTextures,
  profileRegions,
  TEXTURE_HEIGHT,
  TEXTURE_WIDTH,
  tireProfile,
} from "./tire";

/** Ângulo de repouso: o pneu fica de três-quartos, mostrando a lateral com a medida. */
const REST_YAW = -0.62;
const SPIN_ON_CHANGE = Math.PI * 0.75;
const SPIN_DURATION_MS = 900;
const easeOutExpo = (t: number) => 1 - Math.pow(2, -10 * t);

interface DragState {
  active: boolean;
  lastX: number;
  velocity: number;
  yaw: number;
}

/** Reflexos de estúdio gerados localmente (sem HDR remoto). */
const StudioEnvironment = () => {
  const gl = useThree((s) => s.gl);
  const scene = useThree((s) => s.scene);

  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const room = new RoomEnvironment();
    const env = pmrem.fromScene(room, 0.04).texture;
    scene.environment = env;
    scene.environmentIntensity = 0.7;
    room.dispose();
    pmrem.dispose();
    return () => {
      scene.environment = null;
      env.dispose();
    };
  }, [gl, scene]);

  return null;
};

interface TireProps {
  medida: string;
  reducedMotion: boolean;
  drag: MutableRefObject<DragState>;
  onReady: () => void;
}

const Tire = ({ medida, reducedMotion, drag, onReady }: TireProps) => {
  const gl = useThree((s) => s.gl);
  const yawGroup = useRef<THREE.Group>(null);
  const wheel = useRef<THREE.Group>(null);
  const spinAngle = useRef(0);
  const spin = useRef<{ t0: number } | null>(null);
  const isFirstDraw = useRef(true);
  const readyFired = useRef(false);
  const [fontsReady, setFontsReady] = useState(false);

  const profile = useMemo(tireProfile, []);
  const regions = useMemo(() => profileRegions(profile), [profile]);
  const geometry = useMemo(() => new THREE.LatheGeometry(profile, 320), [profile]);
  const rim = useMemo(buildRim, []);
  const shadow = useMemo(buildContactShadow, []);

  const textures = useMemo(() => {
    // O tamanho tem de ser o final antes do primeiro upload: o three aloca o
    // armazenamento da textura uma vez só (texStorage2D) e não aceita redimensionar.
    const colorCanvas = document.createElement("canvas");
    const bumpCanvas = document.createElement("canvas");
    for (const c of [colorCanvas, bumpCanvas]) {
      c.width = TEXTURE_WIDTH;
      c.height = TEXTURE_HEIGHT;
    }
    drawTireTextures(colorCanvas, bumpCanvas, "175/70 R14", regions);
    const map = new THREE.CanvasTexture(colorCanvas);
    const bumpMap = new THREE.CanvasTexture(bumpCanvas);
    map.colorSpace = THREE.SRGBColorSpace;
    for (const t of [map, bumpMap]) {
      t.wrapS = THREE.RepeatWrapping;
      t.minFilter = THREE.LinearFilter;
      t.anisotropy = gl.capabilities.getMaxAnisotropy();
    }
    return { colorCanvas, bumpCanvas, map, bumpMap };
  }, [gl, regions]);

  // A inscrição usa a fonte de display: espera ela carregar antes de mostrar o pneu.
  useEffect(() => {
    let cancelled = false;
    const done = () => !cancelled && setFontsReady(true);
    if (document.fonts?.load) document.fonts.load("800 64px 'Big Shoulders Display'").then(done, done);
    else done();
    return () => {
      cancelled = true;
    };
  }, []);

  // Redesenha a lateral a cada medida e dá um giro curto como confirmação.
  useEffect(() => {
    drawTireTextures(textures.colorCanvas, textures.bumpCanvas, medida, regions);
    textures.map.needsUpdate = true;
    textures.bumpMap.needsUpdate = true;
    if (isFirstDraw.current) {
      isFirstDraw.current = false;
      return;
    }
    if (!reducedMotion) spin.current = { t0: performance.now() };
  }, [medida, regions, textures, reducedMotion]);

  // Redesenho sem giro quando a fonte termina de carregar.
  useEffect(() => {
    if (!fontsReady) return;
    drawTireTextures(textures.colorCanvas, textures.bumpCanvas, medida, regions);
    textures.map.needsUpdate = true;
    textures.bumpMap.needsUpdate = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps -- só na troca de fonte
  }, [fontsReady]);

  useEffect(
    () => () => {
      geometry.dispose();
      textures.map.dispose();
      textures.bumpMap.dispose();
      disposeObject(rim);
      disposeObject(shadow);
    },
    [geometry, textures, rim, shadow],
  );

  useFrame((state, delta) => {
    const yaw = yawGroup.current;
    const w = wheel.current;
    if (!yaw || !w) return;

    // Arrastar gira no eixo vertical, com inércia e retorno suave ao repouso.
    const d = drag.current;
    if (!d.active) {
      d.velocity *= 0.92;
      d.yaw += d.velocity;
      d.yaw += (REST_YAW - d.yaw) * 0.015;
    }
    d.yaw = THREE.MathUtils.clamp(d.yaw, -1.35, 0.35);
    yaw.rotation.y += (d.yaw - yaw.rotation.y) * 0.18;

    if (!reducedMotion) spinAngle.current += Math.min(0.05, delta) * 0.18;

    let extra = 0;
    if (spin.current) {
      const p = Math.min(1, (performance.now() - spin.current.t0) / SPIN_DURATION_MS);
      extra = SPIN_ON_CHANGE * easeOutExpo(p);
      if (p >= 1) {
        spinAngle.current += SPIN_ON_CHANGE;
        spin.current = null;
        extra = 0;
      }
    }
    const scroll = reducedMotion ? 0 : Math.min(window.scrollY, 1400) * 0.0035;
    w.rotation.z = -(spinAngle.current + extra + scroll);

    // Afasta a câmera em telas estreitas para o pneu caber inteiro.
    const z = state.size.width / state.size.height < 0.9 ? 6.4 : 5.2;
    if (state.camera.position.z !== z) state.camera.position.z = z;

    if (fontsReady && !readyFired.current) {
      readyFired.current = true;
      onReady();
    }
  });

  return (
    <group>
      <group ref={yawGroup} rotation={[0.06, REST_YAW, 0]}>
        <group ref={wheel}>
          <mesh geometry={geometry} rotation={[Math.PI / 2, 0, 0]}>
            <meshStandardMaterial
              map={textures.map}
              bumpMap={textures.bumpMap}
              bumpScale={9}
              roughness={0.78}
              metalness={0}
              side={THREE.DoubleSide}
            />
          </mesh>
          <primitive object={rim} />
        </group>
      </group>
      <primitive object={shadow} />
    </group>
  );
};

interface HeroSceneProps {
  medida: string;
  reducedMotion: boolean;
  onReady: () => void;
}

/** Pneu 3D com a medida escolhida escrita na lateral. Arrastar gira; pausa fora da viewport. */
const HeroScene = ({ medida, reducedMotion, onReady }: HeroSceneProps) => {
  const wrapper = useRef<HTMLDivElement>(null);
  const drag = useRef<DragState>({ active: false, lastX: 0, velocity: 0, yaw: REST_YAW });
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = wrapper.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const endDrag = () => {
    drag.current.active = false;
  };

  return (
    <div
      ref={wrapper}
      role="img"
      aria-label={`Pneu em 3D com a medida ${medida} escrita na lateral. Arraste para girar.`}
      className="absolute inset-0 cursor-grab touch-pan-y active:cursor-grabbing"
      onPointerDown={(e) => {
        drag.current.active = true;
        drag.current.lastX = e.clientX;
        e.currentTarget.setPointerCapture(e.pointerId);
      }}
      onPointerMove={(e) => {
        const d = drag.current;
        if (!d.active) return;
        d.velocity = (e.clientX - d.lastX) * 0.006;
        d.lastX = e.clientX;
        d.yaw += d.velocity;
      }}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    >
      <Canvas
        frameloop={inView ? "always" : "never"}
        dpr={[1, 2]}
        camera={{ fov: 28, near: 0.1, far: 50, position: [0, 0.05, 5.2] }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.25;
        }}
      >
        <StudioEnvironment />
        <directionalLight position={[-2.5, 2.6, 3.2]} color="#FFD2B0" intensity={2.6} />
        <directionalLight position={[3.2, 0.8, -2.8]} color="#FF6A2B" intensity={4} />
        <directionalLight position={[-3.5, 0.5, -2.5]} color="#FF8A57" intensity={2} />
        <directionalLight position={[3, 1, 4]} color="#C9D4E3" intensity={0.9} />
        <ambientLight intensity={0.08} />
        <Tire medida={medida} reducedMotion={reducedMotion} drag={drag} onReady={onReady} />
      </Canvas>
    </div>
  );
};

export default HeroScene;
