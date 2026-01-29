import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import * as THREE from "three";

// Drone body component
const DroneBody = () => {
  return (
    <group>
      {/* Main body - center */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.8, 0.15, 0.8]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Front camera housing */}
      <mesh position={[0, -0.05, 0.5]}>
        <boxGeometry args={[0.25, 0.15, 0.3]} />
        <meshStandardMaterial color="#0f0f1a" metalness={0.9} roughness={0.1} />
      </mesh>
      
      {/* Camera lens */}
      <mesh position={[0, -0.05, 0.68]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.05, 16]} />
        <meshStandardMaterial color="#111" metalness={1} roughness={0} />
      </mesh>
      
      {/* LED strips on body */}
      <mesh position={[0.35, 0, 0]}>
        <boxGeometry args={[0.15, 0.02, 0.6]} />
        <meshStandardMaterial color="#0ea5e9" emissive="#0ea5e9" emissiveIntensity={2} />
      </mesh>
      <mesh position={[-0.35, 0, 0]}>
        <boxGeometry args={[0.15, 0.02, 0.6]} />
        <meshStandardMaterial color="#0ea5e9" emissive="#0ea5e9" emissiveIntensity={2} />
      </mesh>
    </group>
  );
};

// Drone arm with motor and propeller
const DroneArm = ({ position, rotation }: { position: [number, number, number]; rotation: number }) => {
  const propellerRef = useRef<THREE.Mesh>(null);
  
  useFrame((_, delta) => {
    if (propellerRef.current) {
      propellerRef.current.rotation.y += delta * 50;
    }
  });
  
  return (
    <group position={position}>
      {/* Arm */}
      <mesh rotation={[0, rotation, 0]}>
        <boxGeometry args={[0.12, 0.08, 0.7]} />
        <meshStandardMaterial color="#0ea5e9" metalness={0.7} roughness={0.3} />
      </mesh>
      
      {/* Motor housing */}
      <mesh position={[Math.sin(rotation) * 0.35, 0.08, Math.cos(rotation) * 0.35]}>
        <cylinderGeometry args={[0.1, 0.12, 0.15, 8]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Motor LED */}
      <mesh position={[Math.sin(rotation) * 0.35, 0.02, Math.cos(rotation) * 0.35]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshStandardMaterial color="#0ea5e9" emissive="#0ea5e9" emissiveIntensity={3} />
      </mesh>
      
      {/* Propeller */}
      <mesh 
        ref={propellerRef} 
        position={[Math.sin(rotation) * 0.35, 0.18, Math.cos(rotation) * 0.35]}
      >
        <cylinderGeometry args={[0.35, 0.35, 0.02, 32]} />
        <meshStandardMaterial color="#2a2a3e" metalness={0.5} roughness={0.5} transparent opacity={0.4} />
      </mesh>
      
      {/* Antenna (for front arms) */}
      {rotation > 0 && rotation < Math.PI && (
        <mesh position={[Math.sin(rotation) * 0.35, 0.25, Math.cos(rotation) * 0.35]}>
          <cylinderGeometry args={[0.015, 0.01, 0.15, 8]} />
          <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
        </mesh>
      )}
    </group>
  );
};

// Complete drone model
const DroneModel = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  // Random flying path using sin/cos
  const timeOffset = useMemo(() => Math.random() * 100, []);
  
  useFrame(({ clock }) => {
    if (groupRef.current) {
      const t = clock.getElapsedTime() + timeOffset;
      
      // Random flying movement
      groupRef.current.position.x = Math.sin(t * 0.3) * 2 + Math.sin(t * 0.7) * 0.5;
      groupRef.current.position.y = Math.sin(t * 0.5) * 0.8 + Math.cos(t * 0.3) * 0.3;
      groupRef.current.position.z = Math.cos(t * 0.4) * 1.5 + Math.sin(t * 0.6) * 0.5;
      
      // Tilt based on movement direction
      groupRef.current.rotation.z = Math.sin(t * 0.3) * 0.15;
      groupRef.current.rotation.x = Math.cos(t * 0.4) * 0.1;
      groupRef.current.rotation.y = Math.sin(t * 0.2) * 0.3;
    }
  });
  
  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={groupRef} scale={1.2}>
        <DroneBody />
        
        {/* Four arms at 45-degree angles */}
        <DroneArm position={[0, 0, 0]} rotation={Math.PI / 4} />
        <DroneArm position={[0, 0, 0]} rotation={(3 * Math.PI) / 4} />
        <DroneArm position={[0, 0, 0]} rotation={(-Math.PI) / 4} />
        <DroneArm position={[0, 0, 0]} rotation={(-3 * Math.PI) / 4} />
        
        {/* Point light from drone */}
        <pointLight position={[0, -0.2, 0]} color="#0ea5e9" intensity={2} distance={3} />
      </group>
    </Float>
  );
};

// Main component with Canvas
const FlyingDrone = () => {
  return (
    <div className="absolute inset-0 z-20" style={{ pointerEvents: "none" }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent", pointerEvents: "none" }}
        eventSource={undefined}
        eventPrefix="client"
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
        <directionalLight position={[-5, 3, -5]} intensity={0.5} color="#0ea5e9" />
        <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={0.5} color="#0ea5e9" />
        
        <DroneModel />
        
        <Environment preset="night" />
      </Canvas>
    </div>
  );
};

export default FlyingDrone;
