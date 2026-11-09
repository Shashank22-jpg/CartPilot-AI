import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { isWebGLAvailable, prefersReducedMotion } from '../../utils/webgl';

// Procedural 3D Laptop
function Laptop({ mousePos, reducedMotion }) {
  const laptopRef = useRef();

  useFrame((state, delta) => {
    if (!laptopRef.current || reducedMotion) return;
    const t = state.clock.getElapsedTime();
    laptopRef.current.position.y = -0.3 + Math.sin(t * 1.1) * 0.04;
    laptopRef.current.rotation.y = -0.25 + (mousePos.current.x * 0.15);
    laptopRef.current.rotation.x = 0.12 + (mousePos.current.y * 0.1);
  });

  return (
    <group ref={laptopRef} position={[0, -0.3, -0.2]}>
      {/* Laptop Base Chassis */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.0, 0.06, 1.4]} />
        <meshStandardMaterial
          color="#1e293b"
          metalness={0.85}
          roughness={0.25}
        />
      </mesh>

      {/* Trackpad */}
      <mesh position={[0, 0.035, 0.35]}>
        <boxGeometry args={[0.65, 0.005, 0.45]} />
        <meshStandardMaterial
          color="#334155"
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>

      {/* Keyboard Bed */}
      <mesh position={[0, 0.035, -0.2]}>
        <boxGeometry args={[1.7, 0.008, 0.7]} />
        <meshStandardMaterial
          color="#0f172a"
          metalness={0.6}
          roughness={0.5}
          emissive="#38bdf8"
          emissiveIntensity={0.08}
        />
      </mesh>

      {/* Display Lid (Hinged at back) */}
      <group position={[0, 0.04, -0.7]} rotation={[-1.15, 0, 0]}>
        {/* Lid Back Frame */}
        <mesh position={[0, 0.7, -0.02]}>
          <boxGeometry args={[2.0, 1.4, 0.04]} />
          <meshStandardMaterial
            color="#1e293b"
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>
        {/* Screen Bezel & Panel */}
        <mesh position={[0, 0.7, 0.005]}>
          <boxGeometry args={[1.9, 1.3, 0.01]} />
          <meshStandardMaterial
            color="#0284c7"
            emissive="#0284c7"
            emissiveIntensity={0.65}
            roughness={0.1}
            metalness={0.3}
          />
        </mesh>
      </group>
    </group>
  );
}

// Procedural 3D Smartphone
function Smartphone({ mousePos, reducedMotion }) {
  const phoneRef = useRef();

  useFrame((state, delta) => {
    if (!phoneRef.current || reducedMotion) return;
    const t = state.clock.getElapsedTime();
    phoneRef.current.position.y = 0.15 + Math.sin(t * 1.3 + 1.2) * 0.06;
    phoneRef.current.rotation.y = 0.45 + (mousePos.current.x * 0.2);
    phoneRef.current.rotation.z = -0.15 + Math.cos(t * 0.8) * 0.03;
  });

  return (
    <group ref={phoneRef} position={[1.4, 0.15, 0.5]} rotation={[0.2, 0.45, -0.15]}>
      {/* Body Frame */}
      <mesh>
        <boxGeometry args={[0.7, 1.45, 0.05]} />
        <meshStandardMaterial
          color="#0f172a"
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>

      {/* Outer Metallic Rim */}
      <mesh>
        <boxGeometry args={[0.72, 1.47, 0.045]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#0284c7"
          emissiveIntensity={0.3}
          metalness={0.95}
          roughness={0.1}
        />
      </mesh>

      {/* Glowing OLED Display */}
      <mesh position={[0, 0, 0.028]}>
        <planeGeometry args={[0.66, 1.4]} />
        <meshStandardMaterial
          color="#6366f1"
          emissive="#818cf8"
          emissiveIntensity={0.7}
          roughness={0.15}
        />
      </mesh>
    </group>
  );
}

// Procedural 3D Over-Ear Headphones
function Headphones({ mousePos, reducedMotion }) {
  const hpRef = useRef();

  useFrame((state, delta) => {
    if (!hpRef.current || reducedMotion) return;
    const t = state.clock.getElapsedTime();
    hpRef.current.position.y = -0.1 + Math.sin(t * 1.2 + 2.5) * 0.05;
    hpRef.current.rotation.y = -0.6 + (mousePos.current.x * 0.18);
    hpRef.current.rotation.x = -0.1 + Math.sin(t * 0.9) * 0.04;
  });

  return (
    <group ref={hpRef} position={[-1.35, -0.1, 0.4]} rotation={[-0.1, -0.6, 0.2]}>
      {/* Curved Headband */}
      <mesh position={[0, 0.35, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.55, 0.045, 16, 40, Math.PI]} />
        <meshStandardMaterial
          color="#334155"
          metalness={0.8}
          roughness={0.3}
        />
      </mesh>

      {/* Left Earcup */}
      <group position={[-0.55, 0.35, 0]} rotation={[0, 0, Math.PI / 2]}>
        <mesh position={[0, 0.06, 0]}>
          <cylinderGeometry args={[0.22, 0.22, 0.12, 32]} />
          <meshStandardMaterial
            color="#1e293b"
            metalness={0.9}
            roughness={0.25}
          />
        </mesh>
        {/* Memory foam cushion */}
        <mesh position={[0, 0.13, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.05, 32]} />
          <meshStandardMaterial
            color="#0f172a"
            metalness={0.2}
            roughness={0.8}
          />
        </mesh>
        {/* Glowing Rim */}
        <mesh position={[0, 0.01, 0]}>
          <torusGeometry args={[0.22, 0.01, 16, 32]} />
          <meshBasicMaterial color="#00f0ff" />
        </mesh>
      </group>

      {/* Right Earcup */}
      <group position={[0.55, 0.35, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <mesh position={[0, 0.06, 0]}>
          <cylinderGeometry args={[0.22, 0.22, 0.12, 32]} />
          <meshStandardMaterial
            color="#1e293b"
            metalness={0.9}
            roughness={0.25}
          />
        </mesh>
        <mesh position={[0, 0.13, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.05, 32]} />
          <meshStandardMaterial
            color="#0f172a"
            metalness={0.2}
            roughness={0.8}
          />
        </mesh>
        <mesh position={[0, 0.01, 0]}>
          <torusGeometry args={[0.22, 0.01, 16, 32]} />
          <meshBasicMaterial color="#c084fc" />
        </mesh>
      </group>
    </group>
  );
}

// Composition Scene
function ShowcaseScene({ mousePos }) {
  const reducedMotion = prefersReducedMotion();

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 5, 5]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-3, 2, 2]} intensity={1.2} color="#00d2ff" />
      <pointLight position={[3, -1, 2]} intensity={1.0} color="#a855f7" />

      <Laptop mousePos={mousePos} reducedMotion={reducedMotion} />
      <Smartphone mousePos={mousePos} reducedMotion={reducedMotion} />
      <Headphones mousePos={mousePos} reducedMotion={reducedMotion} />

      {/* Soft Contact Shadow Floor Plane */}
      <mesh position={[0, -1.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[8, 8]} />
        <meshBasicMaterial
          color="#030712"
          transparent
          opacity={0.3}
        />
      </mesh>
    </>
  );
}

