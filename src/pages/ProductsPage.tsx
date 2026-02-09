import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { memo, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Eye, Truck, Battery, Plane, Sparkles, Camera, Zap } from "lucide-react";

import droneSurveillance from "@/assets/drone-surveillance.jpg";
import dronePayload from "@/assets/drone-payload.jpg";
import droneSoccer from "@/assets/drone-soccer.jpg";
import batteries from "@/assets/batteries.jpg";
import droneKamikaze from "@/assets/drone-kamikaze.jpg";

const products = [
  {
    id: "soccer",
    name: "Sports Drone – Drone Soccer",
    tagline: "Competitive Aerial Sport",
    description: "Drone Soccer is a competitive indoor aerial sport that combines drone piloting with team-based gameplay. Players fly specially designed, safety-caged drones to score goals through elevated rings, promoting precision control, teamwork, and fast decision-making. Ideal for educational institutions, sports academies, and event-based competitions.",
    icon: Plane,
    color: "#0ea5e9",
    image: droneSoccer,
    features: [
      "Fully enclosed protective frame for safe indoor use",
      "Optimized for agility and control",
      "Designed for training, tournaments, and leagues",
      "Encourages STEM learning and team collaboration",
    ],
    useCases: ["Educational Institutions", "Sports Academies", "Tournaments & Leagues", "STEM Programs"],
    cta: { primary: "Request a Demo", secondary: "Contact Us for Pricing" },
  },
  {
    id: "surveillance",
    name: "Surveillance Drones",
    tagline: "Intelligent Observation",
    description: "Our surveillance drone systems are engineered for reliable monitoring, reconnaissance, and security operations across civil, industrial, and defense applications. Available in Day Camera, Night Vision, and Thermal Imaging variants — all customizable based on mission requirements.",
    icon: Eye,
    color: "#8b5cf6",
    image: droneSurveillance,
    features: [
      "High-resolution daylight camera system",
      "Night vision / low-light camera system",
      "Thermal imaging sensor for heat signatures",
      "Effective through smoke, fog, and darkness",
    ],
    useCases: ["Perimeter Security", "Search & Rescue", "Defense Operations", "Industrial Inspections"],
    subProducts: [
      {
        name: "Day Camera Drone",
        description: "High-clarity daytime operations with real-time aerial visibility for monitoring and inspection.",
        features: ["High-resolution daylight camera", "Stable real-time video transmission", "Suitable for perimeter security"],
      },
      {
        name: "Night Vision Drone",
        description: "Built for low-light and nighttime missions with reliable performance in minimal lighting.",
        features: ["Night vision / low-light camera system", "Optimized for night operations", "Reliable in reduced visibility"],
      },
      {
        name: "Thermal Surveillance Drone",
        description: "Advanced thermal imaging capable of detecting heat signatures in challenging environments.",
        features: ["Thermal imaging sensor", "Effective through smoke, fog, and darkness", "Ideal for search & rescue and defense"],
      },
    ],
    cta: { primary: "View Specifications", secondary: "Request Custom Configuration" },
  },
  {
    id: "payload",
    name: "Logistic Drones",
    tagline: "Secure Payload Transport",
    description: "Our logistic drones are designed for secure and efficient payload transportation, from 500 grams up to 10 kilograms. Featuring modular payload mounting systems, they are suitable for medical delivery, industrial logistics, and defense use.",
    icon: Truck,
    color: "#10b981",
    image: dronePayload,
    features: [
      "Payload capacity: 500g to 10kg",
      "High stability with payload",
      "Modular payload mounting system",
      "Custom release mechanisms",
    ],
    useCases: ["Medical Delivery", "Industrial Logistics", "Defense Use", "Disaster Relief"],
    customization: ["Payload capacity", "Flight endurance", "Release mechanisms", "Navigation & communication systems"],
    cta: { primary: "View Payload Options", secondary: "Customize Your Logistic Drone" },
  },
  {
    id: "fpv",
    name: "FPV Drones",
    tagline: "First-Person View Lineup",
    description: "Our FPV drone lineup supports training, cinematography, industrial inspection, and advanced flight operations. Available from compact 2-inch indoor models to heavy-duty 13-inch industrial platforms, all featuring carbon fiber frames and high-performance components.",
    icon: Camera,
    color: "#f59e0b",
    image: droneKamikaze,
    features: [
      "Carbon fiber frames",
      "High-performance motors and ESCs",
      "Analog and digital FPV support",
      "Custom tuning and configuration",
    ],
    useCases: ["Indoor Flying", "Cinematic Filming", "Freestyle & Racing", "Industrial Inspection"],
    subProducts: [
      { name: "2\" FPV – Pavo Series", description: "Compact and lightweight, ideal for indoor flying and beginners." },
      { name: "2.5\" FPV Drone", description: "Highly agile platform suitable for tight spaces and controlled environments." },
      { name: "3.5\" Cinewhoop", description: "Ducted propeller design for smooth cinematic footage with enhanced safety." },
      { name: "5\" FPV Drone", description: "Industry-standard for freestyle flying and racing." },
      { name: "7\" FPV Drone", description: "Long-range drone designed for endurance and exploration missions." },
      { name: "10\" FPV Drone", description: "Heavy-duty platform supporting larger batteries and payloads." },
      { name: "13\" FPV Drone", description: "Industrial-grade built for extended flight time and specialized operations." },
    ],
    cta: { primary: "View Drone Details", secondary: "Contact for Custom Build" },
  },
  {
    id: "batteries",
    name: "Batteries & Power Systems",
    tagline: "Powering Innovation",
    description: "We offer high-performance Li-Ion and Li-Po batteries designed for reliability, safety, and consistent power delivery across all drone platforms. Capacity, C-rating, and connector type can be customized to match specific drone and mission requirements.",
    icon: Battery,
    color: "#ec4899",
    image: batteries,
    features: [
      "Custom capacity & C-rating",
      "Li-Po variants from 1S to 8S",
      "Safety-tested systems",
      "Connector type customization",
    ],
    useCases: ["Micro FPV Drones", "Training Platforms", "Industrial Drones", "Heavy-Duty Platforms"],
    subProducts: [
      { name: "1S Li-Po", description: "For micro drones, indoor FPV, and educational kits." },
      { name: "2S Li-Po", description: "Balanced power for small FPV drones and training platforms." },
      { name: "3S Li-Po (3S 2P)", description: "Reliable power for beginner to mid-range FPV drones." },
      { name: "4S Li-Po (4S 2P / 3P)", description: "High-performance for professional FPV and cinematic use." },
      { name: "6S Li-Po (6S 2P / 3P / 4P)", description: "Professional and industrial-grade for high-power applications." },
      { name: "8S Li-Po (8S 2P)", description: "For advanced pilots requiring higher thrust and efficiency." },
    ],
    cta: { primary: "View Battery Options", secondary: "Request Battery Customization" },
  },
];

