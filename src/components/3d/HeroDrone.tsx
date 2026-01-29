import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";

// Camera Gimbal component
const CameraGimbal = () => {
  return (
    <group position={[0, -0.18, 0.15]}>
      {/* Gimbal mount */}
      <mesh>
        <boxGeometry args={[0.12, 0.06, 0.12]} />
        <meshStandardMaterial color="#0a0a12" metalness={0.9} roughness={0.15} />
      </mesh>
      {/* Camera housing */}
      <mesh position={[0, -0.06, 0]}>
        <boxGeometry args={[0.18, 0.12, 0.2]} />
        <meshStandardMaterial color="#0f0f18" metalness={0.85} roughness={0.2} />
      </mesh>
      {/* Main lens */}
      <mesh position={[0, -0.06, 0.12]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.055, 0.06, 24]} />
        <meshStandardMaterial color="#020205" metalness={1} roughness={0.05} />
      </mesh>
      {/* Lens glass */}
      <mesh position={[0, -0.06, 0.155]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.01, 24]} />
        <meshStandardMaterial color="#1a1a30" metalness={0.3} roughness={0} transparent opacity={0.9} />
      </mesh>
      {/* Secondary sensor */}
      <mesh position={[0.06, -0.04, 0.1]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 0.02, 12]} />
        <meshStandardMaterial color="#0a0a15" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
};

// Realistic drone body with sensors and details
const DroneBody = () => {
  const ledRef1 = useRef<THREE.Mesh>(null);
  const ledRef2 = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    const pulse = Math.sin(clock.getElapsedTime() * 2) * 0.5 + 0.5;
    if (ledRef1.current) {
      (ledRef1.current.material as THREE.MeshStandardMaterial).emissiveIntensity = 1.5 + pulse * 2;
    }
    if (ledRef2.current) {
      (ledRef2.current.material as THREE.MeshStandardMaterial).emissiveIntensity = 1.5 + pulse * 2;
    }
  });

  return (
    <group>
      {/* Main body - hexagonal shape for industrial look */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.5, 0.12, 0.6]} />
        <meshStandardMaterial color="#0d0d15" metalness={0.85} roughness={0.2} />
      </mesh>
      
      {/* Body top cover with vents */}
      <mesh position={[0, 0.07, 0]}>
        <boxGeometry args={[0.45, 0.03, 0.55]} />
        <meshStandardMaterial color="#0a0a12" metalness={0.9} roughness={0.15} />
      </mesh>
      
      {/* Vent lines */}
      {[-0.15, -0.05, 0.05, 0.15].map((z, i) => (
        <mesh key={i} position={[0, 0.09, z]}>
          <boxGeometry args={[0.3, 0.005, 0.03]} />
          <meshStandardMaterial color="#050508" metalness={0.7} roughness={0.3} />
        </mesh>
      ))}
      
      {/* Side panels with carbon fiber texture effect */}
      <mesh position={[0.26, 0, 0]}>
        <boxGeometry args={[0.02, 0.1, 0.5]} />
        <meshStandardMaterial color="#0c0c14" metalness={0.7} roughness={0.35} />
      </mesh>
      <mesh position={[-0.26, 0, 0]}>
        <boxGeometry args={[0.02, 0.1, 0.5]} />
        <meshStandardMaterial color="#0c0c14" metalness={0.7} roughness={0.35} />
      </mesh>
      
      {/* Front status LEDs */}
      <mesh ref={ledRef1} position={[0.12, 0.02, 0.28]}>
        <sphereGeometry args={[0.015, 12, 12]} />
        <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={2} />
      </mesh>
      <mesh ref={ledRef2} position={[-0.12, 0.02, 0.28]}>
        <sphereGeometry args={[0.015, 12, 12]} />
        <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={2} />
      </mesh>
      
      {/* Rear warning LED */}
      <mesh position={[0, 0.02, -0.28]}>
        <sphereGeometry args={[0.02, 12, 12]} />
        <meshStandardMaterial color="#ff3333" emissive="#ff3333" emissiveIntensity={1.5} />
      </mesh>
      
      {/* GPS module on top */}
      <mesh position={[0, 0.12, -0.1]}>
        <cylinderGeometry args={[0.06, 0.07, 0.04, 16]} />
        <meshStandardMaterial color="#0a0a12" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Antenna */}
      <mesh position={[0.15, 0.15, -0.15]}>
        <cylinderGeometry args={[0.008, 0.005, 0.12, 8]} />
        <meshStandardMaterial color="#1a1a25" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0.15, 0.22, -0.15]}>
        <sphereGeometry args={[0.012, 8, 8]} />
        <meshStandardMaterial color="#0a0a15" metalness={0.9} roughness={0.1} />
      </mesh>
      
      {/* Camera Gimbal */}
      <CameraGimbal />
    </group>
  );
};

