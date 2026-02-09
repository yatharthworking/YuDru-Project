import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, GraduationCap, Shield, Clock, Users, Award, School, Building2 } from "lucide-react";
import trainingSession from "@/assets/training-session.jpg";

const trainingPrograms = [
  {
    title: "School-Level Drone Training",
    duration: "2 Days",
    level: "Foundational",
    icon: School,
    description: "A foundational drone training program designed for school students, introducing them to UAV technology through hands-on learning.",
    features: [
      "Introduction to drones and UAV systems",
      "Basics of flight, safety, and regulations",
      "Hands-on drone assembly and flying",
      "STEM-focused practical learning",
    ],
    cta: { primary: "Enroll Your School", secondary: "Contact for Scheduling" },
  },
  {
    title: "College & Institutional Training",
    duration: "3 Days",
    level: "Advanced",
    icon: GraduationCap,
    description: "Advanced training program designed for engineering students and technical institutions, covering aerodynamics through to flight testing.",
    features: [
      "Drone aerodynamics and propulsion systems",
      "Electronics, flight controllers, and sensors",
      "FPV systems and communication",
      "Drone assembly, configuration, and flight testing",
      "Industry applications and career pathways",
    ],
    cta: { primary: "Partner With Us", secondary: "View Training Curriculum" },
  },
  {
    title: "Defence & Industry Training",
    duration: "Custom",
    level: "Professional",
    icon: Shield,
    description: "Specialized training programs designed for operational and professional drone usage by defence personnel, security agencies, and industry professionals.",
    features: [
      "Advanced drone operations",
      "Surveillance and mission planning",
      "Payload integration",
      "Maintenance, safety, and troubleshooting",
      "Application-specific training modules",
    ],
    cta: { primary: "Request Professional Training", secondary: "Discuss Operational Requirements" },
  },
];

const targetAudience = [
  { label: "School Students", icon: School },
  { label: "Engineering Colleges", icon: GraduationCap },
  { label: "Defence Personnel", icon: Shield },
  { label: "Industry Professionals", icon: Building2 },
];

const TrainingPage = () => {
  return (
    <>
      <Helmet>
        <title>Training & Workshops - Drone Education | YuDru</title>
        <meta
          name="description"
          content="YuDru offers drone training programs for schools, colleges, defence, and industry — from 2-day workshops to specialized professional courses. Hands-on UAV education."
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
                    From school-level introductions to advanced defence training, our programs deliver hands-on UAV education tailored to every skill level and industry need.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Button variant="hero" size="lg" asChild>
                      <Link to="/contact">
                        Enroll Now
                        <ArrowRight className="w-5 h-5" />
                      </Link>
                    </Button>
                    <Button variant="heroOutline" size="lg" asChild>
                      <a href="#programs">View Programs</a>
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
                    <img src={trainingSession} alt="Drone Training Session" className="w-full aspect-[4/3] object-cover" />
                  </div>
                  <div className="absolute -inset-4 bg-primary/15 rounded-3xl blur-3xl -z-10" />
                </motion.div>
              </div>
            </div>
          </section>

          {/* Target Audience */}
          <section className="py-12 bg-card border-y border-border/50">
            <div className="container mx-auto px-4 md:px-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {targetAudience.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex flex-col items-center gap-3 text-center"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-cyan-glow flex items-center justify-center">
                      <item.icon className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <span className="text-sm font-medium text-foreground">{item.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Training Programs */}
          <section id="programs" className="py-24">
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
                  Structured programs designed for schools, colleges, defence personnel, and industry professionals.
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
                    className="glass-card p-8 hover-glow group flex flex-col"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                        <program.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="w-3.5 h-3.5" />
                          {program.duration}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Award className="w-3.5 h-3.5" />
                          {program.level}
                        </div>
                      </div>
                    </div>

                    <h3 className="font-display text-xl md:text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                      {program.title}
                    </h3>
                    <p className="text-muted-foreground mb-6">{program.description}</p>

                    <ul className="space-y-2 mb-8 flex-1">
                      {program.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-col gap-2">
                      <Button variant="hero" className="w-full" asChild>
                        <Link to="/contact">{program.cta.primary}</Link>
                      </Button>
                      <Button variant="heroOutline" className="w-full" asChild>
                        <Link to="/contact">{program.cta.secondary}</Link>
                      </Button>
                    </div>
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
                  Start Your Drone Journey
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Whether you're a student, educator, or professional — our training programs are designed to equip you with real-world drone skills.
                </p>
                <Button variant="hero" size="xl" asChild>
                  <Link to="/contact">
                    Contact Our Training Team
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
