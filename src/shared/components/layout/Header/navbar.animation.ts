import { useGSAP } from "@gsap/react";
import gsap, { prefersReducedMotion } from "@/lib/gsap.config";
import type React from "react";
import type { SectionAnimationParams } from "@/shared/types/common.types";

export function useNavAnimation({ sectionRef }: SectionAnimationParams) {
  useGSAP(
    () => {
      if (!sectionRef.current) return;
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        sectionRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.1 },
      );
    },
  );
}

type useNavbarAnimationParams = {
  sectionRef: React.RefObject<HTMLElement | null>;
  active: boolean;
};
export function useMobileMenuAnimation({
  sectionRef,
  active,
}: useNavbarAnimationParams) {
  useGSAP(
    () => {
      if (!sectionRef.current) return;
      if (prefersReducedMotion()) return;
      if(active === false)
        return;
      const q = gsap.utils.selector(sectionRef.current);
      const navLink = q("[data-animate='nav-link']");
      const menu = q("[data-animate='mobile-menu']");
      // kill previous animations to prevent overlap
      gsap.killTweensOf([menu, navLink]);
      const matchMedia = gsap.matchMedia();

      const tl = gsap.timeline({
        defaults: { overwrite: "auto" },
      });

      if (active) {
        // OPEN STATE
        tl.set(navLink, {
          opacity: 0,
          y: 20,
          scale: 0.97,
        });
        matchMedia.add("(max-width: 639px)", () => {
          tl.fromTo(
            menu,
            { y: "-100%" },
            { y: "49px", duration: 0.6, ease: "expo.inOut" },
          ).to(navLink, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.4,
            ease: "power2.out",
            stagger: { amount: 0.25, from: "start" },
          });
        });
        matchMedia.add("(min-width: 640px)", () => {
          tl.fromTo(
            menu,
            { y: "-100%" },
            { y: "57px", duration: 0.6, ease: "expo.inOut" },
          ).to(navLink, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.4,
            ease: "power2.out",
            stagger: { amount: 0.25, from: "start" },
          });
        });
      } else {
        // CLOSE STATE (important!)
        tl.to(navLink, {
          opacity: 0,
          y: 20,
          scale: 0.97,
          duration: 0.2,
          stagger: 0.05,
        }).to(menu, {
          y: "-100%",
          duration: 0.8,
          ease: "expo.inOut",
        });
      }

      return () => {
        tl.kill();
        gsap.killTweensOf([menu, navLink]);
      };
      //   gsap.set(navLink, { opacity: 0, x: "-100%", scale: 0.97 });
      //   const t1 = gsap.timeline();
      //   t1.fromTo(
      //     menu,
      //     { y: "-100%" },
      //     { y: active ? "20%" : "-100%", duration: 0.9, ease: "expo.inOut" },
      //   ).to(navLink, {
      //     opacity: 1,
      //     x: "0%",
      //     scale: 1,
      //     duration: 0.4,
      //     ease: "power2.out",
      //     stagger: { amount: 0.25, from: "start" },
      //     clearProps: "transform", // don't leave inline transform after animation
      //   });
      //   return () => t1.kill();
    },
    {  dependencies: [active] },
  );
}
