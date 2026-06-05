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
      if (prefersReducedMotion()) return;
      const q = gsap.utils.selector(sectionRef.current);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: START_SCROLL_TRIGGER,
          once: true,
        },
      });
      tl.from(q("[data-animate='author-card']"), {
        scale: 0.85,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "back.out(1.2)",
        clearProps: "transform,opacity",
      });

      return () => tl.kill();
    },
  );
}
