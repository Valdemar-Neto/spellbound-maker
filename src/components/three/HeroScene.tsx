import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { ScrollTrigger } from "@/lib/gsap";

const TREAD_COUNT = 72;
const EMBER_COUNT = 260;
const FIRE_COLORS = ["#ef1a1a", "#f7731c", "#ffb83d"].map((c) => new THREE.Color(c));

/** Pneu estilizado: carcaça (toro), blocos da banda de rodagem e aro metálico. */
const Tire = ({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) => {
  const group = useRef<THREE.Group>(null);
  const treads = useRef<THREE.InstancedMesh>(null);

  useEffect(() => {
    const mesh = treads.current;
    if (!mesh) return;
    const dummy = new THREE.Object3D();
    for (let i = 0; i < TREAD_COUNT; i++) {
      const angle = (i / TREAD_COUNT) * Math.PI * 2;
      dummy.position.set(Math.cos(angle) * 1.98, Math.sin(angle) * 1.98, 0);
      dummy.rotation.set(0, 0, angle + (i % 2 ? 0.25 : -0.25));
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  }, []);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const p = scrollProgress.current;
    g.rotation.z -= delta * (0.35 + p * 2.5);
    // Parallax suave pelo ponteiro
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, -0.55 + state.pointer.x * 0.25, 0.05);
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, 0.15 - state.pointer.y * 0.15, 0.05);
    g.position.y = THREE.MathUtils.lerp(g.position.y, p * 1.2, 0.1);
  });

  return (
    <group ref={group} rotation={[0.15, -0.55, 0]}>
      <mesh>
        <torusGeometry args={[1.45, 0.52, 48, 160]} />
        <meshStandardMaterial color="#141414" roughness={0.85} metalness={0.05} />
      </mesh>
      <instancedMesh ref={treads} args={[undefined, undefined, TREAD_COUNT]}>
        <boxGeometry args={[0.1, 0.12, 0.78]} />
        <meshStandardMaterial color="#0c0c0c" roughness={0.95} />
      </instancedMesh>
      {/* Aro */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.0, 1.0, 0.5, 64, 1, true]} />
        <meshStandardMaterial color="#9a9a9a" metalness={0.6} roughness={0.35} side={THREE.DoubleSide} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.32, 0.32, 0.56, 32]} />
        <meshStandardMaterial color="#c4c4c4" metalness={0.6} roughness={0.3} />
      </mesh>
      {Array.from({ length: 5 }, (_, i) => (
        <mesh key={i} rotation={[0, 0, (i / 5) * Math.PI * 2]} position={[0, 0, 0.12]}>
          <boxGeometry args={[0.16, 1.9, 0.08]} />
          <meshStandardMaterial color="#b0b0b0" metalness={0.6} roughness={0.35} />
        </mesh>
      ))}
    </group>
  );
};

/** Brasas subindo em loop, em tons de fogo. */
const Embers = () => {
  const points = useRef<THREE.Points>(null);

  const { positions, colors, speeds } = useMemo(() => {
    const positions = new Float32Array(EMBER_COUNT * 3);
    const colors = new Float32Array(EMBER_COUNT * 3);
    const speeds = new Float32Array(EMBER_COUNT);
    for (let i = 0; i < EMBER_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 7;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 3;
      const c = FIRE_COLORS[i % FIRE_COLORS.length];
      colors.set([c.r, c.g, c.b], i * 3);
      speeds[i] = 0.3 + Math.random() * 0.8;
    }
    return { positions, colors, speeds };
  }, []);

  useFrame((state, delta) => {
    const geo = points.current?.geometry;
    if (!geo) return;
    const pos = geo.attributes.position as THREE.BufferAttribute;
    const t = state.clock.elapsedTime;
    for (let i = 0; i < EMBER_COUNT; i++) {
      let y = pos.getY(i) + delta * speeds[i];
      if (y > 3) y = -3;
      pos.setY(i, y);
      pos.setX(i, pos.getX(i) + Math.sin(t * speeds[i] + i) * delta * 0.08);
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.045} vertexColors transparent opacity={0.9} blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  );
};

const HeroScene = () => {
  const wrapper = useRef<HTMLDivElement>(null);
  const scrollProgress = useRef(0);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = wrapper.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    io.observe(el);
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: "bottom top",
      onUpdate: (self) => (scrollProgress.current = self.progress),
    });
    return () => {
      io.disconnect();
      st.kill();
    };
  }, []);

  return (
    <div ref={wrapper} className="absolute inset-0" aria-hidden="true">
      <Canvas
        frameloop={inView ? "always" : "never"}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 6], fov: 40 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.15} />
        <pointLight position={[-2, -3, 2]} intensity={40} color="#f7731c" />
        <pointLight position={[3, 2, 3]} intensity={25} color="#ef1a1a" />
        <directionalLight position={[2, 4, 5]} intensity={0.8} />
        <pointLight position={[0, 0, 4]} intensity={6} color="#ffffff" />
        <Tire scrollProgress={scrollProgress} />
        <Embers />
      </Canvas>
    </div>
  );
};

export default HeroScene;
