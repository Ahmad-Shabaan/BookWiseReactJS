import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const TESTIMONIALS = [
  {
    quote: "BookWise completely changed how I discover sci-fi. The DNA match is terrifyingly accurate. I'm reading books I would never have found otherwise.",
    author: "Alice Rivera",
    role: "Avid Reader",
  },
  {
    quote: "The interface alone makes me want to spend hours browsing. But the algorithmic suggestions? Perfect. It's like having a world-class librarian in my pocket.",
    author: "James Chen",
    role: "Literary Critic",
  },
  {
    quote: "I imported my 500+ Goodreads library in seconds. The insights I got about my reading habits were mind-blowing.",
    author: "Sarah O'Connor",
    role: "Book Blogger",
  },
];

export function TestimonialsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".testimonial-card", {
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
    <section className="py-32 bg-surface" ref={containerRef}>
      <div className="max-w-350 w-full mx-auto px-6 md:px-12 lg:px-16">
        {/* <SectionTitle title="Community Voices" align="center" /> */}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="testimonial-card bg-surface-container-low p-8 md:p-10 rounded-4xl flex flex-col justify-between border border-outline-variant/15 group hover:border-primary/30 transition-colors shadow-soft relative overflow-hidden">
             <div className="absolute -right-6 -top-6 text-[100px] text-surface-container-highest font-serif leading-none italic pointer-events-none group-hover:text-primary/10 transition-colors">"</div>
              <p className="text-on-surface-variant text-lg leading-relaxed mb-8 relative z-10">"{t.quote}"</p>
              <div className="mt-auto relative z-10">
                <p className="font-bold text-on-surface">{t.author}</p>
                <p className="label-sm text-primary uppercase tracking-widest mt-1">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
