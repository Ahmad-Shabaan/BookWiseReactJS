import { useGSAP } from "@gsap/react";
import gsap, { prefersReducedMotion } from "@/lib/gsap.config";
import { SplitText } from "gsap/all";

import type React from "react";

type AnimationProps = {
  sectionRef: React.RefObject<HTMLDivElement | null>;
  dependencies?: unknown[]; // allow passing dependencies to re-run animation on updates (e.g. when books data changes)
};
export function useSignupFormAnimation({
  sectionRef,
  dependencies,
}: AnimationProps) {
  useGSAP(
    () => {
      if (!sectionRef.current) return;
      if (prefersReducedMotion()) return;
      const q = gsap.utils.selector(sectionRef.current);

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });
      const titleSplit = SplitText.create(q('[data-animate="header"]'), {
        type: "words",
        mask: "lines",
      });

      tl.from(titleSplit.words, {
        y: -120,
        opacity: 0,
        rotation: "random(-90, 90)",
        duration: 0.8,
        ease: "back.out(1.4)",
        stagger: 0.12,
        clearProps: "transform,opacity",
      });

      const descSplit = SplitText.create(q('[data-animate="paragraph"]'), {
        type: "words",
        mask: "lines",
      });

      tl.from(
        descSplit.words,
        {
          y: -60,
          opacity: 0,
          rotation: "random(-25, 25)",
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.04,
          clearProps: "transform,opacity",
        },
        "-=0.55",
      );

      tl.fromTo(
        q("[data-animate='form'] > *"),
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: "power2.out",
          stagger: 0.08,
          clearProps: "transform,opacity",
        },
        "-=0.45",
      );

      tl.fromTo(
        q("[data-animate='image']"),
        { opacity: 0, x: 60 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: "power2.out",
          clearProps: "transform,opacity",
        },
        "-=0.6",
      );
      return () => {
        titleSplit.revert();
        descSplit.revert();
        tl.kill();
      };
    },
    { dependencies },
  );
}

export function useLoginFormAnimation({
  sectionRef,
}: AnimationProps) {
  useGSAP(
    () => {
      if (!sectionRef.current) return;
      if (prefersReducedMotion()) return;
      const q = gsap.utils.selector(sectionRef.current);
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        q("[data-animate='orb']"),
        { opacity: 0, scale: 0.6 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.12,
          clearProps: "transform,opacity",
        },
      )
        .fromTo(
          q("[data-animate='brand']"),
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            clearProps: "transform,opacity",
          },
          "-=0.55",
        )
        .fromTo(
          q("[data-animate='header'] > *"),
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            clearProps: "transform,opacity",
          },
          "-=0.4",
        )
        .fromTo(
          q("[data-animate='form'] > *"),
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.08,
            clearProps: "transform,opacity",
          },
          "-=0.45",
        );
      return () => {
        tl.kill();
      };
    },
  );
}
