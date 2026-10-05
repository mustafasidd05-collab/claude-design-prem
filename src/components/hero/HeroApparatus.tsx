'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';

const GIMBAL_RINGS = [
  { radius: 1.45, rotation: [65, 15, 0], speed: 1/28, color: 'oklch(76% 0.17 50 / 0.3)', dash: true },
  { radius: 1.05, rotation: [-40, 55, 0], speed: -1/18, color: 'oklch(82% 0.006 262 / 0.18)', dash: false },
  { radius: 0.65, rotation: [30, -45, 0], speed: 1/12, color: 'oklch(76% 0.17 50 / 0.5)', dash: false },
];

const SATELLITES = [
  { position: [-1.3, -1.05, 0.35], domain: 'CODING', label: 'ENGINEERING', count: '61 SKILLS', color: '#0071e3' },
  { position: [1.3, -0.95, 0.45], domain: 'DESIGN', label: 'UI/UX & 3D', count: '59 SKILLS', color: '#0096d6' },
  { position: [-1.6, 0.2, 0.25], domain: 'QA', label: 'QA & TESTING', count: '17 SKILLS', color: '#ff2d55' },
  { position: [1.6, 0.25, 0.3], domain: 'EXEC', label: 'EXECUTIVE', count: '55 SKILLS', color: '#af52de' },
  { position: [-1.25, 1.35, 0.4], domain: 'SEC', label: 'CYBERSECURITY', count: '38 SKILLS', color: '#ff9f0a' },
  { position: [1.25, 1.35, 0.3], domain: 'AI', label: 'AI/ML SWARMS', count: '45 SKILLS', color: '#34c759' },
];

function GimbalRing({ radius, rotation, speed, color, dash }: typeof GIMBAL_RINGS[0] & { speed: number }) {
  const meshRef = useRef<THREE.Mesh<THREE.TorusGeometry, THREE.MeshBasicMaterial>>(null);
  const startRef = useRef(Math.random() * Math.PI * 2);
  
  useFrame((state) => {
    if (meshRef.current) {
      const elapsed = state.clock.getElapsedTime();
      meshRef.current.rotation.z = startRef.current + elapsed * speed * Math.PI * 2;
    }
  });
  
  return (
    <mesh ref={meshRef} rotation={rotation.map(r => THREE.MathUtils.degToRad(r)) as [number, number, number]}>
      <torusGeometry args={[radius, 0.008, 16, 64]} />
      <meshBasicMaterial 
        color={color} 
        transparent 
        opacity={dash ? 0.35 : 0.18}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function RingTracker({ index, radius }: { index: number; radius: number }) {
  const angles = [-90, 90, 0, 180];
  const angle = angles[index] || 0;
  const x = Math.cos(THREE.MathUtils.degToRad(angle)) * radius;
  const y = Math.sin(THREE.MathUtils.degToRad(angle)) * radius;
  
  return (
    <mesh position={[x, y, 0]}>
      <sphereGeometry args={[0.03, 16, 16]} />
      <meshBasicMaterial color="#e8791a" />
    </mesh>
  );
}

function FoundryCore({ onClick }: { onClick: () => void }) {
  const coreRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [pulsing, setPulsing] = useState(false);
  
  useFrame(() => {
    if (coreRef.current) {
      coreRef.current.rotation.y += 0.002;
    }
  });
  
  const handleClick = () => {
    setPulsing(true);
    onClick();
    setTimeout(() => setPulsing(false), 800);
  };
  
  return (
    <group onClick={handleClick} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
      {/* Radial Flare */}
      <mesh scale={hovered ? 2.3 : 2.0}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshBasicMaterial 
          color="#e8791a" 
          transparent 
          opacity={hovered ? 0.3 : 0.15}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Containment Ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.37, 0.005, 16, 64]} />
        <meshBasicMaterial 
          color="#e8791a" 
          transparent 
          opacity={0.7}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Plasma Orb */}
      <mesh ref={coreRef} position={[0, 0, 0.12]} scale={hovered ? 1.08 : 1}>
        <sphereGeometry args={[0.26, 32, 32]} />
        <meshStandardMaterial 
          color="#e8791a"
          emissive="#e8791a"
          emissiveIntensity={1.5}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
      
      {/* Core Symbol */}
      <mesh position={[0, 0, 0.15]}>
        <planeGeometry args={[0.3, 0.3]} />
        <meshBasicMaterial 
          color="#0d0d0d" 
          transparent 
          opacity={1}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Pulse Wave */}
      {pulsing && (
        <mesh scale={1}>
          <sphereGeometry args={[0.26, 32, 32]} />
          <meshBasicMaterial 
            color="#e8791a" 
            transparent 
            opacity={0.9}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
    </group>
  );
}

