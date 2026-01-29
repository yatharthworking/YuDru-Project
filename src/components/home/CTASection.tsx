import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageSquare, Building2, School, Lightbulb } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-card to-background" />
      <div className="absolute inset-0 grid-pattern opacity-10" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative glass-card p-6 md:p-8 lg:p-12 xl:p-16 text-center overflow-hidden"
        >
          {/* Background Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] md:w-[600px] h-[150px] md:h-[300px] bg-primary/20 blur-[80px] md:blur-[120px] -z-10" />
          
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-3 md:mb-4">
            Ready to <span className="text-gradient">Take Flight?</span>
          </h2>
          
          <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-10 max-w-2xl mx-auto px-2">
            Whether you're an enterprise, research organization, or academic institution, 
            we're here to deliver tailored drone solutions for your needs.
          </p>

          {/* Inquiry Types */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 max-w-3xl mx-auto mb-6 md:mb-10">
            {[
              { icon: Building2, label: "Enterprise Inquiries" },
              { icon: School, label: "Academic Partners" },
              { icon: Lightbulb, label: "Research & Innovation" },
            ].map((type, index) => (
              <motion.div
                key={type.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="flex items-center justify-center gap-2 md:gap-3 px-3 md:px-4 py-2.5 md:py-3 bg-secondary/50 rounded-lg border border-border/50"
              >
                <type.icon className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0" />
                <span className="text-xs md:text-sm font-medium">{type.label}</span>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
            <Button variant="hero" size="lg" className="w-full sm:w-auto min-h-[48px]" asChild>
              <Link to="/contact">
                <MessageSquare className="w-4 h-4 md:w-5 md:h-5" />
                Contact Us
              </Link>
            </Button>
            <Button variant="heroOutline" size="lg" className="w-full sm:w-auto min-h-[48px]" asChild>
              <Link to="/training">
                Explore Training
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
