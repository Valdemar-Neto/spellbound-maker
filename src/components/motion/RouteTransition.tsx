import { useRef } from "react";
import { useLocation } from "react-router-dom";
import { gsap, useGSAP, prefersReducedMotion, EASE_IN_OUT } from "@/lib/gsap";

/** Cortina laranja que se recolhe ao trocar de rota. */
const RouteTransition = () => {
  const { pathname } = useLocation();
  const curtain = useRef<HTMLDivElement>(null);
  const first = useRef(true);

  useGSAP(
    () => {
      if (first.current) {
        first.current = false;
        return;
      }
      window.scrollTo(0, 0);
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        curtain.current,
        { scaleY: 1, transformOrigin: "top" },
        { scaleY: 0, duration: 0.7, ease: EASE_IN_OUT },
      );
    },
    { dependencies: [pathname] },
  );

  return (
    <div
      ref={curtain}
      aria-hidden="true"
      className="fixed inset-0 z-[100] bg-fire-orange pointer-events-none"
      style={{ transform: "scaleY(0)" }}
    />
  );
};

export default RouteTransition;
