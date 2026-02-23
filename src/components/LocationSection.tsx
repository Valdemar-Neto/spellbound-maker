import { MapPin, Clock, Phone } from "lucide-react";

const LocationSection = () => {
  return (
    <section id="localizacao" className="py-20 md:py-28">
      <div className="container px-4">
        <div className="text-center mb-16">
          <p className="font-display text-sm tracking-[0.3em] uppercase text-fire-orange mb-3">
            Onde estamos
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold uppercase">
            Nossa <span className="gradient-fire-text">Localização</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Map */}
          <div className="rounded-lg overflow-hidden border border-border h-[400px] lg:h-auto">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3981.670616875107!2d-45.394222924296244!3d-3.662288996311721!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x92ca9daa1c13f24f%3A0x3c160b65252c0ef4!2sF%C3%AAnix%20Pneus%20Santa%20In%C3%AAs!5e0!3m2!1spt-BR!2sbr!4v1771873804461!5m2!1spt-BR!2sbr" 
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "400px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização Fênix Pneus Santa Inês"
            />

          </div>

          {/* Info */}
          <div className="flex flex-col gap-6">
            <div className="bg-card border border-border rounded-lg p-8 flex-1">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-lg gradient-fire flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold uppercase text-foreground mb-1">
                    Endereço
                  </h3>
                  <p className="font-body text-muted-foreground">
                    Av. Castelo Branco, 1901 — Sabbak<br />
                    Santa Inês - MA, CEP 65300-550
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-lg gradient-fire flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold uppercase text-foreground mb-1">
                    Horário de Funcionamento
                  </h3>
                  <p className="font-body text-muted-foreground">
                    Segunda a Sábado: 7h30 às 18h30<br />
                    Emergências: 24 horas
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg gradient-fire flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold uppercase text-foreground mb-1">
                    Telefone
                  </h3>
                  <p className="font-body text-muted-foreground">
                    (98) 98470-1635<br />
                    (98) 98470-1635 (WhatsApp)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
