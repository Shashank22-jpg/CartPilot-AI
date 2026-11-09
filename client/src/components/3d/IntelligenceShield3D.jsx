import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { isWebGLAvailable, prefersReducedMotion } from '../../utils/webgl';

// Helper to create an extruded 3D Shield Crest
function createShieldShape() {
  const shape = new THREE.Shape();
  // Start top center
  shape.moveTo(0, 1.0);
  // Top right shoulder
  shape.bezierCurveTo(0.4, 1.0, 0.8, 0.85, 0.85, 0.6);
  // Right side tapering down to point
  shape.bezierCurveTo(0.9, 0.1, 0.5, -0.6, 0, -1.05);
  // Left side tapering up
  shape.bezierCurveTo(-0.5, -0.6, -0.9, 0.1, -0.85, 0.6);
  // Top left shoulder
  shape.bezierCurveTo(-0.8, 0.85, -0.4, 1.0, 0, 1.0);
  return shape;
}

function ShieldMesh({ status, reducedMotion }) {
  const shieldRef = useRef();
  const innerRef = useRef();
  const ringRef = useRef();

  const shieldShape = useMemo(() => createShieldShape(), []);
  const extrudeSettings = useMemo(
    () => ({
      depth: 0.1,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.05,
      bevelThickness: 0.05,
    }),
    []
  );

  const colors = useMemo(() => {
    const s = (status || '').toLowerCase();
    if (s.includes('verified') || s.includes('high') || s.includes('pass')) {
      return {
        main: '#0ea5e9',
        emissive: '#06b6d4',
        accent: '#10b981',
        ring: '#34d399',
      };
    }
    if (s.includes('caution') || s.includes('warning') || s.includes('risk')) {
      return {
        main: '#3b82f6',
        emissive: '#f59e0b',
        accent: '#fbbf24',
        ring: '#f59e0b',
      };
    }
    // Default / Sample / Prototype
    return {
      main: '#2563eb',
      emissive: '#8b5cf6',
      accent: '#c084fc',
      ring: '#00f0ff',
    };
  }, [status]);

  useFrame((state, delta) => {
    if (!shieldRef.current || reducedMotion) return;
    const t = state.clock.getElapsedTime();

    // Gentle floating tilt
    shieldRef.current.position.y = Math.sin(t * 1.3) * 0.07;
    shieldRef.current.rotation.y = Math.sin(t * 0.8) * 0.22;
    shieldRef.current.rotation.x = 0.05 + Math.cos(t * 0.9) * 0.04;

    if (innerRef.current) {
      innerRef.current.scale.setScalar(0.78 + Math.sin(t * 2.2) * 0.03);
    }

    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.5;
      ringRef.current.rotation.x += delta * 0.2;
    }
  });

  return (
    <group ref={shieldRef}>
      {/* Outer Armor Crest */}
      <mesh position={[0, 0, -0.05]}>
        <extrudeGeometry args={[shieldShape, extrudeSettings]} />
        <meshPhysicalMaterial
          color={colors.main}
          emissive={colors.emissive}
          emissiveIntensity={0.25}
          metalness={0.85}
          roughness={0.2}
          clearcoat={0.6}
          clearcoatRoughness={0.1}
          reflectivity={0.8}
        />
      </mesh>

      {/* Inner Holographic Lattice */}
      <mesh ref={innerRef} position={[0, 0, 0.08]}>
        <extrudeGeometry
          args={[
            shieldShape,
            { depth: 0.02, bevelEnabled: false },
          ]}
        />
        <meshStandardMaterial
          color={colors.accent}
          emissive={colors.accent}
          emissiveIntensity={0.6}
          wireframe
          transparent
          opacity={0.45}
        />
      </mesh>

      {/* Orbiting Security Guard Ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.35, 0.015, 16, 64]} />
        <meshBasicMaterial color={colors.ring} transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

// Particle Constellation for Shield
function ShieldParticles({ count = 40, status, reducedMotion }) {
  const pointsRef = useRef();

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const r = 1.1 + Math.random() * 0.5;
      pos[i * 3] = r * Math.cos(theta);
      pos[i * 3 + 1] = (Math.random() * 2 - 1) * 1.1;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.8;
    }
    return pos;
  }, [count]);

  useFrame((_, delta) => {
    if (!pointsRef.current || reducedMotion) return;
    pointsRef.current.rotation.y += delta * 0.3;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color={status?.toLowerCase().includes('verified') ? '#34d399' : '#00f0ff'}
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Full 3D Shield Scene
function ShieldScene({ status }) {
  const reducedMotion = prefersReducedMotion();

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 3, 4]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-3, 2, 2]} intensity={1.6} color="#00d2ff" />
      <pointLight position={[3, -2, 2]} intensity={1.4} color="#8b5cf6" />

      <ShieldMesh status={status} reducedMotion={reducedMotion} />
      <ShieldParticles status={status} reducedMotion={reducedMotion} />
    </>
  );
}

// Static CSS Fallback for WebGL-less environments
function CSSShieldFallback({ status, sizeClass }) {
  return (
    <div className={`relative flex items-center justify-center ${sizeClass}`}>
      <div className="w-20 h-24 rounded-2xl bg-gradient-to-b from-electric-600 via-violet-700 to-navy-950 border border-cyan-400/50 shadow-glow-blue flex flex-col items-center justify-center p-2 text-center">
        <div className="w-8 h-8 rounded-full bg-cyan-400/20 flex items-center justify-center mb-1">
          🛡️
        </div>
        <span className="text-[10px] font-mono font-bold text-white uppercase">
          {status || 'Secured'}
        </span>
      </div>
    </div>
  );
}

/**
 * Reusable IntelligenceShield3D Component
 * @param {string} status 'Verified', 'Caution', 'Sample Dossier', etc.
 * @param {'sm' | 'md' | 'lg'} size Variant
 * @param {string} className
 */
export default function IntelligenceShield3D({
  status = 'Sample Dossier',
  size = 'md',
  className = '',
}) {
  const hasWebGL = useMemo(() => isWebGLAvailable(), []);

  const sizeMap = {
    sm: 'w-24 h-28',
    md: 'w-36 h-44',
    lg: 'w-52 h-64',
  };

  const currentSizeClass = sizeMap[size] || sizeMap.md;

  if (!hasWebGL) {
    return <CSSShieldFallback status={status} sizeClass={currentSizeClass} />;
  }

  return (
    <div
      className={`relative select-none pointer-events-none flex items-center justify-center ${currentSizeClass} ${className}`}
      aria-label={`Purchase Intelligence Shield Status: ${status}`}
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-electric-500/15 via-violet-500/15 to-transparent blur-xl rounded-full pointer-events-none" />

      <Canvas
        camera={{ position: [0, 0, 3.4], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
        className="w-full h-full"
      >
        <Suspense fallback={null}>
          <ShieldScene status={status} />
        </Suspense>
      </Canvas>
    </div>
  );
}
