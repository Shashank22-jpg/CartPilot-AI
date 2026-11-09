import React, { useRef, useMemo, Suspense, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { isWebGLAvailable, prefersReducedMotion } from '../../utils/webgl';

// Inner pulsating core
function CoreNexus({ state, reducedMotion }) {
  const meshRef = useRef();
  const wireRef = useRef();

  useFrame((stateObj, delta) => {
    if (!meshRef.current || reducedMotion) return;

    const t = stateObj.clock.getElapsedTime();
    let speed = 0.6;
    let pulseFreq = 2;
    let pulseAmp = 0.08;

    if (state === 'thinking') {
      speed = 2.4;
      pulseFreq = 5;
      pulseAmp = 0.18;
    } else if (state === 'searching') {
      speed = 1.8;
      pulseFreq = 3.5;
      pulseAmp = 0.12;
    } else if (state === 'responding') {
      speed = 1.0;
      pulseFreq = 1.5;
      pulseAmp = 0.14;
    }

    meshRef.current.rotation.y += delta * speed;
    meshRef.current.rotation.x += delta * (speed * 0.5);

    if (wireRef.current) {
      wireRef.current.rotation.y -= delta * (speed * 0.7);
      wireRef.current.rotation.z += delta * (speed * 0.4);
    }

    const scale = 1 + Math.sin(t * pulseFreq) * pulseAmp;
    meshRef.current.scale.set(scale, scale, scale);
  });

  const coreColor = useMemo(() => {
    if (state === 'thinking') return new THREE.Color('#a855f7');
    if (state === 'searching') return new THREE.Color('#00f0ff');
    if (state === 'responding') return new THREE.Color('#38bdf8');
    return new THREE.Color('#6366f1');
  }, [state]);

  return (
    <group>
      {/* High-density inner energy icosahedron */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[0.7, 2]} />
        <meshStandardMaterial
          color={coreColor}
          emissive={coreColor}
          emissiveIntensity={state === 'thinking' ? 1.6 : 0.9}
          roughness={0.2}
          metalness={0.8}
          wireframe={false}
        />
      </mesh>

      {/* Outer wireframe shell */}
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[0.85, 1]} />
        <meshBasicMaterial
          color={state === 'searching' ? '#00f0ff' : '#c084fc'}
          wireframe
          transparent
          opacity={state === 'thinking' ? 0.6 : 0.35}
        />
      </mesh>
    </group>
  );
}

// Translucent glass outer sphere
function GlassShell({ state, reducedMotion }) {
  const shellRef = useRef();

  useFrame((stateObj, delta) => {
    if (!shellRef.current || reducedMotion) return;
    const speed = state === 'thinking' ? 0.8 : 0.25;
    shellRef.current.rotation.y -= delta * speed;
    shellRef.current.rotation.x += delta * (speed * 0.3);
  });

  return (
    <mesh ref={shellRef}>
      <sphereGeometry args={[1.2, 36, 36]} />
      <meshPhysicalMaterial
        color="#0a192f"
        emissive="#0052cc"
        emissiveIntensity={0.15}
        roughness={0.1}
        metalness={0.1}
        transmission={0.85}
        thickness={0.6}
        transparent
        opacity={0.4}
        reflectivity={0.9}
      />
    </mesh>
  );
}

// Orbiting holographic rings
function OrbitRings({ state, reducedMotion }) {
  const ring1Ref = useRef();
  const ring2Ref = useRef();

  useFrame((stateObj, delta) => {
    if (reducedMotion) return;
    const mult = state === 'searching' ? 2.8 : state === 'thinking' ? 1.8 : 0.7;

    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.4 * mult;
      ring1Ref.current.rotation.x += delta * 0.2 * mult;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y += delta * 0.5 * mult;
      ring2Ref.current.rotation.z -= delta * 0.3 * mult;
    }
  });

  return (
    <group>
      <mesh ref={ring1Ref} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.45, 0.015, 16, 64]} />
        <meshBasicMaterial
          color={state === 'searching' ? '#38bdf8' : '#818cf8'}
          transparent
          opacity={0.6}
        />
      </mesh>
      <mesh ref={ring2Ref} rotation={[-Math.PI / 3, Math.PI / 6, 0]}>
        <torusGeometry args={[1.6, 0.012, 16, 64]} />
        <meshBasicMaterial
          color={state === 'thinking' ? '#c084fc' : '#00f0ff'}
          transparent
          opacity={0.45}
        />
      </mesh>
    </group>
  );
}

