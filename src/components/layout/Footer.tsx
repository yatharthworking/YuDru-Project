import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Linkedin, Twitter, Youtube } from "lucide-react";
import yudruLogo from "@/assets/yudru-logo.png";

const Footer = () => {
  const currentYear = 2026;

  const footerLinks = {
    products: [
      { name: "Soccer Drones", path: "/products#soccer" },
      { name: "Surveillance Drones", path: "/products#surveillance" },
      { name: "Payload Drones", path: "/products#payload" },
      { name: "Batteries & Power", path: "/products#batteries" },
    ],
    services: [
      { name: "R&D Services", path: "/research" },
      { name: "Drone Training", path: "/training" },
      { name: "Workshops", path: "/training#workshops" },
      { name: "Drone Labs", path: "/labs" },
    ],
    company: [
      { name: "About Us", path: "/about" },
      { name: "Blog", path: "/blog" },
      { name: "Gallery", path: "/gallery" },
      { name: "FAQ", path: "/faq" },
      { name: "Contact", path: "/contact" },
    ],
  };

  return (
    <footer className="bg-card border-t border-border/50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 tech-dots opacity-30" />
      
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12">
          {/* Brand */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6 group">
              <img 
                src={yudruLogo} 
                alt="YuDru Drones Logo" 
                className="w-16 h-16 md:w-20 md:h-20 object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <span className="font-display text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary via-cyan-glow to-primary bg-clip-text text-transparent tracking-tight">
                YuDru
              </span>
            </Link>
            <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6 max-w-sm leading-relaxed">
              Indigenous drone technology solutions for monitoring, logistics, and industrial applications. 
              100% non-Chinese, secure, and compliant.
            </p>
            <div className="flex gap-3 md:gap-4">
              <a href="#" className="p-2 md:p-2.5 bg-secondary/50 hover:bg-primary/20 hover:text-primary rounded-lg transition-all duration-300 min-w-[40px] min-h-[40px] flex items-center justify-center">
                <Linkedin size={18} />
              </a>
              <a href="#" className="p-2 md:p-2.5 bg-secondary/50 hover:bg-primary/20 hover:text-primary rounded-lg transition-all duration-300 min-w-[40px] min-h-[40px] flex items-center justify-center">
                <Twitter size={18} />
              </a>
              <a href="#" className="p-2 md:p-2.5 bg-secondary/50 hover:bg-primary/20 hover:text-primary rounded-lg transition-all duration-300 min-w-[40px] min-h-[40px] flex items-center justify-center">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4 md:mb-6 text-sm md:text-base tracking-wide">Products</h4>
            <ul className="space-y-2 md:space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-sm md:text-base text-muted-foreground hover:text-primary transition-colors duration-300 py-1 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4 md:mb-6 text-sm md:text-base tracking-wide">Services</h4>
            <ul className="space-y-2 md:space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-sm md:text-base text-muted-foreground hover:text-primary transition-colors duration-300 py-1 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="font-display font-semibold text-foreground mb-4 md:mb-6 text-sm md:text-base tracking-wide">Contact</h4>
            <ul className="space-y-3 md:space-y-4">
              <li className="flex items-start gap-2 md:gap-3 text-sm md:text-base text-muted-foreground">
                <Mail size={16} className="text-primary mt-0.5 flex-shrink-0" />
                <span>info@yudru.com</span>
              </li>
              <li className="flex items-start gap-2 md:gap-3 text-sm md:text-base text-muted-foreground">
                <Phone size={16} className="text-primary mt-0.5 flex-shrink-0" />
                <span>+91 9810653919</span>
              </li>
              <li className="flex items-start gap-2 md:gap-3 text-sm md:text-base text-muted-foreground">
                <MapPin size={16} className="text-primary mt-0.5 flex-shrink-0" />
                <span>Dr. Mukherjee Nagar<br />New Delhi, 110009</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/50 mt-8 md:mt-12 pt-6 md:pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs md:text-sm text-muted-foreground text-center md:text-left">
            © {currentYear} YuDru Technologies. All rights reserved.
          </p>
          <div className="flex gap-4 md:gap-6 text-xs md:text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors py-1">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors py-1">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
