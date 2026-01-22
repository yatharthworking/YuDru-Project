import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface PowerSystemDroneProps {
  color?: string;
}

// Power systems drone - emphasis on batteries and energy
const PowerSystemDrone = ({ color = "#ec4899" }: PowerSystemDroneProps) => {
  const propellerRefs = useRef<THREE.Mesh[]>([]);
  const energyRingRef = useRef<THREE.Mesh>(null);
  const pulseRefs = useRef<THREE.Mesh[]>([]);
  
  useFrame((state, delta) => {
    propellerRefs.current.forEach((propeller) => {
      if (propeller) {
        propeller.rotation.y += delta * 28;
      }
    });
    
    // Energy ring rotation
    if (energyRingRef.current) {
      energyRingRef.current.rotation.z += delta * 2;
    }

    // Pulse animation
    pulseRefs.current.forEach((pulse, i) => {
      if (pulse) {
        const offset = i * (Math.PI / 2);
        const scale = 1 + Math.sin(state.clock.elapsedTime * 3 + offset) * 0.2;
        pulse.scale.setScalar(scale);
      }
    });
  });

  const addPropellerRef = (index: number) => (el: THREE.Mesh | null) => {
    if (el) propellerRefs.current[index] = el;
  };

  const addPulseRef = (index: number) => (el: THREE.Mesh | null) => {
    if (el) pulseRefs.current[index] = el;
  };

  return (
    <group>
      {/* Main power module body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.6, 0.2, 0.5]} />
        <meshStandardMaterial color="#0d0d15" metalness={0.88} roughness={0.15} />
      </mesh>

      {/* Battery pack visualization - central feature */}
      <group position={[0, 0.02, 0]}>
        {/* Battery cells array */}
        {[
          [-0.15, 0, -0.1], [0, 0, -0.1], [0.15, 0, -0.1],
          [-0.15, 0, 0.1], [0, 0, 0.1], [0.15, 0, 0.1],
        ].map((pos, i) => (
          <group key={i}>
            <mesh position={pos as [number, number, number]}>
              <cylinderGeometry args={[0.05, 0.05, 0.18, 12]} />
              <meshStandardMaterial color="#1a1a28" metalness={0.8} roughness={0.25} />
            </mesh>
            {/* Cell charge indicator */}
            <mesh position={[pos[0], 0.1, pos[2]]}>
              <cylinderGeometry args={[0.035, 0.035, 0.02, 12]} />
              <meshStandardMaterial 
                color={i < 4 ? "#00ff88" : color} 
                emissive={i < 4 ? "#00ff88" : color} 
                emissiveIntensity={2} 
              />
            </mesh>
          </group>
        ))}

        {/* Battery housing top */}
        <mesh position={[0, 0.12, 0]}>
          <boxGeometry args={[0.45, 0.04, 0.35]} />
          <meshStandardMaterial color="#12121a" metalness={0.85} roughness={0.2} />
        </mesh>
      </group>

      {/* Energy flow ring */}
      <mesh ref={energyRingRef} position={[0, 0.16, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.2, 0.015, 8, 32]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
      </mesh>

      {/* Power distribution hub */}
      <mesh position={[0, 0.18, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.04, 16]} />
        <meshStandardMaterial color="#0a0a12" metalness={0.92} roughness={0.1} />
      </mesh>

      {/* Energy pulse indicators */}
      {[0, Math.PI / 2, Math.PI, 3 * Math.PI / 2].map((angle, i) => (
        <mesh 
          key={i}
          ref={addPulseRef(i)}
          position={[Math.cos(angle) * 0.2, 0.16, Math.sin(angle) * 0.2]}
        >
          <sphereGeometry args={[0.025, 8, 8]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={4} />
        </mesh>
      ))}

      {/* Power output connectors */}
      <group position={[0, -0.12, 0]}>
        {/* Main output port */}
        <mesh>
          <boxGeometry args={[0.15, 0.06, 0.15]} />
          <meshStandardMaterial color="#0a0a12" metalness={0.9} roughness={0.12} />
        </mesh>
        
        {/* Connector pins */}
        {[[-0.04, 0, 0.04], [0.04, 0, 0.04], [-0.04, 0, -0.04], [0.04, 0, -0.04]].map((pos, i) => (
          <mesh key={i} position={[pos[0], -0.04, pos[2]]}>
            <cylinderGeometry args={[0.015, 0.015, 0.03, 8]} />
            <meshStandardMaterial color="#ffd700" metalness={1} roughness={0.1} />
          </mesh>
        ))}
      </group>

      {/* Endurance arms - 4 corners */}
      {[
        { pos: [0.42, 0, 0.32] },
        { pos: [-0.42, 0, 0.32] },
        { pos: [0.42, 0, -0.32] },
        { pos: [-0.42, 0, -0.32] },
      ].map((arm, i) => (
        <group key={i}>
          {/* Arm with power conduit */}
          <mesh 
            position={[arm.pos[0] * 0.55, 0.02, arm.pos[2]]}
            rotation={[0, Math.atan2(arm.pos[2], arm.pos[0]), 0]}
          >
            <boxGeometry args={[0.35, 0.06, 0.08]} />
            <meshStandardMaterial color="#1a1a25" metalness={0.82} roughness={0.22} />
          </mesh>

          {/* Power line along arm */}
          <mesh 
            position={[arm.pos[0] * 0.55, 0.06, arm.pos[2]]}
            rotation={[0, Math.atan2(arm.pos[2], arm.pos[0]), 0]}
          >
            <boxGeometry args={[0.3, 0.015, 0.02]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} />
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
            <cylinderGeometry args={[0.25, 0.25, 0.018, 28]} />
            <meshStandardMaterial color="#2a2a3a" metalness={0.45} roughness={0.45} transparent opacity={0.38} />
          </mesh>

          {/* Power status LED */}
          <mesh position={[arm.pos[0], arm.pos[1] - 0.04, arm.pos[2]]}>
            <sphereGeometry args={[0.022, 8, 8]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={3} />
          </mesh>
        </group>
      ))}

      {/* Charge level display */}
      <group position={[0.32, 0.06, 0]}>
        <mesh>
          <boxGeometry args={[0.08, 0.1, 0.04]} />
          <meshStandardMaterial color="#0a0a15" metalness={0.85} roughness={0.2} />
        </mesh>
        {/* Charge bars */}
        {[0.03, 0.01, -0.01, -0.03].map((y, i) => (
          <mesh key={i} position={[0.04, y, 0]}>
            <boxGeometry args={[0.02, 0.015, 0.025]} />
            <meshStandardMaterial 
              color={i < 3 ? "#00ff88" : "#333"} 
              emissive={i < 3 ? "#00ff88" : "#000"} 
              emissiveIntensity={i < 3 ? 2 : 0} 
            />
          </mesh>
        ))}
      </group>

      {/* Thermal management vents */}
      {[-0.25, 0.25].map((x, i) => (
        <group key={i} position={[x, -0.08, 0.26]}>
          {[0, 0.04, 0.08].map((offset, j) => (
            <mesh key={j} position={[offset - 0.04, 0, 0]}>
              <boxGeometry args={[0.02, 0.04, 0.02]} />
              <meshStandardMaterial color="#1a1a28" metalness={0.7} roughness={0.3} />
            </mesh>
          ))}
        </group>
      ))}

      <pointLight position={[0, 0.2, 0]} color={color} intensity={2.5} distance={4} />
    </group>
  );
};

export default PowerSystemDrone;
