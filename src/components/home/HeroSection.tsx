import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Suspense, lazy } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Cpu, Zap, Users } from "lucide-react";
import AnimatedCounter from "@/components/common/AnimatedCounter";
import heroBg from "@/assets/hero-bg.jpg";

// Lazy load the 3D drone for performance
const HeroDrone = lazy(() => import("@/components/3d/HeroDrone"));
const HeroSection = () => {
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img src={heroBg} alt="YuDru Drone Technology Background" className="w-full h-full object-cover opacity-40 md:opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background/50" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-10 md:opacity-20 z-[1]" />

      {/* 3D Drone - Hidden on small mobile, visible on md+ with better positioning */}
      <div className="hidden sm:block">
        <Suspense fallback={<div className="absolute inset-0 flex items-center justify-center z-[5]">
            <div className="w-24 h-24 md:w-32 md:h-32 border-2 border-primary/30 rounded-full animate-pulse" />
          </div>}>
          <HeroDrone />
        </Suspense>
      </div>

      {/* Mobile Drone Glow Effect - Shows on small screens instead of 3D */}
      <motion.div className="sm:hidden absolute inset-0 flex items-center justify-center z-[4] pointer-events-none" initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} transition={{
      duration: 1.5
    }}>
        <motion.div className="w-[200px] h-[150px] bg-primary/20 rounded-full blur-[60px]" animate={{
        scale: [1, 1.15, 1],
        opacity: [0.2, 0.35, 0.2]
      }} transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }} />
      </motion.div>
      
      {/* Ambient glow behind drone - Desktop */}
      <motion.div className="hidden sm:flex absolute inset-0 items-center justify-center z-[4] pointer-events-none" initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} transition={{
      duration: 2
    }}>
        <motion.div className="w-[300px] md:w-[400px] lg:w-[600px] h-[180px] md:h-[250px] lg:h-[350px] bg-primary/15 rounded-full blur-[80px] md:blur-[100px]" animate={{
        scale: [1, 1.1, 1],
        opacity: [0.15, 0.25, 0.15]
      }} transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }} />
      </motion.div>

      {/* Content - Above drone */}
      <div className="container mx-auto px-4 md:px-6 relative z-10 pt-20 md:pt-24">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6
        }} className="mb-6 md:mb-8">
            
          </motion.div>

          {/* Headline */}
          <motion.h1 initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.1
        }} className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-4 md:mb-6 leading-tight px-2">
            Built for Excellence.
            <br />
            <span className="text-gradient">Engineered for Innovation.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.2
        }} className="text-base md:text-lg lg:text-xl text-muted-foreground mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed backdrop-blur-[2px] px-4">
            Pioneering indigenous drone technology solutions for monitoring, logistics, 
            and industrial applications. From R&D to training, we deliver excellence.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.3
        }} className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 mb-12 md:mb-16 relative z-20 px-4">
            <Button variant="hero" size="lg" className="w-full sm:w-auto min-h-[48px]" asChild>
              <Link to="/products">
                Explore Products
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
              </Link>
            </Button>
            <Button variant="heroOutline" size="lg" className="w-full sm:w-auto min-h-[48px]" asChild>
              <Link to="/contact">Get a Quote</Link>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{
          opacity: 0,
          y: 40
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.4
        }} className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 lg:gap-8 relative z-20 px-2">
            {[{
            value: 50,
            suffix: "+",
            label: "Drone Models",
            icon: Cpu
          }, {
            value: 500,
            suffix: "+",
            label: "Trained Pilots",
            icon: Users
          }, {
            value: 5,
            suffix: "+",
            label: "Years R&D",
            icon: Zap
          }, {
            value: 100,
            suffix: "%",
            label: "Non-Chinese",
            icon: Shield
          }].map((stat, index) => <motion.div key={stat.label} initial={{
            opacity: 0,
            scale: 0.9
          }} animate={{
            opacity: 1,
            scale: 1
          }} transition={{
            duration: 0.4,
            delay: 0.5 + index * 0.1
          }} className="glass-card p-4 md:p-6 hover-glow group">
                <stat.icon className="w-5 h-5 md:w-6 md:h-6 text-primary mb-2 md:mb-3 mx-auto opacity-70 group-hover:opacity-100 transition-opacity" />
                <div className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-gradient mb-1">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-xs md:text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>)}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator - Hidden on mobile */}
      <motion.div initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} transition={{
      delay: 1
    }} className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
      </motion.div>
    </section>;
};
export default HeroSection;