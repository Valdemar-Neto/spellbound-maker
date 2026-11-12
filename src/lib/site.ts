// Dados do negócio usados em todo o site.
export const site = {
  name: "Fênix Borracharia",
  brand: "Fênix",
  tagline: "Pneus e Borracharia",
  motto: "Deus é Fiel",
  whatsappNumber: "5598981796941",
  phoneHref: "tel:+5598981796941",
  displayPhone: "(98) 98179-6941",
  address: {
    street: "Av. Castelo Branco, 1901",
    district: "Sabbak",
    city: "Santa Inês-MA",
    cep: "65300-550",
  },
  hours: "Segunda a sábado, 7h20 às 18h30",
  // Atendimento fora da loja (delivery) é cobrado à parte; o valor é combinado no contato.
  deliveryFee: "O delivery tem taxa de serviço.",
  // Mesmo horário em dados: dias (0 = domingo) e minutos desde 0h, hora local (UTC-3).
  openingHours: { dias: [1, 2, 3, 4, 5, 6], abre: 7 * 60 + 20, fecha: 18 * 60 + 30 },
  // [longitude, latitude]
  coordinates: [-45.3942, -3.6623] as [number, number],
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=F%C3%AAnix%20Pneus%20Santa%20In%C3%AAs",
  directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    "Av. Castelo Branco, 1901, Sabbak, Santa Inês - MA, 65300-550",
  )}`,
};

export const whatsappUrl = (text: string) =>
  `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(text)}`;

// Mensagens pré-preenchidas do WhatsApp, uma por intenção.
export const whatsappMessages = {
  geral: "Olá! Vim pelo site da Fênix.",
  medida: (medida: string) => `Olá! Vim pelo site. Vocês têm pneu ${medida}?`,
  seminovos: "Olá! Quero ver fotos dos seminovos.",
  foto: "Olá! Vim pelo site. Não sei a medida do meu pneu, vou mandar uma foto da lateral.",
};

export const navLinks = [
  { href: "#pneus", label: "Pneus" },
  { href: "#servicos", label: "Serviços" },
  { href: "#onde", label: "Como chegar" },
  { href: "#duvidas", label: "Dúvidas" },
];
