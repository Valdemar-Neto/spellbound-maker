import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion, EASE_IN_OUT } from "@/lib/gsap";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  align?: "center" | "left";
}

const SectionHeading = ({ eyebrow, title, align = "center" }: SectionHeadingProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from(".heading-line", {
        clipPath: "inset(0 0 100% 0)",
        yPercent: 30,
        duration: 0.9,
        ease: EASE_IN_OUT,
        stagger: 0.08,
        scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={align === "center" ? "text-center mb-16" : "mb-12"}>
      <p className="heading-line font-body text-sm font-medium text-fire-orange mb-3">{eyebrow}</p>
      <h2 className="heading-line font-display text-4xl md:text-6xl font-bold uppercase leading-[0.95] text-balance">
        {title}
      </h2>
    </div>
  );
};

export default SectionHeading;
