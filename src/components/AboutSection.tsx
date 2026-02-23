const AboutSection = () => {
  return (
    <section id="sobre" className="py-20 md:py-28 bg-dark-surface">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="font-display text-sm tracking-[0.3em] uppercase text-fire-orange mb-3">
              Quem somos
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold uppercase">
              Sobre a <span className="gradient-fire-text">Fênix</span>
            </h2>
          </div>

          <div className="bg-card border border-border rounded-lg p-8 md:p-12">
            <p className="font-body text-lg text-muted-foreground leading-relaxed mb-6">
              A <strong className="text-foreground">Fênix Borracharia</strong> nasceu da paixão por 
              servir com excelência. Assim como a ave fênix, que renasce das cinzas com força renovada, 
              nós acreditamos em recomeços e na capacidade de superar qualquer desafio.
            </p>
            <p className="font-body text-lg text-muted-foreground leading-relaxed mb-6">
              Com anos de experiência no mercado, oferecemos serviços de qualidade para carros, motos 
              e caminhões. Nosso compromisso é com a sua segurança e satisfação, sempre com atendimento 
              rápido e preços justos.
            </p>
            <div className="pt-6 border-t border-border">
              <p className="font-display text-2xl text-center gradient-fire-text font-bold uppercase tracking-wider">
                "Deus é Fiel" — Este é o nosso lema.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
