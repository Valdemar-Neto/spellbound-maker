import { site } from "@/lib/site";

const Footer = () => (
  <footer className="border-t border-border">
    <div className="mx-auto flex max-w-[1200px] flex-wrap justify-between gap-6 px-6 pb-24 pt-10 text-[15px] text-muted-foreground">
      <div className="flex flex-col gap-1.5">
        <span className="font-display text-[30px] font-extrabold text-foreground">{site.motto}</span>
        <span>
          {site.brand} {site.tagline}
        </span>
        <span>
          {site.address.street}, {site.address.district}, {site.address.city}, CEP {site.address.cep}
        </span>
      </div>
      <div className="flex flex-col gap-1.5">
        <a href={site.phoneHref} className="link">
          {site.displayPhone}
        </a>
        <span>{site.hours}</span>
        <span>Site por Lumen Tech</span>
      </div>
    </div>
  </footer>
);

export default Footer;
