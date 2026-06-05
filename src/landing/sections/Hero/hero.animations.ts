import { motion, prefersReducedMotion } from "@/landing/animations";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap.config";
import { SplitText } from "gsap/all";

export function useHeroAnimation(
  sectionRef: React.RefObject<HTMLDivElement | null>,
) {
  useGSAP(
    () => {
      if (!sectionRef.current) return;
      if (prefersReducedMotion()) return;

      const q = gsap.utils.selector(sectionRef);

      const split = SplitText.create(q(".heading"), {
        type: "chars,words",
        ignore: q(".nosplit"),
      });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      tl.from(q(".badge"), { ...motion.movingUp, clearProps: "transform,opacity" })
        .from(split.chars, { ...motion.movingUp , clearProps: "transform,opacity" }, "-=0.3")
        .from(q(".nosplit"), { ...motion.movingRight, clearProps: "transform,opacity" }, "-=0.8")
        .from(q(".search"), { ...motion.movingUp, clearProps: "transform,opacity" }, "-=0.5");

      return () => {
        split.revert();
        tl.kill();
      };
    },
  );
}
