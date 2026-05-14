import { SectionTitle } from "@/components/ui/SectionTitle";
import { BookOpenIcon } from "lucide-react";
import { useRef } from "react";
import { useFeaturesAnimations } from "./features.animations";

const FeaturesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  useFeaturesAnimations(sectionRef, gridRef);
  return (
    <section className="py-16 sm:py-20 md:py-24" ref={sectionRef}>
      <div className="container w-full mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
        <SectionTitle title="Engineered for Readers" subtitle="Experience" />

        <div
          ref={gridRef}
          className="
            grid grid-cols-1 md:grid-cols-3
            gap-4 sm:gap-5 md:gap-6
            mt-8 sm:mt-10 md:mt-12
    
          "
        >
          {/* ── Main Large Bento ─────────────────────────────────────────── */}
          <div
            className="
            bento-item md:col-span-2
            bg-surface-container rounded-3xl sm:rounded-4xl
            p-6 sm:p-8 md:p-10 lg:p-12
            flex flex-col justify-between
            relative overflow-hidden group shadow-soft
            min-h-70 sm:min-h-80 md:min-h-95
            will-change-transform
          "
          >
            <div className="absolute -right-20 -bottom-20 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-primary/20 blur-[100px] group-hover:bg-primary/40 transition-all duration-700 pointer-events-none" />
            <div className="relative z-10 space-y-3 sm:space-y-4">
              <span className="bg-primary/10 text-primary px-3 sm:px-4 py-1 sm:py-1.5 rounded-full label-sm font-bold w-fit block tracking-widest uppercase text-xs">
                Personalized
              </span>
              {/*
                ✅ FIX: Replaced `text-[clamp(2.2rem,5vw,3.2rem)]` with a
                slightly tighter lower bound. On 320px phones 2.2rem (35px) is
                very large for this card — `clamp(1.8rem,5vw,3.2rem)` starts
                smaller and still scales up beautifully on wider screens.
              */}
              <h3
                className="font-black tracking-tighter text-on-surface leading-tight"
                style={{ fontSize: "clamp(1.8rem, 5vw, 3.2rem)" }}
              >
                Your Literary <br /> DNA.
              </h3>
              <p className="text-on-surface-variant max-w-sm text-sm sm:text-base md:text-lg leading-relaxed">
                We analyze your reading patterns to build a profile that
                understands your taste better than you do.
              </p>
            </div>
          </div>

          {/* ── Secondary Bento ──────────────────────────────────────────── */}
          <div
            className="
            bento-item
            bg-linear-to-br from-secondary to-secondary-container
            rounded-3xl sm:rounded-4xl
            p-6 sm:p-8 md:p-6 lg:p-10
            flex flex-col justify-end
            text-on-secondary relative overflow-hidden group shadow-soft
            min-h-60 sm:min-h-70 md:min-h-95
            will-change-transform
          "
          >
            <div className="absolute top-0 right-0 p-4 md:p-5 lg:p-8">
              <BookOpenIcon className="w-8 h-8 lg:w-10 lg:h-10 text-secondary-container" />
            </div>
            <h3
              className="leading-tight font-black tracking-tighter mb-2 md:mb-3"
              style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)" }}
            >
              Unlimited Library.
            </h3>
            <p className="text-on-secondary/80 text-sm md:text-base font-medium">
              Access over 2.5m titles.
            </p>
          </div>

          {/* ── Tertiary Small ───────────────────────────────────────────── */}
          <div
            className="
            bento-item md:col-span-1
            bg-surface-container-low rounded-3xl sm:rounded-4xl
            p-6 sm:p-8 md:p-6 lg:p-10
            flex flex-col justify-center items-center text-center
            space-y-4 sm:space-y-6 shadow-soft
            border border-surface-container-highest
            min-h-50 sm:min-h-60
            will-change-transform
          "
          >
            {/*
              ✅ FIX: Removed the cascading size classes on the emoji wrapper
              (w-16 h-16 sm:w-18 sm:h-18 md:w-16 md:h-16 lg:w-20 lg:h-20)
              which created a "shrink at md, grow at lg" size bounce on tablet.
              Simplified to a smooth two-step scale.
            */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-surface-container flex items-center justify-center text-primary-dim shadow-inner text-2xl">
              👥
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-on-surface">
                Active Community
              </h3>
              <p className="text-on-surface-variant text-sm sm:text-base text-center mt-1.5 sm:mt-2">
                Join 500k+ daily readers
              </p>
            </div>
          </div>

          {/* ── Quaternary Horizontal ────────────────────────────────────── */}
          <div
            className="
            bento-item md:col-span-2
            bg-surface-container-low border border-outline-variant/15
            rounded-3xl sm:rounded-4xl
            p-6 sm:p-8 md:p-8 lg:p-10
            flex flex-col sm:flex-row items-center justify-center sm:justify-between
            text-center sm:text-left gap-4 sm:gap-6
            group cursor-pointer shadow-soft
            hover:bg-surface-container transition-colors
            min-h-40 sm:min-h-50
            will-change-transform
          "
          >
            <div className="space-y-1 sm:space-y-2">
              <h3 className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-black tracking-tight text-on-surface">
                Curated Collections
              </h3>
              <p className="text-on-surface-variant text-sm sm:text-base lg:text-lg font-medium">
                Hand-picked selections for every mood.
              </p>
            </div>
            <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary transition-colors shrink-0">
              <span className="text-primary group-hover:text-background text-xl sm:text-2xl font-black transition-colors">
                ↗
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
