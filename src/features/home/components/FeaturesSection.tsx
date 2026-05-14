import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import {BookOpenIcon} from "lucide-react";

const DATA = [
  {
    title: "Your Literary DNA",
    description:
      "We analyze your reading patterns to build a profile that understands your taste better than you do.",
    tag: "Personalized",
    icon: "psychology",
  },
  {
    title: "Unlimited Library.",
    description: "Access over 2 million titles instantly.",
  },
  {
    title: "Active Community",
    description: "Join 500k+ readers in daily discussions.",
    icon: "group",
  },
  {
    title: "Curated Collections",
    description: "Hand-picked selections for every mood.",
    icon: "collections_bookmark",
  },
];

export function FeaturesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const items = gridRef.current?.children;
      if (!items) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 65%",
          once: true,
        },
      });

      tl.from(items, {
        y: 32,
        opacity: 0,
        scale: 0.97,
        duration: 0.9,
        stagger: {
          each: 0.12,
          from: "start",
        },
        ease: "power3.out",
      });

      return () => tl.kill();
    },
    { scope: containerRef },
  );

  return (
    <section className="py-24" ref={containerRef}>
      <div className="container w-full mx-auto px-6 md:px-12 lg:px-16 ">
        {/* "max-w-[1400px] w-full mx-auto px-6 md:px-12 lg:px-16 */}
        <SectionTitle title="Engineered for Readers" subtitle="Experience" />
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px] md:auto-rows-[400px]"
        >
          {/* Main Large Bento */}
          <div className="bento-item md:col-span-2 bg-surface-container rounded-4xl p-6 sm:p-8 md:p-12 flex flex-col justify-between relative overflow-hidden group shadow-soft">
            <div className="absolute -right-20 -bottom-20 w-72 sm:w-96 h-72 sm:h-96 bg-primary/20 blur-[100px] group-hover:bg-primary/40 transition-all duration-700" />
            <div className="relative z-10 space-y-3 sm:space-y-4">
              <span className="bg-primary/10 text-primary px-3 sm:px-4 py-1 sm:py-1.5 rounded-full label-sm font-bold w-fit block tracking-widest uppercase">
                {DATA[0].tag}
              </span>
              <h3 className="text-[clamp(2.2rem,5vw,3.2rem)] font-black tracking-tighter text-on-surface leading-tight">
                Your Literary <br /> DNA.
              </h3>
              <p className="text-on-surface-variant max-w-sm text-base sm:text-lg">
                {DATA[0].description}
              </p>
            </div>
          </div>

          {/* Secondary Bento */}
          <div className="bento-item bg-linear-to-br from-secondary to-secondary-container rounded-4xl p-6 sm:p-8 md:p-6 lg:p-10 flex flex-col justify-end text-on-secondary relative overflow-hidden group shadow-soft">
            <div className="absolute top-0 right-0 p-4 md:p-6 lg:p-8">
              <BookOpenIcon className="w-8 h-8 sm:w-10 sm:h-10 md:w-8 md:h-8 lg:w-10 lg:h-10 text-secondary-container" />
            </div>

            <h3 className="text-[clamp(1.8rem,3.5vw,2.4rem)] leading-tight md:leading-snug font-black tracking-tighter mb-2 md:mb-3">
              Unlimited Library.
            </h3>

            <p className="text-on-secondary/80 text-base md:text-sm lg:text-base font-medium">
              Access over 2.5m titles.
            </p>
          </div>

          {/* Tertiary Small */}
          <div className="bento-item md:col-span-1 bg-surface-container-low rounded-4xl p-6 sm:p-8 md:p-6 lg:p-10 flex flex-col justify-center items-center text-center space-y-4 sm:space-y-6 shadow-soft border border-surface-container-highest">
            <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full bg-surface-container flex items-center justify-center text-primary-dim shadow-inner text-lg sm:text-xl md:text-lg lg:text-2xl">
              👥
            </div>
            <div>
              <h3 className="text-2xl sm:text-xl md:text-lg lg:text-2xl font-bold md:font-semibold lg:font-bold  tracking-tight text-on-surface">
                Active Community
              </h3>
              <p className="text-on-surface-variant text-base md:text-xs lg:text-lg text-center mt-1.5 sm:mt-2">
                Join 500k+ daily readers
              </p>
            </div>
          </div>

          {/* Quaternary Horizontal */}
          <div className="bento-item md:col-span-2 bg-surface-container-low border border-outline-variant/15 rounded-4xl p-6 sm:p-8 md:p-10 flex flex-col md:flex-row items-center justify-center md:justify-between text-center gap-4 sm:gap-6 group cursor-pointer shadow-soft hover:bg-surface-container transition-colors">
            <div className="space-y-1 sm:space-y-2">
              <h3 className="text-2xl sm:text-2xl md:text-2xl lg:text-3xl font-black tracking-tight text-on-surface">
                Curated Collections
              </h3>
              <p className="text-on-surface-variant text-base sm:text-base md:text-sm lg:text-xl font-medium">
                Hand-picked selections for every mood.
              </p>
            </div>
            <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary transition-colors shrink-0">
              <span className="text-primary group-hover:text-background text-2xl  md:text-2xl font-black transition-colors">
                ↗
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
