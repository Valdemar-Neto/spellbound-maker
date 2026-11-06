import { useLayoutEffect, useRef, useState } from "react";
import { Flame, Menu, X } from "lucide-react";
import { ScrollTrigger, scrollToHash } from "@/lib/gsap";
import { navLinks } from "@/lib/site";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState(navLinks[0].href);
  const [indicator, setIndicator] = useState({ x: 0, width: 0 });
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  useLayoutEffect(() => {
    const triggers = [
      ScrollTrigger.create({ start: 50, end: "max", onToggle: (self) => setScrolled(self.isActive) }),
      ...navLinks.map(({ href }) =>
        ScrollTrigger.create({
          trigger: href,
          start: "top center",
          end: "bottom center",
          onToggle: (self) => self.isActive && setActive(href),
        }),
      ),
    ];
    return () => triggers.forEach((t) => t.kill());
  }, []);

  useLayoutEffect(() => {
    const el = linkRefs.current[active];
    if (el) setIndicator({ x: el.offsetLeft, width: el.offsetWidth });
  }, [active]);

  const go = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    scrollToHash(href);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,box-shadow] duration-300",
        scrolled || menuOpen
          ? "bg-background/90 backdrop-blur-md border-b border-border shadow-lg"
          : "bg-transparent border-b border-transparent",
      )}
    >
      <div className="container px-4 flex items-center justify-between h-16 md:h-20">
        <a href="#inicio" onClick={(e) => go(e, "#inicio")} className="flex items-center gap-2">
          <Flame className="w-7 h-7 text-fire-orange" />
          <span className="font-display text-xl font-bold uppercase gradient-fire-text">Fênix Borracharia</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex relative items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              ref={(el) => (linkRefs.current[link.href] = el)}
              href={link.href}
              onClick={(e) => go(e, link.href)}
              aria-current={active === link.href ? "true" : undefined}
              className={cn(
                "font-display text-sm uppercase tracking-wider py-2 transition-colors duration-200",
                active === link.href ? "text-foreground" : "text-muted-foreground hover:text-fire-orange",
              )}
            >
              {link.label}
            </a>
          ))}
          <span
            aria-hidden="true"
            className="absolute bottom-0 left-0 h-0.5 rounded-full gradient-fire transition-[transform,width] duration-300 [transition-timing-function:var(--ease-out)]"
            style={{ width: indicator.width, transform: `translateX(${indicator.x}px)` }}
          />
        </nav>

        <a
          href="#contato"
          onClick={(e) => go(e, "#contato")}
          className="press hidden md:inline-flex px-6 py-2.5 rounded-lg font-display text-sm uppercase tracking-wider gradient-fire text-primary-foreground"
        >
          Orçamento
        </a>

        <button
          className="md:hidden text-foreground"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu: grid-rows anima a altura sem medir o conteúdo */}
      <div
        className={cn(
          "md:hidden grid transition-[grid-template-rows,opacity] duration-300 [transition-timing-function:var(--ease-out)]",
          menuOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0 pointer-events-none",
        )}
      >
        <nav className="overflow-hidden" aria-hidden={!menuOpen}>
          <div className="container px-4 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => go(e, link.href)}
                tabIndex={menuOpen ? undefined : -1}
                className="font-display text-sm uppercase tracking-wider text-muted-foreground hover:text-fire-orange transition-colors py-2"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contato"
              onClick={(e) => go(e, "#contato")}
              tabIndex={menuOpen ? undefined : -1}
              className="press inline-flex justify-center px-6 py-3 rounded-lg font-display text-sm uppercase tracking-wider gradient-fire text-primary-foreground"
            >
              Orçamento
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
