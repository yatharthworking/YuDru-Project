import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, FlaskConical, Cpu, Radio, Compass, Users, Building } from "lucide-react";
import labFacility from "@/assets/lab-facility.jpg";

const researchAreas = [
  {
    icon: Cpu,
    title: "AI Navigation & Automation",
    description: "Developing intelligent autonomous flight systems using advanced machine learning algorithms.",
  },
  {
    icon: FlaskConical,
    title: "Drone Prototyping",
    description: "Rapid prototyping and iterative testing of new drone designs and configurations.",
  },
  {
    icon: Radio,
    title: "Communication Systems",
    description: "Secure telemetry and communication protocols for reliable drone operations.",
  },
  {
    icon: Compass,
    title: "Flight Control Systems",
    description: "Advanced flight controllers with precision navigation and stabilization.",
  },
];

const collaborations = [
  { icon: Building, label: "Industry Partners" },
  { icon: Users, label: "Academic Institutions" },
  { icon: FlaskConical, label: "Research Organizations" },
];

const ResearchPage = () => {
  return (
    <>
      <Helmet>
        <title>Research & Development - Drone Innovation | YuDru</title>
        <meta 
          name="description" 
          content="YuDru's R&D focuses on AI navigation, flight control systems, and drone prototyping. Collaborating with academic and industry partners for innovation." 
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="pt-24">
          {/* Hero */}
          <section className="py-16 md:py-24 relative overflow-hidden">
            <div className="absolute inset-0 tech-dots opacity-20" />
            <div className="container mx-auto px-4 md:px-6 relative z-10">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full text-sm font-display font-medium text-primary mb-6">
                    <FlaskConical className="w-4 h-4" />
                    Research & Development
                  </span>
                  <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                    Pushing the <span className="text-gradient">Boundaries</span>
                  </h1>
                  <p className="text-lg text-muted-foreground mb-8">
                    Our R&D division leads innovation in drone technology through advanced research, 
                    prototyping, and collaborative development with industry and academic partners.
                  </p>
                  <Button variant="hero" size="lg" asChild>
                    <Link to="/contact">
                      Partner With Us
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </Button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="relative"
                >
                  <div className="rounded-2xl overflow-hidden">
                    <img
                      src={labFacility}
                      alt="YuDru R&D Laboratory"
                      className="w-full aspect-square object-cover"
                    />
                  </div>
                  <div className="absolute -inset-4 bg-primary/15 rounded-3xl blur-3xl -z-10" />
                </motion.div>
              </div>
            </div>
          </section>

          {/* Research Areas */}
          <section className="py-24 bg-card">
            <div className="container mx-auto px-4 md:px-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                  Core Research Areas
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Our multidisciplinary approach covers the complete spectrum of drone technology innovation.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {researchAreas.map((area, index) => (
                  <motion.div
                    key={area.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-card p-8 text-center hover-glow group"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-cyan-glow flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                      <area.icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h3 className="font-display text-xl font-semibold mb-3">{area.title}</h3>
                    <p className="text-muted-foreground">{area.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Innovation Pipeline */}
          <section className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 grid-pattern opacity-10" />
            <div className="container mx-auto px-4 md:px-6 relative z-10">
              <div className="max-w-4xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center mb-16"
                >
                  <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                    Innovation Pipeline
                  </h2>
                </motion.div>

                <div className="relative">
                  {/* Timeline Line */}
                  <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/50 to-transparent hidden md:block" />

                  {[
                    { step: "01", title: "Concept & Research", desc: "Initial research and feasibility studies" },
                    { step: "02", title: "Design & Prototyping", desc: "Iterative design and rapid prototyping" },
                    { step: "03", title: "Testing & Validation", desc: "Rigorous testing in simulated environments" },
                    { step: "04", title: "Deployment & Support", desc: "Production and ongoing R&D support" },
                  ].map((item, index) => (
                    <motion.div
                      key={item.step}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15 }}
                      className={`relative flex items-center gap-8 mb-12 ${
                        index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                      }`}
                    >
                      <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                        <div className="glass-card p-6">
                          <span className="font-display text-4xl font-bold text-primary/30">{item.step}</span>
                          <h3 className="font-display text-xl font-semibold mb-2">{item.title}</h3>
                          <p className="text-muted-foreground">{item.desc}</p>
                        </div>
                      </div>
                      <div className="hidden md:flex w-4 h-4 rounded-full bg-primary relative z-10 shrink-0" />
                      <div className="flex-1 hidden md:block" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Collaborations */}
          <section className="py-24 bg-card">
            <div className="container mx-auto px-4 md:px-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass-card p-8 md:p-12 text-center max-w-4xl mx-auto"
              >
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                  Collaborative Innovation
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  We partner with leading institutions and organizations to accelerate 
                  drone technology development and adoption.
                </p>
                <div className="flex flex-wrap justify-center gap-6 mb-8">
                  {collaborations.map((collab) => (
                    <div
                      key={collab.label}
                      className="flex items-center gap-3 px-6 py-4 bg-secondary/50 rounded-xl border border-border/50"
                    >
                      <collab.icon className="w-6 h-6 text-primary" />
                      <span className="font-semibold">{collab.label}</span>
                    </div>
                  ))}
                </div>
                <Button variant="hero" size="lg" asChild>
                  <Link to="/contact">
                    Become a Partner
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default ResearchPage;
