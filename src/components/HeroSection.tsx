import heroBg from "@/assets/hero-bg.jpg";
import { Phone, MessageCircle } from "lucide-react";

const HeroSection = () => {
  const whatsappUrl = "https://wa.me/5598999623417?text=Olá! Gostaria de um orçamento.";

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Fênix Borracharia - Pneu com chamas"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 container text-center px-4 py-20">
        <p className="font-display text-lg md:text-xl tracking-[0.3em] uppercase text-fire-orange mb-4 animate-float">
          ✦ Deus é Fiel ✦
        </p>
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold uppercase leading-tight mb-6 text-shadow-fire">
          <span className="gradient-fire-text">Fênix</span>
          <br />
          <span className="text-foreground">Borracharia</span>
        </h1>
        <p className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
          Atendimento rápido, profissional e de confiança. Seu pneu em boas mãos, 
          a qualquer hora do dia.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-lg font-display text-lg uppercase tracking-wider gradient-fire text-primary-foreground shadow-fire-lg hover:scale-105 transition-transform duration-300"
          >
            <MessageCircle className="w-5 h-5" />
            Chamar no WhatsApp
          </a>
          <a
            href="tel:+5598999623417"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-lg font-display text-lg uppercase tracking-wider border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
          >
            <Phone className="w-5 h-5" />
            Ligar Agora
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground flex justify-center pt-2">
          <div className="w-1.5 h-3 rounded-full bg-fire-orange" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
