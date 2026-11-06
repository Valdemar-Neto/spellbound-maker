import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, useGSAP);

// Curvas fortes (Emil Kowalski): entradas com ease-out, movimento em tela com ease-in-out.
export const EASE_OUT = "expo.out";
export const EASE_IN_OUT = "power4.inOut";

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Rola suavemente até uma âncora, descontando a altura do header fixo. */
export const scrollToHash = (hash: string) => {
  const target = document.querySelector(hash);
  if (!target) return;
  gsap.to(window, {
    duration: prefersReducedMotion() ? 0 : 0.9,
    ease: EASE_IN_OUT,
    scrollTo: { y: target, offsetY: 72 },
  });
};

export { gsap, ScrollTrigger, useGSAP };
