import { Helmet } from "react-helmet-async";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import FocusAreasSection from "@/components/home/FocusAreasSection";
import ProductsPreviewSection from "@/components/home/ProductsPreviewSection";
import RnDSection from "@/components/home/RnDSection";
import CTASection from "@/components/home/CTASection";
import ScrollToTopButton from "@/components/ScrollToTopButton";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>YuDru - Indigenous Drone Technology | Innovation & R&D Solutions</title>
        <meta 
          name="description" 
          content="YuDru delivers 100% indigenous, non-Chinese drone technology for monitoring, logistics, and industrial applications. Explore our R&D, training, and innovative drone solutions." 
        />
        <meta name="keywords" content="drone technology, indigenous drones, industrial drones, monitoring drones, drone R&D, drone training, India" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <HeroSection />
          <FocusAreasSection />
          <ProductsPreviewSection />
          <RnDSection />
          <CTASection />
        </main>
        <Footer />
        <ScrollToTopButton />
      </div>
    </>
  );
};

export default Index;
