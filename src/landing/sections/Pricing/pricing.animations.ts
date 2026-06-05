import {
    motion,
  prefersReducedMotion,
  START_SCROLL_TRIGGER,
} from "@/landing/animations";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap.config";

export const usePricingAnimations = (
  sectionRef: React.RefObject<HTMLDivElement | null>,
) => {
  useGSAP(
    () => {
      if (!sectionRef.current) return;
      if (prefersReducedMotion()) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: START_SCROLL_TRIGGER,
          once: true,
        },
      });

      tl.from("[data-animate='pricing-card']", {
        ...motion.movingUpCinematic,
        stagger: 0.18,
        clearProps: "transform,opacity",
      });

      return () => tl.kill();
    },
  );
};
