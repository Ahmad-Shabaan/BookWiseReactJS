import { useRef } from "react";
import SkeletonCard from "./SkeletonCard";
import { Link } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";
import BookCard from "@/shared/components/common/BookCard";
import { useCardsAnimation } from "@/shared/animations/cards.animation";
import type { Book } from "@/shared/types/api.types";
import type { WishlistBook } from "@/features/wishlist/types/wishlist";
import EmptyState from "./EmptyState";

interface GridProps {
  books: Book[] | WishlistBook[];
  isLoading?: boolean;
  skeletonCount?: number;
  parentType: "Main" | "Wishlist";
}
const Grid = ({
  books,
  isLoading = false,
  skeletonCount = 12,
  parentType = "Main",
}: GridProps) => {
  const wishlistIds = useAppSelector((state) => state.wishlist);
  const gridRef = useRef<HTMLDivElement>(null);
  useCardsAnimation({ sectionRef: gridRef, dependencies: [books, isLoading] });

  // ── Loading state ─────────────────────────────────────────────────────────
  if (isLoading)
    return (
      <div
        aria-busy="true"
        aria-label="Loading books"
        className="grid 
       place-content-center
        grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-x-4 gap-y-6
        sm:grid-cols-[repeat(auto-fill,minmax(200px,1fr))]
        lg:grid-cols-[repeat(auto-fill,minmax(220px,1fr))]
        2xl:grid-cols-4"
      >
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );

  // ── Empty state ───────────────────────────────────────────────────────────
  if (!books || books.length === 0)
    return parentType === "Main" ? (
      <EmptyState
        message="Oops! No books found for this filter."
        subMessage="Try changing your selection or explore other categories."
      />
    ) : (
      <EmptyState />
    );

  return (
    <div
      ref={gridRef}
      role="list"
      aria-label="Books"
      className="grid 
       place-content-center
        grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-x-4 gap-y-6
        sm:grid-cols-[repeat(auto-fill,minmax(200px,1fr))]
        lg:grid-cols-[repeat(auto-fill,minmax(220px,1fr))]
        2xl:grid-cols-4
      "
    >
      {books.map((book: Book | WishlistBook) => (
        <Link to={`/library/books/${book.id}`} key={book.id}>
          <BookCard
            book={book}
            isWished={
              wishlistIds.wishlistBooks.findIndex((el) => el === book.id) === -1
                ? false
                : true
            }
          />
        </Link>
      ))}
    </div>
  );
};

export default Grid;
