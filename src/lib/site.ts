// Dados do negócio usados em todo o site.
export const site = {
  name: "Fênix Borracharia",
  whatsappNumber: "5598981796941",
  phoneHref: "tel:+5598981796941",
  displayPhone: "(98) 98179-6941",
  address: {
    street: "Av. Castelo Branco, 1901 — Sabbak",
    city: "Santa Inês - MA, CEP 65300-550",
  },
  hours: "Segunda a Sábado: 7h20 às 18h30",
  yearsOfExperience: 8,
  // [longitude, latitude]
  coordinates: [-45.3942, -3.6623] as [number, number],
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=F%C3%AAnix%20Pneus%20Santa%20In%C3%AAs",
  directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=-3.6623,-45.3942",
};

export const whatsappUrl = (text: string) =>
  `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(text)}`;

export const navLinks = [
  { href: "#inicio", label: "Início" },
  { href: "#servicos", label: "Serviços" },
  { href: "#sobre", label: "Sobre" },
  { href: "#localizacao", label: "Localização" },
  { href: "#contato", label: "Contato" },
];