type Product = typeof products[number];

const DroneVisual = memo(({ product, isHovered }: { product: Product; isHovered: boolean }) => (
  <div className="relative w-full aspect-square max-w-md mx-auto">
    <div
      className="absolute inset-8 rounded-full blur-[60px] transition-opacity duration-500"
      style={{ backgroundColor: product.color, opacity: isHovered ? 0.25 : 0.12 }}
    />
    <div className="absolute inset-0 flex items-center justify-center">
      <div
        className="absolute w-[70%] h-[70%] rounded-full border opacity-20 transition-transform duration-700"
        style={{ borderColor: product.color, transform: isHovered ? "scale(1.1)" : "scale(1)" }}
      />
      <div
        className="absolute w-[55%] h-[55%] rounded-full border-2 opacity-30 transition-transform duration-500"
        style={{ borderColor: product.color, transform: isHovered ? "scale(1.05)" : "scale(1)" }}
      />
    </div>
    <div className="absolute inset-0 flex items-center justify-center p-8">
      <div
        className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl transition-transform duration-500"
        style={{
          transform: isHovered ? "scale(1.03) translateY(-4px)" : "scale(1)",
          boxShadow: isHovered
            ? `0 25px 50px -12px ${product.color}40, 0 0 0 1px ${product.color}20`
            : "0 25px 50px -12px rgba(0,0,0,0.25)",
        }}
      >
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" loading="lazy" decoding="async" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div
          className="absolute bottom-4 left-4 w-12 h-12 rounded-xl flex items-center justify-center backdrop-blur-md"
          style={{ backgroundColor: `${product.color}30` }}
        >
          <product.icon className="w-6 h-6" style={{ color: product.color }} />
        </div>
      </div>
    </div>
    <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: product.color, opacity: 0.6 }} />
    <div className="absolute bottom-1/3 right-1/4 w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: product.color, opacity: 0.4, animationDelay: "0.5s" }} />
  </div>
));
DroneVisual.displayName = "DroneVisual";

const SubProductCard = memo(({ item, color }: { item: { name: string; description: string; features?: string[] }; color: string }) => (
  <div className="p-4 rounded-xl bg-secondary/30 border border-border/30 hover:border-primary/20 transition-colors">
    <h4 className="font-display text-base font-semibold mb-1" style={{ color }}>{item.name}</h4>
    <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
    {item.features && (
      <ul className="space-y-1">
        {item.features.map((f) => (
          <li key={f} className="flex items-center gap-2 text-xs text-foreground/80">
            <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
            {f}
          </li>
        ))}
      </ul>
    )}
  </div>
));
SubProductCard.displayName = "SubProductCard";

