import {
  motion,
  prefersReducedMotion,
  START_SCROLL_TRIGGER,
} from "@/landing/animations";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap.config";

export function useMarketingAnimation(
  sectionRef: React.RefObject<HTMLDivElement | null>,
) {
  useGSAP(
    () => {
      if (!sectionRef.current) return;
      if (prefersReducedMotion()) return;

      const q = gsap.utils.selector(sectionRef);
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: START_SCROLL_TRIGGER,
          once: true,
        },
      });
      tl.from(q(".section-heading > *"), {
        ...motion.movingUpCinematic,
        clearProps: "y,opacity",
      }).from(
        q(".section-image"),
        {
          ...motion.movingLeft,
          rotation: -4,
          scale: 0.96,
          clearProps: "x,rotation,scale,opacity",
        },
        "-=0.5",
      );

      return () => tl.kill();
    },
    { scope: sectionRef },
  );
}
