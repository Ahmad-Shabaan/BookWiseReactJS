import { useGSAP } from "@gsap/react";
import type { SectionAnimationParams } from "@/shared/types/common.types";
import gsap from "@/lib/gsap.config";
import {
  motion,
  prefersReducedMotion,
  START_SCROLL_TRIGGER,
} from "@/lib/utils/motion";

export function useTrendingAnimation({
  sectionRef,
  isLoading,
}: SectionAnimationParams & { isLoading: boolean }) {
  useGSAP(
     () => {
      if (!sectionRef.current) return;
      if (prefersReducedMotion()) return;
      // const gsap: any = await import("@/lib/gsap.config");
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
    { dependencies: [isLoading] },
  );
}
