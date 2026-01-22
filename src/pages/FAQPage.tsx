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
import { HelpCircle, ArrowRight } from "lucide-react";

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

const FAQPage = () => {
  return (
    <>
      <Helmet>
        <title>FAQ - Frequently Asked Questions | YuDru</title>
        <meta 
          name="description" 
          content="Find answers to frequently asked questions about YuDru's drone products, training programs, services, and compliance standards." 
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="pt-24">
          {/* Hero */}
          <section className="py-16 md:py-24 relative overflow-hidden">
            <div className="absolute inset-0 grid-pattern opacity-20" />
            <div className="container mx-auto px-4 md:px-6 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-3xl mx-auto text-center"
              >
                <HelpCircle className="w-16 h-16 text-primary mx-auto mb-6" />
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                  Frequently Asked <span className="text-gradient">Questions</span>
                </h1>
                <p className="text-lg text-muted-foreground">
                  Find answers to common questions about our products, services, and training programs.
                </p>
              </motion.div>
            </div>
          </section>

          {/* FAQ Sections */}
          <section className="py-16">
            <div className="container mx-auto px-4 md:px-6 max-w-4xl">
              {faqCategories.map((category, categoryIndex) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: categoryIndex * 0.1 }}
                  className="mb-12"
                >
                  <h2 className="font-display text-2xl font-bold mb-6 text-gradient">
                    {category.title}
                  </h2>
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
          </section>

          {/* Still Have Questions */}
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

export default FAQPage;
