import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import * as THREE from 'three';

interface ControllerModelProps {
  isClicked: boolean;
  velocityX: number;
  velocityY: number;
  isHovering: boolean;
}

function ControllerModel({ isClicked, velocityX, velocityY, isHovering }: ControllerModelProps) {
  const groupRef = useRef<THREE.Group>(null!);
  const leftJoystickRef = useRef<THREE.Group>(null!);
  const rightJoystickRef = useRef<THREE.Group>(null!);
  const [ledIntensity, setLedIntensity] = useState(1);
  const [hoverScale, setHoverScale] = useState(1);
  const [hoverPulse, setHoverPulse] = useState(0);

  // LED pulse on click
  useEffect(() => {
    if (isClicked) {
      setLedIntensity(4);
      const timer = setTimeout(() => setLedIntensity(isHovering ? 2.5 : 1), 150);
      return () => clearTimeout(timer);
    }
  }, [isClicked, isHovering]);

  // Hover effects
  useEffect(() => {
    if (isHovering) {
      setLedIntensity(2.5);
      setHoverScale(1.1);
    } else {
      setLedIntensity(1);
      setHoverScale(1);
    }
  }, [isHovering]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Smooth tilt based on velocity
      const targetRotationY = THREE.MathUtils.clamp(velocityX * 0.0008, -0.3, 0.3);
      const targetRotationX = THREE.MathUtils.clamp(velocityY * 0.0008, -0.2, 0.2);
      
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotationY,
        delta * 5
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetRotationX,
        delta * 5
      );

      // Smooth scale transition for hover
      const targetScale = hoverScale * 0.5;
      groupRef.current.scale.x = THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, delta * 8);
      groupRef.current.scale.y = THREE.MathUtils.lerp(groupRef.current.scale.y, targetScale, delta * 8);
      groupRef.current.scale.z = THREE.MathUtils.lerp(groupRef.current.scale.z, targetScale, delta * 8);
    }

    // Hover pulse animation
    if (isHovering) {
      setHoverPulse(prev => (prev + delta * 4) % (Math.PI * 2));
    }

    // Joystick depression on click
    if (leftJoystickRef.current && rightJoystickRef.current) {
      const targetY = isClicked ? -0.02 : 0;
      leftJoystickRef.current.position.y = THREE.MathUtils.lerp(
        leftJoystickRef.current.position.y,
        targetY,
        delta * 15
      );
      rightJoystickRef.current.position.y = THREE.MathUtils.lerp(
        rightJoystickRef.current.position.y,
        targetY,
        delta * 15
      );
    }
  });

  // Materials
  const gunmetalMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color(0x3a3a3a),
    metalness: 0.7,
    roughness: 0.4,
  });

  const darkSilverMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color(0x5a5a5a),
    metalness: 0.8,
    roughness: 0.3,
  });

  const rubberMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color(0x2a2a2a),
    metalness: 0.1,
    roughness: 0.9,
  });

  // Dynamic LED color for hover state
  const pulseIntensity = isHovering ? ledIntensity + Math.sin(hoverPulse) * 0.5 : ledIntensity;
  const ledColor = isHovering ? new THREE.Color(0x00ffaa) : new THREE.Color(0x00d4ff);
  
  const ledMaterial = new THREE.MeshStandardMaterial({
    color: ledColor,
    emissive: ledColor,
    emissiveIntensity: pulseIntensity,
    metalness: 0.5,
    roughness: 0.2,
  });

  const joystickCapMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color(0x1a1a1a),
    metalness: 0.3,
    roughness: 0.7,
  });

  return (
    <Float speed={2} rotationIntensity={0.1} floatIntensity={0.3}>
      {/* Apply 45-degree forward tilt to the entire controller */}
      <group rotation={[Math.PI / 4, 0, 0]}>
      <group ref={groupRef} scale={0.5}>
        {/* Main Body */}
        <mesh position={[0, 0, 0]} material={gunmetalMaterial}>
          <boxGeometry args={[1.8, 0.3, 0.8]} />
        </mesh>

        {/* Top Panel */}
        <mesh position={[0, 0.18, 0]} material={darkSilverMaterial}>
          <boxGeometry args={[1.6, 0.06, 0.7]} />
        </mesh>

        {/* Left Grip */}
        <mesh position={[-0.75, -0.15, 0]} material={rubberMaterial}>
          <boxGeometry args={[0.35, 0.5, 0.6]} />
        </mesh>
        <mesh position={[-0.75, -0.15, 0.32]} material={rubberMaterial}>
          <boxGeometry args={[0.3, 0.45, 0.08]} />
        </mesh>
        <mesh position={[-0.75, -0.15, -0.32]} material={rubberMaterial}>
          <boxGeometry args={[0.3, 0.45, 0.08]} />
        </mesh>

        {/* Right Grip */}
        <mesh position={[0.75, -0.15, 0]} material={rubberMaterial}>
          <boxGeometry args={[0.35, 0.5, 0.6]} />
        </mesh>
        <mesh position={[0.75, -0.15, 0.32]} material={rubberMaterial}>
          <boxGeometry args={[0.3, 0.45, 0.08]} />
        </mesh>
        <mesh position={[0.75, -0.15, -0.32]} material={rubberMaterial}>
          <boxGeometry args={[0.3, 0.45, 0.08]} />
        </mesh>

        {/* Left Joystick Base */}
        <mesh position={[-0.4, 0.22, 0]} material={darkSilverMaterial}>
          <cylinderGeometry args={[0.15, 0.15, 0.08, 16]} />
        </mesh>
        {/* Left Joystick */}
        <group ref={leftJoystickRef} position={[-0.4, 0.32, 0]}>
          <mesh material={darkSilverMaterial}>
            <cylinderGeometry args={[0.04, 0.04, 0.12, 12]} />
          </mesh>
          <mesh position={[0, 0.08, 0]} material={joystickCapMaterial}>
            <sphereGeometry args={[0.08, 16, 16]} />
          </mesh>
        </group>

        {/* Right Joystick Base */}
        <mesh position={[0.4, 0.22, 0]} material={darkSilverMaterial}>
          <cylinderGeometry args={[0.15, 0.15, 0.08, 16]} />
        </mesh>
        {/* Right Joystick */}
        <group ref={rightJoystickRef} position={[0.4, 0.32, 0]}>
          <mesh material={darkSilverMaterial}>
            <cylinderGeometry args={[0.04, 0.04, 0.12, 12]} />
          </mesh>
          <mesh position={[0, 0.08, 0]} material={joystickCapMaterial}>
            <sphereGeometry args={[0.08, 16, 16]} />
          </mesh>
        </group>

        {/* LED Strips - Top Edge */}
        <mesh position={[0, 0.22, 0.36]} material={ledMaterial}>
          <boxGeometry args={[1.5, 0.02, 0.02]} />
        </mesh>
        <mesh position={[0, 0.22, -0.36]} material={ledMaterial}>
          <boxGeometry args={[1.5, 0.02, 0.02]} />
        </mesh>

        {/* LED Strips - Side Edges */}
        <mesh position={[-0.81, 0.22, 0]} material={ledMaterial}>
          <boxGeometry args={[0.02, 0.02, 0.7]} />
        </mesh>
        <mesh position={[0.81, 0.22, 0]} material={ledMaterial}>
          <boxGeometry args={[0.02, 0.02, 0.7]} />
        </mesh>

        {/* Center LED Strip */}
        <mesh position={[0, 0.22, 0]} material={ledMaterial}>
          <boxGeometry args={[0.3, 0.015, 0.015]} />
        </mesh>

        {/* LED Button Accents */}
        <mesh position={[-0.15, 0.22, 0.15]} material={ledMaterial}>
          <cylinderGeometry args={[0.03, 0.03, 0.02, 8]} />
        </mesh>
        <mesh position={[0.15, 0.22, 0.15]} material={ledMaterial}>
          <cylinderGeometry args={[0.03, 0.03, 0.02, 8]} />
        </mesh>
        <mesh position={[-0.15, 0.22, -0.15]} material={ledMaterial}>
          <cylinderGeometry args={[0.03, 0.03, 0.02, 8]} />
        </mesh>
        <mesh position={[0.15, 0.22, -0.15]} material={ledMaterial}>
          <cylinderGeometry args={[0.03, 0.03, 0.02, 8]} />
        </mesh>

        {/* Left Antenna */}
        <mesh position={[-0.7, 0.35, -0.25]} material={darkSilverMaterial}>
          <cylinderGeometry args={[0.015, 0.015, 0.3, 8]} />
        </mesh>
        <mesh position={[-0.7, 0.52, -0.25]} material={ledMaterial}>
          <sphereGeometry args={[0.025, 8, 8]} />
        </mesh>

        {/* Right Antenna */}
        <mesh position={[0.7, 0.35, -0.25]} material={darkSilverMaterial}>
          <cylinderGeometry args={[0.015, 0.015, 0.3, 8]} />
        </mesh>
        <mesh position={[0.7, 0.52, -0.25]} material={ledMaterial}>
          <sphereGeometry args={[0.025, 8, 8]} />
        </mesh>

        {/* Switches / Toggles */}
        <mesh position={[-0.25, 0.25, -0.22]} material={darkSilverMaterial}>
          <boxGeometry args={[0.08, 0.06, 0.04]} />
        </mesh>
        <mesh position={[0.25, 0.25, -0.22]} material={darkSilverMaterial}>
          <boxGeometry args={[0.08, 0.06, 0.04]} />
        </mesh>

        {/* Shoulder Buttons */}
        <mesh position={[-0.6, 0.18, -0.42]} material={gunmetalMaterial}>
          <boxGeometry args={[0.25, 0.08, 0.06]} />
        </mesh>
        <mesh position={[0.6, 0.18, -0.42]} material={gunmetalMaterial}>
          <boxGeometry args={[0.25, 0.08, 0.06]} />
        </mesh>

        {/* Trigger Buttons with LED accent */}
        <mesh position={[-0.6, 0.08, -0.42]} material={darkSilverMaterial}>
          <boxGeometry args={[0.2, 0.12, 0.04]} />
        </mesh>
        <mesh position={[-0.6, 0.02, -0.42]} material={ledMaterial}>
          <boxGeometry args={[0.15, 0.01, 0.02]} />
        </mesh>
        <mesh position={[0.6, 0.08, -0.42]} material={darkSilverMaterial}>
          <boxGeometry args={[0.2, 0.12, 0.04]} />
        </mesh>
        <mesh position={[0.6, 0.02, -0.42]} material={ledMaterial}>
          <boxGeometry args={[0.15, 0.01, 0.02]} />
        </mesh>
      </group>
      </group>
    </Float>
  );
}

