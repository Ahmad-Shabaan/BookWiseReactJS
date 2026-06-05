import { useRef } from "react";
import { useMarketingAnimation } from "./marketing.animations";

const MarketingSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  useMarketingAnimation(sectionRef);
  return (
    <div
      ref={sectionRef}
      className="py-20 sm:py-24 md:py-32 bg-surface-container overflow-hidden"
    >
      <div className="container w-full mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
        <div className="flex flex-col md:flex-row items-center gap-12 sm:gap-16 md:gap-20 lg:gap-24">
          {/* TEXT */}
          <section
            data-animate="section-marketing"
            className=" w-full md:w-1/2 space-y-7 sm:space-y-10 text-center md:text-left"
            style={{ willChange: "transform, opacity" }}
          >
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
          </section>

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
                className="rounded-[1.25rem] sm:rounded-3xl w-full aspect-4/5 object-cover grayscale transition duration-700 hover:grayscale-0"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketingSection;
