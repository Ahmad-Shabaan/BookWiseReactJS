import {
  useGetBasket,
  useUpdateBasket,
  useUpdateBasketItemQuantity,
} from "../hooks/useBasket";
import type { BasketItem } from "../types";
import {
  Minus,
  Plus,
  Trash2,
  BookOpen,
  ShoppingBasket,
  ShoppingBag,
} from "lucide-react";
import SectionHeader from "@/shared/components/common/SectionHeader";
import BasketSkeleton from "../components/BasketSkeleton";
import OrderSummary from "../components/OrderSummary";
import EmptyState from "@/shared/components/common/EmptyState";
import AppError from "@/shared/components/common/ErrorBoundary/AppError";
import useGetBasketId from "@/shared/hooks/useGetBasketId";
import { useAppSelector } from "@/store/hooks";

const BasketPage = () => {
  const basketId = useGetBasketId();
  const {
    data: basket,
    isLoading: cartLoading,
    isError: cartError,
  } = useGetBasket(basketId);
  const { updateOrRemoveBasketItem } = useUpdateBasket();
  const { updateBasketItemQuantity } = useUpdateBasketItemQuantity();
  const basketItemsCount = useAppSelector((state) => state.basket.basketCount);
  const updateQuantity = async (itemId: number, newQuantity: number) => {
    if (!basket || newQuantity < 1) return;
    const updatedBasket: BasketItem = Object.assign(
      {},
      basket.items.find((i) => i.id === itemId),
    );
    updatedBasket.quantity = newQuantity;
    updateBasketItemQuantity({ basketId, basketItem: updatedBasket });
  };

  const removeItem = async (itemId: number) => {
    if (!basket) return;
    const updatedBasket: BasketItem = Object.assign(
      {},
      basket.items.find((i) => i.id === itemId),
    );
    updatedBasket.quantity = 0;
    updateOrRemoveBasketItem({
      basketItem: updatedBasket,
      basketId,
    });
  };

  if (cartLoading) return <BasketSkeleton />;

  // if (!basket) return null;
  // const itemCount =
  //   basket?.items?.reduce((sum, item) => sum + item.quantity, 0) ?? 0;

  if (basketItemsCount === 0) {
    return (
      <EmptyState
        icon=<ShoppingBag size={34} className="text-primary" />
        message="Your cart is empty"
        subMessage="Looks like you haven't added anything to your cart yet. Browse our collection and find your next great read."
      />
    );
  }
  if (cartError || !basket) {
    return (
      <AppError
        message="Oops! Something went wrong with your cart. Please try again in a minute."
        link="Brows Books"
        to="/library"
      />
    );
  }
  return (
    <main className="main-container">
      <div className="page-container">
        <div className="w-full col-center lg:flex-row gap-6 lg:items-start">
          <div className="w-full flex-1">
            <SectionHeader to="/library" link="Explore more Books">
              <div className="flex items-center gap-6 z-10">
                <div className="icon-card">
                  <ShoppingBasket className="size-6 sm:size-8 text-primary-dim" />
                </div>
                <div>
                  <h1 className="section-header">
                    Your Basket
                    {basketItemsCount > 0 && (
                      <span className="items-count-span">
                        {basketItemsCount}{" "}
                        {basketItemsCount === 1 ? "Item" : "Items"}
                      </span>
                    )}
                  </h1>
                </div>
              </div>
            </SectionHeader>
            <div className="bg-surface-container-low rounded-xl p-4 sm:p-6 shadow-soft border border-outline-variant/10">
              <div className="flex flex-col  gap-4 items-start flex-1 sm:max-h-dvh sm:overflow-y-scroll hide-scrollbar">
                {basket.items.map((item) => (
                  <article
                    key={item.id}
                    className="w-full shadow-soft flex flex-col sm:flex-row sm:gap-6 p-3 sm:p-4 rounded-xl bg-surface-container-low transition-all hover:bg-surface-container"
                  >
                    <div className="max-w-56 sm:size-40 aspect-auto sm:aspect-2/3 shrink-0 rounded-lg overflow-hidden shadow-soft-dim bg-surface-container-lowest flex items-center justify-center relative">
                      {item.pictureUrl ? (
                        <img
                          src={item.pictureUrl}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <BookOpen className="w-10 h-10 text-on-surface-variant" />
                      )}
                    </div>

                    <div className="flex flex-col flex-1 justify-between py-2">
                      <div className="flex flex-col  sm:flex-row sm:justify-between items-end sm:items-start space-y-1">
                        <div className="space-y-1 flex flex-col items-start w-full">
                          <h2 className="text-xl font-semibold text-on-background tracking-tight">
                            {item.title}
                          </h2>
                          <p className="text-on-surface-variant text-sm md:text-base">
                            {item.author}
                          </p>
                        </div>
                        <span className="text-xl sm:text-2xl font-bold text-on-background whitespace-nowrap sm:ml-4">
                          {item.price.toFixed(2)}{" "}
                          <span className="currency-span">EGP</span>
                        </span>
                      </div>
                      {/* </div> */}

                      <div className="flex justify-between items-center mt-6 pt-6 border-t border-outline-variant/15">
                        <div className="flex items-center gap-4 bg-surface-container-highest rounded-lg px-2 py-1 border border-outline-variant/15">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="cursor-pointer p-1 text-on-surface-variant hover:text-primary transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="text-sm font-medium w-6 text-center text-on-background">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="cursor-pointer p-1 text-on-surface-variant hover:text-primary transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="cursor-pointer text-on-surface-variant hover:text-error transition-colors flex items-center gap-2 text-sm font-medium"
                        >
                          <Trash2 className="w-4 h-4" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
          <OrderSummary basket={basket} />
        </div>
      </div>
    </main>
  );
};

export default BasketPage;
