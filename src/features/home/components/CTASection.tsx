import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";


export function CTASection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".cta-content", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        scale: 0.95,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    },
    { scope: containerRef }
  );

  return (
    <section className="py-32 relative bg-background" ref={containerRef}>
      <div className="container w-full mx-auto px-6 md:px-12 lg:px-16">
        <div className="cta-content relative rounded-[3rem] overflow-hidden bg-surface-container py-24 px-8 text-center flex flex-col items-center justify-center shadow-soft border border-outline-variant/15 group">
          <div className="absolute inset-0 bg-linear-to-b from-primary/10 to-transparent pointer-events-none group-hover:from-primary/20 transition-colors duration-700" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-primary/20 blur-[150px] rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-3xl flex flex-col items-center">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-tight text-on-surface">
              Begin Your <br />
              <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                Next Chapter
              </span>
            </h2>
            <p className="text-xl text-on-surface-variant mb-12 max-w-xl">
              Join a community of readers exploring boundaries they never knew they had. Get started for free.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button className="bg-linear-to-r from-primary to-secondary text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-[0_10px_30px_rgba(163,166,255,0.4)] hover:brightness-110 active:scale-95 transition-all w-full sm:w-auto">
                Create Free Account
              </button>
              <button className="px-10 py-5 rounded-2xl font-bold text-lg text-on-surface border border-outline-variant/30 hover:bg-surface-container-highest transition-colors w-full sm:w-auto">
                 Download App
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
