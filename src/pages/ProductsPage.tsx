import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useRef, memo, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Eye, Truck, Compass, Battery, Plane, Sparkles } from "lucide-react";

// Product images - using existing assets
import droneSurveillance from "@/assets/drone-surveillance.jpg";
import dronePayload from "@/assets/drone-payload.jpg";
import droneSoccer from "@/assets/drone-soccer.jpg";
import batteries from "@/assets/batteries.jpg";
const products = [{
  id: "soccer",
  name: "Sports Drones",
  tagline: "Sports Analytics Redefined",
  description: "Precision-engineered drones for sports analytics, live aerial coverage, and event tracking with unmatched agility and stability.",
  icon: Plane,
  color: "#0ea5e9",
  image: droneSoccer,
  features: ["High agility & stability", "Real-time video streaming", "Advanced tracking AI", "Match analysis integration"],
  useCases: ["Sports Broadcasting", "Match Analysis", "Training Review", "Event Coverage"]
}, {
  id: "surveillance",
  name: "Monitoring Drones",
  tagline: "Intelligent Observation",
  description: "Advanced drones for continuous monitoring and security operations with day/night capabilities and AI-powered analytics.",
  icon: Eye,
  color: "#8b5cf6",
  image: droneSurveillance,
  features: ["Long-range variants", "Day/night thermal vision", "AI-assisted monitoring", "Secure data transmission"],
  useCases: ["Industrial Monitoring", "Infrastructure Inspection", "Environmental Survey", "Asset Protection"]
}, {
  id: "payload",
  name: "Logistics Drones",
  tagline: "Heavy Lift Solutions",
  description: "Heavy-lift drones from 5kg to 100kg for logistics, disaster relief, and industrial transport with precision navigation.",
  icon: Truck,
  color: "#10b981",
  image: dronePayload,
  features: ["Modular payload systems", "High endurance flights", "Precision navigation", "All-weather capability"],
  useCases: ["Logistics Delivery", "Disaster Relief", "Industrial Transport", "Medical Supply"]
}, {
  id: "mapping",
  name: "Mapping Drones",
  tagline: "Precision Surveying",
  description: "High-precision mapping and surveying drones equipped with advanced sensors for topography, construction, and research.",
  icon: Compass,
  color: "#f59e0b",
  image: droneSurveillance,
  // Reuse existing image
  features: ["High-resolution sensors", "GPS RTK accuracy", "3D mapping capability", "Automated flight paths"],
  useCases: ["Land Surveying", "Construction Planning", "Agricultural Mapping", "Research"]
}, {
  id: "batteries",
  name: "Power Systems",
  tagline: "Powering Innovation",
  description: "High-performance battery solutions optimized for maximum drone endurance, safety, and reliability across all conditions.",
  icon: Battery,
  color: "#ec4899",
  image: batteries,
  features: ["Custom battery packs", "High-capacity Li-based", "Safety-tested systems", "Performance optimized"],
  useCases: ["Extended Flight Time", "Industrial Applications", "Custom Solutions", "High-Performance"]
}];

