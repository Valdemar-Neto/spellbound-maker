import { Flame } from "lucide-react";

const navLinks = [
  { href: "#inicio", label: "Início" },
  { href: "#servicos", label: "Serviços" },
  { href: "#sobre", label: "Sobre" },
  { href: "#localizacao", label: "Localização" },
  { href: "#contato", label: "Contato" },
];

const Footer = () => {
  return (
    <footer className="border-t border-border bg-dark-surface">
      <div className="container px-4 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Flame className="w-8 h-8 text-fire-orange" />
            <span className="font-display text-2xl font-bold uppercase gradient-fire-text">
              Fênix
            </span>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-body text-sm text-muted-foreground hover:text-fire-orange transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Copyright */}
          <p className="font-body text-sm text-muted-foreground">
            ✦ Deus é Fiel ✦
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="font-display text-lg text-fire-orange tracking-wider">
            © {new Date().getFullYear()} Lumen Tech
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
