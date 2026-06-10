import React from "react";
import { useUserFlowAnimation } from "./user-flow.animation";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Badge } from "@/components/ui/badge";
import { STEPS } from "@/landing/data/user-flow-steps";

const UserFlowSection = () => {
  const sectionRef = React.useRef<HTMLDivElement>(null);
  useUserFlowAnimation(sectionRef);
  return (
    <div
      className="py-24 sm:py-28 md:py-32 relative bg-background"
      ref={sectionRef}
    >
      <section className=" section-container">
        <div className="flex flex-col items-center">
          <Badge variant="outline" className="mb-2 px-4 py-1">
            Process
          </Badge>
          <SectionTitle
            title="How It Works"
            align="center"
            accentColor="secondary"
          />
        </div>

        <div className="relative flex flex-col md:flex-row justify-between gap-10 sm:gap-12 md:gap-8">
          <div data-animate="step-line" className=" hidden md:block absolute top-12 left-[calc(16.66%+1rem)] right-[calc(16.66%+1rem)] h-px bg-linear-to-r from-transparent via-outline-variant/40 to-transparent z-0" />

          {STEPS.map((step, i) => (
            <article
              key={i}
              data-animate="step-item"
              className="step-item relative z-10 flex flex-col items-center text-center max-w-72 mx-auto group will-change-transform"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full bg-surface-container border border-outline-variant/15 flex items-center justify-center text-2xl sm:text-3xl font-black text-on-surface-variant group-hover:text-primary group-hover:border-primary/50 transition-all duration-300 shadow-soft mb-6 sm:mb-8">
                {step.num}
              </div>
              <h3 className="text-lg sm:text-xl md:text-lg lg:text-2xl font-bold mb-3 sm:mb-4 text-on-surface tracking-tight">
                {step.title}
              </h3>
              <p className="text-on-surface-variant leading-relaxed text-sm sm:text-base md:text-sm lg:text-base">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default UserFlowSection;
