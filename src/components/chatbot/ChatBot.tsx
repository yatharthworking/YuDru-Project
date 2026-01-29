import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DroneAnimation from './DroneAnimation';
import ChatPanel from './ChatPanel';

type AnimationPhase = 'idle' | 'flying-in' | 'landing' | 'lifting' | 'exit';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [animationPhase, setAnimationPhase] = useState<AnimationPhase>('idle');
  const [showPanel, setShowPanel] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const handleOpen = useCallback(() => {
    if (isOpen) return;
    
    if (prefersReducedMotion) {
      setIsOpen(true);
      setShowPanel(true);
      return;
    }

    setAnimationPhase('flying-in');
  }, [isOpen, prefersReducedMotion]);

  const handleClose = useCallback(() => {
    setShowPanel(false);
    setIsOpen(false);
    setAnimationPhase('idle');
  }, []);

  const handleAnimationComplete = useCallback(() => {
    switch (animationPhase) {
      case 'flying-in':
        setAnimationPhase('landing');
        break;
      case 'landing':
        setAnimationPhase('lifting');
        break;
      case 'lifting':
        setIsOpen(true);
        setShowPanel(true);
        setAnimationPhase('exit');
        break;
      case 'exit':
        setAnimationPhase('idle');
        break;
    }
  }, [animationPhase]);

  return (
    <div 
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50"
      role="complementary"
      aria-label="SkyPilot AI Assistant"
    >
      {/* Chat Panel */}
      <AnimatePresence>
        {showPanel && (
          <ChatPanel isOpen={showPanel} onClose={handleClose} />
        )}
      </AnimatePresence>

      {/* Drone Animation */}
      <div className="relative">
        <DroneAnimation 
          phase={animationPhase} 
          onAnimationComplete={handleAnimationComplete} 
        />

        {/* Button */}
        <motion.button
          onClick={isOpen ? handleClose : handleOpen}
          className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-card border-2 border-primary/50 shadow-lg flex items-center justify-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          style={{
            boxShadow: '0 0 20px rgba(0, 212, 255, 0.3), 0 4px 20px rgba(0, 0, 0, 0.3)',
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={isOpen ? 'Close SkyPilot' : 'Open SkyPilot AI Assistant'}
          aria-expanded={isOpen}
        >
          {/* Pulsing ring */}
          <span className="absolute inset-0 rounded-full bg-primary/20 animate-ping opacity-75" />
          
          {/* Glow effect */}
          <span 
            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: 'radial-gradient(circle, rgba(0, 212, 255, 0.4) 0%, transparent 70%)',
            }}
          />

          {/* Controller Icon */}
          <svg
            width="28"
            height="28"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="relative z-10 text-primary transition-transform duration-300 group-hover:scale-110"
          >
            {/* Main body */}
            <rect x="4" y="10" width="24" height="12" rx="3" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="1.5" />
            
            {/* Left joystick */}
            <circle cx="10" cy="16" r="3" fill="currentColor" opacity="0.4" />
            <circle cx="10" cy="16" r="1.5" fill="currentColor" />
            
            {/* Right joystick */}
            <circle cx="22" cy="16" r="3" fill="currentColor" opacity="0.4" />
            <circle cx="22" cy="16" r="1.5" fill="currentColor" />
            
            {/* Antenna left */}
            <line x1="8" y1="10" x2="6" y2="5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="6" cy="4" r="1" fill="currentColor" />
            
            {/* Antenna right */}
            <line x1="24" y1="10" x2="26" y2="5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="26" cy="4" r="1" fill="currentColor" />
            
            {/* Center LED */}
            <rect x="14" y="14" width="4" height="4" rx="1" fill="currentColor" className="animate-pulse" />
          </svg>

          {/* Close X overlay when open */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                className="absolute inset-0 flex items-center justify-center bg-card rounded-full"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-primary">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );
}
