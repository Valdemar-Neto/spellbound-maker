import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HighlightsStrip from "@/components/HighlightsStrip";
import ServicesSection from "@/components/ServicesSection";
import SeminovosSection from "@/components/SeminovosSection";
import LocationSection from "@/components/LocationSection";
import FaqSection from "@/components/FaqSection";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";
import MobileContactBar from "@/components/MobileContactBar";

const Index = () => (
  <div className="flex min-h-screen flex-col bg-background">
    <Navbar />
    <main id="inicio">
      <HeroSection />
      <HighlightsStrip />
      <ServicesSection />
      <SeminovosSection />
      <LocationSection />
      <FaqSection />
      <CtaSection />
    </main>
    <Footer />
    <MobileContactBar />
  </div>
);

export default Index;
