import { useGSAP } from "@gsap/react";
import gsap, { prefersReducedMotion } from "@/lib/gsap.config";
import type React from "react";

type useBooksAnimationProps = {
  sectionRef: React.RefObject<HTMLDivElement | null>;
  dependencies?: unknown[]; // allow passing dependencies to re-run animation on updates (e.g. when books data changes)
};
export function useCardsAnimation({
  sectionRef,
  dependencies,
}: useBooksAnimationProps) {
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      if (!sectionRef.current) return;
      const q = gsap.utils.selector(sectionRef.current);
      gsap.fromTo(
        q("article"),
        { opacity: 0, y: 24, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.4,
          ease: "power2.out",
          stagger: { amount: 0.2, from: "start" },
          clearProps: "transform,scale,opacity",
        },
      );
    },
    { scope: sectionRef, dependencies },
  );
}
