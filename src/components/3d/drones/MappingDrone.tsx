import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface MappingDroneProps {
  color?: string;
}

// Precision mapping drone - GPS RTK and scanning sensors
const MappingDrone = ({ color = "#f59e0b" }: MappingDroneProps) => {
  const propellerRefs = useRef<THREE.Mesh[]>([]);
  const scannerRef = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    propellerRefs.current.forEach((propeller) => {
      if (propeller) {
        propeller.rotation.y += delta * 30;
      }
    });
    
    // Scanning beam animation
    if (scannerRef.current) {
      scannerRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 1.5) * 0.3;
    }
  });

  const addPropellerRef = (index: number) => (el: THREE.Mesh | null) => {
    if (el) propellerRefs.current[index] = el;
  };

  return (
    <group>
      {/* Main body - precision platform */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.65, 0.14, 0.45]} />
        <meshStandardMaterial color="#101018" metalness={0.88} roughness={0.15} />
      </mesh>

      {/* GPS/RTK module - prominent on top */}
      <group position={[0, 0.15, -0.05]}>
        {/* RTK base */}
        <mesh>
          <cylinderGeometry args={[0.12, 0.14, 0.08, 12]} />
          <meshStandardMaterial color="#1a1a25" metalness={0.85} roughness={0.2} />
        </mesh>
        
        {/* GPS antenna dome */}
        <mesh position={[0, 0.06, 0]}>
          <sphereGeometry args={[0.1, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#2a2a35" metalness={0.7} roughness={0.3} />
        </mesh>

        {/* RTK indicator ring */}
        <mesh position={[0, 0.02, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.13, 0.015, 8, 24]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.5} />
        </mesh>

        {/* Accuracy indicator */}
        <mesh position={[0, 0.13, 0]}>
          <sphereGeometry args={[0.025, 8, 8]} />
          <meshStandardMaterial color="#00ff00" emissive="#00ff00" emissiveIntensity={3} />
        </mesh>
      </group>

      {/* LiDAR/Scanning sensor array */}
      <group ref={scannerRef} position={[0, -0.12, 0.1]}>
        {/* Main scanner housing */}
        <mesh>
          <boxGeometry args={[0.35, 0.1, 0.15]} />
          <meshStandardMaterial color="#0a0a12" metalness={0.92} roughness={0.1} />
        </mesh>

        {/* Scanner window */}
        <mesh position={[0, -0.04, 0.08]} rotation={[Math.PI / 6, 0, 0]}>
          <boxGeometry args={[0.28, 0.02, 0.08]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} transparent opacity={0.7} />
        </mesh>

        {/* Scanning beam indicators */}
        {[-0.1, 0, 0.1].map((x, i) => (
          <mesh key={i} position={[x, -0.06, 0.08]}>
            <cylinderGeometry args={[0.015, 0.015, 0.03, 8]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
          </mesh>
        ))}
      </group>

      {/* High-resolution camera module */}
      <group position={[0, -0.12, -0.15]}>
        <mesh>
          <boxGeometry args={[0.18, 0.12, 0.15]} />
          <meshStandardMaterial color="#0a0a12" metalness={0.9} roughness={0.1} />
        </mesh>
        
        {/* Camera lens */}
        <mesh position={[0, 0, -0.08]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 0.03, 16]} />
          <meshStandardMaterial color="#1a3050" metalness={1} roughness={0} />
        </mesh>
      </group>

      {/* Precision arms - 4 corners */}
      {[
        { pos: [0.45, 0, 0.35] },
        { pos: [-0.45, 0, 0.35] },
        { pos: [0.45, 0, -0.35] },
        { pos: [-0.45, 0, -0.35] },
      ].map((arm, i) => (
        <group key={i}>
          {/* Arm */}
          <mesh 
            position={[arm.pos[0] * 0.5, 0.02, arm.pos[2]]}
            rotation={[0, Math.atan2(arm.pos[2], arm.pos[0]), 0]}
          >
            <boxGeometry args={[0.38, 0.06, 0.07]} />
            <meshStandardMaterial color="#1a1a25" metalness={0.82} roughness={0.22} />
          </mesh>

          {/* Motor */}
          <mesh position={arm.pos as [number, number, number]}>
            <cylinderGeometry args={[0.08, 0.09, 0.1, 8]} />
            <meshStandardMaterial color="#0f0f18" metalness={0.9} roughness={0.12} />
          </mesh>

          {/* Propeller */}
          <mesh 
            ref={addPropellerRef(i)}
            position={[arm.pos[0], arm.pos[1] + 0.08, arm.pos[2]]}
          >
            <cylinderGeometry args={[0.26, 0.26, 0.018, 28]} />
            <meshStandardMaterial color="#2a2a3a" metalness={0.45} roughness={0.45} transparent opacity={0.38} />
          </mesh>

          {/* Status LED */}
          <mesh position={[arm.pos[0], arm.pos[1] - 0.04, arm.pos[2]]}>
            <sphereGeometry args={[0.022, 8, 8]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={3} />
          </mesh>
        </group>
      ))}

      {/* Measurement indicators on sides */}
      {[-0.35, 0.35].map((x, i) => (
        <group key={i} position={[x, 0, 0]}>
          <mesh>
            <boxGeometry args={[0.02, 0.08, 0.3]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
          </mesh>
          {/* Tick marks */}
          {[-0.1, 0, 0.1].map((z, j) => (
            <mesh key={j} position={[i === 0 ? -0.02 : 0.02, 0, z]}>
              <boxGeometry args={[0.02, 0.03, 0.01]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.5} />
            </mesh>
          ))}
        </group>
      ))}

      {/* Data storage indicator */}
      <mesh position={[0.25, 0.08, 0.15]}>
        <boxGeometry args={[0.1, 0.04, 0.08]} />
        <meshStandardMaterial color="#0a0a15" metalness={0.85} roughness={0.2} />
      </mesh>
      <mesh position={[0.28, 0.1, 0.15]}>
        <boxGeometry args={[0.02, 0.02, 0.02]} />
        <meshStandardMaterial color="#00ff88" emissive="#00ff88" emissiveIntensity={2} />
      </mesh>

      <pointLight position={[0, -0.15, 0]} color={color} intensity={1.8} distance={3.5} />
    </group>
  );
};

export default MappingDrone;
