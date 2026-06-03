import axiosClient from "@/shared/api/axiosClient";
import type { BasketResponse, UpdateBasketItemProps } from "../types";

// # TanStack Query mutations/queries'
//Add to wishlist and remove from wishlist APIs

// or recreate if not exist
const getBasket = async (basketId: string): Promise<BasketResponse> => {
  const res = await axiosClient.get("/basket", { params: { basketId } });
  return res.data;
};

const getBasketCount = async (
  basketId: string,
  isAuthenticated: boolean,
  signal: AbortSignal,
): Promise<number> => {
  if (!isAuthenticated) return 0;
  const res = await axiosClient.get("/basket", {
    params: { basketId },
    signal,
  });
  const basket: BasketResponse = res.data;
  const count = basket.items.length;
  return count;
};

const updateBasketDeliveryMethod = async (
  basket: BasketResponse,
): Promise<BasketResponse> => {
  const res = await axiosClient.put("/basket", basket);
  return res.data;
};

const updateBasket = async (
  updateBasketProps: UpdateBasketItemProps,
): Promise<BasketResponse> => {
  const res = await axiosClient.patch(`/basket/${updateBasketProps.basketId}`, {
    ...updateBasketProps.basketItem,
  });
  return res.data;
};
export { getBasket, updateBasket, getBasketCount, updateBasketDeliveryMethod };
