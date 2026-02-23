import { Wrench, RotateCcw, AlertTriangle, Truck, Gauge, Shield } from "lucide-react";

const services = [
  {
    icon: Wrench,
    title: "Troca de Pneus",
    description: "Troca rápida e segura para carros, motos e caminhões.",
  },
  {
    icon: RotateCcw,
    title: "Balanceamento",
    description: "Equilíbrio perfeito para maior durabilidade e conforto.",
  },
  {
    icon: AlertTriangle,
    title: "Emergência 24h",
    description: "Atendimento emergencial a qualquer hora, onde você estiver.",
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
        <div className="text-center mb-16">
          <p className="font-display text-sm tracking-[0.3em] uppercase text-fire-orange mb-3">
            O que fazemos
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold uppercase">
            Nossos <span className="gradient-fire-text">Serviços</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="group bg-card border border-border rounded-lg p-8 hover:border-primary/50 hover:shadow-fire transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-lg gradient-fire flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
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
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
