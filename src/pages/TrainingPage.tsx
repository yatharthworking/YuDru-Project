import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, GraduationCap, Wrench, Shield, Clock, Users, Award } from "lucide-react";
import trainingSession from "@/assets/training-session.jpg";

const trainingPrograms = [
  {
    title: "Drone Pilot Training",
    duration: "8 Weeks",
    level: "Beginner to Advanced",
    description: "Comprehensive pilot certification covering flight operations, safety protocols, and regulatory compliance.",
    features: ["Flight simulation training", "Hands-on flying sessions", "Safety certification", "Regulatory compliance"],
  },
  {
    title: "Industrial Operations",
    duration: "6 Weeks",
    level: "Intermediate",
    description: "Specialized training for industrial monitoring, surveying, and commercial drone operations.",
    features: ["Monitoring operations", "Data collection", "Equipment maintenance", "Mission planning"],
  },
  {
    title: "Advanced Professional",
    duration: "12 Weeks",
    level: "Advanced",
    description: "Advanced drone operations for enterprise and research professionals.",
    features: ["Complex operations", "Night operations", "Secure communications", "Mission execution"],
  },
];

const workshops = [
  {
    icon: Wrench,
    title: "Drone Assembly",
    description: "Build drones from scratch - frame assembly, motor mounting, and wiring.",
  },
  {
    icon: GraduationCap,
    title: "Flight Controllers",
    description: "Programming and tuning flight controllers for optimal performance.",
  },
  {
    icon: Shield,
    title: "Battery Technology",
    description: "Battery handling, maintenance, and safety best practices.",
  },
];

const TrainingPage = () => {
  return (
    <>
      <Helmet>
        <title>Training & Workshops - Drone Education | YuDru</title>
        <meta 
          name="description" 
          content="Professional drone pilot training, industrial operations courses, and hands-on workshops. Get certified with YuDru's comprehensive drone education programs." 
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
                    <GraduationCap className="w-4 h-4" />
                    Training & Workshops
                  </span>
                  <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                    Master <span className="text-gradient">Drone Technology</span>
                  </h1>
                  <p className="text-lg text-muted-foreground mb-8">
                    From beginner pilots to advanced operators, our comprehensive training programs 
                    and hands-on workshops prepare you for the future of drone technology.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Button variant="hero" size="lg" asChild>
                      <Link to="/contact">
                        Enroll Now
                        <ArrowRight className="w-5 h-5" />
                      </Link>
                    </Button>
                    <Button variant="heroOutline" size="lg" asChild>
                      <a href="#workshops">View Workshops</a>
                    </Button>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="relative"
                >
                  <div className="rounded-2xl overflow-hidden">
                    <img
                      src={trainingSession}
                      alt="Drone Training Session"
                      className="w-full aspect-[4/3] object-cover"
                    />
                  </div>
                  <div className="absolute -inset-4 bg-primary/15 rounded-3xl blur-3xl -z-10" />
                </motion.div>
              </div>
            </div>
          </section>

          {/* Stats */}
          <section className="py-12 bg-card border-y border-border/50">
            <div className="container mx-auto px-4 md:px-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { value: "500+", label: "Certified Pilots" },
                  { value: "50+", label: "Training Batches" },
                  { value: "95%", label: "Placement Rate" },
                  { value: "15+", label: "Corporate Partners" },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="font-display text-3xl md:text-4xl font-bold text-gradient mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Training Programs */}
          <section className="py-24">
            <div className="container mx-auto px-4 md:px-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                  Training Programs
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Structured learning paths designed for various skill levels and career goals.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-8">
                {trainingPrograms.map((program, index) => (
                  <motion.div
                    key={program.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-card p-8 hover-glow group"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        {program.duration}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Award className="w-4 h-4" />
                        {program.level}
                      </div>
                    </div>
                    
                    <h3 className="font-display text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                      {program.title}
                    </h3>
                    <p className="text-muted-foreground mb-6">{program.description}</p>
                    
                    <ul className="space-y-2 mb-8">
                      {program.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-3 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <Button variant="outline" className="w-full" asChild>
                      <Link to="/contact">Learn More</Link>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Workshops */}
          <section id="workshops" className="py-24 bg-card">
            <div className="container mx-auto px-4 md:px-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                  Hands-on Workshops
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Practical sessions focused on building, maintaining, and optimizing drone systems.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                {workshops.map((workshop, index) => (
                  <motion.div
                    key={workshop.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-card p-8 text-center hover-glow group"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-cyan-glow flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                      <workshop.icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h3 className="font-display text-xl font-semibold mb-3">{workshop.title}</h3>
                    <p className="text-muted-foreground">{workshop.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-24">
            <div className="container mx-auto px-4 md:px-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass-card p-8 md:p-12 text-center max-w-3xl mx-auto"
              >
                <Users className="w-12 h-12 text-primary mx-auto mb-6" />
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                  Start Your Journey
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Join hundreds of trained professionals and start your career in drone technology today.
                </p>
                <Button variant="hero" size="xl" asChild>
                  <Link to="/contact">
                    Get Course Details
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

export default TrainingPage;
