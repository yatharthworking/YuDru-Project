import { motion } from "framer-motion";
import type { Easing } from "framer-motion";

interface DroneIndicatorProps {
  isActive: boolean;
}

// Mini drone SVG component with spinning rotors
const MiniDrone = ({ 
  size = 16, 
  className = "",
  showRotorSpin = true
}: { 
  size?: number; 
  className?: string;
  showRotorSpin?: boolean;
}) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
  >
    <defs>
      {/* Define the spin animation */}
      <style>
        {`
          @keyframes rotor-spin {
            0% { transform: scaleX(1); opacity: 0.6; }
            25% { transform: scaleX(0.3); opacity: 0.8; }
            50% { transform: scaleX(1); opacity: 0.6; }
            75% { transform: scaleX(0.3); opacity: 0.8; }
            100% { transform: scaleX(1); opacity: 0.6; }
          }
          .rotor-1 { animation: rotor-spin 0.15s linear infinite; transform-origin: center; }
          .rotor-2 { animation: rotor-spin 0.15s linear infinite 0.04s; transform-origin: center; }
          .rotor-3 { animation: rotor-spin 0.15s linear infinite 0.08s; transform-origin: center; }
          .rotor-4 { animation: rotor-spin 0.15s linear infinite 0.12s; transform-origin: center; }
        `}
      </style>
    </defs>
    {/* Drone body */}
    <ellipse cx="12" cy="12" rx="4" ry="2" fill="currentColor" opacity="0.9" />
    {/* Center dot */}
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    {/* Arms */}
    <line x1="8" y1="12" x2="4" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="16" y1="12" x2="20" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="8" y1="12" x2="4" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="16" y1="12" x2="20" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    {/* Rotors with spin animation */}
    <ellipse cx="4" cy="8" rx="2.5" ry="0.8" fill="currentColor" className={showRotorSpin ? "rotor-1" : ""} opacity="0.6" />
    <ellipse cx="20" cy="8" rx="2.5" ry="0.8" fill="currentColor" className={showRotorSpin ? "rotor-2" : ""} opacity="0.6" />
    <ellipse cx="4" cy="16" rx="2.5" ry="0.8" fill="currentColor" className={showRotorSpin ? "rotor-3" : ""} opacity="0.6" />
    <ellipse cx="20" cy="16" rx="2.5" ry="0.8" fill="currentColor" className={showRotorSpin ? "rotor-4" : ""} opacity="0.6" />
  </svg>
);

const easeInOut: Easing = [0.42, 0, 0.58, 1];
const easeOut: Easing = [0, 0, 0.58, 1];

// Floating animation variants for main drone
const mainDroneVariants = {
  hidden: { 
    opacity: 0, 
    y: 5,
    scale: 0.5 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: easeOut
    }
  },
  exit: {
    opacity: 0,
    y: -5,
    scale: 0.5,
    transition: {
      duration: 0.2
    }
  }
};

// Micro-movement animation for hovering effect
const hoverAnimation = {
  y: [0, -2, 0, -1, 0],
  x: [0, 1, -1, 0.5, 0],
  rotate: [0, 2, -2, 1, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: easeInOut,
    times: [0, 0.25, 0.5, 0.75, 1]
  }
};

// Small satellite drone animations
const satelliteDroneVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: (i: number) => ({
    opacity: 0.5,
    scale: 1,
    transition: {
      delay: 0.2 + i * 0.1,
      duration: 0.3
    }
  }),
  exit: { 
    opacity: 0, 
    scale: 0,
    transition: { duration: 0.15 }
  }
};

// Different floating patterns for satellite drones
const satelliteAnimations = [
  {
    x: [0, 3, -2, 1, 0],
    y: [0, -1, 1, -2, 0],
    rotate: [0, 5, -3, 2, 0],
    transition: { duration: 4, repeat: Infinity, ease: easeInOut }
  },
  {
    x: [0, -2, 3, -1, 0],
    y: [0, 2, -1, 1, 0],
    rotate: [0, -4, 3, -2, 0],
    transition: { duration: 4.5, repeat: Infinity, ease: easeInOut, delay: 0.5 }
  },
  {
    x: [0, 1, -1, 2, 0],
    y: [0, -2, 2, -1, 0],
    rotate: [0, 3, -5, 1, 0],
    transition: { duration: 3.5, repeat: Infinity, ease: easeInOut, delay: 0.3 }
  }
];

const DroneIndicator = ({ isActive }: DroneIndicatorProps) => {
  if (!isActive) return null;

  return (
    <motion.div
      className="absolute -top-4 left-1/2 -translate-x-1/2 pointer-events-none"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={mainDroneVariants}
      layoutId="drone-indicator"
    >
      {/* Main drone */}
      <motion.div 
        className="text-primary drop-shadow-[0_0_6px_hsl(var(--primary)/0.5)]"
        animate={hoverAnimation}
      >
        <MiniDrone size={18} />
      </motion.div>

      {/* Satellite drones */}
      <motion.div
        className="absolute -left-3 -top-1 text-primary/40"
        variants={satelliteDroneVariants}
        custom={0}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <motion.div animate={satelliteAnimations[0]}>
          <MiniDrone size={8} />
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute -right-2 top-0 text-primary/35"
        variants={satelliteDroneVariants}
        custom={1}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <motion.div animate={satelliteAnimations[1]}>
          <MiniDrone size={7} />
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute left-0 -top-2 text-primary/30"
        variants={satelliteDroneVariants}
        custom={2}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <motion.div animate={satelliteAnimations[2]}>
          <MiniDrone size={6} />
        </motion.div>
      </motion.div>

      {/* Subtle glow effect under main drone */}
      <motion.div 
        className="absolute top-3 left-1/2 -translate-x-1/2 w-4 h-1 bg-primary/20 rounded-full blur-sm"
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: easeInOut
        }}
      />
    </motion.div>
  );
};

export default DroneIndicator;
