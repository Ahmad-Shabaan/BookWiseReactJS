import { TESTIMONIALS } from "@/landing/data/testimonials";
import { useRef } from "react";
import { useTestimonialsAnimation } from "./testimonials.animations";

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  useTestimonialsAnimation(sectionRef);

  return (
    <div className="py-24 sm:py-28 md:py-32 bg-surface" ref={sectionRef}>
      <div className="container w-full mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8 mt-12 sm:mt-16">
          {TESTIMONIALS.map((t, i) => (
            <article
              key={i}
              data-animate="testimonial-card"
              className=" bg-surface-container-low p-7 sm:p-8 md:p-10 rounded-3xl sm:rounded-4xl flex flex-col justify-between border border-outline-variant/15 group hover:border-primary/30 transition-colors shadow-soft relative overflow-hidden will-change-transform"
            >
              <div
                className="absolute -right-4 -top-4 text-[80px] sm:text-[100px] text-surface-container-highest font-serif leading-none italic pointer-events-none select-none group-hover:text-primary/10 transition-colors"
                aria-hidden="true"
              >
                "
              </div>

              <p className="text-on-surface-variant text-sm sm:text-base md:text-lg leading-relaxed mb-7 sm:mb-8 relative z-10">
                "{t.quote}"
              </p>

              <div className="mt-auto relative z-10">
                <p className="font-bold text-on-surface text-sm sm:text-base">
                  {t.author}
                </p>
                <p className="label-sm text-primary uppercase tracking-widest mt-1 text-xs">
                  {t.role}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
