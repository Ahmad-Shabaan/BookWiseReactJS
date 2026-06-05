import {
  motion,
  prefersReducedMotion,
  START_SCROLL_TRIGGER,
} from "@/landing/animations";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap.config";
import type React from "react";

export function useCTAAnimation(
  sectionRef: React.RefObject<HTMLDivElement | null>,
) {
  useGSAP(() => {
    if (!sectionRef.current) return;
    if (prefersReducedMotion()) return;
    const q = gsap.utils.selector(sectionRef.current);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: START_SCROLL_TRIGGER,
        once: true,
      },
    });

    tl.from(q("[data-animate='cta-content']"), {
      ...motion.movingUpCinematic,
      scale: 0.96,
      clearProps: "scale,y,opacity",
    });

    return () => tl.kill();
  });
}
