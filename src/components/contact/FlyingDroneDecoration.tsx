import { motion } from "framer-motion";

const DroneIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <ellipse cx="12" cy="12" rx="4" ry="2" fill="currentColor" opacity="0.9" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    <line x1="8" y1="12" x2="4" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="16" y1="12" x2="20" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="8" y1="12" x2="4" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="16" y1="12" x2="20" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <ellipse cx="4" cy="8" rx="2" ry="0.6" fill="currentColor" opacity="0.5" />
    <ellipse cx="20" cy="8" rx="2" ry="0.6" fill="currentColor" opacity="0.5" />
    <ellipse cx="4" cy="16" rx="2" ry="0.6" fill="currentColor" opacity="0.5" />
    <ellipse cx="20" cy="16" rx="2" ry="0.6" fill="currentColor" opacity="0.5" />
  </svg>
);

interface FlyingDroneProps {
  delay?: number;
  duration?: number;
  size?: number;
  opacity?: number;
  path?: "left-right" | "right-left" | "diagonal" | "hover";
}

const FlyingDroneDecoration = ({ 
  delay = 0, 
  duration = 15, 
  size = 32, 
  opacity = 0.3,
  path = "left-right" 
}: FlyingDroneProps) => {
  const pathVariants = {
    "left-right": {
      x: ["-100%", "calc(100vw + 100%)"],
      y: [0, -30, 20, -10, 0],
      rotate: [0, 5, -3, 2, 0],
    },
    "right-left": {
      x: ["calc(100vw + 100%)", "-100%"],
      y: [0, 20, -30, 10, 0],
      rotate: [180, 175, 183, 178, 180],
    },
    "diagonal": {
      x: ["-20%", "120%"],
      y: ["-20%", "120%"],
      rotate: [45, 50, 40, 48, 45],
    },
    "hover": {
      x: [0, 10, -5, 8, 0],
      y: [0, -8, 5, -3, 0],
      rotate: [0, 3, -2, 1, 0],
    },
  };

  return (
    <motion.div
      className="absolute pointer-events-none text-primary"
      style={{ opacity }}
      initial={{ x: path === "right-left" ? "calc(100vw + 100%)" : "-100%" }}
      animate={pathVariants[path]}
      transition={{
        duration: path === "hover" ? 4 : duration,
        delay,
        repeat: Infinity,
        ease: "linear",
        times: [0, 0.25, 0.5, 0.75, 1],
      }}
    >
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 0.5, repeat: Infinity }}
      >
        <DroneIcon size={size} />
      </motion.div>
    </motion.div>
  );
};

export default FlyingDroneDecoration;
