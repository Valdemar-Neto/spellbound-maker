import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/motion/Reveal";
import { Wrench, RotateCcw, AlertTriangle, Truck, Gauge, Shield } from "lucide-react";

const services = [
  {
    icon: Wrench,
    title: "Venda e Troca de Pneus",
    description: "Troca rápida e segura para carros, motos e caminhões com pneus novos e seminovos.",
  },
  {
    icon: RotateCcw,
    title: "Vulcanização",
    description: "Readequação perfeita de seus pneus com os melhores profissionais da região.",
  },
  {
    icon: AlertTriangle,
    title: "Emergência ao seu alcance",
    description: "Atendimento emergencial quando você precisar e onde você estiver.",
  },
  {
    icon: Truck,
    title: "Pneus para Caminhões",
    description: "Serviços especializados para veículos pesados.",
  },
  {
    icon: Gauge,
    title: "Calibragem",
    description: "Pressão correta para economia e segurança na estrada.",
  },
  {
    icon: Shield,
    title: "Conserto de Furos",
    description: "Reparo rápido com materiais de qualidade garantida.",
  },
];

const ServicesSection = () => {
  return (
    <section id="servicos" className="py-20 md:py-28 bg-dark-surface">
      <div className="container px-4">
        <SectionHeading eyebrow="O que fazemos" title="Nossos serviços" />

        <Reveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              data-reveal
              className="lift group bg-card border border-border rounded-lg p-8 hover:border-primary/50 hover:shadow-fire"
            >
              <div className="w-14 h-14 rounded-lg gradient-fire flex items-center justify-center mb-6">
                <service.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="font-display text-xl font-semibold uppercase mb-3 text-foreground">
                {service.title}
              </h3>
              <p className="font-body text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
};

export default ServicesSection;
