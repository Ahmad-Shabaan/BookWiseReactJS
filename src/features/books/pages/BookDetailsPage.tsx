import { useParams, Link } from "react-router-dom";
import { Heart, ShoppingCart, BookOpen, ArrowLeft } from "lucide-react";
import gsap from "@/lib/gsap.config";
import { useBookDetail } from "../hooks/useBooks";
import BookDetailsSkeleton from "../components/BookDetailsSkeleton";
import { useAppSelector } from "@/store/hooks";
import { useHandleToggleWishlist } from "@/features/wishlist/hooks/useWishlist";
import { STATUS_CONFIG } from "../constants/books.constants";
import AppError from "@/shared/components/common/ErrorBoundary/AppError";
import {
  useGetBasket,
  useUpdateBasket,
} from "@/features/basket/hooks/useBasket";
import type { BasketItem } from "@/features/basket/types";
import { useRef } from "react";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import { getBasketId } from "@/lib/utils/localStorageService";
import { toast } from "sonner";

const BookDetailsPage = () => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const { id } = useParams<{ id: string }>();
  const { data: book, isLoading, isError } = useBookDetail(id ?? "");
  const toggleWishlist = useHandleToggleWishlist();
  const { updateOrRemoveBasketItem } = useUpdateBasket();
  // const queryClient = useQueryClient();
  const basketId = getBasketId();
  const { data: basket } = useGetBasket(basketId);
  const wishlistIds = useAppSelector((state) => state.wishlist);
  const isWished = (bookId: number): boolean => {
    return wishlistIds.wishlistBooks.findIndex((el) => el === bookId) === -1
      ? false
      : true;
  };
  const handleToggleWishlist = (bookId: number) => {
    toggleWishlist({
      bookId,
      isWished: isWished(bookId),
    });
    if (btnRef.current) {
      gsap.fromTo(
        btnRef.current,
        { scale: 0.5 },
        { scale: 1, duration: 0.3, ease: "expo.inOut" },
      );
    }
  };

  if (isLoading) return <BookDetailsSkeleton />;

  if (isError || !book) {
    return (
      <AppError
        message="Oops! Something went wrong. Please try again in a minute."
        to="/library"
        link="Back to Library"
      />
    );
  }

  const status = STATUS_CONFIG[book.status] ?? STATUS_CONFIG.Unavailable;

  const onAddToCart = async (
    bookId: number,
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    let basketItem: BasketItem | undefined = basket?.items?.find(
      (i) => i.id === bookId,
    );
    if (!basketItem) {
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
    } else {
      toast.info(
        "You've already added this book to your basket. View your basket.",
      );
    }
  };

  return (
    <main className="flex-1 main-container">
      <div className="page-container">
        <article className="grid grid-cols-1 gap-12 lg:grid-cols-12 relative">
          <Link
            to="/library"
            className="absolute -top-6 sm:-top-8 -translate-y-1/2 right-0 z-1 inline-flex items-center gap-2 text-on-surface-variant hover:text-primary uppercase transition-colors group text-xs sm:text-sm font-medium"
          >
            <ArrowLeft className="size-4 group-hover:-translate-x-0.5 transition-transform" />
            Back to Library
          </Link>
          <div className="lg:col-span-5">
            <div className="glass-panel flex aspect-3/4 items-center justify-center overflow-hidden rounded-3xl p-4">
              <img
                src={book.imageUrl}
                alt={`Cover of ${book.title}`}
                className="h-full w-full rounded-2xl object-cover shadow-soft-dim transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>

          <div className="flex flex-col lg:col-span-7">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.3em] text-primary">
                  {book.genre}
                </p>
                <h1 className=" text-4xl leading-tight lg:text-5xl my-1">
                  {book.title}
                </h1>
                <p className=" text-lg text-on-surface-variant">
                  by <span className="text-on-surface">{book.author}</span>
                </p>
              </div>

              <button
                ref={btnRef}
                onClick={() => handleToggleWishlist(book.id)}
                aria-label="Add to wishlist"
                className="glass-panel flex h-14 w-14 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-surface-container-higher cursor-pointer"
              >
                <Heart
                  size={26}
                  fill={`${isWished(book.id) ? "#ff6e84" : "none"}`}
                  className={` ${isWished(book.id) ? "text-error" : "text-on-surface"}`}
                />
              </button>
            </div>

            <div className="my-8 h-px w-full bg-outline-variant/20" />

            <p className=" leading-relaxed text-on-surface-variant max-w-2xl">
              {book.description}
            </p>

            <div className="mb-10 mt-8">
              <p className="total-price-span text-3xl lg:text-5xl">
                {formatCurrency(book.price)}{" "}
                <span className="currency-span">EGP</span>
              </p>
              <div className="mt-4 flex items-center gap-4">
                <span
                  className={`rounded-full border px-3 py-1 text-xs font-bold ${status.class}`}
                >
                  {status.label}
                </span>
                <span className="text-sm text-on-surface-variant">
                  <span className="font-semibold text-primary">
                    {book.availableCopies}
                  </span>{" "}
                  copies left{" "}
                  <span className="text-outline-variant/40 mx-1">/</span> Total{" "}
                  {book.totalCopies}
                </span>
              </div>
            </div>

            <div className="mb-12 flex flex-col gap-4 sm:flex-row">
              <button
                onClick={(e) => onAddToCart(book.id, e)}
                className="group bg-on-surface text-surface font-extrabold flex items-center justify-center gap-3 rounded-lg px-12 py-4  transition-all hover:bg-inverse-surface cursor-pointer"
              >
                <ShoppingCart className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-100" />
                ADD TO CART
              </button>
              <button className="glass-panel shrink-0 flex items-center justify-center gap-3 rounded-lg px-12 py-4 font-bold text-on-surface transition-all hover:bg-surface-container-highest cursor-pointer">
                <BookOpen className="h-5 w-5" />
                READ NOW
              </button>
            </div>

            <div className="mt-auto">
              <p className="label-base mb-6">Technical Details</p>
              <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                <div>
                  <p className="label-base mb-1">ISBN</p>
                  <p className="text-sm font-medium">{book.isbn}</p>
                </div>
                <div>
                  <p className="label-base mb-1">Year</p>
                  <p className="text-sm font-medium">{book.publicationYear}</p>
                </div>
                <div>
                  <p className="label-base mb-1">Genre</p>
                  <p className="text-sm font-medium">{book.genre}</p>
                </div>
                <div>
                  <p className="label-base mb-1">Publisher</p>
                  <p className="text-sm font-medium">{book.publisher}</p>
                </div>
              </div>
            </div>
          </div>
        </article>

        <section className="mt-24 border-t border-outline-variant/20 pt-12">
          <h2 className="text-3xl">Reader Reviews</h2>
          <div className="glass-panel mt-12 flex flex-col items-center rounded-3xl px-16 py-16 text-center">
            <div className="glass-panel mb-6 flex h-16 w-16 items-center justify-center rounded-full">
              <BookOpen className="h-8 w-8 text-outline-variant" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">No reviews yet</h3>
            <p className="text-on-surface-variant">
              Be the first to share your journey through this book.
            </p>
            <button className="mt-8 font-bold text-primary transition-colors hover:text-secondary">
              Write a Review
            </button>
          </div>
        </section>
      </div>
    </main>
  );
};

export default BookDetailsPage;
