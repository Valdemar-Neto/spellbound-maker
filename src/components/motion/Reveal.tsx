import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, prefersReducedMotion, EASE_OUT } from "@/lib/gsap";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Intervalo entre filhos marcados com `data-reveal`. */
  stagger?: number;
}

/** Revela uma única vez os filhos `[data-reveal]` quando o bloco entra na viewport. */
const Reveal = ({ children, className, stagger = 0.06 }: RevealProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from("[data-reveal]", {
        opacity: 0,
        y: 24,
        duration: 0.8,
        ease: EASE_OUT,
        stagger,
        scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

export default Reveal;
