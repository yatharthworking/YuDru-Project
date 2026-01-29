import { motion } from "framer-motion";

const RadarPulse = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`relative ${className}`}>
      {/* Center dot */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full z-10" />
      
      {/* Pulsing rings */}
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/30"
          initial={{ width: 12, height: 12, opacity: 0.8 }}
          animate={{
            width: [12, 200],
            height: [12, 200],
            opacity: [0.6, 0],
          }}
          transition={{
            duration: 3,
            delay: i * 0.75,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}
      
      {/* Scanning line */}
      <motion.div
        className="absolute top-1/2 left-1/2 origin-left h-[1px] bg-gradient-to-r from-primary/60 to-transparent"
        style={{ width: 100 }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      {/* Grid lines */}
      <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 200 200">
        <circle cx="100" cy="100" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
        <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
        <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
        <line x1="100" y1="0" x2="100" y2="200" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
        <line x1="0" y1="100" x2="200" y2="100" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
      </svg>
    </div>
  );
};

export default RadarPulse;
