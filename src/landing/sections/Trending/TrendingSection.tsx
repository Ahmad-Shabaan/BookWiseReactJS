import { SectionTitle } from "@/components/ui/SectionTitle";
import BookCard from "@/landing/components/BookCard";
import { BOOKS } from "@/landing/data/trending-books";
import { useRef } from "react";
import { useTrendingAnimation } from "./trending.animation";

const TrendingSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  useTrendingAnimation(sectionRef);
  return (
    <section
      ref={sectionRef}
      className="py-14 sm:py-16 md:py-20 bg-surface-container-low"
    >
      <div className="container w-full mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
        {/* ✅ NEW: Added section heading for context — was missing in original */}
        <SectionTitle title="Trending Now" accentColor="secondary" />

        <div
          className="
            flex gap-4 sm:gap-5 md:gap-6
            overflow-x-auto
            hide-scrollbar
            pb-6 sm:pb-8
            snap-x snap-mandatory
            scroll-smooth
            mt-8 sm:mt-10
          "
        >
          {BOOKS.map((book, i) => (
            /*
              ✅ FIX: The original wrapper had `flex-1` on each card wrapper
              alongside `shrink-0` on BookCard — these conflict. `flex-1`
              tries to grow cards to fill the container but `shrink-0` on
              the inner card prevents shrinking, causing layout thrash.

              Fix: give each wrapper an explicit min-width that controls card
              size at each breakpoint. BookCard takes 100% of that width.
              This is a cleaner ownership model: TrendingSection decides
              widths, BookCard just fills its slot.
            */
            <div
              key={i}
              className="trending-card shrink-0 snap-center sm:snap-start w-36.25 sm:w-46.25 md:w-53.75 lg:w-60 will-change-transform"
            >
              <BookCard {...book} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default TrendingSection;
