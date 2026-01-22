import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import * as THREE from "three";

interface DroneModelProps {
  scrollProgress: number;
  color?: string;
}

// Drone body component
const DroneBody = ({ color = "#0ea5e9" }: { color?: string }) => {
  return (
    <group>
      {/* Main body - center */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.8, 0.15, 0.8]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Top cover */}
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[0.5, 0.08, 0.5]} />
        <meshStandardMaterial color="#252540" metalness={0.7} roughness={0.3} />
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
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
      </mesh>
      <mesh position={[-0.35, 0, 0]}>
        <boxGeometry args={[0.15, 0.02, 0.6]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
      </mesh>
    </group>
  );
};

// Drone arm with motor and propeller
const DroneArm = ({ position, rotation, color = "#0ea5e9" }: { position: [number, number, number]; rotation: number; color?: string }) => {
  const propellerRef = useRef<THREE.Mesh>(null);
  
  useFrame((_, delta) => {
    if (propellerRef.current) {
      propellerRef.current.rotation.y += delta * 40;
    }
  });
  
  return (
    <group position={position}>
      {/* Arm */}
      <mesh rotation={[0, rotation, 0]}>
        <boxGeometry args={[0.12, 0.08, 0.7]} />
        <meshStandardMaterial color={color} metalness={0.7} roughness={0.3} />
      </mesh>
      
      {/* Motor housing */}
      <mesh position={[Math.sin(rotation) * 0.35, 0.08, Math.cos(rotation) * 0.35]}>
        <cylinderGeometry args={[0.1, 0.12, 0.15, 8]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Motor LED */}
      <mesh position={[Math.sin(rotation) * 0.35, 0.02, Math.cos(rotation) * 0.35]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={3} />
      </mesh>
      
      {/* Propeller */}
      <mesh 
        ref={propellerRef} 
        position={[Math.sin(rotation) * 0.35, 0.18, Math.cos(rotation) * 0.35]}
      >
        <cylinderGeometry args={[0.35, 0.35, 0.02, 32]} />
        <meshStandardMaterial color="#2a2a3e" metalness={0.5} roughness={0.5} transparent opacity={0.4} />
      </mesh>
    </group>
  );
};

// Complete drone model with scroll animation
const DroneModel = ({ scrollProgress, color = "#0ea5e9" }: DroneModelProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  
  // Calculate scale based on viewport
  const scale = Math.min(viewport.width, viewport.height) * 0.15;
  
  useFrame(() => {
    if (groupRef.current) {
      // Smooth scroll-based transformations
      const progress = scrollProgress;
      
      // Position: emerge from background
      groupRef.current.position.z = THREE.MathUtils.lerp(-8, 0, progress);
      groupRef.current.position.y = Math.sin(progress * Math.PI * 0.5) * 0.3;
      
      // Rotation: slow reveal
      groupRef.current.rotation.y = progress * Math.PI * 0.8;
      groupRef.current.rotation.x = Math.sin(progress * Math.PI) * 0.15;
      
      // Scale: grow as it approaches
      const scaleValue = THREE.MathUtils.lerp(0.3, 1, progress);
      groupRef.current.scale.setScalar(scale * scaleValue);
    }
  });
  
  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
      <group ref={groupRef}>
        <DroneBody color={color} />
        
        {/* Four arms at 45-degree angles */}
        <DroneArm position={[0, 0, 0]} rotation={Math.PI / 4} color={color} />
        <DroneArm position={[0, 0, 0]} rotation={(3 * Math.PI) / 4} color={color} />
        <DroneArm position={[0, 0, 0]} rotation={(-Math.PI) / 4} color={color} />
        <DroneArm position={[0, 0, 0]} rotation={(-3 * Math.PI) / 4} color={color} />
        
        {/* Point light from drone */}
        <pointLight position={[0, -0.2, 0]} color={color} intensity={2} distance={4} />
      </group>
    </Float>
  );
};

interface ScrollDroneProps {
  scrollProgress: number;
  color?: string;
  className?: string;
}

// Main component with Canvas
const ScrollDrone = ({ scrollProgress, color = "#0ea5e9", className = "" }: ScrollDroneProps) => {
  return (
    <div className={`w-full h-full ${className}`} style={{ pointerEvents: "none" }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent", pointerEvents: "none" }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
        <directionalLight position={[-5, 3, -5]} intensity={0.6} color={color} />
        <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={0.6} color={color} />
        
        <DroneModel scrollProgress={scrollProgress} color={color} />
        
        <Environment preset="night" />
      </Canvas>
    </div>
  );
};

export default ScrollDrone;
