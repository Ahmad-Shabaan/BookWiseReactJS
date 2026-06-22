import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap.config";
import {  motion, prefersReducedMotion, START_SCROLL_TRIGGER } from "@/lib/utils/motion";

export function useUserFlowAnimation(
  sectionRef: React.RefObject<HTMLDivElement | null>,
) {
  useGSAP(
    () => {
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

      tl.from(q("[data-animate='step-item']"), {
        ...motion.movingUpCinematic,
        clearProps: "transform,opacity",
      }).from(
        q("[data-animate='step-line']"),
        {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1,
          ease: "power3.inOut",
        },
        "-=0.8",
      );

      return () => tl.kill();
    },
  );
}
