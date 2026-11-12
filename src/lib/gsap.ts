import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Curvas fortes (Emil Kowalski): entradas com ease-out, movimento em tela com ease-in-out.
export const EASE_OUT = "expo.out";
export const EASE_IN_OUT = "power4.inOut";

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export { gsap, ScrollTrigger, useGSAP };