// Lightweight CSS-based visual component (no 3D)
const DroneVisual = memo(({
  product,
  isHovered
}: {
  product: typeof products[0];
  isHovered: boolean;
}) => {
  return <div className="relative w-full aspect-square max-w-md mx-auto">
      {/* Background glow - CSS only */}
      <div className="absolute inset-8 rounded-full blur-[60px] transition-opacity duration-500" style={{
      backgroundColor: product.color,
      opacity: isHovered ? 0.25 : 0.12
    }} />
      
      {/* Animated rings - CSS only */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute w-[70%] h-[70%] rounded-full border opacity-20 transition-transform duration-700" style={{
        borderColor: product.color,
        transform: isHovered ? 'scale(1.1)' : 'scale(1)'
      }} />
        <div className="absolute w-[55%] h-[55%] rounded-full border-2 opacity-30 transition-transform duration-500" style={{
        borderColor: product.color,
        transform: isHovered ? 'scale(1.05)' : 'scale(1)'
      }} />
      </div>
      
      {/* Product image - static, optimized */}
      <div className="absolute inset-0 flex items-center justify-center p-8">
        <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl transition-transform duration-500" style={{
        transform: isHovered ? 'scale(1.03) translateY(-4px)' : 'scale(1)',
        boxShadow: isHovered ? `0 25px 50px -12px ${product.color}40, 0 0 0 1px ${product.color}20` : `0 25px 50px -12px rgba(0,0,0,0.25)`
      }}>
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" loading="lazy" decoding="async" />
          {/* Image overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          {/* Icon badge */}
          <div className="absolute bottom-4 left-4 w-12 h-12 rounded-xl flex items-center justify-center backdrop-blur-md" style={{
          backgroundColor: `${product.color}30`
        }}>
            <product.icon className="w-6 h-6" style={{
            color: product.color
          }} />
          </div>
        </div>
      </div>
      
      {/* Floating particles - CSS animation, minimal */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full animate-pulse" style={{
      backgroundColor: product.color,
      opacity: 0.6
    }} />
      <div className="absolute bottom-1/3 right-1/4 w-1.5 h-1.5 rounded-full animate-pulse" style={{
      backgroundColor: product.color,
      opacity: 0.4,
      animationDelay: '0.5s'
    }} />
    </div>;
});
DroneVisual.displayName = 'DroneVisual';

// Product Section Component - Lightweight
const ProductSection = memo(({
  product,
  index
}: {
  product: typeof products[0];
  index: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const isEven = index % 2 === 0;
  const sectionRef = useRef<HTMLElement>(null);
  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);
  return;
});
ProductSection.displayName = 'ProductSection';
const ProductsPage = () => {
  return <>
      <Helmet>
        <title>Products - Indigenous Drone Solutions | YuDru</title>
        <meta name="description" content="Explore YuDru's range of 100% indigenous drones including monitoring, logistics, sports, mapping, and power systems. Innovative technology for industry and research." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main>
          {/* Hero Section - Lightweight, instant render */}
          <section className="min-h-screen relative flex items-center justify-center overflow-hidden">
            {/* Simple CSS background */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-background to-background" />
              <div className="absolute inset-0 grid-pattern opacity-20" />
            </div>
            
            <div className="container mx-auto px-4 md:px-6 relative z-10 pt-24">
              <div className="max-w-4xl mx-auto text-center">
                {/* Badge - Instant */}
                <div className="mb-8">
                  <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary/10 border border-primary/30 rounded-full text-sm font-display font-medium text-primary">
                    <Sparkles className="w-4 h-4" />
                    Scroll to Discover
                  </span>
                </div>
                
                {/* Title - Priority content */}
                <h1 className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight mb-8">
                  Our
                  <br />
                  <span className="text-gradient">Product Portfolio</span>
                </h1>
                
                {/* Subtitle */}
                <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12">
                  100% Indigenous drone technology engineered for innovation, 
                  research, and industrial excellence.
                </p>
                
                {/* Product Navigation - CSS transitions only */}
                <div className="flex flex-wrap justify-center gap-3 mb-16">
                  {products.map(product => <a key={product.id} href={`#${product.id}`} className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95" style={{
                  backgroundColor: `${product.color}15`,
                  color: product.color,
                  border: `1px solid ${product.color}30`
                }}>
                      {product.name}
                    </a>)}
                </div>
                
                {/* Scroll indicator - CSS animation */}
                
              </div>
            </div>
          </section>

          {/* Product Sections - Memoized, no 3D */}
          {products.map((product, index) => <ProductSection key={product.id} product={product} index={index} />)}

          {/* Footer CTA - Simple, no heavy animations */}
          <section className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-card to-background" />
            
            <div className="container mx-auto px-4 md:px-6 relative z-10">
              <div className="glass-card p-10 md:p-14 lg:p-16 text-center max-w-4xl mx-auto">
                <Shield className="w-16 h-16 text-primary mx-auto mb-6" />
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                  Ready to Elevate Your Operations?
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                  Partner with YuDru for indigenous drone solutions tailored to your needs.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button variant="hero" size="lg" asChild>
                    <Link to="/contact">
                      Get in Touch
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </Button>
                  <Button variant="heroOutline" size="lg" asChild>
                    <Link to="/research">
                      Explore R&D
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>;
};
export default ProductsPage;