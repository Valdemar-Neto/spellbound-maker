import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/motion/Reveal";
import { Clock, ThumbsUp, MapPin, Flame } from "lucide-react";

const differentials = [
  {
    icon: Clock,
    title: "Atendimento Rápido",
    description: "Tempo é precioso. Resolvemos seu problema com agilidade.",
  },
  {
    icon: ThumbsUp,
    title: "Confiança",
    description: "Anos de experiência e clientes satisfeitos na região.",
  },
  {
    icon: MapPin,
    title: "Localização Estratégica",
    description: "Fácil acesso para quem está de passagem ou mora perto.",
  },
  {
    icon: Flame,
    title: "Compromisso & Fé",
    description: "Trabalhamos com dedicação, honestidade e fé em Deus.",
  },
];

const DifferentialsSection = () => {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-dark-elevated to-background" />
      
      <div className="container px-4 relative z-10">
        <SectionHeading eyebrow="Por que nos escolher" title="Nossos diferenciais" />

        <Reveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {differentials.map((item) => (
            <div key={item.title} data-reveal className="text-center group">
              <div className="w-20 h-20 mx-auto rounded-full border-2 border-primary/30 flex items-center justify-center mb-6 group-hover:border-fire-orange group-hover:shadow-fire transition-[border-color,box-shadow] duration-200">
                <item.icon className="w-9 h-9 text-fire-orange" />
              </div>
              <h3 className="font-display text-lg font-semibold uppercase mb-2 text-foreground">
                {item.title}
              </h3>
              <p className="font-body text-muted-foreground text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
};

export default DifferentialsSection;