const ProductSection = memo(({ product, index }: { product: Product; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isEven = index % 2 === 0;

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  const subProducts = "subProducts" in product ? (product as any).subProducts as { name: string; description: string; features?: string[] }[] : undefined;
  const customization = "customization" in product ? (product as any).customization as string[] : undefined;

  return (
    <section
      id={product.id}
      className="min-h-screen relative flex items-center py-16 lg:py-24"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/10 to-background" />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Visual */}
          <div className={`relative ${isEven ? "" : "lg:order-2"}`}>
            <DroneVisual product={product} isHovered={isHovered} />
          </div>

          {/* Content */}
          <div className={isEven ? "" : "lg:order-1"}>
            <div className="flex items-center gap-4 mb-5">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${product.color}15`, border: `1px solid ${product.color}30` }}
              >
                <product.icon className="w-6 h-6" style={{ color: product.color }} />
              </div>
              <span className="text-sm font-display uppercase tracking-[0.15em] font-medium" style={{ color: product.color }}>
                {product.tagline}
              </span>
            </div>

            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-5 tracking-tight">
              {product.name}
            </h2>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              {product.description}
            </p>

            {/* Features */}
            <div className="grid sm:grid-cols-2 gap-3 mb-8">
              {product.features.map((feature) => (
                <div key={feature} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 border border-border/30">
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: product.color }} />
                  <span className="text-foreground font-medium text-sm">{feature}</span>
                </div>
              ))}
            </div>

            {/* Sub-products / Variants */}
            {subProducts && subProducts.length > 0 && (
              <div className="mb-8">
                <h3 className="font-display text-lg font-semibold mb-4 text-foreground/90">
                  {product.id === "batteries" ? "Battery Variants" : product.id === "fpv" ? "FPV Lineup" : "Variants"}
                </h3>
                <div className={`grid gap-3 ${subProducts.length > 4 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2"}`}>
                  {subProducts.map((sub) => (
                    <SubProductCard key={sub.name} item={sub} color={product.color} />
                  ))}
                </div>
              </div>
            )}

            {/* Customization Options */}
            {customization && (
              <div className="mb-8">
                <h3 className="font-display text-lg font-semibold mb-3 text-foreground/90">Customization Options</h3>
                <div className="flex flex-wrap gap-2">
                  {customization.map((opt) => (
                    <span
                      key={opt}
                      className="px-3 py-1.5 rounded-full text-sm font-medium"
                      style={{ backgroundColor: `${product.color}10`, color: product.color, border: `1px solid ${product.color}30` }}
                    >
                      {opt}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Use Cases */}
            <div className="flex flex-wrap gap-2 mb-8">
              {product.useCases.map((useCase) => (
                <span
                  key={useCase}
                  className="px-3 py-1.5 rounded-full text-sm font-medium"
                  style={{ backgroundColor: `${product.color}10`, color: product.color, border: `1px solid ${product.color}30` }}
                >
                  {useCase}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <Button variant="hero" size="lg" asChild>
                <Link to="/contact">
                  {product.cta.primary}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="heroOutline" size="lg" asChild>
                <Link to="/contact">{product.cta.secondary}</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
ProductSection.displayName = "ProductSection";

const ProductsPage = () => {
  return (
    <>
      <Helmet>
        <title>Products - Indigenous Drone Solutions | YuDru</title>
        <meta
          name="description"
          content="Explore YuDru's range of 100% indigenous drones: Sports drones, Surveillance systems, Logistic drones, FPV lineup, and high-performance batteries. Built for innovation."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />

        <main>
          {/* Hero */}
          <section className="min-h-screen relative flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-background to-background" />
              <div className="absolute inset-0 grid-pattern opacity-20" />
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10 pt-24">
              <div className="max-w-4xl mx-auto text-center">
                <div className="mb-8">
                  <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary/10 border border-primary/30 rounded-full text-sm font-display font-medium text-primary">
                    <Sparkles className="w-4 h-4" />
                    Scroll to Discover
                  </span>
                </div>

                <h1 className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight mb-8">
                  Our
                  <br />
                  <span className="text-gradient">Product Portfolio</span>
                </h1>

                <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12">
                  100% Indigenous drone technology engineered for innovation, research, and industrial excellence.
                </p>

                <div className="flex flex-wrap justify-center gap-3 mb-16">
                  {products.map((product) => (
                    <a
                      key={product.id}
                      href={`#${product.id}`}
                      className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95"
                      style={{
                        backgroundColor: `${product.color}15`,
                        color: product.color,
                        border: `1px solid ${product.color}30`,
                      }}
                    >
                      {product.name}
                    </a>
                  ))}
                </div>

                <motion.div
                  className="flex flex-col items-center gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                >
                  <span className="text-sm text-muted-foreground">Scroll Down</span>
                  <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1">
                    <div className="w-1.5 h-2.5 bg-primary rounded-full animate-bounce" />
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Product Sections */}
          {products.map((product, index) => (
            <ProductSection key={product.id} product={product} index={index} />
          ))}

          {/* Footer CTA */}
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
                    <Link to="/research">Explore R&D</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ProductsPage;