// Realistic carbon-fiber arm with motor
const DroneArm = ({ angle, isClockwise }: { angle: number; isClockwise: boolean }) => {
  const propellerRef = useRef<THREE.Group>(null);
  const motorLedRef = useRef<THREE.Mesh>(null);
  
  const armLength = 0.55;
  const motorX = Math.sin(angle) * armLength;
  const motorZ = Math.cos(angle) * armLength;
  
  useFrame(({ clock }, delta) => {
    if (propellerRef.current) {
      const speed = isClockwise ? 60 : -60;
      propellerRef.current.rotation.y += delta * speed;
    }
    if (motorLedRef.current) {
      const pulse = Math.sin(clock.getElapsedTime() * 3 + angle) * 0.3 + 0.7;
      (motorLedRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = 1 + pulse * 1.5;
    }
  });
  
  return (
    <group>
      {/* Carbon fiber arm - tapered design */}
      <group rotation={[0, angle, 0]}>
        <mesh position={[0, 0, armLength / 2]}>
          <boxGeometry args={[0.08, 0.045, armLength]} />
          <meshStandardMaterial color="#151520" metalness={0.6} roughness={0.4} />
        </mesh>
        {/* Arm reinforcement lines */}
        <mesh position={[0, 0.025, armLength / 2]}>
          <boxGeometry args={[0.06, 0.003, armLength - 0.05]} />
          <meshStandardMaterial color="#0d0d18" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>
      
      {/* Motor housing */}
      <mesh position={[motorX, 0.04, motorZ]}>
        <cylinderGeometry args={[0.065, 0.075, 0.08, 20]} />
        <meshStandardMaterial color="#0a0a12" metalness={0.85} roughness={0.15} />
      </mesh>
      
      {/* Motor top ring */}
      <mesh position={[motorX, 0.085, motorZ]}>
        <cylinderGeometry args={[0.055, 0.055, 0.015, 20]} />
        <meshStandardMaterial color="#151520" metalness={0.9} roughness={0.1} />
      </mesh>
      
      {/* Motor LED ring */}
      <mesh ref={motorLedRef} position={[motorX, 0.02, motorZ]}>
        <torusGeometry args={[0.06, 0.008, 8, 24]} />
        <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={1.5} transparent opacity={0.9} />
      </mesh>
      
      {/* Propeller assembly */}
      <group ref={propellerRef} position={[motorX, 0.1, motorZ]}>
        {/* Propeller hub */}
        <mesh>
          <cylinderGeometry args={[0.025, 0.02, 0.02, 12]} />
          <meshStandardMaterial color="#0d0d15" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Propeller blades - elongated for realism */}
        {[0, Math.PI].map((rot, i) => (
          <mesh key={i} rotation={[0, rot, 0]} position={[0, 0, 0]}>
            <boxGeometry args={[0.5, 0.008, 0.035]} />
            <meshStandardMaterial 
              color="#1a1a28" 
              metalness={0.5} 
              roughness={0.4} 
              transparent 
              opacity={0.7}
              side={THREE.DoubleSide}
            />
          </mesh>
        ))}
      </group>
      
      {/* Landing gear leg */}
      <mesh position={[motorX * 0.7, -0.12, motorZ * 0.7]} rotation={[0, angle, Math.PI / 12]}>
        <cylinderGeometry args={[0.012, 0.01, 0.2, 8]} />
        <meshStandardMaterial color="#1a1a25" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Landing foot */}
      <mesh position={[motorX * 0.7, -0.22, motorZ * 0.7]}>
        <sphereGeometry args={[0.018, 8, 8]} />
        <meshStandardMaterial color="#0d0d15" metalness={0.6} roughness={0.4} />
      </mesh>
    </group>
  );
};

// Mouse tracking hook
const useMousePosition = () => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  
  return mouse;
};

