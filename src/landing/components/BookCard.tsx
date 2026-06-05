import type { TrendingBooks } from "@/features/books/types/book";
import { Link } from "react-router-dom";

const BookCard = ({ title, author, imageUrl, id }: TrendingBooks) => {
  return (
    <article className="group cursor-pointer w-full">
      <div
        className="
          relative aspect-2/3
          overflow-hidden
          border border-white/5
          shadow-soft
          transition-transform duration-500 ease-out
          group-hover:scale-105
          "
      >
        <img
          src={imageUrl}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover"
        />

        {/* Overlay */}
        <div
          className="
            absolute inset-0
            bg-linear-to-t from-background/95 via-background/30 to-transparent
            opacity-0
            transition-opacity duration-300
            group-hover:opacity-100
            p-4 sm:p-5
            flex items-end
          "
        >
          <Link
            to={`/library/books/${id}`}
            className="btn-primary py-1.5 text-sm font-medium"
          >
            View Details
          </Link>
        </div>
      </div>
      <h3
        className="
          mt-2
          font-bold
          text-xs sm:text-base md:text-lg
          text-on-surface
          group-hover:text-primary
          transition-colors
          leading-tight
          line-clamp-2
        "
      >
        {title}
      </h3>

      <p className="mt-1 text-xs sm:text-sm text-on-surface-variant truncate">
        by {author}
      </p>
    </article>
  );
};

export default BookCard;
