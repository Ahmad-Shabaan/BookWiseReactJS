import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap.config";

import type React from "react";
import { motion, prefersReducedMotion, START_SCROLL_TRIGGER } from "@/lib/utils/motion";

export function useFeaturesAnimations(
  sectionRef: React.RefObject<HTMLDivElement | null>,
) {
  useGSAP(
    () => {
      if (!sectionRef.current) return;
      if (prefersReducedMotion()) return;
      const q = gsap.utils.selector(sectionRef.current);

      const items = q("[data-animate='features'] > *");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: START_SCROLL_TRIGGER,
          once: true,
        },
      });

      tl.from(items, {
        ...motion.movingUpCinematic,
        scale: 0.97,
        stagger: { each: 0.12, from: "start" },
        clearProps: "transform,opacity",
      });

      return () => tl.kill();
    },
  );
}
