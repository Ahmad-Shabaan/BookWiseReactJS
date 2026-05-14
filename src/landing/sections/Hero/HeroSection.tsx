import { useRef } from "react";
// import { useHeroAnimation } from "./hero.animations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useHeroAnimation } from "./hero.animations";

export function HeroSection() {
  // 1️Section root (used as GSAP scope)
  const sectionRef = useRef<HTMLDivElement>(null);

  //  Animation hook (ALL GSAP is isolated)
  useHeroAnimation(sectionRef);

  return (
    <section
      ref={sectionRef}
      className="relative w-full flex items-center overflow-hidden min-h-[85vh] sm:min-h-[90vh] lg:min-h-screen"
    >
      <div className="container w-full  mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-linear-to-r from-background via-background/80 to-transparent z-10" />
          <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent z-10" />
          <img
            className="w-full h-full object-cover opacity-60"
            alt="Hero background"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYiu3uAf6zcTTjE00Mm84t9fMbttQwSuxE-GAI79geGz0mzhnTBmT5v5oVBCRhuMVMheTovLRiOA9zT7XDBRjpDr3A2_nUDjihGEO-5-3cPcrdvlnXNRqznX_vCylpjByPHZGgm4P3wso3kM7Yx1A1o9iueBWz_XKhpN9k0wTb5IKeyj894Cc110Vg6h1T-gNxuV9fY9WzyXyQxgYx4WiO92XxtJ-9wb1TmiI-qhmt-mFGzlpFfngvWuWaLbpCfz1m3TwyksyYhKs"
            // ✅ PERF: Hero image is LCP candidate — eager-load it explicitly
            loading="eager"
            fetchPriority="high"
          />
        </div>

        {/* Content */}
        <div className="relative z-20 w-full max-w-5xl space-y-5 sm:space-y-6 md:space-y-8 py-24 sm:py-28">
          {/* Badge */}
          <div>
            <p className="badge text-primary uppercase tracking-normal md:tracking-widest font-normal md:font-semibold text-sm sm:text-base">
              Evolution of Reading
            </p>
          </div>

          {/*
          ✅ FIX: Replaced the hard step from `text-3xl sm:text-5xl md:text-6xl
          lg:text-[5.5rem]` with a fluid `clamp()`. On 320px devices, `text-3xl`
          (1.875rem) is fine but jumps sharply to `text-5xl` (3rem) at 640px.
          With clamp we get a smooth scale: ~1.9rem at 320px → 5.5rem at 1280px.
          Eliminates the jarring reflow at the sm breakpoint.
        */}
          <h1
            className="heading font-black tracking-tight leading-[1.05] text-on-background"
            style={{ fontSize: "clamp(1.9rem, 6.5vw, 5.5rem)" }}
          >
            Discover your <br />
            <span className="nosplit text-gradient inline-block">
              next favorite
            </span>{" "}
            book
          </h1>

          {/* Search */}
          <div className="search relative w-full max-w-lg sm:max-w-xl md:max-w-2xl">
            {/*
            ✅ FIX: Original used `z-1` which is not a standard Tailwind utility
            (z-index scale: 0, 10, 20, 30, 40, 50). Changed to `z-[1]` (arbitrary
            value) to ensure the icon renders above the Input's background layer.
          */}
            <Search className="absolute z-1 left-4 sm:left-5 top-1/2 -translate-y-1/2 text-on-surface-variant w-4 h-4 sm:w-5 sm:h-5 pointer-events-none" />

            {/*
            ✅ FIX: Original `pr-28 sm:pr-32` right padding on a full-width
            input caused visible text-to-button overlap on 320px screens.
            Reduced to `pr-24` on mobile (the Find button is narrower there too).
          */}
            <Input
              type="text"
              placeholder="Search title, author..."
              className="h-10 sm:h-11 md:h-12 pl-10 sm:pl-14 pr-24 sm:pr-28 md:pr-32 rounded-xl text-sm sm:text-base md:text-lg"
            />
            <Button
              size="sm"
              className="
              absolute right-0 top-1/2 -translate-y-1/2
              h-10 sm:h-11 md:h-12
              px-4 sm:px-5 md:px-6
              text-xs sm:text-sm md:text-base
              rounded-xl
              cursor-pointer
              text-on-primary-container
              font-bold
            "
            >
              Find
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
