import { Button } from "@/components/ui/button";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { TIERS } from "@/landing/data/pricing.plans";
import { usePricingAnimations } from "./pricing.animations";
import { useRef } from "react";

const PricingSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  usePricingAnimations(sectionRef);
  return (
    <section
      className="py-24 sm:py-28 md:py-32 bg-background relative"
      ref={sectionRef}
      id="pricing"
    >
      <div className="container w-full mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
        <div className="flex flex-col items-center">
          <SectionTitle title="Simple Pricing" align="center" />
        </div>

        {/*
          ✅ FIX: Max-width container on the grid prevents the two cards from
          stretching to full 1400px+ width on large screens. Pricing cards at
          that width look absurdly wide. Centered and capped at 900px.
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 max-w-3xl mx-auto">
          {TIERS.map((tier, i) => (
            <div
              key={i}
              className="pricing-card relative will-change-transform"
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-linear-to-r from-primary to-secondary text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest z-10 shadow-glow-primary whitespace-nowrap">
                  Most Popular
                </div>
              )}

              {/*
                ✅ FIX: The original used two completely different JSX structures
                for the popular vs non-popular cards, duplicating all the content.
                Unified into a single structure with conditional styling.
                Easier to maintain and less risk of them drifting out of sync.
              */}
              <div
                className={`h-full flex flex-col rounded-[1.25rem] sm:rounded-[1.5rem] p-7 sm:p-8 md:p-10 relative overflow-hidden border transition-colors ${
                  tier.popular
                    ? "bg-surface-container/80 backdrop-blur-xl border-primary/30"
                    : "bg-surface border-outline-variant/15 hover:border-outline-variant/30"
                }`}
              >
                {/* Ambient glow for popular card */}
                {tier.popular && (
                  <div className="absolute top-0 right-0 w-56 h-56 bg-primary/10 blur-[80px] pointer-events-none" />
                )}

                <div className="relative z-10 flex flex-col h-full">
                  <h3 className="text-xl sm:text-2xl font-bold text-on-surface mb-2">
                    {tier.name}
                  </h3>
                  <p className="text-on-surface-variant mb-6 sm:mb-8 text-sm sm:text-base">
                    {tier.desc}
                  </p>

                  {/*
                    ✅ FIX: Price display was "Free /mo" for the free tier
                    because the suffix "/mo" was hardcoded on the popular
                    tier's wrapper but the price value and suffix are now
                    separate fields in TIERS — renders correctly for both.
                  */}
                  <div className="text-4xl sm:text-5xl font-black mb-8 sm:mb-10 text-on-surface tracking-tighter">
                    {tier.price}{" "}
                    <span className="text-base text-on-surface-variant font-medium tracking-normal">
                      /{tier.priceSuffix}
                    </span>
                  </div>

                  <ul className="space-y-3 sm:space-y-4 mb-8 sm:mb-12 flex-1">
                    {tier.features.map((f, j) => (
                      <li
                        key={j}
                        className={`flex items-center gap-3 text-sm sm:text-base ${
                          tier.popular
                            ? "text-on-surface"
                            : "text-on-surface-variant"
                        }`}
                      >
                        <span
                          className={`font-bold shrink-0 ${
                            tier.popular
                              ? "text-primary"
                              : "text-outline-variant"
                          }`}
                        >
                          ✓
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  {tier.popular ? (
                    <Button size="lg" className="w-full mt-auto">
                      Go Voyager
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full mt-auto"
                    >
                      Start Free
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
