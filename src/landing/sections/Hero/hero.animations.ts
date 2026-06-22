import { motion, prefersReducedMotion } from "@/lib/utils/motion";
import { useGSAP } from "@gsap/react";
// import { SplitText } from "gsap/all";

export function useHeroAnimation(
  sectionRef: React.RefObject<HTMLDivElement | null>,
) {
  useGSAP(async () => {
    if (!sectionRef.current) return;
    if (prefersReducedMotion()) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const gsap: any = await import("@/lib/gsap.config");
    // const q = gsap.utils.selector(sectionRef);
    // const split = SplitText.create(q(".heading"), {
    //   type: "chars,words",
    //   ignore: q(".nosplit"),
    // });

    // const tl = gsap.timeline({
    //   defaults: { ease: "power3.out" },
    // });

    // tl.from(q(".badge"), { ...motion.movingUp, clearProps: "transform,opacity" })
    //   .from(split.chars, { ...motion.movingUp , clearProps: "transform,opacity" }, "-=0.3")
    //   .from(q(".nosplit"), { ...motion.movingRight, clearProps: "transform,opacity" }, "-=0.8")
    //   .from(q(".search"), { ...motion.movingUp, clearProps: "transform,opacity" }, "-=0.5");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let split: any;
    let tl: gsap.core.Timeline;

    const run = async () => {
      const { SplitText } = await import("gsap/SplitText");

      const q = gsap.utils.selector(sectionRef);

      split = SplitText.create(q(".heading"), {
        type: "chars,words",
        ignore: q(".nosplit"),
      });
      tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      tl.from(q(".badge"), {
        ...motion.movingUp,
        clearProps: "transform,opacity",
      })
        .from(
          split.chars,
          { ...motion.movingUp, clearProps: "transform,opacity" },
          "-=0.3",
        )
        .from(
          q(".nosplit"),
          { ...motion.movingRight, clearProps: "transform,opacity" },
          "-=0.8",
        )
        .from(
          q(".search"),
          { ...motion.movingUp, clearProps: "transform,opacity" },
          "-=0.5",
        );
    };

    run();

    return () => {
      split.revert();
      tl.kill();
    };
  });
}
