import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Flame } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="text-center">
        <Flame className="mx-auto mb-6 h-12 w-12 text-fire-orange" />
        <h1 className="mb-4 font-display text-7xl font-bold uppercase gradient-fire-text">404</h1>
        <p className="mb-8 font-body text-lg text-muted-foreground">Esta página não existe.</p>
        <Link
          to="/"
          className="press inline-flex rounded-lg px-6 py-3 font-display uppercase tracking-wider gradient-fire text-primary-foreground"
        >
          Voltar para o início
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
