import { Helmet } from "react-helmet-async";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import droneSurveillance from "@/assets/drone-surveillance.jpg";
import dronePayload from "@/assets/drone-payload.jpg";
import droneSoccer from "@/assets/drone-soccer.jpg";
import batteries from "@/assets/batteries.jpg";
import labFacility from "@/assets/lab-facility.jpg";
import trainingSession from "@/assets/training-session.jpg";
import heroBg from "@/assets/hero-bg.jpg";
const categories = ["All", "Products", "Labs", "Training"];
const galleryItems = [{
  src: droneSurveillance,
  category: "Products",
  title: "Monitoring Drone",
  size: "large"
}, {
  src: labFacility,
  category: "Labs",
  title: "R&D Laboratory",
  size: "medium"
}, {
  src: dronePayload,
  category: "Products",
  title: "Logistics Drone",
  size: "small"
}, {
  src: trainingSession,
  category: "Training",
  title: "Pilot Training Session",
  size: "medium"
}, {
  src: droneSoccer,
  category: "Products",
  title: "Sports Drone",
  size: "large"
}, {
  src: batteries,
  category: "Products",
  title: "Power Systems",
  size: "small"
}, {
  src: heroBg,
  category: "Labs",
  title: "Innovation Center",
  size: "medium"
}];
const containerVariants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};
const itemVariants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.8,
    rotateX: 15
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
      mass: 0.8
    }
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    y: -30,
    transition: {
      duration: 0.3
    }
  }
};
const GalleryPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const {
    scrollYProgress
  } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const filteredItems = activeCategory === "All" ? galleryItems : galleryItems.filter(item => item.category === activeCategory);
  const navigateImage = useCallback((direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    const currentIndex = filteredItems.findIndex((_, i) => i === selectedImage);
    if (direction === 'prev') {
      setSelectedImage(currentIndex > 0 ? currentIndex - 1 : filteredItems.length - 1);
    } else {
      setSelectedImage(currentIndex < filteredItems.length - 1 ? currentIndex + 1 : 0);
    }
  }, [selectedImage, filteredItems.length]);
  const closeLightbox = useCallback(() => {
    setSelectedImage(null);
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (selectedImage === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          navigateImage('prev');
          break;
        case 'ArrowRight':
          e.preventDefault();
          navigateImage('next');
          break;
        case 'Escape':
          e.preventDefault();
          closeLightbox();
          break;
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, navigateImage, closeLightbox]);
  const getSizeClasses = (size: string, index: number) => {
    const patterns = ["md:col-span-2 md:row-span-2", "md:col-span-1 md:row-span-1", "md:col-span-1 md:row-span-1", "md:col-span-1 md:row-span-2", "md:col-span-2 md:row-span-1", "md:col-span-1 md:row-span-1", "md:col-span-1 md:row-span-1"];
    return patterns[index % patterns.length];
  };
  return <>
      <Helmet>
        <title>Gallery - Drone Products & Facilities | YuDru</title>
        <meta name="description" content="Explore YuDru's gallery featuring drone products, lab facilities, training sessions, and field demonstrations." />
      </Helmet>

      <div className="min-h-screen bg-background overflow-hidden">
        <Navbar />
        
        <main className="pt-24">
          {/* Hero with Parallax */}
          <section ref={heroRef} className="py-20 md:py-32 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0">
              <motion.div className="absolute inset-0 grid-pattern opacity-20" style={{
              y: heroY
            }} />
              <motion.div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }} transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }} />
              <motion.div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-glow/5 rounded-full blur-3xl" animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.5, 0.3, 0.5]
            }} transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }} />
            </div>

            {/* Floating Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(12)].map((_, i) => <motion.div key={i} className="absolute w-1 h-1 bg-primary/40 rounded-full" style={{
              left: `${10 + i * 8}%`,
              top: `${20 + i % 3 * 25}%`
            }} animate={{
              y: [-20, 20, -20],
              opacity: [0.2, 0.8, 0.2],
              scale: [0.5, 1, 0.5]
            }} transition={{
              duration: 4 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }} />)}
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
              <motion.div style={{
              opacity: heroOpacity,
              scale: heroScale
            }} className="max-w-4xl mx-auto text-center">
                

                <motion.h1 initial={{
                opacity: 0,
                y: 40
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                duration: 0.8,
                delay: 0.2
              }} className="font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
                  <span className="text-gradient">Gallery</span>
                </motion.h1>

                <motion.p initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                duration: 0.6,
                delay: 0.4
              }} className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                  Explore our drone products, state-of-the-art facilities, and training sessions through an immersive visual journey.
                </motion.p>

                {/* Scroll Indicator */}
                <motion.div initial={{
                opacity: 0
              }} animate={{
                opacity: 1
              }} transition={{
                delay: 1
              }} className="mt-12 flex justify-center">
                  
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* Filter with Morphing Pill */}
          <section className="py-8 sticky top-20 z-30 bg-background/80 backdrop-blur-xl border-y border-border/30">
            <div className="container mx-auto px-4 md:px-6">
              <motion.div className="flex flex-wrap justify-center gap-2 md:gap-3 relative" initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.5
            }}>
                {categories.map((category, index) => <motion.button key={category} onClick={() => setActiveCategory(category)} whileHover={{
                scale: 1.05
              }} whileTap={{
                scale: 0.95
              }} initial={{
                opacity: 0,
                x: -20
              }} animate={{
                opacity: 1,
                x: 0
              }} transition={{
                delay: index * 0.1
              }} className={`relative px-5 md:px-8 py-2.5 md:py-3 rounded-full text-sm font-semibold transition-all duration-500 overflow-hidden ${activeCategory === category ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                    {activeCategory === category && <motion.div layoutId="activeFilter" className="absolute inset-0 bg-primary rounded-full" transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 30
                }} />}
                    <span className="relative z-10">{category}</span>
                  </motion.button>)}
              </motion.div>

              {/* Category Count */}
              <motion.p key={activeCategory} initial={{
              opacity: 0,
              y: 10
            }} animate={{
              opacity: 1,
              y: 0
            }} className="text-center text-sm text-muted-foreground mt-4">
                Showing {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'}
              </motion.p>
            </div>
          </section>

          {/* Masonry Gallery Grid */}
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4 md:px-6">
              <AnimatePresence mode="wait">
                <motion.div key={activeCategory} variants={containerVariants} initial="hidden" animate="visible" exit="hidden" className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-[200px] md:auto-rows-[250px]">
                  {filteredItems.map((item, index) => <motion.div key={`${activeCategory}-${item.title}`} variants={itemVariants} layout onHoverStart={() => setHoveredIndex(index)} onHoverEnd={() => setHoveredIndex(null)} onClick={() => setSelectedImage(index)} className={`group relative overflow-hidden rounded-2xl cursor-pointer ${getSizeClasses(item.size, index)}`} style={{
                  perspective: 1000
                }}>
                      {/* Image */}
                      <motion.img src={item.src} alt={item.title} className="w-full h-full object-cover" animate={{
                    scale: hoveredIndex === index ? 1.15 : 1
                  }} transition={{
                    duration: 0.6,
                    ease: "easeOut"
                  }} />

                      {/* Gradient Overlay */}
                      <motion.div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" initial={{
                    opacity: 0.3
                  }} animate={{
                    opacity: hoveredIndex === index ? 0.9 : 0.3
                  }} transition={{
                    duration: 0.3
                  }} />

                      {/* Glowing Border on Hover */}
                      <motion.div className="absolute inset-0 rounded-2xl border-2 border-primary/0" animate={{
                    borderColor: hoveredIndex === index ? "hsl(var(--primary) / 0.5)" : "hsl(var(--primary) / 0)",
                    boxShadow: hoveredIndex === index ? "inset 0 0 30px hsl(var(--primary) / 0.1), 0 0 30px hsl(var(--primary) / 0.2)" : "inset 0 0 0 transparent, 0 0 0 transparent"
                  }} transition={{
                    duration: 0.3
                  }} />

                      {/* Zoom Icon */}
                      <motion.div className="absolute top-4 right-4 w-10 h-10 bg-primary/20 backdrop-blur-sm rounded-full flex items-center justify-center" initial={{
                    opacity: 0,
                    scale: 0,
                    rotate: -90
                  }} animate={{
                    opacity: hoveredIndex === index ? 1 : 0,
                    scale: hoveredIndex === index ? 1 : 0,
                    rotate: hoveredIndex === index ? 0 : -90
                  }} transition={{
                    duration: 0.3,
                    type: "spring"
                  }}>
                        <ZoomIn className="w-5 h-5 text-primary" />
                      </motion.div>

                      {/* Content */}
                      <motion.div className="absolute bottom-0 left-0 right-0 p-5 md:p-6" initial={{
                    y: 20,
                    opacity: 0
                  }} animate={{
                    y: hoveredIndex === index ? 0 : 20,
                    opacity: hoveredIndex === index ? 1 : 0
                  }} transition={{
                    duration: 0.3
                  }}>
                        <motion.span className="inline-block px-3 py-1 text-xs font-display text-primary bg-primary/20 rounded-full mb-3">
                          {item.category}
                        </motion.span>
                        <motion.h3 className="font-display text-xl md:text-2xl font-semibold text-foreground">
                          {item.title}
                        </motion.h3>
                      </motion.div>

                      {/* Corner Accents */}
                      <motion.div className="absolute top-0 left-0 w-12 h-12" style={{
                    background: "linear-gradient(135deg, hsl(var(--primary) / 0.3) 0%, transparent 50%)"
                  }} animate={{
                    opacity: hoveredIndex === index ? 1 : 0
                  }} transition={{
                    duration: 0.3
                  }} />
                      <motion.div className="absolute bottom-0 right-0 w-12 h-12" style={{
                    background: "linear-gradient(-45deg, hsl(var(--primary) / 0.3) 0%, transparent 50%)"
                  }} animate={{
                    opacity: hoveredIndex === index ? 1 : 0
                  }} transition={{
                    duration: 0.3
                  }} />
                    </motion.div>)}
                </motion.div>
              </AnimatePresence>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage !== null && <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-xl p-4" onClick={closeLightbox}>
            {/* Close Button */}
            <motion.button initial={{
          opacity: 0,
          scale: 0
        }} animate={{
          opacity: 1,
          scale: 1
        }} exit={{
          opacity: 0,
          scale: 0
        }} transition={{
          delay: 0.2
        }} onClick={closeLightbox} className="absolute top-6 right-6 w-12 h-12 bg-card/80 backdrop-blur rounded-full flex items-center justify-center text-foreground hover:text-primary hover:bg-primary/10 transition-colors z-10" aria-label="Close lightbox (Escape)">
              <X className="w-6 h-6" />
            </motion.button>

            {/* Navigation Buttons */}
            <motion.button initial={{
          opacity: 0,
          x: -50
        }} animate={{
          opacity: 1,
          x: 0
        }} exit={{
          opacity: 0,
          x: -50
        }} onClick={e => {
          e.stopPropagation();
          navigateImage('prev');
        }} className="absolute left-4 md:left-8 w-12 h-12 bg-card/80 backdrop-blur rounded-full flex items-center justify-center text-foreground hover:text-primary hover:bg-primary/10 transition-colors z-10">
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
            
            <motion.button initial={{
          opacity: 0,
          x: 50
        }} animate={{
          opacity: 1,
          x: 0
        }} exit={{
          opacity: 0,
          x: 50
        }} onClick={e => {
          e.stopPropagation();
          navigateImage('next');
        }} className="absolute right-4 md:right-8 w-12 h-12 bg-card/80 backdrop-blur rounded-full flex items-center justify-center text-foreground hover:text-primary hover:bg-primary/10 transition-colors z-10">
              <ChevronRight className="w-6 h-6" />
            </motion.button>

            {/* Image Container */}
            <motion.div key={selectedImage} initial={{
          opacity: 0,
          scale: 0.8,
          rotateY: -15
        }} animate={{
          opacity: 1,
          scale: 1,
          rotateY: 0
        }} exit={{
          opacity: 0,
          scale: 0.8,
          rotateY: 15
        }} transition={{
          type: "spring",
          stiffness: 200,
          damping: 25
        }} className="relative max-w-5xl max-h-[80vh] w-full" onClick={e => e.stopPropagation()} style={{
          perspective: 1000
        }}>
              <img src={filteredItems[selectedImage]?.src} alt={filteredItems[selectedImage]?.title} className="w-full h-full object-contain rounded-2xl" />
              
              {/* Image Info */}
              <motion.div initial={{
            opacity: 0,
            y: 30
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.3
          }} className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-card via-card/80 to-transparent rounded-b-2xl">
                <span className="inline-block px-3 py-1 text-xs font-display text-primary bg-primary/20 rounded-full mb-2">
                  {filteredItems[selectedImage]?.category}
                </span>
                <h3 className="font-display text-2xl font-semibold text-foreground">
                  {filteredItems[selectedImage]?.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {selectedImage + 1} / {filteredItems.length}
                </p>
              </motion.div>
            </motion.div>
          </motion.div>}
      </AnimatePresence>
    </>;
};
export default GalleryPage;