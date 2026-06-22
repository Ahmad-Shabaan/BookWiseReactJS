/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion, prefersReducedMotion } from "@/lib/utils/motion";
import { useGSAP } from "@gsap/react";
// import { SplitText } from "gsap/all";
// import gsap from "@/lib/gsap.config";

export function useHeroAnimation(
  sectionRef: React.RefObject<HTMLDivElement | null>,
  imageLoaded: boolean,
) {
  useGSAP(async () => {
    if (!sectionRef.current) return;
    if (!imageLoaded) return;
    if (prefersReducedMotion()) return;
    const gsap: any = await import("@/lib/gsap.config");
    // const q = gsap.utils.selector(sectionRef);
    // const split = SplitText.create(q(".heading"), {
    //   type: "chars,words",
    //   ignore: q(".nosplit"),
    // });

    // const tl = gsap.timeline({
    //   defaults: { ease: "power3.out" },
    // });

    // tl.from(q(".badge"), {
    //   ...motion.movingUp,
    //   clearProps: "transform,opacity",
    // })
    //   .from(
    //     split.chars,
    //     { ...motion.movingUp, clearProps: "transform,opacity" },
    //     "-=0.3",
    //   )
    //   .from(
    //     q(".nosplit"),
    //     { ...motion.movingRight, clearProps: "transform,opacity" },
    //     "-=0.8",
    //   )
    //   .from(
    //     q(".search"),
    //     { ...motion.movingUp, clearProps: "transform,opacity" },
    //     "-=0.5",
    //   );

    let split: any;
    let tl: gsap.core.Timeline | null = null;

    const run = async () => {
      const { SplitText } = await import("gsap/SplitText");
      const q = gsap.utils.selector(sectionRef);
      split = SplitText.create(q(".heading"), {
        type: "chars,words",
        ignore: q(".nosplit"),
      });

      const timeline = gsap.timeline({
        defaults: { ease: "power3.out" },
      });
      tl = timeline;

      timeline
        .from(q(".badge"), {
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
      if (split) split.revert();
      if (tl) tl.kill();
    };
  }, [imageLoaded]);
}
