import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import yudruLogo from "@/assets/yudru-logo.png";
import DroneIndicator from "./DroneIndicator";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/products" },
  { name: "R&D", path: "/research" },
  { name: "Training", path: "/training" },
  { name: "Drone Labs", path: "/labs" },
  { name: "Repair", path: "/repair" },
  { name: "Blog", path: "/blog" },
  { name: "About", path: "/about" },
];

// Magnetic hover effect hook
const useMagneticHover = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 15, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    x.set((event.clientX - centerX) * 0.15);
    y.set((event.clientY - centerY) * 0.15);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { springX, springY, handleMouseMove, handleMouseLeave };
};

// Nav link component with magnetic effect
const NavLink = ({ 
  link, 
  isActive, 
  index 
}: { 
  link: typeof navLinks[0]; 
  isActive: boolean; 
  index: number;
}) => {
  const { springX, springY, handleMouseMove, handleMouseLeave } = useMagneticHover();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      className="relative"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        delay: index * 0.05 + 0.3, 
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    >
      <AnimatePresence mode="wait">
        <DroneIndicator isActive={isActive} />
      </AnimatePresence>
      
      <motion.div
        style={{ x: springX, y: springY }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          handleMouseLeave();
          setIsHovered(false);
        }}
        onMouseEnter={() => setIsHovered(true)}
      >
        <Link
          to={link.path}
          className={cn(
            "relative px-3 xl:px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-300 block group",
            isActive
              ? "text-primary"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {/* Background glow on hover */}
          <motion.span
            className="absolute inset-0 rounded-lg bg-primary/5"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? 1 : 0.8
            }}
            transition={{ duration: 0.2 }}
          />
          
          {/* Glowing border on hover */}
          <motion.span
            className="absolute inset-0 rounded-lg border border-primary/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered && !isActive ? 0.5 : 0 }}
            transition={{ duration: 0.2 }}
          />
          
          <span className="relative inline-block z-10">
            {/* Text with character animation on hover */}
            <span className="flex">
              {link.name.split('').map((char, i) => (
                <motion.span
                  key={i}
                  animate={{
                    y: isHovered ? [0, -2, 0] : 0,
                  }}
                  transition={{
                    delay: i * 0.02,
                    duration: 0.3,
                    ease: "easeOut"
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </span>
            
            {/* Animated underline */}
            <motion.span
              className="absolute left-0 -bottom-1 h-[2px] bg-gradient-to-r from-primary via-primary to-cyan-400 rounded-full"
              initial={{ width: "0%", left: "50%" }}
              animate={{
                width: isActive ? "100%" : isHovered ? "100%" : "0%",
                left: isActive ? "0%" : isHovered ? "0%" : "50%",
              }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
            
            {/* Active glow effect */}
            {isActive && (
              <motion.span
                className="absolute left-0 -bottom-1 h-[2px] w-full bg-primary/50 blur-sm rounded-full"
                layoutId="active-glow"
                transition={{ duration: 0.3 }}
              />
            )}
          </span>
        </Link>
      </motion.div>
    </motion.div>
  );
};

// Logo component with hover animations
const AnimatedLogo = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Link 
      to="/" 
      className="flex items-center group z-50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div 
        className="relative"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <motion.img 
          src={yudruLogo} 
          alt="YuDru Drones Logo" 
          className="w-16 h-16 md:w-20 md:h-20 object-contain cursor-pointer"
          animate={{
            rotate: isHovered ? [0, -5, 5, 0] : 0,
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        />
        
        {/* Animated glow rings */}
        <motion.div 
          className="absolute inset-0 rounded-full"
          animate={{
            boxShadow: isHovered 
              ? [
                  "0 0 0 0 hsl(var(--primary) / 0)",
                  "0 0 20px 10px hsl(var(--primary) / 0.2)",
                  "0 0 30px 15px hsl(var(--primary) / 0)"
                ]
              : "0 0 0 0 hsl(var(--primary) / 0)"
          }}
          transition={{ duration: 0.8 }}
        />
        
        {/* Orbiting particles */}
        <AnimatePresence>
          {isHovered && (
            <>
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute w-1.5 h-1.5 bg-primary rounded-full"
                  initial={{ 
                    opacity: 0,
                    x: 0,
                    y: 0,
                  }}
                  animate={{ 
                    opacity: [0, 1, 0],
                    x: [0, Math.cos((i * 120) * Math.PI / 180) * 35],
                    y: [0, Math.sin((i * 120) * Math.PI / 180) * 35],
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ 
                    duration: 0.6,
                    delay: i * 0.1,
                    ease: "easeOut"
                  }}
                  style={{
                    left: "50%",
                    top: "50%",
                    marginLeft: -3,
                    marginTop: -3,
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </Link>
  );
};

// CTA Button with enhanced animations
const AnimatedCTA = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative"
    >
      {/* Animated background glow */}
      <motion.div
        className="absolute -inset-1 bg-gradient-to-r from-primary/50 to-cyan-400/50 rounded-xl blur-lg"
        animate={{
          opacity: isHovered ? 0.6 : 0,
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ duration: 0.3 }}
      />
      
      <Button 
        variant="hero" 
        size="default" 
        asChild
        className="relative overflow-hidden group"
      >
        <Link to="/contact">
          <motion.span
            className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
            initial={{ x: "-100%" }}
            animate={{ x: isHovered ? "100%" : "-100%" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
          <span className="relative z-10">Get in Touch</span>
        </Link>
      </Button>
    </motion.div>
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }
      
      lastScrollY.current = currentScrollY;
      setScrolled(currentScrollY > 50);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ 
        y: scrollDirection === 'down' && scrolled ? -100 : 0,
        opacity: 1
      }}
      transition={{ 
        duration: 0.4, 
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "py-2 md:py-3"
          : "py-3 md:py-5"
      )}
    >
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 border-b"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: scrolled ? 1 : 0,
          backdropFilter: scrolled ? "blur(16px)" : "blur(0px)"
        }}
        style={{
          background: scrolled 
            ? "hsl(var(--background) / 0.85)" 
            : "transparent",
          borderColor: scrolled 
            ? "hsl(var(--border) / 0.5)" 
            : "transparent"
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Gradient accent line at top */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ 
          scaleX: scrolled ? 1 : 0,
          opacity: scrolled ? 1 : 0
        }}
        transition={{ duration: 0.5, delay: 0.1 }}
      />

      <div className="container mx-auto px-4 md:px-6 relative">
        <div className="flex items-center justify-between">
          {/* Animated Logo */}
          <AnimatedLogo />

          {/* Desktop Navigation */}
          <motion.div 
            className="hidden lg:flex items-center gap-1 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {/* Background pill that follows active item */}
            {navLinks.map((link, index) => {
              const isActive = location.pathname === link.path;
              return (
                <NavLink 
                  key={link.path} 
                  link={link} 
                  isActive={isActive} 
                  index={index}
                />
              );
            })}
          </motion.div>

          {/* CTA Button - Desktop */}
          <div className="hidden lg:block">
            <AnimatedCTA />
          </div>

          {/* Mobile Hamburger Menu */}
          <div className="lg:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="relative z-[110]"
                  aria-label="Toggle menu"
                >
                  <motion.div
                    animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {mobileMenuOpen ? (
                      <X className="h-6 w-6" />
                    ) : (
                      <Menu className="h-6 w-6" />
                    )}
                  </motion.div>
                </Button>
              </SheetTrigger>
              <SheetContent 
                side="right" 
                className="w-[300px] sm:w-[350px] bg-background/95 backdrop-blur-xl border-l border-border/50 pt-16"
              >
                <nav className="flex flex-col gap-2 mt-4">
                  {navLinks.map((link, index) => {
                    const isActive = location.pathname === link.path;
                    return (
                      <motion.div
                        key={link.path}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link
                          to={link.path}
                          onClick={() => setMobileMenuOpen(false)}
                          className={cn(
                            "flex items-center px-4 py-3 rounded-lg text-base font-medium transition-all duration-200",
                            isActive
                              ? "bg-primary/10 text-primary border-l-2 border-primary"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                          )}
                        >
                          {link.name}
                        </Link>
                      </motion.div>
                    );
                  })}
                  
                  {/* Mobile CTA */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mt-6 px-4"
                  >
                    <Button 
                      variant="hero" 
                      className="w-full" 
                      asChild
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Link to="/contact">Get in Touch</Link>
                    </Button>
                  </motion.div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
