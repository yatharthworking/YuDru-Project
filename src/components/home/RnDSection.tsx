import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import labFacility from "@/assets/lab-facility.jpg";

const features = [
  "Advanced AI Navigation Systems",
  "Flight Control R&D",
  "Payload Optimization",
  "Communication & Telemetry",
  "Prototype Testing",
  "Academic Collaborations",
];

const RnDSection = () => {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 tech-dots opacity-20" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative rounded-xl md:rounded-2xl overflow-hidden">
              <img
                src={labFacility}
                alt="YuDru R&D Laboratory"
                className="w-full aspect-[4/3] md:aspect-square object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent" />
            </div>
            
            {/* Floating Card - Visible on tablet+ */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 glass-card p-4 md:p-6 max-w-[160px] md:max-w-xs hidden sm:block"
            >
              <div className="font-display text-2xl md:text-3xl font-bold text-gradient mb-1">5</div>
              <div className="text-xs md:text-sm text-muted-foreground">Years of R&D Excellence</div>
            </motion.div>

            {/* Glow Effect */}
            <div className="absolute -inset-4 bg-primary/10 rounded-3xl blur-3xl -z-10" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2"
          >
            <span className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-primary/10 border border-primary/30 rounded-full text-xs md:text-sm font-display font-medium text-primary mb-4 md:mb-6">
              Research & Development
            </span>

            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 md:mb-6">
              Innovation at the
              <br />
              <span className="text-gradient">Core of Everything</span>
            </h2>

            <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8 leading-relaxed">
              Our R&D facilities house state-of-the-art prototyping labs, testing environments, 
              and simulation systems. We collaborate with academic institutions and industry 
              partners to push the boundaries of drone technology.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3 mb-6 md:mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  className="flex items-center gap-2 md:gap-3 py-1"
                >
                  <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0" />
                  <span className="text-sm md:text-base text-foreground">{feature}</span>
                </motion.div>
              ))}
            </div>

            <Button variant="hero" size="lg" className="w-full sm:w-auto" asChild>
              <Link to="/research">
                Explore R&D
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default RnDSection;
