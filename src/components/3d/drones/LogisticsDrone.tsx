import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface LogisticsDroneProps {
  color?: string;
}

// Heavy-lift logistics drone - robust frame with cargo capability
const LogisticsDrone = ({ color = "#10b981" }: LogisticsDroneProps) => {
  const propellerRefs = useRef<THREE.Mesh[]>([]);
  
  useFrame((_, delta) => {
    propellerRefs.current.forEach((propeller) => {
      if (propeller) {
        propeller.rotation.y += delta * 25; // Slower for heavy-lift
      }
    });
  });

  const addPropellerRef = (index: number) => (el: THREE.Mesh | null) => {
    if (el) propellerRefs.current[index] = el;
  };

  return (
    <group>
      {/* Heavy-duty main frame */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.9, 0.12, 0.6]} />
        <meshStandardMaterial color="#0d0d18" metalness={0.85} roughness={0.2} />
      </mesh>

      {/* Reinforced top plate */}
      <mesh position={[0, 0.08, 0]}>
        <boxGeometry args={[0.7, 0.04, 0.5]} />
        <meshStandardMaterial color="#151520" metalness={0.8} roughness={0.25} />
      </mesh>

      {/* Cargo bay / payload mount */}
      <group position={[0, -0.2, 0]}>
        {/* Main cargo container */}
        <mesh>
          <boxGeometry args={[0.5, 0.25, 0.4]} />
          <meshStandardMaterial color="#1a1a28" metalness={0.7} roughness={0.3} />
        </mesh>

        {/* Cargo straps */}
        {[-0.15, 0.15].map((z, i) => (
          <mesh key={i} position={[0, 0.13, z]}>
            <boxGeometry args={[0.55, 0.02, 0.03]} />
            <meshStandardMaterial color={color} metalness={0.6} roughness={0.4} />
          </mesh>
        ))}

        {/* Release mechanism indicators */}
        {[[-0.2, 0, 0.21], [0.2, 0, 0.21], [-0.2, 0, -0.21], [0.2, 0, -0.21]].map((pos, i) => (
          <mesh key={i} position={pos as [number, number, number]}>
            <cylinderGeometry args={[0.03, 0.03, 0.04, 8]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} />
          </mesh>
        ))}

        {/* Weight indicator */}
        <mesh position={[0, -0.14, 0]}>
          <boxGeometry args={[0.15, 0.02, 0.15]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} />
        </mesh>
      </group>

      {/* Landing gear - sturdy legs */}
      {[
        [0.35, -0.35, 0.25],
        [-0.35, -0.35, 0.25],
        [0.35, -0.35, -0.25],
        [-0.35, -0.35, -0.25],
      ].map((pos, i) => (
        <group key={i}>
          {/* Leg */}
          <mesh position={pos as [number, number, number]}>
            <cylinderGeometry args={[0.025, 0.03, 0.35, 8]} />
            <meshStandardMaterial color="#1a1a2a" metalness={0.8} roughness={0.3} />
          </mesh>
          {/* Foot pad */}
          <mesh position={[pos[0], pos[1] - 0.18, pos[2]]}>
            <cylinderGeometry args={[0.06, 0.07, 0.03, 12]} />
            <meshStandardMaterial color="#252535" metalness={0.7} roughness={0.4} />
          </mesh>
        </group>
      ))}

      {/* 6-arm configuration for heavy lift */}
      {[
        { pos: [0.55, 0, 0], angle: 0 },
        { pos: [0.28, 0, 0.48], angle: Math.PI / 3 },
        { pos: [-0.28, 0, 0.48], angle: 2 * Math.PI / 3 },
        { pos: [-0.55, 0, 0], angle: Math.PI },
        { pos: [-0.28, 0, -0.48], angle: -2 * Math.PI / 3 },
        { pos: [0.28, 0, -0.48], angle: -Math.PI / 3 },
      ].map((arm, i) => (
        <group key={i}>
          {/* Heavy duty arm */}
          <mesh position={[arm.pos[0] * 0.5, 0.02, arm.pos[2] * 0.5]} rotation={[0, arm.angle, 0]}>
            <boxGeometry args={[0.45, 0.08, 0.1]} />
            <meshStandardMaterial color="#1a1a28" metalness={0.8} roughness={0.25} />
          </mesh>

          {/* Large motor housing */}
          <mesh position={arm.pos as [number, number, number]}>
            <cylinderGeometry args={[0.1, 0.12, 0.12, 8]} />
            <meshStandardMaterial color="#0f0f1a" metalness={0.9} roughness={0.15} />
          </mesh>

          {/* Large propeller for lift */}
          <mesh 
            ref={addPropellerRef(i)}
            position={[arm.pos[0], arm.pos[1] + 0.1, arm.pos[2]]}
          >
            <cylinderGeometry args={[0.32, 0.32, 0.02, 32]} />
            <meshStandardMaterial color="#2a2a40" metalness={0.4} roughness={0.5} transparent opacity={0.4} />
          </mesh>

          {/* Motor status light */}
          <mesh position={[arm.pos[0], arm.pos[1] - 0.05, arm.pos[2]]}>
            <sphereGeometry args={[0.025, 8, 8]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={3} />
          </mesh>
        </group>
      ))}

      {/* Control module on top */}
      <mesh position={[0, 0.14, 0]}>
        <boxGeometry args={[0.25, 0.06, 0.2]} />
        <meshStandardMaterial color="#0a0a15" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Status indicators */}
      {[-0.08, 0, 0.08].map((x, i) => (
        <mesh key={i} position={[x, 0.18, 0]}>
          <boxGeometry args={[0.03, 0.02, 0.03]} />
          <meshStandardMaterial 
            color={i === 1 ? color : "#ffaa00"} 
            emissive={i === 1 ? color : "#ffaa00"} 
            emissiveIntensity={2} 
          />
        </mesh>
      ))}

      {/* GPS antenna */}
      <mesh position={[0, 0.22, -0.05]}>
        <cylinderGeometry args={[0.015, 0.015, 0.08, 6]} />
        <meshStandardMaterial color="#444" metalness={0.8} roughness={0.3} />
      </mesh>

      <pointLight position={[0, -0.3, 0]} color={color} intensity={2} distance={4} />
    </group>
  );
};

export default LogisticsDrone;
