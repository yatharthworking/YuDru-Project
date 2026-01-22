import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, FlaskConical, Monitor, Users, Cpu, Microscope, Zap } from "lucide-react";
import labFacility from "@/assets/lab-facility.jpg";

const facilities = [
  {
    icon: FlaskConical,
    title: "Prototyping Lab",
    description: "Rapid prototyping facilities for drone frame design, assembly, and initial testing.",
  },
  {
    icon: Monitor,
    title: "Testing & Simulation",
    description: "Advanced flight simulators and controlled testing environments for validation.",
  },
  {
    icon: Users,
    title: "Training Labs",
    description: "Dedicated spaces for student and professional drone operation training.",
  },
  {
    icon: Cpu,
    title: "Electronics Workshop",
    description: "Specialized area for flight controller programming and electronic assembly.",
  },
  {
    icon: Microscope,
    title: "R&D Zone",
    description: "Experimental research area for advanced drone technology development.",
  },
  {
    icon: Zap,
    title: "Battery Testing",
    description: "Secure facility for battery performance testing and safety validation.",
  },
];

const LabsPage = () => {
  return (
    <>
      <Helmet>
        <title>Drone Labs - Innovation Facilities | YuDru</title>
        <meta 
          name="description" 
          content="State-of-the-art drone laboratories featuring prototyping, testing, simulation, and training facilities. YuDru's innovation backbone." 
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="pt-24">
          {/* Hero */}
          <section className="py-16 md:py-24 relative overflow-hidden">
            <div className="absolute inset-0">
              <img 
                src={labFacility} 
                alt="YuDru Drone Labs" 
                className="w-full h-full object-cover opacity-30"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
            </div>
            
            <div className="container mx-auto px-4 md:px-6 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-3xl mx-auto text-center"
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full text-sm font-display font-medium text-primary mb-6">
                  <FlaskConical className="w-4 h-4" />
                  Innovation Hub
                </span>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                  <span className="text-gradient">Drone Labs</span>
                </h1>
                <p className="text-lg text-muted-foreground mb-8">
                  Our state-of-the-art laboratories serve as the innovation and training backbone 
                  of YuDru, featuring cutting-edge facilities for every aspect of drone development.
                </p>
                <Button variant="hero" size="lg" asChild>
                  <Link to="/contact">
                    Schedule a Visit
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </section>

          {/* Facilities Grid */}
          <section className="py-24 bg-card">
            <div className="container mx-auto px-4 md:px-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                  World-Class Facilities
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  From prototyping to testing, our labs are equipped to handle every stage of drone development.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {facilities.map((facility, index) => (
                  <motion.div
                    key={facility.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-card p-8 hover-glow group"
                  >
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-cyan-glow flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <facility.icon className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <h3 className="font-display text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                      {facility.title}
                    </h3>
                    <p className="text-muted-foreground">{facility.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Lab Features */}
          <section className="py-24">
            <div className="container mx-auto px-4 md:px-6">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
                    Built for <span className="text-gradient">Innovation</span>
                  </h2>
                  <p className="text-lg text-muted-foreground mb-8">
                    Our drone labs are designed to foster innovation, collaboration, and hands-on learning. 
                    Whether you're a student, researcher, or industry professional, our facilities 
                    provide the perfect environment for drone technology advancement.
                  </p>
                  <ul className="space-y-4 mb-8">
                    {[
                      "24/7 access for research teams",
                      "Industry-standard equipment and tools",
                      "Collaborative workspace design",
                      "Safety-certified testing zones",
                      "High-speed connectivity and data systems",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Button variant="hero" asChild>
                    <Link to="/contact">
                      Partner With Our Labs
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </Button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="rounded-2xl overflow-hidden">
                    <img
                      src={labFacility}
                      alt="YuDru Lab Interior"
                      className="w-full aspect-[4/3] object-cover"
                    />
                  </div>
                  <div className="absolute -inset-4 bg-primary/15 rounded-3xl blur-3xl -z-10" />
                </motion.div>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default LabsPage;