export default function DroneControllerCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const lastPosition = useRef({ x: 0, y: 0 });
  const targetPosition = useRef({ x: 0, y: 0 });
  const animationFrame = useRef<number>();

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Interactive element selectors
    const interactiveSelectors = 'a, button, [role="button"], input, select, textarea, label[for], [tabindex]:not([tabindex="-1"]), .cursor-pointer';

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      targetPosition.current = { x: e.clientX, y: e.clientY };
      setVelocity({
        x: e.clientX - lastPosition.current.x,
        y: e.clientY - lastPosition.current.y,
      });
      lastPosition.current = { x: e.clientX, y: e.clientY };
      setIsVisible(true);

      // Check if hovering over interactive element
      const target = e.target as Element;
      const isInteractive = target.closest(interactiveSelectors) !== null;
      setIsHovering(isInteractive);
    };

    // Mouse down/up handlers
    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    // Mouse leave handler
    const handleMouseLeave = () => setIsVisible(false);

    // Smooth animation loop with minimal lag
    const animate = () => {
      setPosition(prev => ({
        x: prev.x + (targetPosition.current.x - prev.x) * 0.35,
        y: prev.y + (targetPosition.current.y - prev.y) * 0.35,
      }));
      animationFrame.current = requestAnimationFrame(animate);
    };

    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mousedown', handleMouseDown);
      window.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('mouseleave', handleMouseLeave);
      animate();
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', checkMobile);
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [isMobile]);

  // Don't render on mobile
  if (isMobile) return null;

  return (
    <div
      className="fixed pointer-events-none z-[9999]"
      style={{
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -50%)',
        width: '150px',
        height: '115px',
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.3s ease',
      }}
    >
      {/* Outer secondary pulsing ring */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: isHovering ? '120px' : '0px',
          height: isHovering ? '120px' : '0px',
          border: '1px solid rgba(0, 255, 170, 0.3)',
          boxShadow: '0 0 30px rgba(0, 255, 170, 0.2)',
          opacity: isHovering ? 1 : 0,
          transition: 'all 0.4s ease-out',
          animation: isHovering ? 'pulse-ring-outer 1.5s ease-in-out infinite 0.2s' : 'none',
        }}
      />
      {/* Inner pulsing glow ring on hover */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: isHovering ? '90px' : '0px',
          height: isHovering ? '90px' : '0px',
          border: '2px solid rgba(0, 255, 170, 0.6)',
          boxShadow: '0 0 20px rgba(0, 255, 170, 0.4), inset 0 0 20px rgba(0, 255, 170, 0.1)',
          opacity: isHovering ? 1 : 0,
          transition: 'all 0.3s ease-out',
          animation: isHovering ? 'pulse-ring 1.5s ease-in-out infinite' : 'none',
        }}
      />
      <style>{`
        @keyframes pulse-ring {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.8;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.15);
            opacity: 0.4;
          }
        }
        @keyframes pulse-ring-outer {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.6;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.1);
            opacity: 0.2;
          }
        }
      `}</style>
      {/* Outer Glow - Enhanced on hover */}
      <div 
        className="absolute inset-0 rounded-full transition-all duration-300"
        style={{
          background: isHovering 
            ? 'radial-gradient(ellipse at center, rgba(0, 255, 170, 0.4) 0%, rgba(0, 255, 170, 0.15) 40%, transparent 70%)'
            : 'radial-gradient(ellipse at center, rgba(0, 212, 255, 0.25) 0%, rgba(0, 212, 255, 0.1) 40%, transparent 70%)',
          filter: isHovering ? 'blur(20px)' : 'blur(15px)',
          transform: isHovering ? 'scale(1.8)' : 'scale(1.5)',
        }}
      />
      
      {/* Soft Shadow */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2"
        style={{
          width: '100px',
          height: '20px',
          background: 'radial-gradient(ellipse at center, rgba(0, 0, 0, 0.4) 0%, transparent 70%)',
          filter: 'blur(8px)',
          transform: 'translateY(30px)',
        }}
      />

      <Canvas
        camera={{ position: [0, 0.5, 2.5], fov: 45 }}
        style={{ background: 'transparent', pointerEvents: 'none' }}
        gl={{ alpha: true, antialias: true }}
        eventSource={undefined}
        eventPrefix="client"
      >
        {/* Ambient fill lighting */}
        <ambientLight intensity={0.6} />
        
        {/* Key light */}
        <directionalLight 
          position={[3, 5, 2]} 
          intensity={1.2} 
          color="#ffffff"
        />
        
        {/* Fill light */}
        <directionalLight 
          position={[-3, 2, 4]} 
          intensity={0.6} 
          color="#e0f0ff"
        />
        
        {/* Rim light for edge highlights */}
        <directionalLight 
          position={[0, -2, -3]} 
          intensity={0.8} 
          color="#00d4ff"
        />
        
        {/* Top light */}
        <pointLight 
          position={[0, 3, 0]} 
          intensity={0.5} 
          color="#ffffff"
        />

        <ControllerModel 
          isClicked={isClicked} 
          velocityX={velocity.x} 
          velocityY={velocity.y}
          isHovering={isHovering}
        />
        
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
