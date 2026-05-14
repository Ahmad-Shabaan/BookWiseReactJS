import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

const TIERS = [
  {
    name: "Reader",
    price: "Free",
    desc: "For the casual explorer.",
    features: ["Unlimited Tracking", "Basic Recommendations", "Community Access"],
    popular: false,
  },
  {
    name: "Voyager",
    price: "$8/mo",
    desc: "For the dedicated bibliophile.",
    features: ["Deep DNA Analytics", "Hyper-specific Suggestions", "Advanced Stats", "No Ads"],
    popular: true,
  },
];

export function PricingSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".pricing-card", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });
    },
    { scope: containerRef }
  );

  return (
    <section className="py-32 bg-background relative" ref={containerRef}>
      <div className="container w-full mx-auto px-6 md:px-12 lg:px-16 ">
        <div className="flex flex-col items-center mb-16">
          <SectionTitle title="Simple Pricing" align="center" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mt-8">
          {TIERS.map((tier, i) => (
            <div key={i} className="pricing-card relative">
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-linear-to-r from-primary to-secondary text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest z-10 shadow-glow-primary">
                  Most Popular
                </div>
              )}
              {tier.popular ? (
                <div className="rounded-[1.5rem] bg-surface-container/80 backdrop-blur-xl border border-primary/30  h-full flex flex-col p-10 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px]" />
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-on-surface mb-2">{tier.name}</h3>
                    <p className="text-on-surface-variant mb-8 h-6">{tier.desc}</p>
                    <div className="text-5xl font-black mb-10 text-on-surface tracking-tighter">
                      {tier.price} <span className="text-lg text-on-surface-variant font-medium tracking-normal">/mo</span>
                    </div>
                    <ul className="space-y-4 mb-12">
                      {tier.features.map((f, j) => (
                        <li key={j} className="flex items-center gap-3 text-on-surface">
                          <span className="text-primary font-bold">✓</span> {f}
                        </li>
                      ))}
                    </ul>
                    <Button size="lg" className="w-full mt-auto">Go Voyager</Button>
                  </div>
                </div>
              ) : (
                <Card className="h-full flex flex-col p-10 border border-outline-variant/15 hover:border-outline-variant/30 transition-colors">
                  <h3 className="text-2xl font-bold text-on-surface mb-2">{tier.name}</h3>
                  <p className="text-on-surface-variant mb-8 h-6">{tier.desc}</p>
                  <div className="text-5xl font-black mb-10 text-on-surface tracking-tighter">
                    {tier.price} <span className="text-lg text-on-surface-variant font-medium tracking-normal">/forever</span>
                  </div>
                  <ul className="space-y-4 mb-12">
                    {tier.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-3 text-on-surface-variant">
                        <span className="text-outline-variant font-bold">✓</span> {f}
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" size="lg" className="w-full mt-auto">Start Free</Button>
                </Card>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
