import { Button } from "@/components/ui/button";

type BookCardProps = {
  title: string;
  author: string;
  img: string;
};

const BookCard = ({ title, author, img }: BookCardProps) => {
  return (
    <div
      className="
        flex-none shrink-0
        w-45 md:w-60
        group cursor-pointer
        "
    >
      <div
        className="
          relative aspect-2/3
          rounded-xl overflow-hidden
          border border-white/5
          shadow-[0_20px_40px_rgba(0,0,0,0.4)]
          transition-all duration-500 ease-out
          will-change-transform
          group-hover:translate-y-1.5
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
            p-4 sm:p-6
            flex items-end
          "
        >
          <Button
            size="sm"
            className="
              w-full font-bold
              text-sm md:text-base
              shadow-glow-primary
              text-on-primary-container
            "
          >
            View Details
          </Button>
        </div>
      </div>

      <h3
        className="
          mt-4 sm:mt-5
          font-bold
          text-base sm:text-lg
          text-on-surface
          group-hover:text-primary
          transition-colors
          leading-tight
        "
      >
        {title}
      </h3>

      <p className="mt-1 label-sm text-xs md:text-base text-on-surface-variant">
        {author}
      </p>
    </div>
  );
};

export default BookCard;
