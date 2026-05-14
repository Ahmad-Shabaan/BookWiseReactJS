import {
  motion,
  prefersReducedMotion,
  START_SCROLL_TRIGGER,
} from "@/landing/animations";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap.config";

export function useTrendingAnimation(
  sectionRef: React.RefObject<HTMLDivElement | null>,
) {
  useGSAP(
    () => {
        if(!sectionRef.current) return;
      if (prefersReducedMotion()) return;

      const q = gsap.utils.selector(sectionRef.current);

    //   gsap.set(cards, { x: 30, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: START_SCROLL_TRIGGER,
          once: true,
        },
      });

      tl.from(q(".trending-card"), {
        ...motion.movingLeft,
        stagger: 0.1,
        clearProps: "x,opacity",
      });

      return () => {
        /*
          ✅ FIX: Original cleanup looped over ALL ScrollTriggers and killed
          only those matching `containerRef.current` — but used a `forEach`
          with an external filter, which is fragile if the ref is null.
          Replacing with `tl.kill()` which also kills its associated
          ScrollTrigger when the timeline is destroyed.
        */
        tl.kill();
      };
    },
    { scope: sectionRef },
  );
}