// Fallback graphic for environments without WebGL
function CSSShowcaseFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <div className="relative w-48 h-32 rounded-2xl bg-gradient-to-tr from-navy-850 to-navy-900 border border-electric-500/30 p-3 shadow-glow-blue flex flex-col justify-between">
        <div className="flex items-center justify-between text-[10px] text-electric-400 font-mono">
          <span>AI HARDWARE NEXUS</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        </div>
        <div className="flex justify-around items-end text-slate-300 py-2">
          <div className="text-center">
            <div className="w-8 h-8 rounded-lg bg-navy-950 border border-navy-750 flex items-center justify-center text-xs">💻</div>
            <span className="text-[9px] text-slate-400 mt-1 block">Laptops</span>
          </div>
          <div className="text-center">
            <div className="w-7 h-10 rounded-lg bg-navy-950 border border-navy-750 flex items-center justify-center text-xs">📱</div>
            <span className="text-[9px] text-slate-400 mt-1 block">Phones</span>
          </div>
          <div className="text-center">
            <div className="w-8 h-8 rounded-lg bg-navy-950 border border-navy-750 flex items-center justify-center text-xs">🎧</div>
            <span className="text-[9px] text-slate-400 mt-1 block">Audio</span>
          </div>
        </div>
        <div className="text-[9px] text-slate-500 font-mono text-center">
          Interactive 3D Composition
        </div>
      </div>
    </div>
  );
}

/**
 * HeroProductComposition3D Component
 * Renders floating 3D Laptop, Smartphone, and Headphones with responsive lighting
 */
export default function HeroProductComposition3D({ className = '' }) {
  const hasWebGL = useMemo(() => isWebGLAvailable(), []);
  const mousePos = useRef({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    mousePos.current = { x, y };
  };

  const handleMouseLeave = () => {
    mousePos.current = { x: 0, y: 0 };
  };

  if (!hasWebGL) {
    return <CSSShowcaseFallback />;
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative select-none ${className}`}
      aria-label="Interactive 3D Hardware Showcase"
    >
      {/* Background Soft Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-electric-500/10 via-violet-500/10 to-transparent blur-2xl rounded-3xl pointer-events-none" />

      <Canvas
        camera={{ position: [0, 0.4, 4.2], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
        className="w-full h-full"
      >
        <Suspense fallback={null}>
          <ShowcaseScene mousePos={mousePos} />
        </Suspense>
      </Canvas>
    </div>
  );
}
