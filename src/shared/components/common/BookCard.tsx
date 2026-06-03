import { forwardRef, useRef, useState } from "react";
import gsap from "@/lib/gsap.config";
import { Heart } from "lucide-react";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import { useBasketId } from "@/shared/hooks/useLocalStorage";
import { useQueryClient } from "@tanstack/react-query";
import { useUpdateBasket } from "@/features/basket/hooks/useBasket";
import type { BasketItem, BasketResponse } from "@/features/basket/types";
// import { getBasket } from "@/features/checkout/services/shopping.cart.api";
import { BASKET_QUERY_KEYS } from "@/features/basket/constants/basket.constants";
import { useHandleToggleWishlist } from "@/features/wishlist/hooks/useWishlist";
import { toast } from "sonner";
import type { Book } from "@/shared/types/api.types";
import type { WishlistBook } from "@/features/wishlist/types/wishlist";
import { getBasket } from "@/features/basket/services/basket.api";

// ── forwardRef lets BookGrid's GSAP stagger target each card DOM node ──────
const BookCard = forwardRef<
  HTMLElement,
  { book: Book | WishlistBook; isWished: boolean }
>(({ book, isWished }, ref) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toggleWishlist = useHandleToggleWishlist();
  const { updateOrRemoveBasketItem } = useUpdateBasket();
  const queryClient = useQueryClient();
  const basketId = useBasketId();
  // ── Wishlist button: quick GSAP scale punch on toggle ────────────────────
  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist({ bookId: book.id, isWished });
    if (btnRef.current) {
      gsap.fromTo(
        btnRef.current,
        { scale: 0.5 },
        { scale: 1, duration: 0.3, ease: "expo.inOut" },
      );
    }
  };

  const onAddToCart = async (bookId: number, e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    let basket: BasketResponse | undefined;
    try {
      basket = queryClient.getQueryData(BASKET_QUERY_KEYS);
      if (!basket) {
        setIsLoading(true);
        basket = await getBasket(basketId);
        setIsLoading(false);
      }
      let basketItem: BasketItem | undefined = basket.items?.find(
        (i) => i.id === bookId,
      );
      if (!basketItem)
        basketItem = {
          id: bookId,
          title: book.title,
          price: book.price,
          quantity: 1,
          pictureUrl: book.imageUrl,
          author: book.author,
          publisher: book.publisher,
        };
      updateOrRemoveBasketItem({ basketItem, basketId });
    } catch {
      setIsLoading(false);
      toast.error("Oops! We couldn’t update your cart. Please try again.");
      return;
    }
  };

  return (
    <article
      ref={ref as React.Ref<HTMLElement>}
      className="
      flex flex-row sm:flex-col
        group cursor-pointer overflow-hidden rounded-none 
        bg-surface-container-low
        transition-all duration-400
        shadow-soft
        hover:-translate-y-2 
        hover:shadow-soft-dim
        "
      // hover:shadow-[0_20px_40px_rgba(0,0,0,0.5),0_0_0_1px_rgba(163,166,255,0.15)]
    >
      {/* ── Cover ─────────────────────────────────────── */}
      <div className="flex items-center w-full">
        <div className="relative w-full max-h-full aspect-2/3 overflow-hidden ">
          <img
            src={book.imageUrl}
            alt={`Cover of ${book.title}`}
            loading="lazy"
            className="h-full w-full object-cover"
          />

          {/* Gradient overlay — always present for readability */}
          <div
            className="
          pointer-events-none absolute inset-0
          bg-linear-to-t from-black/60 via-transparent to-transparent
          group-hover:from-black/0
        "
          />
          {/* Wishlist overlay */}
          <div
            className="
          pointer-events-none absolute inset-0
          flex items-end justify-center p-4
          opacity-0 transition-opacity duration-300
          group-hover:opacity-100
        "
          >
            <button
              ref={btnRef}
              onClick={(e) => handleWishlist(e)}
              aria-label={
                isWished
                  ? `Remove ${book.title} from wishlist`
                  : `Add ${book.title} to wishlist`
              }
              aria-pressed={isWished}
              className={`
              absolute z-10
              pointer-events-auto  p-2 rounded-full
              border-2 
              transition-colors duration-200
              flex items-center justify-center
              ${isWished ? "border-error" : "border-on-surface"}
              ${isWished ? "bg-surface" : "bg-surface-bright/50 "}
              `}
            >
              <Heart
                size={26}
                fill={`${isWished ? "#ff6e84" : "none"}`}
                className={` ${isWished ? "text-error" : "text-on-surface"}`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* ── Info ──────────────────────────────────────── */}
      <div className="p-2 sm:p-1 relative space-y-1 w-full">
        <h3
          className="line-clamp-1
            flex-1 text-base sm:text-lg font-bold leading-snug
            text-on-surface
            transition-colors duration-200
            group-hover:text-primary
          "
        >
          {book.title}
        </h3>

        <p className="text-xs sm:text-sm text-on-surface-variant">
          by {book.author}
        </p>

        <p className="text-sm">⭐⭐⭐⭐⭐</p>
        <p className="total-price-span text-on-surface group-hover:text-primary text-xl">
          {formatCurrency(book.price)}{" "}
          <span className="currency-span text-[10px] sm:text-xs">EGP</span>
        </p>
        <p className="sm:hidden text-xs sm:text-sm text-on-surface tracking-wide font-medium">
          {book.genre}
        </p>
        <p className="sm:hidden text-xs sm:text-sm text-on-surface-variant tracking-wide font-medium">
          P-{book.publisher}
        </p>
        <p className="sm:hidden text-xs sm:text-sm text-on-surface-variant font-light">
          Only 5 left in stock - order soon
        </p>
        <p className="sm:hidden text-xs sm:text-sm text-on-surface-variant tracking-wide font-medium">
          Total copies in library 15
        </p>
        <p className="sm:hidden text-xs sm:text-sm text-on-surface-variant tracking-wide font-medium">
          Available copies now 5
        </p>
        <div className="sm:hidden flex justify-center">
          <button
            onPointerDown={(e) => onAddToCart(book.id, e)}
            className="cursor-pointer shadow-soft py-1.5 mt-2 group text-sm w-full rounded-full font-normal text-on-surface bg-primary-dim"
            disabled={isLoading}
          >
            {isLoading ? (
              <img
                src="/icons/add-to-cart.png"
                alt="add-to-cart"
                className="w-6 h-6  animate-[shift-x_2s_ease-in-out_infinite]"
              />
            ) : (
              "Add to Cart"
            )}
          </button>
        </div>
      </div>
    </article>
  );
});

BookCard.displayName = "BookCard";
export default BookCard;
