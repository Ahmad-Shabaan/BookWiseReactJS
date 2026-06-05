import {
  motion,
  prefersReducedMotion,
  START_SCROLL_TRIGGER,
} from "@/landing/animations";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap.config";
import type { SectionAnimationParams } from "@/shared/types/common.types";

export function useTrendingAnimation({ sectionRef ,isLoading}: SectionAnimationParams & {isLoading : boolean}) {
  useGSAP(
    () => {
      if (!sectionRef.current) return;
      if (prefersReducedMotion()) return;

      const q = gsap.utils.selector(sectionRef.current);
      const cards = q("[data-animate='trending-card']");
      if (isLoading) return;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: START_SCROLL_TRIGGER,
          once: true,
        },
      });

      tl.from(cards, {
        ...motion.movingLeft,
        stagger: 0.1,
        clearProps: "x,opacity",
      });

      return () => {
        tl.kill();
      };
    },
    { dependencies:[isLoading]},
  );
}
