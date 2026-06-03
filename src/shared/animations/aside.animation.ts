import { useGSAP } from "@gsap/react";
import gsap, { prefersReducedMotion } from "@/lib/gsap.config";
import type React from "react";

type useAsideAnimationProps = {
  sectionRef: React.RefObject<HTMLDivElement | null>;
  dependencies?: unknown[]; // allow passing dependencies to re-run animation on updates (e.g. when books data changes)
};
export function useAsideAnimation({
  sectionRef,
  dependencies,
}: useAsideAnimationProps) {
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      if (!sectionRef.current) return;
      const q = gsap.utils.selector(sectionRef.current);
      gsap.fromTo(
        q("section"),
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.45,
          ease: "power2.out",
          stagger: 0.1,
          clearProps: "transform,opacity",
        },
      );
    },
    { scope: sectionRef, dependencies: dependencies ?? [] },
  );
}
