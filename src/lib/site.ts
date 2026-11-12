// Dados do negócio usados em todo o site.
export const site = {
  name: "Fênix Borracharia",
  brand: "Fênix",
  tagline: "Pneus e Borracharia",
  motto: "Deus é Fiel",
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
  openingHours: {
    dias: [1, 2, 3, 4, 5, 6],
    abre: 7 * 60 + 20,
    fecha: 18 * 60 + 30,
  },
  // [longitude, latitude]
  coordinates: [-45.3942, -3.6623] as [number, number],
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=F%C3%AAnix%20Pneus%20Santa%20In%C3%AAs",
  directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    "Av. Castelo Branco, 1901, Sabbak, Santa Inês - MA, 65300-550",
  )}`,
};

// Quem atende a Fênix por WhatsApp e telefone. Todo botão de contato deixa a
// pessoa escolher entre os dois (ver components/contato). Flávio vem primeiro.
export const contatos = [
  { id: "flavio", nome: "Flávio Fênix", numero: "5598984701635", telefone: "(98) 98470-1635" },
  { id: "anna", nome: "Anna Luzia Fênix", numero: "5598981796941", telefone: "(98) 98179-6941" },
] as const;

export type Contato = (typeof contatos)[number];

export const whatsappUrl = (text: string, contato: Contato = contatos[0]) =>
  `https://wa.me/${contato.numero}?text=${encodeURIComponent(text)}`;

export const telefoneHref = (contato: Contato) => `tel:+${contato.numero}`;

// Mensagens pré-preenchidas do WhatsApp, uma por intenção.
export const whatsappMessages = {
  geral: "Olá! Vim pelo site da Fênix.",
  medida: (medida: string) => `Olá! Vim pelo site. Vocês têm pneu ${medida}?`,
  seminovos: "Olá! Quero ver fotos dos seminovos.",
  foto: "Olá! Vim pelo site. Não sei a medida do meu pneu, vou mandar uma foto da lateral.",
  empresa: "Olá! Vim pelo site. Quero atendimento da Fênix para a frota da minha empresa.",
};

// Empresas atendidas pela Fênix (B2B). Logos em public/partners.
export const parceiros = [
  { id: "agronor", nome: "Agronor Alimentos", arquivo: "agronor_alimentos_logo.jpeg" },
  { id: "engecom", nome: "Engecom Engenharia", arquivo: "engecomengenharia_logo.jpeg" },
  { id: "sucena", nome: "Sucena Empreendimentos", arquivo: "logo-sucena.png" },
  { id: "lokar", nome: "Lokar", arquivo: "lokar.png" },
  { id: "lucena", nome: "Lucena Infraestrutura", arquivo: "lucena.webp" },
  { id: "madri", nome: "Madri Logística", arquivo: "matrid-logistica.png" },
  { id: "cgb", nome: "CGB", arquivo: "cgb.jpg" },
] as const;

export const navLinks = [
  { href: "#pneus", label: "Pneus" },
  { href: "#servicos", label: "Serviços" },
  { href: "#onde", label: "Como chegar" },
  { href: "#mensagem", label: "Mensagem" },
  { href: "#duvidas", label: "Dúvidas" },
];
