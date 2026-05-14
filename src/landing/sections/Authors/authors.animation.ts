import {
  prefersReducedMotion,
  START_SCROLL_TRIGGER,
} from "@/landing/animations";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap.config";

export function useAuthorsAnimation(
  sectionRef: React.RefObject<HTMLDivElement | null>,
) {
  useGSAP(
    () => {
      if (!sectionRef.current) return;
      // ✅ FIX: Guard against reduced-motion preference
      if (prefersReducedMotion()) return;
      const q = gsap.utils.selector(sectionRef.current);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: START_SCROLL_TRIGGER,
          // ✅ FIX: `once: true` instead of toggleActions — prevents re-running
          // on every scroll pass and avoids the animation "replaying" when
          // the user scrolls back up.
          once: true,
        },
      });

      tl.from(q(".author-card"), {
        scale: 0.85,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "back.out(1.2)",
        // ✅ PERF: clearProps removes inline `transform` after animation
        // completes, eliminating a stacking context on each card which
        // could interfere with hover transitions.
        clearProps: "scale,opacity",
      });

      return () => tl.kill();
    },
    { scope: sectionRef },
  );
}
