import { prefersReducedMotion, START_SCROLL_TRIGGER } from "@/landing/animations";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap.config";
import type React from "react";

export function useFAQAnimations(sectionRef : React.RefObject<HTMLDivElement | null>) {
  useGSAP(
    () => {
      if (!sectionRef.current) return;
      if (prefersReducedMotion()) return;
      const q = gsap.utils.selector(sectionRef.current);
      const items = q("[data-animate='faq-item'] > *");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: START_SCROLL_TRIGGER,
          once: true,
        },
      });

      tl.fromTo(
        items,
        { x: "40px", opacity: 0, scale: 0.97 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 0.9,
          stagger: 0.1,
          ease: "power4.out",
          clearProps: "transform,opacity",
        },
      );

      return () => {
        tl.kill();
      };
    },
  );
}
