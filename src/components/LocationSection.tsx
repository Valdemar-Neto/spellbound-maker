import { MapPin, Clock, Phone, Navigation } from "lucide-react";
import DotMap from "@/components/map/DotMap";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/motion/Reveal";
import { site } from "@/lib/site";

const details = [
  { icon: MapPin, title: "Endereço", lines: [site.address.street, site.address.city] },
  { icon: Clock, title: "Horário de funcionamento", lines: [site.hours] },
  { icon: Phone, title: "Telefone", lines: [`${site.displayPhone} (ligação e WhatsApp)`] },
];

const LocationSection = () => {
  return (
    <section id="localizacao" className="py-20 md:py-28 overflow-hidden">
      <div className="container px-4">
        <SectionHeading eyebrow="Onde estamos" title="Nossa localização" />

        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-10 items-center">
          <DotMap className="w-full aspect-square max-h-[640px]" />

          <Reveal className="flex flex-col gap-8">
            {details.map((item) => (
              <div key={item.title} data-reveal className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg gradient-fire flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold uppercase text-foreground mb-1">{item.title}</h3>
                  {item.lines.map((line) => (
                    <p key={line} className="font-body text-muted-foreground">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ))}

            <div data-reveal className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={site.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="press inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-display uppercase tracking-wider gradient-fire text-primary-foreground"
              >
                <Navigation className="w-4 h-4" />
                Traçar rota
              </a>
              <a
                href={site.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="press inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-display uppercase tracking-wider border border-border text-foreground hover:border-primary transition-colors duration-200"
              >
                Abrir no Google Maps
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
