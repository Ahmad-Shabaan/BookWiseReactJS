import { motion, prefersReducedMotion, START_SCROLL_TRIGGER } from "@/landing/animations";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap.config";

export function useTestimonialsAnimation(
  sectionRef: React.RefObject<HTMLDivElement | null>,
) {
  useGSAP(
    () => {
      if (!sectionRef.current) return;
      // ✅ FIX: Added missing reduced-motion guard
      if (prefersReducedMotion()) return;
      const q = gsap.utils.selector(sectionRef.current);
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: START_SCROLL_TRIGGER,
          // ✅ FIX: `once: true` — prevents animation replay on scroll-up
          once: true,
        },
      });

      tl.from(q(".testimonial-card"), {
        ...motion.movingUpCinematic,
        clearProps: "y,opacity",
      });

      return () => tl.kill();
    },
    { scope: sectionRef },
  );
}
