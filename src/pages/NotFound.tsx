import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { FenixMark } from "@/components/brand";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <main className="flex min-h-[100dvh] items-center justify-center bg-background px-4">
      <div className="flex flex-col items-start gap-6">
        <FenixMark className="h-12 w-12 text-fire-orange" aria-hidden="true" />
        <h1 className="m-0 font-display text-[clamp(52px,8vw,96px)] font-extrabold leading-[0.9]">
          Essa página não existe.
        </h1>
        <p className="m-0 text-lg text-ink-soft">O endereço pode ter mudado. A borracharia continua no mesmo lugar.</p>
        <Link
          to="/"
          className="press inline-flex min-h-14 items-center rounded-full bg-fire-orange px-[26px] font-bold text-background"
        >
          Voltar para o início
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