// Complete realistic drone model with animations
const RealisticDroneModel = ({ mouseX, mouseY }: { mouseX: number; mouseY: number }) => {
  const groupRef = useRef<THREE.Group>(null);
  const targetRotationX = useRef(0);
  const targetRotationY = useRef(0);
  const targetRotationZ = useRef(0);
  const targetPositionY = useRef(0);
  const targetPositionX = useRef(0);
  
  // Randomized animation offsets
  const offsets = useMemo(() => ({
    bobSpeed: 0.8 + Math.random() * 0.2,
    driftSpeed: 0.3 + Math.random() * 0.1,
    yawSpeed: 0.2 + Math.random() * 0.1,
  }), []);
  
  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    
    const t = clock.getElapsedTime();
    
    // Vertical bobbing (10-15px equivalent in 3D units)
    const bobAmount = 0.08;
    targetPositionY.current = Math.sin(t * offsets.bobSpeed) * bobAmount + 
                              Math.sin(t * offsets.bobSpeed * 1.7) * (bobAmount * 0.3);
    
    // Horizontal drift
    const driftAmount = 0.05;
    targetPositionX.current = Math.sin(t * offsets.driftSpeed) * driftAmount +
                              Math.cos(t * offsets.driftSpeed * 1.3) * (driftAmount * 0.5);
    
    // Yaw rotation (±2-3 degrees = ±0.035-0.052 radians)
    const yawAmount = 0.04;
    targetRotationY.current = Math.sin(t * offsets.yawSpeed) * yawAmount;
    
    // Mouse-based tilt (parallax effect)
    const mouseTiltX = mouseY * 0.08;
    const mouseTiltZ = -mouseX * 0.06;
    
    // Combine with stabilization pitch/roll
    const stabPitch = Math.sin(t * 0.5) * 0.02;
    const stabRoll = Math.cos(t * 0.4) * 0.015;
    
    targetRotationX.current = stabPitch + mouseTiltX;
    targetRotationZ.current = stabRoll + mouseTiltZ;
    
    // Smooth interpolation for natural movement
    const lerpFactor = 0.03;
    groupRef.current.position.y += (targetPositionY.current - groupRef.current.position.y) * lerpFactor * 2;
    groupRef.current.position.x += (targetPositionX.current + mouseX * 0.15 - groupRef.current.position.x) * lerpFactor;
    groupRef.current.rotation.x += (targetRotationX.current - groupRef.current.rotation.x) * lerpFactor;
    groupRef.current.rotation.y += (targetRotationY.current - groupRef.current.rotation.y) * lerpFactor;
    groupRef.current.rotation.z += (targetRotationZ.current - groupRef.current.rotation.z) * lerpFactor;
  });
  
  return (
    <group ref={groupRef} scale={2.2}>
      <DroneBody />
      
      {/* Four arms at 45-degree angles - alternating rotation for realism */}
      <DroneArm angle={Math.PI / 4} isClockwise={true} />
      <DroneArm angle={(3 * Math.PI) / 4} isClockwise={false} />
      <DroneArm angle={(-Math.PI) / 4} isClockwise={false} />
      <DroneArm angle={(-3 * Math.PI) / 4} isClockwise={true} />
      
      {/* Subtle glow from drone */}
      <pointLight position={[0, -0.3, 0.1]} color="#00d4ff" intensity={0.8} distance={2} />
    </group>
  );
};

// Shadow plane for depth
const ShadowPlane = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.8, 0]} receiveShadow>
      <planeGeometry args={[6, 6]} />
      <meshStandardMaterial 
        color="#000000" 
        transparent 
        opacity={0.15} 
        roughness={1}
      />
    </mesh>
  );
};

// Scene component that uses mouse position
const Scene = () => {
  const mouse = useMousePosition();
  
  return (
    <>
      {/* Ambient fill light */}
      <ambientLight intensity={0.25} />
      
      {/* Main key light */}
      <directionalLight 
        position={[5, 8, 5]} 
        intensity={1.2} 
        color="#ffffff"
        castShadow
      />
      
      {/* Rim light for edge definition */}
      <directionalLight 
        position={[-4, 3, -4]} 
        intensity={0.6} 
        color="#00d4ff"
      />
      
      {/* Top fill light */}
      <directionalLight 
        position={[0, 10, 0]} 
        intensity={0.4} 
        color="#ffffff"
      />
      
      {/* Accent spotlight */}
      <spotLight 
        position={[2, 5, 2]} 
        angle={0.4} 
        penumbra={1} 
        intensity={0.8} 
        color="#00d4ff"
        castShadow
      />
      
      {/* Back light for silhouette */}
      <pointLight position={[0, 2, -3]} intensity={0.5} color="#00d4ff" />
      
      <RealisticDroneModel mouseX={mouse.x} mouseY={mouse.y} />
      <ShadowPlane />
      
      <Environment preset="night" />
    </>
  );
};

// Main Hero Drone component with responsive sizing
const HeroDrone = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div 
      className="absolute inset-0 flex items-center justify-center z-[5]" 
      style={{ 
        pointerEvents: "none",
        // Shift drone position for better mobile viewing
        transform: isMobile ? 'translateY(-5%)' : 'none'
      }}
    >
      <Canvas
        camera={{ 
          position: isMobile ? [0, 0.3, 5] : [0, 0.5, 4], 
          fov: isMobile ? 35 : 40 
        }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        style={{ 
          background: "transparent", 
          pointerEvents: "none",
        }}
        shadows={!isMobile}
      >
        <Scene />
      </Canvas>
    </div>
  );
};

export default HeroDrone;