import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface SportsDroneProps {
  color?: string;
}

// Lightweight, agile sports drone - sleek and aerodynamic design
const SportsDrone = ({ color = "#0ea5e9" }: SportsDroneProps) => {
  const propellerRefs = useRef<THREE.Mesh[]>([]);
  
  useFrame((_, delta) => {
    propellerRefs.current.forEach((propeller) => {
      if (propeller) {
        propeller.rotation.y += delta * 50; // Fast spin for agility
      }
    });
  });

  const addPropellerRef = (index: number) => (el: THREE.Mesh | null) => {
    if (el) propellerRefs.current[index] = el;
  };

  return (
    <group>
      {/* Sleek main body - aerodynamic oval shape */}
      <mesh position={[0, 0, 0]}>
        <capsuleGeometry args={[0.2, 0.6, 8, 16]} />
        <meshStandardMaterial color="#0a0a15" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Aerodynamic top canopy */}
      <mesh position={[0, 0.15, 0.1]}>
        <sphereGeometry args={[0.18, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color={color} metalness={0.7} roughness={0.2} transparent opacity={0.6} />
      </mesh>

      {/* Racing stripes */}
      {[-0.12, 0.12].map((x, i) => (
        <mesh key={i} position={[x, 0.05, 0]}>
          <boxGeometry args={[0.03, 0.02, 0.5]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
        </mesh>
      ))}

      {/* Compact arms - 4 corners, swept back for speed */}
      {[
        { pos: [0.4, 0, 0.3], rot: Math.PI / 6 },
        { pos: [-0.4, 0, 0.3], rot: -Math.PI / 6 },
        { pos: [0.4, 0, -0.3], rot: -Math.PI / 6 },
        { pos: [-0.4, 0, -0.3], rot: Math.PI / 6 },
      ].map((arm, i) => (
        <group key={i}>
          {/* Thin aerodynamic arm */}
          <mesh position={arm.pos as [number, number, number]} rotation={[0, arm.rot, 0]}>
            <boxGeometry args={[0.35, 0.04, 0.06]} />
            <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
          </mesh>

          {/* Compact motor */}
          <mesh position={arm.pos as [number, number, number]}>
            <cylinderGeometry args={[0.06, 0.07, 0.08, 8]} />
            <meshStandardMaterial color="#0f0f1a" metalness={0.9} roughness={0.1} />
          </mesh>

          {/* Fast propeller */}
          <mesh 
            ref={addPropellerRef(i)}
            position={[arm.pos[0], arm.pos[1] + 0.06, arm.pos[2]]}
          >
            <cylinderGeometry args={[0.22, 0.22, 0.015, 24]} />
            <meshStandardMaterial color={color} metalness={0.5} roughness={0.3} transparent opacity={0.3} />
          </mesh>

          {/* Motor LED */}
          <mesh position={[arm.pos[0], arm.pos[1] - 0.03, arm.pos[2]]}>
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={4} />
          </mesh>
        </group>
      ))}

      {/* Front tracking camera */}
      <mesh position={[0, -0.08, 0.45]} rotation={[Math.PI / 8, 0, 0]}>
        <cylinderGeometry args={[0.06, 0.05, 0.1, 12]} />
        <meshStandardMaterial color="#111" metalness={1} roughness={0} />
      </mesh>

      {/* Camera lens */}
      <mesh position={[0, -0.1, 0.52]} rotation={[Math.PI / 2.5, 0, 0]}>
        <cylinderGeometry args={[0.035, 0.035, 0.02, 16]} />
        <meshStandardMaterial color="#1a3a5a" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Tail fin for aerodynamics */}
      <mesh position={[0, 0.08, -0.4]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.02, 0.15, 0.12]} />
        <meshStandardMaterial color={color} metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Point light from drone */}
      <pointLight position={[0, -0.15, 0]} color={color} intensity={1.5} distance={3} />
    </group>
  );
};

export default SportsDrone;
