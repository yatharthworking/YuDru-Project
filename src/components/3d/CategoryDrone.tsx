import { useRef, Suspense, lazy } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import * as THREE from "three";

// Lazy load drone models
const SportsDrone = lazy(() => import("./drones/SportsDrone"));
const SurveillanceDrone = lazy(() => import("./drones/SurveillanceDrone"));
const LogisticsDrone = lazy(() => import("./drones/LogisticsDrone"));
const MappingDrone = lazy(() => import("./drones/MappingDrone"));
const PowerSystemDrone = lazy(() => import("./drones/PowerSystemDrone"));

type DroneCategory = "soccer" | "surveillance" | "payload" | "mapping" | "batteries";

interface CategoryDroneModelProps {
  scrollProgress: number;
  category: DroneCategory;
  color: string;
}

// Fallback simple drone for loading state
const FallbackDrone = ({ color }: { color: string }) => (
  <mesh>
    <boxGeometry args={[0.5, 0.1, 0.5]} />
    <meshStandardMaterial color={color} />
  </mesh>
);

// Inner component with scroll-based animation
const AnimatedDrone = ({ scrollProgress, category, color }: CategoryDroneModelProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  
  // Calculate responsive scale
  const baseScale = Math.min(viewport.width, viewport.height) * 0.18;
  
  useFrame((state) => {
    if (groupRef.current) {
      const progress = scrollProgress;
      const time = state.clock.elapsedTime;
      
      // Smooth entry animation - emerge from slightly below and back
      const entryProgress = Math.min(progress * 2, 1); // Fast initial entry
      groupRef.current.position.z = THREE.MathUtils.lerp(-5, 0, entryProgress);
      groupRef.current.position.y = THREE.MathUtils.lerp(-1, 0, entryProgress);
      
      // Subtle hover motion after entry
      if (progress > 0.3) {
        const hoverIntensity = Math.min((progress - 0.3) * 2, 1);
        groupRef.current.position.y += Math.sin(time * 1.5) * 0.08 * hoverIntensity;
        groupRef.current.position.x = Math.sin(time * 0.8) * 0.05 * hoverIntensity;
      }
      
      // Gentle rotation revealing the drone
      groupRef.current.rotation.y = THREE.MathUtils.lerp(-Math.PI / 4, Math.PI / 6, progress);
      groupRef.current.rotation.x = Math.sin(time * 0.5) * 0.05 * Math.min(progress, 1);
      groupRef.current.rotation.z = Math.sin(time * 0.7) * 0.03 * Math.min(progress, 1);
      
      // Scale animation - smooth grow
      const scaleProgress = THREE.MathUtils.smoothstep(progress, 0, 0.5);
      const scaleValue = THREE.MathUtils.lerp(0.4, 1, scaleProgress);
      groupRef.current.scale.setScalar(baseScale * scaleValue);
    }
  });

  // Select drone based on category
  const DroneComponent = () => {
    switch (category) {
      case "soccer":
        return <SportsDrone color={color} />;
      case "surveillance":
        return <SurveillanceDrone color={color} />;
      case "payload":
        return <LogisticsDrone color={color} />;
      case "mapping":
        return <MappingDrone color={color} />;
      case "batteries":
        return <PowerSystemDrone color={color} />;
      default:
        return <FallbackDrone color={color} />;
    }
  };

  return (
    <Float 
      speed={1.2} 
      rotationIntensity={0.08} 
      floatIntensity={0.2}
      floatingRange={[-0.05, 0.05]}
    >
      <group ref={groupRef}>
        <Suspense fallback={<FallbackDrone color={color} />}>
          <DroneComponent />
        </Suspense>
      </group>
    </Float>
  );
};

interface CategoryDroneProps {
  scrollProgress: number;
  category: DroneCategory;
  color: string;
  className?: string;
}

// Main component with Canvas
const CategoryDrone = ({ 
  scrollProgress, 
  category, 
  color, 
  className = "" 
}: CategoryDroneProps) => {
  return (
    <div className={`w-full h-full ${className}`} style={{ pointerEvents: "none" }}>
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent", pointerEvents: "none" }}
        dpr={[1, 1.5]} // Limit pixel ratio for performance
      >
        {/* Ambient and directional lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1.4} color="#ffffff" />
        <directionalLight position={[-5, 3, -5]} intensity={0.8} color={color} />
        <spotLight 
          position={[0, 10, 0]} 
          angle={0.4} 
          penumbra={1} 
          intensity={0.8} 
          color={color} 
        />
        
        {/* Rim light for depth */}
        <pointLight position={[-3, 0, -3]} intensity={0.5} color="#ffffff" />
        
        <AnimatedDrone 
          scrollProgress={scrollProgress} 
          category={category} 
          color={color} 
        />
        
        <Environment preset="night" />
      </Canvas>
    </div>
  );
};

export default CategoryDrone;
export type { DroneCategory };