function SatelliteNode({ position, label, count, color }: typeof SATELLITES[0]) {
  const [hovered, setHovered] = useState(false);
  
  return (
    <group 
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Orb */}
      <mesh scale={hovered ? 1.06 : 1} position={[0, 0, hovered ? 0.09 : 0]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial 
          color={hovered ? color : '#1f1f1f'}
          roughness={0.3}
          metalness={0.7}
          emissive={hovered ? color : '#000'}
          emissiveIntensity={hovered ? 0.5 : 0}
        />
      </mesh>
      
      {/* Card - using HTML overlay would be better, but keeping simple */}
    </group>
  );
}

function ConduitLines() {
  return (
    <>
      {SATELLITES.map((sat, i) => (
        <line
          key={i}
          points={[
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(sat.position[0], sat.position[1], sat.position[2]),
          ]}
        >
          <lineBasicMaterial 
            color="#3a3a3a" 
            transparent 
            opacity={0.45}
            linewidth={1}
          />
        </line>
      ))}
    </>
  );
}

function HeroApparatus3D() {
  const [shockwave, setShockwave] = useState(false);
  
  const triggerShockwave = () => {
    setShockwave(true);
    setTimeout(() => setShockwave(false), 800);
  };
  
  return (
    <div className="w-full h-[380px] relative">
      <Canvas
        camera={{ position: [0, 0, 3.5], fov: 40 }}
        style={{ width: '100%', height: '100%' }}
        gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0); // Transparent background
        }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 10, 7]} intensity={1.5} />
        <pointLight position={[-3, 5, 3]} color="#e8791a" intensity={0.5} distance={10} decay={2} />
        
        {/* Ambient Halo */}
        <mesh position={[0, 0, -0.15]} scale={1.4}>
          <sphereGeometry args={[1.4, 32, 32]} />
          <meshBasicMaterial 
            color="#e8791a" 
            transparent 
            opacity={0.08}
            side={THREE.DoubleSide}
          />
        </mesh>
        
        {/* Gimbal System */}
        <group>
          {GIMBAL_RINGS.map((ring, i) => (
            <GimbalRing 
              key={i} 
              {...ring} 
              speed={ring.speed}
            >
              {ring.dash && <RingTracker index={0} radius={ring.radius} />}
              {ring.dash && <RingTracker index={1} radius={ring.radius} />}
              {!ring.dash && i === 1 && <RingTracker index={2} radius={ring.radius} />}
              {!ring.dash && i === 2 && <RingTracker index={3} radius={ring.radius} />}
            </GimbalRing>
          ))}
        </group>
        
        {/* Foundry Core */}
        <FoundryCore onClick={triggerShockwave} />
        
        {/* Satellite Nodes */}
        <group>
          {SATELLITES.map((sat, i) => (
            <SatelliteNode key={i} {...sat} />
          ))}
        </group>
        
        {/* Conduit Lines */}
        <ConduitLines />
        
        {/* Shockwave Effect */}
        {shockwave && (
          <mesh position={[0, 0, 0.12]} scale={4.8}>
            <sphereGeometry args={[0.26, 32, 32]} />
            <meshBasicMaterial 
              color="#e8791a" 
              transparent 
              opacity={0}
              side={THREE.DoubleSide}
            />
          </mesh>
        )}
      </Canvas>
    </div>
  );
}

export function HeroApparatus() {
  return (
    <div className="hero__apparatus-wrap flex justify-center items-center perspective-1200" style={{ '--i': 1 }}>
      <motion.div 
        className="apparatus--3d-foundry relative w-[360px] h-[380px] flex items-center justify-center"
        style={{ transformStyle: 'preserve-3d' }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1], delay: 0.26 }}
      >
        <HeroApparatus3D />
      </motion.div>
    </div>
  );
}