import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { SectionTitle } from "@/components/ui/SectionTitle";

gsap.registerPlugin(ScrollTrigger);

const FAQS = [
  {
    q: "How does the AI recommendation engine work?",
    a: "We analyze reading patterns, genre blending, and semantic sentiment from your ratings to build a localized graph that matches you with hyper-specific narratives.",
  },
  {
    q: "Can I import my existing library?",
    a: "Yes! BookWise supports seamless import from Goodreads, StoryGraph, and standard CSV format with a single click.",
  },
  {
    q: "Is there a limit to how many books I can track?",
    a: "No limitations. Free accounts have limitless tracking. Paid tiers unlock deep analytics and early access features.",
  },
  {
    q: "Are the physical books included?",
    a: "BookWise is purely a discovery and tracking platform. We provide links to buy or rent via major retailers and local libraries.",
  },
];

export function FAQSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const items = containerRef.current.querySelectorAll(".faq-item");

      // 🎬 Entrance animation
      gsap.fromTo(
        items,
        {
          x: "50%",
          opacity: 0,
          scale: 0.97,
        },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          stagger: 0.12,
          ease: "power4.out",

          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
            once: true,
          },
        },
      );

      return () => {
        ScrollTrigger.getAll().forEach((st) => st.kill());
      };
    },
    { scope: containerRef },
  );

  return (
    <section ref={containerRef} className="py-32 bg-surface-container-low">
      <div className="container w-full mx-auto px-6 md:px-12 lg:px-16  section-title-center">
        <SectionTitle
          title="Frequently Asked Questions"
          align="center"
          accentColor="secondary"
        />

        <div className="space-y-6 mt-16">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className="faq-item p-8 rounded-[1.5rem] bg-surface border border-outline-variant/15 hover:border-primary/30 transition-colors shadow-soft will-change-transform"
            >
              <h3 className="text-xl font-bold mb-4 text-on-surface">
                {faq.q}
              </h3>
              <p className="text-on-surface-variant leading-relaxed text-lg">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
