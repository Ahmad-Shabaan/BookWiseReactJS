import { Button } from "@/components/ui/button";

type BookCardProps = {
  title: string;
  author: string;
  img: string;
};

const BookCard = ({ title, author, img }: BookCardProps) => {
  return (
    /*
      ✅ FIX: Removed fixed `w-45 md:w-60` widths from the wrapper.
      The card width is now controlled by the parent scroll track
      (TrendingSection), which uses `flex-1` + `min-w-[160px]`.
      This is more composable and prevents fixed sizes causing
      overflow on 320px screens.
    */
    <div className="group cursor-pointer w-full">
      {/*
        ✅ PERF: Replaced `will-change-transform` on the image container with
        `transform-gpu` (Tailwind shorthand for `translateZ(0)`). This promotes
        the element to a GPU layer without hinting at future transforms that
        never arrive — a subtle but real memory optimization.

        ✅ FIX: Removed the `group-hover:translate-y-1.5` downward shift.
        Moving a card DOWN on hover is counter-intuitive UX. Replaced with a
        subtle lift (`-translate-y-1`) that feels natural and "pickable".
      */}
      <div
        className="
          relative aspect-2/3
          rounded-xl overflow-hidden
          border border-white/5
          shadow-[0_20px_40px_rgba(0,0,0,0.4)]
          transition-transform duration-500 ease-out
          transform-gpu
          group-hover:-translate-y-1
        "
      >
        <img
          src={img}
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
          <Button
            size="sm"
            className="
              w-full font-bold
              text-xs sm:text-sm
              shadow-glow-primary
              text-on-primary-container
            "
          >
            View Details
          </Button>
        </div>
      </div>

      {/*
        ✅ FIX: Removed the `md:text-base` jump on author name — fluid
        text sizing is more predictable. Added `line-clamp-2` so very
        long titles don't break the card layout in the scroll track.
      */}
      <h3
        className="
          mt-3 sm:mt-4
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
        {author}
      </p>
    </div>
  );
};

export default BookCard;
