import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FlaskConical, GraduationCap, Cog, Plane, ArrowRight } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";

const focusAreas = [
  {
    icon: FlaskConical,
    title: "Research & Development",
    description: "Cutting-edge drone prototyping, AI navigation, and flight control systems development.",
    link: "/research",
    color: "from-primary to-cyan-glow",
  },
  {
    icon: GraduationCap,
    title: "Training Programs",
    description: "Professional drone pilot certification, safety compliance, and industrial operations training.",
    link: "/training",
    color: "from-cyan-muted to-primary",
  },
  {
    icon: Cog,
    title: "Technical Workshops",
    description: "Hands-on workshops for drone assembly, electronics, battery technology, and maintenance.",
    link: "/training#workshops",
    color: "from-primary to-cyan-glow",
  },
  {
    icon: Plane,
    title: "Drone Laboratories",
    description: "State-of-the-art prototyping labs, testing environments, and simulation facilities.",
    link: "/labs",
    color: "from-cyan-muted to-primary",
  },
];

const FocusAreasSection = () => {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 tech-dots opacity-20" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <SectionHeading
          badge="What We Do"
          title="Core Focus Areas"
          subtitle="Delivering excellence across the complete drone technology ecosystem, from research to deployment."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {focusAreas.map((area, index) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                to={area.link}
                className="group block h-full glass-card p-6 md:p-8 hover-glow transition-all duration-500 hover:-translate-y-2"
              >
                {/* Icon */}
                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br ${area.color} flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <area.icon className="w-6 h-6 md:w-7 md:h-7 text-primary-foreground" />
                </div>

                {/* Content */}
                <h3 className="font-display text-lg md:text-xl font-semibold mb-2 md:mb-3 group-hover:text-primary transition-colors">
                  {area.title}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground mb-3 md:mb-4 leading-relaxed">
                  {area.description}
                </p>

                {/* Link Arrow */}
                <div className="flex items-center gap-2 text-primary font-medium text-sm">
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FocusAreasSection;
