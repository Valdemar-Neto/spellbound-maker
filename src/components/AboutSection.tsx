import { useRef } from "react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/motion/Reveal";
import { gsap, useGSAP, prefersReducedMotion, EASE_OUT } from "@/lib/gsap";
import { site } from "@/lib/site";

/** Conta de 0 até os anos de experiência quando entra na viewport (uma vez). */
const YearsCounter = () => {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const counter = { value: 0 };
    gsap.to(counter, {
      value: site.yearsOfExperience,
      duration: 1.4,
      ease: EASE_OUT,
      snap: { value: 1 },
      onUpdate: () => (el.textContent = String(counter.value)),
      scrollTrigger: { trigger: el, start: "top 85%", once: true },
    });
  });

  return (
    <div data-reveal className="flex items-baseline gap-4 md:flex-col md:gap-1 md:pr-10 md:border-r border-border">
      <p className="font-display font-bold leading-none text-7xl md:text-8xl">
        <span className="gradient-fire-text">
          +<span ref={ref}>{site.yearsOfExperience}</span>
        </span>
      </p>
      <p className="font-body text-muted-foreground">anos de experiência</p>
    </div>
  );
};

const AboutSection = () => {
  return (
    <section id="sobre" className="py-20 md:py-28 bg-dark-surface">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto">
          <SectionHeading eyebrow="Quem somos" title="Sobre a Fênix" />

          <Reveal className="bg-card border border-border rounded-lg p-8 md:p-12" stagger={0.1}>
            <div className="grid gap-8 md:grid-cols-[auto_1fr] md:items-center mb-6">
              <YearsCounter />
              <div>
                <p data-reveal className="font-body text-lg text-muted-foreground leading-relaxed mb-6">
                  A <strong className="text-foreground">Fênix Borracharia</strong> nasceu da paixão por
                  servir com excelência. Assim como a ave fênix, que renasce das cinzas com força renovada,
                  nós acreditamos em recomeços e na capacidade de superar qualquer desafio.
                </p>
                <p data-reveal className="font-body text-lg text-muted-foreground leading-relaxed">
                  Há mais de {site.yearsOfExperience} anos oferecemos serviços de qualidade para carros, motos
                  e caminhões. Nosso compromisso é com a sua segurança e satisfação, sempre com atendimento
                  rápido e preços justos.
                </p>
              </div>
            </div>
            <div data-reveal className="pt-6 border-t border-border">
              <p className="font-display text-2xl text-center gradient-fire-text font-bold uppercase tracking-wider">
                "Deus é Fiel" — Este é o nosso lema.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
