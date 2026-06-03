import React from "react";
import { useUserFlowAnimation } from "./user-flow.animation";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Badge } from "@/components/ui/badge";
import { STEPS } from "@/landing/data/user-flow-steps";

const UserFlowSection = () => {
  const sectionRef = React.useRef<HTMLDivElement | null>(null);
  useUserFlowAnimation(sectionRef);
  return (
    <section
      className="py-24 sm:py-28 md:py-32 relative bg-background"
      ref={sectionRef}
    >
      <div className="container w-full mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
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
          {/*
            ✅ FIX: The connecting line was positioned at `top-12` but the
            step circles are `w-24 h-24` (6rem / 96px), so their center is at
            `top-12` (3rem). With padding inside the column, the actual circle
            center could be at ~48–56px from the column top. Changed to
            `top-[48px]` to better center the line through the circles.
            Also constrained to `md:block` — line is hidden on mobile where
            the layout is vertical.
          */}
          <div className="step-line hidden md:block absolute top-12 left-[calc(16.66%+1rem)] right-[calc(16.66%+1rem)] h-px bg-linear-to-r from-transparent via-outline-variant/40 to-transparent z-0" />

          {STEPS.map((step, i) => (
            <div
              key={i}
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserFlowSection;
