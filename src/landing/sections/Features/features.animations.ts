import { motion, prefersReducedMotion, START_SCROLL_TRIGGER } from "@/landing/animations";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap.config";
import type React from "react";

export function useFeaturesAnimations(
  sectionRef: React.RefObject<HTMLDivElement | null>,
  gridRef: React.RefObject<HTMLDivElement | null>
) {
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const items = gridRef.current?.children;
      if (!items) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: START_SCROLL_TRIGGER,
          once: true,
        },
      });

      tl.from(Array.from(items), {
        ...motion.movingUpCinematic,
        scale: 0.97,
        stagger: { each: 0.12, from: "start" },
        clearProps: "y,scale,opacity",
      });

      return () => tl.kill();
    },
    { scope: sectionRef },
  );
}
