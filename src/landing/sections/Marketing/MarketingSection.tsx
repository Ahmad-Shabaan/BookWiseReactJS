import { useRef } from "react";
import { useMarketingAnimation } from "./marketing.animations";

const MarketingSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  useMarketingAnimation(sectionRef);
  return (
    <section
      ref={sectionRef}
      className="py-20 sm:py-24 md:py-32 bg-surface-container overflow-hidden"
    >
      <div className="container w-full mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
        <div className="flex flex-col md:flex-row items-center gap-12 sm:gap-16 md:gap-20 lg:gap-24">
          {/* TEXT */}
          <div
            className="section-heading w-full md:w-1/2 space-y-7 sm:space-y-10 text-center md:text-left"
            style={{ willChange: "transform, opacity" }}
          >
            {/*
              ✅ FIX: The original used three separate clamp expressions:
                - Mobile:  clamp(3rem,9vw,4rem)
                - MD:      clamp(3rem,5.2vw,4rem)
                - LG:      clamp(4.5rem,8vw,6rem)

              The MD breakpoint clamped between 3rem and 4rem — almost no
              scaling. On a 768px tablet, 5.2vw ≈ 40px which hits the 3rem
              floor immediately. Result: a static 3rem heading on all tablets.

              Replaced with a single smooth clamp expression that works across
              all breakpoints without breakpoint-specific overrides.
              3rem on 320px → 6rem on 1400px, smooth curve.
            */}
            <h2
              className="tracking-tighter font-black italic leading-[0.88] text-on-surface"
              style={{ fontSize: "clamp(2.8rem, 8vw, 6rem)" }}
            >
              READ <br /> DIFFERENTLY.
            </h2>

            <p className="text-base sm:text-lg md:text-xl text-on-surface-variant max-w-lg mx-auto md:mx-0 leading-relaxed">
              Break free from standard reading habits. Our AI-driven engine maps
              your emotional responses to narrative arcs, delivering a literary
              experience tailored to your soul.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center md:justify-start">
              <button className="bg-on-surface text-background px-8 sm:px-10 py-3.5 sm:py-4 md:py-5 rounded-full font-black text-sm sm:text-base md:text-lg tracking-tight transition-transform hover:scale-105 active:scale-95">
                JOIN THE CLUB
              </button>
              <button className="border border-outline-variant/30 text-on-surface px-8 sm:px-10 py-3.5 sm:py-4 md:py-5 rounded-full font-black text-sm sm:text-base md:text-lg tracking-tight hover:bg-on-surface/5 transition-colors">
                LEARN MORE
              </button>
            </div>
          </div>

          {/* IMAGE */}
          <div className="relative w-full md:w-1/2 mt-4 md:mt-0">
            <div className="absolute -inset-6 bg-linear-to-tr from-primary/20 to-secondary/20 blur-[120px] pointer-events-none" />

            <div
              className="section-image relative bg-surface-container-highest rounded-3xl sm:rounded-4xl p-3 sm:p-4 shadow-soft rotate-2"
              style={{ willChange: "transform, opacity" }}
            >
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDb63i1WU3JXHCiROXaYhUmcHBpt_fxrQy0ooDSjrci5GdTIV610-2t0rRUjYFdgkHDzpQvlOUvn7xR0CcwNQ78TJrLDF9grwMy2Zevz2K3dYYMS2I5feUynXsQ67QN_iLUjkjbM2M62pU4kVmGuM4SVDLTxSPmY54uO-LhjSHtaVJMs1kDjTq7BFr424OSFHo6RHTWwPYqtaU5Icbdxwn-xjcM8pGSmiLeqH_yrFlABwbiRVqZRc-ltUPaDH3w1AhkpWQUOXQKvnE"
                alt="Marketing visual"
                /*
                  ✅ FIX: Replaced fixed `h-105 md:h-140` with responsive
                  `aspect-[4/5]` + `w-full`. Fixed heights caused the image
                  to overflow its container on short/wide viewports (tablet
                  landscape). aspect-ratio maintains proportions across sizes.
                */
                className="rounded-[1.25rem] sm:rounded-[1.5rem] w-full aspect-4/5 object-cover grayscale transition duration-700 hover:grayscale-0"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketingSection;
