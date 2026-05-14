import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      if (!titleRef.current) return;

      const split = new SplitText(titleRef.current, {
        type: "chars,words",
        ignore: "[data-animate='nosplit']",
      });

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReduced) return;

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      tl.from("[data-animate='badge']", {
        y: 20,
        opacity: 0,
        duration: 0.7,
      })
        .from(
          split.chars,
          {
            y: 60,
            opacity: 0,
            stagger: 0.015,
            duration: 0.9,
            ease: "back.out(1.3)",
          },
          "-=0.3",
        )
        .from(
          "[data-animate='nosplit']",
          {
            opacity: 0,
            x: -50,
            duration: 0.6,
          },
          "-=0.8",
        )
        .from(
          "[data-animate='search']",
          {
            y: 30,
            opacity: 0,
            scale: 0.98,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.5",
        );

      return () => {
        split.revert();
        tl.kill();
      };
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="container mx-auto px-6 md:px-12 lg:px-16  relative min-h-[85vh] sm:min-h-[90vh] lg:min-h-screen w-full flex items-center  overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-linear-to-r from-background via-background/80 to-transparent z-10" />
        <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent z-10" />
        <img
          className="w-full h-full object-cover opacity-60"
          alt="Hero background"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYiu3uAf6zcTTjE00Mm84t9fMbttQwSuxE-GAI79geGz0mzhnTBmT5v5oVBCRhuMVMheTovLRiOA9zT7XDBRjpDr3A2_nUDjihGEO-5-3cPcrdvlnXNRqznX_vCylpjByPHZGgm4P3wso3kM7Yx1A1o9iueBWz_XKhpN9k0wTb5IKeyj894Cc110Vg6h1T-gNxuV9fY9WzyXyQxgYx4WiO92XxtJ-9wb1TmiI-qhmt-mFGzlpFfngvWuWaLbpCfz1m3TwyksyYhKs"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 w-full max-w-5xl space-y-6 sm:space-y-8">
        {/* Badge */}
        <div data-animate="badge">
          <p className="text-primary uppercase tracking-normal md:tracking-widest font-normal md:font-semibold">
            Evolution of Reading
          </p>
        </div>

        <h1
          ref={titleRef}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-[5.5rem] font-black tracking-tight leading-[1.1] text-on-background"
        >
          Discover your <br /> 
          <span className="text-gradient inline-block" data-animate="nosplit">
            next favorite
          </span>{" "}
          book
        </h1>

        {/* Search */}
        <div data-animate="search" className="relative w-full max-w-2xl">
          <Search className="absolute z-1 left-4 sm:left-5 top-1/2 -translate-y-1/2 text-on-surface-variant w-5 h-5 pointer-events-none" />
          <Input
            type="text"
            placeholder="Search title, author..."
            className="h-8 sm:h-10 md:h-12 pl-12 sm:pl-14 pr-28 sm:pr-32 rounded-xl sm:rounded-sm text-sm sm:text-base md:text-lg"
          />
          <Button
            size="sm"
            className="
              absolute right-0 top-1/2 -translate-y-1/2
              h-8 sm:h-10 md:h-12
              px-3 sm:px-5 md:px-6
              text-xs md:text-lg
              rounded-xl sm:rounded-sm
              cursor-pointer
              text-on-primary-container
              font-bold
            "
          >
            Find
          </Button>
        </div>
      </div>
    </section>
  );
}
