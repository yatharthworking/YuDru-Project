import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";

import droneSurveillance from "@/assets/drone-surveillance.jpg";
import dronePayload from "@/assets/drone-payload.jpg";
import droneSoccer from "@/assets/drone-soccer.jpg";
import batteries from "@/assets/batteries.jpg";

const products = [
  {
    id: "surveillance",
    name: "Surveillance Drones",
    description: "Advanced monitoring systems with day/night vision, AI-assisted tracking, and long-range capabilities.",
    image: droneSurveillance,
    features: ["Long-Range Surveillance", "Thermal Imaging", "AI Monitoring"],
  },
  {
    id: "payload",
    name: "Payload Drones",
    description: "Heavy-lift solutions from 5kg to 100kg for logistics, disaster relief, and industrial transport.",
    image: dronePayload,
    features: ["5kg - 100kg Capacity", "High Endurance", "Precision Navigation"],
  },
  {
    id: "soccer",
    name: "Soccer Drones",
    description: "High-agility drones for sports analytics, live aerial coverage, and event tracking.",
    image: droneSoccer,
    features: ["Real-time Video", "Match Analytics", "High Agility"],
  },
  {
    id: "batteries",
    name: "Batteries & Power",
    description: "High-performance battery solutions optimized for maximum endurance and safety.",
    image: batteries,
    features: ["Custom Packs", "Li-based Solutions", "Safety Tested"],
  },
];

const ProductsPreviewSection = () => {
  return (
    <section className="py-16 md:py-24 bg-card relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-10" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <SectionHeading
          badge="Our Products"
          title="Indigenous Drone Solutions"
          subtitle="100% non-Chinese drone technology designed for monitoring, logistics, and industrial applications."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-xl md:rounded-2xl bg-secondary/30 border border-border/50 hover-glow"
            >
              {/* Image */}
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 lg:p-8">
                <h3 className="font-display text-lg md:text-xl lg:text-2xl font-bold mb-1.5 md:mb-2 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground mb-3 md:mb-4 line-clamp-2">
                  {product.description}
                </p>
                
                {/* Features */}
                <div className="flex flex-wrap gap-1.5 md:gap-2 mb-3 md:mb-4">
                  {product.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-2 md:px-3 py-0.5 md:py-1 bg-primary/10 border border-primary/20 rounded-full text-[10px] md:text-xs font-medium text-primary"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <Link
                  to={`/products#${product.id}`}
                  className="inline-flex items-center gap-2 text-primary font-semibold text-sm md:text-base group-hover:gap-3 transition-all py-1"
                >
                  View Details
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-8 md:mt-12"
        >
          <Button variant="hero" size="lg" className="w-full sm:w-auto" asChild>
            <Link to="/products">
              View All Products
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductsPreviewSection;
