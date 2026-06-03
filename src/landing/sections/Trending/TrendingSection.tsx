import { SectionTitle } from "@/components/ui/SectionTitle";
import BookCard from "@/landing/components/BookCard";
import { useRef } from "react";
import { useTrendingAnimation } from "./trending.animation";
import {  useGetTrendingBooks } from "@/features/books/hooks/useBooks";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const TrendingSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { data: books } = useGetTrendingBooks();
  useTrendingAnimation(sectionRef);
  return (
    <section
      ref={sectionRef}
      className="py-14 sm:py-16 md:py-20 bg-surface-container-low "
      id="collections"
    >
      <div className="container w-full mx-auto px-4 sm:px-6 md:px-12 lg:px-16 relative">
        {/* ✅ NEW: Added section heading for context — was missing in original */}
        <SectionTitle title="Trending Now" accentColor="secondary" />
        <div className="absolute right-0 top-0 px-4 text-xs py-1 border rounded-full">
          <Link to="/library" className="flex-center gap-1">
            See More
            <ArrowRight size={14} />
          </Link>
        </div>
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
          {books?.map((book, i) => (
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
