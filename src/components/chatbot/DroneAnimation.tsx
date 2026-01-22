import { motion, type Easing } from 'framer-motion';

interface DroneAnimationProps {
  phase: 'idle' | 'flying-in' | 'landing' | 'lifting' | 'exit';
  onAnimationComplete?: () => void;
}

export default function DroneAnimation({ phase, onAnimationComplete }: DroneAnimationProps) {
  if (phase === 'idle') return null;

  const getAnimationProps = (): {
    initial: Record<string, number>;
    animate: Record<string, number | number[]>;
    transition: { duration: number; ease: Easing };
  } => {
    switch (phase) {
      case 'flying-in':
        return {
          initial: { x: -200, y: 0, opacity: 0, rotate: -15 },
          animate: { x: 0, y: 0, opacity: 1, rotate: 0 },
          transition: { duration: 0.5, ease: 'easeOut' }
        };
      case 'landing':
        return {
          initial: { y: 0, scale: 1 },
          animate: { y: 0, scale: 1 },
          transition: { duration: 0.3, ease: 'easeOut' }
        };
      case 'lifting':
        return {
          initial: { y: 0 },
          animate: { y: -60 },
          transition: { duration: 0.4, ease: 'easeInOut' }
        };
      case 'exit':
        return {
          initial: { y: -60, opacity: 1 },
          animate: { y: -200, opacity: 0 },
          transition: { duration: 0.5, ease: 'easeIn' }
        };
      default:
        return {
          initial: { opacity: 0 },
          animate: { opacity: 0 },
          transition: { duration: 0, ease: 'linear' }
        };
    }
  };

  const animProps = getAnimationProps();

  return (
    <motion.div
      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 pointer-events-none"
      initial={animProps.initial}
      animate={animProps.animate}
      transition={animProps.transition}
      onAnimationComplete={onAnimationComplete}
    >
      {/* Drone SVG */}
      <svg
        width="48"
        height="32"
        viewBox="0 0 48 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-[0_0_12px_rgba(0,212,255,0.6)]"
      >
        {/* Main body */}
        <ellipse cx="24" cy="18" rx="8" ry="5" fill="hsl(var(--muted))" stroke="hsl(var(--primary))" strokeWidth="1" />
        
        {/* Arms */}
        <line x1="16" y1="16" x2="6" y2="10" stroke="hsl(var(--muted-foreground))" strokeWidth="2" strokeLinecap="round" />
        <line x1="32" y1="16" x2="42" y2="10" stroke="hsl(var(--muted-foreground))" strokeWidth="2" strokeLinecap="round" />
        <line x1="16" y1="20" x2="6" y2="26" stroke="hsl(var(--muted-foreground))" strokeWidth="2" strokeLinecap="round" />
        <line x1="32" y1="20" x2="42" y2="26" stroke="hsl(var(--muted-foreground))" strokeWidth="2" strokeLinecap="round" />
        
        {/* Propellers - animated blur effect */}
        <g className="animate-spin origin-center" style={{ animationDuration: '0.1s' }}>
          <ellipse cx="6" cy="10" rx="5" ry="1.5" fill="hsl(var(--primary))" opacity="0.7" />
        </g>
        <g className="animate-spin origin-center" style={{ animationDuration: '0.08s' }}>
          <ellipse cx="42" cy="10" rx="5" ry="1.5" fill="hsl(var(--primary))" opacity="0.7" />
        </g>
        <g className="animate-spin origin-center" style={{ animationDuration: '0.12s' }}>
          <ellipse cx="6" cy="26" rx="5" ry="1.5" fill="hsl(var(--primary))" opacity="0.7" />
        </g>
        <g className="animate-spin origin-center" style={{ animationDuration: '0.09s' }}>
          <ellipse cx="42" cy="26" rx="5" ry="1.5" fill="hsl(var(--primary))" opacity="0.7" />
        </g>
        
        {/* Camera/sensor */}
        <circle cx="24" cy="22" r="2" fill="hsl(var(--primary))" />
        
        {/* LED lights */}
        <circle cx="20" cy="16" r="1" fill="#00ff88" className="animate-pulse" />
        <circle cx="28" cy="16" r="1" fill="#ff4444" className="animate-pulse" />
      </svg>
      
      {/* Glow effect during landing */}
      {phase === 'landing' && (
        <motion.div
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-3 rounded-full bg-primary/40 blur-md"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.8] }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  );
}
