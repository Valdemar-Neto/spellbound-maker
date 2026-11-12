import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HighlightsStrip from "@/components/HighlightsStrip";
import PneusSection from "@/components/PneusSection";
import ServicesSection from "@/components/ServicesSection";
import SeminovosSection from "@/components/SeminovosSection";
import LocationSection from "@/components/LocationSection";
import FaqSection from "@/components/FaqSection";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";
import MobileContactBar from "@/components/MobileContactBar";
import { formatMedida, MEDIDA_VAZIA, TEXTO_PADRAO_PNEU, type Medida } from "@/lib/medida";

const Index = () => {
  // A medida escolhida em "Procurando pneu?" aparece na lateral do pneu 3D do hero.
  const [medida, setMedida] = useState<Medida>(MEDIDA_VAZIA);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main id="inicio">
        <HeroSection tireText={formatMedida(medida) ?? TEXTO_PADRAO_PNEU} />
        <HighlightsStrip />
        <PneusSection medida={medida} onChange={setMedida} />
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
};

export default Index;
