import { SectionTitle } from "@/components/ui/SectionTitle";
import BookCard from "@/landing/components/BookCard";
import { useRef } from "react";
import { useTrendingAnimation } from "./trending.animation";
import { useGetTrendingBooks } from "@/features/books/hooks/useBooks";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SkeletonCard from "@/shared/components/common/SkeletonCard";
import ErrorMessage from "@/shared/components/common/ErrorBoundary/ErrorMessage";

const TrendingSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { data: books, isLoading, isError } = useGetTrendingBooks();
  useTrendingAnimation({ sectionRef, isLoading });
  return (
    <div
      ref={sectionRef}
      className="py-14 sm:py-16 md:py-20 bg-surface-container-low "
      id="collections"
    >
      <section className="section-container relative">
        <SectionTitle title="Trending Now" accentColor="secondary" />
        <div className="absolute right-4  top-9 sm:top-0  text-xs px-2 sm:px-4 py-0.5 sm:py-1 border rounded-full">
          <Link to="/library" className="flex-center gap-1 ">
            See More
            <ArrowRight size={14} className={"hidden sm:block"} />
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
          w-full
          "
        >
          {isLoading ? (
            Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="w-1/4 min-w-52 shrink-0">
                <SkeletonCard parentType="Wishlist" />
              </div>
            ))
          ) : isError ? (
            <ErrorMessage msg="Oops! Something went wrong while loading trending books. Please try again in a minute" />
          ) : (
            books?.map((book, i) => (
              <div
                key={i}
                data-animate="trending-card"
                className="shrink-0 snap-center sm:snap-start w-36.25 sm:w-46.25 md:w-53.75 lg:w-60 will-change-transform"
              >
                <BookCard {...book} />
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};
export default TrendingSection;
