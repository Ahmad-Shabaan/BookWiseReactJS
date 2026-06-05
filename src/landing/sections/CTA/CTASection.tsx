import { useRef } from "react";
import { useCTAAnimation } from "./cta.animations";

export function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  useCTAAnimation(sectionRef);

  return (
    <div
      className="py-24 sm:py-28 md:py-32 relative bg-background"
      ref={sectionRef}
    >
      <div className="container w-full mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
        <div data-animate="cta-content" className="relative rounded-4xl sm:rounded-[3rem] overflow-hidden bg-surface-container py-16 sm:py-20 md:py-24 px-6 sm:px-10 md:px-8 text-center col-center shadow-soft border border-outline-variant/15 group will-change-transform">
          {/* Ambient glow layers */}
          <div className="absolute inset-0 bg-linear-to-b from-primary/10 to-transparent pointer-events-none group-hover:from-primary/20 transition-colors duration-700" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-primary/20 blur-[150px] rounded-full pointer-events-none" />

          <section className="relative z-10 max-w-3xl flex flex-col items-center">
            <h2
              className="font-black tracking-tighter mb-6 sm:mb-8 leading-tight text-on-surface"
              style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)" }}
            >
              Begin Your <br className="hidden sm:block" />
              <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                Next Chapter
              </span>
            </h2>

            <p className="text-base sm:text-lg md:text-xl text-on-surface-variant mb-8 sm:mb-12 max-w-xl px-2">
              Join a community of readers exploring boundaries they never knew
              they had. Get started for free.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
              <button className="bg-linear-to-r from-primary to-secondary text-white px-8 sm:px-10 py-4 sm:py-5 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg shadow-[0_10px_30px_rgba(163,166,255,0.4)] hover:brightness-110 active:scale-95 transition-all w-full sm:w-auto">
                Create Free Account
              </button>
              <button className="px-8 sm:px-10 py-4 sm:py-5 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg text-on-surface border border-outline-variant/30 hover:bg-surface-container-highest transition-colors w-full sm:w-auto">
                Download App
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
