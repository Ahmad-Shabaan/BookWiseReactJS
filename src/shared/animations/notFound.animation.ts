import { useGSAP } from "@gsap/react";
import gsap, { prefersReducedMotion } from "@/lib/gsap.config";
import type { SectionAnimationParams } from "../types/common.types";

export function useNotFoundAnimation({
  sectionRef,
  dependencies,
}: SectionAnimationParams) {
  useGSAP(
    () => {
      if (!sectionRef.current) return;
      if (prefersReducedMotion()) return;
      const q = gsap.utils.selector(sectionRef.current);
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(q("[data-animate='hero-illustration']"), { y: 60, opacity: 0, duration: 1 })
        .from(q("[data-animate='hero-title']"), { y: 30, opacity: 0, duration: 0.8 }, "-=0.4")
        .from(q("[data-animate='hero-desc']"), { y: 20, opacity: 0, duration: 0.6 }, "-=0.3")
        .from(
          q("[data-animate='cta-btn']"),
          { y: 20, opacity: 0, duration: 0.5, stagger: 0.1 },
          "-=0.3",
        )
        .from(
          q("[data-animate='librarian-tip']"),
          { x: -30, opacity: 0, duration: 0.6 },
          "-=0.2",
        )
        .to(q("[data-animate='hero-illustration']"), {
          y: -10,
          duration: 3,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });

      return () => {
        tl.kill();
      };
    },
    {  dependencies },
  );
}
