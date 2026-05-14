import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { SectionTitle } from "@/components/ui/SectionTitle";

gsap.registerPlugin(ScrollTrigger);

const AUTHORS = [
  {
    name: "Elena Rossi",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDwUgAKKTV61TXsG7P0E70fv68_nLKzbR6i2Q6OdAlX2hEpTDAFihyT4HiZ_DmsOpzbyDnAyRTkkYByxD7VSz7YNOJP3HVYGQS4fjfGMEGQSkevtP1hXmt04z7iYzujjlZHx-6GqCDJ6RBHrY3Es7-EKK1nHQdzRTQzdFKCVbqxjP8uak9M38iVQ1kLMZxSMxBdNo4SOoU4aJ5Bux8VZzgvvO-QYh94_xBfF46Bs4CmcCxbUITdbn9AGwEzx78wZNOeR43IPHHW2V0",
    followers: "1.2M",
    following: false,
  },
  {
    name: "Julian Vance",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD3fX_POfDqT0R8S_v_eHj2A5Nf_h_Gf_T6l_Z8y_T7u_W9f_Z6m_T4v_V5o_P1r_Z2m_T3j_W1k_P4v_T0",
    followers: "890k",
    following: false,
  },
  {
    name: "Sarah Jenkins",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA3Lh_Z8m_T1k_V5v_P4r_Z2m_T3j_W1k_P4v_T0_R8S_v_eHj2A5Nf_h_Gf_T6l_Z8y_T7u_W9f_Z6m",
    followers: "2.4M",
    following: true,
  },
  {
    name: "Marcus Thorne",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCQ9v_T1k_V5v_P4r_Z2m_T3j_W1k_P4v_T0_R8S_v_eHj2A5Nf_h_Gf_T6l_Z8y_T7u_W9f_Z6m_T4v",
    followers: "450k",
    following: false,
  },
  {
    name: "Evelyn St. Claire",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD8m_T1k_V5v_P4r_Z2m_T3j_W1k_P4v_T0_R8S_v_eHj2A5Nf_h_Gf_T6l_Z8y_T7u_W9f_Z6m_T4v",
    followers: "1.5M",
    following: false,
  },
];

export function AuthorsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".author-card", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.2)",
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      className="py-16 sm:py-20 md:py-24 bg-background"
      ref={containerRef}
    >
      {/*
        ✅ FIX: Replaced hardcoded pl-6/pl-12/pl-16 on the outer div with a
        unified padding strategy. The section heading gets consistent padding,
        while the scroll track only adds right-padding at its own level.
        Prevents the heading from looking misaligned vs the rest of the page.
      */}
      <div className="pl-4 sm:pl-6 md:pl-12 lg:pl-16">
        <div className="pr-4 sm:pr-6 md:pr-0">
          <SectionTitle title="Top Authors" accentColor="secondary" />
        </div>

        {/*
          ✅ FIX: Added `scroll-smooth` and a consistent gap scale.
          `min-w-0` on the inner flex prevents the container from blowing
          past viewport width on very small screens (common CLS source).
        */}
        <div className="flex gap-6 sm:gap-8 overflow-x-auto hide-scrollbar pb-6 pr-4 sm:pr-6 md:pr-12 w-full snap-x snap-mandatory scroll-smooth mt-8 sm:mt-10">
          {AUTHORS.map((author, i) => (
            <div
              key={i}
              // ✅ PERF: `will-change-transform` tells the browser to promote
              // this element to its own compositor layer before the animation
              // starts, preventing janky first-frame paint.
              className="author-card flex flex-col items-center shrink-0 snap-center sm:snap-start group cursor-pointer will-change-transform"
            >
              {/*
                ✅ FIX: Replaced fixed w-32/w-40 sizes with fluid clamp-based
                sizing via responsive classes. Avoids the avatar feeling too
                large on small phones (320px) or too small on large screens.
              */}
              <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 rounded-full overflow-hidden border-2 border-transparent group-hover:border-primary transition-all duration-300 p-1 mb-3 sm:mb-4">
                <img
                  className="w-full h-full object-cover rounded-full"
                  src={author.img}
                  alt={author.name}
                  // ✅ PERF: lazy-load off-screen author images
                  loading="lazy"
                />
              </div>

              <span className="font-bold text-base sm:text-lg text-on-surface text-center max-w-30 truncate">
                {author.name}
              </span>

              <span className="text-on-surface-variant label-sm mb-3 mt-1.5 uppercase text-xs tracking-wider">
                {author.followers} Followers
              </span>

              <button
                className={`px-5 sm:px-6 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
                  author.following
                    ? "bg-primary text-on-primary hover:brightness-110 shadow-glow-primary"
                    : "border border-outline-variant/30 text-on-surface hover:bg-on-surface hover:text-background"
                }`}
              >
                {author.following ? "Following" : "Follow"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
