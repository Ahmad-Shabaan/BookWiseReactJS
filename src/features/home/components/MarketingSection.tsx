import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
export function MarketingSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
          once: true,
        },
      });

      tl.from(textRef.current?.children || [], {
        y: 32,
        opacity: 0,
        duration: 0.9,
        stagger: 0.18,
        ease: "power3.out",
      }).from(
        imageRef.current,
        {
          x: 80,
          opacity: 0,
          rotation: -4,
          scale: 0.96,
          duration: 1.1,
          ease: "power3.out",
        },
        "-=0.5",
      );

      return () => tl.kill();
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="py-24 md:py-32 bg-surface-container overflow-hidden container mx-auto px-6 md:px-12 lg:px-16"
    >
      <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24">
        {/* TEXT */}
        <div
          ref={textRef}
          className="md:w-1/2 space-y-10"
          style={{ willChange: "transform, opacity" }}
        >
          <h2 className="text-[clamp(3rem,9vw,4rem)] md:text-[clamp(3rem,5.2vw,4rem)] lg:text-[clamp(4.5rem,8vw,6rem)]  tracking-tight md:tracking-normal lg:tracking-tighter font-black italic  leading-[0.85] text-on-surface wrap-break-word text-balance">
            READ <br /> DIFFERENTLY.
          </h2>

          <p className="text-lg md:text-xl lg:text-2xl text-on-surface-variant max-w-lg leading-relaxed">
            Break free from standard reading habits. Our AI-driven engine maps
            your emotional responses to narrative arcs, delivering a literary
            experience tailored to your soul.
          </p>

          <div className="flex flex-wrap gap-4">
            <button className="bg-on-surface text-background px-8 md:px-10 py-4 md:py-5 rounded-full font-black text-sm md:text-lg tracking-tight transition-transform hover:scale-105 active:scale-95">
              JOIN THE CLUB
            </button>

            <button className="border border-outline-variant/30 text-on-surface px-8 md:px-10 py-4 md:py-5 rounded-full font-black text-sm md:text-lg tracking-tight hover:bg-on-surface/5 transition-colors">
              LEARN MORE
            </button>
          </div>
        </div>

        {/* IMAGE */}
        <div className="relative w-full md:w-1/2 mt-12 md:mt-0">
          <div className="absolute -inset-6 bg-linear-to-tr from-primary/20 to-secondary/20 blur-[120px]" />

          <div
            ref={imageRef}
            className="relative bg-surface-container-highest rounded-4xl p-4 shadow-[0_30px_60px_rgba(0,0,0,0.5)] rotate-2"
            style={{ willChange: "transform, opacity" }}
          >
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDb63i1WU3JXHCiROXaYhUmcHBpt_fxrQy0ooDSjrci5GdTIV610-2t0rRUjYFdgkHDzpQvlOUvn7xR0CcwNQ78TJrLDF9grwMy2Zevz2K3dYYMS2I5feUynXsQ67QN_iLUjkjbM2M62pU4kVmGuM4SVDLTxSPmY54uO-LhjSHtaVJMs1kDjTq7BFr424OSFHo6RHTWwPYqtaU5Icbdxwn-xjcM8pGSmiLeqH_yrFlABwbiRVqZRc-ltUPaDH3w1AhkpWQUOXQKvnE"
              alt="Marketing visually distinct asset"
              className="rounded-[1.5rem] w-full h-105 md:h-140 object-cover grayscale transition duration-700 hover:grayscale-0"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
