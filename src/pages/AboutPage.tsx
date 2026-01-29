import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight, Target, Eye, Rocket, Shield, Users, HelpCircle } from "lucide-react";
import labFacility from "@/assets/lab-facility.jpg";

const values = [
  {
    icon: Target,
    title: "Precision",
    description: "Engineering excellence with attention to every detail in our drone solutions.",
  },
  {
    icon: Shield,
    title: "Security",
    description: "Indigenous, non-Chinese technology ensuring data sovereignty and compliance.",
  },
  {
    icon: Rocket,
    title: "Innovation",
    description: "Continuous R&D to push the boundaries of drone technology capabilities.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "Partnering with institutions and industries for collective advancement.",
  },
];

const faqCategories = [
  {
    title: "Products & Solutions",
    faqs: [
      {
        question: "What types of drones does YuDru offer?",
        answer: "YuDru offers a comprehensive range including Sports Drones, Monitoring Drones, Logistics Drones (5kg-100kg), Mapping Drones, and Battery/Power Systems. All our products are 100% non-Chinese and indigenously developed.",
      },
      {
        question: "Are your drones suitable for government and enterprise procurement?",
        answer: "Yes, all our drones are designed with industry-grade security and comply with government procurement standards. We use transparent sourcing and certified manufacturing processes.",
      },
      {
        question: "What is the payload capacity of your heavy-lift drones?",
        answer: "Our logistics drones range from 5kg to 100kg capacity, with modular payload systems that can be customized for delivery, disaster relief, and industrial transport applications.",
      },
    ],
  },
  {
    title: "Training & Certification",
    faqs: [
      {
        question: "What training programs do you offer?",
        answer: "We offer Drone Pilot Training (8 weeks), Industrial Operations (6 weeks), and Advanced Professional training (12 weeks). Each program includes hands-on flying, safety certification, and regulatory compliance.",
      },
      {
        question: "Do I get a certification after training?",
        answer: "Yes, upon successful completion of our training programs, you receive industry-recognized certification. Our courses also prepare you for DGCA licensing requirements.",
      },
      {
        question: "Are workshops available for beginners?",
        answer: "Absolutely! Our workshops cover drone assembly, flight controllers, and battery technology, designed for all skill levels from beginners to advanced professionals.",
      },
    ],
  },
  {
    title: "Services & Support",
    faqs: [
      {
        question: "Do you offer drone repair and maintenance services?",
        answer: "Yes, we provide comprehensive repair and maintenance including diagnostics, motor/ESC repair, firmware updates, calibration, and Annual Maintenance Contracts (AMC).",
      },
      {
        question: "Can you build custom drones for specific requirements?",
        answer: "Yes, our Custom Drone Development service covers requirement-based design, payload customization, software tuning, and complete prototyping and testing.",
      },
      {
        question: "What support is available after purchase?",
        answer: "We offer technical support, maintenance services, spare parts, firmware updates, and training for all our products. Extended warranty and AMC options are also available.",
      },
    ],
  },
  {
    title: "Compliance & Safety",
    faqs: [
      {
        question: "What certifications do your drones have?",
        answer: "Our products comply with ISO 9001:2015, DGCA regulations, and government procurement standards. We maintain transparent documentation for all certifications.",
      },
      {
        question: "How do you ensure non-Chinese components?",
        answer: "We maintain a strict, transparent supply chain with verified component sourcing. All materials are documented and auditable to ensure 100% non-Chinese manufacturing.",
      },
    ],
  },
];

const AboutPage = () => {
  return (
    <>
      <Helmet>
        <title>About Us & FAQ - Indigenous Drone Technology | YuDru</title>
        <meta 
          name="description" 
          content="YuDru is committed to indigenous drone technology innovation. Learn about our vision, mission, and find answers to frequently asked questions." 
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
                  <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                    About <span className="text-gradient">YuDru</span>
                  </h1>
                  <p className="text-lg text-muted-foreground mb-6">
                    YuDru stands at the forefront of indigenous drone technology, delivering 
                    secure, innovative, and industry-leading solutions for monitoring, logistics, 
                    and industrial applications.
                  </p>
                  <p className="text-muted-foreground mb-8">
                    With a commitment to 100% non-Chinese components and transparent manufacturing, 
                    we provide compliant solutions suitable for government, enterprise, and research deployment.
                  </p>
                  <Button variant="hero" size="lg" asChild>
                    <Link to="/contact">
                      Get in Touch
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
                      alt="YuDru Facilities"
                      className="w-full aspect-square object-cover"
                    />
                  </div>
                  <div className="absolute -inset-4 bg-primary/15 rounded-3xl blur-3xl -z-10" />
                </motion.div>
              </div>
            </div>
          </section>

          {/* Vision & Mission */}
          <section className="py-24 bg-card">
            <div className="container mx-auto px-4 md:px-6">
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="glass-card p-8"
                >
                  <Eye className="w-12 h-12 text-primary mb-6" />
                  <h2 className="font-display text-2xl font-bold mb-4">Our Vision</h2>
                  <p className="text-muted-foreground">
                    To be the leading provider of indigenous drone technology solutions, 
                    empowering industry, research, and innovation with secure, world-class 
                    drone systems.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="glass-card p-8"
                >
                  <Target className="w-12 h-12 text-primary mb-6" />
                  <h2 className="font-display text-2xl font-bold mb-4">Our Mission</h2>
                  <p className="text-muted-foreground">
                    To design, develop, and deploy indigenous drone solutions with 
                    uncompromising quality, security, and innovation, while fostering 
                    talent through comprehensive training programs.
                  </p>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Core Values */}
          <section className="py-24">
            <div className="container mx-auto px-4 md:px-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                  Core Values
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  The principles that guide everything we do at YuDru.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {values.map((value, index) => (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-card p-8 text-center hover-glow group"
                  >
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-cyan-glow flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                      <value.icon className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <h3 className="font-display text-xl font-semibold mb-3">{value.title}</h3>
                    <p className="text-muted-foreground text-sm">{value.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>


          {/* FAQ Section */}
          <section id="faq" className="py-24">
            <div className="container mx-auto px-4 md:px-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <HelpCircle className="w-16 h-16 text-primary mx-auto mb-6" />
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                  Frequently Asked <span className="text-gradient">Questions</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Find answers to common questions about our products, services, and training programs.
                </p>
              </motion.div>

              <div className="max-w-4xl mx-auto">
                {faqCategories.map((category, categoryIndex) => (
                  <motion.div
                    key={category.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: categoryIndex * 0.1 }}
                    className="mb-12"
                  >
                    <h3 className="font-display text-2xl font-bold mb-6 text-gradient">
                      {category.title}
                    </h3>
                    <Accordion type="single" collapsible className="space-y-4">
                      {category.faqs.map((faq, faqIndex) => (
                        <AccordionItem
                          key={faqIndex}
                          value={`${categoryIndex}-${faqIndex}`}
                          className="glass-card border-none px-6"
                        >
                          <AccordionTrigger className="text-left font-semibold hover:text-primary transition-colors py-6">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground pb-6">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Still Have Questions CTA */}
          <section className="py-24 bg-card">
            <div className="container mx-auto px-4 md:px-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass-card p-8 md:p-12 text-center max-w-3xl mx-auto"
              >
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                  Still Have Questions?
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Our team is here to help. Reach out and we'll get back to you promptly.
                </p>
                <Button variant="hero" size="xl" asChild>
                  <Link to="/contact">
                    Contact Us
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

export default AboutPage;
