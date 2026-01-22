import { useRef, Suspense, lazy } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, LucideIcon } from "lucide-react";

const ScrollDrone = lazy(() => import("@/components/3d/ScrollDrone"));

interface ProductShowcaseProps {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  features: string[];
  useCases: string[];
  color: string;
  index: number;
}

const ProductShowcase = ({
  id,
  name,
  tagline,
  description,
  icon: Icon,
  features,
  useCases,
  color,
  index,
}: ProductShowcaseProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  
  // Transform scroll progress for drone animation
  const droneProgress = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.5, 1, 1]);
  const contentOpacity = useTransform(scrollYProgress, [0.1, 0.3, 0.8, 1], [0, 1, 1, 0.5]);
  const contentY = useTransform(scrollYProgress, [0.1, 0.3], [50, 0]);
  
  const isEven = index % 2 === 0;
  
  return (
    <motion.section
      ref={containerRef}
      id={id}
      className="min-h-screen relative flex items-center py-20 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />
      
      {/* Animated grid lines */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 grid-pattern" />
        <motion.div
          style={{ opacity: useTransform(scrollYProgress, [0, 0.5], [0.3, 0.1]) }}
          className="absolute inset-0"
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-primary to-transparent"
              style={{
                top: `${20 + i * 15}%`,
                left: 0,
                right: 0,
                opacity: useTransform(scrollYProgress, [0.2 + i * 0.1, 0.3 + i * 0.1], [0, 0.5]),
              }}
            />
          ))}
        </motion.div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${isEven ? "" : "lg:flex-row-reverse"}`}>
          {/* 3D Drone */}
          <motion.div
            className={`relative aspect-square max-w-lg mx-auto w-full ${isEven ? "" : "lg:order-2"}`}
          >
            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 rounded-full blur-3xl -z-10"
              style={{
                backgroundColor: color,
                opacity: useTransform(scrollYProgress, [0.2, 0.5], [0, 0.15]),
                scale: useTransform(scrollYProgress, [0.2, 0.6], [0.5, 1.2]),
              }}
            />
            
            <Suspense fallback={
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-32 h-32 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
              </div>
            }>
              <motion.div className="w-full h-full">
                <ScrollDroneWrapper scrollYProgress={droneProgress} color={color} />
              </motion.div>
            </Suspense>
          </motion.div>
          
          {/* Content */}
          <motion.div
            className={isEven ? "" : "lg:order-1"}
            style={{ opacity: contentOpacity, y: contentY }}
          >
            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, x: isEven ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-4 mb-4"
            >
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${color}20`, border: `1px solid ${color}40` }}
              >
                <Icon className="w-6 h-6" style={{ color }} />
              </div>
              <span 
                className="text-sm font-display uppercase tracking-widest"
                style={{ color }}
              >
                {tagline}
              </span>
            </motion.div>
            
            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            >
              {name}
            </motion.h2>
            
            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-muted-foreground mb-8 leading-relaxed"
            >
              {description}
            </motion.p>
            
            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="grid sm:grid-cols-2 gap-3 mb-8"
            >
              {features.map((feature, i) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div 
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-foreground">{feature}</span>
                </motion.div>
              ))}
            </motion.div>
            
            {/* Use Cases */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap gap-2 mb-10"
            >
              {useCases.map((useCase) => (
                <span
                  key={useCase}
                  className="px-4 py-2 bg-secondary/50 border border-border/50 rounded-lg text-sm"
                >
                  {useCase}
                </span>
              ))}
            </motion.div>
            
            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Button variant="hero" asChild>
                <Link to="/contact">
                  View Specifications
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="heroOutline" asChild>
                <Link to="/contact">
                  Request Demo
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

// Wrapper component to handle motion value conversion
const ScrollDroneWrapper = ({ 
  scrollYProgress, 
  color 
}: { 
  scrollYProgress: ReturnType<typeof useTransform<number, number>>; 
  color: string;
}) => {
  const progress = useRef(0);
  
  // Use framer-motion's useTransform to get the actual value
  scrollYProgress.on("change", (v) => {
    progress.current = v;
  });
  
  return <ScrollDroneWithProgress color={color} progressRef={progress} />;
};

// Component that reads from ref
const ScrollDroneWithProgress = ({ 
  color, 
  progressRef 
}: { 
  color: string; 
  progressRef: React.MutableRefObject<number>;
}) => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(progressRef.current);
    }, 16);
    return () => clearInterval(interval);
  }, [progressRef]);
  
  return <ScrollDrone scrollProgress={progress} color={color} />;
};

import { useState, useEffect } from "react";

export default ProductShowcase;