// Floating constellation particles
function ParticleSwarm({ count = 80, state, reducedMotion }) {
  const pointsRef = useRef();

  const [positions, scales] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sc = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 1.35 + Math.random() * 0.7;

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      sc[i] = Math.random() * 0.5 + 0.5;
    }
    return [pos, sc];
  }, [count]);

  useFrame((stateObj, delta) => {
    if (!pointsRef.current || reducedMotion) return;
    const speed = state === 'searching' ? 2.5 : state === 'thinking' ? 1.4 : 0.5;
    pointsRef.current.rotation.y += delta * 0.3 * speed;
    pointsRef.current.rotation.x += delta * 0.15 * speed;
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
        size={0.045}
        color={state === 'searching' ? '#00f0ff' : '#a78bfa'}
        transparent
        opacity={state === 'searching' ? 0.9 : 0.65}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

// Master Scene inside Canvas
function AIOrbScene({ state = 'idle' }) {
  const groupRef = useRef();
  const reducedMotion = prefersReducedMotion();

  useFrame((stateObj) => {
    if (!groupRef.current || reducedMotion) return;
    const t = stateObj.clock.getElapsedTime();
    // Gentle floating bob
    groupRef.current.position.y = Math.sin(t * 1.2) * 0.08;
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.4} />
      <pointLight position={[3, 3, 4]} color="#38bdf8" intensity={1.8} />
      <pointLight position={[-3, -2, -3]} color="#a855f7" intensity={1.5} />
      <directionalLight position={[0, 4, 2]} color="#ffffff" intensity={0.6} />

      <CoreNexus state={state} reducedMotion={reducedMotion} />
      <GlassShell state={state} reducedMotion={reducedMotion} />
      <OrbitRings state={state} reducedMotion={reducedMotion} />
      <ParticleSwarm state={state} count={75} reducedMotion={reducedMotion} />
    </group>
  );
}

// Fallback CSS Orb for environments without WebGL
function CSSOrbFallback({ state = 'idle', sizeClass }) {
  const stateColor =
    state === 'thinking'
      ? 'from-violet-500 via-purple-500 to-electric-500'
      : state === 'searching'
      ? 'from-cyan-400 via-electric-500 to-blue-600'
      : state === 'responding'
      ? 'from-emerald-400 via-cyan-500 to-electric-600'
      : 'from-electric-500 via-violet-600 to-cyan-400';

  return (
    <div className={`relative flex items-center justify-center ${sizeClass}`}>
      <div
        className={`w-3/4 h-3/4 rounded-full bg-gradient-to-tr ${stateColor} opacity-75 blur-xl animate-pulse`}
      />
      <div className="absolute w-2/3 h-2/3 rounded-full border border-cyan-400/50 bg-gradient-to-tr from-navy-900/80 to-navy-950/90 shadow-glow-blue flex items-center justify-center">
        <div className="w-1/2 h-1/2 rounded-full bg-electric-400/30 blur-sm animate-ping" />
      </div>
    </div>
  );
}

/**
 * Reusable AIOrb Component
 * @param {'idle' | 'thinking' | 'searching' | 'responding'} state Current agent interaction state
 * @param {'sm' | 'md' | 'lg' | 'xl'} size Size variant
 * @param {string} className Extra CSS classes
 */
export default function AIOrb({ state = 'idle', size = 'md', className = '' }) {
  const hasWebGL = useMemo(() => isWebGLAvailable(), []);

  const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-36 h-36',
    lg: 'w-52 h-52',
    xl: 'w-72 h-72',
  };

  const currentSizeClass = sizeClasses[size] || sizeClasses.md;

  if (!hasWebGL) {
    return <CSSOrbFallback state={state} sizeClass={currentSizeClass} />;
  }

  return (
    <div
      className={`relative select-none pointer-events-none flex items-center justify-center ${currentSizeClass} ${className}`}
      aria-label={`CartPilot AI Core State: ${state}`}
    >
      {/* Background ambient glow backdrop */}
      <div
        className={`absolute inset-0 rounded-full blur-2xl transition-all duration-700 pointer-events-none ${
          state === 'thinking'
            ? 'bg-violet-600/25'
            : state === 'searching'
            ? 'bg-cyan-500/25'
            : state === 'responding'
            ? 'bg-emerald-500/20'
            : 'bg-electric-500/20'
        }`}
      />

      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
        className="w-full h-full"
      >
        <Suspense fallback={null}>
          <AIOrbScene state={state} />
        </Suspense>
      </Canvas>
    </div>
  );
}
