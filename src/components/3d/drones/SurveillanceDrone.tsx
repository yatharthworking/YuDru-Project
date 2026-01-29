import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface SurveillanceDroneProps {
  color?: string;
}

// Surveillance/monitoring drone - equipped with cameras and sensors
const SurveillanceDrone = ({ color = "#8b5cf6" }: SurveillanceDroneProps) => {
  const propellerRefs = useRef<THREE.Mesh[]>([]);
  const scannerRef = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    propellerRefs.current.forEach((propeller) => {
      if (propeller) {
        propeller.rotation.y += delta * 35;
      }
    });
    
    // Scanning motion for sensor dish
    if (scannerRef.current) {
      scannerRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.2;
    }
  });

  const addPropellerRef = (index: number) => (el: THREE.Mesh | null) => {
    if (el) propellerRefs.current[index] = el;
  };

  return (
    <group>
      {/* Main body - rectangular surveillance platform */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.7, 0.18, 0.5]} />
        <meshStandardMaterial color="#12121a" metalness={0.85} roughness={0.15} />
      </mesh>

      {/* Sensor dome on top */}
      <mesh position={[0, 0.15, 0]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#1a1a25" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Rotating radar/sensor array */}
      <mesh ref={scannerRef} position={[0, 0.28, 0]}>
        <boxGeometry args={[0.25, 0.02, 0.06]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.5} />
      </mesh>

      {/* Primary gimbal camera housing */}
      <group position={[0, -0.15, 0.15]}>
        <mesh>
          <boxGeometry args={[0.2, 0.15, 0.18]} />
          <meshStandardMaterial color="#0a0a12" metalness={0.9} roughness={0.1} />
        </mesh>
        
        {/* Main camera lens */}
        <mesh position={[0, 0, 0.1]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 0.04, 16]} />
          <meshStandardMaterial color="#0a2540" metalness={1} roughness={0} />
        </mesh>

        {/* Thermal camera */}
        <mesh position={[0.08, 0.02, 0.1]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.025, 0.025, 0.03, 12]} />
          <meshStandardMaterial color="#ff4444" emissive="#ff4444" emissiveIntensity={0.5} />
        </mesh>

        {/* Night vision indicator */}
        <mesh position={[-0.08, 0.02, 0.1]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.025, 0.025, 0.03, 12]} />
          <meshStandardMaterial color="#00ff00" emissive="#00ff00" emissiveIntensity={0.5} />
        </mesh>
      </group>

      {/* Arms with motors and propellers */}
      {[
        { pos: [0.5, 0, 0.35] },
        { pos: [-0.5, 0, 0.35] },
        { pos: [0.5, 0, -0.35] },
        { pos: [-0.5, 0, -0.35] },
      ].map((arm, i) => (
        <group key={i}>
          {/* Sturdy arm */}
          <mesh 
            position={[arm.pos[0] * 0.5, 0, arm.pos[2]]}
            rotation={[0, arm.pos[2] > 0 ? Math.PI / 4 * (arm.pos[0] > 0 ? 1 : -1) : -Math.PI / 4 * (arm.pos[0] > 0 ? 1 : -1), 0]}
          >
            <boxGeometry args={[0.4, 0.06, 0.08]} />
            <meshStandardMaterial color="#1a1a28" metalness={0.8} roughness={0.2} />
          </mesh>

          {/* Motor housing */}
          <mesh position={arm.pos as [number, number, number]}>
            <cylinderGeometry args={[0.08, 0.09, 0.1, 8]} />
            <meshStandardMaterial color="#0f0f18" metalness={0.9} roughness={0.1} />
          </mesh>

          {/* Propeller */}
          <mesh 
            ref={addPropellerRef(i)}
            position={[arm.pos[0], arm.pos[1] + 0.08, arm.pos[2]]}
          >
            <cylinderGeometry args={[0.28, 0.28, 0.018, 28]} />
            <meshStandardMaterial color="#2a2a3e" metalness={0.4} roughness={0.4} transparent opacity={0.35} />
          </mesh>

          {/* Status LED */}
          <mesh position={[arm.pos[0], arm.pos[1] - 0.04, arm.pos[2]]}>
            <sphereGeometry args={[0.025, 8, 8]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={3} />
          </mesh>
        </group>
      ))}

      {/* Antenna array */}
      {[0.15, -0.15].map((x, i) => (
        <mesh key={i} position={[x, 0.12, -0.2]}>
          <cylinderGeometry args={[0.008, 0.008, 0.12, 6]} />
          <meshStandardMaterial color="#333" metalness={0.9} roughness={0.2} />
        </mesh>
      ))}

      {/* Data transmission indicator */}
      <mesh position={[0, 0.18, -0.2]}>
        <boxGeometry args={[0.04, 0.04, 0.04]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
      </mesh>

      {/* Side sensor pods */}
      {[-0.38, 0.38].map((x, i) => (
        <mesh key={i} position={[x, -0.06, 0]}>
          <boxGeometry args={[0.08, 0.1, 0.2]} />
          <meshStandardMaterial color="#0f0f18" metalness={0.85} roughness={0.15} />
        </mesh>
      ))}

      {/* Point light */}
      <pointLight position={[0, -0.2, 0.1]} color={color} intensity={2} distance={4} />
    </group>
  );
};

export default SurveillanceDrone;
