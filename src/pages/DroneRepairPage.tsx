import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Wrench, Shield, Clock, CheckCircle, Phone, Mail, MapPin, Cpu, Battery, Camera, Radio, Settings, ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const repairServices = [
  {
    icon: Cpu,
    title: "Flight Controller Repair",
    description: "Expert diagnosis and repair of flight controller issues, firmware updates, and calibration services.",
    price: "Starting from ₹2,500"
  },
  {
    icon: Battery,
    title: "Battery & Power Systems",
    description: "Battery health assessment, cell replacement, power distribution board repairs, and charging system fixes.",
    price: "Starting from ₹1,500"
  },
  {
    icon: Camera,
    title: "Gimbal & Camera Service",
    description: "Gimbal motor replacement, stabilization calibration, camera sensor cleaning, and lens repairs.",
    price: "Starting from ₹3,000"
  },
  {
    icon: Radio,
    title: "Communication Systems",
    description: "RC receiver repairs, video transmitter fixes, antenna replacements, and signal optimization.",
    price: "Starting from ₹2,000"
  },
  {
    icon: Settings,
    title: "Motor & ESC Repair",
    description: "Motor bearing replacement, ESC diagnostics, winding repairs, and propulsion system tuning.",
    price: "Starting from ₹1,800"
  },
  {
    icon: Wrench,
    title: "Frame & Structure",
    description: "Carbon fiber repairs, arm replacements, landing gear fixes, and structural integrity assessment.",
    price: "Starting from ₹1,200"
  }
];

const whyChooseUs = [
  {
    icon: Shield,
    title: "Certified Technicians",
    description: "Our team consists of certified drone technicians with years of experience."
  },
  {
    icon: Clock,
    title: "Quick Turnaround",
    description: "Most repairs completed within 24-72 hours with priority service available."
  },
  {
    icon: CheckCircle,
    title: "Quality Guarantee",
    description: "90-day warranty on all repairs with genuine or high-quality replacement parts."
  }
];

const repairProcess = [
  { step: "01", title: "Submit Request", description: "Fill out our repair request form or contact us directly." },
  { step: "02", title: "Diagnosis", description: "Our experts perform a thorough diagnostic assessment." },
  { step: "03", title: "Quote & Approval", description: "Receive a detailed quote and approve the repair." },
  { step: "04", title: "Repair & Test", description: "Professional repair followed by comprehensive testing." },
  { step: "05", title: "Delivery", description: "Your drone is returned fully functional and tested." }
];

const DroneRepairPage = () => {
  return (
    <>
      <Helmet>
        <title>Drone Repair Services | YuDru - Professional Drone Maintenance</title>
        <meta 
          name="description" 
          content="Professional drone repair and maintenance services by YuDru. Expert technicians, quick turnaround, and quality guarantee for all drone brands and models." 
        />
        <meta name="keywords" content="drone repair, drone maintenance, drone service, UAV repair, drone technician, India" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="mobile-safe-bottom">
          {/* Hero Section */}
          <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-cyan-glow/5" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
            
            <div className="container mx-auto px-4 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center max-w-4xl mx-auto"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
                  <Wrench className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-primary">Expert Repair Services</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-6">
                  <span className="bg-gradient-to-r from-primary to-cyan-glow bg-clip-text text-transparent">
                    Drone Repair
                  </span>{" "}
                  Services
                </h1>
                
                <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Get your drone back in the air with our certified repair services. 
                  Fast turnaround, quality parts, and expert technicians.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="hero" size="lg" asChild>
                    <Link to="/contact">
                      Request Repair
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  </Button>
                  <Button variant="heroOutline" size="lg" asChild>
                    <a href="tel:+919876543210">
                      <Phone className="w-5 h-5 mr-2" />
                      Call Now
                    </a>
                  </Button>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Why Choose Us */}
          <section className="py-16 md:py-24 bg-secondary/30">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
                  Why Choose <span className="text-primary">YuDru</span> Repair?
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  We bring the same innovation and expertise from our drone development to repair services.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-6">
                {whyChooseUs.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 text-center">
                      <CardHeader>
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                          <item.icon className="w-8 h-8 text-primary" />
                        </div>
                        <CardTitle className="text-xl">{item.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-base">{item.description}</CardDescription>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Repair Services */}
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
                  Our Repair <span className="text-primary">Services</span>
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Comprehensive repair solutions for all drone components and systems.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {repairServices.map((service, index) => (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 group">
                      <CardHeader>
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                          <service.icon className="w-6 h-6 text-primary" />
                        </div>
                        <CardTitle className="text-lg">{service.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <CardDescription className="text-sm">{service.description}</CardDescription>
                        <p className="text-primary font-semibold">{service.price}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Repair Process */}
          <section className="py-16 md:py-24 bg-secondary/30">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
                  How It <span className="text-primary">Works</span>
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Simple and transparent repair process from start to finish.
                </p>
              </motion.div>

              <div className="max-w-4xl mx-auto">
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/30 transform md:-translate-x-1/2" />
                  
                  {repairProcess.map((item, index) => (
                    <motion.div
                      key={item.step}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className={`relative flex items-center gap-6 mb-8 ${
                        index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                      }`}
                    >
                      <div className="hidden md:block md:w-1/2" />
                      
                      <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-primary transform -translate-x-1/2 z-10 shadow-lg shadow-primary/50" />
                      
                      <div className="ml-16 md:ml-0 md:w-1/2">
                        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                          <CardContent className="p-6">
                            <span className="text-primary font-bold text-2xl">{item.step}</span>
                            <h3 className="text-lg font-semibold mt-2">{item.title}</h3>
                            <p className="text-muted-foreground text-sm mt-1">{item.description}</p>
                          </CardContent>
                        </Card>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Contact CTA */}
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-4xl mx-auto"
              >
                <Card className="bg-gradient-to-br from-primary/10 via-card to-cyan-glow/5 border-primary/30">
                  <CardContent className="p-8 md:p-12">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                      <div>
                        <h2 className="text-2xl md:text-3xl font-bold font-display mb-4">
                          Need Immediate Assistance?
                        </h2>
                        <p className="text-muted-foreground mb-6">
                          Our expert technicians are ready to help. Contact us for a free consultation and quote.
                        </p>
                        <div className="space-y-3">
                          <a href="tel:+919876543210" className="flex items-center gap-3 text-foreground hover:text-primary transition-colors">
                            <Phone className="w-5 h-5 text-primary" />
                            <span>+91 98765 43210</span>
                          </a>
                          <a href="mailto:repair@yudru.com" className="flex items-center gap-3 text-foreground hover:text-primary transition-colors">
                            <Mail className="w-5 h-5 text-primary" />
                            <span>repair@yudru.com</span>
                          </a>
                          <div className="flex items-center gap-3 text-muted-foreground">
                            <MapPin className="w-5 h-5 text-primary" />
                            <span>YuDru Tech Park, Bangalore, India</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-4">
                        <Button variant="hero" size="lg" className="w-full" asChild>
                          <Link to="/contact">
                            Get Free Quote
                            <ArrowRight className="w-5 h-5 ml-2" />
                          </Link>
                        </Button>
                        <Button variant="heroOutline" size="lg" className="w-full" asChild>
                          <Link to="/faq">
                            View FAQs
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default DroneRepairPage;
