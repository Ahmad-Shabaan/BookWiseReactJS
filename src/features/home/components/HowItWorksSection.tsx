import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Badge } from "@/components/ui/badge";


const STEPS = [
  {
    num: "01",
    title: "Take the Core Survey",
    description: "Map out your emotional reading baseline so we can tailor recommendations.",
  },
  {
    num: "02",
    title: "Generate DNA Profile",
    description: "Our engine formulates a unique literary DNA specific to your tastes.",
  },
  {
    num: "03",
    title: "Explore the Unknown",
    description: "Dive into hyper-curated, algorithmic suggestions that you will love.",
  },
];

export function HowItWorksSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".step-item", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });
      gsap.from(".step-line", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.5,
        ease: "power3.inOut",
      });
    },
    { scope: containerRef }
  );

  return (
    <section className="py-32 relative bg-background" ref={containerRef}>
      <div className="container w-full mx-auto px-6 md:px-12 lg:px-16">
        <div className="flex flex-col items-center mb-20">
          <Badge variant="outline" className="mb-4">
            Process
          </Badge>
          <SectionTitle title="How It Works" align="center" accentColor="secondary" />
        </div>
        
        <div className="relative flex flex-col md:flex-row justify-between gap-12 md:gap-8 mt-16">
          {/* Connecting line */}
          <div className="hidden md:block step-line absolute top-12 left-[10%] right-[10%] h-0.5 bg-linear-to-r from-background via-outline-variant/30 to-background z-0" />

          {STEPS.map((step, i) => (
            <div key={i} className="step-item relative z-10 flex flex-col items-center text-center max-w-75 mx-auto group">
              <div className="w-24 h-24 rounded-full bg-surface-container border border-outline-variant/15 flex items-center justify-center text-3xl font-black text-on-surface-variant group-hover:text-primary group-hover:border-primary/50 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.3)] mb-8">
                {step.num}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-on-surface tracking-tight">
                {step.title}
              </h3>
              <p className="text-on-surface-variant leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
