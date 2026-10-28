import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function QuantumCore({ mouse }) {
  const outerSphereRef = useRef();
  const innerIcosahedronRef = useRef();
  const particleGroupRef = useRef();

  // Procedural particles (1,500 points) with Sky Blue, Cyan & Pure White tints
  const [particlePositions, particleColors] = useMemo(() => {
    const count = 1500;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const colorSky = new THREE.Color("#7EAFD0");
    const colorCyan = new THREE.Color("#00F0FF");
    const colorWhite = new THREE.Color("#FFFFFF");

    for (let i = 0; i < count; i++) {
      const radius = 3.2 + Math.random() * 4.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const mixed = Math.random() > 0.4
        ? colorSky.clone().lerp(colorCyan, Math.random())
        : colorWhite;

      colors[i * 3] = mixed.r;
      colors[i * 3 + 1] = mixed.g;
      colors[i * 3 + 2] = mixed.b;
    }

    return [positions, colors];
  }, []);

  useFrame((state, delta) => {
    const targetX = mouse.current[0] * 0.75;
    const targetY = mouse.current[1] * 0.75;

    // Outer wireframe sphere rotation with mouse lag interpolation
    if (outerSphereRef.current) {
      outerSphereRef.current.rotation.y += delta * 0.2;
      outerSphereRef.current.rotation.x += delta * 0.1;
      outerSphereRef.current.rotation.y = THREE.MathUtils.lerp(
        outerSphereRef.current.rotation.y,
        outerSphereRef.current.rotation.y + targetX * 0.35,
        0.05
      );
      outerSphereRef.current.rotation.x = THREE.MathUtils.lerp(
        outerSphereRef.current.rotation.x,
        targetY * 0.35,
        0.05
      );
    }

    // Inner icosahedron counter-rotation
    if (innerIcosahedronRef.current) {
      innerIcosahedronRef.current.rotation.y -= delta * 0.35;
      innerIcosahedronRef.current.rotation.z += delta * 0.15;
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2.2) * 0.06;
      innerIcosahedronRef.current.scale.set(pulse, pulse, pulse);
    }

    // Particles slow ambient revolution
    if (particleGroupRef.current) {
      particleGroupRef.current.rotation.y += delta * 0.06;
    }
  });

  return (
    <group>
      {/* Outer Wireframe Sphere */}
      <mesh ref={outerSphereRef}>
        <sphereGeometry args={[2.2, 24, 24]} />
        <meshBasicMaterial
          wireframe
          color="#7EAFD0"
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Inner Energy Core */}
      <mesh ref={innerIcosahedronRef}>
        <icosahedronGeometry args={[1.25, 2]} />
        <meshStandardMaterial
          wireframe
          color="#00F0FF"
          emissive="#7EAFD0"
          emissiveIntensity={0.8}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* Atmospheric Star / Data Swarm */}
      <points ref={particleGroupRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[particleColors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.035}
          vertexColors
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

export default function HeroCanvas({ mousePosition }) {
  const mouseRef = useRef([0, 0]);

  if (mousePosition) {
    mouseRef.current = mousePosition;
  }

  const handlePointerMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseRef.current = [
      (clientX / innerWidth) * 2 - 1,
      -(clientY / innerHeight) * 2 + 1,
    ];
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      className="absolute inset-0 w-full h-full pointer-events-none"
    >
      <Canvas
        camera={{ position: [0, 0, 6.2], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          alpha: true,
        }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#7EAFD0" />
        <pointLight position={[-10, -10, -10]} intensity={1.0} color="#00F0FF" />
        <QuantumCore mouse={mouseRef} />
      </Canvas>
    </div>
  );
}
