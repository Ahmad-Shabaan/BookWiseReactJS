import { useRef } from "react";
import { SectionTitle } from "@/components/ui/SectionTitle";

import { FAQS } from "@/landing/data/faqs";
import { useFAQAnimations } from "./faq.animations";

const FAQSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  useFAQAnimations(sectionRef);
  return (
    <div
      ref={sectionRef}
      className="py-24 sm:py-28 md:py-32 bg-surface-container-low"
    >
      <section className="container w-full mx-auto px-4 sm:px-6 md:px-12 lg:px-16 section-title-center">
        <SectionTitle
          title="Frequently Asked Questions"
          align="center"
          accentColor="secondary"
        />

        <div className="space-y-4 sm:space-y-6 mt-12 sm:mt-16">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              data-animate="faq-item"
              className="p-6 sm:p-8 rounded-[1.25rem] sm:rounded-3xl bg-surface border border-outline-variant/15 hover:border-primary/30 transition-colors shadow-soft will-change-transform"
            >
              <h3 className="text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 text-on-surface leading-snug">
                {faq.q}
              </h3>
              <p className="text-on-surface-variant leading-relaxed text-sm sm:text-base md:text-lg">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
export default FAQSection;
