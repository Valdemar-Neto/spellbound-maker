import { FenixMark, WhatsAppIcon } from "@/components/brand";
import { navLinks, site, whatsappMessages, whatsappUrl } from "@/lib/site";

const Navbar = () => (
  <header className="border-b border-border bg-background">
    <div className="mx-auto flex max-w-[1200px] flex-wrap items-center gap-3 px-4 py-3.5 md:gap-6 md:px-6">
      <a href="#inicio" className="flex items-center gap-3 text-foreground">
        <FenixMark className="h-10 w-10 text-fire-orange" role="img" aria-label={`Fênix ${site.tagline}`} />
        <span className="flex flex-col leading-none">
          <span className="font-display text-[28px] font-extrabold tracking-[0.5px]">{site.brand}</span>
          <span className="text-[13px] text-muted-foreground">{site.tagline}</span>
        </span>
      </a>

      <nav aria-label="Seções" className="ml-4 hidden gap-1 md:flex">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="rounded-full px-3 py-2.5 text-[15px] font-medium text-foreground transition-colors duration-150 hover:text-fire-link"
          >
            {link.label}
          </a>
        ))}
      </nav>

      <div className="ml-auto flex items-center gap-3">
        <a href={site.phoneHref} className="hidden text-[15px] font-semibold text-foreground md:inline">
          {site.displayPhone}
        </a>
        <a
          href={whatsappUrl(whatsappMessages.geral)}
          target="_blank"
          rel="noopener noreferrer"
          className="press flex min-h-11 items-center gap-2 rounded-full bg-fire-orange px-[18px] text-[15px] font-bold text-background"
        >
          <WhatsAppIcon className="h-[18px] w-[18px]" />
          WhatsApp
        </a>
      </div>
    </div>
  </header>
);

export default Navbar;
