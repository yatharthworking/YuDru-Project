import { motion } from "framer-motion";

const SignalWaves = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="w-1 bg-primary rounded-full"
          animate={{
            height: [8, 24, 8],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 1,
            delay: i * 0.15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default SignalWaves;
