import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { motion, AnimatePresence, type Easing } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import FlyingDroneDecoration from "@/components/contact/FlyingDroneDecoration";
import RadarPulse from "@/components/contact/RadarPulse";
import SignalWaves from "@/components/contact/SignalWaves";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Building2, 
  GraduationCap, 
  Lightbulb,
  MessageSquare,
  CheckCircle2,
  Zap
} from "lucide-react";

const inquiryTypes = [
  { id: "enterprise", label: "Enterprise", icon: Building2 },
  { id: "academic", label: "Academic", icon: GraduationCap },
  { id: "research", label: "Research", icon: Lightbulb },
  { id: "training", label: "Training", icon: MessageSquare },
];

const easeOut: Easing = [0, 0, 0.58, 1];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: easeOut }
  },
};

const ContactPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    inquiryType: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSuccess(true);
    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24-48 hours.",
    });
    
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        phone: "",
        organization: "",
        inquiryType: "",
        message: "",
      });
      setIsSubmitting(false);
      setIsSuccess(false);
    }, 2000);
  };

  return (
    <>
      <Helmet>
        <title>Contact Us - Get in Touch | YuDru</title>
        <meta 
          name="description" 
          content="Contact YuDru for drone product inquiries, training enrollment, partnership opportunities, or support. We serve enterprises, research, and academic institutions." 
        />
      </Helmet>

      <div className="min-h-screen bg-background overflow-hidden">
        <Navbar />
        
        {/* Flying drones decoration */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-20">
            <FlyingDroneDecoration delay={0} duration={20} size={28} opacity={0.15} path="left-right" />
          </div>
          <div className="absolute top-40">
            <FlyingDroneDecoration delay={5} duration={25} size={20} opacity={0.1} path="right-left" />
          </div>
          <div className="absolute top-60">
            <FlyingDroneDecoration delay={10} duration={18} size={24} opacity={0.12} path="left-right" />
          </div>
        </div>
        
        <main className="pt-24 relative z-10">
          {/* Hero */}
          <section className="py-16 md:py-24 relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 tech-dots opacity-20" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-30 hidden lg:block">
              <RadarPulse className="w-full h-full" />
            </div>
            
            <div className="container mx-auto px-4 md:px-6 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-3xl mx-auto text-center"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
                >
                  <Zap className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-primary">Ready to Connect</span>
                  <SignalWaves />
                </motion.div>
                
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                  <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    Get in{" "}
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="text-gradient"
                  >
                    Touch
                  </motion.span>
                </h1>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                  className="text-lg text-muted-foreground"
                >
                  Whether you're an enterprise, research organization, or academic institution, 
                  we're here to help with your drone technology needs.
                </motion.p>
              </motion.div>
            </div>
          </section>

          {/* Contact Form & Info */}
          <section className="py-16">
            <div className="container mx-auto px-4 md:px-6">
              <div className="grid lg:grid-cols-5 gap-12">
                {/* Contact Info */}
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="lg:col-span-2"
                >
                  <motion.h2 
                    variants={itemVariants}
                    className="font-display text-2xl font-bold mb-6"
                  >
                    Contact Information
                  </motion.h2>
                  
                  <div className="space-y-6 mb-10">
                    {[
                      { icon: Mail, title: "Email", content: "info@yudru.com", href: "mailto:info@yudru.com" },
                      { icon: Phone, title: "Phone", content: "+91 9810653919", href: "tel:+919810653919" },
                      { icon: MapPin, title: "Location", content: "Dr. Mukherjee Nagar\nNew Delhi, 110009" },
                    ].map((item, index) => (
                      <motion.div
                        key={item.title}
                        variants={itemVariants}
                        whileHover={{ x: 5, transition: { duration: 0.2 } }}
                        className="flex items-start gap-4 group"
                      >
                        <motion.div 
                          className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 border border-primary/20"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          <item.icon className="w-6 h-6 text-primary" />
                        </motion.div>
                        <div>
                          <h3 className="font-semibold mb-1">{item.title}</h3>
                          {item.href ? (
                            <a href={item.href} className="text-muted-foreground hover:text-primary transition-colors">
                              {item.content}
                            </a>
                          ) : (
                            <p className="text-muted-foreground whitespace-pre-line">{item.content}</p>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Inquiry Types */}
                  <motion.h3 
                    variants={itemVariants}
                    className="font-display text-lg font-semibold mb-4"
                  >
                    We Serve
                  </motion.h3>
                  <motion.div 
                    variants={containerVariants}
                    className="grid grid-cols-2 gap-3"
                  >
                    {inquiryTypes.map((type, index) => (
                      <motion.div
                        key={type.id}
                        variants={itemVariants}
                        whileHover={{ 
                          scale: 1.05, 
                          backgroundColor: "hsl(var(--primary) / 0.1)",
                          transition: { duration: 0.2 }
                        }}
                        className="flex items-center gap-3 px-4 py-3 bg-secondary/30 rounded-lg border border-border/50 cursor-default"
                      >
                        <type.icon className="w-5 h-5 text-primary" />
                        <span className="text-sm font-medium">{type.label}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                  
                  {/* Decorative drone */}
                  <motion.div 
                    className="mt-10 hidden lg:block relative"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                  >
                    <div className="absolute -left-4 top-0">
                      <FlyingDroneDecoration size={48} opacity={0.4} path="hover" />
                    </div>
                  </motion.div>
                </motion.div>

                {/* Contact Form */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="lg:col-span-3"
                >
                  <div className="glass-card p-8 md:p-10 relative overflow-hidden">
                    {/* Decorative corner gradient */}
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
                    <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
                    
                    <motion.h2 
                      initial={{ opacity: 0, y: -10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="font-display text-2xl font-bold mb-6 relative z-10"
                    >
                      Send a Message
                    </motion.h2>
                    
                    <AnimatePresence mode="wait">
                      {isSuccess ? (
                        <motion.div
                          key="success"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="flex flex-col items-center justify-center py-20 text-center"
                        >
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
                          >
                            <CheckCircle2 className="w-20 h-20 text-primary mb-4" />
                          </motion.div>
                          <h3 className="font-display text-2xl font-bold mb-2">Message Sent!</h3>
                          <p className="text-muted-foreground">We'll respond within 24-48 hours</p>
                        </motion.div>
                      ) : (
                        <motion.form 
                          key="form"
                          onSubmit={handleSubmit} 
                          className="space-y-6 relative z-10"
                          variants={containerVariants}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                        >
                          <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-sm font-medium mb-2">Full Name *</label>
                              <Input
                                required
                                placeholder="Your name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="bg-secondary/50 border-border/50 focus:border-primary transition-colors"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2">Email *</label>
                              <Input
                                required
                                type="email"
                                placeholder="your@email.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="bg-secondary/50 border-border/50 focus:border-primary transition-colors"
                              />
                            </div>
                          </motion.div>

                          <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-sm font-medium mb-2">Phone</label>
                              <Input
                                placeholder="+91 98765 43210"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className="bg-secondary/50 border-border/50 focus:border-primary transition-colors"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2">Organization</label>
                              <Input
                                placeholder="Company or Institution"
                                value={formData.organization}
                                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                                className="bg-secondary/50 border-border/50 focus:border-primary transition-colors"
                              />
                            </div>
                          </motion.div>

                          <motion.div variants={itemVariants}>
                            <label className="block text-sm font-medium mb-3">Inquiry Type</label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                              {inquiryTypes.map((type) => (
                                <motion.button
                                  key={type.id}
                                  type="button"
                                  onClick={() => setFormData({ ...formData, inquiryType: type.id })}
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border transition-all ${
                                    formData.inquiryType === type.id
                                      ? "bg-primary/10 border-primary text-primary"
                                      : "bg-secondary/30 border-border/50 text-muted-foreground hover:border-primary/50"
                                  }`}
                                >
                                  <type.icon className="w-4 h-4" />
                                  <span className="text-sm font-medium">{type.label}</span>
                                </motion.button>
                              ))}
                            </div>
                          </motion.div>

                          <motion.div variants={itemVariants}>
                            <label className="block text-sm font-medium mb-2">Message *</label>
                            <Textarea
                              required
                              rows={5}
                              placeholder="Tell us about your requirements..."
                              value={formData.message}
                              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                              className="bg-secondary/50 border-border/50 resize-none focus:border-primary transition-colors"
                            />
                          </motion.div>

                          <motion.div variants={itemVariants}>
                            <Button 
                              type="submit" 
                              variant="hero" 
                              size="lg" 
                              className="w-full group"
                              disabled={isSubmitting}
                            >
                              <AnimatePresence mode="wait">
                                {isSubmitting ? (
                                  <motion.span
                                    key="loading"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="flex items-center gap-2"
                                  >
                                    <motion.div
                                      animate={{ rotate: 360 }}
                                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                      className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
                                    />
                                    Sending...
                                  </motion.span>
                                ) : (
                                  <motion.span
                                    key="send"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="flex items-center gap-2"
                                  >
                                    Send Message
                                    <motion.span
                                      className="inline-block"
                                      whileHover={{ x: 5, transition: { duration: 0.2 } }}
                                    >
                                      <Send className="w-5 h-5" />
                                    </motion.span>
                                  </motion.span>
                                )}
                              </AnimatePresence>
                            </Button>
                          </motion.div>
                        </motion.form>
                      )}
                    </AnimatePresence>
                  </div>
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

export default ContactPage;
