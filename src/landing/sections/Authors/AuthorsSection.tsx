import { SectionTitle } from "@/components/ui/SectionTitle";
import { AUTHORS } from "@/landing/data/authors";
import React from "react";
import { useAuthorsAnimation } from "./authors.animation";

const AuthorsSection = () => {
  const sectionRef = React.useRef<HTMLDivElement>(null);
  useAuthorsAnimation(sectionRef);
  return (
    <div className="py-16 sm:py-20 md:py-24 bg-background" ref={sectionRef}>
      <section className="section-container">
        <div className="pr-4 sm:pr-6 md:pr-0">
          <SectionTitle title="Top Authors" accentColor="secondary" />
        </div>
        <div className="flex gap-6 sm:gap-8 overflow-x-auto hide-scrollbar pb-6 pr-4 sm:pr-6 md:pr-12 w-full snap-x snap-mandatory scroll-smooth mt-8 sm:mt-10">
          {AUTHORS.map((author, i) => (
            <article
              key={i}
              data-animate="author-card"
              className="flex flex-col items-center shrink-0 snap-center sm:snap-start group cursor-pointer will-change-transform"
            >
              <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 rounded-full overflow-hidden border-2 border-transparent group-hover:border-primary transition-all duration-300 p-1 mb-3 sm:mb-4">
                <img
                  className="w-full h-full object-cover rounded-full"
                  src={author.img}
                  alt={author.name}
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
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AuthorsSection;
