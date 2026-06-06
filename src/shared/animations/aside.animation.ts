import { useGSAP } from "@gsap/react";
import gsap, { prefersReducedMotion } from "@/lib/gsap.config";
import type { SectionAnimationParams } from "../types/common.types";

export function useAsideAnimation({
  sectionRef,
  dependencies,
}: SectionAnimationParams) {
  useGSAP(
    () => {
      if (!sectionRef.current) return;
      if (prefersReducedMotion()) return;
      const q = gsap.utils.selector(sectionRef.current);
      gsap.fromTo(
        q("section"),
        { opacity: 0, x: -24 },
        {
          opacity: 1,
          x: 0,
          duration: 0.55,
          ease: "power3.out",
          stagger: 0.12,
          clearProps: "transform,opacity",
        },
      );
    },
    {  dependencies: dependencies ?? [] },
  );
}
