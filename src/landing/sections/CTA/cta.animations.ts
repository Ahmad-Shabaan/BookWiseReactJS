import { motion, prefersReducedMotion, START_SCROLL_TRIGGER } from "@/landing/animations";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap.config";
import type React from "react";

export function useCTAAnimation( sectionRef : React .RefObject<HTMLDivElement | null>) {
  useGSAP(
    () => {
      // ✅ FIX: Respect reduced-motion
      if (prefersReducedMotion()) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: START_SCROLL_TRIGGER,
          once: true,
        },
      });

      tl.from(".cta-content", {
        ...motion.movingUpCinematic,
        scale: 0.96,
        // ✅ PERF: clear inline styles after animation to avoid stale transforms
        clearProps: "scale,y,opacity",
      });

      return () => tl.kill();
    },
    { scope: sectionRef },
  );
}
